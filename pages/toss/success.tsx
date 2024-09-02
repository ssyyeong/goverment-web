import React, { useEffect } from 'react';

import { NextPage } from 'next';

import { Box, BoxProps, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import DefaultController from '@leanoncompany/supporti-ark-office-project/src/controller/default/DefaultController';
import { LoadingButton } from '@mui/lab';
import axios from 'axios';
import { useAppMember } from '../../src/hooks/useAppMember';
import SupportiButton from '../../src/views/global/SupportiButton';

const Page: NextPage = () => {
	//* Modules
	const router = useRouter();
	const { paymentKey, orderId, amount, paymentType, authKey, reqKey } =
		router.query;
	//* Controllers
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
	const createPaymentHistory = (PCD_PAY_OID) => {
		paymentHistoryController.postData(
			{
				CREATE_OPTION_KEY_LIST: {
					TYPE: 'LINK', //구독권과 구별하기 위한 TYPE
					RESULT: 'SUCCESS', //성공여부("SUCCESS" or "FAIL")
					ORDER_ID: PCD_PAY_OID, //주문ID
					PAY_METHOD: '카드', //결제방식
				},
				FIND_OPTION_KEY_LIST: {},
			},
			`${paymentHistoryController.mergedPath}/create`,
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
	 * 결제 승인 요청
	 */
	const secretKey = process.env.NEXT_PUBLIC_TOSS_CLIENT_SECRET_KEY;
	const confirmPayment = async () => {
		await axios
			.post(
				'/payple/payments/confirm',
				{
					PCD_CST_ID: 'supporti',
					PCD_CUST_KEY:
						'45718aa42f4c54c183ae05b034d5f2bb012b384be023c11a6c62fd8bd31b75a6',
					PCD_AUTH_KEY: router.query.PCD_AUTH_KEY,
					PCD_PAY_REQKEY: router.query.PCD_PAY_REQKEY,
				},
				{
					headers: {
						'Content-Type': 'application/json',
						Referer: 'supporti.biz',
					},
				}
			)
			.then((response: any) => {
				console.log(response);
				console.log('결제 성공');
				setLoading(false);
				// createPaymentHistory(response.PCD_PAY_OID);
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
		// if (paymentKey) {
		confirmPayment();
		// }
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
				<span>
					{' '}
					{loading
						? '결제가 진행중입니다!'
						: '결제가 완료되었습니다!'}
				</span>
			</LoadingButton>
			{/* <Typography
				variant="h3"
				fontWeight={'bold'}
				sx={{
					mt: 3,
				}}
			>
				결제가 진행중입니다!
			</Typography> */}
			<SupportiButton
				contents={'홈으로 이동'}
				variant="contained"
				style={{
					width: '200px',
					marginRight: 'auto',
					marginLeft: 'auto',
					marginTop: 5,
				}}
				onClick={() => {
					router.push('/');
				}}
			/>
		</Box>
	);
};

export default Page;
