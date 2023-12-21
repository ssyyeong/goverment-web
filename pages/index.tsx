import {
	Box,
	Button,
	Grid,
	MobileStepper,
	Paper,
	Typography,
	useTheme,
} from '@mui/material';
import React from 'react';
import SignIn from '@qillie-corp/ark-office-project/src/layout/auth/SignIn';
import SideBar from '@qillie-corp/ark-office-project/src/layout/SideBar/index';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import SupportiButton from '../src/views/global/SupportiButton';
import { NextPage } from 'next';
import AOS from 'aos';
import 'aos/dist/aos.css';

// import SupportiToggle from '../src/Boxs/global/SupportiToggle';
// import SuppportiModal from '../src/Boxs/global/SuppportiModal';
// import SupportiProgressBar from '../src/Boxs/global/SupportiProgressBar';
// import SupportiTable from '../src/Boxs/global/SupportiTable';
// import { TransactionHistoryTable } from '../src/Boxs/local/internal_service/financial_solution/account_manage/TransactionHistoryTable';
// import SupportiInput from '../src/Boxs/global/SupportiInput';

type Props = {};

const Page: NextPage = () => {
	const router = useRouter();
	const memberId = 1;
	// SwiperCore.use([Navigation, Scrollbar]);

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
			name: '김만수',
			age: 20,
			color: 'red',
		},
		{
			name: '김민수',
			age: 23,
		},
		{
			name: '김민수',
			age: 20,
		},
		{
			name: '김민수',
			age: 23,
		},
		{
			name: '김민수',
			age: 20,
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

	React.useEffect(() => {
		AOS.init();
	});

	return (
		<Grid container width={'100%'}>
			<Grid
				item
				xs={12}
				sx={{
					p: { xs: 5, sm: 15 },
				}}
			>
				<Grid container>
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
							<Typography
								variant={'subtitle1'}
								fontWeight={'500'}
							>
								데이터 대시보드 기반 솔루션 플랫폼, 서포티
							</Typography>
							{memberId ? (
								<SupportiButton
									contents="내 대시보드 보러가기"
									onClick={() => {
										// router.push.push('/auth/sign_in');
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
										if (!memberId) {
											router.push('/login');
										} else {
											router.push('/dashboard/finance');
										}
									}}
									variant="contained"
									style={{
										width: '200px',
										marginTop: '50px',
									}}
								/>
							)}
							{/* <img src={mainTitle} style={styles.imgStyle} />
        <img src={mobileMainTitle} style={styles.mimgStyle} /> */}
						</Box>

						<Box
							sx={{
								width: { xs: '380px', sm: '650px' },
								height: { xs: '300px', sm: '480px' },
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
				</Grid>
			</Grid>

			<Grid
				item
				xs={12}
				bgcolor={'#3C52BB'}
				borderRadius={4}
				sx={{
					p: { sm: 15, xs: 5 },
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
								sx={{ width: { sm: '350px', xs: '350px' } }}
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
			</Grid>

			<Grid
				item
				xs={12}
				textAlign={'center'}
				mt={10}
				display={'flex'}
				flexDirection={'column'}
				sx={{
					gap: { sm: 10, xs: 5 },
					p: { sm: 10, xs: 5 },
				}}
			>
				<Box>
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
				</Box>

				<Box
					ml="auto"
					mr="auto"
					display="flex"
					sx={{ gap: { sm: 5, xs: 2 } }}
				>
					{data3.map((item, index) => {
						return (
							<Box key={index}>
								<Box
									sx={{
										width: { sm: '350px', xs: '150px' },
										height: {
											sm: '330px',
											xs: '150px',
										},
									}}
									mt={5}
									ml={'auto'}
									mr={'auto'}
								>
									<Box
										position={'absolute'}
										bgcolor={'rgba(0, 0, 0, 0.7)'}
										borderRadius={5}
										width={'inherit'}
										height={'inherit'}
										sx={{
											pt: {
												sm: '140px',
												xs: '50px',
											},
										}}
									>
										<Typography
											color={'white'}
											variant={'h4'}
										>
											{item.text1}
										</Typography>
										<Typography
											color={'white'}
											variant={'h4'}
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
				</Box>

				<Box
					ml="auto"
					mr="auto"
					display="flex"
					sx={{ gap: { sm: 5, xs: 2 } }}
				>
					{data3_1.map((item, index) => {
						return (
							<Box key={index}>
								<Box
									sx={{
										width: { sm: '350px', xs: '150px' },
										height: {
											sm: '330px',
											xs: '150px',
										},
									}}
									ml={'auto'}
									mr={'auto'}
								>
									<Box
										position={'absolute'}
										bgcolor={'rgba(0, 0, 0, 0.7)'}
										borderRadius={5}
										width={'inherit'}
										height={'inherit'}
										sx={{
											pt: {
												sm: '140px',
												xs: '50px',
											},
										}}
									>
										<Typography
											color={'white'}
											variant={'h4'}
										>
											{item.text1}
										</Typography>
										<Typography
											color={'white'}
											variant={'h4'}
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
				</Box>

				<Grid container>
					<Box ml="auto" mr="auto" mt={20} mb={20}>
						<Box display={'flex'} flexWrap={'wrap'} gap={4}>
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
												fontWeight={'500'}
											>
												{item.text1}
											</Typography>
											<Box
												display={'flex'}
												justifyContent={'center'}
											>
												<Typography
													variant={'h5'}
													fontWeight={'500'}
												>
													{item.text2}
												</Typography>
												<Typography
													variant={'h5'}
													fontWeight={'600'}
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
				</Grid>
			</Grid>

			<Box
				display={'flex'}
				gap={4}
				flex={'wrap'}
				sx={{
					p: { sm: 15, xs: 5 },
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
			</Box>
			<Grid container p={30}>
				<Box display="flex" flexWrap={'wrap'}>
					<Grid item xs={6}>
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
										marginLeft: 290,
										marginTop: -350,
									}}
								>
									<img
										alt="img"
										src={'/images/main/financeNum2.svg'}
										style={{
											width: '350px',
											zIndex: 100,
										}}
									/>
									<Box
										data-aos="fade-right"
										data-aos-delay="100"
										data-aos-duration="2000"
										style={{
											width: '303px',
											marginLeft: -350,
											marginTop: -50,
										}}
									>
										<img
											alt="img"
											src={'/images/main/financeNum1.svg'}
											style={{
												width: '350px',
												zIndex: 100,
											}}
										/>
										<Box
											data-aos="fade-up"
											data-aos-delay="100"
											data-aos-duration="2000"
											style={{
												marginLeft: '40px',
												marginTop: '20px',
											}}
										>
											<img
												alt="img"
												src={
													'/images/main/financeNum3.svg'
												}
												style={{
													width: '500px',
													zIndex: 100,
												}}
											/>
										</Box>
									</Box>
								</Box>
							</Box>
							<Box
								data-aos="fade-up"
								data-aos-delay="100"
								data-aos-duration="3000"
								style={{
									width: 0,
									marginLeft: -300,
									marginTop: 100,
								}}
							>
								<Box
									data-aos="fade-up"
									data-aos-delay="100"
									data-aos-duration="3000"
									style={{
										width: 200,
										zIndex: -100,
										marginLeft: 130,
										marginTop: -300,
									}}
								>
									<Box
										data-aos="fade-right"
										data-aos-delay="100"
										data-aos-duration="2000"
										style={{
											width: 200,
											marginLeft: -190,
											marginTop: -170,
										}}
									>
										<Box
											data-aos="fade-up"
											data-aos-delay="100"
											data-aos-duration="2000"
											style={{
												width: 200,
												marginLeft: 25,
												marginTop: -100,
											}}
										></Box>
									</Box>
								</Box>
							</Box>
						</Box>
					</Grid>

					<Grid item xs={6} p={5} pr={0} pt={0}>
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
					</Grid>
				</Box>
			</Grid>

			{open && (
				<Grid
					item
					xs={12}
					textAlign={'center'}
					sx={{
						p: { sm: 15, xs: 5 },
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
						container
						borderRadius={4}
						sx={{
							p: { sm: 15, xs: 5 },
						}}
						bgcolor={'white'}
						mt={5}
						mb={5}
						ml={'auto'}
						mr={'auto'}
						gap={10}
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
								BurnRate와 RunWay 외 달별 지출, 달별 수입 까지
								한눈에 확인 해보세요.
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
			)}

			<Grid container>
				<Box
					display={'flex'}
					gap={4}
					ml="auto"
					mr="auto"
					mt={20}
					mb={20}
				>
					<Box textAlign={'center'}>
						<Box>
							<Box
								data-aos="fade-right"
								data-aos-delay="100"
								data-aos-duration="3000"
							>
								<Grid container>
									{data2.map((item, index) => {
										if (index < 2) {
											return (
												<Grid item xs={6}>
													<Box
														key={index}
														boxShadow={
															'rgb(213, 212, 239) 0px 4px 30px'
														}
														p={3}
														borderRadius={5}
														sx={{
															width: {
																sm: '280px',
																xs: '180px',
															},
															height: {
																sm: '280px',
																xs: '180px',
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
															{
																item.reBoxTypography
															}
														</Typography>
													</Box>
												</Grid>
											);
										}
									})}
								</Grid>
							</Box>
							<Box
								data-aos="fade-left"
								data-aos-delay="100"
								data-aos-duration="3000"
							>
								<Grid container>
									{data2.map((item, index) => {
										if (index > 1) {
											return (
												<Grid item xs={6} p={4}>
													<Box
														key={index}
														boxShadow={
															'rgb(213, 212, 239) 0px 4px 30px'
														}
														p={3}
														borderRadius={5}
														sx={{
															width: {
																sm: '280px',
																xs: '180px',
															},
															height: {
																sm: '280px',
																xs: '180px',
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
															{
																item.reBoxTypography
															}
														</Typography>
													</Box>
												</Grid>
											);
										}
									})}
								</Grid>
							</Box>
						</Box>
					</Box>
				</Box>
			</Grid>

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
					p={15}
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
								router.push('/login');
							} else {
								router.push('/dashboard/finance');
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
{
	/* <SupportiInput
				type="inputwithbtn"
				value={Typography}
				setValue={setTypography}
				defaultValue=""
				width={200}
				btnContent="전송하기"
				btnOnclick={() => {}}
			/>
			<SupportiButton
				contents="다음"
				onClick={() => {
					// router.push.push('/auth/sign_in');
					setOpen(true);
				}}
				fullWidth
				variant="contained"
				disabledGutters
				style={{
					backgroundimg:
						'linear-gradient(99deg, #5583e4 9%, #4955e3 89%)',
					border: 'solid 1px #fff',
					p: 3,
				}}
			/>
			<SupportiButton
				contents="다음"
				onClick={() => {
					// router.push.push('/auth/sign_in');
				}}
				// fullWidth
				style={{
					TypographyDecoration: 'underline',
					fontWeight: 300,
				}}
			/>
			<SupportiButton
				contents="다음"
				onClick={() => {
					// router.push.push('/auth/sign_in');
				}}
				fullWidth
				variant="outlined"
				style={{}}
			/>
			<SupportiButton
				contents="다시받기"
				onClick={() => {
					// router.push.push('/auth/sign_in');
				}}
				// fullWidth
				disabledGutters
				variant="contained"
				color="secondary"
				style={{
					color: 'white',
					height: '20px',
					width: '69px',
				}}
			/>{' '}
			asdasd
			<Box width={'100%'}>
				<SupportiToggle
					chipDataList={[
						{
							label: '전체',
							value: 0,
						},
						{
							label: '전체',
							value: 1,
						},
						{
							label: '전체',
							value: 2,
						},
					]}
					value={tab}
					setValue={setTab}
					chipHeight={30}
					style={{
						chipStyle: {},
					}}
				/>
			</Box>
			{/* <SupportiTable
				headerData={[
					{
						label: '이름',
						value: 'name',
						align: 'left',
						checkbox: true,
						checkBoxOnClick: (value, idx) => {
							data[idx].name = '김만수';
						},
						format: (value) => {
							return value === '김만수' ? true : false;
						},
					},
					{
						label: '나이',
						value: 'age',
						align: 'left',
						color: 'red',
						customFormat: (value) => {
							return value > 22 ? 'red' : 'blue';
						},
					},
				]}
				rowData={data}
			/> */
}
{
	/* <SupportiProgressBar
				materialDataList={[
					{
						percentage: '15',
						color: 'red',
					},
					// {
					// 	percentage: '30',
					// 	color: 'blue',
					// },
					// {
					// 	percentage: '40',
					// 	color: 'green',
					// },
				]}
			/>
			<Box
				sx={{
					display: 'flex',
					alignItems: 'center',
					width: '100%',
				}}
			>
				<LinearProgress
					value={30}
					variant="buffer"
					sx={{ width: '100%', height: 20 }}
				/>
			</Box>
			<TransactionHistoryTable
				setRecomputeTriggerKey={() => {}}
				bankAccount={{
					BANK_ACCOUNT_IDENTIFICATION_CODE: 1,
					BANK_CODE: '002',
				}}
				selectedPeriod={{
					year: 2021,
					month: 10,
				}}
				keyword={''}
			/> */
}
