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
	SvgIcon,
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
import { CookieManager } from '@leanoncompany/supporti-utility';
import { SupportiAlertModal } from '../../../../global/SupportiAlertModal';
import { useUserAccess } from '../../../../../hooks/useUserAccess';
import SupportiLoading from '../../../../global/SupportiLoading/SupportiLoading';
import Image from 'next/image';

interface IInternalServiceDrawerProps {
	children: React.ReactNode;
	type: 'dashboard' | 'mypage';
	/**
	 * 로딩 여부
	 */
	loading?: boolean;
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
	/**
	 * 모바일 메뉴 오픈
	 */
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

	/**
	 * 로그인, 구독회원 확인
	 */
	useEffect(() => {
		if (isLogin.access == false) {
			setAlertModalType('login');
			setAlertModal(true);
		}
		// if (
		// 	isSubscribed.access == false &&
		// 	!router.asPath.includes('my_page')
		// ) {
		// 	setAlertModalType('subscribe');
		// 	setAlertModal(true);
		// }
	}, [isSubscribed.access, isLogin.access]);

	//* Components
	/**
	 * 메뉴 아이템
	 */
	const ListItemMap = (page1: any, index: number) => {
		//* States
		/**
		 * 서브메뉴 오픈 여부
		 */
		const [open, setOpen] = React.useState(false);
		//* Constant
		const page = page1.page;
		return (
			<>
				<ListItem key={index}>
					<ListItemButton
						onClick={() => {
							// 기업회원을 위한 페이지고, 기업회원이 아닐 경우
							if (page.forBusiness && access === false) {
								setAlertModalType('business');
								setAlertModal(true);
								return;
							}
							// 서브메뉴가 있을 경우 컨트롤, 없을 경우 페이지 이동
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
						{/* 서브메뉴 버튼 */}
						{page.submenu ? (
							open || router.asPath.includes(page.path) ? (
								<SvgIcon
									sx={{
										height: 20,
										width: 20,
									}}
								>
									<ExpandLess
										sx={{
											fontSize: '1.5rem',
										}}
									/>
								</SvgIcon>
							) : (
								<ExpandMore
									sx={{
										height: 20,
										width: 20,
									}}
								/>
							)
						) : null}
					</ListItemButton>
				</ListItem>
				{/* 서브 메뉴 */}
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

	/**
	 * 메뉴
	 */
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
					<Image
						src="/images/logo/Suppor-TFulllogo.svg"
						alt="logo"
						width={150}
						height={50}
						loading="lazy"
					/>
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
	//* Constant
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
			{/* 사이드바 */}
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
			{/* 메인 */}
			<Box
				component="main"
				sx={{
					flexGrow: 1,
					bgcolor: 'primary.light',
					width: { md: `calc(100% - ${drawerWidth}px)` },
					height: '100%',
					minHeight: '100vh',
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
			{/* 로딩 */}
			<SupportiLoading open={props.loading} />
		</Box>
	);
};

export default InternalServiceDrawer;
