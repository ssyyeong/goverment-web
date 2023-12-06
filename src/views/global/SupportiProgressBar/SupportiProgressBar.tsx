import React from 'react';
import { Box, LinearProgress, Typography } from '@mui/material';

interface IProgressBarMaterialProps {
	percentage: string;
	color: string;
}
interface ISupportiProgressBarProps {
	materialDataList: IProgressBarMaterialProps[];
}

const SupportiProgressBar = (props: ISupportiProgressBarProps) => {
	return (
		<Box
			sx={{
				display: 'flex',
				alignItems: 'center',
				width: '100%',
				height: 10,
				bgcolor: '#f1f2f5',
				borderRadius: '5px',
			}}
		>
			{/* 스택 프로그래스바 만들기 */}
			{props.materialDataList?.map((item, idx) => {
				return (
					<Box
						key={idx}
						sx={{
							width: `${item.percentage}%`,
							height: '100%',
							bgcolor: item.color,
							':nth-child(1)': {
								borderTopLeftRadius: '5px',
								borderBottomLeftRadius: '5px',
							},
							':last-child': {
								borderTopRightRadius: '5px',
								borderBottomRightRadius: '5px',
							},
						}}
					/>
				);
			})}
		</Box>
	);
};

export default SupportiProgressBar;
