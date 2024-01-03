import { Box, Button, Grid, Typography } from '@mui/material';
import { NextPage } from 'next';
import React from 'react';
import { InternalServiceLayout } from '../../../../src/views/layout/InternalServiceLayout';
import { IBusiness, IFinancialStatement } from '../../../../src/@types/model';
import { useAppMember } from '../../../../src/hooks/useAppMember';
import DefaultController from '@leanoncompany/supporti-ark-office-project/src/controller/default/DefaultController';
import moment from 'moment';
import { financialStatementConfig } from '../../../../configs/data/FinancialStatementConfig';
import { useRouter } from 'next/router';
import { useUserAccess } from '../../../../src/hooks/useUserAccess';
import SupportiButton from '../../../../src/views/global/SupportiButton';
import InternalServiceDrawer from '../../../../src/views/local/internal_service/common/InternalServiceDrawer/InternalServiceDrawer';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import useWindowWidth from '../../../../src/hooks/useWindowWidth/useWindowWidth';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
/**
 * 재무제표 뷰 페이지
 */
const Page: NextPage = () => {
	//* Modules
	/**
	 * 라우터
	 */
	const router = useRouter();

	/**
	 * 재무제표 컨트롤러
	 */
	const financialStatementController = new DefaultController(
		'FinancialStatement'
	);
	/**
	 * 비즈니스 개요 컨트롤러
	 */
	const businessController = new DefaultController('Business');

	//* States
	/**
	 * 비즈니스 개요
	 */
	const [business, setBusiness] = React.useState<IBusiness>();
	/**
	 * 재무제표 리스트
	 */
	const [financialStatementList, setFinancialStatementList] = React.useState<
		IFinancialStatement[]
	>([]);

	/**
	 * 대상 일자
	 */
	const [targetDate, setTargetDate] = React.useState<moment.Moment>(
		moment().subtract(1, 'y').endOf('years')
	);

	//* Functions
	/**
	 * 타겟 연도 변경 함수
	 */
	const changeTargetDate = (
		direction: 'previous' | 'next' | 'mobileprevious' | 'mobilenext'
	) => {
		// setTargetDate (moment.Moment 의 .endOf('years') 를 사용하여 연도의 마지막 날짜로 설정)
		const changedTargetDate = targetDate.clone();

		if (direction === 'mobileprevious') {
			changedTargetDate.subtract(1, 'years');
		} else if (direction === 'mobilenext') {
			if (changedTargetDate.year() !== moment().subtract(1, 'y').year()) {
				changedTargetDate.add(1, 'years');
			} else {
				alert('더 이상 조회할 수 없습니다.');
			}
		} else if (direction === 'previous') {
			changedTargetDate.subtract(3, 'years');
		} else if (direction === 'next') {
			if (changedTargetDate.year() !== moment().subtract(1, 'y').year()) {
				changedTargetDate.add(3, 'years');
			} else {
				alert('더 이상 조회할 수 없습니다.');
			}
		}

		setTargetDate(changedTargetDate);
	};

	//* Hooks
	/**
	 * 창 넓이 가져오는 훅
	 */
	const { width } = useWindowWidth();
	/**
	 * 유저 정보 가져오는 훅
	 */
	const { memberId } = useAppMember();

	/**
	 * 페이지 진입 시 유저 권한 검사
	 */
	const { access } = useUserAccess('BUSINESS_MEMBER');
	/**
	 * 비즈니스 개요 데이터 로드
	 */
	React.useEffect(() => {
		if (access && memberId && access) {
			businessController.getOneItemByKey(
				{
					APP_MEMBER_IDENTIFICATION_CODE: memberId,
				},
				(res) => {
					if (res.data.result !== null) {
						setBusiness(res.data.result);
					}
				},
				(err) => {
					alert('비즈니스 개요 정보를 가져오는데 실패했습니다.');
				}
			);
		}
	}, [access, memberId]);

	/**
	 * 재무제표 데이터 로드
	 */
	React.useEffect(() => {
		if (memberId && business && access) {
			financialStatementController.getAllItems(
				{
					BUSINESS_IDENTIFICATION_CODE:
						business?.BUSINESS_IDENTIFICATION_CODE,
					PERIOD_TARGET_KEY: 'STANDARD_YEAR',
					PERIOD_END: targetDate,
					PERIOD_START: moment(targetDate).subtract(2, 'y'),
					LIMIT: width >= 1024 ? 3 : 1,
					PAGE: 0,
					SORT_KEY: 'STANDARD_YEAR',
					SORT_DIRECTION: 'ASC',
					STANDARD_YEAR: width >= 1024 ? undefined : targetDate,
				},
				(res) => {
					setFinancialStatementList(res.data.result.rows);
				},
				(err) => {
					alert('재무제표 정보를 가져오는데 실패했습니다.');
				}
			);
		}
	}, [access, targetDate, business]);

	console.log(financialStatementList);

	return (
		<InternalServiceDrawer type="dashboard">
			<Box
				sx={{
					display: 'flex',
					alignItems: 'space-between',
					flexDirection: 'column',
					p: { sm: 10, xs: 2 },
				}}
			>
				{/* 컨텐츠 레이아웃 */}
				{
					<InternalServiceLayout
						title="재무 정보"
						subTitle="재무제표 등록을 통해 재무정보를 관리할 수 있습니다."
						image="/images/main/business.png"
						mobileImage="/images/main/businessMoblie.png"
					>
						<Typography
							variant="h3"
							fontWeight={'bold'}
							sx={{ mb: 2 }}
						>
							재무제표
						</Typography>
						<Typography color={'secondary.dark'} sx={{ mb: 2 }}>
							재무제표를 등록하여 보다 쉽게 재무제표를 관리할 수
							있습니다.
						</Typography>
						{/* 컨트롤러 */}
						<Box mb={2}>
							<Grid container alignItems={'center'}>
								{/* 페이징 버튼 */}
								<Grid item xs={6} md={6}>
									<Box
										display={'flex'}
										justifyContent={'flex-start'}
										alignItems={'center'}
										gap={1}
									>
										{/* 이전 페이지 */}
										<Box>
											<ArrowBackIosNewIcon
												onClick={() => {
													changeTargetDate(
														width >= 1024
															? 'previous'
															: 'mobileprevious'
													);
												}}
												color="primary"
											/>
										</Box>
										<Typography
											variant={'h6'}
											fontWeight={'500'}
											color={'primary'}
										>
											{width >= 1024
												? moment(targetDate)
														.subtract(2, 'y')
														.format('YYYY년') + '-'
												: ''}
											{moment(targetDate).format(
												'YYYY년'
											)}
										</Typography>
										{/* 다음 페이지 */}
										<Box>
											<ArrowForwardIosIcon
												onClick={() => {
													changeTargetDate(
														width >= 1024
															? 'next'
															: 'mobilenext'
													);
												}}
												color="primary"
											/>
										</Box>
									</Box>
								</Grid>
								{/* 데이터 편집 및 추출 */}
								<Grid item xs={6} md={6}>
									<Box
										display={'flex'}
										justifyContent={'flex-end'}
									>
										{/* 편집 페이지로 이동 */}
										<Box>
											<Button
												variant="contained"
												sx={{
													bgcolor: 'primary',
													px: { xs: 0, md: 3 },
													borderRadius: 2,
												}}
												onClick={() => {
													router.push(
														'/internal_service/financial_solution/financial_statement/edit'
													);
												}}
											>
												<ModeEditOutlineOutlinedIcon fontSize="small" />
												<Typography
													variant={'subtitle1'}
													fontWeight={'600'}
													color={'white'}
													sx={{
														ml: 0.5,
													}}
													display={{
														xs: 'none',
														md: 'block',
													}}
												>
													편집하기
												</Typography>
											</Button>
										</Box>
										{/* 엑셀 추출 버튼 */}
										<Box>
											{/* <ExcelDownloadButton /> */}
										</Box>
									</Box>
								</Grid>
							</Grid>
						</Box>

						{/* 테이블 */}
						<Box>
							{/* 테이블 헤더 */}
							<Box>
								<Grid container>
									{/* 각 재무제표 항목 */}
									<Grid item xs={6} md={3}>
										<Box
											border={0.5}
											borderColor={
												'rgba(185, 197, 255, 1)'
											}
											sx={{
												backgroundColor: '#305ddc',
												borderTopLeftRadius: 10,
												py: 1,
												px: 4,
											}}
										>
											<Typography
												variant={'h6'}
												fontWeight={'500'}
												color={'white'}
												pt={1}
												pb={1}
											>
												항목
											</Typography>
										</Box>
									</Grid>

									{/* 연도별 헤더 (PC 에서는 3개까지, 모바일에서는 1개까지 뷰) */}
									{financialStatementList.map((el, index) => (
										<Grid
											item
											xs={6}
											md={3}
											sx={{
												display: {
													xs:
														index === 0
															? 'block'
															: 'none',
													md: 'block',
												},
												borderTopRightRadius:
													width >= 1024
														? 2 === index
															? 10
															: 0
														: 10,
												backgroundColor: '#305ddc',
											}}
										>
											<Box
												border={0.5}
												borderColor={
													'rgba(185, 197, 255, 1)'
												}
												py={1}
												px={4}
											>
												<Typography
													variant={'h6'}
													fontWeight={'500'}
													color={'white'}
													pt={1}
													pb={1}
												>
													{moment(
														el.STANDARD_YEAR
													).format('YYYY.MM.DD')}
												</Typography>
											</Box>
										</Grid>
									))}
									{/* PC에서 연도 3개 이하일때 부족한 갯수만큼 채우기 모바일일때는 하나만 */}
									{width >= 1024
										? financialStatementList.length < 3 &&
										  [
												...Array(
													3 -
														financialStatementList.length
												),
										  ].map((el, index) => (
												<Grid
													item
													xs={6}
													md={3}
													sx={{
														display: 'block',
														borderTopRightRadius:
															2 -
																financialStatementList.length ===
															index
																? 10
																: 0,
													}}
													bgcolor={'primary.main'}
												>
													<Box
														border={0.5}
														borderColor={
															'rgba(185, 197, 255, 1)'
														}
														py={1}
														px={4}
													>
														<Typography
															variant={'h6'}
															fontWeight={'500'}
															color={'white'}
															pt={1}
															pb={1}
														>
															-
														</Typography>
													</Box>
												</Grid>
										  ))
										: financialStatementList.length < 1 && (
												<Grid
													item
													xs={6}
													md={3}
													sx={{
														display: 'block',
														borderTopRightRadius: 10,
													}}
													bgcolor={'primary.main'}
												>
													<Box
														border={0.5}
														borderColor={
															'rgba(185, 197, 255, 1)'
														}
														py={1}
														px={4}
													>
														<Typography
															variant={'h6'}
															fontWeight={'500'}
															color={'white'}
															pt={1}
															pb={1}
														>
															-
														</Typography>
													</Box>
												</Grid>
										  )}
								</Grid>
							</Box>

							{/* 테이블 바디 */}
							<Box>
								{/* 각 재무제표 항목 맵핑 */}
								{financialStatementConfig.map(
									(financialStatementMapping) => (
										<Box>
											<Grid container>
												{/* 각 재무제표 라벨 */}
												<Grid item xs={6} md={3}>
													<Box
														sx={{
															backgroundColor:
																'rgba(241, 243, 251, 1)',
														}}
														border={0.5}
														borderColor={
															'rgba(185, 197, 255, 1)'
														}
														pl={
															financialStatementMapping.isHighlighted
																? 5
																: 4
														}
														pr={3}
														py={2}
													>
														<Typography
															variant={
																'subtitle2'
															}
															fontWeight={
																financialStatementMapping.isHighlighted
																	? '700'
																	: '500'
															}
															color={
																'rgba(60, 82, 187, 1)'
															}
														>
															{
																financialStatementMapping.label
															}
														</Typography>
													</Box>
												</Grid>

												{/* 연도별 데이터 (PC 에서는 3개까지, 모바일에서는 1개까지 뷰) */}
												{financialStatementList.map(
													(
														financialStatement,
														index
													) => (
														<Grid
															item
															xs={6}
															md={3}
															sx={{
																display: {
																	xs:
																		index ===
																		0
																			? 'block'
																			: 'none',
																	md: 'block',
																},
																bgcolor:
																	'white',
															}}
														>
															<Box
																border={0.5}
																borderColor={
																	'rgba(185, 197, 255, 1)'
																}
																width={'100%'}
																height={'100%'}
																display={'flex'}
																alignItems={
																	'center'
																}
																px={4}
															>
																<Typography
																	variant={
																		'subtitle1'
																	}
																>
																	{financialStatement[
																		financialStatementMapping
																			.key
																	].toLocaleString()}
																</Typography>
															</Box>
														</Grid>
													)
												)}
												{/* PC에서 3개 이하면 해당 갯수만큼 빈그래프 채우기 */}
												{width >= 1024
													? financialStatementList.length <
															3 &&
													  [
															...Array(
																3 -
																	financialStatementList.length
															),
													  ].map((el, index) => (
															<Grid
																item
																xs={6}
																md={3}
																sx={{
																	display:
																		'block',
																	bgcolor:
																		'white',
																}}
															>
																<Box
																	border={0.5}
																	borderColor={
																		'rgba(185, 197, 255, 1)'
																	}
																	width={
																		'100%'
																	}
																	height={
																		'100%'
																	}
																	display={
																		'flex'
																	}
																	alignItems={
																		'center'
																	}
																	pl={4}
																>
																	<Typography
																		variant={
																			'subtitle1'
																		}
																		textAlign={
																			'center'
																		}
																	>
																		-
																	</Typography>
																</Box>
															</Grid>
													  ))
													: financialStatementList.length <
															1 && (
															<Grid
																item
																xs={6}
																md={3}
																sx={{
																	display:
																		'block',
																	bgcolor:
																		'white',
																}}
															>
																<Box
																	border={0.5}
																	borderColor={
																		'rgba(185, 197, 255, 1)'
																	}
																	width={
																		'100%'
																	}
																	height={
																		'100%'
																	}
																	display={
																		'flex'
																	}
																	alignItems={
																		'center'
																	}
																	pl={4}
																>
																	<Typography
																		variant={
																			'subtitle1'
																		}
																		textAlign={
																			'center'
																		}
																	>
																		-
																	</Typography>
																</Box>
															</Grid>
													  )}
											</Grid>
										</Box>
									)
								)}
							</Box>
						</Box>
					</InternalServiceLayout>
				}
			</Box>
		</InternalServiceDrawer>
	);
};

export default Page;
