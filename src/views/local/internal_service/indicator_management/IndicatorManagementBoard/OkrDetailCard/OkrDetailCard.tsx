import React from 'react';

import { Box, BoxProps, Rating, Typography } from '@mui/material';
import SuppportiModal from '../../../../../global/SuppportiModal';
import SupportiInput from '../../../../../global/SupportiInput';
import SupportiButton from '../../../../../global/SupportiButton';
import { IndicatorUnitConfig } from '../../../../../../../configs/data/IndicatorUnitConfig';
import { IndicatorCategoryConfig } from '../../../../../../../configs/data/IndicatorCategoryConfig';
import SupportiProgressBar from '../../../../../global/SupportiProgressBar';

interface IOkrDetailCardProps {}

const OkrDetailCard = (props: IOkrDetailCardProps) => {
	//* Modules

	//* Constants

	//* States
	const data = {
		TITLE: '',
		START_DATE: '',
		END_DATE: '',
		TARGET_AMOUNT: '',
		TARGET_UNIT: '',
		NOTE: '',
		CATEGORY: '',
		ASSIGNEE: '',
		RATE: 5,
		STATUS: 'PROCEEDING',
	};

	//* Functions

	return (
		<Box borderRadius={2} bgcolor={'white'} p={2}>
			<Box display={'flex'}>
				<Typography>{data.TITLE}</Typography>
				{/** 상세보기 */}
			</Box>
			{/** 기간 */}
			<Box display={'flex'}>
				<Typography>{data.START_DATE}</Typography>
				<Typography>{data.END_DATE}</Typography>

			</Box>

				{/** 달성률*/}
				<Typography></Typography>
			{/** 프로그레스 바 */}
			<SupportiProgressBar
				materialDataList={[
					{
						percentage: '50',
						color: 'primary.main',
					},
				]}
			/>
		</Box>
	);
};

export default OkrDetailCard;
