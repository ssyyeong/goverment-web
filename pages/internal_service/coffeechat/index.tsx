import React, { useEffect } from 'react';

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
import CoffeeChatRecommendModal from '../../../src/views/local/internal_service/coffeechat/CoffeeChatRecommendModal/CoffeeChatRecommendModal';
import { CookieManager } from '@leanoncompany/supporti-utility';
import DefaultController from '@leanoncompany/supporti-ark-office-project/src/controller/default/DefaultController';
import CoffeeChatOpenEventModal from '../../../src/views/local/internal_service/coffeechat/CoffeeChatOpenEventModal/CoffeeChatOpenEventModal';

const Page: NextPage = () => {
	//* Modules
	const cookie = new CookieManager();
	//* Constants
	//* States
	/**
	 * 프로필 설정 모달
	 */
	const [profileModal, setProfileModal] = React.useState<boolean>(false);
	/**
	 * 트리거 키 설정
	 */
	const [triggerKey, setTriggerKey] = React.useState<string>('');
	/**
	 * 커피챗 추천 모달
	 */
	const [recommendModal, setRecommendModal] = React.useState<boolean>(false);
	//* Functions
	//* Controller
	const coffeeChatProfileController = new DefaultController(
		'CoffeeChatProfile'
	);
	/**
	 * 오픈 이벤트 모달
	 */
	const [openEventModal, setOpenEventModal] = React.useState<boolean>(false);
	//* Hooks
	/**
	 * 페이지 진입 시 유저 권한 검사 (구독검사)
	 */
	// const isSubscription = useUserAccess('SUBSCRIPTION');

	/**
	 * 알러트
	 */
	const { open, setOpen, setType, type } = useAlert({});

	/**
	 * 커피챗 추천 모달
	 */
	useEffect(() => {
		if (cookie.getItemInCookies('COFFEE_CHAT_EVENT_MODAL')) {
			setOpenEventModal(false);
		}

		coffeeChatProfileController.getOneItemByKey(
			{
				IS_RECOMMENDED: 'Y',
			},
			(res) => {
				if (res.data.result === null) {
				} else {
					if (
						!cookie.getItemInCookies('COFFEE_CHAT_RECOMMEND_MODAL')
					) {
						setRecommendModal(true);
					}
				}
			}
		);
	}, []);

	return (
		// <InternalServiceDrawer type="dashboard">
		<>
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
								// if (isSubscription.access === true) {
								setProfileModal(true);
								// } else {
								// 	setOpen(true);
								// 	setType('subscribe');
								// }
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
						<Box
							sx={{
								cursor: 'pointer',
							}}
							alignItems={'center'}
							gap={0.5}
							ml={1}
							display={'flex'}
							onClick={() => {
								// if (isSubscription.access === true) {
								window.open(
									'https://jober.io/wall-write-document/cc935fd9-a388-4ff3-a9c5-a45dab221db0'
								);
								// } else {
								// 	setOpen(true);
								// 	setType('subscribe');
								// }
							}}
						>
							<Typography fontWeight={'600'}>
								/ 매칭 서비스 이용하기
							</Typography>
						</Box>
					</Box>
					{/* 스페셜 커피챗 */}
					<SpecialCoffeeChat />
					{/* 일반 커피챗 */}
					<GeneralCoffeeChat triggerKey={triggerKey} />
				</InternalServiceLayout>
			</Box>
			{/* 커피챗 프로필 설정 모달 */}
			<CoffeeChatProfileModal
				open={profileModal}
				handleClose={() => setProfileModal(false)}
				setTriggerKey={setTriggerKey}
			/>
			{/* 커피챗 추천 모달 */}
			<CoffeeChatRecommendModal
				open={recommendModal}
				handleClose={() => setRecommendModal(false)}
			/>
			{/* 알림창 */}
			<SupportiAlertModal
				open={open}
				handleClose={() => setOpen(false)}
				type={type}
			/>
			{/* 오픈 이벤트 */}
			<CoffeeChatOpenEventModal
				open={openEventModal}
				handleClose={() => setOpenEventModal(false)}
				alertSetOpen={setOpen}
				alertSetType={setType}
				// subscription={isSubscription.access}
			/>

			{/* </InternalServiceDrawer> */}
		</>
	);
};

export default Page;
