import React from 'react';

import { Box, BoxProps, Button, Typography } from '@mui/material';

interface ISupportiButtonProps {
	contents: string;
	onClick: (config?: any) => void;
	fullWidth?: boolean;
	variant?: 'text' | 'outlined' | 'contained' | undefined;
}

const SupportiButton = (props: ISupportiButtonProps) => {
	return (
		<Button
			fullWidth={props.fullWidth}
			variant={props.variant}
			onClick={props.onClick}
			sx={{
				borderRadius: '5px',
			}}
		>
			{props.contents}
		</Button>
	);
};

export default SupportiButton;
