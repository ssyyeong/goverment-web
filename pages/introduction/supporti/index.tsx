import React from 'react';
import { NextPage } from 'next';

import {
	Box,
	ToggleButton,
	ToggleButtonGroup,
	Typography,
} from '@mui/material';
import SupportiTab from '../../../src/views/global/SupportiTab';

const Page: NextPage = () => {
	//* States
	const [tab, setTab] = React.useState('ko');
	//* Modules
	//* Constants
	//* Hooks

	return (
		<Box
			p={{
				xs: 2,
				md: 10,
			}}
		>
			<Box textAlign="center" my={5}>
				<Typography color="secondary.main" variant="h4">
					준비중입니다.
				</Typography>
			</Box>
		</Box>
	);
};

export default Page;
