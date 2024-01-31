import React from 'react';

import { Box, BoxProps, Typography } from '@mui/material';
import { useAppMember } from '../../../../../hooks/useAppMember';
import SupportiModal from '../../../../global/SupportiModal';
import SupportiInput from '../../../../global/SupportiInput';
import SupportiButton from '../../../../global/SupportiButton';
import DefaultController from '@leanoncompany/supporti-ark-office-project/src/controller/default/DefaultController';

interface ICoffeeChatApplyGeneralModalProps {
	open: boolean;
	handleClose: () => void;
}

const CoffeeChatApplyGeneralModal = (
	props: ICoffeeChatApplyGeneralModalProps
) => {
	//* States
	const [applyReason, setApplyReason] = React.useState<string>('');
	//* Hooks
	/**
	 * 유저 아이디 가져오는 훅
	 */
	const { memberId } = useAppMember();

	//* Controller
	const coffeeChatApplicationController = new DefaultController(
		'CoffeeChatApplication'
	);
	//* Functions
	/**
	 * 커피챗 신청
	 */
	const applyCoffeeChat = () => {
		if (applyReason === '') {
			alert('신청사유를 입력해주세요!');
			return;
		}
		coffeeChatApplicationController.createItem(
			{
				APP_MEMBER_IDENTIFICATION_CODE: memberId,
				DESCRIPTION: applyReason,
			},
			(res) => {
				props.handleClose();
			}
		);
	};

	return (
		<SupportiModal
			open={props.open}
			handleClose={props.handleClose}
			activeHeader={true}
			title="커피챗 신청"
			style={{
				minWidth: '375px',
			}}
		>
			<Box
				px={2}
				width={'100%'}
				sx={{ overflowY: 'auto' }}
				maxHeight={'500px'}
				display={'flex'}
				flexDirection={'column'}
				gap={2}
			>
				<Typography variant="h6" fontWeight="700">
					커피챗을 신청하시겠습니까?
				</Typography>
				<Typography variant="body1">
					커피챗 신청을 위해 아래 내용을 작성해주세요.
				</Typography>
				<Typography variant="body1" fontWeight="600">
					Q. 이 커피챗을 신청하게 된 이유는 무엇인가요?
				</Typography>
				<SupportiInput
					value={applyReason}
					setValue={setApplyReason}
					type="input"
					additionalProps={{
						multiline: true,
						rows: 5,
						placeholder:
							'커피챗을 신청하게 된 이유를 작성해주세요!',
					}}
				/>
				<SupportiButton
					contents={'신청하기'}
					fullWidth={true}
					variant="contained"
					onClick={() => applyCoffeeChat()}
				/>
			</Box>
		</SupportiModal>
	);
};

export default CoffeeChatApplyGeneralModal;
