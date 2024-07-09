import React, { useEffect } from 'react';

import { NextPage } from 'next';

import { Box, BoxProps, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import DefaultController from '@leanoncompany/supporti-ark-office-project/src/controller/default/DefaultController';
import { LoadingButton } from '@mui/lab';
import axios from 'axios';
import dayjs from 'dayjs';
import moment from 'moment';
import SupportiButton from '../../src/views/global/SupportiButton';

const Page: NextPage = () => {
	//* Modules
	const router = useRouter();
	const {
		paymentKey,
		orderId,
		amount,
		paymentType,
		find_option,
		productLink,
	} = router.query;
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

	/**
	 * 결제 내역 생성
	 */
	const createPaymentHistory = (payMethod) => {
		paymentHistoryController.putData(
			{
				UPDATE_OPTION_KEY_LIST: {
					TYPE: 'TICKET', //구독권과 구별하기 위한 TYPE
					RESULT: 'SUCCESS', //성공여부("SUCCESS" or "FAIL")
					ORDER_ID: orderId, //주문ID
					PAY_METHOD: payMethod, //결제방식
				},
				FIND_OPTION_KEY_LIST: {
					SEMINAR_PRODUCT_IDENTIFICATION_CODE: find_option,
				},
			},
			`${paymentHistoryController.mergedPath}/update`,
			(res) => {
				console.log('결제 내역 생성 성공');
				console.log('결제 성공');
				setLoading(false);
				// router.push(route as string);
			},
			(err) => {
				// alert('결제 내역 생성 실패');
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
				setVirtualAccount(response.data.virtualAccount);

				console.log(response);
				console.log('결제 성공');
				setLoading(false);

				if (response.data.virtualAccount == null) {
					window.alert(
						'신청이 완료되었습니다! 결제 확인까지 시간이 소요될 수 있습니다.'
					);
					createPaymentHistory('CARD');
					router.push('/');
				} else {
					console.log('가상 결제 계좌', virtualAccount);
					createPaymentHistory('VIRTUAL_ACCOUNT');
				}

				// router.back();
			})
			.catch((e) => {
				console.log(e);
				console.log(e.response.data.message);
				alert(e.response.data.message);
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

	console.log(virtualAccount);

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
					{virtualAccount == null
						? '결제가 완료되었습니다! 신청내역은 마이페이지 내 히스토리에서 확인하실 수 있습니다. 관리자 확인 후 결제처리가 완료 될 예정입니다.'
						: ''}
				</span>
			</LoadingButton>
			{virtualAccount == null ? (
				<Typography
					variant="h3"
					fontWeight={'bold'}
					sx={{
						mt: 3,
					}}
				>
					결제가 진행중입니다!
				</Typography>
			) : (
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
						{moment(virtualAccount?.dueDate).format(
							'YYYY-MM-DD HH:mm'
						)}
						까지 입금 바랍니다.
					</Typography>
					<Typography color={'red'} textAlign={'center'}>
						해당 페이지를 벗어날 시 계좌 확인이 불가능합니다. <br />
						확인 후 페이지를 벗어나주세요!
					</Typography>

					<Typography
						fontWeight={'bold'}
						textAlign={'center'}
						variant="h3"
					>
						⚠️ 입금내역 확인 후 결제처리 및 최종신청 완료가 되오니,
						꼭 유의해주세요 ⚠️
					</Typography>
					<SupportiButton
						contents={
							productLink
								? '사전설문 및 첨부자료 확인'
								: '홈으로 이동'
						}
						variant="contained"
						style={{
							width: '200px',
							marginRight: 'auto',
							marginLeft: 'auto',
							marginTop: 5,
						}}
						onClick={() => {
							if (productLink) {
								router.push(productLink as string);
							} else {
								router.push('/');
							}
						}}
					/>
				</Box>
			)}
		</Box>
	);
};

export default Page;
