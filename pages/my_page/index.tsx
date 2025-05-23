import React, { useEffect, useState } from 'react';
import { NextPage } from 'next';
import {
	Box,
	Typography,
	CircularProgress,
	Container,
	Button,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	TextField,
	IconButton,
	Select,
	MenuItem,
	FormControl,
	InputLabel,
} from '@mui/material';
import { CookieManager } from '@leanoncompany/supporti-utility';
import DefaultController from '@leanoncompany/supporti-ark-office-project/src/controller/default/DefaultController';
import CloseIcon from '@mui/icons-material/Close';
import SupportiInput from '../../src/views/global/SupportiInput';

interface BusinessInfo {
	COMPANY_NAME: string;
	REPRESENTATIVE_NAME: string;
	PHONE_NUMBER: string;
	EMAIL: string;
	BUSINESS_ITEM_INTRODUCTION: string;
	IS_CORPORATION: string;
	FORMATION_DATE: string;
	PREVIOUS_YEAR_SALES_AMOUNT: string;
	IR_DECK: string;
	WANTED_MATCHING_FIELD: string[];
	PROVIDED_MATCHING_FIELD: string[];
}

const MyPage: NextPage = () => {
	const fieldList = [
		'Sass',
		'법률',
		'브랜딩',
		'IT',
		'HR',
		'사업',
		'정부지원',
		'인증',
		'투자유치',
		'BM',
		'마케팅',
		'회계',
		'스타트업',
		'IR',
		'스피치',
		'글로벌',
	];
	const cookie = new CookieManager();
	const controller = new DefaultController('GsicBusiness');
	const [businessInfo, setBusinessInfo] = useState<BusinessInfo | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
	const [editedInfo, setEditedInfo] = useState<BusinessInfo | null>(null);

	const [irDeckFile, setIrDeckFile] = React.useState<any>({
		FILE_NAME: 'ppt, pdf, hwp, pcdx, zip (200mb이하)',
		FILE_URL: '',
	});

	useEffect(() => {
		fetchMyPageData();
	}, []);

	const fetchMyPageData = async () => {
		const id = await cookie.getItemInCookies(
			'GSIC_MEMBER_IDENTIFICATION_CODE'
		);
		controller.findAllItems(
			{
				GSIC_MEMBER_IDENTIFICATION_CODE: id,
			},
			(res) => {
				console.log(res.data.result);
				if (res.data.result.rows.length > 0) {
					setBusinessInfo({
						COMPANY_NAME: res.data.result.rows[0].COMPANY_NAME,
						REPRESENTATIVE_NAME:
							res.data.result.rows[0].REPRESENTATIVE_NAME,
						PHONE_NUMBER: res.data.result.rows[0].PHONE_NUMBER,
						EMAIL: res.data.result.rows[0].EMAIL,
						BUSINESS_ITEM_INTRODUCTION:
							res.data.result.rows[0].BUSINESS_ITEM_INTRODUCTION,
						IS_CORPORATION: res.data.result.rows[0].IS_CORPORATION,
						FORMATION_DATE: res.data.result.rows[0].FORMATION_DATE,
						PREVIOUS_YEAR_SALES_AMOUNT:
							res.data.result.rows[0].PREVIOUS_YEAR_SALES_AMOUNT,
						IR_DECK: res.data.result.rows[0].IR_DECK,
						WANTED_MATCHING_FIELD: JSON.parse(
							res.data.result.rows[0].WANTED_MATCHING_FIELD
						),
						PROVIDED_MATCHING_FIELD: JSON.parse(
							res.data.result.rows[0].PROVIDED_MATCHING_FIELD
						),
					});
				} else {
					setBusinessInfo(null);
					setIsEditModalOpen(true);
				}
				setIsLoading(false);
			},
			(err) => {
				console.log(err);
			}
		);
	};

	const handleEditClick = () => {
		setEditedInfo(businessInfo);
		setIsEditModalOpen(true);
	};

	const handleCloseEditModal = () => {
		setIsEditModalOpen(false);
		setEditedInfo(null);
	};

	const handleSaveEdit = async () => {
		const id = await cookie.getItemInCookies(
			'GSIC_MEMBER_IDENTIFICATION_CODE'
		);

		setBusinessInfo(editedInfo);
		setIsEditModalOpen(false);

		controller.update(
			{
				GSIC_MEMBER_IDENTIFICATION_CODE: id,
				COMPANY_NAME: editedInfo?.COMPANY_NAME,
				REPRESENTATIVE_NAME: editedInfo?.REPRESENTATIVE_NAME,
				PHONE_NUMBER: editedInfo?.PHONE_NUMBER,
				EMAIL: editedInfo?.EMAIL,
				BUSINESS_ITEM_INTRODUCTION:
					editedInfo?.BUSINESS_ITEM_INTRODUCTION,
				IS_CORPORATION: editedInfo?.IS_CORPORATION,
				FORMATION_DATE: editedInfo?.FORMATION_DATE,
				PREVIOUS_YEAR_SALES_AMOUNT:
					editedInfo?.PREVIOUS_YEAR_SALES_AMOUNT,
				IR_DECK: JSON.stringify(irDeckFile.FILE_URL),
				WANTED_MATCHING_FIELD: JSON.stringify(
					editedInfo?.WANTED_MATCHING_FIELD
				),
				PROVIDED_MATCHING_FIELD: JSON.stringify(
					editedInfo?.PROVIDED_MATCHING_FIELD
				),
			},
			(res) => {
				alert('정보가 수정되었습니다.');
			}
		);
		alert('정보가 수정되었습니다.');
	};

	const handleFieldChange = (field: keyof BusinessInfo, value: any) => {
		if (editedInfo) {
			setEditedInfo({
				...editedInfo,
				[field]: value,
			});
		}
	};

	const InfoItem = ({
		label,
		value,
	}: {
		label: string;
		value: string | null;
	}) => (
		<Box
			sx={{
				py: 1.5,
				display: 'flex',
				justifyContent: 'space-between',
				alignItems: 'center',
			}}
		>
			<Typography
				sx={{
					fontSize: '16px',
					color: '#666666',
				}}
			>
				{label}
			</Typography>
			<Typography
				sx={{
					fontSize: '16px',
					fontWeight: 500,
					color: '#333333',
					textAlign: 'right',
					flex: 1,
					ml: 2,
					overflow: 'hidden',
					textOverflow: 'ellipsis',
					whiteSpace: 'nowrap',
				}}
			>
				{value || '-'}
			</Typography>
		</Box>
	);

	return (
		<Box
			display={'flex'}
			flexDirection={'column'}
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
					justifyContent: 'flex-end',
					px: 2,
					borderBottom: '1px solid #EEEEEE',
				}}
			>
				<Button
					variant="contained"
					onClick={handleEditClick}
					sx={{
						bgcolor: 'primary.main',
						color: 'white',
						fontWeight: 'bold',
						'&:hover': {
							bgcolor: 'primary.dark',
						},
					}}
				>
					수정하기
				</Button>
			</Box>

			{/* Content */}
			<Box sx={{ overflowY: 'auto' }}>
				{/* 기업 정보 섹션 */}
				<Container
					sx={{
						p: 3,
						bgcolor: 'white',
						boxShadow: '0px 2px 3px rgba(0, 0, 0, 0.1)',
					}}
				>
					<Typography
						sx={{
							fontSize: '20px',
							fontWeight: 'bold',
							color: '#333333',
							mb: 2,
						}}
					>
						기업 정보
					</Typography>
					{isLoading ? (
						<Box
							sx={{
								display: 'flex',
								justifyContent: 'center',
								py: 3,
							}}
						>
							<CircularProgress />
						</Box>
					) : (
						businessInfo && (
							<>
								<InfoItem
									label="기업명"
									value={businessInfo.COMPANY_NAME}
								/>
								<InfoItem
									label="대표자"
									value={businessInfo.REPRESENTATIVE_NAME}
								/>
								<InfoItem
									label="휴대전화"
									value={businessInfo.PHONE_NUMBER}
								/>
								<InfoItem
									label="이메일"
									value={businessInfo.EMAIL}
								/>
							</>
						)
					)}
				</Container>

				{/* 구분선 */}
				<Box sx={{ height: '8px', bgcolor: 'white' }} />

				{/* 사업 정보 섹션 */}
				<Container
					sx={{
						p: 3,
						bgcolor: 'white',
						boxShadow: '0px 2px 3px rgba(0, 0, 0, 0.1)',
					}}
				>
					<Typography
						sx={{
							fontSize: '20px',
							fontWeight: 'bold',
							color: '#333333',
							mb: 2,
						}}
					>
						사업 정보
					</Typography>
					{isLoading ? (
						<Box
							sx={{
								display: 'flex',
								justifyContent: 'center',
								py: 3,
							}}
						>
							<CircularProgress />
						</Box>
					) : (
						businessInfo && (
							<>
								<InfoItem
									label="사업 아이템"
									value={
										businessInfo.BUSINESS_ITEM_INTRODUCTION
									}
								/>
								<InfoItem
									label="법인설립여부"
									value={
										businessInfo.IS_CORPORATION === 'Y'
											? '설립'
											: '미설립'
									}
								/>
								<InfoItem
									label="설립연도/월"
									value={
										businessInfo.FORMATION_DATE
											? businessInfo.FORMATION_DATE.substring(
													0,
													10
											  )
											: null
									}
								/>
								<InfoItem
									label="직전년도 매출액"
									value={
										businessInfo.PREVIOUS_YEAR_SALES_AMOUNT
									}
								/>
								<InfoItem
									label="IR DECK 파일"
									value={businessInfo.IR_DECK}
								/>
								<InfoItem
									label="원하는 매칭 분야"
									value={businessInfo.WANTED_MATCHING_FIELD.join(
										', '
									)}
								/>
								<InfoItem
									label="제공 가능한 매칭 분야"
									value={businessInfo.PROVIDED_MATCHING_FIELD.join(
										', '
									)}
								/>
							</>
						)
					)}
				</Container>
			</Box>

			{/* 수정 모달 */}
			<Dialog
				open={isEditModalOpen}
				onClose={handleCloseEditModal}
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
						정보 수정
					</Typography>
					<IconButton
						onClick={handleCloseEditModal}
						sx={{ color: '#666666' }}
					>
						<CloseIcon />
					</IconButton>
				</DialogTitle>
				<DialogContent>
					{editedInfo && (
						<Box
							sx={{
								mt: 2,
								display: 'flex',
								flexDirection: 'column',
								gap: 2,
							}}
						>
							<TextField
								label="기업명"
								value={editedInfo.COMPANY_NAME}
								onChange={(e) =>
									handleFieldChange(
										'COMPANY_NAME',
										e.target.value
									)
								}
								fullWidth
							/>
							<TextField
								label="대표자"
								value={editedInfo.REPRESENTATIVE_NAME}
								onChange={(e) =>
									handleFieldChange(
										'REPRESENTATIVE_NAME',
										e.target.value
									)
								}
								fullWidth
							/>
							<TextField
								label="휴대전화"
								value={editedInfo.PHONE_NUMBER}
								onChange={(e) =>
									handleFieldChange(
										'PHONE_NUMBER',
										e.target.value
									)
								}
								fullWidth
							/>
							<TextField
								label="이메일"
								value={editedInfo.EMAIL}
								onChange={(e) =>
									handleFieldChange('EMAIL', e.target.value)
								}
								fullWidth
							/>
							<TextField
								label="사업 아이템"
								value={editedInfo.BUSINESS_ITEM_INTRODUCTION}
								onChange={(e) =>
									handleFieldChange(
										'BUSINESS_ITEM_INTRODUCTION',
										e.target.value
									)
								}
								fullWidth
								multiline
								rows={2}
								sx={{ mb: 1 }}
							/>
							<FormControl fullWidth>
								<InputLabel>법인설립여부</InputLabel>
								<Select
									value={editedInfo.IS_CORPORATION}
									onChange={(e) =>
										handleFieldChange(
											'IS_CORPORATION',
											e.target.value
										)
									}
									label="법인설립여부"
								>
									<MenuItem value="Y">설립</MenuItem>
									<MenuItem value="N">미설립</MenuItem>
								</Select>
							</FormControl>
							<TextField
								label="설립연도/월"
								type="date"
								value={editedInfo.FORMATION_DATE}
								onChange={(e) =>
									handleFieldChange(
										'FORMATION_DATE',
										e.target.value
									)
								}
								fullWidth
								InputLabelProps={{ shrink: true }}
							/>

							<TextField
								label="직전년도 매출액"
								value={editedInfo.PREVIOUS_YEAR_SALES_AMOUNT}
								onChange={(e) =>
									handleFieldChange(
										'PREVIOUS_YEAR_SALES_AMOUNT',
										e.target.value
									)
								}
								fullWidth
							/>
							<Box sx={{ mb: 3 }}>
								<Box sx={{ display: 'flex', mb: 1 }}>
									<Typography>IR DECK 파일</Typography>
									<Typography color="error">*</Typography>
								</Box>
								<SupportiInput
									type="fileinput"
									value={irDeckFile}
									setValue={setIrDeckFile}
									fileTypeInputName
									fileTypeInputNameMaxSize={{
										unit: 'MB',
										size: 200,
									}}
									additionalProps={{
										inputProps: {
											accept: '.pdf, .ppt, .hwp, .pcdx, .zip',
										},
									}}
								/>
							</Box>
							<FormControl fullWidth>
								<InputLabel>원하는 매칭 분야</InputLabel>
								<Select
									multiple
									value={editedInfo.WANTED_MATCHING_FIELD}
									onChange={(e) =>
										handleFieldChange(
											'WANTED_MATCHING_FIELD',
											e.target.value
										)
									}
									label="원하는 매칭 분야"
								>
									{fieldList.map((field) => (
										<MenuItem key={field} value={field}>
											{field}
										</MenuItem>
									))}
								</Select>
							</FormControl>
							<FormControl fullWidth>
								<InputLabel>제공 가능한 매칭 분야</InputLabel>
								<Select
									multiple
									value={editedInfo.PROVIDED_MATCHING_FIELD}
									onChange={(e) =>
										handleFieldChange(
											'PROVIDED_MATCHING_FIELD',
											e.target.value
										)
									}
									label="제공 가능한 매칭 분야"
								>
									{fieldList.map((field) => (
										<MenuItem key={field} value={field}>
											{field}
										</MenuItem>
									))}
								</Select>
							</FormControl>
						</Box>
					)}
				</DialogContent>
				<DialogActions>
					<Button
						onClick={handleCloseEditModal}
						sx={{ color: '#666666' }}
					>
						취소
					</Button>
					<Button
						onClick={handleSaveEdit}
						variant="contained"
						sx={{
							bgcolor: 'primary.main',
							'&:hover': {
								bgcolor: 'primary.dark',
							},
						}}
					>
						저장
					</Button>
				</DialogActions>
			</Dialog>
		</Box>
	);
};

export default MyPage;
