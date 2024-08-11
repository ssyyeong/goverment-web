import React, { useEffect, useState } from 'react';
import { NextPage } from 'next';
import { Box, Button, Typography } from '@mui/material';
import { useRouter } from 'next/router';

import DefaultController from '@leanoncompany/supporti-ark-office-project/src/controller/default/DefaultController';

import { usePagination } from '../../../src/hooks/usePagination';
import Nodata from '../../../src/views/global/NoData/NoData';
import { SupportiAlertModal } from '../../../src/views/global/SupportiAlertModal';
import { useAppMember } from '../../../src/hooks/useAppMember';

const Page: NextPage = () => {
	//* Modules
	const router = useRouter();
	//* Controller
	const insightController = new DefaultController('Insight');
	const insightCategoryController = new DefaultController('InsightCategory');

	//* States
	/**
	 * 인사이트 리스트
	 */
	const [insightDataList, setInsighteDataList] = React.useState([]);
	/**
	 * 인사이트 카테고리 리스트
	 */
	const [insightCategoryDataList, setInsightCategoryDataList] =
		React.useState([]);
	/**
	 * 탭
	 */
	const [tab, setTab] = React.useState(undefined);
	/**
	 * 페이징 관련
	 */
	const { page, limit, handlePageChange, setLimit } = usePagination();

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

	//* Functions
	/**
	 * 인사이트 리스트 가져오기
	 */
	const getInsight = () => {
		insightController.findAllItems(
			{
				INSIGHT_CATEGORY_IDENTIFICATION_CODE:
					tab === '전체' ? undefined : tab,
				PAGE: page,
				LIMIT: 9,
			},
			(res) => {
				if (res.data.result) {
					setInsighteDataList(res.data.result.rows);
				}
			}
		);
	};

	/**
	 * 인사이트 카테고리 리스트 가져오기
	 */
	useEffect(() => {
		insightCategoryController.findAllItems(
			{},
			(res) => {
				setInsightCategoryDataList(res.data.result.rows);
			},
			(err) => console.log(err)
		);
	}, []);

	/**
	 * 인사이트 리스트 가져오기
	 */
	useEffect(() => {
		getInsight();
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
				display={'flex'}
				flexDirection={'row'}
				alignItems={'center'}
			>
				<Typography variant="h6">인사이트</Typography>
				<Button
					onClick={() => {
						if (!memberId) {
							setAlertModal(true);
							setAlertModalType('login');
							return;
						}
						router.push('/renewal/insight/write');
					}}
					sx={{
						display: 'block',
						width: 90,
						borderRadius: 2,
						ml: 'auto',
					}}
					variant="contained"
				>
					<Typography color={'white'} fontWeight={'600'}>
						글쓰기
					</Typography>
				</Button>
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
				{insightCategoryDataList?.map((item, index) => {
					return (
						<Typography
							sx={{
								p: 1,
								border: '1px solid #c8c8c8',
								borderRadius: 5,
								cursor: 'pointer',
								borderColor:
									tab ===
									item.INSIGHT_CATEGORY_IDENTIFICATION_CODE
										? 'primary.main'
										: '#c8c8c8',
								color:
									tab ===
										item.INSIGHT_CATEGORY_IDENTIFICATION_CODE &&
									'primary.main',
							}}
							onClick={() =>
								setTab(
									item.INSIGHT_CATEGORY_IDENTIFICATION_CODE
								)
							}
						>
							{item.CONTENT}
						</Typography>
					);
				})}
			</Box>
			{insightDataList?.length === 0 ? (
				<Nodata />
			) : (
				<Box display="flex" gap={3} flexWrap="wrap" my={3}>
					{insightDataList?.map((item, index) => {
						console.log(JSON.parse(item.IMAGE));
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
								onClick={() => {
									router.push(
										`/renewal/insight/${item.INSIGHT_IDENTIFICATION_CODE}`
									);
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
										sx={{
											pb: 2.5,
											wordBreak: 'keep-all',
											color: 'gray',
										}}
									>
										{item.AUTHOR}
									</Typography>
								</Box>
							</Box>
						);
					})}
				</Box>
			)}
			<SupportiAlertModal
				type={alertModalType}
				open={alertModal}
				handleClose={() => setAlertModal(false)}
			/>
		</Box>
	);
};

export default Page;
