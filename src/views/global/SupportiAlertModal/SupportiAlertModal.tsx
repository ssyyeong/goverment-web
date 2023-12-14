import React from 'react';

import { Box, BoxProps, Typography } from '@mui/material';
import SuppportiModal, {
	ISuppportiModalProps,
} from '../SuppportiModal/SuppportiModal';
import SupportiButton from '../SupportiButton';
import { useRouter } from 'next/router';
import ChargeModal from '../../local/external_service/chargeModal/ChargeModal';

interface ISupportiAlertModalProps {
	open: boolean;
	handleClose: () => void;
	type: 'success' | 'login' | 'subscribe' | 'point' | 'already';
	customHandleClose?: () => void;
}

const SupportiAlertModal = (props: ISupportiAlertModalProps) => {
	const router = useRouter();
	const [openChargeModal, setOpenChargeModal] =
		React.useState<boolean>(false);
	const modalConfig = {
		success: {
			type: 'success',
			title: '신청완료 되었습니다.',
			content: '확인',
			onclick: () => {
				props.handleClose();
				props.customHandleClose && props.customHandleClose();
			},
		},
		login: {
			type: 'error',
			title: '로그인 후 이용해주세요.',
			content: '로그인 페이지로 이동',
			onclick: () => {
				router.push('/auth/sign_in');
			},
		},
		subscribe: {
			type: 'error',
			title: '구독 회원만 이용가능한 서비스입니다.',
			content: '구독 결제 페이지로 이동',
			onclick: () => {
				router.push('/rate_plan');
			},
		},
		point: {
			type: 'error',
			title: '포인트가 부족합니다.',
			content: '포인트 충전하러 가기',
			onclick: () => {
				setOpenChargeModal(true);
			},
		},
		already: {
			type: 'error',
			title: '이미 신청하신 세미나입니다.',
			content: '확인',
			onclick: () => {
				props.handleClose();
				props.customHandleClose && props.customHandleClose();
			},
		},
	};

	return (
		<SuppportiModal
			open={props.open}
			handleClose={() => {
				props.handleClose();
			}}
		>
			<Box
				display={'flex'}
				flexDirection={'column'}
				alignItems={'center'}
				justifyContent={'center'}
				width={'100%'}
				height={'100%'}
				minWidth={'250px'}
			>
				<Box
					width={'100%'}
					display={'flex'}
					alignItems={'center'}
					justifyContent={'center'}
					mb={'16px'}
				>
					{modalConfig[props.type].type === 'success' && (
						<img
							src={'/images/icons/icon_success.svg'}
							alt={'success'}
						/>
					)}
					{modalConfig[props.type].type === 'error' && (
						<img
							src={'/images/icons/icon_error.svg'}
							alt={'error'}
						/>
					)}
				</Box>
				<Typography variant={'h4'} fontWeight={'bold'} my={1}>
					{modalConfig[props.type].title}
				</Typography>
				<SupportiButton
					contents={modalConfig[props.type].content}
					fullWidth
					isGradient={true}
					style={{
						color: '#fff',
						mt: 3,
					}}
					onClick={() => modalConfig[props.type].onclick()}
				/>
			</Box>
			<ChargeModal
				open={openChargeModal}
				handleClose={() => setOpenChargeModal(false)}
			/>
		</SuppportiModal>
	);
};

export default SupportiAlertModal;
