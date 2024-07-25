import React, { useEffect } from 'react';

import { NextPage } from 'next';

import { Box, BoxProps, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import DefaultController from '@leanoncompany/supporti-ark-office-project/src/controller/default/DefaultController';
import moment from 'moment';
import SupportiButton from '../../../src/views/global/SupportiButton';
import { useUserAccess } from '../../../src/hooks/useUserAccess';
import { SupportiAlertModal } from '../../../src/views/global/SupportiAlertModal';
import { useAppMember } from '../../../src/hooks/useAppMember';
import MentoringData from '../../../src/views/local/external_service/mentoring/MentoringDate/MentroingData';

import ShareIcon from '@mui/icons-material/Share';

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

	const [scroll, setScroll] = React.useState(false);

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
					APP_MEMBER_IDENTIFICATION_CODE: memberId,
					RESERVATION_DATE: JSON.stringify(selectedTime),
				},
				(res) => {
					router.push(
						`${
							mentoringData?.PAYMENT_LINK
						}?userName=${memberEmailId}&productType=${'멘토링'}&productName=${
							mentoringData?.TITLE
						}&productId=${
							mentoringData?.MENTORING_PRODUCT_IDENTIFICATION_CODE
						}$productLink=${mentoringData?.LINK}
						`
					);
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

	/**
	 * URL 복사
	 */
	const CopyUrl = () => {
		const url = window.location.href;
		navigator.clipboard.writeText(url).then(
			function () {
				alert('URL이 복사되었습니다.');
			},
			function () {
				alert('URL 복사에 실패했습니다.');
			}
		);
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

	/**
	 * 스크롤 감지
	 */
	useEffect(() => {
		window.addEventListener('scroll', handleScroll);
		return () => {
			window.removeEventListener('scroll', handleScroll); //clean up
		};
	}, []);

	const handleScroll = () => {
		// 스크롤이 Top에서 50px 이상 내려오면 true값을 useState에 넣어줌
		if (window.scrollY >= 50) {
			setScroll(true);
			console.log(scroll);
		} else {
			// 스크롤이 50px 미만일경우 false를 넣어줌
			setScroll(false);
		}
	};

	return (
		<Box
			display={'flex'}
			width={'100%'}
			p={{
				xs: 2,
				md: 10,
			}}
			minHeight={'100vh'}
		>
			{mentoringData !== undefined && (
				<Box
					display={'flex'}
					flexDirection={'column'}
					width={{
						md: '80%',
						xs: '100%',
					}}
					position={'relative'}
					margin={'auto'}
					p={{
						xs: 1,
						md: 10,
					}}
					minHeight={'90vh'}
				>
					{/* 멘토링 헤더 */}
					<Box
						width={'100%'}
						p={{
							xs: 0,
							md: 3,
						}}
						display={{ xs: 'block', md: 'flex' }}
						justifyContent={'space-between'}
						alignItems={'center'}
						gap={3}
					>
						<Box
							display={'flex'}
							flexDirection={'column'}
							gap={3}
							alignSelf={'flex-start'}
							borderRadius={2}
							bgcolor={'primary.light'}
							py={{
								xs: 2,
								md: 4,
							}}
							px={{
								xs: 2,
								md: 3,
							}}
							flex={1}
							mb={{
								xs: 3,
								md: 0,
							}}
						>
							<Box display={{ md: 'flex', xs: 'none' }}>
								<Typography
									variant={'h3'}
									fontWeight={'600'}
									sx={{
										wordBreak: 'keep-all',
										lineHeight: '30px',
										display: 'flex',
										flexWrap: 'wrap',
									}}
								>
									{mentoringData.TITLE}
								</Typography>
							</Box>
							<Box display={{ md: 'none', xs: 'flex' }}>
								<Typography
									variant={'h3'}
									fontWeight={'600'}
									sx={{
										wordBreak: 'keep-all',
										lineHeight: '30px',
										display: 'flex',
										flexWrap: 'wrap',
									}}
								>
									{mentoringData.TITLE}
								</Typography>
							</Box>
							<Box
								display={'flex'}
								flexDirection={'row'}
								gap={2}
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
									멘토: {mentoringData.MENTOR_NAME}
								</Typography>
							</Box>
							<Typography variant={'subtitle1'} color={'gray'}>
								분야: {mentoringData.CATEGORY}
							</Typography>
							<Typography variant={'subtitle1'} color={'gray'}>
								진행방식:{' '}
								{mentoringData.ONLINE_YN === 'Y'
									? '온라인'
									: '오프라인'}
							</Typography>
							<Typography variant={'subtitle1'} color={'gray'}>
								진행기간:{' '}
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
						>
							<Box
								display={'flex'}
								flexDirection={'row'}
								alignItems={'center'}
								gap={5}
								justifyContent={'space-between'}
							>
								<Typography
									variant={'subtitle1'}
									color={'gray'}
								>
									모집기간
								</Typography>
								<Typography variant={'subtitle1'}>
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
								<Typography
									variant={'subtitle1'}
									color={'gray'}
								>
									진행가격
								</Typography>
								<Typography variant={'subtitle1'}>
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
								<Typography
									color={'gray'}
									variant={'subtitle1'}
								>
									총 진행 횟수
								</Typography>
								<Typography variant={'subtitle1'}>
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
								<Typography
									color={'gray'}
									variant={'subtitle1'}
								>
									정원 :{' '}
								</Typography>
								<Box
									display={'flex'}
									flexDirection={'row'}
									alignItems={'center'}
									gap={1}
								>
									<Typography variant={'subtitle1'}>
										{mentoringData.PERSONNEL} 명(남은
										신청인원{' '}
										{mentoringData.PERSONNEL -
											mentoringData.MentoringApplications.filter(
												(mentoringApplication: any) =>
													mentoringApplication.CANCELED_YN ===
													'N'
											).length}{' '}
										명)
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

							<SupportiButton
								contents={
									mentoringData.PERSONNEL -
										mentoringData.MentoringApplications.filter(
											(mentoringApplication: any) =>
												mentoringApplication.CANCELED_YN ===
												'N'
										).length ===
									0
										? '신청마감'
										: '신청하기'
								}
								disabled={
									mentoringData.PERSONNEL -
										mentoringData.MentoringApplications.filter(
											(mentoringApplication: any) =>
												mentoringApplication.CANCELED_YN ===
												'N'
										).length ===
									0
										? true
										: false
								}
								variant={'contained'}
								onClick={() => {
									if (
										mentoringData.PERSONNEL -
											mentoringData.MentoringApplications.filter(
												(mentoringApplication: any) =>
													mentoringApplication.CANCELED_YN ===
													'N'
											).length ===
										0
									)
										return;

									if (access) {
										mentoringApply();
									} else {
										setAlertModal(true);
										setAlertModalType('login');
									}
								}}
							/>

							<Box
								display={'flex'}
								flexDirection={'row'}
								alignItems={'center'}
								alignSelf={'center'}
								gap={1}
								sx={{
									cursor: 'pointer',
								}}
								onClick={() => {
									CopyUrl();
								}}
							>
								<ShareIcon
									color="primary"
									sx={{
										width: '15px',
										height: '15px',
									}}
								/>
								<Typography
									variant={'body1'}
									color={'gray'}
									align={'center'}
								>
									공유하기
								</Typography>
							</Box>
						</Box>
					</Box>
					{/* 멘토링 내용 */}
					<Box display={'flex'} flexDirection={'column'} ml={3}>
						{JSON.parse(mentoringData.DESCRIPTION).map(
							(item: any) => {
								return (
									<Box
										width={'100%'}
										sx={{
											display: 'flex',
											flexDirection: {
												md: 'row',
												xs: 'column',
											},
											py: 4,
											overflow: 'hidden',
										}}
									>
										<Box
											width={{
												md: '35%',
												xs: '100%',
											}}
										>
											<Typography
												fontWeight={700}
												variant="h3"
												color={'#363636'}
												sx={{
													wordBreak: 'keep-all',
													lineHeight: '20px',
													display: 'flex',
													flexWrap: 'wrap',

													mb: {
														md: 0,
														xs: 3,
													},
												}}
											>
												{item.TITLE}
											</Typography>
										</Box>

										<SupportiViewer
											data={item.DESCRIPTION}
										/>
									</Box>
								);
							}
						)}
					</Box>
					{/* 멘토 정보 */}
					<Box
						display={'flex'}
						flexDirection={{
							md: 'row',
							xs: 'column',
						}}
						alignSelf={'center'}
						width={'100%'}
						gap={{
							md: 12,
							xs: 0,
						}}
						mt={{
							md: 5,
							xs: 0,
						}}
						ml={{
							md: 5,
							xs: 0,
						}}
						border={'1px solid #E0E0E0'}
						p={5}
					>
						<Box display={'flex'} flexDirection={'column'} gap={1}>
							<Box
								display={'flex'}
								width={'150px'}
								height={'150px'}
								borderRadius={'70%'}
								overflow={'hidden'}
								mb={2}
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

							<Box
								display={'flex'}
								flexDirection={'row'}
								gap={1}
								alignItems={'center'}
							>
								<Typography
									variant={'h5'}
									fontWeight={'600'}
									color={'#3A3A3A'}
								>
									멘토
								</Typography>
								<Typography variant={'h6'} color={'#3A3A3A'}>
									{mentoringData.MENTOR_NAME}
								</Typography>
							</Box>
							<Box
								display={'flex'}
								flexDirection={'row'}
								gap={1}
								alignItems={'center'}
							>
								<Typography
									variant={'h5'}
									fontWeight={'600'}
									color={'#3A3A3A'}
								>
									소속
								</Typography>
								<Typography variant={'h6'} color={'#3A3A3A'}>
									{mentoringData.MENTOR_COMPANY}
								</Typography>
							</Box>
							<Box
								display={'flex'}
								flexDirection={'row'}
								gap={1}
								alignItems={'center'}
							>
								<Typography
									variant={'h5'}
									fontWeight={'600'}
									color={'#3A3A3A'}
								>
									분야
								</Typography>
								<Typography variant={'h6'} color={'#3A3A3A'}>
									{mentoringData.CATEGORY}
								</Typography>
							</Box>
						</Box>
						<Box
							display={'flex'}
							flexDirection={'column'}
							mt={2}
							gap={3}
						>
							{mentoringData.MENTOR_INTRODUCE &&
								mentoringData.MENTOR_INTRODUCE != '' && (
									<Box
										display={'flex'}
										flexDirection={'column'}
										mt={2}
										gap={3}
									>
										<Typography
											variant={'h5'}
											fontWeight={'600'}
										>
											멘토 소개
										</Typography>
										<Typography
											variant={'body1'}
											alignSelf={'center'}
											sx={{
												lineHeight: '2',
											}}
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
										mt={2}
										gap={3}
									>
										<Typography
											variant={'h5'}
											fontWeight={'600'}
										>
											주요 경력
										</Typography>
										<Box alignSelf={'center'}>
											<SupportiViewer
												data={
													mentoringData.MENTOR_HISTORY
												}
											/>
										</Box>
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
								? () => {}
								: undefined
						}
					/>
				</Box>
			)}
			{scroll && (
				<Box
					sx={{
						width: { md: '100%', xs: '100%' },
						backgroundColor: 'secondary.light',
						// height: '150px',
						px: 5,
						py: 2,
						position: 'fixed',
						bottom: 0,
						right: 0,
						zIndex: 1,
						display: { md: 'block', xs: 'none' },
					}}
				>
					<Box
						display={'flex'}
						flexDirection={'row'}
						justifyContent={'center'}
						alignItems={'center'}
						gap={5}
					>
						<Box
							display={'flex'}
							flexDirection={'column'}
							alignItems={'center'}
							gap={1}
						>
							<Typography
								variant={'h5'}
								sx={{
									fontWeight: 'bold',
									color: '#3A3A3A',
								}}
							>
								{mentoringData?.TITLE}
							</Typography>
							<Typography
								variant={'subtitle2'}
								sx={{
									color: '#3A3A3A',
									alignSelf: 'end',
								}}
							>
								{mentoringData?.REAL_PRICE.toLocaleString()}원
							</Typography>
						</Box>
						<SupportiButton
							contents={'신청하기'}
							variant={'contained'}
							style={{
								width: '130px',
							}}
							onClick={() => {
								window.scrollTo(0, 0);
								if (access) {
									setOpenReservationSchedule(true);
								} else {
									setAlertModal(true);
									setAlertModalType('login');
								}
							}}
						/>
					</Box>
				</Box>
			)}
		</Box>
	);
};

export default Page;
