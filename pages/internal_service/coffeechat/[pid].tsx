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
import DefaultController from '@leanoncompany/supporti-ark-office-project/src/controller/default/DefaultController';
import { CoffeeChatApplicationController } from '../../../src/controller/CoffeeChatApplicationController';
import { useAppMember } from '../../../src/hooks/useAppMember';
import SpecialCoffeeChatApplyModal from '../../../src/views/local/internal_service/coffeechat/SpecialCoffeeChatApplyModal/SpecialCoffeeChatApplyModal';
import { SpecialCoffeeChatApplicationController } from '../../../src/controller/SpecialCoffeeChatApplicationController';

const Page: NextPage = () => {
	//* Modules
	const { pid, special } = useRouter().query;
	//* Constants
	//* Controller
	const coffeeChatProfileController = new DefaultController(
		'coffeeChatProfile'
	);
	const coffeeChatApplicationController =
		new CoffeeChatApplicationController();
	const specialCoffeeChatApplicationController =
		new SpecialCoffeeChatApplicationController();
	const specialCoffeeChatProductController = new DefaultController(
		'SpecialCoffeeChatProduct'
	);

	//* States
	/**
	 * 프로필
	 */
	const [coffeeChatProfile, setCoffeeChatProfile] =
		React.useState<ICoffeeChatProfile>({} as ICoffeeChatProfile);
	/**
	 * 일반 커피챗 신청 모달
	 */
	const [generalModal, setGeneralModal] = React.useState<boolean>(false);
	/**
	 * 스페셜 커피챗 신청 모달
	 */
	const [specialModal, setSpecialModal] = React.useState<boolean>(false);

	//* Hooks
	/**
	 * 페이지 진입 시 유저 권한 검사 (구독검사)
	 */
	// const { access } = useUserAccess('SUBSCRIPTION');

	/**
	 * 유저 아이디
	 */
	const { memberId } = useAppMember();
	/**
	 * 알러트
	 */
	const { open, setOpen, setType, type } = useAlert({});

	/**
	 * 유저 커피챗 프로필 조회
	 */
	useEffect(() => {
		if (pid !== undefined) {
			if (special == 'true') {
				specialCoffeeChatProductController.getOneItemByKey(
					{
						SPECIAL_COFFEE_CHAT_PRODUCT_IDENTIFICATION_CODE: pid,
					},
					(res) => {
						const data = res.data.result;

						if (data == null) {
							alert('잘못된 접근입니다.');
							return;
						}
						data.PROFILE_IMAGE = JSON.parse(data.PROFILE_IMAGE)[0];
						data.CAREER = JSON.parse(data.CAREER);
						data.MAIN_FIELD = JSON.parse(data.MAIN_FIELD);
						data.INTEREST_FIELD = JSON.parse(data.INTEREST_FIELD);
						data.SUBJECT = JSON.parse(data.SUBJECT);
						setCoffeeChatProfile(data);
					},
					(err) => {
						console.log(err);
					}
				);
			} else {
				coffeeChatProfileController.getOneItemByKey(
					{
						APP_MEMBER_IDENTIFICATION_CODE: pid,
					},
					(res) => {
						const data = res.data.result;
						if (data == null) {
							alert('잘못된 접근입니다.');
							return;
						}
						data.CAREER = JSON.parse(data.CAREER);
						data.MAIN_FIELD = JSON.parse(data.MAIN_FIELD);
						data.INTEREST_FIELD = JSON.parse(data.INTEREST_FIELD);
						data.SUBJECT = JSON.parse(data.SUBJECT);
						setCoffeeChatProfile(res.data.result);
					},
					(err) => {
						console.log(err);
					}
				);
			}
		}
	}, [pid, special]);

	//* Functions
	/**
	 * 커피챗 신청하기 클릭시
	 */
	const handleCoffeeChatApply = () => {
		// 구독 검사
		// if (access == false) {
		// 	setOpen(true);
		// 	setType('subscribe');
		// 	return;
		// }
		if (memberId == coffeeChatProfile.APP_MEMBER_IDENTIFICATION_CODE) {
			alert('본인의 커피챗은 신청할 수 없습니다.');
			return;
		}
		// 커피챗 프로필 검사
		coffeeChatProfileController.getOneItemByKey(
			{
				APP_MEMBER_IDENTIFICATION_CODE: memberId,
			},
			(res) => {
				if (res.data.result === null) {
					setOpen(true);
					setType('coffeechatprofilemissing');
					return;
				} else {
					if (special == 'true') {
						specialCoffeeChatApplicationController.checkAlreadyCoffeeChat(
							{
								SPECIAL_COFFEE_CHAT_PRODUCT_IDENTIFICATION_CODE:
									pid,
								APP_MEMBER_IDENTIFICATION_CODE: memberId,
							},
							(res) => {
								if (!res.data.result) {
									setType('already');
									setOpen(true);
								} else {
									setSpecialModal(true);
								}
							},
							(err) => {
								// if (
								// 	err.response.data.message ===
								// 	'구독자만 커피챗 신청이 가능합니다.'
								// ) {
								// 	setOpen(true);
								// 	setType('subscribe');
								// }
								if (
									err.response.data.message ===
									'신청 내역이 존재합니다.'
								) {
									setOpen(true);
									setType('already');
									return;
								}
								if (
									err.response.data.message ===
									'포인트가 부족합니다.'
								) {
									setOpen(true);
									setType('point');
									return;
								}
							}
						);
					} else {
						coffeeChatApplicationController.checkAvailable(
							{
								CREATE_OPTION_KEY_LIST: {
									APP_MEMBER_IDENTIFICATION_CODE: memberId,
								},
							},
							(res) => {
								setGeneralModal(true);
							},
							(err) => {
								if (
									err.response.data.message ===
									'커피챗 신청은 한 달에 한 번만 가능합니다.'
								) {
									setType('coffeechatalready');
									setOpen(true);
								}
								// if (
								// 	err.response.data.message ===
								// 	'구독자만 커피챗 신청이 가능합니다.'
								// ) {
								// 	setOpen(true);
								// 	setType('subscribe');
								// }

								return;
							}
						);
					}
				}
			},
			(err) => {
				console.log(err);
			}
		);
	};

	return (
		// <InternalServiceDrawer type="dashboard">
		<>
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
						{coffeeChatProfile?.MAIN_FIELD?.map((item, index) => {
							return (
								item !== '기타' && (
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
								)
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
							src={coffeeChatProfile?.PROFILE_IMAGE}
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
						{special == 'true'
							? coffeeChatProfile?.PartnerMember?.FULL_NAME
							: coffeeChatProfile?.AppMember?.FULL_NAME}
						<Typography>{coffeeChatProfile?.ROLE}</Typography>
					</Typography>

					<Typography
						mb={4}
						color={'#949494'}
						fontWeight={'600'}
						variant="subtitle2"
					>
						{coffeeChatProfile?.COMPANY_NAME}
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
						{coffeeChatProfile?.INTEREST_FIELD?.map(
							(item, index) => {
								return (
									item !== '기타' && (
										<Typography>
											{item}
											<Typography
												display={
													index ===
													coffeeChatProfile
														?.INTEREST_FIELD
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
									)
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
						{coffeeChatProfile?.CAREER?.map((career) => (
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
							{coffeeChatProfile?.INTRODUCE}
						</Typography>
						<Typography lineHeight={1.4}>
							{coffeeChatProfile?.DESCRIPTION}
						</Typography>
					</Box>
					{/* 제안 주제 */}
					{coffeeChatProfile?.SUBJECT?.length !== 0 && (
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
								{coffeeChatProfile?.SUBJECT?.map((subject) => (
									<Typography lineHeight={1.4}>
										&#8226; {subject}
									</Typography>
								))}
							</Box>
						</Box>
					)}
					{/* 가격 */}
					{special == 'true' && (
						<Box>
							<Typography
								variant="subtitle2"
								color={'primary'}
								fontWeight={'700'}
							>
								가격
							</Typography>
							<Typography fontWeight="bold" my={3}>
								{coffeeChatProfile?.PRICE?.toLocaleString()}
								포인트
							</Typography>
						</Box>
					)}
				</Box>
				{/* 커피챗 신청 버튼 */}
				{(special == 'true' || coffeeChatProfile?.OFFER_YN === 'Y') && (
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
			{/* 커피챗 일반 신청 모달 */}
			<CoffeeChatApplyGeneralModal
				open={generalModal}
				handleClose={() => setGeneralModal(false)}
				profileId={
					coffeeChatProfile.COFFEE_CHAT_PROFILE_IDENTIFICATION_CODE
				}
			/>
			{/* 스페셜 커피챗 신청 모달 */}
			{special == 'true' && coffeeChatProfile && (
				<SpecialCoffeeChatApplyModal
					open={specialModal}
					handleClose={() => setSpecialModal(false)}
					coffeeChatData={coffeeChatProfile}
				/>
			)}
			{/* 알림창 */}
			<SupportiAlertModal
				open={open}
				handleClose={() => setOpen(false)}
				type={type}
			/>
			{/* </InternalServiceDrawer> */}
		</>
	);
};

export default Page;
