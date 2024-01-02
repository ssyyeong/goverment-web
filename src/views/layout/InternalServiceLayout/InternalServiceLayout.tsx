import React from 'react';

import { Box, BoxProps } from '@mui/material';
import { InternalServiceHeader } from '../../local/internal_service/common/InternalServiceHeader';
import { IInternalServiceHeaderProps } from '../../local/internal_service/common/InternalServiceHeader/InternalServiceHeader';

interface IInternalServiceLayoutProps extends IInternalServiceHeaderProps {
	children?: React.ReactNode;
}

const InternalServiceLayout = (props: IInternalServiceLayoutProps) => {
	return (
		<Box width={'100%'}>
			{/* 헤더 영역 */}
			<InternalServiceHeader {...props} />

			{/* 콘텐츠 영역 */}
			<Box display="flex" flexDirection={'column'}>
				{props.children}
			</Box>
		</Box>
	);
};

export default InternalServiceLayout;
