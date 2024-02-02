import React, { useEffect } from 'react';

import { NextPage } from 'next';

import { Box, BoxProps, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import DefaultController from '@leanoncompany/supporti-ark-office-project/src/controller/default/DefaultController';
import moment from 'moment';
import SupportiButton from '../../../src/views/global/SupportiButton';
import { SupportiAlertModal } from '../../../src/views/global/SupportiAlertModal';
import { useUserAccess } from '../../../src/hooks/useUserAccess';
import { useAppMember } from '../../../src/hooks/useAppMember';
import IrApplicationModal from '../../../src/views/local/external_service/ir/IrApplicationModal/IrApplicationModal';

const Page: NextPage = () => {
	//* Modules
	const router = useRouter();
	//* Controller
	const irController = new DefaultController('IrProduct');
	const irApplicationController = new DefaultController('IrApplication');
	const appMemberController = new DefaultController('AppMember');
	const userSubscriptionController = new DefaultController(
		'UserSubscription'
	);

	//* Constants

	//* States
	/**
	 * IR 데이터
	 */
	const [irData, setIrData] = React.useState<any>({});
	/**
	 * 구독 알럿 모달
	 */
	const [subscriptionAlertModal, setSubscriptionAlertModal] =
		React.useState<boolean>(false);

	/**
	 * 신청 기간 알럿 모달
	 */
	const [irFinishAlertModal, setIrFinishAlertModal] =
		React.useState<boolean>(false);

	/**
	 * 구독 정보
	 */
	const [subscriptionInfo, setSubscriptionInfo] =
		React.useState<any>(undefined);

	/**
	 *
	 * 신청 모달 오픈 여부
	 */
	const [openApplicationModal, setOpenApplicationModal] =
		React.useState<boolean>(false);

	//* Hooks
	const { access } = useUserAccess('SIGN_IN');

	/**
	 * 유저 아이디 가져오는 훅
	 */
	const { memberId } = useAppMember();
	//* Functions

	/**
	 * 구독권 정보 가져오기
	 */
	useEffect(() => {
		memberId &&
			userSubscriptionController.getOneItemByKey(
				{
					APP_MEMBER_IDENTIFICATION_CODE: memberId,
					EXPIRED_YN: 'N',
					CANCELED_YN: 'N',
				},
				(res) => {
					setSubscriptionInfo(res.data.result);
				},
				(err) => {
					console.log(err);
				}
			);
	}, [memberId]);

	/**
	 * IR 신청 버튼 클릭시
	 */
	const handleApplyir = () => {
		// TODO :: 알럿 모달로 바꾸기
		if (!access) {
			alert('로그인이 필요합니다!');
			return;
		}

		// 싡청 가능한 기간이 지났을 시
		if (moment(irData.DUE_DATE).isBefore(moment())) {
			setIrFinishAlertModal(true);
			return;
		}

		// 구독권이 없을 시
		if (subscriptionInfo === undefined) {
			setSubscriptionAlertModal(true);

			if (
				subscriptionInfo !== undefined &&
				Object.keys(subscriptionInfo).length !== 0
			) {
				if (
					!(
						subscriptionInfo?.SubscriptionProduct?.TYPE ===
							'BLACK' ||
						subscriptionInfo?.SubscriptionProduct?.TYPE ===
							'PRODUCT'
					)
				) {
					alert('구독권 구매 권장');
					return;
				}
			}
		}

		setOpenApplicationModal(true);
	};

	console.log(irData.DUE_DATE, moment(irData.DUE_DATE).isBefore(moment()));
	console.log(irData.ADOPTION_DATE);

	//* Hooks
	/**
	 * IR 데이터 조회
	 */
	useEffect(() => {
		irController.findAllItems(
			{
				SORT_KEY: 'CREATED_AT',
				SORT_DIRECTION: 'DESC',
				LIMIT: 1,
				PAGE: 0,
			},
			(res) => {
				setIrData(res.data.result.rows[0]);
			},
			(err) => {}
		);
	}, []);

	return (
		<Box
			width={'100%'}
			p={{
				xs: 2,
				md: 10,
			}}
			minHeight={'90vh'}
		>
			{/* IR 내용 */}
			<Box
				display={'flex'}
				width={'100%'}
				flexDirection={'column'}
				alignItems={'center'}
				mt={3}
				height={'auto'}
				position={'relative'}
			>
				{irData.IMAGE_LIST &&
					JSON.parse(irData.IMAGE_LIST).map((item, index) => {
						return (
							<Box key={index}>
								<img src={item} alt="" />
							</Box>
						);
					})}
				{/* 스티키 버튼 */}

				<Box
					width={'100%'}
					justifyContent="space-between"
					// bgcolor={'red'}
					sx={{
						position: 'fixed',
						bottom: 100,
						display: 'flex',
					}}
					pr={20}
				>
					<Box />
					<SupportiButton
						contents={'신청하기'}
						isGradient={true}
						onClick={() => handleApplyir()}
						style={{
							color: 'white',
							width: '100px',
							height: '100px',
							borderRadius: '50%',
						}}
					/>
				</Box>

				<SupportiAlertModal
					type={'subscribe'}
					open={subscriptionAlertModal}
					handleClose={() => setSubscriptionAlertModal(false)}
				/>
				<SupportiAlertModal
					type={'irFinish'}
					open={irFinishAlertModal}
					handleClose={() => setIrFinishAlertModal(false)}
				/>
			</Box>

			{/* IR 신청 모달 */}
			<IrApplicationModal
				open={openApplicationModal}
				handleClose={() => setOpenApplicationModal(false)}
				irProductId={irData.IR_PRODUCT_IDENTIFICATION_CODE}
				memberId={memberId}
				date={irData.ADOPTION_DATE}
				mode="create"
			/>
		</Box>
	);
};

export default Page;
