import { Box, Button, Typography } from '@mui/material';
import DefaultController from '@qillie-corp/ark-office-project/src/controller/default/DefaultController';
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
import InternalServiceDrawer from '../../../src/views/local/internal_service/common/InternalServiceDrawer/InternalServiceDrawer';
import ConsultingSchedularUpdate from '../../../src/views/local/external_service/consulting/ConsultingSchedular/ConsultingSchedularUpdate';

const Page: NextPage = () => {
	//* Modules
	const consultingApplicationController = new DefaultController(
		'ConsultingApplication'
	);
	const matches = false; //useMediaQuery(theme.breakpoints.down('md')
	//*
	//* States
	/**
	 * 결제 정보 리스트
	 */
	const [consultingApplicationList, setConsultingApplicationList] =
		React.useState([]);
	/**
	 * 총 데이터 크기
	 */
	const [totalDataSize, setTotalDataSize] = React.useState<number>(0);
	/**
	 * 탭
	 */
	const [tab, setTab] = React.useState<'COMPLETE' | 'WAITING'>('WAITING');
	/**
	 * 업데이트 모달
	 */
	const [updateModal, setUpdateModal] = React.useState<boolean>(false);
	/**
	 * 업데이트 모달 데이터
	 */
	const [updateModalData, setUpdateModalData] = React.useState<any>();
	//* Constants
	const consultingApplicationHeaderData: TableHeaderProps[] = [
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
			value: 'ConsultingProduct.PRODUCT_NAME',
			customValue: (value) => {
				return value.ConsultingProduct.PRODUCT_NAME;
			},
			align: 'center',
		},
		{
			label: '금액',
			value: 'ConsultingProduct.PRICE',
			customValue: (value) => {
				return value.ConsultingProduct.PRICE;
			},
			align: 'center',
			format: (value) => {
				return `${value.toLocaleString()} 원`;
			},
		},
		{
			label: '일정',
			value: 'RESERVATION_DATE',
			customValue: (value) => {
				return `${moment(value.RESERVATION_DATE).format(
					'YYYY-MM-DD'
				)} ${value.RESERVATION_START_TIME}`;
			},
			align: 'center',
		},
	];
	const cancelConsultingHeaderData: TableHeaderProps = {
		label: '변경',
		value: 'CONSULTING_APPLICATION_IDENTIFICATION_CODE',
		align: 'center',
		customView: (value) => {
			console.log(value);
			const selectedData = consultingApplicationList.find(
				(item) =>
					item.CONSULTING_APPLICATION_IDENTIFICATION_CODE === value
			);
			return selectedData.CAN_BE_CANCELED === 'N' ? (
				<Typography>예약불가</Typography>
			) : (
				<Button
					variant="contained"
					onClick={() => {
						setUpdateModalData(selectedData);
						setUpdateModal(true);
					}}
					sx={{
						fontWeight: '400',
						fontSize: '12px',
					}}
				>
					변경
				</Button>
			);
		},
	};
	//* Hooks
	/**
	 * 페이지네이션
	 */
	const { page, limit, handlePageChange, setLimit } = usePagination();
	/**
	 *결제 히스토리 가져오기
	 */
	const { memberId } = useAppMember();
	useEffect(() => {
		memberId &&
			consultingApplicationController.findAllItems(
				{
					APP_MEMBER_IDENTIFICATION_CODE: memberId,
					LIMIT: 10,
					PAGE: page,
					STATUS: tab,
				},
				(res) => {
					setConsultingApplicationList(res.data.result.rows);
					setTotalDataSize(res.data.result.count);
				},
				(err) => {
					console.log(err);
				}
			);
	}, [page, tab, memberId, updateModal]);

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
					내 컨설팅 예약 내역
				</Typography>
				{/* 탭 */}
				<SupportiToggle
					chipDataList={[
						{
							label: '진행전',
							value: 'WAITING',
						},
						{
							label: '일정완료',
							value: 'COMPLETE',
						},
					]}
					angled
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
				<Box width={'100%'} p={2} mt={2}>
					{matches ? (
						consultingApplicationList.map((item, idx) => {
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
						})
					) : (
						<SupportiTable
							rowData={consultingApplicationList}
							headerData={
								tab === 'WAITING'
									? consultingApplicationHeaderData.concat(
											cancelConsultingHeaderData
									  )
									: consultingApplicationHeaderData
							}
						/>
					)}
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
			{updateModalData && (
				<ConsultingSchedularUpdate
					open={updateModal}
					handleClose={() => setUpdateModal(false)}
					consultingData={updateModalData}
				/>
			)}
		</InternalServiceDrawer>
	);
};

export default Page;
