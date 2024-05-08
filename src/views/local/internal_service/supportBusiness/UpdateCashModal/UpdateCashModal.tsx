import React, { useEffect } from 'react';

import {
	Box,
	BoxProps,
	Grid,
	IconButton,
	Switch,
	Typography,
} from '@mui/material';
import SupportiModal from '../../../../global/SupportiModal';
import SupportiButton from '../../../../global/SupportiButton';
import { useAppMember } from '../../../../../hooks/useAppMember';
import { v4 as uuidv4 } from 'uuid';
import router from 'next/router';
import SupportiInput from '../../../../global/SupportiInput';

interface IUpdateCashModalProps {
	open: boolean;
	handleClose: () => void;
	updateHandler: () => void;
	targetItem: any;
	setTargetItem: any;
	subsidyTab: any;
	phase: string;
}

const UpdateCashModal = (props: IUpdateCashModalProps) => {
	//* Controller

	//* Constants

	//* State

	//* Function

	//* Hooks

	/**
	 * 유저 아이디 가져오는 훅
	 */
	const { memberId } = useAppMember();

	return (
		props.targetItem.cost &&
		props.subsidyTab && (
			<SupportiModal
				open={props.open}
				handleClose={() => {
					props.handleClose();
				}}
				style={{
					width: { sm: 'fit-content', xs: '100%' },
					maxWidth: { sm: '500px', xs: '100%' },
					maxHeight: '90%',
					height: 'fit-content',
				}}
				activeHeader={true}
				title={
					props.subsidyTab === '총 금액'
						? '항목별 금액'
						: props.subsidyTab
				}
				children={
					<Box
						px={2}
						width={'100%'}
						sx={{ overflowY: 'auto' }}
						maxHeight={'500px'}
						display="flex"
						flexDirection="column"
						gap={2}
					>
						{props.subsidyTab === '총 금액' &&
							props.phase === 'PHASE1' && (
								<Box>
									<Typography
										fontWeight={500}
										variant="h6"
										mb={2}
									>
										{props.targetItem.name} 총 금액
									</Typography>
									<SupportiInput
										type="text"
										value={
											JSON.parse(
												props.targetItem.cost
											)[0]?.['지원금'][props.subsidyTab] +
											JSON.parse(
												props.targetItem.cost
											)[0]?.['기업부담금'][
												props.subsidyTab
											]
										}
										setValue={(value) => {
											let temp = JSON.parse(
												props.targetItem.cost
											)[0];
											temp['지원금'][props.subsidyTab] =
												value *
												props.targetItem
													.support_cost_rate *
												0.01;
											temp['기업부담금'][
												props.subsidyTab
											] =
												value *
												props.targetItem
													.business_contribution_rate *
												0.01;

											props.setTargetItem({
												...props.targetItem,
												cost: JSON.stringify([temp]),
											});
										}}
									/>
								</Box>
							)}

						<Typography fontWeight={500} variant="h6">
							지원금
						</Typography>
						<SupportiInput
							type="text"
							value={
								JSON.parse(props.targetItem.cost)[0]?.[
									'지원금'
								][props.subsidyTab]
							}
							setValue={(value) => {
								let temp = JSON.parse(props.targetItem.cost)[0];
								temp['지원금'][props.subsidyTab] = value;
								props.setTargetItem({
									...props.targetItem,
									cost: JSON.stringify([temp]),
								});
							}}
							additionalProps={{
								readOnly:
									props.subsidyTab === '총 금액' && props.phase === 'PHASE1'
										? true
										: false,
							}}
						/>

						<Typography fontWeight={500} variant="h6">
							기업부담금
						</Typography>
						<SupportiInput
							type="text"
							additionalProps={{
								readOnly: 
									props.subsidyTab === '총 금액' && props.phase === 'PHASE1'
										? true
										: false,
							}}
							value={
								JSON.parse(props.targetItem.cost)[0]?.[
									'기업부담금'
								][props.subsidyTab]
							}
							setValue={(value) => {
								let temp = JSON.parse(props.targetItem.cost)[0];
								temp['기업부담금'][props.subsidyTab] = value;
								props.setTargetItem({
									...props.targetItem,
									cost: JSON.stringify([temp]),
								});
							}}
						/>

						<SupportiButton
							contents={'수정하기'}
							onClick={() => {
								props.updateHandler();
								props.handleClose();
							}}
							style={{ width: '200px', mx: 'auto', my: 1 }}
							variant="contained"
						/>
					</Box>
				}
			/>
		)
	);
};

export default UpdateCashModal;
