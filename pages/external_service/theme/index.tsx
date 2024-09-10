import { NextPage } from 'next';
import React, { useEffect } from 'react';

import { Box, Typography } from '@mui/material';

import DefaultController from '@leanoncompany/supporti-ark-office-project/src/controller/default/DefaultController';

import SupportiButton from '../../../src/views/global/SupportiButton';
import ThemeCard from '../../../src/views/local/external_service/theme/ThemeCard/ThemeCard';
import Nodata from '../../../src/views/global/NoData/NoData';

//테마 페이지
const Page: NextPage = () => {
	const themeCategoryController = new DefaultController('ThemeCategory');
	const [categoryList, setCategoryList] = React.useState([]);

	useEffect(() => {
		themeCategoryController.findAllItems(
			{},
			(res) => {
				res.data.result.rows.map((item) => {
					return (item.SELECT_CATEGORY = '전체');
				});

				setCategoryList(res.data.result.rows);
			},
			(error) => {
				console.log(error);
			}
		);
	}, []);

	return (
		<Box
			sx={{
				width: '100%',
				display: 'flex',
				flexDirection: 'column',
			}}
		>
			<Box
				width={'100%'}
				textAlign={'center'}
				display={'flex'}
				flexDirection={'column'}
				justifyContent={'center'}
				bgcolor={'#f5f5f5'}
				py={5}
				px={{
					xs: 2,
					md: 0,
				}}
			>
				<Typography variant={'h1'} fontWeight={'600'}>
					창업가의 니즈에 맞춘 맞춤형 커뮤니티
				</Typography>
				<Typography variant={'h4'} fontWeight={'400'} mt={3}>
					학생 발명가부터 소상공인, 해외 진출을 꿈꾸는 창업가까지!
				</Typography>
				<Typography variant={'h4'} fontWeight={'400'} mt={1}>
					당신이 가진 아이디어, 서포티가 현실로 이뤄드립니다.
				</Typography>
				<Typography variant={'h4'} fontWeight={'400'} mt={1}>
					꿈을 현실로 만드는 그 첫걸음, 서포티와 함께 시작하세요.{' '}
				</Typography>
			</Box>

			{/* 섹션2 */}
			{categoryList.map((category, index) => {
				//서브 카테고리 인덱스
				const subCategoryIndex = category.ThemeSubCategories.findIndex(
					(subCategory) => {
						return (
							subCategory.SUB_CONTENT === category.SELECT_CATEGORY
						);
					}
				);
				const subCategoryIdx =
					subCategoryIndex === -1
						? 0
						: category.ThemeSubCategories[subCategoryIndex]
								.THEME_SUB_CATEGORY_IDENTIFICATION_CODE;
				//테마 상품
				const themeProducts =
					subCategoryIdx === 0
						? category.ThemeProducts
						: category.ThemeProducts.filter((themeProduct: any) => {
								return (
									themeProduct.THEME_SUB_CATEGORY_IDENTIFICATION_CODE ===
									subCategoryIdx
								);
						  });

				return (
					<Box
						display={'flex'}
						flexDirection={'column'}
						justifyContent={'center'}
						alignItems={'center'}
						mt={5}
						mb={5}
						px={{
							xs: 2,
							md: 0,
						}}
					>
						<Typography
							variant={'h5'}
							fontWeight={'600'}
							color={'primary'}
						>
							{category.CONTENT}
						</Typography>
						<Typography
							variant={'h1'}
							fontWeight={'600'}
							mt={3}
							textAlign={'center'}
						>
							{category.TITLE.split('\n').map((line, index) => {
								return (
									<Box key={index}>
										{line}
										<br />
									</Box>
								);
							})}
						</Typography>
						<Typography
							variant={'body2'}
							fontWeight={'400'}
							color={'textSecondary'}
							mt={1}
						>
							{category.DESCRIPTION}
						</Typography>
						{category.BUTTON != null && (
							<SupportiButton
								style={{
									marginTop: '20px',
								}}
								contents={category.BUTTON}
								variant={'text'}
								color={'primary'}
								onClick={() => {
									window.open(category.BUTTON_LINK, '_blank');
								}}
							/>
						)}
						<Typography
							variant={'body2'}
							fontWeight={'400'}
							color={'textSecondary'}
							mt={1}
						>
							{category.ADDITIONAL}
						</Typography>
						<Box display="flex" gap={1.2} flexWrap="wrap" my={2}>
							<Typography
								sx={{
									p: 1,
									border: '1px solid #c8c8c8',
									borderRadius: 5,
									cursor: 'pointer',
									borderColor:
										category.SELECT_CATEGORY === '전체'
											? 'primary.main'
											: '#c8c8c8',
									color:
										category.SELECT_CATEGORY === '전체' &&
										'primary.main',
								}}
								onClick={() => {
									category.SELECT_CATEGORY = '전체';

									setCategoryList((list) => {
										const newCategory = [...list];
										newCategory[index] = category;
										return newCategory;
									});
								}}
							>
								전체
							</Typography>
							{category?.ThemeSubCategories?.map(
								(subCategory, subIndex) => {
									return (
										<Typography
											key={subIndex}
											sx={{
												p: 1,
												border: '1px solid #c8c8c8',
												borderRadius: 5,
												cursor: 'pointer',
												borderColor:
													category.SELECT_CATEGORY ===
													subCategory.SUB_CONTENT
														? 'primary.main'
														: '#c8c8c8',
												color:
													category.SELECT_CATEGORY ==
														subCategory.SUB_CONTENT &&
													'primary.main',
											}}
											onClick={() => {
												category.SELECT_CATEGORY =
													subCategory.SUB_CONTENT;

												setCategoryList((list) => {
													const newCategory = [
														...list,
													];
													newCategory[index] =
														category;
													return newCategory;
												});
											}}
										>
											{subCategory.SUB_CONTENT}
										</Typography>
									);
								}
							)}
						</Box>
						<Box
							display="flex"
							gap={5}
							justifyContent={'center'}
							width={'100%'}
							maxWidth={{
								md: themeProducts.length > 0 ? '100vh' : '100%',
								xs: '280px',
							}}
							px={{
								xs: 0,
								md: 10,
							}}
							mt={5}
							pb={5}
							sx={{
								overflowX: 'auto',
								'&::-webkit-scrollbar': {
									height: '5px !important',
									backgroundColor: 'white !important',
									padding: '0.5px',
									borderRadius: '20px',
								},
								'&::-webkit-scrollbar-thumb': {
									backgroundColor: '#305edccc',
									borderRadius: '20px',
								},
							}}
						>
							<Box display="flex" width={'100%'} gap={10}>
								{themeProducts.length > 0 ? (
									themeProducts.map(
										(themeProduct: any, themeIndex) => {
											themeProduct.SUB_CONTENT =
												category.SELECT_CATEGORY;

											return (
												<ThemeCard
													key={themeIndex}
													data={themeProduct}
												/>
											);
										}
									)
								) : (
									// <Box>
									// 	<img
									// 		src="/images/main/prepare.png"
									// 		alt="prepare"
									// 		width={300}
									// 		height={250}
									// 	/>
									// 	<Typography

									// 	>
									// 		해당 지역에는 현재 모임이 없습니다.
									// 	</Typography>
									// </Box>
									<Nodata />
								)}
							</Box>
						</Box>
					</Box>
				);
			})}
		</Box>
	);
};

export default Page;
