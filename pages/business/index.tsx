import React, { useEffect, useState } from 'react';
import { NextPage } from 'next';
import {
	Box,
	Typography,
	CircularProgress,
	Card,
	IconButton,
	Modal,
} from '@mui/material';
import { useRouter } from 'next/router';
import { CookieManager } from '@leanoncompany/supporti-utility';
import DefaultController from '@leanoncompany/supporti-ark-office-project/src/controller/default/DefaultController';
import CloseIcon from '@mui/icons-material/Close';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

const Page: NextPage = () => {
	const router = useRouter();
	const cookie = new CookieManager();
	const controller = new DefaultController('OrganMeeting');

	const [meetingList, setMeetingList] = useState<any[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [selectedMeeting, setSelectedMeeting] = useState<any>(null);
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

	useEffect(() => {
		//로그인 체크
		if (cookie.getItemInCookies('BUSINESS_ACCESS_TOKEN') === null) {
			alert('로그인 후 이용해주세요');
			router.push('/business/sign_in');
		} else {
			fetchMeetingList();
		}
	}, []);

	const fetchMeetingList = async () => {
		setIsLoading(true);
		try {
			controller.findAllItems(
				{
					APP_MEMBER_ORGAN_IDENTIFICATION_CODE:
						cookie.getItemInCookies('BUSINESS_ACCESS_TOKEN') || '',
				},
				(res) => {
					const newMeetingList = res.data.result.rows.filter(
						(item: any) => item.DIAGNOSTIC_REPORT !== null
					);
					setMeetingList(newMeetingList);
				}
			);
		} catch (error) {
			console.error(error);
			alert('데이터 로딩 중 오류가 발생했습니다');
		}
		setIsLoading(false);
	};

	const handleMeetingClick = (meeting: any) => {
		setSelectedMeeting(meeting);
		setIsModalOpen(true);
	};

	const handleCloseModal = () => {
		setIsModalOpen(false);
		setSelectedMeeting(null);
	};

	return (
		<Box
			width={{
				xs: '100%',
				md: '40%',
			}}
			minHeight={'100vh'}
			margin={'auto'}
			border={'1px solid #EEEEEE'}
		>
			{/* AppBar */}
			<Box
				sx={{
					height: '64px',
					display: 'flex',
					alignItems: 'center',
					px: 2,
					borderBottom: '1px solid #EEEEEE',
				}}
			>
				<Typography
					variant="h6"
					sx={{
						color: '#333333',
						fontWeight: 'bold',
					}}
				>
					미팅일지
				</Typography>
			</Box>

			{/* Content */}
			<Box sx={{ p: 2 }}>
				{isLoading ? (
					<Box
						sx={{
							display: 'flex',
							justifyContent: 'center',
							alignItems: 'center',
							height: 'calc(100vh - 64px)',
						}}
					>
						<CircularProgress />
					</Box>
				) : meetingList.length === 0 ? (
					<Box
						sx={{
							display: 'flex',
							justifyContent: 'center',
							alignItems: 'center',
							height: 'calc(100vh - 64px)',
						}}
					>
						<Typography
							sx={{
								color: '#999999',
								fontSize: '16px',
							}}
						>
							등록된 미팅일지가 없습니다
						</Typography>
					</Box>
				) : (
					<Box
						sx={{
							py: 1,
							display: 'flex',
							flexDirection: 'column',
							width: '100%',
						}}
					>
						{meetingList.map((item, index) => (
							<Card
								key={index}
								sx={{
									mb: 2,
									width: '100%',
									borderRadius: '12px',
									border: '1px solid #EEEEEE',
									boxShadow: 'none',
									cursor: 'pointer',
									'&:hover': {
										backgroundColor: '#F5F5F5',
									},
									display: 'flex',
								}}
								onClick={() => handleMeetingClick(item)}
							>
								<Box
									sx={{
										p: 2,
										display: 'flex',
										alignItems: 'center',
									}}
								>
									<CalendarTodayIcon
										sx={{ color: '#666666', fontSize: 20 }}
									/>
									<Box sx={{ ml: 1.5 }}>
										<Typography
											sx={{
												fontSize: '16px',
												color: '#333333',
												fontWeight: 500,
											}}
										>
											{item.MEETING_DATE.substring(0, 10)}{' '}
											진단리포트
										</Typography>
									</Box>
									<Box sx={{ flexGrow: 1 }} />
									<ChevronRightIcon
										sx={{ color: '#999999' }}
									/>
								</Box>
							</Card>
						))}
					</Box>
				)}
			</Box>

			{/* Modal */}
			<Modal
				open={isModalOpen}
				onClose={handleCloseModal}
				sx={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
				}}
			>
				<Box
					sx={{
						width: '90%',
						height: '80vh',
						bgcolor: 'white',
						borderRadius: '20px 20px 0 0',
						display: 'flex',
						flexDirection: 'column',
					}}
				>
					{/* Modal Header */}
					<Box
						sx={{
							p: 2,
							borderBottom: '1px solid #EEEEEE',
							display: 'flex',
							justifyContent: 'space-between',
							alignItems: 'center',
						}}
					>
						<Typography
							sx={{
								fontSize: '18px',
								fontWeight: 'bold',
								color: '#333333',
							}}
						>
							미팅일지 상세
						</Typography>
						<IconButton
							onClick={handleCloseModal}
							sx={{ color: '#666666' }}
						>
							<CloseIcon />
						</IconButton>
					</Box>

					{/* Modal Content */}
					<Box sx={{ flex: 1, p: 2, overflow: 'auto' }}>
						{selectedMeeting?.DIAGNOSTIC_REPORT ? (
							<Box
								sx={{
									height: '100%',
									width: '100%',
									border: '1px solid #EEEEEE',
									borderRadius: '8px',
									overflow: 'hidden',
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
								}}
							>
								<iframe
									src={
										JSON.parse(
											selectedMeeting.DIAGNOSTIC_REPORT
										)[0].FILE_URL
									}
									style={{
										width: '100%',
										height: '100%',
										border: 'none',
									}}
								/>
							</Box>
						) : (
							<Box
								sx={{
									display: 'flex',
									justifyContent: 'center',
									alignItems: 'center',
									height: '100%',
								}}
							>
								<Typography sx={{ color: 'error.main' }}>
									파일이 존재하지 않습니다
								</Typography>
							</Box>
						)}
					</Box>
				</Box>
			</Modal>
		</Box>
	);
};

export default Page;
