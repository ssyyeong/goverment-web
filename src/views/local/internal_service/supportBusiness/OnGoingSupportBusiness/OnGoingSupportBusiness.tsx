import React from 'react';

import { Box, BoxProps, Typography } from '@mui/material';
import moment from 'moment';
import { useRouter } from 'next/router';

interface IOnGoingSupportBusinessProps {
	title: string;
	mid_deadline: string;
	deadline: string;
	type: string;
	id: string;
}

const OnGoingSupportBusiness = (props: IOnGoingSupportBusinessProps) => {
	const router = useRouter();
	return (
		<Box
			display={'flex'}
			alignItems={'center'}
			borderBottom={'0.5px solid #cccc'}
			gap={1.5}
			py={2}
			onClick={() => {
				router.push(
					`/internal_service/government/management/${props.id}`
				);
			}}
			sx={{
				cursor: 'pointer',
			}}
		>
			<Typography
				color={
					props.type === 'MID_DEAD_LINE_DATE' ? 'blue' : 'error.main'
				}
				fontWeight={'700'}
			>
				{props.type === 'MID_DEAD_LINE_DATE' ? '[중간]' : '[최종]'}
			</Typography>
			<Typography
				color={
					props.type === 'MID_DEAD_LINE_DATE' ? 'blue' : 'error.main'
				}
				fontWeight={'700'}
				variant="caption"
				fontSize={'11px !important'}
				lineHeight={1}
				sx={{
					px: 1,
					py: 0.5,
					borderRadius: 3,
					borderColor:
						props.type === 'MID_DEAD_LINE_DATE'
							? 'blue'
							: 'error.main',
					borderWidth: 1,
					borderStyle: 'solid',
				}}
			>
				D-
				{moment(
					props.type === 'MID_DEAD_LINE_DATE'
						? props.mid_deadline
						: props.deadline
				)
					.startOf('days')
					.diff(moment(), 'days') + 1}
				일
			</Typography>
			<Typography fontWeight={'500'}>{props.title}</Typography>
		</Box>
	);
};

export default OnGoingSupportBusiness;
