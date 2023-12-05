import { Box, Grid } from '@mui/material';
import React from 'react';
import SignIn from '@qillie-corp/ark-office-project/src/layout/auth/SignIn';
import SideBar from '@qillie-corp/ark-office-project/src/layout/SideBar/index';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import SupportiButton from '../src/views/global/SupportiButton';
type Props = {};

const index = (props: Props) => {
	const router = useRouter();

	useEffect(() => {}, []);

	return (
		<Grid container>
			<SupportiButton
				contents="다음"
				onClick={() => {
					// router.push('/auth/sign_in');
				}}
				fullWidth
				variant="contained"
			/>
		</Grid>
	);
};

export default index;
