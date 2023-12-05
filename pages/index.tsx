import { Box, Grid } from '@mui/material';
import React from 'react';
import SignIn from '@qillie-corp/ark-office-project/src/layout/auth/SignIn';
import SideBar from '@qillie-corp/ark-office-project/src/layout/SideBar/index';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
type Props = {};

const index = (props: Props) => {
	const router = useRouter();

	useEffect(() => {}, []);

	return <Grid container></Grid>;
};

export default index;
