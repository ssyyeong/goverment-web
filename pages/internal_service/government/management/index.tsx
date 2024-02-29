import React from 'react';

import { NextPage } from 'next';

import { Box, BoxProps } from '@mui/material';
import InternalServiceDrawer from '../../../../src/views/local/internal_service/common/InternalServiceDrawer';
import { InternalServiceLayout } from '../../../../src/views/layout/InternalServiceLayout';

const Page: NextPage = () => {
	//* Modules
	//* Constants
	//* States
	//* Functions
	//* Hooks
	return (
		<InternalServiceDrawer type="dashboard">
			<Box bgcolor={'primary.light'} sx={{ p: { sm: 5, xs: '0' } }}>
				{/* 컨텐츠 레이아웃 */}
				<InternalServiceLayout
					title="재무 지표 관리"
					subTitle="재무 솔루션을 통해 연결된 지표를 관리합니다."
					image="/images/main/indicatorHead.webp"
					mobileImage="/images/main/indicatorHeadMobile.webp"
				></InternalServiceLayout>
			</Box>
		</InternalServiceDrawer>
	);
};

export default Page;
