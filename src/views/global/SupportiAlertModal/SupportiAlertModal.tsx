import React from 'react';

import { Box, BoxProps, Typography } from '@mui/material';
import SuppportiModal, {
	ISuppportiModalProps,
} from '../SuppportiModal/SuppportiModal';
import SupportiButton from '../SupportiButton';

interface ISupportiAlertModalProps extends ISuppportiModalProps {
	type: 'success' | 'error' | 'warning' | 'info';
	alertContents: string;
}

const SupportiAlertModal = (props: ISupportiAlertModalProps) => {
	return (
		<SuppportiModal {...props}>
			<Box
				display={'flex'}
				flexDirection={'column'}
				alignItems={'center'}
				justifyContent={'center'}
				width={'100%'}
				height={'100%'}
			>
				<Box
					width={'100%'}
					display={'flex'}
					alignItems={'center'}
					justifyContent={'center'}
					mb={'16px'}
				>
					{props.type === 'success' && (
						<img
							src={'/images/icons/icon_success.svg'}
							alt={'success'}
						/>
					)}
					{props.type === 'error' && (
						<img
							src={'/images/icons/icon_error.svg'}
							alt={'error'}
						/>
					)}
					{props.type === 'warning' && (
						<img
							src={'/images/icons/icon_warning.svg'}
							alt={'warning'}
						/>
					)}
					{props.type === 'info' && (
						<img src={'/images/icons/icon_info.svg'} alt={'info'} />
					)}
				</Box>
				<Typography variant="h5" fontWeight={'bold'}>
					{props.alertContents}
				</Typography>
				<SupportiButton
					contents={'확인'}
					style={{ marginTop: '16px' }}
					onClick={() => {}}
				/>
			</Box>
		</SuppportiModal>
	);
};

export default SupportiAlertModal;
