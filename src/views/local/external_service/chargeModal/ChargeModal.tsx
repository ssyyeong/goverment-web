import React, { useState } from 'react';

import { Box, BoxProps } from '@mui/material';
import SuppportiModal from '../../../global/SuppportiModal';
import SupportiButton from '../../../global/SupportiButton';
import { loadTossPayments } from '@tosspayments/payment-sdk';
import { v4 as uuidv4 } from 'uuid';

interface IChargeModalProps {
	open: boolean;
	handleClose: () => void;
}

const ChargeModal = (props: IChargeModalProps) => {
	const [radio, setRadio] = useState<string>('');
	const [point, setPoint] = useState<number>(0);
	const clientKey = process.env.NEXT_PUBLIC_TOSS_CLIENT_KEY;
	const orderId = uuidv4();
	// 토스페이
	const tossPay = () => {
		loadTossPayments(clientKey).then((tossPayments) => {
			// 카드 결제 메서드 실행
			tossPayments.requestPayment('카드', {
				amount: point, // 가격
				orderId: orderId, // 주문 id
				orderName: `서포티 단건결제 : ${point}포인트 충전`, // 결제 이름
				customerName: `서포티`, // 판매자, 판매처 이름
				successUrl: process.env.NEXT_PUBLIC_WEB_HOST + `/success`, // 결제 요청 성공시 리다이렉트 주소, 도메인 주소
				failUrl: process.env.NEXT_PUBLIC_WEB_HOST + `/failed`, // 결제 요청 실패시 리다이렉트 주소, 도메인 주소
				validHours: 24, // 유효시간
				cashReceipt: {
					type: '소득공제',
				},
			});
		});
	};
	return (
		<SuppportiModal
			open={props.open}
			handleClose={() => {
				props.handleClose();
			}}
			activeHeader={true}
			title="포인트 충전"
			muiModalProps={{
				maxWidth: '60%',
			}}
		>
			<SupportiButton
				contents={'포인트 충전'}
				isGradient={true}
				fullWidth={true}
				onClick={() => {
					tossPay();
				}}
			/>
		</SuppportiModal>
	);
};

export default ChargeModal;
