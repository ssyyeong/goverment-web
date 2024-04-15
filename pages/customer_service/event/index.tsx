import React, { useEffect } from 'react';

import { NextPage } from 'next';

import { Box, BoxProps, Typography } from '@mui/material';
import DefaultController from '@leanoncompany/supporti-ark-office-project/src/controller/default/DefaultController';
import AccordianBox from '../../../src/views/local/common/AccordianBox/AccordianBox';
import Nodata from '../../../src/views/global/NoData/NoData';

const Page: NextPage = () => {
	//* Modules
	const eventController = new DefaultController('EventBoardContent');
	//* Constants
	//* States
	const [eventList, setEventList] = React.useState([]);
	//* Functions
	//* Hooks
	/**
	 * 이벤트 리스트 조회
	 */
	useEffect(() => {
		eventController.findAllItems(
			{},
			(res) => {
				setEventList(res.data.result.rows);
			},
			(err) => console.log(err)
		);
	}, []);
	return (
		<Box p={{ md: 10, xs: 3 }}>
			<Typography variant="h5" fontWeight={'bold'}>
				이벤트
			</Typography>
			<Typography
				variant="subtitle1"
				fontWeight="600"
				color={'secondary.main'}
				sx={{ my: 2 }}
			>
				지금 서포티에서 진행중인 이벤트를 확인해보세요.
			</Typography>
			<Box mt={4}>
				{eventList.map((notice) => {
					return (
						<AccordianBox
							title={notice.TITLE}
							content={notice.CONTENT}
							created_at={notice.CREATED_AT}
							type="이벤트"
							notAQna
						/>
					);
				})}
			</Box>
			{eventList.length === 0 && <Nodata />}
		</Box>
	);
};

export default Page;
