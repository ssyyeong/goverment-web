import React from 'react';

import { Box, BoxProps, Rating, Typography } from '@mui/material';
import SupportiInput from '../../../../../global/SupportiInput';
import SupportiButton from '../../../../../global/SupportiButton';
import SupportiProgressBar from '../../../../../global/SupportiProgressBar';
import { IOkrDetail } from '../../../../../../@types/model';
import { randomColor } from '../../../../../../../configs/randomColorConfig';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
interface IOkrDetailCardProps {
	data: IOkrDetail;
	index: number;
	mode?: string;
	isEditMode?: boolean;
	children?: React.ReactNode;
	okrDetailData?: any;
	setOkrDetailData?: any;
	memberId?: number;
	isSend?: boolean;
}

const OkrDetailCard = (props: IOkrDetailCardProps) => {
	//* Modules

	//* States
	const [isMoreOpen, setIsMoreOpen] = React.useState(false);

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

	//* Functions

	//* Hooks
	React.useEffect(() => {
		//* 수정모드가 아닐 경우 기존 데이터로 리셋
		if (!props.isEditMode) {
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

		if (props.isEditMode && props.isSend) {
			props.setOkrDetailData(
				props.okrDetailData.map((item: IOkrDetail, index: number) => {
					if (index === props.index) {
						return okrDetailData;
					} else {
						return item;
					}
				})
			);
		}
	}, [props.isEditMode, props.isSend]);

	return (
		<Box
			borderRadius={2}
			bgcolor={'secondary.light'}
			p={2}
			display="flex"
			flexDirection={'column'}
			gap={1}
			width={props.mode === 'detail' ? '100%' : '400px'}
		>
			<Box display={'flex'} gap={1}>
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
				{props.isEditMode ? (
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
							width={'400px'}
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
					<Typography fontWeight={500} mt={'auto'} mb={'auto'}>
						{props.data.TITLE}
					</Typography>
				)}

				{/** 상세보기일때 화살표 아이콘 */}
				{props.mode === 'detail' && (
					<Box ml={'auto'}>
						{isMoreOpen ? (
							<ExpandLessIcon
								onClick={() => setIsMoreOpen(!isMoreOpen)}
							/>
						) : (
							<ExpandMoreIcon
								onClick={() => setIsMoreOpen(!isMoreOpen)}
							/>
						)}
					</Box>
				)}
			</Box>
			{props.mode === 'detail' && isMoreOpen ? (
				<Box display="flex" flexDirection="column" gap={1}>
					{/**기간 */}
					{props.isEditMode ? (
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
								minDate={okrDetailData?.START_DATE as string}
								setValue={(value) => {
									setOkrDetailData({
										...okrDetailData,
										END_DATE: value.toDate().toISOString(),
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
					)}

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
									props.data?.ACHIEVED_RATE.toString(),
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
						<Typography fontWeight={500} color={'secondary.main'}>
							{(props.data?.TARGET_AMOUNT as string) +
								' ' +
								(props.data?.TARGET_UNIT as string)}
						</Typography>
					</Box>
					{props.children}
				</Box>
			) : props.mode === 'detail' && !isMoreOpen ? null : (
				<Box>
					{/** 기간 */}
					<Box display={'flex'}>
						<Typography fontWeight={500} color={'secondary.main'}>
							{(props.data?.START_DATE as string).split('T')[0]}
						</Typography>
						<Typography
							ml={0.5}
							mr={0.5}
							fontWeight={500}
							color={'secondary.main'}
						>
							~
						</Typography>
						<Typography fontWeight={500} color={'secondary.main'}>
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
										props.data?.ACHIEVED_RATE.toString(),
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
						<Typography fontWeight={500} color={'secondary.main'}>
							{(props.data?.TARGET_AMOUNT as string) +
								' ' +
								(props.data?.TARGET_UNIT as string)}
						</Typography>
					</Box>
				</Box>
			)}
		</Box>
	);
};

export default OkrDetailCard;
