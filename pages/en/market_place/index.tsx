import React, { useEffect, useState } from 'react';

import { NextPage } from 'next';

import { Box, BoxProps, Grid, Tab, Tabs, Typography } from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/router';
import DefaultController from '@leanoncompany/supporti-ark-office-project/src/controller/default/DefaultController';
import { usePagination } from '../../../src/hooks/usePagination';
import Nodata from '../../../src/views/global/NoData/NoData';
import { SupportiAlertModal } from '../../../src/views/global/SupportiAlertModal';
import { useAppMember } from '../../../src/hooks/useAppMember';
import SupportiPagination from '../../../src/views/global/SupportiPagination';
import { useUserAccess } from '../../../src/hooks/useUserAccess';

const Page: NextPage = () => {
	//* Modules
	const router = useRouter();
	//* Controller
	const marketPlaceController = new DefaultController('MarketPlace');
	const marketPlaceCategoryController = new DefaultController(
		'MarketPlaceCategory'
	);
	const marketPlaceApplicaionController = new DefaultController(
		'MarketPlaceApplication'
	);

	//* States
	/**
	 * 마켓플레이스 리스트
	 */
	const [marketPlaceDataList, setMarketPlaceDataList] = React.useState([]);
	/**
	 * 마켓플레이스 카테고리 리스트
	 */
	const [marketPlaceCategoryDataList, setMarketPlaceCategoryDataList] =
		React.useState([]);
	/**
	 * 탭
	 */
	const [tab, setTab] = React.useState(undefined);
	/**
	 * 페이징 관련
	 */
	const { page, limit, handlePageChange, setLimit } = usePagination();
	const [totalDataCount, setTotalDataCount] = React.useState<number>(0);

	/**
	 * 알럿 모달
	 */
	const [alertModal, setAlertModal] = React.useState<boolean>(false);
	/**
	 * 알럿 모달 타입
	 */
	const [alertModalType, setAlertModalType] = React.useState<
		| 'login'
		| 'marketPlaceApply'
		| 'marketPlaceApplySuccess'
		| 'marketPlaceApplyFail'
	>('marketPlaceApply');

	const [id, setId] = useState<string>('');
	/**
	 * 유저 아이디 가져오는 훅
	 */
	const { memberId } = useAppMember();
	/**
	 * 로그인 여부 가져오는 훅
	 */
	const { access } = useUserAccess('SIGN_IN');

	/**
	 * 로그인 체크
	 */
	useEffect(() => {
		// if (access === false) {
		// 	setAlertModal(true);
		// 	setAlertModalType('login');
		// 	return;
		// }
	}, [memberId, access]);

	/**
	 * 마켓플레이스 신청 체크
	 */
	const openMarketPlaceApplyModal = (id) => {
		// 로그인 체크
		if (!memberId) {
			setAlertModal(true);
			setAlertModalType('login');
			return;
		}
		// 마켓플레이스 신청 체크
		else {
			marketPlaceApplicaionController.findAllItems(
				{
					MARKET_PLACE_IDENTIFICATION_CODE: id,
					APP_MEMBER_IDENTIFICATION_CODE: memberId,
				},
				(res) => {
					if (res.data.result.rows.length == 0) {
						setAlertModal(true);
						setAlertModalType('marketPlaceApply');
						return;
					} else {
						console.log('신청 불가능');

						setAlertModal(true);
						setAlertModalType('marketPlaceApplyFail');
						return;
					}
				}
			);
		}
	};
	/**
	 * 마켓플레이스 신청
	 */
	const applyMarketPlace = () => {
		marketPlaceApplicaionController.createItem(
			{
				MARKET_PLACE_IDENTIFICATION_CODE: id,
				APP_MEMBER_IDENTIFICATION_CODE: memberId,
			},
			(res) => {
				if (res.data.result) {
					setAlertModal(true);
					setAlertModalType('marketPlaceApplySuccess');
					return;
				}
			}
		);
	};
	//* Functions
	/**
	 * 마켓플레이스 리스트 가져오기
	 */
	const getMarketPlace = () => {
		marketPlaceController.findAllItems(
			{
				MARKET_PLACE_CATEGORY_IDENTIFICATION_CODE:
					tab === '전체' ? undefined : tab,
				PAGE: page,
				LIMIT: 10,
			},
			(res) => {
				if (res.data.result) {
					setMarketPlaceDataList(res.data.result.rows);
					setTotalDataCount(res.data.result.count);
				}
			}
		);
	};

	/**
	 * 마켓플레이스 카테고리 리스트 가져오기
	 */
	useEffect(() => {
		marketPlaceCategoryController.findAllItems(
			{},
			(res) => {
				setMarketPlaceCategoryDataList(res.data.result.rows);
			},
			(err) => console.log(err)
		);
	}, []);

	/**
	 * 마켓플레이스 리스트 가져오기
	 */
	useEffect(() => {
		getMarketPlace();
	}, [page, tab]);
	/**
	 * 탭 변경시 페이지 초기화
	 */
	useEffect(() => {
		handlePageChange(1);
	}, [tab]);

	return (
		<Box
			width={'100%'}
			p={{
				xs: 2,
				md: 10,
			}}

			// bgcolor={'primary.light'}
		>
			{/* 헤더 영역 */}
			<Box
				sx={{
					p: 2.5,
					borderRadius: 2,
					boxShadow: 'rgb(219, 219, 219) 0px 4px 10px',
				}}
			>
				<Typography variant="h6">마켓 플레이스</Typography>
			</Box>
			{/** 필터링 영역 */}
			<Box display="flex" gap={1.2} flexWrap="wrap" my={2}>
				<Typography
					sx={{
						p: 1,
						border: '1px solid #c8c8c8',
						borderRadius: 5,
						cursor: 'pointer',
						borderColor:
							tab === undefined ? 'primary.main' : '#c8c8c8',
						color: tab === undefined && 'primary.main',
					}}
					onClick={() => setTab(undefined)}
				>
					전체
				</Typography>
				{marketPlaceCategoryDataList?.map((item, index) => {
					return (
						<Typography
							sx={{
								p: 1,
								border: '1px solid #c8c8c8',
								borderRadius: 5,
								cursor: 'pointer',
								borderColor:
									tab ===
									item.MARKET_PLACE_CATEGORY_IDENTIFICATION_CODE
										? 'primary.main'
										: '#c8c8c8',
								color:
									tab ===
										item.MARKET_PLACE_CATEGORY_IDENTIFICATION_CODE &&
									'primary.main',
							}}
							onClick={() =>
								setTab(
									item.MARKET_PLACE_CATEGORY_IDENTIFICATION_CODE
								)
							}
						>
							{item.CONTENT}
						</Typography>
					);
				})}
			</Box>
			{marketPlaceDataList?.length === 0 ? (
				<Nodata />
			) : (
				<Box
					display="flex"
					gap={3}
					flexWrap="wrap"
					my={3}
					justifyContent={{
						xs: 'center',
						md: 'flex-start',
					}}
				>
					{marketPlaceDataList?.map((item, index) => {
						return (
							<Box
								key={index}
								sx={{
									borderRadius: 2,
									boxShadow:
										'rgb(219, 219, 219) 0px 4px 10px',
									width: '300px',
									display: 'flex',
									flexDirection: 'column',
									gap: 2,
									cursor: 'pointer',
								}}
								onClick={async () => {
									await setId(
										item.MARKET_PLACE_IDENTIFICATION_CODE
									);
									// openMarketPlaceApplyModal(
									// 	item.MARKET_PLACE_IDENTIFICATION_CODE
									// );
								}}
							>
								<Box
									sx={{
										position: 'relative',
										width: 300,
										height: 150,
										margin: '0 auto',
										borderTopLeftRadius: 5,
										borderTopRightRadius: 5,
										backgroundImage:
											JSON.parse(item.IMAGE).length > 0
												? `url(${
														JSON.parse(
															item.IMAGE
														)[0]
												  })`
												: `url(/images/main/container.jpg)`,
										backgroundSize: 'cover',
									}}
								></Box>
								<Box
									sx={{
										px: 2,
										display: 'flex',
										flexDirection: 'column',
										gap: 1,
									}}
								>
									{item.MarketPlaceCategory && (
										<Typography
											sx={{
												p: 1,
												border: '1px solid #c8c8c8',
												borderRadius: 5,
												cursor: 'pointer',
												width: 'fit-content',
												color: 'primary.main',
												wordBreak: 'keep-all',
											}}
										>
											{item.MarketPlaceCategory.CONTENT}
										</Typography>
									)}
									{item.CATEGORY && (
										<Typography
											sx={{
												p: 1,
												border: '1px solid #c8c8c8',
												borderRadius: 5,
												cursor: 'pointer',
												width: 'fit-content',
												color: 'primary.main',
												wordBreak: 'keep-all',
											}}
										>
											{item.CATEGORY}
										</Typography>
									)}
									<Typography
										variant="h6"
										fontWeight={600}
										sx={{ wordBreak: 'keep-all' }}
									>
										{item.TITLE}
									</Typography>
									<Typography
										variant="body1"
										fontWeight={400}
										sx={{ pb: 2.5, wordBreak: 'keep-all' }}
									>
										{item.COMPANY}
									</Typography>
									<Typography
										variant="body1"
										fontWeight={400}
										sx={{ pb: 2.5, wordBreak: 'keep-all' }}
									>
										{item.DESCRIPTION}
									</Typography>
								</Box>
							</Box>
						);
					})}
				</Box>
			)}
			{/* 페이지 네이션 */}
			<Box width={'100%'} p={2}>
				<SupportiPagination
					limit={10}
					setLimit={setLimit}
					page={page}
					handlePageChange={handlePageChange}
					count={totalDataCount}
					useLimit={false}
				/>
			</Box>
			<SupportiAlertModal
				type={alertModalType}
				open={alertModal}
				handleClose={() => {
					setAlertModal(false);
				}}
				customHandleClose={
					alertModalType == 'marketPlaceApply'
						? () => applyMarketPlace()
						: undefined
				}
			/>
		</Box>
	);
};

export default Page;
