import React, { useState } from 'react';

import {
	Box,
	BoxProps,
	FormControl,
	Rating,
	Select,
	Typography,
} from '@mui/material';
import SupportiModal from '../../../../../../global/SupportiModal';
import SupportiInput from '../../../../../../global/SupportiInput';
import SupportiButton from '../../../../../../global/SupportiButton';

import { RatingConfig } from '../../../../../../../../configs/data/RatingConfig';
import { IKpi } from '../../../../../../../@types/model';
import DefaultController from '@leanoncompany/supporti-ark-office-project/src/controller/default/DefaultController';
import { useAppMember } from '../../../../../../../hooks/useAppMember';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { v4 as uuidv4 } from 'uuid';
import { SupportiAlertModal } from '../../../../../../global/SupportiAlertModal';
import { KpiController } from '../../../../../../../controller/KpiController';
import { TransactionCategoryConfig } from '../../../../../../../../configs/data/TransactionCategoryConfig';

interface IKpiCreateModalProps {
	modalOpen: boolean;
	setModalOpen: React.Dispatch<boolean>;
	setKpiTriggerKey: React.Dispatch<string>;
	data?: any;
}

const KpiCreateModal = (props: IKpiCreateModalProps) => {
	//* Controllers
	// const kpiController = new DefaultController('Kpi');
	/**
	 * KPI 컨트롤러
	 */
	const kpiController = new KpiController();
	const bankAccountController = new DefaultController('BankAccount');

	//* Modules

	//* Constants
	const KpiCategory = [
		{ label: '비즈니스 지표', value: 'BUSINESS' },
		{ label: '마케팅 지표', value: 'MARKETING' },
	];

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
					TARGET_AMOUNT: undefined,
					TARGET_INCREASE: undefined,
					CATEGORY: 'BUSINESS',
					BANK_CATEGORY: undefined,
					RATE: 1,
			  }
	);

	/**
	 * 카테고리에 따라
	 */
	const [selectableCategoryList, setSelectableCategoryList] =
		React.useState(undefined);

	/**
	 * 선택 가능한 KPI 카테고리
	 */
	const selectableBankCategoryList: {
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
	 * 생성 성공 알럿
	 */
	const [alertModal, setAlertModal] = React.useState<boolean>(false);

	/**
	 *
	 * 계좌 없음 알럿
	 */
	const [accountAlertModal, setAccountAlertModal] =
		React.useState<boolean>(false);

	/**
	 * 동의 여부 체크
	 */
	const [agree, setAgree] = React.useState<boolean>(false);

	/**
	 *KPI 자체 카테고리
	 */
	const [selectedKpiCategory, setSelectedKpiCategory] =
		React.useState<string>(KpiCategory[0].value);

	/**
	 * KPI 연동 계좌 카테고리 선택
	 */

	const [selectedBankCategory, setSelectedBankCategory] = React.useState<
		string | undefined
	>(selectableBankCategoryList.concat(selectableBankCategoryList)[0].value);

	//* Functions
	/**
	 *
	 * KPI 목표 등록
	 */
	const createKpi = () => {
		if (
			kpiData.TITLE === '' ||
			kpiData.TARGET_AMOUNT === undefined ||
			kpiData.TARGET_INCREASE === undefined ||
			kpiData.TARGET_AMOUNT === 0
		) {
			alert('필수 입력값을 입력해주세요.');
		} else {
			if (kpiData.TITLE.length > 20) {
				/** 타이틀이 20자 이상일 경우 처리 */
				alert('타이틀은 20자내로 입력해주세요.');
			} else {
				kpiController.createKpi(
					{
						APP_MEMBER_IDENTIFICATION_CODE: memberId,
						INCREASE_YN: kpiData.TARGET_INCREASE < 0 ? 'N' : 'Y',
						...kpiData,
					},
					(response) => {
						setAlertModal(true);
						props.setKpiTriggerKey(new Date().getTime().toString());
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
		if (agree) {
			/**
			 * 연동된 계좌 조회하는 api 호출
			 */
			bankAccountController.findAllItems(
				{
					APP_MEMBER_IDENTIFICATION_CODE: memberId,
				},
				(res) => {
					if (res.data.result.rows.length === 0) {
						/**
						 *
						 * 연동된 계좌가 존재하는지에 따라 알럿 띄우기
						 */
						setAccountAlertModal(true);
						setAgree(false);
					} else {
						// setLoading(false);
						setAgree(true);
					}
				},
				(err) => {
					console.log(err);
				}
			);
		}
	}, [agree]);

	React.useEffect(() => {
		setAgree(false);
		setKpiData({
			TITLE: '',
			TARGET_AMOUNT: undefined,
			TARGET_INCREASE: undefined,
			CATEGORY: selectedKpiCategory,
			BANK_CATEGORY: undefined,
			RATE: 1,
		});
	}, [selectedKpiCategory]);

	React.useEffect(() => {
		if (memberId) {
			setKpiData({
				TITLE: '',
				TARGET_AMOUNT: undefined,
				TARGET_INCREASE: undefined,
				CATEGORY: undefined,
				BANK_CATEGORY: undefined,
				RATE: 1,
			});

			setAgree(false);
		}
	}, [memberId, props.modalOpen, props.data]);

	return (
		<Box>
			<SupportiModal
				open={props.modalOpen}
				handleClose={() => {
					props.setModalOpen(false);
				}}
				title={'목표 등록'}
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
						<Box display={'flex'} flexDirection={'column'} gap={2}>
							<Typography fontWeight={500}>
								KPI 카테고리
							</Typography>
							<Box display="flex" gap={1}>
								{KpiCategory.map((item, index) => {
									return (
										<SupportiButton
											contents={item.label}
											variant={'outlined'}
											onClick={(e) => {
												setSelectedKpiCategory(
													item.value
												);
												setKpiData({
													...kpiData,
													CATEGORY: item.value,
													// item.label === '비즈니스 지표'
													// 	? 'BUSINESS'
													// 	: 'MARKETING',
												});
											}}
											style={{
												height: '30px',
												color:
													item.value ===
													selectedKpiCategory
														? 'white'
														: 'primary.main',
												bgcolor:
													item.value ===
													selectedKpiCategory
														? 'primary.main'
														: 'white',
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

							{/** 동의 안내 */}
							{selectedKpiCategory === 'BUSINESS' && (
								<Box>
									<Typography
										fontWeight={500}
										sx={{
											wordBreak: 'keep-all',
											letterSpacing: 0.5,
											lineHeight: 1.5,
										}}
									>
										현재 서포티에서는 법인계좌 등록을 통해
										KPI 지표 자동화가 가능합니다. 지표
										자동화에 동의시 해당 KPI는 인증된 KPI로
										등록 되며 별도의 달성값 입력 없이
										목표값이 누적됩니다. 이렇게 인증된 KPI는
										IR/데모데이 심사 때 유리하게 적용됩니다.
										고객님의 계좌를 연동하여 KPI지표
										자동화에 활용하는 것에 동의하시겠습니까?
									</Typography>
									<SupportiInput
										type="checkbox"
										value={agree}
										setValue={setAgree}
										label={'동의하고 계좌 연동하기'}
									/>
								</Box>
							)}

							{agree && (
								<Box>
									<Typography fontWeight={500} mb={1}>
										계좌와 연동할 카테고리 선택
									</Typography>
									<Box display="flex" gap={2}>
										<FormControl
											sx={{ width: '100%', mt: 1 }}
										>
											{/* <InputLabel htmlFor="grouped-native-select">
													카테고리
												</InputLabel> */}
											<Select
												native
												defaultValue={
													kpiData.BANK_CATEGORY
												}
												id="grouped-native-select"
												// label={category}
												onChange={(e) => {
													setKpiData({
														...kpiData,
														BANK_CATEGORY:
															e.target.value,
													});
												}}
												// value={category}
											>
												<option
													// value={category}
													area-label="None"
												/>
												{Object.entries(
													TransactionCategoryConfig
												).map(([key, value]) => {
													return (
														<>
															<optgroup
																label={key}
															>
																{value.subCategory.map(
																	(item) => {
																		return (
																			<option
																				value={
																					item.value
																				}
																			>
																				{
																					item.label
																				}
																			</option>
																		);
																	}
																)}
															</optgroup>
														</>
													);
												})}
											</Select>
										</FormControl>
									</Box>
								</Box>
							)}

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
												width={'160px'}
											/>
										</Box>
									</Box>
									{/** 목표 증가율 */}
									<Box display={'flex'}>
										<Box>
											<Typography fontWeight={500} mb={1}>
												목표 증가치 (+- 100%)
											</Typography>
											<SupportiInput
												type="input"
												inputType="number"
												additionalProps={{
													placeholder:
														'목표 증가치 입력',
												}}
												value={kpiData.TARGET_INCREASE}
												setValue={(value: number) => {
													setKpiData({
														...kpiData,
														TARGET_INCREASE: value,
													});
												}}
												width={'160px'}
											/>
											<Typography
												fontWeight={500}
												variant="body1"
												mt={'5px'}
												color="error.main"
												sx={{
													visibility:
														kpiData.TARGET_INCREASE <
														0
															? 'block'
															: 'hidden',
												}}
											>
												감소 목표로 설정됩니다.
											</Typography>
										</Box>
									</Box>
								</Box>
							</Box>
						</Box>
						{/** 수정시 등록 버튼 */}
						<SupportiButton
							contents={'등록하기'}
							onClick={() => {
								createKpi();
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
				open={accountAlertModal}
				handleClose={() => {
					setAccountAlertModal(false);
				}}
				customHandleClose={() => setAgree(false)}
				type="noAccount"
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
