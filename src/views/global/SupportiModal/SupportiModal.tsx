import React from 'react';

import { Box, BoxProps, Grid, Modal, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

export interface ISupportiModalProps {
	/**
	 * 모달 열림 여부
	 */
	open: boolean;

	/**
	 * 모달 닫기 함수
	 */
	handleClose?: () => void;

	/**
	 * 모달 내용
	 */
	children: React.ReactNode;

	/**
	 * 모달 추가 스타일
	 */
	style?: BoxProps;

	/**
	 * 뮤이 모달 Props
	 */
	muiModalProps?: any;

	/**
	 * 모달 제목
	 */
	title?: string;

	/**
	 * 모달 헤더 색상 반전
	 */
	activeHeader?: boolean;

	/**
	 * 모달 열기 버튼
	 */
	modalButtonElement?: React.ReactNode;
}

const SupportiModal = (props: ISupportiModalProps) => {
	//* Constants
	/**
	 * 기본 스타일
	 */
	const defaultStyle = {
		position: 'absolute' as 'absolute',
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)',
		boxShadow: 24,
		bgcolor: 'white',
		borderRadius: '10px',
	};

	return (
		<React.Fragment>
			{/* 모달 열기 버튼 */}
			<Box width={'100%'} height={'100%'}>
				{props.modalButtonElement}
			</Box>

			{/* 모달 */}
			<Modal
				{...props.muiModalProps}
				open={props.open}
				onClose={props.handleClose}
			>
				<Box sx={{ ...defaultStyle, ...props.style }}>
					{/* 헤더 */}
					<Box
						display={'flex'}
						justifyContent={'space-between'}
						width={'100%'}
						alignItems={'center'}
						bgcolor={props.activeHeader ? 'black' : 'transparent'}
						borderRadius={'10px 10px 0px 0px'}
						p={props.activeHeader ? '20px' : '0px'}
					>
						<Grid container alignItems={'center'}>
							<Grid item xs={1}></Grid>
							<Grid item xs={10} textAlign={'center'}>
								<Typography
									color={
										props.activeHeader ? 'white' : 'black'
									}
									variant="h5"
									fontWeight={'600'}
									lineHeight={1}
								>
									{props.title}
								</Typography>
							</Grid>
							<Grid item xs={1} justifyContent={'end'}>
								{props.handleClose &&
									(props.activeHeader || props.title == '' ? (
										<img
											src="/images/icons/whiteX.svg"
											alt="cancel"
											style={{ cursor: 'pointer' }}
											onClick={props.handleClose}
										/>
									) : // <CloseIcon
									// 	sx={{ cursor: 'pointer' }}
									// 	onClick={props.handleClose}
									// />
									null)}
							</Grid>
						</Grid>
					</Box>

					{/* 내용 */}
					<Box
						sx={{ p: { sm: '30px', xs: '20px' } }}
						display={'flex'}
						flexDirection={'column'}
						justifyContent={'center'}
						alignItems={'center'}
					>
						{props.children}
					</Box>
				</Box>
			</Modal>
		</React.Fragment>
	);
};

export default SupportiModal;
