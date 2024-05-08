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
import { CookieManager } from '@leanoncompany/supporti-utility';

interface ICustomHeaderProps {}

const CustomHeader = (props: ICustomHeaderProps) => {
	//* States
	const [anchorElNav, setAnchorElNav] = React.useState(null);

	//* Constants
	// 메뉴
	const menu = [
		{
			label: 'ABOUT SUPPOR-T',
			path: '/',
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
			<>
				{/* 메인 메뉴 버튼 */}
				<Button
					onClick={(event) => router.push(menu.path)}
					sx={{
						display: 'block',
						position: 'relative',
						color: 'white',
					}}
				>
					{menu.label}
				</Button>
			</>
		);
	};

	useEffect(() => {
		handleCloseNavMenu();
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
								width={'145px'}
							/>
						</Box>
					</Box>
					<Box
						sx={{
							flexGrow: 0,
							display: { xs: 'flex', md: 'none' },
							overflowY: 'scroll',
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
									src="/images/logo/Suppor-TFulllogo.png"
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

							{menu.map((page) => (
								<MenuItem
									key={page.label}
									onClick={() => {
										// page.additionalOnclickFunction &&
										// 	page.additionalOnclickFunction();
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
				</Toolbar>
			</Container>
		</AppBar>
	);
};

export default CustomHeader;
