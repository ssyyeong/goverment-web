import React from 'react';

import {
	AppBar,
	Box,
	BoxProps,
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
import { dashboardMenu } from '../../../../../../configs/menu/menuConfig';

interface IInternalServiceDrawerProps {
	children: React.ReactNode;
	type: 'dashboard' | 'mypage';
}

const InternalServiceDrawer = (props: IInternalServiceDrawerProps) => {
	//* Modules
	const router = useRouter();

	//*State
	/**
	 * 모바일 메뉴 오픈 여부
	 */
	const [mobileOpen, setMobileOpen] = React.useState(false);

	//* Functions
	const handleDrawerToggle = () => {
		setMobileOpen(!mobileOpen);
	};

	const ListItemMap = (page1: any, index: number) => {
		const [open, setOpen] = React.useState(false);
		const page = page1.page;
		return (
			<>
				<ListItem key={index}>
					<ListItemButton
						onClick={() => {
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
		<Box mt={3}>
			<Toolbar>
				<img src="/images/logo/Suppor-TFulllogo.svg" />
			</Toolbar>
			<List>
				{props.type === 'dashboard' &&
					dashboardMenu.map((page, index) => (
						<ListItemMap page={page} index={index} />
					))}
			</List>
		</Box>
	);
	const drawerWidth = 300;
	return (
		<Box sx={{ display: 'flex' }}>
			<CssBaseline />
			<AppBar
				position="fixed"
				sx={{
					width: { sm: `calc(100% - ${drawerWidth}px)` },
					ml: { sm: `${drawerWidth}px` },
					display: { sm: 'none' },
				}}
			>
				<Toolbar>
					<IconButton
						color="inherit"
						aria-label="open drawer"
						edge="start"
						onClick={handleDrawerToggle}
						sx={{ mr: 2, display: { sm: 'none' } }}
					>
						<MenuIcon />
					</IconButton>
					<Typography variant="h6" noWrap component="div">
						Responsive drawer
					</Typography>
				</Toolbar>
			</AppBar>
			<Box
				component="nav"
				sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
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
						display: { xs: 'block', sm: 'none' },
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
						display: { xs: 'none', sm: 'block' },
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
					width: { sm: `calc(100% - ${drawerWidth}px)` },
				}}
			>
				{props.children}
			</Box>
		</Box>
	);
};

export default InternalServiceDrawer;
