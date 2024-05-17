import React, { useState } from 'react';

import { NextPage } from 'next';

import {
	Autocomplete,
	Box,
	BoxProps,
	Button,
	Divider,
	Step,
	StepLabel,
	Stepper,
	TextField,
	Typography,
} from '@mui/material';
import { IUser } from '../../../src/@types/model';
import { emailRegex, passwordRegex } from '../../../configs/regex/regex';
import SignUpLayout from '../../../src/views/local/sign_up/SignUpLayout';
import SupportiToggle from '../../../src/views/global/SupportiToggle';
import SupportiButton from '../../../src/views/global/SupportiButton';
import { AppMemberController } from '../../../src/controller/AppMemberController';
import { AlimTalkController } from '../../../src/controller/AlimTalkController';
import MultiImageUploader from '@leanoncompany/supporti-ark-office-project/src/ui/local/input/MultiImageUploader/MultiImageUploader';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import {
	businessSector,
	businessType,
	companyHistory,
	investSector,
	lastYearSales,
} from '../../../configs/data/BusinessConfig';
import CheckIcon from '@mui/icons-material/Check';
import { gTagEvent } from '../../../src/lib/gtag';
import SupportiInput from '../../../src/views/global/SupportiInput';

const Page: NextPage = () => {
	//* Modules
	const appMemberController = new AppMemberController();
	const alimTalkController = new AlimTalkController();
	const router = useRouter();
	//* States
	const [signupData, setSignupData] = useState<IUser>({} as IUser);
	const [passwordConfirm, setPasswordConfirm] = useState('');
	const [encrypted, setEncrypted] = React.useState<string>('');
	const [verifyNumber, setVerifyNumber] = React.useState<string>('');
	const [isVerified, setIsVerified] = React.useState<string>('NOT_YET');
	const [tabs, setTabs] = React.useState<string>('BUSINESS');
	const [activeStep, setActiveStep] = React.useState<number>(0);
	const [isBusinessNumOk, setIsBusinessNumOk] =
		React.useState<string>('NOT_YET');
	const [emailDuplication, setEmailDuplication] =
		React.useState<boolean>(undefined);
	const [phoneNumDuplication, setPhoneNumDuplication] =
		React.useState<boolean>(false);
	/**
	 * 명함 이미지 리스트
	 */
	const [businessCardImages, setBusinessCardImages] = React.useState<
		string[]
	>([]);

	/**
	 *
	 * 필요 서비스
	 */
	const [needService, setNeedService] = React.useState<string[]>([]);

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

	console.log(needService);
	//*Functions
	/**
	 * 알림톡 발송
	 */
	const sendAlimTalk = () => {
		if (!signupData.PHONE_NUMBER) return alert('전화번호를 입력해주세요.');
		appMemberController.sendAuthCode(
			{
				PHONE_NUMBER: signupData.PHONE_NUMBER,
			},
			(res) => {
				setEncrypted(res.data.result);
				setPhoneNumDuplication(false);
			},
			(err) => {
				setPhoneNumDuplication(true);
			}
		);
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
		if (!signupData.BUSINESS_NUMBER)
			return alert('사업자 등록번호를 입력해주세요.');
		axios
			.post(
				`https://api.odcloud.kr/api/nts-businessman/v1/status?serviceKey=${process.env.NEXT_PUBLIC_SERVICE_KEY}&returnType=JSON`,
				{
					b_no: [`${signupData.BUSINESS_NUMBER}`],
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
	 *
	 * 이메일 중복 체크
	 */
	const emailCheck = () => {
		appMemberController.checkEmail(
			{
				USER_NAME: signupData.USER_NAME,
			},
			(res) => {
				if (res) {
					setEmailDuplication(!res.data.result);
				}
			},
			(err) => {
				// setEmailDuplication(true);
			}
		);
	};

	/**
	 * 회원가입
	 */
	const signUp = () => {
		if (tabs == 'BUSINESS' && isBusinessNumOk !== 'OK')
			return alert('사업자 등록번호를 확인해주세요.');
		if (!isVerified) return alert('핸드폰 인증을 완료해주세요.');
		if (
			!signupData.USER_NAME ||
			!signupData.FULL_NAME ||
			!signupData.PASSWORD ||
			!signupData.PHONE_NUMBER
		)
			return alert('모든 정보를 입력해주세요.');
		if (signupData.USER_NAME && emailDuplication)
			return alert('중복된 이메일입니다.');
		appMemberController.register(
			{
				...signupData,
				ALIMTALK_YN: 'Y',
				USER_GRADE: tabs,
				BUSINESS_CARD_IMAGE_LIST: JSON.stringify(businessCardImages),
				NEEDED_SERVICE: JSON.stringify(needService),
			},
			(res) => {
				if (res.data.result) {
					gTagEvent({
						action: 'sign_up_complete',
						category: 'sign_up_complete',
						label: tabs,
						value: 1,
					});
					setActiveStep(1);
				}
			},
			(err) => {}
		);
	};

	//* Constants
	const signupDataConfig = [
		{
			label: '이메일',
			type: 'email',
			for: ['BUSINESS', 'GENERAL', 'INVESTOR'],
			value: signupData.USER_NAME,
			onChange: (e) => {
				setSignupData({
					...signupData,
					USER_NAME: e.target.value,
				});
			},
			endAdornment: (
				<Button
					variant="contained"
					sx={{
						backgroundColor: '#d1d1d1',
					}}
					onClick={() => {
						if (
							signupData.USER_NAME &&
							!emailRegex.test(signupData.USER_NAME)
						)
							return alert('정확한 이메일을 입력해주세요!');

						emailCheck();
					}}
				>
					<Typography variant="body2" color={'white'}>
						인증
					</Typography>
				</Button>
			),
			isVerified:
				signupData.USER_NAME &&
				emailRegex.test(signupData.USER_NAME) &&
				emailDuplication !== undefined &&
				!emailDuplication,
			error:
				(signupData.USER_NAME &&
					!emailRegex.test(signupData.USER_NAME)) ||
				(emailDuplication !== undefined && emailDuplication),
			helperText:
				signupData.USER_NAME && !emailRegex.test(signupData.USER_NAME)
					? '이메일 형식이 올바르지 않습니다.'
					: emailDuplication !== undefined && emailDuplication
					? '중복된 이메일입니다.'
					: emailDuplication !== undefined && !emailDuplication
					? '인증되었습니다.'
					: emailDuplication !== undefined &&
					  !emailDuplication &&
					  signupData.USER_NAME === ''
					? ''
					: '',
		},
		{
			label: '이름',
			type: 'text',
			for: ['BUSINESS', 'GENERAL', 'INVESTOR'],
			value: signupData.FULL_NAME,
			onChange: (e) => {
				setSignupData({
					...signupData,
					FULL_NAME: e.target.value,
				});
			},
		},
		{
			label: '비밀번호',
			type: 'password',
			for: ['BUSINESS', 'GENERAL', 'INVESTOR'],
			value: signupData.PASSWORD,
			placeholder:
				'비밀번호 (8~16자의 영문 대소문자, 숫자, 특수문자 조합)',
			onChange: (e) => {
				setSignupData({
					...signupData,
					PASSWORD: e.target.value,
				});
			},
			error:
				signupData.PASSWORD && !passwordRegex.test(signupData.PASSWORD),
			helperText:
				signupData.PASSWORD && !passwordRegex.test(signupData.PASSWORD)
					? '비밀번호 형식이 올바르지 않습니다.'
					: '',
		},
		{
			label: '비밀번호 확인',
			placeholder: '비밀번호 재확인',
			for: ['BUSINESS', 'GENERAL', 'INVESTOR'],
			type: 'password',
			value: passwordConfirm,
			onChange: (e) => {
				setPasswordConfirm(e.target.value);
			},
			error:
				signupData.PASSWORD && signupData.PASSWORD !== passwordConfirm,
			nolabel: true,
			helperText:
				signupData.PASSWORD && signupData.PASSWORD !== passwordConfirm
					? '비밀번호가 일치하지 않습니다.'
					: '',
		},
		{
			label: '사업자 등록번호',
			type: 'text',
			for: 'BUSINESS',
			value: signupData.BUSINESS_NUMBER,
			onChange: (e) => {
				setSignupData({
					...signupData,
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
			placeholder: '사업자 등록번호를 입력해주세요.(-제외)',
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
			label: '사업 분류',
			for: 'BUSINESS',
			config: businessSector,
			key: 'BUSINESS_SECTOR',
			type: 'select',
			value: signupData.BUSINESS_SECTOR,
			onChange: (e) => {
				setSignupData({
					...signupData,
					BUSINESS_SECTOR: e.target.value,
				});
			},
		},
		{
			label: '사업자 유형',
			for: 'BUSINESS',
			config: businessType,
			key: 'CORPORATE_TYPE',
			type: 'select',
			optional: true,
			value: signupData.CORPORATE_TYPE,
			onChange: (e) => {
				setSignupData({
					...signupData,
					CORPORATE_TYPE: e.target.value,
				});
			},
		},
		{
			label: '서비스명',
			type: 'text',
			optional: true,
			for: ['BUSINESS'],
			value: signupData.MAIN_PRODUCT,
			onChange: (e) => {
				setSignupData({
					...signupData,
					MAIN_PRODUCT: e.target.value,
				});
			},
		},
		{
			label: '최근 투자라운드/금액',
			for: 'BUSINESS',
			config: investSector,
			key: 'INVESTMENT_ROUND',
			type: 'select',
			optional: true,
			value: signupData.INVESTMENT_ROUND,
			onChange: (e) => {
				setSignupData({
					...signupData,
					INVESTMENT_ROUND: e.target.value,
				});
			},
		},
		{
			label: '최근 투자사',
			type: 'text',
			optional: true,
			for: ['BUSINESS'],
			placeholder: 'ex) 비공개, xx 투자',
			value: signupData.INVESTMENT_COMPANY,
			onChange: (e) => {
				setSignupData({
					...signupData,
					INVESTMENT_COMPANY: e.target.value,
				});
			},
		},
		{
			label: '업력',
			for: 'BUSINESS',
			config: companyHistory,
			key: 'COMPANY_HISTORY',
			optional: true,
			type: 'select',
			value: signupData.COMPANY_HISTORY,
			onChange: (e) => {
				setSignupData({
					...signupData,
					COMPANY_HISTORY: e.target.value,
				});
			},
		},
		{
			label: '전년도 매출',
			for: 'BUSINESS',
			config: lastYearSales,
			key: 'REVENUE',
			optional: true,
			type: 'select',
			value: signupData.REVENUE,
			onChange: (e) => {
				setSignupData({
					...signupData,
					REVENUE: e.target.value,
				});
			},
		},
		{
			label: '회사 소개',
			type: 'text',
			for: ['BUSINESS'],
			placeholder:
				'ex) 스타트업 성장을 위해 전분야의 솔루션을 제공하는 회사입니다.',

			helperText:
				'어떤 고객에게 어떤 서비스/제품을, 어떤 채널로 판매하여 어떻게 수익을 만드는 기업인지 간단하게 소개해주세요.',
			value: signupData.DESCRIPTION,
			onChange: (e) => {
				setSignupData({
					...signupData,
					DESCRIPTION: e.target.value,
				});
			},
		},
		{
			label: '회사명',
			type: 'text',
			for: ['BUSINESS', 'INVESTOR'],
			value: signupData.COMPANY_NAME,
			onChange: (e) => {
				setSignupData({
					...signupData,
					COMPANY_NAME: e.target.value,
				});
			},
		},
		{
			label: '직책',
			type: 'text',
			for: ['BUSINESS', 'INVESTOR'],
			value: signupData.ROLE,
			onChange: (e) => {
				setSignupData({
					...signupData,
					ROLE: e.target.value,
				});
			},
		},
		{
			label: '필요 서비스',
			type: 'text',
			helperText: '서포티 서비스 이용시 필요한 항목을 선택해주세요.',
			for: ['BUSINESS'],
			dataList: dataList,
			value: needService,
		},
		// {
		// 	label: '필요 서비스',
		// 	helperText: '서포티 서비스 이용시 필요한 항목을 선택해주세요.',
		// 	for: ['BUSINESS'],
		// 	key: 'NEEDED_SERVICE',
		// 	type: 'multiselect',
		// 	format: (value) => {
		// 		return value && JSON.parse(value).join();
		// 	},
		// 	dataList: [
		// 		'경영 지표 관리',
		// 		'사업계획서',
		// 		'소프트웨어 개발',
		// 		'AI 노코드',
		// 		'정부지원사업',
		// 		'투자 유치',
		// 		'마케팅/브랜딩',
		// 		'HR',
		// 		'글로벌 진출',
		// 		'세무/노무/특허/법률',
		// 	],
		// 	handleChange: (event) => {
		// 		const {
		// 			target: { value },
		// 		} = event;
		// 		setSignupData({
		// 			...signupData,
		// 			NEEDED_SERVICE: JSON.stringify(value),
		// 		});
		// 	},
		// },
		{
			label: '전화번호',
			type: 'phone',
			for: ['BUSINESS', 'GENERAL', 'INVESTOR'],
			endAdornment: (
				<Button
					variant="contained"
					sx={{
						backgroundColor: '#d1d1d1',
					}}
					onClick={() => sendAlimTalk()}
					disabled={isVerified === 'OK'}
				>
					<Typography variant="body2" color={'white'} width={100}>
						인증번호 받기
					</Typography>
				</Button>
			),
			value: signupData.PHONE_NUMBER,
			isVerified: isVerified,
			onChange: (e) => {
				setSignupData({
					...signupData,
					PHONE_NUMBER: e.target.value,
				});
			},
			error: phoneNumDuplication,
			helperText: phoneNumDuplication
				? '이미 가입된 전화번호입니다.'
				: '',
		},
		{
			label: '인증번호',
			type: 'text',
			for: ['BUSINESS', 'GENERAL', 'INVESTOR'],
			nolabel: true,
			isVerified: isVerified,
			endAdornment: (
				<Button
					variant="contained"
					disabled={isVerified === 'OK'}
					sx={{
						backgroundColor: '#d1d1d1',
					}}
					onClick={() => verifyAuthCode()}
				>
					<Typography variant="body2" color={'white'}>
						인증
					</Typography>
				</Button>
			),
			helperText:
				isVerified === 'NOT_OK'
					? '인증번호가 일치하지 않습니다.'
					: isVerified === 'OK' && '인증되었습니다.',
			value: verifyNumber,
			error: isVerified === 'NOT_OK',
			onChange: (e) => {
				setVerifyNumber(e.target.value);
			},
		},
		{
			label: '명함 이미지',
			type: 'image',
			for: ['INVESTOR'],
		},
	];

	//* Functions
	//* Hooks
	/**
	 * 탭 변화시 값 초기화
	 */
	React.useEffect(() => {
		setSignupData({} as IUser);
		setPasswordConfirm('');
		setEncrypted('');
		setVerifyNumber('');
		setIsVerified('NOT_YET');
		setIsBusinessNumOk('NOT_YET');
	}, [tabs]);

	return (
		<SignUpLayout>
			<Typography variant="h1" fontWeight={'bold'}>
				서포티 회원가입
			</Typography>
			{/* 토글 */}
			<Box width={'80%'} mt={4} mb={3}>
				<SupportiToggle
					chipDataList={[
						{
							label: '사업가',
							value: 'BUSINESS',
						},
						{
							label: '일반',
							value: 'GENERAL',
						},
						// {
						// 	label: '투자자',
						// 	value: 'INVESTOR',
						// },
					]}
					value={tabs}
					setValue={(value) => {
						setTabs(value as string);
					}}
				/>
			</Box>
			<Typography color={'secondary.main'} variant="h6">
				회원가입하고 서포티를 무료로 이용해보세요.
			</Typography>
			{/* 스테퍼 */}
			<Stepper
				activeStep={activeStep}
				sx={{ width: '90%', mt: 6, mb: 4 }}
			>
				<Step>
					<StepLabel
						sx={{
							fontSize: '1.2rem',
							'& .Mui-active': {
								color: 'primary.main',
								fontSize: '1.2rem',
							},
							'& .Mui-disabled': {
								fontSize: '1.2rem !important',
							},
						}}
					>
						회원 정보
					</StepLabel>
				</Step>
				<Step>
					<StepLabel>가입 완료</StepLabel>
				</Step>
			</Stepper>

			{/* 회원 정보 */}
			{activeStep == 0 ? (
				<Box borderTop={'1px solid #f1f2f5'} pt={5} width={'100%'}>
					<Typography variant="h3">회원정보</Typography>
					<Box my={3} width={'100%'}>
						{signupDataConfig.map((item, idx) => {
							return (
								<Box
									key={idx}
									alignItems={'center'}
									width={'100%'}
									mt={!item.nolabel && 2}
									display={
										item.for.includes(tabs)
											? 'block'
											: 'none'
									}
								>
									<Typography>
										{!item.nolabel && item.label}
									</Typography>

									{item.type == 'select' ? (
										<Autocomplete
											size="small"
											options={item.config}
											fullWidth
											onChange={(e, newValue) => {
												setSignupData({
													...signupData,
													[item.key]: newValue,
												});
											}}
											value={item.value}
											renderInput={(params) => (
												<TextField
													{...params}
													sx={{
														mt: 1,
														'& .MuiAutocomplete-input':
															{
																padding:
																	'8px !important',
															},
													}}
												/>
											)}
										/>
									) : item.type === 'image' ? (
										<Box mt={2}>
											<MultiImageUploader
												imagePreviewUrlList={
													businessCardImages
												}
												setImagePreviewUrlList={
													setBusinessCardImages
												}
												numOfUploader={3}
												label="이미지"
												inputStatus={{
													status: 'default',
												}}
											/>
										</Box>
									) : item.label === '필요 서비스' ? (
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
												{item.dataList.map(
													(item, index) => {
														return (
															<Typography
																mr={2}
																sx={{
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
																			needService.filter(
																				(
																					data
																				) =>
																					data !==
																					item
																			)
																		);
																	} else {
																		setNeedService(
																			[
																				...needService,
																				item,
																			]
																		);
																	}
																}}
															>
																{item}
															</Typography>
														);
													}
												)}
												<Typography color="secondary.main">
													({item.helperText})
												</Typography>
											</Box>
										</Box>
									) : (
										<TextField
											type={item.type}
											value={item.value}
											onChange={item.onChange}
											error={item.error}
											focused={
												item.isVerified === 'NOT_OK'
											}
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
											helperText={item.helperText}
											sx={{
												mt: 1,
											}}
											placeholder={
												item.placeholder
													? item.placeholder
													: `${item.label} 입력`
											}
										/>
									)}
								</Box>
							);
						})}
					</Box>
					<SupportiButton
						isGradient={true}
						contents={'회원가입하기'}
						onClick={() => signUp()}
						fullWidth
						style={{
							color: '#fff',
						}}
					/>
					<Typography sx={{ mt: 4, textAlign: 'center' }}>
						이미 계정이 있나요?{' '}
						<Link
							href="/auth/sign_in"
							style={{
								textDecoration: 'underline',
								color: 'blue',
							}}
						>
							로그인
						</Link>
					</Typography>
				</Box>
			) : (
				<Box
					borderTop={'1px solid #f1f2f5'}
					pt={5}
					width={'100%'}
					display={'flex'}
					flexDirection={'column'}
					justifyContent={'center'}
					alignItems={'center'}
				>
					<Typography variant="h3">회원가입을 환영합니다!</Typography>
					<Typography
						variant="h5"
						color={'secondary.main'}
						sx={{ mt: 2 }}
					>
						서포티와 함께 편하게 사업을 관리하세요!
					</Typography>
					<SupportiButton
						isGradient={true}
						contents={'로그인하러가기'}
						onClick={() => router.push('/auth/sign_in')}
						fullWidth
						style={{
							color: '#fff',
							mt: 4,
						}}
					/>
				</Box>
			)}
		</SignUpLayout>
	);
};

export default Page;
