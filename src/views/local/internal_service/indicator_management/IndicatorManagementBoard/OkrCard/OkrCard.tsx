import React from 'react';

import { Box, BoxProps, Rating, Typography } from '@mui/material';
import SupportiProgressBar from '../../../../../global/SupportiProgressBar';
import { OkrDetailCard } from '../OkrDetailCard';
import { IOkrCombination } from '../../../../../../@types/model';
import DefaultController from '@qillie-corp/ark-office-project/src/controller/default/DefaultController';
import OkrModal from '../OkrModal/OkrModal';
import calculateAchieveRate from '../../../../../../function/calculateAchieveRate';
import { randomColor } from '../../../../../../../configs/randomColorConfig';

interface IOkrCardProps {
	data: IOkrCombination;
	mode?: string;
	index?: number;
	okrMainId: number;
}

const OkrCard = (props: IOkrCardProps) => {
	//* Controllers
	/**
	 * OKR 컨트롤러
	 */
	const okrController = new DefaultController('OkrMain');

	//* Modules

	//* Constants

	//* States
	/**
	 * 상세 모달 오픈 여부
	 */
	const [isMoreModalOpen, setIsMoreModalOpen] = React.useState(false);

	const [okrMainData, setOkrMainData] = React.useState(props.data);
	const [okrDetailData, setOkrDetailData] = React.useState(
		props.data.OkrDetails
	);

	//* Functions

	//* Hooks
	// React.useEffect(() => {
	// 	okrController
	// 		.getOneItem({
	// 			APP_MEMBER_IDENTIFICATION_CODE: 1,
	// 			OKR_MAIN_IDENTIFICATION_CODE: props.okrMainId,
	// 		})
	// 		.then((res) => {
	// 			console.log(res);
	// 			// setOkrMainData(res);
	// 		})
	// 		.catch((err) => {
	// 			console.log(err);
	// 		});
	// }, []);

	console.log(props.data, props.data.OkrDetails, okrDetailData);
	const materialDataList = okrDetailData.map((item, index) => {
		return {
			percentage: Math.round(
				((Number(item.ACHIEVED_AMOUNT) / Number(item.TARGET_AMOUNT)) *
					100) /
					okrDetailData.length
			).toString(),
			color: randomColor[index],
		};
	});

	return (
		<Box
			borderRadius={2}
			bgcolor={'white'}
			p={3}
			display="flex"
			flexDirection={'column'}
			gap={2}
			boxShadow={'0 3px 15px 0 #e1eaff'}
			mb={2}
		>
			<Box display={'flex'} justifyContent={'space-between'}>
				<Typography variant="h3" fontWeight={'bold'}>
					{okrMainData.TITLE}
				</Typography>
				{/** 상세보기 */}
				<Box display="flex" onClick={() => setIsMoreModalOpen(true)}>
					<Typography fontWeight={500} width="48px" m={1}>
						상세보기
					</Typography>
					<img
						src="/images/icons/ArrowIcon.svg"
						alt="arrow-icon"
						style={{ cursor: 'pointer' }}
					/>
				</Box>
			</Box>
			{/** 기간 */}
			<Box display={'flex'}>
				<Typography fontWeight={500} color={'secondary.main'}>
					{(okrMainData.START_DATE as string).split('T')[0]}
				</Typography>
				<Typography
					ml={0.5}
					mr={0.5}
					fontWeight={500}
					color={'secondary.main'}
				>
					~
				</Typography>
				<Typography fontWeight={500} color={'secondary.main'}>
					{(okrMainData.END_DATE as string).split('T')[0]}
				</Typography>

				{/** 마감 상태 (마감일 임박, 마감일 지남, 마감일) */}
				<Typography></Typography>
			</Box>

			{/** 달성률*/}
			<Box display="flex" flexDirection="column" gap={1}>
				<Box display="flex">
					<Typography>현재 달성률</Typography>
					<Typography ml={1} color={'primary.main'}>
						{calculateAchieveRate(okrDetailData)} %
					</Typography>
				</Box>

				{/** 프로그레스 바 */}
				<SupportiProgressBar materialDataList={materialDataList} />
			</Box>

			{/** 하위 목표리스트 */}

			<Box>
				<Box display={'flex'} mb={1}>
					<Typography fontWeight={600}>하위목표</Typography>
					{/** 갯수 */}
					<Typography color="primary.main" ml={1} fontWeight={600}>
						{okrDetailData.length}
					</Typography>
				</Box>

				{/** 하위 리스트들 카드로 출력 */}
				<Box display={'flex'} width="100%" gap={1} sx={{overflowX: 'scroll'}}>
					{okrDetailData.map((item, index) => {
						return <OkrDetailCard data={item} index={index} />;
					})}
				</Box>
			</Box>
			{isMoreModalOpen && (
				<OkrModal
					mode={'detail'}
					modalOpen={isMoreModalOpen}
					setModalOpen={setIsMoreModalOpen}
					okrMainData={okrMainData}
					setOkrMainData={setOkrMainData}
					okrDetailData={okrDetailData}
					setOkrDetailData={setOkrDetailData}
					materialDataList={materialDataList}
				/>
			)}
		</Box>
	);
};

export default OkrCard;
