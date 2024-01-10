import React, { useEffect } from 'react';

import { NextPage } from 'next';

import { Box, BoxProps, Button, Typography } from '@mui/material';
import SupportiToggle from '../../../src/views/global/SupportiToggle';
import { usePagination } from '../../../src/hooks/usePagination';
import SupportiTable, {
	TableHeaderProps,
} from '../../../src/views/global/SupportiTable/SupportiTable';
import moment from 'moment';
import SupportiPagination from '../../../src/views/global/SupportiPagination';
import DefaultController from '@leanoncompany/supporti-ark-office-project/src/controller/default/DefaultController';
import { SupportiAlertModal } from '../../../src/views/global/SupportiAlertModal';
import { useAppMember } from '../../../src/hooks/useAppMember';
import InternalServiceDrawer from '../../../src/views/local/internal_service/common/InternalServiceDrawer/InternalServiceDrawer';
import { SeminarApplicationController } from '../../../src/controller/SeminarApplicationController';
import MobileTableRow from '../../../src/views/local/external_service/mobileTableRow/MobileTableRow';

const Page: NextPage = () => {
	//* Modules
	const seminarApplicationController = new SeminarApplicationController();
	//* Constants
	const seminarHeaderData: TableHeaderProps[] = [
		{
			label: 'NO',
			value: '',
			format: (value, key, idx) => {
				return idx + 1;
			},
			align: 'center',
		},
		{
			label: '제목',
			value: 'SeminarProduct.PRODUCT_NAME',
			customValue: (value) => {
				return value.SeminarProduct.PRODUCT_NAME;
			},
			align: 'center',
		},
		{
			label: '금액',
			value: 'SeminarProduct.PRICE',
			customValue: (value) => {
				return value.SeminarProduct.PRICE;
			},
			align: 'center',
			format: (value) => {
				return `${value.toLocaleString()} 원`;
			},
		},
		{
			label: '일정',
			value: 'SeminarProduct.SEMINAR_DATE',
			customValue: (value) => {
				return value.SeminarProduct.SEMINAR_DATE;
			},
			format: (value) => {
				return moment(value).format('YYYY-MM-DD');
			},
			align: 'center',
		},
	];
	const cancelSeminarHeaderData: TableHeaderProps = {
		label: '취소',
		value: 'SEMINAR_APPLICATION_IDENTIFICATION_CODE',
		align: 'center',
		customValue: (value) => {
			return value.CANCELED_YN === 'N'
				? value.SEMINAR_APPLICATION_IDENTIFICATION_CODE
				: '취소됨';
		},
		customView: (value) => {
			return value !== '취소됨' ? (
				<Button
					variant="contained"
					onClick={() => {
						setSelectedSeminarId(value);
						setCancelModal(true);
					}}
					sx={{
						fontWeight: '400',
						fontSize: '12px',
					}}
				>
					취소
				</Button>
			) : (
				<Typography>취소됨</Typography>
			);
		},
	};
	//* States
	/**
	 * 탭
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
	 * 취소 모달
	 */
	const [cancelModal, setCancelModal] = React.useState(false);
	/**
	 * 선택된 세미나 아이디
	 */
	const [selectedSeminarId, setSelectedSeminarId] = React.useState(0);
	//* Functions
	/**
	 * 세미나 취소하기
	 */
	const cancelSeminar = (id) => {
		seminarApplicationController.updateItem(
			{
				SEMINAR_APPLICATION_IDENTIFICATION_CODE: id,
				CANCELED_YN: 'Y',
			},
			(res) => {
				// alert('취소되었습니다.');
				setCancelModal(false);
			},
			(err) => {
				alert('취소에 실패하였습니다.');
			}
		);
	};
	//* Hooks
	/**
	 * 유저 아이디 가져오는 훅
	 */
	const { memberId } = useAppMember();
	/**
	 * 페이징 관련
	 */
	const { page, limit, handlePageChange, setLimit } = usePagination();
	/**
	 * 세미나 리스트 가져오기
	 */
	useEffect(() => {
		memberId &&
			seminarApplicationController.getSeminarApplicationList(
				{
					FIND_OPTION_KEY_LIST: {
						APP_MEMBER_IDENTIFICATION_CODE: memberId,
						LIMIT: 10,
						PAGE: page,
					},
					COMPLETED: tab === 0 ? false : true,
				},
				(res) => {
					setTotalDataCount(res.data.result.count);
					setSeminarDataList(res.data.result.rows);
				},
				(err) => {}
			);
	}, [page, tab, cancelModal, memberId]);

	return (
		<InternalServiceDrawer type="mypage">
			<Box
				width={'100%'}
				p={{
					sm: 10,
					xs: 2,
				}}
			>
				<Typography variant="h4" fontWeight={'bold'} sx={{ mb: 3 }}>
					내 세미나 예약 내역
				</Typography>
				{/* 탭 */}
				<SupportiToggle
					chipDataList={[
						{
							label: '진행전 세미나',
							value: 0,
						},
						{
							label: '진행완료 세미나',
							value: 1,
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
				{/*모바일 테이블 */}
				<Box
					width={'100%'}
					p={2}
					display={{
						sm: 'none',
						xs: 'block',
					}}
				>
					{seminarDataList.map((item, idx) => {
						return (
							<MobileTableRow
								index={idx}
								title={item.SeminarProduct.PRODUCT_NAME}
								colums={[
									{
										label: '금액',
										value: item.SeminarProduct.PRICE + '원',
									},
									{
										label: '일정',
										value: moment(
											item.SeminarProduct.SEMINAR_DATE
										).format('YYYY-MM-DD'),
									},
									{
										label: '취소',
										value:
											item.CANCELED_YN === 'N' ? (
												tab == 0 ? (
													<Button
														variant="contained"
														onClick={() => {
															setSelectedSeminarId(
																item.SEMINAR_APPLICATION_IDENTIFICATION_CODE
															);
															setCancelModal(
																true
															);
														}}
														sx={{
															fontWeight: '400',
															fontSize: '12px',
														}}
													>
														취소
													</Button>
												) : (
													<Typography>
														완료됨
													</Typography>
												)
											) : (
												<Button
													variant="contained"
													disabled
													sx={{
														fontWeight: '400',
														fontSize: '12px',
													}}
												>
													취소됨
												</Button>
											),
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
						rowData={seminarDataList}
						headerData={
							tab === 1
								? seminarHeaderData
								: [
										...seminarHeaderData,
										cancelSeminarHeaderData,
								  ]
						}
					/>
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
				<SupportiAlertModal
					type="cancel"
					open={cancelModal}
					handleClose={() => setCancelModal(false)}
					customHandleClose={() => cancelSeminar(selectedSeminarId)}
				/>
			</Box>
		</InternalServiceDrawer>
	);
};

export default Page;
