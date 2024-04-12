import React from 'react';

import { Box, BoxProps, Typography } from '@mui/material';
import { CookieManager } from '@leanoncompany/supporti-utility';
import DefaultController from '@leanoncompany/supporti-ark-office-project/src/controller/default/DefaultController';
import SupportiModal from '../../../../global/SupportiModal';
import Image from 'next/image';
import SupportiButton from '../../../../global/SupportiButton';
import { useRouter } from 'next/router';
import useAlert from '../../../../../hooks/useAlert/useAlert';

interface ICoffeeChatOpenEventModalProps {
	open: boolean;
	handleClose: () => void;
	alertSetType?: any;
	alertSetOpen?: any;
	subscription?: boolean;
}

const CoffeeChatOpenEventModal = (props: ICoffeeChatOpenEventModalProps) => {
	const cookie = new CookieManager();
	/**
	 * 오늘 하루 보지 않기
	 */
	const closeToday = () => {
		cookie.setItemInCookies('COFFEE_CHAT_EVENT_MODAL', true, {
			path: '/',
			maxAge: 3600 * 24,
		});
		props.handleClose();
	};

	return (
		<SupportiModal
			open={props.open}
			handleClose={closeToday}
			activeHeader={false}
			style={{
				minWidth: 350,
				width: 400,
			}}
		>
			<Box
				width={'100%'}
				display={'flex'}
				flexDirection={'column'}
				alignItems={'center'}
				justifyContent={'center'}
			>
				<Typography fontWeight={'800'} variant="h4">
					서포티 커피챗 오픈 서비스
				</Typography>
				<Box
					width={'100%'}
					display={'flex'}
					flexDirection={'column'}
					gap={2}
					my={4}
				>
					<Typography
						lineHeight={1.2}
						fontWeight={'500'}
						variant="subtitle1"
						sx={{
							wordBreak: 'keep-all',
						}}
					>
						안녕하세요, 서포티 입니다! <br />
						<br />
						커피챗 서비스를 처음 접하신 분들을 위해 직접 최적의
						상대와 매칭하여, 소중한 만남을 즐길수 있도록 하는 오픈
						이벤트를 준비했습니다.
					</Typography>
					<Typography
						lineHeight={1.2}
						fontWeight={'500'}
						variant="subtitle1"
					>
						서비스를 위해 정보가 필요하니,아래버튼을 클릭하여
						참여신청 해주세요!
					</Typography>
				</Box>
				<Image
					src="/images/main/coffeechatEvent.png"
					alt="coffeechat_open_event_modal"
					width={300}
					height={300}
				/>
				<SupportiButton
					variant="contained"
					isGradient
					fullWidth
					contents={'참여 신청'}
					onClick={() => {
						// if (props.subscription === true) {
						window.open(
							'https://jober.io/wall-write-document/cc935fd9-a388-4ff3-a9c5-a45dab221db0'
						);
						closeToday();
						props.handleClose();
						// } else {
						// 	props.alertSetOpen(true);
						// 	props.alertSetType('subscribe');
						// }
					}}
					style={{
						width: '80%',
						mt: 3,
					}}
				/>
			</Box>
		</SupportiModal>
	);
};

export default CoffeeChatOpenEventModal;
