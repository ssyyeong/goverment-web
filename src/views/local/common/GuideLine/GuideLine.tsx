import React from 'react';

import { Box, BoxProps, Typography } from '@mui/material';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
interface IGuideLineProps {
	link: string;
}

const GuideLine = (props: IGuideLineProps) => {
	return (
		<Box
			display="flex"
			alignItems={'center'}
			gap={0.5}
			onClick={() => {
				window.open(props.link, '_blank');
			}}
			sx={{
				cursor: 'pointer',
			}}
		>
			<Typography fontWeight={500}>가이드라인</Typography>
			<HelpOutlineIcon
				sx={{
					color: 'secondary.dark',
					width: '20px',
					height: '20px',
				}}
			/>
		</Box>
	);
};

export default GuideLine;
