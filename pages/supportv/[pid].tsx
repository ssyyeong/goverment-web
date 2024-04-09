import React, { useEffect, useState } from 'react';

import { NextPage } from 'next';

import { Box, BoxProps, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import YouTube from 'react-youtube';
import Image from 'next/image';
import DefaultController from '@leanoncompany/supporti-ark-office-project/src/controller/default/DefaultController';

const Page: NextPage = () => {
	//* Modules
	const { pid } = useRouter().query;
	//* Controller
	const contentsController = new DefaultController('Contents');
	//* Constants
	//* States
	/**
	 * 컨텐츠 데이터
	 */
	const [contentsData, setContentsData] = useState<any>();

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
	//* Hooks
	useEffect(() => {
		if (pid) {
			getContents();
		}
	}, [pid]);

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
				<Box width={'100%'}>
					<Box width={'80%'} m={'auto'}>
						<YouTube
							//videoId : https://www.youtube.com/watch?v={videoId} 유튜브 링크의 끝부분에 있는 고유한 아이디
							title={contentsData.TITLE}
							videoId={contentsData.YOUTUBE_CODE || 'W5mm6iusR44'}
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
						<Typography variant="h5" fontWeight={'600'} mb={4}>
							영상 소개
						</Typography>
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
			</Box>
		)
	);
};

export default Page;
