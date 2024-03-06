import React, { useEffect, useState } from 'react';

import { Box, BoxProps, Rating, Typography } from '@mui/material';
import SupportiModal from '../../../../../../global/SupportiModal';
import SupportiInput from '../../../../../../global/SupportiInput';
import SupportiButton from '../../../../../../global/SupportiButton';
import { useAppMember } from '../../../../../../../hooks/useAppMember';
import DefaultController from '@leanoncompany/supporti-ark-office-project/src/controller/default/DefaultController';
import { KpiController } from '../../../../../../../controller/KpiController';

interface IKpiAddAchievementModalProps {
	modalOpen: boolean;
	setModalOpen: React.Dispatch<boolean>;
	kpiId: string | number;
	title: string;
}

const KpiAddAchievementModal = (props: IKpiAddAchievementModalProps) => {
	//* Controllers
	const kpiController = new KpiController();

	//* Modules

	//* Constants
	const Months = [
		'1월',
		'2월',
		'3월',
		'4월',
		'5월',
		'6월',
		'7월',
		'8월',
		'9월',
		'10월',
		'11월',
		'12월',
	];

	const monthsToSelectFormat = Months.map((month, index) => {
		return {
			value: month,
			label: month,
		};
	});

	//* Hooks
	/**
	 * 유저 아이디 가져오는 훅
	 */
	const { memberId } = useAppMember();

	//* States
	const [achieveData, setAchieveData] = useState({
		MONTH: monthsToSelectFormat[0].value,
		AMOUNT: undefined,
	});

	//* Functions
	const kpiAchievementAdd = () => {
		kpiController.updateAchievement(
			{
				MONTH: achieveData.MONTH.split('월')[0],
				KPI_IDENTIFICATION_CODE: props.kpiId,
			},
			{
				AMOUNT: achieveData.AMOUNT,
			},
			(res) => {},
			(err) => {}
		);
	};
	//* Hooks
	useEffect(() => {
		if (props.modalOpen) {
			setAchieveData({
				MONTH: monthsToSelectFormat[0].value,
				AMOUNT: undefined,
			});
		}
	}, [props.modalOpen]);

	return (
		<Box>
			<SupportiModal
				open={props.modalOpen}
				handleClose={() => {
					props.setModalOpen(false);
				}}
				title={'달성값 등록'}
				style={{
					width: { xs: '100%', md: '40%' },
				}}
				activeHeader={true}
				children={
					<Box
						display={'flex'}
						flexDirection={'column'}
						gap={5}
						maxHeight={'70vh'}
						overflow={'auto'}
						sx={{
							width: { xs: '100%', md: '98%' },
							'-ms-overflow-style': 'none',
							'&::-webkit-scrollbar': {
								width: '6px',
								height: '5px !important',
								backgroundColor: 'white !important',
								padding: '1px',
								borderRadius: '20px',
							},
							'&::-webkit-scrollbar-thumb': {
								backgroundColor: '#b0b5c2',
								borderRadius: '20px',
							},
						}}
					>
						<Box>
							<Typography fontWeight={500} mb={1.5}>
								KPI 목표
							</Typography>
							<Typography fontWeight={600} mb={1.5} variant="h5">
								{props.title}
							</Typography>
						</Box>

						<Box>
							<Typography fontWeight={500} mb={1.5}>
								달성값 입력 달
							</Typography>
							<SupportiInput
								type="select"
								dataList={monthsToSelectFormat}
								value={achieveData.MONTH}
								additionalProps={{
									placeholder: '달성달을 선택해주세요.',
									defaultValue: achieveData.MONTH,
								}}
								setValue={(value) => {
									setAchieveData({
										...achieveData,
										MONTH: value,
									});
								}}
								width={'150px'}
							/>
						</Box>

						<Box>
							<Typography fontWeight={500} mb={1.5}>
								달성값
							</Typography>
							<SupportiInput
								type="number"
								value={achieveData.AMOUNT}
								additionalProps={{
									placeholder: '달성값 입력',
								}}
								setValue={(value) => {
									setAchieveData({
										...achieveData,
										AMOUNT: value,
									});
								}}
								width={'200px'}
							/>
						</Box>
						{/** 수정시 등록 버튼 */}
						<SupportiButton
							contents={'등록하기'}
							onClick={() => {
								kpiAchievementAdd();
							}}
							style={{
								height: '50px',
								width: { xs: '100%', md: '260px' },
								marginLeft: 'auto',
								marginRight: 'auto',
							}}
							color={'primary'}
							variant="contained"
							isGradient={true}
						/>
					</Box>
				}
			/>
		</Box>
	);
};

export default KpiAddAchievementModal;
