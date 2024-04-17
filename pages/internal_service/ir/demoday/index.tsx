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
import { SupportiAlertModal } from '../../../../src/views/global/SupportiAlertModal';
import useAlert from '../../../../src/hooks/useAlert/useAlert';
import IrDataModal from '../../../../src/views/local/internal_service/ir/IrDataModal/IrDataModal';
import { gTagEvent } from '../../../../src/lib/gtag';
import { AppMemberController } from '../../../../src/controller/AppMemberController';

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
	const appMemberController = new AppMemberController();
	//* Constants
	const selectableIndicatorList = [
		{
			name: '데모데이',
			path: '/internal_service/ir/demoday',
		},
		// {
		// 	name: 'IR 데이터',
		// 	path: '/internal_service/ir/management',
		// 	loginRequired: true,
		// },
	];
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
	/**
	 * ir 데이터 모달
	 */
	const [irDataModal, setIrDataModal] = React.useState<boolean>(false);

	/**
		유저 가입 날짜
	*/
	const [userCreatedDate, setUserCreatedDate] =
		React.useState<string>(undefined);

	//* Functions
	/**
	 * 데모데이 데이터 조회
	 */
	const getDemoDayData = (id?: number) => {
		irProductController.getData(
			{
				FIND_OPTION_KEY_LIST: {
					APP_MEMBER_IDENTIFICATION_CODE: id,
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
	const checkIrData = (id?: number) => {
		userIrDataController.getOneItemByKey(
			{
				APP_MEMBER_IDENTIFICATION_CODE: id,
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
	 * 데모데이 신청
	 */
	const irApplyCheck = (duedate) => {
		if (!memberId) {
			let notLogin = confirm('로그인 후 이용 가능합니다.');
			if (notLogin) {
				router.push('/auth/sign_in');
			}
			return;
		}
		if (!userIrData) {
			let noIrData = confirm('IR 정보를 먼저 등록해주세요.');
			if (noIrData) {
				router.push('/internal_service/ir/management');
			}
			return;
		}
		const five = moment(duedate).format('YYYY-MM-DD 17:00');

		if (moment(five).isBefore(moment())) {
			alert('신청이 마감되었습니다.');
			return;
		}

		setOpen(true);
	};

	const irApply = (demodayId) => {
		irApplicationController.createItem(
			{
				APP_MEMBER_IDENTIFICATION_CODE: memberId,
				IR_PRODUCT_IDENTIFICATION_CODE: demodayId,
				CONTACT_NUMBER: irContactNum,
			},
			(res) => {
				alert('신청이 완료되었습니다.');
				setOpen(false);
				getDemoDayData(memberId);
			},
			(err) => {
				if (err.response.data.message === '이미 신청한 IR입니다.') {
					alert('이미 신청한 데모데이입니다.');
				}
				// if (
				// 	err.response.data.message === '구독 회원만 이용 가능합니다.'
				// ) {
				// 	alert('구독 회원만 이용 가능합니다.');
				// }
			}
		);
	};

	/**
	 *  가입 이후 진행된 데모데이 갯수 계산
	 */
	const calcDemoday = () => {
		let totalCount = 0;

		demoDayData?.rows.map((demoday) => {
			if (
				moment(moment(demoday.DUE_DATE).format('YYYY-MM-DD')).isAfter(
					userCreatedDate
				)
			) {
				totalCount++;
			}
		});

		return totalCount;
	};

	//* Hooks
	/**
	 * 알러트
	 */
	const { open, setOpen, setType, type } = useAlert({});

	React.useEffect(() => {
		appMemberController.getProfile(
			{},
			(res) => {
				if (res.data.result !== null) {
					setIrContactNum(res.data.result.PHONE_NUMBER);
					checkIrData(res.data.result.APP_MEMBER_IDENTIFICATION_CODE);
					getDemoDayData(
						res.data.result.APP_MEMBER_IDENTIFICATION_CODE
					);
					setUserCreatedDate(res.data.result.CREATED_AT);
				} else {
				}
			},
			(err) => {
				getDemoDayData();
				checkIrData();
			}
		);
	}, []);

	console.log(demoDayData);
	return (
		// <InternalServiceDrawer type="dashboard">
		<Box bgcolor={'primary.light'} sx={{ p: { xs: 2, md: 10 } }}>
			{/* 컨텐츠 레이아웃 */}
			<InternalServiceLayout
				title="IR"
				subTitle="서포티를 통해 IR deck,기업 정보를 관리하고 직접 투자활동에 참여해보세요."
				image="/images/main/supportbusiness.png"
				mobileImage="/images/main/supportbusinessmobile.png"
			>
				{/* 지표 (재무지표/법인계좌관리) 선택 영역 */}
				<Box display={'flex'} gap={3} mb={2}>
					{selectableIndicatorList.map((selectableIndicator) => (
						<Typography
							variant="h3"
							fontWeight={'700'}
							onClick={() => {
								// if (
								// 	selectableIndicator?.loginRequired &&
								// 	!memberId
								// ) {
								// 	alert('로그인 후 이용 가능합니다.');
								// 	return;
								// }
								router.push(selectableIndicator.path);
							}}
							sx={{
								color:
									router.pathname === selectableIndicator.path
										? 'black'
										: 'grey',
								cursor: 'pointer',
							}}
						>
							{selectableIndicator.name}
						</Typography>
					))}
				</Box>
				{/* 컨텐츠 */}
				<Box display={'flex'} flexDirection={'column'} width={'100%'}>
					{/* 타이틀 */}
					<Box
						display={'flex'}
						justifyContent={'space-between'}
						alignItems={'center'}
					>
						<Box>
							{/* <Typography
								variant="h3"
								fontWeight={'bold'}
								sx={{ mb: 2 }}
							>
								데모데이
							</Typography> */}
							<Typography color={'secondary.dark'} sx={{ mb: 2 }}>
								데모데이는 기업의 제품, 서비스, 기술 등을
								소개하고 투자자들과의 소통을 통해 투자유치를
								목표로 하는 행사입니다.
							</Typography>
						</Box>
					</Box>
					{/** 합격률, 참여율 */}
					{memberId && (
						<Box
							mt={2}
							display="flex"
							width="100%"
							gap={2}
							flexWrap="wrap"
						>
							<Box
								bgcolor={'white'}
								p={4}
								borderRadius={3}
								width="49%"
								display="flex"
								justifyContent="space-between"
								flexWrap="wrap"
							>
								<Box display="flex" gap={1}>
									<Typography
										variant="h6"
										fontWeight={'600'}
										mb={2}
									>
										총 선정률
									</Typography>
									<Typography
										variant="body2"
										fontWeight={'500'}
										color="secondary.main"
										mt={0.5}
									>
										총 선정 개수 / 총 지원 개수
									</Typography>
								</Box>
								<Typography
									variant="h1"
									fontWeight={'700'}
									color="primary.main"
								>
									{demoDayData?.passedRate}%
								</Typography>
							</Box>
							<Box
								bgcolor={'white'}
								p={4}
								borderRadius={3}
								width="49%"
								display="flex"
								justifyContent="space-between"
								flexWrap="wrap"
							>
								<Box display="flex" gap={1}>
									<Typography
										variant="h6"
										fontWeight={'600'}
										mb={2}
									>
										데모데이 수
									</Typography>
									<Typography
										variant="body2"
										fontWeight={'500'}
										color="secondary.main"
										mt={0.5}
									>
										가입이후 진행된 데모데이
									</Typography>
								</Box>
								<Typography
									variant="h1"
									fontWeight={'700'}
									color="primary.main"
								>
									{`${calcDemoday()}`}개
								</Typography>
							</Box>
						</Box>
					)}
					{/* 본문 */}
					<Box mt={2} bgcolor={'white'} p={4} borderRadius={3}>
						<Typography variant="h6" fontWeight={'600'} mb={2}>
							데모데이 리스트
						</Typography>
						{demoDayData?.rows.map((demoday) => {
							return (
								<AccordianBox
									additionalOpenFunction={() => {
										gTagEvent({
											action: 'ir_demo_day',
											category: 'ir_demo_day',
											label: 'ir_demo_day',
											value: 1,
										});
									}}
									title={
										<Box
											display={'flex'}
											gap={2}
											p={1}
											flexDirection="column"
										>
											<Typography fontWeight={'bold'}>
												{demoday.TITLE}
											</Typography>
											<Box display={'flex'} gap={2}>
												<Box display={'flex'} gap={2}>
													<Typography
														fontWeight={'600'}
													>
														개최일
													</Typography>
													<Typography>
														{moment(
															demoday.IR_DATE
														).format('YYYY-MM-DD')}
													</Typography>
												</Box>
												<Typography fontWeight={'600'}>
													장소
												</Typography>
												<Typography>
													{moment(
														demoday.DUE_DATE
													).format('YYYY-MM-DD')}{' '}
													17:00
												</Typography>
												<Box display={'flex'} gap={2}>
													<Typography
														fontWeight={'600'}
													>
														시간
													</Typography>
													<Typography>
														{moment(
															demoday.DUE_DATE
														).format(
															'YYYY-MM-DD'
														)}{' '}
														17:00
													</Typography>
												</Box>
											</Box>
											{demoday?.PRIVATE_YN === 'Y' && (
												<Typography
													sx={{
														letterSpacing: 0.3,
														wordBreak: 'keep-all',
														lineHeight: 1.5,
													}}
												>
													[안내] 해당 데모데이는
													투자사와의 협약으로 진행되는
													프라이빗 데모데이입니다.
													일부 투자사와 일부 고객사
													소수인원으로 진행됩니다.
													다음 정기 데모데이때 만나요
													:)
												</Typography>
											)}
											{/* <Typography
												variant="body2"
												sx={{
													textDecoration: 'underline',
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
											</Typography> */}
										</Box>
									}
									content={'답변이 등록되지 않았습니다.'}
									additional={demoday.CONTENT}
									type={
										<Box
											display={'flex'}
											alignItems={'center'}
											gap={1}
										>
											<Typography
												variant="body2"
												color={
													moment(
														moment(
															demoday.DUE_DATE
														).format(
															'YYYY-MM-DD 17:00'
														)
													).isAfter(moment())
														? 'primary'
														: 'grey'
												}
												px={0.8}
												py={0.5}
												ml={1}
												borderColor={
													moment(
														moment(
															demoday.DUE_DATE
														).format(
															'YYYY-MM-DD 17:00'
														)
													).isAfter(moment())
														? 'primary.light'
														: 'grey'
												}
												borderRadius={2}
												border={1}
											>
												{moment(
													moment(
														demoday.DUE_DATE
													).format('YYYY-MM-DD 17:00')
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
													: demoday.IrApplications[0]
															.ADOPTED_YN === 'Y'
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
														신청 마감일
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
											</Grid>
											<Box
												sx={
													{
														// height: '400px',
														// overflowY: 'auto',
													}
												}
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
											{demoday?.PRIVATE_YN === 'N' && 
											<Box mt={2}>
												<Typography fontWeight={'600'}>
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
															fontWeight={'600'}
															p={2}
															textAlign={'center'}
														>
															신청내역이 없습니다.
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
																display={'flex'}
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
																	신청 일자
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
																display={'flex'}
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
																display={'flex'}
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
															<Box
																display={'flex'}
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
																	제출한 IR
																	데이터
																</Typography>
																<Typography
																	fontWeight={
																		'600'
																	}
																	sx={{
																		textDecoration:
																			'underline',
																		cursor: 'pointer',
																	}}
																	onClick={() => {
																		setIrDataModal(
																			true
																		);
																	}}
																>
																	확인하기
																</Typography>
															</Box>
														</Box>
													)}
												</Box>
												{demoday.IrApplications
													.length === 0 &&
													moment(
														moment(
															demoday.DUE_DATE
														).format(
															'YYYY-MM-DD 17:00'
														)
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
																	irApplyCheck(
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
											</Box>}
											<SupportiAlertModal
												open={open}
												type="irApply"
												handleClose={() =>
													setOpen(false)
												}
												customHandleClose={() => {
													irApply(
														demoday.IR_PRODUCT_IDENTIFICATION_CODE
													);
												}}
											/>
											<IrDataModal
												irApplicationId={
													demoday.IrApplications[0]
														?.IR_APPLICATION_IDENTIFICATION_CODE
												}
												modalOpen={irDataModal}
												setModalOpen={setIrDataModal}
												canNotBeModified={
													demoday.IrApplications[0]
														?.ADOPTED_YN === 'Y' ||
													moment(
														moment(
															demoday.DUE_DATE
														).format(
															'YYYY-MM-DD 17:00'
														)
													).isBefore(moment())
												}
											/>
										</Box>
									}
								/>
							);
						})}
					</Box>
				</Box>
			</InternalServiceLayout>
		</Box>
		// </InternalServiceDrawer>
	);
};

export default Page;
