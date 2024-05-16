import React, { useEffect } from 'react';

import {
	AppBar,
	Avatar,
	Box,
	BoxProps,
	Button,
	ClickAwayListener,
	Container,
	CssBaseline,
	Grow,
	IconButton,
	Menu,
	MenuItem,
	MenuList,
	Paper,
	Popper,
	Toolbar,
	Tooltip,
	Typography,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useRouter } from 'next/router';
import { useAppMember } from '../../../../hooks/useAppMember';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { CookieManager } from '@leanoncompany/supporti-utility';
import GridViewRoundedIcon from '@mui/icons-material/GridViewRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import { gTagEvent } from '../../../../lib/gtag';

interface ICustomHeaderProps {}

const CustomHeader = (props: ICustomHeaderProps) => {
	const cookie = new CookieManager();

	//* States
	const [anchorElNav, setAnchorElNav] = React.useState(null);
	const [anchorElMypage, setAnchorElMypage] = React.useState(null); //마이페이지 메뉴
	const [anchorElUser, setAnchorElUser] = React.useState(null); // 고객센터 메뉴
	const [anchorElCommunity, setAnchorElCommunity] = React.useState(null); // 소셜링 메뉴
	const [anchorElIndicator, setAnchorElIndicator] = React.useState(null); //지표관리 메뉴
	const [anchorElGovernment, setAnchorElGovernment] = React.useState(null); //지원사업 메뉴
	const [anchorElPartners, setAnchorElPartners] = React.useState(null); //파트너스 메뉴
	const [anchorElSupporti, setAnchorElSupporti] = React.useState(null); //서포티 메뉴
	const [anchorElExtraService, setAnchorElExtraService] =
		React.useState(null); //부가서비스 메뉴
	const [target, setTarget] = React.useState(null);
	//* Constants

	/**
	 * 모바일 메뉴
	 */
	const mobileMenu = [
		{
			label: 'A2E',
			path: '/internal_service/a2e',
			onclick: () => {
				router.push('/internal_service/a2e');
			},
		},
		{
			label: '커피챗',
			path: '/internal_service/coffeechat',
			onclick: () => {
				router.push('/internal_service/coffeechat');
			},
		},
		{
			label: '세미나',
			path: '/external_service/seminar',
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
			label: '데모데이',
			path: '/internal_service/ir/demoday',
		},
		{
			label: '지원사업 조회',
			path: '/internal_service/government/research',
			onclick: () => {
				router.push('/internal_service/government/research');
			},
		},
		{
			label: '지원사업 관리',
			path: '/internal_service/government/management',
			onclick: () => {
				router.push('/internal_service/government/management');
			},
		},
		{
			label: '지원사업 컨설팅',
			path: '/internal_service/government/consulting',
			onclick: () => {
				router.push('/internal_service/government/consulting');
			},
		},
		{
			label: '성과 지표',
			path: '/internal_service/indicator_management/achievement',
			onclick: () => {
				router.push(
					'/internal_service/indicator_management/achievement'
				);
			},
		},
		{
			label: '재무 지표',
			path: '/internal_service/indicator_management/financial',
			onclick: () => {
				router.push('/internal_service/indicator_management/financial');
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
			label: '이벤트',
			path: '/customer_service/event',
		},
		// {
		// 	label: '컨설팅',
		// 	path: '/external_service/consulting',
		// },
		{
			label: '파트너스',
			path: '/partners',
		},
		{
			label: '비즈니스 멘토',
			path: '/mentor',
		},
		{
			label: '요금제 안내',
			path: '/rate_plan',
		},
		{
			label: '마이페이지',
			path: '/my_page/edit_profile',
		},
	];

	const unLoginMenu = [
		{ label: '서포티 소개', path: '/introduction/supporti' },
		{ label: '서포티 기능', path: '/introduction/supporti/function' },
		{ label: '소셜링', path: '/introduction/socialing' },
		{
			label: '요금제 안내',
			path: '/rate_plan',
		},
		{
			label: '부가기능 소개',
			path: '/introduction/extra_service',
		},
		{
			label: '공지사항',
			path: '/customer_service/notice',
		},
	];

	/**
	 * 소셜링
	 */
	const socialing = [
		{
			label: 'A2E',
			path: '/internal_service/a2e',
			onclick: () => {
				router.push('/internal_service/a2e');
			},
		},
		{
			label: '커피챗',
			path: '/internal_service/coffeechat',
			onclick: () => {
				router.push('/internal_service/coffeechat');
			},
		},
		{
			label: '세미나',
			path: '/external_service/seminar',
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
			label: '데모데이',
			path: '/internal_service/ir/demoday',
		},
	];

	/**
	 * 지원사업
	 */
	const government = [
		{
			label: '지원사업 조회',
			path: '/internal_service/government/research',
			onclick: () => {
				router.push('/internal_service/government/research');
			},
		},
		{
			label: '지원사업 관리',
			path: '/internal_service/government/management',
			onclick: () => {
				router.push('/internal_service/government/management');
			},
		},
		{
			label: '지원사업 컨설팅',
			path: '/internal_service/government/consulting',
			onclick: () => {
				router.push('/internal_service/government/consulting');
			},
		},
	];

	/**
	 * 지표관리
	 */
	const indication = [
		{
			label: '성과 지표',
			path: '/internal_service/indicator_management/achievement',
			onclick: () => {
				router.push(
					'/internal_service/indicator_management/achievement'
				);
			},
		},
		{
			label: '재무 지표',
			path: '/internal_service/indicator_management/financial',
			onclick: () => {
				router.push('/internal_service/indicator_management/financial');
			},
		},
	];

	/**
	 * 파트너스
	 */
	const partners = [
		{
			label: '파트너스',
			path: '/partners',
			onclick: () => {
				router.push('/partners');
			},
		},
		{
			label: '비즈니스 멘토',
			path: '/mentor',
			onclick: () => {
				router.push('/mentor');
			},
		},
	];

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
		{
			label: '이벤트',
			path: '/customer_service/event',
		},
	];

	/**
	 * 서포티
	 */
	const supporti = [
		{
			label: '서포티 소개',
			path: '/introduction/supporti',
		},
		{
			label: '서포티 기능',
			path: '/introduction/supporti/function',
		},
		{
			label: '소셜링',
			path: '/introduction/socialing',
		},
	];

	/**
	 * 부가서비스
	 */
	const extraService = [
		{
			label: '부가기능 소개',
			path: '/introduction/extra_service',
		},
	];

	// 메뉴
	const loginPages = [
		{
			label: 'supporTV',
			path: '/supportv',
		},
		{
			label: '소셜링',
			subMenus: socialing,
			subMenuHandler: (event) => {
				console.log(event, '소셜링');

				if (event) setAnchorElCommunity(event.currentTarget);
				else setAnchorElCommunity(null);
			},
			target: anchorElCommunity,
		},
		{
			label: '지원사업',
			subMenus: government,
			subMenuHandler: (event) => {
				console.log(event, '지원사업');

				if (event) setAnchorElGovernment(event.currentTarget);
				else setAnchorElGovernment(null);
			},
			target: anchorElGovernment,
		},
		{
			label: '지표관리',
			subMenus: indication,
			subMenuHandler: (event) => {
				console.log(event, '지표관리');

				if (event) setAnchorElIndicator(event.currentTarget);
				else setAnchorElIndicator(null);
			},
			target: anchorElIndicator,
		},
		{
			label: '파트너스',
			subMenus: partners,
			subMenuHandler: (event) => {
				console.log(event, '파트너스');

				if (event) setAnchorElPartners(event.currentTarget);
				else setAnchorElPartners(null);
			},
			target: anchorElPartners,
		},
		{
			label: '요금제 안내',
			path: '/rate_plan',
		},
		{
			label: '고객센터',
			subMenus: customercenter,
			subMenuHandler: (event) => {
				console.log(event, '고객센터');
				if (event) setAnchorElUser(event.currentTarget);
				else setAnchorElUser(null);
			},
			target: anchorElUser,
		},
	];

	const logoutPages = [
		{
			label: '서포티',
			subMenus: supporti,
			subMenuHandler: (event) => {
				if (event) setAnchorElSupporti(event.currentTarget);
				else setAnchorElSupporti(null);
			},
			target: anchorElSupporti,
		},
		{
			label: '요금제 안내',
			path: '/rate_plan',
		},
		{
			label: '부가서비스',
			subMenus: extraService,
			subMenuHandler: (event) => {
				if (event) setAnchorElExtraService(event.currentTarget);
				else setAnchorElExtraService(null);
			},
			target: anchorElExtraService,
		},
		{
			label: '공지사항',
			path: '/customer_service/notice',
		},
	];

	/**
	 * 마이페이지
	 */
	const mypage = [
		{
			label: '마이페이지',
			path: '/my_page/edit_profile',
			onclick: () => {
				router.push('/my_page/edit_profile');
			},
		},
		{
			label: '로그아웃',
			path: '/auth/sign_out',
			onclick: () => {
				cookie.removeItemInCookies('ACCESS_TOKEN', { path: '/' });
				router.push('/auth/sign_in');
			},
		},
	];

	const [title, setTitle] = React.useState(undefined);

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
	 * 고객 센터 메뉴 오픈
	 */
	const handleOpenUserMenu = (event, title, eventHandler) => {
		eventHandler(event);
		setTitle(title);
	};
	/**
	 * 마이페이지 메뉴 오픈
	 */
	const handleOpenMypageMenu = (event) => {
		setTitle('마이페이지');
		setAnchorElMypage(event.currentTarget);
	};
	/**
	 * 마이페이지 메뉴 닫기
	 */
	const handleCloseMypageMenu = () => {
		setAnchorElMypage(null);
	};

	/**
	 * 모바일 메뉴 닫기
	 */
	const handleCloseNavMenu = () => {
		setAnchorElNav(null);
	};

	const handleOpenMenu = (menu, idx) => {
		return (
			<>
				{/* 메인 메뉴 버튼 */}
				<Button
					onMouseEnter={(event) => {
						handleCloseMypageMenu();
						handleOpenUserMenu(
							event,
							menu.label,
							menu.subMenuHandler
						);
						setTarget(menu.label);
					}}
					onClick={(event) =>
						handleOpenUserMenu(
							event,
							menu.label,
							menu.subMenuHandler
						)
					}
					// onMouseMove={() => {
					// 	if (Boolean(menu?.target)) setTarget(null);
					// }}
					sx={{
						my: 3,
						mr: 2,
						// color: 'white',
						display: 'block',
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
				{/*  버튼 하위 메뉴 */}

				<Menu
					hideBackdrop={true}
					sx={{
						mt: '45px',
						visibility: target !== menu.label && 'hidden',
					}}
					id="menu-appbar"
					anchorEl={menu.target}
					anchorOrigin={{
						vertical: 'top',
						horizontal: 'center',
					}}
					// keepMounted
					transformOrigin={{
						vertical: 'top',
						horizontal: 'center',
					}}
					open={target === menu.label && Boolean(menu?.target)}
					onClose={() => menu?.subMenuHandler(null)}
					PaperProps={{
						sx: {
							bgcolor: 'primary.light',
							boxShadow: 'rgb(219, 219, 219) 0px 4px 10px',
							borderRadius: 2,
							textAlign: 'center',
						},
					}}
					key={idx}
					MenuListProps={{
						onMouseLeave: () => {
							menu?.subMenuHandler(null);
						},
					}}
					autoFocus={false}
				>
					{menu.subMenus.map((setting) => (
						<MenuItem
							key={setting.label}
							onClick={() => router.push(setting.path)}
							sx={{ width: '121px', textAlign: 'center' }}
						>
							<Typography
								textAlign="center"
								color={'primary'}
								// variant="h6"
								fontWeight={'600'}
								sx={{ px: 0.5, mx: 'auto' }}
							>
								{setting.label}
							</Typography>
						</MenuItem>
					))}
				</Menu>
			</>
		);
	};

	//* Hooks
	const { memberName, memberPoint } = useAppMember();

	useEffect(() => {
		handleCloseMypageMenu();
		handleCloseNavMenu();
		// handleCloseUserMenu();
		setAnchorElCommunity(null);
		setAnchorElGovernment(null);
		setAnchorElIndicator(null);
		setAnchorElPartners(null);
		setAnchorElUser(null);
		setAnchorElSupporti(null);
		setAnchorElExtraService(null);
	}, [router]);

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
							<Box onClick={() => router.push('/')}>
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

								{cookie.getItemInCookies('ACCESS_TOKEN') && (
									<Box
										bgcolor={'secondary.light'}
										sx={{
											borderRadius: 2,
											p: 2,
											display: 'flex',
											flexDirection: 'column',
											gap: 2,
											mb: 1,
										}}
									>
										<Box
											display={'flex'}
											justifyContent={'space-between'}
											alignItems={'center'}
										>
											<Typography fontWeight={'600'}>
												{memberName}님 안녕하세요!
											</Typography>
											<Box
												display={'flex'}
												alignItems={'center'}
												gap={1}
												color={'secondary.dark'}
												sx={{
													cursor: 'pointer',
												}}
												onClick={() => {
													cookie.removeItemInCookies(
														'ACCESS_TOKEN',
														{ path: '/' }
													);
													router.push(
														'/auth/sign_in'
													);
												}}
											>
												<Typography
													fontWeight={'500'}
													color={'secondary.dark'}
												>
													로그아웃
												</Typography>
												<LogoutRoundedIcon
													sx={{
														fontSize: '1.1rem',
													}}
												/>
											</Box>
										</Box>
										<Typography fontWeight={'600'}>
											보유 포인트 {memberPoint}P
										</Typography>
									</Box>
								)}
								{cookie.getItemInCookies('ACCESS_TOKEN')
									? mobileMenu.map((page) => (
											<MenuItem
												key={page.label}
												onClick={() => {
													page.additionalOnclickFunction &&
														page.additionalOnclickFunction();
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
										marginTop: '20px',
									}}
									onClick={() => router.push('/')}
								/>
							</Box>
							{cookie.getItemInCookies('ACCESS_TOKEN') &&
								loginPages.map((menu, idx) => {
									return menu.subMenus ? (
										handleOpenMenu(menu, idx)
									) : (
										<Button
											key={menu.label}
											onMouseEnter={(evnet) => {
												setTitle(menu.label);
												handleCloseMypageMenu();
											}}
											onClick={() => {
												// if (page?.additionalOnclickFunction) {
												// 	page?.additionalOnclickFunction();
												// }
												router.push(menu.path);
											}}
											sx={{
												my: 3,
												mr: 2,
												// color: 'white',
												display: 'block',
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
									);
								})}

							{!cookie.getItemInCookies('ACCESS_TOKEN') &&
								logoutPages.map((menu, idx) => {
									return menu.subMenus ? (
										handleOpenMenu(menu, idx)
									) : (
										<Button
											key={menu.label}
											onMouseEnter={(evnet) => {
												setTitle(menu.label);
												handleCloseMypageMenu();
											}}
											onClick={() => {
												// if (page?.additionalOnclickFunction) {
												// 	page?.additionalOnclickFunction();
												// }
												router.push(menu.path);
											}}
											sx={{
												my: 3,
												mr: 2,
												// color: 'white',
												display: 'block',
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
									);
								})}
						</Box>

						<Box
							sx={{
								flexGrow: 0,
								display: { xs: 'none', md: 'flex' },
							}}
						>
							{/* 로그인 & 비로그인 대응 */}
							{cookie.getItemInCookies('ACCESS_TOKEN') ? (
								<Box
									display={'flex'}
									justifyContent={'center'}
									alignContent={'center'}
								>
									{/* <Button
										onClick={() => {
											gTagEvent({
												action: 'dashboard',
												category: 'dashboard',
												label: 'dashboard',
												value: 1,
											});
											router.push(
												'/internal_service/financial_solution/account_manage'
											);
										}}
										sx={{
											my: 1,
											ml: 2,
											display: 'flex',
											width: 110,
											borderRadius: 2,
											gap: 1,
										}}
										variant="contained"
									>
										<GridViewRoundedIcon />
										<Typography
											color={'white'}
											fontWeight={'600'}
										>
											대시보드
										</Typography>
									</Button>
									*/}
									<IconButton
										size="large"
										aria-label="account of current user"
										aria-controls="menu-appbar"
										aria-haspopup="true"
										onClick={handleOpenMypageMenu}
										onMouseEnter={handleOpenMypageMenu}
										color="inherit"
									>
										<MoreVertIcon color="primary" />
									</IconButton>
									{/* 마이페이지 버튼 메뉴 */}
									<Menu
										sx={{ mt: '45px' }}
										id="menu-appbar"
										anchorEl={anchorElMypage}
										anchorOrigin={{
											vertical: 'top',
											horizontal: 'center',
										}}
										// hideBackdrop={true}
										keepMounted
										transformOrigin={{
											vertical: 'top',
											horizontal: 'center',
										}}
										open={Boolean(anchorElMypage)}
										onClose={handleCloseMypageMenu}
										PaperProps={{
											sx: {
												bgcolor: 'primary.light',
												// boxShadow:
												// 	'inset 0px -1px 1px #f5f5f5',
												borderRadius: 2,
												p: 1,
												boxShadow:
													'rgb(219, 219, 219) 0px 4px 10px',
											},
										}}
									>
										<Box
											display={'flex'}
											flexDirection={'column'}
											justifyContent={'center'}
											alignItems={'flex-end'}
											gap={0.5}
											px={1}
											pb={1}
											borderBottom={'0.5px solid gray'}
											mb={1}
										>
											<Typography
												fontWeight={'600'}
												color={'secondary.dark'}
											>
												{memberName}님
											</Typography>
											<Typography
												fontWeight={'600'}
												color={'secondary.dark'}
											>
												{memberPoint?.toLocaleString()}
												포인트
											</Typography>
										</Box>
										{mypage.map((setting) => (
											<MenuItem
												key={setting.label}
												onClick={setting.onclick}
											>
												<Typography
													textAlign="center"
													color={'primary'}
													fontWeight={'600'}
													sx={{ px: 1 }}
												>
													{setting.label}
												</Typography>
											</MenuItem>
										))}
									</Menu>
								</Box>
							) : (
								<Button
									onClick={() => router.push('/auth/sign_in')}
									sx={{
										my: 1,
										mx: 2,
										display: 'block',
										width: 80,
										borderRadius: 2,
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

export default CustomHeader;
