import React from 'react';

import { NextPage } from 'next';

import {
	Box,
	BoxProps,
	Grid,
	Typography,
	IconButton,
	Tooltip,
} from '@mui/material';
import { useRouter } from 'next/router';
import { SupportBusinessManagementController } from '../../../../src/controller/SupportBusinessManagementController';
import { InternalServiceLayout } from '../../../../src/views/layout/InternalServiceLayout';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import CheckIcon from '@mui/icons-material/Check';
import SupportiButton from '../../../../src/views/global/SupportiButton';
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import InsertLinkOutlinedIcon from '@mui/icons-material/InsertLinkOutlined';
import moment from 'moment';
import SubsidyByItemTable from '../../../../src/views/local/internal_service/supportBusiness/SubsidyByItemTable/SubsidyByItemTable';
import SupportiInput from '../../../../src/views/global/SupportiInput';
import dayjs from 'dayjs';
import SupportBusinessModal from '../../../../src/views/local/internal_service/supportBusiness/SupportBusinessModal';
import SupportiTable from '../../../../src/views/global/SupportiTable';
import Nodata from '../../../../src/views/global/NoData/NoData';
import MobileTableRow from '../../../../src/views/local/external_service/mobileTableRow/MobileTableRow';
import DefaultController from '@leanoncompany/supporti-ark-office-project/src/controller/default/DefaultController';
import { useAppMember } from '../../../../src/hooks/useAppMember';
import SupportFileAddModal from '../../../../src/views/local/internal_service/government/SupportFileAddModal/SupportFileAddModal';
import { TableHeaderProps } from '../../../../src/views/global/SupportiTable/SupportiTable';
import { supportRoute } from '../../../../configs/data/SupportBusinessConfig';
import addCommaToNumber from '../../../../src/function/DataFormatter/addCommaToNumber';

const Page: NextPage = () => {
	//* Modules
	const { pid } = useRouter().query;
	const router = useRouter();

	//* Controller
	const supportBusinessManagementController =
		new SupportBusinessManagementController();
	const fileGuidelineController = new DefaultController(
		'SupportBusinessFileManagement'
	);
	const userFileController = new DefaultController(
		'UserSupportBusinessFileManagement'
	);
	const supportContentController = new DefaultController(
		'SupportBusinessManagementContent'
	); // 지원내용

	//* States
	/**
	 * 지원사업 상세
	 */
	const [supportBusinessManagement, setSupportBusinessManagement] =
		React.useState<any>();

	/**
	 * 지원사업 내용
	 */
	const [businessDescription, setBusinessDescription] =
		React.useState(undefined);
	/**
	 * 항목별 지원금 탭
	 */
	const [subsidyTab, setSubsidyTab] = React.useState<string>('총 금액');
	/**
	 * 수정모드
	 */
	const [editMode, setEditMode] = React.useState<boolean>(false);
	/**
	 * 디테일 모달
	 */
	const [detailModal, setDetailModal] = React.useState<boolean>(false);
	/**
	 * 디테일 데이터
	 */
	const [detailData, setDetailData] = React.useState<any>();

	// 항목
	const [phaseData, setPhaseData] = React.useState<any>();

	const [phaseType, setPhaseType] = React.useState<string>(undefined);

	/**
	 * 유저 제출 서류 리스트
	 */
	const [userFileList, setUserFileList] = React.useState([]);

	/**
	 *  모달 오픈 여부
	 */
	const [addFileOpen, setAddFileOpen] = React.useState(false);

	/**
	 * 서류별 가이드라인 리스트
	 */
	const [fileGuidelineList, setFileGuidelineList] = React.useState([]);

	/**
	 * 제출서류 수정 모드
	 */
	const [isEditMode, setIsEditMode] = React.useState(false);

	const descriptions = [
		'마케팅/홍보/프로모션',
		'글로벌',
		'인력/인건비',
		'융자',
		'시설/공간/보육',
		'기술개발(R&D)',
		'사업화',
		'행사/네트워킹',
		'투자유치 및 연계',
		'오픈이노베이션',
		'IR / 데모데이',
		'멘토링/컨설팅/교육',
		'자금지원',
	];

	const [fileId, setFileId] = React.useState('');

	// 제출서류 테이블 헤더
	const fileListHeaderData: TableHeaderProps[] = [
		{
			label: 'NO',
			value: '',
			format: (value, key, idx) => {
				return idx + 1;
			},
			align: 'center',
		},
		{
			label: '제출서류명',
			value: 'SupportBusinessFileManagement.SUBMIT_FILE_NAME',
			customValue: (value) => {
				return value.SupportBusinessFileManagement;
			},
			align: 'center',
			format: (value, key, idx) => {
				return (
					<Box display="flex" alignItems="center" mx={0} px={0}>
						<Typography ml={7}>{value.SUBMIT_FILE_NAME}</Typography>
						<Tooltip
							title={value.GUIDELINE}
							arrow
							placement="top"
							slotProps={{
								popper: {
									modifiers: [
										{
											name: 'offset',
											options: {
												offset: [0, -14],
											},
										},
									],
								},
							}}
						>
							<IconButton
								size="small"
								onClick={() => console.log(value, key, idx)}
							>
								<HelpOutlineIcon fontSize="small" />
							</IconButton>
						</Tooltip>
					</Box>
				);
			},
		},
		{
			label: '필수',
			align: 'center',
			value: 'ESSENTIAL_YN',
			format: (value) => {
				return value === 'Y' ? <CheckIcon fontSize="small" /> : null;
			},
		},
		{
			label: '선택',
			align: 'center',
			value: 'ESSENTIAL_YN',
			format: (value) => {
				return value === 'N' ? <CheckIcon fontSize="small" /> : null;
			},
		},
		{
			label: '준비유무',
			value: 'PREPERATION_YN',
			align: 'center',
			format: (value) => {
				return value === 'Y' && <CheckIcon fontSize="small" />;
				// ?	 (
				// 	<SupportiInput
				// 		type="checkbox"
				// 		value={true}
				// 		setValue={() => {
				// 			console.log('ㅇㅇ');
				// 		}}
				// 	/>
				// ) : (
				// 	<SupportiInput
				// 		type="checkbox"
				// 		value={false}
				// 		setValue={() => {
				// 			console.log('ㅇㅇ');
				// 		}}
				// 	/>
				// );
			},
		},
		{
			label: '담당자',
			value: 'MANAGER',
			align: 'center',
		},
		{
			label: '비고',
			value: 'NOTE',
			align: 'center',
		},
		{
			label: '',
			value: 'USER_SUPPORT_BUSINESS_FILE_MANAGEMENT_IDENTIFICATION_CODE',
			align: 'center',
			format: (value) => {
				return (
					<Box display={'flex'} gap={1}>
						<IconButton
							size="small"
							onClick={() => {
								setIsEditMode(true);
								setAddFileOpen(true);
								setFileId(value);
							}}
						>
							<CreateOutlinedIcon
								fontSize="small"
								sx={{ cursor: 'pointer' }}
							/>
						</IconButton>
						<IconButton
							size="small"
							onClick={() => deleteUserFile(value)}
						>
							<DeleteOutlineOutlinedIcon
								fontSize="small"
								sx={{ cursor: 'pointer' }}
							/>
						</IconButton>
					</Box>
				);
			},
		},
	];

	/**
	 * 지원내용 데이터
	 */
	const [supportContentData, setSupportContentData] =
		React.useState(undefined);

	//* Functions
	/**
	 * 지원사업 상세 조회
	 */
	const getSupportBusiness = () => {
		supportBusinessManagementController.getOneItem(
			{
				SUPPORT_BUSINESS_MANAGEMENT_IDENTIFICATION_CODE: pid,
			},
			(res) => {
				setSupportBusinessManagement(res.data.result);
				setBusinessDescription(
					supportBusinessManagement.BUSINESS_DESCRIPTION
				);
				setPhaseData(
					res.data.result.PHASE === 'PHASE1'
						? phase1Config
						: phase2Config
				);
				setPhaseType(res.data.result.PHASE);
			},
			(err) => {}
		);
	};
	/**
	 * 항목별 지원금 탭 변경
	 */
	const handleSubsidyTabChange = (direction: 'prev' | 'next') => {
		const currentIndex = tabConfig.findIndex(
			(item) => item.label === subsidyTab
		);
		if (direction === 'prev') {
			if (currentIndex === 0) {
				setSubsidyTab(tabConfig[tabConfig.length - 1].label);
			} else {
				setSubsidyTab(tabConfig[currentIndex - 1].label);
			}
		} else {
			if (currentIndex === tabConfig.length - 1) {
				setSubsidyTab(tabConfig[0].label);
			} else {
				setSubsidyTab(tabConfig[currentIndex + 1].label);
			}
		}
	};
	/**
	 * 지원 사업 수정
	 */
	const updateSupportBusiness = () => {
		supportBusinessManagementController.update(
			{ SUPPORT_BUSINESS_MANAGEMENT_IDENTIFICATION_CODE: Number(pid) },
			{
				...supportBusinessManagement,
			},
			(res) => {
				alert('수정되었습니다.');
				setEditMode(false);
				getSupportBusiness();
			},
			(err) => {
				alert('수정에 실패했습니다.');
			}
		);
	};
	/**
	 * 지원 사업 삭제
	 */
	const deleteSupportBusiness = () => {
		const really = confirm('정말 삭제하시겠습니까?');
		if (!really) return;

		supportBusinessManagementController.deleteItem(
			{
				SUPPORT_BUSINESS_MANAGEMENT_IDENTIFICATION_CODE: pid,
			},
			(res) => {
				alert('삭제되었습니다.');
				router.push('/internal_service/government/management');
			},
			(err) => {
				alert('삭제에 실패했습니다.');
			}
		);
	};
	/**
	 * 제출서류 리스트
	 */
	const getUserFile = () => {
		userFileController.findAllItems(
			{
				APP_MEMBER_IDENTIFICATION_CODE: memberId,
				SUPPORT_BUSINESS_MANAGEMENT_IDENTIFICATION_CODE: pid,
			},
			(res) => {
				console.log(res.data.result.rows);
				setUserFileList(res.data.result.rows);
			},
			(err) => {
				console.log(err);
			}
		);
	};

	/**
	 * 제출서류 삭제
	 */
	const deleteUserFile = (id: string) => {
		userFileController.deleteItem(
			{
				USER_SUPPORT_BUSINESS_FILE_MANAGEMENT_IDENTIFICATION_CODE: id,
			},
			(res) => {
				getUserFile();
			},
			(err) => {
				console.log(err);
			}
		);
	};

	//* Hooks
	/**
	 * 유저 아이디
	 */
	const { memberId } = useAppMember();

	React.useEffect(() => {
		/**
		 * 파일 가이드라인 리스트 가져오기
		 */
		fileGuidelineController.findAllItems(
			{},
			(res) => {
				setFileGuidelineList(res.data.result.rows);
			},
			(err) => {
				console.log(err);
			}
		);
		memberId && getUserFile();

		supportContentController.findAllItems(
			{ USED_YN: 'Y' },
			(res) => {
				console.log(res.data.result.rows);
				setSupportContentData(res.data.result.rows);
			},
			(err) => {
				console.log(err);
			}
		);
		if (pid) getSupportBusiness();
	}, [pid, memberId]);

	React.useEffect(() => {
		setSupportBusinessManagement({
			...supportBusinessManagement,
			BUSINESS_DESCRIPTION: businessDescription,
		});
	}, [businessDescription]);

	React.useEffect(() => {
		setBusinessDescription(supportBusinessManagement?.BUSINESS_DESCRIPTION);
	}, [editMode]);

	//* Constants
	const phase1Config = [
		{
			label: '지원 방법',
			key: 'SUPPORT_ROUTE',
			format: (value) => {
				return (
					supportRoute.find((item) => item.value === value)?.label +
					' 제출'
				);
			},
			type: 'select',
			dataList: supportRoute,
		},
		{
			label: '지원 방법 메모',
			key: 'SUPPORT_ROUTE_MEMO',
		},
		{
			label: '지원 사업 내용',
			key: 'BUSINESS_DESCRIPTION',
			// value: supportBusinessManagement?.BUSINESS_DESCRIPTION,
			value: businessDescription,
			type: 'multiselect',
			format: (value) => {
				return value && JSON.parse(value).join();
			},
			dataList: supportContentData
				? supportContentData?.map(
						(row) => row?.SUPPORT_DESCRIPTION_TITLE
				  )
				: descriptions,
			handleChange: (event) => {
				const {
					target: { value },
				} = event;
				console.log(value);
				setBusinessDescription(JSON.stringify(value));
				// setSupportBusinessManagement({
				// 	...supportBusinessManagement,
				// 	BUSINESS_DESCRIPTION: JSON.stringify(value),
				// });
			},
		},
		{
			label: '지원 사업 업력',
			key: 'HISTORY',
		},
		{
			label: '지원 사업 지역',
			key: 'REGION',
		},
		{
			label: '제출 마감일',
			key: 'DEAD_LINE_DATE',
			type: 'datepicker',
			format: (value) => {
				return moment(value).format('YYYY-MM-DD');
			},
		},
	];

	const phase2Config = [
		{
			label: '사업 명',
			key: 'BUSINESS_TITLE',
		},
		{
			label: '담당자',
			key: 'PERSON_IN_CHARGE',
		},
		{
			label: '담당자 연락처',
			key: 'MAIN_CONTACT',
		},
		{
			label: '중간 보고일',
			key: 'MID_DEAD_LINE_DATE',
			format: (value) => {
				return moment(value).format('YYYY-MM-DD');
			},
			type: 'datepicker',
		},
		{
			label: '최종 보고일',
			key: 'DEAD_LINE_DATE',
			format: (value) => {
				return moment(value).format('YYYY-MM-DD');
			},
			type: 'datepicker',
		},
		{
			label: '지원 사업 내용',
			key: 'BUSINESS_DESCRIPTION',
			// value: supportBusinessManagement?.BUSINESS_DESCRIPTION,
			type: 'multiselect',
			format: (value) => {
				return value && JSON.parse(value).join();
			},
			dataList: supportContentData
				? supportContentData?.map(
						(row) => row?.SUPPORT_DESCRIPTION_TITLE
				  )
				: descriptions,
			handleChange: (event) => {
				const {
					target: { value },
				} = event;
				console.log(value);
				setSupportBusinessManagement({
					...supportBusinessManagement,
					BUSINESS_DESCRIPTION: JSON.stringify(value),
				});
			},
		},
		{
			label: '지원 사업 업력',
			key: 'HISTORY',
		},
		{
			label: '지원 사업 지역',
			key: 'REGION',
		},
	];

	const tabConfig = [
		{
			label: '총 금액',
			key: 'TOTAL_AMOUNT',
		},
		{
			label: '사용금액',
			key: 'USED_AMOUNT',
		},
		{
			label: '남은 금액',
			key: 'REMAIN_AMOUNT',
		},
	];
	const commonConfig = [
		{
			label: '총 사업비(원)',
			key: 'OPERATING_COST',
		},
		{
			label: '지원금 비율(%)',
			key: 'SUPPORT_COST_RATE',
		},
		{
			label: '부담금 비율(%)',
			key: 'BUSINESS_CONTRIBUTION_RATE',
		},
		{
			label: '현금 비율(%)',
			key: 'CASH_RATE',
		},
		{
			label: '현물 비율(%)',
			key: 'VIRTUAL_CASH_RATE',
		},
	];
	console.log(
		supportContentData?.map((row) => row?.SUPPORT_DESCRIPTION_TITLE)
	);
	return (
		// <InternalServiceDrawer type="dashboard">
		<Box bgcolor={'primary.light'} sx={{ p: { xs: 2, md: 10 } }}>
			{/* 컨텐츠 레이아웃 */}
			<InternalServiceLayout
				title="지원 사업"
				subTitle="서포티를 통해 나에게 맞는 지원 사업을 조회하고 확인해보세요."
				image="/images/main/supportbusiness.png"
				mobileImage="/images/main/supportbusinessmobile.png"
			>
				{phaseData &&
					supportBusinessManagement &&
					supportContentData && (
						<Box display={'flex'} flexDirection={'column'}>
							{/* 타이틀 */}
							<Typography color={'primary'} fontWeight={'600'}>
								{supportBusinessManagement.FIELD}
							</Typography>
							<Box
								display={'flex'}
								justifyContent={'space-between'}
								alignItems={'center'}
							>
								<Box
									display={'flex'}
									alignItems={'center'}
									gap={1}
								>
									<Typography
										variant="h3"
										fontWeight={'bold'}
									>
										{supportBusinessManagement?.TITLE}
									</Typography>
									{supportBusinessManagement.DATA && (
										<Box
											border={'1px solid black'}
											display={'flex'}
											borderRadius={2}
											alignItems={'center'}
											p={0.3}
											onClick={() => {
												setDetailData(
													JSON.parse(
														supportBusinessManagement.DATA
													)
												);
												setDetailModal(true);
											}}
											sx={{
												cursor: 'pointer',
											}}
										>
											<InsertLinkOutlinedIcon fontSize="small" />
										</Box>
									)}
									{phaseType === 'PHASE2' ? (
										<Typography
											color={'#b9b9b9'}
											fontWeight={'600'}
										>
											{moment(
												supportBusinessManagement.START_DATE
											).format('YY.MM.DD')}
											~
											{moment(
												supportBusinessManagement.END_DATE
											).format('YY.MM.DD')}
										</Typography>
									) : (
										<Typography
											color={'#b9b9b9'}
											fontWeight={'600'}
										>
											{moment(
												supportBusinessManagement.DEAD_LINE_DATE
											).format('YY.MM.DD')}
										</Typography>
									)}
								</Box>
								<Box display={'flex'} gap={1}>
									<SupportiButton
										variant="contained"
										contents={
											<Box
												display={'flex'}
												alignItems={'center'}
												gap={1}
											>
												<Typography
													fontWeight={'bold'}
													color={'white'}
												>
													컨설팅 등록
												</Typography>
											</Box>
										}
										onClick={() => {
											router.push(
												'/internal_service/government/consulting'
											);
										}}
										disabledGutters
										style={{
											px: 2,
											py: 1,
											bgcolor: 'primary.main',
										}}
									/>
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
												>
													수정하기
												</Typography>
											</Box>
										}
										onClick={() => {
											editMode
												? updateSupportBusiness()
												: setEditMode(true);
										}}
										disabledGutters
										style={{
											px: 2,
											py: 1,
											bgcolor: 'white',
										}}
									/>{' '}
									<SupportiButton
										variant="outlined"
										contents={
											<Box
												display={'flex'}
												alignItems={'center'}
												gap={1}
											>
												<DeleteOutlineOutlinedIcon fontSize="small" />
												<Typography
													fontWeight={'bold'}
													color={'primary'}
												>
													삭제하기
												</Typography>
											</Box>
										}
										onClick={() => {
											deleteSupportBusiness();
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
							{/* 내용 */}
							<Box
								display={'flex'}
								flexDirection={'column'}
								gap={2}
								mt={2}
								p={3}
								bgcolor={'white'}
								borderRadius={2}
								width={'100%'}
							>
								{phaseData.map((item, index) => (
									<Box
										display={'flex'}
										key={index}
										alignItems={'center'}
									>
										<Typography>✔</Typography>
										<Typography
											color={'#b9b9b9'}
											fontWeight={'600'}
											width={'100px'}
											ml={1}
										>
											{item.label}
										</Typography>
										{editMode ? (
											item.key ===
											'BUSINESS_DESCRIPTION' ? (
												<SupportiInput
													value={
														businessDescription &&
														JSON.parse(
															businessDescription
														)
													}
													// value={JSON.parse(
													// 	supportBusinessManagement[
													// 		item.key
													// 	]
													// )}
													style={{
														minWidth: '220px',
													}}
													type={'multiselect'}
													dataList={item.dataList}
													handleChange={
														item.handleChange
													}
												/>
											) : (
												<SupportiInput
													value={
														supportBusinessManagement[
															item.key
														]
													}
													style={{
														minWidth: '200px',
													}}
													type={
														item.type
															? item.type
															: 'text'
													}
													setValue={(value) => {
														setSupportBusinessManagement(
															{
																...supportBusinessManagement,
																[item.key]:
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
													dataList={item.dataList}
													handleChange={
														item.handleChange
													}
												/>
											)
										) : (
											<Typography fontWeight={'500'}>
												{item.format
													? item.format(
															supportBusinessManagement[
																item.key
															]
													  )
													: supportBusinessManagement[
															item.key
													  ]}
											</Typography>
										)}
									</Box>
								))}
							</Box>

							{/** 제출 서류 리스트 */}
							{phaseType === 'PHASE1' && (
								<Box
									width={'100%'}
									bgcolor={'white'}
									borderRadius={3}
									p={4}
									mt={3}
								>
									<Box
										// display={'flex'}
										// justifyContent={'space-between'}
										alignItems={'center'}
									>
										<Box
											display={'flex'}
											justifyContent={'space-between'}
										>
											<Typography
												fontWeight={'700'}
												variant="h6"
												mb={2}
											>
												제출서류 체크리스트
											</Typography>
											<AddCircleIcon
												sx={{ cursor: 'pointer' }}
												onClick={() => {
													setAddFileOpen(true);
												}}
											/>
										</Box>
										{/*모바일 테이블 */}
										<Box
											width={'100%'}
											py={2}
											display={{
												sm: 'none',
												xs: 'block',
											}}
										>
											{userFileList &&
												userFileList?.map(
													(item, idx) => {
														return (
															<MobileTableRow
																index={idx}
																title={
																	item.DESCRIPTION
																}
																colums={[
																	{
																		label: '제출서류명',
																		value: item
																			.SupportBusinessFileManagement
																			.SUBMIT_FILE_NAME,
																	},
																	{
																		label: '필수여부',
																		value:
																			item.ESSSENTIAL_YN ===
																			'Y'
																				? '필수'
																				: '선택',
																	},
																	{
																		label: '준비유무',
																		value:
																			item.PREPERATION_YN ===
																			'Y'
																				? '준비완료'
																				: '준비전',
																	},
																	{
																		label: '담당자',
																		value: item.MANAGER,
																	},
																	{
																		label: '비고',
																		value: item.NOTE,
																	},
																]}
															/>
														);
													}
												)}
											{userFileList &&
												userFileList?.length === 0 && (
													<Nodata />
												)}
										</Box>
										{/* 테이블 */}
										<Box
											width={'100%'}
											mt={2}
											display={{
												sm: 'block',
												xs: 'none',
											}}
										>
											<SupportiTable
												rowData={userFileList}
												headerData={fileListHeaderData}
											/>
										</Box>
									</Box>
								</Box>
							)}

							{/** 지원금 계상 */}
							<Box
								display={'flex'}
								flexDirection={'column'}
								gap={2}
								mt={2}
								p={3}
								bgcolor={'white'}
								borderRadius={2}
								width={'100%'}
							>
								<Box
									display={'flex'}
									justifyContent={'space-between'}
								>
									<Typography
										fontWeight={'700'}
										variant="h6"
										mb={2}
									>
										지원금 계상
									</Typography>
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
												>
													수정하기
												</Typography>
											</Box>
										}
										onClick={() => {
											editMode
												? updateSupportBusiness()
												: setEditMode(true);
										}}
										disabledGutters
										style={{
											px: 2,
											py: 1,
											bgcolor: 'white',
										}}
									/>
								</Box>
								{commonConfig.map((item, index) => (
									<Box
										display={'flex'}
										key={index}
										alignItems={'center'}
									>
										<Typography
											color={'#b9b9b9'}
											fontWeight={'600'}
											width={'100px'}
											ml={1}
										>
											{item.label}
										</Typography>
										{editMode ? (
											<Box display={'flex'} gap={1}>
												<SupportiInput
													value={
														supportBusinessManagement[
															item.key
														]
													}
													setValue={(value) => {
														setSupportBusinessManagement(
															{
																...supportBusinessManagement,
																[item.key]:
																	value,
															}
														);
													}}
													type={'text'}
												/>
												{item.key !==
													'OPERATING_COST' && (
													<Typography
														my="auto"
														color="primary.main"
													>
														{supportBusinessManagement.OPERATING_COST !=
														0
															? addCommaToNumber(
																	supportBusinessManagement.OPERATING_COST *
																		0.01 *
																		supportBusinessManagement[
																			item
																				.key
																		]
															  )
															: 0}{' '}
														원
													</Typography>
												)}
											</Box>
										) : (
											<Typography fontWeight={'500'}>
												{item.key === 'OPERATING_COST'
													? addCommaToNumber(
															supportBusinessManagement[
																item.key
															]
													  )
													: supportBusinessManagement[
															item.key
													  ]}
											</Typography>
										)}
									</Box>
								))}
							</Box>

							{/* 항목별 지원금 */}
							<SubsidyByItemTable
								useCalculation={
									phaseType === 'PHASE1' ? false : true
								}
								subsidyTab={subsidyTab}
								supportBusinessManagement={
									supportBusinessManagement
								}
								handleSubsidyTabChange={handleSubsidyTabChange}
								getSupportBusiness={getSupportBusiness}
							/>
						</Box>
					)}
				{/* 디테일 모달 */}
				{detailData && (
					<Box key={detailModal && detailModal?.toString()}>
						<SupportBusinessModal
							modalOpen={detailModal}
							setModalOpen={setDetailModal}
							supportBusiness={detailData}
						/>
					</Box>
				)}
				{fileGuidelineList.length !== 0 &&
					supportBusinessManagement?.SUPPORT_BUSINESS_MANAGEMENT_IDENTIFICATION_CODE && (
						<SupportFileAddModal
							managementId={
								supportBusinessManagement?.SUPPORT_BUSINESS_MANAGEMENT_IDENTIFICATION_CODE
							}
							fileGuidelineList={fileGuidelineList}
							open={addFileOpen}
							handleClose={() => setAddFileOpen(false)}
							getUserFile={getUserFile}
							isEditMode={isEditMode}
							setIsEditMode={setIsEditMode}
							userModifyFile={
								userFileList.filter(
									(item) =>
										item.USER_SUPPORT_BUSINESS_FILE_MANAGEMENT_IDENTIFICATION_CODE ===
										fileId
								)[0]
							}
						/>
					)}
			</InternalServiceLayout>
		</Box>
		// </InternalServiceDrawer>
	);
};

export default Page;
