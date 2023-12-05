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
	const modelName = 'Product';

	//* Controller
	const controller = new DefaultController(modelName);

	const dataList: IData[] = [
		{
			keys: ['THUMBNAIL_PATH'],
			ui: 'imageUpload',
			label: '대표 이미지',
			maxLength: 1,
			grid: {
				xs: 12,
				md: 2,
			},
		},
		{
			keys: ['PRODUCT_IMAGE_LIST'],
			ui: 'imageUpload',
			label: '상품 소개 사진 리스트',
			maxLength: 5,
			grid: {
				xs: 12,
				md: 10,
			},
		},
		{
			keys: ['PRODUCT_NAME'],
			ui: 'textarea',
			label: '상품명',
			grid: {
				xs: 12,
				md: 8,
			},
		},
		{
			keys: ['PRICE'],
			ui: 'textarea',
			type: 'number',
			label: '가격',
			grid: {
				xs: 6,
				md: 4,
			},
		},
		{
			keys: ['DISCOUNT_RATE'],
			ui: 'textarea',
			type: 'number',
			label: '할인률 (0 ~ 100)',
			grid: {
				xs: 6,
				md: 4,
			},
		},
		{
			keys: ['STOCK'],
			ui: 'textarea',
			type: 'number',
			label: '재고',
			grid: {
				xs: 6,
				md: 4,
			},
		},
		{
			keys: ['DESCRIPTION'],
			ui: 'textarea',
			label: '상품 설명',
			rows: 5,
			grid: {
				xs: 12,
				md: 12,
			},
		},
		{
			keys: ['PRODUCT_DESCRIPTION_IMAGE_LIST'],
			ui: 'imageUpload',
			maxLength: 20,
			label: '상품 상세 사진 리스트',
			grid: {
				xs: 12,
				md: 12,
			},
		},

		{
			keys: ['OPTION_LIST'],
			ui: 'optionEditor',
			label: '옵션 리스트',
			isOptional: true,
			grid: {
				xs: 12,
				md: 12,
			},
		},
		{
			keys: ['LABEL_LIST'],
			ui: 'tagEditor',
			label: '태그',
			isOptional: true,
			grid: {
				xs: 12,
				md: 12,
			},
			selectableItems: [
				{
					label: 'NEW',
					value: 'NEW',
				},
				{
					label: 'BEST',
					value: 'BEST',
				},
			],
		},

		{
			keys: [
				'PRODUCT_PRIMARY_CATEGORY_IDENTIFICATION_CODE',
				'PRODUCT_SUB_CATEGORY_IDENTIFICATION_CODE',
			],
			ui: 'categorySelector',
			label: '카테고리',
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
