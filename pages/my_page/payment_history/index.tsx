import { Box, Typography } from '@mui/material';
import DefaultController from '@leanoncompany/supporti-ark-office-project/src/controller/default/DefaultController';
import { NextPage } from 'next';
import React, { useEffect } from 'react';
import { usePagination } from '../../../src/hooks/usePagination';
import SupportiPagination from '../../../src/views/global/SupportiPagination';
import SupportiTable from '../../../src/views/global/SupportiTable';
import MobileTableRow from '../../../src/views/local/external_service/mobileTableRow/MobileTableRow';
import { TableHeaderProps } from '../../../src/views/global/SupportiTable/SupportiTable';
import { useAppMember } from '../../../src/hooks/useAppMember';
import InternalServiceDrawer from '../../../src/views/local/internal_service/common/InternalServiceDrawer/InternalServiceDrawer';
import Nodata from '../../../src/views/global/NoData/NoData';

const Page: NextPage = () => {
	//* Modules
	const paymentHistoryController = new DefaultController('PaymentHistory');
	const matches = false; //useMediaQuery(theme.breakpoints.down('md')

	//* States
	/**
	 * 결제 정보 리스트
	 */
	const [paymentHistoryList, setPaymentHistoryList] = React.useState([]);
	/**
	 * 총 데이터 크기
	 */
	const [totalDataSize, setTotalDataSize] = React.useState<number>(0);

	//* Constants
	const paymentHistoryHeaderData: TableHeaderProps[] = [
		{
			label: 'NO',
			value: '',
			format: (value, key, idx) => {
				return page * 10 + (idx + 1);
			},
			align: 'center',
		},
		{
			label: '결제내용',
			value: 'DESCRIPTION',
			align: 'center',
		},
		{
			label: '금액',
			align: 'center',
			value: 'AMOUNT',
			format: (value) => {
				return `${value.toLocaleString()} 원`;
			},
		},
		{
			label: '결제일',
			align: 'center',
			value: 'APPROVED_DATE',
			format: (value) => {
				return value.split('T')[0];
			},
		},
	];

	//* Hooks
	/**
	 * 유저 아이디 가져오는 훅
	 */
	const { memberId } = useAppMember();
	/**
	 * 페이지네이션
	 */
	const { page, limit, handlePageChange, setLimit } = usePagination();
	/**
	 *결제 히스토리 가져오기
	 */
	useEffect(() => {
		memberId &&
			paymentHistoryController.findAllItems(
				{
					APP_MEMBER_IDENTIFICATION_CODE: memberId,
					LIMIT: 10,
					PAGE: page,
				},
				(res) => {
					setPaymentHistoryList(res.data.result.rows);
					setTotalDataSize(res.data.result.count);
				},
				(err) => {
					console.log(err);
				}
			);
	}, [page, memberId]);

	return (
		<InternalServiceDrawer type="mypage">
			<Box
				width={'100%'}
				p={{
					sm: 10,
					xs: 2,
				}}
				bgcolor={'primary.light'}
			>
				<Typography variant="h4" fontWeight={'bold'}>
					결제내역
				</Typography>
				{/*모바일 테이블 */}
				<Box
					width={'100%'}
					py={2}
					display={{
						sm: 'none',
						xs: 'block',
					}}
				>
					{paymentHistoryList.map((item, idx) => {
						return (
							<MobileTableRow
								index={idx}
								title={item.DESCRIPTION}
								colums={[
									{
										label: '금액',
										value: item.AMOUNT,
									},
									{
										label: '결제일',
										value: `${
											item.APPROVED_DATE.split('T')[0]
										} 원`,
									},
								]}
							/>
						);
					})}
					{paymentHistoryList.length === 0 && <Nodata />}
				</Box>
				{/* 테이블 */}

				<Box
					width={'100%'}
					p={2}
					mt={2}
					display={{
						sm: 'block',
						xs: 'none',
					}}
				>
					<SupportiTable
						rowData={paymentHistoryList}
						headerData={paymentHistoryHeaderData}
					/>
				</Box>
				{/* 페이지 네이션 */}
				<Box width={'100%'} p={2}>
					<SupportiPagination
						limit={limit}
						setLimit={setLimit}
						page={page}
						handlePageChange={handlePageChange}
						count={totalDataSize}
						useLimit={false}
					/>
				</Box>
			</Box>
		</InternalServiceDrawer>
	);
};

export default Page;
