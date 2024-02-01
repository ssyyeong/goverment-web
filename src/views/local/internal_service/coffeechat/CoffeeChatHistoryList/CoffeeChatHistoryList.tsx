import React from 'react';

import { Box, BoxProps } from '@mui/material';
import Nodata from '../../../../global/NoData/NoData';

interface ICoffeeChatHistoryListProps {
	rows: { [key: string]: any }[];
	listRenderCallback: (row: { [key: string]: any }, idx: number) => any;
}

const CoffeeChatHistoryList = (props: ICoffeeChatHistoryListProps) => {
	return (
		<Box
			sx={{
				p: 2,
				width: '100%',
				bgcolor: 'white',
				borderRadius: 1,
				minHeight: 400,
			}}
		>
			{props.rows?.map((row, idx) => {
				return props.listRenderCallback(row, idx);
			})}
			{props.rows?.length === 0 && <Nodata />}
		</Box>
	);
};

export default CoffeeChatHistoryList;
