import React from 'react';

import { NextPage } from 'next';

import {
	Box,
	BoxProps,
	Step,
	StepLabel,
	Stepper,
	Typography,
} from '@mui/material';
import FilePresentIcon from '@mui/icons-material/FilePresent';
import InternalServiceDrawer from '../../../../src/views/local/internal_service/common/InternalServiceDrawer';
import { InternalServiceLayout } from '../../../../src/views/layout/InternalServiceLayout';
import SupportiButton from '../../../../src/views/global/SupportiButton';
import { useAppMember } from '../../../../src/hooks/useAppMember';
import CheckIcon from '@mui/icons-material/Check';
import Nodata from '../../../../src/views/global/NoData/NoData';
import { useRouter } from 'next/router';
import SupportiTable, {
	TableHeaderProps,
} from '../../../../src/views/global/SupportiTable/SupportiTable';
import Image from 'next/image';
import DefaultController from '@leanoncompany/supporti-ark-office-project/src/controller/default/DefaultController';
import SupportConsultingApplyModal from '../../../../src/views/local/internal_service/government/SupportConsultingApplyModal/SupportConsultingApplyModal';
import MobileTableRow from '../../../../src/views/local/external_service/mobileTableRow/MobileTableRow';

const Page: NextPage = () => {
	//* Modules
	const router = useRouter();
	//* Controller
	const supportBusinessConsultingController = new DefaultController(
		'SupportBusinessConsulting'
	);

	//* Constants
	const supportBusinessConsultingData = [
		{
			label: '지원사업 명',
			key: 'SUPPORT_BUSINESS_TITLE',
			align: 'center',
		},
		{
			label: '지원 사업 내용',
			key: 'SUPPORT_BUSINESS_DESCRIPTION',
			customValue: true,
			align: 'center',
		},
		{
			label: '지원 사업 규모',
			key: 'SUPPORT_SCALE',
			align: 'center',
		},
		{
			label: '주관 기관',
			key: 'IMPLEMENTING_AGENCY',
			align: 'center',
		},
	];

	// 제출서류 테이블 헤더
	const consultingHeaderData: TableHeaderProps[] = [
		{
			label: '체크 항목',
			value: 'DESCRIPTION',
			align: 'center',
			format: (value, key, idx) => {
				return (
					<Box display="flex" alignItems="center" mx={0} px={0}>
						<Typography mx={'auto'}>{value}</Typography>
					</Box>
				);
			},
		},
		{
			label: '좋아요',
			align: 'center',
			value: 'CHECK_RESULT',
			format: (value) => {
				return value === '좋아요' ? (
					<CheckIcon fontSize="small" />
				) : null;
			},
		},
		{
			label: '괜찮아요',
			align: 'center',
			value: 'CHECK_RESULT',
			format: (value) => {
				return value === '괜찮아요' ? (
					<CheckIcon fontSize="small" />
				) : null;
			},
		},
		{
			label: '개선 필요',
			align: 'center',
			value: 'CHECK_RESULT',
			format: (value) => {
				return value === '개선필요' ? (
					<CheckIcon fontSize="small" />
				) : null;
			},
		},
	];

	const steps = ['신청 완료', '컨설팅 진행중', '컨설팅 완료'];

	//* States
	/**
	 * 자세히보기
	 *  */
	const [openDetail, setOpenDetail] = React.useState<boolean>(false);

	/**
	 * 컨설팅 신청
	 */
	const [openConsultingModal, setOpenConsultingModal] =
		React.useState<boolean>(false);

	/**
	 * 관리 지원사업 데이터
	 */
	const [managementSupportBusiness, setManagementSupportBusiness] =
		React.useState<any>();

	/**
	 * 관리 지원사업 추가 단계 선택 모달 오픈 여부
	 */
	const [openAddModal, setOpenAddModal] = React.useState<boolean>(false);

	/**
	 * 컨설팅 체크리스트
	 */
	const [consultingCheckList, setConsultingCheckList] = React.useState<any>();

	//* Functions
	/**
	 * 관리 지원사업 데이터 가져오기
	 */
	const getManagementSupportBusiness = () => {
		supportBusinessConsultingController.findAllItems(
			{
				// FIND_OPTION_KEY_LIST: {
				APP_MEMBER_IDENTIFICATION_CODE: memberId,
				// },
			},
			(res) => {
				setManagementSupportBusiness(res.data.result.rows);
				setConsultingCheckList(
					res.data.result.UserSupportBusinessConsultingCheckLists
				);
			},
			(err) => {
				console.log(err);
			}
		);
	};

	//* Hooks

	/**
	 * 유저 정보 가져오는 훅
	 */
	const { memberId } = useAppMember();

	React.useEffect(() => {
		if (memberId) {
			getManagementSupportBusiness();
			// getUserCheckList();
		}
	}, [memberId]);

	console.log(managementSupportBusiness);

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
				{/* 타이틀 */}
				<Box
					display={'flex'}
					justifyContent={'space-between'}
					alignItems={'center'}
					width={'100%'}
				>
					<Box>
						<Typography
							variant="h3"
							fontWeight={'bold'}
							sx={{ mb: 2 }}
						>
							지원 사업 컨설팅
						</Typography>
						<Typography color={'secondary.dark'} sx={{ mb: 2 }}>
							가장 중요한 지원사업파트 중 하나인 ‘사업계획서’의
							컨설팅 및 피드백 기능을 통해 고객사의 합격률을
							높이는 서포팅
						</Typography>
					</Box>
				</Box>
				<Box
					width={'100%'}
					bgcolor={'white'}
					borderRadius={3}
					p={4}
					display={'flex'}
					justifyContent={'space-around'}
				>
					<Image
						src="/images/main/Feedback.png"
						alt="img"
						width={350}
						height={250}
						style={{ margin: 20 }}
					/>
					<Box
						display="flex"
						flexDirection="column"
						gap={1.5}
						alignItems="center"
						justifyContent={'center'}
					>
						<Typography fontWeight={'600'} variant="subtitle2">
							지원사업 하면서 가장 고민 되는 파트! 사업계획서 등의
							문서 작성에 대해 합격 다수 경험자의 피드백을 받아볼
							수 있는 기회!
						</Typography>
						<Typography fontWeight={'600'} variant="subtitle2">
							서포티 자체적으로 정형화된 가이드라인/매뉴얼에 따라
							문서형태의 계획서 혹은 지원서에 대한 컨설팅을
							해드립니다!
						</Typography>
						<SupportiButton
							contents={'지금 바로 컨설팅 받기'}
							onClick={() => {
								// 컨설팅 쿠폰 먼저 체크
								// 컨설팅 신청 모달 오픈
								setOpenConsultingModal(true);
							}}
							variant="contained"
							style={{
								width: '220px',
								mt: 6,
								ml: 'auto',
							}}
						/>
					</Box>
				</Box>
				{managementSupportBusiness?.length !== 0 &&
					managementSupportBusiness?.map((item, index) => {
						return (
							<Box
								width={'100%'}
								bgcolor={'white'}
								borderRadius={3}
								p={4}
								my={2}
							>
								<Typography
									fontWeight={'600'}
									variant="h5"
									mb={2}
								>
									컨설팅 내역
								</Typography>
								<Box
									width={'100%'}
									bgcolor={'primary.light'}
									borderRadius={3}
									p={4}
								>
									<Box
										display="flex"
										justifyContent={'space-between'}
									>
										{/** 신청 날짜 */}
										<Typography color="secondary.dark">
											{item.CREATED_AT.split(
												'T'
											)[0].replaceAll('-', '/')}{' '}
											신청
										</Typography>

										{/** 자세히 보기 버튼 */}
										{item.PROGRESS_STAGE == 3 && (
											<SupportiButton
												contents={
													openDetail
														? '닫기'
														: '자세히 보기'
												}
												onClick={() => {
													setOpenDetail(!openDetail);
												}}
											/>
										)}
									</Box>

									{/** 프로그레스 현황  */}
									<Stepper
										activeStep={
											item.PROGRESS_STAGE == 1
												? 0
												: item.PROGRESS_STAGE == 2
												? 1
												: 2
										}
										alternativeLabel
										sx={{ mt: 3, mb: 5 }}
									>
										{steps.map((label) => (
											<Step key={label}>
												<StepLabel>{label}</StepLabel>
											</Step>
										))}
									</Stepper>

									{/** 지원사업 내용 */}
									<Typography fontWeight={'700'} my={2}>
										신청 내용
									</Typography>
									<Box
										width={'100%'}
										bgcolor={'white'}
										borderRadius={3}
										p={4}
										mb={5}
									>
										{supportBusinessConsultingData.map(
											(data, index) => {
												return (
													<Box
														display="flex"
														gap={3.5}
														my={0.5}
													>
														<Typography
															fontWeight={'600'}
															lineHeight={'150%'}
														>
															{data.label}
														</Typography>
														<Typography
															fontWeight={'500'}
															lineHeight={'150%'}
														>
															{data.customValue
																? JSON.parse(
																		item[
																			data
																				.key
																		]
																  ).join(', ')
																: item[
																		data.key
																  ]}
														</Typography>
													</Box>
												);
											}
										)}
										{/** 메모 */}
										<Typography lineHeight={'160%'} my={3}>
											{item.MEMO}
										</Typography>

										{/** 파일 */}
										<Box display="flex" gap={0.5}>
											<FilePresentIcon fontSize="small" />
											<Typography
												sx={{
													textDecoration: 'underline',
													my: 'auto',
													cursor: 'pointer',
												}}
												onClick={() =>
													window.open(
														JSON.parse(item.FILE)[0]
															.FILE_URL
													)
												}
											>
												{
													JSON.parse(item.FILE)[0]
														.FILE_NAME
												}
											</Typography>
										</Box>
									</Box>
									{openDetail && item.PROGRESS_STAGE == 3 && (
										<>
											{/** 컨설팅 내용 */}
											<Typography fontWeight={'700'}>
												컨설팅 내용
											</Typography>
											<Box
												width={'100%'}
												bgcolor={'white'}
												borderRadius={3}
												p={4}
												my={2}
											>
												{/** 코멘트 */}
												<Typography
													fontWeight={'500'}
													mb={2}
												>
													{item.COMMENT}
												</Typography>
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
												{item.UserSupportBusinessConsultingCheckLists &&
													item.UserSupportBusinessConsultingCheckLists?.map(
														(item, idx) => {
															return (
																<MobileTableRow
																	index={idx}
																	title={
																		item.DESCRIPTION
																	}
																	colums={[
																		{
																			label: '체크항목',
																			value: item.DESCRIPTION,
																		},
																		{
																			label: '좋아요',
																			value:
																				item.CHECK_RESULT ===
																				'좋아요' ? (
																					<CheckIcon fontSize="small" />
																				) : null,
																		},
																		{
																			label: '괜찮아요',
																			value:
																				item.CHECK_RESULT ===
																				'괜찮아요' ? (
																					<CheckIcon fontSize="small" />
																				) : null,
																		},
																		{
																			label: '개선필요',
																			value:
																				item.CHECK_RESULT ===
																				'개선필요' ? (
																					<CheckIcon fontSize="small" />
																				) : null,
																		},
																	]}
																/>
															);
														}
													)}
												{item.UserSupportBusinessConsultingCheckLists &&
													item
														.UserSupportBusinessConsultingCheckLists
														?.length === 0 && (
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
													rowData={
														item.UserSupportBusinessConsultingCheckLists
													}
													headerData={
														consultingHeaderData
													}
												/>
											</Box>
										</>
									)}
								</Box>
							</Box>
						);
					})}
				<SupportConsultingApplyModal
					open={openConsultingModal}
					handleClose={() => {
						setOpenConsultingModal(false);
						getManagementSupportBusiness();
					}}
				/>
			</InternalServiceLayout>
		</Box>
		// </InternalServiceDrawer>
	);
};

export default Page;
