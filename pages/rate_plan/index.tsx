import {
	Box,
	Grid,
	Stack,
	Switch,
	Typography,
	IconButton,
	Tooltip,
} from '@mui/material';
import DefaultController from '@leanoncompany/supporti-ark-office-project/src/controller/default/DefaultController';
import { NextPage } from 'next';
import React, { useEffect } from 'react';
import CheckIcon from '@mui/icons-material/Check';
import { useRouter } from 'next/router';
import SupportiButton from '../../src/views/global/SupportiButton';
import BillingModal from '../../src/views/local/external_service/billingModal/BillingModal';
import { useUserAccess } from '../../src/hooks/useUserAccess';
import { SupportiAlertModal } from '../../src/views/global/SupportiAlertModal';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

import SupportiTheBlack from '../../src/modules/SupportiTheBlack/SupportiTheBlack';
import { useAppMember } from '../../src/hooks/useAppMember';
import Image from 'next/image';

const Page: NextPage = () => {
	//* Modules
	const ratePlanController = new DefaultController('SubscriptionProduct');
	const userSubscriptionController = new DefaultController(
		'UserSubscription'
	);
	const { memberId } = useAppMember();
	const router = useRouter();

	//* Constants
	/**
	 * 상단 고정 컨텐트
	 */
	const topContents = [
		{
			title: '파트너사 제공 서비스 이용',
			description: [
				'AWS $5000 크레딧',
				'세무기장 서비스 3개월 무료',
				'세무 법무 특허 노무 24시간 Q&A',
			],
		},
		{
			title: '사업, 투자전략 코칭 혜택',
			description: [
				'투자자 1:1 IR Deck 코칭 (60분)',
				'투자전략, 사업전략 전문가 커피챗 2회 (각 1시간) / 월',
				'월1회 프리미엄 강의 / 세미나 진행',
				'주1회 사업, 투자전략 온라인 Open Discussion 진행',
			],
		},
		{
			title: '서포티에서만 이용할 수 있는 부가 서비스',
			description: [
				'투자전략, 사업전략 24시간 Q&A',
				'투자자 매칭 서비스 (1회) : 단건 주단위 투자 관점 사업 마일스톤, 재무관리 서비스',
				'CEO 사업 Todo, 루틴관리 서비스',
				'마케팅 컨설팅 서비스 (1회)',
			],
			add: '* 해당서비스는 유료서비스입니다.',
		},
	];

	/**
	 * 서포티 블랙 모듈
	 */
	const supportiTheBlack = SupportiTheBlack({ memberId });

	/**
	 * 무료 구독권 상세 내용
	 */
	const contentsDetail = [
		{
			title: 'SUPPORTV',
			description: '스타트업 대상 무료 콘텐츠 뉴스레터',
		},
		{
			title: '서버지원',
			description: 'AWS 서버 무상지원 (5천불 상당)',
		},
		{
			title: '지표관리',
			description: '재무/성과지표 관리 서비스',
		},
		{
			title: '소셜링',
			description: '무료 세미나, 커뮤니티 등록',
		},
		{
			title: 'IR 피드백',
			description: 'IR Deck 등록시 심사역 무료 피드백 제공',
		},
	];

	/**
	 * 부가 서비스
	 */
	const additionalService = [
		// {
		// 	title: '투자전략, 사업전략 24시간 Q&A',
		// 	cost: '월 100,000원',
		// },
		{
			title: '투자자 매칭 서비스 (1회)',
			cost: '단건 300,000원',
		},
		// {
		// 	title: '주단위 투자 관점 사업 마일스톤, 재무관리 서비스',
		// 	cost: '월 100,000원',
		// },
		// {
		// 	title: 'CEO 사업 Todo, 루틴관리 서비스',
		// 	cost: '월 100,000원',
		// },
		{
			title: '멘토링 서비스 (1회)',
			cost: '단건 300,000원',
		},
	];

	//* States
	const [ratePlanList, setRatePlanList] = React.useState([]);
	const [payModal, setPayModal] = React.useState<boolean>(false);
	const [payModalData, setPayModalData] = React.useState<any>({});
	const [recommenderModal, setRecommenderModal] =
		React.useState<boolean>(false);
	const [permission, setPermission] = React.useState<boolean | undefined>(
		undefined
	);

	supportiTheBlack.checkPermission(setPermission);

	/**
	 * 알럿 모달
	 */
	const [alertModal, setAlertModal] = React.useState<boolean>(false);
	/**
	 * 알럿 모달 타입
	 */
	const [alertModalType, setAlertModalType] = React.useState<
		'success' | 'login' | 'subscribe' | 'point' | 'already'
	>('success');

	/**
	 * 구독 정보
	 */
	const [subscriptionInfo, setSubscriptionInfo] = React.useState<any>({});

	/**
	 * 연결제
	 */
	const [isYear, setIsYear] = React.useState<boolean>(false);

	//* Hooks
	const { access } = useUserAccess('SIGN_IN');

	/**
	 * 구독권 정보 가져오기
	 */
	useEffect(() => {
		memberId &&
			userSubscriptionController.getOneItemByKey(
				{
					APP_MEMBER_IDENTIFICATION_CODE: memberId,
					EXPIRED_YN: 'N',
					CANCELED_YN: 'N',
				},
				(res) => {
					setSubscriptionInfo(res.data.result);
				},
				(err) => {
					console.log(err);
				}
			);
	}, [memberId]);

	/**
	 * 요금제 리스트 조회
	 */
	useEffect(() => {
		ratePlanController.findAllItems(
			{
				SORT_KEY: 'ORDER',
				SORT_DIRECTION: 'ASC',
				ACTIVATED_YN: 'Y',
			},
			(res) => {
				setRatePlanList(res.data.result.rows);
			},
			(err) => {}
		);
	}, []);

	const label = { inputProps: { 'aria-label': 'Color switch demo' } };

	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'center',
				alignItems: 'center',
				width: '100%',
				px: { sm: 5, xs: 2 },
				bgcolor: 'primary.light',
			}}
		>
			<Box
				width="100vw"
				sx={{
					height: { sm: '680px', xs: '1050px' },
				}}
			>
				<img
					style={{
						zIndex: 10,
						width: '100%',
						height: '100%',
					}}
					src={'/images/main/mainBackgroundImg.jpg'}
					alt="img"
				/>
				<Box
					sx={{
						position: 'absolute',
						top: '78px',
						zIndex: 30,
						height: { sm: '680px', xs: '1050px' },
						textAlign: 'center',
						width: '100vw',
						bgcolor: 'rgba(0, 0, 0, 0.7)',
						pt: { sm: 15, xs: 10 },
					}}
				>
					<Typography
						variant="h1"
						zIndex={100}
						color={'white'}
						sx={{ wordBreak: 'keep-all' }}
					>
						가장 합리적인 요금제를 확인하세요 !
					</Typography>
					<Typography
						variant="h6"
						zIndex={100}
						color={'white'}
						my={2.5}
					>
						Suppor-T는 스타트업의 성장을 위해 지원합니다.
					</Typography>
					<Box
						display="flex"
						justifyContent={'space-around'}
						gap={2}
						mt={{ sm: 10, xs: 8 }}
						width="85vw"
						mx="auto"
						flexWrap="wrap"
					>
						{topContents.map((item, index) => {
							return (
								<Box
									sx={{
										borderRadius: '15px',
										bgcolor: 'white',
										padding: { sm: '20px', xs: '5px' },
										width: { sm: '30%', xs: '290px' },
										height: { sm: 'auto', xs: '240px' },
									}}
								>
									<Box
										sx={{
											borderRadius: 4,
											bgcolor: 'primary.light',
											width: '70px',
											mx: 'auto',
											p: 1,
											mb: 2,
											mt: 1.5,
										}}
									>
										<Typography
											color="primary.main"
											variant="h6"
										>
											혜택 {index + 1}
										</Typography>
									</Box>
									<Typography
										color="common.black"
										variant="h6"
										fontWeight={700}
										mb={1.5}
									>
										{item.title}
									</Typography>
									<Box>
										{item.description.map((desc, idx) => {
											return (
												<Typography
													variant="subtitle1"
													mb={0.2}
													sx={{
														wordBreak: 'keep-all',
													}}
												>
													{desc}
												</Typography>
											);
										})}
										{/* <CheckIcon /> */}
									</Box>
									<Typography
										variant="body1"
										mb={0.2}
										color="secondary.dark"
									>
										{item.add}
									</Typography>
								</Box>
							);
						})}
					</Box>
				</Box>
			</Box>

			<Box display="flex" gap={1} my={2} mt={20}>
				<Typography variant="h3"> 비즈니스에 적합한 </Typography>
				<Typography variant="h3" color="primary.main">
					프리권
				</Typography>
				<Typography variant="h3">을 알아보세요! </Typography>
			</Box>

			<Stack
				direction="row"
				spacing={0.5}
				alignItems="center"
				mt={10}
				ml="auto"
				mr={5}
			>
				<Typography>월 결제</Typography>
				<Switch
					{...label}
					checked={isYear}
					onChange={() => setIsYear(!isYear)}
				/>
				<Typography>연 결제</Typography>
			</Stack>
			<Box
				display={'flex'}
				// alignItems={'center'}
				gap={4}
				flexWrap={'wrap'}
				justifyContent={'center'}
				width={'100%'}
				// mt={10}
			>
				<Box
					sx={{
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
						width: '100%',
						boxShadow:
							'4px 17px 40px rgba(138.13, 138.13, 138.13, 0.15)',
						borderRadius: '20px',
						marginTop: '20px',
						maxWidth: '300px',
						minHeight: 696,
						bgcolor: 'white',
					}}
				>
					<Box
						sx={{
							borderTopLeftRadius: '20px',
							borderTopRightRadius: '20px',
							padding: 4,
							maxWidth: '300px',
							bgcolor: 'common.white',
							width: '100%',
							textAlign: 'center',
							mb: 2,
						}}
					>
						{/** 구독권 이름 */}
						<Typography
							variant="h5"
							fontWeight={500}
							color={'primary'}
							sx={{ mb: 2, wordBreak: 'break-all' }}
						>
							FREE
						</Typography>

						{/** 금액 */}
						{
							<Box display="flex" gap={1} justifyContent="center">
								<Typography
									variant="h2"
									fontWeight={'bold'}
									color={'primary'}
								>
									0 원
								</Typography>
								<Typography mt="auto" color={'primary'}>
									/ {isYear ? '연' : '월'}
								</Typography>
							</Box>
						}
					</Box>

					<Box
						sx={{
							padding: 2,
							maxWidth: '300px',
							width: '100%',
						}}
					>
						{/** 구독권 상세 내용 */}
						<Typography
							variant="subtitle1"
							sx={{
								mb: 3,
								px: 2,
								wordBreak: 'keep-all',
								textAlign: 'center',
							}}
							fontWeight={500}
						>
							서포티 도입을 고민하시는 분들에게 추천합니다.
						</Typography>
						{contentsDetail.map((item, idx) => {
							return (
								<Box>
									<Typography
										variant="subtitle1"
										sx={{
											mb: 2,
											wordBreak: 'break-all',
										}}
										fontWeight={600}
									>
										{item.title}
									</Typography>
									{item.description
										.split(',')
										.map((item, idx) => {
											return (
												<Box
													display="flex"
													justifyContent={
														'space-between'
													}
													mb={1}
												>
													<Typography
														sx={{
															wordBreak:
																'break-all',
														}}
														color={'secondary.dark'}
													>
														{idx + 1 + ') '}
														{item}
													</Typography>

													<img
														src={
															'/images/icons/ratePlanChecked.svg'
														}
														alt={'check'}
														style={{
															width: '16px',
															height: '16px',
														}}
													/>
												</Box>
											);
										})}

									{/** 구분선 */}
									<Box
										sx={{
											width: '270px',
											height: '1px',
											backgroundColor: 'secondary.light',
											mb: 1.5,
										}}
									/>
								</Box>
							);
						})}
					</Box>
				</Box>

				{ratePlanList.map((ratePlan, id) => {
					return (
						<Box
							key={id}
							sx={{
								display: 'flex',
								flexDirection: 'column',
								alignItems: 'center',
								width: '100%',
								boxShadow:
									'4px 17px 40px rgba(138.13, 138.13, 138.13, 0.15)',
								borderRadius: '20px',
								marginTop: '20px',
								maxWidth: '300px',
								minHeight: 625,
								bgcolor: 'white',
							}}
						>
							<Box
								sx={{
									borderTopLeftRadius: '20px',
									borderTopRightRadius: '20px',
									padding: 4,
									maxWidth: '300px',
									bgcolor:
										ratePlan.TYPE === 'PRODUCT'
											? '#6659EE'
											: ratePlan.TYPE === 'BLACK'
											? 'primary.main'
											: 'common.white',
									width: '100%',
									textAlign: 'center',
									mb: 1,
								}}
							>
								{/** 구독권 이름 */}
								<Typography
									variant="h5"
									fontWeight={500}
									color={
										ratePlan.TYPE === 'PRODUCT'
											? 'white'
											: ratePlan.TYPE === 'BLACK'
											? 'white'
											: 'primary'
									}
									sx={{ mb: 1.5, wordBreak: 'break-all' }}
								>
									{ratePlan.NAME}
								</Typography>

								{/** 금액 */}
								{ratePlan.TYPE !== 'WELCOME_EVENT' && (
									<Typography
										variant="h6"
										color={
											ratePlan.TYPE === 'PRODUCT'
												? 'white'
												: ratePlan.TYPE === 'BLACK'
												? 'white'
												: 'primary'
										}
										sx={{
											textDecoration: 'line-through',
											mt: 4,
										}}
									>
										{ratePlan.PRICE.toLocaleString()}
									</Typography>
								)}
								{/** 할인 적용된 금액 */}
								{
									<Box
										display="flex"
										gap={1}
										justifyContent="center"
									>
										<Typography
											variant="h2"
											fontWeight={'bold'}
											color={
												ratePlan.TYPE === 'BLACK'
													? 'white'
													: ratePlan.TYPE ===
													  'PRODUCT'
													? 'white'
													: 'primary'
											}
											sx={{ mt: 1 }}
										>
											{!isYear
												? ratePlan.DISCOUNT_PRICE.toLocaleString()
												: (
														Number(
															ratePlan.DISCOUNT_PRICE
														) *
														12 *
														0.8
												  ).toLocaleString()}
											원
										</Typography>

										<Typography mt="auto" color="white">
											/ {isYear ? '연' : '월'}
										</Typography>
									</Box>
								}
							</Box>

							<Box
								sx={{
									padding: 2,
									maxWidth: '300px',
									width: '100%',
								}}
							>
								{/** 추가 설명 */}
								{/* {ratePlan.TYPE !== 'WELCOME_EVENT' && (
									<Box display="flex" mb={1.5}>
										<Typography mr={0.5}>
											세미나 컨설팅 이용가능 포인트
										</Typography>
										<Typography
											color="primary"
											sx={{ textDecoration: 'underline' }}
										>
											{ratePlan.POINT_AMOUNT.toLocaleString()}{' '}
										</Typography>
										<Typography>제공</Typography>
									</Box>
								)} */}
								<Typography
									variant="subtitle1"
									sx={{
										mb: 3,
										px: 2,
										wordBreak: 'keep-all',
										textAlign: 'center',
									}}
									fontWeight={500}
								>
									{ratePlan.TYPE === 'PRODUCT'
										? '합리적인 지표 관리를 통해 성장하고 싶으신 분들에게 추천합니다.'
										: '내 사업만의 특별한 서비스를 지원받고 싶으신 분들에게 추천합니다.'}
								</Typography>

								{/** 구독권 상세 내용 */}

								{ratePlan.SubscriptionProductContents.map(
									(content, id) => {
										return (
											<Box>
												<Typography
													variant="subtitle1"
													sx={{
														mb: 1,
														wordBreak: 'break-all',
													}}
													fontWeight={600}
												>
													{content.TITLE}
												</Typography>
												{content.DETAIL.split(',').map(
													(item, idx) => {
														return (
															<Box
																display="flex"
																justifyContent={
																	'space-between'
																}
																mb={1}
															>
																<Box display="flex">
																	<Typography
																		sx={{
																			wordBreak:
																				'break-all',
																		}}
																		color={
																			'secondary.dark'
																		}
																	>
																		{idx +
																			1 +
																			') '}
																		{item}
																	</Typography>
																	{item.includes(
																		'시드권'
																	) && (
																		<Tooltip
																			title={
																				'확인'
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
																			<IconButton
																				sx={{
																					mt: -1,
																				}}
																				size="small"
																				onClick={() =>
																					console.log(
																						idx
																					)
																				}
																			>
																				<HelpOutlineIcon fontSize="small" />
																			</IconButton>
																		</Tooltip>
																	)}
																</Box>
																<img
																	src={
																		'/images/icons/ratePlanChecked.svg'
																	}
																	alt={
																		'check'
																	}
																	style={{
																		width: '16px',
																		height: '16px',
																	}}
																/>
															</Box>
														);
													}
												)}

												{/** 구분선 */}
												<Box
													sx={{
														width: '270px',
														height: '1px',
														backgroundColor:
															'secondary.light',
														mb: 1.5,
													}}
												/>
											</Box>
										);
									}
								)}
							</Box>

							{/** 버튼 영역 */}
							{ratePlan.TYPE === 'PRODUCT' && (
								<SupportiButton
									variant="contained"
									style={{
										width: '90%',
										marginTop: 'auto',
										marginBottom: '16px',
										backgroundImage:
											ratePlan.TYPE === 'PRODUCT'
												? 'linear-gradient(99deg, #6659EE 9%,#6659EE  89%)'
												: 'linear-gradient(99deg, #5583e4 9%, #4955e3 89%)',
									}}
									isGradient={
										ratePlan.TYPE === 'PRODUCT'
											? true
											: false
									}
									contents={'시작하기'}
									onClick={() => {
										if (!access) {
											setAlertModalType('login');
											setAlertModal(true);
											return;
										}
										setPayModalData(ratePlan);
										setPayModal(true);
									}}
								/>
							)}

							{ratePlan.TYPE === 'BLACK' && (
								<SupportiButton
									variant="contained"
									style={{
										width: '90%',
										marginTop: 'auto',
										marginBottom: '16px',
										backgroundImage:
											'linear-gradient(99deg, #5583e4 9%, #4955e3 89%)',
									}}
									contents={
										subscriptionInfo?.SubscriptionProduct
											?.TYPE === 'BLACK'
											? '구독중'
											: '시작하기'
									}
									onClick={() => {
										if (!access) {
											setAlertModalType('login');
											setAlertModal(true);
											return;
										}
										if (
											!(
												subscriptionInfo
													?.SubscriptionProduct
													?.TYPE === 'BLACK'
											)
										) {
											setPayModalData(ratePlan);
											setPayModal(true);
										}
									}}
								/>
							)}

							{/* {ratePlan.TYPE === 'BLACK' && !permission && (
								<SupportiButton
									variant="contained"
									style={{
										width: '90%',
										marginTop: 'auto',
										marginBottom: '16px',
										backgroundImage:
											'linear-gradient(99deg, #8793AC 9%,#8895af  89%)',
									}}
									contents={'사용 신청하기'}
									onClick={() => {
										if (!access) {
											setAlertModalType('login');
											setAlertModal(true);
											return;
										}
										setRecommenderModal(true);
									}}
								/>
							)} */}
						</Box>
					);
				})}
			</Box>

			{/** 플랜별 상세 기능 비교 헤더 영역 */}

			<Box display="flex" gap={1} my={10} mt={30}>
				<Typography variant="h3"> 비즈니스를 위한 </Typography>
				<Typography variant="h3">프리권</Typography>
				<Typography variant="h3">서비스 확인하기 </Typography>
			</Box>

			<Box
				display="flex"
				sx={{
					borderRadius: 2,
					bgcolor: 'white',
					width: '80%',
					height: '50px',
					p: 2,
					mt: 5,
					justifyContent: 'space-around',
					boxShadow:
						'4px 17px 40px rgba(138.13, 138.13, 138.13, 0.15)',
				}}
			>
				<Typography fontWeight={600}>프리권별 기능</Typography>
				<Typography fontWeight={600}>FREE</Typography>
				{ratePlanList.map((ratePlan, index) => {
					return (
						<Typography
							fontWeight={600}
							color={
								ratePlan.NAME === 'PREMIUM'
									? '#6659EE'
									: 'primary.main'
							}
						>
							{ratePlan.NAME}
						</Typography>
					);
				})}
			</Box>

			{/** 플랜별 상세 기능 비교 체크 테이블 영역 */}
			<Box
				sx={{
					borderRadius: 2,
					bgcolor: 'white',
					minWidth: '80%',
					minHeight: '700px',
					boxShadow:
						'4px 17px 40px rgba(138.13, 138.13, 138.13, 0.15)',
					mt: 2,
				}}
				display="flex"
				justifyContent="space-around"
			>
				<Box
					display="flex"
					sx={{
						justifyContent: 'space-around',
						flexDirection: 'column',
						textAlign: 'center',
						minHeight: '700px',
					}}
				>
					{ratePlanList
						.filter((item) => item.TYPE === 'BLACK')
						.map((ratePlan, index) => {
							return ratePlan.SubscriptionProductContents.map(
								(item, index) => {
									return (
										<Box>
											<Typography fontWeight={500}>
												{item.TITLE}
											</Typography>
										</Box>
									);
								}
							);
						})}
				</Box>
				<Box
					display="flex"
					sx={{
						justifyContent: 'space-around',
						flexDirection: 'column',
						textAlign: 'center',
						minHeight: '700px',
					}}
				>
					{ratePlanList
						.filter((item) => item.TYPE === 'BLACK')
						.map((ratePlan, index) => {
							return ratePlan.SubscriptionProductContents.map(
								(item, index) => {
									return (
										<CheckIcon
											sx={{
												mr: 7,
												color:
													index <
													ratePlan
														.SubscriptionProductContents
														.length -
														6
														? 'primary.main'
														: 'secondary.main',
											}}
										/>
									);
								}
							);
						})}
				</Box>
				<Box
					display="flex"
					sx={{
						justifyContent: 'space-around',
						flexDirection: 'column',
						textAlign: 'center',
						minHeight: '700px',
					}}
				>
					{ratePlanList
						.filter((item) => item.TYPE === 'BLACK')
						.map((ratePlan, idx) => {
							return ratePlan.SubscriptionProductContents.map(
								(item, index) => {
									return (
										<CheckIcon
											sx={{
												mr: 8,
												color:
													index <
													ratePlan
														.SubscriptionProductContents
														.length -
														2
														? 'primary.main'
														: 'secondary.main',
											}}
										/>
									);
								}
							);
						})}
				</Box>
				<Box
					display="flex"
					sx={{
						justifyContent: 'space-around',
						flexDirection: 'column',
						textAlign: 'center',
						minHeight: '700px',
					}}
				>
					{ratePlanList
						.filter((item) => item.TYPE === 'BLACK')
						.map((ratePlan, index) => {
							return ratePlan.SubscriptionProductContents.map(
								(item, index) => {
									return (
										<CheckIcon
											sx={{
												color: 'primary.main',
												mr: 5,
											}}
										/>
									);
								}
							);
						})}
				</Box>
			</Box>
			<SupportiButton
				variant="outlined"
				style={{
					width: '40%',
					marginTop: '60px',
					marginBottom: '150px',
					backgroundColor: 'white',
					color: 'primary.main',
					cursor: 'pointer',
				}}
				contents={'요금제 상세보기'}
				onClick={() => {
					router.push('/rate_plan/theBlack');
				}}
			/>

			{/** 모달들 */}
			<BillingModal
				open={payModal}
				handleClose={() => {
					setPayModal(false);
				}}
				ratePlanInfo={payModalData}
			/>
			<SupportiAlertModal
				type={alertModalType}
				open={alertModal}
				handleClose={() => setAlertModal(false)}
			/>
			{supportiTheBlack.SupportiBlackPayModal({
				open: recommenderModal,
				handleClose: () => {
					setRecommenderModal(false);
				},
			})}
		</Box>
	);
};

export default Page;
