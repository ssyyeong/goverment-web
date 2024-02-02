import { Box, Button, Typography } from '@mui/material';
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

import Nodata from '../../../src/views/global/NoData/NoData';
import IrQna from '../../../src/views/local/external_service/ir/IrQna/IrQna';
import IrApplicationModal from '../../../src/views/local/external_service/ir/IrApplicationModal/IrApplicationModal';

const Page: NextPage = () => {
	//* Modules
	const irApplicationController = new DefaultController('IrApplication');
	//* Constants
	const irApplicationGeneralHeaderData: TableHeaderProps[] = [
		{
			label: 'NO',
			value: '',
			format: (value, key, idx) => {
				return page * 10 + (idx + 1);
			},
			align: 'left',
		},
		{
			label: '제목',
			value: 'IrProduct.TITLE',
			customValue: (value) => {
				return value.IrProduct.TITLE;
			},
			align: 'center',
		},
		{
			label: '마감 날짜',
			value: 'DUE_DATE',
			customValue: (value) => {
				return `${moment(value.DUE_DATE).format('YYYY-MM-DD')}`;
			},
			align: 'center',
		},
	];
	const cancelIrHeaderData: TableHeaderProps = {
		label: '상태/변경',
		value: 'IR_APPLICATION_IDENTIFICATION_CODE',
		align: 'center',

		customView: (value) => {
			const selectedData = irApplicationList.find(
				(item) => item.IR_APPLICATION_IDENTIFICATION_CODE === value
			);
			return selectedData?.ADOPTED_YN === 'Y' ? (
				<Typography>선정</Typography>
			) : selectedData?.ADOPTED_YN === 'N' ? (
				<Typography>미선정</Typography>
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
	//* States
	/**
	 * 결제 정보 리스트
	 */
	const [irApplicationList, setIrApplicationList] = React.useState([]);
	/**
	 * 총 데이터 크기
	 */
	const [totalDataSize, setTotalDataSize] = React.useState<number>(0);
	/**
	 * 탭
	 */
	const [tab, setTab] = React.useState<'IR' | 'DEMODAY'>('IR');
	/**
	 * 업데이트 모달
	 */
	const [updateModal, setUpdateModal] = React.useState<boolean>(false);
	/**
	 * 업데이트 모달 데이터
	 */
	const [updateModalData, setUpdateModalData] = React.useState<any>();
	/**
	 * 헤더 데이터
	 */
	const [irApplicationHeaderData, setIrApplicationHeaderData] =
		React.useState<TableHeaderProps[]>(irApplicationGeneralHeaderData);

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
			irApplicationController.findAllItems(
				{
					APP_MEMBER_IDENTIFICATION_CODE: memberId,
					LIMIT: 10,
					PAGE: page,
				},
				(res) => {
					setIrApplicationList(res.data.result.rows);
					setTotalDataSize(res.data.result.count);
					if (tab === 'IR') {
						setIrApplicationHeaderData(
							irApplicationGeneralHeaderData.concat(
								cancelIrHeaderData
							)
						);
					} else {
						setIrApplicationHeaderData(
							irApplicationGeneralHeaderData.concat(
								cancelIrHeaderData
							)
						);
					}
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
					IR / 데모데이 신청 내역
				</Typography>
				{/* 탭 */}
				<Box
					width={{
						sm: '50%',
						xs: '100%',
					}}
				>
					<SupportiToggle
						chipDataList={[
							{
								label: 'IR 신청',
								value: 'IR',
							},
							{
								label: '데모데이 신청',
								value: 'DEMODAY',
							},
						]}
						angled
						disablePadding
						value={tab}
						setValue={setTab}
						chipHeight={40}
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
				{/*모바일 테이블 */}
				{/* <Box
					width={'100%'}
					py={2}
					display={{
						sm: 'none',
						xs: 'block',
					}}
				>
					{irApplicationList.map((item, idx) => {
						return (
							<MobileTableRow
								index={idx}
								title={item.IrProduct.PRODUCT_NAME}
								colums={[
									{
										label: '금액',
										value: item.IrProduct.PRICE + '원',
									},
									{
										label: '일정',
										value: `${moment(
											item.RESERVATION_DATE
										).format('YYYY-MM-DD')} ${
											item.RESERVATION_START_TIME
										}`,
									},
									{
										label: '변경',
										value:
											tab !== 'COMPLETED' &&
											item.CANCELED_YN === 'Y' ? (
												<Typography>취소됨</Typography>
											) : item.CAN_BE_CANCELED === 'N' ? (
												<Typography color={'error'}>
													변경불가
												</Typography>
											) : (
												tab !== 'COMPLETED' && (
													<Button
														variant="contained"
														onClick={() => {
															setUpdateModalData(
																item
															);
															setUpdateModal(
																true
															);
														}}
														sx={{
															fontWeight: '400',
															fontSize: '12px',
														}}
													>
														변경
													</Button>
												)
											),
									},
								]}
							/>
						);
					})}
					{irApplicationList.length === 0 && <Nodata />}
				</Box> */}
				{/* 테이블 */}
				<Box
					width={'100%'}
					// p={2}
					// mt={2}
					// display={{
					// 	sm: 'block',
					// 	xs: 'none',
					// }}
				>
					<SupportiTable
						rowData={irApplicationList}
						headerData={irApplicationHeaderData}
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
			{updateModalData && (
				<IrApplicationModal
					open={updateModal}
					handleClose={() => setUpdateModal(false)}
					irProductId={updateModalData.IR_PRODUCT_IDENTIFICATION_CODE}
					memberId={memberId}
					date={updateModalData.ADOPTION_DATE}
					mode={'modify'}
					irApplicationData={updateModalData}
				/>
			)}
		</InternalServiceDrawer>
	);
};

export default Page;
