import React from 'react';

import { Box, BoxProps, Typography } from '@mui/material';
import SupportiInput from '../../../../../global/SupportiInput';
import CancelIcon from '@mui/icons-material/Cancel';
import SupportiButton from '../../../../../global/SupportiButton';
import { IndicatorUnit } from '../../../../../../../configs/data/IndicatorUnitConfig';
import { IOkrDetail } from '../../../../../../@types/model';
import { randomColor } from '../../../../../../../configs/randomColorConfig';
import { previewData } from 'next/dist/client/components/headers';
import SupportiProgressBar from '../../../../../global/SupportiProgressBar';
import DefaultController from '@qillie-corp/ark-office-project/src/controller/default/DefaultController';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { useAppMember } from '../../../../../../hooks/useAppMember';

interface IOkrModalDetailBoxProps {
	mode: string;
	data: any;
	index: number;
	okrDetailData: any;
	setOkrDetailData: any;
	deleteOkrDetail?: any;
	updateOkr?: any;
	okrMainId?: number;
}

const OkrModalDetailBox = (props: IOkrModalDetailBoxProps) => {
	//* Controllers
	const okrController = new DefaultController('OkrDetail');

	//* Modules

	//* Constants

	//* States
	//* Hooks
	/**
	 * 유저 아이디 가져오는 훅
	 */
	const { memberId } = useAppMember();
	//* Functions
	const updateOkr = () => {
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
				alert('생성');
				props.setOkrDetailData([
					...props.okrDetailData,
					{
						APP_MEMBER_IDENTIFICATION_CODE: memberId,
						OKR_MAIN_IDENTIFICATION_CODE: props.okrMainId,
						TITLE: props.data.TITLE,
						START_DATE: props.data.START_DATE,
						END_DATE: props.data.END_DATE,
						TARGET_UNIT: props.data.TARGET_UNIT,
						TARGET_AMOUNT: props.data.TARGET_AMOUNT,
						ACHIEVED_AMOUNT: 0,
					},
				]);
				// 리셋
				console.log(res);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	return (
		<Box
			p={3}
			bgcolor={'secondary.light'}
			borderRadius={2}
			display={'flex'}
			flexDirection={'column'}
			gap={1}
			mb={2}
			pl={5}
		>
			<Box display={'flex'} flexDirection={'column'} gap={2}>
				<Box display={'flex'} justifyContent={'space-between'}>
					<Box>
						<Box display={'flex'}>
							{/** 컬러 칩 */}
							<Box
								sx={{
									borderRadius: '50%',
									bgcolor:
										randomColor[
											props.mode === 'detail'
												? props.okrDetailData.length +
												  props.index
												: props.index
										],
									width: '10px',
									height: '10px',
								}}
								mt={'auto'}
								mb={'auto'}
							/>

							{/** 하위 목표 타이틀 */}

							<SupportiInput
								type="input"
								multiline={true}
								value={props.data.TITLE}
								setValue={(value: string) => {
									let temp: any = [...props.okrDetailData];
									temp[props.index].TITLE = value;

									props.setOkrDetailData(temp);
								}}
								width={'300px'}
								placeholder="하위 목표 타이틀을 입력해주세요."
								readOnly={
									props.okrDetailData[props.index].TITLE
										.length > 50
								}
							/>
						</Box>

						<Typography
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
						</Typography>
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
				{/** 날짜 선택 */}
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
						value={props.okrDetailData[props.index].START_DATE}
						setValue={(value) => {
							let temp: any = [...props.okrDetailData];
							temp[props.index].START_DATE = value
								.toDate()
								.toISOString();

							props.setOkrDetailData(temp);
						}}
						width={'110px'}
						useIcon={false}
					/>
					<SupportiInput
						type="datepicker"
						value={props.okrDetailData[props.index].END_DATE}
						setValue={(value) => {
							let temp: any = [...props.okrDetailData];
							temp[props.index].END_DATE = value
								.toDate()
								.toISOString();

							props.setOkrDetailData(temp);
						}}
						minDate={props.okrDetailData[props.index].START_DATE}
						width={'110px'}
						useIcon={false}
					/>
				</Box>

				{/** 목표분류 목표량 등록 */}
				<Box display={'flex'} gap={2}>
					{/** 목표분류 */}
					<Box>
						<Typography fontWeight={500} mb={1}>
							목표분류
						</Typography>
						<SupportiInput
							type="select"
							value={props.okrDetailData[props.index].TARGET_UNIT}
							setValue={(value) => {
								let temp: any = [...props.okrDetailData];
								temp[props.index].TARGET_UNIT = value;

								props.setOkrDetailData(temp);
							}}
							dataList={IndicatorUnit}
							width={'150px'}
						/>

						<Typography
							fontWeight={500}
							variant="body1"
							color="error.main"
							mt={'5px'}
							sx={{
								visibility:
									props.okrDetailData[props.index]
										.TARGET_UNIT !== ''
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
									let temp: any = [...props.okrDetailData];
									temp[props.index].TARGET_AMOUNT = value;

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
					{props.mode === 'detail' && (
						<SupportiButton
							contents={'등록하기'}
							onClick={() => {
								updateOkr();
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
		</Box>
	);
};

export default OkrModalDetailBox;
