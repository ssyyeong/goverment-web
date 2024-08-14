import { NextPage } from 'next';
import React, { useEffect } from 'react';

import { Box, Grid, IconButton, TextField, Typography } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

import DefaultController from '@leanoncompany/supporti-ark-office-project/src/controller/default/DefaultController';

import SupportiButton from '../../src/views/global/SupportiButton';
import { useRouter } from 'next/router';
import SupportiInput from '../../src/views/global/SupportiInput';
import PopUpModal from '../../src/views/local/common/PopUpModal/PopUpModal';

const Page: NextPage = () => {
	const router = useRouter();
	const partnerShipInquiryController = new DefaultController(
		'PartnerShipInquiry'
	);

	const containerRef = React.useRef<HTMLDivElement>(null);

	const [openPopUp, setOpenPopUp] = React.useState(false);
	const [name, setName] = React.useState('');
	const [email, setEmail] = React.useState('');
	const [phoneNumber, setPhoneNumber] = React.useState('');
	const [apply, setApply] = React.useState<boolean>(false);

	const data1 = [
		{
			text1: '내 서비스 만들어보고 싶은데,',
			text2: '기획도, 개발도 너무 부족해.',
		},
		{
			text1: '투자는 어떻게 받지?',
			text2: 'R 경험은 어디서 쌓아야 하나',
		},
		{
			text1: '내 사업을 성장시킬 방법도,',
			text2: '협력사를 만날 방법도 모르겠어',
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
				resetInquiryData();
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
						창업가들을 위한, 창업가들에게 진짜로 필요한
					</Typography>
					<Typography variant={'h1'} color={'white'} mt={1}>
						스타트업 마켓 플레이스
					</Typography>
					<Typography
						variant={'h2'}
						fontWeight={'400'}
						color={'white'}
						mt={1}
					>
						서포티는 스타트업과
					</Typography>
					<Typography
						variant={'h2'}
						fontWeight={'400'}
						color={'white'}
						mt={1}
					>
						함께 성장하는 동행자입니다.
					</Typography>
				</Box>
			</Box>

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
										PROBLEM
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
						창업가들을 위한 마켓 플레이스, SUPPOR-T{' '}
					</Typography>
				</Box>
			</Box>
			{/* 마켓 섹션 */}
			<Box
				width={'100%'}
				mt={5}
				mb={5}
				display={'flex'}
				flexDirection={'row'}
				justifyContent={'space-between'}
				p={5}
				bgcolor={'grey.300'}
			>
				<Box display={'flex'} flexDirection={'column'}>
					<img
						src="/images/main/container.jpg"
						alt="image"
						width={600}
						height={500}
					/>
					<SupportiButton
						contents={'마켓페이지로 바로가기'}
						variant="text"
						style={{
							height: '35px',
							mt: 'auto',
							color: 'black',
						}}
						onClick={() => {
							router.push('/external_service/market_place');
						}}
					/>
				</Box>
				<Box
					display={'flex'}
					p={5}
					flexDirection={'column'}
					gap={2}
					alignSelf={'center'}
					textAlign={'center'}
				>
					<Typography variant="h2" fontWeight={600} color={'white'}>
						창업가를 위한 마켓 플레이스
					</Typography>
					<Typography variant="h2" fontWeight={600} color={'white'}>
						법인 설립부터 기장 외주 개발 AWS 등 클라우드나 SaaS
						사용까지!
					</Typography>
					<Typography variant="h2" fontWeight={600} color={'white'}>
						6종 23가지! 서포티 제휴업체에서 <br />
						무료 또는 50% 할인된 가격으로 이용 가능합니다.
					</Typography>
				</Box>
			</Box>
			{/* 테마 섹션 */}
			<Box
				width={'100%'}
				mb={10}
				display={'flex'}
				flexDirection={'row'}
				justifyContent={'space-between'}
				p={5}
			>
				<Box
					display={'flex'}
					p={5}
					flexDirection={'column'}
					alignSelf={'center'}
					textAlign={'center'}
				>
					<Typography
						variant="h1"
						fontWeight={600}
						color={'primary.main'}
					>
						창업가의 니즈에 맞춘 맞춤형 커뮤니티
					</Typography>
					<SupportiButton
						contents={'테마페이지 바로가기'}
						variant="text"
						style={{
							height: '35px',
							marginTop: '10px',
							mt: 'auto',
						}}
						onClick={() => {
							router.push('/external_service/theme');
						}}
					/>
				</Box>
				<img
					src="/images/theme/theme.png"
					alt="image"
					width={'50%'}
					style={{
						marginRight: '20px',
					}}
				/>
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
				<img
					src="/images/apistore/description.png"
					alt="img4"
					width={600}
				/>
				<img
					src="/images/apistore/avartar.svg"
					alt="avatar"
					width={300}
					height={200}
				/>
			</Box>
			<Box
				display={'flex'}
				flexDirection={'column'}
				justifyContent={'center'}
				alignItems={'center'}
				gap={2}
			>
				<Typography variant={'h2'} fontWeight={'600'} mt={10}>
					쉽고 간단한 프로세스
				</Typography>
				<Box display={'flex'} flexDirection={'row'} gap={1}>
					<Typography variant={'h4'}>
						회사 내 주니어 개발자만으로
					</Typography>
					<Typography variant={'h4'} color={'primary.main'}>
						서비스를 무리없이
					</Typography>
					<Typography variant={'h4'}>만들 수 있습니다.</Typography>
				</Box>
				<Box display={'flex'} flexDirection={'row'} gap={1}>
					<Typography variant={'h4'}>
						개발자가 없으시다면 저희가
					</Typography>
					<Typography variant={'h4'} color={'primary.main'}>
						A to Z
					</Typography>
					<Typography variant={'h4'}>도와드립니다.</Typography>
				</Box>
			</Box>
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					gap: 2,
					p: 2,
					mt: 20,
					alignItems: 'center',
				}}
			>
				<Typography variant={'h2'} fontWeight={'600'}>
					도입 고객사
				</Typography>
				<Box
					display={'flex'}
					justifyContent={'center'}
					mt={2}
					gap={2}
					flexDirection={'column'}
				>
					{/* <Box
						display={'flex'}
						flexDirection={'column'}
						justifyContent={'center'}
						width={120}
						height={80}
						bgcolor={'white'}
						alignItems={'center'}
						borderRadius={5}
						border={'1px solid #c8c8c8'}
						px={1}
					>
						<img
							src="/images/logo/partners/교보생명.svg"
							alt="logo"
							width={120}
							height={80}
							style={{
								objectFit: 'fill',
							}}
						/>
					</Box> */}
					<img
						src="/images/apistore/partners.svg"
						alt="logo"
						width={700}
						style={{
							objectFit: 'fill',
						}}
					/>
					<Typography
						variant={'h4'}
						fontWeight={'600'}
						color={'primary.main'}
						textAlign={'center'}
					>
						스타트업부터 대기업 SI, AI 개발 회사까지
					</Typography>
					<Typography
						variant={'h4'}
						fontWeight={'600'}
						textAlign={'center'}
					>
						오픈 직전부터 많은 회사들이 사용하고 있습니다.
					</Typography>
				</Box>
			</Box>
			<Box
				mt={10}
				sx={{
					backgroundImage: `url(/images/apistore/bgImg.svg)`,
					backgroundSize: 'cover',
				}}
				width={'100%'}
				height={'90vh'}
			>
				<Box
					display={'flex'}
					flexDirection={'column'}
					justifyContent={'center'}
					alignItems={'center'}
					width={'100%'}
					height={'100%'}
				>
					<Box
						width={500}
						height={600}
						justifyContent={'center'}
						alignSelf={'center'}
						sx={{
							display: 'flex',
							flexDirection: 'column',
							gap: 2,
							p: 10,
							mt: 2,
							alignItems: 'center',
						}}
						bgcolor={'white'}
					>
						<Typography variant={'h1'} fontWeight={'600'}>
							서비스 문의
						</Typography>
						<Typography variant={'body1'} mb={1}>
							대표님들의 개발이 쉬워지도록 비즈니스 솔루션,
							Support-T
						</Typography>
						<TextField
							fullWidth
							value={name}
							type="name"
							onChange={(e) => setName(e.target.value)}
							variant={'outlined'}
							sx={{ mb: 2, bgcolor: 'white' }}
							placeholder={'이름을 입력해주세요.'}
						/>
						<TextField
							fullWidth
							value={phoneNumber}
							type="company"
							onChange={(e) => setPhoneNumber(e.target.value)}
							variant={'outlined'}
							sx={{ mb: 2, bgcolor: 'white' }}
							placeholder={'연락처를 입력해주세요.'}
						/>
						<TextField
							fullWidth
							value={email}
							type="email"
							onChange={(e) => setEmail(e.target.value)}
							variant={'outlined'}
							sx={{ mb: 2, bgcolor: 'white' }}
							placeholder={'이메일주소를 입력해주세요.'}
						/>
						<Box display={'flex'} flexDirection={'row'}>
							<SupportiInput
								type="checkbox"
								value={apply}
								setValue={setApply}
								label={
									'[필수] 요청하신 문의 내용에 대한 서비스 제공을 위해 필요한 최소한의 개인정보 제공에 동의합니다.'
								}
								width={'400px'}
							/>
						</Box>

						<SupportiButton
							contents={'문의하기'}
							onClick={() => {
								createInquiry();
							}}
							variant={'contained'}
							color={'primary'}
							style={{
								width: 150,
							}}
						/>
					</Box>
				</Box>
			</Box>
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
						<Typography
							variant="subtitle1"
							fontWeight={600}
							textAlign={'center'}
						>
							문의가 완료되었습니다.
						</Typography>

						<Box display={'flex'} gap={2}>
							<SupportiButton
								contents={'닫기'}
								variant="contained"
								onClick={() => {
									setOpenPopUp(false);
								}}
								style={{
									width: '150px',
									height: '30px',
								}}
							/>
						</Box>
					</Box>
				}
			/>
		</Box>
	);
};

export default Page;
