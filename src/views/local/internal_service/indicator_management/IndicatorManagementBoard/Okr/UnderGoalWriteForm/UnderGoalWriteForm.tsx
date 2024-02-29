import React from 'react';

import { Box, BoxProps, Typography } from '@mui/material';
import SupportiInput from '../../../../../../global/SupportiInput';
import CancelIcon from '@mui/icons-material/Cancel';
import SupportiButton from '../../../../../../global/SupportiButton';
import { IndicatorUnit } from '../../../../../../../../configs/data/IndicatorUnitConfig';
import { IOkrDetail } from '../../../../../../../@types/model';
import { randomColor } from '../../../../../../../../configs/randomColorConfig';
import DefaultController from '@leanoncompany/supporti-ark-office-project/src/controller/default/DefaultController';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { useAppMember } from '../../../../../../../hooks/useAppMember';
import { SupportiAlertModal } from '../../../../../../global/SupportiAlertModal';

interface IUnderGoalWriteFormProps {
	mode: string;
	data: any;
	index: number;
	okrDetailData: any;
	setOkrDetailData: any;
	deleteOkrDetail?: any;
	updateOkr?: any;
	okrMainId?: number;
	isModalOpen: boolean;
	setIsModalOpen: any;
	setTriggerKey?: React.Dispatch<any>;
	getOkrMain?: any;
	maxDate?: any;
	okrDetails?: any;
	/**
	 * 로딩 상태
	 */
	loading?: boolean;
	setLoading?: React.Dispatch<React.SetStateAction<boolean>>;
}

const UnderGoalWriteForm = (props: IUnderGoalWriteFormProps) => {
	//* Controllers
	const okrController = new DefaultController('OkrDetail');

	//* Modules

	//* Constants
	/**
	 *
	 * 기본 데이터
	 */
	const defaultData = [...props.okrDetailData];

	//* States

	/**
	 * 직접 입력 여부
	 *  */
	const [isUserMakeUnit, setIsUserMakeUnit] = React.useState(false);

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
	 *
	 * 하위목표 등록한 인덱스
	 */
	const [index, setIndex] = React.useState(undefined);

	//* Hooks
	/**
	 * 유저 아이디 가져오는 훅
	 */
	const { memberId } = useAppMember();

	//* Functions
	/**
	 * 하위 목표 추가 등록
	 */
	const updateOkr = () => {
		if (
			props.data.TITLE === '' ||
			props.data.TARGET_UNIT == undefined ||
			props.data.TARGET_UNIT == '' ||
			props.data.TARGET_AMOUNT === 0 ||
			props.data.TARGET_AMOUNT === '0' ||
			props.data.TARGET_AMOUNT === undefined
		) {
			setAlertType('indicatorWarning');
			setIsAlertOpen(true);
			return;
		} else {
			if (props.data.TITLE.length > 20) {
				props.setLoading(false);

				alert('20자 이하로 입력해주세요.');
				return;
			} else {
				okrController
					.createItem({
						APP_MEMBER_IDENTIFICATION_CODE: memberId,
						OKR_MAIN_IDENTIFICATION_CODE: props.okrMainId,
						TITLE: props.data.TITLE,
						START_DATE: props.data.START_DATE,
						END_DATE: props.data.END_DATE,
						TARGET_UNIT: props.data.TARGET_UNIT,
						TARGET_AMOUNT: props.data.TARGET_AMOUNT,
						ACHIEVED_AMOUNT: 0,
					})
					.then((res) => {
						props.setLoading(false);

						setAlertType('successCreateAxios');
						setIsAlertOpen(true);

						props.getOkrMain();

						// 리셋
						props.setOkrDetailData([
							// ...defaultData.splice(index, 1),
							// {
							// 	APP_MEMBER_IDENTIFICATION_CODE: memberId,
							// 	OKR_MAIN_IDENTIFICATION_CODE: props.okrMainId,
							// 	TITLE: props.data.TITLE,
							// 	START_DATE: props.data.START_DATE,
							// 	END_DATE: props.data.END_DATE,
							// 	TARGET_UNIT: props.data.TARGET_UNIT,
							// 	TARGET_AMOUNT: props.data.TARGET_AMOUNT,
							// 	ACHIEVED_AMOUNT: 0,
							// },
						]);
					})
					.catch((err) => {
						props.setLoading(false);

						setAlertType('failAxios');
						setIsAlertOpen(true);
					});
			}
		}
	};

	//* Hooks

	return (
		<Box
			sx={{ px: { xs: 1.5, md: 3 }, py: 1.5 }}
			bgcolor={'#f8f8f8'}
			borderRadius={2}
			display={'flex'}
			flexDirection={'column'}
			gap={1}
			mb={2}
			pl={5}
			pt={3}
		>
			<Box display={'flex'} flexDirection={'column'} gap={2}>
				<Box display={'flex'} justifyContent={'space-between'}>
					<Box width={'100%'}>
						<Box display={'flex'} width={'100%'}>
							{/** 컬러 칩 */}
							<Box
								sx={{
									borderRadius: '50%',
									bgcolor:
										randomColor[
											props.mode === 'detail'
												? props.okrDetails.length +
												  props.index
												: props.index
										],
									width: '14px',
									height: '14px',
									mr: 1,
								}}
								mt={'auto'}
								mb={'auto'}
							/>

							{/** 하위 목표 타이틀 */}

							<SupportiInput
								type="input"
								additionalProps={{
									placeholder:
										'하위 목표 타이틀을 입력해주세요.',
								}}
								value={props.data.TITLE}
								setValue={(value: string) => {
									let temp: any = [...props.okrDetailData];
									temp[props.index].TITLE = value;

									props.setOkrDetailData(temp);
								}}
								style={{
									bgcolor: 'white',
								}}
								width={'100%'}
							/>
						</Box>

						{/* <Typography
							fontWeight={500}
							variant="body1"
							color="error.main"
							mt={'5px'}
							sx={{
								visibility:
									props.data.TITLE !== ''
										? 'hidden'
										: 'block',
							}}
						>
							필수 값 입니다.
						</Typography> */}
					</Box>
					{/** x 아이콘 */}
					<CancelIcon
						color={'secondary'}
						sx={{
							cursor: 'pointer',
							marginTop: 'auto',
							marginBottom: 'auto',
							display:
								props.okrDetailData.length === 1
									? 'none'
									: 'block',
						}}
						onClick={() => {
							props.deleteOkrDetail(props.index);
						}}
					/>
				</Box>

				{/** 목표분류 목표량 등록 */}
				<Box display={'flex'} gap={2}>
					{/** 목표분류 */}
					<Box>
						<Typography fontWeight={500} mb={1}>
							목표분류
						</Typography>
						<Box
							display={'flex'}
							gap={2}
							alignItems={'center'}
							flexDirection={{ md: 'row', xs: 'column' }}
						>
							<SupportiInput
								type="select"
								value={
									isUserMakeUnit
										? '직접입력'
										: props.data.TARGET_UNIT
								}
								setValue={(value) => {
									if (value === '직접입력') {
										setIsUserMakeUnit(true);
										let temp: any = [
											...props.okrDetailData,
										];
										temp[props.index].TARGET_UNIT = '';

										props.setOkrDetailData(temp);
									} else {
										setIsUserMakeUnit(false);

										let temp: any = [
											...props.okrDetailData,
										];
										temp[props.index].TARGET_UNIT = value;

										props.setOkrDetailData(temp);
									}
								}}
								dataList={IndicatorUnit}
								style={{
									width: { xs: '100px', md: '150px' },
								}}
							/>
							{/** 목표분류 유저 직접 입력 선택 시  */}
							{isUserMakeUnit && (
								<SupportiInput
									type="input"
									value={
										props.okrDetailData[props.index]
											.TARGET_UNIT
									}
									additionalProps={{
										placeholder: '목표 분류값',
									}}
									setValue={(value) => {
										let temp: any = [
											...props.okrDetailData,
										];
										temp[props.index].TARGET_UNIT = value;

										props.setOkrDetailData(temp);
									}}
									style={{
										bgcolor: 'white',
										width: {
											xs: '100px',
											md: '150px',
										},
									}}
								/>
							)}
						</Box>
						{/* <Typography
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
						</Typography> */}
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
									props.okrDetailData[props.index]
										.TARGET_AMOUNT
								}
								setValue={(value: number) => {
									let temp: any = [...props.okrDetailData];
									temp[props.index].TARGET_AMOUNT = value;

									props.setOkrDetailData(temp);
								}}
								style={{
									bgcolor: 'white',
									width: { xs: '100px', md: '150px' },
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
						{/* <Typography
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
						</Typography> */}
					</Box>

					{/** 상세보기 모달에서 등록하기 버튼 */}
					{props.mode === 'detail' && (
						<SupportiButton
							contents={'등록하기'}
							onClick={() => {
								setIndex(props.index);
								props.setLoading(true);

								memberId && updateOkr();
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
					)}
				</Box>
			</Box>
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

export default UnderGoalWriteForm;
