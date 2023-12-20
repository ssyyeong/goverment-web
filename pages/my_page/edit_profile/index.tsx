import { Box, Container, Switch, Typography } from '@mui/material';
import { NextPage } from 'next';
import React, { useEffect } from 'react';
import { AppMemberController } from '../../../src/controller/AppMemberController';
import { CookieManager } from '@qillie-corp/qillie-utility';
import SupportiButton from '../../../src/views/global/SupportiButton';
import DefaultController from '@qillie-corp/ark-office-project/src/controller/default/DefaultController';
import moment from 'moment';
import { useRouter } from 'next/router';
import { SupportiAlertModal } from '../../../src/views/global/SupportiAlertModal';
import AppMemberUpdateModal from '../../../src/views/local/auth/appMemberUpdateModal/AppMemeberUpdateModal';
import ProfileUpdateModal from '../../../src/views/local/auth/profileUpdateModal/ProfileUpdateModal';
import InternalServiceDrawer from '../../../src/views/local/internal_service/common/InternalServiceDrawer/InternalServiceDrawer';
import { useAppMember } from '../../../src/hooks/useAppMember';

const Page: NextPage = () => {
	//* Modules
	const appMemberController = new AppMemberController();
	const userSubscriptionController = new DefaultController(
		'UserSubscription'
	);
	const subscriptionPaymentInfoController = new DefaultController(
		'SubscriptionPaymentInfo'
	);
	const cookie = new CookieManager();
	const router = useRouter();
	//* States
	/**
	 * 회원 정보
	 */
	const [memberInfo, setMemberInfo] = React.useState<any>({});
	/**
	 * 구독 정보
	 */
	const [subscriptionInfo, setSubscriptionInfo] = React.useState<any>({});
	/**
	 * 회원 정보 수정 모달
	 */
	const [editProfileModal, setEditProfileModal] =
		React.useState<boolean>(false);
	/**
	 * 사업자 회원 정보 수정 모달
	 */
	const [editBusinessProfileModal, setEditBusinessProfileModal] =
		React.useState<boolean>(false);
	/**
	 * 비밀번호 변경 모달
	 */
	const [editPasswordModal, setEditPasswordModal] =
		React.useState<boolean>(false);
	/**
	 * 알러트 모달
	 */
	const [alertModal, setAlertModal] = React.useState<boolean>(false);
	/**
	 * 알러트 모달 타입
	 */
	const [alertModalType, setAlertModalType] = React.useState<
		'withdraw' | 'unsubscribe'
	>('withdraw');

	//* Hooks
	/**
	 * 유저 정보 가져오기
	 */
	const { memberId } = useAppMember();

	//* Functions
	/**
	 * 회원 탈퇴
	 */
	const withdraw = () => {
		appMemberController.deleteItem(
			{
				APP_MEMBER_IDENTIFICATION_CODE: memberId,
			},
			(res) => {
				cookie.removeItemInCookies('ACCESS_TOKEN', { path: '/' });
				router.push('/auth/sign_in');
			},
			(err) => {
				console.log(err);
			}
		);
	};
	/**
	 * 구독 취소
	 */
	const unsubscribe = () => {
		userSubscriptionController.updateItem(
			{
				USER_SUBSCRIPTION_IDENTIFICATION_CODE:
					subscriptionInfo.USER_SUBSCRIPTION_IDENTIFICATION_CODE,
				CANCELED_YN: 'Y',
			},
			(res) => {
				router.push('/rate_plan');
			},
			(err) => {
				console.log(err);
			}
		);
	};

	/**
	 * 업데이트
	 */
	const updateUserInfo = (checked) => {
		appMemberController.updateItem(
			{
				APP_MEMBER_IDENTIFICATION_CODE:
					memberInfo.APP_MEMBER_IDENTIFICATION_CODE,
				ALIMTALK_YN: checked ? 'Y' : 'N',
			},
			(res) => {
				setMemberInfo(
					Object.assign({}, memberInfo, {
						ALIMTALK_YN: checked ? 'Y' : 'N',
					})
				);
			}
		);
	};
	/**
	 * 회원정보 가져오기
	 */
	const getUserInfo = () => {
		appMemberController.getData(
			{},
			`${appMemberController.mergedPath}/profile`,
			(res) => {
				if (res.data.result !== null) {
					setMemberInfo(res.data.result);
				}
			},
			(err) => {
				console.log(err);
			}
		);
	};

	const { memberPoint } = useAppMember();
	//* Constants
	/**
	 * 회원정보
	 */
	const memberInfoConfig = [
		{
			label: '보유 포인트',
			value: `${memberPoint} P`,
		},
		{
			label: '이름',
			value: memberInfo.FULL_NAME,
		},
		{
			label: '이메일',
			value: memberInfo.USER_NAME,
		},
		{
			label: '전화번호',
			value: memberInfo.PHONE_NUMBER,
		},
		{
			label: '알림톡 수신 여부',
			value: memberInfo.ALIMTALK_YN === 'Y' ? true : false,
			type: 'switch',
		},
	];
	/**
	 * 구독 정보
	 */
	const subscriptionInfoConfig = [
		{
			label: '구독권',
			value: !subscriptionInfo
				? '-'
				: subscriptionInfo?.SubscriptionProduct?.NAME,
		},
		{
			label: '다음 결제일',
			value: !subscriptionInfo
				? '-'
				: moment(subscriptionInfo?.NEXT_BILLING_DATE).format(
						'YYYY-MM-DD'
				  ),
		},
		{
			label: '정기 결제 금액',
			value: !subscriptionInfo
				? '-'
				: subscriptionInfo?.SubscriptionProduct?.DISCOUNT_PRICE.toLocaleString(),
		},
		{
			label: '월 / 연 구독',
			value: !subscriptionInfo
				? '-'
				: subscriptionInfo?.INTERVAL == 'MONTHLY'
				? '월'
				: '연',
		},
	];
	/**
	 * dataconfig
	 */
	const dataConfig = [
		{
			title: '내 정보',
			data: memberInfoConfig,
			button: {
				label: '사업자 회원으로 변경',
				onClick: () => {
					setEditBusinessProfileModal(true);
				},
				condition: memberInfo.USER_GRADE === 'GENERAL',
			},
			additionalButton: [
				{
					label: '회원 탈퇴하기',
					onClick: () => {
						setAlertModal(true);
						setAlertModalType('withdraw');
					},
				},
				{
					label: '내 정보 수정하기',
					onClick: () => {
						setEditProfileModal(true);
					},
				},
				{
					label: '비밀번호 변경하기',
					onClick: () => {
						setEditPasswordModal(true);
					},
					condition: memberInfo.SNS_TYPE !== null,
				},
			],
		},
		{
			title: '구독 정보',
			data: subscriptionInfoConfig,
			condition: !subscriptionInfo,
			button: {
				label: '구독하러가기',
				onClick: () => {
					router.push('/rate_plan');
				},
				condition: !subscriptionInfo,
			},
			additionalButton: [
				{
					label: '구독 취소',
					onClick: () => {
						setAlertModal(true);
						setAlertModalType('unsubscribe');
					},
					condition: !subscriptionInfo,
				},
			],
		},
	];

	//* Hooks
	/**
	 *유저정보 가져오기
	 */
	useEffect(() => {
		getUserInfo();
	}, [editProfileModal, editBusinessProfileModal]);
	/**
	 * 구독권 정보 가져오기
	 */
	useEffect(() => {
		memberInfo &&
			userSubscriptionController.getOneItemByKey(
				{
					APP_MEMBER_IDENTIFICATION_CODE:
						memberInfo.APP_MEMBER_IDENTIFICATION_CODE,
					EXPIRED_YN: 'N',
				},
				(res) => {
					setSubscriptionInfo(res.data.result);
				},
				(err) => {
					console.log(err);
				}
			);
	}, [memberInfo]);

	return (
		<InternalServiceDrawer type="mypage">
			<Container sx={{ my: 6 }}>
				{dataConfig.map((data, idx) => {
					return (
						<Box width={{ sm: '50%', xs: '100%' }} p={2}>
							<Box
								sx={{
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'space-between',
									mb: 2,
								}}
							>
								<Typography variant="h5" fontWeight={'bold'}>
									{data.title}
								</Typography>
								{data.button.condition && (
									<SupportiButton
										variant="contained"
										onClick={data.button.onClick}
										contents={data.button.label}
										style={{
											height: '40px',
										}}
									/>
								)}
							</Box>
							<Box
								display={'flex'}
								flexDirection={'column'}
								gap={1}
								my={2}
								mt={5}
							>
								{data.data.map((memberInfo, idx) => {
									return (
										<Box
											display={'flex'}
											flexDirection={'row'}
											justifyContent={'space-between'}
											alignItems={'center'}
										>
											<Typography
												variant="subtitle1"
												fontWeight={'500'}
												color={'secondary.dark'}
											>
												{memberInfo.label}
											</Typography>
											<Typography
												variant="subtitle1"
												fontWeight={'500'}
											>
												{memberInfo.value}
											</Typography>
											{memberInfo.type === 'switch' && (
												<Switch
													checked={memberInfo.value}
													onChange={(e) => {
														updateUserInfo(
															e.target.checked
														);
													}}
												/>
											)}
										</Box>
									);
								})}
							</Box>
							{/* 버튼 섹션 */}
							<Box display={'flex'} alignItems={'center'} gap={2}>
								{data.additionalButton.map((button, idx) => {
									return (
										<Typography
											sx={{
												textDecoration: 'underline',
												color: 'secondary.main',
												cursor: 'pointer',
											}}
											display={
												!button.condition
													? 'block'
													: 'none'
											}
											onClick={button.onClick}
										>
											{button.label}
										</Typography>
									);
								})}
							</Box>
						</Box>
					);
				})}
				<SupportiAlertModal
					open={alertModal}
					type={alertModalType}
					handleClose={() => {
						setAlertModal(false);
					}}
					customHandleClose={
						alertModalType === 'withdraw' ? withdraw : unsubscribe
					}
				/>
				<ProfileUpdateModal
					open={editProfileModal}
					handleClose={() => setEditProfileModal(false)}
					appMemberData={memberInfo}
					infoUpdate={true}
				/>
				<ProfileUpdateModal
					open={editBusinessProfileModal}
					handleClose={() => setEditBusinessProfileModal(false)}
					appMemberData={memberInfo}
					businessUpdate={true}
				/>
				<ProfileUpdateModal
					open={editPasswordModal}
					handleClose={() => setEditPasswordModal(false)}
					appMemberData={memberInfo}
					passwordUpdate={true}
				/>
			</Container>
		</InternalServiceDrawer>
	);
};

export default Page;
