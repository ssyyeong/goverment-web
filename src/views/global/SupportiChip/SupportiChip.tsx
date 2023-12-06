import React from 'react';

import { Box, BoxProps, Chip } from '@mui/material';

interface ISupportiChipProps {
	label: string;
	onClick: () => void;
	variant: 'outlined' | 'filled' | 'default';
}

const SupportiChip = (props: ISupportiChipProps) => {
	return <Chip />;
};

export default SupportiChip;
