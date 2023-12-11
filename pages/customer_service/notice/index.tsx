import React, { useEffect } from 'react';

import { NextPage } from 'next';

import { Box, BoxProps, Typography } from '@mui/material';
import DefaultController from '@qillie-corp/ark-office-project/src/controller/default/DefaultController';

import AccordianBox from '../../../src/views/local/common/AccordianBox/AccordianBox';

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
			{},
			(res) => setNoticeList(res.data.result.rows),
			(err) => console.log(err)
		);
	}, []);
	return (
		<Box>
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
						/>
					);
				})}
			</Box>
		</Box>
	);
};

export default Page;
