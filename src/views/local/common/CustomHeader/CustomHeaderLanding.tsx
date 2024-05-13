import React, { useEffect } from 'react';

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
	ToggleButtonGroup,
	ToggleButton,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useRouter } from 'next/router';
import { CookieManager } from '@leanoncompany/supporti-utility';

interface ICustomHeaderProps {}

const CustomHeader = (props: ICustomHeaderProps) => {
	//* States
	const [anchorElNav, setAnchorElNav] = React.useState(null);
	const [anchorElSupporti, setAnchorSupporti] = React.useState(null); // 고객센터 메뉴
	const [target, setTarget] = React.useState(null);

	const [toLocale, setToLocale] = React.useState('ko');

	const cookie = new CookieManager();

	//* Constants
	//모바일 메뉴
	const mobileMenu = [
		{
			label: 'ABOUT SUPPOR-T',
			path: '/',
			onclick: () => {
				router.push('/');
			},
		},
	];
	// 메뉴
	const menu = [
		{
			label: 'ABOUT SUPPOR-T',
			subMenus: [
				{
					label: '서포티 바로가기 ->',
					path: '/',
					onclick: () => {
						router.push('/');
					},
				},
			],
			subMenuHandler: (event) => {
				if (event) setAnchorSupporti(event.currentTarget);
				else setAnchorSupporti(null);
			},
			target: anchorElSupporti,
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
	const handleOpenUserMenu = (event, title, eventHandler) => {
		eventHandler(event);
	};

	const handleOpenMenu = (menu, idx) => {
		return (
			<>
				{/* 메인 메뉴 버튼 */}
				<Button
					onClick={(event) => {
						handleOpenUserMenu(
							event,
							menu.label,
							menu.subMenuHandler
						);
						setTarget(menu.label);
					}}
					sx={{
						display: 'block',
						position: 'relative',
						color: 'white',
					}}
				>
					{menu.label}
				</Button>
				{/*  버튼 하위 메뉴 */}
				<Menu
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
							sx={{ width: '130px', textAlign: 'center' }}
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

	useEffect(() => {
		handleCloseNavMenu();
		setToLocale(cookie.getItemInCookies('locale') || 'ko');
	}, [router]);

	return (
		<AppBar
			position="absolute"
			sx={{
				bgcolor: 'transparent',
				boxShadow: 'none',
				borderBottom: '1px solid #f5f5f5',
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
						<Box onClick={() => router.push('/landing')}>
							<img
								src="/images/logo/Suppor-TFulllogo.svg"
								alt="logo"
								height="40px"
								width={'130px'}
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
							<MenuIcon />
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
									src="/images/logo/Suppor-TFulllogo.svg"
									height="40px"
									width={'145px'}
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

							{mobileMenu.map((page: any) => (
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
											fontWeight: '400',
											py: 1,
										}}
									>
										{page.label}
									</Typography>
								</MenuItem>
							))}
						</Menu>
						<ToggleButtonGroup
							value={toLocale}
							exclusive
							onChange={(event, value) => {
								if (value == null) return;
								setToLocale(value);
								cookie.setItemInCookies('locale', value);
								if (value == 'ko') {
									router.push('/landing');
								} else if (value == 'en') {
									router.push('/landing/en');
								} else router.push('/landing/jp');
							}}
							color="primary"
							aria-label="text alignment"
							sx={{
								display: { xs: 'flex', md: 'none' },
								height: '45px',
							}}
						>
							<ToggleButton
								value="ko"
								sx={{
									color: 'black',
									border:
										toLocale == 'ko'
											? '1px solid primary.main'
											: '1px solid white',
								}}
							>
								KO
							</ToggleButton>
							<ToggleButton
								value="en"
								sx={{
									color: 'black',
									fontWeight: '600',

									border:
										toLocale == 'en'
											? '1px solid primary.main'
											: '1px solid black',
								}}
							>
								EN
							</ToggleButton>
							<ToggleButton
								value="jp"
								sx={{
									color: 'black',
									fontWeight: '600',
									border:
										toLocale == 'jp'
											? '1px solid primary.main'
											: '1px solid black',
								}}
							>
								日本語
							</ToggleButton>
						</ToggleButtonGroup>
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
								}}
								onClick={() => router.push('/landing')}
							/>
						</Box>
					</Box>

					<Box
						sx={{
							flexGrow: 0,
							display: { xs: 'none', md: 'flex' },
						}}
					>
						{menu.map((menu, idx) => {
							return handleOpenMenu(menu, idx);
						})}
					</Box>
					<ToggleButtonGroup
						value={toLocale}
						exclusive
						onChange={(event, value) => {
							if (value == null) return;
							setToLocale(value);
							cookie.setItemInCookies('locale', value);
							if (value == 'ko') {
								router.push('/landing');
							} else if (value == 'en') {
								router.push('/landing/en');
							} else router.push('/landing/jp');
						}}
						color="primary"
						aria-label="text alignment"
						sx={{
							display: { xs: 'none', md: 'flex' },
						}}
					>
						<ToggleButton
							value="ko"
							sx={{
								color: 'white',
								border:
									toLocale == 'ko'
										? '1px solid primary.main'
										: '1px solid white',
							}}
						>
							KO
						</ToggleButton>
						<ToggleButton
							value="en"
							sx={{
								color: 'white',
								border:
									toLocale == 'en'
										? '1px solid primary.main'
										: '1px solid white',
							}}
						>
							English
						</ToggleButton>
						<ToggleButton
							value="jp"
							sx={{
								color: 'white',
								border:
									toLocale == 'jp'
										? '1px solid primary.main'
										: '1px solid white',
							}}
						>
							日本語
						</ToggleButton>
					</ToggleButtonGroup>
				</Toolbar>
			</Container>
		</AppBar>
	);
};

export default CustomHeader;
