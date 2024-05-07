import React, { useEffect, useState } from 'react';

import { NextPage } from 'next';

import { Box, BoxProps, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import YouTube from 'react-youtube';
import Image from 'next/image';
import DefaultController from '@leanoncompany/supporti-ark-office-project/src/controller/default/DefaultController';
import ContentsCard from '../../src/views/local/internal_service/contents/ContentsCard/ContentsCard';
import dynamic from 'next/dynamic';

const Page: NextPage = () => {
	//* Modules
	const { pid } = useRouter().query;

	const SupportiViewer = dynamic(
		() =>
			import(
				'../../src/views/local/internal_service/contents/ToastViewer/ToastViewer'
			),
		{
			ssr: false,
		}
	);

	//* Controller
	const contentsController = new DefaultController('Contents');
	//* Constants

	//* States
	/**
	 * 컨텐츠 데이터
	 */
	const [contentsData, setContentsData] = useState<any>();

	/**
	 * 관련 컨텐츠 데이터
	 */
	const [relatedContentsData, setRelatedContentsData] = useState<any>();

	/**
	 *
	 * 컨텐츠 시리즈 데이터
	 */
	const [contentsSeriesData, setContentsSeriesData] = useState<any>();

	//* Functions
	/**
	 * 컨텐츠 가져오기
	 */
	const getContents = () => {
		contentsController.getOneItem(
			{
				CONTENTS_IDENTIFICATION_CODE: pid,
			},
			(res) => {
				if (res.data.result) {
					setContentsData(res.data.result);
				}
			}
		);
	};

	/**
	 * 관련 컨텐츠 가져오기
	 */
	const getRelatedContents = () => {
		contentsController.findAllItems(
			{
				CONTENTS_CATEGORY_IDENTIFICATION_CODE:
					contentsData?.CONTENTS_CATEGORY_IDENTIFICATION_CODE,
				PAGE: 0,
				LIMIT: 3,
			},
			(res) => {
				if (res.data.result) {
					console.log(res.data.result);
					setRelatedContentsData(res.data.result.rows);
				}
			}
		);
	};

	/**
	 * 관련 컨텐츠 가져오기
	 */
	const getSeriesContents = () => {
		contentsController.findAllItems(
			{
				ADMIN_IDENTIFICATION_CODE:
					contentsData?.ADMIN_IDENTIFICATION_CODE,
				PAGE: 0,
				LIMIT: 3,
			},
			(res) => {
				if (res.data.result) {
					console.log(res.data.result);
					setContentsSeriesData(res.data.result.rows);
				}
			}
		);
	};

	//* Hooks
	useEffect(() => {
		if (pid) {
			getContents();
			getRelatedContents();
			getSeriesContents();
		}
	}, [pid]);
	console.log(contentsData);

	return (
		contentsData && (
			<Box
				display={'flex'}
				alignItems={'center'}
				justifyContent={'center'}
				flexDirection={'column'}
			>
				{/* 광고배너*/}

				<Box
					bgcolor={'#fcdada'}
					width={'100%'}
					display={'flex'}
					flexDirection={{ xs: 'column', md: 'row' }}
					justifyContent={'space-between'}
					py={5}
					px={{ md: 10, xs: 3 }}
					mb={3}
				>
					<Box
						display={'flex'}
						flexDirection={'column'}
						justifyContent={'center'}
					>
						<Typography variant="h3" color={'#3A3A3A'} p={2}>
							{contentsData.TITLE}
						</Typography>
						<Typography variant="h6" color={'#3A3A3A'} ml={1.8}>
							{contentsData.SHORT_DESCRIPTION}
						</Typography>
					</Box>
					<Image
						src={'/images/icons/working.svg'}
						alt={'working'}
						width={200}
						height={200}
					/>
				</Box>

				{contentsData.TYPE === 'VIDEO' && (
					<Box width={'100%'}>
						<Box width={'80%'} m={'auto'}>
							<YouTube
								//videoId : https://www.youtube.com/watch?v={videoId} 유튜브 링크의 끝부분에 있는 고유한 아이디
								title={contentsData.TITLE}
								videoId={
									contentsData.YOUTUBE_CODE || 'W5mm6iusR44'
								}
								//opts(옵션들): 플레이어의 크기나 다양한 플레이어 매개 변수를 사용할 수 있음.
								opts={{
									width: '100%',
									height: 600,

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
						</Box>
						<Box p={5} mx={'10%'}>
							<Box display="flex" justifyContent="space-between">
								<Typography
									variant="h5"
									fontWeight={'600'}
									mb={4}
								>
									영상 소개
								</Typography>
								<Box display="flex">
									<Typography
										variant="h6"
										fontWeight={'600'}
										color="grey"
										mb={4}
									>
										작성자 {contentsData.WRITER} 님
									</Typography>
									<Typography
										variant="subtitle2"
										fontWeight={'400'}
										color="grey"
										mb={4}
										ml={1}
									>
										{contentsData.CREATED_AT?.split(
											'T'
										)[0].replaceAll('-', '.')}
									</Typography>
								</Box>
							</Box>

							{contentsData.DESCRIPTION.split('\n').map(
								(item, index) => {
									return (
										<Typography
											sx={{
												wordBreak: 'keep-all',
											}}
											variant={'subtitle2'}
											lineHeight={1.6}
										>
											{item}
										</Typography>
									);
								}
							)}
						</Box>
					</Box>
				)}

				{contentsData.TYPE === 'NEWSLETTER' && (
					<Box width={'100%'}>
						<Box p={5} mx={'10%'}>
							<Box display="flex">
								<Typography
									variant="h6"
									fontWeight={'600'}
									color="grey"
									mb={4}
									ml="auto"
								>
									작성자 {contentsData.WRITER} 님
								</Typography>
								<Typography
									variant="subtitle2"
									fontWeight={'400'}
									color="grey"
									mb={4}
									ml={1}
								>
									{contentsData.CREATED_AT?.split(
										'T'
									)[0].replaceAll('-', '.')}
								</Typography>
							</Box>

							<SupportiViewer data={contentsData.DESCRIPTION} />
						</Box>
					</Box>
				)}

				{/** 관련 컨텐츠 영역 */}
				<Box mt={10} textAlign={'left'}>
					<Typography variant="h5" fontWeight={600} my={3}>
						관련 컨텐츠
					</Typography>
					<Box display={'flex'} gap={2}>
						{relatedContentsData?.map((item: any, index: any) => {
							return <ContentsCard data={item} key={index} />;
						})}
					</Box>
				</Box>

				{/** 시리즈 컨텐츠 영역 */}
				<Box mb={10} textAlign={'left'}>
					<Typography variant="h5" fontWeight={600} my={3}>
						시리즈
					</Typography>
					<Box display={'flex'} gap={2}>
						{contentsSeriesData?.map((item: any, index: any) => {
							return <ContentsCard data={item} key={index} />;
						})}
					</Box>
				</Box>
			</Box>
		)
	);
};

export default Page;
