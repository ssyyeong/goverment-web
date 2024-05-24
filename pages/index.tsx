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
import PopUpModal from '../src/views/local/common/PopUpModal/PopUpModal';
import SupportiInput from '../src/views/global/SupportiInput';
import CloseIcon from '@mui/icons-material/Close';
import ReportGmailerrorredIcon from '@mui/icons-material/ReportGmailerrorred';
import Image from 'next/image';

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
		//임시 처리
		setOpenPopUp(true);
		// userIrInformationController.getOneItemByKey(
		// 	{
		// 		APP_MEMBER_IDENTIFICATION_CODE: memberId,
		// 	},
		// 	(res) => {
		// 		//유저 ir 정보 중 투자연혁(필수정보) 체크
		// 		if (
		// 			res.data.result !== null &&
		// 			JSON.parse(res.data.result.INVEST_INFO).length > 0
		// 		) {
		// 			setOpenPopUp(false);
		// 		} else {
		// 			setOpenPopUp(true);
		// 		}
		// 	},
		// 	(err) => {}
		// );
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
		getUserIrInfo();
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
	}, []);

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
			<PopUpModal
				modalOpen={openPopUp}
				setModalOpen={setOpenPopUp}
				uiData={
					<Box
						display={'flex'}
						justifyContent={'space-between'}
						flexDirection={'column'}
						alignItems={'center'}
						gap={1}
					>
						<Box display={'flex'}>
							{/* <Image
								src={'/images/main/Hime_IR.svg'}
								alt={'notice'}
								width={400}
								height={600}
							/> */}
							<Box
								sx={{
									width: '380px',
									height: '370px',
									textAlign: 'center',
								}}
							>
								<ReportGmailerrorredIcon
									sx={{
										width: '200px',
										height: '250px',
										fontSize: '80px',
										color: 'secondary.main',
									}}
								/>
								<Typography
									variant="h4"
									mb={2}
									fontWeight={600}
								>
									현재 서버 작업 중입니다.
								</Typography>
								<Typography variant="subtitle2" my={0.5}>
									일시적으로 접속이 불가하오니
									양해부탁드립니다.
								</Typography>
								<Typography variant="subtitle2">
									불편을 드려 죄송합니다.
								</Typography>
							</Box>
							<CloseIcon
								sx={{ cursor: 'pointer' }}
								onClick={() => setOpenPopUp(false)}
							/>
						</Box>

						{/* <Box display={'flex'} gap={2}>
							<SupportiButton
								contents={'등록하러가기'}
								variant="contained"
								onClick={() => router.push('/my_page/ir_data')}
								style={{
									width: '150px',
									marginRight: 'auto',
									marginLeft: 'auto',
								}}
							/>
							<SupportiButton
								contents={'닫기'}
								variant="outlined"
								onClick={() => setOpenPopUp(false)}
								style={{
									width: '150px',
									marginRight: 'auto',
									marginLeft: 'auto',
								}}
							/>
						</Box>

						<Box display="flex">
							<SupportiInput
								type="checkbox"
								value={isTodayNotShow}
								setValue={setIsTodayNotShow}
							/>
							<Typography
								mt="auto"
								mb="auto"
								ml={-2.5}
								fontWeight={500}
								variant="body1"
							>
								오늘 하루 보지 않기
							</Typography>
						</Box> */}
					</Box>
				}
			/>
		</Grid>
	);
};

export default Page;
