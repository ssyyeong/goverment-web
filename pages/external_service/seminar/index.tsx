import React, { useEffect } from 'react';

import { NextPage } from 'next';

import { Box, BoxProps } from '@mui/material';
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
	const seminarHeaderData: TableHeaderProps[] = [
		{
			label: 'NO',
			value: '',
			format: (value, key, idx) => {
				return idx + 1;
			},
			align: 'center',
		},
		{
			label: '제목',
			value: 'PRODUCT_NAME',
			align: 'center',
		},
		{
			label: '선착순 제한',
			value: 'PERSONNEL',
			align: 'center',
		},
		{
			label: '일정',
			value: 'SEMINAR_DATE',
			format: (value) => {
				return moment(value).format('YYYY-MM-DD');
			},
			align: 'center',
		},
	];

	const chargedSeminarHeaderData: TableHeaderProps = {
		label: '금액',
		value: 'PRICE',
		format: (value) => {
			return `${value.toLocaleString()} 원`;
		},
	};

	//* States
	/**
	 * 탭 데이터
	 */
	const [tab, setTab] = React.useState(0);
	/**
	 * 세미나 데이터 리스트
	 */
	const [seminarDataList, setSeminarDataList] = React.useState([]);
	/**
	 * 세미나 데이터 총 개수
	 */
	const [totalDataCount, setTotalDataCount] = React.useState<number>(0);
	//* Functions
	//* Hooks
	/**
	 * 페이징 관련
	 */
	const { page, limit, handlePageChange, setLimit } = usePagination();
	/**
	 * 세미나 리스트 가져오기
	 */
	useEffect(() => {
		const seminarController = new DefaultController('SeminarProduct');
		seminarController.findAllItems(
			{
				LIMIT: 10,
				PAGE: page,
				PRICE: tab === 0 ? 0 : undefined,
			},
			(res) => {
				setTotalDataCount(res.data.result.count);
				setSeminarDataList(res.data.result.rows);
			},
			(err) => {}
		);
	}, [tab, page]);

	return (
		<Box width={'100%'} p={10}>
			{/* 탭 */}
			<SupportiToggle
				chipDataList={[
					{
						label: '모든 회원 세미나',
						value: 0,
					},
					{
						label: '유료 회원 세미나',
						value: 1,
					},
				]}
				value={tab}
				setValue={setTab}
				chipHeight={40}
				selectedChipColor="white"
				style={{
					chipStyle: {
						// height: '40px',
						bgcolor: 'rgba(85, 131, 228, 1)',
					},
				}}
			/>
			{/* 테이블 */}
			<Box width={'100%'} p={2}>
				<SupportiTable
					rowData={seminarDataList}
					headerData={
						tab === 0
							? seminarHeaderData
							: [...seminarHeaderData, chargedSeminarHeaderData]
					}
					onClick={(data) => {
						router.push(
							`/external_service/seminar/${data.SEMINAR_PRODUCT_IDENTIFICATION_CODE}`
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
