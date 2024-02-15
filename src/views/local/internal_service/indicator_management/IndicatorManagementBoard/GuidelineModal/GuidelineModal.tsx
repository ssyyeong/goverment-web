import React, { useState } from 'react';

import { Box, BoxProps, Divider, Rating, Typography } from '@mui/material';
import SupportiModal from '../../../../../global/SupportiModal';
import SupportiInput from '../../../../../global/SupportiInput';
import SupportiButton from '../../../../../global/SupportiButton';

import DefaultController from '@leanoncompany/supporti-ark-office-project/src/controller/default/DefaultController';
import { useAppMember } from '../../../../../../hooks/useAppMember';
import LooksOneIcon from '@mui/icons-material/LooksOne';
import LooksTwoIcon from '@mui/icons-material/LooksTwo';
import Looks3Icon from '@mui/icons-material/Looks3';
import Looks4Icon from '@mui/icons-material/Looks4';
import Looks5Icon from '@mui/icons-material/Looks5';
import Looks6Icon from '@mui/icons-material/Looks6';
import NewReleasesOutlinedIcon from '@mui/icons-material/NewReleasesOutlined';
import DoneOutlinedIcon from '@mui/icons-material/DoneOutlined';

import { v4 as uuidv4 } from 'uuid';
import { SupportiAlertModal } from '../../../../../global/SupportiAlertModal';

interface IGuidelineModalProps {
	modalOpen: boolean;
	setModalOpen: React.Dispatch<boolean>;
}

const GuidelineModal = (props: IGuidelineModalProps) => {
	//* Controllers

	//* Modules

	//* Constants

	//* Hooks
	/**
	 * 유저 아이디 가져오는 훅
	 */
	const { memberId } = useAppMember();

	//* States

	/**
	 * 알럿
	 */
	const [alertModal, setAlertModal] = React.useState<boolean>(false);

	//* Functions

	//* Hooks

	return (
		<Box>
			<SupportiModal
				open={props.modalOpen}
				handleClose={() => {
					props.setModalOpen(false);
				}}
				title={'지표 관리 가이드라인'}
				style={{
					width: { xs: '100%', md: '55%' },
					pt: 5,
				}}
				activeHeader={false}
				children={
					<Box
						display={'flex'}
						flexDirection={'column'}
						gap={5}
						minHeight={'70vh'}
						maxHeight={'85vh'}
						overflow={'auto'}
						sx={{
							width: { xs: '100%', md: '98%' },
							p: 3,
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
						{/** 1번 */}
						<Box display={'flex'} gap={1}>
							<LooksOneIcon sx={{ color: 'secondary.dark' }} />
							<Typography variant="subtitle1" fontWeight={600}>
								OKR 등록
							</Typography>
						</Box>
						<img
							src="/images/main/지표 관리 샘플.png"
							alt="sample"
						/>
						{/** 2번 */}
						<Box display={'flex'} gap={1}>
							<LooksTwoIcon sx={{ color: 'secondary.dark' }} />
							<Typography
								variant="subtitle1"
								fontWeight={600}
								sx={{ wordBreak: 'keep-all' }}
							>
								상세보기 클릭 후 하위 목표 달성량 등록
							</Typography>
						</Box>
						<img
							src="/images/main/달성량 등록 샘플.png"
							alt="sample"
						/>
						{/** 3번 */}
						<Box display={'flex'} gap={1}>
							<Looks3Icon sx={{ color: 'secondary.dark' }} />
							<Typography
								variant="subtitle1"
								fontWeight={600}
								sx={{ wordBreak: 'keep-all' }}
							>
								총 달성률 확인
							</Typography>
						</Box>
						<img src="/images/main/달성률 샘플.png" alt="sample" />

						{/** 참고사항 */}
						<Box display={'flex'} gap={1} mt={5}>
							<NewReleasesOutlinedIcon
								sx={{ color: 'primary.main' }}
							/>
							<Typography
								variant="subtitle1"
								fontWeight={600}
								sx={{ wordBreak: 'keep-all' }}
							>
								참고사항
							</Typography>
						</Box>

						<Box display={'flex'} gap={1} mt={-2} ml={2}>
							<DoneOutlinedIcon
								sx={{ color: 'secondary.main' }}
							/>
							<Typography
								variant="subtitle1"
								fontWeight={500}
								sx={{ wordBreak: 'keep-all' }}
							>
								등록한 OKR의 마감일자가 지났거나, 달성률이
								100%를 도달할 시 완료 처리 됩니다.
							</Typography>
						</Box>
						<img
							src="/images/main/완료된 지표 샘플.png"
							alt="sample"
						/>
						<Box display={'flex'} gap={1} mt={-1} ml={2}>
							<DoneOutlinedIcon
								sx={{ color: 'secondary.main' }}
							/>
							<Typography
								variant="subtitle1"
								fontWeight={500}
								sx={{ wordBreak: 'keep-all' }}
							>
								메모를 등록하여 등록한 메인 OKR을 쉽게 관리하실
								수 있습니다.
							</Typography>
						</Box>

						<Divider sx={{ my: 3 }} />

						{/** 1번 */}
						<Box display={'flex'} gap={1}>
							<LooksOneIcon sx={{ color: 'secondary.dark' }} />
							<Typography variant="subtitle1" fontWeight={600}>
								KPI 등록
							</Typography>
						</Box>
						<img
							src="/images/main/KPI 등록 샘플.png"
							alt="sample"
						/>

						{/** 2번 */}
						<Box display={'flex'} gap={1}>
							<LooksTwoIcon sx={{ color: 'secondary.dark' }} />
							<Typography
								variant="subtitle1"
								fontWeight={600}
								sx={{ wordBreak: 'keep-all' }}
							>
								등록된 목표의 달성, 실패 결과 선택
							</Typography>
						</Box>
						<img src="/images/main/KPI 샘플.png" alt="sample" />

						{/** 참고사항 */}
						<Box display={'flex'} gap={1} mt={5}>
							<NewReleasesOutlinedIcon
								sx={{ color: 'primary.main' }}
							/>
							<Typography
								variant="subtitle1"
								fontWeight={600}
								sx={{ wordBreak: 'keep-all' }}
							>
								참고사항
							</Typography>
						</Box>

						<Box display={'flex'} gap={1} mt={-2} ml={2}>
							<DoneOutlinedIcon
								sx={{ color: 'secondary.main' }}
							/>
							<Typography
								variant="subtitle1"
								fontWeight={500}
								sx={{ wordBreak: 'keep-all' }}
							>
								등록한 KPI의 달성, 실패 결과를 선택해야만 완료
								처리 됩니다.
							</Typography>
						</Box>

						<Box display={'flex'} gap={1} mt={-4} ml={2}>
							<DoneOutlinedIcon
								sx={{ color: 'secondary.main' }}
							/>
							<Typography
								variant="subtitle1"
								fontWeight={500}
								sx={{ wordBreak: 'keep-all' }}
							>
								메모를 등록하여 등록한 KPI를 쉽게 관리하실 수
								있습니다.
							</Typography>
						</Box>

						{/** 수정시 등록 버튼 */}
						<SupportiButton
							contents={'닫기'}
							onClick={() => {
								props.setModalOpen(false);
							}}
							style={{
								height: '50px',
								width: { xs: '100%', md: '260px' },
								marginLeft: 'auto',
								marginRight: 'auto',
								marginTop: 10,
							}}
							color={'primary'}
							variant="contained"
							isGradient={true}
						/>
					</Box>
				}
			/>
			<SupportiAlertModal
				open={alertModal}
				handleClose={() => {
					setAlertModal(false);
				}}
				type="success"
			/>
		</Box>
	);
};

export default GuidelineModal;
