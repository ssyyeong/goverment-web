import React from 'react';

import { NextPage } from 'next';

import { Box, BoxProps, Typography } from '@mui/material';
import InternalServiceDrawer from '../../../src/views/local/internal_service/common/InternalServiceDrawer';
import { InternalServiceLayout } from '../../../src/views/layout/InternalServiceLayout';
import { useUserAccess } from '../../../src/hooks/useUserAccess';
import Image from 'next/image';
import SpecialCoffeeChat from '../../../src/views/local/internal_service/coffeechat/SpecialCoffeeChat/SpecialCoffeeChat';
import GeneralCoffeeChat from '../../../src/views/local/internal_service/coffeechat/GeneralCoffeeChat/GeneralCoffeeChat';
import CoffeeChatProfileModal from '../../../src/views/local/internal_service/coffeechat/CoffeeChatProfileModal/CoffeeChatProfileModal';
import useAlert from '../../../src/hooks/useAlert/useAlert';
import { SupportiAlertModal } from '../../../src/views/global/SupportiAlertModal';

const Page: NextPage = () => {
	//* Modules
	//* Constants
	//* States
	/**
	 * 프로필 설정 모달
	 */
	const [profileModal, setProfileModal] = React.useState<boolean>(false);
	//* Functions
	//* Hooks
	/**
	 * 페이지 진입 시 유저 권한 검사 (구독검사)
	 */
	const isSubscription = useUserAccess('SUBSCRIPTION');

	/**
	 * 알러트
	 */
	const { open, setOpen, setType, type } = useAlert({});
	return (
		<InternalServiceDrawer type="dashboard">
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					width: '100%',
					p: { xs: 2, md: 10 },
				}}
			>
				{/* 컨텐츠 레이아웃 */}

				<InternalServiceLayout
					title="CoffeeChat"
					subTitle="나와 비슷한 고충을 겪고 있거나 이미 극복하신 다른 대표님들과의 커피챗을 통해 비즈니스 운영에서의
            페인 포인트를 없애보세요!"
					image="/images/main/coffeechat.png"
					mobileImage="/images/main/coffeechatMobile.png"
				>
					{/* 프로필설정 */}
					<Box
						display={'flex'}
						justifyContent={'flex-end'}
						width={'100%'}
						alignItems={'center'}
					>
						<Box
							sx={{
								cursor: 'pointer',
							}}
							alignItems={'center'}
							gap={0.5}
							display={'flex'}
							onClick={() => {
								if (isSubscription.access === true) {
									setProfileModal(true);
								} else {
									setOpen(true);
									setType('subscribe');
								}
							}}
						>
							<Image
								src="/images/icons/coffeeico.png"
								alt="coffeeico"
								width={18}
								height={18}
							/>
							<Typography fontWeight={'600'}>
								내 커피챗 프로필 설정하기
							</Typography>
						</Box>
					</Box>
					{/* 스페셜 커피챗 */}
					<SpecialCoffeeChat />
					{/* 일반 커피챗 */}
					<GeneralCoffeeChat />
				</InternalServiceLayout>
			</Box>
			<CoffeeChatProfileModal
				open={profileModal}
				handleClose={() => setProfileModal(false)}
			/>
			{/* 알림창 */}
			<SupportiAlertModal
				open={open}
				handleClose={() => setOpen(false)}
				type={type}
			/>
		</InternalServiceDrawer>
	);
};

export default Page;
