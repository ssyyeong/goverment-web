import React, { useEffect } from 'react';
import { useAppMember } from '../../../../../../hooks/useAppMember';
import { Box, Divider, Menu, MenuItem, Typography } from '@mui/material';
import SupportiModal from '../../../../../global/SupportiModal';
import SupportiButton from '../../../../../global/SupportiButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CategoryMappingModal from '../CategoryMappingModal/CategoryMappingModal';
import DefaultController from '@leanoncompany/supporti-ark-office-project/src/controller/default/DefaultController';
import Nodata from '../../../../../global/NoData/NoData';
import { SupportiAlertModal } from '../../../../../global/SupportiAlertModal';
import { BankCategoryController } from '../../../../../../controller/BankCategoryController';

interface ILinkedCategoryListModalProps {
	modalOpen: boolean;
	setModalOpen: React.Dispatch<boolean>;
	setRecomputeTriggerKey: React.Dispatch<any>;
}

const LinkedCategoryListModal = (props: ILinkedCategoryListModalProps) => {
	//* Controllers
	const CategoryController = new DefaultController(
		'BankCategoryMatchHistory'
	);

	const subController = new BankCategoryController();

	//* Modules

	//* States

	/**
	 * 메뉴 오픈 여부
	 */
	const [anchorEl, setAnchorEl] = React.useState(null);
	const open = Boolean(anchorEl);

	/**
	 * 카테고리 수정 모달 오픈 여부
	 */
	const [isCategoryModifyModalOpen, setCategoryModifyModalOpen] =
		React.useState(false);

	/**
	 * 연결된 카테고리 리스트
	 */
	const [categoryList, setCategoryList] = React.useState<any[]>([]);

	/**
	 *
	 * 선택된 거래자명
	 */
	const [traderName, setTraderName] = React.useState<string>('');

	/**
	 *
	 * 선택된 카테고리
	 */
	const [category, setCategory] = React.useState<string>('');

	/**
	 *
	 * 선택된 카테고리 아이디
	 */
	const [categoryId, setCategoryId] = React.useState<number | null>(null);

	/**
	 *
	 * 삭제 알럿 오픈 여부
	 */
	const [isDeleteAlertOpen, setIsDeleteAlertOpen] =
		React.useState<boolean>(false);

	//* Constants
	const categoryHeader = ['카테고리', '거래자명'];

	//* Hooks
	/**
	 * 유저 아이디 가져오는 훅
	 */
	const { memberId } = useAppMember();

	/**
	 * 연결된 카테고리 내역 받아오기
	 */
	React.useEffect(() => {
		CategoryController.findAllItems(
			{
				APP_MEMBER_IDENTIFICATION_CODE: memberId,
			},
			(res) => {
				setCategoryList(res.data.result.rows);
			},
			(err) => {
				console.log(err);
			}
		);
	}, [props.modalOpen, isDeleteAlertOpen, isCategoryModifyModalOpen]);

	//* Functions
	const deleteCategory = () => {
		subController.deleteBankCategory(
			{
				APP_MEMBER_IDENTIFICATION_CODE: memberId,
				BANK_CATEGORY_MATCH_HISTORY_IDENTIFICATION_CODE: categoryId,
			},
			{
				CATEGORY: category,
			},
			(res) => {
				props.setRecomputeTriggerKey((prev) => prev + 1);
				setIsDeleteAlertOpen(false);
				// setAlertType('successModifyAxios');
				// setIsAlertOpen(true);
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
				width: { xs: '100%', md: '40%' },
				// padding: { xs: '10px', md: '0' },
			}}
			children={
				<Box
					display={'flex'}
					flexDirection={'column'}
					overflow={'auto'}
					sx={{
						width: '100%',
					}}
				>
					<Box width={'100%'} height={'100%'}>
						<Typography fontWeight={500}>
							연결된 카테고리
						</Typography>

						<Box
							sx={{
								bgcolor: 'primary.light',
								borderRadius: '8px',
								width: '100%',
								minHeight: '35vh',
								overflowY: 'auto',
								maxHeight: '200px',
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
								mt: 2,
							}}
						>
							<Box
								display={'flex'}
								justifyContent={'space-around'}
								py={1.5}
								textAlign={'center'}
							>
								{/** 카테고리 헤더 영역 */}
								{categoryHeader.map((item) => {
									return (
										<Typography
											color={'secondary.dark'}
											fontWeight={500}
											sx={{ width: '120px' }}
										>
											{item}
										</Typography>
									);
								})}
							</Box>

							<Divider
								sx={{
									width: '90%',
									ml: 'auto',
									mr: 'auto',
									color: 'secondary.dark',
								}}
							/>

							{/** 카테고리 리스트 */}
							{categoryList.length !== 0 ? (
								categoryList.map((item, index) => {
									return (
										<Box
											key={
												item.BANK_CATEGORY_MATCH_HISTORY_IDENTIFICATION_CODE
											}
											display={'flex'}
											justifyContent={'space-around'}
											py={1.5}
											textAlign={'center'}
										>
											<Typography sx={{ width: '110px' }}>
												{item.BankCategory.CATEGORY}
											</Typography>
											<Box display="flex">
												<Typography
													sx={{ width: '120px' }}
												>
													{item.TRADER_NAME}
												</Typography>

												{/* 메뉴 */}
												<MoreVertIcon
													sx={{
														width: '20px',
														height: '15px',
														color: 'secondary.dark',
														mt: 'auto',
														mb: 'auto',
														mr: -3,
														cursor: 'pointer',
													}}
													id="basic-button"
													aria-controls={
														open
															? 'basic-menu'
															: undefined
													}
													aria-haspopup="true"
													aria-expanded={
														open
															? 'true'
															: undefined
													}
													onClick={(event) => {
														setTraderName(
															item.TRADER_NAME
														);
														setCategory(
															item.BankCategory
																.CATEGORY
														);
														setCategoryId(
															item.BANK_CATEGORY_MATCH_HISTORY_IDENTIFICATION_CODE
														);
														setAnchorEl(
															event.currentTarget
														);
													}}
												/>
												<Menu
													id="basic-menu"
													open={open}
													anchorEl={anchorEl}
													onClose={() => {
														setAnchorEl(null);
													}}
													MenuListProps={{
														'aria-labelledby':
															'basic-button',
													}}
													sx={{
														'& .MuiPaper-root': {
															borderRadius: '5px',
															boxShadow:
																'0 3px 15px 0 #e1eaff',
															width: '90px',
														},
													}}
												>
													<MenuItem
														sx={{
															borderBottom:
																'1px solid #e1eaff',
															pb: '10px',
															mb: '5px',
															display: 'flex',
															justifyContent:
																'center',
														}}
														onClick={() => {
															setCategoryModifyModalOpen(
																true
															);
															setAnchorEl(null);
														}}
													>
														수정하기
													</MenuItem>
													<MenuItem
														sx={{
															display: 'flex',
															justifyContent:
																'center',
														}}
														onClick={() => {
															setIsDeleteAlertOpen(
																true
															);
															setAnchorEl(null);
														}}
													>
														삭제하기
													</MenuItem>
												</Menu>
											</Box>
										</Box>
									);
								})
							) : (
								<Nodata />
							)}
						</Box>
						{/** 닫기 버튼 */}
						<SupportiButton
							contents={'닫기'}
							onClick={() => {
								props.setModalOpen(false);
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
						open={isDeleteAlertOpen}
						handleClose={() => setIsDeleteAlertOpen(false)}
						customHandleClose={() => {
							deleteCategory();
						}}
						type={'delete'}
					/>

					{/* 카테고리 수정 모달 */}
					<CategoryMappingModal
						modalOpen={isCategoryModifyModalOpen}
						setModalOpen={() => {
							setCategoryModifyModalOpen(false);
						}}
						isEditMode={true}
						traderName={traderName}
						categoryId={categoryId}
						category={category !== '' ? category : '카테고리'}
						setRecomputeTriggerKey={props.setRecomputeTriggerKey}
					/>
				</Box>
			}
		/>
	);
};

export default LinkedCategoryListModal;
