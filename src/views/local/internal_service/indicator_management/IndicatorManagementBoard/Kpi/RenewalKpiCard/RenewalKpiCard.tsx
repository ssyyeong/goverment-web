import React from 'react';
import { Box, Menu, MenuItem, Typography } from '@mui/material';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import KpiAddAchievementModal from '../KpiAddAchievementModal/KpiAddAchievementModal';
import DefaultController from '@leanoncompany/supporti-ark-office-project/src/controller/default/DefaultController';
import useAlert from '../../../../../../../hooks/useAlert/useAlert';
import { SupportiAlertModal } from '../../../../../../global/SupportiAlertModal';

type TRenewalKpiCardProps = {
	index: number;
	title: string;
	isCertified: boolean;
	id: number | string;
	setKpiTriggerKey: React.Dispatch<string>;
};

const RenewalKpiCard = (props: TRenewalKpiCardProps) => {
	//* Controllers
	const kpiController = new DefaultController('Kpi');

	//*States
	/**
	 * 메뉴 오픈 여부
	 */
	const [anchorEl, setAnchorEl] = React.useState(null);
	const menuopen = Boolean(anchorEl);

	/**
	 * 달성값 등록하는 모달 오픈 여부
	 */
	const [openAddModal, setOpenAddModal] = React.useState(false);

	//*Functions
	/**
	 * kpi 삭제하는 함수
	 */
	const deleteKpi = () => {
		kpiController.deleteItem(
			{
				KPI_IDENTIFICATION_CODE: props.id,
			},
			(res) => {
				props.setKpiTriggerKey(new Date().getTime().toString());
			}
		);
	};
	//* Hooks
	/**
	 * 알러트
	 */
	const { open, setOpen, setType, type } = useAlert({});

	return (
		<Box
			sx={{
				bgcolor: 'white',
				boxShadow: '0 3px 15px 0 #e1eaff',
				width: { sm: '200px', xs: '100%' },
				minWidth: '200px',
				py: 4,
				px: { sm: 4, xs: 2 },
				borderRadius: 2,
				maxHeight: '250px',
				height: '250px',
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
							mr: { sm: -3, xs: -1 },
							cursor: 'pointer',
						}}
						id="basic-button"
						aria-controls={menuopen ? 'basic-menu' : undefined}
						aria-haspopup="true"
						aria-expanded={menuopen ? 'true' : undefined}
						onClick={(event) => {
							setAnchorEl(event.currentTarget);
						}}
					/>
					<Menu
						id="basic-menu"
						open={menuopen}
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
								if (props.isCertified) {
									alert(
										'계좌 연동중인 KPI는 달성값을 등록할 수 없습니다.'
									);
									setAnchorEl(null);
								} else {
									setAnchorEl(null);
									setOpenAddModal(true);
								}
							}}
						>
							달성값 등록
						</MenuItem>
						<MenuItem
							sx={{
								display: 'flex',
								justifyContent: 'center',
							}}
							onClick={() => {
								setAnchorEl(null);
								setType('delete');
								setOpen(true);
								// deleteKpi();
							}}
						>
							삭제
						</MenuItem>
					</Menu>
				</Box>
			</Box>

			<Box
				display={'flex'}
				flexDirection={'column'}
				justifyContent={'space-between'}
				height={'85%'}
			>
				{/** KPI 제목 */}
				<Typography fontWeight={600} variant="h5">
					{props.title}
				</Typography>

				{/** 계좌 연동 된 KPI이면 출력 */}
				<Typography fontWeight={500} color={'secondary.dark'}>
					{props.isCertified ? '계좌내역 연동중' : null}
				</Typography>
			</Box>
			{/** 달성값 등록 모달 */}
			<Box key={openAddModal.toString()}>
				<KpiAddAchievementModal
					modalOpen={openAddModal}
					setModalOpen={setOpenAddModal}
					kpiId={props.id}
					title={props.title}
					setKpiTriggerKey={props.setKpiTriggerKey}
				/>
			</Box>
			{/* 알림창 */}
			<SupportiAlertModal
				open={open}
				handleClose={() => setOpen(false)}
				type={type}
				customHandleClose={() => {
					deleteKpi();
					setOpen(false);
				}}
			/>
		</Box>
	);
};

export default RenewalKpiCard;
