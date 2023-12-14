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
import calculateAchieveRate from '../../../../../../function/calculateAchieveRate';

interface IOkrModalDetailBoxProps {
	mode: string;
	data: any;
	index: number;
	okrDetailData: any;
	setOkrDetailData: any;
	deleteOkrDetail?: any;
}

const OkrModalDetailBox = (props: IOkrModalDetailBoxProps) => {
	//* Modules

	//* Constants

	//* States
	/**
' 더보기 여부
 */
	const [isMoreOpen, setIsMoreOpen] = React.useState(false);

	//* Functions

	return (
		<Box>
			{props.mode === 'detail' && (
				<Box>
					<Box display={'flex'} justifyContent={'space-between'}>
						<Box display={'flex'}>
							<Typography fontWeight={600}>하위목표</Typography>
							{/** 갯수 */}
							<Typography
								color="primary.main"
								ml={1}
								fontWeight={600}
							>
								{props.data.length}
							</Typography>
						</Box>

						{/** 하위 목표 추가 버튼 */}
						<SupportiButton
							contents={'하위 목표 추가 +'}
							onClick={() => {
								// setOkrDetailData([
								// 	...okrDetailData,
								// 	{
								// 		TITLE: '',
								// 		START_DATE: '',
								// 		END_DATE: '',
								// 		TARGET_AMOUNT: '',
								// 		TARGET_UNIT: '',
								// 		NOTE: '',
								// 		ACHIEVED_AMOUNT: 0,
								// 		APP_MEMBER_IDENTIFICATION_CODE: 1,
								// 	},
								// ]);
							}}
							style={{
								height: 5,
								color: 'black',
							}}
							color={'secondary'}
							variant="outlined"
						/>
					</Box>
				</Box>
			)}
			<Box
				p={3}
				bgcolor={'secondary.light'}
				borderRadius={2}
				display={'flex'}
				flexDirection={'column'}
				gap={1}
				mb={2}
			>
				<Box display={'flex'} flexDirection={'column'} gap={2}>
					<Box display={'flex'} justifyContent={'space-between'}>
						<Box display={'flex'}>
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

							{/** 하위 목표 타이틀 */}
							<SupportiInput
								type="input"
								multiline={true}
								value={props.okrDetailData[props.index].TITLE}
								setValue={(value: string) => {
									let temp: any = [...props.okrDetailData];
									temp[props.index].TITLE = value;

									props.setOkrDetailData(temp);
								}}
								width={'300px'}
								placeholder="하위 목표 타이틀을 입력해주세요."
							/>
						</Box>

						{/** x 아이콘 */}
						<CancelIcon
							color={'secondary'}
							sx={{
								cursor: 'pointer',
								marginTop: 'auto',
								marginBottom: 'auto',
							}}
							onClick={() => {
								props.deleteOkrDetail(props.index);
							}}
						/>
					</Box>
					{/** 날짜 선택 */}
					<Box display={'flex'}>
						<SupportiInput
							type="datepicker"
							value={props.okrDetailData[props.index].START_DATE}
							setValue={(value) => {
								let temp: any = [...props.okrDetailData];
								temp[props.index].START_DATE = value;

								props.setOkrDetailData(temp);
							}}
							width={'130px'}
							useIcon={false}
						/>
						<SupportiInput
							type="datepicker"
							value={props.okrDetailData[props.index].END_DATE}
							setValue={(value) => {
								let temp: any = [...props.okrDetailData];
								temp[props.index].END_DATE = value;

								props.setOkrDetailData(temp);
							}}
							width={'130px'}
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
								value={
									props.okrDetailData[props.index].TARGET_UNIT
								}
								setValue={(value) => {
									let temp: any = [...props.okrDetailData];
									temp[props.index].TARGET_UNIT = value;

									props.setOkrDetailData(temp);
								}}
								dataList={IndicatorUnit}
								width={'150px'}
							/>
						</Box>
						{/** 목표량 */}
						<Box>
							<Typography fontWeight={500} mb={1}>
								목표량
							</Typography>
							<Box display={'flex'}>
								<SupportiInput
									type="input"
									value={
										props.okrDetailData[props.index]
											.TARGET_AMOUNT
									}
									setValue={(value) => {
										let temp: any = [
											...props.okrDetailData,
										];
										temp[props.index].TARGET_AMOUNT = value;

										props.setOkrDetailData(temp);
									}}
									width={'150px'}
								/>
								<Box>
									<Typography></Typography>
								</Box>
							</Box>
						</Box>
						{props.mode === 'detail' && (
							<SupportiButton
								contents={'등록하기'}
								onClick={() => {
									//** 메모 등록 */
								}}
								style={{
									height: '20px',
									width: '100px',
								}}
								color={'primary'}
								variant="contained"
								isGradient={true}
							/>
						)}
					</Box>
				</Box>
			</Box>
			{props.mode === 'detail' && (
				<Box
					p={3}
					bgcolor={'secondary.light'}
					borderRadius={2}
					display={'flex'}
					flexDirection={'column'}
					gap={2}
					mb={2}
				>
					<Box display={'flex'} justifyContent={'space-between'}>
						<Box display={'flex'}>
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

							{/** 하위 목표 타이틀 */}
							<Typography fontWeight={'bold'} variant="h5" ml={1}>
								title
							</Typography>
						</Box>

						{/** 토글 arrow 아이콘 */}
						<CancelIcon
							color={'secondary'}
							sx={{
								cursor: 'pointer',
								marginTop: 'auto',
								marginBottom: 'auto',
							}}
							onClick={() => {
								setIsMoreOpen(true);
							}}
						/>
					</Box>

					<Box display={'flex'} flexDirection={'column'} gap={2}>
						{/** 날짜 */}
						<Box display={'flex'}>
							<SupportiInput
								type="datepicker"
								value={
									props.okrDetailData[props.index].START_DATE
								}
								setValue={(value) => {
									let temp: any = [...props.okrDetailData];
									temp[props.index].START_DATE = value;

									props.setOkrDetailData(temp);
								}}
								width={'130px'}
								useIcon={false}
							/>
							<SupportiInput
								type="datepicker"
								value={
									props.okrDetailData[props.index].END_DATE
								}
								setValue={(value) => {
									let temp: any = [...props.okrDetailData];
									temp[props.index].END_DATE = value;

									props.setOkrDetailData(temp);
								}}
								width={'130px'}
								useIcon={false}
							/>
						</Box>

						{/** 현재 달성률 */}
						<Box display="flex" gap={1}>
							<Typography>현재 달성률</Typography>
							<Typography ml={1} color={'primary.main'}>
								{calculateAchieveRate(props.okrDetailData)} %
							</Typography>
						</Box>
						{/** 프로그레스바 */}
						<SupportiProgressBar
							materialDataList={[
								{
									percentage: calculateAchieveRate(
										props.okrDetailData
									).toString(),
									color: randomColor[props.index],
								},
							]}
						/>

						{/** 달성량 추가 */}
						<Box>
							<Typography fontWeight={500} mb={1}>
								달성량 추가
							</Typography>
							<SupportiInput
								type="inputwithbtn"
								value={'dd'}
								setValue={(value) => {}}
								defaultValue=""
								placeholder="달성량 입력"
								width={'150px'}
								btnContent="달성량 추가"
								btnOnclick={() => {}}
							/>
						</Box>
						{/** 메모 입력 */}
						{/* <SupportiInput 
							type='inputwithbtn'
							value={okrMainData.NOTE}
							setValue={(value) => {
								setOkrMainData({
									...okrMainData,
									NOTE: value,
								});
							}}
							btnContent='등록하기'
							btnOnclick={() => {}}
							width={'100%'}
							/> */}
					</Box>
				</Box>
			)}
		</Box>
	);
};

export default OkrModalDetailBox;
