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
import Nodata from '../../../src/views/global/NoData/NoData';

const Page: NextPage = () => {
	//* Constants
	const generalSeminarHeaderData: TableHeaderProps[] = [
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
	/**
	 * 세미나 테이블 헤더 데이터
	 */
	const [seminarHeaderData, setSeminarHeaderData] = React.useState<
		TableHeaderProps[]
	>(generalSeminarHeaderData);
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

				if (tab === 0) {
					setSeminarHeaderData(generalSeminarHeaderData);
				} else {
					setSeminarHeaderData([
						...generalSeminarHeaderData,
						chargedSeminarHeaderData,
					]);
				}
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
			<Box
				// px={2}
				pt={4}
				width={{
					sm: '50%',
					xs: '100%',
				}}
			>
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
					angled
					disablePadding
					value={tab}
					setValue={setTab}
					chipHeight={50}
					selectedChipColor="primary.main"
					unselectedChipColor="secondary.dark"
					style={{
						chipStyle: {
							// height: '40px',
							bgcolor: '#ffffff',
							borderRadius: 0,
						},
						outerBoxStyle: {
							bgcolor: 'secondary.light',
							p: 0,
						},
						chipMapStyle: {
							fontWeight: 'bold',
						},
					}}
				/>
			</Box>

			{/* 테이블 */}
			<Box width={'100%'} display={{ xs: 'none', sm: 'block' }}>
				<SupportiTable
					rowData={seminarDataList}
					headerData={seminarHeaderData}
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
				{seminarDataList.length === 0 && <Nodata />}
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
