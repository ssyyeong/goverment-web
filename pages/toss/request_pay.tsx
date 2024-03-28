import React, { useEffect } from 'react';

import { NextPage } from 'next';

import { Box, BoxProps, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import DefaultController from '@leanoncompany/supporti-ark-office-project/src/controller/default/DefaultController';
import { LoadingButton } from '@mui/lab';
import axios from 'axios';
import { useAppMember } from '../../src/hooks/useAppMember';

const Page: NextPage = () => {
	//* Modules
	const router = useRouter();
	const { paymentKey, orderId, amount, paymentType } = router.query;
	//* Controllers
	//* Constants
	//* States
	/**
	 * 로딩 상태
	 */
	const [loading, setLoading] = React.useState<boolean>(false);
	//* Functions

	/**
	 * toss 에 결제 승인 요청
	 */
	const secretKey = process.env.NEXT_PUBLIC_TOSS_CLIENT_SECRET_KEY;
	const confirmPayment = async () => {
		await axios
			.post(
				'https://api.tosspayments.com/v1/payments/confirm',
				{
					paymentKey: paymentKey,
					orderId: orderId,
					amount: amount,
				},
				{
					headers: {
						Authorization:
							'Basic ' +
							Buffer.from(secretKey + ':').toString('base64'),
						'Content-Type': 'application/json',
					},
				}
			)
			.then((response) => {
				console.log(response);
				console.log('결제 성공');
				setLoading(false);
				window.alert('결제가 완료되었습니다!');
				router.push('/');
			});
	};
	//* Hooks

	/**
	 * 결제 성공 데이터 백에 보내기
	 */
	useEffect(() => {
		setLoading(true);
		if (paymentKey) {
			confirmPayment();
		}
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
			<LoadingButton size="large" onClick={() => {}} loading={loading}>
				<span> 결제가 완료되었습니다!</span>
			</LoadingButton>
			<Typography
				variant="h3"
				fontWeight={'bold'}
				sx={{
					mt: 3,
				}}
			>
				결제가 진행중입니다!
			</Typography>
		</Box>
	);
};

export default Page;
