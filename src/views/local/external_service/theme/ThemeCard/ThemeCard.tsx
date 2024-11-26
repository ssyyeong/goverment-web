import React from 'react';
import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/router';

interface IThemeData {
	data: any;
}

const ThemeCard = (props: IThemeData) => {
	const router = useRouter();

	return (
		<Box
			sx={{
				p: 2.5,
				borderRadius: 2,
				boxShadow: 'rgb(219, 219, 219) 0px 4px 10px',
				width: '280px',
				minWidth: '280px',
				display: 'flex',
				flexDirection: 'column',
				gap: 2,
				textAlign: 'center',
				cursor: 'pointer',
			}}
			onClick={() => {
				router.pathname.includes('jp')
					? router.push(
							`/jp/matching/theme/${props.data.THEME_PRODUCT_IDENTIFICATION_CODE}`
					  )
					: router.push(
							`/external_service/theme/${props.data.THEME_PRODUCT_IDENTIFICATION_CODE}`
					  );
			}}
		>
			<Image
				src={JSON.parse(props.data.IMAGE)[0]}
				alt="image"
				width={240}
				height={250}
			/>
			{props.data.SUB_CONTENT && (
				<Typography
					sx={{
						p: 1,
						border: '1px solid #c8c8c8',
						borderRadius: 5,
						cursor: 'pointer',
						width: 'fit-content',
						color: 'primary.main',
						wordBreak: 'keep-all',
					}}
				>
					{props.data.SUB_CONTENT}
				</Typography>
			)}
			<Typography
				variant="h6"
				fontWeight={600}
				sx={{ wordBreak: 'keep-all' }}
			>
				{props.data.TITLE}
			</Typography>
			<Typography
				variant="body1"
				fontWeight={400}
				sx={{ wordBreak: 'keep-all' }}
			>
				{props.data.SUMMARY}
			</Typography>
		</Box>
	);
};

export default ThemeCard;
