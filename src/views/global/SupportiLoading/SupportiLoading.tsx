import React from 'react';

import { Box, BoxProps, Modal } from '@mui/material';

interface ISupportiLoadingProps {
	/**
	 * 모달 열림 여부
	 */
	open: boolean;

	/**
	 * 모달 닫기 함수
	 */
	handleClose?: () => void;
}

const SupportiLoading = (props: ISupportiLoadingProps) => {
	/**
	 * 기본 스타일
	 */
	const defaultStyle = {
		position: 'absolute' as 'absolute',
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)',
		boxShadow: 24,
		bgcolor: 'transparent',

		width: '100%',
		height: '100%',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
	};

	return (
		<Modal open={props.open} onClose={props.handleClose}>
			<Box sx={{ ...defaultStyle }}>
				<img src="/images/icons/loading.svg" alt="" />
			</Box>
		</Modal>
	);
};

export default SupportiLoading;
