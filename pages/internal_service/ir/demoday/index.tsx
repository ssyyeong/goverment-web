import React from 'react';

import { NextPage } from 'next';

import { Box, BoxProps, Grid, Typography } from '@mui/material';
import { InternalServiceLayout } from '../../../../src/views/layout/InternalServiceLayout';
import InternalServiceDrawer from '../../../../src/views/local/internal_service/common/InternalServiceDrawer';
import AccordianBox from '../../../../src/views/local/common/AccordianBox/AccordianBox';
import DefaultController from '@leanoncompany/supporti-ark-office-project/src/controller/default/DefaultController';
import moment from 'moment';
import { useRouter } from 'next/router';
import SupportiButton from '../../../../src/views/global/SupportiButton';
import { useAppMember } from '../../../../src/hooks/useAppMember';

const Page: NextPage = () => {
	//* Modules
	const router = useRouter();

	/**
	 * 유저 아이디 가져오는 훅
	 */
	const { memberId } = useAppMember();
	//* Controller
	const irProductController = new DefaultController('IrProduct');
	const userIrDataController = new DefaultController('UserIrInformation');
	const irApplicationController = new DefaultController('IrApplication');
	const appMemberController = new DefaultController('AppMember');
	//* Constants
	//* States
	/**
	 * 데모데이 데이터
	 */
	const [demoDayData, setDemoDayData] = React.useState<any>();
	/**
	 * userIrData 존재 여부
	 */
	const [userIrData, setUserIrData] = React.useState<boolean>(false);
	/**
	 * 유저 전화번호
	 */
	const [irContactNum, setIrContactNum] = React.useState<string>('');

	//* Functions
	/**
	 * 데모데이 데이터 조회
	 */
	const getDemoDayData = () => {
		irProductController.getData(
			{
				FIND_OPTION_KEY_LIST: {
					APP_MEMBER_IDENTIFICATION_CODE: memberId,
				},
			},
			`${irProductController.mergedPath}/find_all`,
			(res) => {
				setDemoDayData(res.data.result);
			},
			(err) => {
				console.log(err);
			}
		);
	};
	/**
	 * IR 정보 여부 확인
	 */
	const checkIrData = () => {
		userIrDataController.getOneItemByKey(
			{
				APP_MEMBER_IDENTIFICATION_CODE: memberId,
			},
			(res) => {
				if (res.data.result === null) {
					setUserIrData(false);
				} else {
					setUserIrData(true);
				}
			},
			(err) => {}
		);
	};
	/**
	 * 유저 정보 가져오기
	 */
	React.useEffect(() => {
		appMemberController.getData(
			{},
			`${appMemberController.mergedPath}/profile`,
			(res) => {
				if (res.data.result !== null) {
					setIrContactNum(res.data.result.PHONE_NUMBER);
				}
			}
		);
	}, []);

	/**
	 * 데모데이 신청
	 */
	const irApply = (demodayId, duedate) => {
		if (!userIrData) {
			let noIrData = confirm('IR 정보를 먼저 등록해주세요.');
			if (noIrData) {
				router.push('/internal_service/ir/management');
			}
			return;
		}
		if (moment(duedate).isBefore(moment())) {
		}

		irApplicationController.createItem(
			{
				APP_MEMBER_IDENTIFICATION_CODE: memberId,
				IR_PRODUCT_IDENTIFICATION_CODE: demodayId,
				CONTACT_NUMBER: irContactNum,
			},
			(res) => {
				alert('신청이 완료되었습니다.');
				getDemoDayData();
			},
			(err) => {
				if (err.response.data.message === '이미 신청한 IR입니다.') {
					alert('이미 신청한 데모데이입니다.');
				}
				if (
					err.response.data.message === '구독 회원만 이용 가능합니다.'
				) {
					alert('구독 회원만 이용 가능합니다.');
				}
			}
		);
	};
	//* Hooks
	React.useEffect(() => {
		if (memberId) {
			checkIrData();
			getDemoDayData();
		}
	}, [memberId]);
	return (
		<InternalServiceDrawer type="dashboard">
			<Box bgcolor={'primary.light'} sx={{ p: { sm: 5, xs: '0' } }}>
				{/* 컨텐츠 레이아웃 */}
				<InternalServiceLayout
					title="IR"
					subTitle="서포티를 통해 IR deck,기업 정보를 관리하고 직접 투자활동에 참여해보세요."
					image="/images/main/supportbusiness.png"
					mobileImage="/images/main/supportbusinessmobile.png"
				>
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
						>
							<Box>
								<Typography
									variant="h3"
									fontWeight={'bold'}
									sx={{ mb: 2 }}
								>
									데모데이
								</Typography>
								<Typography
									color={'secondary.dark'}
									sx={{ mb: 2 }}
								>
									데모데이는 기업의 제품, 서비스, 기술 등을
									소개하고 투자자들과의 소통을 통해 투자유치를
									목표로 하는 행사입니다.
								</Typography>
							</Box>
						</Box>
						{/* 본문 */}
						<Box mt={2} bgcolor={'white'} p={4} borderRadius={3}>
							<Typography variant="h6" fontWeight={'600'} mb={2}>
								데모데이 리스트
							</Typography>
							{demoDayData?.rows.map((demoday) => {
								return (
									<AccordianBox
										title={
											<Box
												display={'flex'}
												alignItems={'center'}
												gap={1}
											>
												<Typography fontWeight={'bold'}>
													{demoday.TITLE}
												</Typography>
												<Typography
													variant="body2"
													sx={{
														textDecoration:
															'underline',
														cursor: 'pointer',
													}}
													onClick={() => {
														window.open(
															JSON.parse(
																demoday.IMAGE_LIST
															)[0],
															'_blank'
														);
													}}
												>
													자세히 보기
												</Typography>
											</Box>
										}
										content={'답변이 등록되지 않았습니다.'}
										created_at={demoday.IR_DATE}
										additional={demoday.CONTENT}
										type={
											<Box
												display={'flex'}
												alignItems={'center'}
												gap={0.6}
											>
												<Typography
													variant="body2"
													color={
														moment(
															demoday.DUE_DATE
														).isAfter(moment())
															? 'primary'
															: 'grey'
													}
													p={0.5}
													borderColor={
														moment(
															demoday.DUE_DATE
														).isAfter(moment())
															? 'primary.light'
															: 'grey'
													}
													borderRadius={3}
													border={1}
												>
													{moment(
														demoday.DUE_DATE
													).isAfter(moment())
														? '모집중'
														: '마감'}
												</Typography>
												<Typography
													color={'primary'}
													fontWeight={'bold'}
												>
													{demoday.IrApplications
														.length === 0
														? '미신청'
														: demoday
																.IrApplications[0]
																.ADOPTED_YN ===
														  'Y'
														? '선정'
														: '미선정'}
												</Typography>
											</Box>
										}
										notAQna
										additionalComponent={
											<Box width={'100%'}>
												{/* 마감일, 개최일 */}
												<Grid container mb={2} p={1}>
													<Grid
														sm={4}
														display={'flex'}
														gap={2}
													>
														<Typography
															fontWeight={'600'}
														>
															신청마감일
														</Typography>
														<Typography>
															{moment(
																demoday.DUE_DATE
															).format(
																'YYYY-MM-DD'
															)}{' '}
															17:00
														</Typography>
													</Grid>
													<Grid
														sm={4}
														display={'flex'}
														gap={2}
													>
														<Typography
															fontWeight={'600'}
														>
															선정 마감일
														</Typography>
														<Typography>
															{moment(
																demoday.ADOPTION_DATE
															).format(
																'YYYY-MM-DD'
															)}{' '}
															18:00
														</Typography>
													</Grid>
													<Grid
														sm={4}
														display={'flex'}
														gap={2}
													>
														<Typography
															fontWeight={'600'}
														>
															데모데이 개최일
														</Typography>
														<Typography>
															{moment(
																demoday.IR_DATE
															).format(
																'YYYY-MM-DD'
															)}
														</Typography>
													</Grid>
												</Grid>
												<Box
													sx={{
														height: '400px',
														overflowY: 'auto',
													}}
												>
													<img
														src={
															JSON.parse(
																demoday.IMAGE_LIST
															)[0]
														}
														style={{
															width: '100%',
															objectFit: 'cover',
															overflowY: 'auto',
														}}
													/>
												</Box>
												<Box mt={2}>
													<Typography
														fontWeight={'600'}
													>
														신청내역
													</Typography>
													<Box
														mt={1}
														bgcolor={'white'}
														borderRadius={3}
														width={'100%'}
														p={2}
													>
														{demoday.IrApplications
															.length === 0 ? (
															<Typography
																variant="body1"
																fontWeight={
																	'600'
																}
																p={2}
																textAlign={
																	'center'
																}
															>
																신청내역이
																없습니다.
															</Typography>
														) : (
															<Box
																display={'flex'}
																flexDirection={
																	'column'
																}
																gap={2}
															>
																<Box
																	display={
																		'flex'
																	}
																	gap={2}
																>
																	<Typography
																		color={
																			'grey'
																		}
																		fontWeight={
																			'600'
																		}
																	>
																		신청
																		일자
																	</Typography>
																	<Typography
																		fontWeight={
																			'600'
																		}
																	>
																		{moment(
																			demoday
																				.IrApplications[0]
																				.CREATED_AT
																		).format(
																			'YYYY-MM-DD'
																		)}
																	</Typography>
																</Box>
																<Box
																	display={
																		'flex'
																	}
																	gap={2}
																>
																	<Typography
																		color={
																			'grey'
																		}
																		fontWeight={
																			'600'
																		}
																	>
																		연락처
																	</Typography>
																	<Typography
																		fontWeight={
																			'600'
																		}
																	>
																		{
																			demoday
																				.IrApplications[0]
																				.CONTACT_NUMBER
																		}
																	</Typography>
																</Box>
																<Box
																	display={
																		'flex'
																	}
																	gap={2}
																>
																	<Typography
																		color={
																			'grey'
																		}
																		fontWeight={
																			'600'
																		}
																	>
																		선정여부
																	</Typography>
																	<Typography
																		fontWeight={
																			'600'
																		}
																	>
																		{demoday
																			.IrApplications[0]
																			.ADOPTED_YN ===
																		'Y'
																			? '선정'
																			: '미선정'}
																	</Typography>
																</Box>
															</Box>
														)}
													</Box>
													{demoday.IrApplications
														.length === 0 &&
														moment(
															demoday.DUE_DATE
														).isAfter(moment()) && (
															<Box
																justifyContent={
																	'flex-end'
																}
																display={'flex'}
																mt={2}
															>
																<SupportiButton
																	contents={
																		'신청하기'
																	}
																	onClick={() => {
																		irApply(
																			demoday.IR_PRODUCT_IDENTIFICATION_CODE,
																			demoday.DUE_DATE
																		);
																	}}
																	variant="contained"
																	isGradient
																	disabledGutters
																	style={{
																		width: '100px',
																		height: '30px',
																	}}
																/>
															</Box>
														)}
												</Box>
											</Box>
										}
									/>
								);
							})}
						</Box>
					</Box>
				</InternalServiceLayout>
			</Box>
		</InternalServiceDrawer>
	);
};

export default Page;
