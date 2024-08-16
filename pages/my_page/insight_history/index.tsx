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
	const insightController = new DefaultController('Insight');
	const router = useRouter();
	//* Constants
	const insightGeneralHeaderData: TableHeaderProps[] = [
		{
			label: 'NO',
			value: '',
			format: (value, key, idx) => {
				return page * 10 + (idx + 1);
			},
			align: 'left',
		},
		{
			label: '인사이트 제목',
			value: 'TITLE',
			align: 'center',
		},
		{
			label: '내용',
			value: 'DESCRIPTION',
			align: 'center',
			format: (value) => {
				return value.slice(0, 15) + '...';
			},
		},
		{
			label: '작성일',
			value: 'CREATED_DATE',
			format: (value) => {
				return moment(value).format('YYYY-MM-DD');
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
	 * 인사이트 리스트
	 */
	const [insightList, setInsighttList] = React.useState([]);
	/**
	 * 총 데이터 크기
	 */
	const [totalDataSize, setTotalDataSize] = React.useState<number>(0);

	/**
	 * 헤더 데이터
	 */
	const [insightHeaderData, setInsightHeaderData] = React.useState<
		TableHeaderProps[]
	>(insightGeneralHeaderData);

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
			insightController.findAllItems(
				{
					AUTHOR: memberName,
					LIMIT: 10,
					PAGE: page,
				},
				(res) => {
					setInsighttList(res.data.result.rows);
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
					인사이트 히스토리
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
					{insightList.map((item, idx) => {
						console.log(item);
						return (
							<MobileTableRow
								index={idx}
								title={item.TITLE}
								colums={[
									{
										label: '내용',
										value: item.DESCRIPTION.slice(0, 10),
									},
									{
										label: '작성일',
										value: moment(item.CREATED_DATE).format(
											'YYYY-MM-DD'
										),
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
					{insightList.length === 0 && <Nodata />}
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
						rowData={insightList}
						headerData={insightHeaderData}
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
