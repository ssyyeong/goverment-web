import React, { useEffect } from 'react';

import { NextPage } from 'next';

import { Box, BoxProps, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import axios from 'axios';

import { PaymentInfoController } from '../../src/controller/PaymentInfoController';
import { LoadingButton } from '@mui/lab';
import { useAppMember } from '../../src/hooks/useAppMember';
import DefaultController from '@leanoncompany/supporti-ark-office-project/src/controller/default/DefaultController';
import { SupportiAlertModal } from '../../src/views/global/SupportiAlertModal';

const Page: NextPage = () => {
	//* Modules
	const router = useRouter();
	const paymentInfoController = new PaymentInfoController();
	const subscriptionProductController = new DefaultController(
		'SubscriptionProduct'
	);
	const subscriptionAccessibilityController = new DefaultController(
		'SubscriptionAccessibility'
	);

	//* Constants
	const clientKey = process.env.NEXT_PUBLIC_TOSS_LIVE_SECRET_KEY_BILLING;
	const client = btoa(clientKey);

	const { customerKey, authKey } = router.query;

	const headers = {
		Authorization: `Basic ${client}`,
		'Content-Type': 'application/json',
	};
	const data = {
		authKey: authKey,
		customerKey: customerKey,
	};
	/**
	 * 유저 아이디 가져오는 훅
	 */
	const { memberId } = useAppMember();

	//* States
	const [loading, setLoading] = React.useState<boolean>(false);
	/**
	 * 알럿
	 */
	const [alertModal, setAlertModal] = React.useState<boolean>(false);
	//* Functions
	const getBillingkey = async () => {
		await axios
			.post(
				'https://api.tosspayments.com/v1/billing/authorizations/issue',
				data,
				{ headers }
			)
			.then(async (response) => {
				//카드 정보 등록 완료 후 빌링키 받아오기
				const billingKey = response.data.billingKey;
				console.log(customerKey);

				/**
				 * 빌링키 등록
				 */
				paymentInfoController.createSubscription(
					{
						APP_MEMBER_IDENTIFICATION_CODE: memberId,
						SUBSCRIPTION_PRODUCT_IDENTIFICATION_CODE: customerKey
							.toString()
							.split('RatePlanId')[1],
						INTERVAL: 'MONTHLY',
						BILLING_KEY: billingKey,
						CUSTOMER_KEY: customerKey,
					},
					(res) => {
						setLoading(false);
						setAlertModal(true);
					},
					(err) => {
						alert(`${err.response.data.message}`);
						router.push('/rate_plan');
					}
				);
			})
			.catch((e) => {
				console.log(e);
				console.log(e.response.data.message);
				alert(`다시 시도해주세요!`);
				router.push('/rate_plan');
			});
	};
	//* Hooks

	useEffect(() => {
		setLoading(true);
		memberId && customerKey && authKey && getBillingkey();
	}, [router.query, memberId]);
	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'center',
				alignItems: 'center',
				width: '100%',
				height: '80vh',
			}}
		>
			<LoadingButton
				size="large"
				onClick={() => {}}
				loading={loading}
				// loadingIndicator="Loading…"
				// variant="outlined"
			>
				<span> 등록이 완료되었습니다!</span>
			</LoadingButton>
			<Typography
				variant="h3"
				fontWeight={'bold'}
				sx={{
					mt: 3,
				}}
			>
				카드 등록이 진행중입니다!
			</Typography>
			<SupportiAlertModal
				open={alertModal}
				handleClose={() => {
					setAlertModal(false);
					router.push('/');
				}}
				type="paymentSuccess"
			/>
		</Box>
	);
};

export default Page;
