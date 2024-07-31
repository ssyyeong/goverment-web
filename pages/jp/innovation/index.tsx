import React from 'react';
import { NextPage } from 'next';

import { Box, Grid, Typography } from '@mui/material';
import SupportiButton from '../../../src/views/global/SupportiButton';
import { useRouter } from 'next/router';

const Page: NextPage = () => {
	const router = useRouter();

	return (
		<Box
			width={{
				xs: '100%',
				md: '40%',
			}}
			height={'100vh'}
			margin={'auto'}
			sx={{
				display: 'flex',
				flexDirection: 'column',
			}}
			bgcolor={'primary.light'}
		>
			<Box
				width={'100%'}
				display={'flex'}
				justifyContent={'center'}
				py={5}
				position={'relative'}
				top={'50%'}
			>
				<Typography variant={'h3'}>현재 진행 중입니다.</Typography>
			</Box>
		</Box>
	);
};

export default Page;
