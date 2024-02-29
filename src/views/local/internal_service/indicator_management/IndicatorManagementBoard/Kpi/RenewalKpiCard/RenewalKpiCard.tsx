import React from 'react';
import { Box, Menu, MenuItem, Typography } from '@mui/material';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import MoreVertIcon from '@mui/icons-material/MoreVert';

type TRenewalKpiCardProps = {
	index: number;
	title: string;
	isCertified: boolean;
	id: number | string;
};

const RenewalKpiCard = (props: TRenewalKpiCardProps) => {
	//*States
	/**
	 * 메뉴 오픈 여부
	 */
	const [anchorEl, setAnchorEl] = React.useState(null);
	const open = Boolean(anchorEl);

	return (
		<Box
			sx={{
				bgcolor: 'white',
				boxShadow: '0 3px 15px 0 #e1eaff',
				width: { sm: '200px', xs: '100%' },
				py: 4,
				px: { sm: 4, xs: 0 },
				borderRadius: 2,
			}}
		>
			<Box display={'flex'} justifyContent={'space-between'}>
				<Box display={'flex'} gap={1} mb={2}>
					<Typography fontWeight={600}>
						KPI{props.index + 1}
					</Typography>
					{/** 인증 마크 */}
					{props.isCertified && (
						<VerifiedUserIcon
							sx={{
								color: 'primary.main',
								width: '15px',
								height: '15px',
							}}
						/>
					)}
				</Box>
				<Box>
					{/* 메뉴 */}
					<MoreVertIcon
						sx={{
							width: '20px',
							height: '15px',
							color: 'secondary.dark',
							mt: 'auto',
							mb: 'auto',
							mr: -3,
							cursor: 'pointer',
						}}
						id="basic-button"
						aria-controls={open ? 'basic-menu' : undefined}
						aria-haspopup="true"
						aria-expanded={open ? 'true' : undefined}
						onClick={(event) => {
							setAnchorEl(event.currentTarget);
						}}
					/>
					<Menu
						id="basic-menu"
						open={open}
						anchorEl={anchorEl}
						onClose={() => {
							setAnchorEl(null);
						}}
						MenuListProps={{
							'aria-labelledby': 'basic-button',
						}}
						sx={{
							'& .MuiPaper-root': {
								borderRadius: '5px',
								boxShadow: '0 3px 15px 0 #e1eaff',
								width: '90px',
							},
						}}
					>
						<MenuItem
							sx={{
								borderBottom: '1px solid #e1eaff',
								pb: '10px',
								mb: '5px',
								display: 'flex',
								justifyContent: 'center',
							}}
							onClick={() => {
								setAnchorEl(null);
							}}
						>
							수정하기
						</MenuItem>
						<MenuItem
							sx={{
								display: 'flex',
								justifyContent: 'center',
							}}
							onClick={() => {
								setAnchorEl(null);
							}}
						>
							삭제하기
						</MenuItem>
					</Menu>
				</Box>
			</Box>

			{/** KPI 제목 */}
			<Typography fontWeight={600} variant="h5">
				{props.title}
			</Typography>

			{/** 계좌 연동 된 KPI이면 출력 */}
			<Typography fontWeight={500} mt={10} color={'secondary.dark'}>
				{props.isCertified ? '계좌내역 연동중' : null}
			</Typography>
		</Box>
	);
};

export default RenewalKpiCard;
