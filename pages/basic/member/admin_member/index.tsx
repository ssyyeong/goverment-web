import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import BaseList from '@qillie-corp/ark-office-project/src/layout/List/base/BaseList/BaseList';
import { IListHeader } from '@qillie-corp/ark-office-project/src/@types/layout/list/list';
import DefaultController from '@qillie-corp/ark-office-project/src/controller/default/DefaultController';
import DataUtil from '@qillie-corp/ark-office-project/src/utils/data/DataUtil';
import { memory } from '../../../_app';
type Props = {};

const index = (props: Props) => {
	const dataUtil = new DataUtil();
	const modelName = 'AdminMember';
	const controller = new DefaultController(modelName);
	const [header, setHeader] = useState<IListHeader[]>([
		{
			label: '아이디',
			key: 'USER_NAME',
			gridMd: 4.5,
			gridXs: 4.5,
		},
		{
			label: '이름',
			key: 'FULL_NAME',
			gridMd: 4.5,
			gridXs: 4.5,
		},
		{
			label: '가입일',
			key: 'CREATED_AT',
			gridMd: 3,
			gridXs: 3,
		},
	]);
	const [filterList, setFilterList] = useState<
		{ label: string; value: string }[]
	>([
		{
			label: '아이디',
			value: 'USER_NAME',
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
				filterList={filterList}
			/>
		</Box>
	);
};

export default index;
