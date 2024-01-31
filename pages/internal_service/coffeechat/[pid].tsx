import React, { useEffect } from 'react';

import { NextPage } from 'next';

import { Avatar, Box, BoxProps, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import InternalServiceDrawer from '../../../src/views/local/internal_service/common/InternalServiceDrawer';
import { ICoffeeChatProfile } from '../../../src/@types/model';
import CoffeeChatProfileModal from '../../../src/views/local/internal_service/coffeechat/CoffeeChatProfileModal/CoffeeChatProfileModal';
import SupportiButton from '../../../src/views/global/SupportiButton';
import { useUserAccess } from '../../../src/hooks/useUserAccess';
import useAlert from '../../../src/hooks/useAlert/useAlert';
import { SupportiAlertModal } from '../../../src/views/global/SupportiAlertModal';
import CoffeeChatApplyGeneralModal from '../../../src/views/local/internal_service/coffeechat/CoffeeChatApplyGeneralModal/CoffeeChatApplyGeneralModal';

const Page: NextPage = () => {
	//* Modules
	const { pid, special } = useRouter().query;
	//* Constants

	//* States
	/**
	 * 프로필
	 */
	const [coffeeChatProfile, setCoffeeChatProfile] =
		React.useState<ICoffeeChatProfile>({
			COMPANY_NAME: '회사명',
			PROFILE_IMAGE: '/images/main/coffeechat.png',
			INTRODUCE: '자기소개',
			CAREER: ['경력', '경력1'],
			MAIN_FIELD: ['경력', '경력1'],
			INTEREST_FIELD: ['경력', '경력1'],
			ROLE: '역할',
			DESCRIPTION: '설명',
			OFFER_YN: 'Y',
			SUBJECT: ['경력', '경력1'],
			PRICE: 10000,
			AppMember: {
				FULL_NAME: '이름',
			},
			PartnerMember: {
				FULL_NAME: '스페셜이름',
			},
		} as ICoffeeChatProfile);
	/**
	 * 일반 커피챗 신청 모달
	 */
	const [generalModal, setGeneralModal] = React.useState<boolean>(false);
	/**
	 * 스페셜 커피챗 신청 모달
	 */
	const [specialModal, setSpecialModal] = React.useState<boolean>(false);
	//* Functions
	/**
	 * 커피챗 신청하기 클릭시
	 */
	const handleCoffeeChatApply = () => {
		if (isSubscription.access !== true) {
			setOpen(true);
			setType('subscribe');
			return;
		}
		if (isCoffeeChatProfile.access !== true) {
			setOpen(true);
			setType('coffeechatprofilemissing');
			return;
		}

		if (special) {
			// 스페셜 커피챗 신청
			setSpecialModal(true);
		} else {
			// 일반 커피챗 신청
			setGeneralModal(true);
		}
	};
	//* Hooks
	/**
	 * 페이지 진입 시 유저 권한 검사 (구독검사)
	 */
	const isSubscription = useUserAccess('SUBSCRIPTION');
	/**
	 * 유저 커피챗 프로필 검사
	 */
	const isCoffeeChatProfile = useUserAccess('COFFEE_CHAT');
	/**
	 * 알러트
	 */
	const { open, setOpen, setType, type } = useAlert({});

	/**
	 * 유저 커피챗 프로필 조회
	 */
	useEffect(() => {
		console.log(pid, special);
		if (special) {
		} else {
		}
	}, [pid, special]);
	return (
		<InternalServiceDrawer type="dashboard">
			<Box
				width={'100%'}
				p={{ xs: 2, md: 10 }}
				bgcolor={'white'}
				display={'flex'}
				flexDirection={'column'}
			>
				{/* 헤더 */}
				<Box
					sx={{
						width: '100%',
						height: 200,
						background:
							'linear-gradient(269deg, #FFA3A3 0%, #305DDC 100%)',
						borderRadius: 2,
						p: 2,
						position: 'relative',
					}}
				>
					{/* 주요 분야 */}
					<Box
						display={'flex'}
						width={'100%'}
						justifyContent={'flex-end'}
						gap={1}
					>
						{coffeeChatProfile.MAIN_FIELD?.map((item, index) => {
							return (
								<Box
									key={index}
									sx={{
										display: 'flex',
										alignItems: 'center',
										gap: 1,
										border: '0.5px solid #6D6D6D',
										bgcolor: '#FFFFFF',
										borderRadius: 4,
										px: 1.5,
										py: 1,
									}}
								>
									<Typography
										variant="body2"
										color={'#6D6D6D'}
									>
										{item}
									</Typography>
								</Box>
							);
						})}
					</Box>
					{/* 프로필 */}
					<Box
						width={133}
						height={133}
						bgcolor={'white'}
						borderRadius={'50%'}
						position={'absolute'}
						right={40}
						bottom={-65}
						display={'flex'}
						justifyContent={'center'}
						alignItems={'center'}
					>
						<Avatar
							src={coffeeChatProfile.PROFILE_IMAGE}
							sx={{
								width: 125,
								height: 125,
							}}
						/>
					</Box>
				</Box>
				{/* 내용 */}
				<Box
					p={5}
					bgcolor={'white'}
					display={'flex'}
					flexDirection={'column'}
				>
					<Typography
						variant={'h4'}
						fontWeight={'bold'}
						mb={2}
						display={'flex'}
						alignItems={'baseline'}
						gap={0.5}
					>
						{special
							? coffeeChatProfile?.PartnerMember?.FULL_NAME
							: coffeeChatProfile?.AppMember?.FULL_NAME}
						<Typography>{coffeeChatProfile.ROLE}</Typography>
					</Typography>

					<Typography
						mb={4}
						color={'#949494'}
						fontWeight={'600'}
						variant="subtitle2"
					>
						{coffeeChatProfile.COMPANY_NAME}
					</Typography>
					{/* 관심 분야 */}
					<Typography
						variant="subtitle2"
						color={'primary'}
						fontWeight={'700'}
					>
						관심 분야
					</Typography>
					{/* 관심 분야 리스트 */}
					<Box display={'flex'} flexWrap={'wrap'} gap={1} my={3}>
						{coffeeChatProfile.INTEREST_FIELD?.map(
							(item, index) => {
								return (
									<Typography>
										{item}
										<Typography
											display={
												index ===
												coffeeChatProfile.INTEREST_FIELD
													?.length -
													1
													? 'none'
													: 'inline'
											}
										>
											{' '}
											,
										</Typography>
									</Typography>
								);
							}
						)}
					</Box>
					{/* 경력 */}
					<Typography
						variant="subtitle2"
						color={'primary'}
						fontWeight={'700'}
					>
						경력
					</Typography>
					{/* 경력 리스트 */}
					<Box
						my={3}
						display={'flex'}
						flexDirection={'column'}
						gap={1}
					>
						{coffeeChatProfile.CAREER?.map((career) => (
							<Typography lineHeight={1.4}>
								&#8226; {career}
							</Typography>
						))}
					</Box>
					{/* 소개 */}
					<Typography
						variant="subtitle2"
						color={'primary'}
						fontWeight={'700'}
					>
						소개
					</Typography>
					<Box my={3}>
						<Typography variant="h6" fontWeight="bold" mb={1}>
							{coffeeChatProfile.INTRODUCE}
						</Typography>
						<Typography lineHeight={1.4}>
							{coffeeChatProfile.DESCRIPTION}
						</Typography>
					</Box>
					{/* 제안 주제 */}
					{coffeeChatProfile.SUBJECT?.length !== 0 && (
						<Box>
							<Typography
								variant="subtitle2"
								color={'primary'}
								fontWeight={'700'}
							>
								제안 주제
							</Typography>
							{/* 제안 주제 리스트 */}
							<Box
								my={3}
								display={'flex'}
								flexDirection={'column'}
								gap={1}
							>
								{coffeeChatProfile.SUBJECT?.map((subject) => (
									<Typography lineHeight={1.4}>
										&#8226; {subject}
									</Typography>
								))}
							</Box>
						</Box>
					)}
					{/* 가격 */}
					{special && (
						<Box>
							<Typography
								variant="subtitle2"
								color={'primary'}
								fontWeight={'700'}
							>
								가격
							</Typography>
							<Typography fontWeight="bold" my={3}>
								{coffeeChatProfile.PRICE?.toLocaleString()}
								포인트
							</Typography>
						</Box>
					)}
				</Box>
				{/* 커피챗 신청 버튼 */}
				{coffeeChatProfile.OFFER_YN === 'Y' && (
					<Box
						width={'100%'}
						display={'flex'}
						justifyContent={'center'}
						alignItems={'center'}
					>
						<SupportiButton
							variant="contained"
							isGradient={true}
							contents={'커피챗 신청하기'}
							onClick={() => {
								handleCoffeeChatApply();
							}}
							style={{ width: 400 }}
						/>
					</Box>
				)}
			</Box>
			{/* 커피챗 신청 모달 */}
			<CoffeeChatApplyGeneralModal
				open={generalModal}
				handleClose={() => setGeneralModal(false)}
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
