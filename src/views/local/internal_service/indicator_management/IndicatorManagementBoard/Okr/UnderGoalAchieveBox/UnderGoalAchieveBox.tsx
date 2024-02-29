import React from 'react';

import { Box, BoxProps, Rating, Typography } from '@mui/material';
import { IOkrCombination } from '../../../../../../../@types/model';
import DefaultController from '@leanoncompany/supporti-ark-office-project/src/controller/default/DefaultController';
import SupportiInput from '../../../../../../global/SupportiInput';
import { useAppMember } from '../../../../../../../hooks/useAppMember';
import { SupportiAlertModal } from '../../../../../../global/SupportiAlertModal';

interface IUnderGoalAchieveBoxProps {
	data: IOkrCombination;
	getOkrMain: any;
	isStartDateAfterToday: boolean;
}

const UnderGoalAchieveBox = (props: IUnderGoalAchieveBoxProps) => {
	//* Controllers
	/**
	 * OKR 컨트롤러
	 */
	const okrController = new DefaultController('OkrDetail');
	/**
	 *
	 * OKR 달성량 컨트롤러
	 */
	const okrAchievedAmountController = new DefaultController(
		'OkrAchievedAmountHistory'
	);
	//* Modules

	//* Constants

	//* States
	/**
	 *
	 * 달성량
	 */
	const [achieveAmount, setAchieveAmount] = React.useState(undefined);

	/**
	 * 메모
	 */
	const [note, setNote] = React.useState(
		props.data.NOTE !== '' ? props.data.NOTE : ''
	);

	/**
	 *
	 * 알럿창 오픈 여부
	 */
	const [isAlertOpen, setIsAlertOpen] = React.useState(false);

	/**
	 *
	 * 알럿창 타입
	 */
	const [alertType, setAlertType] = React.useState(undefined);

	//* Hooks
	/**
	 * 유저 아이디 가져오는 훅
	 */
	const { memberId } = useAppMember();

	//* Functions

	// okr 하위 목표 메모, 달성량 추가
	const updateOkr = (target) => {
		if (target === 'memo') {
			/**
			 * 메모 추가
			 */
			okrController.updateItem(
				Object.assign({
					APP_MEMBER_IDENTIFICATION_CODE: memberId,
					OKR_DETAIL_IDENTIFICATION_CODE:
						props.data['OKR_DETAIL_IDENTIFICATION_CODE'],
					NOTE: note,
				}),
				(response: any) => {
					setAlertType('successModifyAxios');
					setIsAlertOpen(true);

					props.getOkrMain();
					setAchieveAmount('');
				},
				(err: any) => {
					setAlertType('failAxios');
					setIsAlertOpen(true);
				}
			);
		} else {
			/**
			 * 달성량 추가
			 */
			okrAchievedAmountController.createItem(
				{
					APP_MEMBER_IDENTIFICATION_CODE: memberId,
					OKR_DETAIL_IDENTIFICATION_CODE:
						props.data['OKR_DETAIL_IDENTIFICATION_CODE'],
					AMOUNT: achieveAmount,
					UNIT: props.data['TARGET_UNIT'],
				},
				(response: any) => {
					setAlertType('successCreateAxios');
					setIsAlertOpen(true);
					props.getOkrMain();

					setAchieveAmount('');
				},
				(err: any) => {}
			);
		}
	};

	return (
		<Box display={'flex'} flexDirection={'column'} gap={2}>
			{/** 달성량 추가 */}
			<Box>
				<Typography fontWeight={600} mb={1}>
					달성량 추가
				</Typography>
				<SupportiInput
					type="inputwithbtn"
					inputType="number"
					value={achieveAmount}
					setValue={(value) => {
						setAchieveAmount(value);
					}}
					additionalProps={{
						placeholder: '달성량 입력',
					}}
					width={'200px'}
					btnContent="달성량 추가"
					btnOnClick={() => {
						if (props.isStartDateAfterToday) {
							alert('해당하는 기간 내에만 입력하실 수 있습니다.');
							setAchieveAmount('');
							return;
						}
						if (
							achieveAmount === undefined ||
							achieveAmount === null ||
							achieveAmount === '' ||
							achieveAmount === 0
						) {
							alert('달성량을 정확히 입력해주세요.');
						} else updateOkr('achievedAmount');
					}}
					style={{
						bgcolor: 'white',
						// ':hover': {
						// 	bgcolor: 'secondary.main',
						// 	color: 'white',
						// },
					}}
				/>
			</Box>
			{/** 메모 입력 */}
			<SupportiInput
				type="inputwithbtn"
				value={note}
				setValue={(value) => {
					setNote(value);
				}}
				btnContent="등록하기"
				btnOnClick={() => {
					updateOkr('memo');
				}}
				width={'100%'}
				additionalProps={{
					placeholder: '메모 입력',
					multiline: true,
				}}
				style={{
					bgcolor: 'white',
				}}
			/>

			{/**알럿 */}
			<SupportiAlertModal
				open={isAlertOpen}
				handleClose={() => {
					setIsAlertOpen(false);
				}}
				type={alertType}
			/>
		</Box>
	);
};

export default UnderGoalAchieveBox;
