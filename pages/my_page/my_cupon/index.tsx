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
	const userTicketController = new UserTicketController();
	const router = useRouter();
	//* Constants
	const userTicketGeneralHeaderData: TableHeaderProps[] = [
		{
			label: 'NO',
			value: '',
			format: (value, key, idx) => {
				return page * 10 + (idx + 1);
			},
			align: 'left',
		},
		{
			label: '티켓명',
			value: 'Ticket.TICKET_NAME',
			customValue: (value) => {
				return (
					<Box sx={{ display: 'flex', gap: 1 }}>
						<Typography>
							{value.Ticket.TICKET_NAME}
							{value.Ticket.SUMMARY && (
							<Tooltip
								title={value.Ticket.SUMMARY}
								arrow
								slotProps={{
									popper: {
										modifiers: [
											{
												name: 'offset',
												options: {
													offset: [0, -14],
												},
											},
										],
									},
								}}
							>
								<IconButton size="small">
									<HelpOutlineIcon fontSize="small" />
								</IconButton>
							</Tooltip>
						)}
						</Typography>
		
					</Box>
				);
			},
			align: 'center',
		},
		{
			label: '서비스',
			value: 'Ticket.CATEGORY',
			customValue: (value) => {
				return value.Ticket.CATEGORY;
			},
			align: 'center',
			format: (value) => {
				return value;
			},
		},
		{
			label: '만료일',
			value: 'EXPIRED_DATE',
			format: (value) => {
				return moment(value).format('YYYY-MM-DD');
			},
			align: 'center',
		},
		{
			label: '사용하기',
			value: 'SERVICE_LINK',
			customValue: (value) => {
				return value;
			},
			align: 'center',
			customView: (value) => {
				return value.isPossibleUsing ? (
					<Button
						variant="contained"
						onClick={() => {
							window.open(value.Ticket.SERVICE_LINK);
						}}
						sx={{
							fontWeight: '400',
							fontSize: '12px',
						}}
					>
						사용하기
					</Button>
				) : (
					<Typography>사용 불가</Typography>
				);
			},
		},
	];

	//* States
	/**
	 * 티켓 리스트
	 */
	const [userTicketList, setUserTicketList] = React.useState([]);
	/**
	 * 총 데이터 크기
	 */
	const [totalDataSize, setTotalDataSize] = React.useState<number>(0);

	/**
	 * 헤더 데이터
	 */
	const [userTicketHeaderData, setUserTicketHeaderData] = React.useState<
		TableHeaderProps[]
	>(userTicketGeneralHeaderData);

	//* Hooks
	/**
	 * 페이지네이션
	 */
	const { page, limit, handlePageChange, setLimit } = usePagination();
	/**
	 *멤버아이디 가져오기
	 */
	const { memberId } = useAppMember();
	useEffect(() => {
		memberId &&
			userTicketController.findAllItems(
				{
					APP_MEMBER_IDENTIFICATION_CODE: memberId,
					LIMIT: 10,
					PAGE: page,
				},
				(res) => {
					setUserTicketList(res.data.result.rows);
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
					내 티켓
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
					{userTicketList.map((item, idx) => {
						return (
							<MobileTableRow
								index={idx}
								title={item.Ticket.TICKET_NAME}
								colums={[
									{
										label: '서비스',
										value: item.Ticket.CATEGORY,
									},
									{
										label: '만료일',
										value: moment(item.EXPIRED_DATE).format(
											'YYYY-MM-DD'
										),
									},
									{
										label: '사용하기',
										value: (
											<Button
												variant="contained"
												onClick={() => {
													router.push(
														item.SERVICE_LINK
													);
												}}
												sx={{
													fontWeight: '400',
													fontSize: '12px',
												}}
											>
												사용하기
											</Button>
										),
									},
								]}
							/>
						);
					})}
					{userTicketList.length === 0 && <Nodata />}
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
						rowData={userTicketList}
						headerData={userTicketHeaderData}
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
