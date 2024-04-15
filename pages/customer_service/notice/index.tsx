import React, { useEffect } from 'react';

import { NextPage } from 'next';

import { Box, BoxProps, Typography } from '@mui/material';
import DefaultController from '@leanoncompany/supporti-ark-office-project/src/controller/default/DefaultController';

import AccordianBox from '../../../src/views/local/common/AccordianBox/AccordianBox';
import Nodata from '../../../src/views/global/NoData/NoData';

const Page: NextPage = () => {
	//* Modules
	const noticeController = new DefaultController('NoticeBoardContent');
	//* Constants
	//* States
	const [noticeList, setNoticeList] = React.useState([]);
	//* Functions
	//* Hooks
	/**
	 * 공지사항 리스트 조회
	 */
	useEffect(() => {
		noticeController.findAllItems(
			{
				SORT_KEY: 'CREATED_AT',
				SORT_DIRECTION: 'DESC',
			},
			(res) => setNoticeList(res.data.result.rows),
			(err) => console.log(err)
		);
	}, []);

	return (
		<Box p={{ md: 10, xs: 3 }}>
			<Typography variant="h5" fontWeight={'bold'}>
				공지사항
			</Typography>
			<Typography
				variant="subtitle1"
				fontWeight="600"
				color={'secondary.main'}
				sx={{ my: 2 }}
			>
				서포티의 공지사항을 확인해보세요.
			</Typography>
			<Box mt={4}>
				{noticeList.map((notice) => {
					return (
						<AccordianBox
							title={notice.TITLE}
							content={notice.CONTENT}
							created_at={notice.CREATED_AT}
							type="공지"
							notAQna
						/>
					);
				})}
			</Box>
			{noticeList.length === 0 && <Nodata />}
		</Box>
	);
};

export default Page;
