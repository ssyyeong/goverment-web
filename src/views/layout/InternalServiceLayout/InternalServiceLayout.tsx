import React from 'react';

import { Box, BoxProps } from '@mui/material';
import { InternalServiceHeader } from '../../local/internal_service/common/InternalServiceHeader';

interface IInternalServiceLayoutProps {
	children?: React.ReactNode;
}

const InternalServiceLayout = (props: IInternalServiceLayoutProps) => {
	return (
		<Box>
			{/* 헤더 영역 */}
			<InternalServiceHeader />

			{/* 콘텐츠 영역 */}
			<Box>{props.children}</Box>
		</Box>
	);
};

export default InternalServiceLayout;
