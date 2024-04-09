import React, { useEffect } from 'react';

import { Box, BoxProps, Divider, Typography } from '@mui/material';
import SupportiModal from '../../../global/SupportiModal';

interface IPopUpModalProps {
	modalOpen: boolean;
	setModalOpen: React.Dispatch<boolean>;
	uiData?: any;
}

const PopUpModal = (props: IPopUpModalProps) => {
	//* Controllers

	return (
		<Box>
			<SupportiModal
				open={props.modalOpen}
				handleClose={() => {
					props.setModalOpen(false);
				}}
				activeHeader={false}
				title={''}
				style={{
					width: { xs: '100%', md: '500px' },
					// padding: { xs: '10px', md: '0' },
				}}
				children={
					<Box
						display={'flex'}
						flexDirection={'column'}
						gap={2}
						maxHeight={'70vh'}
						minHeight={'60vh'}
						overflow={'auto'}
						sx={{
							width: '100%',
							'-ms-overflow-style': 'none',
							'&::-webkit-scrollbar': {
								width: '6px',
								height: '5px !important',
								backgroundColor: 'white !important',
								padding: '1px',
								borderRadius: '20px',
							},
							'&::-webkit-scrollbar-thumb': {
								backgroundColor: '#b0b5c2',
								borderRadius: '20px',
							},
							pt: 2,
							pr: 1,
						}}
					>
						{/** 상위 목표 작성 */}
						<Box display={'flex'} flexDirection={'column'} gap={1}>
							{props.uiData}
						</Box>
					</Box>
				}
			/>
		</Box>
	);
};

export default PopUpModal;
