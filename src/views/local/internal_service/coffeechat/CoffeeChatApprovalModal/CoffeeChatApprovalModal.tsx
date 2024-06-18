import React, { useEffect, useState } from 'react';

import { Box, BoxProps, Typography } from '@mui/material';
import SupportiModal from '../../../../global/SupportiModal';
import SupportiInput from '../../../../global/SupportiInput';
import SupportiButton from '../../../../global/SupportiButton';
import DefaultController from '@leanoncompany/supporti-ark-office-project/src/controller/default/DefaultController';

interface ICoffeeChatApprovalModalProps {
	open: boolean;
	handleClose: () => void;
	customHandleClose?: () => void;
	coffeeChatApplyData?: any;
}

const CoffeeChatApprovalModal = (props: ICoffeeChatApprovalModalProps) => {
	//* States
	const [coffeeChatApplyData, setCoffeeChatApplyData] = useState<any>(null);

	//* Controller
	const coffeeChatApplicationController = new DefaultController(
		'CoffeeChatApplication'
	);
	//* Functions
	/**
	 * 커피챗 수락
	 */
	const approveCoffeeChat = () => {
		if (
			coffeeChatApplyData.COFFEE_CHAT_DATE === null ||
			coffeeChatApplyData.COFFEE_CHAT_LINK === null ||
			coffeeChatApplyData.CONTACT === null
		) {
			alert('모든 정보를 입력해주세요!');
			return;
		}
		coffeeChatApplicationController.updateItem(
			{
				COFFEE_CHAT_APPLICATION_IDENTIFICATION_CODE:
					coffeeChatApplyData.COFFEE_CHAT_APPLICATION_IDENTIFICATION_CODE,
				CONFIRMED_YN: 'Y',
				COFFEE_CHAT_DATE: coffeeChatApplyData.COFFEE_CHAT_DATE,
				COFFEE_CHAT_LINK: coffeeChatApplyData.COFFEE_CHAT_LINK,
				CONTACT: coffeeChatApplyData.CONTACT,
			},
			(res) => {
				setCoffeeChatApplyData(null);
				props.handleClose();
				props.customHandleClose();
			}
		);
	};

	//* Hooks
	useEffect(() => {
		setCoffeeChatApplyData(props.coffeeChatApplyData);
	}, [props.coffeeChatApplyData]);

	return (
		<SupportiModal
			open={props.open}
			handleClose={props.handleClose}
			activeHeader={true}
			title="커피챗 수락"
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
				gap={1}
			>
				<Typography variant="h6" fontWeight="700">
					커피챗을 수락하시겠습니까?
				</Typography>
				<Typography variant="body1" py={1}>
					커피챗을 위해 아래 내용을 작성해주세요!
				</Typography>
				<Typography variant="body1" fontWeight="600">
					커피챗 일시
				</Typography>
				<SupportiInput
					value={coffeeChatApplyData?.COFFEE_CHAT_DATE}
					setValue={(value) =>
						setCoffeeChatApplyData({
							...coffeeChatApplyData,
							COFFEE_CHAT_DATE: value,
						})
					}
					type="datetimepicker"
				/>
				<Typography variant="body1" fontWeight="600">
					커피챗 링크
				</Typography>
				<SupportiInput
					value={coffeeChatApplyData?.COFFEE_CHAT_LINK}
					setValue={(value) =>
						setCoffeeChatApplyData({
							...coffeeChatApplyData,
							COFFEE_CHAT_LINK: value,
						})
					}
					additionalProps={{
						placeholder: 'Zoom, Google Meet 등',
					}}
					type="input"
				/>
				<Typography variant="body1" fontWeight="600">
					연락가능한 연락처
				</Typography>
				<Typography
					variant="body2"
					fontWeight="600"
					color={'secondary'}
					lineHeight={1.4}
				>
					일정 변경 혹은 문제상황 발생시 사용될 예정입니다. 메일,
					휴대폰번호, 오픈카톡방 등의 연락이 가능한 연락처를
					입력해주세요!
				</Typography>
				<SupportiInput
					value={coffeeChatApplyData?.CONTACT}
					setValue={(value) =>
						setCoffeeChatApplyData({
							...coffeeChatApplyData,
							CONTACT: value,
						})
					}
					type="input"
					additionalProps={{
						placeholder: '연락처를 입력해주세요!',
					}}
				/>
				<SupportiButton
					contents={'신청하기'}
					fullWidth={true}
					variant="contained"
					onClick={() => approveCoffeeChat()}
				/>
			</Box>
		</SupportiModal>
	);
};

export default CoffeeChatApprovalModal;
