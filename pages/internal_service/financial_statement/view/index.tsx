import { Box, Button, Grid, Typography } from '@mui/material';
import { NextPage } from 'next';
import React from 'react';
import { InternalServiceLayout } from '../../../../src/views/layout/InternalServiceLayout';
import { IFinancialStatement } from '../../../../src/@types/model';
import { useAppMember } from '../../../../src/hooks/useAppMember';
import DefaultController from '@qillie-corp/ark-office-project/src/controller/default/DefaultController';
import moment from 'moment';
import { financialStatementConfig } from '../../../../configs/data/FinancialStatementConfig';
import { useRouter } from 'next/router';

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

	//* States
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
		moment().endOf('years')
	);

	//* Functions
	/**
	 * 타겟 연도 변경 함수
	 */
	const changeTargetDate = (direction: 'previous' | 'next') => {
		setTargetDate(
			direction === 'previous'
				? targetDate.subtract(1, 'years')
				: targetDate.add(1, 'years')
		)
		// setTargetDate
	};
 
	//* Hooks
	/**
	 * 유저 정보 가져오는 훅
	 */
	const memberId = useAppMember();

	/**
	 * 페이지 진입 시 유저 권한 검사
	 */
	// const userAccess = useUserAccess('SUBSCRIPTION');
	const userAccess = true;

	/**
	 * 재무제표 데이터 로드
	 */
	React.useEffect(() => {
		if (userAccess && memberId) {
			financialStatementController.getAllItems(
				{
					APP_MEMBER_IDENTIFICATION_CODE: 1,
					PERIOD_TARGET_KEY: 'STANDARD_YEAR',
					PERIOD_END: targetDate,
					LIMIT: 3,
				},
				(res) => {
					setFinancialStatementList(res.data.result.rows);
				},
				(err) => {
					alert('재무제표 정보를 가져오는데 실패했습니다.');
				}
			);
		}
	}, [userAccess, targetDate, memberId]);

	return (
		<Box sx={{
			display: 'flex',
			alignItems: 'space-between',
			flexDirection: 'column',
			p: 10,
		}}>
			{/* 컨텐츠 레이아웃 */}
			{userAccess === true && (
				<InternalServiceLayout >
					{/* 컨트롤러 */}
					<Box>
						<Grid container>
							{/* 데이터 편집 및 추출 */}
							<Grid item xs={12} md={6}>
								<Box display={'flex'}>
									{/* 편집 페이지로 이동 */}
									<Box>
										<Button
											variant={'contained'}
											sx={{
												backgroundColor: '#d2d2d2'
											}}
											onClick={() => {
												router.push(
													'/internal_service/financial_statement/edit'
												);
											}}
										>
											<Typography variant="h4" color={'black'} width={100}>
											편집하기
											</Typography>
										</Button>
										</Box>
									{/* 엑셀 추출 버튼 */}
									<Box>{/* <ExcelDownloadButton /> */}</Box>
								</Box>
							</Grid>

							{/* 페이징 버튼 */}
							<Grid item xs={12} md={6}>
								<Box display={'flex'}>
									{/* 이전 페이지 */}
									<Box>
										<Button
											onClick={() => {
												changeTargetDate('previous');
											}}
										>
											이동
										</Button>
									</Box>

									{/* 다음 페이지 */}
									<Box>
										<Button
											onClick={() => {
												changeTargetDate('next');
											}}
										>
											다음
										</Button>
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
									<Box ></Box>
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
										}}
									>
										<Box></Box>
									</Grid>
								))}
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
														backgroundColor: '#d2d2d2',
													}}
													border={0.5}
													borderColor={'#bebebe'}
													pl={
														financialStatementMapping.isHighlighted
															? 3
															: 1
													} 
													pr={2}
													pt={1}
													pb={1}
												>
													<Typography
														variant={
															'body1'
														}
														fontWeight={
															financialStatementMapping.isHighlighted
																? '700'
																: '400'
														} // 값 설정해야함* 값 설정한 뒤 해당 주석 지울 것
													>
														{
															financialStatementMapping.label
														}
													</Typography>
												</Box>
											</Grid>

											{/* 연도별 헤더 (PC 에서는 3개까지, 모바일에서는 1개까지 뷰) */}
											{financialStatementList.map(
												(financialStatement, index) => (
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
														}}
													>
														<Box
														border={0.5}
														borderColor={'#bebebe'}
														>
															<Typography
																variant={'h6'}
																align='center'
															>
																{
																	financialStatement[
																		financialStatementMapping
																			.key
																	]
																}
															</Typography>
														</Box>
													</Grid>
												)
											)}
										</Grid>
									</Box>
								)
							)}
						</Box>
					</Box>
				</InternalServiceLayout>
			)}
		</Box>
	);
};

export default Page;
