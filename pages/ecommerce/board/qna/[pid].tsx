import { Box, Divider } from '@mui/material';
import { NextPage } from 'next';
import React from 'react';
import BoardController from '@qillie-corp/ark-office-project/src/controller/default/BoardController';
import DefaultController from '@qillie-corp/ark-office-project/src/controller/default/DefaultController';
import {
	IData,
	IWrappedData,
} from '@qillie-corp/ark-office-project/src/@types/base/data';
import DataUtil from '@qillie-corp/ark-office-project/src/utils/data/DataUtil';
import DependentForm from '@qillie-corp/ark-office-project/src/layout/forms/base/DependentForm/DependentForm';
import BaseForm from '@qillie-corp/ark-office-project/src/layout/forms/base/BaseForm/BaseForm';
import { memory } from '../../../_app';

const Page: NextPage = () => {
	//* Constants
	const mainModelName = 'ProductQuestion';
	const subModelName = 'ProductAnswer';
	const thirdModelName = 'Product';

	const mainLabel = '상품 문의';
	const subLabel = '상품 문의 답변';
	const thirdLabel = '상품 정보';

	//* Modules
	const dataUtil = new DataUtil();

	//* States
	const [mainModelData, setMainModelData] = React.useState<{
		[key: string]: IWrappedData;
	}>({});

	//* Controller
	const mainModelController = new BoardController(mainModelName);
	const subModelController = new BoardController(subModelName);
	const thirdModelController = new DefaultController(thirdModelName);

	const mainSectionDataList: IData[] = [
		{
			keys: ['TITLE'],
			ui: 'textarea',
			label: '제목',
			captionMessages: {
				requiredMessage: '제목을 입력해야합니다',
			},
			grid: {
				xs: 12,
				md: 8,
			},
		},
		{
			keys: ['CONTENT'],
			ui: 'textarea',
			label: '내용',
			captionMessages: {
				requiredMessage: '내용을 입력해야합니다',
			},
			rows: 8,
			grid: {
				xs: 12,
				md: 12,
			},
		},
		{
			keys: ['IMAGE_LIST'],
			ui: 'imageUpload',
			label: '이미지',
			isOptional: true,
			captionMessages: {
				requiredMessage: '이미지를 골라야합니다',
			},
			grid: {
				xs: 12,
				md: 12,
			},
		},
	];

	const subSectionDataList: any[] = [
		{
			keys: ['TITLE'],
			ui: 'textarea',
			label: '제목',
			captionMessages: {
				requiredMessage: '제목을 입력해야합니다',
			},
			grid: {
				xs: 12,
				md: 8,
			},
		},
		{
			keys: ['CONTENT'],
			ui: 'textarea',
			label: '내용',
			captionMessages: {
				requiredMessage: '내용을 입력해야합니다',
			},
			rows: 8,
			grid: {
				xs: 12,
				md: 12,
			},
		},
		{
			keys: ['IMAGE_LIST'],
			ui: 'imageUpload',
			label: '이미지',
			isOptional: true,
			captionMessages: {
				requiredMessage: '이미지를 골라야합니다',
			},
			grid: {
				xs: 12,
				md: 12,
			},
		},
	];

	const thirdSectionDataList: any[] = [
		{
			keys: ['PRODUCT_NAME'],
			ui: 'textarea',
			label: '상품명',
			captionMessages: {
				requiredMessage: '제목을 입력해야합니다',
			},
			grid: {
				xs: 9,
				md: 10,
			},
		},
		{
			keys: ['PRODUCT_IDENTIFICATION_CODE'],
			ui: 'shortcut',
			label: '상품',
			link: '/ecommerce/product',
			grid: {
				xs: 3,
				md: 2,
			},
		},
	];

	return (
		<Box>
			<Box>
				<DependentForm
					dependentModelData={mainModelData}
					dependentModelIdKey={
						dataUtil.convertToUpperCasedUnderbarSeparated(
							mainModelName
						) + '_IDENTIFICATION_CODE'
					}
					modelIdKey={
						dataUtil.convertToUpperCasedUnderbarSeparated(
							thirdModelName
						) + '_IDENTIFICATION_CODE'
					}
					hideHeader={false}
					dataList={thirdSectionDataList}
					disableEdit={true}
					label={thirdLabel}
					memory={memory}
					createCallback={thirdModelController.createItem.bind(
						thirdModelController
					)}
					updateCallback={thirdModelController.updateItem.bind(
						thirdModelController
					)}
					findOneByKeyCallback={thirdModelController.getOneItemByKey.bind(
						thirdModelController
					)}
					deleteCallback={thirdModelController.deleteItem.bind(
						thirdModelController
					)}
				/>
			</Box>

			<Box my={2.5}>
				<Divider />
			</Box>

			<Box>
				<BaseForm
					setFetchedData={setMainModelData}
					modelIdKey={
						dataUtil.convertToUpperCasedUnderbarSeparated(
							mainModelName
						) + '_IDENTIFICATION_CODE'
					}
					dataList={mainSectionDataList}
					label={mainLabel}
					memory={memory}
					createCallback={mainModelController.createItem.bind(
						mainModelController
					)}
					updateCallback={mainModelController.updateItem.bind(
						mainModelController
					)}
					findOneCallback={mainModelController.getOneItem.bind(
						mainModelController
					)}
					deleteCallback={mainModelController.deleteItem.bind(
						mainModelController
					)}
				/>
			</Box>

			<Box my={2.5}>
				<Divider />
			</Box>

			<Box>
				<DependentForm
					dependentModelData={mainModelData}
					dependentModelIdKey={
						dataUtil.convertToUpperCasedUnderbarSeparated(
							mainModelName
						) + '_IDENTIFICATION_CODE'
					}
					modelIdKey={
						dataUtil.convertToUpperCasedUnderbarSeparated(
							subModelName
						) + '_IDENTIFICATION_CODE'
					}
					hideHeader={false}
					label={subLabel}
					dataList={subSectionDataList}
					memory={memory}
					createCallback={subModelController.createItem.bind(
						subModelController
					)}
					updateCallback={subModelController.updateItem.bind(
						subModelController
					)}
					findOneByKeyCallback={subModelController.getOneItemByKey.bind(
						subModelController
					)}
					deleteCallback={subModelController.deleteItem.bind(
						subModelController
					)}
				/>
			</Box>
		</Box>
	);
};

export default Page;
