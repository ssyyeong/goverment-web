import {
	Box,
	Grid,
	Typography,
	IconButton,
	Button,
	Divider,
} from '@mui/material';
import React from 'react';
import { NextPage } from 'next';

import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { reviewConfig } from '../configs/data/ReviewConfig';

import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import ArrowDropDownCircleIcon from '@mui/icons-material/ArrowDropDownCircle';
import CloseIcon from '@mui/icons-material/Close';

import DefaultController from '@leanoncompany/supporti-ark-office-project/src/controller/default/DefaultController';

import { CookieManager } from '@leanoncompany/supporti-utility';
import { useAppMember } from '../src/hooks/useAppMember';
import SupportiButton from '../src/views/global/SupportiButton';
import PopUpModal from '../src/views/local/common/PopUpModal/PopUpModal';
import { AppMemberController } from '../src/controller/AppMemberController';

const Page: NextPage = () => {
	const router = useRouter();
	const { memberId, memberIsFirstLogin } = useAppMember();

	const containerRef = React.useRef<HTMLDivElement>(null);
	const focusFirst = React.useRef<HTMLDivElement>(null);

	const appMemberController = new DefaultController('AppMember');
	const insightController = new DefaultController('Insight');

	const cookie = new CookieManager();

	//* States
	const [openPopUp, setOpenPopUp] = React.useState(false); //테마 모달
	const [selectTheme, setSelectTheme] = React.useState<string[]>([]);

	/**
	 * 인사이트 리스트
	 */
	const [insightDataList, setInsighteDataList] = React.useState([]);
	const [faqList, setFaqList] = React.useState([]);
	const [faqCategoryList, setFaqCategoryList] = React.useState([]);
	const [faqTab, setFaqTab] = React.useState({
		CATEGORY: '전체',
		FAQ_BOARD_CATEGORY_IDENTIFICATION_CODE: 0,
	});

	const data1 = [
		{
			text1: 'A : 자금이 부족한데 투자를 받아야 할지 보증 대출을 이용해야 할지 모르겠어요!',
			text2: '',
		},
		{
			text1: 'B : 시간도 돈도 부족한 우리, 어디에 자원을 집중해야 할까요?',
			text2: ' ',
		},
		{
			text1: 'C : 제품을 잘 만들고 싶은데 어떻게 해야 할까요?',
			text2: '',
		},
	];

	const themeList = [
		'계좌개설',
		'법인설립',
		'1:1멘토링',
		'오픈이노베이션',
		'투자',
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
		dots: false,
		infinite: true,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: false,
		nextArrow: <SampleNextArrow />,
		prevArrow: <SamplePrevArrow />,
		autoplay: true,
		autoplaySpeed: 3000,
	};

	/**
	 * 인사이트 리스트 가져오기
	 */
	const getInsight = () => {
		insightController.findAllItems(
			{
				LIMIT: 3,
			},
			(res) => {
				if (res.data.result) {
					setInsighteDataList(res.data.result.rows);
				}
			}
		);
	};

	const getFaqList = (tab: any) => {
		//faq 리스트 조회
		const faqController = new DefaultController('FaqBoardContent');
		const findOption =
			tab.FAQ_BOARD_CATEGORY_IDENTIFICATION_CODE !== 0
				? {
						FAQ_BOARD_CATEGORY_IDENTIFICATION_CODE:
							tab.FAQ_BOARD_CATEGORY_IDENTIFICATION_CODE,
				  }
				: {};
		faqController.findAllItems(
			findOption,
			(res) => {
				setFaqList(res.data.result.rows.splice(0, 3));
			},
			(err) => console.log(err)
		);
	};

	// useEffect(() => {
	// 	getFaqList(faqTab);
	// 	//faq 카테고리 리스트 조회
	// 	const faqCategoryController = new DefaultController('FaqBoardCategory');
	// 	faqCategoryController.findAllItems(
	// 		{},
	// 		(res) => {
	// 			const categoryList: any = [
	// 				{
	// 					CATEGORY: '전체',
	// 					FAQ_BOARD_CATEGORY_IDENTIFICATION_CODE: 0,
	// 				},
	// 			];
	// 			res.data.result.rows.map((item: any) => {
	// 				categoryList.push({
	// 					CATEGORY: item.CATEGORY,
	// 					FAQ_BOARD_CATEGORY_IDENTIFICATION_CODE:
	// 						item.FAQ_BOARD_CATEGORY_IDENTIFICATION_CODE,
	// 				});
	// 			});
	// 			setFaqCategoryList(categoryList);
	// 		},
	// 		(err) => console.log(err)
	// 	);
	// }, []);

	const closeThemePopUp = async () => {
		setOpenPopUp(false);

		appMemberController.updateItem(
			{
				APP_MEMBER_IDENTIFICATION_CODE: memberId,
				IS_FIRST_LOGIN: 'N',
			},
			(res) => {
				console.log(res);
			}
		);
	};

	//테마 모달 처리
	useEffect(() => {
		if (memberId && memberIsFirstLogin == 'Y') {
			setOpenPopUp(true);
		}
	}, [memberId]);

	useEffect(() => {
		getInsight();
	}, []);

	const onMoveToFocus = (focus: React.RefObject<HTMLDivElement>) => {
		focus.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
	};

	return (
		<Grid container width={'100%'}>
			{/** 섹션 1 */}
			<Grid container display={'flex'}>
				<Box width={'100%'}>
					<Slider {...settings}>
						<img
							src="/images/main/banner/001.png"
							alt="banner"
							style={{ width: '100%', height: '250px' }}
						/>
						<img
							src="/images/main/banner/002.png"
							alt="banner"
							style={{ width: '100%', height: '250px' }}
						/>
						<img
							src="/images/main/banner/003.png"
							alt="banner"
							style={{ width: '100%', height: '250px' }}
						/>
						<img
							src="/images/main/banner/004.png"
							alt="banner"
							style={{ width: '100%', height: '250px' }}
						/>
						<img
							src="/images/main/banner/005.png"
							alt="banner"
							style={{ width: '100%', height: '250px' }}
						/>
					</Slider>
				</Box>
			</Grid>

			{/** 섹션 2 */}
			{
				<Box
					sx={{
						width: '100%',
					}}
					display={'flex'}
					flexDirection={'column'}
					alignItems={'center'}
					my={5}
				>
					<Box
						ml={{
							xs: 'auto',
							sm: 100,
							mb: 1,
						}}
					>
						<Button
							sx={{
								mb: 1,
								color: 'gray',
								cursor: 'pointer',
								display: 'flex',
							}}
							onClick={() =>
								router.push('/external_service/insight')
							}
						>
							인사이트 보러가기 &gt;
						</Button>
					</Box>
					<Box
						display="flex"
						gap={3}
						flexWrap="wrap"
						mt={1}
						mb={3}
						sx={{
							width: '90%',
							margin: 'auto',
							display: 'flex',
							flexWrap: 'wrap',
							justifyContent: 'center',
						}}
					>
						{insightDataList?.map((item, index) => {
							return (
								<Box
									key={index}
									sx={{
										borderRadius: 2,
										boxShadow:
											'rgb(219, 219, 219) 0px 4px 10px',
										width: '300px',
										display: 'flex',
										flexDirection: 'column',
										gap: 2,
										cursor: 'pointer',
									}}
									onClick={() => {
										router.push(
											`/external_service/insight/${item.INSIGHT_IDENTIFICATION_CODE}`
										);
									}}
								>
									<Box
										sx={{
											position: 'relative',
											width: 300,
											height: 150,
											margin: '0 auto',
											borderTopLeftRadius: 5,
											borderTopRightRadius: 5,
											backgroundImage:
												JSON.parse(item?.IMAGE)
													?.length > 0
													? `url(${
															JSON.parse(
																item?.IMAGE
															)[0]
													  })`
													: `url(/images/main/container.jpg)`,
											backgroundSize: 'cover',
										}}
									></Box>
									<Box
										sx={{
											px: 2,
											display: 'flex',
											flexDirection: 'column',
											gap: 1,
										}}
									>
										{item.MarketPlaceCategory && (
											<Typography
												sx={{
													p: 1,
													border: '1px solid #c8c8c8',
													borderRadius: 5,
													cursor: 'pointer',
													width: 'fit-content',
													color: 'primary.main',
													wordBreak: 'keep-all',
												}}
											>
												{
													item.MarketPlaceCategory
														.CONTENT
												}
											</Typography>
										)}
										{item.CATEGORY && (
											<Typography
												sx={{
													p: 1,
													border: '1px solid #c8c8c8',
													borderRadius: 5,
													cursor: 'pointer',
													width: 'fit-content',
													color: 'primary.main',
													wordBreak: 'keep-all',
												}}
											>
												{item.CATEGORY}
											</Typography>
										)}
										<Typography
											variant="h6"
											fontWeight={600}
											sx={{ wordBreak: 'keep-all' }}
										>
											{item.TITLE}
										</Typography>
										<Typography
											variant="body1"
											fontWeight={400}
											sx={{
												pb: 2.5,
												wordBreak: 'keep-all',
												color: 'gray',
											}}
										>
											{item.AUTHOR}
										</Typography>
									</Box>
								</Box>
							);
						})}
					</Box>
				</Box>
			}
			<Divider
				sx={{
					width: '90%',
					ml: 'auto',
					mr: 'auto',
					color: 'secondary.dark',
				}}
			/>
			{/** 섹션 3 */}
			<Box
				sx={{
					width: '100%',
				}}
				display={'flex'}
				alignSelf={'center'}
				mx={'auto'}
				my={20}
				flexDirection={'column'}
				alignItems={'center'}
			>
				<Typography
					variant="h1"
					fontWeight={'600'}
					mb={5}
					sx={{ lineHeight: '1.5', textAlign: 'center' }}
				>
					창업가를 위한 데이터 기반
					<br />
					맞춤형 성장 솔루션
					<br />
					서포티
				</Typography>
				<ArrowDropDownCircleIcon
					sx={{
						fontSize: '50px',
						color: 'primary.main',
						margin: 'auto',
						cursor: 'pointer',
					}}
					onClick={() => {
						onMoveToFocus(focusFirst);
					}}
				/>
			</Box>
			{/** 섹션 4 */}
			<Box
				ref={focusFirst}
				width={'100%'}
				bgcolor={'primary.light'}
				display={'flex'}
				flexDirection={'column'}
				alignItems={'center'}
				mx={'auto'}
				my={{
					xs: 0,
					sm: 15,
				}}
				px={2}
				py={10}
			>
				<Box
					display={'flex'}
					flexWrap={'wrap'}
					gap={4}
					justifyContent={'center'}
					flexDirection={'column'}
				>
					<Typography
						variant="h2"
						fontWeight={'500'}
						lineHeight={'1.5'}
						sx={{
							wordBreak: 'keep-all',
							textAlign: 'center',
						}}
					>
						창업가들에게 부족한
						<br />
						돈, 시간, 제품
					</Typography>
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
			{/** 섹션 5 */}
			<Box
				width={'100%'}
				mb={5}
				display={'flex'}
				flexDirection={{
					xs: 'column',
					sm: 'row',
				}}
				gap={10}
				px={5}
				py={10}
				justifyContent={'center'}
			>
				<Box display={'flex'} flexDirection={'column'}>
					<img
						src="/images/main/signup2.png"
						alt="image"
						width={700}
						height={500}
					/>
				</Box>
				<Box display={'flex'} flexDirection={'column'} mt={10}>
					<Typography
						variant="h3"
						fontWeight={400}
						lineHeight={'1.5'}
						mb={2}
					>
						기본적인 데이터 입력만으로
					</Typography>
					<Typography
						variant="h3"
						fontWeight={600}
						lineHeight={'2'}
						ml={2}
					>
						1)맞춤형 솔루션 추천
						<br />
						2)IR 및 투자자 미팅
						<br />
						3)관심 테마 가입 및 커뮤니티 이용
					</Typography>
					<Typography
						variant="h3"
						fontWeight={400}
						lineHeight={'1.5'}
						mt={2}
						ml={2}
					>
						이 모든 것이 가능합니다.
					</Typography>
				</Box>
			</Box>
			{/** 섹션 6 */}
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
				<Typography
					sx={{ wordBreak: 'keep-all', textAlign: 'center' }}
					variant="h3"
					fontWeight={'400'}
				>
					성공한 창업가들의 Secret
				</Typography>
				<Typography
					sx={{ wordBreak: 'keep-all', textAlign: 'center' }}
					variant="h3"
				>
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
											width={{
												xs: '250px',
												sm: '350px',
											}}
											height={{
												xs: '280px',
												sm: '200px',
											}}
											textAlign={'left'}
											p={4}
										>
											<Typography
												sx={{
													wordBreak: 'keep-all',
													textAlign: 'center',
												}}
												variant="h3"
												mb={3}
											>
												{review.name}
											</Typography>
											<Typography
												sx={{
													wordBreak: 'keep-all',
													textAlign: 'center',
												}}
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
				<Typography
					sx={{ wordBreak: 'keep-all', textAlign: 'center' }}
					variant="h1"
					color={'primary.main'}
				>
					SUPPOR-T supports your business needs
				</Typography>
			</Box>
			{/* <Grid item xs={12}>
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
						sx={{ wordBreak: 'keep-all', textAlign: 'center' }}
						variant="h3"
						fontWeight={'500'}
						textAlign={'center'}
						mb={5}
					>
						서포티가 궁금합니다.
					</Typography>

					<Box
						sx={{
							display: 'flex',
							direction: 'row',
							flexWrap: 'wrap',
							gap: 1,
						}}
					>
						{faqCategoryList.map(
							(tab, index) =>
								index < 5 && (
									<Button
										key={index.toString()}
										onClick={async () => {
											setFaqTab(tab);
											getFaqList(tab);
										}}
										sx={{
											px: {
												xs: 'auto',
												sm: '20px',
											},
											py: {
												xs: 'auto',
												sm: '15px',
											},
											marginRight: '20px',
											borderRadius: '15px',
											backgroundColor:
												faqTab.CATEGORY == tab.CATEGORY
													? 'primary.main'
													: 'grey.300',
											color:
												faqTab.CATEGORY == tab.CATEGORY
													? 'white'
													: 'primary.main',

											'&:hover': {
												backgroundColor: 'primary.main',
												color: 'white',
											},
										}}
									>
										{tab.CATEGORY}
									</Button>
								)
						)}
					</Box>

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
					<SupportiButton
						contents={'FAQ 더보기'}
						variant="contained"
						style={{
							width: '200px',
							marginRight: 'auto',
							marginLeft: 'auto',
							marginTop: 5,
						}}
						onClick={() => {
							router.push('/customer_service/faq');
						}}
					/>
				</Box>
			</Grid> */}
			<PopUpModal
				modalOpen={openPopUp}
				setModalOpen={setOpenPopUp}
				uiData={
					<Box
						display={'flex'}
						flexDirection={'column'}
						alignItems={'center'}
						gap={5}
					>
						<Box display={'flex'} flexDirection={'column'}>
							<CloseIcon
								sx={{
									cursor: 'pointer',
									position: 'absolute',
									right: '15px',
									top: '15px',
								}}
								onClick={() => closeThemePopUp()}
							/>

							<Typography
								variant={'h4'}
								fontWeight={'600'}
								sx={{
									textAlign: 'center',
									my: 2,
								}}
							>
								관심있는 테마를 선택해주세요.
							</Typography>
							<img
								src="/images/main/Feedback.png"
								alt="image"
								width={200}
								height={200}
								style={{ margin: 'auto' }}
							/>
							<Box
								display={'flex'}
								gap={2}
								flexWrap="wrap"
								mt={3}
								mb={2}
							>
								{themeList?.map((item, index) => {
									return (
										<Typography
											key={index}
											fontWeight={
												selectTheme.includes(item) &&
												700
											}
											sx={{
												p: 1,
												borderRadius: 4,
												border: '1px solid #d1d1d1',
												cursor: 'pointer',
												color: selectTheme.includes(
													item
												)
													? 'primary.main'
													: 'common.black',
											}}
											onClick={() => {
												if (
													selectTheme.includes(item)
												) {
													setSelectTheme(
														selectTheme.filter(
															(data) =>
																data !== item
														)
													);
												} else {
													setSelectTheme([
														...selectTheme,
														item,
													]);
												}
											}}
										>
											{item}
										</Typography>
									);
								})}
							</Box>
						</Box>

						<Box display={'flex'} gap={2}>
							<SupportiButton
								contents={'테마 보러가기'}
								variant="contained"
								onClick={() => {
									if (selectTheme.length > 0) {
										closeThemePopUp();
										router.push('/external_service/theme');
									} else {
										alert('테마를 선택해주세요.');
									}
								}}
								style={{
									width: '150px',
									marginRight: 'auto',
									marginLeft: 'auto',
								}}
							/>
							<SupportiButton
								contents={'닫기'}
								variant="outlined"
								onClick={() => closeThemePopUp()}
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
		</Grid>
	);
};

export default Page;
