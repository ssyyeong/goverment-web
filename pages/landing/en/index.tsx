import { NextPage } from 'next';
import React, { useEffect } from 'react';

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
						variant={'h1'}
						fontWeight={'400'}
						color={'white'}
						sx={{
							bgcolor: 'rgba(0, 0, 255, 0.7)',
							display: 'inline',
							padding: '5px 20px',
						}}
					>
						It makes your company’s dream come true
					</Typography>
					<Typography
						variant={'h2'}
						fontWeight={'400'}
						color={'white'}
						mt={1}
					>
						Your One and Only,
					</Typography>
					<Typography variant={'h1'} color={'white'} mt={1}>
						Startup Growth Management Solution
					</Typography>
					<Typography
						variant={'h2'}
						fontWeight={'400'}
						color={'white'}
						mt={1}
					>
						Suppor-T is a companion for startups
					</Typography>
					<Typography
						variant={'h2'}
						fontWeight={'400'}
						color={'white'}
						mt={1}
					>
						to grow together.
					</Typography>
				</Box>
			</Box>

			{/* BurnRate 섹션 */}
			<Grid
				container
				justifyContent={'center'}
				display="flex"
				flexWrap={'wrap'}
			>
				<Box
					pt={5}
					pb={10}
					display="flex"
					width="70%"
					flexDirection={'column'}
					flexWrap={'wrap'}
				>
					<Box mb={5}>
						<Typography variant="h5" fontWeight={600} mb={1}>
							View at a glance by linking corporate account
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
					>
						<img
							src={'/images/main/runwayPC.png'}
							alt={'runwayPC'}
							width={'70%'}
						/>
						<img
							src={'/images/main/runwayMobile.png'}
							alt={'runwayMobile'}
							width={'20%'}
							style={{
								position: 'absolute',
								right: '20%',
								top: '130%',
							}}
						/>
					</Box>
				</Box>
			</Grid>
			{/* 제공하는 서비스 소개 섹션 */}
			<Box
				display="flex"
				flexDirection={'column'}
				py={10}
				mx={5}
				my={5}
				borderTop={'2px solid #f2f6ff'}
				justifyContent={'center'}
				alignItems={'center'}
			>
				<img
					src="/images/main/graph.jpg"
					width={'40%'}
					height={'100%'}
					style={{
						padding: '1%',
						alignSelf: 'center',
					}}
				/>
				<Box
					display="flex"
					flexDirection={'column'}
					justifyContent={'center'}
					gap={5}
					alignItems={'center'}
					mt={5}
				>
					<Box
						display="flex"
						mb={3}
						flexDirection={{ xs: 'column', md: 'row' }}
						justifyContent={'center'}
						gap={5}
					>
						<Box display={'flex'} flexDirection={'row'} mx={5}>
							<AutoGraphIcon
								sx={{
									color: 'primary.main',
									fontSize: '30px',
									marginRight: '20px',
									marginTop: '20px',
								}}
							/>
							<Box
								border={'1px solid'}
								borderColor={'primary.main'}
								alignContent={'center'}
								textAlign={'center'}
								height={'80px'}
								width={'280px'}
							>
								<Typography variant="h4" fontWeight={'400'}>
									Efficient Metric Management
								</Typography>
							</Box>
						</Box>
						<Box display="flex" flexDirection={'row'} mx={5}>
							<ApartmentTwoToneIcon
								sx={{
									color: 'primary.main',
									fontSize: '30px',
									marginRight: '20px',
									marginTop: '20px',
								}}
							/>
							<Box
								border={'1px solid'}
								borderColor={'primary.main'}
								alignContent={'center'}
								textAlign={'center'}
								height={'80px'}
								width={'280px'}
							>
								<Typography variant="h4" fontWeight={'400'}>
									IR Coaching
								</Typography>
								<Typography variant="h4" fontWeight={'400'}>
									by Investment Evaluation Professionals
								</Typography>
							</Box>
						</Box>
					</Box>
					<Box
						display="flex"
						mb={3}
						flexDirection={{ xs: 'column', md: 'row' }}
						justifyContent={'center'}
						gap={5}
					>
						<Box display="flex" flexDirection={'row'} mx={5}>
							<MessageTwoToneIcon
								sx={{
									color: 'primary.main',
									fontSize: '30px',
									marginRight: '20px',
									marginTop: '20px',
								}}
							/>
							<Box
								border={'1px solid'}
								borderColor={'primary.main'}
								alignContent={'center'}
								textAlign={'center'}
								height={'80px'}
								width={'280px'}
							>
								<Typography variant="h4" fontWeight={'400'}>
									Mentorship from Experts in Various Fields
								</Typography>
							</Box>
						</Box>
						<Box display="flex" flexDirection={'row'} mx={5}>
							<HandshakeTwoToneIcon
								sx={{
									color: 'primary.main',
									fontSize: '30px',
									marginRight: '20px',
									marginTop: '20px',
								}}
							/>
							<Box
								border={'1px solid'}
								borderColor={'primary.main'}
								alignContent={'center'}
								textAlign={'center'}
								height={'80px'}
								width={'280px'}
							>
								<Typography variant="h4" fontWeight={'400'}>
									Diverse Investment Attraction Opportunities
									such as Demo Days, Investor Matching, etc.
								</Typography>
							</Box>
						</Box>
					</Box>
					<Box
						display="flex"
						mb={3}
						flexDirection={{ xs: 'column', md: 'row' }}
						justifyContent={'center'}
						gap={5}
					>
						<Box display="flex" flexDirection={'row'} mx={5}>
							<PeopleTwoToneIcon
								sx={{
									color: 'primary.main',
									fontSize: '30px',
									marginRight: '20px',
									marginTop: '20px',
								}}
							/>
							<Box
								border={'1px solid'}
								borderColor={'primary.main'}
								alignContent={'center'}
								textAlign={'center'}
								height={'80px'}
								width={'280px'}
							>
								<Typography variant="h4" fontWeight={'400'}>
									Networking with Experts,
								</Typography>
								<Typography variant="h4" fontWeight={'400'}>
									Responses within 24 Hours
								</Typography>
							</Box>
						</Box>
						<Box display="flex" flexDirection={'row'} mx={5}>
							<LibraryBooksTwoToneIcon
								sx={{
									color: 'primary.main',
									fontSize: '30px',
									marginRight: '20px',
									marginTop: '20px',
								}}
							/>
							<Box
								border={'1px solid'}
								borderColor={'primary.main'}
								alignContent={'center'}
								textAlign={'center'}
								height={'80px'}
								width={'280px'}
							>
								<Typography variant="h4" fontWeight={'400'}>
									Support for Partner Programs
								</Typography>
							</Box>
						</Box>
					</Box>
				</Box>
			</Box>
			{/* 제공하는 서비스 소개 섹션2 */}
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
									Investment, Marketing, Taxation, Human
									Resources, Legal Affairs, etc.{' '}
								</Typography>
								{/* <Typography variant="h5" fontWeight={'600'}>
									다양한 분야에서의
								</Typography> */}
								<Box display="flex" gap={1}>
									<Typography
										variant="h5"
										color="primary.main"
										fontWeight={'600'}
									>
										Seminars, Consulting, Mentorship, QA
										Services in Various Fields such as
										Management,
									</Typography>
									{/* <Typography variant="h5" fontWeight={'600'}>
										서비스 제공
									</Typography> */}
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
							<Typography variant="subtitle1" fontWeight={'600'}>
								Investment, Marketing, Taxation, Human
								Resources, Legal Affairs, etc.
							</Typography>
							{/* <Typography variant="h5" fontWeight={'600'}>
								다양한 분야에서의
							</Typography> */}
							<Box
								display="flex"
								gap={1}
								width="100%"
								justifyContent={'center'}
							>
								<Typography
									variant="subtitle1"
									color="primary.main"
									fontWeight={'600'}
								>
									Seminars, Consulting, Mentorship, QA
									Services in Various Fields such as
									Management,
								</Typography>
								{/* <Typography variant="h5" fontWeight={'600'}>
									서비스 제공
								</Typography> */}
							</Box>
						</Box>
					</Box>
				</Box>
			}
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
				<Typography variant="h3" fontWeight={'400'}>
					The benefits offered by
				</Typography>
				<Typography variant="h3">
					Suppor-T's partners & discounts
				</Typography>
				<Typography variant="h3" fontWeight={'400'}>
					on partner services
				</Typography>
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

				{/* 제휴문의 섹션 */}
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
						<Typography
							color={'white'}
							variant="h4"
							fontWeight={'500'}
						>
							Effortlessly manage your business with Suppor-T
						</Typography>
						<Typography color={'white'} variant="subtitle1">
							Suppor-T offers the optimal solutions
						</Typography>
						<SupportiButton
							contents="Affiliate inquiry"
							onClick={() => {
								resetInquiryData();
								setOpenPopUp(true);
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
						style={{
							zIndex: -100,
							width: '100%',
							height: '400px',
						}}
						src={'/images/main/mainBackgroundImg.jpg'}
						alt="img"
					/>
				</Grid>
				{/* 제휴 문의 팝업 */}
				<PopUpModal
					modalOpen={openPopUp}
					setModalOpen={setOpenPopUp}
					uiData={
						<Box
							display={'flex'}
							justifyContent={'space-between'}
							flexDirection={'column'}
							gap={3}
						>
							<Box display="flex" justifyContent={'center'}>
								<Typography
									variant="subtitle1"
									fontWeight={600}
									mt="auto"
									mb="auto"
								>
									Affiliate inquiry
								</Typography>
								<CloseIcon
									sx={{
										cursor: 'pointer',
										position: 'absolute',
										right: 20,
										top: 15,
									}}
									onClick={() => setOpenPopUp(false)}
								/>
							</Box>
							<Box display="flex" justifyContent="space-between">
								<Typography
									variant="subtitle1"
									fontWeight={600}
									mt="auto"
									mb="auto"
								>
									Name
								</Typography>
								<SupportiInput
									type="input"
									additionalProps={{
										placeholder: 'Enter your name.',
									}}
									value={name}
									setValue={setName}
									width={'85%'}
								/>
							</Box>
							<Box display="flex" justifyContent="space-between">
								<Typography
									variant="subtitle1"
									fontWeight={600}
									mt="auto"
									mb="auto"
								>
									Email
								</Typography>
								<SupportiInput
									type="input"
									additionalProps={{
										placeholder: 'Enter your email.',
									}}
									value={email}
									setValue={setEmail}
									width={'85%'}
								/>
							</Box>
							<Box display="flex" justifyContent="space-between">
								<Typography
									variant="subtitle1"
									fontWeight={600}
									mt="auto"
									mb="auto"
								>
									Cotact
								</Typography>
								<SupportiInput
									type="input"
									additionalProps={{
										placeholder:
											'Enter your contact number.',
									}}
									value={phoneNumber}
									setValue={setPhoneNumber}
									width={'85%'}
								/>
							</Box>

							<Box display={'flex'} gap={2}>
								<SupportiButton
									contents={'Affiliate inquiry'}
									variant="contained"
									onClick={() => createInquiry()}
									style={{
										width: '150px',
										marginRight: 'auto',
										marginLeft: 'auto',
									}}
								/>
								<SupportiButton
									contents={'Close'}
									variant="outlined"
									onClick={() => setOpenPopUp(false)}
									style={{
										width: '150px',
										marginRight: 'auto',
										marginLeft: 'auto',
									}}
								/>
							</Box>
						</Box>
					}
				/>
			</Box>
		</Box>
	);
};

export default Page;
