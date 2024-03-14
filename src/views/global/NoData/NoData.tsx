import React from 'react';

import { Box, BoxProps, Typography } from '@mui/material';

interface INodataProps {
	disabledGutter?: boolean;
	imgWidth?: string;
	noDataText?: string;
}

//* 데이터 없음 컴포넌트
const Nodata = (props: INodataProps) => {
	return (
		<Box
			display={'flex'}
			flexDirection={'column'}
			width={'100%'}
			justifyContent={'center'}
			alignItems={'center'}
			pt={props.disabledGutter ? 0 : 10}
			pb={props.disabledGutter ? 0 : 10}
		>
			<img
				src={'/images/icons/frown.svg'}
				width={props.imgWidth ? props.imgWidth : '10%'}
			/>
			<Typography color={'#a4a4a4'} fontWeight={'500'} mt={3}>
				{props.noDataText ? props.noDataText : '데이터가 없습니다.'}
			</Typography>
		</Box>
	);
};

export default Nodata;
