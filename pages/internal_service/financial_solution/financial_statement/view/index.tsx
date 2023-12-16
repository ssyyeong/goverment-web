import { Box, Button, Grid, Typography } from '@mui/material';
import { NextPage } from 'next';
import React from 'react';
import { InternalServiceLayout } from '../../../../../src/views/layout/InternalServiceLayout';
import { IFinancialStatement } from '../../../../../src/@types/model';
import { useAppMember } from '../../../../../src/hooks/useAppMember';
import DefaultController from '@qillie-corp/ark-office-project/src/controller/default/DefaultController';
import moment from 'moment';
import { financialStatementConfig } from '../../../../../configs/data/FinancialStatementConfig';
import { useRouter } from 'next/router';
import { useUserAccess } from '../../../../../src/hooks/useUserAccess';
import SupportiButton from '../../../../../src/views/global/SupportiButton';

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
		// setTargetDate (moment.Moment 의 .endOf('years') 를 사용하여 연도의 마지막 날짜로 설정)
		const changedTargetDate = targetDate.clone();

		if (direction === 'previous') {
			changedTargetDate.subtract(1, 'years');
		} else {
			if (changedTargetDate.year() !== moment().year()) {
				changedTargetDate.add(1, 'years');
			}
		}

		setTargetDate(changedTargetDate);
	};

	//* Hooks
	/**
	 * 유저 정보 가져오는 훅
	 */
	// const memberId = useAppMember();
	const memberId = 3;

	/**
	 * 페이지 진입 시 유저 권한 검사
	 */
	// const userAccess = useUserAccess('BUSINESS_MEMBER');
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
					SORT_KEY: 'STANDARD_YEAR',
					SORT_DIRECTION: 'DESC',
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
		<Box
			sx={{
				display: 'flex',
				alignItems: 'space-between',
				flexDirection: 'column',
				p: 10,
			}}
		>
			{/* 컨텐츠 레이아웃 */}
			{userAccess === true && (
				<InternalServiceLayout>
					{/* 컨트롤러 */}
					<Box>
						<Grid container alignItems={'center'}>
							{/* 데이터 편집 및 추출 */}
							<Grid item xs={12} md={6}>
								<Box display={'flex'}>
									{/* 편집 페이지로 이동 */}
									<Box>
										<SupportiButton
											contents="편집하기"
											isGradient={true}
											onClick={() => {
												router.push(
													'/internal_service/business_info/view'
												);
											}}
											style={{ color: 'white' }}
										/>
									</Box>
									{/* 엑셀 추출 버튼 */}
									<Box>{/* <ExcelDownloadButton /> */}</Box>
								</Box>
							</Grid>

							{/* 페이징 버튼 */}
							<Grid item xs={12} md={6}>
								<Box
									display={'flex'}
									justifyContent={'flex-end'}
								>
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
						<Box sx={{ backgroundColor: '#305ddc' }}>
							<Grid container>
								{/* 각 재무제표 항목 */}
								<Grid item xs={6} md={3}>
									<Box border={0.5} borderColor={'#bebebe'}>
										<Typography
											textAlign={'center'}
											variant={'body1'}
											fontWeight={'700'}
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
										}}
									>
										<Box
											border={0.5}
											borderColor={'#bebebe'}
										>
											<Typography
												textAlign={'center'}
												variant={'body1'}
												fontWeight={'700'}
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
															'#d2d2d2',
													}}
													border={0.5}
													borderColor={'#bebebe'}
													pl={
														financialStatementMapping.isHighlighted
															? 3
															: 1
													}
													py={'15.7px'}
													pr={2}
												>
													<Typography
														variant={'body1'}
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
															borderColor={
																'#bebebe'
															}
															width={'100%'}
															height={'100%'}
															display={'flex'}
															alignItems={
																'center'
															}
															justifyContent={
																'center'
															}
														>
															<Typography
																variant={
																	'body1'
																}
																textAlign={
																	'center'
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
