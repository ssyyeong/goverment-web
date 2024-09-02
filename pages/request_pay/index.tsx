import React, { useEffect, useState } from 'react';

import { NextPage } from 'next';
import { v4 as uuidv4 } from 'uuid';
import {
	Box,
	BoxProps,
	FormControl,
	FormControlLabel,
	Grid,
	Radio,
	RadioGroup,
	Typography,
} from '@mui/material';
import { useRouter } from 'next/router';
import { loadTossPayments } from '@tosspayments/payment-sdk';
import SupportiInput from '../../src/views/global/SupportiInput';
import SupportiButton from '../../src/views/global/SupportiButton';
import sendAlimTalk from '../../src/function/sendAlimtalk';
import Image from 'next/image';
import axios from 'axios';

const Page: NextPage = () => {
	//* Modules
	const router = useRouter();
	const params = useRouter().query;
	const { content, name, amount } = params;

	//* States
	/**
	 * 결제 모드
	 */
	const [paymentMode, setPaymentMode] = useState<boolean>(false);
	/**
	 * 결제자 이름
	 */
	const [customerName, setCustomerName] = useState<string>('');
	/**
	 * 요청자 이름
	 */
	const [requesterName, setRequesterName] = useState<string>('');
	/**
	 * 결제자 휴대폰번호
	 */
	const [phoneNumber, setPhoneNumber] = useState<string>('');
	/**
	 * 결제 요청 내역
	 */
	const [orderName, setOrderName] = useState<string>('');
	/**
	 * 결제 요청 금액
	 */
	const [orderAmount, setOrderAmount] = useState<number>();
	/**
	 * 결제방식
	 */
	const [paymentMethod, setPaymentMethod] = useState<'카드' | '가상계좌'>(
		'카드'
	);
	/**
	 * 결제 진행
	 */
	const [paymentProgress, setPaymentProgress] = useState<boolean>(false);
	//* Constants
	const clientKey = process.env.NEXT_PUBLIC_TOSS_CLIENT_KEY;
	const orderId = uuidv4();

	const dataConfig = [
		{
			label: '결제자 이름',
			value: customerName,
			setValue: setCustomerName,
		},
		{
			label: '결제 요청자 이름',
			value: requesterName,
			setValue: setRequesterName,
		},
		{
			label: '휴대폰번호',
			value: phoneNumber,
			setValue: setPhoneNumber,
			placeholder: `'-'제외하고 번호만 입력해주세요.`,
		},
		{
			label: '결제 요청 내역',
			value: orderName,
			setValue: setOrderName,
		},
		{
			label: '결제 요청 금액(원) (300원 이상)',
			value: orderAmount,
			setValue: setOrderAmount,
			type: 'number',
		},
	];
	//* Functions
	// const paypleAuth = async () => {
	// 	//페이플 인증
	// 	await axios
	// 		.post(
	// 			'https://democpay.payple.kr/php/auth.php',
	// 			{
	// 				cst_id: 'test',
	// 				custKey: 'abcd1234567890',
	// 				PCD_PAY_WORK: 'LINKREG',
	// 			},
	// 			{
	// 				headers: {
	// 					'Content-Type': 'application/json',
	// 					Referer: 'supporti.biz',
	// 				},
	// 			}
	// 		)
	// 		.then((res: any) => {
	// 			//페이플 링크 생성
	// 			console.log(res);
	// 		})
	// 		.catch((err) => {
	// 			console.log(err);
	// 		});
	// };

	const payple = () => {
		const { PaypleCpayAuthCheck }: any = window;
		let obj: any = {};
		obj.clientKey = '0616817761CF1C463E033B7208F59421';
		obj.PCD_PAY_TYPE = 'card';
		obj.PCD_PAY_WORK = 'CERT';
		obj.PCD_CARD_VER = '02';
		obj.PCD_PAY_GOODS = content;
		obj.PCD_PAY_TOTAL = amount;
		obj.PCD_RST_URL = `/toss/success`;
		obj.callbackFunction = getResult;

		PaypleCpayAuthCheck(obj);
	};

	const getResult = (res: any) => {
		if (res.PCD_PAY_RST === 'success') {
			router.push(`/toss/success?PCD_AUTH_KEY=${res.PCD_AUTH_KEY}
				&PCD_PAY_REQKEY=${res.PCD_PAY_REQKEY}`);
		} else {
			router.push('/toss/fail');
		}
	};
	/**
	 * 알림톡 보내기
	 */
	const sendAlimTalkRequsetPay = () => {
		sendAlimTalk(
			'SJT_102954',
			`${customerName}|${requesterName}|${orderName}|${orderAmount}|${orderName}|${customerName}|${orderAmount}`,
			phoneNumber,
			() => {
				alert('결제 요청이 전송되었습니다.');
				router.push('/');
			}
		);
	};

	//* Hooks
	useEffect(() => {
		if (content && name && amount) {
			setPaymentMode(true);
		} else {
			setPaymentMode(false);
		}
	}, [params]);

	return (
		<Box p={{ xs: 2, md: 9 }}>
			{/* 결제 요청 모드 */}
			{paymentMode && (
				<Box
					display={'flex'}
					flexDirection={'column'}
					justifyContent={'center'}
					alignItems={'center'}
				>
					<Box width={{ xs: '100%', md: '40%' }}>
						<Typography variant="h4" fontWeight={'600'}>
							결제 요청
						</Typography>
						<Box
							my={4}
							display={'flex'}
							flexDirection={'column'}
							gap={0.5}
						>
							<Typography
								variant="subtitle2"
								color={'gray'}
								fontWeight={'600'}
							>
								결제 요청 정보를 입력해주세요.
							</Typography>
							<Typography
								variant="subtitle2"
								color={'gray'}
								fontWeight={'600'}
							>
								요청 대상에 대한 정보를 정확하게 입력해 주시기
								바랍니다.
							</Typography>
							<Typography
								variant="subtitle2"
								color={'gray'}
								fontWeight={'600'}
							>
								입력된 번호로 결제 요청 카톡 알림이 전송됩니다.
							</Typography>
						</Box>
						{/* 결제 정보 입력 */}
						<Box display={'flex'} flexDirection={'column'} gap={2}>
							{dataConfig.map((data, index) => (
								<Box
									key={index}
									display={'flex'}
									flexDirection={'column'}
									gap={1}
								>
									<Typography variant="subtitle1">
										{data.label}
									</Typography>
									<SupportiInput
										value={data.value}
										setValue={data.setValue}
										type={data.type || 'text'}
										additionalProps={{
											placeholder:
												data.placeholder ||
												`${data.label}을 입력해주세요.`,
										}}
										inputType={data.type || 'text'}
									/>
								</Box>
							))}
							<SupportiButton
								variant="contained"
								contents="결제 요청 보내기"
								onClick={() => {
									if (
										customerName !== '' &&
										phoneNumber !== '' &&
										orderName !== '' &&
										orderAmount >= 300
									) {
										sendAlimTalkRequsetPay();
									} else {
										alert('모든 정보를 입력해주세요.');
									}
								}}
							/>
						</Box>
					</Box>
				</Box>
			)}
			{/* 결제 모드 */}
			{!paymentMode && (
				<Grid
					container
					display={'flex'}
					justifyContent={'center'}
					boxShadow={2}
					bgcolor={'white'}
					borderRadius={3}
					p={2}
					py={5}
					gap={0.5}
				>
					<Grid
						item
						xs={12}
						md={3}
						display={'flex'}
						flexDirection={'column'}
						gap={1}
					>
						<Image
							src="/images/logo/Suppor-TFulllogo.svg"
							alt="logo"
							width={150}
							height={50}
							style={{
								marginBottom: '30px',
							}}
						/>
						<Typography variant="h3" fontWeight={'600'}>
							결제 요청 확인서
						</Typography>
						<Typography color={'gray'}>
							서포티에서 {name}님이 요청하신 결제 요청
							확인서입니다.
						</Typography>
					</Grid>
					<Grid
						item
						xs={12}
						md={8.5}
						mt={{
							xs: 3,
							md: 0,
						}}
					>
						<Typography variant="h4">요청 내용</Typography>
						<Box
							bgcolor={'#eeeeeeaa'}
							p={3}
							borderRadius={3}
							display={'flex'}
							flexDirection={'column'}
							gap={3}
							mt={2}
						>
							<Box display={'flex'} alignItems={'center'}>
								<Typography
									color={'gray'}
									width={'100px'}
									variant="subtitle1"
								>
									이름
								</Typography>
								<Typography variant="subtitle1">
									{name}
								</Typography>
							</Box>
							<Box display={'flex'} alignItems={'center'}>
								<Typography
									color={'gray'}
									width={'100px'}
									variant="subtitle1"
								>
									결제 내역
								</Typography>
								<Typography variant="subtitle1">
									{content}
								</Typography>
							</Box>
							<Box display={'flex'} alignItems={'center'}>
								<Typography
									color={'gray'}
									width={'100px'}
									variant="subtitle1"
								>
									결제 유형
								</Typography>
								<Typography variant="subtitle1">
									단건 결제
								</Typography>
							</Box>
							<Box display={'flex'} alignItems={'center'}>
								<Typography
									color={'gray'}
									width={'100px'}
									variant="subtitle1"
								>
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
												setPaymentMethod(
													e.target.value
												);
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
							<Box display={'flex'} alignItems={'center'}>
								<Typography
									color={'gray'}
									width={'100px'}
									variant="subtitle1"
								>
									결제 금액
								</Typography>
								<Typography variant="subtitle1">
									{amount}원
								</Typography>
							</Box>
						</Box>
						<SupportiInput
							type="checkbox"
							value={paymentProgress}
							setValue={setPaymentProgress}
							label="해당 내용에 틀림이 없음을 확인 했으며, 결제를 진행합니다."
						/>
						<SupportiButton
							variant="outlined"
							contents={`${amount}원 결제하기`}
							onClick={payple}
							muiButtonProps={{
								fullWidth: true,
							}}
						/>
					</Grid>
				</Grid>
			)}
		</Box>
	);
};

export default Page;
