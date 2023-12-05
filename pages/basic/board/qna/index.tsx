import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import BaseList from '@qillie-corp/ark-office-project/src/layout/List/base/BaseList/BaseList';
import { IListHeader } from '@qillie-corp/ark-office-project/src/@types/layout/list/list';
import moment from 'moment';
import BoardController from '@qillie-corp/ark-office-project/src/controller/default/BoardController';
import DataUtil from '@qillie-corp/ark-office-project/src/utils/data/DataUtil';
import { memory } from '../../../_app';
type Props = {};

const index = (props: Props) => {
	const dataUtil = new DataUtil();
	const modelName = 'QnaBoardQuestion';

	const controller = new BoardController(modelName);
	const [header, setHeader] = useState<IListHeader[]>([
		{
			label: '제목',
			key: 'TITLE',
			gridMd: 3,
			gridXs: 3,
		},
		{
			label: '내용',
			key: 'CONTENT',
			gridMd: 6,
			gridXs: 6,
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
				memory={memory}
				filterList={filterList}
				modelIdKey={
					dataUtil.convertToUpperCasedUnderbarSeparated(modelName) +
					'_IDENTIFICATION_CODE'
				}
				disableWriteBtn={true}
				getAllCallback={controller.getAllItems.bind(controller)}
				tableHeader={header}
			/>
		</Box>
	);
};

export default index;
