import React from 'react';

import { Box, BoxProps, Rating, Typography } from '@mui/material';
import SupportiInput from '../../../../../global/SupportiInput';
import SupportiButton from '../../../../../global/SupportiButton';
import SupportiProgressBar from '../../../../../global/SupportiProgressBar';
import { IOkrDetail } from '../../../../../../@types/model';
import { randomColor } from '../../../../../../../configs/randomColorConfig';
import calculateAchieveRate from '../../../../../../function/calculateAchieveRate';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
interface IOkrDetailCardProps {
	data: IOkrDetail;
	index: number;
	mode?: string;
	isEditMode?: boolean;
	children?: React.ReactNode;
	okrDetailData: any;
	setOkrDetailData: any;
}

const OkrDetailCard = (props: IOkrDetailCardProps) => {
	//* Modules

	//* States
	const [isMoreOpen, setIsMoreOpen] = React.useState(false);

	//* Constants

	//* Functions

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
					<SupportiInput
						type="input"
						value={props.data.TITLE}
						setValue={(value: string) => {
							props.setOkrDetailData(
								props.okrDetailData.map(
									(item: IOkrDetail, index: number) => {
										if (index === props.index) {
											return {
												...item,
												TITLE: value,
											};
										} else {
											return item;
										}
									}
								)
							);
						}}
						width={'400px'}
						placeholder="하위 목표 타이틀을 입력해주세요."
						readOnly={props.okrDetailData[props.index].TITLE.length > 50}
					/>
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
								defaultValue={props.data?.START_DATE}
								value={props.data?.START_DATE}
								setValue={(value) => {
									props.setOkrDetailData(
										props.okrDetailData.map(
											(
												item: IOkrDetail,
												index: number
											) => {
												if (index === props.index) {
													return {
														...item,
														START_DATE: value
															.toDate()
															.toISOString(),
													};
												} else {
													return item;
												}
											}
										)
									);
								}}
								width={'110px'}
								useIcon={false}
								style={{ height: '20px' }}
							/>
							<SupportiInput
								type="datepicker"
								defaultValue={props.data?.END_DATE}
								value={props.data?.END_DATE}
								setValue={(value) => {
									props.setOkrDetailData(
										props.okrDetailData.map(
											(
												item: IOkrDetail,
												index: number
											) => {
												if (index === props.index) {
													return {
														...item,
														END_DATE: value
															.toDate()
															.toISOString(),
													};
												} else {
													return item;
												}
											}
										)
									);
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
							{calculateAchieveRate([props.data])}%
						</Typography>
					</Box>
					{/** 프로그레스 바 */}
					<SupportiProgressBar
						materialDataList={[
							{
								percentage: calculateAchieveRate([
									props.data,
								]).toString(),
								color: randomColor[props.index],
							},
						]}
					/>
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
								{calculateAchieveRate([props.data])}%
							</Typography>
						</Box>

						{/** 프로그레스 바 */}
						<SupportiProgressBar
							materialDataList={[
								{
									percentage: calculateAchieveRate([
										props.data,
									]).toString(),
									color: randomColor[props.index],
								},
							]}
						/>
					</Box>
				</Box>
			)}
		</Box>
	);
};

export default OkrDetailCard;
