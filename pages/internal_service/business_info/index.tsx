import { Box, Button, Grid, Typography } from '@mui/material';
import { NextPage } from 'next';
import React from 'react';
import { InternalServiceLayout } from '../../../src/views/layout/InternalServiceLayout';
import { IBusiness, IBusinessHistory } from '../../../src/@types/model';
import { useAppMember } from '../../../src/hooks/useAppMember';
import DefaultController from '@leanoncompany/supporti-ark-office-project/src/controller/default/DefaultController';
import moment from 'moment';
import { businessConfig } from '../../../configs/data/BusinessConfig';
import { useRouter } from 'next/router';
import SupportiButton from '../../../src/views/global/SupportiButton';
import InternalServiceDrawer from '../../../src/views/local/internal_service/common/InternalServiceDrawer';
import useUserAccess from '../../../src/hooks/useUserAccess/useUserAccess';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';

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
	const { memberId } = useAppMember();

	/**
	 * 페이지 진입 시 유저 권한 검사
	 */
	const { access } = useUserAccess('BUSINESS_MEMBER');

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
					console.log(res);
					if (res.data.result !== null) {
						//* 기업형태 정보 변경
						let businessType = '';
						const parsedBusinessType = JSON.parse(
							res.data.result.CORPORATE_TYPE
						);

						parsedBusinessType.map(
							(element: string, index: number) => {
								businessType += `${
									index == 0 ? '' : ','
								}${element}`;
							}
						);

						res.data.result.CORPORATE_TYPE = businessType;

						//* 날짜 정보 변경
						res.data.result.ESTABLISHMENT_DATE =
							res.data.result.ESTABLISHMENT_DATE != null &&
							moment(res.data.result.ESTABLISHMENT_DATE).format(
								'YYYY-MM-DD'
							);

						res.data.result.LISTING_DATE =
							res.data.result.LISTING_DATE &&
							moment(res.data.result.LISTING_DATE).format(
								'YYYY-MM-DD'
							);

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
		<InternalServiceDrawer type="dashboard">
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					width: '100%',
					p: { xs: 2, md: 10 },
				}}
			>
				{/* 컨텐츠 레이아웃 */}
				{access === true && (
					<InternalServiceLayout
						title="기업 정보"
						subTitle="기업 정보를 수정 / 확인할 수 있습니다."
						image="/images/main/business.png"
						mobileImage="/images/main/businessMoblie.png"
					>
						{/* 필요한 값들이 로드 되었을 경우 랜더링 */}
						{business && businessHistory && (
							<Box>
								{/* 컨트롤러 */}
								<Box mb={2}>
									<Grid container>
										{/* 데이터 편집 및 추출 */}
										<Grid item xs={8} md={6}>
											<Typography
												variant="h3"
												fontWeight={'bold'}
												sx={{ mb: 2 }}
											>
												기업 정보
											</Typography>
											<Typography
												color={'secondary.dark'}
												sx={{ mb: 2 }}
											>
												기업 정보를 확인할 수 있습니다.
											</Typography>
										</Grid>
										<Grid item xs={4} md={6}>
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
															px: {
																xs: 0,
																md: 3,
															},
															borderRadius: 2,
														}}
														onClick={() => {
															router.push(
																'/internal_service/business_info/edit'
															);
														}}
													>
														<ModeEditOutlineOutlinedIcon fontSize="small" />
														<Typography
															variant={
																'subtitle1'
															}
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
											</Box>
										</Grid>
									</Grid>
								</Box>

								{/* 테이블 */}
								<Box>
									{/* 각 비즈니스 개요 항목 맵핑 */}
									{businessConfig.map(
										(businessMapping, idx) => (
											<Box key={idx}>
												<Grid container>
													{/* 각 비즈니스 개요 라벨 */}
													<Grid item xs={6} md={6}>
														<Box
															sx={{
																backgroundColor:
																	'#5575cd',
																borderTopLeftRadius:
																	idx == 0 &&
																	10,
																borderBottomLeftRadius:
																	idx ===
																		businessConfig.length -
																			1 &&
																	10,
															}}
															border={0.5}
															py={2}
															borderColor={
																'rgba(185, 197, 255, 1)'
															}
														>
															<Typography
																textAlign={
																	'center'
																}
																variant={'h6'}
																fontWeight={
																	'500'
																}
																color={'white'}
															>
																{
																	businessMapping.label
																}
															</Typography>
														</Box>
													</Grid>

													{/* 각 비즈니스 개요 데이터 (isFromBusinessHistory 값에 따라, 비즈니스 개요 정보로부터 데이터를 가져올 지, 비즈니스 로그로부터 데이터를 가져올 지 결정) */}
													<Grid item xs={6} md={6}>
														<Box
															border={0.5}
															py={2}
															borderColor={
																'rgba(185, 197, 255, 1)'
															}
															height={'100%'}
															bgcolor={'#ffffff'}
															sx={{
																borderTopRightRadius:
																	idx == 0 &&
																	10,
																borderBottomRightRadius:
																	idx ===
																		businessConfig.length -
																			1 &&
																	10,
															}}
														>
															<Typography
																variant={'h6'}
																textAlign={
																	'center'
																}
																pl={1}
																noWrap={true}
																overflow={
																	'hidden'
																}
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
										)
									)}
								</Box>
							</Box>
						)}
					</InternalServiceLayout>
				)}
			</Box>
		</InternalServiceDrawer>
	);
};

export default Page;
