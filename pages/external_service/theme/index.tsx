import { NextPage } from 'next';
import React, { useEffect } from 'react';
import Slider from 'react-slick';

import { Box, Grid, IconButton, Typography } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

import DefaultController from '@leanoncompany/supporti-ark-office-project/src/controller/default/DefaultController';

import SupportiButton from '../../../src/views/global/SupportiButton';
import ThemeCard from '../../../src/views/local/external_service/theme/ThemeCard/ThemeCard';
import Nodata from '../../../src/views/global/NoData/NoData';
import {
	industryThemeConfig,
	overseasThemeConfig,
	regionThemeConfig,
} from '../../../configs/data/ThemeConfig';

const Page: NextPage = () => {
	const partnerShipInquiryController = new DefaultController(
		'PartnerShipInquiry'
	);

	const containerRef = React.useRef<HTMLDivElement>(null);

	const [openPopUp, setOpenPopUp] = React.useState(false);
	const [name, setName] = React.useState('');
	const [email, setEmail] = React.useState('');
	const [phoneNumber, setPhoneNumber] = React.useState('');

	const [category1, setCategory1] = React.useState('전체');
	const [category2, setCategory2] = React.useState('전체');
	const [category3, setCategory3] = React.useState('전체');

	const regionCategory = [
		'서울지역',
		'경기지역',
		'충북지역',
		'충남지역',
		'경북지역',
		'경남지역',
		'전북지역',
		'전남지역',
		'제주도',
	];

	const industryCategory = [
		'테크 스타트업',
		'소상공인',
		'사회적 기업',
		'커머스',
	];

	const overseasCategory = ['일본', '동남아시아'];

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

	// 문의 데이터 초기화
	const resetInquiryData = () => {
		setName('');
		setEmail('');
		setPhoneNumber('');
	};

	// 문의 생성
	const createInquiry = async () => {
		partnerShipInquiryController.createItem(
			{
				NAME: name,
				EMAIL: email,
				PHONE_NUMBER: phoneNumber,
			},
			(res) => {
				setOpenPopUp(false);
				alert('문의가 접수되었습니다.');
			}
		);
	};

	useEffect(() => {
		//파트너스 로고 스크롤 이벤트
		const timer = setInterval(() => {
			containerRef?.current?.scrollBy({
				left: 300,
				behavior: 'smooth',
			});
			if (containerRef?.current?.scrollLeft >= 1200) {
				containerRef?.current?.scrollBy({
					left: -1500,
					behavior: 'smooth',
				});
			}
		}, 3000);

		return () => clearTimeout(timer);
	});

	return (
		<Box
			sx={{
				width: '100%',
				display: 'flex',
				flexDirection: 'column',
			}}
		>
			<Box
				width={'100%'}
				textAlign={'center'}
				display={'flex'}
				flexDirection={'column'}
				justifyContent={'center'}
				bgcolor={'#f5f5f5'}
				py={5}
				px={{
					xs: 2,
					md: 0,
				}}
			>
				<Typography variant={'h1'} fontWeight={'600'}>
					창업가의 니즈에 맞춘 맞춤형 커뮤니티
				</Typography>
				<Typography variant={'h4'} fontWeight={'400'} mt={3}>
					학생 발명가부터 소상공인, 해외 진출을 꿈꾸는 창업가까지!
				</Typography>
				<Typography variant={'h4'} fontWeight={'400'} mt={1}>
					당신이 가진 아이디어, 서포티가 현실로 이뤄드립니다.
				</Typography>
				<Typography variant={'h4'} fontWeight={'400'} mt={1}>
					꿈을 현실로 만드는 그 첫걸음, 서포티와 함께 시작하세요.{' '}
				</Typography>
			</Box>
			{/* 섹션2 */}
			<Box
				display={'flex'}
				flexDirection={'column'}
				justifyContent={'center'}
				alignItems={'center'}
				mt={5}
				mb={5}
				px={{
					xs: 2,
					md: 0,
				}}
			>
				<Typography variant={'h5'} fontWeight={'600'} color={'primary'}>
					🗺 지역별 커뮤니티{' '}
				</Typography>
				<Typography
					variant={'h1'}
					fontWeight={'600'}
					mt={3}
					textAlign={'center'}
				>
					특정 지역의 비즈니스 환경과 기회에 맞춘 <br />
					네트워킹과 지원을 촉진합니다
				</Typography>
				<Typography
					variant={'body2'}
					fontWeight={'400'}
					color={'textSecondary'}
					mt={1}
				>
					요청하는 지역에 따라 모임이 개최돼요! 빠르게 선점해보세요.
				</Typography>
				<SupportiButton
					style={{
						marginTop: '20px',
					}}
					contents={'모임 요청하기'}
					variant={'text'}
					color={'primary'}
					onClick={() => {
						window.open(
							'https://docs.google.com/forms/d/e/1FAIpQLSdfqiEZ3AO10u8sFatoK0pj3DA5O8-Ke5sUX9wF_doL341ocQ/viewform',
							'_blank'
						);
					}}
				></SupportiButton>
				<Box display="flex" gap={1.2} flexWrap="wrap" my={2}>
					<Typography
						sx={{
							p: 1,
							border: '1px solid #c8c8c8',
							borderRadius: 5,
							cursor: 'pointer',
							borderColor:
								category1 === '전체'
									? 'primary.main'
									: '#c8c8c8',
							color: category1 === '전체' && 'primary.main',
						}}
						onClick={() => {
							setCategory1('전체');
						}}
					>
						전체
					</Typography>
					{regionCategory?.map((item, index) => {
						return (
							<Typography
								key={index}
								sx={{
									p: 1,
									border: '1px solid #c8c8c8',
									borderRadius: 5,
									cursor: 'pointer',
									borderColor:
										category1 === item
											? 'primary.main'
											: '#c8c8c8',
									color: category1 === item && 'primary.main',
								}}
								onClick={() => {
									setCategory1(item);
								}}
							>
								{item}
							</Typography>
						);
					})}
				</Box>
				<Box
					display="flex"
					gap={3}
					flexWrap="nowrap"
					overflow="hidden"
					width={'100%'}
					justifyContent={'center'}
					alignItems={'center'}
					flexDirection={{
						xs: 'column',
						md: 'row',
					}}
					px={{
						xs: 2,
						md: 0,
					}}
					mt={5}
					pb={5}
				>
					{regionThemeConfig.filter(
						(item: any) => item.category === category1
					).length > 0 || category1 == '전체' ? (
						regionThemeConfig.map((item: any, index) => {
							if (
								category1 === '전체' ||
								category1 === item.category
							) {
								return <ThemeCard key={index} data={item} />;
							}
						})
					) : (
						// <Box>
						// 	<img
						// 		src="/images/main/prepare.png"
						// 		alt="prepare"
						// 		width={300}
						// 		height={250}
						// 	/>
						// 	<Typography

						// 	>
						// 		해당 지역에는 현재 모임이 없습니다.
						// 	</Typography>
						// </Box>
						<Nodata />
					)}
				</Box>
			</Box>
			{/* 섹션3 */}
			<Box
				display={'flex'}
				flexDirection={'column'}
				justifyContent={'center'}
				alignItems={'center'}
				mt={5}
				mb={5}
				bgcolor={'#f5f5f5'}
				py={5}
				px={{
					xs: 2,
					md: 0,
				}}
			>
				<Typography variant={'h5'} fontWeight={'600'} color={'red'}>
					🎈 업종별 커뮤니티
				</Typography>
				<Typography
					variant={'h1'}
					fontWeight={'600'}
					mt={3}
					textAlign={'center'}
				>
					창업가의 비즈니스 유형에 맞춰 <br />
					특화된 지원과 정보를 제공합니다.
				</Typography>
				<Typography
					variant={'body2'}
					fontWeight={'400'}
					color={'textSecondary'}
					mt={1}
				>
					요청하는 지역에 따라 모임이 개최돼요! 빠르게 선점해보세요.
				</Typography>
				<Box display="flex" gap={1.2} flexWrap="wrap" my={2}>
					<Typography
						sx={{
							p: 1,
							border: '1px solid #c8c8c8',
							borderRadius: 5,
							cursor: 'pointer',
							borderColor:
								category2 === '전체'
									? 'primary.main'
									: '#c8c8c8',
							color: category2 === '전체' && 'primary.main',
						}}
						onClick={() => {
							setCategory2('전체');
						}}
					>
						전체
					</Typography>
					{industryCategory?.map((item, index) => {
						return (
							<Typography
								key={index}
								sx={{
									p: 1,
									border: '1px solid #c8c8c8',
									borderRadius: 5,
									cursor: 'pointer',
									borderColor:
										category2 === item
											? 'primary.main'
											: '#c8c8c8',
									color: category2 === item && 'primary.main',
								}}
								onClick={() => {
									setCategory2(item);
								}}
							>
								{item}
							</Typography>
						);
					})}
				</Box>
				<Box
					display="flex"
					gap={3}
					width={'100%'}
					justifyContent={'center'}
					alignItems={'center'}
					flexDirection={{
						xs: 'column',
						md: 'row',
					}}
					mt={5}
					pb={5}
				>
					{industryThemeConfig.map((item: any, index) => {
						if (
							category2 === '전체' ||
							category2 === item.category
						) {
							return <ThemeCard key={index} data={item} />;
						}
					})}
				</Box>
			</Box>
			{/* 섹션4 */}
			<Box
				display={'flex'}
				flexDirection={'column'}
				justifyContent={'center'}
				alignItems={'center'}
				mt={5}
				mb={5}
			>
				<Typography variant={'h5'} fontWeight={'600'} color={'purple'}>
					📌 해외 매칭 커뮤니티{' '}
				</Typography>
				<Typography
					variant={'h1'}
					fontWeight={'600'}
					mt={3}
					textAlign={'center'}
				>
					국제 비즈니스 기회를 탐색하고 <br />
					해외 파트너와의 연결을 지원합니다.
				</Typography>
				<SupportiButton
					style={{
						marginTop: '20px',
						p: 0,
					}}
					contents={'매칭 프리미엄 서비스 이용하러가기'}
					variant={'text'}
					color={'primary'}
					onClick={() => {
						window.open(
							'https://docs.google.com/forms/d/14D4sKuSFWvV6Jndy3vQaharJ0Ikz3I8_V6bzW_UFapk/viewform?edit_requested=true',
							'_blank'
						);
					}}
				></SupportiButton>
				<Typography
					variant={'body2'}
					fontWeight={'400'}
					color={'textSecondary'}
					mt={1}
				>
					(매칭 이후 통역사와 연결해 만남까지 동행하는 서비스 입니다)
				</Typography>

				<Box display="flex" gap={1.2} flexWrap="wrap" my={2}>
					<Typography
						sx={{
							p: 1,
							border: '1px solid #c8c8c8',
							borderRadius: 5,
							cursor: 'pointer',
							borderColor:
								category3 === '전체'
									? 'primary.main'
									: '#c8c8c8',
							color: category3 === '전체' && 'primary.main',
						}}
						onClick={() => {
							setCategory3('전체');
						}}
					>
						전체
					</Typography>
					{overseasCategory?.map((item, index) => {
						return (
							<Typography
								key={index}
								sx={{
									p: 1,
									border: '1px solid #c8c8c8',
									borderRadius: 5,
									cursor: 'pointer',
									borderColor:
										category3 === item
											? 'primary.main'
											: '#c8c8c8',
									color: category3 == item && 'primary.main',
								}}
								onClick={() => {
									setCategory3(item);
								}}
							>
								{item}
							</Typography>
						);
					})}
				</Box>
				<Box
					display="flex"
					gap={3}
					flexWrap="nowrap"
					overflow="hidden"
					width={'100%'}
					justifyContent={'center'}
					alignItems={'center'}
					flexDirection={{
						xs: 'column',
						md: 'row',
					}}
					mt={5}
					pb={5}
				>
					{overseasThemeConfig.map((item: any, index) => {
						if (
							category3 === '전체' ||
							category3 === item.category
						) {
							return <ThemeCard key={index} data={item} />;
						}
					})}
				</Box>
			</Box>
		</Box>
	);
};

export default Page;
