import React, { useEffect } from 'react';

import {
	AppBar,
	Box,
	BoxProps,
	Button,
	Collapse,
	CssBaseline,
	Divider,
	Drawer,
	IconButton,
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	Toolbar,
	Typography,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import CheckIcon from '@mui/icons-material/Check';
import { useRouter } from 'next/router';
import {
	dashboardMenu,
	mypageMenu,
} from '../../../../../../configs/menu/menuConfig';
import { CookieManager } from '@qillie-corp/qillie-utility';
import { SupportiAlertModal } from '../../../../global/SupportiAlertModal';
import { useUserAccess } from '../../../../../hooks/useUserAccess';

interface IInternalServiceDrawerProps {
	children: React.ReactNode;
	type: 'dashboard' | 'mypage';
}

const InternalServiceDrawer = (props: IInternalServiceDrawerProps) => {
	//* Modules
	const router = useRouter();
	const cookie = new CookieManager();
	//*State
	/**
	 * 모바일 메뉴 오픈 여부
	 */
	const [mobileOpen, setMobileOpen] = React.useState(false);
	/**
	 * 알러트 모달
	 */
	const [alertModal, setAlertModal] = React.useState(false);
	/**
	 * 알러트 모달 타입
	 */
	const [alertModalType, setAlertModalType] = React.useState<
		'business' | 'subscribe' | 'login'
	>('business');

	//* Functions
	const handleDrawerToggle = () => {
		setMobileOpen(!mobileOpen);
	};

	//* Hooks
	/**
	 * 기업 회원인지 확인하는 훅
	 */
	const { access } = useUserAccess('BUSINESS_MEMBER');
	/**
	 * 구독회원인지 확인하는 훅
	 */
	const isSubscribed = useUserAccess('SUBSCRIPTION');
	/**
	 * 로그인 회원인지 확인하는 훅
	 */
	const isLogin = useUserAccess('SIGN_IN');

	useEffect(() => {
		if (isLogin.access == false) {
			setAlertModalType('login');
			setAlertModal(true);
			return;
		}
		if (isSubscribed.access == false) {
			setAlertModalType('subscribe');
			setAlertModal(true);
		}
	}, [isSubscribed.access, isLogin.access]);

	const ListItemMap = (page1: any, index: number) => {
		const [open, setOpen] = React.useState(false);
		const page = page1.page;
		return (
			<>
				<ListItem key={index}>
					<ListItemButton
						onClick={() => {
							if (page.forBusiness && access === false) {
								setAlertModalType('business');
								setAlertModal(true);
								return;
							}
							if (page.submenu) {
								setOpen(!open);
							} else {
								router.push(page.path);
							}
						}}
						selected={router.asPath.includes(page.path)}
					>
						<ListItemIcon>
							<img
								src={page.icon}
								style={{ width: 26, height: 26 }}
							/>
						</ListItemIcon>
						<ListItemText
							primary={page.label}
							sx={{
								fontWeight: '600',
							}}
							primaryTypographyProps={{
								sx: {
									fontWeight: '600',
								},
							}}
						/>
						{page.submenu ? (
							open || router.asPath.includes(page.path) ? (
								<ExpandLess />
							) : (
								<ExpandMore />
							)
						) : null}
					</ListItemButton>
				</ListItem>
				{page.submenu && (
					<Collapse
						in={open || router.asPath.includes(page.path)}
						timeout="auto"
						unmountOnExit
					>
						<List component="div" disablePadding>
							{page.submenu.map((page2: any, index2: number) => {
								return (
									<ListItemButton
										key={index2}
										onClick={() => {
											if (
												page2.forBusiness &&
												access === false
											) {
												setAlertModal(true);
												return;
											}
											router.push(page2.path);
										}}
										selected={router.asPath.includes(
											page2.path
										)}
										sx={{
											'&.Mui-selected': {
												backgroundColor:
													'white !important',
											},
										}}
									>
										<ListItemIcon sx={{ pl: 4, mr: 1 }}>
											<CheckIcon
												sx={{
													width: 16,
													color: router.asPath.includes(
														page2.path
													)
														? 'black'
														: 'secondary.main',
												}}
											/>
										</ListItemIcon>

										<ListItemText
											primary={page2.label}
											primaryTypographyProps={{
												sx: {
													color: router.asPath.includes(
														page2.path
													)
														? 'black'
														: 'secondary.main',
													fontWeight: '600',
												},
											}}
										/>
									</ListItemButton>
								);
							})}
						</List>
					</Collapse>
				)}
			</>
		);
	};

	const drawer = (
		<Box
			mt={3}
			display={'flex'}
			flexDirection={'column'}
			justifyContent={'space-between'}
			height={'100vh'}
		>
			<Box>
				<Toolbar
					onClick={() => {
						router.push('/');
					}}
					sx={{
						cursor: 'pointer',
					}}
				>
					<img src="/images/logo/Suppor-TFulllogo.svg" />
				</Toolbar>
				<List>
					{props.type === 'dashboard' &&
						dashboardMenu.map((page, index) => (
							<ListItemMap page={page} index={index} />
						))}
					{props.type === 'mypage' &&
						mypageMenu.map((page, index) => (
							<ListItemMap page={page} index={index} />
						))}
				</List>
			</Box>
			<Box p={4} pb={10}>
				<Typography fontWeight={'600'} sx={{ mb: 1 }}>
					주식회사 린온컴퍼니
				</Typography>
				<Typography color={'secondary.main'}>
					2022. leanoncompany Inc.
				</Typography>
				<Typography color={'secondary.main'}>
					all rights reserved.
				</Typography>
				<Button
					sx={{ color: 'black', mt: 2 }}
					onClick={() => {
						cookie.removeItemInCookies('ACCESS_TOKEN', {
							path: '/',
						});
						router.push('/auth/sign_in');
					}}
				>
					로그아웃
				</Button>
			</Box>
		</Box>
	);
	const drawerWidth = 300;
	return (
		<Box sx={{ display: 'flex' }}>
			<CssBaseline />
			<AppBar
				position="fixed"
				sx={{
					width: { md: `calc(100% - ${drawerWidth}px)` },
					ml: { md: `${drawerWidth}px` },
					display: { md: 'none' },
					bgcolor: 'primary.light',
					boxShadow: 'none',
				}}
			>
				<Toolbar
					sx={{
						justifyContent: 'space-between',
					}}
				>
					<img
						src="/images/logo/Suppor-T1.png"
						onClick={() => {
							router.push('/');
						}}
					/>
					<IconButton
						color="inherit"
						aria-label="open drawer"
						edge="start"
						onClick={handleDrawerToggle}
						sx={{ mr: 2, display: { md: 'none' } }}
					>
						<MenuIcon color="primary" />
					</IconButton>
				</Toolbar>
			</AppBar>
			<Box
				component="nav"
				sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
				aria-label="mailbox folders"
			>
				<Drawer
					// container={container}
					variant="temporary"
					open={mobileOpen}
					onClose={handleDrawerToggle}
					ModalProps={{
						keepMounted: true,
					}}
					sx={{
						display: { xs: 'block', md: 'none' },
						'& .MuiDrawer-paper': {
							boxSizing: 'border-box',
							width: drawerWidth,
						},
					}}
				>
					{drawer}
				</Drawer>
				<Drawer
					variant="permanent"
					sx={{
						display: { xs: 'none', md: 'block' },
						'& .MuiDrawer-paper': {
							boxSizing: 'border-box',
							width: drawerWidth,
						},
					}}
					open
				>
					{drawer}
				</Drawer>
			</Box>
			<Box
				component="main"
				sx={{
					flexGrow: 1,
					bgcolor: 'primary.light',
					width: { md: `calc(100% - ${drawerWidth}px)` },
					height: '100vh',
					overflowY: 'auto',
					pt: { md: 0, xs: 8 },
				}}
			>
				{props.children}
				<SupportiAlertModal
					open={alertModal}
					handleClose={() => setAlertModal(false)}
					type={alertModalType}
				/>
			</Box>
		</Box>
	);
};

export default InternalServiceDrawer;
