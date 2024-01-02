import { Box, Chip, Typography } from '@mui/material';
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
import moment from 'moment';

const Page: NextPage = () => {
	//* Modules
	const pointHistoryController = new DefaultController('PointHistory');
	const matches = false; //useMediaQuery(theme.breakpoints.down('md')

	//* States
	/**
	 * 결제 정보 리스트
	 */
	const [pointHistoryList, setPointHistoryList] = React.useState([]);
	/**
	 * 총 데이터 크기
	 */
	const [totalDataSize, setTotalDataSize] = React.useState<number>(0);
	/**
	 * STATUS
	 */
	const [status, setStatus] = React.useState<
		'CHARGED' | 'USED' | 'REFUNDED' | undefined
	>();

	//* Constants
	const pointHistoryHeaderData: TableHeaderProps[] = [
		{
			label: 'NO',
			value: '',
			format: (value, key, idx) => {
				return idx + 1;
			},
			align: 'left',
		},
		{
			label: '포인트타입',
			value: 'TYPE',
			format: (value) => {
				return value === 'CHARGED'
					? '충전'
					: value === 'USED'
					? '사용'
					: '환불';
			},
		},
		{
			label: '포인트내용',
			value: 'DESCRIPTION',
			align: 'center',
		},
		{
			label: '금액',
			align: 'center',
			value: 'AMOUNT',
			format: (value) => {
				return `${value.toLocaleString()} 포인트`;
			},
		},
		{
			label: '결제일',
			align: 'center',
			value: 'CREATED_AT',
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
			pointHistoryController.findAllItems(
				{
					APP_MEMBER_IDENTIFICATION_CODE: memberId,
					LIMIT: 10,
					PAGE: page,
					TYPE: status,
				},
				(res) => {
					setPointHistoryList(res.data.result.rows);
					setTotalDataSize(res.data.result.count);
				},
				(err) => {
					console.log(err);
				}
			);
	}, [page, status, memberId]);

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
					포인트 내역
				</Typography>
				{/* 필터 */}
				<Box px={2} display={'flex'} gap={1} mt={2}>
					<Chip
						label={'전체'}
						onClick={() => {
							setStatus(undefined);
						}}
						color={status === undefined ? 'primary' : 'default'}
					/>
					<Chip
						label={'충전'}
						onClick={() => {
							setStatus('CHARGED');
						}}
						color={status === 'CHARGED' ? 'primary' : 'default'}
					/>
					<Chip
						label={'사용'}
						onClick={() => {
							setStatus('USED');
						}}
						color={status === 'USED' ? 'primary' : 'default'}
					/>
				</Box>
				{/*모바일 테이블 */}
				<Box
					width={'100%'}
					p={2}
					display={{
						sm: 'none',
						xs: 'block',
					}}
				>
					{pointHistoryList.map((item, idx) => {
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
										label: '포인트타입',
										value:
											item.TYPE === 'CHARGED'
												? '충전'
												: item.TYPE === 'USED'
												? '사용'
												: '환불',
									},

									{
										label: '결제일',
										value: `${moment(
											item.CREATED_AT
										).format('YY-MM-DD')} `,
									},
								]}
							/>
						);
					})}
				</Box>
				{/* 테이블 */}
				<Box
					width={'100%'}
					p={2}
					display={{
						sm: 'block',
						xs: 'none',
					}}
				>
					<SupportiTable
						rowData={pointHistoryList}
						headerData={pointHistoryHeaderData}
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
