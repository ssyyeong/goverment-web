import React, { useEffect } from 'react';

import { NextPage } from 'next';

import { Box, BoxProps, Grid, Typography } from '@mui/material';
import { InternalServiceLayout } from '../../../../src/views/layout/InternalServiceLayout';
import InternalServiceDrawer from '../../../../src/views/local/internal_service/common/InternalServiceDrawer';
import SupportiButton from '../../../../src/views/global/SupportiButton';
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import { IUserIRData } from '../../../../src/@types/model';
import DefaultController from '@leanoncompany/supporti-ark-office-project/src/controller/default/DefaultController';
import { useAppMember } from '../../../../src/hooks/useAppMember';
import SupportiInput from '../../../../src/views/global/SupportiInput';
import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import dynamic from 'next/dynamic';
import MultiImageUploader from '@leanoncompany/supporti-ark-office-project/src/ui/local/input/MultiImageUploader/MultiImageUploader';
import dayjs from 'dayjs';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';

interface IInvestInfoType {
	DATE?: any;
	INVEST_AMOUNT?: string;
	INVESTOR?: string;
	INVEST_LEVEL?: string;
	VALUE?: string;
}

const Page: NextPage = () => {
	//* Controller
	const userIrInformationController = new DefaultController(
		'UserIrInformation'
	);
	//* Modules
	const { memberId } = useAppMember();
	//* Constants
	// 투자 라운드
	const hopeInvestRound = [
		{
			label: '사업화지원 단계 (예비창업자)',
			value: '사업화지원 단계 (예비창업자)',
		},
		{
			label: '엔젤투자 시리즈',
			value: '엔젤투자 시리즈',
		},
		{
			label: 'SEED 시리즈',
			value: 'SEED 시리즈',
		},
		{
			label: 'Pre-A 시리즈',
			value: 'Pre-A 시리즈',
		},
		{
			label: 'A 시리즈',
			value: 'A 시리즈',
		},
		{
			label: 'B 시리즈',
			value: 'B 시리즈',
		},
		{
			label: 'C 시리즈',
			value: 'C 시리즈',
		},
	];

	const companyInfoConfig = [
		{
			label: '사업자등록번호',
			value: 'BUSINESS_NUMBER',
		},
		{
			label: '대표자명',
			value: 'CEO_NAME',
		},
		{
			label: '기업명',
			value: 'COMPANY_NAME',
		},
		{
			label: '업종/업태',
			value: 'BUSINESS_SECTOR',
			placeholder: '사업자등록증 상의 업종을 입력해주세요.',
		},
		{
			label: '설립일자',
			value: 'ESTABLISHMENT_DATE',
		},
		{
			label: '회사주소',
			value: 'COMPANY_ADDRESS',
		},
		{
			label: '홈페이지',
			value: 'HOME_PAGE',
		},
		{
			label: '연락처',
			value: 'CONTACT_NUMBER',
		},
	];

	// 사업 소개
	const businessIntroductionConfig = [
		{
			label: '한줄 설명',
			value: 'BUSINESS_TITLE',
		},
		{
			label: '설명',
			value: 'DESCRIPTION',
			additionalProps: {
				multiline: true,
				rows: 4,
			},
		},
	];

	// 투자 정보
	const investInfoConfig = [
		{
			label: '희망 투자 유치 단계',
			value: 'HOPE_INVEST_ROUND',
			type: 'select',
			options: hopeInvestRound,
		},
		{
			label: '희망 투지유치 금액(억단위)',
			value: 'HOPE_INVEST_MONEY',
			type: 'text',
		},
	];

	// 투자 연혁
	const investHistoryConfig = [
		{
			label: '투자금액',
			value: 'INVEST_AMOUNT',
			nolabel: true,
			variant: 'h6',
			fontWeight: 'bold',
			isMoney: true,
		},
		{
			label: '투자일자',
			value: 'DATE',
			type: 'datepicker',
			nolabel: true,
			color: 'grey',
			fontWeight: '600',
			variant: 'body2',
		},
		{
			label: '투자기관',
			value: 'INVESTOR',
		},
		{
			label: '투자단계',
			value: 'INVEST_LEVEL',
		},
		{
			label: '기업가치',
			value: 'VALUE',
		},
	];

	//* States
	/**
	 * ir deck 파일
	 */
	const [irDeckFile, setIrDeckFile] = React.useState<any>({
		FILE_NAME: 'ppt, pdf, hwp, pcdx, zip (200mb이하)',
		FILE_URL: '',
	});
	/**
	 * 사업자 등록증 파일
	 */
	const [businessRegistrationFile, setBusinessRegistrationFile] =
		React.useState<string>('');
	/**
	 * 기업 소개 이미지 리스트
	 */
	const [companyIntroductionImages, setCompanyIntroductionImages] =
		React.useState<string[]>([]);
	/**
	 * 유저 ir 정보
	 */
	const [userIrInfo, setUserIrInfo] = React.useState<IUserIRData>({
		HOPE_INVEST_ROUND: '사업화지원 단계 (예비창업자)',
	});
	/**
	 * 투자 연혁
	 */
	const [investInfo, setInvestInfo] = React.useState<IInvestInfoType[]>([]);
	/**
	 * 새 투자 연혁
	 */
	const [newInvestInfo, setNewInvestInfo] = React.useState<IInvestInfoType>({
		DATE: dayjs().format('YYYY-MM-DD'),
		INVEST_AMOUNT: '',
		INVESTOR: '',
		INVEST_LEVEL: '',
		VALUE: '',
	});
	/**
	 * 수정 여부
	 */
	const [isEdit, setIsEdit] = React.useState<boolean>(false);
	/**
	 * 업데이트 로직 실행 여부
	 */
	const [isUpdate, setIsUpdate] = React.useState<boolean>(false);
	console.log(newInvestInfo);

	//* Functions
	/**
	 * 유저 ir 정보 가져오기
	 */
	const getUserIrInfo = () => {
		userIrInformationController.getOneItemByKey(
			{
				APP_MEMBER_IDENTIFICATION_CODE: memberId,
			},
			(res) => {
				if (res.data.result) {
					setUserIrInfo(res.data.result);
					setIrDeckFile(JSON.parse(res.data.result.IR_FILE));
					setCompanyIntroductionImages(
						JSON.parse(res.data.result.IMAGE_LIST)
					);
					setInvestInfo(JSON.parse(res.data.result.INVEST_INFO));
					setIsUpdate(true);
				} else {
					setIsUpdate(false);
				}
			},
			(err) => {}
		);
	};
	/**
	 * 유저 ir 정보 등록하기
	 */
	const createUserIrInfo = () => {
		if (irDeckFile.FILE_URL == '') {
			alert('IR Deck혹은 사업계획서는 필수입니다.');
			return;
		}
		userIrInformationController.createItem(
			{
				APP_MEMBER_IDENTIFICATION_CODE: memberId,
				...userIrInfo,
				IR_FILE: JSON.stringify(irDeckFile),
				IMAGE_LIST: JSON.stringify(companyIntroductionImages),
				INVEST_INFO: JSON.stringify(investInfo),
			},
			(res) => {
				if (res.data.result) {
					alert('성공적으로 등록되었습니다.');
					setIsUpdate(true);
					setIsEdit(false);
				}
			},
			(err) => {}
		);
	};
	/**
	 * 유저 ir 정보 업데이트하기
	 */
	const updateUserIrInfo = () => {
		if (irDeckFile.FILE_URL == '') {
			alert('IR Deck혹은 사업계획서는 필수입니다.');
		}
		userIrInformationController.updateItem(
			{
				APP_MEMBER_IDENTIFICATION_CODE: memberId,
				...userIrInfo,
				IR_FILE: JSON.stringify(irDeckFile),
				IMAGE_LIST: JSON.stringify(companyIntroductionImages),
				INVEST_INFO: JSON.stringify(investInfo),
			},
			(res) => {
				if (res.data.result) {
					alert('성공적으로 업데이트되었습니다.');
					setIsEdit(false);
				}
			},
			(err) => {}
		);
	};

	//* Hooks
	useEffect(() => {
		if (memberId) {
			getUserIrInfo();
		}
	}, [memberId]);

	console.log(JSON.parse(JSON.stringify('string')));
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
									IR 관리
								</Typography>
								<Typography
									color={'secondary.dark'}
									sx={{ mb: 2 }}
								>
									IR Deck, 기업 정보를 관리할 수 있습니다.
								</Typography>
							</Box>
							<SupportiButton
								variant="outlined"
								contents={
									<Box
										display={'flex'}
										alignItems={'center'}
										gap={1}
									>
										<CreateOutlinedIcon fontSize="small" />
										<Typography
											fontWeight={'bold'}
											color={'primary'}
										>
											{isEdit ? '저장하기' : '수정하기'}
										</Typography>
									</Box>
								}
								onClick={() => {
									if (isEdit) {
										if (isUpdate) {
											updateUserIrInfo();
										} else {
											createUserIrInfo();
										}
									} else {
										setIsEdit(!isEdit);
									}
								}}
								disabledGutters
								style={{
									px: 2,
									py: 1,
									bgcolor: 'white',
								}}
							/>
						</Box>
						{/* 본문 */}
						<Box
							bgcolor={'white'}
							width={'100%'}
							borderRadius={3}
							p={4}
						>
							{/* IR deck */}
							<Box
								display={'flex'}
								flexDirection={'column'}
								gap={2}
							>
								<Typography fontWeight={'600'} display={'flex'}>
									IR자료 또는 사업 계획서{' '}
									{isEdit && (
										<Typography
											fontWeight={'600'}
											color={'primary'}
										>
											(필수)
										</Typography>
									)}
								</Typography>
								{isEdit ? (
									<Box>
										<SupportiInput
											type="fileinput"
											value={irDeckFile}
											setValue={setIrDeckFile}
											fileTypeInputName
											fileTypeInputNameMaxSize={{
												unit: 'MB',
												size: 200,
											}}
											additionalProps={{
												inputProps: {
													accept: '.pdf, .ppt, .hwp, .pcdx, .zip',
												},
											}}
										/>
										<Typography
											variant="caption"
											fontWeight={'600'}
											color={'grey'}
										>
											제작년도 / 기업명 / 파일형식 /
											페이지 수 형식으로 업로드
											부탁드립니다. (예시 :
											2024/린온컴퍼니/PDF/25)
										</Typography>
									</Box>
								) : irDeckFile.FILE_URL == '' ? (
									<Box
										p={2}
										boxShadow={
											'rgb(219, 219, 219) 0px 4px 10px'
										}
										borderRadius={2}
									>
										<Typography>
											업로드된 파일이 없습니다.
										</Typography>
									</Box>
								) : (
									<Box
										p={2}
										boxShadow={
											'rgb(219, 219, 219) 0px 4px 10px'
										}
										borderRadius={2}
										justifyContent={'space-between'}
										display={'flex'}
										alignItems={'center'}
									>
										<Typography fontWeight={'600'}>
											{irDeckFile.FILE_NAME}
										</Typography>
										<DownloadForOfflineIcon
											onClick={() => {
												window.open(
													irDeckFile.FILE_URL,
													'_blank'
												);
											}}
											sx={{
												cursor: 'pointer',
											}}
										/>
									</Box>
								)}
							</Box>
							{/* 기업 정보 */}
							<Box mt={2}>
								<Typography fontWeight={'600'}>
									기업 정보
								</Typography>
								<Grid container display={'flex'} gap={1} mt={2}>
									{companyInfoConfig.map((item, index) => {
										return (
											<Grid
												item
												key={index}
												sm={5.9}
												xs={12}
											>
												<Typography
													fontWeight={'600'}
													color={'grey'}
													variant="caption"
												>
													{item.label}
												</Typography>
												{isEdit ? (
													<SupportiInput
														type="text"
														value={
															userIrInfo[
																item.value
															]
														}
														setValue={(value) => {
															setUserIrInfo({
																...userIrInfo,
																[item.value]:
																	value,
															});
														}}
														additionalProps={{
															placeholder:
																item.placeholder
																	? item.placeholder
																	: `${item.label}을 입력해주세요.`,
														}}
													/>
												) : (
													<Typography
														fontWeight={'600'}
														color={
															userIrInfo[
																item.value
															]
																? 'black'
																: 'grey'
														}
														py={1}
													>
														{userIrInfo[item.value]
															? userIrInfo[
																	item.value
															  ]
															: '없음'}
													</Typography>
												)}
											</Grid>
										);
									})}
								</Grid>
							</Box>
							{/* 사업 소개 */}
							<Box mt={2}>
								<Typography fontWeight={'600'}>
									사업 소개
								</Typography>
								<Grid container display={'flex'} gap={1} mt={2}>
									{businessIntroductionConfig.map(
										(item, index) => {
											return (
												<Grid
													item
													key={index}
													xs={12}
													display={'flex'}
													gap={4}
												>
													<Typography
														fontWeight={'600'}
														color={'grey'}
														variant="caption"
														width={'100px'}
													>
														{item.label}
													</Typography>
													{isEdit ? (
														<Box width={'100%'}>
															<SupportiInput
																type="text"
																value={
																	userIrInfo[
																		item
																			.value
																	]
																}
																setValue={(
																	value
																) => {
																	setUserIrInfo(
																		{
																			...userIrInfo,
																			[item.value]:
																				value,
																		}
																	);
																}}
																additionalProps={{
																	placeholder: `${item.label}을 입력해주세요.`,
																	...item.additionalProps,
																	fullWidth:
																		true,
																}}
																style={{
																	width: '100% !important',
																}}
															/>
														</Box>
													) : (
														<Typography
															fontWeight={'600'}
															color={
																userIrInfo[
																	item.value
																]
																	? 'black'
																	: 'grey'
															}
														>
															{userIrInfo[
																item.value
															]
																? userIrInfo[
																		item
																			.value
																  ]
																		.split(
																			'\n'
																		)
																		.map(
																			(
																				item,
																				index
																			) => {
																				return (
																					<Typography
																						sx={{
																							wordBreak:
																								'keep-all',
																							lineHeight:
																								'20px',
																						}}
																						fontWeight={
																							'600'
																						}
																					>
																						{
																							item
																						}
																					</Typography>
																				);
																			}
																		)
																: '없음'}
														</Typography>
													)}
												</Grid>
											);
										}
									)}
								</Grid>
								{/* 이미지 */}
								<Box mt={2} display={'flex'}>
									<Typography
										fontWeight={'600'}
										color={'grey'}
										variant="caption"
										width={'130px'}
									>
										기업 소개 이미지
									</Typography>
									<Box
										display={'flex'}
										gap={2}
										flexWrap={'wrap'}
									>
										{isEdit ? (
											<MultiImageUploader
												imagePreviewUrlList={
													companyIntroductionImages
												}
												setImagePreviewUrlList={
													setCompanyIntroductionImages
												}
												numOfUploader={3}
												label="이미지"
												inputStatus={{
													status: 'default',
												}}
											/>
										) : (
											companyIntroductionImages.map(
												(item, index) => {
													return (
														<Box
															width={'150px'}
															height={'150px'}
															bgcolor={'grey'}
															borderRadius={3}
															sx={{
																backgroundImage: `url(${item})`,
																backgroundSize:
																	'cover',
															}}
															onClick={() =>
																window.open(
																	item,
																	'_blank'
																)
															}
														/>
													);
												}
											)
										)}
									</Box>
								</Box>
							</Box>
							{/* 투자 정보 */}
							<Box mt={2}>
								<Typography fontWeight={'600'}>
									투자 정보
								</Typography>
								<Grid
									container
									display={'flex'}
									gap={1}
									mt={2}
									mb={2}
								>
									{investInfoConfig.map((item, index) => {
										return (
											<Grid
												item
												key={index}
												sm={5.9}
												xs={12}
											>
												<Typography
													fontWeight={'600'}
													color={'grey'}
													variant="caption"
												>
													{item.label}
												</Typography>
												{isEdit ? (
													<SupportiInput
														type={item.type}
														value={
															userIrInfo[
																item.value
															]
														}
														setValue={(value) => {
															setUserIrInfo({
																...userIrInfo,
																[item.value]:
																	value,
															});
														}}
														additionalProps={{
															placeholder: `${item.label}을 입력해주세요.`,
														}}
														dataList={item.options}
													/>
												) : (
													<Typography
														fontWeight={'600'}
														color={
															userIrInfo[
																item.value
															]
																? 'black'
																: 'grey'
														}
														py={1}
													>
														{userIrInfo[item.value]
															? item.value ==
															  'HOPE_INVEST_MONEY'
																? `${
																		userIrInfo[
																			item
																				.value
																		]
																  }억원`
																: userIrInfo[
																		item
																			.value
																  ]
															: '없음'}
													</Typography>
												)}
											</Grid>
										);
									})}
								</Grid>
								{/* 투자 연혁 */}
								<Box
									display={'flex'}
									justifyContent={'space-between'}
									alignItems={'center'}
								>
									{' '}
									<Typography
										fontWeight={'600'}
										color={'grey'}
										variant="caption"
									>
										투자 연혁
									</Typography>
									<Box display={'flex'}></Box>
								</Box>
								{isEdit ? (
									<Grid
										container
										display={'flex'}
										gap={1}
										my={1}
										bgcolor={'primary.light'}
										p={2}
										borderRadius={3}
										position={'relative'}
									>
										{investHistoryConfig.map(
											(item, index) => {
												return (
													<Grid
														item
														key={index}
														display={'flex'}
														alignItems={'center'}
														gap={1}
														sm={5.9}
														xs={12}
													>
														<Typography
															fontWeight={'600'}
															color={'grey'}
															variant="caption"
															width={'50px'}
														>
															{item.label}
														</Typography>
														<SupportiInput
															type={
																item.type
																	? 'datepicker'
																	: 'text'
															}
															value={
																newInvestInfo[
																	item.value
																]
															}
															setValue={(
																value
															) => {
																setNewInvestInfo(
																	{
																		...newInvestInfo,
																		[item.value]:
																			item.type ===
																			'datepicker'
																				? dayjs(
																						value
																				  ).format(
																						'YYYY-MM-DD'
																				  )
																				: value,
																	}
																);
															}}
															additionalProps={{
																placeholder: `${item.label}을 입력해주세요.`,
															}}
														/>
													</Grid>
												);
											}
										)}
										<ControlPointIcon
											onClick={() => {
												if (
													newInvestInfo.INVEST_AMOUNT ===
														'' ||
													newInvestInfo.INVESTOR ===
														'' ||
													newInvestInfo.INVEST_LEVEL ===
														'' ||
													newInvestInfo.VALUE === ''
												) {
													alert(
														'모든 항목을 입력해주세요.'
													);
													return;
												}

												setInvestInfo([
													...investInfo,
													newInvestInfo,
												]);
												setNewInvestInfo({
													DATE: dayjs().format(
														'YYYY-MM-DD'
													),
													INVEST_AMOUNT: '',
													INVESTOR: '',
													INVEST_LEVEL: '',
													VALUE: '',
												});
											}}
											sx={{
												cursor: 'pointer',
												position: 'absolute',
												right: '10px',
												top: '10px',
											}}
										/>
									</Grid>
								) : null}

								<Box mt={1} display={'flex'}>
									<Box
										display={'flex'}
										gap={1}
										sx={{
											overflowX: 'auto',
										}}
									>
										{investInfo.map((item, index) => {
											return (
												<Box
													key={index}
													display={'flex'}
													flexDirection={'column'}
													gap={1}
													bgcolor={'primary.light'}
													p={2}
													borderRadius={3}
													width={'200px'}
													minWidth={'200px'}
													position={'relative'}
												>
													{isEdit && (
														<RemoveCircleOutlineIcon
															onClick={() => {
																setInvestInfo(
																	investInfo.filter(
																		(
																			_,
																			filterIndex
																		) => {
																			return (
																				filterIndex !==
																				index
																			);
																		}
																	)
																);
															}}
															sx={{
																cursor: 'pointer',
																position:
																	'absolute',
																right: '10px',
																top: '10px',
															}}
														/>
													)}
													{investHistoryConfig.map(
														(
															historyItem,
															historyIndex
														) => {
															return (
																<Box
																	display={
																		'flex'
																	}
																	gap={1}
																	alignItems={
																		'center'
																	}
																>
																	{!historyItem.nolabel && (
																		<Typography
																			fontWeight={
																				'600'
																			}
																			color={
																				'grey'
																			}
																			variant="caption"
																			width={
																				'50px'
																			}
																		>
																			{
																				historyItem.label
																			}
																		</Typography>
																	)}
																	<Typography
																		fontWeight={
																			historyItem.fontWeight
																				? historyItem.fontWeight
																				: '600'
																		}
																		color={
																			item[
																				historyItem
																					.value
																			]
																				? historyItem.color
																					? historyItem.color
																					: 'black'
																				: 'grey'
																		}
																		variant={
																			historyItem.variant ===
																				'h6' ||
																			historyItem.variant ===
																				'body2'
																				? historyItem.variant
																				: 'body1'
																		}
																	>
																		{historyItem.isMoney
																			? `${Number(
																					item[
																						historyItem
																							.value
																					]
																			  ).toLocaleString()}원`
																			: item[
																					historyItem
																						.value
																			  ]}
																	</Typography>
																</Box>
															);
														}
													)}
												</Box>
											);
										})}
									</Box>
								</Box>
							</Box>
						</Box>
					</Box>
				</InternalServiceLayout>
			</Box>
		</InternalServiceDrawer>
	);
};

export default Page;
