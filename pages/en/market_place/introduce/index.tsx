import { NextPage } from 'next';
import React, { useEffect } from 'react';

import { Box, Grid, IconButton, TextField, Typography } from '@mui/material';

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
				src="/images/market_place/en/001.png"
				alt="banner"
				style={{ width: '100%', height: 'auto' }}
			/>
			<img
				src="/images/market_place/en/002.png"
				alt="banner"
				style={{ width: '100%', height: 'auto' }}
			/>
			<img
				src="/images/market_place/en/003.png"
				alt="banner"
				style={{ width: '100%', height: 'auto' }}
			/>
			<img
				src="/images/market_place/en/004.png"
				alt="banner"
				style={{ width: '100%', height: 'auto' }}
			/>
			<img
				src="/images/market_place/en/005.png"
				alt="banner"
				style={{ width: '100%', height: 'auto' }}
			/>
		</Box>
	);
};

export default Page;
