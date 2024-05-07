import React from 'react';

import { Box, BoxProps, TextField, Typography } from '@mui/material';
import router from 'next/router';
import { Thumbnail } from '@leanoncompany/supporti-react-ui';

interface IContentsCardProps {
	data: any;
}

const ContentsCard = (props: IContentsCardProps) => {
	//* State

	return (
		<Box
			sx={{
				cursor: 'pointer',
				minWidth: '350px',
				height: 'fit-content',
			}}
			onClick={() => {
				router.push(
					`/supportv/${props.data.CONTENTS_IDENTIFICATION_CODE}`
				);
			}}
		>
			<Box
				display={'flex'}
				flexDirection={'column'}
				bgcolor={'white'}
				borderRadius={1}
			>
				<Thumbnail
					src={
						props.data.THUMBNAIL &&
						JSON.parse(props.data.THUMBNAIL)[0]
					}
					width={'100%'}
					backgroundSize="cover"
					borderRadius={3}
					ratio="16:9"
				/>
				<Box
					sx={{
						borderRadius: 1.5,
						border: '1px solid #305DDC',
						py: 0.7,
						px: 1,
						width: 'fit-content',
						my: 1.5,
					}}
				>
					<Typography variant="subtitle2" color={'primary.main'}>
						{props.data.ContentsCategory.CONTENT}
					</Typography>
				</Box>
				<Box my={2}>
					<Typography variant="h6" fontWeight={'600'}>
						{props.data.TITLE}
					</Typography>
					<Typography
						variant="subtitle2"
						mt={1}
						color={'gray'}
						lineHeight={1.5}
						fontWeight={'400'}
					>
						{props.data.SHORT_DESCRIPTION}
					</Typography>
					<Box display={'flex'} gap={1} ml="auto">
						<Typography
							variant="subtitle2"
							mt={1}
							color={'gray'}
							lineHeight={1.5}
							fontWeight={'400'}
						>
							{props.data.WRITER}
						</Typography>
						<Typography
							variant="subtitle2"
							mt={1}
							color={'gray'}
							lineHeight={1.5}
							fontWeight={'400'}
						>
							·
						</Typography>
						<Typography
							variant="subtitle2"
							mt={1}
							color={'gray'}
							lineHeight={1.5}
							fontWeight={'400'}
						>
							{props.data.POSITION}
						</Typography>
					</Box>
				</Box>
			</Box>
		</Box>
	);
};

export default ContentsCard;
