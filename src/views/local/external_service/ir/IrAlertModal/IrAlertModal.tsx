import React from 'react';

import { Box, BoxProps, Typography } from '@mui/material';

import { useRouter } from 'next/router';
import SupportiModal from '../../../../global/SupportiModal';
import SupportiButton from '../../../../global/SupportiButton';

interface IIrAlertModalProps {
	/**
	 * 모달 오픈 여부
	 */
	open: boolean;
	/**
	 * 모달 닫기 핸들러
	 */
	handleClose: () => void;
	/**
	 * 모달 타입
	 */
	type: 'success' | 'modify';
	/**
	 * 커스텀 핸들러
	 */
	customHandleClose?: () => void;

	/**
	 * 선정 일자
	 */
	date: any;
}

interface IModalConfig {
	[key: string]: {
		/**
		 * 아이콘 타입
		 */
		type: 'success' | 'error';
		/**
		 * 본문 내용
		 */
		title: string;
		/**
		 * 버튼 텍스트
		 */
		content: string;
		/**
		 * 버튼 클릭 핸들러
		 */
		onclick: () => void;
		/**
		 * 취소 버튼 여부
		 */
		cancelButtonAvailable: boolean;

		/**
		 * 선정 일자
		 */
		date: any;
	};
}

const IrAlertModal = (props: IIrAlertModalProps) => {
	//* Modules
	const router = useRouter();
	//* States

	//* Constants
	/**
	 * 모달 설정
	 */
	const modalConfig: IModalConfig = {
		success: {
			type: 'success',
			title: '신청완료 되었습니다.',
			content: '확인',
			onclick: () => {
				props.handleClose();
				props.customHandleClose && props.customHandleClose();
			},
			cancelButtonAvailable: false,
			date: props.date,
		},
		modify: {
			type: 'success',
			title: '수정완료 되었습니다.',
			content: '확인',
			onclick: () => {
				props.handleClose();
				props.customHandleClose && props.customHandleClose();
			},
			cancelButtonAvailable: false,
			date: props.date,
		},
	};

	return (
		<SupportiModal
			open={props.open}
			handleClose={() => {
				props.handleClose();
			}}
			title=""
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
				{/* 아이콘 */}
				<Box
					width={'100%'}
					display={'flex'}
					alignItems={'center'}
					justifyContent={'center'}
					mb={'16px'}
				>
					{modalConfig[props.type]?.type === 'success' && (
						<img
							src={'/images/icons/icon_success.svg'}
							alt={'success'}
						/>
					)}
					{modalConfig[props.type]?.type === 'error' && (
						<img
							src={'/images/icons/icon_error.svg'}
							alt={'error'}
						/>
					)}
				</Box>
				{/* 본문 내용 */}
				<Typography variant={'h4'} fontWeight={'bold'} my={1}>
					{modalConfig[props.type]?.title}
				</Typography>

				<Box textAlign={'center'}>
					<Typography
						variant={'subtitle1'}
						fontWeight={500}
						my={1}
						color="secondary.dark"
					>
						신청해주셔서 감사합니다!
					</Typography>
					<Box display="flex">
						<Typography
							variant={'subtitle1'}
							fontWeight={600}
							my={1}
							color="primary.main"
						>
							{modalConfig[props.type]?.date?.split('T')[0]?.split('24-0')[1]?.replace('-', '/')}
							일 18:30
						</Typography>
						<Typography
							variant={'subtitle1'}
							fontWeight={500}
							my={1}
							color="secondary.dark"
						>
							까지 신청 결과를 알림톡으로 전달드리겠습니다.
						</Typography>
					</Box>
				</Box>
				{/* 버튼 */}
				<Box
					display={'flex'}
					alignItems={'center'}
					width={'100%'}
					gap={2}
				>
					{modalConfig[props.type]?.cancelButtonAvailable && (
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
						contents={modalConfig[props.type]?.content}
						isGradient={true}
						style={{
							color: '#fff',
							mt: 3,
							width: modalConfig[props.type]
								?.cancelButtonAvailable
								? '50%'
								: '100%',
						}}
						onClick={() => modalConfig[props.type]?.onclick()}
					/>
				</Box>
			</Box>
		</SupportiModal>
	);
};

export default IrAlertModal;
