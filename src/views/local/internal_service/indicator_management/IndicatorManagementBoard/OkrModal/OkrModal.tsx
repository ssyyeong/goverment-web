import React from 'react';

import { Box, BoxProps, Divider, Typography } from '@mui/material';
import SuppportiModal from '../../../../../global/SuppportiModal';
import SupportiButton from '../../../../../global/SupportiButton';
import SupportiInput from '../../../../../global/SupportiInput';
import OkrModalDetailBox from '../OkrModalDetailBox/OkrModalDetailBox';
import SupportiProgressBar from '../../../../../global/SupportiProgressBar';

interface IOkrModalProps {
	modalOpen: boolean;
	setModalOpen: React.Dispatch<boolean>;
}

const OkrModal = (props: IOkrModalProps) => {
	//* Modules

	//* Constants

	//* States
	const [okrMainData, setOkrMainData] = React.useState({
		TITLE: '',
		START_DATE: '',
		END_DATE: '',
		TARGET_AMOUNT: '',
		TARGET_UNIT: '',
		NOTE: '',
	});

	//* Functions

	return (
		<Box>
			<SuppportiModal
				open={props.modalOpen}
				handleClose={() => {
					props.setModalOpen(false);
				}}
				title="목표 등록"
				style={{
					width: '70%',
					padding: '20px',
				}}
				children={
					<Box
						width="80%"
						display={'flex'}
						flexDirection={'column'}
						gap={2}
					>
						{/** 상위 목표 작성 */}
						<Box display={'flex'} flexDirection={'column'} gap={1}>
							<SupportiInput
								type="input"
								multiline={true}
								value={okrMainData.TITLE}
								setValue={(value: string) => {
									setOkrMainData({
										...okrMainData,
										TITLE: value,
									});
								}}
								width={'400px'}
								placeholder="상위 목표 타이틀을 입력해주세요."
							/>
							{/** 날짜 선택 */}
							<Box display={'flex'}>
								<SupportiInput
									type="datepicker"
									value="2022-12-20"
									setValue={(value) => {
										setOkrMainData({
											...okrMainData,
											START_DATE: value,
										});
									}}
									width={'130px'}
									useIcon={false}
								/>
								<SupportiInput
									type="datepicker"
									value="2022-12-20"
									setValue={(value) => {
										setOkrMainData({
											...okrMainData,
											START_DATE: value,
										});
									}}
									width={'130px'}
									useIcon={false}
								/>
							</Box>

							{/** 프로그레스바 */}
							<SupportiProgressBar
								materialDataList={[
									{
										percentage: '50',
										color: 'primary.main',
									},
								]}
							/>
						</Box>

						<Divider sx={{ my: 2 }} />

						{/** 하위 목표 작성 */}
						<Box>
							{/** 작성  */}
							<OkrModalDetailBox mode={'write'} />

							{/** 하위 목표 추가 버튼 */}
							<SupportiButton
								contents={'하위 목표 추가 +'}
								onClick={() => {
									props.setModalOpen(false);
								}}
								style={{
									height: 5,
									marginTop: 2,
									color: 'black',
								}}
								color={'secondary'}
								variant="outlined"
							/>
						</Box>
						{/** 등록 버튼 */}
						<SupportiButton
							contents={'등록하기'}
							onClick={() => {
								props.setModalOpen(false);
							}}
							style={{
								height: '20px',
								width: '200px',
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

export default OkrModal;
