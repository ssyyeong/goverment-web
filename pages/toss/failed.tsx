import React, { useEffect } from 'react';

import { NextPage } from 'next';

import { Box, BoxProps, Typography } from '@mui/material';
import { useRouter } from 'next/router';

const Page: NextPage = () => {
	//* Modules
	const router = useRouter();
	const { code, message, orderId } = router.query;
	//* Constants
	//* States
	//* Functions
	//* Hooks
	useEffect(() => {
		setTimeout(() => {
			router.back();
		}, 3000);
	}, [router.query]);

	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'center',
				alignItems: 'center',
				width: '100%',
				height: '80vh',
			}}
		>
			<Typography
				variant="h6"
				color={'error'}
				sx={{
					mt: 3,
				}}
			>
				{message}
			</Typography>
			<Typography
				variant="h3"
				fontWeight={'bold'}
				sx={{
					mt: 3,
				}}
			>
				결제에 실패했습니다!
			</Typography>
		</Box>
	);
};

export default Page;
