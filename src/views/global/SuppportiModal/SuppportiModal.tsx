import React from 'react';

import {
	Box,
	BoxProps,
	Modal,
	Typography,
	TypographyProps,
} from '@mui/material';
import SupportiButton from '../SupportiButton';

interface ISupportiModalBtnProps {
	btnContents?: any;
	btnOnClick?: () => void;
	btnIsGradient?: boolean;
	btnWidth?: string;
}
export interface ISuppportiModalProps extends ISupportiModalBtnProps {
	open: boolean;
	handleClose: () => void;
	children: React.ReactNode;
	style?: BoxProps;
	title?: string;
	titleStyle?: TypographyProps;
	disableClose?: boolean;
	activeHeader?: boolean;
	customBtn?: React.ReactNode;
}

const SuppportiModal = (props: ISuppportiModalProps) => {
	const style = {
		position: 'absolute' as 'absolute',
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)',
		boxShadow: 24,
		bgcolor: 'white',
		borderRadius: '10px',
	};

	return (
		<Modal
			open={props.open}
			onClose={props.disableClose ? undefined : props.handleClose}
		>
			<Box sx={{ ...style, ...props.style }}>
				{/* 헤더 */}
				<Box
					display={'flex'}
					justifyContent={'space-between'}
					width={'100%'}
					alignItems={'center'}
					bgcolor={props.activeHeader ? 'black' : 'transparent'}
					borderRadius={'10px 10px 0px 0px'}
					p={'20px'}
				>
					<Box width={'20%'}></Box>
					{props.title && (
						<Box
							width={'60%'}
							display={'flex'}
							justifyContent={'center'}
						>
							<Typography
								sx={{ ...props.titleStyle }}
								color={props.activeHeader ? 'white' : 'black'}
								variant="h5"
								fontWeight={'600'}
								lineHeight={1}
							>
								{props.title}
							</Typography>
						</Box>
					)}
					<Box width={'20%'} display={'flex'} justifyContent={'end'}>
						{props.disableClose ? null : (
							<Typography
								sx={{ cursor: 'pointer' }}
								onClick={props.handleClose}
								fontWeight={'300'}
								color={props.activeHeader ? 'white' : 'black'}
							>
								X
							</Typography>
						)}
					</Box>
				</Box>
				{/* 내용 */}
				<Box
					p={'30px'}
					display={'flex'}
					flexDirection={'column'}
					justifyContent={'center'}
					alignItems={'center'}
				>
					{props.children}
					{/* 버튼 */}
					{props.customBtn ? (
						props.customBtn
					) : (
						<SupportiButton
							contents={props.btnContents || '확인'}
							onClick={() => {
								props.btnOnClick
									? props.btnOnClick()
									: props.handleClose();
							}}
							isGradient={props.btnIsGradient}
							variant="contained"
							style={{
								width: props.btnWidth || '100%',
							}}
						/>
					)}
				</Box>
			</Box>
		</Modal>
	);
};

export default SuppportiModal;
