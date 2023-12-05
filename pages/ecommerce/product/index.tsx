import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import BaseList from '@qillie-corp/ark-office-project/src/layout/List/base/BaseList/BaseList';
import { IListHeader } from '@qillie-corp/ark-office-project/src/@types/layout/list/list';
import moment from 'moment';
import DefaultController from '@qillie-corp/ark-office-project/src/controller/default/DefaultController';
import DataUtil from '@qillie-corp/ark-office-project/src/utils/data/DataUtil';
import { memory } from '../../_app';
import { Thumbnail } from '@qillie-corp/qillie-react-ui';

type Props = {};

const index = (props: Props) => {
	const dataUtil = new DataUtil();
	const modelName = 'Product';
	const controller = new DefaultController(modelName);

	const [filterList, setFilterList] = useState<
		{
			label: string;
			value: string;
		}[]
	>([
		{
			label: '상품명',
			value: 'PRODUCT_NAME',
		},
	]);

	const [header, setHeader] = useState<IListHeader[]>([
		{
			label: '상품사진',
			key: 'IMAGE',
			gridMd: 2,
			gridXs: 2,
		},
		{
			label: '제목',
			key: 'PRODUCT_NAME',
			gridMd: 5,
			gridXs: 5,
		},
		{
			label: '가격',
			key: 'PRICE',
			gridMd: 2,
			gridXs: 2,
		},
		{
			label: '작성일',
			key: 'CREATED_AT',
			gridMd: 3,
			gridXs: 3,
		},
	]);

	const [contentChild, setContentChild] = useState<{
		[key: string]: (el: any) => any;
	}>({
		IMAGE: (element: any) => {
			return (
				<Thumbnail
					src={JSON.parse(element.PRODUCT_DESCRIPTION_IMAGE_LIST)[0]}
					ratio={'1:1'}
					borderRadius={'10px'}
				/>
			);
		},
	});

	return (
		<Box>
			<BaseList
				disableTotal={true}
				memory={memory}
				modelIdKey={
					dataUtil.convertToUpperCasedUnderbarSeparated(modelName) +
					'_IDENTIFICATION_CODE'
				}
				getAllCallback={controller.getAllItems.bind(controller)}
				tableHeader={header}
				filterList={filterList}
				contentChild={contentChild}
			/>
		</Box>
	);
};

export default index;
