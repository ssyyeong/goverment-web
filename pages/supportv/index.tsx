import React, { useEffect, useState } from 'react';

import { NextPage } from 'next';

import { Box, BoxProps, Grid, Tab, Tabs, Typography } from '@mui/material';
import Image from 'next/image';
import { Thumbnail } from '@leanoncompany/supporti-react-ui';
import { useRouter } from 'next/router';
import DefaultController from '@leanoncompany/supporti-ark-office-project/src/controller/default/DefaultController';
import { usePagination } from '../../src/hooks/usePagination';
import SupportiPagination from '../../src/views/global/SupportiPagination';
import YouTube from 'react-youtube';
import Nodata from '../../src/views/global/NoData/NoData';
import SupportiInput from '../../src/views/global/SupportiInput';
import ContentsCard from '../../src/views/local/internal_service/contents/ContentsCard/ContentsCard';
import { ContentsController } from '../../src/controller/ContentsController';

const Page: NextPage = () => {
	//* Modules
	const router = useRouter();
	//* Controller
	const contentsController = new DefaultController('Contents');
	const contentsCategoryController = new DefaultController(
		'ContentsCategory'
	);
	const contentPeriodController = new ContentsController();
	//* Constants
	/**
	 * 탭 리스트
	 */
	const tabList = [
		{
			title: '전체',
			value: 0,
		},
		{
			title: '사업자 등록',
			value: 1,
		},
		{
			title: '세무신고',
			value: 2,
		},
		{
			title: '노무관리',
			value: 3,
		},
		{
			title: '투자유치',
			value: 4,
		},
	];
	//* States
	/**
	 * 탭
	 */
	const [tab, setTab] = useState<string>('전체');
	/**
	 * 컨텐츠 데이터
	 */
	const [contentsDataList, setContentsDataList] = useState<[]>([]);
	/**
	 * 추천 컨텐츠 데이터
	 */
	const [recommendedContent, setRecommendedContent] = useState<[]>([]);

	/**
	 * 컨텐츠 카테고리 데이터
	 */
	const [contentsCategoryList, setContentsCategoryList] = useState<any[]>([]);
	/**
	 * 데이터 총 길이
	 */
	const [totalDataCount, setTotalDataCount] = useState<number>();

	/**
	 *
	 * 검색어
	 */
	const [keyword, setKeyword] = useState<string>('');
	//* Functions
	/**
	 * 컨텐츠 가져오기
	 */
	const getContents = () => {
		contentsController.findAllItems(
			{
				CONTENTS_CATEGORY_IDENTIFICATION_CODE:
					tab === '전체' ? undefined : tab,
				KEYWORD: { columnKey: 'TITLE', keyword: keyword },
				PAGE: page,
				LIMIT: 9,
			},
			(res) => {
				if (res.data.result) {
					setTotalDataCount(res.data.result.count);
					setContentsDataList(res.data.result.rows);
				}
			}
		);
	};
	/**
	 * 추천 컨텐츠 가져오기
	 */
	const getRecommendedContentsList = () => {
		contentPeriodController.findAllItems(
			{
				PAGE: 0,
				LIMIT: 3,
			},
			(res) => {
				if (res.data.result) {
					console.log(res);
					setRecommendedContent(res.data.result.rows);
				}
			}
		);
	};
	/**
	 * 카테고리 리스트 조회
	 */
	const getCategoryList = () => {
		contentsCategoryController.findAllItems(
			{},
			(res) => {
				setContentsCategoryList(res.data.result.rows);
			},
			(err) => console.log(err)
		);
	};

	//* Hooks

	/**
	 * 페이징 관련
	 */
	const { page, limit, handlePageChange, setLimit } = usePagination();
	/**
	 * 추천 컨텐츠
	 */
	useEffect(() => {
		getRecommendedContentsList();
		getCategoryList();
	}, []);
	/**
	 * 컨텐츠
	 */
	useEffect(() => {
		getContents();
	}, [page, tab, keyword]);
	/**
	 * 탭 변경시 페이지 초기화
	 */
	useEffect(() => {
		handlePageChange(1);
	}, [tab]);

	return (
		<Box
			width={'100%'}
			display={'flex'}
			flexDirection={'column'}
			alignItems={'center'}
			justifyContent={'center'}
		>
			{/* 광고배너*/}
			<Box
				bgcolor={'primary.main'}
				width={'100%'}
				display={'flex'}
				justifyContent={'space-between'}
				py={5}
				px={10}
			>
				<Box
					display={'flex'}
					flexDirection={'column'}
					justifyContent={'center'}
					width={'50%'}
				>
					<Typography
						variant="h5"
						color={'white'}
						ml={1.8}
						fontWeight={'400'}
					>
						실제 투자자가 알려주는
					</Typography>
					<Typography variant="h3" color={'white'} p={2}>
						성공적인 투자유치를 위한 IR작성법.mov
					</Typography>
				</Box>
				<Image
					src={'/images/icons/working.svg'}
					alt={'working'}
					width={300}
					height={300}
				/>
			</Box>

			{/* 메인 영상3개 */}
			{/* <Box
				display={'flex'}
				width={'100%'}
				bgcolor={'#bbbbbb'}
				p={8}
				mb={3}
			>
				<Box width={'100%'}>
					<Typography
						variant="h3"
						color={'white'}
						textAlign={'center'}
					>
						사업 시작을 위한 길잡이가 되는 영상 콘텐츠 SupporTV
					</Typography>
					<Typography
						textAlign={'center'}
						color={'white'}
						mt={2}
						fontWeight={'400'}
					>
						실제 투자자, 노무사, 세무사가 알려주는 유익한 영상
					</Typography>

					<Grid container spacing={2} mt={4}>
						{recommendedContent.map((recommend: any, idx) => (
							<Grid item xs={12} md={4}>
								<YouTube
									//videoId : https://www.youtube.com/watch?v={videoId} 유튜브 링크의 끝부분에 있는 고유한 아이디
									title={recommend.TITLE}
									videoId={
										recommend.YOUTUBE_CODE || 'W5mm6iusR44'
									}
									//opts(옵션들): 플레이어의 크기나 다양한 플레이어 매개 변수를 사용할 수 있음.
									opts={{
										width: '100%',
										height: 300,

										playerVars: {
											autoplay: 0, //자동재생 1
											rel: 0, //관련 동영상 표시하지 않음 (근데 별로 쓸모 없는듯..)
											modestbranding: 1, // 컨트롤 바에 youtube 로고를 표시하지 않음
										},
									}}
									style={{
										borderRadius: 20,
									}}
									//이벤트 리스너
									onEnd={(e) => {
										e.target.stopVideo(0);
									}}
								/>
							</Grid>
						))}
					</Grid>
				</Box>
			</Box> */}
			{/* 영상 리스트 */}
			<Box mt={4} width={'95%'}>
				<Grid container mt={3}>
					{/** 카테고리 영역 */}
					<Grid item xs={4} md={2}>
						<Typography variant="h6" fontWeight={'600'}>
							카테고리 바로가기
						</Typography>
						<Box
							sx={{
								borderRadius: 1,
								border: '1px solid #c8c8c8',
								p: 2,
								width: 'fit-content',
								my: 2,
								minWidth: '110px',
							}}
						>
							<Typography
								variant="subtitle2"
								color={'gray'}
								sx={{ cursor: 'pointer' }}
								onClick={() => setTab('전체')}
							>
								전체
							</Typography>
							{contentsCategoryList?.map((item, index) => {
								return (
									<Typography
										variant="subtitle2"
										color={'gray'}
										mt={1.2}
										sx={{ cursor: 'pointer' }}
										onClick={() =>
											setTab(
												item?.CONTENTS_CATEGORY_IDENTIFICATION_CODE
											)
										}
									>
										{item?.CONTENT}
									</Typography>
								);
							})}
						</Box>
					</Grid>
					{/** 콘텐츠 리스트 영역 */}
					<Grid
						item
						xs={12}
						md={8}
						sx={{ maxWidth: { md: '80vw', xs: '100vw' } }}
					>
						<Typography variant="h3" fontWeight={'700'} mb={8}>
							금주 핫한 콘텐츠
						</Typography>

						{/* <Tabs
					value={tab}
					onChange={(e, newValue) => setTab(newValue)}
					textColor="primary"
					indicatorColor="primary"
				>
					{tabList.map((item, idx) => (
						<Tab label={item.title} key={idx} value={item.title} />
					))}
				</Tabs> */}
						<Box textAlign="center" my={5}>
							<Typography color="secondary.main" variant="h4">
								준비중입니다.
							</Typography>
						</Box>
						{/* <Nodata /> */}

						{/* <Box
							overflow={'auto'}
							maxWidth={'60vw'}
							display={'flex'}
							gap={2.5}
							sx={{
								'-ms-overflow-style': 'none',
								'&::-webkit-scrollbar': {
									width: '6px',
									height: '5px !important',
									backgroundColor: 'white !important',
									padding: '1px',
									borderRadius: '20px',
								},
								'&::-webkit-scrollbar-thumb': {
									backgroundColor: '#b0b5c2',
									borderRadius: '20px',
								},
							}}
						>
							{recommendedContent.map((item: any, idx) => {
								return <ContentsCard key={idx} data={item} />;
							})}

							{recommendedContent.length === 0 && <Nodata />}
						</Box> */}
					</Grid>
					{/** 검색 영역 */}
					<Grid item xs={4} md={2}>
						{/** 검색창 */}
						<Box mt={3}>
							<SupportiInput
								type="search"
								value={keyword}
								setValue={setKeyword}
								style={{ width: '260px' }}
								additionalProps={{
									placeholder:
										'관심있는 컨텐츠를 검색해보세요.',
								}}
							/>
						</Box>
					</Grid>
				</Grid>
				<Box width={'850px'} mx="auto" my={10}>
					<Typography variant="h3" fontWeight={'700'} mb={8}>
						전체 콘텐츠
					</Typography>

					{/* <Tabs
					value={tab}
					onChange={(e, newValue) => setTab(newValue)}
					textColor="primary"
					indicatorColor="primary"
				>
					{tabList.map((item, idx) => (
						<Tab label={item.title} key={idx} value={item.title} />
					))}
				</Tabs> */}
					{/* <Box display={'flex'} gap={2.5} flexWrap={'wrap'}>
						{contentsDataList.map((item: any, idx) => {
							return <ContentsCard key={idx} data={item} />;
						})}

						{contentsDataList.length === 0 && <Nodata />}
					</Box> */}
					<Box textAlign="center" my={5}>
						<Typography color="secondary.main" variant="h4" my={5}>
							준비중입니다.
						</Typography>
					</Box>
					{/* <Nodata /> */}
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
			</Box>
		</Box>
	);
};

export default Page;
