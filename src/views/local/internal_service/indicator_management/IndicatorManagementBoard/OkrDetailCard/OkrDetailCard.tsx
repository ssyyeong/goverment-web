import React from 'react';

import { Box, BoxProps, Rating, Typography } from '@mui/material';
import SupportiInput from '../../../../../global/SupportiInput';
import SupportiButton from '../../../../../global/SupportiButton';
import SupportiProgressBar from '../../../../../global/SupportiProgressBar';
import { IOkrDetail } from '../../../../../../@types/model';
import { randomColor } from '../../../../../../../configs/randomColorConfig';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import CancelIcon from '@mui/icons-material/Cancel';
import DefaultController from '@qillie-corp/ark-office-project/src/controller/default/DefaultController';
import { useAppMember } from '../../../../../../hooks/useAppMember';
import { IndicatorUnit } from '../../../../../../../configs/data/IndicatorUnitConfig';

interface IOkrDetailCardProps {
	data: IOkrDetail;
	index: number;
	mode?: string;
	children?: React.ReactNode;
	okrDetailData?: any;
	setOkrDetailData?: any;
	memberId?: number;
	updateDetailOkr?: any;
}

const OkrDetailCard = (props: IOkrDetailCardProps) => {
	//* Modules
	const okrDetailController = new DefaultController('OkrDetail');

	//* States
	const [isMoreOpen, setIsMoreOpen] = React.useState(false);

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
		TARGET_AMOUNT: props.data.TARGET_AMOUNT,
		TARGET_UNIT: props.data.TARGET_UNIT,
		NOTE: props.data.NOTE,
		ACHIEVED_AMOUNT: props.data.ACHIEVED_AMOUNT,
		APP_MEMBER_IDENTIFICATION_CODE: props.memberId,
	});

	//* Constants

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
				// OKR_MAIN_IDENTIFICATION_CODE:
			},
			(response: any) => {
				alert('삭제 성공');
			},
			(err: any) => {}
		);
	};

	const updateOkrDetail = (injectedObj) => {
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

				// props.setTriggerKey && props.setTriggerKey(uuidv4());
				setIsEditMode(false);
			},
			(err: any) => {}
		);
	};

	//* Hooks
	React.useEffect(() => {
		//* 수정모드가 아닐 경우 기존 데이터로 리셋
		if (!isEditMode) {
			setOkrDetailData({
				TITLE: props.data.TITLE,
				START_DATE: props.data.START_DATE,
				END_DATE: props.data.END_DATE,
				TARGET_AMOUNT: props.data.TARGET_AMOUNT,
				TARGET_UNIT: props.data.TARGET_UNIT,
				NOTE: props.data.NOTE,
				ACHIEVED_AMOUNT: props.data.ACHIEVED_AMOUNT,
				APP_MEMBER_IDENTIFICATION_CODE: props.memberId,
			});
		}

		// if (props.isEditMode) {
		// 	props.setOkrDetailData(
		// 		props.okrDetailData.map((item: IOkrDetail, index: number) => {
		// 			if (index === props.index) {
		// 				return okrDetailData;
		// 			} else {
		// 				return item;
		// 			}
		// 		})
		// 	);
		// }
	}, [isEditMode]);

	return (
		<Box
			borderRadius={2}
			bgcolor={'secondary.light'}
			p={2}
			display="flex"
			flexDirection={'column'}
			gap={1}
			width={props.mode === 'detail' ? '100%' : '380px'}
			minWidth={'380px'}
		>
			<Box width="100%">
				<Box display={'flex'} gap={1} mb={1}>
					{/** 컬러 칩 */}
					<Box
						sx={{
							borderRadius: '50%',
							bgcolor: randomColor[props.index],
							width: '10px',
							height: '10px',
						}}
						mt={'auto'}
						mb={'auto'}
					/>

					{/** 타이틀 */}
					{isEditMode ? (
						<Box>
							<SupportiInput
								type="input"
								value={okrDetailData.TITLE}
								setValue={(value: string) => {
									setOkrDetailData({
										...okrDetailData,
										TITLE: value,
									});
								}}
								width={'280px'}
								placeholder="하위 목표 타이틀을 입력해주세요."
								readOnly={okrDetailData.TITLE.length > 50}
							/>
							<Typography
								variant="h5"
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
							{props.mode === 'detail' && (
								<img
									src="/images/icons/ModifyIcon.svg"
									alt="arrow-icon"
									style={{
										cursor: 'pointer',
										width: '15px',
										height: '15px',
										marginTop: 'auto',
										marginBottom: 'auto',
									}}
									onClick={() => {
										setIsEditMode(!isEditMode);
										setIsMoreOpen(true);
									}}
								/>
							)}
						</Box>
					)}

					{/** 상세보기일때 화살표 아이콘 */}
					{props.mode === 'detail' && (
						<Box ml={'auto'} display={'flex'} gap={'5px'}>
							{isEditMode && isMoreOpen ? (
								<Box display={'flex'} gap={1}>
									{/** 수정 버튼 */}
									<SupportiButton
										contents={'취소'}
										onClick={() => {
											setIsEditMode(!isEditMode);
										}}
										style={{
											height: '20px',
											width: '60px',
										}}
										color={'primary'}
										variant="contained"
										isGradient={true}
									/>
								</Box>
							) : (
								<CancelIcon
									color={'secondary'}
									sx={{
										cursor: 'pointer',
										marginTop: 'auto',
										marginBottom: 'auto',
										visibility:
											props.okrDetailData.length === 1
												? 'hidden'
												: 'block',
									}}
									onClick={() => {
										memberId && deleteOkrDetail();
									}}
								/>
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
									onClick={() => setIsMoreOpen(!isMoreOpen)}
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
									onClick={() => setIsMoreOpen(!isMoreOpen)}
								/>
							)}
						</Box>
					)}
				</Box>
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
										(props.data?.END_DATE as string).split(
											'T'
										)[0]
									}
								</Typography>
							</Box>
						)}

						{!isEditMode && (
							<Box>
								{/** 달성률*/}
								<Box display="flex" mt={'20px'}>
									<Typography>현재 달성률</Typography>
									<Typography
										ml={1}
										color={'primary.main'}
										fontWeight={600}
									>
										{props.data.ACHIEVED_RATE}%
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
										{props.data?.ACHIEVED_RATE}
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

						{isEditMode ? (
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
												: props.okrDetailData[
														props.index
												  ].TARGET_UNIT
										}
										setValue={(value) => {
											if (value === '직접입력') {
												setIsUserMakeUnit(true);
												let temp: any = [
													...props.okrDetailData,
												];
												temp[props.index].TARGET_UNIT =
													'';

												props.setOkrDetailData(temp);
											} else {
												setIsUserMakeUnit(false);

												let temp: any = [
													...props.okrDetailData,
												];
												temp[props.index].TARGET_UNIT =
													value;

												props.setOkrDetailData(temp);
											}
										}}
										dataList={IndicatorUnit}
										width={'150px'}
									/>
									{isUserMakeUnit && (
										<SupportiInput
											type="input"
											value={
												props.okrDetailData[props.index]
													.TARGET_UNIT
											}
											setValue={(value) => {
												let temp: any = [
													...props.okrDetailData,
												];
												temp[props.index].TARGET_UNIT =
													value;

												props.setOkrDetailData(temp);
											}}
											width={'150px'}
											style={{
												bgcolor: 'white',
												marginTop: '5px',
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
												props.okrDetailData[props.index]
													.TARGET_UNIT != undefined
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
												props.okrDetailData[props.index]
													.TARGET_AMOUNT
											}
											setValue={(value: number) => {
												let temp: any = [
													...props.okrDetailData,
												];
												temp[
													props.index
												].TARGET_AMOUNT = value;

												props.setOkrDetailData(temp);
											}}
											width={'150px'}
											style={{
												bgcolor: 'white',
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
												props.okrDetailData[props.index]
													.TARGET_AMOUNT !== '' &&
												props.okrDetailData[props.index]
													.TARGET_AMOUNT !== 0
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
										memberId &&
											updateOkrDetail(okrDetailData);
									}}
									style={{
										height: '25px',
										width: '100px',
										marginTop: 'auto',
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
									(props.data?.START_DATE as string).split(
										'T'
									)[0]
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
								{(props.data?.END_DATE as string).split('T')[0]}
							</Typography>
						</Box>

						{/** 달성률*/}
						<Box display="flex" flexDirection="column" gap={1}>
							<Box display="flex" mt={'20px'}>
								<Typography>현재 달성률</Typography>
								<Typography
									ml={1}
									color={'primary.main'}
									fontWeight={600}
								>
									{props.data?.ACHIEVED_RATE}%
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
	);
};

export default OkrDetailCard;
