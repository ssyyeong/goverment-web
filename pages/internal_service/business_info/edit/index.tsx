import {
	Autocomplete,
	Box,
	Button,
	Grid,
	TextField,
	Typography,
} from '@mui/material';
import { NextPage } from 'next';
import React from 'react';
import { InternalServiceLayout } from '../../../../src/views/layout/InternalServiceLayout';
import { IBusiness, IBusinessHistory } from '../../../../src/@types/model';
import { useAppMember } from '../../../../src/hooks/useAppMember';
import DefaultController from '@leanoncompany/supporti-ark-office-project/src/controller/default/DefaultController';
import moment, { now } from 'moment';
import {
	businessConfig,
	businessSector,
	investSector,
} from '../../../../configs/data/BusinessConfig';
import { useRouter } from 'next/router';
import build from 'next/dist/build';
import SupportiInput from '../../../../src/views/global/SupportiInput';
import SupportiButton from '../../../../src/views/global/SupportiButton';
import InternalServiceDrawer from '../../../../src/views/local/internal_service/common/InternalServiceDrawer/InternalServiceDrawer';
import { useUserAccess } from '../../../../src/hooks/useUserAccess';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
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
	 * 비즈니스 히스토리 (체크용 원본 데이터)
	 */
	const [businessHistory, setBusinessHistory] =
		React.useState<IBusinessHistory>();

	/**
	 * 복사된 비즈니스 히스토리 (실제, 업데이트 및 뷰되는 데이터)
	 */
	const [copiedBusinessHistory, setCopiedBusinessHistory] =
		React.useState<IBusinessHistory>();

	//* Functions
	/**
	 * 비즈니스 정보 (개요 & 히스토리) 저장 함수
	 */
	const saveBusiness = () => {
		if (memberId !== undefined) {
			//* 비즈니스 개요 정보 페이로드화
			const clonedBusiness = { ...business };
			clonedBusiness.CORPORATE_TYPE = JSON.stringify(
				clonedBusiness.CORPORATE_TYPE.split(',').map((item) =>
					item.trim()
				)
			);

			//* 비즈니스 개요 정보 저장
			businessController.updateItem(
				clonedBusiness,
				(res) => {
					//* 비즈니스 히스토리 정보 저장
					if (
						copiedBusinessHistory?.NUM_OF_EMPLOYEES !==
							businessHistory?.NUM_OF_EMPLOYEES ||
						copiedBusinessHistory?.INVEST_ROUND !==
							businessHistory?.INVEST_ROUND
					) {
						businessHistoryController.createItem(
							{
								...copiedBusinessHistory,
								APP_MEMBER_IDENTIFICATION_CODE: memberId,
								BUSINESS_IDENTIFICATION_CODE:
									business?.BUSINESS_IDENTIFICATION_CODE,
							},
							(res) => {
								alert('비즈니스 개요를 저장했습니다.');

								//* 저장 후 비즈니스 로그 정보 변경
								const newBusinessHistory = {
									...copiedBusinessHistory,
									BUSINESS_HISTORY_IDENTIFICATION_CODE:
										res.data.result
											.BUSINESS_HISTORY_IDENTIFICATION_CODE,
								};

								setBusinessHistory({ ...newBusinessHistory });
								setCopiedBusinessHistory({
									...newBusinessHistory,
								});
								router.push('/internal_service/business_info');
							},
							(err) => {
								alert(
									'비즈니스 개요는 저장했으나, 비즈니스 로그 저장에 실패했습니다.'
								);
							}
						);
					} else {
						alert('비즈니스 개요를 저장했습니다.');
						router.push('/internal_service/business_info');
					}
				},
				(err) => {
					alert('비즈니스 개요 저장에 실패했습니다.');
				}
			);
		} else {
			alert('로그인이 필요합니다.');
		}
	};

	//* Hooks
	/**
	 * 유저 정보 가져오는 훅
	 */
	const { memberId } = useAppMember();
	// const memberId = 3;

	/**
	 * 페이지 진입 시 유저 권한 검사
	 */
	const { access } = useUserAccess('BUSINESS_MEMBER');
	// const userAccess = true;

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
		if (business && businessHistory === undefined) {
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
						setBusinessHistory(res.data.result.rows[0]); // 체크용 원본 데이터 저장
						setCopiedBusinessHistory(res.data.result.rows[0]); // 실제, 업데이트 및 뷰되는 데이터 저장
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
												onClick={saveBusiness}
											>
												<SaveOutlinedIcon fontSize="small" />
												<Typography
													variant={'subtitle1'}
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
													저장하기
												</Typography>
											</Button>
										</Box>
									</Box>
								</Grid>
							</Grid>
						</Box>
						{/* 필요한 값들이 로드 되었을 경우 랜더링 */}
						{business && businessHistory && (
							<Box>
								{/* 테이블  */}
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
																'#bebebe'
															}
														>
															<Typography
																variant={'h6'}
																textAlign={
																	'center'
																}
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
															bgcolor={'white'}
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
															{businessMapping.label ==
																'업종' ||
															businessMapping.label ==
																'투자라운드' ? (
																<Autocomplete
																	options={
																		businessMapping.label ==
																		'업종'
																			? businessSector
																			: investSector
																	}
																	fullWidth
																	onChange={(
																		e,
																		newValue
																	) => {
																		if (
																			businessMapping.isFromBusinessHistory ==
																			true
																		) {
																			// 비즈니스 로그에서 가져온 데이터일 경우
																			setCopiedBusinessHistory(
																				{
																					...copiedBusinessHistory,
																					[businessMapping.key]:
																						newValue,
																				}
																			);
																		} else {
																			// 비즈니스 개요에서 가져온 데이터일 경우
																			setBusiness(
																				{
																					...business,
																					[businessMapping.key]:
																						newValue,
																				}
																			);
																		}
																	}}
																	value={
																		businessMapping.isFromBusinessHistory ==
																		true
																			? copiedBusinessHistory[
																					businessMapping
																						.key
																			  ]
																			: business[
																					businessMapping
																						.key
																			  ]
																	}
																	renderInput={(
																		params
																	) => (
																		<TextField
																			{...params}
																			sx={{
																				'& .MuiAutocomplete-input':
																					{
																						height: '13px',
																					},
																			}}
																		/>
																	)}
																/>
															) : (
																<SupportiInput
																	width={
																		'100%'
																	}
																	type={
																		businessMapping.type
																	}
																	minDate={moment(
																		now()
																	)
																		.subtract(
																			'10',
																			'y'
																		)
																		.format(
																			'YYYY-MM-DD'
																		)}
																	style={{
																		height: '100%',
																	}}
																	value={
																		businessMapping.isFromBusinessHistory ==
																		true
																			? copiedBusinessHistory[
																					businessMapping
																						.key
																			  ]
																			: business[
																					businessMapping
																						.key
																			  ]
																	}
																	setValue={(
																		value
																	) => {
																		if (
																			businessMapping.isFromBusinessHistory ==
																			true
																		) {
																			// 비즈니스 로그에서 가져온 데이터일 경우
																			setCopiedBusinessHistory(
																				{
																					...copiedBusinessHistory,
																					[businessMapping.key]:
																						value,
																				}
																			);
																		} else {
																			// 비즈니스 개요에서 가져온 데이터일 경우
																			setBusiness(
																				{
																					...business,
																					[businessMapping.key]:
																						value,
																				}
																			);
																		}
																	}}
																	additionalProps={Object.assign(
																		{
																			sx: {
																				width: '100%',
																				height: '100%',
																				py: 0.8,
																			},
																		},
																		businessMapping.additionalProps !==
																			undefined
																			? businessMapping.additionalProps
																			: {}
																	)}
																/>
															)}
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
