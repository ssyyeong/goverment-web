import React from 'react';

import { Box, BoxProps, Rating, Typography } from '@mui/material';
import SuppportiModal from '../../../../../global/SuppportiModal';
import SupportiInput from '../../../../../global/SupportiInput';
import SupportiButton from '../../../../../global/SupportiButton';
import { IndicatorUnit } from '../../../../../../../configs/data/IndicatorUnitConfig';
import { IndicatorCategory } from '../../../../../../../configs/data/IndicatorCategoryConfig';
import { RatingConfig } from '../../../../../../../configs/data/RatingConfig';
import { IKpi } from '../../../../../../../src/@types/model';
import DefaultController from '@qillie-corp/ark-office-project/src/controller/default/DefaultController';

interface IKpiModalProps {
	modalOpen: boolean;
	setModalOpen: React.Dispatch<boolean>;
	mode?: 'modify' | 'create';
	data?: any;
	updateKpi?: (injectedObj) => void;
}

const KpiModal = (props: IKpiModalProps) => {
	//* Controllers
	const kpiController = new DefaultController('Kpi');

	//* Modules

	//* Constants

	//* States
	const [kpiData, setKpiData] = React.useState<IKpi>(
		props.data
			? props.data
			: {
					TITLE: '',
					START_DATE: new Date(),
					END_DATE: new Date(),
					TARGET_AMOUNT: '',
					TARGET_UNIT: '',
					NOTE: '',
					CATEGORY: '',
					ASSIGNEE: '',
					RATE: 1,
					STATUS: 'PROCEEDING',
			  }
	);

	//* Functions
	/**
	 *
	 * 목표 등록하는 api 호출 처리
	 */
	const createKpi = () => {
		kpiController.createItem(
			{ APP_MEMBER_IDENTIFICATION_CODE: 1, ...kpiData },
			(response) => {
				console.log(response);
				props.setModalOpen(false);
			},
			(err) => {
				console.log(err);
			}
		);
	};
	console.log(props.data);

	return (
		<Box>
			<SuppportiModal
				open={props.modalOpen}
				handleClose={() => {
					props.setModalOpen(false);
				}}
				title={props.mode === 'modify' ? '수정하기' : '목표 등록'}
				style={{
					width: '70%',
					padding: '20px',
				}}
				children={
					<Box
						width="80%"
						display={'flex'}
						flexDirection={'column'}
						gap={5}
					>
						{/** 목표 작성 */}
						<Box display={'flex'} flexDirection={'column'} gap={2}>
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
									value={kpiData.START_DATE}
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
									value={kpiData.END_DATE}
									setValue={(value) => {
										setKpiData({
											...kpiData,
											END_DATE: value,
										});
									}}
									width={'130px'}
									useIcon={false}
								/>
							</Box>

							{/** 중요도 */}
							<Box>
								<Typography fontWeight={500} mb={1}>
									중요도
								</Typography>
								<Box display="flex">
									<Rating
										name="simple-controlled"
										value={kpiData.RATE}
										onChange={(event, newValue) => {
											setKpiData({
												...kpiData,
												RATE: newValue,
											});
										}}
										size="large"
									/>
									<Typography
										ml={1}
										mt="auto"
										mb="auto"
										color="primary.main"
										fontWeight={500}
									>
										{RatingConfig[kpiData.RATE]}
									</Typography>
								</Box>
							</Box>

							<Box display={'flex'} gap={2}>
								{/** 카테고리 */}
								<Box>
									<Typography fontWeight={500} mb={1}>
										카테고리
									</Typography>
									<SupportiInput
										type="select"
										value={kpiData.CATEGORY}
										setValue={(value) => {
											setKpiData({
												...kpiData,
												CATEGORY: value,
											});
										}}
										dataList={IndicatorCategory}
										width={'150px'}
									/>
								</Box>
								{/** 담당자 */}
								<Box>
									<Typography fontWeight={500} mb={1}>
										담당자
									</Typography>
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

							{/** 목표분류 목표량 등록 */}
							<Box display={'flex'} gap={2}>
								{/** 목표분류 */}
								<Box>
									<Typography fontWeight={500} mb={1}>
										목표분류
									</Typography>
									<SupportiInput
										type="select"
										value={kpiData.TARGET_UNIT}
										setValue={(value) => {
											setKpiData({
												...kpiData,
												TARGET_UNIT: value,
											});
										}}
										dataList={IndicatorUnit}
										width={'150px'}
									/>
								</Box>
								{/** 목표량 */}
								<Box display={'flex'}>
									<Box>
										<Typography fontWeight={500} mb={1}>
											목표량
										</Typography>
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
										</Box>
									</Box>
									{/* <Box>
										<Typography>{kpiData.TARGET_UNIT}</Typography>
									</Box> */}
								</Box>
								{props.mode === 'create' && (
									<SupportiButton
										contents={'등록하기'}
										onClick={() => {
											createKpi();
										}}
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
							contents={
								props.mode === 'modify'
									? '수정하기'
									: '등록하기'
							}
							onClick={() => {
								props.mode === 'modify'
									? props.updateKpi({
											...kpiData,
											KPI_IDENTIFICATION_CODE:
												props.data[
													'KPI_IDENTIFICATION_CODE'
												],
									  })
									: createKpi();
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
