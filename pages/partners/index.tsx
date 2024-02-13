import { Box, Typography } from '@mui/material';
import { NextPage } from 'next';
import React, { useEffect } from 'react';

import SupportiButton from '../../src/views/global/SupportiButton';
import SupportiModal from '../../src/views/global/SupportiModal';
import CloseIcon from '@mui/icons-material/Close';
import { useAppMember } from '../../src/hooks/useAppMember';
import { useSubscription } from '../../src/hooks/useSubscription';

const Page: NextPage = () => {
	//* Modules
	const { memberId } = useAppMember();
	const { subscriptionInfo } = useSubscription({ memberId: memberId });

	//* States

	/**
	 * 모달 오픈 여부
	 */
	const [registerModalOpen, setRegisterModalOpen] =
		React.useState<boolean>(false);

	//* Constants
	const CardConfig = [
		{
			Title: '비즈니스 프로세스 · 소프트웨어',
			Companies: [
				{
					logoPath: '/images/logo/partners/CY.png',
					name: ['씨와이'],
					content: 'SaaS · ERP · Cloud',
					add: 'AWS 크레딧 5,000$ 혜택 제공',
					form: 'https://forms.gle/r7qK37XXfHfyGy7d8',
				},
			],
		},
		{
			Title: '세무 · 회계',
			Companies: [
				{
					name: ['김동현'],
					content: '스타트업 세무 회계 · Virtual CFO · 투자 감사',
					add: '2개월 세무 기장 무료 · virtual CFO 20% 할인',
					accent: '다솔 WM 세무사',
					form: 'https://forms.gle/psatD7fxs3G9qjci6',
				},
				{
					logoPath: '/images/logo/partners/크리에이티브파트너스.png',
					name: ['크리에이티브', '파트너스'],
					content: '1인 사업자 · 프리랜서 · 스타트업 대상 세무 회계',
				},
			],
		},
		{
			Title: '투자',
			Companies: [
				{
					logoPath: '/images/logo/partners/하임벤처투자.png',
					name: ['하임벤처투자'],
				},
				{
					logoPath: '/images/logo/partners/신용보증기금.png',
					name: ['신용보증기금'],
				},
				{
					logoPath: '/images/logo/partners/교보생명.png',
					name: ['교보생명'],
				},
			],
		},
		{
			Title: 'AI · 노코드',
			Companies: [
				{
					logoPath: '/images/logo/partners/그린다.png',
					name: ['그린다 AI'],
					content: '고객사 대상 할인 · 1개월 무료 설치',
				},
				{
					logoPath: '/images/logo/partners/나쵸코드.svg',
					name: ['나초코드'],
					content: '2개월 무료 노코드 이용',
					add: '웹 URL만 있으면 10분만에 안드로이드 & iOS 앱 빌딩',
					form: 'https://forms.gle/AoKU4GqjRRDB9EqCA',
				},
			],
		},
		{
			Title: '개발',
			Companies: [
				{
					logoPath: '/images/logo/partners/메타소프트.png',
					name: ['메타소프트'],
					content: '스타트업 · 공공 전문 외주 개발',
				},
				{
					name: ['위잉'],
					content: '스타트업 전문 외주 개발사',
				},
				{
					logoPath: '/images/logo/partners/Trustify.png',
					name: ['Trusitify'],
					content: '베트남 외주 아웃소싱',
				},
			],
		},
		{
			Title: '글로벌 · 투자',
			Companies: [
				{
					logoPath: '/images/logo/partners/Trustify.png',
					name: ['Trustify', 'Technology'],
					content: '베트남 · 글로벌 마켓 · 글로벌 투자',
				},
				{
					logoPath: '/images/logo/partners/화웨이.png',
					name: ['Huawei'],
					content: '글로벌 투자',
				},
				{
					logoPath: '/images/logo/partners/동유모.png',
					name: ['동유모'],
					content: '동경 유학생 모임',
				},
				{
					logoPath: '/images/logo/partners/D&W법무법인.png',
					name: ['D&W 법무법인'],
					content: '일본 전문 M&A · 일본 법인 · 투자',
				},
			],
		},
		{
			Title: '특허 · 법무',
			Companies: [
				{
					logoPath: '/images/logo/partners/도울특허법인.png',
					name: ['도울 특허법인'],
				},
				{
					name: ['법무사 오균홍 사무소'],
				},
			],
		},
		{
			Title: '마케팅 · 멘토링 · HR',
			Companies: [
				{
					logoPath: '/images/logo/partners/자버.png',
					name: ['자버 이동욱'],
				},
				{
					logoPath: '/images/logo/partners/원테이커.png',
					name: ['원테이커 홍유리'],
				},
				{
					logoPath: '/images/logo/partners/자버.png',
					name: ['자버 박윤정'],
				},
			],
		},
	];

	//* Functions

	//* Hooks

	return (
		<Box
			sx={{
				width: '100%',
				height: '100%',
				p: { xs: 0.5, sm: 10 },
				bgcolor: 'primary.light',
				alignItems: 'center',
			}}
		>
			<Box textAlign="left" sx={{ mb: '15px', p: { xs: 2, sm: 0.5 } }}>
				<Typography fontWeight={700} variant="h2">
					파트너스
				</Typography>
				<Box display="flex" gap={2} flexWrap="wrap">
					<Typography
						fontWeight={600}
						variant="subtitle1"
						style={{
							color: '#3C52BB',
							marginRight: '15px',
							marginTop: 30,
							wordBreak: 'keep-all',
						}}
					>
						파트너사가 제공하는 여러가지 혜택을 신청해보세요.
					</Typography>
					<SupportiButton
						contents={'혜택 신청하기'}
						isGradient={true}
						style={{
							color: '#fff',
							mt: 3,
							height: '35px',
						}}
						onClick={() => {
							if (
								subscriptionInfo?.SubscriptionProduct?.TYPE ===
									'BLACK' ||
								subscriptionInfo?.SubscriptionProduct?.TYPE ===
									'PRODUCT'
							) {
								setRegisterModalOpen(true);
							} else {
								alert('구독 회원에게만 제공되는 기능입니다!');
							}
						}}
					/>
				</Box>
			</Box>
			<Box sx={{ height: '100%', width: '100%', mt: '20px' }}>
				<Box
					sx={{
						width: {
							md: '100%',
							xs: '330px',
						},
					}}
					ml="auto"
					mr="auto"
				>
					{CardConfig.map((v, idx) => {
						return (
							<Box
								style={{
									paddingBottom: 42,
									paddingTop: 30,
									overflowX: 'auto',
								}}
								sx={{
									'-ms-overflow-style': 'none',
									'&::-webkit-scrollbar': {
										height: '5px !important',
										backgroundColor: 'white !important',
										padding: '0.5px',
										borderRadius: '20px',
									},
									'&::-webkit-scrollbar-thumb': {
										backgroundColor: '#305edccc',
										borderRadius: '20px',
									},
								}}
								ml={'auto'}
								mr={'auto'}
							>
								<Box display="flex" flexWrap={'wrap'}>
									<Typography
										fontWeight={600}
										variant="h3"
										style={{
											color: '#3C52BB',
											lineHeight: '130%',
											marginBottom: 30,
											marginRight: '15px',
										}}
									>
										{v.Title}
									</Typography>
									{(idx === 0 || idx === 1 || idx === 3) && (
										<Typography
											color="secondary.dark"
											lineHeight={'280%'}
										>
											클릭해서 구독 회원에게만 제공되는
											혜택을 신청하세요!
										</Typography>
									)}
								</Box>

								<Box
									sx={{
										display: 'flex',
										gap: 3,
										flexWrap: { xs: 'wrap', sm: 'nowrap' },
									}}
								>
									{v.Companies.map((item, index) => {
										return (
											<Box>
												<Box
													sx={{
														width: {
															sm: '400px',
															xs: '330px',
														},
														minHeight: '214px',
														borderRadius: '16px',
														bgcolor: '#FFFFFF',
														justifyContent:
															'center',
														cursor:
															item.add &&
															item.form &&
															'pointer',
														p: { md: 3.5, xs: 3 },
													}}
													onClick={() => {
														if (
															item.add &&
															item.form
														) {
															if (
																subscriptionInfo
																	?.SubscriptionProduct
																	?.TYPE ===
																	'BLACK' ||
																subscriptionInfo
																	?.SubscriptionProduct
																	?.TYPE ===
																	'PRODUCT'
															) {
																window.open(
																	item.form,
																	'_blank'
																);
															} else {
																alert(
																	'구독 회원에게만 제공되는 기능입니다!'
																);
															}
														}
													}}
												>
													<Box
														style={{
															display: 'flex',
														}}
													>
														<Box
															style={{
																marginRight: 24,
															}}
														>
															{item.logoPath ? (
																<img
																	src={
																		item.logoPath
																	}
																	style={{
																		width: 104,
																		height: 104,
																		borderRadius: 10,
																	}}
																/>
															) : item.name[0] ===
															  '법무사 오균홍 사무소' ? (
																<Box
																	sx={{
																		width: '110px',
																		height: '110px',
																		borderRadius:
																			'10px',
																		backgroundColor:
																			'#F1F3FB',
																		justifyContent:
																			'center',
																		alignItems:
																			'center',
																		textAlign:
																			'center',
																		padding:
																			'15%',
																	}}
																>
																	{item.name[0]
																		.split(
																			' '
																		)
																		.map(
																			(
																				v,
																				idx
																			) => {
																				return (
																					<Typography
																						fontWeight={
																							600
																						}
																						variant={
																							'h5'
																						}
																						style={{
																							color: '#3C52BB',
																							flexShrink: 1,
																						}}
																					>
																						{
																							v
																						}
																					</Typography>
																				);
																			}
																		)}
																</Box>
															) : (
																<Box
																	sx={{
																		width: '110px',
																		height: '110px',
																		borderRadius:
																			'10px',
																		backgroundColor:
																			'#F1F3FB',
																		justifyContent:
																			'center',
																		alignItems:
																			'center',
																		textAlign:
																			'center',
																		paddingTop:
																			'40%',
																	}}
																>
																	<Typography
																		fontWeight={
																			600
																		}
																		variant={
																			'h5'
																		}
																		style={{
																			color: '#3C52BB',
																			flexShrink: 1,
																		}}
																	>
																		{
																			item.name
																		}
																	</Typography>
																</Box>
															)}
														</Box>
														<Box
															style={{
																display: 'flex',
																flexDirection:
																	'column',
																justifyContent:
																	'center',
															}}
														>
															{item.accent && (
																<Typography
																	fontWeight={
																		500
																	}
																	variant={
																		'h5'
																	}
																	style={{
																		color: '#3C52BB',
																		marginBottom: 12,
																	}}
																>
																	{
																		item.accent
																	}
																</Typography>
															)}
															<Box
																style={{
																	flexWrap:
																		'wrap',
																	display:
																		'flex',
																}}
															>
																{item.name.map(
																	(
																		v,
																		idx
																	) => {
																		return (
																			<Typography
																				fontWeight={
																					600
																				}
																				variant={
																					'h3'
																				}
																				style={{
																					color: '#000',
																					lineHeight:
																						'130%',
																				}}
																			>
																				{
																					v
																				}
																			</Typography>
																		);
																	}
																)}
															</Box>
														</Box>
													</Box>
													{item.content && (
														<Typography
															marginTop={3}
															fontWeight={500}
															variant={
																'subtitle1'
															}
															style={{
																color: '#757575',

																// lineHeight: '50px',
															}}
														>
															{item.content}
														</Typography>
													)}
												</Box>
												{item.add && (
													<Box
														sx={{
															display: 'flex',
															flexDirection:
																'row',
															gap: '10px',
															p: 1,
															backgroundColor:
																'#3C52BB',
															borderRadius: 999,
															marginTop: '16px',
														}}
													>
														<Typography
															fontWeight={500}
															variant={'body1'}
															style={{
																backgroundColor:
																	'rgba(255, 255, 255, 0.25)',
																borderRadius: 999,
																color: '#FFF',
															}}
															sx={{
																p: {
																	xs: 0.5,
																	sm: 1,
																},
																lineHeight: {
																	xs: '25px',
																	sm: '10px',
																},
															}}
														>
															혜택
														</Typography>
														<Typography
															fontWeight={500}
															variant={'body1'}
															style={{
																color: '#FFF',
																marginTop:
																	'auto',
																marginBottom:
																	'auto',
															}}
														>
															{item.add}
														</Typography>
													</Box>
												)}
											</Box>
										);
									})}
								</Box>
							</Box>
						);
					})}
				</Box>
			</Box>
			<SupportiModal
				open={registerModalOpen}
				handleClose={() => {
					setRegisterModalOpen(false);
				}}
				activeHeader={false}
				title=""
				style={{
					width: { sm: '40%', xs: '100%' },
				}}
				children={
					<Box
						width="90%"
						display={'flex'}
						flexDirection={'column'}
						gap={2}
						sx={{
							overflowY: 'auto',
						}}
					>
						<Box display="flex" justifyContent="space-between">
							<Box />
							<Typography
								variant="h5"
								fontWeight={'600'}
								lineHeight={1}
							>
								파트너 제공 혜택
							</Typography>
							<CloseIcon
								sx={{ cursor: 'pointer' }}
								onClick={() => {
									setRegisterModalOpen(false);
								}}
							/>
						</Box>

						<Box
							sx={{
								width: '100%',
								minHeight: 300,
								padding: 2,
							}}
							textAlign="center"
						>
							<Typography variant="subtitle1" fontWeight={'600'}>
								비즈니스 나우(CY)
							</Typography>
							<SupportiButton
								contents={'AWS 크레딧 5,000$ 혜택 제공'}
								style={{
									color: 'common.white',
									bgcolor: 'secondary.main',
									my: 1,
									height: '40px',
									':hover': {
										bgcolor: 'secondary.light',
										color: 'common.black',
									},
								}}
								fullWidth
								onClick={() => {
									window.open(
										'https://forms.gle/r7qK37XXfHfyGy7d8',
										'_blank'
									);
								}}
							/>
							<Typography variant="subtitle1" fontWeight={'600'}>
								세무법인 다솔
							</Typography>
							<SupportiButton
								contents={'세무기장 3개월 무료 신청'}
								style={{
									color: 'common.white',
									bgcolor: 'secondary.main',
									my: 1,
									height: '40px',
									':hover': {
										bgcolor: 'secondary.light',
										color: 'common.black',
									},
								}}
								fullWidth
								onClick={() => {
									window.open(
										'https://forms.gle/psatD7fxs3G9qjci6',
										'_blank'
									);
								}}
							/>
							<Typography variant="subtitle1" fontWeight={'600'}>
								나쵸코드
							</Typography>
							<SupportiButton
								contents={'URL만 있다면 손쉽게! 앱빌딩 신청'}
								style={{
									color: 'common.white',
									bgcolor: 'secondary.main',
									mt: 1,
									height: '40px',
									':hover': {
										bgcolor: 'secondary.light',
										color: 'common.black',
									},
								}}
								fullWidth
								onClick={() => {
									window.open(
										'https://forms.gle/AoKU4GqjRRDB9EqCA',
										'_blank'
									);
								}}
							/>
						</Box>

						{/** 등록 버튼 */}
						<SupportiButton
							contents={'다음에 신청하기'}
							isGradient={true}
							style={{
								color: '#fff',
								height: '45px',
							}}
							onClick={() => {
								setRegisterModalOpen(false);
							}}
						/>
					</Box>
				}
			/>
		</Box>
	);
};

export default Page;
