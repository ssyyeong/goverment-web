import React from 'react';

import {
	AppBar,
	Box,
	Button,
	Container,
	IconButton,
	Menu,
	MenuItem,
	Toolbar,
	Typography,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

import { useRouter } from 'next/router';
import { CookieManager } from '@leanoncompany/supporti-utility';
import { gTagEvent } from '../../../../lib/gtag';

interface ICustomHeaderProps {}

const CustomHeader2 = (props: ICustomHeaderProps) => {
	const cookie = new CookieManager();

	//* States
	const [anchorElNav, setAnchorElNav] = React.useState(null);
	const [isOpenMenu, setIsOpenMenu] = React.useState(false);

	const [anchorElIndicator, setAnchorElIndicator] = React.useState(null); //지표관리 메뉴
	const [target, setTarget] = React.useState(null);
	//* Constants

	/**
	 * 모바일 메뉴
	 */
	const mobileMenu = [
		{
			label: '서포티 소개',
			path: '/renewal/introduce',
			onclick: () => {
				router.push('/renewal/introduce');
			},
		},

		{
			label: '마켓 소개',
			path: '/renewal/market_place/introduce',
			onclick: () => {
				router.push('/renewal/market_place/introduce');
			},
		},
		{
			label: '마켓 플레이스',
			path: '/renewal/market_place',
			onclick: () => {
				router.push('/renewal/market_place');
			},
		},
		{
			label: '컨설팅',
			path: '/renewal/consulting',
			onclick: () => {
				router.push('/renewal/consulting');
			},
		},
		{
			label: '세미나',
			path: '/renewal/seminar',
			onclick: () => {
				router.push('/renewal/seminar');
			},
		},
		{
			label: '멘토링',
			path: '/renewal/mentoring',
			onclick: () => {
				router.push('/renewal/mentoring');
			},
		},
		{
			label: '테마',
			path: '/renewal/theme',
			onclick: () => {
				router.push('/renewal/theme');
			},
		},
		{
			label: 'API Store',
			path: '/rate_plan',
			onclick: () => {
				router.push('/rate_plan');
			},
		},
		{
			label: '인사이트',
			path: '/renewal/insight',
			onclick: () => {
				router.push('/renewal/insight');
			},
		},
		{
			label: '요금제 안내',
			path: '/rate_plan',
			onclick: () => {
				router.push('/rate_plan');
			},
		},
		{
			label: 'FAQ',
			path: '/customer_service/faq',
		},
		{
			label: '공지사항',
			path: '/customer_service/notice',
		},
		{
			label: '문의하기',
			path: '/customer_service/qna',
		},
		{
			label: '지표 관리',
			path: '/internal_service/indicator_management/financial',
			onclick: () => {
				router.push('/internal_service/indicator_management/financial');
			},
		},
		{
			label: '마이페이지',
			path: '/my_page/edit_profile',
		},
	];

	const unLoginMenu = [
		{
			label: '서포티 소개',
			path: '/renewal/introduce',
			onclick: () => {
				router.push('/renewal/introduce');
			},
		},

		{
			label: '마켓 소개',
			path: '/renewal/market_place/introduce',
			onclick: () => {
				router.push('/renewal/market_place/introduce');
			},
		},
		{
			label: '마켓 플레이스',
			path: '/renewal/market_place',
			onclick: () => {
				router.push('/renewal/market_place');
			},
		},
		{
			label: '컨설팅',
			path: '/renewal/consulting',
			onclick: () => {
				router.push('/renewal/consulting');
			},
		},
		{
			label: '세미나',
			path: '/renewal/seminar',
			onclick: () => {
				router.push('/renewal/seminar');
			},
		},
		{
			label: '멘토링',
			path: '/renewal/mentoring',
			onclick: () => {
				router.push('/renewal/mentoring');
			},
		},
		{
			label: '테마',
			path: '/renewal/theme',
			onclick: () => {
				router.push('/renewal/theme');
			},
		},

		{
			label: 'API Store',
			path: '/rate_plan',
			onclick: () => {
				router.push('/rate_plan');
			},
		},
		{
			label: '인사이트',
			path: '/renewal/insight',
			onclick: () => {
				router.push('/renewal/insight');
			},
		},
		{
			label: '요금제 안내',
			path: '/rate_plan',
			onclick: () => {
				router.push('/rate_plan');
			},
		},

		{
			label: 'FAQ',
			path: '/customer_service/faq',
		},
		{
			label: '공지사항',
			path: '/customer_service/notice',
		},
		{
			label: '문의하기',
			path: '/customer_service/qna',
		},
		{
			label: '회원가입 / 로그인',
			path: '/auth/sign_in',
		},
	];

	/**
	 * 서포티
	 */
	const supporti = [
		{
			label: '서포티 소개',
			path: '/renewal/introduce',
		},
	];

	/**
	 * 마켓
	 */
	const market = [
		{
			label: '소개',
			path: '/renewal/market_place/introduce',
			onclick: () => {
				router.push('/renewal/market_place/introduce');
			},
		},
		{
			label: '마켓 플레이스',
			path: '/renewal/market_place',
			onclick: () => {
				router.push('/renewal/market_place');
			},
		},
		{
			label: '컨설팅',
			path: '/renewal/consulting',
			onclick: () => {
				router.push('/external_service/consulting');
			},
		},
		{
			label: '세미나',
			path: '/renewal/seminar',
			additionalOnclickFunction: () => {
				gTagEvent({
					action: 'seminar',
					category: 'seminar',
					label: 'seminar',
					value: 1,
				});
			},
		},
		{
			label: '멘토링',
			path: '/renewal/mentoring',
		},
	];

	/**
	 * 테마
	 */
	// const theme = [
	// 	{
	// 		label: '안양',
	// 		path: '/external_service/seminar',
	// 	},
	// 	{
	// 		label: '소상공인',
	// 		path: '/external_service/mentoring',
	// 	},
	// ];

	/**
	 * 고객 센터
	 */
	const customercenter = [
		{
			label: 'FAQ',
			path: '/customer_service/faq',
		},
		{
			label: '공지사항',
			path: '/customer_service/notice',
		},
		{
			label: '문의하기',
			path: '/customer_service/qna',
		},
	];

	const pages = [
		{
			label: '서포티',
			subMenus: supporti,
		},
		{
			label: '마켓',
			subMenus: market,
		},
		{
			label: '테마',
			onClick: () => {
				router.push('/renewal/theme');
			},
		},
		{
			label: 'API Store',
			onClick: () => {
				router.push('/rate_plan');
			},
		},
		{
			label: '인사이트',
			onClick: () => {
				router.push('/renewal/insight');
			},
		},
		{
			label: '요금제 안내',
			onClick: () => {
				router.push('/rate_plan');
			},
		},
		// {
		// 	label: '고객지원',
		// 	subMenus: customercenter,
		// },
	];

	/**
	 * 마이페이지
	 */
	const mypage = [
		{
			label: '지표관리',
			path: '/internal_service/indicator_management/financial',
			onclick: () => {
				router.push('/internal_service/indicator_management/financial');
			},
		},
		{
			label: '마이페이지',
			path: '/my_page/edit_profile',
			onclick: () => {
				router.push('/my_page/edit_profile');
			},
		},
	];

	//* Modules
	const router = useRouter();
	//* Functions
	/**
	 * 모바일 메뉴 오픈
	 */
	const handleOpenNavMenu = (event) => {
		setAnchorElNav(event.currentTarget);
	};

	/**
	 * 모바일 메뉴 닫기
	 */
	const handleCloseNavMenu = () => {
		setAnchorElNav(null);
	};

	const handleOpenMenu = (menu, idx) => {
		return (
			<Box display={'flex'} flexDirection={'column'}>
				{/* 메인 메뉴 버튼 */}
				<Button
					onClick={() => {
						if (!menu.subMenu) menu.onClick();
					}}
					onMouseEnter={(event) => {
						setIsOpenMenu(true);
					}}
					sx={{
						my: 3,
						mr: 5,
						color: 'white',
						display: 'block',
						width: '100%',
						alignContent: 'center',
					}}
				>
					<Typography
						variant="h6"
						color="primary.main"
						fontWeight={600}
					>
						{menu.label}
					</Typography>
				</Button>
				{/* 하위 메뉴  */}
				{isOpenMenu && (
					<Box flexDirection={'column'}>
						{menu.subMenus &&
							menu.subMenus.map((subMenu, idx) => {
								return (
									<Button
										key={subMenu.label}
										onClick={() => {
											setIsOpenMenu(false);
											router.push(subMenu.path);
										}}
										sx={{
											my: 2,
											mr: 2,
											display: 'block',
											width: '100%',
											alignContent: 'center',
										}}
									>
										<Typography
											variant="body1"
											fontWeight={400}
										>
											{subMenu.label}
										</Typography>
									</Button>
								);
							})}
					</Box>
				)}
			</Box>
		);
	};

	return (
		!router.asPath.includes('/my_page') && (
			<AppBar
				position="static"
				sx={{
					bgcolor: 'primary.light',
					backdropFilter: 'blur(20px)',
					borderStyle: 'solid',
					borderColor: 'primary.light',
					borderWidth: 0,
					borderBottomWidth: 'thin',
					boxShadow: 'inset 0px -1px 1px #f5f5f5',
				}}
				onMouseLeave={() => {
					setIsOpenMenu(false);
				}}
			>
				<Container
					maxWidth="xl"
					sx={{
						px: 3,
						alignItems: 'center',
					}}
				>
					<Toolbar
						disableGutters
						sx={{
							minHeight: '45pt !important;',
							justifyContent: 'space-between !important;',
							alignItems: 'center',
						}}
					>
						{/* 모바일 대응 햄버거 */}
						<Box
							sx={{
								flexGrow: 1,
								display: { xs: 'flex', md: 'none' },
							}}
						>
							<Box onClick={() => router.push('/renewal')}>
								<img
									src="/images/logo/Suppor-T1.png"
									alt="logo"
								/>
							</Box>
						</Box>
						<Box
							sx={{
								flexGrow: 0,
								display: { xs: 'flex', md: 'none' },
							}}
						>
							<IconButton
								size="large"
								aria-label="account of current user"
								aria-controls="menu-appbar"
								aria-haspopup="true"
								onClick={handleOpenNavMenu}
								color="inherit"
							>
								<MenuIcon color="primary" />
							</IconButton>
							<Menu
								id="menu-appbar"
								anchorEl={anchorElNav}
								anchorOrigin={{
									vertical: 'bottom',
									horizontal: 'center',
								}}
								// keepMounted
								transformOrigin={{
									vertical: 'top',
									horizontal: 'center',
								}}
								open={Boolean(anchorElNav)}
								onClose={handleCloseNavMenu}
								sx={{
									display: { xs: 'block', md: 'none' },
								}}
								PaperProps={{
									sx: {
										width: '100%',
										boxShadow: '2px 4px 2px #f5f5f5',
										mt: 1,
										left: '0 !important',
										p: 2,
										maxWidth: '100% !important',
									},
								}}
							>
								<Box
									width={'100%'}
									display={'flex'}
									justifyContent={'space-between'}
									pr={2}
									my={1}
									alignItems={'center'}
									mb={2}
								>
									<img src="/images/logo/Suppor-TFulllogo.svg" />
									<Typography
										onClick={handleCloseNavMenu}
										sx={{
											cursor: 'pointer',
											fontWeight: '600',
										}}
									>
										X
									</Typography>
								</Box>
								{cookie.getItemInCookies('ACCESS_TOKEN')
									? mobileMenu.map((page) => (
											<MenuItem
												key={page.label}
												onClick={() => {
													router.push(page.path);
													handleCloseNavMenu();
												}}
												sx={{}}
											>
												<Typography
													textAlign="center"
													sx={{
														fontWeight: '500',
														py: 1,
													}}
												>
													{page.label}
												</Typography>
											</MenuItem>
									  ))
									: unLoginMenu.map((page) => (
											<MenuItem
												key={page.label}
												onClick={() => {
													router.push(page.path);
													handleCloseNavMenu();
												}}
												sx={{}}
											>
												<Typography
													textAlign="center"
													sx={{
														fontWeight: '500',
														py: 1,
													}}
												>
													{page.label}
												</Typography>
											</MenuItem>
									  ))}
							</Menu>
						</Box>
						{/* 웹 */}
						<Box
							sx={{
								flexGrow: 1,
								display: { xs: 'none', md: 'flex' },
							}}
						>
							<Box>
								<img
									src={'/images/logo/Suppor-TFulllogo.svg'}
									alt="Logo"
									width={'145px'}
									height={'45px'}
									style={{
										cursor: 'pointer',
										marginLeft: 'auto',
										marginRight: '15px',
										marginTop: '25px',
									}}
									onClick={() => router.push('/renewal')}
								/>
							</Box>

							{pages.map((menu, idx) => {
								return handleOpenMenu(menu, idx);
							})}
						</Box>
						<Box
							sx={{
								flexGrow: 0,
								display: { xs: 'none', md: 'flex' },
								alignSelf: 'start',
								mt: 2,
							}}
						>
							{/* 로그인 & 비로그인 대응 */}
							{cookie.getItemInCookies('ACCESS_TOKEN') ? (
								<Box
									display={'flex'}
									justifyContent={'center'}
									alignContent={'center'}
								>
									{mypage.map((menu: any, idx) => {
										// return menu.subMenus ? (
										// 	handleMypageMenu(menu, idx)
										// ) :
										return (
											<Button
												onClick={menu.onclick}
												sx={{
													my: 1,
													mx: 2,
													display: 'block',
													width: 90,
													borderRadius: 2,
												}}
												variant="contained"
											>
												<Typography
													color={'white'}
													fontWeight={'600'}
												>
													{menu.label}
												</Typography>
											</Button>
										);
									})}
								</Box>
							) : (
								<Button
									onClick={() => router.push('/auth/sign_in')}
									sx={{
										my: 1,
										mx: 2,
										width: 80,
										borderRadius: 2,
										display: 'block',
									}}
									variant="contained"
								>
									<Typography
										color={'white'}
										fontWeight={'600'}
									>
										로그인
									</Typography>
								</Button>
							)}
						</Box>
					</Toolbar>
				</Container>
			</AppBar>
		)
	);
};

export default CustomHeader2;
