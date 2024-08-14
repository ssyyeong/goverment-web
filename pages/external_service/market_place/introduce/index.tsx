import { NextPage } from 'next';
import React, { useEffect } from 'react';

import { Box, Grid, IconButton, TextField, Typography } from '@mui/material';

import DefaultController from '@leanoncompany/supporti-ark-office-project/src/controller/default/DefaultController';

import { useRouter } from 'next/router';

const Page: NextPage = () => {
	const router = useRouter();
	const partnerShipInquiryController = new DefaultController(
		'PartnerShipInquiry'
	);

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
			{/* <img
				src="/images/market_place/002.png"
				alt="banner"
				style={{ width: '100%', height: 'auto' }}
			/>
			<img
				src="/images/market_place/003.png"
				alt="banner"
				style={{ width: '100%', height: 'auto' }}
			/>
			<img
				src="/images/market_place/004.png"
				alt="banner"
				style={{ width: '100%', height: 'auto' }}
			/>
			<img
				src="/images/market_place/005.png"
				alt="banner"
				style={{ width: '100%', height: 'auto' }}
			/>
			<img
				src="/images/market_place/006.png"
				alt="banner"
				style={{ width: '100%', height: 'auto' }}
			/> */}
		</Box>
	);
};

export default Page;
