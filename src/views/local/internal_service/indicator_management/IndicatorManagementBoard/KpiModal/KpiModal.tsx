import React, { useState } from 'react';

import { Box, BoxProps, Rating, Typography } from '@mui/material';
import SuppportiModal from '../../../../../global/SuppportiModal';
import SupportiInput from '../../../../../global/SupportiInput';
import SupportiButton from '../../../../../global/SupportiButton';
import { IndicatorUnit } from '../../../../../../../configs/data/IndicatorUnitConfig';
import { IndicatorCategory } from '../../../../../../../configs/data/IndicatorCategoryConfig';
import { RatingConfig } from '../../../../../../../configs/data/RatingConfig';
import { IKpi } from '../../../../../../../src/@types/model';
import DefaultController from '@leanoncompany/supporti-ark-office-project/src/controller/default/DefaultController';
import { useAppMember } from '../../../../../../hooks/useAppMember';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { v4 as uuidv4 } from 'uuid';

interface IKpiModalProps {
	modalOpen: boolean;
	setModalOpen: React.Dispatch<boolean>;
	mode?: 'modify' | 'create';
	data?: any;
	updateKpi?: (injectedObj) => void;
	setTriggerKey?: React.Dispatch<any>;
}

const KpiModal = (props: IKpiModalProps) => {
	//* Controllers
	const kpiController = new DefaultController('Kpi');

	//* Modules

	//* Constants
	//* Hooks
	const { memberId } = useAppMember();
	//* States
	const [kpiData, setKpiData] = React.useState<IKpi>(
		props.data
			? props.data
			: {
					TITLE: '',
					START_DATE: new Date(),
					END_DATE: new Date(),
					TARGET_AMOUNT: 0,
					TARGET_UNIT: undefined,
					NOTE: '',
					CATEGORY: undefined,
					ASSIGNEE: '',
					RATE: 1,
					STATUS: 'PROCEEDING',
			  }
	);

	//* 직접 입력 여부
	const [isUserMakeUnit, setIsUserMakeUnit] = React.useState(false);

	//* Functions
	/**
	 *
	 * 목표 등록하는 api 호출 처리
	 */
	const createKpi = () => {
		if (
			kpiData.TITLE === '' ||
			kpiData.CATEGORY == undefined ||
			kpiData.ASSIGNEE === '' ||
			kpiData.TARGET_UNIT == undefined ||
			kpiData.TARGET_AMOUNT === 0
		) {
			alert('필수 입력값을 입력해주세요.');
		} else {
			if (kpiData.TITLE.length >= 20) {
				//* 20글자 넘으면 20글자 내까지만 자르기
				alert('타이틀은 20자내로 입력해주세요.');

				// setKpiData({
				// 	...kpiData,
				// 	TITLE: kpiData.TITLE.slice(0, 20),
				// });
			} else {
				kpiController.createItem(
					{ APP_MEMBER_IDENTIFICATION_CODE: memberId, ...kpiData },
					(response) => {
						alert('등록 성공');

						props.setTriggerKey && props.setTriggerKey(uuidv4());
						props.setModalOpen(false);
					},
					(err) => {
						console.log(err);
					}
				);
			}
		}
	};

	//* Hooks
	React.useEffect(() => {
		if (memberId) {
			if (props.mode === 'modify') {
				setKpiData(props.data);
			} else {
				setKpiData({
					TITLE: '',
					START_DATE: new Date(),
					END_DATE: new Date(),
					TARGET_AMOUNT: 0,
					TARGET_UNIT: undefined,
					NOTE: '',
					CATEGORY: undefined,
					ASSIGNEE: '',
					RATE: 1,
					STATUS: 'PROCEEDING',
				});
			}
		}
	}, [memberId, props.modalOpen, props.data]);
	console.log(kpiData);
	return (
		<Box>
			<SuppportiModal
				open={props.modalOpen}
				handleClose={() => {
					props.setModalOpen(false);
				}}
				title={props.mode === 'modify' ? '수정하기' : '목표 등록'}
				style={{
					width: { xs: '100%', sm: '60%' },
					padding: { xs: '10px', sm: '20px' },
				}}
				children={
					<Box
						display={'flex'}
						flexDirection={'column'}
						gap={5}
						sx={{
							width: { xs: '100%', sm: '80%' },
						}}
					>
						{/** 목표 작성 */}
						<Box display={'flex'} flexDirection={'column'} gap={2}>
							<Box>
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
									width={'100%'}
									placeholder="목표 타이틀을 입력해주세요."
								/>
							</Box>
							<Box
								display="flex"
								justifyContent={'space-between'}
							>
								<Typography
									fontWeight={500}
									variant="body1"
									color="error.main"
									sx={{
										visibility:
											kpiData.TITLE !== ''
												? 'hidden'
												: 'block',
									}}
								>
									필수 값 입니다.
								</Typography>

								<Box
									display="flex"
									ml={'auto'}
									my={1}
									gap={0.5}
								>
									<Typography
										color={
											kpiData.TITLE.length < 20
												? 'secondary.main'
												: 'warning.main'
										}
									>
										{kpiData.TITLE.length}
									</Typography>
									<Typography
										color={
											kpiData.TITLE.length < 20
												? 'secondary.main'
												: 'warning.main'
										}
									>
										/
									</Typography>
									<Typography
										color={
											kpiData.TITLE.length < 20
												? 'secondary.main'
												: 'warning.main'
										}
									>
										20
									</Typography>
								</Box>
							</Box>

							{/** 날짜 선택 */}
							<Box display={'flex'}>
								<CalendarTodayIcon
									sx={{
										width: '15px',
										height: '15px',
										marginTop: 'auto',
										marginBottom: 'auto',
										marginRight: '5px',
									}}
								/>
								<SupportiInput
									type="datepicker"
									value={kpiData.START_DATE}
									setValue={(value) => {
										setKpiData({
											...kpiData,
											START_DATE: value
												.toDate()
												.toISOString(),
										});
									}}
									width={'130px'}
									useIcon={false}
								/>
								<SupportiInput
									type="datepicker"
									value={kpiData.END_DATE}
									minDate={kpiData.START_DATE as string}
									setValue={(value) => {
										setKpiData({
											...kpiData,
											END_DATE: value
												.toDate()
												.toISOString(),
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
									<Typography
										fontWeight={500}
										mt={'5px'}
										variant="body1"
										color="error.main"
										sx={{
											visibility:
												kpiData.CATEGORY !== ''
													? 'hidden'
													: 'block',
										}}
									>
										필수 값 입니다.
									</Typography>
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
									<Typography
										fontWeight={500}
										variant="body1"
										mt={'5px'}
										color="error.main"
										sx={{
											visibility:
												kpiData.ASSIGNEE !== ''
													? 'hidden'
													: 'block',
										}}
									>
										필수 값 입니다.
									</Typography>
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
										value={
											isUserMakeUnit
												? '직접입력'
												: kpiData.TARGET_UNIT
										}
										setValue={(value) => {
											if (value === '직접입력') {
												setIsUserMakeUnit(true);
												setKpiData({
													...kpiData,
													TARGET_UNIT: '',
												});
											} else {
												setIsUserMakeUnit(false);
												setKpiData({
													...kpiData,
													TARGET_UNIT: value,
												});
											}
										}}
										dataList={IndicatorUnit}
										width={'150px'}
									/>
									{isUserMakeUnit && (
										<SupportiInput
											type="input"
											value={kpiData.TARGET_UNIT}
											setValue={(value) => {
												setKpiData({
													...kpiData,
													TARGET_UNIT: value,
												});
											}}
											width={'150px'}
										/>
									)}
									<Typography
										fontWeight={500}
										variant="body1"
										mt={'5px'}
										color="error.main"
										sx={{
											visibility:
												kpiData.TARGET_UNIT != undefined
													? 'hidden'
													: 'block',
										}}
									>
										필수 값 입니다.
									</Typography>
								</Box>
								{/** 목표량 */}
								<Box display={'flex'}>
									<Box>
										<Typography fontWeight={500} mb={1}>
											목표량
										</Typography>
										<SupportiInput
											type="input"
											inputType="number"
											value={kpiData.TARGET_AMOUNT}
											setValue={(value: number) => {
												setKpiData({
													...kpiData,
													TARGET_AMOUNT: value,
												});
											}}
											width={'150px'}
										/>
										<Typography
											fontWeight={500}
											variant="body1"
											mt={'5px'}
											color="error.main"
											sx={{
												visibility:
													kpiData.TARGET_AMOUNT !== 0
														? 'hidden'
														: 'block',
											}}
										>
											필수 값 입니다.
										</Typography>
									</Box>
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
