import { NextPage } from 'next';
import React, { useEffect } from 'react';
import Slider from 'react-slick';

import { Box, Grid, IconButton, Typography } from '@mui/material';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import AutoGraphIcon from '@mui/icons-material/AutoGraph';
import ApartmentTwoToneIcon from '@mui/icons-material/ApartmentTwoTone';
import MessageTwoToneIcon from '@mui/icons-material/MessageTwoTone';
import HandshakeTwoToneIcon from '@mui/icons-material/HandshakeTwoTone';
import LibraryBooksTwoToneIcon from '@mui/icons-material/LibraryBooksTwoTone';
import PeopleTwoToneIcon from '@mui/icons-material/PeopleTwoTone';

import CloseIcon from '@mui/icons-material/Close';

import DefaultController from '@leanoncompany/supporti-ark-office-project/src/controller/default/DefaultController';

import SupportiButton from '../../../src/views/global/SupportiButton';
import PopUpModal from '../../../src/views/local/common/PopUpModal/PopUpModal';
import SupportiInput from '../../../src/views/global/SupportiInput';
import ThemeCard from '../../../src/views/local/external_service/theme/ThemeCard/ThemeCard';

const Page: NextPage = () => {
	const partnerShipInquiryController = new DefaultController(
		'PartnerShipInquiry'
	);

	const containerRef = React.useRef<HTMLDivElement>(null);

	const [openPopUp, setOpenPopUp] = React.useState(false);
	const [name, setName] = React.useState('');
	const [email, setEmail] = React.useState('');
	const [phoneNumber, setPhoneNumber] = React.useState('');

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

	const regionsList = [
		{
			IMAGE: '/images/theme/지역별1.png',
			CATEGORY: '서울지역',
			TEXT1: '서울 스타트업 창업가 모임',
			TEXT2: '서울/창업가모임/투자유치 (1/15)명',
		},
		{
			IMAGE: '/images/theme/지역별2.png',
			CATEGORY: '경기지역',
			TEXT1: '안양시 초기 스타트업 창업가 모임',
			TEXT2: '안양/창업가모임/제품개발 (1/10)명',
		},
	];

	const industryCategory = [
		'테크 스타트업',
		'소상공인',
		'사회적 기업',
		'커머스',
	];

	const industryList = [
		{
			IMAGE: '/images/theme/업종별1.png',
			CATEGORY: '테크 스타트업',
			TEXT1: '24년 하반기 빠르게 개발 진행하실 창업가분 모십니다.',
			TEXT2: 'MVP개발(1/30)명',
		},
		{
			IMAGE: '/images/theme/업종별2.png',
			CATEGORY: '소상공인',
			TEXT1: '처음부터 천천히, 각 제품에 맞는 MVP개발 도와드립니다.',
			TEXT2: 'MVP개발(1/15)명',
		},
		{
			IMAGE: '/images/theme/업종별3.png',
			CATEGORY: '커머스',
			TEXT1: '기획부터 마케팅까지, 커머스 전문가와 함께하세요!',
			TEXT2: '기획(1/30)명',
		},
	];

	const overseasCategory = ['일본', '동남아시아'];

	const overseasList = [
		{
			IMAGE: '/images/theme/해외매칭1.png',
			CATEGORY: '일본',
			TEXT1: '해외진출을 위한 해외시장조사단 모집합니다.',
			TEXT2: '사전답사/시장조사 (1/5)명',
		},
		{
			IMAGE: '/images/theme/해외매칭2.png',
			CATEGORY: '일본',
			TEXT1: '처음부터 천천히, 각 제품에 맞는 MVP개발 도와드립니다.',
			TEXT2: '전문컨설팅/1:1멘토링 (1/3)명',
		},
		{
			IMAGE: '/images/theme/해외매칭3.png',
			CATEGORY: '동남아시아',
			TEXT1: '동남아시아 진출에 관심있는 창업가라면 누구든 함께해요!',
			TEXT2: '사전조사/커뮤니티 (1/30)명',
		},
	];

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
							borderColor: '#c8c8c8',
						}}
						onClick={() => {}}
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
									borderColor: '#c8c8c8',
								}}
								onClick={() => {}}
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
					flexDirection={'row'}
					mt={5}
					pb={5}
				>
					{regionsList.map((item, index) => {
						return <ThemeCard key={index} data={item} />;
					})}
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
							borderColor: '#c8c8c8',
						}}
						onClick={() => {}}
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
									borderColor: '#c8c8c8',
								}}
								onClick={() => {}}
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
					flexDirection={'row'}
					mt={5}
					pb={5}
				>
					{industryList.map((item, index) => {
						return <ThemeCard key={index} data={item} />;
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
							borderColor: '#c8c8c8',
						}}
						onClick={() => {}}
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
									borderColor: '#c8c8c8',
								}}
								onClick={() => {}}
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
					flexDirection={'row'}
					mt={5}
					pb={5}
				>
					{overseasList.map((item, index) => {
						return <ThemeCard key={index} data={item} />;
					})}
				</Box>
			</Box>
		</Box>
	);
};

export default Page;
