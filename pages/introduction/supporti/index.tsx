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
			sx={{
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'center',
				alignItems: 'center',
				width: '100%',
				px: { sm: 5, xs: 2 },
			}}
		>
			<SupportiTab
				tabList={['ko', 'en']}
				setValue={setTab}
				value={tab}
				tabContentList={[
					<Box>
						<Typography variant="h2">한국어</Typography>
					</Box>,
					<Box>
						<Typography variant="h2">English</Typography>
					</Box>,
				]}
			/>
		</Box>
	);
};

export default Page;
