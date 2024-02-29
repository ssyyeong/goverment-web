import React, { useState } from 'react';

import { Box, BoxProps, Rating, Typography } from '@mui/material';
import SupportiModal from '../../../../../../global/SupportiModal';
import SupportiInput from '../../../../../../global/SupportiInput';
import SupportiButton from '../../../../../../global/SupportiButton';
import { IndicatorUnit } from '../../../../../../../../configs/data/IndicatorUnitConfig';
import { IndicatorCategory } from '../../../../../../../../configs/data/IndicatorCategoryConfig';
import { RatingConfig } from '../../../../../../../../configs/data/RatingConfig';
import { IKpi } from '../../../../../../../@types/model';
import DefaultController from '@leanoncompany/supporti-ark-office-project/src/controller/default/DefaultController';
import { useAppMember } from '../../../../../../../hooks/useAppMember';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { v4 as uuidv4 } from 'uuid';
import { SupportiAlertModal } from '../../../../../../global/SupportiAlertModal';
import { KpiController } from '../../../../../../../controller/KpiController';

interface IKpiCreateModalProps {
	modalOpen: boolean;
	setModalOpen: React.Dispatch<boolean>;
	mode?: 'modify' | 'create';
	data?: any;
	updateKpi?: (injectedObj) => void;
	setTriggerKey?: React.Dispatch<any>;
}

const KpiCreateModal = (props: IKpiCreateModalProps) => {
	//* Controllers
	const kpiController = new DefaultController('Kpi');
	/**
	 * KPI 컨트롤러
	 */
	const kpiCategoryController = new KpiController();

	//* Modules

	//* Constants
	const KpiCategory = ['비즈니스 지표', '마케팅 지표'];

	//* Hooks
	/**
	 * 유저 아이디 가져오는 훅
	 */
	const { memberId } = useAppMember();

	//* States
	const [kpiData, setKpiData] = React.useState<IKpi>(
		props.data
			? props.data
			: {
					TITLE: '',
					START_DATE: new Date(),
					END_DATE: new Date(),
					TARGET_AMOUNT: undefined,
					TARGET_UNIT: undefined,
					NOTE: '',
					CATEGORY: undefined,
					ASSIGNEE: undefined,
					RATE: 1,
					STATUS: 'PROCEEDING',
			  }
	);

	/**
	 *
	 * 목표분류 직접입력 여부
	 */
	const [isUserMakeUnit, setIsUserMakeUnit] = React.useState(false);

	/**
	 *
	 * 카테고리 직접입력 여부
	 */
	const [isUserMakeCategory, setIsUserMakeCategory] = React.useState(false);

	/**
	 * 카테고리에 따라
	 */
	const [selectableCategoryList, setSelectableCategoryList] =
		React.useState(undefined);

	/**
	 * 선택 가능한 KPI 카테고리
	 */
	const selectableKpiCategoryList: {
		value: string | undefined;
		label: string;
	}[] = [
		{
			label: '재무',
			value: '재무',
		},
		{
			label: '고객 서비스',
			value: '고객 서비스',
		},
		{
			label: '운영',
			value: '운영',
		},
		{
			label: '마케팅',
			value: '마케팅',
		},
		{
			label: '인력관리',
			value: '인력관리',
		},
		{
			label: '기술 및 혁신',
			value: '기술 및 혁신',
		},
		{
			label: '지속 가능성',
			value: '지속 가능성',
		},
		{
			label: '소셜미디어',
			value: '소셜미디어',
		},
		{
			label: '효율성',
			value: '효율성',
		},
		{
			label: '품질',
			value: '품질',
		},
		{
			label: '프로젝트',
			value: '프로젝트',
		},
	];

	/**
	 * 알럿
	 */
	const [alertModal, setAlertModal] = React.useState<boolean>(false);

	//* Functions
	/**
	 *
	 * KPI 목표 등록
	 */
	const createKpi = () => {
		if (
			kpiData.TITLE === '' ||
			kpiData.CATEGORY == undefined ||
			kpiData.ASSIGNEE === undefined ||
			kpiData.TARGET_UNIT == undefined ||
			kpiData.TARGET_AMOUNT === 0
		) {
			alert('필수 입력값을 입력해주세요.');
		} else {
			if (kpiData.TITLE.length > 20) {
				/** 타이틀이 20자 이상일 경우 처리 */
				alert('타이틀은 20자내로 입력해주세요.');

				// setKpiData({
				// 	...kpiData,
				// 	TITLE: kpiData.TITLE.slice(0, 20),
				// });
			} else {
				kpiController.createItem(
					{ APP_MEMBER_IDENTIFICATION_CODE: memberId, ...kpiData },
					(response) => {
						setAlertModal(true);

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
			kpiCategoryController.getAllKpiCategory(
				{
					APP_MEMBER_IDENTIFICATION_CODE: memberId,
				},
				(res) => {
					if (res.data.result) {
						const temp = res.data.result?.map((item) => {
							return {
								value: item,
								label: item,
							};
						});

						if (props.mode === 'modify') {
							setSelectableCategoryList(
								selectableKpiCategoryList.concat(temp).concat([
									{
										value: '직접입력',
										label: '직접입력',
									},
								])
							);
						} else {
							setSelectableCategoryList(
								selectableKpiCategoryList.concat([
									{
										value: '직접입력',
										label: '직접입력',
									},
								])
							);
						}
					}
				},
				(err) => {
					console.log(err);
				}
			);

			if (props.mode === 'modify') {
				setKpiData(props.data);
			} else {
				setKpiData({
					TITLE: '',
					START_DATE: new Date(),
					END_DATE: new Date(),
					TARGET_AMOUNT: undefined,
					TARGET_UNIT: undefined,
					NOTE: '',
					CATEGORY: undefined,
					ASSIGNEE: '',
					RATE: 1,
					STATUS: 'PROCEEDING',
				});
			}
		}
		setIsUserMakeCategory(false);
		setIsUserMakeUnit(false);
	}, [memberId, props.modalOpen, props.data]);

	return (
		<Box>
			<SupportiModal
				open={props.modalOpen}
				handleClose={() => {
					props.setModalOpen(false);
				}}
				title={props.mode === 'modify' ? '수정하기' : '목표 등록'}
				style={{
					width: { xs: '100%', md: '55%' },
				}}
				activeHeader={true}
				children={
					<Box
						display={'flex'}
						flexDirection={'column'}
						gap={5}
						maxHeight={'70vh'}
						overflow={'auto'}
						sx={{
							width: { xs: '100%', md: '98%' },
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
						{/** 목표 작성 영역 */}
						<Box display={'flex'} flexDirection={'column'} gap={0}>
							<Box>
								<SupportiInput
									type="input"
									additionalProps={{
										placeholder:
											'목표 타이틀을 입력해주세요.',
									}}
									value={kpiData.TITLE}
									setValue={(value: string) => {
										setKpiData({
											...kpiData,
											TITLE: value,
										});
									}}
									width={'100%'}
								/>
								<Box
									display="flex"
									justifyContent={'space-between'}
								>
									{/** 필수값 알림 영역*/}
									{/* <Typography
										fontWeight={500}
										variant="body1"
										color="error.main"
										my={1}
										sx={{
											visibility:
												kpiData.TITLE !== ''
													? 'hidden'
													: 'block',
										}}
									>
										필수 값 입니다.
									</Typography> */}

									{/** 목표 제목 글자수와 글자수 제한 영역 */}
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
							</Box>

							{/** 날짜 선택 */}
							<Box display={'flex'} gap={0.5}>
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
								<Typography
									ml={0.5}
									mr={0.5}
									fontWeight={500}
									color={'secondary.main'}
									sx={{
										marginTop: 'auto',
										marginBottom: 'auto',
									}}
								>
									~
								</Typography>
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
							<Box my={2}>
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

							<Box
								display={'flex'}
								gap={2}
								flexWrap="wrap"
								mt={2}
							>
								{/** 카테고리 */}
								<Box>
									<Typography fontWeight={500} mb={1}>
										카테고리
									</Typography>
									<SupportiInput
										type="select"
										value={
											isUserMakeCategory
												? '직접입력'
												: kpiData.CATEGORY
										}
										setValue={(value) => {
											if (value === '직접입력') {
												setIsUserMakeCategory(true);

												setKpiData({
													...kpiData,
													CATEGORY: '',
												});
											} else {
												setIsUserMakeCategory(false);

												setKpiData({
													...kpiData,
													CATEGORY: value,
												});
											}
										}}
										dataList={selectableCategoryList}
										style={{
											width: {
												xs: '100px',
												md: '150px',
											},
										}}
									/>
									{/** 유저가 목표 분류 직접 입력 선택 시 */}
									{isUserMakeCategory && (
										<SupportiInput
											type="input"
											value={kpiData.CATEGORY}
											setValue={(value) => {
												setKpiData({
													...kpiData,
													CATEGORY: value,
												});
											}}
											style={{
												bgcolor: 'white',
												marginTop: '5px',
												width: {
													xs: '100px',
													md: '150px',
												},
											}}
											additionalProps={{
												placeholder: '목표 분류값',
											}}
										/>
									)}

									{/* 


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
									/> */}
									{/* <Typography
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
									</Typography> */}
								</Box>
								{/** 담당자 */}
								<Box>
									<Typography fontWeight={500} mb={1}>
										담당자
									</Typography>
									<SupportiInput
										type="input"
										value={kpiData.ASSIGNEE}
										additionalProps={{
											placeholder: '담당자 입력',
										}}
										setValue={(value) => {
											setKpiData({
												...kpiData,
												ASSIGNEE: value,
											});
										}}
										width={'150px'}
									/>
									{/* <Typography
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
									</Typography> */}
								</Box>

								{/** 목표분류 목표량 등록 영역 */}
								<Box display="flex" gap={2}>
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

										{/** 목표분류 직접입력시 입력창 */}
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
												style={{
													bgcolor: 'white',
													marginTop: '5px',
													width: {
														xs: '100px',
														md: '150px',
													},
												}}
												additionalProps={{
													placeholder: '목표 분류값',
												}}
											/>
										)}
										{/* <Typography
											fontWeight={500}
											variant="body1"
											mt={'5px'}
											color="error.main"
											sx={{
												visibility:
													kpiData.TARGET_UNIT !=
													undefined
														? 'hidden'
														: 'block',
											}}
										>
											필수 값 입니다.
										</Typography> */}
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
												additionalProps={{
													placeholder: '목표량 입력',
												}}
												value={kpiData.TARGET_AMOUNT}
												setValue={(value: number) => {
													setKpiData({
														...kpiData,
														TARGET_AMOUNT: value,
													});
												}}
												width={'150px'}
											/>
											{/* <Typography
												fontWeight={500}
												variant="body1"
												mt={'5px'}
												color="error.main"
												sx={{
													visibility:
														kpiData.TARGET_AMOUNT !==
															0 ||
														kpiData.TARGET_AMOUNT !==
															undefined
															? 'hidden'
															: 'block',
												}}
											>
												필수 값 입니다.
											</Typography> */}
										</Box>
									</Box>
								</Box>
							</Box>
						</Box>

						<Box display={'flex'} flexDirection={'column'} gap={2}>
							<Typography fontWeight={500}>
								KPI 카테고리
							</Typography>
							<Box display="flex" gap={1}>
								{KpiCategory.map((item, index) => {
									return (
										<SupportiButton
											contents={item}
											variant="outlined"
											onClick={(e) =>
												console.log(e.target.value)
											}
											style={{
												height: '30px',
											}}
										/>
									);
								})}
							</Box>

							{/** 타이틀 작성 */}
							<Typography fontWeight={500}>KPI 목표</Typography>
							<Box>
								<SupportiInput
									type="input"
									additionalProps={{
										placeholder:
											'목표 타이틀을 입력해주세요.',
									}}
									value={kpiData.TITLE}
									setValue={(value: string) => {
										setKpiData({
											...kpiData,
											TITLE: value,
										});
									}}
									width={'100%'}
								/>
								<Box
									display="flex"
									justifyContent={'space-between'}
								>
									{/** 필수값 알림 영역*/}
									{/* <Typography
										fontWeight={500}
										variant="body1"
										color="error.main"
										my={1}
										sx={{
											visibility:
												kpiData.TITLE !== ''
													? 'hidden'
													: 'block',
										}}
									>
										필수 값 입니다.
									</Typography> */}

									{/** 목표 제목 글자수와 글자수 제한 영역 */}
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
							</Box>

							{/** 중요도 */}
							<Box my={2}>
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

							<Box
								display={'flex'}
								gap={2}
								flexWrap="wrap"
								mt={2}
							>
								{/** 목표값 등록 영역 */}
								<Box display="flex" gap={2}>
									{/** 목표값 */}
									<Box display={'flex'}>
										<Box>
											<Typography fontWeight={500} mb={1}>
												목표값
											</Typography>
											<SupportiInput
												type="input"
												inputType="number"
												additionalProps={{
													placeholder: '목표값 입력',
												}}
												value={kpiData.TARGET_AMOUNT}
												setValue={(value: number) => {
													setKpiData({
														...kpiData,
														TARGET_AMOUNT: value,
													});
												}}
												width={'50%'}
											/>
											{/* <Typography
												fontWeight={500}
												variant="body1"
												mt={'5px'}
												color="error.main"
												sx={{
													visibility:
														kpiData.TARGET_AMOUNT !==
															0 ||
														kpiData.TARGET_AMOUNT !==
															undefined
															? 'hidden'
															: 'block',
												}}
											>
												필수 값 입니다.
											</Typography> */}
										</Box>
									</Box>
									{/** 목표 증가율 */}
									<Box display={'flex'}>
										<Box>
											<Typography fontWeight={500} mb={1}>
												목표 증가치 (0-100%)
											</Typography>
											<SupportiInput
												type="input"
												inputType="number"
												additionalProps={{
													placeholder:
														'목표 증가치 입력',
												}}
												value={kpiData.TARGET_AMOUNT}
												setValue={(value: number) => {
													setKpiData({
														...kpiData,
														TARGET_AMOUNT: value,
													});
												}}
												width={'50%'}
											/>
											{/* <Typography
												fontWeight={500}
												variant="body1"
												mt={'5px'}
												color="error.main"
												sx={{
													visibility:
														kpiData.TARGET_AMOUNT !==
															0 ||
														kpiData.TARGET_AMOUNT !==
															undefined
															? 'hidden'
															: 'block',
												}}
											>
												필수 값 입니다.
											</Typography> */}
										</Box>
									</Box>
								</Box>
							</Box>
						</Box>
						{/** 수정시 등록 버튼 */}
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
								height: '50px',
								width: { xs: '100%', md: '260px' },
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

export default KpiCreateModal;
