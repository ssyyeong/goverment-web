import React from 'react';

import { Button, SxProps } from '@mui/material';

interface ISupportiButtonProps {
	contents: string;
	onClick: (config?: any) => void;
	disabled?: boolean;
	color?:
		| 'inherit'
		| 'primary'
		| 'secondary'
		| 'success'
		| 'error'
		| 'info'
		| 'warning'
		| undefined;
	fullWidth?: boolean;
	variant?: 'text' | 'outlined' | 'contained' | undefined;
	disabledGutters?: boolean;
	isGradient?: boolean;
	style?: SxProps;
}

const SupportiButton = (props: ISupportiButtonProps) => {
	return (
		<Button
			fullWidth={props.fullWidth}
			variant={props.variant}
			onClick={props.onClick}
			color={props.color}
			sx={{
				borderRadius: '5px',
				padding: props.disabledGutters ? '0px' : '17px 16px',
				backgroundImage: props.isGradient
					? 'linear-gradient(99deg, #5583e4 9%, #4955e3 89%)'
					: undefined,
				...props.style,
			}}
			disabled={props.disabled}
		>
			{props.contents}
		</Button>
	);
};

export default SupportiButton;
