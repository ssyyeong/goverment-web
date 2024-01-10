import React, { useEffect } from 'react';

import { NextPage } from 'next';

import { Box, BoxProps, Typography } from '@mui/material';
import SupportiToggle from '../../../src/views/global/SupportiToggle';
import SupportiTable, {
	TableHeaderProps,
} from '../../../src/views/global/SupportiTable/SupportiTable';
import moment from 'moment';
import { usePagination } from '../../../src/hooks/usePagination';
import DefaultController from '@leanoncompany/supporti-ark-office-project/src/controller/default/DefaultController';
import SupportiPagination from '../../../src/views/global/SupportiPagination';
import { useRouter } from 'next/router';
import MobileTableRow from '../../../src/views/local/external_service/mobileTableRow/MobileTableRow';

const Page: NextPage = () => {
	//* Modules
	const router = useRouter();
	//* Constants
	const seminarHeaderData: TableHeaderProps[] = [
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
			return value == 0 ? '무료' : `${value.toLocaleString()} P`;
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
	const { page, limit, handlePageChange, setLimit, setPage } =
		usePagination();
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
				PERIOD_TARGET_KEY: tab === 1 ? 'PRICE' : undefined,
				PERIOD_START: tab === 1 ? 1 : undefined,
				SORT_KEY: 'SEMINAR_DATE',
				SORT_DIRECTION: 'ASC',
				PURCHASE_AVAILABLE_YN: 'Y',
			},
			(res) => {
				setTotalDataCount(res.data.result.count);
				setSeminarDataList(res.data.result.rows);
			},
			(err) => {}
		);
	}, [tab, page]);

	/**
	 * 탭 변경시 페이지 초기화
	 */
	useEffect(() => {
		setPage(0);
	}, [tab]);

	return (
		<Box
			width={'100%'}
			p={{
				xs: 2,
				md: 10,
			}}
			bgcolor={'primary.light'}
		>
			<Typography variant="h4" fontWeight={'bold'}>
				예약 가능 세미나
			</Typography>
			{/* 탭 */}
			<Box p={2}>
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
						outerBoxStyle: {
							mt: 2,
						},
					}}
				/>
			</Box>

			{/* 테이블 */}
			<Box width={'100%'} p={2} display={{ xs: 'none', sm: 'block' }}>
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
			{/* 모바일 테이블 */}
			<Box width={'100%'} mt={2} display={{ xs: 'block', sm: 'none' }}>
				{seminarDataList.map((data, idx) => {
					return (
						<MobileTableRow
							index={idx}
							title={data.PRODUCT_NAME}
							onClick={() => {
								router.push(
									`/external_service/seminar/${data.SEMINAR_PRODUCT_IDENTIFICATION_CODE}`
								);
							}}
							colums={[
								{
									label: '선착순 제한',
									value: data.PERSONNEL,
								},
								{
									label: '일정',
									value: moment(data.SEMINAR_DATE).format(
										'YYYY-MM-DD'
									),
								},
								{
									label: '금액',
									value:
										data.PRICE == 0
											? '무료'
											: `${data.PRICE.toLocaleString()} P`,
								},
							]}
						/>
					);
				})}
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
