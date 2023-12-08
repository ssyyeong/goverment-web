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

const Page: NextPage = () => {
	//* Modules
	//* Constants
	const seminarHeaderData: TableHeaderProps[] = [
		{
			label: 'NO',
			value: '',
			format: (value, idx) => {
				return idx + 1;
			},
		},
		{
			label: '제목',
			value: 'PRODUCT_NAME',
		},
		{
			label: '선착순 제한',
			value: 'PERSONNEL',
		},
		{
			label: '일정',
			value: 'SEMINAR_DATE',
			format: (value) => {
				return moment(value).format('YYYY-MM-DD');
			},
		},
	];

	const freeSeminarHeaderData: TableHeaderProps = {
		label: '금액',
		value: 'PRICE',
		format: (value) => {
			return `${value.toLocaleString()} 원`;
		},
	};

	//* States
	const [tab, setTab] = React.useState(0);
	/**
	 * 세미나 데이터 리스트
	 */
	const [seminarDataList, setSeminarDataList] = React.useState([]);
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
		const seminarController = new DefaultController('Seminar');
		seminarController.findAllItems(
			{},
			(res) => {
				setSeminarDataList(res.data.result);
			},
			(err) => {}
		);
	}, []);

	return (
		<Box width={'100%'}>
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
						height: '40px',
						bgcolor: 'rgba(85, 131, 228, 1)',
					},
				}}
			/>
			<Box width={'100%'} p={2}>
				<SupportiTable
					rowData={[
						{
							TRANSACTION_HISTORY_IDENTIFICATION_CODE: 1,
							BANK_ACCOUNT_IDENTIFICATION_CODE: 1,
							EXCEPTED_YN: 'N',
							IN_AMOUNT: 10000,
							OUT_AMOUNT: 0,
							TRANSACTION_DATE: new Date(),
							TRADER_BANK_NAME: '국민은행',
							TRANSACTION_DESCRIPTION: '입금',
							TRADER_NAME: '김만수',
							BALANCE: 10000,
						},
					]}
					headerData={
						tab === 0
							? seminarHeaderData
							: [...seminarHeaderData, freeSeminarHeaderData]
					}
				/>
			</Box>
		</Box>
	);
};

export default Page;
