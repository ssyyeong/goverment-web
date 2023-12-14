import React from 'react';

import {
	AppBar,
	Avatar,
	Box,
	BoxProps,
	Button,
	Container,
	IconButton,
	Menu,
	MenuItem,
	Toolbar,
	Tooltip,
	Typography,
} from '@mui/material';

import MenuIcon from '@mui/icons-material/Menu';
import { useRouter } from 'next/router';
interface ICustomHeaderProps {}

const CustomHeader = (props: ICustomHeaderProps) => {
	const pages = [
		{
			label: '세미나',
			path: '/external_service/seminar',
		},
		{
			label: '컨설팅',
			path: '/external_service/consulting',
		},
		{
			label: '요금제 안내',
			path: '/rate_plan',
		},
		{
			label: '고객센터',
			path: '/customer_service/notice',
		},
		{
			label: '로그인',
			path: '/auth/sign_in',
		},
	];
	const settings = [
		{
			label: '프로필',
			path: '/my_page/edit_profile',
		},
		{
			label: '포인트내역',
			path: '/my_page/point_history',
		},
		{
			label: '결제내역',
			path: '/my_page/payment_history',
		},
		{
			label: '컨설팅 내역',
			path: '/my_page/consulting_reservation_history',
		},
		{
			label: '세미나 내역',
			path: '/my_page/seminar_reservation_history',
		},
	];
	const [anchorElNav, setAnchorElNav] = React.useState(null);
	const [anchorElUser, setAnchorElUser] = React.useState(null);

	const router = useRouter();
	const handleOpenNavMenu = (event) => {
		setAnchorElNav(event.currentTarget);
	};
	const handleOpenUserMenu = (event) => {
		setAnchorElUser(event.currentTarget);
	};

	const handleCloseNavMenu = () => {
		setAnchorElNav(null);
	};

	const handleCloseUserMenu = () => {
		setAnchorElUser(null);
	};
	return (
		<AppBar
			position="static"
			sx={{
				bgcolor: 'primary.light',
			}}
		>
			<Container maxWidth="xl">
				<Toolbar disableGutters>
					<Box
						sx={{
							flexGrow: 1,
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
								horizontal: 'left',
							}}
							keepMounted
							transformOrigin={{
								vertical: 'top',
								horizontal: 'left',
							}}
							open={Boolean(anchorElNav)}
							onClose={handleCloseNavMenu}
							sx={{
								display: { xs: 'block', md: 'none' },
							}}
						>
							{pages.map((page) => (
								<MenuItem
									key={page.label}
									onClick={() => router.push(page.path)}
								>
									<Typography textAlign="center">
										{page.label}
									</Typography>
								</MenuItem>
							))}
						</Menu>
					</Box>

					<Box
						sx={{
							flexGrow: 1,
							display: { xs: 'none', md: 'flex' },
						}}
					>
						<Box onClick={() => router.push('/')}>
							<img src="/images/logo/Suppor-T1.png" alt="logo" />
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
						{/* 프로필 버튼 */}
						<Tooltip title="Open settings">
							<IconButton
								onClick={handleOpenUserMenu}
								sx={{ p: 0 }}
							>
								<Avatar
									alt="Remy Sharp"
									src="/static/images/avatar/2.jpg"
								/>
							</IconButton>
						</Tooltip>
						{/* 프로필 버튼 메뉴 */}
						<Menu
							sx={{ mt: '45px' }}
							id="menu-appbar"
							anchorEl={anchorElUser}
							anchorOrigin={{
								vertical: 'top',
								horizontal: 'right',
							}}
							keepMounted
							transformOrigin={{
								vertical: 'top',
								horizontal: 'right',
							}}
							open={Boolean(anchorElUser)}
							onClose={handleCloseUserMenu}
						>
							{settings.map((setting) => (
								<MenuItem
									key={setting.label}
									onClick={() => router.push(setting.path)}
								>
									<Typography textAlign="center">
										{setting.label}
									</Typography>
								</MenuItem>
							))}
						</Menu>
					</Box>
				</Toolbar>
			</Container>
		</AppBar>
	);
};

export default CustomHeader;
