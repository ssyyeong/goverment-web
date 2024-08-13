import { NextPage } from 'next';
import React, { useEffect } from 'react';

import { Box, Grid, IconButton, Typography } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import DefaultController from '@leanoncompany/supporti-ark-office-project/src/controller/default/DefaultController';

import SupportiButton from '../../../src/views/global/SupportiButton';
import { useRouter } from 'next/router';

const Page: NextPage = () => {
	const router = useRouter();

	//* Functions
	//BurnRate 섹션 화살표 커스텀
	//* Functions
	function SamplePrevArrow(props) {
		const { className, style, onClick } = props;
		return (
			<div
				className={className}
				style={{ ...style, display: 'block', color: 'black' }}
				onClick={onClick}
			>
				<ArrowBackIosNewIcon />
			</div>
		);
	}

	function SampleNextArrow(props) {
		const { className, style, onClick } = props;
		return (
			<div
				className={className}
				style={{ ...style, display: 'block', color: 'black' }}
				onClick={onClick}
			>
				<ArrowForwardIosIcon />
			</div>
		);
	}
	const settings = {
		dots: true,
		infinite: true,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: true,
		nextArrow: <SampleNextArrow />,
		prevArrow: <SamplePrevArrow />,
	};

	return (
		<Box
			sx={{
				width: '100%',
				display: 'flex',
				flexDirection: 'column',
			}}
		>
			<Box
				sx={{
					backgroundImage: `url(/images/apistore/background.svg)`,
					backgroundSize: 'cover',
				}}
				width={'100%'}
				height={'50vh'}
			>
				{/* 메인 이미지 텍스트 섹션 */}
				<Box
					width={'100%'}
					textAlign={'center'}
					display={'flex'}
					flexDirection={'column'}
					justifyContent={'center'}
					sx={{
						height: '100%',
					}}
				>
					<Typography variant={'h1'} fontWeight={'600'}>
						API store
					</Typography>
					<Typography variant={'h2'} fontWeight={'400'} mt={1}>
						국내최초 MVP 전문 API store{' '}
					</Typography>
					<Box
						display={'flex'}
						justifyContent={'center'}
						mt={2}
						flexDirection={'row'}
						gap={2}
					>
						<Box
							display={'flex'}
							flexDirection={'column'}
							justifyContent={'center'}
							width={120}
							height={120}
							bgcolor={'white'}
							alignItems={'center'}
							p={5}
							borderRadius={5}
						>
							<SentimentSatisfiedAltIcon sx={{ fontSize: 30 }} />
							<Typography
								variant={'h6'}
								fontWeight={'600'}
								mt={2}
							>
								API명
							</Typography>
						</Box>
						<Box
							display={'flex'}
							flexDirection={'column'}
							justifyContent={'center'}
							width={120}
							height={120}
							bgcolor={'white'}
							alignItems={'center'}
							p={5}
							borderRadius={5}
						>
							<SentimentSatisfiedAltIcon sx={{ fontSize: 30 }} />
							<Typography
								variant={'h6'}
								fontWeight={'600'}
								mt={2}
							>
								API명
							</Typography>
						</Box>
					</Box>
				</Box>
			</Box>
			{/* 섹션2 */}
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					gap: 2,
					p: 2,
					mt: 2,
					alignItems: 'center',
				}}
			>
				<Typography variant={'h4'} fontWeight={'600'}>
					국내 최초
				</Typography>
				<Typography
					variant={'h4'}
					fontWeight={'600'}
					color={'primary.main'}
				>
					MVP 전문 API Store
				</Typography>
				{/* <img
					src="/images/apistore/description.svg"
					alt="description"
					width={600}
				/>
				<img
					src="/images/apistore/avartar.svg"
					alt="avatar"
					width={300}
					height={200}
				/> */}
			</Box>
			{/* 섹션3 */}
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					gap: 2,
					p: 2,
					mt: 2,
					bgcolor: 'primary.light',
				}}
			>
				<img
					src="/images/apistore/process.svg"
					alt="section3"
					width={'70%'}
					style={{
						alignSelf: 'center',
					}}
				/>
			</Box>
		</Box>
	);
};

export default Page;
