import { Box, Button, Grid, Typography } from '@mui/material';
import { NextPage } from 'next';
import React from 'react';
import { InternalServiceLayout } from '../../../../src/views/layout/InternalServiceLayout';
import { IBusiness, IBusinessHistory } from '../../../../src/@types/model';
import { useAppMember } from '../../../../src/hooks/useAppMember';
import DefaultController from '@qillie-corp/ark-office-project/src/controller/default/DefaultController';
import moment from 'moment';
import { businessConfig } from '../../../../configs/data/BusinessConfig';
import { useRouter } from 'next/router';

/**
 * 비즈니스 개요 페이지
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
	 * 비즈니스 로그 컨트롤러
	 */
	const businessHistoryController = new DefaultController('BusinessHistory');

	//* States
	/**
	 * 비즈니스 개요
	 */
	const [business, setBusiness] = React.useState<IBusiness>();

	/**
	 * 비즈니스 히스토리
	 */
	const [businessHistory, setBusinessHistory] =
		React.useState<IBusinessHistory>();

	//* Functions

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
	 * 비즈니스 개요 데이터 로드
	 */
	React.useEffect(() => {
		if (userAccess && memberId) {
			businessController.getOneItem(
				{
					APP_MEMBER_IDENTIFICATION_CODE: 3,
				},
				(res) => {
					console.log(res);
					setBusiness(res.data.result);
				},
				(err) => {
					alert('비즈니스 개요 정보를 가져오는데 실패했습니다.');
				}
			);
		}
	}, [userAccess, memberId]);

	/**
	 * 비즈니스 히스토리 데이터 로드
	 */
	React.useEffect(() => {
		if (business) {
			businessHistoryController.getAllItems(
				{
					BUSINESS_IDENTIFICATION_CODE:
						business.BUSINESS_IDENTIFICATION_CODE,
					// SORT_KEY: 'CREATED_AT',
					// SORT_TYPE: 'DESC',
					LIMIT: 1,
				},
				(res) => {
					if (res.data.result.rows.length > 0) {
						setBusinessHistory(res.data.result.rows[0]);
					}
				},
				(err) => {
					alert('비즈니스 로그 정보를 가져오는데 실패했습니다.');
				}
			);
		}
	}, [business]);

	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'column',
				width: '100%',
				p: 10,
			}}
		>
			{/* 컨텐츠 레이아웃 */}
			{userAccess === true && (
				<InternalServiceLayout>
					{/* 필요한 값들이 로드 되었을 경우 랜더링 */}
					{business && businessHistory && (
						<Box>
							{/* 컨트롤러 */}
							<Box mb={2}>
								<Grid container>
									{/* 데이터 편집 및 추출 */}
									<Grid item xs={12} md={6}>
										<Box display={'flex'}>
											{/* 편집 페이지로 이동 */}
											<Box>
												<Button
													variant={'contained'}
													sx={{
														backgroundColor:
															'#d2d2d2',
													}}
													onClick={() => {
														router.push(
															'/internal_service/business_info/edit'
														);
													}}
												>
													<Typography
														variant="h4"
														color={'black'}
														width={100}
													>
														편집하기
													</Typography>
												</Button>
											</Box>
										</Box>
									</Grid>
								</Grid>
							</Box>

							{/* 테이블  */}
							<Box>
								{/* 각 비즈니스 개요 항목 맵핑 */}
								{businessConfig.map((businessMapping) => (
									<Box>
										<Grid container>
											{/* 각 비즈니스 개요 라벨 */}
											<Grid item xs={6} md={3}>
												<Box
													sx={{
														backgroundColor:
															'#1E3269',
													}}
													border={0.5}
													borderColor={'#bebebe'}
												>
													<Typography
														textAlign={'center'}
														variant={'h6'}
														fontWeight={'700'}
														color={'white'}
														pt={1}
														pb={1}
													>
														{businessMapping.label}
													</Typography>
												</Box>
											</Grid>

											{/* 각 비즈니스 개요 데이터 (isFromBusinessHistory 값에 따라, 비즈니스 개요 정보로부터 데이터를 가져올 지, 비즈니스 로그로부터 데이터를 가져올 지 결정) */}
											<Grid item xs={6} md={3}>
												<Box
													border={0.5}
													borderColor={'#bebebe'}
												>
													<Typography
														variant={'h6'}
														pt={1}
														pb={1}
														pl={1}
													>
														{businessMapping.isFromBusinessHistory ==
														true
															? businessHistory[
																	businessMapping
																		.key
															  ]
															: business[
																	businessMapping
																		.key
															  ]}
													</Typography>
												</Box>
											</Grid>
										</Grid>
									</Box>
								))}
							</Box>
						</Box>
					)}
				</InternalServiceLayout>
			)}
		</Box>
	);
};

export default Page;
