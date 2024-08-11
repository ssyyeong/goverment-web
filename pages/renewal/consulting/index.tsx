import React, { useEffect } from 'react';
import { NextPage } from 'next';
import { Box } from '@mui/material';

import DefaultController from '@leanoncompany/supporti-ark-office-project/src/controller/default/DefaultController';
import { ServiceListLayout } from '../../../src/views/layout/ServiceListLayout';

const Page: NextPage = () => {
	//* States
	/**
	 * 컨설팅 데이터 리스트
	 */
	const [consultingDataList, setConsultingDataList] = React.useState([]);

	/**
	 * 컨설팅 리스트 가져오기
	 */
	useEffect(() => {
		const consultingController = new DefaultController('ConsultingProduct');
		consultingController.findAllItems(
			{
				PURCHASE_AVAILABLE_YN: 'Y',
			},
			(res) => {
				setConsultingDataList(res.data.result.rows);
			},
			(err) => {}
		);
	});

	return (
		<Box
			width={'100%'}
			p={{
				xs: 2,
				md: 10,
			}}
		>
			<ServiceListLayout
				title="지금 신청 가능한 컨설팅"
				dataList={consultingDataList}
				type="consulting"
			/>
		</Box>
	);
};

export default Page;
