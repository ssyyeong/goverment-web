import React, { useState } from 'react';

import { Box, BoxProps, Typography } from '@mui/material';
import SuppportiModal from '../../../global/SuppportiModal';
import SupportiButton from '../../../global/SupportiButton';
import { loadTossPayments } from '@tosspayments/payment-sdk';
import { v4 as uuidv4 } from 'uuid';
import SupportiInput from '../../../global/SupportiInput';
import moment from 'moment';

interface IBillingModalProps {
	open: boolean;
	handleClose: () => void;
	ratePlanInfo: any;
}

const BillingModal = (props: IBillingModalProps) => {
	const clientKey = process.env.NEXT_PUBLIC_TOSS_CLIENT_KEY_BILLING;
	const orderId =
		uuidv4() +
		`RatePlanId${props.ratePlanInfo?.SUBSCRIPTION_PRODUCT_IDENTIFICATION_CODE}`;
	// 토스페이
	const tossPay = () => {
		loadTossPayments(clientKey).then((tossPayments) => {
			// 카드 결제 메서드 실행
			tossPayments
				.requestBillingAuth('카드', {
					// 결제수단 파라미터
					// 빌링키 발급 요청을 위한 파라미터
					customerKey: orderId,
					successUrl:
						process.env.NEXT_PUBLIC_WEB_HOST + '/billing/success',
					failUrl:
						process.env.NEXT_PUBLIC_WEB_HOST + '/billing/failed',
				})
				.catch(function (error) {
					if (error.code === 'USER_CANCEL') {
						// 결제 고객이 결제창을 닫았을 때 에러 처리
						alert('결제를 취소하셨습니다!');
					} else if (error.code === 'INVALID_CARD_COMPANY') {
						// 유효하지 않은 카드 코드에 대한 에러 처리
						// setAlertData("유효하지 않은 카드입니다!");
						// setAlertModal(!alertModal);
						alert('유효하지 않은 카드입니다!');
					}
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
			title="구독권 결제"
			muiModalProps={{
				maxWidth: '60%',
			}}
			style={{
				minWidth: '40%',
				// maxWidth: '60%',
				width: { xs: '90%', md: '40%' },
			}}
		>
			<Box
				width={'100%'}
				display={'flex'}
				flexDirection={'column'}
				mb={2}
			>
				<Typography variant="h6" fontWeight={'600'}>
					요금제 이름
				</Typography>
				<Typography
					variant="subtitle1"
					sx={{ borderBottom: '1px solid lightgrey', py: 1, mb: 1 }}
				>
					{props.ratePlanInfo?.NAME}
				</Typography>
				<Typography variant="h6" fontWeight={'600'}>
					가격
				</Typography>

				<Typography
					variant="subtitle1"
					sx={{ borderBottom: '1px solid lightgrey', py: 1, mb: 1 }}
				>
					{props.ratePlanInfo?.DISCOUNT_PRICE?.toLocaleString()}원
				</Typography>
				<Typography variant="h6" fontWeight={'600'}>
					다음 결제일
				</Typography>
				<Typography
					variant="subtitle1"
					sx={{ borderBottom: '1px solid lightgrey', py: 1, mb: 1 }}
				>
					{moment().add(1, 'months').format('YYYY-MM-DD')}
				</Typography>
			</Box>

			<SupportiButton
				contents={'구독권 결제'}
				isGradient={true}
				fullWidth={true}
				onClick={() => {
					tossPay();
				}}
				style={{ color: 'white' }}
			/>
		</SuppportiModal>
	);
};

export default BillingModal;
