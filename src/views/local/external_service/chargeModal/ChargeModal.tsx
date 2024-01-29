import React, { useState } from 'react';

import { Box, BoxProps, Typography } from '@mui/material';
import SupportiModal from '../../../global/SupportiModal';
import SupportiButton from '../../../global/SupportiButton';
import { loadTossPayments } from '@tosspayments/payment-sdk';
import { v4 as uuidv4 } from 'uuid';
import SupportiInput from '../../../global/SupportiInput';
import { useRouter } from 'next/router';

interface IChargeModalProps {
	open: boolean;
	handleClose: () => void;
}

const ChargeModal = (props: IChargeModalProps) => {
	//* States
	/**
	 * 충전할 포인트
	 */
	const [point, setPoint] = useState<number>();
	//* Constants
	const clientKey = process.env.NEXT_PUBLIC_TOSS_CLIENT_KEY;
	const orderId = uuidv4();

	//* Modules
	const router = useRouter();
	//* Functions
	/**
	 * 토스 결제 실행
	 */
	const tossPay = () => {
		if (point <= 300) {
			alert('300포인트 이상 충전해주세요!');
			return;
		}
		loadTossPayments(clientKey).then((tossPayments) => {
			// 카드 결제 메서드 실행
			tossPayments.requestPayment('카드', {
				amount: point, // 가격
				orderId: orderId, // 주문 id
				orderName: `서포티 단건결제 : ${point}포인트 충전`, // 결제 이름
				customerName: `서포티`, // 판매자, 판매처 이름
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
	return (
		<SupportiModal
			open={props.open}
			handleClose={() => {
				props.handleClose();
			}}
			activeHeader={true}
			title="포인트 충전"
			muiModalProps={{
				maxWidth: '60%',
			}}
			style={{
				minWidth: '30%',
			}}
		>
			<Typography sx={{ mb: 1 }}>
				충전할 포인트를 입력해주세요!
			</Typography>
			<SupportiInput
				type="number"
				value={point}
				setValue={setPoint}
				width={'100%'}
				style={{ mb: 2 }}
				additionalProps={{
					placeholder: '포인트를 입력해주세요!',
				}}
			/>
			<SupportiButton
				contents={'포인트 충전'}
				isGradient={true}
				fullWidth={true}
				onClick={() => {
					tossPay();
				}}
				style={{ color: 'white' }}
			/>
		</SupportiModal>
	);
};

export default ChargeModal;
