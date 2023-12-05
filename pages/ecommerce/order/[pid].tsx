import { Box, Grid } from '@mui/material';
import { NextPage } from 'next';
import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import BoardController from '@qillie-corp/ark-office-project/src/controller/default/BoardController';
import DefaultController from '@qillie-corp/ark-office-project/src/controller/default/DefaultController';
import {
	IData,
	IWrappedData,
} from '@qillie-corp/ark-office-project/src/@types/base/data';
import DataUtil from '@qillie-corp/ark-office-project/src/utils/data/DataUtil';
import DependentForm from '@qillie-corp/ark-office-project/src/layout/forms/base/DependentForm/DependentForm';
import BaseForm from '@qillie-corp/ark-office-project/src/layout/forms/base/BaseForm/BaseForm';
import { ControllerABC } from '@qillie-corp/ark-office-project/src/controller/base/ControllerABC';
import { Thumbnail, TextTypeInput } from '@qillie-corp/qillie-react-ui';
import moment from 'moment';
import { memory } from '../../_app';

class ProductPurchaseHistoryController extends ControllerABC {
	constructor() {
		super('ProductPurchaseHistory');
	}

	/**
	 * 상품 가져오기
	 */
	public getProductOfPurchaseHistory = (
		PRODUCT_PURCHASE_HISTORY_IDENTIFICATION_CODE: number,
		successCallback?: (response: any) => void,
		failCallback?: (err: any) => void
	) => {
		this.getData(
			{
				PRODUCT_PURCHASE_HISTORY_IDENTIFICATION_CODE:
					PRODUCT_PURCHASE_HISTORY_IDENTIFICATION_CODE,
			},
			`${this.rootRoute}/admin/product_purchase_history/get_product_of_purchase_history`,
			successCallback,
			failCallback
		);
	};
}

const Page: NextPage = () => {
	//* Modules
	const router = useRouter();
	const dataUtil = new DataUtil();
	const controller = new ProductPurchaseHistoryController();

	//* Constants
	const modelName = 'ProductPurchaseHistory';
	const label = '상품 주문';

	//* States
	const { pid } = router.query;
	const [orderDetail, setOrderDetail] = React.useState<
		{
			PRODUCT_NAME: string;
			CREATED_AT: string;
			PRICE: number;
			THUMBNAIL_PATH: string[];
			DISCOUNT_RATE: number;
			NUM_OF_PRODUCT: number;
		}[]
	>([]);

	const dataList: IData[] = [
		{
			keys: ['FULL_NAME_SHIPMENT'],
			ui: 'textarea',
			label: '수령자',
			grid: {
				xs: 12,
				md: 6,
			},
		},
		{
			keys: ['PRIMARY_ADDRESS_SHIPMENT'],
			ui: 'textarea',
			label: '기본 주소',
			grid: {
				xs: 12,
				md: 6,
			},
		},
		{
			keys: ['POST_CODE_SHIPMENT'],
			ui: 'textarea',
			label: '우편 번호',
			grid: {
				xs: 12,
				md: 6,
			},
		},
		{
			keys: ['DETAILED_ADDRESS_SHIPMENT'],
			ui: 'textarea',
			label: '상세 주소',
			grid: {
				xs: 12,
				md: 6,
			},
		},
		{
			keys: ['PHONE_NUMBER_SHIPMENT'],
			ui: 'textarea',
			label: '수령자 번호',
			grid: {
				xs: 12,
				md: 6,
			},
		},
		{
			keys: ['NOTE_FOR_SHIPMENT'],
			ui: 'textarea',
			label: '배송 메모',
			grid: {
				xs: 12,
				md: 6,
			},
		},
		{
			keys: ['SHIP_NUMBER'],
			ui: 'textarea',
			label: '택배 번호',
			grid: {
				xs: 12,
				md: 6,
			},
		},
		{
			keys: ['STATUS'],
			ui: 'select',
			label: '택배 번호',
			grid: {
				xs: 12,
				md: 6,
			},
			selectableItems: [
				{
					label: 'PURCHASED',
					value: '배송준비',
				},
				{
					label: 'DURING_SHIPMENT',
					value: '배송중',
				},
				{
					label: 'RETURN',
					value: '취소요청',
				},
				{
					label: 'DURING_RETURN_SHIPMENT',
					value: '반품 배송중',
				},
				{
					label: 'COMPLETE',
					value: '배송완료',
				},
			],
		},
	];

	//* Hooks
	useEffect(() => {
		if (pid !== undefined) {
			controller.getProductOfPurchaseHistory(Number(pid), (res: any) => {
				setOrderDetail(
					res.data.result.compositedProductList.map((el: any) => {
						return {
							PRODUCT_NAME: el.product.PRODUCT_NAME,
							CREATED_AT: moment(el.product.CREATED_AT).format(
								'YYYY/MM/DD a hh시 mm분'
							),
							PRICE: el.product.PRICE,
							THUMBNAIL_PATH: JSON.parse(
								el.product.THUMBNAIL_PATH
							),
							DISCOUNT_RATE: el.product.DISCOUNT_RATE,
							NUM_OF_PRODUCT: el.freezedProduct.NUM_OF_PRODUCT,
						};
					})
				);
			});
		}
	}, [pid]);

	return (
		<Box>
			<Box>
				<BaseForm
					modelIdKey={
						dataUtil.convertToUpperCasedUnderbarSeparated(
							modelName
						) + '_IDENTIFICATION_CODE'
					}
					dataList={dataList}
					memory={memory}
					createCallback={controller.createItem.bind(controller)}
					updateCallback={controller.updateItem.bind(controller)}
					findOneCallback={controller.getOneItem.bind(controller)}
					deleteCallback={controller.deleteItem.bind(controller)}
				/>
			</Box>

			<Box>
				{orderDetail.map((el) => (
					<Grid container mt={2} spacing={1} key={JSON.stringify(el)}>
						<Grid item md={4} xs={4}>
							<Thumbnail
								src={el.THUMBNAIL_PATH[0]}
								ratio={'1:1'}
							/>
						</Grid>
						<Grid item md={8} xs={8} alignItems={'self-end'}>
							<TextTypeInput
								labelConfig={{
									position: 'outer',
									label: '상품명',
								}}
								fullWidth
								maxLength={25}
								value={el?.PRODUCT_NAME}
								disabled
							/>
						</Grid>
						<Grid item md={4} xs={4}>
							<TextTypeInput
								labelConfig={{
									position: 'outer',
									label: '가격',
								}}
								fullWidth
								maxLength={25}
								value={el?.PRICE}
								disabled
							/>
						</Grid>
						<Grid item md={4} xs={4}>
							<TextTypeInput
								labelConfig={{
									position: 'outer',
									label: '구매개수',
								}}
								fullWidth
								maxLength={25}
								value={el?.NUM_OF_PRODUCT}
								disabled
							/>
						</Grid>
						<Grid item md={4} xs={4}>
							<TextTypeInput
								labelConfig={{
									position: 'outer',
									label: '등록일',
								}}
								fullWidth
								maxLength={25}
								value={el?.CREATED_AT}
								disabled
							/>
						</Grid>
						<Grid item md={4} xs={4}>
							<TextTypeInput
								labelConfig={{
									position: 'outer',
									label: '할인율',
								}}
								fullWidth
								maxLength={25}
								value={`${el?.DISCOUNT_RATE}%`}
								disabled
							/>
						</Grid>
						<Grid item md={6}>
							<TextTypeInput
								labelConfig={{
									position: 'outer',
									label: '총 가격',
								}}
								fullWidth
								maxLength={25}
								value={
									el?.PRICE *
									el?.NUM_OF_PRODUCT *
									(1 - el?.DISCOUNT_RATE / 100)
								}
								disabled
							/>
						</Grid>
					</Grid>
				))}
			</Box>
		</Box>
	);
};

export default Page;
