import { Box, Button, Grid, TextField, Typography } from '@mui/material';
import { NextPage } from 'next';
import React from 'react';
import { InternalServiceLayout } from '../../../../../src/views/layout/InternalServiceLayout';
import {
	IBusiness,
	IFinancialStatement,
} from '../../../../../src/@types/model';
import { useAppMember } from '../../../../../src/hooks/useAppMember';
import DefaultController from '@leanoncompany/supporti-ark-office-project/src/controller/default/DefaultController';
import moment from 'moment';
import { financialStatementConfig } from '../../../../../configs/data/FinancialStatementConfig';
import { useRouter } from 'next/router';
import SupportiButton from '../../../../../src/views/global/SupportiButton';
import InternalServiceDrawer from '../../../../../src/views/local/internal_service/common/InternalServiceDrawer/InternalServiceDrawer';
import { useUserAccess } from '../../../../../src/hooks/useUserAccess';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
/**
 * 재무제표 편집 페이지
 */
const Page: NextPage = () => {
	//* Modules
	/**
	 * 라우터
	 */
	const router = useRouter();

	/**
	 * 비즈니스 개요 컨트롤러
	 */
	const businessController = new DefaultController('Business');

	/**
	 * 재무제표 컨트롤러
	 */
	const financialStatementController = new DefaultController(
		'FinancialStatement'
	);

	//* Constants
	/**
	 * 해당 연도에 재무제표가 없을 시 기본 재무제표
	 */
	const defaultFinancialStatement: IFinancialStatement = (() => {
		let result: { [key: string]: any } = {};

		financialStatementConfig.map((financialStatementMapping) => {
			result[financialStatementMapping.key] = 0;
		});

		return result;
	})();

	//* States
	/**
	 * 비즈니스 개요
	 */
	const [business, setBusiness] = React.useState<IBusiness>();

	/**
	 * 재무제표 관련 값
	 */
	const [financialStatement, setFinancialStatement] =
		React.useState<IFinancialStatement>({ ...defaultFinancialStatement });

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
	const changeTargetDate = (direction: 'previous' | 'next') => {
		// setTargetDate (moment.Moment 의 .endOf('years') 를 사용하여 연도의 마지막 날짜로 설정)
		const changedTargetDate = targetDate.clone();

		if (direction === 'previous') {
			changedTargetDate.subtract(1, 'years');
		} else {
			if (changedTargetDate.year() !== moment().subtract(1, 'y').year()) {
				changedTargetDate.add(1, 'years');
			}
		}

		setTargetDate(changedTargetDate);
	};

	/**
	 * 재무제표 저장 함수
	 * upsert 형태로 수행
	 */
	const saveFinancialStatement = () => {
		if (memberId !== undefined) {
			if (
				financialStatement[
					'FINANCIAL_STATEMENT_IDENTIFICATION_CODE'
				] === undefined
			) {
				//* 새로운 재무제표를 생성하는 경우
				financialStatementController.createItem(
					{
						BUSINESS_IDENTIFICATION_CODE:
							business?.BUSINESS_IDENTIFICATION_CODE,
						...financialStatement,
						STANDARD_YEAR: targetDate,
					},
					(res) => {
						//* 생성한 재무제표에 아이디 부여'
						console.log(res.data.result);
						setFinancialStatement({
							...financialStatement,
							FINANCIAL_STATEMENT_IDENTIFICATION_CODE:
								res.data.result
									.FINANCIAL_STATEMENT_IDENTIFICATION_CODE,
						});
						alert('재무제표를 생성했습니다.');
						router.push(
							'/internal_service/financial_solution/financial_statement'
						);
					},
					(err) => {
						alert('재무제표 생성에 실패했습니다.');
						console.log(err);
					}
				);
			} else {
				//* 기존 재무제표를 수정하는 경우
				financialStatementController.updateItem(
					{
						...financialStatement,
					},
					(res) => {
						alert('재무제표를 수정했습니다.');
						router.push(
							'/internal_service/financial_solution/financial_statement'
						);
					},
					(err) => {
						alert('재무제표 수정에 실패했습니다.');
					}
				);
			}
		} else {
			alert('로그인이 필요합니다.');
		}
	};

	//* Hooks
	/**
	 * 유저 정보 가져오는 훅
	 */
	// const memberId = 3;
	const { memberId } = useAppMember();

	/**
	 * 페이지 진입 시 유저 권한 검사
	 */
	const { access } = useUserAccess('BUSINESS_MEMBER');

	/**
	 * 재무제표 데이터 로드
	 */
	React.useEffect(() => {
		if (access && business) {
			financialStatementController.getOneItemByKey(
				{
					BUSINESS_IDENTIFICATION_CODE:
						business?.BUSINESS_IDENTIFICATION_CODE,
					STANDARD_YEAR: targetDate,
				},
				(res) => {
					if (res.data.result !== null) {
						setFinancialStatement(res.data.result);
					} else {
						/**
						 * 해당 연도에 값이 없을 시 기본 값으로 설정
						 */
						setFinancialStatement({ ...defaultFinancialStatement });
					}
				},
				(err) => {
					alert('재무제표 정보를 가져오는데 실패했습니다.');
				}
			);
		}
	}, [access, targetDate, business]);

	/**
	 * 비즈니스 개요 데이터 로드
	 */
	React.useEffect(() => {
		if (access && memberId) {
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
				{access === true && (
					<InternalServiceLayout>
						<Typography
							variant="h3"
							fontWeight={'bold'}
							sx={{ mb: 2 }}
						>
							재무제표
						</Typography>
						<Typography
							color={'secondary.dark'}
							sx={{ mb: 2 }}
							lineHeight={1.5}
						>
							재무제표를 등록하여 보다 쉽게 재무제표를 관리할 수
							있습니다.
							<br />
							* 한 번에 하나의 년도만 편집가능합니다.
							<br />* 작성 후 저장하기 버튼을 클릭하지 않고 이전
							또는 다음 버튼 클릭 시 작성하신 데이터가 사라집니다.
						</Typography>

						<Grid container alignItems={'center'}>
							{/* 데이터 편집 및 추출 */}
							<Grid item xs={6} md={3}>
								<Box display={'flex'}>
									{/* 저장하기 */}
									<Box>
										<SupportiButton
											contents="저장하기"
											isGradient={true}
											onClick={saveFinancialStatement}
											style={{
												color: 'white',
												py: 1.3,
												mb: 1,
											}}
										/>
									</Box>
								</Box>
							</Grid>

							{/* 페이징 버튼 */}
							<Grid item xs={6} md={3}>
								<Box
									display={'flex'}
									justifyContent={'center'}
									alignItems={'center'}
									mb={1}
								>
									{/* 이전 페이지 */}
									<Box>
										<Button
											onClick={() => {
												changeTargetDate('previous');
											}}
										>
											<ArrowBackIosNewIcon fontSize="small" />
										</Button>
									</Box>

									{/* 현재 연도 */}
									<Box>
										<Typography
											variant={'h6'}
											fontWeight={'500'}
											color={'primary'}
										>
											{targetDate.format('YYYY년')}
										</Typography>
									</Box>

									{/* 다음 페이지 */}
									<Box>
										<Button
											onClick={() => {
												changeTargetDate('next');
											}}
										>
											<ArrowForwardIosIcon fontSize="small" />
										</Button>
									</Box>
								</Box>
							</Grid>
						</Grid>

						{/* 테이블 */}
						<Box>
							<Grid container>
								{/* 각 재무제표 항목 */}
								<Grid item xs={6} md={3}>
									<Box
										border={0.5}
										borderColor={'rgba(185, 197, 255, 1)'}
										sx={{
											backgroundColor: '#305ddc',
											borderTopLeftRadius: 10,
											py: 1,
											px: 4,
										}}
									>
										<Typography
											textAlign={'center'}
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
								<Grid item xs={6} md={3}>
									<Box
										border={0.5}
										borderColor={'rgba(185, 197, 255, 1)'}
										sx={{
											backgroundColor: '#305ddc',
											borderTopRightRadius: 10,
										}}
										py={1}
										px={4}
									>
										<Typography
											textAlign={'center'}
											variant={'h6'}
											fontWeight={'500'}
											color={'white'}
											pt={1}
											pb={1}
										>
											{targetDate.format('YYYY.MM.DD')}
										</Typography>
									</Box>
								</Grid>
							</Grid>

							{/* 테이블 바디 */}
							<Box>
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
																	? 3
																	: 1
															}
															pr={2}
															height={'100%'}
															display={'flex'}
															alignItems={
																'center'
															}
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

													{/* 각 재무제표 값 */}
													<Grid item xs={6} md={3}>
														<Box
															border={0.5}
															borderColor={
																'rgba(185, 197, 255, 1)'
															}
															bgcolor={'white'}
														>
															<TextField
																type={'number'}
																value={
																	financialStatement[
																		financialStatementMapping
																			.key
																	]
																}
																onChange={(
																	e
																) => {
																	setFinancialStatement(
																		{
																			...financialStatement,
																			[financialStatementMapping.key]:
																				e
																					.target
																					.value,
																		}
																	);
																}}
																fullWidth
															/>
														</Box>
													</Grid>
												</Grid>
											</Box>
										)
									)}
								</Box>
							</Box>
						</Box>
					</InternalServiceLayout>
				)}
			</Box>
		</InternalServiceDrawer>
	);
};

export default Page;
