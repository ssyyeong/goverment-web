import { Box, Grid, Typography } from '@mui/material';
import React, { useState } from 'react';
import { IListHeader } from '@qillie-corp/ark-office-project/src/@types/layout/list/list';
import BaseList from '@qillie-corp/ark-office-project/src/layout/List/base/BaseList/BaseList';
import moment from 'moment';
import BoardController from '@qillie-corp/ark-office-project/src/controller/default/BoardController';
import DataUtil from '@qillie-corp/ark-office-project/src/utils/data/DataUtil';
import { memory } from '../../../_app';
type Props = {};

const index = (props: Props) => {
	const dataUtil = new DataUtil();
	const modelName = 'EventBoardContent';
	const eventController = new BoardController(modelName);
	const [eventHeader, setEventHeader] = useState<IListHeader[]>([
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
				getAllCallback={eventController.getAllItems.bind(
					eventController
				)}
				filterList={filterList}
				tableHeader={eventHeader}
			/>
		</Box>
	);
};

export default index;
