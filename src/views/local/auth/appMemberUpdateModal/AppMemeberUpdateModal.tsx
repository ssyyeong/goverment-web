import React, { useEffect, useState } from 'react';

import {
	Autocomplete,
	Box,
	BoxProps,
	Button,
	TextField,
	Typography,
} from '@mui/material';
import SupportiModal from '../../../global/SupportiModal';
import SupportiButton from '../../../global/SupportiButton';

import SupportiToggle from '../../../global/SupportiToggle';
import { AppMemberController } from '../../../../controller/AppMemberController';
import { useRouter } from 'next/router';
import axios from 'axios';
import { CookieManager } from '@leanoncompany/supporti-utility';
import {
	businessSector,
	businessType,
	companyHistory,
	investSector,
	lastYearSales,
} from '../../../../../configs/data/BusinessConfig';
import { gTagEvent } from '../../../../lib/gtag';
import SupportiInput from '../../../global/SupportiInput';
import dayjs from 'dayjs';

interface IAppMemberUpdateModalProps {
	open: boolean;
	handleClose: () => void;
	appMemberData: any;
	needPhoneUpdate?: boolean;
	accessToken: string;
}

//* 소셜로그인 추가정보 입력용 모달

const AppMemberUpdateModal = (props: IAppMemberUpdateModalProps) => {
	//* Modules
	const appMemberController = new AppMemberController();
	const router = useRouter();
	const cookie = new CookieManager();
	//* State
	/**
	 * 탭
	 */
	const [tabs, setTabs] = useState<string>('BUSINESS');
	/**
	 * 회원가입 정보
	 */
	const [signupData, setSignupData] = useState<any>();
	const [isNone, setIsNone] = React.useState<boolean>(false); // IR파일 없음으로 체크했을 경우 판별
	/**
	 * 사업가 정보
	 */
	const [businessData, setBusinessData] = useState<{
		ESTABLISHMENT_DATE: any;
		BUSINESS_SECTOR: string;
		BUSINESS_NUMBER: any;
		COMPANY_NAME: string;
		CORPORATE_TYPE: string;
		ROLE: string;
		OWNER_NAME: string;
		INVESTMENT_ROUND: string;
		MAIN_PRODUCT: string;
		INVESTMENT_COMPANY: string;
		REVENUE: string;
		IR_FILE: any;
	}>();
	/**
	 * 인증번호 암호화
	 */
	const [encrypted, setEncrypted] = React.useState<string>('');
	/**
	 * 인증번호
	 */
	const [verifyNumber, setVerifyNumber] = React.useState<string>();
	/**
	 * 인증 여부
	 */
	const [isVerified, setIsVerified] = React.useState<string>('NOT_YET');
	const [isBusinessNumOk, setIsBusinessNumOk] =
		React.useState<string>('NOT_YET');
	const [phoneNumDuplication, setPhoneNumDuplication] =
		React.useState<boolean>(false);

	const [isShowError, setIsShowError] = React.useState<boolean>(false); // 미입력 데이터 표시 on/off
	/**
	 * ir deck 파일
	 */
	const [irDeckFile, setIrDeckFile] = React.useState<any>({
		FILE_NAME: '',
		FILE_URL: '',
	});

	/**
	 *
	 * 필요 서비스
	 */
	const [needService, setNeedService] = React.useState<string[]>([]);

	/**
	 * 필요 서비스 목 데이터
	 */
	const dataList = [
		'경영 지표 관리',
		'사업계획서',
		'소프트웨어 개발',
		'AI 노코드',
		'정부지원사업',
		'투자 유치',
		'마케팅/브랜딩',
		'HR',
		'글로벌 진출',
		'세무/노무/특허/법률',
	];

	//* Functions
	/**
	 * 알림톡 발송
	 */
	const sendAlimTalk = () => {
		if (signupData == undefined) {
			alert('휴대폰번호를 입력해주세요.');
			return;
		} else {
			appMemberController.sendAuthCode(
				{
					PHONE_NUMBER: signupData,
				},
				(res) => {
					setEncrypted(res.data.result);
					setPhoneNumDuplication(false);
				},
				(err) => {
					alert(err);
					// setPhoneNumDuplication(true);
				}
			);
		}
	};
	/**
	 * 인증번호 확인
	 */
	const verifyAuthCode = () => {
		if (!verifyNumber) return alert('인증번호를 입력해주세요.');
		appMemberController.checkAuthCode(
			{
				ENCRYPTED_AUTH_CODE: encrypted,
				AUTH_CODE: verifyNumber,
			},
			(res) => {
				if (res.data.result) {
					// 인증번호 일치
					setIsVerified('OK');
				}
			},
			(err) => {
				setIsVerified('NOT_OK');
			}
		);
	};
	/**
	 * 사업가 번호 체크
	 */
	const businessNumCheck = () => {
		if (!businessData?.BUSINESS_NUMBER)
			return alert('사업자 등록번호를 입력해주세요.');
		axios
			.post(
				`https://api.odcloud.kr/api/nts-businessman/v1/status?serviceKey=${process.env.NEXT_PUBLIC_SERVICE_KEY}&returnType=JSON`,
				{
					b_no: [`${businessData.BUSINESS_NUMBER}`],
				},
				{
					headers: {
						'Content-Type': 'application/json',
						Accept: 'application/json',
					},
				}
			)
			.then((res) => {
				//정부 res
				const resData = res.data.data[0].tax_type;
				if (
					resData === '국세청에 등록되지 않은 사업자등록번호입니다.'
				) {
					setIsBusinessNumOk('NOT_OK');
					return;
				} else {
					setIsBusinessNumOk('OK');
				}
			});
	};

	/**
	 * 회원 정보 업데이트
	 */
	const updateAppMemberForBusiness = () => {
		if (signupData.length != 11)
			return alert('올바른 전화번호를 입력해주세요.');

		if (
			!businessData.BUSINESS_SECTOR ||
			!businessData.COMPANY_NAME ||
			!businessData.MAIN_PRODUCT ||
			(!isNone && irDeckFile.FILE_URL == '') ||
			needService?.length == 0 ||
			!businessData.REVENUE ||
			!businessData.ESTABLISHMENT_DATE ||
			!businessData.INVESTMENT_COMPANY ||
			!businessData.INVESTMENT_ROUND ||
			!businessData.OWNER_NAME ||
			!businessData.ROLE ||
			!businessData.CORPORATE_TYPE ||
			!businessData.BUSINESS_NUMBER
		)
			return alert('모든 정보를 입력해주세요.');

		appMemberController.updateMemberInfo(
			{
				FIND_OPTION_KEY_LIST: {
					APP_MEMBER_IDENTIFICATION_CODE:
						props.appMemberData.APP_MEMBER_IDENTIFICATION_CODE,
				},
				UPDATE_OPTION_KEY_LIST: {
					PHONE_NUMBER: signupData,
					USER_GRADE: tabs,
				},
				BUSINESS_SECTOR: businessData.BUSINESS_SECTOR,
				BUSINESS_NUMBER: businessData.BUSINESS_NUMBER,
				COMPANY_NAME: businessData.COMPANY_NAME,
				CORPORATE_TYPE: businessData.CORPORATE_TYPE,
				ROLE: businessData.ROLE,
				OWNER_NAME: businessData.OWNER_NAME,
				INVESTMENT_ROUND: businessData.INVESTMENT_ROUND,
				MAIN_PRODUCT: businessData.MAIN_PRODUCT,
				INVESTMENT_COMPANY: businessData.INVESTMENT_COMPANY,
				ESTABLISHMENT_DATE: businessData.ESTABLISHMENT_DATE,
				REVENUE: businessData.REVENUE,
				NEEDED_SERVICE: JSON.stringify(needService),
				IR_FILE: JSON.stringify(irDeckFile),
				PHONE_NUMBER: signupData,
				USER_GRADE: tabs,
				APP_MEMBER_IDENTIFICATION_CODE:
					props.appMemberData.APP_MEMBER_IDENTIFICATION_CODE,
			},
			(res) => {
				gTagEvent({
					action: 'social_sign_up_complete',
					category: tabs,
					label: tabs,
					value: 1,
				});
				cookie.setItemInCookies('ACCESS_TOKEN', props.accessToken, {
					path: '/',
					maxAge: 3600 * 24 * 30,
				});
				alert('회원 정보가 업데이트 되었습니다.');
				router.push('/');
			},
			(err) => {
				alert('회원 정보 업데이트에 실패하였습니다.');
			}
		);
	};

	const updateAppMemberForGeneral = () => {
		if (signupData.length != 11)
			return alert('올바른 전화번호를 입력해주세요.');

		if (
			!businessData.BUSINESS_SECTOR ||
			!businessData.OWNER_NAME ||
			!businessData.COMPANY_NAME ||
			!businessData.MAIN_PRODUCT ||
			(!isNone && businessData.IR_FILE.FILE_URL == '')
		)
			return alert('모든 정보를 입력해주세요.');

		appMemberController.updateMemberInfo(
			{
				FIND_OPTION_KEY_LIST: {
					APP_MEMBER_IDENTIFICATION_CODE:
						props.appMemberData.APP_MEMBER_IDENTIFICATION_CODE,
				},
				UPDATE_OPTION_KEY_LIST: {
					PHONE_NUMBER: signupData,
					USER_GRADE: tabs,
				},
				BUSINESS_SECTOR: businessData.BUSINESS_SECTOR,
				COMPANY_NAME: businessData.COMPANY_NAME,
				MAIN_PRODUCT: businessData.MAIN_PRODUCT,
				OWNER_NAME: businessData.OWNER_NAME,
				IR_FILE: JSON.stringify(businessData.IR_FILE),
				PHONE_NUMBER: signupData,
				USER_GRADE: tabs,
				APP_MEMBER_IDENTIFICATION_CODE:
					props.appMemberData.APP_MEMBER_IDENTIFICATION_CODE,
			},
			(res) => {
				gTagEvent({
					action: 'social_sign_up_complete',
					category: tabs,
					label: tabs,
					value: 1,
				});
				cookie.setItemInCookies('ACCESS_TOKEN', props.accessToken, {
					path: '/',
					maxAge: 3600 * 24 * 30,
				});
				alert('회원 정보가 업데이트 되었습니다.');

				router.push('/');
			},
			(err) => {
				alert('회원 정보 업데이트에 실패하였습니다.');
			}
		);
	};

	//* Constants
	const signupDataConfig = [
		{
			label: '휴대폰번호',
			type: 'number',
			for: ['BUSINESS', 'GENERAL'],
			// optional: props.needPhoneUpdate,
			// endAdornment: (
			// 	<Button
			// 		variant="contained"
			// 		sx={{
			// 			backgroundColor: '#d1d1d1',
			// 		}}
			// 		onClick={() => {
			// 			console.log('sendAlimTalk', signupData);
			// 			sendAlimTalk();
			// 		}}
			// 		disabled={isVerified === 'OK'}
			// 	>
			// 		<Typography variant="body2" color={'white'} width={100}>
			// 			인증 받기
			// 		</Typography>
			// 	</Button>
			// ),
			value: signupData,
			isVerified: isVerified,
			onChange: (e) => {
				setSignupData(e.target.value);
			},
			// error: phoneNumDuplication,
			// helperText: phoneNumDuplication
			// 	? '이미 가입된 휴대폰번호입니다.'
			// 	: '',
		},
		// {
		// 	label: '인증번호',
		// 	type: 'text',
		// 	for: ['BUSINESS', 'GENERAL'],
		// 	nolabel: true,
		// 	isVerified: isVerified,
		// 	endAdornment: (
		// 		<Button
		// 			variant="contained"
		// 			disabled={isVerified === 'OK'}
		// 			sx={{
		// 				backgroundColor: '#d1d1d1',
		// 			}}
		// 			onClick={() => verifyAuthCode()}
		// 		>
		// 			<Typography variant="body2" color={'white'}>
		// 				인증
		// 			</Typography>
		// 		</Button>
		// 	),
		// 	helperText:
		// 		isVerified === 'NOT_OK'
		// 			? '인증번호가 일치하지 않습니다.'
		// 			: isVerified === 'OK' && '인증되었습니다.',
		// 	value: verifyNumber,
		// 	error: isVerified === 'NOT_OK',
		// 	onChange: (e) => {
		// 		setVerifyNumber(e.target.value);
		// 	},
		// },
	];

	/**
	 * 비즈니스 데이터
	 */
	const businessDataConfig = [
		{
			label: '사업자 등록번호',
			type: 'text',
			for: 'BUSINESS',
			value: businessData?.BUSINESS_NUMBER,
			onChange: (e) => {
				setBusinessData({
					...businessData,
					BUSINESS_NUMBER: e.target.value,
				});
			},
			endAdornment: (
				<Button
					variant="contained"
					sx={{
						backgroundColor: '#d1d1d1',
					}}
					onClick={() => businessNumCheck()}
				>
					<Typography variant="body2" color={'white'}>
						인증
					</Typography>
				</Button>
			),
			isVerified: isBusinessNumOk === 'OK',
			error: isBusinessNumOk === 'NOT_OK',
			helperText:
				isBusinessNumOk === 'NOT_OK'
					? '사업자 등록번호가 올바르지 않습니다.'
					: isBusinessNumOk === 'OK'
					? '인증되었습니다.'
					: '',
		},
		{
			label: '사업자 유형',
			for: 'BUSINESS',
			config: businessType,
			key: 'CORPORATE_TYPE',
			type: 'select',
			optional: true,
			value: businessData?.CORPORATE_TYPE,
			onChange: (e) => {
				setBusinessData({
					...businessData,
					CORPORATE_TYPE: e.target.value,
				});
			},
			error: isShowError && !businessData?.CORPORATE_TYPE,
		},
		{
			label: '업종/업태',
			for: ['BUSINESS', 'GENERAL'],
			type: 'select',
			config: businessSector,
			value: businessData?.BUSINESS_SECTOR,
			onChange: (e) => {
				setBusinessData({
					...businessData,
					BUSINESS_SECTOR: e.target.value,
				});
			},
		},
		{
			label: '직책',
			type: 'text',
			for: ['BUSINESS'],
			value: businessData?.ROLE,
			onChange: (e) => {
				setBusinessData({
					...businessData,
					ROLE: e.target.value,
				});
			},
			error: isShowError && !businessData?.ROLE,
		},
		{
			label: '기업명',
			type: 'text',
			for: ['BUSINESS', 'GENERAL'],
			value: businessData?.COMPANY_NAME,
			onChange: (e) => {
				setBusinessData({
					...businessData,
					COMPANY_NAME: e.target.value,
				});
			},
		},
		{
			label: '대표자명',
			type: 'text',
			// optional: true,
			for: [isBusinessNumOk === 'OK' ? 'BUSINESS' : 'INVESTOR'],
			value: businessData?.OWNER_NAME,
			onChange: (e) => {
				setBusinessData({
					...businessData,
					OWNER_NAME: e.target.value,
				});
			},
			error: isShowError && !businessData?.OWNER_NAME,
		},
		{
			label: '서비스명(또는 아이템 한 줄 소개)',
			type: 'text',
			// optional: true,
			for: ['BUSINESS', 'GENERAL'],
			value: businessData?.MAIN_PRODUCT,
			onChange: (e) => {
				setBusinessData({
					...businessData,
					MAIN_PRODUCT: e.target.value,
				});
			},
			error: isShowError && !businessData?.MAIN_PRODUCT,
		},
		{
			label: '최근 투자라운드',
			for: 'BUSINESS',
			config: investSector,
			key: 'INVESTMENT_ROUND',
			type: 'select',
			// optional: true,
			value: businessData?.INVESTMENT_ROUND,
			onChange: (e) => {
				setBusinessData({
					...businessData,
					INVESTMENT_ROUND: e.target.value,
				});
			},
			error: isShowError && !businessData?.INVESTMENT_ROUND,
		},
		{
			label: '최근 투자사',
			type: 'text',
			// optional: true,
			for: ['BUSINESS'],
			placeholder: 'ex) 비공개, xx 투자',
			value: businessData?.INVESTMENT_COMPANY,
			onChange: (e) => {
				setBusinessData({
					...businessData,
					INVESTMENT_COMPANY: e.target.value,
				});
			},
			error: isShowError && !businessData?.INVESTMENT_COMPANY,
		},
		{
			label: '설립연도/월',
			for: 'BUSINESS',
			config: companyHistory,
			key: 'ESTABLISHMENT_DATE',
			optional: true,
			type: 'datepicker',
			value: businessData?.ESTABLISHMENT_DATE,
			onChange: (e) => {
				setBusinessData({
					...businessData,
					ESTABLISHMENT_DATE: e.target.value,
				});
			},
			error: isShowError && !businessData?.ESTABLISHMENT_DATE,
		},
		{
			label: '전년도 매출',
			for: 'BUSINESS',
			config: lastYearSales,
			key: 'REVENUE',
			optional: true,
			type: 'select',
			value: businessData?.REVENUE,
			onChange: (e) => {
				setBusinessData({
					...businessData,
					REVENUE: e.target.value,
				});
			},
			error: isShowError && !businessData?.REVENUE,
		},
		{
			label: 'IR자료(또는 사업 계획서)',
			type: 'file',
			for: ['BUSINESS', 'GENERAL'],
			value: businessData?.IR_FILE,
			onChange: (e) => {
				setBusinessData({
					...businessData,
					IR_FILE: e.target.value,
				});
			},
			error: !isNone && isShowError && irDeckFile?.FILE_URL == '',
		},

		{
			label: '서포티 필요항목 (중복 선택 가능)',
			type: 'text',
			// helperText: '서포티 서비스 이용시 필요한 항목을 선택해주세요.',
			for: ['BUSINESS'],
			dataList: dataList,
			value: needService,
		},
	];

	const generalDataConfig = [
		{
			label: '예상 업종/업태',
			for: ['BUSINESS', 'GENERAL'],
			type: 'select',
			config: businessSector,
			value: businessData?.BUSINESS_SECTOR,
			onChange: (e) => {
				setBusinessData({
					...businessData,
					BUSINESS_SECTOR: e.target.value,
				});
			},
		},
		{
			label: '예상 기업명',
			type: 'text',
			for: ['BUSINESS', 'GENERAL'],
			value: businessData?.COMPANY_NAME,
			onChange: (e) => {
				setBusinessData({
					...businessData,
					COMPANY_NAME: e.target.value,
				});
			},
		},
		{
			label: '대표자명',
			type: 'text',
			// optional: true,
			for: ['BUSINESS', 'GENERAL'],
			value: businessData?.OWNER_NAME,
			onChange: (e) => {
				setBusinessData({
					...businessData,
					OWNER_NAME: e.target.value,
				});
			},
			error: isShowError && !businessData?.OWNER_NAME,
		},
		{
			label: '예상 서비스명(또는 아이템 한 줄 소개)',
			type: 'text',
			// optional: true,
			for: ['BUSINESS', 'GENERAL'],
			value: businessData?.MAIN_PRODUCT,
			onChange: (e) => {
				setBusinessData({
					...businessData,
					MAIN_PRODUCT: e.target.value,
				});
			},
			error: isShowError && !businessData?.MAIN_PRODUCT,
		},

		{
			label: 'IR자료(또는 사업 계획서)',
			type: 'file',
			for: ['BUSINESS', 'GENERAL'],
			value: businessData?.IR_FILE,
			onChange: (e) => {
				setBusinessData({
					...businessData,
					IR_FILE: e.target.value,
				});
			},
			error: !isNone && isShowError && irDeckFile?.FILE_URL == '',
		},
	];

	const finalDataConfig = () => {
		let finalData = [];
		if (tabs === 'BUSINESS') {
			if (props.needPhoneUpdate) {
				finalData = [...signupDataConfig, ...businessDataConfig];
			} else {
				finalData = businessDataConfig;
			}
		} else {
			if (props.needPhoneUpdate) {
				finalData = [...signupDataConfig, ...generalDataConfig];
			} else {
				finalData = generalDataConfig;
			}
		}
		return finalData;
	};

	React.useEffect(() => {
		setBusinessData({
			...businessData,
			IR_FILE: irDeckFile,
		});

		if (irDeckFile.FILE_URL != '') {
			setIsNone(false);
		} else setIsNone(true);
	}, [irDeckFile]);

	React.useEffect(() => {
		if (isNone) {
			setBusinessData({
				...businessData,
				IR_FILE: '[]',
			});
			setIrDeckFile({
				FILE_NAME: '',
				FILE_URL: '',
			});
		} else {
			setBusinessData({
				...businessData,
				IR_FILE: irDeckFile,
			});
		}
	}, [isNone]);

	return (
		<SupportiModal
			open={props.open}
			handleClose={() => {
				props.handleClose();
			}}
			activeHeader={true}
			title="유저 정보 업데이트"
			style={{
				minWidth: '40%',
				width: { sm: 'fit-content', xs: '100%' },
				maxHeight: '90vh',
				overflow: 'auto',
			}}
		>
			<Box
				width={'100%'}
				display={'flex'}
				flexDirection={'column'}
				my={2}
			>
				{/* 토글 */}
				<Box width={'100%'}>
					<SupportiToggle
						chipDataList={[
							{
								label: '기창업자',
								value: 'BUSINESS',
							},
							{
								label: '예비창업자',
								value: 'GENERAL',
							},
						]}
						value={tabs}
						setValue={(value) => {
							setTabs(value as string);
						}}
					/>
				</Box>
			</Box>
			<Box mb={3} width={'100%'}>
				{finalDataConfig().map((item, idx) => {
					return (
						<Box
							key={idx}
							alignItems={'center'}
							width={'100%'}
							mt={!item.nolabel && 2}
						>
							<Typography
								fontWeight={600}
								mb={item.label === '설립연도/월' && 1}
							>
								{/* {tabs === 'GENERAL' && '예상 '} */}
								{!item.nolabel && item.label}
							</Typography>
							{item.label.includes('업종/업태') ? (
								<Autocomplete
									size="small"
									options={businessSector}
									fullWidth
									onChange={(e, newValue) => {
										setBusinessData({
											...businessData,
											BUSINESS_SECTOR: newValue,
										});
									}}
									value={item.value}
									renderInput={(params) => (
										<TextField
											{...params}
											sx={{
												mt: 1,
												'& .MuiAutocomplete-input': {
													padding: '8px !important',
												},
											}}
										/>
									)}
								/>
							) : item.type == 'select' ? (
								<Autocomplete
									size="small"
									options={item.config}
									fullWidth
									onChange={(e, newValue) => {
										setBusinessData({
											...businessData,
											[item.key]: newValue,
										});
									}}
									value={item.value}
									renderInput={(params) => (
										<TextField
											{...params}
											error={item.error}
											sx={{
												mt: 1,
												'& .MuiAutocomplete-input': {
													padding: '8px !important',
												},
											}}
										/>
									)}
								/>
							) : item.label === '설립연도/월' ? (
								<SupportiInput
									type={item.type ? item.type : 'text'}
									value={businessData?.ESTABLISHMENT_DATE}
									setValue={(value) => {
										setBusinessData({
											...businessData,
											ESTABLISHMENT_DATE:
												dayjs(value).format(
													'YYYY-MM-DD'
												),
										});
									}}
									additionalProps={{
										views: ['month', 'year'],
										sx: {
											mt: 1,
										},
										placeholder: item.placeholder
											? item.placeholder
											: `${item.label}을 입력해주세요.`,
									}}
								/>
							) : // : item.label === '설립연도/월' ? (
							// <SupportiInput
							// 	type={
							// 		item.type
							// 			? item.type
							// 			: 'text'
							// 	}
							// 	value={
							// 		signupData.ESTABLISHMENT_DATE
							// 	}
							// 	setValue={(
							// 		value
							// 	) => {
							// 		setSignupData({
							// 			...signupData,
							// 			ESTABLISHMENT_DATE:
							// 				dayjs(
							// 					value
							// 				).format(
							// 					'YYYY-MM-DD'
							// 				),
							// 		});
							// 	}}
							// 	additionalProps={{
							// 		placeholder:
							// 			item.placeholder
							// 				? item.placeholder
							// 				: `${item.label}을 입력해주세요.`,
							// 	}}
							// />
							// <SupportiInput
							// 	type={item.type ? item.type : 'text'}
							// 	value={businessData.ESTABLISHMENT_DATE}
							// 	setValue={(value) => {
							// 		setBusinessData({
							// 			...businessData,
							// 			ESTABLISHMENT_DATE:
							// 				dayjs(value).format(
							// 					'YYYY-MM-DD'
							// 				),
							// 		});
							// 	}}
							// 	additionalProps={{
							// 		views: ['month', 'year'],
							// 		defaultValue: undefined,
							// 		placeholder: item.placeholder
							// 			? item.placeholder
							// 			: `${item.label}을 입력해주세요.`,
							// 	}}
							// />
							// )
							item.label ===
							  '서포티 필요항목 (중복 선택 가능)' ? (
								<Box>
									{/* <Typography my={2}>
										선택 : {needService}
									</Typography> */}
									<Box
										display={'flex'}
										gap={2}
										flexWrap="wrap"
										my={2}
									>
										{item?.dataList?.map((item, index) => {
											return (
												<Typography
													fontWeight={
														needService.includes(
															item
														) && 700
													}
													sx={{
														p: 1,
														borderRadius: 4,
														border: '1px solid #d1d1d1',
														cursor: 'pointer',
														color: needService.includes(
															item
														)
															? 'primary.main'
															: 'common.black',
													}}
													onClick={() => {
														if (
															needService.includes(
																item
															)
														) {
															setNeedService(
																needService?.filter(
																	(data) =>
																		data !==
																		item
																)
															);
														} else {
															setNeedService([
																...needService,
																item,
															]);
														}
													}}
												>
													{item}
												</Typography>
											);
										})}
										{/* <Typography color="secondary.main">
										(
										{
											item.helperText
										}
										)
									</Typography> */}
									</Box>
								</Box>
							) : item.label === 'IR자료(또는 사업 계획서)' ? (
								<Box
									display={'flex'}
									flexDirection={'column'}
									gap={2}
									mt={2}
								>
									<Box>
										<SupportiInput
											type="fileinput"
											value={irDeckFile}
											error={item.error}
											setValue={setIrDeckFile}
											fileTypeInputName
											fileTypeInputNameMaxSize={{
												unit: 'MB',
												size: 200,
											}}
											additionalProps={{
												inputProps: {
													accept: '.pdf, .ppt, .hwp, .pcdx, .zip',
												},
												placeholer:
													'ppt, pdf, hwp, pcdx, zip (200mb이하)',
											}}
										/>
										<Typography
											variant="caption"
											fontWeight={'600'}
											sx={{
												wordBreak: 'keep-all',
											}}
											color={'grey'}
										>
											* PDF 형식을 권장드립니다. (ppt,
											pdf, hwp, pcdx, zip (200mb이하))
										</Typography>
										<Box display="flex">
											<SupportiInput
												type="checkbox"
												value={isNone}
												setValue={setIsNone}
											/>
											<Typography
												mt="auto"
												mb="auto"
												ml={-2.5}
												fontWeight={500}
												variant="body1"
											>
												없음
											</Typography>
										</Box>
									</Box>
								</Box>
							) : (
								<TextField
									type={item.type}
									value={item.value}
									onChange={item.onChange}
									error={item?.error}
									focused={item.isVerified === 'NOT_OK'}
									disabled={
										item.isVerified == 'OK' &&
										item.value === verifyNumber
									}
									color={
										item.isVerified === 'OK'
											? 'primary'
											: 'secondary'
									}
									fullWidth
									InputProps={{
										endAdornment: item.endAdornment,
									}}
									helperText={item?.helperText}
									sx={{
										mt: 1,
									}}
									placeholder={`${item.label} 입력`}
								/>
							)}
						</Box>
					);
				})}
			</Box>
			<SupportiButton
				contents={'저장하기'}
				isGradient={true}
				fullWidth={true}
				onClick={() => {
					setIsShowError(true);

					if (props.needPhoneUpdate) {
						if (!signupData || signupData?.length < 11)
							return alert('정확한 휴대폰번호를 입력해주세요.');
					}
					// if (props.needPhoneUpdate && isVerified !== 'OK')
					// 	return alert('휴대폰번호 인증을 해주세요.');
					if (tabs === 'BUSINESS') {
						if (isBusinessNumOk === 'NOT_OK') {
							return alert('사업자 등록번호를 확인해주세요.');
						}
						updateAppMemberForBusiness();
					} else {
						updateAppMemberForGeneral();
					}
				}}
				style={{ color: 'white' }}
			/>
		</SupportiModal>
	);
};

export default AppMemberUpdateModal;
