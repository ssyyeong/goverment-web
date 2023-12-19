import React from 'react';

import { Box, BoxProps, Typography } from '@mui/material';

interface IMobileTableRowProps {
	index: number;
	title: string;
	onClick?: () => void;
	colums: {
		label: string;
		value?: any;
		onCancel?: (id: number) => void;
	}[];
}

const MobileTableRow = (props: IMobileTableRowProps) => {
	return (
		<Box
			key={props.index}
			display={'flex'}
			flexDirection={'column'}
			p={2}
			bgcolor={'white'}
			borderRadius={1}
			gap={2}
			width={'100%'}
			mb={1}
			onClick={props.onClick}
		>
			<Typography variant="h5" fontWeight={'600'}>
				{props.title}
			</Typography>
			<Box
				pt={2}
				borderTop={'1px solid #E0E0E0'}
				width={'100&'}
				display={'flex'}
				flexDirection={'column'}
				gap={1}
			>
				{props.colums.map((column, id) => (
					<Box
						display={'flex'}
						flexDirection={'row'}
						justifyContent={'space-between'}
						alignItems={'center'}
					>
						<Typography variant="subtitle2">
							{column.label}
						</Typography>
						{typeof column.value == 'string' ? (
							<Typography variant="subtitle2" fontWeight={'bold'}>
								{column.value}
							</Typography>
						) : (
							column.value
						)}
						{column.onCancel && (
							<Box
								onClick={() => {
									column.onCancel &&
										column.onCancel(props.index);
								}}
								sx={{
									cursor: 'pointer',
									bgcolor: 'primary.light',
									color: 'white',
									borderRadius: 1,
									px: 2,
									py: 1,
								}}
							>
								취소
							</Box>
						)}
					</Box>
				))}
			</Box>
		</Box>
	);
};

export default MobileTableRow;
