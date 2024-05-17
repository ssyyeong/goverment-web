import { Box, Grid, IconButton, Typography } from '@mui/material';
import React from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import SupportiButton from '../src/views/global/SupportiButton';
import { NextPage } from 'next';
import { useAppMember } from '../src/hooks/useAppMember';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import DefaultController from '@leanoncompany/supporti-ark-office-project/src/controller/default/DefaultController';
import SupportiTab from '../src/views/global/SupportiTab';
import AccordianBox from '../src/views/local/common/AccordianBox/AccordianBox';
import { reviewConfig } from '../configs/data/ReviewConfig';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
type Props = {};

const Page: NextPage = () => {
	const router = useRouter();
	const { memberId } = useAppMember();

	//* Controller
	const userIrInformationController = new DefaultController(
		'UserIrInformation'
	);
	const businessInfoController = new DefaultController('Business'); // 유저 정보 최초 입력 컨트롤러 (비즈니스 정보)

	const containerRef = React.useRef<HTMLDivElement>(null);

	//* States
	const [openPopUp, setOpenPopUp] = React.useState(false); //하임 코칭권 모달
	const [isTodayNotShow, setIsTodayNotShow] = React.useState(false); //오늘 그만 보기
	const [openFirstInfoPopUp, setOpenFirstInfoPopUp] = React.useState(false);

	const [financialTab, setFinancialTab] = React.useState('성과 지표');
	const [mentoringTab, setMentoringTab] = React.useState('A2E');
	const [investTab, setInvestTab] = React.useState('투자심사역 피드백');
	const [socialingTab, setSocialingTab] = React.useState('커피챗');
	const [supportTab, setSupportTab] = React.useState('무료 서버 지원');

	const [faqList, setFaqList] = React.useState([]);

	//* Constants
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

	/**
	 * 유저 ir 정보 가져오기
	 */
	const getUserIrInfo = () => {
		userIrInformationController.getOneItemByKey(
			{
				APP_MEMBER_IDENTIFICATION_CODE: memberId,
			},
			(res) => {
				if (res.data.result !== null) {
					setOpenPopUp(false);
				} else {
					setOpenPopUp(true);
				}
			},
			(err) => {}
		);
	};

	function setCookie(name, value, exp) {
		const date = new Date();
		date.setTime(date.getTime() + exp * 24 * 60 * 60 * 1000);
		document.cookie = `${name}=${value};expires=${date.toUTCString()};path=/`;
	}

	/**
	 * 유저 비즈니스 정보 가져오기
	 */
	const getUserBusinessInfo = () => {
		businessInfoController.getOneItemByKey(
			{
				APP_MEMBER_IDENTIFICATION_CODE: memberId,
			},
			(res) => {
				console.log(res.data.result);
				if (res.data.result !== null) {
					setOpenFirstInfoPopUp(false);
				} else {
					setOpenFirstInfoPopUp(true);
				}
			},
			(err) => {}
		);
	};

	useEffect(() => {
		// 팝업창이 닫혔을 시점에 오늘 하루 보지 않기에 체크가 되어 있다면 쿠키에 셋팅
		if (!openPopUp) {
			if (isTodayNotShow) {
				setCookie('isTodayNotShow', 'true', 1);
			}
		}
	}, [openPopUp, isTodayNotShow]);

	useEffect(() => {
		// 쿠키에 오늘 하루 보지 않기에 체크가 되어 있다면 팝업창을 닫는다.
		if (memberId) {
			if (document.cookie.includes('isTodayNotShow=true')) {
				setOpenPopUp(false);
			} else {
				getUserIrInfo();
			}

			getUserBusinessInfo();
		}
	}, [memberId]);

	useEffect(() => {
		//faq 리스트 조회
		const faqController = new DefaultController('FaqBoardContent');
		faqController.findAllItems(
			{},
			(res) => {
				setFaqList(res.data.result.rows);
			},
			(err) => console.log(err)
		);
	});

	return (
		<Grid container width={'100%'}>
			{/** 메인 섹션 */}
			<Box
				sx={{
					p: { md: 5, xs: 2 },
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
						<Typography variant={'h1'} color="primary.main" mt={3}>
							서포티와 함께 성장해 보세요!
						</Typography>
						<Typography
							variant={'h4'}
							color="primary.main"
							fontWeight={400}
							mt={3}
						>
							고객님의 하나뿐인 스타트업 성장 관리 솔루션
						</Typography>
						<Typography
							variant={'h4'}
							color="primary.main"
							fontWeight={400}
						>
							서포티는 스타트업과 함께하는 동행자입니다.
						</Typography>

						<SupportiButton
							contents={'지금 시작하기'}
							variant="contained"
							style={{
								width: '200px',
								marginRight: 'auto',
								marginLeft: 'auto',
								marginTop: 5,
							}}
							onClick={() => router.push('/auth/sign_in')}
						/>
					</Box>
				</Box>
			</Box>

			{/* 지표 분석 섹션 */}
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					width: '100%',
					alignItems: 'center',
					gap: 2,
					p: 5,
				}}
			>
				<Typography variant={'h1'} color="primary.main">
					지표 분석 서비스
				</Typography>
				<Typography variant={'h3'} fontWeight={400} mt={3}>
					성과와 재무지표를 효율적으로 관리하고 싶나요?
				</Typography>
				<Typography variant={'h3'} fontWeight={400} mb={5}>
					서포티를 통해서 쉽고 편하게 관리해보세요.
				</Typography>

				<SupportiTab
					tabList={['성과 지표', '재무 지표']}
					setValue={setFinancialTab}
					value={financialTab}
					imagePath="/images/main/runwayPC.png"
					imagePosition="right"
					tabContentList={[
						<Box
							sx={{
								display: 'flex',
								flexDirection: 'column',
								width: '100%',
								alignItems: 'center',
								gap: 1,
								mt: 5,
							}}
						>
							<Typography variant={'h4'} fontWeight={400}>
								목표 달성 여부를 한눈에!
							</Typography>
							<Typography variant={'h4'} fontWeight={400} mt={5}>
								우리 회사의 지표를 설정하고,
							</Typography>
							<Typography variant={'h4'} fontWeight={400}>
								달성에 대한 정도를 한눈에 확인해보세요.
							</Typography>
						</Box>,
						<Box
							sx={{
								display: 'flex',
								flexDirection: 'column',
								width: '100%',
								alignItems: 'center',
								gap: 1,
								mt: 5,
							}}
						>
							<Typography variant={'h4'} fontWeight={400}>
								재무 관리를 보다 쉽게!
							</Typography>
							<Typography variant={'h4'} fontWeight={400} mt={5}>
								법인계좌 연동으로 거래내역과 잔액을 조회하고
							</Typography>
							<Typography variant={'h4'} fontWeight={400}>
								RunWay/BurnRate를 한눈에 확인해보세요.
							</Typography>
						</Box>,
					]}
				/>
			</Box>
			{/* 멘토링 서비스 섹션 */}
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					width: '100%',
					alignItems: 'center',
					gap: 2,
					bgcolor: 'primary.light',
					p: 5,
				}}
			>
				<Typography variant={'h1'} color="primary.main">
					멘토링 서비스
				</Typography>
				<Typography variant={'h3'} fontWeight={400} mt={3}>
					전문가의 도움이 필요한가요?
				</Typography>
				<Typography variant={'h3'} fontWeight={400} mb={5}>
					서포티를 통해 각 분야의 전문가들의 도움을 쉽게 받아보세요
				</Typography>

				<SupportiTab
					tabList={['A2E', '세미나/컨설팅']}
					setValue={setMentoringTab}
					value={mentoringTab}
					imagePath="/images/main/runwayPC.png"
					imagePosition="left"
					tabContentList={[
						<Box
							sx={{
								display: 'flex',
								flexDirection: 'column',
								width: '100%',
								alignItems: 'center',
								gap: 1,
								mt: 5,
							}}
						>
							<Typography variant={'h4'} fontWeight={400}>
								Ask to Experts
							</Typography>
							<Typography variant={'h4'} fontWeight={400}>
								각 분야 전문가의 답변을 24시간 이내에!
							</Typography>
							<Typography variant={'h4'} fontWeight={400} mt={5}>
								특허/노무/세무/법무/투자 등 다양한 분야별로
								유저들이
							</Typography>
							<Typography variant={'h4'} fontWeight={400}>
								가장 궁금해하는 질문과 전문가의 답변을
								확인해보세요.
							</Typography>
							<Typography variant={'h4'} fontWeight={400} mt={5}>
								궁금한 점을 질문하고 해당 분야 전문가에게 24시간
								이내로 답변을 받아보세요.
							</Typography>
						</Box>,
						<Box
							sx={{
								display: 'flex',
								flexDirection: 'column',
								width: '100%',
								alignItems: 'center',
								gap: 1,
								mt: 5,
							}}
						>
							<Typography variant={'h4'} fontWeight={400}>
								다양한 커리큘럼, 필요한 서비스!
							</Typography>
							<Typography variant={'h4'} fontWeight={400} mt={5}>
								세미나를 통해 전문분야 지식을 얻고
							</Typography>
							<Typography variant={'h4'} fontWeight={400}>
								컨설팅을 통해 전문가의 밀착 도움을 받아보세요.
							</Typography>
						</Box>,
					]}
				/>
			</Box>
			{/* 투자유치 코칭 서비스 섹션 */}
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					width: '100%',
					alignItems: 'center',
					gap: 2,
					p: 5,
				}}
			>
				<Typography variant={'h1'} color="primary.main">
					투자유치 코칭 서비스
				</Typography>
				<Typography variant={'h3'} fontWeight={400} mt={3}>
					투자를 받고 싶은데 어려움이 있으신가요?
				</Typography>
				<Typography variant={'h3'} fontWeight={400} mb={5}>
					서포티를 통해서 투자유치에 필요한 도움을 받고 투자자들을
					쉽게 만나보세요.
				</Typography>

				<SupportiTab
					tabList={['투자심사역 피드백', '데모데이', '투자자 매칭']}
					setValue={setInvestTab}
					value={investTab}
					imagePath="/images/main/runwayPC.png"
					imagePosition="right"
					tabContentList={[
						<Box
							sx={{
								display: 'flex',
								flexDirection: 'column',
								width: '100%',
								alignItems: 'center',
								gap: 1,
								mt: 5,
							}}
						>
							<Typography variant={'h4'} fontWeight={400}>
								투자심사역의 IR 피드백과 코칭!
							</Typography>
							<Typography variant={'h4'} fontWeight={400} mt={5}>
								IR을 등록하고 투자심사역에게 1:1 코칭과 피드백을
								받아보세요.
							</Typography>
						</Box>,
						<Box
							sx={{
								display: 'flex',
								flexDirection: 'column',
								width: '100%',
								alignItems: 'center',
								gap: 1,
								mt: 5,
							}}
						>
							<Typography variant={'h4'} fontWeight={400}>
								서포티 데모데이를 통한 투자자와의 만남!
							</Typography>
							<Typography variant={'h4'} fontWeight={400} mt={5}>
								서포티 고객사를 대상으로 개최하는 데모데이
							</Typography>
							<Typography variant={'h4'} fontWeight={400}>
								참가를 통해 투자자들에게 회사를 어필해보세요.
							</Typography>
						</Box>,
						<Box
							sx={{
								display: 'flex',
								flexDirection: 'column',
								width: '100%',
								alignItems: 'center',
								gap: 1,
								mt: 5,
							}}
						>
							<Typography variant={'h4'} fontWeight={400}>
								투자자와의 1:1 매칭!
							</Typography>
							<Typography variant={'h4'} fontWeight={400} mt={5}>
								고객님의 비즈니스 분야 전문 투자자와의 매칭을
							</Typography>
							<Typography variant={'h4'} fontWeight={400}>
								통해 투자자를 손쉽게 만나보세요.
							</Typography>
						</Box>,
					]}
				/>
			</Box>
			{/* 소셜링 서비스 섹션 */}
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					width: '100%',
					alignItems: 'center',
					gap: 2,
					bgcolor: 'primary.light',
					p: 5,
				}}
			>
				<Typography variant={'h1'} color="primary.main">
					소셜링 서비스
				</Typography>
				<Typography variant={'h3'} fontWeight={400} mt={3}>
					비슷한 고충을 겪고 있거나 극복한 스타트업 대표님들과의
					소통을 통해 문제를 해결하고 싶으신가요?
				</Typography>
				<Typography variant={'h3'} fontWeight={400} mb={5}>
					서포티를 통해서 스타트업 대표님들과 쉽게 소통하세요.
				</Typography>

				<SupportiTab
					tabList={['커피챗']}
					setValue={setSocialingTab}
					value={socialingTab}
					imagePath="/images/main/runwayPC.png"
					imagePosition="right"
					tabContentList={[
						<Box
							sx={{
								display: 'flex',
								flexDirection: 'column',
								width: '100%',
								alignItems: 'center',
								gap: 1,
								mt: 5,
							}}
						>
							<Typography variant={'h4'} fontWeight={400}>
								다양한 스타트업 대표님들과 고민을 공유해보세요!
							</Typography>
							<Typography variant={'h4'} fontWeight={400}>
								비슷한 고충을 가진 스타트업 대표님들과 간편하게
								커피챗을 진행하여 함께 성장하세요.
							</Typography>
						</Box>,
					]}
				/>
			</Box>
			{/* 개발 지원 서비스 섹션 */}
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					width: '100%',
					alignItems: 'center',
					gap: 2,
					p: 5,
				}}
			>
				<Typography variant={'h1'} color="primary.main">
					개발 지원 서비스
				</Typography>
				<Typography variant={'h3'} fontWeight={400} mt={3}>
					제품 개발에 필요한 다양한 지원이 필요하시나요?
				</Typography>
				<Typography variant={'h3'} fontWeight={400} mb={5}>
					서포티 파트너사들을 통해서 제품 개발에 필요한 지원을
					받아보세요.
				</Typography>

				<SupportiTab
					tabList={['무료 서버 지원', '파트너사 프로그램']}
					setValue={setSupportTab}
					value={supportTab}
					imagePath="/images/main/runwayPC.png"
					imagePosition="left"
					tabContentList={[
						<Box
							sx={{
								display: 'flex',
								flexDirection: 'column',
								width: '100%',
								alignItems: 'center',
								gap: 1,
								mt: 5,
							}}
						>
							<Typography variant={'h4'} fontWeight={400}>
								가입 한번으로 5,000달러 상당의 AWS서버를 무료로!
							</Typography>
							<Typography variant={'h4'} fontWeight={400} mt={5}>
								회원가입 한번으로 5,000달러 상당의 AWS서버를
								무상으로 이용해보세요.
							</Typography>
						</Box>,
						<Box
							sx={{
								display: 'flex',
								flexDirection: 'column',
								width: '100%',
								alignItems: 'center',
								gap: 1,
								mt: 5,
							}}
						>
							<Typography variant={'h4'} fontWeight={400}>
								각종 프로그램을 할인된 금액으로!
							</Typography>
							<Typography variant={'h4'} fontWeight={400} mt={5}>
								제품 개발에 필요한 각종 파트너사의 프로그램을
								할인된 금액으로 이용해보세요.
							</Typography>
						</Box>,
					]}
				/>
			</Box>

			<Box
				textAlign={'center'}
				display="flex"
				gap={3}
				flexDirection={'column'}
				mb={5}
				pt={10}
				pb={10}
				width={'100%'}
				bgcolor={'primary.light'}
			>
				<Typography variant="h3" fontWeight={'400'}>
					성공한 창업가들의 Secret
				</Typography>
				<Typography variant="h3">
					서포티를 이용하는 이유를 확인해보세요!
				</Typography>
				<Box
					display="flex"
					justifyContent="center"
					alignContent="center"
				>
					<IconButton
						onClick={() => {
							containerRef?.current?.scrollBy({
								left: -1000,
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
							display: 'flex',
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
							{reviewConfig.map((review) => {
								return (
									<Box
										borderRadius={'20px'}
										borderColor={'grey.50'}
										border={1}
										display={'flex'}
										flexWrap={'wrap'}
									>
										<Box
											width={'350px'}
											height="200px"
											textAlign={'left'}
											p={4}
										>
											<Typography variant="h3" mb={3}>
												{review.name}
											</Typography>
											<Typography
												variant="body1"
												color="grey.800"
												lineHeight={'20px'}
											>
												{review.content}
											</Typography>
										</Box>
									</Box>
								);
							})}
						</Box>
					</Box>
					<IconButton
						onClick={() => {
							containerRef?.current?.scrollBy({
								left: 1000,
								behavior: 'smooth',
							});
						}}
					>
						<KeyboardArrowRightIcon />
					</IconButton>
				</Box>
			</Box>
			<Grid item xs={12}>
				<Box
					bgcolor={'grey.50'}
					width={'80%'}
					display={'flex'}
					flexDirection={'column'}
					gap={2}
					sx={{
						p: 5,
					}}
					justifyContent={'center'}
					m="auto"
				>
					<Typography
						variant="h3"
						fontWeight={'500'}
						textAlign={'center'}
						mb={5}
					>
						서포티가 궁금합니다.
					</Typography>
					{faqList.map((notice) => {
						return (
							<AccordianBox
								title={notice.TITLE}
								content={notice.CONTENT}
								created_at={notice.CREATED_AT}
								type="FAQ"
							/>
						);
					})}
				</Box>
			</Grid>
			<Grid item xs={12} mt={5}>
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

		// {/* 추후 서포티 기능 페이지로 이동 */}
		// <Grid container width={'100%'}>
		// 	{/** 섹션 1 */}
		// 	<Box
		// 		sx={{
		// 			p: { md: 5, xs: 5 },
		// 			backgroundImage: `linear-gradient(to bottom, #ffffffa8 50%, #ffffff 100%),url(/images/main/mainImage.png)`,
		// 			backgroundSize: 'cover',
		// 		}}
		// 		width={'100%'}
		// 	>
		// 		<Box display="flex" gap={2} flexDirection={'column'} m="auto">
		// 			<Box
		// 				textAlign={'center'}
		// 				display="flex"
		// 				gap={1.5}
		// 				flexDirection={'column'}
		// 				m="auto"
		// 				pt={10}
		// 				pb={15}
		// 			>
		// 				<img
		// 					src={'/images/logo/Suppor-TFulllogo.svg'}
		// 					alt="Logo"
		// 					width={'145px'}
		// 					height={'45px'}
		// 					style={{
		// 						cursor: 'pointer',
		// 						marginLeft: 'auto',
		// 						marginRight: 'auto',
		// 						marginBottom: 20,
		// 					}}
		// 					onClick={() => router.push('/')}
		// 				/>
		// 				<Typography variant={'h3'}>
		// 					고객님의 하나뿐인,
		// 				</Typography>
		// 				<Typography
		// 					variant={'h3'}
		// 					color="primary.main"
		// 					fontWeight={600}
		// 				>
		// 					스타트업 성장 관리 솔루션
		// 				</Typography>
		// 				<Box display="flex" gap={0.5} textAlign={'center'}>
		// 					<Typography mt="auto" mb="auto">
		// 						서포티는 스타트업과
		// 					</Typography>
		// 					<Typography
		// 						bgcolor={'primary.main'}
		// 						p={'3px'}
		// 						color={'common.white'}
		// 					>
		// 						함께 성장하는 동행자
		// 					</Typography>
		// 					<Typography mt="auto" mb="auto">
		// 						입니다.
		// 					</Typography>
		// 				</Box>
		// 			</Box>
		// 		</Box>
		// 	</Box>

		// 	{/** 섹션 2 */}
		// 	<Grid container justifyContent={'center'}>
		// 		<Box pt={10} pb={10} width="70%">
		// 			<Slider {...settings}>
		// 				<Box display="flex">
		// 					<Box mb={5}>
		// 						<Typography fontWeight={600} mb={1}>
		// 							법인계좌 연동으로 한눈에 보는
		// 						</Typography>
		// 						<Typography color="primary.main" variant="h3">
		// 							RunWay BurnRate
		// 						</Typography>
		// 					</Box>
		// 					<Box
		// 						display={'flex'}
		// 						mb={5}
		// 						justifyContent={'center'}
		// 						flexWrap={'wrap'}
		// 						// sx={{
		// 						// 	display: { xs: 'none', md: 'block' },
		// 						// }}
		// 					>
		// 						<img
		// 							src={'/images/main/runwayPC.png'}
		// 							alt={'runwayPC'}
		// 							width={'70%'}
		// 						/>
		// 						<img
		// 							src={'/images/main/runwayMobile.png'}
		// 							alt={'runwayMobile'}
		// 							width={'6%'}
		// 							style={{
		// 								position: 'absolute',
		// 								marginLeft: '10%',
		// 								marginTop: '2%',
		// 							}}
		// 						/>
		// 					</Box>
		// 				</Box>
		// 				<Box display="flex">
		// 					<Box mb={5}>
		// 						<Typography fontWeight={600} mb={1}>
		// 							쉽고 편하게 관리하는
		// 						</Typography>
		// 						<Typography color="primary.main" variant="h3">
		// 							OKR / KPI 성과지표
		// 						</Typography>
		// 					</Box>
		// 					<Box
		// 						display={'flex'}
		// 						mb={5}
		// 						justifyContent={'center'}
		// 					>
		// 						<img
		// 							src={'/images/main/okrPC.png'}
		// 							alt={'okrPC'}
		// 							width={'70%'}
		// 						/>
		// 						<img
		// 							src={'/images/main/okrMobile.png'}
		// 							alt={'okrMobile'}
		// 							width={'6%'}
		// 							style={{
		// 								position: 'absolute',
		// 								marginLeft: '10%',
		// 								marginTop: '2%',
		// 							}}
		// 						/>
		// 					</Box>
		// 				</Box>
		// 			</Slider>
		// 		</Box>
		// 	</Grid>

		// 	{/** 섹션 3 */}
		// 	{
		// 		<Box
		// 			sx={{
		// 				display: { xs: 'none', md: 'block' },
		// 				width: '100%',
		// 			}}
		// 		>
		// 			<Box width="100%" bgcolor={'primary.light'} pt={8} pb={8}>
		// 				<Box display="flex" gap={20} justifyContent={'center'}>
		// 					<img
		// 						src={'/images/main/경영.png'}
		// 						alt={'경영'}
		// 						width={'145px'}
		// 						height={'145px'}
		// 					/>
		// 					<img
		// 						src={'/images/main/투자.png'}
		// 						alt={'투자'}
		// 						width={'145px'}
		// 						height={'145px'}
		// 					/>
		// 				</Box>
		// 				<Box
		// 					display="flex"
		// 					gap={10}
		// 					height={'145px'}
		// 					justifyContent={'center'}
		// 				>
		// 					<img
		// 						src={'/images/main/변호사.png'}
		// 						alt={'변호사'}
		// 						width={'145px'}
		// 						height={'145px'}
		// 					/>
		// 					<Box textAlign={'center'} mt="auto" mb="auto">
		// 						<Typography variant="h5" fontWeight={'600'}>
		// 							경영, 투자, 마케팅, 세무, 노무, 변호사 등
		// 						</Typography>
		// 						<Typography variant="h5" fontWeight={'600'}>
		// 							다양한 분야에서의
		// 						</Typography>
		// 						<Box display="flex" gap={1}>
		// 							<Typography
		// 								variant="h5"
		// 								color="primary.main"
		// 								fontWeight={'600'}
		// 							>
		// 								세미나, 컨설팅, 멘토링, QA
		// 							</Typography>
		// 							<Typography variant="h5" fontWeight={'600'}>
		// 								서비스 제공
		// 							</Typography>
		// 						</Box>
		// 					</Box>
		// 					<img
		// 						src={'/images/main/세무.png'}
		// 						alt={'세무'}
		// 						width={'145px'}
		// 						height={'145px'}
		// 					/>
		// 				</Box>
		// 				<Box display="flex" gap={20} justifyContent={'center'}>
		// 					<img
		// 						src={'/images/main/마케팅.png'}
		// 						alt={'마케팅'}
		// 						width={'145px'}
		// 						height={'145px'}
		// 					/>
		// 					<img
		// 						src={'/images/main/노무.png'}
		// 						alt={'노무'}
		// 						width={'145px'}
		// 						height={'145px'}
		// 					/>
		// 				</Box>
		// 			</Box>
		// 		</Box>
		// 	}
		// 	{
		// 		<Box
		// 			sx={{
		// 				display: { md: 'none', xs: 'block' },
		// 				width: '100%',
		// 			}}
		// 		>
		// 			<Box width="100%" bgcolor={'primary.light'} pt={8} pb={8}>
		// 				<Box textAlign={'center'} mt="auto" mb="auto">
		// 					<Typography variant="h5" fontWeight={'600'}>
		// 						경영, 투자, 마케팅, 세무, 노무, 변호사 등
		// 					</Typography>
		// 					<Typography variant="h5" fontWeight={'600'}>
		// 						다양한 분야에서의
		// 					</Typography>
		// 					<Box
		// 						display="flex"
		// 						gap={1}
		// 						width="100%"
		// 						justifyContent={'center'}
		// 					>
		// 						<Typography
		// 							variant="h5"
		// 							color="primary.main"
		// 							fontWeight={'600'}
		// 						>
		// 							세미나, 컨설팅, 멘토링, QA
		// 						</Typography>
		// 						<Typography variant="h5" fontWeight={'600'}>
		// 							서비스 제공
		// 						</Typography>
		// 					</Box>
		// 				</Box>
		// 			</Box>
		// 		</Box>
		// 	}

		// 	{/** 섹션 4 */}
		// 	<Box width="100%" pb={8}>
		// 		<Box ml="auto" mr="auto" mt={20} mb={20}>
		// 			<Box
		// 				display={'flex'}
		// 				flexWrap={'wrap'}
		// 				gap={4}
		// 				justifyContent={'center'}
		// 			>
		// 				{data1.map((item, index) => {
		// 					return (
		// 						<Box
		// 							p={3.5}
		// 							borderRadius={4}
		// 							width={'280px'}
		// 							height={'160px'}
		// 							boxShadow={
		// 								'rgb(213, 212, 239) 0px 4px 20px'
		// 							}
		// 							textAlign={'center'}
		// 							key={index}
		// 						>
		// 							<Typography
		// 								color={'primary.main'}
		// 								fontWeight={'600'}
		// 							>
		// 								PROBLEM{' ' + (index + 1)}
		// 							</Typography>
		// 							<Box mt={2.5} textAlign={'center'}>
		// 								<Typography
		// 									variant={'h5'}
		// 									fontWeight={'500'}
		// 								>
		// 									{item.text1}
		// 								</Typography>
		// 								<Typography
		// 									variant={'h5'}
		// 									fontWeight={'500'}
		// 								>
		// 									{item.text2}
		// 								</Typography>
		// 								<Typography
		// 									variant={'h5'}
		// 									fontWeight={'500'}
		// 								>
		// 									{item.text3}
		// 								</Typography>
		// 							</Box>
		// 						</Box>
		// 					);
		// 				})}
		// 			</Box>
		// 		</Box>
		// 		<Box width="100px" ml="auto" mr="auto">
		// 			<Typography
		// 				color="secondary.main"
		// 				fontWeight={600}
		// 				variant="h1"
		// 				marginBottom={'-100px'}
		// 				marginTop={'-100px'}
		// 			>
		// 				SOLVE
		// 			</Typography>
		// 			<img
		// 				src={'/images/main/arrow.png'}
		// 				alt="Logo"
		// 				width={'90px'}
		// 				height={'130px'}
		// 			/>
		// 		</Box>
		// 		<Box
		// 			bgcolor={'primary.main'}
		// 			py={1.5}
		// 			textAlign={'center'}
		// 			mt={3}
		// 		>
		// 			<Typography
		// 				fontWeight={600}
		// 				variant="h3"
		// 				color="common.white"
		// 			>
		// 				Private IR 진행과 데모데이 개최
		// 			</Typography>
		// 		</Box>
		// 	</Box>

		// 	{/** 섹션 5 */}
		// 	<Box
		// 		textAlign={'center'}
		// 		display="flex"
		// 		gap={2}
		// 		flexDirection={'column'}
		// 		m="auto"
		// 		pt={10}
		// 		pb={10}
		// 		width={'100%'}
		// 	>
		// 		<Typography variant="h3" fontWeight={'400'}>
		// 			서포티의 파트너가 제공하는
		// 		</Typography>
		// 		<Typography variant="h3">
		// 			혜택 제공 & 파트너사 서비스 할인 제공
		// 		</Typography>
		// 		<Box display="flex" gap={'5%'} mt={5} mb={5}>
		// 			{data.map((item, index) => {
		// 				return (
		// 					<img
		// 						src={item.srcPath}
		// 						alt={item.alt}
		// 						width={'145px'}
		// 						height={'45px'}
		// 					/>
		// 				);
		// 			})}
		// 		</Box>
		// 		<SupportiButton
		// 			contents={'파트너스 페이지 이동'}
		// 			variant="contained"
		// 			onClick={() => router.push('/partners')}
		// 			style={{
		// 				width: '200px',
		// 				marginRight: 'auto',
		// 				marginLeft: 'auto',
		// 			}}
		// 		/>
		// 	</Box>

		// 	{/** 섹션 6 */}

		// 	<Box
		// 		width="100%"
		// 		bgcolor={'#16263D'}
		// 		justifyContent={'center'}
		// 		textAlign={'center'}
		// 		display={'flex'}
		// 		flexDirection={'column'}
		// 	>
		// 		<Box
		// 			m="auto"
		// 			gap={1}
		// 			display={'flex'}
		// 			flexDirection={'column'}
		// 			justifyContent={'center'}
		// 			pt={14}
		// 			pb={10}
		// 		>
		// 			<Box gap={4} display={'flex'}>
		// 				<Box>
		// 					<img
		// 						src={'/images/main/커피챗종.png'}
		// 						alt={'종'}
		// 						width={'150px'}
		// 						height={'150px'}
		// 						style={{
		// 							marginLeft: 'auto',
		// 							marginRight: 'auto',
		// 							marginBottom: '15px',
		// 						}}
		// 					/>
		// 					<Typography color="common.white">
		// 						커피챗 알람
		// 					</Typography>
		// 				</Box>
		// 				<EastIcon
		// 					sx={{
		// 						color: 'common.white',
		// 						mt: 'auto',
		// 						mb: 'auto',
		// 					}}
		// 				/>
		// 				<Box>
		// 					<img
		// 						src={'/images/main/커피챗손.png'}
		// 						alt={'손'}
		// 						width={'150px'}
		// 						height={'150px'}
		// 						style={{
		// 							marginLeft: 'auto',
		// 							marginRight: 'auto',
		// 							marginBottom: '15px',
		// 						}}
		// 					/>
		// 					<Typography color="common.white">
		// 						상호 승인 시 커피챗 매칭
		// 					</Typography>
		// 				</Box>
		// 				<EastIcon
		// 					sx={{
		// 						color: 'common.white',
		// 						mt: 'auto',
		// 						mb: 'auto',
		// 					}}
		// 				/>
		// 				<Box>
		// 					<img
		// 						src={'/images/main/커피챗.png'}
		// 						alt={'커피챗'}
		// 						width={'140px'}
		// 						height={'140px'}
		// 						style={{
		// 							marginLeft: 'auto',
		// 							marginRight: 'auto',
		// 							marginBottom: '15px',
		// 						}}
		// 					/>
		// 					<Typography color="common.white">커피챗</Typography>
		// 				</Box>
		// 			</Box>

		// 			<Typography color="common.white" mt={7}>
		// 				매월 만나고 싶은 사람을 1명씩 ! 무료로 이용 가능!
		// 			</Typography>
		// 			<Box
		// 				display="flex"
		// 				textAlign={'center'}
		// 				gap={0.5}
		// 				justifyContent={'center'}
		// 			>
		// 				<Typography color="info.main" variant="h5">
		// 					상시
		// 				</Typography>
		// 				<Typography color="common.white" mt="auto" mb="auto">
		// 					진행
		// 				</Typography>
		// 			</Box>
		// 		</Box>
		// 	</Box>

		// 	{/** 섹션 7 */}
		// 	<Box
		// 		width="100%"
		// 		justifyContent={'center'}
		// 		pt={10}
		// 		display={'flex'}
		// 		flexDirection={'column'}
		// 		bgcolor={'primary.main'}
		// 		pb={10}
		// 	>
		// 		<Box
		// 			textAlign={'center'}
		// 			m="auto"
		// 			display="flex"
		// 			gap={4}
		// 			flexDirection={'column'}
		// 			justifyContent={'center'}
		// 		>
		// 			<Box
		// 				display="flex"
		// 				gap={2}
		// 				flexWrap={'wrap'}
		// 				justifyContent={'center'}
		// 			>
		// 				<Box>
		// 					<Box
		// 						width={'350px'}
		// 						height="200px"
		// 						borderRadius={'20px'}
		// 						bgcolor={'primary.main'}
		// 						sx={{
		// 							background: '#F8F8F833',
		// 						}}
		// 						zIndex={3}
		// 						textAlign={'left'}
		// 						p={4}
		// 					>
		// 						<Typography color="info.main" mb={3}>
		// 							최00 AI 스타트업 대표
		// 						</Typography>
		// 						<Typography
		// 							color="common.white"
		// 							lineHeight={'20px'}
		// 						>
		// 							초기 스타트업이다 보니 여러 가지 신경 써야
		// 							할 것이 많은데 재무와 경영 지표 관리에
		// 							대해서만큼은 큰 신경을 안 써도 되어
		// 							좋습니다.
		// 						</Typography>
		// 					</Box>
		// 					<Box
		// 						sx={{
		// 							width: '15px',
		// 							height: '15px',
		// 							rotate: '90deg',
		// 							position: 'absolute',
		// 							marginLeft: '280px',
		// 							// marginTop: '-10px',
		// 							// bgcolor: 'primary.main',
		// 							opacity: 0.2,
		// 							zIndex: 2,
		// 							borderBottom: '10px solid transparent',
		// 							borderTop: '10px solid transparent',
		// 							borderLeft: '10px solid #F8F8F8',
		// 							borderRight: '10px solid transparent',
		// 						}}
		// 					/>
		// 				</Box>
		// 				<Box>
		// 					<Box
		// 						width={'350px'}
		// 						height="200px"
		// 						borderRadius={'20px'}
		// 						bgcolor={'primary.main'}
		// 						sx={{
		// 							background: '#F8F8F833',
		// 						}}
		// 						zIndex={3}
		// 						textAlign={'left'}
		// 						p={4}
		// 					>
		// 						<Typography color="info.main" mb={3}>
		// 							홍00 커머스 스타트업 대표
		// 						</Typography>
		// 						<Typography
		// 							color="common.white"
		// 							lineHeight={'20px'}
		// 						>
		// 							아는 대표님의 추천으로 써봤는데 실제로 쓰는
		// 							과정이 간편하다 보니 사용하기 편리합니다.
		// 							저희는 아무래도 인원이 있다 보니 모든 인원이
		// 							지표를 보고 써야 해서 지표 관리가 무엇보다
		// 							중요한데 서포티를 쓰니 일이 1/3로 줄었어요!
		// 						</Typography>
		// 					</Box>
		// 					<Box
		// 						sx={{
		// 							width: '15px',
		// 							height: '15px',
		// 							rotate: '90deg',
		// 							position: 'absolute',
		// 							marginLeft: '280px',
		// 							// marginTop: '-10px',
		// 							// bgcolor: 'primary.main',
		// 							opacity: 0.2,
		// 							zIndex: 2,
		// 							borderBottom: '10px solid transparent',
		// 							borderTop: '10px solid transparent',
		// 							borderLeft: '10px solid #F8F8F8',
		// 							borderRight: '10px solid transparent',
		// 						}}
		// 					/>
		// 				</Box>
		// 			</Box>
		// 			<Box
		// 				display="flex"
		// 				gap={2}
		// 				flexWrap={'wrap'}
		// 				justifyContent={'center'}
		// 			>
		// 				<Box>
		// 					<Box
		// 						width={'350px'}
		// 						height="200px"
		// 						borderRadius={'20px'}
		// 						bgcolor={'primary.main'}
		// 						sx={{
		// 							background: '#F8F8F833',
		// 						}}
		// 						zIndex={3}
		// 						textAlign={'left'}
		// 						p={4}
		// 					>
		// 						<Typography color="info.main" mb={3}>
		// 							김00 SaaS 스타트업 대표
		// 						</Typography>
		// 						<Typography
		// 							color="common.white"
		// 							lineHeight={'20px'}
		// 						>
		// 							초기 스타트업에 딱 필요한 서비스인 것
		// 							같습니다. 실제 여러 데이터를 비교할 수 있고
		// 							지표를 한눈에 볼 수 있어 편리합니다.
		// 							무엇보다 투자사에게 바로 링크를 공유해
		// 							전달드릴 수 있으니 시간이 많이 단축되었어요!
		// 						</Typography>
		// 					</Box>
		// 					<Box
		// 						sx={{
		// 							width: '15px',
		// 							height: '15px',
		// 							rotate: '90deg',
		// 							position: 'absolute',
		// 							marginLeft: '280px',
		// 							opacity: 0.2,
		// 							zIndex: 2,
		// 							borderBottom: '10px solid transparent',
		// 							borderTop: '10px solid transparent',
		// 							borderLeft: '10px solid #F8F8F8',
		// 							borderRight: '10px solid transparent',
		// 						}}
		// 					/>
		// 				</Box>
		// 				<Box>
		// 					<Box
		// 						width={'350px'}
		// 						height="200px"
		// 						borderRadius={'20px'}
		// 						bgcolor={'primary.main'}
		// 						sx={{
		// 							background: '#F8F8F833',
		// 						}}
		// 						zIndex={3}
		// 						textAlign={'left'}
		// 						p={4}
		// 					>
		// 						<Typography color="info.main" mb={3}>
		// 							노00 헬스케어 스타트업 이사
		// 						</Typography>
		// 						<Typography
		// 							color="common.white"
		// 							lineHeight={'20px'}
		// 						>
		// 							초기 스타트업에서 실무를 총괄하는 입장에서
		// 							편리한 서비스인 것 같아요. 아직 많은
		// 							기능들이 있지는 않지만 재무, 경영 지표
		// 							관리의 차원에서는 꼭 필요한 서비스인 것
		// 							같습니다.
		// 						</Typography>
		// 					</Box>
		// 					<Box
		// 						sx={{
		// 							width: '15px',
		// 							height: '15px',
		// 							rotate: '90deg',
		// 							position: 'absolute',
		// 							marginLeft: '280px',
		// 							opacity: 0.2,
		// 							zIndex: 2,
		// 							borderBottom: '10px solid transparent',
		// 							borderTop: '10px solid transparent',
		// 							borderLeft: '10px solid #F8F8F8',
		// 							borderRight: '10px solid transparent',
		// 						}}
		// 					/>
		// 				</Box>
		// 			</Box>
		// 		</Box>
		// 	</Box>

		// 	<Grid item xs={12}>
		// 		<Box
		// 			textAlign={'center'}
		// 			position="absolute"
		// 			bgcolor={'rgba(0, 0, 0, 0.7)'}
		// 			width={'100%'}
		// 			height={'400px'}
		// 			display={'flex'}
		// 			flexDirection={'column'}
		// 			gap={2}
		// 			sx={{ p: { md: 15, xs: 5 } }}
		// 			justifyContent={'center'}
		// 		>
		// 			<Typography color={'white'} variant="h4" fontWeight={'500'}>
		// 				여러분의 사업을 편리하게 관리하세요
		// 			</Typography>
		// 			<Typography color={'white'} variant="subtitle1">
		// 				서포티에서 최적의 솔루션을 제안합니다.
		// 			</Typography>
		// 			<SupportiButton
		// 				contents="무료로 시작하기"
		// 				onClick={() => {
		// 					if (!memberId) {
		// 						router.push('/auth/sign_in');
		// 					} else {
		// 						router.push(
		// 							'/internal_service/financial_solution/account_manage'
		// 						);
		// 					}
		// 				}}
		// 				variant="contained"
		// 				style={{
		// 					width: '200px',
		// 					marginLeft: 'auto',
		// 					marginRight: 'auto',
		// 				}}
		// 			/>
		// 		</Box>
		// 		<img
		// 			style={{ zIndex: -100, width: '100%', height: '400px' }}
		// 			src={'/images/main/mainBackgroundImg.jpg'}
		// 			alt="img"
		// 		/>
		// 	</Grid>

		// 	<PopUpModal
		// 		modalOpen={openPopUp}
		// 		setModalOpen={setOpenPopUp}
		// 		uiData={
		// 			<Box
		// 				display={'flex'}
		// 				justifyContent={'space-between'}
		// 				flexDirection={'column'}
		// 				alignItems={'center'}
		// 				gap={1}
		// 			>
		// 				<Box display={'flex'}>
		// 					<Image
		// 						src={'/images/main/Hime_IR.svg'}
		// 						alt={'notice'}
		// 						width={400}
		// 						height={600}
		// 					/>

		// 					<CloseIcon
		// 						sx={{ cursor: 'pointer' }}
		// 						onClick={() => setOpenPopUp(false)}
		// 					/>
		// 				</Box>

		// 				<Box display={'flex'} gap={2}>
		// 					<SupportiButton
		// 						contents={'등록하러가기'}
		// 						variant="contained"
		// 						onClick={() => router.push('/my_page/ir_data')}
		// 						style={{
		// 							width: '150px',
		// 							marginRight: 'auto',
		// 							marginLeft: 'auto',
		// 						}}
		// 					/>
		// 					<SupportiButton
		// 						contents={'닫기'}
		// 						variant="outlined"
		// 						onClick={() => setOpenPopUp(false)}
		// 						style={{
		// 							width: '150px',
		// 							marginRight: 'auto',
		// 							marginLeft: 'auto',
		// 						}}
		// 					/>
		// 				</Box>

		// 				<Box display="flex">
		// 					<SupportiInput
		// 						type="checkbox"
		// 						value={isTodayNotShow}
		// 						setValue={setIsTodayNotShow}
		// 					/>
		// 					<Typography
		// 						mt="auto"
		// 						mb="auto"
		// 						ml={-2.5}
		// 						fontWeight={500}
		// 						variant="body1"
		// 					>
		// 						오늘 하루 보지 않기
		// 					</Typography>
		// 				</Box>
		// 			</Box>
		// 		}
		// 	/>

		// 	<PopUpModal
		// 		modalOpen={openFirstInfoPopUp}
		// 		setModalOpen={setOpenFirstInfoPopUp}
		// 		uiData={
		// 			<Box
		// 				display={'flex'}
		// 				justifyContent={'space-between'}
		// 				flexDirection={'column'}
		// 				alignItems={'center'}
		// 				gap={1}
		// 			>
		// 				<Box display={'flex'}>
		// 					<Typography variant='subtitle1'>
		// 						비즈니스 정보 입력 후 다양한 서비스를
		// 						이용해보세요!
		// 					</Typography>

		// 					<CloseIcon
		// 						sx={{ cursor: 'pointer' }}
		// 						onClick={() => setOpenFirstInfoPopUp(false)}
		// 					/>
		// 				</Box>

		// 				<Box display={'flex'} gap={2}>
		// 					<SupportiButton
		// 						contents={'등록하러가기'}
		// 						variant="contained"
		// 						onClick={() => router.push('/my_page/ir_data')}
		// 						style={{
		// 							width: '150px',
		// 							marginRight: 'auto',
		// 							marginLeft: 'auto',
		// 						}}
		// 					/>
		// 					<SupportiButton
		// 						contents={'닫기'}
		// 						variant="outlined"
		// 						onClick={() => setOpenFirstInfoPopUp(false)}
		// 						style={{
		// 							width: '150px',
		// 							marginRight: 'auto',
		// 							marginLeft: 'auto',
		// 						}}
		// 					/>
		// 				</Box>
		// 			</Box>
		// 		}
		// 	/>
		// </Grid>
	);
};

export default Page;
