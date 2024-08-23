import { NextPage } from 'next';
import React, { useEffect } from 'react';

import { Box, Divider, Grid, IconButton, Typography } from '@mui/material';
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

import SupportiButton from '../../src/views/global/SupportiButton';
import PopUpModal from '../../src/views/local/common/PopUpModal/PopUpModal';
import SupportiInput from '../../src/views/global/SupportiInput';

const Page: NextPage = () => {
	const partnerShipInquiryController = new DefaultController(
		'PartnerShipInquiry'
	);

	const containerRef = React.useRef<HTMLDivElement>(null);

	const [openPopUp, setOpenPopUp] = React.useState(false);
	const [name, setName] = React.useState('');
	const [email, setEmail] = React.useState('');
	const [phoneNumber, setPhoneNumber] = React.useState('');

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

	const data1 = [
		{
			text1: 'I seek direct assistance and connections.',
		},
		{
			text1: 'I am looking for integrated services.',
		},
		{
			text1: 'I need funding.',
		},
	];

	const data2 = [
		{
			text1: 'Data Collection ',
			text2: 'and Analysis',
		},
		{
			text1: 'Stage-Specific',
			text2: 'Tracking Classification',
		},
		{
			text1: 'Integrated Growth',
			text2: 'Support Services',
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
				sx={{
					backgroundImage: `url(/images/main/container.jpg)`,
					backgroundSize: 'cover',
				}}
				width={'100%'}
				height={'100vh'}
			>
				{/* 메인 이미지 섹션 */}
				{/* <img
				src="/images/main/container.jpg"
				width={'100%'}
				height={'100%'}
			/> */}
				{/* 메인 이미지 텍스트 섹션 */}
				<Box
					top={'50%'}
					position={'absolute'}
					width={'100%'}
					left={'auto'}
					textAlign={'center'}
					display={'flex'}
					flexDirection={'column'}
				>
					<Typography
						variant={'h2'}
						fontWeight={'400'}
						color={'white'}
						sx={{
							display: 'inline',
							bgcolor: 'rgba(0, 0, 255, 0.7)',
							padding: '5px 20px',
						}}
					>
						"Turning your business dreams into reality."
					</Typography>
					<Typography
						variant={'h3'}
						fontWeight={'400'}
						color={'white'}
						mt={2}
						lineHeight={'1.5'}
					>
						Supporti: The Essential Marketplace for Startups.
						<br /> We're your committed partner, growing alongside
						you
					</Typography>
				</Box>
			</Box>

			{/* Problem 섹션 */}
			<Box
				width={'100%'}
				mt={5}
				mb={5}
				display={'flex'}
				flexDirection={'column'}
				p={5}
				justifyContent={'center'}
				alignItems={'center'}
			>
				<img
					src="/images/main/en/graph.png"
					alt="image"
					width={'45%'}
					height={200}
				/>
				<Box
					display={'flex'}
					p={5}
					flexDirection={'column'}
					alignSelf={'center'}
					textAlign={'center'}
				>
					<Typography variant="h2" fontWeight={400} lineHeight={1.5}>
						"Out of every three startups, one closes within the
						first year, and 66% shut down within five years.
						<br />
						Fundamental solutions lie in supporting 'growth' and
						'financing'.”
					</Typography>
				</Box>
			</Box>
			{/* Problem 섹션2 */}
			<Box
				width={'100%'}
				mt={5}
				mb={5}
				display={'flex'}
				flexDirection={{
					xs: 'column',
					sm: 'row',
				}}
				bgcolor={'primary.light'}
				alignItems={'center'}
				justifyContent={'space-between'}
				py={5}
				px={{
					xs: 5,
					sm: 20,
				}}
			>
				<Box display={'flex'} flexDirection={'column'}>
					<img
						src="/images/main/en/graph2.png"
						alt="image"
						width={700}
						height={600}
					/>
				</Box>
				<Box display={'flex'} flexDirection={'column'} gap={3}>
					{data1.map((item, index) => {
						return (
							<Box
								p={3.5}
								display={'flex'}
								flexDirection={'column'}
								borderRadius={4}
								boxShadow={'rgb(213, 212, 239) 0px 4px 20px'}
								key={index}
							>
								<Typography variant={'h5'} fontWeight={'500'}>
									{item.text1}
								</Typography>
							</Box>
						);
					})}
				</Box>
			</Box>
			{/* 보유 기술 섹션 */}
			<Box ml="auto" mr="auto" mt={10} mb={20} flexDirection={'column'}>
				<Typography
					variant="h3"
					fontWeight={'400'}
					color={'primary.main'}
					sx={{
						mb: 5,
					}}
				>
					An 'SUPPOR-T Service' is crucial to solve the core issues of
					startups, such as growth and financing.
				</Typography>
				<Box
					display={'flex'}
					flexWrap={'wrap'}
					gap={4}
					justifyContent={'center'}
				>
					{data2.map((item, index) => {
						return (
							<Box
								p={3.5}
								borderRadius={4}
								width={'280px'}
								height={'160px'}
								boxShadow={'rgb(213, 212, 239) 0px 4px 20px'}
								textAlign={'center'}
								key={index}
							>
								<Typography
									color={'primary.main'}
									fontWeight={'600'}
								>
									SOLUTION
									{' ' + (index + 1)}
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
								</Box>
							</Box>
						);
					})}
				</Box>
			</Box>
			<Divider
				sx={{
					width: '90%',
					ml: 'auto',
					mr: 'auto',
					color: 'secondary.dark',
				}}
			/>

			{/* 파트너스 소개 섹션 */}
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
				<Box
					display="flex"
					justifyContent="center"
					alignContent="center"
				>
					<IconButton
						onClick={() => {
							containerRef?.current?.scrollBy({
								left: -300,
								behavior: 'smooth',
							});
						}}
					>
						<KeyboardArrowLeftIcon />
					</IconButton>
					<Box
						ref={containerRef}
						style={{
							paddingBottom: 42,
							paddingTop: 30,
							overflowX: 'auto',
						}}
						sx={{
							'&::-webkit-scrollbar': {
								display: 'none',
							},
						}}
					>
						<Box
							display="flex"
							gap={'15%'}
							mt={5}
							mb={5}
							ml={5}
							maxWidth={'60vw'}
						>
							{data.map((item, index) => {
								return (
									<img
										src={item.srcPath}
										alt={item.alt}
										width={'300px'}
										height={'60px'}
									/>
								);
							})}
						</Box>
					</Box>
					<IconButton
						onClick={() => {
							containerRef?.current?.scrollBy({
								left: 300,
								behavior: 'smooth',
							});
						}}
					>
						<KeyboardArrowRightIcon />
					</IconButton>
				</Box>

				{/* 연혁 섹션 */}
				<Box display="flex">
					<img
						src="/images/main/history_en.svg"
						width={'100%'}
						height={'100%'}
						style={{
							paddingLeft: '8%',
						}}
					/>
				</Box>
			</Box>
		</Box>
	);
};

export default Page;
