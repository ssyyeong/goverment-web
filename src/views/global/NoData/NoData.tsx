import React from 'react';

import { Box, BoxProps, Typography } from '@mui/material';

interface INodataProps {}

//* 데이터 없음 컴포넌트
const Nodata = (props: INodataProps) => {
	return (
		<Box
			display={'flex'}
			flexDirection={'column'}
			width={'100%'}
			justifyContent={'center'}
			alignItems={'center'}
			pt={10}
			pb={10}
		>
			<img src={'/images/icons/frown.svg'} width={'10%'} />
			<Typography color={'#a4a4a4'} fontWeight={'500'} mt={3}>
				데이터가 없습니다.
			</Typography>
		</Box>
	);
};

export default Nodata;
