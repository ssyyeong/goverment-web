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
	const modelName = 'FaqBoardContent';
	const faqController = new BoardController(modelName);
	const [faqHeader, setFaqHeader] = useState<IListHeader[]>([
		{
			label: '제목',
			key: 'TITLE',
			gridMd: 9,
			gridXs: 9,
		},
		{
			label: '작성일',
			key: 'CONTENT',
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
	const titleComponent = (el: any) => {
		return <Box>{el.TITLE}</Box>;
	};
	return (
		<Box>
			<BaseList
				disableTotal={true}
				memory={memory}
				modelIdKey={
					dataUtil.convertToUpperCasedUnderbarSeparated(modelName) +
					'_IDENTIFICATION_CODE'
				}
				filterList={filterList}
				getAllCallback={faqController.getAllItems.bind(faqController)}
				tableHeader={faqHeader}
			/>
		</Box>
	);
};

export default index;
