import React from 'react';

import { NextPage } from 'next';

import { Box, BoxProps, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import DefaultController from '@qillie-corp/ark-office-project/src/controller/default/DefaultController';
import moment from 'moment';
import SupportiButton from '../../../src/views/global/SupportiButton';
import ConsultingSchedular from '../../../src/views/local/external_service/consulting/ConsultingSchedular/ConsultingSchedular';

const Page: NextPage = () => {
	//* Modules
	const router = useRouter();
	//* Controller
	const consultingController = new DefaultController('ConsultingProduct');
	const consultingApplicationController = new DefaultController(
		'ConsultingApplication'
	);
	//* Constants
	const { pid } = router.query;
	//* States
	/**
	 * 컨설팅 데이터
	 */
	const [consultingData, setConsultingData] = React.useState<any>({});
	/**
	 * 예약 스케쥴 모달
	 */
	const [reservationScheduleModal, setReservationScheduleModal] =
		React.useState<boolean>(true);
	//* Functions
	/**
	 * 컨설팅 신청하기
	 */
	const applyConsulting = () => {
		consultingApplicationController.createItem(
			{
				CONSULTING_PRODUCT_IDENTIFICATION_CODE: pid,
			},
			(res) => {},
			(err) => {}
		);
	};
	//* Hooks
	/**
	 * 컨설팅 데이터 가져오기
	 */
	React.useEffect(() => {
		consultingController.getOneItem(
			{
				CONSULTING_PRODUCT_IDENTIFICATION_CODE: pid,
			},
			(res) => {
				setConsultingData(res.data.result);
			},
			(err) => {}
		);
	}, []);
	return (
		<Box width={'100%'} position={'relative'}>
			{/* 세미나 헤더 */}
			<Box
				width={'100%'}
				p={3}
				bgcolor={'#F5F5F5'}
				display={'flex'}
				justifyContent={'space-between'}
				alignItems={'center'}
			>
				<Typography variant={'h4'} fontWeight={'600'}>
					{consultingData.PRODUCT_NAME}
				</Typography>
				<Box display={'flex'} gap={3}>
					<Typography variant={'body1'}>
						{moment(consultingData.SEMINAR_DATE).format(
							'YYYY-MM-DD'
						)}
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
			>
				{consultingData.PRODUCT_DETAIL_IMAGE_LIST &&
					JSON.parse(consultingData.PRODUCT_DETAIL_IMAGE_LIST).map(
						(item, index) => {
							return (
								<Box key={index}>
									<img src={item} alt="" />
								</Box>
							);
						}
					)}
			</Box>
			{/* 스티키 버튼 */}
			<Box
				display={'flex'}
				width={'100%'}
				position={'fixed'}
				justifyContent={'center'}
				bottom={40}
				left={0}
			>
				<SupportiButton
					contents={'신청하기'}
					isGradient={true}
					onClick={() => applyConsulting()}
					style={{
						color: 'white',
						width: '200px',
					}}
				/>
			</Box>
			<ConsultingSchedular
				open={reservationScheduleModal}
				consultingData={consultingData}
			/>
		</Box>
	);
};

export default Page;
