import React, { useEffect, useState } from 'react';
import { NextPage } from 'next';
import {
	Box,
	Typography,
	CircularProgress,
	Card,
	IconButton,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	Button,
	Tab,
	Tabs,
} from '@mui/material';
import { useRouter } from 'next/router';
import { CookieManager } from '@leanoncompany/supporti-utility';
import DefaultController from '@leanoncompany/supporti-ark-office-project/src/controller/default/DefaultController';
import CloseIcon from '@mui/icons-material/Close';

interface TabPanelProps {
	children?: React.ReactNode;
	index: number;
	value: number;
}

function TabPanel(props: TabPanelProps) {
	const { children, value, index, ...other } = props;

	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`simple-tabpanel-${index}`}
			aria-labelledby={`simple-tab-${index}`}
			{...other}
		>
			{value === index && <Box sx={{ p: 3 }}>{children}</Box>}
		</div>
	);
}

const ProgramPage: NextPage = () => {
	const router = useRouter();
	const cookie = new CookieManager();
	const programController = new DefaultController('OrganProgram');
	const applicationController = new DefaultController(
		'OrganProgramApplication'
	);

	const [preparingList, setPreparingList] = useState<any[]>([]);
	const [completedList, setCompletedList] = useState<any[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [selectedProgram, setSelectedProgram] = useState<any>(null);
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
	const [isApplyModalOpen, setIsApplyModalOpen] = useState<boolean>(false);
	const [tabValue, setTabValue] = useState(0);

	useEffect(() => {
		fetchProgramList();
		fetchAppliedProgramList();
	}, []);

	const fetchProgramList = async () => {
		setIsLoading(true);
		try {
			programController.findAllItems({}, (res) => {
				setPreparingList(res.data.result.rows);
			});
		} catch (error) {
			console.error(error);
			alert('데이터 로딩 중 오류가 발생했습니다');
		}
		setIsLoading(false);
	};

	const fetchAppliedProgramList = async () => {
		setIsLoading(true);
		try {
			applicationController.findAllItems(
				{
					APP_MEMBER_ORGAN_IDENTIFICATION_CODE:
						cookie.getItemInCookies('BUSINESS_ACCESS_TOKEN') || 0,
				},
				(res) => {
					setCompletedList(res.data.result.rows);
				}
			);
		} catch (error) {
			console.error(error);
			alert('데이터 로딩 중 오류가 발생했습니다');
		}
		setIsLoading(false);
	};

	const handleProgramClick = (program: any) => {
		setSelectedProgram(program);
		setIsModalOpen(true);
	};

	const handleCloseModal = () => {
		setIsModalOpen(false);
		setSelectedProgram(null);
	};

	const handleApplyClick = (program: any) => {
		setSelectedProgram(program);
		setIsApplyModalOpen(true);
	};

	const handleCloseApplyModal = () => {
		setIsApplyModalOpen(false);
		setSelectedProgram(null);
	};

	const handleApplyConfirm = async () => {
		try {
			await applicationController.createItem(
				{
					ORGAN_PROGRAM_IDENTIFICATION_CODE:
						selectedProgram.ORGAN_PROGRAM_IDENTIFICATION_CODE,
					APP_MEMBER_ORGAN_IDENTIFICATION_CODE:
						cookie.getItemInCookies('BUSINESS_ACCESS_TOKEN') || '',
				},
				() => {
					alert('프로그램 신청 완료');
					fetchAppliedProgramList();
				}
			);
		} catch (error) {
			console.error(error);
			alert('프로그램 신청 중 오류가 발생했습니다');
		}
		handleCloseApplyModal();
	};

	const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
		setTabValue(newValue);
	};

	const isProgramApplied = (programId: string) => {
		return completedList.some(
			(completed) =>
				completed.ORGAN_PROGRAM_IDENTIFICATION_CODE === programId
		);
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
			{/* Tabs */}
			<Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
				<Tabs
					value={tabValue}
					onChange={handleTabChange}
					aria-label="program tabs"
					sx={{
						'& .MuiTab-root': {
							fontWeight: 'bold',
						},
						'& .Mui-selected': {
							color: 'primary.main',
						},
						'& .MuiTabs-indicator': {
							backgroundColor: 'primary.main',
							height: 3,
						},
					}}
				>
					<Tab label="신청가능한 프로그램" />
					<Tab label="신청한 프로그램" />
				</Tabs>
			</Box>

			{/* Content */}
			{isLoading ? (
				<Box
					sx={{
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
						height: 'calc(100vh - 112px)',
					}}
				>
					<CircularProgress />
				</Box>
			) : (
				<>
					<TabPanel value={tabValue} index={0}>
						{preparingList.length === 0 ? (
							<Box
								sx={{
									display: 'flex',
									justifyContent: 'center',
									alignItems: 'center',
									height: 'calc(100vh - 112px)',
								}}
							>
								<Typography
									sx={{
										color: '#999999',
										fontSize: '16px',
									}}
								>
									신청가능한 프로그램이 없습니다
								</Typography>
							</Box>
						) : (
							<Box sx={{ py: 1 }}>
								{preparingList.map((item, index) => {
									const isApplied = isProgramApplied(
										item.ORGAN_PROGRAM_IDENTIFICATION_CODE
									);
									return (
										<Card
											key={index}
											sx={{
												mb: 2,
												borderRadius: '12px',
												border: '1px solid #EEEEEE',
												boxShadow: 'none',
												cursor: 'pointer',
											}}
										>
											<Box
												sx={{
													p: 2,
													display: 'flex',
													alignItems: 'center',
													justifyContent:
														'space-between',
												}}
											>
												<Box
													onClick={() =>
														handleProgramClick(item)
													}
													sx={{ flex: 1 }}
												>
													<Typography
														sx={{
															fontSize: '17px',
															fontWeight: 'bold',
															color: '#333333',
														}}
													>
														{
															item
																.OrganProgramCategory
																.CATEGORY_NAME
														}
													</Typography>
													<Typography
														sx={{
															fontSize: '15px',
															color: '#333333',
															mt: 0.5,
														}}
													>
														{item.PROGRAM_NAME}
													</Typography>
													<Typography
														sx={{
															fontSize: '15px',
															color: '#333333',
														}}
													>
														{`${item.START_DATE.substring(
															0,
															10
														)} ~ ${item.END_DATE.substring(
															0,
															10
														)}`}
													</Typography>
												</Box>
												<Button
													variant="contained"
													onClick={() =>
														handleApplyClick(item)
													}
													disabled={isApplied}
													sx={{
														bgcolor: isApplied
															? '#999999'
															: 'primary.main',
														color: 'white',
														fontWeight: 'bold',
														px: 2,
														py: 1,
														borderRadius: '8px',
														'&:hover': {
															bgcolor: isApplied
																? '#999999'
																: 'primary.dark',
														},
													}}
												>
													{isApplied
														? '신청완료'
														: '신청하기'}
												</Button>
											</Box>
										</Card>
									);
								})}
							</Box>
						)}
					</TabPanel>

					<TabPanel value={tabValue} index={1}>
						{completedList.length === 0 ? (
							<Box
								sx={{
									display: 'flex',
									justifyContent: 'center',
									alignItems: 'center',
									height: 'calc(100vh - 112px)',
								}}
							>
								<Typography
									sx={{
										color: '#999999',
										fontSize: '16px',
									}}
								>
									신청한 프로그램이 없습니다
								</Typography>
							</Box>
						) : (
							<Box sx={{ py: 1 }}>
								{completedList.map((item, index) => (
									<Card
										key={index}
										sx={{
											mb: 2,
											borderRadius: '12px',
											border: '1px solid #EEEEEE',
											boxShadow: 'none',
											cursor: 'pointer',
										}}
										onClick={() =>
											handleProgramClick(
												item.OrganProgram
											)
										}
									>
										<Box sx={{ p: 2 }}>
											<Typography
												sx={{
													fontSize: '17px',
													fontWeight: 'bold',
													color: '#333333',
												}}
											>
												{
													item.OrganProgram
														.OrganProgramCategory
														.CATEGORY_NAME
												}
											</Typography>
											<Typography
												sx={{
													fontSize: '15px',
													color: '#333333',
													mt: 0.5,
												}}
											>
												{item.OrganProgram.PROGRAM_NAME}
											</Typography>
											<Typography
												sx={{
													fontSize: '15px',
													color: '#333333',
												}}
											>
												{`${item.OrganProgram.START_DATE.substring(
													0,
													10
												)} ~ ${item.OrganProgram.END_DATE.substring(
													0,
													10
												)}`}
											</Typography>
											<Typography
												sx={{
													fontSize: '14px',
													color: '#666666',
													mt: 1,
												}}
											>
												{`신청일: ${item.CREATED_AT.substring(
													0,
													10
												)}`}
											</Typography>
										</Box>
									</Card>
								))}
							</Box>
						)}
					</TabPanel>
				</>
			)}

			{/* Program Detail Modal */}
			<Dialog
				open={isModalOpen}
				onClose={handleCloseModal}
				maxWidth="sm"
				fullWidth
			>
				<DialogTitle
					sx={{
						display: 'flex',
						justifyContent: 'space-between',
						alignItems: 'center',
					}}
				>
					<Typography
						sx={{
							fontSize: '20px',
							fontWeight: 'bold',
						}}
					>
						프로그램 상세
					</Typography>
					<IconButton
						onClick={handleCloseModal}
						sx={{ color: '#666666' }}
					>
						<CloseIcon />
					</IconButton>
				</DialogTitle>
				<DialogContent>
					{selectedProgram && (
						<Box sx={{ mt: 2 }}>
							<Box
								sx={{
									display: 'inline-block',
									px: 1.5,
									py: 0.5,
									bgcolor: 'primary.main',
									borderRadius: '20px',
									opacity: 0.1,
								}}
							>
								<Typography
									sx={{
										fontSize: '14px',
										color: 'primary.main',
										fontWeight: 500,
									}}
								>
									{
										selectedProgram.OrganProgramCategory
											.CATEGORY_NAME
									}
								</Typography>
							</Box>
							<Typography
								sx={{
									fontSize: '18px',
									fontWeight: 'bold',
									mt: 1.5,
								}}
							>
								{selectedProgram.PROGRAM_NAME}
							</Typography>
							<Typography
								sx={{
									fontSize: '16px',
									fontWeight: 'bold',
									color: '#666666',
									mt: 2,
								}}
							>
								프로그램 소개
							</Typography>
							<Typography sx={{ fontSize: '16px', mt: 1 }}>
								{selectedProgram.INTRODUCE ||
									'소개글이 없습니다.'}
							</Typography>
							<Typography
								sx={{
									fontSize: '16px',
									fontWeight: 'bold',
									color: '#666666',
									mt: 2,
								}}
							>
								진행기간
							</Typography>
							<Typography sx={{ fontSize: '16px', mt: 1 }}>
								{`${selectedProgram.START_DATE.substring(
									0,
									10
								)} ~ ${selectedProgram.END_DATE.substring(
									0,
									10
								)}`}
							</Typography>
							{selectedProgram.IMAGE && (
								<Box sx={{ mt: 2 }}>
									<img
										src={
											JSON.parse(selectedProgram.IMAGE)[0]
										}
										alt="프로그램 이미지"
										style={{
											width: '100%',
											height: 'auto',
										}}
									/>
								</Box>
							)}
						</Box>
					)}
				</DialogContent>
			</Dialog>

			{/* Apply Confirmation Modal */}
			<Dialog
				open={isApplyModalOpen}
				onClose={handleCloseApplyModal}
				maxWidth="xs"
				fullWidth
			>
				<DialogTitle>프로그램 신청</DialogTitle>
				<DialogContent>
					<Typography>
						{selectedProgram?.PROGRAM_NAME} 프로그램을
						신청하시겠습니까?
					</Typography>
				</DialogContent>
				<DialogActions>
					<Button
						onClick={handleCloseApplyModal}
						sx={{ color: '#666666' }}
					>
						취소
					</Button>
					<Button
						onClick={handleApplyConfirm}
						variant="contained"
						sx={{
							bgcolor: 'primary.main',
							'&:hover': {
								bgcolor: 'primary.dark',
							},
						}}
					>
						신청하기
					</Button>
				</DialogActions>
			</Dialog>
		</Box>
	);
};

export default ProgramPage;
