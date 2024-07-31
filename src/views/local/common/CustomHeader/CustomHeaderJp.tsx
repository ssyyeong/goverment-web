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
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import MenuIcon from '@mui/icons-material/Menu';

import { useRouter } from 'next/router';
import { CookieManager } from '@leanoncompany/supporti-utility';
import { gTagEvent } from '../../../../lib/gtag';

interface ICustomHeaderProps {}

const CustomHeaderJp = (props: ICustomHeaderProps) => {
	const cookie = new CookieManager();

	//* States
	const [anchorElNav, setAnchorElNav] = React.useState(null);
	const [isOpenMenu, setIsOpenMenu] = React.useState(false);

	const [target, setTarget] = React.useState(null);
	//* Constants

	/**
	 * 모바일 메뉴
	 */
	const mobileMenu = [
		{
			label: '소개',
			path: '/jp/introduction',
			onclick: () => {
				router.push('/jp/introduction');
			},
		},
		{
			label: '법인 설립',
			path: '/jp/consult',
			onclick: () => {
				router.push('/jp/consult');
			},
		},
		{
			label: '비즈니스 매칭',
			path: '/jp/matching',
			onclick: () => {
				router.push('/jp/matching');
			},
		},
		{
			label: '오픈 이노베이션',
			path: '/jp/innovation',
			onclick: () => {
				router.push('/jp/innovation');
			},
		},
	];

	const unLoginMenu = [
		{
			label: '소개',
			path: '/jp/introduction',
			onclick: () => {
				router.push('/jp/introduction');
			},
		},
		{
			label: '법인 설립',
			path: '/jp/consult',
			onclick: () => {
				router.push('/jp/consult');
			},
		},
		{
			label: '비즈니스 매칭',
			path: '/jp/matching',
			onclick: () => {
				router.push('/jp/matching');
			},
		},
		{
			label: '오픈 이노베이션',
			path: '/jp/innovation',
			onclick: () => {
				router.push('/jp/innovation');
			},
		},
	];

	const pages = [
		{
			label: '소개',
			path: '/jp/introduction',
			onclick: () => {
				router.push('/jp/introduction');
			},
		},
		{
			label: '법인 설립',
			path: '/jp/consult',
			onclick: () => {
				router.push('/jp/consult');
			},
		},
		{
			label: '비즈니스 매칭',
			path: '/jp/matching',
			onclick: () => {
				router.push('/jp/matching');
			},
		},
		{
			label: '오픈 이노베이션',
			path: '/jp/innovation',
			onclick: () => {
				router.push('/jp/innovation');
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

	/**
	 * 고객 센터 메뉴 오픈
	 */
	const handleOpenUserMenu = (event, title, eventHandler) => {
		eventHandler(event);
	};

	const handleOpenMenu = (menu, idx) => {
		return (
			<Box display={'flex'} flexDirection={'column'}>
				{/* 메인 메뉴 버튼 */}
				<Button
					onClick={menu.onclick}
					sx={{
						my: 2,
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
			</Box>
		);
	};

	return (
		!router.asPath.includes('/my_page') && (
			<Box
				width={{
					xs: '100%',
					md: '40%',
				}}
				margin={'auto'}
			>
				<AppBar
					position="static"
					sx={{
						bgcolor: 'white',
						backdropFilter: 'blur(20px)',
						borderStyle: 'solid',
						borderColor: 'primary.light',
						borderWidth: 'thin',
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
									flexDirection: 'column',
									alignItems: 'center',
								}}
							>
								<img
									src={'/images/logo/Suppor-TFulllogo.svg'}
									alt="Logo"
									width={'145px'}
									height={'45px'}
									style={{
										cursor: 'pointer',
										marginRight: '15px',
										marginTop: '10px',
									}}
									onClick={() => router.push('/')}
								/>
								<Box
									display={'flex'}
									flexDirection={'row'}
									justifyContent={'space-between'}
									width={'100%'}
								>
									{pages.map((menu, idx) => {
										return handleOpenMenu(menu, idx);
									})}
								</Box>
							</Box>
							<Box
								sx={{
									flexGrow: 0,
									display: { xs: 'none', md: 'flex' },
									alignSelf: 'start',
									mt: 2,
								}}
							></Box>
						</Toolbar>
					</Container>
				</AppBar>
			</Box>
		)
	);
};

export default CustomHeaderJp;
