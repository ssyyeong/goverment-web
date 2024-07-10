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
import InternalServiceDrawer from '../../../src/views/local/internal_service/common/InternalServiceDrawer';
import MobileTableRow from '../../../src/views/local/external_service/mobileTableRow/MobileTableRow';
import Nodata from '../../../src/views/global/NoData/NoData';
import addCommaToNumber from '../../../src/function/DataFormatter/addCommaToNumber';

const Page: NextPage = () => {
	//* Modules
	const mentoringApplicationController = new DefaultController(
		'MentoringApplication'
	);
	//* Constants
	const mentoringGenralHeaderData: TableHeaderProps[] = [
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
			value: 'MentoringProduct.TITLE',
			customValue: (value) => {
				return value.MentoringProduct.TITLE;
			},
			align: 'center',
		},
		{
			label: '금액',
			value: 'MentoringProduct.REAL_PRICE',
			customValue: (value) => {
				return value.MentoringProduct.REAL_PRICE;
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
				return value.RESERVATION_DATE;
			},
			format: (value) => {
				const time = JSON.parse(value);

				return time.map((item) => {
					return item.DATE + ' ' + item.START + '~' + item.END + ' ';
				});
			},
			align: 'center',
		},
		{
			label: '결제여부',
			value: 'PAYMENT_YN',
			format: (value) => {
				return value == 'Y' ? '결제완료' : '미결제';
			},
			align: 'center',
		},
	];
	const cancelmentoringHeaderData: TableHeaderProps = {
		label: '취소',
		value: 'MENTORING_APPLICATION_IDENTIFICATION_CODE',
		align: 'center',
		customValue: (value) => {
			return value.CANCELED_YN === 'N'
				? value.PAYMENT_YN == 'Y' &&
				  new Date(JSON.parse(value.RESERVATION_DATE)[0].DATE) <
						new Date(moment().format('YYYY.MM.DD'))
					? '결제완료'
					: value.MENTORING_APPLICATION_IDENTIFICATION_CODE
				: '취소됨';
		},
		customView: (value) => {
			return value == '취소됨' ? (
				<Typography>취소됨</Typography>
			) : value == '결제완료' ? (
				<Typography>취소불가</Typography>
			) : (
				<Button
					variant="contained"
					onClick={() => {
						setSelectedmentoringId(value);
						setCancelModal(true);
					}}
					sx={{
						fontWeight: '400',
						fontSize: '12px',
					}}
				>
					취소
				</Button>
			);
		},
	};
	//* States
	/**
	 * 탭
	 */
	const [tab, setTab] = React.useState(0);
	/**
	 * 멘토링 데이터 리스트
	 */
	const [mentoringDataList, setmentoringDataList] = React.useState([]);
	/**
	 * 멘토링 데이터 총 개수
	 */
	const [totalDataCount, setTotalDataCount] = React.useState<number>(0);
	/**
	 * 취소 모달
	 */
	const [cancelModal, setCancelModal] = React.useState(false);
	/**
	 * 선택된 멘토링 아이디
	 */
	const [selectedmentoringId, setSelectedmentoringId] = React.useState(0);
	/**
	 * 멘토링 테이블 헤더 데이터
	 */
	const [mentoringHeaderData, setmentoringHeaderData] = React.useState<
		TableHeaderProps[]
	>(mentoringGenralHeaderData);
	//* Functions
	/**
	 * 멘토링 취소하기
	 */
	const cancelmentoring = (id) => {
		mentoringApplicationController.updateItem(
			{
				MENTORING_APPLICATION_IDENTIFICATION_CODE: id,
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
	 * 멘토링 리스트 가져오기
	 */
	useEffect(() => {
		memberId &&
			mentoringApplicationController.findAllItems(
				{
					APP_MEMBER_IDENTIFICATION_CODE: memberId,
					LIMIT: 10,
					PAGE: page,
					CANCELED_YN: tab === 2 ? 'Y' : 'N',
				},
				async (res) => {
					setTotalDataCount(res.data.result.count);
					if (tab === 1) {
						const data = [];
						await Promise.all(
							res.data.result.rows.filter((item) => {
								const time = JSON.parse(item.RESERVATION_DATE);
								if (
									new Date(time[0].DATE) <
									new Date(moment().format('YYYY.MM.DD'))
								) {
									return data.push(item);
								}
							})
						);
						setmentoringDataList(data);
					} else setmentoringDataList(res.data.result.rows);
					if (tab === 0) {
						setmentoringHeaderData([
							...mentoringGenralHeaderData,
							cancelmentoringHeaderData,
						]);
					} else {
						setmentoringHeaderData(mentoringGenralHeaderData);
					}
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
					내 멘토링 예약 내역
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
								label: '진행전 멘토링',
								value: 0,
							},
							{
								label: '진행완료 멘토링',
								value: 1,
							},
							{
								label: '취소',
								value: 2,
							},
						]}
						disablePadding
						angled
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
				<Box
					width={'100%'}
					py={2}
					display={{
						sm: 'none',
						xs: 'block',
					}}
				>
					{mentoringDataList.map((item, idx) => {
						return (
							<MobileTableRow
								index={idx}
								title={item.MentoringProduct.TITLE}
								colums={[
									{
										label: '금액',
										value:
											addCommaToNumber(
												item.MentoringProduct.REAL_PRICE
											) + '원',
									},
									{
										label: '일정',
										value: moment(
											JSON.parse(item.RESERVATION_DATE)[0]
												.DATE
										).format('YYYY-MM-DD'),
									},
									{
										label: '결제여부',
										value:
											item.PAYMENT_YN == 'Y'
												? '결제완료'
												: '미결제',
									},
									{
										label: '취소',
										value:
											item.CANCELED_YN === 'N' ? (
												tab == 0 ? (
													new Date(
														JSON.parse(
															item.RESERVATION_DATE
														)[0].DATE
													) <
													new Date(
														moment().format(
															'YYYY.MM.DD'
														)
													) ? (
														<Typography>
															취소불가
														</Typography>
													) : (
														item.PAYMENT_YN ==
															'Y' && (
															<Button
																variant="contained"
																onClick={() => {
																	setSelectedmentoringId(
																		item.Mentoring_APPLICATION_IDENTIFICATION_CODE
																	);
																	setCancelModal(
																		true
																	);
																}}
																sx={{
																	fontWeight:
																		'400',
																	fontSize:
																		'12px',
																}}
															>
																취소
															</Button>
														)
													)
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
					{mentoringDataList.length === 0 && <Nodata />}
				</Box>
				{/* 테이블 */}
				<Box
					width={'100%'}
					display={{
						sm: 'block',
						xs: 'none',
					}}
				>
					<SupportiTable
						rowData={mentoringDataList}
						headerData={mentoringHeaderData}
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
					customHandleClose={() =>
						cancelmentoring(selectedmentoringId)
					}
				/>
			</Box>
		</InternalServiceDrawer>
	);
};

export default Page;
