import React, { useState } from 'react';

import { NextPage } from 'next';
import { v4 as uuidv4 } from 'uuid';
import {
	Box,
	BoxProps,
	FormControl,
	FormControlLabel,
	FormLabel,
	Radio,
	RadioGroup,
	Typography,
} from '@mui/material';
import { loadTossPayments } from '@tosspayments/payment-sdk';
import { useRouter } from 'next/router';
import SupportiInput from '../../src/views/global/SupportiInput';
import SupportiButton from '../../src/views/global/SupportiButton';

const Page: NextPage = () => {
	//* Modules
	const { orderName, amount } = useRouter().query;
	const router = useRouter();
	//* Constants
	const clientKey = process.env.NEXT_PUBLIC_TOSS_CLIENT_KEY;
	const orderId = uuidv4();
	//* States
	const [customerName, setCustomerName] = useState<string>('');
	const [paymentMethod, setPaymentMethod] = useState<'카드' | '가상계좌'>(
		'카드'
	);
	//* Functions
	/**
	 * 토스 결제 실행
	 */
	const tossPay = () => {
		if (customerName === '') {
			alert('결제자 아이디를 입력해주세요!');
			return;
		}
		loadTossPayments(clientKey).then((tossPayments) => {
			// 카드 결제 메서드 실행
			tossPayments.requestPayment(paymentMethod, {
				amount: Number(amount), // 가격
				orderId: orderId, // 주문 id
				orderName: orderName.toString(), // 결제 이름
				customerName: customerName.toString(), // 판매자, 판매처 이름
				successUrl:
					process.env.NEXT_PUBLIC_WEB_HOST +
					`/toss/success` +
					`?route=${router.asPath}`, // 결제 요청 성공시 리다이렉트 주소, 도메인 주소
				failUrl: process.env.NEXT_PUBLIC_WEB_HOST + `/toss/failed`, // 결제 요청 실패시 리다이렉트 주소, 도메인 주소
				validHours: 24, // 유효시간
				cashReceipt: {
					type: '소득공제',
				},
			});
		});
	};
	//* Hooks
	return (
		<Box
			width={'100%'}
			p={{
				xs: 2,
				md: 10,
			}}
			bgcolor={'primary.light'}
		>
			<Typography variant="h4" fontWeight={'bold'}>
				결제 페이지
			</Typography>
			<Box
				bgcolor={'white'}
				width={'100%'}
				borderRadius={3}
				display={'flex'}
				p={4}
				mt={4}
				flexDirection={'column'}
				gap={4}
			>
				<Box display={'flex'} alignItems={'center'} gap={5}>
					{' '}
					<Typography variant="h6" fontWeight={'bold'}>
						결제 방식
					</Typography>
					<FormControl>
						<RadioGroup
							sx={{
								display: 'flex',
								flexDirection: 'row',
							}}
							value={paymentMethod}
							onChange={(e) => {
								if (
									e.target.value === '카드' ||
									e.target.value === '가상계좌'
								)
									setPaymentMethod(e.target.value);
							}}
						>
							<FormControlLabel
								value="카드"
								control={<Radio />}
								label="카드"
							/>
							<FormControlLabel
								value="가상계좌"
								control={<Radio />}
								label="가상계좌"
							/>
						</RadioGroup>
					</FormControl>
				</Box>
				<Box display={'flex'} alignItems={'center'} gap={5}>
					<Typography variant="h6" fontWeight={'bold'}>
						결제 내용
					</Typography>
					<Typography fontWeight={'600'}>{orderName}</Typography>
				</Box>
				<Box display={'flex'} alignItems={'center'} gap={5}>
					<Typography variant="h6" fontWeight={'bold'}>
						결제 금액
					</Typography>
					<Typography fontWeight={'600'}>
						{amount?.toLocaleString()}원
					</Typography>
				</Box>
				<Box>
					<Box display={'flex'} alignItems={'center'} gap={3} mb={1}>
						<Typography variant="h6" fontWeight={'bold'}>
							결제자 아이디
						</Typography>
						<SupportiInput
							value={customerName}
							setValue={setCustomerName}
							type="text"
							additionalProps={{
								placeholder: '결제자 아이디를 입력해주세요',
							}}
							style={{ minWidth: '180px' }}
						/>
					</Box>
					<Typography>
						결제자 아이디는 반드시 서포티 로그인시 사용한 메일로
						입력해주세요!
					</Typography>
				</Box>
				<Box
					width={'100%'}
					alignItems={'center'}
					justifyContent={'center'}
				>
					<SupportiButton
						contents={'결제하기'}
						isGradient={true}
						variant="contained"
						onClick={() => {
							tossPay();
						}}
						style={{
							width: '100%',
							color: 'white',
						}}
					/>
				</Box>
			</Box>
		</Box>
	);
};

export default Page;
