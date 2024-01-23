import React, { useEffect } from 'react';

import {
	AppBar,
	Avatar,
	Box,
	BoxProps,
	Button,
	Container,
	CssBaseline,
	IconButton,
	Menu,
	MenuItem,
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

interface ICustomHeaderProps {}

const CustomHeader = (props: ICustomHeaderProps) => {
	const cookie = new CookieManager();
	//* Constants
	/**
	 * 메뉴
	 */
	const pages = [
		{
			label: '파트너스',
			path: '/partners',
		},
		// {
		// 	label: '세미나',
		// 	path: '/external_service/seminar',
		// },
		// {
		// 	label: '컨설팅',
		// 	path: '/external_service/consulting',
		// },
		{
			label: '요금제 안내',
			path: '/rate_plan',
		},
	];
	/**
	 * 모바일 메뉴
	 */
	const mobileMenu = [
		{
			label: '파트너스',
			path: '/partners',
		},
		{
			label: '대시보드',
			path: '/internal_service/financial_solution/account_manage',
		},
		// {
		// 	label: '세미나',
		// 	path: '/external_service/seminar',
		// },
		// {
		// 	label: '컨설팅',
		// 	path: '/external_service/consulting',
		// },
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
		{
			label: '로그인',
			path: '/auth/sign_in',
		},
		// {
		// 	label: '세미나',
		// 	path: '/external_service/seminar',
		// },
		// {
		// 	label: '컨설팅',
		// 	path: '/external_service/consulting',
		// },
		{
			label: '요금제 안내',
			path: '/rate_plan',
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
	//* States
	const [anchorElNav, setAnchorElNav] = React.useState(null);
	const [anchorElMypage, setAnchorElMypage] = React.useState(null);
	const [anchorElUser, setAnchorElUser] = React.useState(null);

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
	const handleOpenUserMenu = (event) => {
		setAnchorElUser(event.currentTarget);
	};
	/**
	 * 마이페이지 메뉴 오픈
	 */
	const handleOpenMypageMenu = (event) => {
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
	/**
	 * 고객 센터 메뉴 닫기
	 */
	const handleCloseUserMenu = () => {
		setAnchorElUser(null);
	};

	//* Hooks
	const { memberName, memberPoint } = useAppMember();

	useEffect(() => {
		handleCloseMypageMenu();
		handleCloseNavMenu();
		handleCloseUserMenu();
	}, [router]);

	return (
		!router.asPath.includes('/internal_service') &&
		!router.asPath.includes('/my_page') && (
			<AppBar
				position="static"
				sx={{
					bgcolor: 'primary.light',
					backdropFilter: 'blur(20px)',
					borderStyle: 'solid',
					borderColor: '#f5f5f5',
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
								{memberName && (
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
								{memberName
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
								display: { xs: 'none', md: 'flex' },
							}}
						>
							{pages.map((page) => (
								<Button
									key={page.label}
									onClick={() => router.push(page.path)}
									sx={{
										my: 2,
										// color: 'white',
										display: 'block',
									}}
								>
									{page.label}
								</Button>
							))}
							{/* 고객 센터 */}
							<Button
								onClick={handleOpenUserMenu}
								sx={{
									display: 'block',
								}}
							>
								고객 센터
							</Button>
							{/* 고객센터 버튼 메뉴 */}
							<Menu
								sx={{ mt: '45px' }}
								id="menu-appbar"
								anchorEl={anchorElUser}
								anchorOrigin={{
									vertical: 'top',
									horizontal: 'center',
								}}
								keepMounted
								transformOrigin={{
									vertical: 'top',
									horizontal: 'center',
								}}
								open={Boolean(anchorElUser)}
								onClose={handleCloseUserMenu}
								PaperProps={{
									sx: {
										bgcolor: 'primary.light',
										boxShadow: 'inset 0px -1px 1px #f5f5f5',
										borderRadius: 2,
									},
								}}
							>
								{customercenter.map((setting) => (
									<MenuItem
										key={setting.label}
										onClick={() =>
											router.push(setting.path)
										}
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
							{/* 로그인 & 비로그인 대응 */}
							{memberName ? (
								<Box
									display={'flex'}
									justifyContent={'center'}
									alignContent={'center'}
								>
									<Button
										onClick={() =>
											router.push(
												'/internal_service/financial_solution/account_manage'
											)
										}
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
									<IconButton
										size="large"
										aria-label="account of current user"
										aria-controls="menu-appbar"
										aria-haspopup="true"
										onClick={handleOpenMypageMenu}
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
												boxShadow:
													'inset 0px -1px 1px #f5f5f5',
												borderRadius: 2,
												p: 1,
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
