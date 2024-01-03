import React from 'react';

import { Box, BoxProps, Rating, Typography } from '@mui/material';
import SupportiInput from '../../../../../global/SupportiInput';
import SupportiButton from '../../../../../global/SupportiButton';
import SupportiProgressBar from '../../../../../global/SupportiProgressBar';
import { IOkrDetail } from '../../../../../../@types/model';
import { randomColor } from '../../../../../../../configs/randomColorConfig';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import CancelIcon from '@mui/icons-material/Cancel';
import DefaultController from '@leanoncompany/supporti-ark-office-project/src/controller/default/DefaultController';
import { useAppMember } from '../../../../../../hooks/useAppMember';
import { IndicatorUnit } from '../../../../../../../configs/data/IndicatorUnitConfig';
import { SupportiAlertModal } from '../../../../../global/SupportiAlertModal';
import { v4 as uuidv4 } from 'uuid';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import DeleteIcon from '@mui/icons-material/Delete';

interface IOkrDetailCardProps {
	data: IOkrDetail;
	index: number;
	mode?: string;
	children?: React.ReactNode;
	okrDetailData?: any;
	setOkrDetailData?: any;
	memberId?: number;
	updateDetailOkr?: any;
	modalOpen?: boolean;
	setModalOpen?: any;
	setTriggerKey?: any;
}

const OkrDetailCard = (props: IOkrDetailCardProps) => {
	//* Modules
	const okrDetailController = new DefaultController('OkrDetail');

	//* States
	const [isMoreOpen, setIsMoreOpen] = React.useState(false);

	/**
	 *
	 * 삭제 시 알럿 모달
	 */
	const [alertModalOpen, setAlertModalOpen] = React.useState(false);

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

	//* Constants
	const defaultTargetUnit = props.data.TARGET_UNIT;

	/**
	 * 유저 아이디 가져오는 훅
	 */
	const { memberId } = useAppMember();

	//* Functions
	const deleteOkrDetail = () => {
		okrDetailController.deleteItem(
			{
				APP_MEMBER_IDENTIFICATION_CODE: memberId,
				OKR_DETAIL_IDENTIFICATION_CODE:
					props.data['OKR_DETAIL_IDENTIFICATION_CODE'],
			},
			(response: any) => {
				alert('삭제 성공');
				props.setTriggerKey && props.setTriggerKey(uuidv4());
			},
			(err: any) => {}
		);
	};

	const updateOkrDetail = (injectedObj) => {
		if (
			okrDetailData.TITLE === '' ||
			okrDetailData.TARGET_UNIT == undefined ||
			okrDetailData.TARGET_UNIT == '' ||
			okrDetailData.TARGET_AMOUNT === 0 ||
			okrDetailData.TARGET_AMOUNT === undefined
		) {
			alert('필수값을 입력해주세요.');
		} else {
			if (okrDetailData.TITLE.length >= 20) {
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
						alert('하위 업데이트 성공');

						props.setTriggerKey && props.setTriggerKey(uuidv4());
						setIsEditMode(false);
					},
					(err: any) => {}
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

	return (
		<Box
			borderRadius={2}
			bgcolor={'secondary.light'}
			p={2}
			display="flex"
			flexDirection={'column'}
			gap={1}
			pb={isMoreOpen && 0}
			width={props.mode === 'detail' ? '100%' : '380px'}
			sx={{
				minWidth: { xs: '300px', md: '380px' },
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
						mt: '2px',
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
									placeholder="하위 목표 타이틀을 입력해주세요."
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
								<Typography
									fontWeight={500}
									mt={'auto'}
									mb={'auto'}
								>
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
									>
										{/** 삭제 버튼 */}
										<DeleteIcon
											onClick={() => {
												setAlertModalOpen(true);
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
									<img
										src="/images/icons/TopArrow.svg"
										alt="arrow-icon"
										style={{
											cursor: 'pointer',
											width: '20px',
											height: '20px',
											marginTop: 'auto',
											marginBottom: 'auto',
										}}
										onClick={() =>
											setIsMoreOpen(!isMoreOpen)
										}
									/>
								) : (
									<img
										src="/images/icons/MoreArrow.svg"
										alt="arrow-icon"
										style={{
											cursor: 'pointer',
											width: '20px',
											height: '20px',
											marginTop: 'auto',
											marginBottom: 'auto',
										}}
										onClick={() =>
											setIsMoreOpen(!isMoreOpen)
										}
									/>
								)}
							</Box>
						)}
					</Box>
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
					{props.mode === 'detail' && isMoreOpen ? (
						<Box display="flex" flexDirection="column" gap={1}>
							{/**기간 */}
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
										defaultValue={okrDetailData.START_DATE}
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
									<SupportiInput
										type="datepicker"
										defaultValue={okrDetailData?.END_DATE}
										value={okrDetailData?.END_DATE}
										minDate={
											okrDetailData?.START_DATE as string
										}
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
								<Box display={'flex'} gap={2}>
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
													0
														? 'hidden'
														: 'block',
											}}
										>
											필수 값 입니다.
										</Typography>
									</Box>
									<SupportiButton
										contents={'등록하기'}
										onClick={() => {
											if (
												defaultTargetUnit !==
												okrDetailData.TARGET_UNIT
											)
												setModifyAlertModal(true);
											else {
												memberId &&
													updateOkrDetail(
														okrDetailData
													);
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
			<SupportiAlertModal
				type="indicatorDelete"
				open={alertModalOpen}
				handleClose={() => setAlertModalOpen(false)}
				customHandleClose={() => memberId && deleteOkrDetail()}
			/>
			<SupportiAlertModal
				type="indicatorModify"
				open={modifyAlertModal}
				handleClose={() => setModifyAlertModal(false)}
				customHandleClose={() =>
					memberId && updateOkrDetail(okrDetailData)
				}
			/>
		</Box>
	);
};

export default OkrDetailCard;
