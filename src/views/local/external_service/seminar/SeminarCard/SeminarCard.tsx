import React from 'react';
import { Box, BoxProps, Typography } from '@mui/material';
import SupportiButton from '../../../../global/SupportiButton';
import Image from 'next/image';
import { useRouter } from 'next/router';

// interface ISeminarCard {
// 	title: string;
// 	image: any;
// 	description: string;
// 	link?: string;
// 	filter?: any[];
// }

interface ISeminarData {
	data: any;
	type: 'seminar' | 'consulting';
}

const SeminarCard = (props: ISeminarData) => {
	const router = useRouter();

	return (
		<Box
			sx={{
				p: 2.5,
				borderRadius: 2,
				boxShadow: 'rgb(219, 219, 219) 0px 4px 10px',
				width: '280px',
				display: 'flex',
				flexDirection: 'column',
				gap: 2,
				cursor: 'pointer',
				textAlign: 'center',
			}}
			onClick={() => {
				// 세미나 상세 페이지로 이동
				if (props.type === 'seminar')
					router.push(
						`/external_service/seminar/${props.data.SEMINAR_PRODUCT_IDENTIFICATION_CODE}`
					);
				else
					router.push(
						`/external_service/consulting/${props.data.CONSULTING_PRODUCT_IDENTIFICATION_CODE}`
					);
			}}
		>
			<Image
				src={JSON.parse(props.data.PRODUCT_DETAIL_IMAGE_LIST)[0]}
				alt="image"
				width={240}
				height={250}
			/>
			{props.data.SeminarCategory && (
				<Typography
					sx={{
						p: 1,
						border: '1px solid #c8c8c8',
						borderRadius: 5,
						cursor: 'pointer',
						width: 'fit-content',
						color: 'primary.main',
					}}
				>
					{props.data.SeminarCategory.CONTENT}
				</Typography>
			)}
			<Typography variant="h6" fontWeight={600}>
				{props.data.PRODUCT_NAME}
			</Typography>
			<Typography>{props.data.DESCRIPTION}</Typography>
			<SupportiButton
				contents="신청하기"
				variant="contained"
				style={{
					color: 'common.white',
					height: '35px',
					mt: 'auto',
				}}
				isGradient={true}
				onClick={() => {}}
			/>
		</Box>
	);
};

export default SeminarCard;
