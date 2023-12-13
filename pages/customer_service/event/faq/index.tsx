import React, { useEffect } from 'react';

import { NextPage } from 'next';

import { Box, BoxProps, Typography } from '@mui/material';
import DefaultController from '@qillie-corp/ark-office-project/src/controller/default/DefaultController';
import AccordianBox from '../../../../src/views/local/common/AccordianBox/AccordianBox';

const Page: NextPage = () => {
	//* Modules
	const faqController = new DefaultController('FaqBoardContent');
	//* Constants
	//* States
	const [faqList, setFaqList] = React.useState([]);
	//* Functions
	//* Hooks
	/**
	 * faq 리스트 조회
	 */
	useEffect(() => {
		faqController.findAllItems(
			{},
			(res) => {
				setFaqList(res.data.result.rows);
			},
			(err) => console.log(err)
		);
	}, []);
	return (
		<Box>
			<Typography variant="h5" fontWeight={'bold'}>
				FAQ
			</Typography>
			<Typography
				variant="subtitle1"
				fontWeight="600"
				color={'secondary.main'}
				sx={{ my: 2 }}
			>
				자주 묻는 질문을 확인하여 더욱 빠르게 답변을 받아보세요.
			</Typography>
			<Box mt={4}>
				{faqList.map((notice) => {
					return (
						<AccordianBox
							title={notice.TITLE}
							content={notice.CONTENT}
							created_at={notice.CREATED_AT}
							type="FAQ"
						/>
					);
				})}
			</Box>
		</Box>
	);
};

export default Page;
