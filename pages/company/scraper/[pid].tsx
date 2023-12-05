import {
	Box,
	Button,
	FormControlLabel,
	Grid,
	IconButton,
	Switch,
	Typography,
} from '@mui/material';
import {
	IData,
	IWrappedData,
} from '@qillie-corp/ark-office-project/src/@types/base/data';
import DefaultController from '@qillie-corp/ark-office-project/src/controller/default/DefaultController';
import BaseForm from '@qillie-corp/ark-office-project/src/layout/forms/base/BaseForm/BaseForm';
import DataUtil from '@qillie-corp/ark-office-project/src/utils/data/DataUtil';
import { TextTypeInput } from '@qillie-corp/qillie-react-ui';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { memory } from '../../_app';
import SaveIcon from '@mui/icons-material/Save';

type Props = {};

const index = (props: Props) => {
	//* Modules
	const dataUtil = new DataUtil();
	const router = useRouter();

	//* Controller
	const firstModelName = 'ScraperBot';
	const secondModelName = 'ScrapedData';
	const botController = new DefaultController(firstModelName);
	const dataController = new DefaultController(secondModelName);

	//* States
	const [modelData, setModelData] = useState<{
		[key: string]: IWrappedData;
	}>();

	const [scrapedDataList, setScrapedDataList] = useState<any[]>([]);

	//* Constants
	const dataList: IData[] = [
		{
			keys: ['SCRAPER_NAME'],
			ui: 'textarea',
			label: '봇 이름',
			grid: {
				xs: 8,
				md: 8,
			},
		},
		{
			keys: ['SCRAPER_DESCRIPTION'],
			ui: 'textarea',
			rows: 2,
			label: '설명',
			grid: {
				xs: 12,
				md: 12,
			},
		},
	];

	// const [dataList, setDataList] = useState<
	// 	{
	// 		COLLECTED_DATA: any;
	// 		STATUS_DICT: any;
	// 		SCRAPED_DATA_IDENTIFICATION_CODE: any;
	// 		SCRAPER_BOT_IDENTIFICATION_CODE: any;
	// 	}[]
	// >([]);

	const saveScrapedDate = (index: number) => {
		//* Find target
		const targetElement = scrapedDataList[index];
		const elementId = targetElement.SCRAPED_DATA_IDENTIFICATION_CODE;
		const statusDict = targetElement.STATUS_DICT;

		dataController.updateItem(
			{
				SCRAPED_DATA_IDENTIFICATION_CODE: elementId,
				STATUS_DICT: JSON.stringify(statusDict),
			},

			(res: any) => {
				alert('데이터 저장에 성공했습니다.');
			},
			(err: any) => {
				console.log(err);
				alert('데이터 저장에 실패했습니다.');
			}
		);
	};

	//* Components
	const renderStatusDict = (index: number) => {
		//* Find target
		const targetElement = scrapedDataList[index];
		const statusDict = targetElement.STATUS_DICT;

		//* onChange function
		const onChangeStatusDictElement = (
			statusKey: string,
			changedValue: any
		) => {
			//* Set status dict
			const clonedStatusDict = { ...statusDict };
			clonedStatusDict[statusKey] = changedValue;

			//* Set scrapedDataList
			const clonedScrapedDataList = [...scrapedDataList];
			clonedScrapedDataList[index].STATUS_DICT = clonedStatusDict;

			//* Update data
			setScrapedDataList(clonedScrapedDataList);
		};

		//* Set component
		const setComponent = (statusKey: string) => {
			let targetComponent = <></>;
			const targetStatusValue = statusDict[statusKey];

			if (typeof targetStatusValue == 'string') {
				if (targetStatusValue == 'Y' || targetStatusValue == 'N') {
					targetComponent = (
						<Grid item xs={6} md={3}>
							<FormControlLabel
								control={
									<Switch
										checked={
											targetStatusValue == 'Y'
												? true
												: false
										}
										onChange={(e) => {
											onChangeStatusDictElement(
												statusKey,
												e.target.checked ? 'Y' : 'N'
											);
										}}
									/>
								}
								label={statusKey}
								labelPlacement="start"
							/>
						</Grid>
					);
				} else {
					targetComponent = (
						<Grid item xs={12}>
							<TextTypeInput
								fullWidth
								multiline={true}
								rows={3}
								labelConfig={{
									position: 'outer',
									label: statusKey,
								}}
								value={targetStatusValue}
								setValue={(value) => {
									onChangeStatusDictElement(statusKey, value);
								}}
							/>
						</Grid>
					);
				}
			} else if (Array.isArray(targetStatusValue)) {
				if (targetStatusValue.length > 0) {
					if (typeof targetStatusValue[0] == 'string') {
						targetComponent = (
							<Grid item xs={12}>
								<Box>
									{JSON.stringify(targetStatusValue)}
									{targetStatusValue.map((el) => (
										<Box></Box>
									))}
								</Box>
							</Grid>
						);
					} else if (
						typeof targetStatusValue[0] === 'object' &&
						targetStatusValue[0] !== null &&
						!Array.isArray(targetStatusValue[0])
					) {
						targetComponent = (
							<Grid item xs={12}>
								<Box>
									<Box mb={1}>
										<Typography variant={'caption'}>
											{statusKey}
										</Typography>
									</Box>

									{targetStatusValue.map((el, elIndex) => (
										<Box>
											{Object.keys(el).map((key) => (
												<Box>
													<TextTypeInput
														fullWidth
														multiline={true}
														rows={3}
														labelConfig={{
															position: 'outer',
															label: key,
														}}
														value={el[key]}
														setValue={(value) => {
															const clonedStatusValue =
																[
																	...targetStatusValue,
																];
															clonedStatusValue[
																elIndex
															][key] = value;

															onChangeStatusDictElement(
																statusKey,
																clonedStatusValue
															);
														}}
													/>
												</Box>
											))}
										</Box>
									))}
								</Box>
							</Grid>
						);
					}
				}
			}

			return targetComponent;
		};

		//* Render
		return (
			<Box width={'100%'}>
				<Grid container spacing={1}>
					{Object.keys(statusDict).map((statusKey) =>
						setComponent(statusKey)
					)}
				</Grid>
			</Box>
		);
	};

	//* Hooks
	useEffect(() => {
		if (modelData !== undefined) {
			dataController.getAllItems(
				{
					SCRAPER_BOT_IDENTIFICATION_CODE: Number(
						modelData.SCRAPER_BOT_IDENTIFICATION_CODE.state
					),
				},
				(res: any) => {
					setScrapedDataList(
						res.data.result.rows.map((el: any) => {
							return {
								COLLECTED_DATA: JSON.parse(el.COLLECTED_DATA),
								STATUS_DICT: JSON.parse(el.STATUS_DICT),
								SCRAPED_DATA_IDENTIFICATION_CODE:
									el.SCRAPED_DATA_IDENTIFICATION_CODE,
								SCRAPER_BOT_IDENTIFICATION_CODE:
									el.SCRAPER_BOT_IDENTIFICATION_CODE,
							};
						})
					);
				},
				(err: any) => {
					console.log(err);
				}
			);
		}
	}, [modelData]);

	return (
		<Box pb={10}>
			<BaseForm
				setFetchedData={setModelData}
				modelIdKey={
					dataUtil.convertToUpperCasedUnderbarSeparated(
						firstModelName
					) + '_IDENTIFICATION_CODE'
				}
				dataList={dataList}
				memory={memory}
				createCallback={botController.createItem.bind(botController)}
				updateCallback={botController.updateItem.bind(botController)}
				findOneCallback={botController.getOneItem.bind(botController)}
				deleteCallback={botController.deleteItem.bind(botController)}
			/>

			{modelData !== undefined &&
				scrapedDataList.map((dataEl, index) => (
					<Box
						width={'100%'}
						display={'flex'}
						flexDirection={'column'}
					>
						<Box
							display={'flex'}
							alignItems={'center'}
							justifyContent={'space-between'}
						>
							<Typography variant={'h6'}>
								{index + 1}번째 데이터
							</Typography>

							<IconButton
								onClick={() => {
									saveScrapedDate(index);
								}}
							>
								<SaveIcon />
							</IconButton>
						</Box>

						<Box
							mt={2}
							width={'100%'}
							display={'flex'}
							flexDirection={'column'}
						>
							<Box mb={1}>
								<TextTypeInput
									fullWidth
									labelConfig={{
										position: 'outer',
										label: '데이터 이름',
									}}
									value={dataEl.COLLECTED_DATA.TITLE}
									disabled
								/>
							</Box>
							<Box>
								<TextTypeInput
									fullWidth
									labelConfig={{
										position: 'outer',
										label: '데이터 설명',
									}}
									rows={3}
									multiline={true}
									value={
										dataEl.COLLECTED_DATA.APPLICATION_DETAIL
									}
									disabled
								/>
							</Box>
						</Box>
						<Box>
							<Box
								width={'100%'}
								display={'flex'}
								justifyContent={'space-around'}
							>
								{renderStatusDict(index)}
							</Box>
						</Box>
					</Box>
				))}
		</Box>
	);
};

export default index;
