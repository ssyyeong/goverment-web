import React from 'react';

import { Box, BoxProps, Rating, Typography } from '@mui/material';
import { IOkrCombination } from '../../../../../../@types/model';
import DefaultController from '@qillie-corp/ark-office-project/src/controller/default/DefaultController';
import SupportiInput from '../../../../../global/SupportiInput';
import { useAppMember } from '../../../../../../hooks/useAppMember';

interface IAchieveBoxProps {
	data: IOkrCombination;
	modalOpen?: boolean;
	setModalOpen?: any;
}

const AchieveBox = (props: IAchieveBoxProps) => {
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
	const [achieveAmount, setAchieveAmount] = React.useState(0);

	/**
	 * 메모
	 */
	const [note, setNote] = React.useState(
		props.data.NOTE !== '' ? props.data.NOTE : ''
	);
	//* Hooks
	/**
	 * 유저 아이디 가져오는 훅
	 */
	const { memberId } = useAppMember();
	//* Functions
	console.log(memberId);
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
					alert('수정 성공');
					props.setModalOpen(!props.modalOpen);
					setAchieveAmount(0);
				},
				(err: any) => {}
			);
		} else {
			okrAchievedAmountController.createItem({
				APP_MEMBER_IDENTIFICATION_CODE: memberId,
				OKR_DETAIL_IDENTIFICATION_CODE:
					props.data['OKR_DETAIL_IDENTIFICATION_CODE'],
				AMOUNT: achieveAmount,
				UNIT: props.data['TARGET_UNIT'],
			});
		}
	};

	console.log(props.data, props.data.OkrDetails);

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
					defaultValue={'0'}
					placeholder="달성량 입력"
					width={'200px'}
					btnContent="달성량 추가"
					btnOnclick={() => {
						updateOkr('achievedAmount');
					}}
					style={{
						bgcolor: 'white',
					}}
				/>
			</Box>
			{/** 메모 입력 */}
			<SupportiInput
				type="inputwithbtn"
				value={props.data.NOTE !== '' ? props.data.NOTE : note}
				setValue={(value) => {
					setNote(value);
				}}
				btnContent="등록하기"
				btnOnclick={() => {
					updateOkr('memo');
				}}
				width={'100%'}
				placeholder="메모 입력"
				style={{
					bgcolor: 'white',
				}}
			/>
		</Box>
	);
};

export default AchieveBox;
