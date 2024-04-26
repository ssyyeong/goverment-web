import React, { useState } from 'react';

import { Box, BoxProps, Typography } from '@mui/material';
import SupportiModal from '../../../global/SupportiModal';
import SupportiButton from '../../../global/SupportiButton';
import { loadTossPayments } from '@tosspayments/payment-sdk';
import { v4 as uuidv4 } from 'uuid';
import SupportiInput from '../../../global/SupportiInput';
import { useRouter } from 'next/router';
import DefaultController from '@leanoncompany/supporti-ark-office-project/src/controller/default/DefaultController';
import { useAppMember } from '../../../../hooks/useAppMember';

interface ITicketPayModalProps {
	open: boolean;
	handleClose: () => void;
	ticketId: string | number;
	ticketPrice: number;
	ticketName: string;
}

const TicketPayModal = (props: ITicketPayModalProps) => {
	//* States
	/**
	 * 충전할 포인트
	 */
	//* Constants
	const clientKey = process.env.NEXT_PUBLIC_TOSS_CLIENT_KEY;
	const orderId = uuidv4();

	//* Modules
	const router = useRouter();
	const { memberId, memberName } = useAppMember();

	//* Controller
	const paymentHistoryController = new DefaultController('PaymentHistory');
	//* Functions
	/**
	 * 토스 결제 실행
	 */
	const tossPay = () => {
		// 히스토리 생성
		paymentHistoryController.postData(
			{
				CREATE_OPTION_KEY_LIST: {
					APP_MEMBER_IDENTIFICATION_CODE: memberId,
					DESCRIPTION: props.ticketName,
					AMOUNT: props.ticketPrice,
					TYPE: 'TICKET',
					ORDER_ID: orderId,
				},
			},

			`${paymentHistoryController.mergedPath}/create`,
			(res) => {
				loadTossPayments(clientKey).then((tossPayments) => {
					// 카드 결제 메서드 실행
					tossPayments.requestPayment('카드', {
						amount: props.ticketPrice, // 가격
						orderId: orderId, // 주문 id
						orderName: `${props.ticketName} 결제`, // 결제 이름
						customerName: memberName, // 판매자, 판매처 이름
						successUrl:
							process.env.NEXT_PUBLIC_WEB_HOST +
							`/toss/success` +
							`?route=${router.asPath}`, // 결제 요청 성공시 리다이렉트 주소, 도메인 주소
						failUrl:
							process.env.NEXT_PUBLIC_WEB_HOST + `/toss/failed`, // 결제 요청 실패시 리다이렉트 주소, 도메인 주소
						validHours: 24, // 유효시간
						cashReceipt: {
							type: '소득공제',
						},
					});
				});
			}
		);
	};

	return (
		<SupportiModal
			open={props.open}
			handleClose={() => {
				props.handleClose();
			}}
			activeHeader={true}
			title="티켓 구매하기"
			muiModalProps={{
				maxWidth: '60%',
			}}
			style={{
				minWidth: '30%',
			}}
		>
			<Box p={3}>
				<Typography variant="body1" style={{ marginBottom: '1rem' }}>
					{props.ticketName}을 구매하시겠습니까?
				</Typography>
				<Typography variant="body1" style={{ marginBottom: '1rem' }}>
					{props.ticketPrice}원이 결제됩니다.
				</Typography>
			</Box>
			<SupportiButton
				contents={'티켓 구매하기'}
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

export default TicketPayModal;
