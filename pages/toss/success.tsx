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
	const pointHistoryController = new DefaultController('PointHistory');
	const paymentHistoryController = new DefaultController('PaymentHistory');
	//* Constants
	//* States
	/**
	 * 로딩 상태
	 */
	const [loading, setLoading] = React.useState<boolean>(false);
	const { route } = router.query;
	//* Functions

	/**
	 * 결제 내역 생성
	 */
	const createPaymentHistory = () => {
		paymentHistoryController.putData(
			{
				UPDATE_OPTION_KEY_LIST: {
					TYPE: 'TICKET', //구독권과 구별하기 위한 TYPE
					RESULT: 'SUCCESS', //성공여부("SUCCESS" or "FAIL")
					ORDER_ID: orderId, //주문ID
					PAY_METHOD: '카드', //결제방식
				},
			},
			`${paymentHistoryController.mergedPath}/update`,
			(res) => {
				console.log('결제 내역 생성 성공');
				console.log('결제 성공');
				setLoading(false);
				router.push(route as string);
			},
			(err) => {
				alert('결제 내역 생성 실패');
			}
		);
	};

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
				createPaymentHistory();
			});
	};
	//* Hooks
	/**
	 * 유저 아이디 가져오는 훅
	 */
	const { memberId } = useAppMember();
	/**
	 * 결제 성공 데이터 백에 보내기
	 */
	useEffect(() => {
		setLoading(true);
		if (paymentKey && memberId) {
			confirmPayment();
		}
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
