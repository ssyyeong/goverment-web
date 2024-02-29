import React, { useEffect } from 'react';
import { useAppMember } from '../../../../../../hooks/useAppMember';
import {
	Box,
	FormControl,
	InputLabel,
	Select,
	TextField,
	Typography,
} from '@mui/material';
import SupportiModal from '../../../../../global/SupportiModal';
import SupportiButton from '../../../../../global/SupportiButton';
import { TransactionCategoryConfig } from '../../../../../../../configs/data/TransactionCategoryConfig';
import DefaultController from '@leanoncompany/supporti-ark-office-project/src/controller/default/DefaultController';
import { BankCategoryController } from '../../../../../../controller/BankCategoryController';
import { SupportiAlertModal } from '../../../../../global/SupportiAlertModal';

interface ICategoryMappingModalProps {
	modalOpen: boolean;
	setModalOpen: React.Dispatch<boolean>;
	category?: string;
	traderName: string;
	isEditMode?: boolean;
	categoryId?: number;
	setRecomputeTriggerKey?: React.Dispatch<any>;
}

const CategoryMappingModal = (props: ICategoryMappingModalProps) => {
	//* Controllers

	const CategoryController = new BankCategoryController();

	//* Modules

	//* Hooks
	/**
	 * 유저 아이디 가져오는 훅
	 */
	const { memberId } = useAppMember();

	//* States
	const [category, setCategory] = React.useState(
		props.category ? props.category : ''
	);

	/**
	 * 알럿 오픈 여부
	 */
	const [isAlertOpen, setIsAlertOpen] = React.useState<boolean>(false);

	/**
	 *
	 * 알럿 타입
	 */
	const [alertType, setAlertType] = React.useState<
		'successModifyAxios' | 'successCreateAxios'
	>(null);

	//* Constants
	const categoryDataConfig = [
		{
			label: '카테고리',
			type: 'select',
			value: props.category ? props.category : '',
			onChange: (e) => {
				setCategory(e.target.value);
				console.log(e.target.value);
			},
		},
		{
			label: '거래자명',
			type: 'text',
			nolabel: false,
			value: props.traderName,
		},
	];

	//* Functions

	/**
	 * 카테고리 매핑 생성하는 함수
	 *  */
	const createCategoryMapping = () => {
		CategoryController.registerBankCategory(
			{
				APP_MEMBER_IDENTIFICATION_CODE: memberId,
				CATEGORY: category,
				TRADER_NAME: props.traderName,
			},
			(res) => {
				setAlertType('successCreateAxios');
				setIsAlertOpen(true);
			},
			(err) => {}
		);
	};

	/**
	 * 카테고리 매핑 수정하는 함수
	 *  */
	const modifyCategoryMapping = () => {
		CategoryController.modifyBankCategory(
			{
				APP_MEMBER_IDENTIFICATION_CODE: memberId,
				BANK_CATEGORY_MATCH_HISTORY_IDENTIFICATION_CODE:
					props.categoryId,
			},
			{
				CATEGORY: category,
			},
			(res) => {
				setAlertType('successModifyAxios');
				setIsAlertOpen(true);
			},
			(err) => {}
		);
	};

	return (
		<SupportiModal
			open={props.modalOpen}
			handleClose={() => {
				props.setModalOpen(false);
			}}
			activeHeader={true}
			title={'계좌 카테고리'}
			style={{
				width: { xs: '100%', md: '500px' },
				// padding: { xs: '10px', md: '0' },
			}}
			children={
				<Box
					display={'flex'}
					flexDirection={'column'}
					overflow={'auto'}
					sx={{
						width: '100%',
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
					<Box width={'100%'}>
						<Box display={'flex'} flexDirection={'column'} gap={2}>
							{categoryDataConfig.map((item, idx) => {
								return (
									<Box
										key={idx}
										alignItems={'center'}
										width={'100%'}
									>
										<Typography fontWeight={600}>
											{!item.nolabel && item.label}
										</Typography>
										{item.type === 'select' ? (
											<FormControl
												sx={{ width: '100%', mt: 1 }}
											>
												{/* <InputLabel htmlFor="grouped-native-select">
												카테고리
											</InputLabel> */}
												<Select
													native
													defaultValue=""
													id="grouped-native-select"
													// label="카테고리"
													onChange={item.onChange}
												>
													<option
														aria-label="None"
														value=""
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
																		(
																			item
																		) => {
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
										) : (
											<TextField
												type={item.type}
												value={item.value}
												// error={item.error}
												fullWidth
												// InputProps={{
												// 	endAdornment: item.endAdornment,
												// }}
												// helperText={item.helperText}
												sx={{
													mt: 1,
												}}
												placeholder={`${item.label} 입력`}
											/>
										)}
									</Box>
								);
							})}
						</Box>

						{/** 수정, 등록 버튼 */}
						<SupportiButton
							contents={
								props.isEditMode ? '수정하기' : '등록하기'
							}
							onClick={() => {
								if (props.isEditMode) {
									modifyCategoryMapping();
								} else {
									if (category === '') {
										alert('카테고리를 선택해주세요');
										return;
									} else {
										createCategoryMapping();
									}
								}
							}}
							style={{
								height: '45px',
								marginTop: 2,
							}}
							fullWidth={true}
							color={'primary'}
							variant="contained"
							isGradient={true}
						/>
					</Box>
					{/** 알럿 */}
					<SupportiAlertModal
						open={isAlertOpen}
						handleClose={() => {
							setIsAlertOpen(false);
						}}
						customHandleClose={() => {
							props.setModalOpen(false);
							props.setRecomputeTriggerKey &&
								props.setRecomputeTriggerKey(
									(prev) => prev + 1
								);
						}}
						type={alertType}
					/>
					{/* <SupportiAlertModal
				open={isDeleteAlertOpen}
				handleClose={() => setIsDeleteAlertOpen(false)}
				customHandleClose={() => {
					props.setLoading(true);
					memberId && deleteOkrMain();

					setIsDeleteAlertOpen(false);
				}}
				type={'delete'}
			/> */}
				</Box>
			}
		/>
	);
};

export default CategoryMappingModal;
