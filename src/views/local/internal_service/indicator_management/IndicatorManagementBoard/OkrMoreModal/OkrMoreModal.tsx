import React, { useEffect } from 'react';

import { Box, BoxProps, Divider, Typography } from '@mui/material';
import SupportiModal from '../../../../../global/SupportiModal';
import SupportiButton from '../../../../../global/SupportiButton';
import SupportiInput from '../../../../../global/SupportiInput';
import UnderGoalWriteForm from '../UnderGoalWriteForm/UnderGoalWriteForm';
import SupportiProgressBar from '../../../../../global/SupportiProgressBar';
import { IOkrDetail } from '../../../../../../@types/model';
import { OkrDetailController } from '../../../../../../controller/OkrDetailController';

import UnderGoalAchieveBox from '../UnderGoalAchieveBox/UnderGoalAchieveBox';
import DefaultController from '@leanoncompany/supporti-ark-office-project/src/controller/default/DefaultController';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import CloseIcon from '@mui/icons-material/Close';
import { useAppMember } from '../../../../../../hooks/useAppMember';
import { v4 as uuidv4 } from 'uuid';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import UnderGoalCard from '../UnderGoalCard';
import { SupportiAlertModal } from '../../../../../global/SupportiAlertModal';
import { randomColor } from '../../../../../../../configs/randomColorConfig';
import moment from 'moment';
import SupportiToggle from '../../../../../global/SupportiToggle';
import AchievedChartModal from '../../AchievedChartModal/AchievedChartModal';
import dayjs from 'dayjs';

interface IOkrMoreModalProps {
	modalOpen: boolean;
	setModalOpen: React.Dispatch<boolean>;
	okrMainId: string;
	okrMainData?: any;
	setOkrMainData?: any;
	okrDetailData?: any;
	setOkrDetailData?: any;
	setTriggerKey?: React.Dispatch<any>;

	/**
	 * 로딩 상태
	 */
	loading?: boolean;
	setLoading?: React.Dispatch<React.SetStateAction<boolean>>;
}

const OkrMoreModal = (props: IOkrMoreModalProps) => {
	//* Controllers
	const okrMainController = new DefaultController('OkrMain');

	//* Modules

	//* Hooks
	/**
	 * 유저 아이디 가져오는 훅
	 */
	const { memberId } = useAppMember();

	//* Constants
	const today = dayjs();
	const startDate = dayjs(props.okrMainData?.START_DATE);
	const isStartDateAfterToday =
		startDate.diff(today, 'day') > 0 ? true : false;

	//* States
	/**
	 * OKR 메인 데이터
	 */
	const [okrMainData, setOkrMainData] = React.useState({
		TITLE: props.okrMainData?.TITLE,
		START_DATE: props.okrMainData?.START_DATE,
		END_DATE: props.okrMainData?.END_DATE,
		NOTE: props.okrMainData?.NOTE,
		APP_MEMBER_IDENTIFICATION_CODE: memberId,
		ACHIEVED_RATE: props.okrMainData?.ACHIEVED_RATE,
	});

	/**
	 *
	 * 작성하는 하위목표 폼 데이터
	 */
	const [okrDetailData, setOkrDetailData] = React.useState([]);

	/**
	 *
	 * 기존 하위 목표 데이터들
	 */
	const [okrDetails, setOkrDetails] = React.useState(props.okrDetailData);

	/**
	 * 수정 모드인지 여부
	 * **/
	const [isEditMode, setIsEditMode] = React.useState(false);

	/**
	 *
	 * 알럿창 오픈 여부
	 */
	const [isAlertOpen, setIsAlertOpen] = React.useState(false);

	/**
	 *
	 * 알럿창 타입
	 */
	const [alertType, setAlertType] = React.useState(undefined);

	/**
	 * 삭제 여부 확인하는 모달
	 */
	const [isDeleteAlertOpen, setIsDeleteAlertOpen] = React.useState(false);

	/**
	 * 선택 가능한 기간
	 */
	const selectableRangeList: { value: string; label: string }[] = [
		{
			value: '연간',
			label: '연간',
		},
		{
			value: '분기별',
			label: '분기별',
		},
	];
	/**
	 * 선택된 기간
	 */
	const [selectedRange, setSelectedRange] = React.useState<string>('연간');
	/**
	 * Okr 년도 데이터
	 */
	const [okrYearData, setOkrYearData] = React.useState<any>(
		moment().format('YYYY-MM-DDTHH:mm:ss.000')
	);
	/**
	 * 선택 가능 분기
	 */
	const selectableQuarterList: { value: any; label: string }[] = [
		{
			value: JSON.stringify({
				START_DATE: moment(okrYearData)
					.startOf('year')
					.format('YYYY-MM-DDTHH:mm:ss.000'),
				END_DATE: moment(okrYearData)
					.startOf('year')
					.add(2, 'months')
					.endOf('month')
					.format('YYYY-MM-DDTHH:mm:ss.000'),
			}),
			label: '1분기',
		},
		{
			value: JSON.stringify({
				START_DATE: moment(okrYearData)
					.startOf('year')
					.add(3, 'months')
					.format('YYYY-MM-DDTHH:mm:ss.000'),
				END_DATE: moment(okrYearData)
					.startOf('year')
					.add(5, 'months')
					.endOf('month')
					.format('YYYY-MM-DDTHH:mm:ss.000'),
			}),
			label: '2분기',
		},
		{
			value: JSON.stringify({
				START_DATE: moment(okrYearData)
					.startOf('year')
					.add(6, 'months')
					.format('YYYY-MM-DDTHH:mm:ss.000'),
				END_DATE: moment(okrYearData)
					.startOf('year')
					.add(8, 'months')
					.endOf('month')
					.format('YYYY-MM-DDTHH:mm:ss.000'),
			}),
			label: '3분기',
		},
		{
			value: JSON.stringify({
				START_DATE: moment(okrYearData)
					.startOf('year')
					.add(9, 'months')
					.format('YYYY-MM-DDTHH:mm:ss.000'),
				END_DATE: moment(okrYearData)
					.endOf('year')
					.format('YYYY-MM-DDTHH:mm:ss.000'),
			}),
			label: '4분기',
		},
	];
	/**
	 * 선택된 분기
	 */
	const [selectedQuarter, setSelectedQuarter] = React.useState<string>(
		JSON.stringify({
			START_DATE: moment(okrYearData)
				.startOf('year')
				.format('YYYY-MM-DDTHH:mm:ss.000'),
			END_DATE: moment(okrYearData)
				.startOf('year')
				.add(2, 'months')
				.endOf('month')
				.format('YYYY-MM-DDTHH:mm:ss.000'),
		})
	);
	/*
	 *
	 * 달성현황 확인하는 모달 오픈 여부
	 */
	const [achieveModalOpen, setAchieveModalOpen] = React.useState(false);

	//* Functions
	/**
	 * 하위 목표 작성 폼 삭제
	 */
	const deleteOkrDetail = (index: number) => {
		const okrDetailDataCopy = [...okrDetailData];
		okrDetailDataCopy.splice(index, 1);
		setOkrDetailData(okrDetailDataCopy);
	};

	/**
	 *
	 * 메인 목표 하나 받아오기
	 */
	const getOkrMain = () => {
		okrMainController.getOneItem(
			{
				APP_MEMBER_IDENTIFICATION_CODE: memberId,
				OKR_MAIN_IDENTIFICATION_CODE: props.okrMainId,
			},
			(res: any) => {
				setOkrMainData({
					TITLE: res.data.result.TITLE,
					START_DATE: res.data.result.START_DATE,
					END_DATE: res.data.result.END_DATE,
					NOTE: res.data.result.NOTE,
					APP_MEMBER_IDENTIFICATION_CODE: memberId,
					ACHIEVED_RATE: res.data.result.ACHIEVED_RATE,
				});

				setOkrDetails(res.data.result.OkrDetails);

				setSelectedQuarter(
					JSON.stringify({
						START_DATE: res.data.result.START_DATE,
						END_DATE: res.data.result.END_DATE,
					})
				);
				setSelectedRange(
					moment(res.data.result.START_DATE).diff(
						moment(res.data.result.END_DATE)
					) > 5
						? '연간'
						: '분기별'
				);
				setOkrYearData(res.data.result.START_DATE);
			},
			(err: any) => {
				setAlertType('failAxios');
				setIsAlertOpen(true);
			}
		);
	};

	/**
	 *
	 * 메인 목표 수정
	 */
	const updateOkrMain = (injectedObj) => {
		if (okrMainData.TITLE === '') {
			props.setLoading(false);

			alert('필수값을 입력해주세요.');
		} else {
			if (okrMainData.TITLE.length >= 20) {
				props.setLoading(false);

				alert('20자 이하로 입력해주세요.');
				return;
			} else {
				const startDate = `${injectedObj?.START_DATE}Z`;
				const endDate = `${injectedObj?.END_DATE}Z`;
				injectedObj.START_DATE = startDate;
				injectedObj.END_DATE = endDate;

				okrMainController.updateItem(
					Object.assign(
						{
							APP_MEMBER_IDENTIFICATION_CODE: memberId,
							OKR_MAIN_IDENTIFICATION_CODE:
								props.okrMainData[
									'OKR_MAIN_IDENTIFICATION_CODE'
								],
						},
						injectedObj
					),
					(response: any) => {
						props.setLoading(false);

						setAlertType('successModifyAxios');
						setIsAlertOpen(true);

						getOkrMain();

						setIsEditMode(false);
					},
					(err: any) => {
						props.setLoading(false);
					}
				);
			}
		}
	};

	/**
	 *
	 * 메인 목표 삭제
	 */
	const deleteOkrMain = () => {
		okrMainController.deleteItem(
			{
				APP_MEMBER_IDENTIFICATION_CODE: memberId,
				OKR_MAIN_IDENTIFICATION_CODE:
					props.okrMainData['OKR_MAIN_IDENTIFICATION_CODE'],
			},
			(response: any) => {
				props.setLoading(false);

				props.setTriggerKey && props.setTriggerKey(uuidv4());
				props.setModalOpen(false);

				setAlertType('successDeleteAxios');
				setIsAlertOpen(true);
			},
			(err: any) => {
				props.setLoading(false);
				setAlertType('failAxios');
				setIsAlertOpen(true);
			}
		);
	};

	/**
	 *
	 * 프로그레스 바 달성률 데이터 셋팅
	 */
	const materialDataList = okrDetails.map((item, index) => {
		return {
			percentage:
				item.ACHIEVED_RATE > 100
					? Math.round(100 / okrDetails.length).toString()
					: Math.round(
							item.ACHIEVED_RATE / okrDetails.length
					  ).toString(),
			color: randomColor[index],
		};
	});

	//* Hooks
	React.useEffect(() => {
		if (!isEditMode && memberId) {
			setOkrMainData({
				TITLE: props.okrMainData?.TITLE,
				START_DATE: props.okrMainData?.START_DATE,
				END_DATE: props.okrMainData?.END_DATE,
				NOTE: props.okrMainData?.NOTE,
				APP_MEMBER_IDENTIFICATION_CODE: memberId,
				ACHIEVED_RATE: props.okrMainData?.ACHIEVED_RATE,
			});

			setOkrDetailData([]);
		}
	}, [isEditMode, memberId, props.modalOpen]);

	/**
	 * 데이터 변경 되었을시 수정모드 해제
	 */
	React.useEffect(() => {
		setIsEditMode(false);
	}, [okrDetails]);

	React.useEffect(() => {
		getOkrMain();
	}, []);

	//* 연간/분기별 선택시 날짜 변경
	useEffect(() => {
		if (selectedRange === '연간') {
			setOkrMainData({
				...okrMainData,
				START_DATE: moment(okrYearData)
					.startOf('year')
					.format('YYYY-MM-DDTHH:mm:ss.000'),
				END_DATE: moment(okrYearData)
					.endOf('year')
					.format('YYYY-MM-DDTHH:mm:ss.000'),
			});
		} else {
			setOkrMainData({
				...okrMainData,
				START_DATE: JSON.parse(selectedQuarter).START_DATE,
				END_DATE: JSON.parse(selectedQuarter).END_DATE,
			});
		}
	}, [selectedRange, okrYearData, selectedQuarter]);

	return (
		<Box>
			<SupportiModal
				open={props.modalOpen}
				handleClose={() => {
					props.setModalOpen(false);
				}}
				activeHeader={false}
				title={''}
				style={{
					width: { xs: '100%', md: '55%' },
					// padding: { xs: '10px', md: '0' },
				}}
				children={
					<Box
						display={'flex'}
						flexDirection={'column'}
						gap={2}
						maxHeight={'80vh'}
						minHeight={'70vh'}
						overflow={'auto'}
						sx={{
							width: '100%',
							'-ms-overflow-style': 'none',
							'&::-webkit-scrollbar': {
								width: '6px',
								height: '5px !important',
								backgroundColor: 'white !important',
								padding: '1px',
								borderRadius: '20px',
							},
							'&::-webkit-scrollbar-thumb': {
								backgroundColor: '#b0b5c2',
								borderRadius: '20px',
							},
							pt: 2,
							pr: 1,
						}}
					>
						{/** 상위 목표 작성 */}
						<Box display={'flex'} flexDirection={'column'} gap={1}>
							<Box
								display={'flex'}
								justifyContent={'space-between'}
								alignItems={'center'}
							>
								{/** 수정모드일 시 입력 폼 */}
								{isEditMode ? (
									<Box width={'95%'}>
										<SupportiInput
											type="input"
											value={okrMainData.TITLE}
											setValue={(value: string) => {
												setOkrMainData({
													...okrMainData,
													TITLE: value,
												});
											}}
											width={'100%'}
											additionalProps={{
												placeholder:
													'상위 목표 타이틀을 입력해주세요.',
											}}
										/>
										<Box
											display="flex"
											justifyContent={'space-between'}
										>
											<Typography
												variant="body1"
												color="error.main"
												sx={{
													visibility:
														okrMainData.TITLE !== ''
															? 'hidden'
															: 'block',
												}}
											>
												필수값입니다.
											</Typography>

											{/** 메인 목표 타이틀 글자수와 글자수 제한 영역 */}
											<Box
												display="flex"
												ml={'auto'}
												gap={0.5}
												mt={1}
											>
												<Typography
													color={
														okrMainData.TITLE
															.length < 20
															? 'secondary.main'
															: 'warning.main'
													}
												>
													{okrMainData.TITLE.length}
												</Typography>
												<Typography
													color={
														okrMainData.TITLE
															.length < 20
															? 'secondary.main'
															: 'warning.main'
													}
												>
													/
												</Typography>
												<Typography
													color={
														okrMainData.TITLE
															.length < 20
															? 'secondary.main'
															: 'warning.main'
													}
												>
													20
												</Typography>
											</Box>
										</Box>
									</Box>
								) : (
									<Box display="flex" gap={2}>
										<Typography
											fontWeight={'bold'}
											variant="h2"
										>
											{okrMainData?.TITLE}
										</Typography>
										{!isStartDateAfterToday && (
											<SupportiButton
												contents={'달성현황 확인하기'}
												onClick={() => {
													setAchieveModalOpen(true);
												}}
												style={{
													height: '35px',
													width: '140px',
													marginLeft: 'auto',
													marginRight: 'auto',
												}}
												color={'primary'}
												variant="outlined"
											/>
										)}
									</Box>
								)}
								<Box
									display={'flex'}
									gap={'4px'}
									alignItems={'center'}
									pb={'10px'}
								>
									{/** 삭제 버튼 */}
									{!isEditMode && (
										<DeleteIcon
											onClick={() => {
												setIsDeleteAlertOpen(true);
											}}
											color={'secondary'}
										/>
									)}

									{/** 수정 버튼 */}
									{!isEditMode ? (
										<ModeEditOutlineIcon
											onClick={() => {
												setIsEditMode(!isEditMode);
											}}
											color={'secondary'}
										/>
									) : (
										<CloseIcon
											style={{
												marginLeft: 1,
												cursor: 'pointer',
												color: 'gray',
											}}
											onClick={() => {
												setIsEditMode(!isEditMode);
											}}
										/>
									)}
									{/** 닫기 버튼 */}
									{/* <CloseIcon
										style={{
											marginLeft: 1,
											cursor: 'pointer',
										}}
										onClick={() =>
											props.setModalOpen(false)
										}
									/> */}
								</Box>
							</Box>

							{/** 날짜  */}
							<Box display={'flex'} pb={1}>
								{!isEditMode ? (
									<Box display={'flex'}>
										{/** 수정모드 아닐 시 시작 기간 ~ 끝 기간 */}
										<CalendarTodayIcon
											sx={{
												width: '15px',
												height: '15px',
												marginTop: 'auto',
												marginBottom: 'auto',
												marginRight: '5px',
												color: 'secondary.main',
											}}
										/>
										<Typography
											fontWeight={500}
											color={'secondary.main'}
										>
											{
												(
													okrMainData?.START_DATE as string
												).split('T')[0]
											}
										</Typography>
										<Typography
											ml={0.5}
											mr={0.5}
											fontWeight={500}
											color={'secondary.main'}
										>
											~
										</Typography>
										<Typography
											fontWeight={500}
											color={'secondary.main'}
										>
											{
												(
													okrMainData?.END_DATE as string
												).split('T')[0]
											}
										</Typography>
									</Box>
								) : (
									<Box
										display={'flex'}
										flexDirection={'column'}
										gap={1}
										width={'100%'}
										height={'100%'}
									>
										{/* 분기별/ 연도별 */}
										<Box width={{ md: '30%', xs: '100%' }}>
											<SupportiToggle
												chipDataList={
													selectableRangeList
												}
												value={selectedRange}
												setValue={(value) =>
													setSelectedRange(
														value as string
													)
												}
												chipHeight={'30px'}
												style={{
													outerBoxStyle: {
														p: '5px',
													},
												}}
											/>
										</Box>
										{/** 날짜  */}
										<Box
											display={'flex'}
											bgcolor={'white'}
											flexDirection={{
												md: 'row',
												xs: 'column',
											}}
											justifyContent={'space-between'}
											alignItems={{
												md: 'center',
												xs: 'flex-start',
											}}
											gap={2}
										>
											<Box display={'flex'}>
												<CalendarTodayIcon
													sx={{
														width: '15px',
														height: '15px',
														marginTop: 'auto',
														marginBottom: 'auto',
														marginRight: '5px',
													}}
												/>
												<Box>
													<SupportiInput
														type="yearpicker"
														value={okrYearData}
														setValue={(value) => {
															setOkrYearData(
																value.toDate()
															);
														}}
														style={{
															border: '0px solid red',
															'& .MuiInputBase-root':
																{
																	border: '0px solid red !important',
																},
														}}
														additionalProps={{
															variant: 'standard',
														}}
														width={'70px'}
													/>
												</Box>
												{selectedRange === '분기별' && (
													<Box ml={1}>
														<SupportiInput
															type="select"
															value={
																selectedQuarter
															}
															setValue={(
																value
															) => {
																setSelectedQuarter(
																	value
																);
																setOkrMainData({
																	...okrMainData,
																	START_DATE:
																		JSON.parse(
																			value
																		)
																			.START_DATE,
																	END_DATE:
																		JSON.parse(
																			value
																		)
																			.END_DATE,
																});
															}}
															dataList={
																selectableQuarterList
															}
															width={'110px'}
														/>
													</Box>
												)}
											</Box>
											<Typography
												fontWeight={500}
												color={'secondary.main'}
											>
												{
													okrMainData.START_DATE.split(
														'T'
													)[0]
												}{' '}
												~
												{
													okrMainData.END_DATE.split(
														'T'
													)[0]
												}
											</Typography>
										</Box>
									</Box>
								)}
							</Box>

							{/** 달성률 영역 */}
							<Box display="flex" gap={2} flexDirection="column">
								<Box display="flex" gap={1}>
									<Typography
										fontWeight={600}
										variant="subtitle1"
									>
										현재 달성률
									</Typography>
									<Typography
										color={'primary.main'}
										fontWeight={600}
										variant="subtitle1"
									>
										{okrMainData.ACHIEVED_RATE
											? okrMainData.ACHIEVED_RATE
											: 0}
										%
									</Typography>
								</Box>
								{/** 프로그레스바 */}
								<SupportiProgressBar
									materialDataList={materialDataList}
									totalPercentage={okrMainData.ACHIEVED_RATE}
									bgColor="secondary.light"
								/>

								{/** 메모 입력 */}
								<SupportiInput
									type="inputwithbtn"
									value={okrMainData.NOTE}
									setValue={(value) => {
										setOkrMainData({
											...okrMainData,
											NOTE: value,
										});
									}}
									btnContent="등록하기"
									btnOnClick={() => {
										updateOkrMain({
											NOTE: okrMainData.NOTE,
										});
									}}
									additionalProps={{
										placeholder: '메모 입력',
										multiline: true,
									}}
									width={'100%'}
								/>

								{/** 메모 글자수와 글자수 제한 영역 */}
								<Box display="flex" ml={'auto'} gap={0.5}>
									<Typography
										color={
											okrMainData.NOTE.length < 500
												? 'secondary.main'
												: 'warning.main'
										}
									>
										{okrMainData.NOTE.length}
									</Typography>
									<Typography
										color={
											okrMainData.NOTE.length < 500
												? 'secondary.main'
												: 'warning.main'
										}
									>
										/
									</Typography>
									<Typography
										color={
											okrMainData.NOTE.length < 500
												? 'secondary.main'
												: 'warning.main'
										}
									>
										500
									</Typography>
								</Box>
							</Box>
						</Box>
						{/** 등록 버튼 */}
						{isEditMode && (
							<SupportiButton
								contents={'수정하기'}
								onClick={() => {
									//* Okr 메인 목표 등록
									props.setLoading(true);
									memberId && updateOkrMain(okrMainData);
								}}
								style={{
									height: '40px',
									width: '150px',
									marginLeft: 'auto',
									marginRight: 'auto',
								}}
								color={'primary'}
								variant="contained"
								isGradient={true}
							/>
						)}

						{/** 구분선 */}
						<Divider sx={{ my: 1 }} />

						{/** 하위 목표 작성 */}
						<Box>
							<Box
								display={'flex'}
								justifyContent={'space-between'}
								alignItems={'center'}
								mb={1}
							>
								<Box display={'flex'}>
									<Typography
										fontWeight={700}
										variant="subtitle1"
									>
										하위목표
									</Typography>
									{/** 갯수 */}
									<Typography
										color="primary.main"
										ml={1}
										fontWeight={600}
										variant="subtitle1"
									>
										{okrDetails.length}
									</Typography>
								</Box>

								{/** 하위 목표 추가 버튼 */}
								<SupportiButton
									contents={'하위 목표 추가 +'}
									onClick={() => {
										if (okrDetailData.length === 0) {
											setOkrDetailData([
												...okrDetailData,
												{
													TITLE: '',
													START_DATE: new Date(),
													END_DATE: new Date(),
													TARGET_AMOUNT: undefined,
													TARGET_UNIT: undefined,
													NOTE: '',
													ACHIEVED_AMOUNT: 0,
													APP_MEMBER_IDENTIFICATION_CODE:
														memberId,
												},
											]);
										}
									}}
									style={{
										height: 5,
										color: 'black',
										// marginBottom: '10px',
									}}
									color={'secondary'}
									variant="outlined"
								/>
							</Box>

							{/** 작성 컴포넌트 */}
							{okrDetailData?.map((okr, index) => {
								return (
									<UnderGoalWriteForm
										key={index}
										mode={'detail'}
										data={okr}
										index={index}
										okrDetailData={okrDetailData}
										setOkrDetailData={setOkrDetailData}
										isModalOpen={props.modalOpen}
										setIsModalOpen={props.setModalOpen}
										okrMainId={
											props.okrMainData
												?.OKR_MAIN_IDENTIFICATION_CODE
										}
										maxDate={okrMainData?.END_DATE}
										deleteOkrDetail={deleteOkrDetail}
										setTriggerKey={props.setTriggerKey}
										loading={props.loading}
										setLoading={props.setLoading}
										getOkrMain={getOkrMain}
										okrDetails={okrDetails}
									/>
								);
							})}

							{/** 하위 목표 리스트 영역 */}
							<Box>
								{okrDetails?.map((item, index) => {
									return (
										<Box
											borderRadius={2}
											display={'flex'}
											flexDirection={'column'}
											mb={1}
										>
											<UnderGoalCard
												data={item}
												index={index}
												mode="detail"
												children={
													<UnderGoalAchieveBox
														data={item}
														getOkrMain={getOkrMain}
														isStartDateAfterToday={
															isStartDateAfterToday
														}
													/>
												}
												maxDate={okrMainData?.END_DATE}
												getOkrMain={getOkrMain}
												loading={props.loading}
												setLoading={props.setLoading}
											/>
										</Box>
									);
								})}
							</Box>
						</Box>
					</Box>
				}
			/>

			{/** 달성현황 확인 모달 */}
			<AchievedChartModal
				modalOpen={achieveModalOpen}
				setModalOpen={setAchieveModalOpen}
				chartData={{
					mainData: {
						title: okrMainData.TITLE,
						startDate: okrMainData.START_DATE,
						endDate: okrMainData.END_DATE,
						id: props.okrMainData['OKR_MAIN_IDENTIFICATION_CODE'],
					},
					subData: okrDetails.map((item) => {
						return {
							title: item.TITLE,
							id: item.OKR_DETAIL_IDENTIFICATION_CODE,
						};
					}),
				}}
			/>

			{/** 알럿 */}
			<SupportiAlertModal
				open={isAlertOpen}
				handleClose={() => {
					props.setLoading(false);
					setIsAlertOpen(false);
				}}
				type={alertType}
			/>
			<SupportiAlertModal
				open={isDeleteAlertOpen}
				handleClose={() => setIsDeleteAlertOpen(false)}
				customHandleClose={() => {
					props.setLoading(true);
					memberId && deleteOkrMain();

					setIsDeleteAlertOpen(false);
				}}
				type={'delete'}
			/>
		</Box>
	);
};

export default OkrMoreModal;
