import React from 'react';

import { Box, BoxProps, Typography } from '@mui/material';
import moment from 'moment';

interface IRecommendSupportBusinessCardProps {
	supportBusiness: any;
}

const RecommendSupportBusinessCard = (
	props: IRecommendSupportBusinessCardProps
) => {
	return (
		<Box
			bgcolor={'white'}
			width={'300px'}
			borderRadius={3}
			minWidth={'300px'}
			p={2}
			display={'flex'}
			flexDirection={'column'}
			justifyContent={'space-between'}
			sx={{
				cursor: 'pointer',
			}}
			minHeight={'200px'}
			maxHeight={'200px'}
		>
			<Box>
				<Box
					display={'flex'}
					alignItems={'center'}
					justifyContent={'space-between'}
					mb={1.5}
				>
					<Typography color={'primary'} fontWeight={'700'}>
						{props.supportBusiness.FIELD}
					</Typography>
					<Typography
						color={'error.main'}
						fontWeight={'700'}
						variant="caption"
						fontSize={'11px !important'}
						lineHeight={1}
						sx={{
							px: 1,
							py: 0.5,
							borderRadius: 3,
							borderColor: 'error.light',
							borderWidth: 1,
							borderStyle: 'solid',
						}}
					>
						D-
						{moment(props.supportBusiness.END_DATE).diff(
							moment(),
							'days'
						)}
						일
					</Typography>
				</Box>
				<Box
					display={'flex'}
					flexWrap={'wrap'}
					gap={1}
					alignItems={'center'}
				>
					<Typography variant="h6" fontWeight={'700'}>
						{props.supportBusiness.BUSINESS_TITLE}
					</Typography>
				</Box>
			</Box>
			<Box display={'flex'} flexDirection={'column'} gap={1}>
				<Typography color={'gray'} fontWeight={500}>
					모집내용
				</Typography>
				<Typography
					lineHeight={1.5}
					sx={{
						overflow: 'hidden',
						textOverflow: 'ellipsis',
						display: '-webkit-box',
						WebkitLineClamp: 2,
						WebkitBoxOrient: 'vertical',
					}}
				>
					{props.supportBusiness.BUSINESS_DESCRIPTION.replace(
						/<(\/)?([a-zA-Z]*)(\s[a-zA-Z]*=[^>]*)?(\s)*(\/)?>/gi,
						''
					)
						.replace(/&nbsp;/gi, ' ')
						.replace(/&apos;/gi, ' ')}
				</Typography>
			</Box>
		</Box>
	);
};

export default RecommendSupportBusinessCard;
