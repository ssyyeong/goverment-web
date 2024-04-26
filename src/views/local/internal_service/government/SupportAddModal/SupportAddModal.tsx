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

interface ISupportAddModalProps {
	open: boolean;
	handleClose: () => void;
	setTriggerKey?: (key: string) => void;
}

const SupportAddModal = (props: ISupportAddModalProps) => {
	//* Controller

	//* Constants
	const PhaseConfig = [
		{
			label: 'Phase 1.',
			value: 'PHASE1',
		},
		{
			label: 'Phase 2.',
			value: 'PHASE2',
		},
	];

	//* State
	const [phase, setPhase] = React.useState(PhaseConfig[0]); //단계

	//* Function

	//* Hooks

	/**
	 * 유저 아이디 가져오는 훅
	 */
	const { memberId } = useAppMember();

	return (
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
			title="관리 지원사업 추가"
		>
			<Box
				px={2}
				width={'100%'}
				sx={{ overflowY: 'auto' }}
				maxHeight={'500px'}
				display="flex"
				flexDirection="column"
				gap={2}
			>
				<Typography fontWeight={700} variant="h5">
					단계를 선택해주세요
				</Typography>
				<Typography fontWeight={500} color="secondary.main">
					Phase 1. 지원루트, 제출 서류체크, 타임라인/데드라인 체크,
					지원금 계상방법 등에 따른 관리 기능 지원
				</Typography>
				<Typography fontWeight={500} color="secondary.main">
					Phase 2. 최종지원 후 선정에 따라 지원사업 진행을 서포트할 수
					있도록 전반적인 관리를 진행할 수 있도록 지원
				</Typography>

				{PhaseConfig.map((item, index) => {
					return (
						<Box
							display="flex"
							justifyContent={'space-between'}
							bgcolor={
								phase.label === item.label
									? 'primary.main'
									: 'secondary.light'
							}
							borderRadius={2}
							width="100%"
							alignItems={'center'}
							sx={{ cursor: 'pointer' }}
							onClick={() => {
								setPhase(item);
							}}
						>
							<Typography
								color={
									phase.label !== item.label
										? 'secondary.dark'
										: 'common.white'
								}
								fontWeight={600}
								ml={2}
							>
								{item.label}
							</Typography>
							<SupportiButton
								contents={'선택'}
								style={{
									color:
										phase.label !== item.label
											? 'secondary.dark'
											: 'common.white',
								}}
								onClick={() => {
									setPhase(item);
								}}
								variant={
									phase.label === item.label
										? 'contained'
										: 'text'
								}
							/>
						</Box>
					);
				})}

				<SupportiButton
					contents={`${phase.label} 으로 추가하기`}
					onClick={() => {
						router.push(
							`/internal_service/government/management/write?phase=${phase.value}`
						);
					}}
					style={{ width: '200px', mx: 'auto', my: 1 }}
					variant="contained"
				/>
			</Box>
		</SupportiModal>
	);
};

export default SupportAddModal;
