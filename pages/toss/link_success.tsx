import React, { useEffect } from 'react';

import { NextPage } from 'next';

import { Box, BoxProps, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import DefaultController from '@leanoncompany/supporti-ark-office-project/src/controller/default/DefaultController';
import { LoadingButton } from '@mui/lab';
import axios from 'axios';
import { useAppMember } from '../../src/hooks/useAppMember';
import dayjs from 'dayjs';

const Page: NextPage = () => {
	//* Modules
	const router = useRouter();
	const { paymentKey, orderId, amount, paymentType } = router.query;
	//* Controllers
	const paymentHistoryController = new DefaultController('PaymentHistory');
	//* Constants
	//* States
	/**
	 * 로딩 상태
	 */
	const [loading, setLoading] = React.useState<boolean>(false);
	/**
	 * 가상계좌 데이터
	 */
	const [virtualAccount, setVirtualAccount] = React.useState<any>(undefined);
	//* Functions
	console.log(paymentType, virtualAccount);
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
					PAY_METHOD: virtualAccount ? 'VIRTUAL_ACCOUNT' : 'CARD', //결제방식
				},
				FIND_OPTION_KEY_LIST: {},
			},
			`${paymentHistoryController.mergedPath}/update`,
			(res) => {
				console.log('결제 내역 생성 성공');
				console.log('결제 성공');
				setLoading(false);
				// router.push(route as string);
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
				setLoading(false);
				if (response.data.method === '가상계좌') {
					setVirtualAccount(response.data.virtualAccount);
				} else {
					setLoading(false);
					window.alert(
						'결제가 완료되었습니다! 결제 여부 갱신까지는 시간이 소요될 수 있습니다.'
					);
					// router.back();
					router.push('/');
				}
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
				<span>
					{' '}
					{virtualAccount !== null || virtualAccount !== undefined
						? ''
						: '결제가 완료되었습니다!'}
				</span>
			</LoadingButton>
			{virtualAccount !== null || virtualAccount !== undefined ? (
				<Box
					display={'flex'}
					flexDirection={'column'}
					gap={2}
					justifyContent={'center'}
					alignItems={'center'}
				>
					<Typography
						variant="h3"
						fontWeight={'bold'}
						sx={{
							mt: 3,
						}}
					>
						{virtualAccount?.bank} {virtualAccount?.accountNumber}
					</Typography>
					<Typography variant="h3" fontWeight={'bold'}>
						{dayjs(virtualAccount?.dueDate).format(
							'YYYY.MM.DD(ddd) hh:mm'
						)}{' '}
						까지 입금 바랍니다.
					</Typography>
					<Typography color={'red'}>
						해당 페이지를 벗어날 시 계좌 확인이 불가능합니다. 확인후
						페이지를 벗어나주세요!
					</Typography>
				</Box>
			) : (
				<Typography
					variant="h3"
					fontWeight={'bold'}
					sx={{
						mt: 3,
					}}
				>
					결제가 진행중입니다!
				</Typography>
			)}
		</Box>
	);
};

export default Page;
