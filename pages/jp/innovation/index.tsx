import React from 'react';
import { NextPage } from 'next';

import { Box, Typography } from '@mui/material';
import { CookieManager } from '@leanoncompany/supporti-utility';

const Page: NextPage = () => {
	const cookie = new CookieManager();
	const locale = cookie.getItemInCookies('LOCALE');

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
				backdropFilter: 'blur(20px)',
				borderStyle: 'solid',
				borderColor: 'primary.light',
				borderWidth: 'thin',
			}}
		>
			{/* <Box
				width={'100%'}
				display={'flex'}
				justifyContent={'center'}
				py={5}
				position={'relative'}
				top={'50%'}
			> */}
			<img
				src={
					locale == 'jp'
						? '/images/main/preparing_jp.png'
						: '/images/main/preparing.png'
				}
				alt="Matching"
			/>
			{locale == 'jp' ? (
				<Typography
					variant={'h3'}
					fontWeight={'400'}
					textAlign={'center'}
					pt={2}
				>
					より良いサービスを提供するためにページを準備中です。
					<br />
					早いうちに準備してお伺いします。
				</Typography>
			) : (
				<Typography
					variant={'h3'}
					fontWeight={'400'}
					textAlign={'center'}
					pt={2}
				>
					보다 나은 서비스를 제공하기 위하여 페이지 준비중에 있습니다.
					<br />
					빠른 시일내에 준비아여 찾아 뵙겠습니다.
				</Typography>
			)}
			{/* </Box> */}
		</Box>
	);
};

export default Page;
