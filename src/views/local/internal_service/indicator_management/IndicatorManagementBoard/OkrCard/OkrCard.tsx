import React, { useEffect } from 'react';

import { Box, BoxProps, Divider, Typography } from '@mui/material';
import SupportiProgressBar from '../../../../../global/SupportiProgressBar';
import { OkrDetailCard } from '../OkrDetailCard';
import { IOkrCombination } from '../../../../../../@types/model';
import DefaultController from '@leanoncompany/supporti-ark-office-project/src/controller/default/DefaultController';
import { randomColor } from '../../../../../../../configs/randomColorConfig';
import dayjs from 'dayjs';
import { OkrMoreModal } from '../OkrMoreModal';
import { v4 as uuidv4 } from 'uuid';

interface IOkrCardProps {
	data: IOkrCombination;
	setTriggerKey: React.Dispatch<React.SetStateAction<string>>;
	index?: number;
}

const OkrCard = (props: IOkrCardProps) => {
	//* Controllers

	//* Modules

	//* Constants

	//* States
	/**
	 * 상세 모달 오픈 여부
	 */
	const [isMoreModalOpen, setIsMoreModalOpen] = React.useState(false);

	const [okrMainData, setOkrMainData] = React.useState({
		TITLE: props.data.TITLE,
		START_DATE: props.data.START_DATE,
		END_DATE: props.data.END_DATE,
		NOTE: props.data.NOTE,
		OKR_MAIN_IDENTIFICATION_CODE:
			props.data['OKR_MAIN_IDENTIFICATION_CODE'],
		OkrDetails: props.data.OkrDetails,
		ACHIEVED_RATE: props.data.ACHIEVED_RATE,
	});

	const [okrDetailData, setOkrDetailData] = React.useState(
		props.data.OkrDetails
	);

	//* Functions
	//* 마감일 계산하는 함수
	const calcDeadline = (day) => {
		const Today = dayjs();

		const diff = Today.diff(day, 'day', true);
		const days = Math.floor(diff);

		return days > 0
			? '마감일 지남'
			: days === 0
			? '마감일'
			: days > -7
			? '마감일 임박'
			: '';
	};

	//* Hooks
	/**
	 *
	 * 프로그레스 바 달성률 데이터 셋팅
	 */
	const materialDataList = okrMainData?.OkrDetails.map((item, index) => {
		return {
			percentage:
				item.ACHIEVED_RATE > 100
					? Math.round(
							100 / okrMainData?.OkrDetails.length
					  ).toString()
					: Math.round(
							item.ACHIEVED_RATE / okrMainData?.OkrDetails.length
					  ).toString(),
			color: randomColor[index],
		};
	});

	//* Hooks

	/**
	 *
	 * 초기 데이터 셋팅
	 */
	useEffect(() => {
		setOkrMainData({
			TITLE: props.data.TITLE,
			START_DATE: props.data.START_DATE,
			END_DATE: props.data.END_DATE,
			NOTE: props.data.NOTE,
			OKR_MAIN_IDENTIFICATION_CODE:
				props.data['OKR_MAIN_IDENTIFICATION_CODE'],
			OkrDetails: props.data.OkrDetails,
			ACHIEVED_RATE: props.data.ACHIEVED_RATE,
		});
		setOkrDetailData(props.data.OkrDetails);
	}, [props.data]);

	/**
	 * 모달 온오프로 트리거 키 변경
	 */
	useEffect(() => {
		if (!isMoreModalOpen) {
			// props.setTriggerKey(uuidv4());
		}
	}, [isMoreModalOpen, props.setTriggerKey]);

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
				<Typography ml={1}>
					{calcDeadline(
						(okrMainData.END_DATE as string).split('T')[0]
					)}
				</Typography>
			</Box>

			{/** 달성률*/}
			<Box display="flex" flexDirection="column" gap={1}>
				<Box display="flex">
					<Typography fontWeight={600}>현재 달성률</Typography>
					<Typography ml={1} color={'primary.main'} fontWeight={600}>
						{okrMainData.ACHIEVED_RATE
							? okrMainData.ACHIEVED_RATE
							: 0}
						%
					</Typography>
				</Box>

				{/** 프로그레스 바 */}
				<SupportiProgressBar
					materialDataList={materialDataList}
					totalPercentage={okrMainData?.ACHIEVED_RATE}
				/>
			</Box>

			<Divider sx={{ my: 2 }} />

			{/** 하위 목표리스트 */}

			<Box width="100%">
				<Box display={'flex'} mb={1}>
					<Typography fontWeight={600}>하위목표</Typography>
					{/** 갯수 */}
					<Typography color="primary.main" ml={1} fontWeight={600}>
						{okrMainData?.OkrDetails.length}
					</Typography>
				</Box>

				{/** 하위 리스트들 카드로 출력 */}
				<Box
					display={'flex'}
					width="100%"
					gap={1}
					sx={{ overflowX: 'auto' }}
				>
					{okrMainData?.OkrDetails.map((item, index) => {
						return <OkrDetailCard data={item} index={index} />;
					})}
				</Box>
			</Box>
			{isMoreModalOpen && (
				<OkrMoreModal
					modalOpen={isMoreModalOpen}
					setModalOpen={setIsMoreModalOpen}
					okrMainData={okrMainData}
					setOkrMainData={setOkrMainData}
					okrDetailData={okrDetailData}
					setOkrDetailData={setOkrDetailData}
					materialDataList={materialDataList}
					setTriggerKey={props.setTriggerKey}
				/>
			)}
		</Box>
	);
};

export default OkrCard;
