import { Box, Grid, Typography } from '@mui/material';
import React, { useState } from 'react';
import { IListHeader } from '@qillie-corp/ark-office-project/src/@types/layout/list/list';
import BaseList from '@qillie-corp/ark-office-project/src/layout/List/base/BaseList/BaseList';
import moment from 'moment';
import BoardController from '@qillie-corp/ark-office-project/src/controller/default/BoardController';
import DataUtil from '@qillie-corp/ark-office-project/src/utils/data/DataUtil';
import { memory } from '../../_app';

type Props = {};

const index = (props: Props) => {
	const dataUtil = new DataUtil();
	const modelName = 'ScraperBot';
	const eventController = new BoardController(modelName);
	const [eventHeader, setEventHeader] = useState<IListHeader[]>([
		{
			label: '제목',
			key: 'SCRAPER_NAME',
			gridMd: 4,
			gridXs: 4,
		},
		{
			label: '설명',
			key: 'SCRAPER_DESCRIPTION',
			gridMd: 8,
			gridXs: 8,
		},
	]);

	const [filterList, setFilterList] = useState<
		{ label: string; value: string }[]
	>([
		{
			label: '제목',
			value: 'SCRAPER_NAME',
		},
		{
			label: '설명',
			value: 'SCRAPER_DESCRIPTION',
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
