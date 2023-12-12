import React from 'react';

import { Box, BoxProps, Rating, Typography } from '@mui/material';
import SuppportiModal from '../../../../../global/SuppportiModal';
import SupportiInput from '../../../../../global/SupportiInput';
import SupportiButton from '../../../../../global/SupportiButton';
import { IndicatorUnitConfig } from '../../../../../../../configs/data/IndicatorUnitConfig';
import { IndicatorCategoryConfig } from '../../../../../../../configs/data/IndicatorCategoryConfig';
import SupportiProgressBar from '../../../../../global/SupportiProgressBar';

interface IOkrCardProps {}

const OkrCard = (props: IOkrCardProps) => {
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

				{/** 마감 상태 (마감일 임박, 마감일 지남, 마감일) */}
				<Typography></Typography>
			</Box>

			{/** 프로그레스 바 */}
			<SupportiProgressBar
				materialDataList={[
					{
						percentage: '50',
						color: 'primary.main',
					},
				]}
			/>

			{/** 하위 목표리스트 */}

			<Box>
				<Box display={'flex'}>
					<Typography>하위목표</Typography>
					{/** 갯수 */}
					<Typography></Typography>
				</Box>

				{/** 하위 리스트들 카드로 출력 */}
			</Box>
		</Box>
	);
};

export default OkrCard;
