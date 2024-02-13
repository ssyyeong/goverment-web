import React from 'react';
import { Box, LinearProgress, Typography } from '@mui/material';

interface IMaterialProps {
	percentage: string;
	color: string;
}
interface ISupportiProgressBarProps {
	materialDataList: IMaterialProps[];
	totalPercentage?: number;
}

const SupportiProgressBar = (props: ISupportiProgressBarProps) => {
	// const translatePercentage = (percentage: string) => {
	// 	return Math.floor(Number(percentage) / props.materialDataList.length);
	// };

	return (
		<Box
			sx={{
				display: 'flex',
				alignItems: 'center',
				width: '100%',
				height: 10,
				bgcolor: 'common.white',
				borderRadius: '5px',
			}}
		>
			{/* 스택 프로그래스바 */}
			{props.materialDataList
				.filter((item) => item.percentage != '0')
				.map((item, idx) => {
					return (
						<Box
							key={idx}
							sx={{
								// width: `${translatePercentage(item.percentage)}%`,
								width: `${item.percentage}%`,
								height: '100%',
								bgcolor: item.color,

								':nth-child(1)': {
									borderTopLeftRadius:
										item.percentage !== '0' ? '5px' : 0,
									borderBottomLeftRadius:
										item.percentage !== '0' ? '5px' : 0,
								},
								':last-child': {
									borderTopRightRadius: '5px',
									borderBottomRightRadius: '5px',
								},
							}}
						/>
					);
				})}

			{props.totalPercentage != undefined &&
				props.totalPercentage !== 0 &&
				props.totalPercentage < 100 && (
					<Box
						sx={{
							width: `${100 - props.totalPercentage}%`,
							height: '100%',
							bgcolor: '#f1f2f5',
							borderTopRightRadius: '5px',
							borderBottomRightRadius: '5px',
						}}
					/>
				)}
		</Box>
	);
};

export default SupportiProgressBar;
