import React from 'react';

import { Box, BoxProps, Typography } from '@mui/material';

export interface IInternalServiceHeaderProps {
	image?: string;
	mobileImage?: string;
	title?: string;
	subTitle?: string;
	additionalAction?: React.ReactNode;
}

/**
 * 내부 서비스 헤더 영역
 */
const InternalServiceHeader = (props: IInternalServiceHeaderProps) => {
	return (
		<Box
			sx={{
				backgroundImage: {
					xs: `url(${props.mobileImage})`,
					md: `url(${props.image})`,
				},
				backgroundSize: 'cover',
				px: 4,
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'center',
				height: props.image ? '180px' : 0,
				mb: 4,
			}}
			borderRadius={{ xs: 0, md: 2 }}
		>
			<Box
				display={'flex'}
				justifyContent={'space-between'}
				alignItems={'center'}
			>
				<Box
					display={'flex'}
					justifyContent={'space-between'}
					flexDirection={'column'}
				>
					<Typography
						variant="h2"
						color={'white'}
						sx={{ mb: 1 }}
						display={{ xs: 'none', md: 'block' }}
					>
						{props.title}
					</Typography>

					<Typography
						variant="subtitle1"
						color={'white'}
						display={{ xs: 'none', md: 'block' }}
					>
						{props.subTitle}
					</Typography>
					<Typography
						variant="h3"
						color={'white'}
						sx={{ mb: 1 }}
						display={{ xs: 'block', md: 'none' }}
					>
						{props.title}
					</Typography>
					<Typography
						// variant="h6"
						color={'white'}
						lineHeight={1.5}
						display={{ xs: 'block', md: 'none' }}
					>
						{props.subTitle}
					</Typography>
				</Box>
				<Box>
					{/* 추가 액션 영역 */}
					{props.additionalAction}
				</Box>
			</Box>
		</Box>
	);
};

export default InternalServiceHeader;
