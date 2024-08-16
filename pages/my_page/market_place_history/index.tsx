import { Box, Button, Tooltip, Typography, IconButton } from '@mui/material';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

import DefaultController from '@leanoncompany/supporti-ark-office-project/src/controller/default/DefaultController';
import { NextPage } from 'next';
import React, { useEffect } from 'react';
import { usePagination } from '../../../src/hooks/usePagination';
import SupportiPagination from '../../../src/views/global/SupportiPagination';
import SupportiTable from '../../../src/views/global/SupportiTable';
import MobileTableRow from '../../../src/views/local/external_service/mobileTableRow/MobileTableRow';
import { TableHeaderProps } from '../../../src/views/global/SupportiTable/SupportiTable';
import moment from 'moment';
import SupportiToggle from '../../../src/views/global/SupportiToggle';
import { useAppMember } from '../../../src/hooks/useAppMember';
import InternalServiceDrawer from '../../../src/views/local/internal_service/common/InternalServiceDrawer';
import ConsultingSchedularUpdate from '../../../src/views/local/external_service/consulting/ConsultingSchedular/ConsultingSchedularUpdate';
import Nodata from '../../../src/views/global/NoData/NoData';
import { useRouter } from 'next/router';
import { UserTicketController } from '../../../src/controller/UserTicketController';

const Page: NextPage = () => {
	//* Modules
	const marketPlaceApplicationController = new DefaultController(
		'MarketPlaceApplication'
	);
	const router = useRouter();
	//* Constants
	const marketPlaceGeneralHeaderData: TableHeaderProps[] = [
		{
			label: 'NO',
			value: '',
			format: (value, key, idx) => {
				return page * 10 + (idx + 1);
			},
			align: 'left',
		},
		{
			label: '혜택 내용',
			value: 'MarketPlace',
			align: 'center',
			format: (value) => {
				return value?.TITLE;
			},
		},
		{
			label: '제공 회사',
			value: 'MarketPlace',
			align: 'center',
			format: (value) => {
				return value.COMPANY;
			},
		},
		{
			label: '신청일',
			value: 'MarketPlace',
			format: (value) => {
				return moment(value.CREATED_AT).format('YYYY-MM-DD');
			},
			align: 'center',
		},
		// {
		// 	label: '삭제하기',
		// 	value: 'SERVICE_LINK',
		// 	customValue: (value) => {
		// 		return value;
		// 	},
		// 	align: 'center',
		// 	customView: (value) => {
		// 		return value.isPossibleUsing ? (
		// 			<Button
		// 				variant="contained"
		// 				onClick={() => {
		// 					window.open(value.Ticket.SERVICE_LINK);
		// 				}}
		// 				sx={{
		// 					fontWeight: '400',
		// 					fontSize: '12px',
		// 				}}
		// 			>
		// 				사용하기
		// 			</Button>
		// 		) : (
		// 			<Typography>사용 불가</Typography>
		// 		);
		// 	},
		// },
	];

	//* States
	/**
	 * 마켓 플레이스 리스트
	 */
	const [marketPlaceList, setMarketPlaceList] = React.useState([]);
	/**
	 * 총 데이터 크기
	 */
	const [totalDataSize, setTotalDataSize] = React.useState<number>(0);

	/**
	 * 헤더 데이터
	 */
	const [marketPlaceHeaderData, setMarketPlaceHeaderData] = React.useState<
		TableHeaderProps[]
	>(marketPlaceGeneralHeaderData);

	//* Hooks
	/**
	 * 페이지네이션
	 */
	const { page, limit, handlePageChange, setLimit } = usePagination();

	/**
	 *멤버아이디 가져오기
	 */
	const { memberId, memberName } = useAppMember();

	useEffect(() => {
		memberId &&
			marketPlaceApplicationController.findAllItems(
				{
					APP_MEMBER_IDENTIFICATION_CODE: memberId,
					LIMIT: 10,
					PAGE: page,
				},
				(res) => {
					setMarketPlaceList(res.data.result.rows);
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
					xs: 2,
					md: 10,
				}}
				bgcolor={'primary.light'}
			>
				<Typography variant="h4" fontWeight={'bold'} sx={{ mb: 3 }}>
					마켓플레이스 히스토리
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
					{marketPlaceList.map((item, idx) => {
						return (
							<MobileTableRow
								index={idx}
								title={item.MarketPlace.TITLE}
								colums={[
									{
										label: '혜택 내용',
										value: item.MarketPlace.TITLE,
									},
									{
										label: '제공 회사',
										value: item.MarketPlace.COMPANY,
									},
									{
										label: '신청일',
										value: moment(
											item.MarketPlace.CREATED_DATE
										).format('YYYY-MM-DD'),
									},
									// {
									// 	label: '사용하기',
									// 	value: (
									// 		<Button
									// 			variant="contained"
									// 			onClick={() => {
									// 				if (
									// 					!item.Ticket
									// 						.SERVICE_LINK
									// 				) {
									// 					return alert(
									// 						'이동할 링크가 없습니다.'
									// 					);
									// 				}

									// 				router.push(
									// 					item.Ticket.SERVICE_LINK
									// 				);
									// 			}}
									// 			sx={{
									// 				fontWeight: '400',
									// 				fontSize: '12px',
									// 			}}
									// 		>
									// 			사용하기
									// 		</Button>
									// 	),
									// },
								]}
							/>
						);
					})}
					{marketPlaceList.length === 0 && <Nodata />}
				</Box>
				{/* 테이블 */}
				<Box
					width={'100%'}
					// p={2}
					// mt={2}
					display={{
						sm: 'block',
						xs: 'none',
					}}
				>
					<SupportiTable
						rowData={marketPlaceList}
						headerData={marketPlaceHeaderData}
					/>
				</Box>
				{/* 페이지 네이션 */}
				<Box width={'100%'} p={2}>
					<SupportiPagination
						limit={10}
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
