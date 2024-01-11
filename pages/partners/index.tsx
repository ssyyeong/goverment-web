import { Box, Typography } from '@mui/material';
import { NextPage } from 'next';
import React from 'react';

const Page: NextPage = () => {
	const CardConfig = [
		{
			Title: '비즈니스 프로세스 · 소프트웨어',
			Companies: [
				{
					logoPath: '/images/logo/partners/CY.png',
					name: ['씨와이'],
					content: 'SaaS · ERP · Cloud',
					add: 'AWS 크레딧 5,000$ 혜택 제공',
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
					logoPath: '/images/logo/partners/힛빔.png',
					name: ['힛빔'],
					content: '2개월 무료 노코드 이용',
				},
			],
		},
		{
			Title: '개발',
			Companies: [
				{
					logoPath: '/images/logo/partners/CY.png',
					name: ['CY'],
					content: '스타트업 · 공공 전문 외주 개발',
					add: 'AWS 크레딧 5,000$ 혜택 제공',
				},
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

	return (
		<Box
			sx={{
				width: '100%',
				height: '100%',
				p: { xs: 0.5, sm: 10 },
				bgcolor: '#F1F3FB',
				alignItems: 'center',
			}}
		>
			<Box textAlign="center">
				<Typography fontWeight={700} variant="h2" sx={{ mb: '15px' }}>
					파트너스
				</Typography>
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
									overflowX:
										v.Companies.length > 3
											? 'scroll'
											: 'hidden',
								}}
								ml={'auto'}
								mr={'auto'}
							>
								<Typography
									fontWeight={600}
									variant="h3"
									style={{
										color: '#3C52BB',
										lineHeight: '130%',
										marginBottom: 30,
									}}
								>
									{v.Title}
								</Typography>
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
														p: { md: 3.5, xs: 3 },
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
		</Box>
	);
};

export default Page;
