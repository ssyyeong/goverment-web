import {
	Box,
	Button,
	Grid,
	MobileStepper,
	Paper,
	Typography,
	useTheme,
	keyframes,
} from '@mui/material';
import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styles from '../styles/SlickCarousel.module.css';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import SupportiButton from '../src/views/global/SupportiButton';
import { NextPage } from 'next';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useAppMember } from '../src/hooks/useAppMember';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import EastIcon from '@mui/icons-material/East';

type Props = {};

const Page: NextPage = () => {
	const router = useRouter();
	const { memberId } = useAppMember();

	const motion = keyframes`
  0% {
    margin-top: 0px;
		
  }
	50% {
		margin-top: 5px;
	}
  100% {
    margin-top: 10px;
  }
`;

	useEffect(() => {}, []);

	const [tab, setTab] = React.useState(0);
	const [open, setOpen] = React.useState(false);
	// const [Typography, setTypography] = React.useState('');

	const images = [
		{
			label: 'San Francisco – Oakland Bay Bridge, United States',
			imgPath:
				'https://images.unsplash.com/photo-1537944434965-cf4679d1a598?auto=format&fit=crop&w=400&h=250&q=60',
		},
		{
			label: 'Bird',
			imgPath:
				'https://images.unsplash.com/photo-1538032746644-0212e812a9e7?auto=format&fit=crop&w=400&h=250&q=60',
		},
		{
			label: 'Bali, Indonesia',
			imgPath:
				'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=400&h=250',
		},
		{
			label: 'Goč, Serbia',
			imgPath:
				'https://images.unsplash.com/photo-1512341689857-198e7e2f3ca8?auto=format&fit=crop&w=400&h=250&q=60',
		},
	];

	const theme = useTheme();
	const [activeStep, setActiveStep] = React.useState(0);
	const maxSteps = images.length;

	const handleNext = () => {
		setActiveStep((prevActiveStep) => prevActiveStep + 1);
	};

	const handleBack = () => {
		setActiveStep((prevActiveStep) => prevActiveStep - 1);
	};

	const handleStepChange = (step: number) => {
		setActiveStep(step);
	};

	const data = [
		{
			srcPath: '/images/logo/partners/신용보증기금.svg',
			alt: '신용보증기금',
		},
		{
			srcPath: '/images/logo/partners/법무법인도울.svg',
			alt: '법무법인도울',
		},
		{
			srcPath: '/images/logo/partners/메타소프트.svg',
			alt: '메타소프트',
		},
		{
			srcPath: '/images/logo/partners/자버.svg',
			alt: '자버',
		},
		{
			srcPath: '/images/logo/partners/교보생명.svg',
			alt: '교보생명',
		},
		{
			srcPath: '/images/logo/partners/나쵸코드.svg',
			alt: '나쵸코드',
		},
		{
			srcPath: '/images/logo/partners/화웨이.svg',
			alt: '화웨이',
		},
		{
			srcPath: '/images/logo/partners/원테이커.svg',
			alt: '원테이커',
		},
	];

	const data2 = [
		{
			logo: '',
			reBoxTypography:
				'초기 스타트업이다보니 여러 가지 신경써야 할 것이 많은데 재무와 경영 지표 관리에 대해서만큼은 큰 신경을 안 써도 되어 좋습니다.',
			reBoxer: '최00 AI 스타트업 대표',
			organization: '',
		},
		{
			logo: '',
			reBoxTypography:
				'아는 대표님의 추천으로 써봤는데 실제로 쓰는 과정이 간편하다보니 사용하기 편리합니다. 저희는 아무래도 인원이 있다보니 모든 인원이 지표를 보고 써야해서 지표 관리가 무엇보다 중요한데 서포티를 쓰니 일이 1/3로 줄었어요!',
			reBoxer: '홍00 커머스 스타트업 대표',
			organization: '',
		},
		{
			logo: '',
			reBoxTypography:
				'초기 스타트업에 딱 필요한 서비스 인 것 같습니다. 실제 여러 데이터를 비교할 수 있고 지표를 한 눈에 볼 수 있어 편리합니다. 무엇보다 투자사에게 바로 링크를 공유해 전달 드릴 수 있으니 시간이 많이 단축되었어요!',
			reBoxer: '김00 SaaS 스타트업 대표',
			organization: '',
		},
		{
			logo: '',
			reBoxTypography:
				'초기 스타트업에서 실무를 총괄하는 입장에서 편리한 서비스 인 것 같아요 아직 많은 기능들이 있지는 않지만 재무, 경영 지표 관리의 차원에서는 꼭 필요한 서비스 인 것 같습니다.',
			reBoxer: '노00 헬스케어 스타트업 이사',
			organization: '',
		},
	];

	const data3 = [
		{
			text1: '투자를 받을 예정이거나',
			text2: '받고 있는 창업가들',
			imgPath: '/images/main/mainCardImg1.png',
		},
		{
			text1: '초기 스타트업을',
			text2: '운영하는 대표님',
			imgPath: '/images/main/mainCardImg2.png',
		},
	];

	const data3_1 = [
		{
			text1: '직접 회사의 재무를',
			text2: '관리하는 소규모 창업가',
			imgPath: '/images/main/mainCardImg3.png',
		},
		{
			text1: '매출과 서비스에',
			text2: '고민이 있는 창업가',
			imgPath: '/images/main/mainCardImg4.png',
		},
	];

	const data4 = [
		{
			text1: '매번 복잡한 스프레드시트에',
			text2: '재무를 관리하는',
			target: '대표님',
		},
		{
			text1: 'IR, 지표, 월간보고에',
			text2: '시간 소모가 큰',
			target: '창업가',
		},
		{
			text1: '데이터 기반의 빠른 의사결정을',
			text2: '하고자 하는',
			target: '경영 전문가',
		},
	];

	const data1 = [
		{
			text1: 'IR 경험은 어디서 쌓아야 하나?',
			text2: '어떻게 진행되는 거지?',
		},
		{
			text1: '투자는 어떻게 받지?',
			text2: '대체 어떻게 해야',
			text3: '받을 수 있는거지?',
		},
		{
			text1: '내 사업을 성장시킬 방법도,',
			text2: '투자자를 만날 방법도 모르겠어',
		},
	];

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

	React.useEffect(() => {
		AOS.init();
	});

	return (
		<Grid container width={'100%'}>
			{/** 섹션 1 */}
			<Box
				sx={{
					p: { md: 5, xs: 5 },
					backgroundImage: `linear-gradient(to bottom, #ffffffa8 50%, #ffffff 100%),url(/images/main/mainImage.png)`,
					backgroundSize: 'cover',
				}}
				width={'100%'}
			>
				<Box display="flex" gap={2} flexDirection={'column'} m="auto">
					<Box
						textAlign={'center'}
						display="flex"
						gap={1.5}
						flexDirection={'column'}
						m="auto"
						pt={10}
						pb={15}
					>
						<img
							src={'/images/logo/Suppor-TFulllogo.svg'}
							alt="Logo"
							width={'145px'}
							height={'45px'}
							style={{
								cursor: 'pointer',
								marginLeft: 'auto',
								marginRight: 'auto',
								marginBottom: 20,
							}}
							onClick={() => router.push('/')}
						/>
						<Typography variant={'h3'}>
							고객님의 하나뿐인,
						</Typography>
						<Typography
							variant={'h3'}
							color="primary.main"
							fontWeight={600}
						>
							스타트업 성장 관리 솔루션
						</Typography>
						<Box display="flex" gap={0.5} textAlign={'center'}>
							<Typography mt="auto" mb="auto">
								서포티는 스타트업과
							</Typography>
							<Typography
								bgcolor={'primary.main'}
								p={'3px'}
								color={'common.white'}
							>
								함께 성장하는 동행자
							</Typography>
							<Typography mt="auto" mb="auto">
								입니다.
							</Typography>
						</Box>
					</Box>
				</Box>
			</Box>

			{/** 섹션 2 */}
			<Grid container justifyContent={'center'}>
				<Box pt={10} pb={10} width="70%">
					<Slider {...settings}>
						<Box display="flex">
							<Box mb={5}>
								<Typography fontWeight={600} mb={1}>
									법인계좌 연동으로 한눈에 보는
								</Typography>
								<Typography color="primary.main" variant="h3">
									RunWay BurnRate
								</Typography>
							</Box>
							<Box
								display={'flex'}
								mb={5}
								justifyContent={'center'}
								flexWrap={'wrap'}
								// sx={{
								// 	display: { xs: 'none', md: 'block' },
								// }}
							>
								<img
									src={'/images/main/runwayPC.png'}
									alt={'runwayPC'}
									width={'70%'}
								/>
								<img
									src={'/images/main/runwayMobile.png'}
									alt={'runwayMobile'}
									width={'6%'}
									style={{
										position: 'absolute',
										marginLeft: '10%',
										marginTop: '2%',
									}}
								/>
							</Box>
						</Box>
						<Box display="flex">
							<Box mb={5}>
								<Typography fontWeight={600} mb={1}>
									쉽고 편하게 관리하는
								</Typography>
								<Typography color="primary.main" variant="h3">
									OKR / KPI 성과지표
								</Typography>
							</Box>
							<Box
								display={'flex'}
								mb={5}
								justifyContent={'center'}
							>
								<img
									src={'/images/main/okrPC.png'}
									alt={'okrPC'}
									width={'70%'}
								/>
								<img
									src={'/images/main/okrMobile.png'}
									alt={'okrMobile'}
									width={'6%'}
									style={{
										position: 'absolute',
										marginLeft: '10%',
										marginTop: '2%',
									}}
								/>
							</Box>
						</Box>
					</Slider>
				</Box>
			</Grid>

			{/** 섹션 3 */}
			{
				<Box
					sx={{
						display: { xs: 'none', md: 'block' },
						width: '100%',
					}}
				>
					<Box width="100%" bgcolor={'primary.light'} pt={8} pb={8}>
						<Box display="flex" gap={20} justifyContent={'center'}>
							<img
								src={'/images/main/경영.png'}
								alt={'경영'}
								width={'145px'}
								height={'145px'}
							/>
							<img
								src={'/images/main/투자.png'}
								alt={'투자'}
								width={'145px'}
								height={'145px'}
							/>
						</Box>
						<Box
							display="flex"
							gap={10}
							height={'145px'}
							justifyContent={'center'}
						>
							<img
								src={'/images/main/변호사.png'}
								alt={'변호사'}
								width={'145px'}
								height={'145px'}
							/>
							<Box textAlign={'center'} mt="auto" mb="auto">
								<Typography variant="h5" fontWeight={'600'}>
									경영, 투자, 마케팅, 세무, 노무, 변호사 등
								</Typography>
								<Typography variant="h5" fontWeight={'600'}>
									다양한 분야에서의
								</Typography>
								<Box display="flex" gap={1}>
									<Typography
										variant="h5"
										color="primary.main"
										fontWeight={'600'}
									>
										세미나, 컨설팅, 멘토링, QA
									</Typography>
									<Typography variant="h5" fontWeight={'600'}>
										서비스 제공
									</Typography>
								</Box>
							</Box>
							<img
								src={'/images/main/세무.png'}
								alt={'세무'}
								width={'145px'}
								height={'145px'}
							/>
						</Box>
						<Box display="flex" gap={20} justifyContent={'center'}>
							<img
								src={'/images/main/마케팅.png'}
								alt={'마케팅'}
								width={'145px'}
								height={'145px'}
							/>
							<img
								src={'/images/main/노무.png'}
								alt={'노무'}
								width={'145px'}
								height={'145px'}
							/>
						</Box>
					</Box>
				</Box>
			}
			{
				<Box
					sx={{
						display: { md: 'none', xs: 'block' },
						width: '100%',
					}}
				>
					<Box width="100%" bgcolor={'primary.light'} pt={8} pb={8}>
						<Box textAlign={'center'} mt="auto" mb="auto">
							<Typography variant="h5" fontWeight={'600'}>
								경영, 투자, 마케팅, 세무, 노무, 변호사 등
							</Typography>
							<Typography variant="h5" fontWeight={'600'}>
								다양한 분야에서의
							</Typography>
							<Box
								display="flex"
								gap={1}
								width="100%"
								justifyContent={'center'}
							>
								<Typography
									variant="h5"
									color="primary.main"
									fontWeight={'600'}
								>
									세미나, 컨설팅, 멘토링, QA
								</Typography>
								<Typography variant="h5" fontWeight={'600'}>
									서비스 제공
								</Typography>
							</Box>
						</Box>
					</Box>
				</Box>
			}

			{/** 섹션 4 */}
			<Box width="100%" pb={8}>
				<Box ml="auto" mr="auto" mt={20} mb={20}>
					<Box
						display={'flex'}
						flexWrap={'wrap'}
						gap={4}
						justifyContent={'center'}
					>
						{data1.map((item, index) => {
							return (
								<Box
									p={3.5}
									borderRadius={4}
									width={'280px'}
									height={'160px'}
									boxShadow={
										'rgb(213, 212, 239) 0px 4px 20px'
									}
									textAlign={'center'}
									key={index}
								>
									<Typography
										color={'primary.main'}
										fontWeight={'600'}
									>
										PROBLEM{' ' + (index + 1)}
									</Typography>
									<Box mt={2.5} textAlign={'center'}>
										<Typography
											variant={'h5'}
											fontWeight={'500'}
										>
											{item.text1}
										</Typography>
										<Typography
											variant={'h5'}
											fontWeight={'500'}
										>
											{item.text2}
										</Typography>
										<Typography
											variant={'h5'}
											fontWeight={'500'}
										>
											{item.text3}
										</Typography>
									</Box>
								</Box>
							);
						})}
					</Box>
				</Box>
				<Box width="100px" ml="auto" mr="auto">
					<Typography
						color="secondary.main"
						fontWeight={600}
						variant="h1"
						marginBottom={'-100px'}
						marginTop={'-100px'}
					>
						SOLVE
					</Typography>
					<img
						src={'/images/main/arrow.png'}
						alt="Logo"
						width={'90px'}
						height={'130px'}
					/>
				</Box>
				<Box
					bgcolor={'primary.main'}
					py={1.5}
					textAlign={'center'}
					mt={3}
				>
					<Typography
						fontWeight={600}
						variant="h3"
						color="common.white"
					>
						Private IR 진행과 데모데이 개최
					</Typography>
				</Box>
			</Box>

			{/** 섹션 5 */}
			<Box
				textAlign={'center'}
				display="flex"
				gap={2}
				flexDirection={'column'}
				m="auto"
				pt={10}
				pb={10}
				width={'100%'}
			>
				<Typography variant="h3" fontWeight={'400'}>
					서포티의 파트너가 제공하는
				</Typography>
				<Typography variant="h3">
					혜택 제공 & 파트너사 서비스 할인 제공
				</Typography>
				<Box display="flex" gap={'5%'} mt={5} mb={5}>
					{data.map((item, index) => {
						return (
							<img
								src={item.srcPath}
								alt={item.alt}
								width={'145px'}
								height={'45px'}
							/>
						);
					})}
				</Box>
				<SupportiButton
					contents={'파트너스 페이지 이동'}
					variant="contained"
					onClick={() => router.push('/partners')}
					style={{
						width: '200px',
						marginRight: 'auto',
						marginLeft: 'auto',
					}}
				/>
			</Box>

			{/** 섹션 6 */}

			<Box
				width="100%"
				bgcolor={'#16263D'}
				justifyContent={'center'}
				textAlign={'center'}
				display={'flex'}
				flexDirection={'column'}
			>
				<Box
					m="auto"
					gap={1}
					display={'flex'}
					flexDirection={'column'}
					justifyContent={'center'}
					pt={14}
					pb={10}
				>
					<Box gap={4} display={'flex'}>
						<Box>
							<img
								src={'/images/main/커피챗종.png'}
								alt={'종'}
								width={'150px'}
								height={'150px'}
								style={{
									marginLeft: 'auto',
									marginRight: 'auto',
									marginBottom: '15px',
								}}
							/>
							<Typography color="common.white">
								커피챗 알람
							</Typography>
						</Box>
						<EastIcon
							sx={{
								color: 'common.white',
								mt: 'auto',
								mb: 'auto',
							}}
						/>
						<Box>
							<img
								src={'/images/main/커피챗손.png'}
								alt={'손'}
								width={'150px'}
								height={'150px'}
								style={{
									marginLeft: 'auto',
									marginRight: 'auto',
									marginBottom: '15px',
								}}
							/>
							<Typography color="common.white">
								상호 승인 시 커피챗 매칭
							</Typography>
						</Box>
						<EastIcon
							sx={{
								color: 'common.white',
								mt: 'auto',
								mb: 'auto',
							}}
						/>
						<Box>
							<img
								src={'/images/main/커피챗.png'}
								alt={'커피챗'}
								width={'140px'}
								height={'140px'}
								style={{
									marginLeft: 'auto',
									marginRight: 'auto',
									marginBottom: '15px',
								}}
							/>
							<Typography color="common.white">커피챗</Typography>
						</Box>
					</Box>

					<Typography color="common.white" mt={7}>
						매월 만나고 싶은 사람을 1명씩 ! 무료로 이용 가능!
					</Typography>
					<Box
						display="flex"
						textAlign={'center'}
						gap={0.5}
						justifyContent={'center'}
					>
						<Typography color="info.main" variant="h5">
							상시
						</Typography>
						<Typography color="common.white" mt="auto" mb="auto">
							진행
						</Typography>
					</Box>
				</Box>
			</Box>

			{/** 섹션 7 */}
			<Box
				width="100%"
				justifyContent={'center'}
				pt={10}
				display={'flex'}
				flexDirection={'column'}
				bgcolor={'primary.main'}
				pb={10}
			>
				<Box
					textAlign={'center'}
					m="auto"
					display="flex"
					gap={4}
					flexDirection={'column'}
					justifyContent={'center'}
				>
					<Box
						display="flex"
						gap={2}
						flexWrap={'wrap'}
						justifyContent={'center'}
					>
						<Box>
							<Box
								width={'350px'}
								height="200px"
								borderRadius={'20px'}
								bgcolor={'primary.main'}
								sx={{
									background: '#F8F8F833',
								}}
								zIndex={3}
								textAlign={'left'}
								p={4}
							>
								<Typography color="info.main" mb={3}>
									최00 AI 스타트업 대표
								</Typography>
								<Typography
									color="common.white"
									lineHeight={'20px'}
								>
									초기 스타트업이다 보니 여러 가지 신경 써야
									할 것이 많은데 재무와 경영 지표 관리에
									대해서만큼은 큰 신경을 안 써도 되어
									좋습니다.
								</Typography>
							</Box>
							<Box
								sx={{
									width: '15px',
									height: '15px',
									rotate: '90deg',
									position: 'absolute',
									marginLeft: '280px',
									// marginTop: '-10px',
									// bgcolor: 'primary.main',
									opacity: 0.2,
									zIndex: 2,
									borderBottom: '10px solid transparent',
									borderTop: '10px solid transparent',
									borderLeft: '10px solid #F8F8F8',
									borderRight: '10px solid transparent',
								}}
							/>
						</Box>
						<Box>
							<Box
								width={'350px'}
								height="200px"
								borderRadius={'20px'}
								bgcolor={'primary.main'}
								sx={{
									background: '#F8F8F833',
								}}
								zIndex={3}
								textAlign={'left'}
								p={4}
							>
								<Typography color="info.main" mb={3}>
									홍00 커머스 스타트업 대표
								</Typography>
								<Typography
									color="common.white"
									lineHeight={'20px'}
								>
									아는 대표님의 추천으로 써봤는데 실제로 쓰는
									과정이 간편하다 보니 사용하기 편리합니다.
									저희는 아무래도 인원이 있다 보니 모든 인원이
									지표를 보고 써야 해서 지표 관리가 무엇보다
									중요한데 서포티를 쓰니 일이 1/3로 줄었어요!
								</Typography>
							</Box>
							<Box
								sx={{
									width: '15px',
									height: '15px',
									rotate: '90deg',
									position: 'absolute',
									marginLeft: '280px',
									// marginTop: '-10px',
									// bgcolor: 'primary.main',
									opacity: 0.2,
									zIndex: 2,
									borderBottom: '10px solid transparent',
									borderTop: '10px solid transparent',
									borderLeft: '10px solid #F8F8F8',
									borderRight: '10px solid transparent',
								}}
							/>
						</Box>
					</Box>
					<Box
						display="flex"
						gap={2}
						flexWrap={'wrap'}
						justifyContent={'center'}
					>
						<Box>
							<Box
								width={'350px'}
								height="200px"
								borderRadius={'20px'}
								bgcolor={'primary.main'}
								sx={{
									background: '#F8F8F833',
								}}
								zIndex={3}
								textAlign={'left'}
								p={4}
							>
								<Typography color="info.main" mb={3}>
									김00 SaaS 스타트업 대표
								</Typography>
								<Typography
									color="common.white"
									lineHeight={'20px'}
								>
									초기 스타트업에 딱 필요한 서비스인 것
									같습니다. 실제 여러 데이터를 비교할 수 있고
									지표를 한눈에 볼 수 있어 편리합니다.
									무엇보다 투자사에게 바로 링크를 공유해
									전달드릴 수 있으니 시간이 많이 단축되었어요!
								</Typography>
							</Box>
							<Box
								sx={{
									width: '15px',
									height: '15px',
									rotate: '90deg',
									position: 'absolute',
									marginLeft: '280px',
									opacity: 0.2,
									zIndex: 2,
									borderBottom: '10px solid transparent',
									borderTop: '10px solid transparent',
									borderLeft: '10px solid #F8F8F8',
									borderRight: '10px solid transparent',
								}}
							/>
						</Box>
						<Box>
							<Box
								width={'350px'}
								height="200px"
								borderRadius={'20px'}
								bgcolor={'primary.main'}
								sx={{
									background: '#F8F8F833',
								}}
								zIndex={3}
								textAlign={'left'}
								p={4}
							>
								<Typography color="info.main" mb={3}>
									노00 헬스케어 스타트업 이사
								</Typography>
								<Typography
									color="common.white"
									lineHeight={'20px'}
								>
									초기 스타트업에서 실무를 총괄하는 입장에서
									편리한 서비스인 것 같아요. 아직 많은
									기능들이 있지는 않지만 재무, 경영 지표
									관리의 차원에서는 꼭 필요한 서비스인 것
									같습니다.
								</Typography>
							</Box>
							<Box
								sx={{
									width: '15px',
									height: '15px',
									rotate: '90deg',
									position: 'absolute',
									marginLeft: '280px',
									opacity: 0.2,
									zIndex: 2,
									borderBottom: '10px solid transparent',
									borderTop: '10px solid transparent',
									borderLeft: '10px solid #F8F8F8',
									borderRight: '10px solid transparent',
								}}
							/>
						</Box>
					</Box>
				</Box>
			</Box>

			{/* <Grid container>
				<Box
					display="flex"
					gap={10}
					ml="auto"
					mr="auto"
					flexWrap={'wrap'}
				>
					<Box
						textAlign={'left'}
						display={'flex'}
						flexDirection={'column'}
						gap={2}
						mt="70px"
					>
						<Typography variant={'h1'} fontWeight={'700'}>
							창업가를 위한
							<br />
							경영 관리 솔루션
						</Typography>
						<Typography variant={'subtitle1'} fontWeight={'500'}>
							데이터 대시보드 기반 솔루션 플랫폼, 서포티
						</Typography>
						{memberId ? (
							<SupportiButton
								contents="내 대시보드 보러가기"
								onClick={() => {
									router.push(
										'/internal_service/financial_solution/account_manage'
									);
								}}
								variant="contained"
								style={{
									width: '200px',
									marginTop: '50px',
								}}
							/>
						) : (
							<SupportiButton
								contents="무료로 시작하기"
								onClick={() => {
									router.push('/auth/sign_in');
								}}
								variant="contained"
								style={{
									width: '200px',
									marginTop: '50px',
								}}
							/>
						)}
					</Box>

					<Box
						sx={{
							width: { xs: '380px', md: '650px' },
							height: { xs: '300px', md: '480px' },
						}}
					>
						<img
							src="/images/main/mainTitle.png"
							alt="img"
							style={{
								marginTop: 'auto',
								marginBottom: 'auto',
								width: 'inherit',
								height: 'inherit',
							}}
						/>
					</Box>
				</Box>
			</Grid> */}

			{/* <Grid
				item
				xs={12}
				bgcolor={'#3C52BB'}
				borderRadius={4}
				sx={{
					p: { md: 15, xs: 5 },
				}}
				p={15}
			>
				<Grid container>
					<Box
						display="flex"
						gap={10}
						ml="auto"
						mr="auto"
						flexWrap={'wrap'}
					>
						<Box>
							<Box
								textAlign={'left'}
								display={'flex'}
								flexDirection={'column'}
								gap={0.5}
								p={5}
								sx={{ width: { md: '350px', xs: '350px' } }}
							>
								<Typography
									color={'white'}
									variant={'h5'}
									fontWeight={'600'}
								>
									법인계좌 연동으로 재무 관리부터
								</Typography>
								<Typography
									color={'white'}
									variant={'h5'}
									fontWeight={'500'}
								>
									우리회사 성과 지표 까지 한번에!
								</Typography>
								<Typography
									color={'white'}
									variant={'h5'}
									fontWeight={'400'}
								>
									쉬운 사업 관리
								</Typography>
								<Typography
									color={'white'}
									variant={'h5'}
									fontWeight={'400'}
								>
									서포티로 시작하세요.
								</Typography>
							</Box>
						</Box>
						<Box>
							<video
								src={'/videos/시연영상.mp4'}
								id="vid"
								muted={true}
								autoPlay={false}
								controls
								style={{ width: '300px', height: '200px' }}
							/>
						</Box>
					</Box>
				</Grid>
			</Grid> */}

			{/* <Box
				textAlign={'center'}
				mt={10}
				display={'flex'}
				flexDirection={'column'}
				ml="auto"
				mr="auto"
				sx={{
					gap: { md: 10, xs: 5 },
					p: { md: 10, xs: 0 },
				}}
			> */}
			{/* <Box justifyContent={'center'}>
					<Typography
						variant={'h4'}
						fontWeight={'600'}
						lineHeight={1.5}
					>
						세상의 어떤 대표님이든
					</Typography>
					<Typography
						variant={'h4'}
						fontWeight={'600'}
						lineHeight={1.5}
					>
						시작하는 사업자와 성장하는 사업자 모두에게 알맞은
						솔루션을 제공합니다.
					</Typography>
				</Box> */}

			{/* <Box
					ml="auto"
					mr="auto"
					display="flex"
					sx={{ gap: { md: 5, xs: 1 } }}
				>
					{data3.map((item, index) => {
						return (
							<Box key={index}>
								<Box
									sx={{
										width: { md: '350px', xs: '180px' },
										height: {
											md: '330px',
											xs: '170px',
										},
									}}
									mt={5}
									ml={'auto'}
									mr={'auto'}
								>
									<Box
										position={'absolute'}
										bgcolor={'rgba(0, 0, 0, 0.7)'}
										width={'inherit'}
										height={'inherit'}
										sx={{
											pt: {
												md: '140px',
												xs: '50px',
											},
											borderRadius: {
												md: 5,
												xs: 3,
											},
										}}
									>
										<Typography
											color={'white'}
											variant={'h5'}
										>
											{item.text1}
										</Typography>
										<Typography
											color={'white'}
											variant={'h5'}
											lineHeight={2}
										>
											{item.text2}
										</Typography>
									</Box>
									<img
										alt="img"
										src={item.imgPath}
										style={{
											width: 'inherit',
											height: 'inherit',
										}}
									/>
								</Box>
							</Box>
						);
					})}
				</Box> */}

			{/* <Box
					ml="auto"
					mr="auto"
					display="flex"
					sx={{ gap: { md: 5, xs: 1 } }}
				>
					{data3_1.map((item, index) => {
						return (
							<Box key={index}>
								<Box
									sx={{
										width: { md: '350px', xs: '180px' },
										height: {
											md: '330px',
											xs: '160px',
										},
									}}
									ml={'auto'}
									mr={'auto'}
								>
									<Box
										position={'absolute'}
										bgcolor={'rgba(0, 0, 0, 0.7)'}
										width={'inherit'}
										height={'inherit'}
										sx={{
											pt: {
												md: '140px',
												xs: '50px',
											},
											borderRadius: {
												md: 5,
												xs: 3,
											},
										}}
									>
										<Typography
											color={'white'}
											variant={'h5'}
										>
											{item.text1}
										</Typography>
										<Typography
											color={'white'}
											variant={'h5'}
											lineHeight={2}
										>
											{item.text2}
										</Typography>
									</Box>
									<img
										alt="img"
										src={item.imgPath}
										style={{
											width: 'inherit',
											height: 'inherit',
										}}
									/>
								</Box>
							</Box>
						);
					})}
				</Box> */}

			{/* <Grid container>
					<Box ml="auto" mr="auto" mt={20} mb={20}>
						<Box
							display={'flex'}
							flexWrap={'wrap'}
							gap={4}
							justifyContent={'center'}
						>
							{data4.map((item, index) => {
								return (
									<Box
										p={3}
										borderRadius={4}
										width={'300px'}
										boxShadow={
											'rgb(213, 212, 239) 0px 4px 30px'
										}
									>
										<Typography
											color={'#BAC7FB'}
											fontWeight={'500'}
										>
											PROBLEM
										</Typography>
										<Box mt={2} mb={2}>
											<Typography
												variant={'h5'}
												fontWeight={'400'}
											>
												{item.text1}
											</Typography>
											<Box
												display={'flex'}
												justifyContent={'center'}
											>
												<Typography
													variant={'h5'}
													fontWeight={'400'}
												>
													{item.text2}
												</Typography>
												<Typography
													variant={'h5'}
													fontWeight={'400'}
													color={'#3C52BB'}
													pl={0.5}
												>
													{item.target}
												</Typography>
											</Box>
										</Box>
									</Box>
								);
							})}
						</Box>
					</Box>
				</Grid> */}
			{/* </Box> */}

			{/* <Box
				display={'flex'}
				gap={4}
				flex={'wrap'}
				sx={{
					p: { md: 15, xs: 5 },
				}}
				bgcolor={'rgb(245, 247, 255)'}
				width={'100%'}
			>
				<Box textAlign={'center'} ml="auto" mr="auto">
					<Typography variant={'h2'} fontWeight={'700'}>
						내 사업 현황을 한 눈에 확인할 수 있는
					</Typography>
					<Typography
						variant={'h2'}
						fontWeight={'700'}
						color={'#3C52BB'}
						lineHeight={2}
					>
						서포티만의 대시보드 솔루션
					</Typography>
				</Box>
			</Box> */}

			{/* <Box ml="auto" mr="auto" pt={20} width="100%">
				<Box display="flex" flexWrap={'wrap'} justifyContent={'center'}>
					<Box
						height={'450px'}
						mt={5}
						sx={{ width: { md: '600px', xs: '450px' } }}
						width="600px"
					>
						<Box textAlign={'center'}>
							<Box
								data-aos="fade-up"
								data-aos-delay="100"
								data-aos-duration="3000"
							>
								<img
									alt="img"
									src={'/images/main/financeNum0.svg'}
									style={{
										width: '350px',
										zIndex: 100,
									}}
								/>
								<Box
									data-aos="fade-up"
									data-aos-delay="100"
									data-aos-duration="3000"
									style={{
										zIndex: -100,
										marginLeft: 200,
										marginTop: -310,
									}}
								>
									<img
										alt="img"
										src={'/images/main/financeNum2.svg'}
										style={{
											width: '250px',
											zIndex: 100,
										}}
									/>
								</Box>
								<Box
									data-aos="fade-right"
									data-aos-delay="100"
									data-aos-duration="2000"
									style={{
										width: '290px',
										marginLeft: -40,
										marginTop: -40,
									}}
								>
									<img
										alt="img"
										src={'/images/main/financeNum1.svg'}
										style={{
											width: '250px',
											zIndex: 100,
										}}
									/>
								</Box>
								<Box
									data-aos="fade-up"
									data-aos-delay="100"
									data-aos-duration="2000"
									style={{
										marginLeft: '80px',
										marginTop: '10px',
									}}
								>
									<img
										alt="img"
										src={'/images/main/financeNum3.svg'}
										style={{
											width: '250px',
											zIndex: 100,
										}}
									/>
								</Box>
							</Box>
						</Box>
					</Box>
					<Box p={4}>
						<Typography variant={'h1'} lineHeight={3}>
							재무 솔루션
						</Typography>
						<Typography variant={'subtitle1'} lineHeight={2}>
							지표를 바탕으로 효과적인 전략을 수립하고 데이터를
						</Typography>
						<Typography variant={'subtitle1'} lineHeight={2}>
							가시적으로 확인하여 회사의 재무 상황을 한눈에
							파악해보세요.
						</Typography>
						<SupportiButton
							contents={'재무 솔루션 자세히보기'}
							onClick={() => setOpen(!open)}
							style={{
								border: '1px solid #3C52BB',
								marginTop: 4,
							}}
						/>
					</Box>
				</Box>
			</Box> */}
			{/* <Box width="100%">
				{open ? (
					<Grid
						textAlign={'center'}
						sx={{
							p: { md: 15, xs: 5 },
						}}
						bgcolor={'#3C52BB'}
						mt={10}
						mb={10}
					>
						<Typography
							fontWeight={'600'}
							variant={'h2'}
							color={'white'}
						>
							재무 솔루션 서비스 이용안내
						</Typography>
						<Grid
							borderRadius={4}
							sx={{
								p: { md: 15, xs: 5 },
							}}
							bgcolor={'white'}
							mt={5}
							mb={5}
							ml={'auto'}
							mr={'auto'}
							gap={10}
							display={'flex'}
							flexWrap={'wrap'}
							justifyContent={'space-around'}
						>
							<Box textAlign={'left'} mt={'auto'} mb={'auto'}>
								<Typography
									variant={'h4'}
									fontWeight={'700'}
									mb={5}
								>
									한눈에 보는 BurnRate와 Runway
								</Typography>
								<Typography>
									BurnRate와 RunWay 외 달별 지출, 달별 수입
									까지 한눈에 확인 해보세요.
								</Typography>
							</Box>
							<img
								alt="img"
								src={'/images/main/finance.png'}
								style={{
									width: '500px',
									height: '250px',
									zIndex: 100,
								}}
							/>
						</Grid>
					</Grid>
				) : (
					<Box></Box>
				)}
			</Box> */}

			{/* <Box display={'flex'} gap={5} ml="auto" mr="auto" mt={20} mb={20}>
				<Box
					textAlign={'center'}
					display={'flex'}
					flexDirection={'column'}
					gap={4}
				>
					<Box
						data-aos="fade-right"
						data-aos-delay="100"
						data-aos-duration="3000"
					>
						<Box
							display={'flex'}
							flexWrap={'wrap'}
							gap={5}
							justifyContent={'center'}
						>
							{data2.map((item, index) => {
								if (index < 2) {
									return (
										<Box>
											<Box
												key={index}
												boxShadow={
													'rgb(213, 212, 239) 0px 4px 30px'
												}
												p={3}
												borderRadius={5}
												sx={{
													width: {
														md: '280px',
														xs: '270px',
													},
													height: {
														md: '280px',
														xs: '270px',
													},
												}}
												ml={'auto'}
												mr={'auto'}
											>
												<Typography
													fontWeight={'600'}
													variant={'h5'}
													mb={3}
												>
													{item.reBoxer}
												</Typography>
												<Typography
													lineHeight={'25px'}
													variant="subtitle2"
												>
													{item.reBoxTypography}
												</Typography>
											</Box>
										</Box>
									);
								}
							})}
						</Box>
					</Box>
					<Box
						data-aos="fade-left"
						data-aos-delay="100"
						data-aos-duration="3000"
					>
						<Box
							display={'flex'}
							flexWrap={'wrap'}
							gap={5}
							justifyContent={'center'}
						>
							{data2.map((item, index) => {
								if (index > 1) {
									return (
										<Box>
											<Box
												key={index}
												boxShadow={
													'rgb(213, 212, 239) 0px 4px 30px'
												}
												borderRadius={5}
												p={3}
												sx={{
													width: {
														md: '280px',
														xs: '270px',
													},
													height: {
														md: '280px',
														xs: '270px',
													},
												}}
												ml={'auto'}
												mr={'auto'}
											>
												<Typography
													fontWeight={'600'}
													variant={'h5'}
													mb={3}
												>
													{item.reBoxer}
												</Typography>
												<Typography
													lineHeight={'25px'}
													variant="subtitle2"
												>
													{item.reBoxTypography}
												</Typography>
											</Box>
										</Box>
									);
								}
							})}
						</Box>
					</Box>
				</Box>
			</Box> */}

			<Grid item xs={12}>
				<Box
					textAlign={'center'}
					position="absolute"
					bgcolor={'rgba(0, 0, 0, 0.7)'}
					width={'100%'}
					height={'400px'}
					display={'flex'}
					flexDirection={'column'}
					gap={2}
					sx={{ p: { md: 15, xs: 5 } }}
					justifyContent={'center'}
				>
					<Typography color={'white'} variant="h4" fontWeight={'500'}>
						여러분의 사업을 편리하게 관리하세요
					</Typography>
					<Typography color={'white'} variant="subtitle1">
						서포티에서 최적의 솔루션을 제안합니다.
					</Typography>
					<SupportiButton
						contents="무료로 시작하기"
						onClick={() => {
							if (!memberId) {
								router.push('/auth/sign_in');
							} else {
								router.push(
									'/internal_service/financial_solution/account_manage'
								);
							}
						}}
						variant="contained"
						style={{
							width: '200px',
							marginLeft: 'auto',
							marginRight: 'auto',
						}}
					/>
				</Box>
				<img
					style={{ zIndex: -100, width: '100%', height: '400px' }}
					src={'/images/main/mainBackgroundImg.jpg'}
					alt="img"
				/>
			</Grid>
		</Grid>
	);
};

export default Page;
