import { Box } from '@mui/material';
import { NextPage } from 'next';
import React from 'react';
import DataUtil from '@qillie-corp/ark-office-project/src/utils/data/DataUtil';
import DefaultController from '@qillie-corp/ark-office-project/src/controller/default/DefaultController';
import BaseForm from '@qillie-corp/ark-office-project/src/layout/forms/base/BaseForm/BaseForm';
import { IData } from '@qillie-corp/ark-office-project/src/@types/base/data';
import { memory } from '../../_app';

const Page: NextPage = () => {
	//* Modules
	const dataUtil = new DataUtil();

	//* Constants
	const modelName = 'Point';

	//* Controller
	const controller = new DefaultController(modelName);

	const dataList: IData[] = [
		{
			keys: ['NAME'],
			ui: 'textarea',
			label: '포인트명',
			grid: {
				xs: 12,
				md: 8,
			},
		},
		{
			keys: ['EXCHANGE_RATE'],
			ui: 'textarea',
			type: 'number',
			label: '교환비',
			grid: {
				xs: 6,
				md: 6,
			},
		},
		{
			keys: ['DEMICALS'],
			ui: 'textarea',
			type: 'number',
			label: '소수 자리수',
			grid: {
				xs: 6,
				md: 6,
			},
		},
		{
			keys: ['CONTRACT_ADDRESS'],
			ui: 'textarea',
			label: '계약주소',
			grid: {
				xs: 12,
				md: 12,
			},
		},
	];

	return (
		<Box>
			<BaseForm
				modelIdKey={
					dataUtil.convertToUpperCasedUnderbarSeparated(modelName) +
					'_IDENTIFICATION_CODE'
				}
				dataList={dataList}
				memory={memory}
				createCallback={controller.createItem.bind(controller)}
				updateCallback={controller.updateItem.bind(controller)}
				findOneCallback={controller.getOneItem.bind(controller)}
				deleteCallback={controller.deleteItem.bind(controller)}
			/>
		</Box>
	);
};

export default Page;
