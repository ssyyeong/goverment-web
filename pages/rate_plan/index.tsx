import { Box, Typography } from '@mui/material';
import DefaultController from '@qillie-corp/ark-office-project/src/controller/default/DefaultController';
import { NextPage } from 'next';
import React, { useEffect } from 'react';
import CheckIcon from '@mui/icons-material/Check';
import SupportiButton from '../../src/views/global/SupportiButton';
import BillingModal from '../../src/views/local/external_service/billingModal/BillingModal';
import { useUserAccess } from '../../src/hooks/useUserAccess';
import { SupportiAlertModal } from '../../src/views/global/SupportiAlertModal';

const Page: NextPage = () => {
	//* Modules
	const ratePlanController = new DefaultController('SubscriptionProduct');
	//* States
	const [ratePlanList, setRatePlanList] = React.useState([]);
	const [payModal, setPayModal] = React.useState<boolean>(false);
	const [payModalData, setPayModalData] = React.useState<any>({});

	/**
	 * 알럿 모달
	 */
	const [alertModal, setAlertModal] = React.useState<boolean>(false);
	/**
	 * 알럿 모달 타입
	 */
	const [alertModalType, setAlertModalType] = React.useState<
		'success' | 'login' | 'subscribe' | 'point' | 'already'
	>('success');

	//* Hooks
	const { access } = useUserAccess('SIGN_IN');
	/**
	 * 요금제 리스트 조회
	 */
	useEffect(() => {
		ratePlanController.findAllItems(
			{
				TYPE: 'PRODUCT',
			},
			(res) => {
				setRatePlanList(res.data.result.rows);
			},
			(err) => {}
		);
	}, []);

	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'center',
				alignItems: 'center',
				width: '100%',
				p: 10,
				bgcolor: 'primary.light',
			}}
		>
			<Typography
				variant="h4"
				fontWeight={'bold'}
				sx={{
					mb: 1,
				}}
			>
				비즈니스에 적합한
			</Typography>
			<Typography
				variant="h4"
				fontWeight={'bold'}
				sx={{
					mb: 6,
				}}
			>
				요금제를 알아보세요!
			</Typography>
			<Box
				display={'flex'}
				alignItems={'center'}
				gap={4}
				flexWrap={'wrap'}
				justifyContent={'center'}
			>
				{ratePlanList.map((ratePlan, id) => {
					return (
						<Box
							key={id}
							sx={{
								display: 'flex',
								flexDirection: 'column',
								justifyContent: 'center',
								alignItems: 'center',
								width: '100%',
								borderTop: '4px #B9C5FF solid',
								boxShadow:
									'4px 17px 40px rgba(138.13, 138.13, 138.13, 0.15)',
								borderRadius: '10px',
								padding: 4,
								marginTop: '20px',
								maxWidth: '270px',
								height: 600,
								bgcolor: 'white',
							}}
						>
							<Typography
								variant="h3"
								fontWeight={'bold'}
								color={'primary'}
								sx={{ mb: 2, wordBreak: 'break-all' }}
							>
								{ratePlan.NAME}
							</Typography>
							<Typography variant="h6" color={'secondary.main'}>
								{ratePlan.DESCRIPTION}
							</Typography>
							<Typography
								variant="h6"
								color={'secondary.dark'}
								sx={{ textDecoration: 'line-through', mt: 4 }}
							>
								{ratePlan.PRICE.toLocaleString()}원
							</Typography>
							<Typography
								variant="h3"
								fontWeight={'bold'}
								color={'primary'}
								sx={{ mb: 4, mt: 1 }}
							>
								월 {ratePlan.DISCOUNT_PRICE.toLocaleString()}원
							</Typography>
							<Box
								borderTop={'0.5px solid lightgrey'}
								width={'100%'}
								py={3}
								minHeight={300}
							>
								<Box
									display={'flex'}
									alignItems={'initial'}
									gap={2}
									mb={2}
								>
									<CheckIcon color="primary" />
									<Typography variant="subtitle2">
										{ratePlan.POINT_AMOUNT.toLocaleString()}{' '}
										포인트 지급
									</Typography>
								</Box>
								<Box
									display={'flex'}
									alignItems={'initial'}
									gap={2}
								>
									<CheckIcon color="primary" />
									<Typography
										variant="subtitle2"
										// sx={{ wordBreak: 'break-all' }}
									>
										{ratePlan.DETAIL}
									</Typography>
								</Box>
							</Box>
							<SupportiButton
								variant="contained"
								fullWidth
								isGradient={true}
								contents={'지금 사용하기'}
								onClick={() => {
									if (!access) {
										setAlertModalType('login');
										setAlertModal(true);
										return;
									}
									setPayModalData(ratePlan);
									setPayModal(true);
								}}
							/>
						</Box>
					);
				})}
			</Box>
			<BillingModal
				open={payModal}
				handleClose={() => {
					setPayModal(false);
				}}
				ratePlanInfo={payModalData}
			/>
			<SupportiAlertModal
				type={alertModalType}
				open={alertModal}
				handleClose={() => setAlertModal(false)}
			/>
		</Box>
	);
};

export default Page;
