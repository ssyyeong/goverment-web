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
	const gsicBusinessController = new DefaultController('GsicBusiness');
	const gsicMatchingBusinessController = new DefaultController(
		'GsicMatchingBusiness'
	);

	const [id, setId] = useState<string>('');
	const [preparingList, setPreparingList] = useState<any[]>([]);
	const [completedList, setCompletedList] = useState<any[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
	const [isApplyModalOpen, setIsApplyModalOpen] = useState<boolean>(false);
	const [tabValue, setTabValue] = useState(0);
	const [wantedMatchingField, setWantedMatchingField] = useState<string[]>(
		[]
	);

	const [selectedMatching, setSelectedMatching] = useState<any>(null);

	useEffect(() => {
		getGsicMemberInfo();
	}, []);

	const getGsicMemberInfo = async () => {
		const id = await cookie.getItemInCookies(
			'GSIC_MEMBER_IDENTIFICATION_CODE'
		);
		setId(id);
		const controller = new DefaultController('GsicMember');
		controller.findAllItems(
			{
				GSIC_MEMBER_IDENTIFICATION_CODE: id,
			},
			(res) => {
				if (res.data.result.rows.length > 0) {
					setWantedMatchingField(
						JSON.parse(
							res.data.result.rows[0].GsicBusinesses[0]
								.WANTED_MATCHING_FIELD
						)
					);
				}
			},
			(err) => {
				console.log(err);
			}
		);
	};

	useEffect(() => {
		if (wantedMatchingField.length > 0) {
			fetchMatchingList();
		}
	}, [wantedMatchingField]);

	const fetchMatchingList = async () => {
		setIsLoading(true);
		try {
			gsicBusinessController.findAllItems({}, (res) => {
				const filteredList = res.data.result.rows.filter((item: any) =>
					JSON.parse(item.PROVIDED_MATCHING_FIELD).some((field) =>
						wantedMatchingField.includes(field)
					)
				);
				setPreparingList(filteredList);
				fetchAppliedMatchingList();
			});
		} catch (error) {
			console.error(error);
			alert('데이터 로딩 중 오류가 발생했습니다');
		}
		setIsLoading(false);
	};

	const fetchAppliedMatchingList = async () => {
		setIsLoading(true);
		try {
			gsicMatchingBusinessController.findAllItems(
				{
					REQUESTER_MEMBER_IDENTIFICATION_CODE: id,
				},
				(res) => {
					console.log(res.data.result.rows);
					setCompletedList(res.data.result.rows);
				}
			);
		} catch (error) {
			console.error(error);
			alert('데이터 로딩 중 오류가 발생했습니다');
		}
		setIsLoading(false);
	};

	const handleMatchingClick = (matching: any) => {
		setSelectedMatching(matching);
		setIsModalOpen(true);
	};

	const handleCloseModal = () => {
		setIsModalOpen(false);
		setSelectedMatching(null);
	};

	const handleApplyClick = (program: any) => {
		setSelectedMatching(program);
		setIsApplyModalOpen(true);
	};

	const handleCloseApplyModal = () => {
		setIsApplyModalOpen(false);
		setSelectedMatching(null);
	};

	const handleApplyConfirm = async () => {
		gsicMatchingBusinessController.createItem(
			{
				REQUESTER_MEMBER_IDENTIFICATION_CODE: id,
				RECEIVER_MEMBER_IDENTIFICATION_CODE:
					selectedMatching.GSIC_MEMBER_IDENTIFICATION_CODE,
			},
			(res) => {
				alert('매칭 신청이 완료되었습니다.');
			},
			(err) => {
				console.log(err);
			}
		);
		handleCloseApplyModal();
	};

	const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
		setTabValue(newValue);
	};

	const isMatchingApplied = (matchingId: string) => {
		return completedList.some(
			(completed) =>
				completed.RECEIVER_MEMBER_IDENTIFICATION_CODE === matchingId
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
					관내 기업 매칭
				</Typography>
			</Box>

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
					<Tab label="매칭 가능한 기업" />
					<Tab label="매칭 완료한 기업" />
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
									매칭 가능한 기업이 없습니다
								</Typography>
							</Box>
						) : (
							<Box sx={{ py: 1 }}>
								{preparingList.map((item, index) => {
									const isApplied = isMatchingApplied(
										item.GSIC_MEMBER_IDENTIFICATION_CODE
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
														handleMatchingClick(
															item
														)
													}
													sx={{ flex: 1 }}
												>
													<Typography
														sx={{
															fontSize: '15px',
															color: '#333333',
															mt: 0.5,
														}}
													>
														{JSON.parse(
															item.PROVIDED_MATCHING_FIELD
														).join(', ')}
													</Typography>
													<Typography
														sx={{
															fontSize: '15px',
															color: '#333333',
															mt: 0.5,
														}}
													>
														{item.COMPANY_NAME}
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
														? '매칭완료'
														: '매칭하기'}
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
									매칭 완료한 기업이 없습니다
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
											handleMatchingClick(
												item.RECEIVER_MEMBER
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
													item.RECEIVER_MEMBER
														.COMPANY_NAME
												}
											</Typography>
											<Typography
												sx={{
													fontSize: '14px',
													color: '#666666',
													mt: 1,
												}}
											>
												{`매칭일: ${item.CREATED_AT.substring(
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
						기업 상세
					</Typography>
					<IconButton
						onClick={handleCloseModal}
						sx={{ color: '#666666' }}
					>
						<CloseIcon />
					</IconButton>
				</DialogTitle>
				<DialogContent>
					{selectedMatching && (
						<Box sx={{ mt: 2 }}>
							<Typography
								sx={{
									fontSize: '18px',
									fontWeight: 'bold',
									mt: 1.5,
								}}
							>
								{selectedMatching.COMPANY_NAME}
							</Typography>
							<Typography
								sx={{
									fontSize: '16px',
									fontWeight: 'bold',
									color: '#666666',
									mt: 2,
								}}
							>
								기업 소개
							</Typography>
							<Typography
								sx={{
									fontSize: '16px',
									mt: 1,
									whiteSpace: 'pre-wrap',
									lineHeight: 1.6,
								}}
							>
								{selectedMatching.BUSINESS_ITEM_INTRODUCTION ||
									'등록된 기업 소개가 없습니다.'}
							</Typography>
							<Typography
								sx={{
									fontSize: '16px',
									fontWeight: 'bold',
									color: '#666666',
									mt: 2,
								}}
							>
								희망 분야
							</Typography>
							<Box
								sx={{
									mt: 1,
									display: 'flex',
									flexWrap: 'wrap',
									gap: 1,
								}}
							>
								{JSON.parse(
									selectedMatching.WANTED_MATCHING_FIELD
								).map((field: string, index: number) => (
									<Box
										key={index}
										sx={{
											px: 1.5,
											py: 0.5,
											bgcolor: 'rgba(25, 118, 210, 0.1)',
											borderRadius: '20px',
										}}
									>
										<Typography
											sx={{
												fontSize: '14px',
												color: '#1976d2',
												fontWeight: 500,
											}}
										>
											{field}
										</Typography>
									</Box>
								))}
							</Box>
							<Typography
								sx={{
									fontSize: '16px',
									fontWeight: 'bold',
									color: '#666666',
									mt: 2,
								}}
							>
								제공 분야
							</Typography>
							<Box
								sx={{
									mt: 1,
									display: 'flex',
									flexWrap: 'wrap',
									gap: 1,
								}}
							>
								{JSON.parse(
									selectedMatching.PROVIDED_MATCHING_FIELD
								).map((field: string, index: number) => (
									<Box
										key={index}
										sx={{
											px: 1.5,
											py: 0.5,
											bgcolor: 'rgba(25, 118, 210, 0.1)',
											borderRadius: '20px',
										}}
									>
										<Typography
											sx={{
												fontSize: '14px',
												color: '#1976d2',
												fontWeight: 500,
											}}
										>
											{field}
										</Typography>
									</Box>
								))}
							</Box>
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
				<DialogTitle>매칭 신청</DialogTitle>
				<DialogContent>
					<Typography>
						{selectedMatching?.COMPANY_NAME} 기업과 매칭을
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
						매칭하기
					</Button>
				</DialogActions>
			</Dialog>
		</Box>
	);
};

export default ProgramPage;
