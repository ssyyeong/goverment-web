import React from 'react';

import { Box, BoxProps, Rating, Typography } from '@mui/material';
import SuppportiModal from '../../../../../global/SuppportiModal';
import SupportiInput from '../../../../../global/SupportiInput';
import SupportiButton from '../../../../../global/SupportiButton';
import { IndicatorUnitConfig } from '../../../../../../../configs/data/IndicatorUnitConfig';
import { IndicatorCategoryConfig } from '../../../../../../../configs/data/IndicatorCategoryConfig';
import { RatingConfig } from '../../../../../../../configs/data/RatingConfig';

interface IKpiModalProps {
	modalOpen: boolean;
	setModalOpen: React.Dispatch<boolean>;
	mode?: 'detail' | 'create';
}

const KpiModal = (props: IKpiModalProps) => {
	//* Modules

	//* Constants

	//* States
	const [kpiData, setKpiData] = React.useState({
		TITLE: '',
		START_DATE: '',
		END_DATE: '',
		TARGET_AMOUNT: '',
		TARGET_UNIT: '',
		NOTE: '',
		CATEGORY: '',
		ASSIGNEE: '',
		RATE: 5,
		STATUS: 'PROCEEDING',
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
						gap={4}
					>
						{/** 목표 작성 */}
						<Box display={'flex'} flexDirection={'column'} gap={5}>
							<SupportiInput
								type="input"
								multiline={true}
								value={kpiData.TITLE}
								setValue={(value: string) => {
									setKpiData({
										...kpiData,
										TITLE: value,
									});
								}}
								width={'400px'}
								placeholder="목표 타이틀을 입력해주세요."
							/>
							{/** 날짜 선택 */}
							<Box display={'flex'}>
								<SupportiInput
									type="datepicker"
									value="2022-12-20"
									setValue={(value) => {
										setKpiData({
											...kpiData,
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
										setKpiData({
											...kpiData,
											START_DATE: value,
										});
									}}
									width={'130px'}
									useIcon={false}
								/>
							</Box>

							{/** 중요도 */}
							<Box display="flex">
								<Rating
									name="simple-controlled"
									value={kpiData.RATE}
									size="large"
									readOnly
								/>
								<Typography>
									{RatingConfig[kpiData.RATE]}
								</Typography>
							</Box>

							<Box
								display={'flex'}
								justifyContent={'space-between'}
							>
								{/** 카테고리 */}
								<Box>
									<Typography>카테고리</Typography>
									<SupportiInput
										type="select"
										value={kpiData.CATEGORY}
										setValue={(value) => {
											setKpiData({
												...kpiData,
												CATEGORY: value,
											});
										}}
										dataList={IndicatorCategoryConfig}
										width={'150px'}
									/>
								</Box>
								{/** 담당자 */}
								<Box>
									<Typography>담당자</Typography>
									<SupportiInput
										type="input"
										value={kpiData.ASSIGNEE}
										setValue={(value) => {
											setKpiData({
												...kpiData,
												ASSIGNEE: value,
											});
										}}
										width={'150px'}
									/>
								</Box>
							</Box>

							{/** 목표분류 목표양 등록 */}
							<Box display={'flex'} gap={2}>
								{/** 목표분류 */}
								<Box>
									<Typography>목표분류</Typography>
									<SupportiInput
										type="select"
										value={kpiData.TARGET_UNIT}
										setValue={(value) => {
											setKpiData({
												...kpiData,
												TARGET_UNIT: value,
											});
										}}
										dataList={IndicatorUnitConfig}
										width={'150px'}
									/>
								</Box>
								{/** 목표양 */}
								<Box>
									<Typography>목표양</Typography>
									<Box display={'flex'}>
										<SupportiInput
											type="input"
											value={kpiData.TARGET_AMOUNT}
											setValue={(value) => {
												setKpiData({
													...kpiData,
													TARGET_AMOUNT: value,
												});
											}}
											width={'150px'}
										/>
										<Box>
											<Typography>만원</Typography>
										</Box>
									</Box>
								</Box>
								{props.mode === 'detail' && (
									<SupportiButton
										contents={'등록하기'}
										onClick={() => {}}
										style={{
											height: '20px',
											width: '100px',
										}}
										color={'primary'}
										variant="contained"
										isGradient={true}
									/>
								)}
							</Box>
						</Box>

						{/** 등록 버튼 */}
						<SupportiButton
							contents={'등록하기'}
							onClick={() => {
								props.setModalOpen(false);
							}}
							style={{
								height: '30px',
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

export default KpiModal;
