import React, { useEffect } from 'react';

import {
	AppBar,
	Box,
	Button,
	Container,
	IconButton,
	Menu,
	MenuItem,
	ToggleButton,
	ToggleButtonGroup,
	Toolbar,
	Typography,
} from '@mui/material';

import MenuIcon from '@mui/icons-material/Menu';

import { useRouter } from 'next/router';
import { CookieManager } from '@leanoncompany/supporti-utility';
import SupportiButton from '../../../global/SupportiButton';

interface ICustomHeaderProps {}

const CustomHeader = (props: ICustomHeaderProps) => {
	//* States
	const [anchorElNav, setAnchorElNav] = React.useState(null);

	const [toLocale, setToLocale] = React.useState('ko');
	const cookie = new CookieManager();

	//* Constants

	/**
	 * 모바일 메뉴
	 */
	const mobileMenu = [
		{
			label: '기업 정보',
			path: '/',
			onclick: () => {
				router.push('/');
			},
		},
		{
			label: '관내 매칭',
			path: '/in_area_matching',
			onclick: () => {
				router.push('/in_area_matching');
			},
		},
		{
			label: '관외 매칭',
			path: '/out_office_matching',
			onclick: () => {
				router.push('/out_office_matching');
			},
		},
	];

	const pages = [
		{
			label: '기업 정보',
			path: '/',
			onclick: () => {
				router.push('/');
			},
		},
		{
			label: '관내 매칭',
			path: '/in_area_matching',
			onclick: () => {
				router.push('/in_area_matching');
			},
		},
		{
			label: '관외 매칭',
			path: '/out_office_matching',
			onclick: () => {
				router.push('/out_office_matching');
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
		<Box
			width={{
				xs: '100%',
				md: '40%',
			}}
			margin={'auto'}
		>
			{cookie.getItemInCookies('GSIC_MEMBER_IDENTIFICATION_CODE') && (
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
										src="/images/logo.png"
										alt="logo"
										width={'45px'}
										height={'45px'}
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
										<img
											src="/images/logo.png"
											alt="logo"
											width={'45px'}
											height={'45px'}
										/>
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
									{mobileMenu.map((page) => (
										<MenuItem
											key={page.label}
											onClick={() => {
												router.push(page.path);
												handleCloseNavMenu();
											}}
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
								<Box
									display={'flex'}
									flexDirection={'row'}
									width={'100%'}
									mt={1}
								>
									<img
										src={'/images/logo.png'}
										alt="Logo"
										width={'45px'}
										height={'45px'}
										style={{
											cursor: 'pointer',
											marginRight: '15px',
											marginTop: '10px',
										}}
										onClick={() => router.push('/')}
									/>{' '}
								</Box>
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
						</Toolbar>
					</Container>
				</AppBar>
			)}
		</Box>
	);
};

export default CustomHeader;
