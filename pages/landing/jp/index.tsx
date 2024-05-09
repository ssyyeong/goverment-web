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
				height: '100%',
				alignItems: 'center',
			}}
		>
			{/* 메인 이미지 섹션 */}
			<img
				src="/images/main/container.jpg"
				width={'100%'}
				height={'100%'}
			/>
			{/* 메인 이미지 텍스트 섹션 */}
			<Box
				top={'50%'}
				position={'absolute'}
				width={'100%'}
				left={'auto'}
				textAlign={'center'}
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
					貴社の夢が実現される
				</Typography>
				<Typography variant={'h1'} color={'white'} mt={1}>
					お客様にとって唯一無二のスタートアップ成長管理ソリューション
				</Typography>
				<Typography
					variant={'h2'}
					fontWeight={'400'}
					color={'white'}
					mt={1}
				>
					Support-Tは、スタートアップと一緒に成長していくパートナーです。
				</Typography>
				{/* <Typography
					variant={'h2'}
					fontWeight={'400'}
					color={'white'}
					mt={1}
				>
					함께 성장하는 동행자입니다.
				</Typography> */}
			</Box>

			{/* BurnRate 섹션 */}
			<Grid container justifyContent={'center'}>
				<Box
					pt={5}
					pb={10}
					display="flex"
					width="70%"
					flexDirection={'column'}
				>
					<Box mb={5}>
						<Typography fontWeight={600} mb={1}>
							法人口座と連携し一目でわかる
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
								top: '155%',
							}}
						/>
					</Box>
				</Box>
			</Grid>
			{/* 제공하는 서비스 소개 섹션 */}
			<Box
				display="flex"
				flexDirection={'row'}
				py={10}
				mx={5}
				my={5}
				borderTop={'2px solid #f2f6ff'}
			>
				<img
					src="/images/main/graph.jpg"
					width={'40%'}
					height={'100%'}
					style={{
						padding: '3%',
						alignSelf: 'center',
					}}
				/>
				<Box
					display="flex"
					flexDirection={'column'}
					justifyContent={'center'}
					width="60%"
					gap={5}
				>
					<Box
						display="flex"
						mb={3}
						flexDirection={'row'}
						justifyContent={'center'}
						gap={5}
					>
						<Box display="flex" flexDirection={'row'}>
							<AutoGraphIcon
								sx={{
									color: 'primary.main',
									fontSize: '40px',
									marginRight: '20px',
									marginTop: '15px',
								}}
							/>
							<Box
								border={'1px solid'}
								borderColor={'primary.main'}
								alignContent={'center'}
								textAlign={'center'}
								height={'80px'}
								width={'330px'}
							>
								<Typography variant="h4" fontWeight={'400'}>
									効率的な指標管理
								</Typography>
							</Box>
						</Box>
						<Box display="flex" flexDirection={'row'}>
							<ApartmentTwoToneIcon
								sx={{
									color: 'primary.main',
									fontSize: '40px',
									marginRight: '20px',
									marginTop: '15px',
								}}
							/>
							<Box
								border={'1px solid'}
								borderColor={'primary.main'}
								alignContent={'center'}
								textAlign={'center'}
								height={'80px'}
								width={'330px'}
							>
								<Typography variant="h4" fontWeight={'400'}>
									投資審査役のIRコーチング
								</Typography>
							</Box>
						</Box>
					</Box>
					<Box
						display="flex"
						mb={3}
						flexDirection={'row'}
						justifyContent={'center'}
						gap={5}
					>
						<Box display="flex" flexDirection={'row'}>
							<MessageTwoToneIcon
								sx={{
									color: 'primary.main',
									fontSize: '40px',
									marginRight: '20px',
									marginTop: '15px',
								}}
							/>
							<Box
								border={'1px solid'}
								borderColor={'primary.main'}
								alignContent={'center'}
								textAlign={'center'}
								height={'80px'}
								width={'330px'}
							>
								<Typography variant="h4" fontWeight={'400'}>
									多様な分野からの専門家によるメンタリング
								</Typography>
							</Box>
						</Box>
						<Box display="flex" flexDirection={'row'}>
							<HandshakeTwoToneIcon
								sx={{
									color: 'primary.main',
									fontSize: '40px',
									marginRight: '20px',
									marginTop: '15px',
								}}
							/>
							<Box
								border={'1px solid'}
								borderColor={'primary.main'}
								alignContent={'center'}
								textAlign={'center'}
								height={'80px'}
								width={'330px'}
							>
								<Typography variant="h4" fontWeight={'400'}>
									様々な投資誘致機会（デモデイ、投資者マッチングなど）
								</Typography>
							</Box>
						</Box>
					</Box>
					<Box
						display="flex"
						flexWrap="wrap"
						mb={3}
						flexDirection={'row'}
						justifyContent={'center'}
						gap={5}
					>
						<Box display="flex" flexDirection={'row'}>
							<PeopleTwoToneIcon
								sx={{
									color: 'primary.main',
									fontSize: '40px',
									marginRight: '20px',
									marginTop: '15px',
								}}
							/>
							<Box
								border={'1px solid'}
								borderColor={'primary.main'}
								alignContent={'center'}
								textAlign={'center'}
								height={'80px'}
								width={'330px'}
							>
								<Typography variant="h4" fontWeight={'400'}>
									専門家とのネットワーキング、24時間以内に返事
								</Typography>
							</Box>
						</Box>
						<Box display="flex" flexDirection={'row'}>
							<LibraryBooksTwoToneIcon
								sx={{
									color: 'primary.main',
									fontSize: '40px',
									marginRight: '20px',
									marginTop: '15px',
								}}
							/>
							<Box
								border={'1px solid'}
								borderColor={'primary.main'}
								alignContent={'center'}
								textAlign={'center'}
								height={'80px'}
								width={'330px'}
							>
								<Typography variant="h4" fontWeight={'400'}>
									パートナー企業プログラム支援
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
									経営、投資、マーケティング、税務、労務、弁護士など
								</Typography>
								<Typography variant="h5" fontWeight={'600'}>
									様々な分野からの
								</Typography>
								<Box display="flex" gap={1}>
									<Typography
										variant="h5"
										color="primary.main"
										fontWeight={'600'}
									>
										セミナー、コンサルティング、メンタリング、QA
									</Typography>
									<Typography variant="h5" fontWeight={'600'}>
										サービス
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
								経営、投資、マーケティング、税務、労務、弁護士など
							</Typography>
							<Typography variant="h5" fontWeight={'600'}>
								様々な分野からの
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
									セミナー、コンサルティング、メンタリング、QA
								</Typography>
								<Typography variant="h5" fontWeight={'600'}>
									サービス
								</Typography>
							</Box>
						</Box>
					</Box>
				</Box>
			}
			{/* 연혁 섹션 */}
			<Box display="flex">
				<img
					src="/images/main/history_jp.svg"
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
					Support-Tのパートナーが提供する
				</Typography>
				<Typography variant="h3">
					特典＆パートナー企業サービス割引
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
							あなたのビジネスを簡単に管理する方法
						</Typography>
						<Typography color={'white'} variant="subtitle1">
							Suppor-Tは、最適なソリューションを提案します。
						</Typography>
						<SupportiButton
							contents="提携お問い合わせ
							"
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
									提携お問い合わせ
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
									お名前
								</Typography>
								<SupportiInput
									type="input"
									additionalProps={{
										placeholder: 'お名前を入力してください',
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
									Eメール
								</Typography>
								<SupportiInput
									type="input"
									additionalProps={{
										placeholder:
											'Eメールを入力してください',
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
									携帯番号
								</Typography>
								<SupportiInput
									type="input"
									additionalProps={{
										placeholder:
											'携帯番号を入力してください',
									}}
									value={phoneNumber}
									setValue={setPhoneNumber}
									width={'85%'}
								/>
							</Box>

							<Box display={'flex'} gap={2}>
								<SupportiButton
									contents={'提携お問い合わせ'}
									variant="contained"
									onClick={() => createInquiry()}
									style={{
										width: '150px',
										marginRight: 'auto',
										marginLeft: 'auto',
									}}
								/>
								<SupportiButton
									contents={'閉じる'}
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
