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
import { reviewConfig } from '../../configs/data/ReviewConfig';

import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import ArrowDropDownCircleIcon from '@mui/icons-material/ArrowDropDownCircle';

import DefaultController from '@leanoncompany/supporti-ark-office-project/src/controller/default/DefaultController';

import { useAppMember } from '../../src/hooks/useAppMember';
import SupportiButton from '../../src/views/global/SupportiButton';
import AccordianBox from '../../src/views/local/common/AccordianBox/AccordianBox';

type Props = {};

const Page: NextPage = () => {
	const router = useRouter();
	const { memberId } = useAppMember();
	const containerRef = React.useRef<HTMLDivElement>(null);
	const focusFirst = React.useRef<HTMLDivElement>(null);

	const businessInfoController = new DefaultController('Business'); // 유저 정보 최초 입력 컨트롤러 (비즈니스 정보)
	const insightController = new DefaultController('Insight');
	//* States
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

	function setCookie(name, value, exp) {
		const date = new Date();
		date.setTime(date.getTime() + exp * 24 * 60 * 60 * 1000);
		document.cookie = `${name}=${value};expires=${date.toUTCString()};path=/`;
	}

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
		console.log(findOption);
		faqController.findAllItems(
			findOption,
			(res) => {
				setFaqList(res.data.result.rows.splice(0, 3));
			},
			(err) => console.log(err)
		);
	};

	useEffect(() => {
		getFaqList(faqTab);
		//faq 카테고리 리스트 조회
		const faqCategoryController = new DefaultController('FaqBoardCategory');
		faqCategoryController.findAllItems(
			{},
			(res) => {
				const categoryList: any = [
					{
						CATEGORY: '전체',
						FAQ_BOARD_CATEGORY_IDENTIFICATION_CODE: 0,
					},
				];
				res.data.result.rows.map((item: any) => {
					categoryList.push({
						CATEGORY: item.CATEGORY,
						FAQ_BOARD_CATEGORY_IDENTIFICATION_CODE:
							item.FAQ_BOARD_CATEGORY_IDENTIFICATION_CODE,
					});
				});
				setFaqCategoryList(categoryList);
			},
			(err) => console.log(err)
		);
	}, []);

	useEffect(() => {
		getInsight();
	}, [memberId]);

	const onMoveToFocus = (focus: React.RefObject<HTMLDivElement>) => {
		focus.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
	};

	return (
		<Grid container width={'100%'}>
			{/** 섹션 1 */}
			<Grid container display={'flex'} alignSelf={'center'}>
				<Box width={'100%'} alignSelf="center">
					<Slider {...settings}>
						<Box
							sx={{
								backgroundImage: `url(/images/main/banner/001.png)`,
								backgroundSize: 'cover',
								width: '1000px',
								height: '320px',
							}}
						/>
						<Box
							sx={{
								backgroundImage: `url(/images/main/banner/002.png)`,
								backgroundSize: 'cover',
								width: '1000px',
								height: '320px',
							}}
						/>
						<Box
							sx={{
								backgroundImage: `url(/images/main/banner/003.png)`,
								backgroundSize: 'cover',
								width: '1000px',
								height: '320px',
							}}
						/>
						<Box
							sx={{
								backgroundImage: `url(/images/main/banner/004.png)`,
								backgroundSize: 'cover',
								width: '1000px',
								height: '320px',
							}}
						/>
						<Box
							sx={{
								backgroundImage: `url(/images/main/banner/005.png)`,
								backgroundSize: 'cover',
								width: '1000px',
								height: '320px',
							}}
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
					<Button
						sx={{
							color: 'gray',
							cursor: 'pointer',
							display: 'flex',
							ml: 100,
						}}
						onClick={() => router.push('/renewal/insight')}
					>
						인사이트 보러가기 &gt;
					</Button>
					<Box display="flex" gap={3} flexWrap="wrap" mt={1} mb={3}>
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
											`/renewal/insight/${item.INSIGHT_IDENTIFICATION_CODE}`
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
												JSON.parse(item.IMAGE).length >
												0
													? `url(${
															JSON.parse(
																item.IMAGE
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
					창업가를 위한 마켓플레이스
					<br />
					필요한거 이 곳에 다있다!
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
				display={'flex'}
				flexDirection={'column'}
				alignItems={'center'}
				mx={'auto'}
				my={20}
			>
				<img
					src="/images/market_place/introduce.png"
					alt="introduce"
					style={{ width: '100%' }}
				/>
			</Box>
			{/** 섹션 5 */}
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
											width={'350px'}
											height="200px"
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
			</Grid>
		</Grid>
	);
};

export default Page;
