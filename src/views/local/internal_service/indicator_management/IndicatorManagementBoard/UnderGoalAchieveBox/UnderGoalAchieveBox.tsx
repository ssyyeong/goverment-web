import React from 'react';

import { Box, BoxProps, Rating, Typography } from '@mui/material';
import { IOkrCombination } from '../../../../../../@types/model';
import DefaultController from '@leanoncompany/supporti-ark-office-project/src/controller/default/DefaultController';
import SupportiInput from '../../../../../global/SupportiInput';
import { useAppMember } from '../../../../../../hooks/useAppMember';
import { v4 as uuidv4 } from 'uuid';
import { SupportiAlertModal } from '../../../../../global/SupportiAlertModal';

interface IUnderGoalAchieveBoxProps {
	data: IOkrCombination;
	modalOpen?: boolean;
	setModalOpen?: any;
	setTriggerKey?: any;
}

const UnderGoalAchieveBox = (props: IUnderGoalAchieveBoxProps) => {
	//* Controllers
	/**
	 * OKR 컨트롤러
	 */
	const okrController = new DefaultController('OkrDetail');
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

	// okr 하위 목표 달성량 추가
	const updateOkr = (target) => {
		if (target === 'memo') {
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
					props.setTriggerKey && props.setTriggerKey(uuidv4());

					setAchieveAmount(undefined);
				},
				(err: any) => {
					setAlertType('failAxios');
					setIsAlertOpen(true);
				}
			);
		} else {
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
					props.setTriggerKey && props.setTriggerKey(uuidv4());

					setAchieveAmount(undefined);
				},
				(err: any) => {}
			);
		}
	};

	return (
		<Box display={'flex'} flexDirection={'column'} gap={2}>
			{/** 달성량 추가 */}
			<Box mt={1}>
				<Typography fontWeight={500} mb={1}>
					달성량 추가
				</Typography>
				<SupportiInput
					type="inputwithbtn"
					inputType="number"
					value={achieveAmount}
					setValue={(value) => {
						setAchieveAmount(value);
					}}
					placeholder="달성량 입력"
					width={'200px'}
					btnContent="달성량 추가"
					btnOnclick={() => {
						if(achieveAmount === undefined || achieveAmount === null || achieveAmount === '' || achieveAmount === 0) {
							alert("달성량을 정확히 입력해주세요.")
						}else updateOkr('achievedAmount');
					}}
					style={{
						bgcolor: 'white',
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
				btnOnclick={() => {
					updateOkr('memo');
				}}
				width={'100%'}
				placeholder="메모 입력"
				multiline={true}
				style={{
					bgcolor: 'white',
				}}
			/>
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
