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
	const modelName = 'GptTextTrainDataHeader';
	const controller = new DefaultController(modelName);
	const [header, setHeader] = useState<IListHeader[]>([
		{
			label: '아이디',
			key: 'GPT_TEXT_BOT_IDENTIFICATION_CODE',
			gridMd: 2,
			gridXs: 2,
		},
		{
			label: '데이터명',
			key: 'NAME',
			gridMd: 2,
			gridXs: 2,
		},
		{
			label: '설명',
			key: 'DESCRIPTION',
			gridMd: 6,
			gridXs: 6,
		},
		{
			label: '생성일',
			key: 'CREATED_AT',
			gridMd: 2,
			gridXs: 2,
		},
	]);

	const [filterList, setFilterList] = useState<
		{ label: string; value: string }[]
	>([
		{
			label: '데이터명',
			value: 'NAME',
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
