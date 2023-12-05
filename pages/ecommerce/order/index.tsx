import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import BaseList from '@qillie-corp/ark-office-project/src/layout/List/base/BaseList/BaseList';
import { IListHeader } from '@qillie-corp/ark-office-project/src/@types/layout/list/list';
import moment from 'moment';
import DefaultController from '@qillie-corp/ark-office-project/src/controller/default/DefaultController';
import DataUtil from '@qillie-corp/ark-office-project/src/utils/data/DataUtil';
import { memory } from '../../_app';
type Props = {};

const index = (props: Props) => {
	const dataUtil = new DataUtil();

	const modelName = 'ProductPurchaseHistory';

	const controller = new DefaultController(modelName);
	const [header, setHeader] = useState<IListHeader[]>([
		{
			label: '제목',
			key: 'TITLE',
			gridMd: 9,
			gridXs: 9,
		},
		{
			label: '작성일',
			key: 'CREATED_AT',
			gridMd: 3,
			gridXs: 3,
		},
	]);

	const [filterList, setFilterList] = useState<
		{ label: string; value: string }[]
	>([
		{
			label: '제목',
			value: 'TITLE',
		},
		{
			label: '내용',
			value: 'CONTENT',
		},
	]);

	return (
		<Box>
			<BaseList
				disableTotal={true}
				modelIdKey={
					dataUtil.convertToUpperCasedUnderbarSeparated(modelName) +
					'_IDENTIFICATION_CODE'
				}
				memory={memory}
				getAllCallback={controller.getAllItems.bind(controller)}
				tableHeader={header}
			/>
		</Box>
	);
};

export default index;
