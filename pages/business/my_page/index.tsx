import React, { useEffect, useState } from 'react';
import { NextPage } from 'next';
import { Box, Typography, CircularProgress, Container } from '@mui/material';
import { CookieManager } from '@leanoncompany/supporti-utility';
import DefaultController from '@leanoncompany/supporti-ark-office-project/src/controller/default/DefaultController';

interface BusinessInfo {
	COMPANY_NAME: string;
	REPRESENTATIVE_NAME: string;
	PHONE_NUMBER: string;
	EMAIL: string;
	BUSINESS_ITEM_INTRODUCTION: string;
	IS_CORPORATION: string;
	FORMATION_DATE: string;
	PREVIOUS_YEAR_SALES_AMOUNT: string;
}

const MyPage: NextPage = () => {
	const cookie = new CookieManager();
	const businessController = new DefaultController('OrganBusiness');
	const [businessInfo, setBusinessInfo] = useState<BusinessInfo | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(true);

	useEffect(() => {
		fetchMyPageData();
	}, []);

	const fetchMyPageData = async () => {
		try {
			const userId =
				cookie.getItemInCookies('BUSINESS_ACCESS_TOKEN') || 0;
			businessController.findAllItems(
				{
					APP_MEMBER_ORGAN_IDENTIFICATION_CODE: userId,
				},
				(res) => {
					if (res.data.result.rows.length > 0) {
						setBusinessInfo(res.data.result.rows[0]);
					}
					setIsLoading(false);
				}
			);
		} catch (error) {
			console.error(error);
			alert('데이터 로딩 중 오류가 발생했습니다');
			setIsLoading(false);
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
					마이페이지
				</Typography>
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
							</>
						)
					)}
				</Container>
			</Box>
		</Box>
	);
};

export default MyPage;
