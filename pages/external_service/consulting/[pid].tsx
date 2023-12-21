import React from 'react';

import { NextPage } from 'next';

import { Box, BoxProps, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import DefaultController from '@qillie-corp/ark-office-project/src/controller/default/DefaultController';
import moment from 'moment';
import SupportiButton from '../../../src/views/global/SupportiButton';
import ConsultingSchedular from '../../../src/views/local/external_service/consulting/ConsultingSchedular/ConsultingSchedular';
import { useUserAccess } from '../../../src/hooks/useUserAccess';
import { SupportiAlertModal } from '../../../src/views/global/SupportiAlertModal';
import { ConsultingApplicationController } from '../../../src/controller/ConsultingApplicationController';
import { useAppMember } from '../../../src/hooks/useAppMember';

const Page: NextPage = () => {
	//* Modules
	const router = useRouter();
	//* Controller
	const consultingController = new DefaultController('ConsultingProduct');
	const consultingApplicationController =
		new ConsultingApplicationController();
	//* Constants
	const { pid } = router.query;
	//* States
	/**
	 * 컨설팅 데이터
	 */
	const [consultingData, setConsultingData] = React.useState<any>();
	/**
	 * 예약 스케쥴 모달
	 */
	const [reservationScheduleModal, setReservationScheduleModal] =
		React.useState<boolean>(false);
	/**
	 * 알럿 모달
	 */
	const [alertModal, setAlertModal] = React.useState<boolean>(false);
	/**
	 * 알럿 모달 타입
	 */
	const [alertModalType, setAlertModalType] = React.useState<
		'success' | 'login' | 'subscribe' | 'point' | 'already'
	>('success');

	//* Hooks
	const { memberId } = useAppMember();
	const { access } = useUserAccess('SIGN_IN');
	//* Functions
	/**
	 * 컨설팅 신청 여부 체크하기
	 */
	const checkConsultingApplication = () => {
		consultingApplicationController.checkAvailable(
			{
				CONSULTING_PRODUCT_IDENTIFICATION_CODE: pid,
				APP_MEMBER_IDENTIFICATION_CODE: memberId,
			},
			(res) => {
				if (!res.data.result) {
					setAlertModalType('already');
					setAlertModal(true);
				} else {
					setReservationScheduleModal(true);
				}
			},
			(err) => {
				if (
					err.response.data.message === '구독 회원만 이용 가능합니다.'
				) {
					setAlertModal(true);
					setAlertModalType('subscribe');
					return;
				}
				if (err.response.data.message === '신청 내역이 존재합니다.') {
					setAlertModal(true);
					setAlertModalType('already');
					return;
				}
				if (err.response.data.message === '포인트가 부족합니다.') {
					setAlertModal(true);
					setAlertModalType('point');
					return;
				}
			}
		);
	};

	//* Hooks

	/**
	 * 컨설팅 데이터 가져오기
	 */
	React.useEffect(() => {
		if (pid !== undefined) {
			consultingController.getOneItem(
				{
					CONSULTING_PRODUCT_IDENTIFICATION_CODE: pid,
				},
				(res) => {
					setConsultingData(res.data.result);
				},
				(err) => {}
			);
		}
	}, [reservationScheduleModal, pid]);

	return (
		<Box
			width={'100%'}
			position={'relative'}
			p={{
				xs: 2,
				md: 10,
			}}
			minHeight={'90vh'}
		>
			{consultingData !== undefined && (
				<Box>
					{/* 컨설팅 헤더 */}
					<Box
						width={'100%'}
						p={3}
						bgcolor={'primary.light'}
						display={'flex'}
						justifyContent={'space-between'}
						alignItems={'center'}
						borderRadius={2}
					>
						<Typography variant={'h4'} fontWeight={'600'}>
							{consultingData.PRODUCT_NAME}
						</Typography>
						<Box display={'flex'} gap={3}>
							<Typography variant={'body1'}>
								{consultingData.PRICE} P
							</Typography>
						</Box>
					</Box>
					{/* 컨설팅 내용 */}
					<Box
						display={'flex'}
						width={'100%'}
						flexDirection={'column'}
						alignItems={'center'}
						minHeight={'50vh'}
						mt={3}
					>
						{consultingData.PRODUCT_DETAIL_IMAGE_LIST &&
							JSON.parse(
								consultingData.PRODUCT_DETAIL_IMAGE_LIST
							).map((item, index) => {
								return (
									<Box key={index}>
										<img src={item} alt="" />
									</Box>
								);
							})}
					</Box>
					{/* 스티키 버튼 */}
					<Box
						display={'flex'}
						width={'100%'}
						position={'sticky'}
						justifyContent={'center'}
						bottom={0}
						left={0}
					>
						<SupportiButton
							contents={'신청하기'}
							isGradient={true}
							onClick={() => {
								if (!access) {
									setAlertModalType('login');
									setAlertModal(true);
									return;
								}
								checkConsultingApplication();
							}}
							style={{
								color: 'white',
								width: '200px',
							}}
						/>
					</Box>
					<ConsultingSchedular
						open={reservationScheduleModal}
						handleClose={() => setReservationScheduleModal(false)}
						consultingData={consultingData}
					/>
					<SupportiAlertModal
						type={alertModalType}
						open={alertModal}
						handleClose={() => setAlertModal(false)}
					/>
				</Box>
			)}
		</Box>
	);
};

export default Page;
