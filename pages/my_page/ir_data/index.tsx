import React, { use, useEffect } from 'react';

import { NextPage } from 'next';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

import {
	Box,
	BoxProps,
	FormControlLabel,
	Grid,
	IconButton,
	Switch,
	Tooltip,
	Typography,
} from '@mui/material';
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import DefaultController from '@leanoncompany/supporti-ark-office-project/src/controller/default/DefaultController';
import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import dayjs from 'dayjs';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import CommentIcon from '@mui/icons-material/Comment';
import moment from 'moment';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { IUserIRData } from '../../../src/@types/model';
import { gTagEvent } from '../../../src/lib/gtag';
import InternalServiceDrawer from '../../../src/views/local/internal_service/common/InternalServiceDrawer';
import SupportiButton from '../../../src/views/global/SupportiButton';
import SupportiInput from '../../../src/views/global/SupportiInput';
import MultiImageUploader from '@leanoncompany/supporti-ark-office-project/src/ui/local/input/MultiImageUploader/MultiImageUploader';
import Nodata from '../../../src/views/global/NoData/NoData';
import SupportiModal from '../../../src/views/global/SupportiModal';
import { useAppMember } from '../../../src/hooks/useAppMember';
import {
	businessSector,
	businessType,
	investSector,
	lastYearSales,
} from '../../../configs/data/BusinessConfig';

export interface IInvestInfoType {
	DATE?: any;
	INVEST_AMOUNT?: string;
	INVESTOR?: string;
	INVEST_LEVEL?: string;
	VALUE?: string;
}

const Page: NextPage = () => {
	//* Controller
	const userIrInformationController = new DefaultController(
		'UserIrInformation'
	);
	const irCommentController = new DefaultController('IrComment');
	//* Modules
	const { memberId, memberType } = useAppMember();
	const router = useRouter();
	//* Constants
	const selectableIndicatorList = [
		// {
		// 	name: '데모데이',
		// 	path: '/internal_service/ir/demoday',
		// },
		// {
		// 	name: 'IR 데이터',
		// 	path: '/internal_service/ir/management',
		// },
	];

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

	// 투자 라운드
	const hopeInvestRound = [
		{
			label: '사업화지원 단계 (예비창업자)',
			value: '사업화지원 단계 (예비창업자)',
		},
		{
			label: '엔젤투자 시리즈',
			value: '엔젤투자 시리즈',
		},
		{
			label: 'SEED 시리즈',
			value: 'SEED 시리즈',
		},
		{
			label: 'Pre-A 시리즈',
			value: 'Pre-A 시리즈',
		},
		{
			label: 'A 시리즈',
			value: 'A 시리즈',
		},
		{
			label: 'B 시리즈',
			value: 'B 시리즈',
		},
		{
			label: 'C 시리즈',
			value: 'C 시리즈',
		},
	];

	// 투자 연혁 존재 여부
	const [existInvestment, setExistInvestment] =
		React.useState<boolean>(false);

	const companyInfoConfig = [
		{
			label: '사업자등록번호',
			value: 'BUSINESS_NUMBER',
			required: memberType === 'BUSINESS' ? true : false,
			placeholder: '-를 제외한 숫자만 입력해주세요.',
		},
		{
			label: '대표자명',
			value: 'CEO_NAME',
			required: memberType === 'BUSINESS' ? true : false,
		},
		{
			label: '기업명',
			value: 'COMPANY_NAME',
			required: true,
		},
		{
			label: '업종/업태',
			value: 'BUSINESS_SECTOR',
			type: 'select',
			required: true,
			options: businessSector.map((item) => {
				return { label: item, value: item };
			}),
			placeholder: '사업자등록증 상의 업종을 입력해주세요.',
		},
		{
			label: '설립연도/월',
			value: 'ESTABLISHMENT_DATE',
			type: 'datepicker',
			required: memberType === 'BUSINESS' ? true : false,
		},
		{
			label: '사업자 유형',
			value: 'CORPORATE_TYPE',
			type: 'select',
			options: businessType.map((item) => {
				return { label: item, value: item };
			}),
			required: memberType === 'BUSINESS' ? true : false,
		},
		{
			label: '직책',
			value: 'ROLE',
			required: memberType === 'BUSINESS' ? true : false,
		},

		// {
		// 	label: '회사소재지',
		// 	value: 'COMPANY_ADDRESS',
		// },
		// {
		// 	label: '홈페이지',
		// 	value: 'HOME_PAGE',
		// },
		// {
		// 	label: '휴대폰번호',
		// 	value: 'CONTACT_NUMBER',
		// 	required: true,
		// 	placeholder: '-를 제외한 숫자만 입력해주세요.',
		// },
		// {
		// 	label: '필요 항목',
		// 	value: 'NEEDED_SERVICE',
		// 	required: memberType === 'BUSINESS' ? true : false,
		// 	placeholder: '서포티 서비스 이용시 필요한 항목을 선택해주세요.',
		// },
	];

	const companyInfoConfigForGeneral = [
		// {
		// 	label: '사업자등록번호',
		// 	value: 'BUSINESS_NUMBER',
		// 	required: memberType === 'BUSINESS' ? true : false,
		// 	placeholder: '-를 제외한 숫자만 입력해주세요.',
		// },
		// {
		// 	label: '대표자명',
		// 	value: 'CEO_NAME',
		// 	required: memberType === 'BUSINESS' ? true : false,
		// },
		{
			label: '예상 기업명',
			value: 'COMPANY_NAME',
			required: true,
		},
		{
			label: '예상 업종/업태',
			value: 'BUSINESS_SECTOR',
			type: 'select',
			required: true,
			options: businessSector.map((item) => {
				return { label: item, value: item };
			}),
			placeholder: '사업자등록증 상의 업종을 입력해주세요.',
		},
		// {
		// 	label: '설립연도/월',
		// 	value: 'ESTABLISHMENT_DATE',
		// 	type: 'datepicker',
		// 	required: memberType === 'BUSINESS' ? true : false,
		// },
		// {
		// 	label: '사업자 유형',
		// 	value: 'CORPORATE_TYPE',
		// 	type: 'select',
		// 	options: businessType.map((item) => {
		// 		return { label: item, value: item };
		// 	}),
		// 	required: memberType === 'BUSINESS' ? true : false,
		// },
		// {
		// 	label: '직책',
		// 	value: 'ROLE',
		// 	required: memberType === 'BUSINESS' ? true : false,
		// },

		// {
		// 	label: '회사소재지',
		// 	value: 'COMPANY_ADDRESS',
		// },
		// {
		// 	label: '홈페이지',
		// 	value: 'HOME_PAGE',
		// },
		// {
		// 	label: '휴대폰번호',
		// 	value: 'CONTACT_NUMBER',
		// 	required: true,
		// 	placeholder: '-를 제외한 숫자만 입력해주세요.',
		// },
		// {
		// 	label: '필요 항목',
		// 	value: 'NEEDED_SERVICE',
		// 	required: memberType === 'BUSINESS' ? true : false,
		// 	placeholder: '서포티 서비스 이용시 필요한 항목을 선택해주세요.',
		// },
	];

	// const returnConfig = () => {
	// 	if (memberType === 'BUSINESS') return companyInfoConfig;
	// 	if (memberType === 'GENERAL') return companyInfoConfigForGeneral;
	// };

	// 사업 소개
	const businessIntroductionConfig = [
		{
			label: '서비스명(또는 아이템 한 줄 소개)',
			value: 'MAIN_PRODUCT',
			required: true,
		},
		// {
		// 	label: '설명',
		// 	value: 'DESCRIPTION',
		// 	additionalProps: {
		// 		multiline: true,
		// 		rows: 4,
		// 	},
		// },
	];

	// 투자 정보
	const investInfoConfig = [
		{
			label: '최근 투자라운드',
			value: 'INVESTMENT_ROUND',
			type: 'select',
			options: investSector.map((item) => {
				return { label: item, value: item };
			}),
			required: memberType === 'BUSINESS' ? true : false,
		},
		{
			label: '최근 투자사',
			value: 'INVESTMENT_COMPANY',
			required: memberType === 'BUSINESS' ? true : false,
			placeholder: 'ex) 비공개, xx 투자',
		},
		{
			label: '전년도 매출',
			value: 'REVENUE',
			type: 'select',
			options: lastYearSales.map((item) => {
				return { label: item, value: item };
			}),
			required: memberType === 'BUSINESS' ? true : false,
		},
		// {
		// 	label: '희망 투자 유치 단계',
		// 	value: 'HOPE_INVEST_ROUND',
		// 	required: true,
		// 	type: 'select',
		// 	options: hopeInvestRound,
		// },
		// {
		// 	label: '희망 투지유치 금액(억단위)',
		// 	value: 'HOPE_INVEST_MONEY',
		// 	type: 'text',
		// },
	];

	// 투자 연혁
	const investHistoryConfig = [
		{
			label: '투자금액',
			value: 'INVEST_AMOUNT',
			nolabel: true,
			variant: 'h6',
			fontWeight: 'bold',
			isMoney: true,
		},
		{
			label: '투자일자',
			value: 'DATE',
			type: 'datepicker',
			nolabel: true,
			color: 'grey',
			fontWeight: '600',
			variant: 'body2',
		},
		{
			label: '투자기관',
			value: 'INVESTOR',
		},
		{
			label: '투자단계',
			value: 'INVEST_LEVEL',
		},
		{
			label: '기업가치',
			value: 'VALUE',
		},
	];

	//* States
	/**
	 * ir deck 파일
	 */
	const [irDeckFile, setIrDeckFile] = React.useState<any>({
		FILE_NAME: 'ppt, pdf, hwp, pcdx, zip (200mb이하)',
		FILE_URL: '',
	});
	/**
	 * 사업자 등록증 파일
	 */
	const [businessRegistrationFile, setBusinessRegistrationFile] =
		React.useState<string>('');
	/**
	 * 기업 로고/이미지 리스트
	 */
	const [companyIntroductionImages, setCompanyIntroductionImages] =
		React.useState<string[]>([]);
	/**
	 * 유저 ir 정보
	 */
	const [userIrInfo, setUserIrInfo] = React.useState<IUserIRData>({
		HOPE_INVEST_ROUND: '사업화지원 단계 (예비창업자)',
		OPEN_YN: 'Y',
		ALIMTALK_YN: 'Y',
	});
	/**
	 * 투자 연혁
	 */
	const [investInfo, setInvestInfo] = React.useState<IInvestInfoType[]>([]);
	/**
	 * 새 투자 연혁
	 */
	const [newInvestInfo, setNewInvestInfo] = React.useState<IInvestInfoType>({
		DATE: dayjs().format('YYYY-MM-DD'),
		INVEST_AMOUNT: '',
		INVESTOR: '',
		INVEST_LEVEL: '',
		VALUE: '',
	});
	/**
	 * 수정 여부
	 */
	const [isEdit, setIsEdit] = React.useState<boolean>(false);
	/**
	 * 업데이트 로직 실행 여부
	 */
	// const [isUpdate, setIsUpdate] = React.useState<boolean>(false);

	/**
	 * 코멘트 확인하기
	 */
	const [commentView, setCommentView] = React.useState<boolean>(false);
	/**
	 * 코멘트 리스트
	 */
	const [commentList, setCommentList] = React.useState<any[]>([]);
	/**
	 *
	 * 필요 서비스
	 */
	const [needService, setNeedService] = React.useState<string[]>([]);

	/**
	 * 딥테크 여부
	 */
	const [deepTech, setDeepTech] = React.useState<'Y' | 'N'>('N');
	/**
	 * 딥테크 설명 모달
	 */
	const [deepTechModal, setDeepTechModal] = React.useState<boolean>(false);

	const [isNone, setIsNone] = React.useState<boolean>(false); // IR파일 없음으로 체크했을 경우 판별

	//* Functions
	/**
	 * 유저 ir 정보 가져오기
	 */
	const getUserIrInfo = () => {
		userIrInformationController.getOneItemByKey(
			{
				APP_MEMBER_IDENTIFICATION_CODE: memberId,
			},
			(res) => {
				if (res.data.result) {
					setUserIrInfo(res.data.result);
					setIrDeckFile(JSON.parse(res.data.result.IR_FILE));
					setCompanyIntroductionImages(
						JSON.parse(res.data.result.IMAGE_LIST)
					);

					setNeedService(JSON.parse(res.data.result.NEEDED_SERVICE));

					setInvestInfo(JSON.parse(res.data.result.INVEST_INFO));
					setDeepTech(res.data.result.DEEP_TECH_YN);
					// setIsUpdate(true);
				} else {
					// setIsUpdate(false);
				}
			},
			(err) => {}
		);
	};

	/**
	 * 필수 입력 항목 체크
	 */
	const checkRequired = () => {
		if (memberType === 'GENERAL') {
			if (
				(!isNone && irDeckFile.FILE_URL == '') ||
				!userIrInfo.COMPANY_NAME ||
				!userIrInfo.BUSINESS_SECTOR ||
				!userIrInfo.MAIN_PRODUCT
				// !userIrInfo.CONTACT_NUMBER
			) {
				alert('필수 입력 항목을 입력해주세요.');
				return false;
			}
		}
		if (memberType === 'BUSINESS') {
			if (
				(!isNone && irDeckFile.FILE_URL == '') ||
				!userIrInfo.BUSINESS_NUMBER ||
				!userIrInfo.CEO_NAME ||
				!userIrInfo.COMPANY_NAME ||
				!userIrInfo.BUSINESS_SECTOR ||
				!userIrInfo.ESTABLISHMENT_DATE ||
				// !userIrInfo.CONTACT_NUMBER ||
				!userIrInfo.MAIN_PRODUCT ||
				!userIrInfo.INVESTMENT_COMPANY ||
				!userIrInfo.INVESTMENT_ROUND ||
				!userIrInfo.NEEDED_SERVICE ||
				!userIrInfo.REVENUE ||
				!userIrInfo.CORPORATE_TYPE ||
				!userIrInfo.ROLE ||
				needService?.length == 0
			) {
				alert('필수 입력 항목을 입력해주세요.');
				return false;
			}
		}

		return true;
	};
	/**
	 * 유저 ir 정보 등록하기
	 */
	const createUserIrInfo = () => {
		if (checkRequired() === false) {
			return;
		}
		userIrInformationController.createItem(
			{
				APP_MEMBER_IDENTIFICATION_CODE: memberId,
				...userIrInfo,
				IR_FILE: JSON.stringify(irDeckFile),
				IMAGE_LIST: JSON.stringify(companyIntroductionImages),
				INVEST_INFO: JSON.stringify(investInfo),
				DEEP_TECH_YN: deepTech,
			},
			(res) => {
				// if (res.data.result) {
				// 	alert('성공적으로 등록되었습니다.');
				// 	setIsUpdate(true);
				// 	setIsEdit(false);
				// }
				gTagEvent({
					action: 'ir_modify',
					category: '생성',
					label: '생성',
					value: 1,
				});
				alert('성공적으로 등록되었습니다.');
				setIsEdit(false);
				getUserIrInfo();
			},
			(err) => {}
		);
	};
	/**
	 * 유저 ir 정보 업데이트하기
	 */
	const updateUserIrInfo = () => {
		if (checkRequired() === false) {
			return;
		}
		console.log('updateUserIrInfo');
		userIrInformationController.updateItem(
			{
				APP_MEMBER_IDENTIFICATION_CODE: memberId,
				...userIrInfo,
				IR_FILE: JSON.stringify(irDeckFile),
				NEEDED_SERVICE: JSON.stringify(needService),
				IMAGE_LIST: JSON.stringify(companyIntroductionImages),
				INVEST_INFO: JSON.stringify(investInfo),
				DEEP_TECH_YN: deepTech,
			},
			(res) => {
				if (res.data.result) {
					gTagEvent({
						action: 'ir_modify',
						category: '수정',
						label: '수정',
						value: 1,
					});
					alert('성공적으로 업데이트되었습니다.');
					setIsEdit(false);
					getUserIrInfo();
				}
			},
			(err) => {}
		);
	};

	/**
	 * 코멘트 리스트 가져오기
	 */
	const getCommentList = () => {
		irCommentController.findAllItems(
			{
				USER_IR_INFORMATION_IDENTIFICATION_CODE:
					userIrInfo.USER_IR_INFORMATION_IDENTIFICATION_CODE,
			},
			(res) => {
				setCommentList(res.data.result.rows);
			},
			(err) => {}
		);
	};

	//* Hooks
	useEffect(() => {
		if (memberId) {
			getUserIrInfo();
		}
	}, [memberId]);

	// useEffect(() => {
	// 	if (isUpdate) {
	// 		getCommentList();
	// 	}
	// }, [isUpdate]);

	useEffect(() => {
		if (isNone) {
			setUserIrInfo({
				...userIrInfo,
				IR_FILE: '[]',
			});
			setIrDeckFile({
				FILE_NAME: '',
				FILE_URL: '',
			});
		} else {
			setUserIrInfo({
				...userIrInfo,
				IR_FILE: irDeckFile,
			});
		}
	}, [isNone]);

	return (
		// <InternalServiceDrawer type="dashboard">
		<Box bgcolor={'primary.light'} sx={{ p: { xs: 2, md: 5 } }}>
			{/* 컨텐츠 레이아웃 */}
			<InternalServiceDrawer type="mypage">
				<Box
					width={'100%'}
					// p={{
					// 	xs: 2,
					// 	md: 10,
					// }}
					bgcolor={'primary.light'}
				>
					{/* 지표 (재무지표/법인계좌관리) 선택 영역 */}
					<Box display={'flex'} gap={3} mb={2}>
						{selectableIndicatorList.map((selectableIndicator) => (
							<Typography
								variant="h5"
								fontWeight={'700'}
								onClick={() => {
									router.push(selectableIndicator.path);
								}}
								sx={{
									wordBreak: 'keep-all',
									color:
										router.pathname ===
										selectableIndicator.path
											? 'primary.main'
											: 'grey',
									cursor: 'pointer',
								}}
							>
								{selectableIndicator.name}
							</Typography>
						))}
					</Box>
					<Typography variant="h4" fontWeight={'bold'} sx={{ mb: 3 }}>
						내 IR 데이터
					</Typography>
					{/* 컨텐츠 */}
					<Box
						display={'flex'}
						flexDirection={'column'}
						width={'100%'}
					>
						{/* 타이틀 */}
						<Box
							display={'flex'}
							justifyContent={'space-between'}
							alignItems={'center'}
							mb={1}
						>
							<Box>
								{/* <Typography
								variant="h3"
								fontWeight={'bold'}
								sx={{ mb: 2 }}
							>
								IR 관리
							</Typography> */}
								{/* <Typography
									color={'secondary.dark'}
									sx={{ mb: 2 }}
								>
									IR Deck, 기업 정보를 관리할 수 있습니다.
								</Typography> */}
							</Box>
							<Box display={'flex'} alignItems={'center'} gap={2}>
								<SupportiButton
									variant="outlined"
									contents={
										<Box
											display={'flex'}
											alignItems={'center'}
											gap={1}
										>
											<CreateOutlinedIcon fontSize="small" />
											<Typography
												fontWeight={'bold'}
												color={'primary'}
												sx={{
													wordBreak: 'keep-all',
												}}
											>
												{isEdit
													? '저장하기'
													: '수정하기'}
											</Typography>
										</Box>
									}
									onClick={() => {
										if (!memberId) {
											alert('로그인 후 이용해주세요.');
											return;
										}
										if (isEdit) {
											updateUserIrInfo();

											// if (isUpdate) {
											// 	updateUserIrInfo();
											// } else {
											// 	createUserIrInfo();
											// }
										} else {
											setIsEdit(!isEdit);
											setCommentView(false);
										}
									}}
									disabledGutters
									style={{
										px: 2,
										py: 1,
										bgcolor: 'white',
									}}
								/>
							</Box>
						</Box>
						{/* 본문 */}
						<Grid container gap={1}>
							<Grid item xs={12} sm={commentView ? 8 : 12}>
								<Box
									bgcolor={'white'}
									width={'100%'}
									borderRadius={3}
									p={4}
								>
									{/* 공개여부, 알림톡 여부 */}
									<Box
										display={'flex'}
										flexDirection={'column'}
									>
										<Typography
											fontWeight={'600'}
											display={'flex'}
											mb={0.5}
											sx={{
												wordBreak: 'keep-all',
											}}
										>
											공개여부, 알림톡 여부
										</Typography>
										<Typography
											variant="body2"
											color={'grey'}
											fontWeight={'600'}
											sx={{
												wordBreak: 'keep-all',
												lineHeight: '120%',
											}}
										>
											지금 대표님의 IR자료를 통해
											투자자분들에게 투자받을 기회를
											얻어보세요! 아쉽게 투자를 받지
											못했더라도 IR데이터에 대한 피드백
											코멘트를 받으실 수 있습니다. (알림톡
											수신 동의시 코멘트가 달리면 알림톡이
											발송 됩니다.)
										</Typography>
										<Box
											display={'flex'}
											mt={1}
											justifyContent={'space-between'}
											alignItems={'center'}
										>
											<Box display={'flex'}>
												{/* <FormControlLabel
													value="end"
													control={
														<Switch
															checked={
																userIrInfo.OPEN_YN ===
																'Y'
															}
															onChange={(e) => {
																isEdit &&
																	setUserIrInfo(
																		{
																			...userIrInfo,
																			OPEN_YN:
																				e
																					.target
																					.checked
																					? 'Y'
																					: 'N',
																		}
																	);
															}}
														/>
													}
													label="자료 공개"
													labelPlacement="start"
												/> */}
												<FormControlLabel
													value="end"
													control={
														<Switch
															checked={
																userIrInfo.COMMENT_ALIMTALK_YN ===
																'Y'
															}
															onChange={(e) => {
																isEdit &&
																	setUserIrInfo(
																		{
																			...userIrInfo,
																			COMMENT_ALIMTALK_YN:
																				e
																					.target
																					.checked
																					? 'Y'
																					: 'N',
																		}
																	);
															}}
														/>
													}
													label="알림톡 수신"
													labelPlacement="start"
												/>
											</Box>
											{userIrInfo.OPEN_YN === 'Y' &&
												!isEdit && (
													<IconButton
														sx={{
															display: 'flex',
															alignItems:
																'center',
														}}
														onClick={() =>
															setCommentView(
																!commentView
															)
														}
													>
														<CommentIcon />
														<Typography ml={1}>
															코멘트 확인하기
														</Typography>
													</IconButton>
												)}
										</Box>
									</Box>

									{/* IR deck */}
									<Box
										display={'flex'}
										flexDirection={'column'}
										gap={2}
										mt={2}
									>
										<Typography
											fontWeight={'600'}
											display={'flex'}
											sx={{
												wordBreak: 'keep-all',
											}}
										>
											IR자료 (또는 사업 계획서){' '}
											{isEdit && (
												<Typography
													fontWeight={'600'}
													color={'primary'}
												>
													(필수)
												</Typography>
											)}
										</Typography>
										{isEdit ? (
											<Box>
												<SupportiInput
													type="fileinput"
													value={irDeckFile}
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
													}}
												/>
												<Typography
													variant="subtitle2"
													fontWeight={'600'}
													color={'grey'}
													mt={1}
													sx={{
														wordBreak: 'keep-all',
													}}
												>
													제작년도 / 기업명 / 파일형식
													/ 페이지 수 형식으로 업로드
													부탁드립니다. (예시 :
													2024/린온컴퍼니/PDF/25)
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
										) : irDeckFile?.length === 0 ||
										  irDeckFile.FILE_URL == '' ? (
											<Box
												p={2}
												boxShadow={
													'rgb(219, 219, 219) 0px 4px 10px'
												}
												borderRadius={2}
											>
												<Typography>
													업로드된 파일이 없습니다.
												</Typography>
											</Box>
										) : (
											<Box
												p={2}
												boxShadow={
													'rgb(219, 219, 219) 0px 4px 10px'
												}
												borderRadius={2}
												justifyContent={'space-between'}
												display={'flex'}
												alignItems={'center'}
											>
												<Typography
													fontWeight={'600'}
													sx={{
														wordBreak: 'keep-all',
													}}
												>
													{irDeckFile.FILE_NAME}
												</Typography>
												<DownloadForOfflineIcon
													onClick={() => {
														window.open(
															irDeckFile.FILE_URL,
															'_blank'
														);
													}}
													sx={{
														cursor: 'pointer',
													}}
												/>
											</Box>
										)}
									</Box>

									{/** 서포티 내 필요 항목 */}

									{memberType === 'BUSINESS' && (
										<Box
											display={'flex'}
											flexDirection={'column'}
											gap={2}
											mt={3}
										>
											<Typography
												fontWeight={'600'}
												display={'flex'}
												mt={0.5}
												gap={0.5}
												sx={{
													wordBreak: 'keep-all',
												}}
											>
												서포티 내 필요 항목
												{isEdit && (
													<span
														style={{
															color: 'blue',
														}}
													>
														(필수)
													</span>
												)}
											</Typography>
											{isEdit ? (
												<Box>
													<Box
														display={'flex'}
														gap={2}
														flexWrap="wrap"
														my={1}
													>
														{dataList?.map(
															(item, index) => {
																return (
																	<Typography
																		fontWeight={
																			needService.includes(
																				item
																			) &&
																			700
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
																					needService.filter(
																						(
																							value
																						) =>
																							value !=
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
																				console.log(
																					item
																				);
																			}
																			console.log(
																				needService
																			);
																		}}
																	>
																		{item}
																	</Typography>
																);
															}
														)}
													</Box>
												</Box>
											) : (
												<Typography
													sx={{
														wordBreak: 'keep-all',
														lineHeight: '20px',
													}}
													color={'grey'}
													fontWeight={'600'}
												>
													{needService?.length != 0
														? JSON.stringify(
																needService
														  )
														: '없음'}
												</Typography>
											)}
										</Box>
									)}
									{/* 기업 정보 */}
									<Box mt={2}>
										<Typography
											fontWeight={'600'}
											variant="subtitle1"
										>
											기업 정보
										</Typography>
										<Grid
											container
											display={'flex'}
											gap={1}
											mt={2}
										>
											{/* <Grid
												item
												sm={5.9}
												display={'flex'}
												xs={12}
												flexDirection={'column'}
											>
												<Typography
													fontWeight={'600'}
													color={'grey'}
													variant="body1"
												>
													딥테크여부
													<IconButton
														size="small"
														onClick={() =>
															setDeepTechModal(
																true
															)
														}
													>
														<HelpOutlineIcon fontSize="small" />
													</IconButton>
												</Typography>
												<Switch
													checked={deepTech === 'Y'}
													onChange={(e) => {
														isEdit &&
															setDeepTech(
																e.target.checked
																	? 'Y'
																	: 'N'
															);
													}}
												/>
											</Grid> */}

											{companyInfoConfig.map(
												(item, index) => {
													return (
														<Grid
															item
															key={index}
															sm={5.9}
															xs={12}
															display={
																memberType ===
																'BUSINESS'
																	? 'show'
																	: 'none'
															}
														>
															<Typography
																fontWeight={
																	'600'
																}
																sx={{
																	wordBreak:
																		'keep-all',
																}}
																color={'grey'}
																variant="body1"
																my={1}
															>
																{item.label}{' '}
																{item.required &&
																	isEdit && (
																		<span
																			style={{
																				color: 'blue',
																			}}
																		>
																			(필수)
																		</span>
																	)}
															</Typography>
															{isEdit ? (
																item.type ===
																'select' ? (
																	<SupportiInput
																		type={
																			item.type
																		}
																		value={
																			userIrInfo[
																				item
																					.value
																			]
																		}
																		setValue={(
																			value
																		) => {
																			setUserIrInfo(
																				{
																					...userIrInfo,
																					[item.value]:
																						value,
																				}
																			);
																		}}
																		additionalProps={{
																			placeholder: `${item.label}을 입력해주세요.`,
																		}}
																		dataList={
																			item.options
																		}
																	/>
																) : item.label ===
																  '설립연도/월' ? (
																	<SupportiInput
																		type={
																			item.type
																				? item.type
																				: 'text'
																		}
																		value={
																			userIrInfo.ESTABLISHMENT_DATE
																		}
																		setValue={(
																			value
																		) => {
																			setUserIrInfo(
																				{
																					...userIrInfo,
																					ESTABLISHMENT_DATE:
																						dayjs(
																							value
																						).format(
																							'YYYY-MM-DD'
																						),
																				}
																			);
																		}}
																		additionalProps={{
																			views: [
																				'month',
																				'year',
																			],
																			placeholder:
																				item.placeholder
																					? item.placeholder
																					: `${item.label}을 입력해주세요.`,
																		}}
																	/>
																) : (
																	<SupportiInput
																		type={
																			item.type
																				? item.type
																				: 'text'
																		}
																		value={
																			userIrInfo[
																				item
																					.value
																			]
																		}
																		setValue={(
																			value
																		) => {
																			setUserIrInfo(
																				{
																					...userIrInfo,
																					[item.value]:
																						item.type ===
																						'datepicker'
																							? dayjs(
																									value
																							  ).format(
																									'YYYY-MM-DD'
																							  )
																							: value,
																				}
																			);
																		}}
																		additionalProps={{
																			placeholder:
																				item.placeholder
																					? item.placeholder
																					: `${item.label}을 입력해주세요.`,
																		}}
																	/>
																)
															) : (
																<Typography
																	fontWeight={
																		'600'
																	}
																	sx={{
																		wordBreak:
																			'keep-all',
																	}}
																	color={
																		userIrInfo[
																			item
																				.value
																		]
																			? 'black'
																			: 'grey'
																	}
																	py={1}
																>
																	{userIrInfo[
																		item
																			.value
																	]
																		? item.label ===
																		  '설립연도/월'
																			? userIrInfo[
																					item
																						.value
																			  ]
																					.split(
																						'T'
																					)[0]
																					.split(
																						'-'
																					)[0] +
																			  '-' +
																			  userIrInfo[
																					item
																						.value
																			  ]
																					.split(
																						'T'
																					)[0]
																					.split(
																						'-'
																					)[1]
																			: userIrInfo[
																					item
																						.value
																			  ]
																		: '없음'}
																</Typography>
															)}
														</Grid>
													);
												}
											)}

											{companyInfoConfigForGeneral.map(
												(item, index) => {
													return (
														<Grid
															item
															key={index}
															sm={5.9}
															xs={12}
															display={
																memberType ==
																'BUSINESS'
																	? 'none'
																	: 'show'
															}
														>
															<Typography
																fontWeight={
																	'600'
																}
																sx={{
																	wordBreak:
																		'keep-all',
																}}
																color={'grey'}
																variant="body1"
																my={1}
															>
																{item.label}{' '}
																{item.required &&
																	isEdit && (
																		<span
																			style={{
																				color: 'blue',
																			}}
																		>
																			(필수)
																		</span>
																	)}
															</Typography>
															{isEdit ? (
																item.type ===
																'select' ? (
																	<SupportiInput
																		type={
																			item.type
																		}
																		value={
																			userIrInfo[
																				item
																					.value
																			]
																		}
																		setValue={(
																			value
																		) => {
																			setUserIrInfo(
																				{
																					...userIrInfo,
																					[item.value]:
																						value,
																				}
																			);
																		}}
																		additionalProps={{
																			placeholder: `${item.label}을 입력해주세요.`,
																		}}
																		dataList={
																			item.options
																		}
																	/>
																) : item.label ===
																  '설립연도/월' ? (
																	<SupportiInput
																		type={
																			item.type
																				? item.type
																				: 'text'
																		}
																		value={
																			userIrInfo.ESTABLISHMENT_DATE
																		}
																		setValue={(
																			value
																		) => {
																			setUserIrInfo(
																				{
																					...userIrInfo,
																					ESTABLISHMENT_DATE:
																						dayjs(
																							value
																						).format(
																							'YYYY-MM-DD'
																						),
																				}
																			);
																		}}
																		additionalProps={{
																			views: [
																				'month',
																				'year',
																			],
																			placeholder:
																				item.placeholder
																					? item.placeholder
																					: `${item.label}을 입력해주세요.`,
																		}}
																	/>
																) : (
																	<SupportiInput
																		type={
																			item.type
																				? item.type
																				: 'text'
																		}
																		value={
																			userIrInfo[
																				item
																					.value
																			]
																		}
																		setValue={(
																			value
																		) => {
																			setUserIrInfo(
																				{
																					...userIrInfo,
																					[item.value]:
																						item.type ===
																						'datepicker'
																							? dayjs(
																									value
																							  ).format(
																									'YYYY-MM-DD'
																							  )
																							: value,
																				}
																			);
																		}}
																		additionalProps={{
																			placeholder:
																				item.placeholder
																					? item.placeholder
																					: `${item.label}을 입력해주세요.`,
																		}}
																	/>
																)
															) : (
																<Typography
																	fontWeight={
																		'600'
																	}
																	sx={{
																		wordBreak:
																			'keep-all',
																	}}
																	color={
																		userIrInfo[
																			item
																				.value
																		]
																			? 'black'
																			: 'grey'
																	}
																	py={1}
																>
																	{userIrInfo[
																		item
																			.value
																	]
																		? item.label ===
																		  '설립연도/월'
																			? userIrInfo[
																					item
																						.value
																			  ]
																					.split(
																						'T'
																					)[0]
																					.split(
																						'-'
																					)[0] +
																			  '-' +
																			  userIrInfo[
																					item
																						.value
																			  ]
																					.split(
																						'T'
																					)[0]
																					.split(
																						'-'
																					)[1]
																			: userIrInfo[
																					item
																						.value
																			  ]
																		: '없음'}
																</Typography>
															)}
														</Grid>
													);
												}
											)}
										</Grid>
									</Box>
									{/* 사업 소개 */}
									<Box mt={2}>
										<Typography
											fontWeight={'600'}
											variant="subtitle1"
										>
											사업 소개
										</Typography>
										<Grid
											container
											display={'flex'}
											gap={1}
											mt={2}
										>
											{businessIntroductionConfig.map(
												(item, index) => {
													return (
														<Grid
															item
															key={index}
															xs={12}
															display={'flex'}
															gap={4}
														>
															<Typography
																fontWeight={
																	'600'
																}
																sx={{
																	wordBreak:
																		'keep-all',
																}}
																color={'grey'}
																variant="body1"
																width={
																	'fit-content'
																}
															>
																{memberType ===
																	'GENERAL' &&
																	'예상 '}
																{item.label}{' '}
																{item.required &&
																	isEdit && (
																		<span
																			style={{
																				color: 'blue',
																			}}
																		>
																			(필수)
																		</span>
																	)}
															</Typography>
															{isEdit ? (
																<Box
																	width={
																		'100%'
																	}
																>
																	<SupportiInput
																		type="text"
																		value={
																			userIrInfo[
																				item
																					.value
																			]
																		}
																		setValue={(
																			value
																		) => {
																			setUserIrInfo(
																				{
																					...userIrInfo,
																					[item.value]:
																						value,
																				}
																			);
																		}}
																		additionalProps={{
																			placeholder: `${item.label}을 입력해주세요.`,
																			// ...item.additionalProps,
																			fullWidth:
																				true,
																		}}
																		style={{
																			width: '100% !important',
																		}}
																	/>
																</Box>
															) : (
																<Typography
																	fontWeight={
																		'600'
																	}
																	sx={{
																		wordBreak:
																			'keep-all',
																	}}
																	color={
																		userIrInfo[
																			item
																				.value
																		]
																			? 'black'
																			: 'grey'
																	}
																>
																	{userIrInfo[
																		item
																			.value
																	]
																		? userIrInfo[
																				item
																					.value
																		  ]
																				.split(
																					'\n'
																				)
																				.map(
																					(
																						item,
																						index
																					) => {
																						return (
																							<Typography
																								sx={{
																									wordBreak:
																										'keep-all',
																									lineHeight:
																										'20px',
																								}}
																								fontWeight={
																									'600'
																								}
																							>
																								{
																									item
																								}
																							</Typography>
																						);
																					}
																				)
																		: '없음'}
																</Typography>
															)}
														</Grid>
													);
												}
											)}
										</Grid>
										{/* 이미지 */}
										{/* <Box mt={2} display={'flex'}>
											<Typography
												fontWeight={'600'}
												color={'grey'}
												variant="body1"
												width={'130px'}
											>
												기업 로고/이미지
											</Typography>
											<Box
												display={'flex'}
												gap={2}
												flexWrap={'wrap'}
											>
												{isEdit ? (
													<MultiImageUploader
														imagePreviewUrlList={
															companyIntroductionImages
														}
														setImagePreviewUrlList={
															setCompanyIntroductionImages
														}
														numOfUploader={3}
														label="이미지"
														inputStatus={{
															status: 'default',
														}}
													/>
												) : (
													companyIntroductionImages.map(
														(item, index) => {
															return (
																<Box
																	width={
																		'150px'
																	}
																	height={
																		'150px'
																	}
																	bgcolor={
																		'grey'
																	}
																	borderRadius={
																		3
																	}
																	sx={{
																		backgroundImage: `url(${item})`,
																		backgroundSize:
																			'cover',
																	}}
																	onClick={() =>
																		window.open(
																			item,
																			'_blank'
																		)
																	}
																/>
															);
														}
													)
												)}
											</Box>
										</Box> */}
									</Box>
									{/* 투자 정보 */}
									<Box
										mt={2}
										display={
											memberType === 'BUSINESS'
												? 'block'
												: 'none'
										}
									>
										<Typography
											fontWeight={'600'}
											variant="subtitle1"
										>
											투자 정보
										</Typography>
										<Grid
											container
											display={'flex'}
											gap={1}
											mt={2}
											mb={2}
										>
											{investInfoConfig.map(
												(item, index) => {
													return (
														<Grid
															item
															key={index}
															sm={5.9}
															xs={12}
														>
															<Typography
																sx={{
																	wordBreak:
																		'keep-all',
																}}
																fontWeight={
																	'600'
																}
																color={'grey'}
																variant="body1"
																my={1}
															>
																{item.label}{' '}
																{item.required &&
																	isEdit && (
																		<span
																			style={{
																				color: 'blue',
																			}}
																		>
																			(필수)
																		</span>
																	)}
															</Typography>
															{isEdit ? (
																<SupportiInput
																	type={
																		item.type
																	}
																	value={
																		userIrInfo[
																			item
																				.value
																		]
																	}
																	setValue={(
																		value
																	) => {
																		setUserIrInfo(
																			{
																				...userIrInfo,
																				[item.value]:
																					value,
																			}
																		);
																	}}
																	additionalProps={{
																		placeholder:
																			item.placeholder
																				? item.placeholder
																				: `${item.label}을 입력해주세요.`,
																	}}
																	dataList={
																		item.options
																	}
																/>
															) : (
																<Typography
																	fontWeight={
																		'600'
																	}
																	sx={{
																		wordBreak:
																			'keep-all',
																	}}
																	color={
																		userIrInfo[
																			item
																				.value
																		]
																			? 'black'
																			: 'grey'
																	}
																	py={1}
																>
																	{userIrInfo[
																		item
																			.value
																	]
																		? item.value ==
																		  'HOPE_INVEST_MONEY'
																			? `${
																					userIrInfo[
																						item
																							.value
																					]
																			  }억원`
																			: userIrInfo[
																					item
																						.value
																			  ]
																		: '없음'}
																</Typography>
															)}
														</Grid>
													);
												}
											)}
										</Grid>
										{/* 투자 연혁 */}
										{/* <Box
											display={'flex'}
											alignItems={'center'}
										>
											{' '}
											<Typography
												fontWeight={'600'}
												color={'grey'}
												variant="body1"
											>
												투자 연혁
											</Typography>
											<ControlPointIcon
												onClick={() => {
													if (
														newInvestInfo.INVEST_AMOUNT ===
															'' ||
														newInvestInfo.INVESTOR ===
															'' ||
														newInvestInfo.INVEST_LEVEL ===
															'' ||
														newInvestInfo.VALUE ===
															''
													) {
														alert(
															'하단의 모든 항목을 입력해주세요.'
														);
														return;
													}

													setInvestInfo([
														...investInfo,
														newInvestInfo,
													]);
													setNewInvestInfo({
														DATE: dayjs().format(
															'YYYY-MM-DD'
														),
														INVEST_AMOUNT: '',
														INVESTOR: '',
														INVEST_LEVEL: '',
														VALUE: '',
													});
												}}
												sx={{
													cursor: 'pointer',
													ml: 'auto',
												}}
											/>
											{!existInvestment && (
												<Typography
													fontWeight={'600'}
													color={'primary'}
												>
													(필수)
												</Typography>
											)}
											<Box display={'flex'}></Box>
										</Box> */}
										{/* {isEdit ? (
											<Grid
												container
												display={'flex'}
												gap={1}
												my={1}
												bgcolor={'primary.light'}
												p={2}
												borderRadius={3}
												position={'relative'}
											>
												{investHistoryConfig.map(
													(item, index) => {
														return (
															<Grid
																item
																key={index}
																display={'flex'}
																alignItems={
																	'center'
																}
																gap={1}
																sm={5.9}
																xs={12}
															>
																<Typography
																	fontWeight={
																		'600'
																	}
																	color={
																		'grey'
																	}
																	variant="body1"
																	width={
																		'50px'
																	}
																>
																	{item.label}
																</Typography>
																<SupportiInput
																	type={
																		item.type
																			? 'datepicker'
																			: 'text'
																	}
																	value={
																		newInvestInfo[
																			item
																				.value
																		]
																	}
																	setValue={(
																		value
																	) => {
																		setNewInvestInfo(
																			{
																				...newInvestInfo,
																				[item.value]:
																					item.type ===
																					'datepicker'
																						? dayjs(
																								value
																						  ).format(
																								'YYYY-MM-DD'
																						  )
																						: value,
																			}
																		);
																	}}
																	additionalProps={{
																		placeholder: `${item.label}을 입력해주세요.`,
																	}}
																/>
															</Grid>
														);
													}
												)}

												<Box display="flex" gap={1}>
													{investInfo.length ===
														0 && (
														<Typography
															sx={{
																cursor: 'pointer',
																position:
																	'absolute',
																right: '10px',
																bottom: '10px',
																textDecoration:
																	'underline',
															}}
															onClick={() =>
																setExistInvestment(
																	!existInvestment
																)
															}
														>
															해당 없음
															<Tooltip
																title={
																	'해당 없음을 클릭하시면 필수 입력 조건에서 투자 연혁이 제외됩니다.'
																}
																arrow
																placement="top"
																slotProps={{
																	popper: {
																		modifiers:
																			[
																				{
																					name: 'offset',
																					options:
																						{
																							offset: [
																								0,
																								-14,
																							],
																						},
																				},
																			],
																	},
																}}
															>
																<IconButton size="small">
																	<HelpOutlineIcon fontSize="small" />
																</IconButton>
															</Tooltip>
														</Typography>
													)}
												</Box>
											</Grid>
										) : null} */}

										{/* <Box mt={1} display={'flex'}>
											<Box
												display={'flex'}
												gap={1}
												sx={{
													overflowX: 'auto',
												}}
											>
												{investInfo.map(
													(item, index) => {
														return (
															<Box
																key={index}
																display={'flex'}
																flexDirection={
																	'column'
																}
																gap={1}
																bgcolor={
																	'primary.light'
																}
																p={2}
																borderRadius={3}
																width={'200px'}
																minWidth={
																	'200px'
																}
																position={
																	'relative'
																}
															>
																{isEdit && (
																	<RemoveCircleOutlineIcon
																		onClick={() => {
																			setInvestInfo(
																				investInfo.filter(
																					(
																						_,
																						filterIndex
																					) => {
																						return (
																							filterIndex !==
																							index
																						);
																					}
																				)
																			);
																		}}
																		sx={{
																			cursor: 'pointer',
																			position:
																				'absolute',
																			right: '10px',
																			top: '10px',
																		}}
																	/>
																)}
																{investHistoryConfig.map(
																	(
																		historyItem,
																		historyIndex
																	) => {
																		return (
																			<Box
																				display={
																					'flex'
																				}
																				gap={
																					1
																				}
																				alignItems={
																					'center'
																				}
																			>
																				{!historyItem.nolabel && (
																					<Typography
																						fontWeight={
																							'600'
																						}
																						color={
																							'grey'
																						}
																						variant="body1"
																						width={
																							'50px'
																						}
																					>
																						{
																							historyItem.label
																						}
																					</Typography>
																				)}
																				<Typography
																					fontWeight={
																						historyItem.fontWeight
																							? historyItem.fontWeight
																							: '600'
																					}
																					color={
																						item[
																							historyItem
																								.value
																						]
																							? historyItem.color
																								? historyItem.color
																								: 'black'
																							: 'grey'
																					}
																					variant={
																						historyItem.variant ===
																							'h6' ||
																						historyItem.variant ===
																							'body2'
																							? historyItem.variant
																							: 'body1'
																					}
																				>
																					{historyItem.isMoney
																						? `${Number(
																								item[
																									historyItem
																										.value
																								]
																						  ).toLocaleString()}원`
																						: item[
																								historyItem
																									.value
																						  ]}
																				</Typography>
																			</Box>
																		);
																	}
																)}
															</Box>
														);
													}
												)}
											</Box>
										</Box> */}
									</Box>
								</Box>
							</Grid>
							<Grid
								item
								xs={12}
								sm={commentView ? 3.9 : 0}
								display={commentView ? 'block' : 'none'}
							>
								<Box
									bgcolor={'white'}
									width={'100%'}
									borderRadius={3}
									p={4}
									minHeight={{ sm: '700px', xs: '0px' }}
									sx={{
										overflowY: 'auto',
									}}
								>
									<Box
										display={'flex'}
										alignItems={'center'}
										justifyContent={'space-between'}
										mb={2}
									>
										<Typography
											fontWeight={'600'}
											display={'flex'}
											mb={0.5}
											sx={{
												wordBreak: 'keep-all',
											}}
										>
											코멘트 리스트
										</Typography>
										<Typography>
											총 {commentList?.length}개
										</Typography>
									</Box>
									<Box
										display={'flex'}
										flexDirection={'column'}
										gap={2}
									>
										{commentList?.length === 0 && (
											<Nodata />
										)}
										{commentList.map((item, index) => {
											return (
												<Box
													p={2}
													borderRadius={3}
													bgcolor={'white'}
													boxShadow={
														'0px 4px 10px rgb(219 219 219)'
													}
												>
													<Box
														display={'flex'}
														justifyContent={
															'space-between'
														}
														alignItems={'center'}
														mb={1.5}
													>
														<Typography
															sx={{
																wordBreak:
																	'keep-all',
															}}
															fontWeight={'600'}
														>
															{item.PartnerMember
																? item
																		.PartnerMember
																		?.FULL_NAME
																: '린온컴퍼니'}
														</Typography>
														<Typography
															fontWeight={'600'}
															color={'grey'}
															sx={{
																wordBreak:
																	'keep-all',
															}}
															variant="body2"
														>
															{moment(
																item.CREATED_AT
															).format(
																'YY/MM/DD hh:mm'
															)}
														</Typography>
													</Box>
													<Box
														display={'flex'}
														gap={1}
														flexDirection={'column'}
													>
														{item.IR_DECK_COMMENT && (
															<Typography
																display={'flex'}
																sx={{
																	wordBreak:
																		'keep-all',
																}}
																flexWrap={
																	'wrap'
																}
																gap={1}
															>
																<Typography
																	fontWeight={
																		'600'
																	}
																	sx={{
																		wordBreak:
																			'keep-all',
																	}}
																>
																	[IR deck]
																</Typography>
																{
																	item.IR_DECK_COMMENT
																}
															</Typography>
														)}
														{item.INVEST_INFO_COMMENT && (
															<Typography
																display={'flex'}
																sx={{
																	wordBreak:
																		'keep-all',
																}}
																flexWrap={
																	'wrap'
																}
																gap={1}
															>
																<Typography
																	fontWeight={
																		'600'
																	}
																	sx={{
																		wordBreak:
																			'keep-all',
																	}}
																>
																	[투자정보]
																</Typography>
																{
																	item.INVEST_INFO_COMMENT
																}
															</Typography>
														)}
													</Box>
												</Box>
											);
										})}
									</Box>
								</Box>
							</Grid>
						</Grid>
					</Box>
				</Box>
			</InternalServiceDrawer>

			<SupportiModal
				open={deepTechModal}
				handleClose={() => setDeepTechModal(false)}
				title="딥테크란?"
				activeHeader
				children={
					<Image
						src={'/images/main/deeptech.png'}
						width={900}
						height={900}
						alt="deeptech"
					/>
				}
			/>
		</Box>
	);
};

export default Page;
