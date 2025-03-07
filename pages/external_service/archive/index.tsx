import React, { useEffect, useState } from 'react';
import { NextPage } from 'next';
import { Box, Button, Typography } from '@mui/material';
import { useRouter } from 'next/router';

import DefaultController from '@leanoncompany/supporti-ark-office-project/src/controller/default/DefaultController';

import { usePagination } from '../../../src/hooks/usePagination';
import Nodata from '../../../src/views/global/NoData/NoData';
import { SupportiAlertModal } from '../../../src/views/global/SupportiAlertModal';
import { useAppMember } from '../../../src/hooks/useAppMember';
import SupportiPagination from '../../../src/views/global/SupportiPagination';
import axios from 'axios';
import { SupportBusinessManagementController } from '../../../src/controller/SupportBusinessManagementController';

const Page: NextPage = () => {
	//* Modules
	const router = useRouter();
	//* States
	/**
	 * 아카이브 자동차 산업 정보 리스트
	 */
	const [archiveData1List, setArchiveData1List] = React.useState([]);
	const [archiveData2List, setArchiveData2List] = React.useState([]);

	/**
	 * 탭
	 */
	const [tab, setTab] = React.useState(undefined);
	/**
	 * 페이징 관련
	 */
	const { page, limit, handlePageChange, setLimit } = usePagination();
	/**
	 *
	 * 전체 글 총 갯수
	 */
	const [totalDataCount, setTotalDataCount] = React.useState<number>(0);
	/**
	 * 알럿 모달
	 */
	const [alertModal, setAlertModal] = React.useState<boolean>(false);
	/**
	 * 알럿 모달 타입
	 */
	const [alertModalType, setAlertModalType] =
		React.useState<'login'>('login');

	const [id, setId] = useState<string>('');
	/**
	 * 유저 아이디 가져오는 훅
	 */
	const { memberId } = useAppMember();

	const controller = new SupportBusinessManagementController();

	//* Functions
	/**
	 * 아카이브 리스트 가져오기
	 */
	const getArchive = async () => {
		controller.getArchive(
			{},
			(res) => {
				setArchiveData1List(res.data.result.data.automotiveList);
				setArchiveData2List(res.data.result.data.cosmeticList);
			},
			(err) => {
				console.log(err);
			}
		);
	};

	/**
	 * 아카이브 리스트 가져오기
	 */
	useEffect(() => {
		getArchive();
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
				<Typography variant="h6">지식아카이브</Typography>
			</Box>
			<Box
				sx={{
					p: 2.5,
				}}
			>
				<Typography variant="h5" fontWeight={700}>
					{' '}
					자동차 산업 정보
				</Typography>
			</Box>
			{archiveData1List?.length === 0 ? (
				<Nodata />
			) : (
				<Box
					display="flex"
					gap={3}
					flexWrap="wrap"
					justifyContent={{
						xs: 'center',
						md: 'flex-start',
					}}
				>
					{archiveData1List?.map((item, index) => {
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
									window.open(item.link, '_blank');
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
										backgroundSize: 'cover',
										backgroundImage:
											item.thumbnail != ''
												? `url(${item.thumbnail})`
												: `url(/images/main/container.jpg)`,
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
									<Typography
										variant="h6"
										fontWeight={600}
										sx={{
											wordBreak: 'keep-all',
											overflow: 'hidden',
											textOverflow: 'ellipsis',
											display: '-webkit-box',
											WebkitLineClamp: 1,
											WebkitBoxOrient: 'vertical',
											minHeight: '2em', // 2줄 높이 보장
										}}
									>
										{item.outline}
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
										{item.subject}
									</Typography>
									<Typography
										variant="body1"
										fontWeight={400}
										sx={{
											pb: 2.5,
											wordBreak: 'keep-all',
											color: 'primary.main',
										}}
									>
										{item.classification}
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
										{item.regDt}
									</Typography>
								</Box>
							</Box>
						);
					})}
				</Box>
			)}
			<Box
				sx={{
					p: 2.5,
				}}
			>
				<Typography variant="h5" fontWeight={700}>
					화장품 산업 정보
				</Typography>
			</Box>
			{archiveData2List?.length === 0 ? (
				<Nodata />
			) : (
				<Box
					display="flex"
					gap={3}
					flexWrap="wrap"
					justifyContent={{
						xs: 'center',
						md: 'flex-start',
					}}
				>
					{archiveData2List?.map((item, index) => {
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
									window.open(item.link, '_blank');
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
										backgroundSize: 'cover',
										backgroundImage:
											item.thumbnail != ''
												? `url(${item.thumbnail})`
												: `url(/images/main/container.jpg)`,
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
									<Typography
										variant="h6"
										fontWeight={600}
										sx={{
											wordBreak: 'keep-all',
											overflow: 'hidden',
											textOverflow: 'ellipsis',
											display: '-webkit-box',
											WebkitLineClamp: 1,
											WebkitBoxOrient: 'vertical',
											minHeight: '2em', // 2줄 높이 보장
										}}
									>
										{item.outline}
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
										{item.subject}
									</Typography>
									<Typography
										variant="body1"
										fontWeight={400}
										sx={{
											pb: 2.5,
											wordBreak: 'keep-all',
											color: 'primary.main',
										}}
									>
										{item.classification}
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
										{item.regDt}
									</Typography>
								</Box>
							</Box>
						);
					})}
				</Box>
			)}
		</Box>
	);
};

export default Page;
