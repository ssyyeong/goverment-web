import React, { useEffect } from 'react';

import { NextPage } from 'next';

import { Box, BoxProps, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import axios from 'axios';

import { PaymentInfoController } from '../../src/controller/PaymentInfoController';
import { LoadingButton } from '@mui/lab';

const Page: NextPage = () => {
	//* Modules
	const router = useRouter();
	const paymentInfoController = new PaymentInfoController();
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

	//* States
	const [loading, setLoading] = React.useState<boolean>(false);
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
				console.log(billingKey);
				/**
				 * 빌링키 등록
				 */
				paymentInfoController.createItem(
					{
						BILLING_KEY: billingKey,
						CUSTOMER_KEY: customerKey,
						APP_MEMBER_IDENTIFICATION_CODE: 1,
					},
					(res) => {
						// console.log(res);
						/**
						 * 성공시 구독 등록
						 */
						paymentInfoController.createSubscription(
							{
								APP_MEMBER_IDENTIFICATION_CODE: 1,
								SUBSCRIPTION_PRODUCT_IDENTIFICATION_CODE:
									customerKey
										.toString()
										.split('RatePlanId')[1],
								INTERVAL: 'MONTHLY',
							},
							(res) => {
								console.log(res);
								setLoading(false);
								router.push('/');
							},
							(err) => {
								console.log(err);
							}
						);
					},
					(err) => {
						console.log(err);
					}
				);
			})
			.catch((e) => {
				console.log(e);
				alert(`${e.response.data.message} 다시 시도해주세요!`);
				router.push('/rate_plan');
			});
	};
	//* Hooks
	useEffect(() => {
		setLoading(true);
		customerKey && authKey && getBillingkey();
	}, [router.query]);
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
		</Box>
	);
};

export default Page;
