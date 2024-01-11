import React from 'react';
import { Box, Typography } from '@mui/material';

import SupportiInput from '../../../../../global/SupportiInput';
import SupportiButton from '../../../../../global/SupportiButton';
import SupportiProgressBar from '../../../../../global/SupportiProgressBar';
import { SupportiAlertModal } from '../../../../../global/SupportiAlertModal';

import { IOkrDetail } from '../../../../../../@types/model';
import { randomColor } from '../../../../../../../configs/randomColorConfig';
import { IndicatorUnit } from '../../../../../../../configs/data/IndicatorUnitConfig';
import DefaultController from '@leanoncompany/supporti-ark-office-project/src/controller/default/DefaultController';
import { useAppMember } from '../../../../../../hooks/useAppMember';

import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';

interface IUnderGoalCardProps {
	data: IOkrDetail;
	index: number;
	mode?: string;
	children?: React.ReactNode;
	memberId?: number;
	getOkrMain?: any;
	maxDate?: string;
	/**
	 * 로딩 상태
	 */
	loading?: boolean;
	setLoading?: React.Dispatch<React.SetStateAction<boolean>>;
}

const UnderGoalCard = (props: IUnderGoalCardProps) => {
	//* Modules
	const okrDetailController = new DefaultController('OkrDetail');

	//* States
	const [isMoreOpen, setIsMoreOpen] = React.useState(false);
	/**
	 *
	 * 삭제 시 알럿 모달
	 */
	const [deleteAlertModal, setDeleteAlertModal] = React.useState(false);

	/**
	 *
	 * 수정 시 알럿 모달
	 */
	const [modifyAlertModal, setModifyAlertModal] = React.useState(false);

	/**
	 * 직접 입력 여부
	 *  */
	const [isUserMakeUnit, setIsUserMakeUnit] = React.useState(false);

	/**
	 * 수정 모드 여부
	 */
	const [isEditMode, setIsEditMode] = React.useState(false);

	const [okrDetailData, setOkrDetailData] = React.useState({
		TITLE: props.data.TITLE,
		START_DATE: props.data.START_DATE,
		END_DATE: props.data.END_DATE,
		TARGET_AMOUNT: Number(props.data.TARGET_AMOUNT),
		TARGET_UNIT: props.data.TARGET_UNIT,
		NOTE: props.data.NOTE,
		ACHIEVED_AMOUNT: props.data.ACHIEVED_AMOUNT,
		APP_MEMBER_IDENTIFICATION_CODE: props.memberId,
	});

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

	//* Constants
	/**
	 * 제목만 변경 시 히스토리 삭제 방지를 위한 기본데이터 상수들
	 */
	const defaultTargetUnit = props.data.TARGET_UNIT;
	const defaultTargetAmount = props.data.TARGET_AMOUNT;
	const defaultStartDate = props.data.START_DATE;
	const defaultEndDate = props.data.END_DATE;

	/**
	 * 유저 아이디 가져오는 훅
	 */
	const { memberId } = useAppMember();

	//* Functions

	/**
	 *
	 * 하위 목표 삭제
	 */
	const deleteOkrDetail = () => {
		okrDetailController.deleteItem(
			{
				APP_MEMBER_IDENTIFICATION_CODE: memberId,
				OKR_DETAIL_IDENTIFICATION_CODE:
					props.data['OKR_DETAIL_IDENTIFICATION_CODE'],
			},
			(response: any) => {
				props.setLoading(false);

				setAlertType('successDeleteAxios');
				setIsAlertOpen(true);

				props.getOkrMain();
				setIsMoreOpen(false);
			},
			(err: any) => {
				props.setLoading(false);

				setAlertType('failAxios');
				setIsAlertOpen(true);
			}
		);
	};

	/**
	 * 하위 목표 수정
	 */
	const updateOkrDetail = (injectedObj) => {
		if (
			okrDetailData.TITLE === '' ||
			okrDetailData.TARGET_UNIT == undefined ||
			okrDetailData.TARGET_UNIT == '' ||
			okrDetailData.TARGET_AMOUNT == 0 ||
			okrDetailData.TARGET_AMOUNT === undefined
		) {
			props.setLoading(false);

			setAlertType('indicatorWarning');
			setIsAlertOpen(true);
		} else {
			if (okrDetailData.TITLE.length > 20) {
				props.setLoading(false);

				alert('타이틀은 20자내로 입력해주세요.');
				// setOkrDetailData({
				// 	...okrDetailData,
				// 	TITLE: okrDetailData.TITLE.substring(0, 20),
				// });
			} else {
				okrDetailController.updateItem(
					Object.assign(
						{
							APP_MEMBER_IDENTIFICATION_CODE: memberId,
							OKR_DETAIL_IDENTIFICATION_CODE:
								props.data['OKR_DETAIL_IDENTIFICATION_CODE'],
						},
						injectedObj
					),
					(response: any) => {
						props.setLoading(false);

						setAlertType('successModifyAxios');
						setIsAlertOpen(true);

						props.getOkrMain();

						setIsEditMode(false);
					},
					(err: any) => {
						props.setLoading(false);

						setAlertType('failAxios');
						setIsAlertOpen(true);
					}
				);
			}
		}
	};

	//* Hooks
	React.useEffect(() => {
		//* 수정모드가 아닐 경우 기존 데이터로 리셋
		// if (!isEditMode) {
		// 	setOkrDetailData({
		// 		TITLE: props.data.TITLE,
		// 		START_DATE: props.data.START_DATE,
		// 		END_DATE: props.data.END_DATE,
		// 		TARGET_AMOUNT: Number(props.data.TARGET_AMOUNT),
		// 		TARGET_UNIT: props.data.TARGET_UNIT,
		// 		NOTE: props.data.NOTE,
		// 		ACHIEVED_AMOUNT: props.data.ACHIEVED_AMOUNT,
		// 		APP_MEMBER_IDENTIFICATION_CODE: props.memberId,
		// 	});
		// }
		setOkrDetailData({
			TITLE: props.data.TITLE,
			START_DATE: props.data.START_DATE,
			END_DATE: props.data.END_DATE,
			TARGET_AMOUNT: Number(props.data.TARGET_AMOUNT),
			TARGET_UNIT: props.data.TARGET_UNIT,
			NOTE: props.data.NOTE,
			ACHIEVED_AMOUNT: props.data.ACHIEVED_AMOUNT,
			APP_MEMBER_IDENTIFICATION_CODE: props.memberId,
		});
	}, [isEditMode]);

	React.useEffect(() => {
		setDeleteAlertModal(false);
		setIsEditMode(false);
	}, [props.data]);

	return (
		<Box
			borderRadius={2}
			bgcolor={'secondary.light'}
			display="flex"
			flexDirection={'column'}
			gap={1}
			pb={isMoreOpen && 0}
			width={props.mode === 'detail' ? '95%' : '380px'}
			sx={{
				minWidth: { xs: '300px', md: '380px' },
				p: { xs: 1.5, md: 2 },
			}}
			onClick={() => {
				if (props.mode === 'detail') {
					if (!isEditMode && !isMoreOpen) setIsMoreOpen(!isMoreOpen);
				}
			}}
		>
			<Box width="100%" display={'flex'} gap={1}>
				{/** 컬러 칩 */}
				<Box
					sx={{
						borderRadius: '50%',
						bgcolor: randomColor[props.index],
						width: '11px',
						height: '10px',
						mt: '5px',
					}}
				/>
				<Box width="100%">
					<Box mb={1} display="flex">
						{/** 타이틀 */}
						{isEditMode ? (
							<Box width={'80%'}>
								<SupportiInput
									type="input"
									value={okrDetailData.TITLE}
									setValue={(value: string) => {
										setOkrDetailData({
											...okrDetailData,
											TITLE: value,
										});
									}}
									width={'100%'}
									style={{
										marginTop: 'auto',
										marginBottom: 'auto',
									}}
									additionalProps={{
										placeholder:
											'하위 목표 타이틀을 입력해주세요.',
									}}
								/>
								<Typography
									variant="body1"
									color="error.main"
									sx={{
										visibility:
											okrDetailData.TITLE !== ''
												? 'hidden'
												: 'block',
									}}
								>
									필수값입니다.
								</Typography>
							</Box>
						) : (
							<Box display={'flex'} gap={1}>
								<Typography fontWeight={500} mt={'4px'}>
									{props.data.TITLE}
								</Typography>
							</Box>
						)}

						{/** 상세보기일때 화살표 아이콘 */}
						{props.mode === 'detail' && (
							<Box ml={'auto'} display={'flex'} gap={'5px'}>
								{isMoreOpen && (
									<Box
										display={'flex'}
										gap={'4px'}
										mt="auto"
										mb="auto"
										pb={'14px'}
									>
										{/** 삭제 버튼 */}
										<DeleteIcon
											onClick={() => {
												setDeleteAlertModal(true);
											}}
											color={'secondary'}
										/>

										{/** 수정 버튼 */}
										<ModeEditOutlineIcon
											onClick={() => {
												setIsEditMode(!isEditMode);
											}}
											color={'secondary'}
										/>
									</Box>
								)}

								{/** 더보기 열고 닫기 */}
								{isMoreOpen ? (
									<ArrowDropUpIcon
										style={{
											cursor: 'pointer',
											width: '20px',
											height: '20px',
											marginTop: isEditMode && '14px',
										}}
										onClick={() =>
											setIsMoreOpen(!isMoreOpen)
										}
									/>
								) : (
									<ArrowDropDownIcon
										style={{
											cursor: 'pointer',
											width: '20px',
											height: '20px',
											marginTop: isEditMode && '14px',
										}}
										onClick={() =>
											setIsMoreOpen(!isMoreOpen)
										}
									/>
								)}
							</Box>
						)}
					</Box>

					{/** 상세보기 모달에서 사용될 시 더보기 클릭 전 */}
					{props.mode === 'detail' && !isMoreOpen && (
						<Box display="flex" flexDirection="column" gap={1}>
							{/** 달성률*/}
							<Box display="flex" mt={'20px'}>
								<Typography fontWeight={600}>
									현재 달성률
								</Typography>
								<Typography
									ml={1}
									color={'primary.main'}
									fontWeight={600}
								>
									{props.data?.ACHIEVED_RATE
										? props.data?.ACHIEVED_RATE
										: 0}
									%
								</Typography>
							</Box>
							{/** 프로그레스 바 */}
							<SupportiProgressBar
								materialDataList={[
									{
										percentage:
											props.data?.ACHIEVED_RATE?.toString(),
										color: randomColor[props.index],
									},
								]}
							/>
							{/** 목표량 목표분류 */}
							<Box display={'flex'}>
								<Typography fontWeight={500} ml={'auto'}>
									{props.data?.ACHIEVED_AMOUNT}
								</Typography>
								<Typography
									ml={0.5}
									mr={0.5}
									fontWeight={500}
									color={'secondary.main'}
								>
									/
								</Typography>
								<Typography
									fontWeight={500}
									color={'secondary.main'}
								>
									{(props.data?.TARGET_AMOUNT as string) +
										' ' +
										(props.data?.TARGET_UNIT as string)}
								</Typography>
							</Box>
						</Box>
					)}

					{/** 상세보기 모달에서 사용될 시 더보기 클릭 후 */}
					{props.mode === 'detail' && isMoreOpen ? (
						<Box display="flex" flexDirection="column" gap={1}>
							{/** 수정모드일 시 데이트피커, 수정모드 해제 시 시작 ~ 끝 기간 */}
							{isEditMode ? (
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
									<SupportiInput
										type="datepicker"
										additionalProps={{
											defaultValue:
												okrDetailData.START_DATE,
										}}
										value={okrDetailData.START_DATE}
										setValue={(value) => {
											setOkrDetailData({
												...okrDetailData,
												START_DATE: value
													.toDate()
													.toISOString(),
											});
										}}
										width={'110px'}
										useIcon={false}
										style={{ height: '20px' }}
									/>
									<Typography
										ml={0.5}
										mr={0.5}
										fontWeight={500}
										color={'secondary.main'}
										sx={{
											marginTop: 'auto',
											marginBottom: 'auto',
										}}
									>
										~
									</Typography>
									<SupportiInput
										type="datepicker"
										additionalProps={{
											defaultValue:
												okrDetailData.END_DATE,
										}}
										value={okrDetailData?.END_DATE}
										minDate={
											okrDetailData?.START_DATE as string
										}
										maxDate={props.maxDate}
										setValue={(value) => {
											setOkrDetailData({
												...okrDetailData,
												END_DATE: value
													.toDate()
													.toISOString(),
											});
										}}
										width={'110px'}
										useIcon={false}
									/>
								</Box>
							) : (
								<Box display={'flex'}>
									<Typography
										fontWeight={500}
										color={'secondary.main'}
									>
										{
											(
												props.data?.START_DATE as string
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
												props.data?.END_DATE as string
											).split('T')[0]
										}
									</Typography>
								</Box>
							)}

							{/** 수정모드 아닐 경우 */}
							{!isEditMode && (
								<Box
									display="flex"
									flexDirection="column"
									gap={1}
								>
									{/** 달성률*/}
									<Box display="flex" mt={'20px'}>
										<Typography fontWeight={600}>
											현재 달성률
										</Typography>
										<Typography
											ml={1}
											color={'primary.main'}
											fontWeight={600}
										>
											{props.data.ACHIEVED_RATE
												? props.data.ACHIEVED_RATE
												: 0}
											%
										</Typography>
									</Box>
									{/** 프로그레스 바 */}
									<SupportiProgressBar
										materialDataList={[
											{
												percentage:
													props.data?.ACHIEVED_RATE?.toString(),
												color: randomColor[props.index],
											},
										]}
									/>
									{/** 목표량 목표분류 */}
									<Box display={'flex'}>
										<Typography
											fontWeight={500}
											ml={'auto'}
										>
											{props.data?.ACHIEVED_AMOUNT}
										</Typography>
										<Typography
											ml={0.5}
											mr={0.5}
											fontWeight={500}
											color={'secondary.main'}
										>
											/
										</Typography>
										<Typography
											fontWeight={500}
											color={'secondary.main'}
										>
											{(props.data
												?.TARGET_AMOUNT as string) +
												' ' +
												(props.data
													?.TARGET_UNIT as string)}
										</Typography>
									</Box>
								</Box>
							)}

							{isEditMode && isMoreOpen ? (
								<Box
									display={'flex'}
									sx={{ gap: { xs: 1, md: 2 } }}
								>
									{/** 목표분류 */}
									<Box>
										<Typography fontWeight={500} mb={1}>
											목표분류
										</Typography>
										<SupportiInput
											type="select"
											value={
												isUserMakeUnit
													? '직접입력'
													: okrDetailData.TARGET_UNIT
											}
											setValue={(value) => {
												if (value === '직접입력') {
													setIsUserMakeUnit(true);

													setOkrDetailData({
														...okrDetailData,
														TARGET_UNIT: '',
													});
												} else {
													setIsUserMakeUnit(false);

													setOkrDetailData({
														...okrDetailData,
														TARGET_UNIT: value,
													});
												}
											}}
											dataList={IndicatorUnit}
											style={{
												width: {
													xs: '100px',
													md: '150px',
												},
											}}
										/>
										{/** 유저가 목표 분류 직접 입력 선택 시 */}
										{isUserMakeUnit && (
											<SupportiInput
												type="input"
												value={
													okrDetailData.TARGET_UNIT
												}
												setValue={(value) => {
													setOkrDetailData({
														...okrDetailData,
														TARGET_UNIT: value,
													});
												}}
												style={{
													bgcolor: 'white',
													marginTop: '5px',
													width: {
														xs: '100px',
														md: '150px',
													},
												}}
											/>
										)}

										<Typography
											fontWeight={500}
											variant="body1"
											color="error.main"
											mt={'5px'}
											sx={{
												visibility:
													okrDetailData.TARGET_UNIT !=
													undefined
														? 'hidden'
														: 'block',
											}}
										>
											필수 값 입니다.
										</Typography>
									</Box>
									{/** 목표량 */}
									<Box>
										<Typography fontWeight={500} mb={1}>
											목표량
										</Typography>
										<Box display={'flex'}>
											<SupportiInput
												type="input"
												inputType="number"
												additionalProps={{
													placeholder: '목표량 입력',
												}}
												value={
													okrDetailData.TARGET_AMOUNT
												}
												setValue={(value: number) => {
													setOkrDetailData({
														...okrDetailData,
														TARGET_AMOUNT: value,
													});
												}}
												style={{
													bgcolor: 'white',
													width: {
														xs: '100px',
														md: '150px',
													},
												}}
											/>
											{/* <Box mt={'auto'} mb={'auto'} ml={'5px'}>
							<Typography >
								{
									props.okrDetailData[props.index]
										.TARGET_UNIT
								}
							</Typography>
						</Box> */}
										</Box>
										<Typography
											fontWeight={500}
											variant="body1"
											color="error.main"
											mt={'5px'}
											sx={{
												visibility:
													okrDetailData.TARGET_AMOUNT !==
														0 ||
													okrDetailData.TARGET_AMOUNT !==
														undefined
														? 'hidden'
														: 'block',
											}}
										>
											필수 값 입니다.
										</Typography>
									</Box>

									{/** 등록 버튼  */}
									<SupportiButton
										contents={'등록하기'}
										onClick={() => {
											if (
												defaultTargetUnit !==
													okrDetailData.TARGET_UNIT ||
												Number(defaultTargetAmount) !==
													okrDetailData.TARGET_AMOUNT ||
												defaultStartDate !==
													okrDetailData.START_DATE ||
												defaultEndDate !==
													okrDetailData.END_DATE
											)
												setModifyAlertModal(true);
											else {
												props.setLoading(true);
												memberId &&
													updateOkrDetail({
														TITLE: okrDetailData.TITLE,
													});
											}
										}}
										style={{
											height: '25px',
											width: '100px',
											marginTop: '30px',
											marginLeft: 'auto',
										}}
										color={'primary'}
										variant="contained"
										isGradient={true}
									/>
								</Box>
							) : (
								props.children
							)}
						</Box>
					) : props.mode === 'detail' && !isMoreOpen ? null : (
						<Box>
							{/** 기간 */}
							<Box display={'flex'}>
								<Typography
									fontWeight={500}
									color={'secondary.main'}
								>
									{
										(
											props.data?.START_DATE as string
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
										(props.data?.END_DATE as string).split(
											'T'
										)[0]
									}
								</Typography>
							</Box>

							{/** 달성률*/}
							<Box display="flex" flexDirection="column" gap={1}>
								<Box display="flex" mt={'20px'}>
									<Typography fontWeight={600}>
										현재 달성률
									</Typography>
									<Typography
										ml={1}
										color={'primary.main'}
										fontWeight={600}
									>
										{props.data?.ACHIEVED_RATE
											? props.data?.ACHIEVED_RATE
											: 0}
										%
									</Typography>
								</Box>

								{/** 프로그레스 바 */}
								<SupportiProgressBar
									materialDataList={[
										{
											percentage:
												props.data?.ACHIEVED_RATE?.toString(),
											color: randomColor[props.index],
										},
									]}
								/>
							</Box>

							{/** 목표량 목표분류 */}
							<Box display={'flex'} mt={1}>
								<Typography fontWeight={500} ml={'auto'}>
									{props.data?.ACHIEVED_AMOUNT}
								</Typography>
								<Typography
									ml={0.5}
									mr={0.5}
									fontWeight={500}
									color={'secondary.main'}
								>
									/
								</Typography>
								<Typography
									fontWeight={500}
									color={'secondary.main'}
								>
									{(props.data?.TARGET_AMOUNT as string) +
										' ' +
										(props.data?.TARGET_UNIT as string)}
								</Typography>
							</Box>
						</Box>
					)}
				</Box>
			</Box>

			{/** 알럿들 */}
			<SupportiAlertModal
				type="indicatorDelete"
				open={deleteAlertModal}
				handleClose={() => setDeleteAlertModal(false)}
				customHandleClose={() => {
					props.setLoading(true);

					memberId && deleteOkrDetail();
				}}
			/>
			<SupportiAlertModal
				type="indicatorModify"
				open={modifyAlertModal}
				handleClose={() => setModifyAlertModal(false)}
				customHandleClose={() => {
					props.setLoading(true);

					memberId && updateOkrDetail(okrDetailData);
				}}
			/>
			<SupportiAlertModal
				open={isAlertOpen}
				handleClose={() => {
					props.setLoading(false);
					setIsAlertOpen(false);
				}}
				type={alertType}
			/>
		</Box>
	);
};

export default UnderGoalCard;
