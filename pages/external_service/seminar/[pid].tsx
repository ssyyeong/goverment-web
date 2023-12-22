import React, { useEffect } from 'react';

import { NextPage } from 'next';

import { Box, BoxProps, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import DefaultController from '@qillie-corp/ark-office-project/src/controller/default/DefaultController';
import moment from 'moment';
import SupportiButton from '../../../src/views/global/SupportiButton';
import { SupportiAlertModal } from '../../../src/views/global/SupportiAlertModal';
import { useUserAccess } from '../../../src/hooks/useUserAccess';
import { useAppMember } from '../../../src/hooks/useAppMember';

const Page: NextPage = () => {
	//* Modules
	const router = useRouter();
	//* Controller
	const seminarController = new DefaultController('SeminarProduct');
	const seminarApplicationController = new DefaultController(
		'SeminarApplication'
	);
	const appMemberController = new DefaultController('AppMember');
	//* Constants
	const { pid } = router.query;
	//* States
	/**
	 * 세미나 데이터
	 */
	const [seminarData, setSeminarData] = React.useState<any>({});
	/**
	 * 알럿 모달
	 */
	const [alertModal, setAlertModal] = React.useState<boolean>(false);
	/**
	 * 알럿 모달 타입
	 */
	const [alertModalType, setAlertModalType] = React.useState<
		| 'success'
		| 'login'
		| 'subscribe'
		| 'point'
		| 'already'
		| 'seminarexceed'
	>('success');

	//* Hooks
	const { access } = useUserAccess('SIGN_IN');
	/**
	 * 유저 아이디 가져오는 훅
	 */
	const { memberId } = useAppMember();
	//* Functions
	/**
	 * 세미나 신청하기
	 */
	const applySeminar = () => {
		if (!access) {
			setAlertModal(true);
			setAlertModalType('login');
			return;
		}
		appMemberController.getData(
			{},
			`${appMemberController.mergedPath}/profile`,
			(res) => {
				if (res.data.result !== null) {
					seminarApplicationController.createItem(
						{
							SEMINAR_PRODUCT_IDENTIFICATION_CODE: pid,
							APP_MEMBER_IDENTIFICATION_CODE: memberId,
							NAME: res.data.result.FULL_NAME,
							PHONE: res.data.result.PHONE_NUMBER,
							EMAIL: res.data.result.USER_NAME,
						},
						(res) => {
							setAlertModal(true);
							setAlertModalType('success');
						},
						(err) => {
							console.log(err.response);
							if (
								err.response.data.message ===
								'구독 회원만 이용 가능합니다.'
							) {
								setAlertModal(true);
								setAlertModalType('subscribe');
								return;
							}
							if (
								err.response.data.message ===
								'신청 내역이 존재합니다.'
							) {
								setAlertModal(true);
								setAlertModalType('already');
								return;
							}
							if (
								err.response.data.message ===
								'포인트가 부족합니다.'
							) {
								setAlertModal(true);
								setAlertModalType('point');
								return;
							}
							if (
								err.response.data.message ===
								'정원이 초과되었습니다.'
							) {
								setAlertModal(true);
								setAlertModalType('seminarexceed');
								return;
							}
						}
					);
				} else {
				}
			}
		);
	};

	//* Hooks
	/**
	 * 세미나 데이터 조회
	 */
	useEffect(() => {
		if (pid !== undefined) {
			seminarController.getOneItem(
				{ SEMINAR_PRODUCT_IDENTIFICATION_CODE: pid },
				(res) => {
					setSeminarData(res.data.result);
				},
				(err) => {}
			);
		}
	}, [pid]);

	return (
		<Box
			width={'100%'}
			p={{
				xs: 2,
				md: 10,
			}}
			minHeight={'90vh'}
		>
			{/* 세미나 헤더 */}
			<Box
				width={'100%'}
				p={3}
				bgcolor={'primary.light'}
				display={{ xs: 'block', md: 'flex' }}
				justifyContent={'space-between'}
				alignItems={'center'}
				borderRadius={2}
			>
				<Typography variant={'h4'} fontWeight={'600'}>
					{seminarData.PRODUCT_NAME}
				</Typography>
				<Box display={'flex'} gap={3}>
					<Typography variant={'body1'}>
						{moment(seminarData.SEMINAR_DATE).format('YYYY-MM-DD')}
					</Typography>
					<Typography variant={'body1'}>
						정원 : {seminarData.PERSONNEL}명
					</Typography>
				</Box>
			</Box>
			{/* 세미나 내용 */}
			<Box
				display={'flex'}
				width={'100%'}
				flexDirection={'column'}
				alignItems={'center'}
				mt={3}
				height={'auto'}
				position={'relative'}
			>
				{seminarData.PRODUCT_DETAIL_IMAGE_LIST &&
					JSON.parse(seminarData.PRODUCT_DETAIL_IMAGE_LIST).map(
						(item, index) => {
							return (
								<Box key={index}>
									<img src={item} alt="" />
								</Box>
							);
						}
					)}
				{/* 스티키 버튼 */}

				<Box
					width={'100%'}
					justifyContent={'center'}
					// bgcolor={'red'}
					sx={{
						position: 'sticky',
						display: 'flex',
						top: 0,
					}}
					height={40}
				>
					<SupportiButton
						contents={'신청하기'}
						isGradient={true}
						onClick={() => applySeminar()}
						style={{
							color: 'white',
							width: '200px',
						}}
					/>
				</Box>
			</Box>

			<SupportiAlertModal
				type={alertModalType}
				open={alertModal}
				handleClose={() => setAlertModal(false)}
			/>
		</Box>
	);
};

export default Page;
