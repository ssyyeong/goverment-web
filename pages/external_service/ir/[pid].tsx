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
import { useSubscription } from '../../../src/hooks/useSubscription';
import VerticalAlignBottomIcon from '@mui/icons-material/VerticalAlignBottom';
import VerticalAlignTopIcon from '@mui/icons-material/VerticalAlignTop';

const Page: NextPage = () => {
	//* Modules
	const router = useRouter();
	//* Controller
	const irController = new DefaultController('IrProduct');
	const irApplicationController = new DefaultController('IrApplication');
	const appMemberController = new DefaultController('AppMember');

	//* Constants

	//* States
	/**
	 * IR 데이터
	 */
	const [irData, setIrData] = React.useState<any>({});
	/**
	 * 구독 알럿 모달
	 */
	// const [subscriptionAlertModal, setSubscriptionAlertModal] =
	// 	React.useState<boolean>(false);

	/**
	 * 신청 기간 알럿 모달
	 */
	const [irFinishAlertModal, setIrFinishAlertModal] =
		React.useState<boolean>(false);

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
	// const { subscriptionInfo } = useSubscription({ memberId: memberId });

	/**
	 * IR 신청 버튼 클릭시
	 */
	const handleApplyir = () => {
		if (!access) {
			alert('로그인이 필요합니다!');
			return;
		}

		// 싡청 가능한 기간이 지났을 시
		if (moment(irData?.DUE_DATE).isBefore(moment())) {
			setIrFinishAlertModal(true);
			return;
		}

		// 구독권이 없을 시
		// if (subscriptionInfo === undefined) {
		// 	setSubscriptionAlertModal(true);

		// 	if (
		// 		subscriptionInfo !== undefined &&
		// 		Object.keys(subscriptionInfo).length !== 0
		// 	) {
		// 		if (
		// 			!(
		// 				subscriptionInfo?.SubscriptionProduct?.TYPE ===
		// 					'BLACK' ||
		// 				subscriptionInfo?.SubscriptionProduct?.TYPE ===
		// 					'PRODUCT'
		// 			)
		// 		) {
		// 			alert('구독권 구매 권장');
		// 			return;
		// 		}
		// 	}
		// }

		setOpenApplicationModal(true);
	};

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
			px={{
				xs: 2,
				md: 5,
			}}
			minHeight={'90vh'}
		>
			{/* <Box display="flex" ml="80%">
				<Typography variant="h5" fontWeight={600}>
					바로 신청하고 싶다면?
				</Typography>
				<Box
					width="80px"
					display="flex"
					flexDirection={'column'}
					gap={1}
					alignItems={'center'}
					sx={{
						borderRadius: '10%',
						cursor: 'pointer',
						width: {
							md: '80px',
							xs: '50px',
						},
						height: {
							md: '60px',
							xs: '50px',
						},
					}}
					onClick={() => {
						window.scrollTo({
							top: 10200,
							left: 0,
							behavior: 'smooth',
						});
					}}
				>
					<VerticalAlignBottomIcon sx={{ color: 'black' }} />
					<Typography
						variant="subtitle1"
						fontWeight={500}
						sx={{ color: 'black' }}
					>
						맨 아래로
					</Typography>
				</Box>
			</Box> */}
			<Box
				display="flex"
				justifyContent={'space-between'}
				sx={{
					mt: {
						md: 3,
						xs: 1,
					},
				}}
			>
				{/* <Box
					width="80px"
					display="flex"
					flexDirection={'column'}
					gap={1}
					alignItems={'center'}
					sx={{
						borderRadius: '10%',
						cursor: 'pointer',
						width: {
							md: '80px',
							xs: '50px',
						},
						height: {
							md: '60px',
							xs: '50px',
						},
					}}
					onClick={() => {
						window.scrollTo({
							top: 0,
							left: 0,
							behavior: 'smooth',
						});
					}}
				>
					<VerticalAlignTopIcon sx={{ color: 'black' }} />
					<Typography sx={{ color: 'black' }} fontWeight="500">
						맨 위로
					</Typography>
				</Box> */}
				<Box />
				<Box
					width="80px"
					display="flex"
					flexDirection={'column'}
					gap={1}
					alignItems={'center'}
					sx={{
						borderRadius: '10%',
						cursor: 'pointer',
						width: {
							md: '80px',
							xs: '50px',
						},
						height: {
							md: '60px',
							xs: '50px',
						},
					}}
					onClick={() => {
						window.scrollTo({
							top: 10200,
							left: 0,
							behavior: 'smooth',
						});
					}}
				>
					<VerticalAlignBottomIcon sx={{ color: 'black' }} />
					<Typography
						sx={{
							color: 'black',
							display: {
								md: 'block',
								xs: 'none',
							},
						}}
						fontWeight="500"
					>
						맨 아래로
					</Typography>
				</Box>
			</Box>
			{/* IR 내용 */}
			<Box
				display={'flex'}
				width={'100%'}
				flexDirection={'column'}
				alignItems={'center'}
				sx={{
					mt: {
						md: 3,
						xs: 1,
					},
				}}
				height={'auto'}
				position={'relative'}
			>
				{irData?.IMAGE_LIST &&
					JSON.parse(irData?.IMAGE_LIST).map((item, index) => {
						return (
							<Box key={index}>
								<img src={item} alt="" />
							</Box>
						);
					})}
				{/* 스티키 버튼 */}
				{/* <Box
					height={'50px'}
					// position="absolute"
					// right="20px"
				> */}
				<Box
					width={'100%'}
					justifyContent="space-between"
					// bgcolor={'red'}
					sx={{
						// position: 'sticky',
						// position: 'fixed',
						// bottom: '0px',
						// bottom: { md: '320px', xs: '400px' },
						display: 'flex',
						// pr: { md: 10, xs: 5 },
					}}
				>
					<Box />
					<SupportiButton
						contents={'IR 신청하기'}
						style={{
							bgcolor: 'primary.main',
							my: 3,
							color: 'white',
							height: '50px',
							ml: {
								md: '80px',
								xs: '50px',
							},
							width: {
								md: '200px',
								xs: '100px',
							},
						}}
						variant="contained"
						onClick={() => handleApplyir()}
					/>
					<Box display="flex" mt={3}>
						<Box
							width="80px"
							display="flex"
							flexDirection={'column'}
							gap={1}
							alignItems={'center'}
							sx={{
								borderRadius: '10%',
								cursor: 'pointer',
								width: {
									md: '80px',
									xs: '50px',
								},
								height: {
									md: '60px',
									xs: '50px',
								},
							}}
							onClick={() => {
								window.scrollTo({
									top: 0,
									left: 0,
									behavior: 'smooth',
								});
							}}
						>
							<VerticalAlignTopIcon sx={{ color: 'black' }} />
							<Typography
								sx={{
									color: 'black',
									display: {
										md: 'block',
										xs: 'none',
									},
								}}
								fontWeight="500"
							>
								맨 위로
							</Typography>
						</Box>
						{/* <Box
							width="80px"
							display="flex"
							flexDirection={'column'}
							gap={1}
							alignItems={'center'}
							sx={{
								borderRadius: '10%',
								cursor: 'pointer',
								width: {
									md: '80px',
									xs: '50px',
								},
								height: {
									md: '60px',
									xs: '50px',
								},
							}}
							onClick={() => {
								window.scrollTo({
									top: 10200,
									left: 0,
									behavior: 'smooth',
								});
							}}
						>
							<VerticalAlignBottomIcon sx={{ color: 'black' }} />
							<Typography
								sx={{ color: 'black' }}
								fontWeight="500"
							>
								맨 아래로
							</Typography>
						</Box> */}
					</Box>
					{/* <SupportiButton
						contents={'신청'}
						isGradient={true}
						onClick={() => handleApplyir()}
						style={{
							color: 'white',
							// width: '100px',
							// height: '100px',
							borderRadius: '50%',
							width: {
								md: '100px',
								xs: '70px',
							},
							height: {
								md: '100px',
								xs: '70px',
							},
						}}
					/> */}
				</Box>
				{/* </Box> */}

				{/* <SupportiAlertModal
					type={'subscribe'}
					open={subscriptionAlertModal}
					handleClose={() => setSubscriptionAlertModal(false)}
				/> */}
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
				irProductId={irData?.IR_PRODUCT_IDENTIFICATION_CODE}
				memberId={memberId}
				adoptionDate={irData?.ADOPTION_DATE}
				irDate={irData?.IR_DATE}
				mode="create"
			/>
		</Box>
	);
};

export default Page;
