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
	type:
		| 'success'
		| 'login'
		| 'subscribe'
		| 'point'
		| 'already'
		| 'withdraw'
		| 'unsubscribe'
		| 'cancel'
		| 'business'
		| 'loginfail'
		| 'consultingexceed'
		| 'seminarexceed'
		| 'indicatorModify'
		| 'indicatorDelete'
		| 'indicatorWarning';
	customHandleClose?: () => void;
}

const SupportiAlertModal = (props: ISupportiAlertModalProps) => {
	const router = useRouter();
	const [openChargeModal, setOpenChargeModal] =
		React.useState<boolean>(false);
	console.log(props.type);
	const modalConfig = {
		success: {
			type: 'success',
			title: '신청완료 되었습니다.',
			content: '확인',
			onclick: () => {
				props.handleClose();
				props.customHandleClose && props.customHandleClose();
			},
			cancelButtonAvailable: false,
		},
		login: {
			type: 'error',
			title: '로그인 후 이용해주세요.',
			content: '로그인 페이지로 이동',
			onclick: () => {
				router.push('/auth/sign_in');
			},
			cancelButtonAvailable: false,
		},
		subscribe: {
			type: 'error',
			title: '구독 회원만 이용가능한 서비스입니다.',
			content: '구독 결제 페이지로 이동',
			onclick: () => {
				router.push('/rate_plan');
			},
			cancelButtonAvailable: false,
		},
		point: {
			type: 'error',
			title: '포인트가 부족합니다.',
			content: '포인트 충전하러 가기',
			onclick: () => {
				setOpenChargeModal(true);
			},
			cancelButtonAvailable: false,
		},
		already: {
			type: 'error',
			title: '이미 신청하신 세미나입니다.',
			content: '확인',
			onclick: () => {
				props.handleClose();
				props.customHandleClose && props.customHandleClose();
			},
			cancelButtonAvailable: false,
		},
		withdraw: {
			type: 'error',
			title: '탈퇴시 모든 개인정보가 삭제됩니다. 탈퇴하시겠습니까?',
			content: '확인',
			onclick: () => {
				props.customHandleClose && props.customHandleClose();
			},
			cancelButtonAvailable: true,
		},
		unsubscribe: {
			type: 'error',
			title: '구독 취소 시 다음 결제 일 기준으로 모든 유료 서비스가 제한됩니다. 구독 취소하시겠습니까?',
			content: '확인',
			onclick: () => {
				props.customHandleClose && props.customHandleClose();
			},
			cancelButtonAvailable: true,
		},
		cancel: {
			type: 'error',
			title: '정말 취소하시겠습니까?',
			content: '확인',
			onclick: () => {
				props.customHandleClose && props.customHandleClose();
			},
			cancelButtonAvailable: true,
		},
		business: {
			type: 'error',
			title: '기업회원만 이용하실 수 있는 서비스입니다.',
			content: '확인',
			onclick: () => {
				// props.customHandleClose && props.customHandleClose();
				props.handleClose();
			},
			cancelButtonAvailable: false,
		},
		loginfail: {
			type: 'error',
			title: '입력하신 정보와 일치하는 회원이 없습니다.',
			content: '확인',
			onclick: () => {
				props.handleClose();
			},
			cancelButtonAvailable: false,
		},
		consultingexceed: {
			type: 'error',
			title: '동일고객 예약횟수를 초과하였습니다.',
			content: '확인',
			onclick: () => {
				props.handleClose();
			},
			cancelButtonAvailable: false,
		},
		seminarexceed: {
			type: 'error',
			title: '제한인원을 초과하였습니다.',
			content: '확인',
			onclick: () => {
				props.handleClose();
			},
			cancelButtonAvailable: false,
		},
		indicatorModify: {
			type: 'error',
			title: '해당 하위목표의 히스토리가 사라집니다! 수정하시겠습니까?',
			content: '확인',
			onclick: () => {
				props.handleClose();
				props.customHandleClose && props.customHandleClose();
			},
			cancelButtonAvailable: true,
		},
		indicatorDelete: {
			type: 'error',
			title: '해당 하위목표의 히스토리가 사라집니다! 삭제하시겠습니까?',
			content: '확인',
			onclick: () => {
				props.handleClose();
				props.customHandleClose && props.customHandleClose();
			},
			cancelButtonAvailable: true,
		},
		indicatorWarning: {
			type: 'error',
			title: '남은 하위 목표 기입 필요',
			content: '확인',
			onclick: () => {
				props.handleClose();
				props.customHandleClose && props.customHandleClose();
			},
			cancelButtonAvailable: false,
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
				{props.type === 'indicatorWarning' && (
					<Typography
						variant={'h5'}
						fontWeight={500}
						my={1}
						color="secondary.light"
					>
						메인 목표에 맞게 남은 하위 목표를 기입하세요.
					</Typography>
				)}
				<Box
					display={'flex'}
					alignItems={'center'}
					width={'100%'}
					gap={2}
				>
					{modalConfig[props.type].cancelButtonAvailable && (
						<SupportiButton
							contents={'취소'}
							// fullWidth
							isGradient={false}
							style={{
								bgcolor: '#a4a4a4',
								color: '#fff',
								mt: 3,
								width: '50%',
							}}
							onClick={() => {
								props.handleClose();
							}}
						/>
					)}
					<SupportiButton
						contents={modalConfig[props.type].content}
						isGradient={true}
						style={{
							color: '#fff',
							mt: 3,
							width: modalConfig[props.type].cancelButtonAvailable
								? '50%'
								: '100%',
						}}
						onClick={() => modalConfig[props.type].onclick()}
					/>
				</Box>
			</Box>
			<ChargeModal
				open={openChargeModal}
				handleClose={() => setOpenChargeModal(false)}
			/>
		</SuppportiModal>
	);
};

export default SupportiAlertModal;
