import React, { useEffect } from 'react';

import { NextPage } from 'next';

import { Box, BoxProps, Typography } from '@mui/material';
import DefaultController from '@leanoncompany/supporti-ark-office-project/src/controller/default/DefaultController';
import AccordianBox from '../../../src/views/local/common/AccordianBox/AccordianBox';
import Nodata from '../../../src/views/global/NoData/NoData';
import SupportiButton from '../../../src/views/global/SupportiButton';
import SupportiInput from '../../../src/views/global/SupportiInput';
import { FaqController } from '../../../src/controller/FaqController';

const Page: NextPage = () => {
	//* Modules
	// const faqController = new DefaultController('FaqBoardContent');
	const faqController = new FaqController();
	const faqCategoryController = new DefaultController('FaqBoardCategory');
	//* Constants
	//* States
	const [faqList, setFaqList] = React.useState([]);
	const [category, setCategory] = React.useState(0); //검색하는 카테고리명
	const [searchText, setSearchText] = React.useState(''); //검색하는 텍스트
	const [categoryList, setCategoryList] = React.useState([
		{ label: '전체', value: 0 },
	]); //카테고리 리스트
	//* Functions
	//* Hooks
	/**
	 * faq 리스트 조회
	 */
	useEffect(() => {
		faqController.getFaqList(
			{ FIND_OPTION_KEY_LIST: {} },
			(res) => {
				setFaqList(res.data.result.rows);
			},
			(err) => console.log(err)
		);

		faqCategoryController.findAllItems(
			{},
			(res) => {
				res.data.result.rows.map((item) => {
					setCategoryList((prev) => [
						...prev,
						{
							label: item.CATEGORY_NAME,
							value: item.CATEGORY_NAME,
						},
					]);
				});
			},
			(err) => console.log(err)
		);
	}, []);

	/**
	 * faq 리스트 조회
	 */
	const getFaqList = () => {
		const option =
			category === 0
				? {
						SEARCH_TEXT: searchText,
				  }
				: {
						FAQ_BOARD_CATEGORY_IDENTIFICATION_CODE: category,
						SEARCH_TEXT: searchText,
				  };

		faqController.getFaqList(
			Object.assign({
				FIND_OPTION_KEY_LIST: option,
			}),

			(res) => {
				setFaqList(res.data.result.rows);
			},
			(err) => console.log(err)
		);
	};
	return (
		<Box p={{ md: 10, xs: 3 }}>
			<Typography variant="h5" fontWeight={'bold'}>
				FAQ
			</Typography>
			<Typography
				variant="subtitle1"
				fontWeight="600"
				color={'secondary.main'}
				sx={{ my: 2 }}
			>
				자주 묻는 질문을 확인하여 더욱 빠르게 답변을 받아보세요.
			</Typography>
			<Box
				display={'flex'}
				flexWrap={'wrap'}
				gap={2}
				mt={2}
				flexDirection={'row'}
				width={'100%'}
			>
				<SupportiInput
					dataList={categoryList}
					value={category}
					setValue={setCategory}
					type="select"
					width={{ xs: '30%', md: '30%' }}
				/>
				{/* 검색창 */}
				<SupportiInput
					type="input"
					value={searchText}
					setValue={(e) => {
						setSearchText(e);
					}}
					additionalProps={{
						placeholder: '검색',
					}}
					style={{ bgcolor: 'white' }}
					width={{ xs: '40%', md: '55%' }}
				/>
				{/* 검색 */}
				<SupportiButton
					contents={'검색'}
					onClick={() => {
						getFaqList();
					}}
					variant="contained"
					isGradient
					style={{ width: '10% ' }}
				/>
			</Box>

			<Box mt={4}>
				{faqList.map((notice) => {
					return (
						<AccordianBox
							title={notice.TITLE}
							content={notice.CONTENT}
							created_at={notice.CREATED_AT}
							type="FAQ"
						/>
					);
				})}
			</Box>
			{faqList.length === 0 && <Nodata />}
		</Box>
	);
};

export default Page;
