import React from 'react';

import { NextPage } from 'next';

import { Box, BoxProps } from '@mui/material';
import { useRouter } from 'next/router';

const Page: NextPage = () => {
	//* Modules
	const router = useRouter();
	const { code, message, orderId } = router.query;
	//* Constants
	//* States
	//* Functions
	//* Hooks
	return <Box></Box>;
};

export default Page;
