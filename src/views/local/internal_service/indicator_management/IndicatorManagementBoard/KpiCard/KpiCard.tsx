import React from 'react';

import { Box, BoxProps, Rating, Typography } from '@mui/material';
import SuppportiModal from '../../../../../global/SuppportiModal';
import SupportiInput from '../../../../../global/SupportiInput';
import SupportiButton from '../../../../../global/SupportiButton';
import { IndicatorUnitConfig } from '../../../../../../../configs/data/IndicatorUnitConfig';
import { IndicatorCategoryConfig } from '../../../../../../../configs/data/IndicatorCategoryConfig';
import SupportiProgressBar from '../../../../../global/SupportiProgressBar';
import { RatingConfig } from '../../../../../../../configs/data/RatingConfig';

interface IKpiCardCardProps {}

const KpiCardCard = (props: IKpiCardCardProps) => {
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
			<Box>
				<Box display={'flex'}>
					<Typography>{data.TITLE}</Typography>
					{/** 기간 */}
					<Box display={'flex'}>
						<Typography>{data.START_DATE}</Typography>
						<Typography>{data.END_DATE}</Typography>
					</Box>
				</Box>

				{/** 목표양 */}
				<Box display={'flex'}>
					<Typography>{data.TARGET_AMOUNT}</Typography>
					<Typography>{data.TARGET_UNIT}</Typography>
				</Box>

				{/** 중요도 */}
				<Box display="flex">
					<Rating
						name="simple-controlled"
						value={data.RATE}
						size="large"
						readOnly
					/>
					<Typography>{RatingConfig[data.RATE]}</Typography>
				</Box>
			</Box>

			<Box display="flex">
				{/** 담당자 */}
				<Typography>담당자</Typography>
				<Typography>{data.ASSIGNEE}</Typography>

				{/** 버튼들 */}

				{/** 아이콘, 누르면 메모 나옴 */}
			</Box>
		</Box>
	);
};

export default KpiCardCard;
