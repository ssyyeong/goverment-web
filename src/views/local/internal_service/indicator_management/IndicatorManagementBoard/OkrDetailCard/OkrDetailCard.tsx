import React from 'react';

import { Box, BoxProps, Rating, Typography } from '@mui/material';
import SuppportiModal from '../../../../../global/SuppportiModal';
import SupportiInput from '../../../../../global/SupportiInput';
import SupportiButton from '../../../../../global/SupportiButton';
import SupportiProgressBar from '../../../../../global/SupportiProgressBar';
import { IOkrDetail } from '../../../../../../@types/model';
import { randomColor } from '../../../../../../../configs/randomColorConfig';
import calculateAchieveRate from '../../../../../../function/calculateAchieveRate';

interface IOkrDetailCardProps {
	data: IOkrDetail;
	index: number;
}

const OkrDetailCard = (props: IOkrDetailCardProps) => {
	//* Modules

	//* Constants

	//* Functions

	console.log(props.data);

	return (
		<Box
			borderRadius={2}
			bgcolor={'secondary.light'}
			p={2}
			display="flex"
			flexDirection={'column'}
			gap={1}
			width="400px"
			mt={1}
			mb={2}
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
				<Typography fontWeight={500}>{props.data.TITLE}</Typography>
			</Box>
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
			<Box display="flex">
				<Typography>현재 달성률</Typography>
				<Typography ml={1} color={'primary.main'}>
					{calculateAchieveRate([props.data])} %
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
	);
};

export default OkrDetailCard;
