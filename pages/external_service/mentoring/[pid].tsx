import React, { useEffect } from 'react';

import { NextPage } from 'next';

import { Box, BoxProps, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import DefaultController from '@leanoncompany/supporti-ark-office-project/src/controller/default/DefaultController';
import moment from 'moment';
import SupportiButton from '../../../src/views/global/SupportiButton';
import ConsultingSchedular from '../../../src/views/local/external_service/consulting/ConsultingSchedular/ConsultingSchedular';
import { useUserAccess } from '../../../src/hooks/useUserAccess';
import { SupportiAlertModal } from '../../../src/views/global/SupportiAlertModal';
import { useAppMember } from '../../../src/hooks/useAppMember';
import MentoringData from '../../../src/views/local/external_service/mentoring/MentoringDate/MentroingData';

const Page: NextPage = () => {
	//* Modules
	const router = useRouter();
	//* Controller
	const mentoringController = new DefaultController('MentoringProduct');
	const mentoringApplicationController = new DefaultController(
		'MentoringApplication'
	);
	//* Constants
	const { pid } = router.query;

	const SupportiViewer = dynamic(
		() =>
			import(
				'../../../src/views/local/internal_service/contents/ToastViewer/ToastViewer'
			),
		{
			ssr: false,
		}
	);
	//* States
	/**
	 * 멘토링 데이터
	 */
	const [mentoringData, setMentoringData] = React.useState<any>();
	/**
	 * 예약 스케쥴 모달
	 */
	const [openReservationSchedule, setOpenReservationSchedule] =
		React.useState<boolean>(false);
	/**
	 * 알럿 모달
	 */
	const [alertModal, setAlertModal] = React.useState<boolean>(false);
	/**
	 * 알럿 모달 타입
	 */
	const [alertModalType, setAlertModalType] = React.useState<
		| 'seminarApplySuccess'
		| 'login'
		| 'point'
		| 'already'
		| 'seminarexceed'
		| 'seminarApply'
		| 'mentoringWarning'
	>('seminarApplySuccess');

	/**
	 * 선택된 시간
	 */
	const [selectedTime, setSelectedTime] = React.useState([]);

	//* Hooks
	const { access } = useUserAccess('SIGN_IN');
	/**
	 * 유저 아이디 가져오는 훅
	 */
	const { memberId, memberEmailId } = useAppMember();
	//* Functions
	/**
	 * 멘토링 신청
	 */
	const mentoringApply = () => {
		if (openReservationSchedule) {
			if (selectedTime.length !== mentoringData.PROGRESS_NUMBER) {
				setAlertModal(true);
				setAlertModalType('mentoringWarning');
				return;
			}
			mentoringApplicationController.createItem(
				{
					MENTORING_PRODUCT_IDENTIFICATION_CODE: pid,
					APP_MEMBER_IDENTIFICATION_CODE: 1,
					RESERVATION_DATE: JSON.stringify(selectedTime),
				},
				(res) => {
					setAlertModal(true);
					setAlertModalType('seminarApplySuccess');
				},
				(err) => {
					setAlertModal(true);
					setAlertModalType('already');
				}
			);
		} else {
			setOpenReservationSchedule(true);
		}
	};

	//* Hooks

	/**
	 * 멘토링 데이터 가져오기
	 */
	React.useEffect(() => {
		if (pid !== undefined) {
			mentoringController.getOneItem(
				{
					MENTORING_PRODUCT_IDENTIFICATION_CODE: pid,
				},
				(res) => {
					setMentoringData(res.data.result);
					console.log(res.data.result);
				},
				(err) => {}
			);
		}
	}, [openReservationSchedule, pid]);

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
			{mentoringData !== undefined && (
				<Box display={'flex'} flexDirection={'column'}>
					{/* 멘토링 헤더 */}
					<Box
						width={'100%'}
						p={3}
						display={'flex'}
						justifyContent={'space-between'}
						alignItems={'center'}
						borderRadius={2}
					>
						<Box
							display={'flex'}
							flexDirection={'column'}
							gap={3}
							alignSelf={'flex-start'}
						>
							<Typography variant={'h2'} fontWeight={'600'}>
								{mentoringData.TITLE}
							</Typography>
							<Box
								display={'flex'}
								flexDirection={'row'}
								gap={3}
								alignContent={'center'}
							>
								<Box
									display={'flex'}
									width={'70px'}
									height={'70px'}
									borderRadius={'70%'}
									overflow={'hidden'}
								>
									<img
										src={
											JSON.parse(
												mentoringData.MENTOR_IMAGE
											).length > 0
												? JSON.parse(
														mentoringData.MENTOR_IMAGE
												  )[0]
												: '/images/icons/mentor.png'
										}
										alt="mentor"
										width={'100%'}
										height={'100%'}
										style={{
											objectFit: 'cover',
										}}
									/>
								</Box>
								<Typography
									variant={'h5'}
									fontWeight={'600'}
									color={'#3A3A3A'}
									alignSelf={'center'}
								>
									{mentoringData.MENTOR_NAME}
								</Typography>
							</Box>
							<Typography variant={'body1'} color={'gray'}>
								{mentoringData.CATEGORY}
							</Typography>
							<Typography
								variant={'body1'}
								color={'gray'}
								alignSelf={'center'}
							>
								{moment(mentoringData.START_DATE).format(
									'YYYY.MM.DD'
								)}{' '}
								~{' '}
								{moment(mentoringData.END_DATE).format(
									'YYYY.MM.DD'
								)}
							</Typography>
						</Box>

						<Box
							display={'flex'}
							gap={3}
							bgcolor={'primary.light'}
							p={3}
							borderRadius={2}
							flexDirection={'column'}
							position={'absolute'}
							top={50}
							right={30}
						>
							<Box
								display={'flex'}
								flexDirection={'row'}
								alignItems={'center'}
								gap={5}
								justifyContent={'space-between'}
							>
								<Typography color={'gray'}>모집기간</Typography>
								<Typography>
									{moment(
										mentoringData.RECURITMENT_START_DATE
									).format('YYYY.MM.DD')}{' '}
									~{' '}
									{moment(
										mentoringData.RECURITMENT_END_DATE
									).format('YYYY.MM.DD')}
								</Typography>
							</Box>
							<Box
								display={'flex'}
								flexDirection={'row'}
								alignItems={'center'}
								justifyContent={'space-between'}
							>
								<Typography color={'gray'}>1회 가격</Typography>
								<Typography>
									{mentoringData.REAL_PRICE.toLocaleString()}
									원
								</Typography>
							</Box>
							<Box
								display={'flex'}
								flexDirection={'row'}
								alignItems={'center'}
								justifyContent={'space-between'}
							>
								<Typography color={'gray'}>
									멘토링 진행 횟수 (선택해야 하는 시간 수)
								</Typography>
								<Typography>
									{mentoringData.PROGRESS_NUMBER.toLocaleString()}
									회
								</Typography>
							</Box>
							<Box
								display={'flex'}
								flexDirection={'row'}
								alignItems={'center'}
								justifyContent={'space-between'}
							>
								<Typography color={'gray'}>정원</Typography>
								<Box
									display={'flex'}
									flexDirection={'row'}
									alignItems={'center'}
									gap={1}
								>
									<Typography
										color={'red'}
										variant="body1"
										sx={{
											fontWeight: 'bold',
											border: '1px solid red',
											padding: '5px',
										}}
									>
										{mentoringData.PERSONNEL -
											mentoringData.MentoringApplications
												.length}{' '}
										자리 남음
									</Typography>
									<Typography>
										{mentoringData.PERSONNEL} 명(최대)
									</Typography>
								</Box>
							</Box>
							{openReservationSchedule && (
								<MentoringData
									data={mentoringData}
									selectedTime={selectedTime}
									setSelectedTime={setSelectedTime}
								/>
							)}

							{mentoringData.PERSONNEL -
								mentoringData.MentoringApplications.length >
								0 && (
								<SupportiButton
									contents={'신청하기'}
									variant={'contained'}
									onClick={() => {
										if (access) {
											mentoringApply();
										} else {
											setAlertModal(true);
											setAlertModalType('login');
										}
									}}
								/>
							)}
						</Box>
					</Box>
					{/* 멘토링 내용 */}
					<Box display={'flex'} flexDirection={'column'} ml={3}>
						<SupportiViewer data={mentoringData.DESCRIPTION} />
					</Box>
					{/* 멘토 정보 */}
					<Box
						display={'flex'}
						flexDirection={'row'}
						width={'70%'}
						gap={15}
						mt={5}
						ml={15}
						border={'1px solid #E0E0E0'}
						p={5}
					>
						<Box
							display={'flex'}
							flexDirection={'column'}
							alignItems={'center'}
							gap={1}
						>
							<Typography variant={'subtitle2'} color={'#3A3A3A'}>
								{mentoringData.CATEGORY}
							</Typography>
							<Box
								display={'flex'}
								width={'150px'}
								height={'150px'}
								borderRadius={'70%'}
								overflow={'hidden'}
							>
								<img
									src={
										JSON.parse(mentoringData.MENTOR_IMAGE)
											.length > 0
											? JSON.parse(
													mentoringData.MENTOR_IMAGE
											  )[0]
											: '/images/icons/mentor.png'
									}
									alt="mentor"
									width={'100%'}
									height={'100%'}
									style={{
										objectFit: 'cover',
									}}
								/>
							</Box>
							<Typography variant={'h5'} color={'#3A3A3A'}>
								{mentoringData.MENTOR_NAME}
							</Typography>
							<Typography variant={'h5'} color={'#3A3A3A'}>
								{mentoringData.MENTOR_COMPANY}
							</Typography>
						</Box>
						<Box
							display={'flex'}
							flexDirection={'column'}
							alignItems={'center'}
							mt={2}
							gap={3}
						>
							{mentoringData.MENTOR_INTRODUCE &&
								mentoringData.MENTOR_INTRODUCE != '' && (
									<Box
										display={'flex'}
										flexDirection={'column'}
										alignItems={'center'}
										mt={2}
										gap={3}
									>
										<Typography
											variant={'h5'}
											color={'gray'}
											fontWeight={'600'}
											alignSelf={'center'}
										>
											멘토 소개
										</Typography>
										<Typography
											variant={'body1'}
											color={'gray'}
											alignSelf={'center'}
										>
											{mentoringData.MENTOR_INTRODUCE}
										</Typography>
									</Box>
								)}
							{mentoringData.MENTOR_HISTORY &&
								mentoringData.MENTOR_HISTORY != '' && (
									<Box
										display={'flex'}
										flexDirection={'column'}
										alignItems={'center'}
										mt={2}
										gap={3}
									>
										<Typography
											variant={'h5'}
											color={'gray'}
											fontWeight={'600'}
											alignSelf={'center'}
										>
											주요 경력
										</Typography>
										<SupportiViewer
											data={mentoringData.MENTOR_HISTORY}
										/>
									</Box>
								)}
						</Box>
					</Box>
					<SupportiAlertModal
						type={alertModalType}
						open={alertModal}
						handleClose={() => setAlertModal(false)}
						customHandleClose={
							alertModalType == 'seminarApplySuccess'
								? () => {
										router.push(
											`${
												mentoringData?.PAYMENT_LINK
											}?userName=${memberEmailId}&productName=${'멘토링'}&productName=${
												mentoringData?.TITLE
											}&productId=${
												mentoringData?.MENTORING_PRODUCT_IDENTIFICATION_CODE
											}`
										);
								  }
								: undefined
						}
					/>
				</Box>
			)}
		</Box>
	);
};

export default Page;
