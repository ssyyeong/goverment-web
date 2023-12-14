import React, { useEffect } from 'react';

import { NextPage } from 'next';

import { Box, BoxProps, Typography } from '@mui/material';
import SupportiToggle from '../../../src/views/global/SupportiToggle';
import SupportiTable, {
	TableHeaderProps,
} from '../../../src/views/global/SupportiTable/SupportiTable';
import moment from 'moment';
import { usePagination } from '../../../src/hooks/usePagination';
import DefaultController from '@qillie-corp/ark-office-project/src/controller/default/DefaultController';
import SupportiPagination from '../../../src/views/global/SupportiPagination';
import { useRouter } from 'next/router';

const Page: NextPage = () => {
	//* Modules
	const router = useRouter();
	//* Constants
	const consultingHeaderData: TableHeaderProps[] = [
		{
			label: 'NO',
			value: '',
			format: (value, key, idx) => {
				return idx + 1;
			},
			align: 'left',
		},
		{
			label: '제목',
			value: 'PRODUCT_NAME',
			align: 'center',
		},
		{
			label: '금액',
			align: 'center',
			value: 'PRICE',
			format: (value) => {
				return `${value.toLocaleString()} 원`;
			},
		},
	];

	//* States
	/**
	 * 컨설팅 데이터 리스트
	 */
	const [consultingDataList, setConsultingDataList] = React.useState([]);
	/**
	 * 컨설팅 데이터 총 개수
	 */
	const [totalDataCount, setTotalDataCount] = React.useState<number>(0);
	//* Functions
	//* Hooks
	/**
	 * 페이징 관련
	 */
	const { page, limit, handlePageChange, setLimit } = usePagination();
	/**
	 * 컨설팅 리스트 가져오기
	 */
	useEffect(() => {
		const consultingController = new DefaultController('ConsultingProduct');
		consultingController.findAllItems(
			{
				LIMIT: 10,
				PAGE: page,
			},
			(res) => {
				setTotalDataCount(res.data.result.count);
				setConsultingDataList(res.data.result.rows);
			},
			(err) => {}
		);
	}, [page]);

	return (
		<Box width={'100%'} p={10}>
			<Typography variant="h4" fontWeight={'bold'}>
				예약 가능 컨설팅
			</Typography>
			{/* 테이블 */}
			<Box width={'100%'} p={2} mt={2}>
				<SupportiTable
					rowData={consultingDataList}
					headerData={consultingHeaderData}
					onClick={(data) => {
						router.push(
							`/external_service/consulting/${data.CONSULTING_PRODUCT_IDENTIFICATION_CODE}`
						);
					}}
				/>
			</Box>
			{/* 페이지 네이션 */}
			<Box width={'100%'} p={2}>
				<SupportiPagination
					limit={limit}
					setLimit={setLimit}
					page={page}
					handlePageChange={handlePageChange}
					count={totalDataCount}
					useLimit={false}
				/>
			</Box>
		</Box>
	);
};

export default Page;
