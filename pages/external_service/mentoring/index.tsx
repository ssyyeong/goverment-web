import React, { useEffect } from 'react';

import { NextPage } from 'next';

import { Box, BoxProps, Typography } from '@mui/material';
import SupportiTable, {
	TableHeaderProps,
} from '../../../src/views/global/SupportiTable/SupportiTable';
import { usePagination } from '../../../src/hooks/usePagination';
import DefaultController from '@leanoncompany/supporti-ark-office-project/src/controller/default/DefaultController';
import { useRouter } from 'next/router';
import { ServiceListLayout } from '../../../src/views/layout/ServiceListLayout';

const Page: NextPage = () => {
	//* Constants
	const generalMentoringHeaderData: TableHeaderProps[] = [
		{
			label: 'NO',
			value: '',
			format: (value, key, idx) => {
				return page * 10 + (idx + 1);
			},
			align: 'center',
		},
		{
			label: '제목',
			value: 'PRODUCT_NAME',
			align: 'center',
		},
		{
			label: '일정',
			value: 'RECURITMENT_DATE',
			align: 'center',
		},
	];

	const chargedMentoringHeaderData: TableHeaderProps = {
		label: '금액',
		value: 'REAL_PRICE',
		format: (value) => {
			return value == 0 ? '무료' : `${value.toLocaleString()} 원`;
		},
		align: 'center',
	};
	//* States
	/**
	 * 멘토링 데이터 리스트
	 */
	const [mentoringDataList, setMentoringDataList] = React.useState([]);

	/**
	 * 멘토링 카테고리 리스트
	 */
	const [mentoringCategoryList, setMentoringCategoryList] =
		React.useState(undefined);

	/**
	 * 멘토링 데이터 총 개수
	 */
	const [totalDataCount, setTotalDataCount] = React.useState<number>(0);
	/**
	 * 멘토링 테이블 헤더 데이터
	 */
	const [mentoringHeaderData, setMentoringHeaderData] = React.useState<
		TableHeaderProps[]
	>(generalMentoringHeaderData);
	//* Modules
	const router = useRouter();

	//* Functions
	//* Hooks
	/**
	 * 페이징 관련
	 */
	const { page, limit, handlePageChange, setLimit, setPage } =
		usePagination();
	/**
	 * 멘토링 리스트 가져오기
	 */
	useEffect(() => {
		const mentoringController = new DefaultController('MentoringProduct');
		mentoringController.findAllItems(
			{
				LIMIT: 10,
				PAGE: page,
			},
			(res) => {
				setTotalDataCount(res.data.result.count);
				setMentoringDataList(res.data.result.rows);

				setMentoringHeaderData([
					...generalMentoringHeaderData,
					chargedMentoringHeaderData,
				]);
			},
			(err) => {}
		);

		const mentoringCategoryController = new DefaultController(
			'MentoringCategory'
		);
		mentoringCategoryController.findAllItems(
			{ USE_YN: 'Y' },
			(res) => {
				setMentoringCategoryList(res.data.result.rows);
				res.data.result.rows.map((item, index) => {
					item.IMAGE = `/images/mentoring/category${index + 1}.png`;
				});
			},
			(err) => console.log(err)
		);
	}, [page]);

	return (
		<Box
			width={'100%'}
			p={{
				xs: 2,
				md: 10,
			}}
			// bgcolor={'primary.light'}
		>
			{/* <Box textAlign="center" my={5}>
				<Typography color="secondary.main" variant="h4">
					준비중입니다.
				</Typography>
			</Box> */}
			<ServiceListLayout
				title="지금 신청 가능한 멘토링"
				dataList={mentoringDataList}
				useFiltering={true}
				filterList={mentoringCategoryList}
				type="mentoring"
				filterChangeHandler={(filter) => {
					const mentoringController = new DefaultController(
						'MentoringProduct'
					);
					mentoringController.findAllItems(
						{
							LIMIT: 10,
							PAGE: page,
							PURCHASE_AVAILABLE_YN: 'Y',
							MENTORING_CATEGORY_IDENTIFICATION_CODE:
								filter?.MENTORING_CATEGORY_IDENTIFICATION_CODE,
						},
						(res) => {
							setTotalDataCount(res.data.result.count);
							setMentoringDataList(res.data.result.rows);

							setMentoringHeaderData([
								...generalMentoringHeaderData,
								chargedMentoringHeaderData,
							]);
						},
						(err) => {}
					);
				}}
			/>

			<Box
				sx={{
					my: 20,
				}}
			/>
		</Box>
	);
};

export default Page;
