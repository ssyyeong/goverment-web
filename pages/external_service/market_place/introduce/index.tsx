import { NextPage } from 'next';
import React from 'react';

import { Box } from '@mui/material';

// 마켓 플레이스 소개 페이지
const Page: NextPage = () => {
	return (
		<Box
			sx={{
				width: '100%',
				display: 'flex',
				flexDirection: 'column',
			}}
		>
			<img
				src="/images/market_place/introduce2.png"
				alt="banner"
				style={{ width: '100%', height: 'auto' }}
			/>
		</Box>
	);
};

export default Page;
