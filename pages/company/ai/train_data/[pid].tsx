import {
	Box,
	Button,
	Grid,
	Typography,
	IconButton,
	Divider,
} from '@mui/material';
import { NextPage } from 'next';
import React, { useState, useEffect } from 'react';
import SaveRoundedIcon from '@mui/icons-material/SaveRounded';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import CloudDownloadRoundedIcon from '@mui/icons-material/CloudDownloadRounded';
import DataUtil from '@qillie-corp/ark-office-project/src/utils/data/DataUtil';
import DefaultController from '@qillie-corp/ark-office-project/src/controller/default/DefaultController';
import AppMemberForm from '@qillie-corp/ark-office-project/src/layout/forms/member/AppMemberForm/AppMemberForm';
import {
	IData,
	IWrappedData,
} from '@qillie-corp/ark-office-project/src/@types/base/data';
import { memory } from '../../../_app';
import BaseForm from '@qillie-corp/ark-office-project/src/layout/forms/base/BaseForm/BaseForm';
import DependentForm from '@qillie-corp/ark-office-project/src/layout/forms/base/DependentForm/DependentForm';
import {
	DeletableBadge,
	SelectTypeInput,
	TextTypeInput,
} from '@qillie-corp/qillie-react-ui';
import Select from '@qillie-corp/ark-office-project/src/ui/local/input/Select/Select';
import { IUserInputStatus } from '@qillie-corp/ark-office-project/src/@types/external/qillieReactUi';
const Page: NextPage = () => {
	//* Modules
	const dataUtil = new DataUtil();

	//* States
	const [modelData, setModelData] = useState<{
		[key: string]: IWrappedData;
	}>();
	const [dependentDataList, setDependentDataList] = useState<any[]>([]);

	/**
	 * States for dependent form
	 */
	const [keyValueSet, setKeyValueSet] = useState<{ [key: string]: string }>(
		{}
	);

	/**
	 * States for scraper
	 */
	const [selectedScraperBot, setSelectedScraperBot] = useState<string>('');
	const [selectedScraperBotInputStatus, setSelectedScraperBotInputStatus] =
		useState<IUserInputStatus>({ status: 'default' });
	const [selectableScraperBotList, setSelectableScraperBotList] = useState<
		{ label: string; value: string }[]
	>([]);
	const [scrapedDataList, setScrapedDataList] = useState<any[]>([]);

	//* Controller
	const modelName = 'GptTextTrainDataHeader';
	const controller = new DefaultController(modelName);
	const dependentController = new DefaultController(
		'GptTextTrainDataElement'
	);
	const scraperBotController = new DefaultController('ScraperBot');
	const scrapedDataController = new DefaultController('ScrapedData');

	const dataList: IData[] = [
		{
			keys: ['NAME'],
			ui: 'textarea',
			label: '이름',
			grid: {
				xs: 9,
				md: 9,
			},
		},
		{
			keys: ['TRAIN_DATA_ROLE'],
			ui: 'select',
			label: '훈련 데이터 역할',
			initialValue: 'BINARY_CLASSIFICATION', // 'BINARY_CLASSIFICATION' | 'MULTI_CLASSIFICATION' | 'QUESTION_ANSWERING
			grid: {
				xs: 3,
				md: 3,
			},
			selectableItems: [
				{
					label: '이진 분류',
					value: 'BINARY_CLASSIFICATION',
				},
			],
		},
		{
			keys: ['TRAIN_DATA_CONFIG'],
			ui: 'custom',
			label: '훈련 데이터 설정',
			initialValue: {},
			grid: {
				xs: 12,
				md: 12,
			},
			customRenderCallback: (wrappedDataDict) => {
				return (
					<Box>
						{wrappedDataDict['TRAIN_DATA_ROLE'].state ==
						'BINARY_CLASSIFICATION' ? (
							<Box>
								<TextTypeInput
									labelConfig={{
										position: 'outer',
										label: '긍정 답변 값',
									}}
									value={
										wrappedDataDict['TRAIN_DATA_CONFIG']
											.state.POSITIVE_ANSWER !== undefined
											? wrappedDataDict[
													'TRAIN_DATA_CONFIG'
											  ].state.POSITIVE_ANSWER
											: ''
									}
									setValue={(value) => {
										const clonedData = {
											...wrappedDataDict[
												'TRAIN_DATA_CONFIG'
											].state,
										};
										clonedData.POSITIVE_ANSWER = value;
										wrappedDataDict[
											'TRAIN_DATA_CONFIG'
										].setter(clonedData);
									}}
								/>
							</Box>
						) : (
							<Box></Box>
						)}
					</Box>
				);
			},
		},
		{
			keys: ['DESCRIPTION'],
			ui: 'textarea',
			rows: 4,
			label: '설명',
			grid: {
				xs: 12,
				md: 12,
			},
		},
		{
			keys: ['SUFFIX_DATA_SET'],
			ui: 'keyLabelEditor',
			type: 'useData',
			label: '선결 데이터',
			isOptional: true,
			grid: {
				xs: 12,
				md: 12,
			},
		},
		{
			keys: ['DATA_KEY_LABEL_DICT_LIST'],
			ui: 'keyLabelEditor',
			label: '데이터 구조',
			grid: {
				xs: 12,
				md: 12,
			},
			captionMessages: {
				errorMessage: 'COMPLETION 키는 필수값입니다!',
			},
			initialValue: [{ key: 'COMPLETION', label: '답변' }],
		},
	];

	//* Functions
	/**
	 * 훈련 데이터 추가 / 변경 시 유효성 검사 함수
	 */
	const validateTrainData = (
		target: any,
		index?: number,
		isFromScrapedData?: boolean
	) => {
		//* 데이터 유효성 검사 (데이터 구조 COMPLETION 키 존재 여부, COMPLETION 키 제외 1개 키 이상 존재)
		let isValid = true;

		const parsedData =
			typeof target['DATA'] == 'string'
				? JSON.parse(target['DATA'])
				: target['DATA'];

		//* 유효성 검사 : 데이터 구조 COMPLETION 키 존재 여부
		if (parsedData.hasOwnProperty('COMPLETION') === false) {
			alert('데이터 구조에 COMPLETION 키가 존재하지 않습니다.');
			isValid = false;

			return isValid;
		}

		//* 유효성 검사 : 모든 해당 키에 데이터 존재하는지 확인 및 COMPLETION 키 제외 1개 키 이상 존재
		if (isFromScrapedData !== true) {
			let numOfKey = 0;

			for (const keyLabelDict of modelData.DATA_KEY_LABEL_DICT_LIST
				.state) {
				const targetValue = parsedData[keyLabelDict.key];

				console.log(`${keyLabelDict.key}: ${targetValue}`);

				if (targetValue === undefined || targetValue === '') {
					alert(
						`데이터 구조 중 데이터가 존재하지 않는 훈련 데이터가 존재합니다.${
							index !== undefined
								? ` (${index + 1}번 훈련 데이터)`
								: ''
						}`
					);
					isValid = false;

					break;
				}

				if (keyLabelDict.key !== 'COMPLETION') {
					numOfKey++;
				}
			}

			if (numOfKey < 1 && isValid === true) {
				alert(
					'데이터 구조에 COMPLETION 키를 제외한 1개 이상의 키가 존재해야 합니다.'
				);
				isValid = false;
			}
		}

		return isValid;
	};

	/**
	 * 훈련 데이터 전체 업데이트 함수
	 */
	const onClickUpdateAllTrainElementButton = () => {
		//* 데이터 유효성 검사 (데이터 수 1개 이상, 데이터 구조 COMPLETION 키 존재 여부, COMPLETION 키 제외 1개 키 이상 존재)
		//* 유효성 검사 : 데이터 수 1개 이상
		if (dependentDataList.length === 0) {
			alert('훈련 데이터가 존재하지 않습니다.');
			return;
		}

		//* 훈련 데이터 유효성 검사
		let isTrainDataValid = true;
		let index = 0;

		for (const dependentData of dependentDataList) {
			isTrainDataValid = validateTrainData(dependentData, index);

			if (isTrainDataValid === false) {
				break;
			}

			index += 1;
		}

		//* 실제 데이터베이스에서 전체 업데이트
		if (isTrainDataValid) {
			const promises = Promise.all(
				dependentDataList.map(async (dependentData) => {
					const process = await dependentController.updateItem(
						{
							...dependentData,
						},
						undefined,
						undefined,
						true
					);

					return await process().promise;
				})
			);

			promises
				.then((res) => {
					console.log(res);
					alert('훈련 데이터 전체 저장이 완료되었습니다.');
				})
				.catch((err) => {
					alert('훈련 데이터를 전체 저장하는데 실패했습니다.');
				});
		}
	};

	/**
	 * 훈련 데이터 업데이트 함수
	 */
	const onClickUpdateTrainElementButton = (index: number) => {
		//* 훈련 데이터 유효성 검사
		const targetDependentData = dependentDataList[index];
		const isTrainDataValid = validateTrainData(targetDependentData);

		//* 실제 데이터베이스에 업데이트
		if (isTrainDataValid) {
			dependentController.updateItem(
				{
					...targetDependentData,
				},
				(res) => {
					alert('저장이 완료되었습니다.');
				},
				(err) => {
					alert('훈련 데이터를 삭제하는데 실패했습니다.');
				}
			);
		}
	};

	/**
	 * 훈련 데이터 삭제 함수
	 */
	const onClickDeleteTrainElementButton = (index: number) => {
		//* 실제 데이터베이스에서 삭제
		dependentController.deleteItem(
			{
				...dependentDataList[index],
			},
			(res) => {
				const clonedDependantDataList = [...dependentDataList];
				clonedDependantDataList.splice(index, 1);

				setDependentDataList(clonedDependantDataList);
			},
			(err) => {
				alert('훈련 데이터를 삭제하는데 실패했습니다.');
			}
		);
	};

	/**
	 * 훈련 데이터 저장 함수
	 */
	const onClickCreateTrainElementButton = () => {
		const targetDependantData = {
			GPT_TEXT_TRAIN_DATA_HEADER_IDENTIFICATION_CODE:
				modelData['GPT_TEXT_TRAIN_DATA_HEADER_IDENTIFICATION_CODE']
					.state,
			DATA: JSON.stringify(keyValueSet),
			USE_YN: 'Y',
		};

		//* 훈련 데이터 유효성 검사
		const isTrainDataValid = validateTrainData(targetDependantData);
		console.log(isTrainDataValid);

		if (isTrainDataValid) {
			dependentController.createItem(
				targetDependantData,
				(res) => {
					//* Set cloned list
					const createdData = res.data.result;
					createdData['DATA'] = JSON.parse(createdData['DATA']);

					const clonedList = [...dependentDataList];
					clonedList.push(createdData);
					setDependentDataList(clonedList);

					//* Delete values in keyValueSet
					const clonedKeyValueSet = {
						...keyValueSet,
					};

					for (const key in clonedKeyValueSet) {
						clonedKeyValueSet[key] = '';
					}

					setKeyValueSet(clonedKeyValueSet);
				},
				(err) => {
					alert('훈련 데이터를 생성하는데 실패했습니다.');
				}
			);
		}
	};

	/**
	 * 스크레이퍼로부터 훈련 데이터 가져오는 함수
	 */
	const onClickLoadDataFromScraperButton = () => {
		if (scrapedDataList.length != 0) {
			//* Validate scraped data
			let isScrapedDataValid = true;
			let targetDependantDataList: any[] = [];

			for (const scrapedData of scrapedDataList) {
				const targetDependantData = {
					GPT_TEXT_TRAIN_DATA_HEADER_IDENTIFICATION_CODE:
						modelData[
							'GPT_TEXT_TRAIN_DATA_HEADER_IDENTIFICATION_CODE'
						].state,
					DATA: Object.assign(
						JSON.parse(scrapedData.COLLECTED_DATA),
						{ COMPLETION: 'YES' }
					),
					USE_YN: 'Y',
				};

				//* 훈련 데이터 유효성 검사
				const isTrainDataValid = validateTrainData(
					targetDependantData,
					undefined,
					true
				);

				if (isTrainDataValid) {
					targetDependantDataList.push(targetDependantData);
				} else {
					isScrapedDataValid = false;
					break;
				}
			}

			//* 실제 데이터베이스에 업데이트
			if (isScrapedDataValid) {
				const promises = Promise.all(
					targetDependantDataList.map(async (targetDependentData) => {
						let isAlreadyExist = false;

						for (const dependentData of dependentDataList) {
							if (
								JSON.stringify(targetDependentData['DATA']) ==
								JSON.stringify(dependentData['DATA'])
							) {
								isAlreadyExist = true;
								break;
							}
						}

						if (isAlreadyExist == false) {
							const process =
								await dependentController.createItem(
									{
										...targetDependentData,
										['DATA']: JSON.stringify(
											targetDependentData['DATA']
										),
									},
									undefined,
									undefined,
									true
								);

							return await process().promise;
						} else {
							return await Promise.resolve();
						}
					})
				);

				promises
					.then((res) => {
						console.log(res);
						res.map((item) => {
							const targetItem = item as any;
							const clonedList = [...dependentDataList];

							if (targetItem.hasOwnProperty('data')) {
								let createdData = targetItem.data.result;
								createdData['DATA'] = JSON.parse(
									createdData['DATA']
								);

								clonedList.push(createdData);
							}

							setDependentDataList(clonedList);
						});

						alert(
							'스크레이핑 봇으로부터 훈련 데이터 전체 추가가 완료되었습니다.'
						);
					})
					.catch((err) => {
						alert(
							'스크레이핑 봇으로부터 훈련 데이터를 전체 추가하는데 실패했습니다.'
						);
					});
			}
		} else {
			alert('스크레이퍼로부터 데이터 가져올 데이터가 없습니다!');
		}
	};

	//* Hooks
	/**
	 * 훈련 데이터 리스트 가져오는 훅
	 */
	useEffect(() => {
		if (modelData !== undefined) {
			dependentController.findAllItems(
				{
					GPT_TEXT_TRAIN_DATA_HEADER_IDENTIFICATION_CODE:
						modelData[
							'GPT_TEXT_TRAIN_DATA_HEADER_IDENTIFICATION_CODE'
						].state,
				},
				(res) => {
					const clonedDependentDataList = res.data.result.rows.map(
						(item: any) => {
							item['DATA'] = JSON.parse(item['DATA']);
							return item;
						}
					);

					setDependentDataList(clonedDependentDataList);
				},
				(err) => {
					alert('훈련 데이터 리스트를 가져오는데 실패했습니다.');
				}
			);
		}
	}, [modelData]);

	/**
	 * 데이터 폼 변경 훅 (헤더 데이터 검증 후 COMPELETION 키 없을 경우, 추가)
	 */
	useEffect(() => {
		if (modelData !== undefined) {
			//* 데이터 폼 변경
			const clonedKeyValueSet: { [key: string]: any } = {};

			modelData['DATA_KEY_LABEL_DICT_LIST'].state.forEach((item: any) => {
				clonedKeyValueSet[item.key] = '';
			});

			setKeyValueSet(clonedKeyValueSet);
		}
	}, [modelData]);

	/**
	 * 스크레이핑 봇 가져오는 훅
	 */
	useEffect(() => {
		if (modelData !== undefined) {
			scraperBotController.findAllItems(
				{
					USE_YN: 'Y',
				},
				(res) => {
					setSelectableScraperBotList(
						res.data.result.rows.map((item) => {
							return {
								value: item['SCRAPER_BOT_IDENTIFICATION_CODE'],
								label: item['SCRAPER_NAME'],
							};
						})
					);
				}
			);
		}
	}, [modelData]);

	/**
	 * 선택된 스크레이핑 봇으로부터 데이터 가져오는 함수
	 */
	useEffect(() => {
		if (selectedScraperBot !== '') {
			console.log({
				SCRAPER_BOT_IDENTIFICATION_CODE: selectedScraperBot,
				USE_YN: 'Y',
			});

			scrapedDataController.findAllItems(
				{
					SCRAPER_BOT_IDENTIFICATION_CODE: selectedScraperBot,
					USE_YN: 'Y',
				},
				(res) => {
					setScrapedDataList(res.data.result.rows);
				}
			);
		} else {
			setScrapedDataList([]);
		}
	}, [selectedScraperBot]);

	//* Components
	const dependentDataListComponent = (
		dependantData: any,
		index: number,
		keyLabelDict: any
	) => {
		return (
			<Box mb={1} key={JSON.stringify(keyLabelDict)}>
				{/* Label */}
				<Box mb={0.5}>
					<Typography variant="subtitle1" fontWeight={500}>
						[{keyLabelDict.label}]
					</Typography>
				</Box>

				{/* Data */}
				<Box>
					<Typography variant="subtitle1">
						<TextTypeInput
							placeHolder={`${keyLabelDict.label}을(를) 입력해주세요.`}
							fullWidth
							rows={1}
							multiline={true}
							value={dependantData['DATA'][keyLabelDict.key]}
							setValue={(value) => {
								const clonedDependantDataList = [
									...dependentDataList,
								];
								clonedDependantDataList[index]['DATA'][
									keyLabelDict.key
								] = value;

								setDependentDataList(clonedDependantDataList);
							}}
						/>
					</Typography>
				</Box>
			</Box>
		);
	};

	return (
		<Box>
			<BaseForm
				setFetchedData={setModelData}
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
				validationCallback={async (dataDict) => {
					//* COMPLETETION 키가 없을 경우, 에러 발생
					let targetData: IWrappedData | undefined =
						dataDict['DATA_KEY_LABEL_DICT_LIST'];
					let isKeyInData = false;

					if (targetData !== undefined) {
						targetData.state.forEach((item: any) => {
							if (item.key === 'COMPLETION') {
								isKeyInData = true;
							}
						});

						if (isKeyInData === false) {
							targetData.setInputStatus({ status: 'error' });
						}
					}

					return isKeyInData;
				}}
			/>

			{modelData !== undefined && (
				<Box
					mb={1}
					p={1.75}
					borderRadius={1.5}
					sx={{ background: '#e6e6e6' }}
				>
					<Box p={1.5} borderRadius={1.5} sx={{ background: '#fff' }}>
						{/* Control header */}
						<Box
							display={'flex'}
							justifyContent={'space-between'}
							alignItems={'center'}
							mb={1}
						>
							{/* Label */}
							<Typography variant={'h6'} fontWeight={500}>
								훈련 데이터 리스트
							</Typography>

							{/* Update button */}
							<Box>
								<IconButton
									onClick={() => {
										onClickUpdateAllTrainElementButton();
									}}
								>
									<SaveRoundedIcon />
								</IconButton>
							</Box>
						</Box>

						{/* 스크레이핑 봇으로부터 가져올 수 있는 영역 */}
						<Box mb={1}>
							<Box>
								<Grid
									container
									spacing={1}
									alignItems={'center'}
								>
									<Grid item xs={8}>
										<Select
											inputStatus={
												selectedScraperBotInputStatus
											}
											labelConfig={{
												position: 'outer',
												label: '선택 가능한 스크레이핑 봇',
											}}
											inputCaptionConfig={Object.assign(
												{
													status: selectedScraperBotInputStatus,
												},
												{
													defaultMessage:
														scrapedDataList.length ==
														0
															? '선택 가능한 스크레이핑 봇을 선택해주세요.'
															: (() => {
																	let message =
																		'';

																	const scrapedData =
																		scrapedDataList[0];

																	Object.keys(
																		JSON.parse(
																			scrapedData[
																				'COLLECTED_DATA'
																			]
																		)
																	).forEach(
																		(
																			item
																		) => {
																			message += `${item}, `;
																		}
																	);

																	return message;
															  })(),
												}
											)}
											value={selectedScraperBot}
											setValue={setSelectedScraperBot}
											selectableItems={
												selectableScraperBotList
											}
										/>
									</Grid>

									<Grid item xs={4}>
										<IconButton
											onClick={
												onClickLoadDataFromScraperButton
											}
										>
											<CloudDownloadRoundedIcon />
										</IconButton>
									</Grid>
								</Grid>
							</Box>
						</Box>

						{/* Train element list */}
						<Box
							borderRadius={3}
							sx={{
								pt: 2,
								pl: 2,
								pr: 2,
								pb: 2,
								position: 'relative',
								background: 'rgb(242, 242, 243)',
								height: '100%',
								width: '100%',
								minHeight: '64px',
							}}
						>
							{dependentDataList === undefined ||
							JSON.stringify(dependentDataList) === '[]' ? (
								<Box
									sx={{
										position: 'absolute;',
										top: '50%;',
										left: '50%',
										transform: 'translate(-50%, -50%);',
									}}
								>
									<Typography
										variant="body1"
										sx={{ color: '#9f9f9f' }}
									>
										Empty
									</Typography>
								</Box>
							) : (
								<Box>
									{dependentDataList.map(
										(dependantData, index) => (
											<Box
												mt={index === 0 ? 0 : 2}
												key={index}
												p={1.25}
												borderRadius={1.5}
												sx={{ background: '#fff' }}
											>
												{/* Control button */}
												<Box
													pl={0.75}
													display={'flex'}
													justifyContent={
														'space-between'
													}
													alignItems={'center'}
													mb={1}
												>
													{/* Label */}
													<Typography
														variant={'body1'}
														fontWeight={600}
													>
														{index + 1}번 훈련
														데이터
													</Typography>

													{/* Controller */}
													<Box
														display={'flex'}
														justifyContent={
															'flex-end'
														}
													>
														{/* Update button */}
														<Box>
															<IconButton
																onClick={() => {
																	onClickUpdateTrainElementButton(
																		index
																	);
																}}
															>
																<SaveRoundedIcon />
															</IconButton>
														</Box>

														{/* Delete button */}
														<Box>
															<IconButton
																onClick={() => {
																	onClickDeleteTrainElementButton(
																		index
																	);
																}}
															>
																<DeleteForeverRoundedIcon />
															</IconButton>
														</Box>
													</Box>
												</Box>

												{/* Data */}
												<Box px={1}>
													{/* 훈련 데이터 */}
													<Box>
														<Box mb={0.5}>
															{/* Label */}
															<Typography
																variant={
																	'body2'
																}
																fontWeight={600}
															>
																질문 데이터 목록
															</Typography>
														</Box>
														{modelData.DATA_KEY_LABEL_DICT_LIST.state
															.filter(
																(
																	keyLabelDict
																) => {
																	if (
																		keyLabelDict.key ===
																		'COMPLETION'
																	) {
																		return false;
																	} else {
																		return true;
																	}
																}
															)

															.map(
																(
																	keyLabelDict
																) => (
																	<Box>
																		{dependentDataListComponent(
																			dependantData,
																			index,
																			keyLabelDict
																		)}
																	</Box>
																)
															)}
													</Box>

													<Box my={2}>
														<Divider />
													</Box>

													{/* 답변 데이터 */}
													<Box>
														<Box mb={0.5}>
															{/* Label */}
															<Typography
																variant={
																	'body2'
																}
																fontWeight={600}
															>
																답변 데이터
															</Typography>
														</Box>
														{modelData.DATA_KEY_LABEL_DICT_LIST.state
															.filter(
																(
																	keyLabelDict
																) => {
																	if (
																		keyLabelDict.key ===
																		'COMPLETION'
																	) {
																		return true;
																	}
																}
															)

															.map(
																(
																	keyLabelDict
																) => (
																	<Box>
																		{dependentDataListComponent(
																			dependantData,
																			index,
																			keyLabelDict
																		)}
																	</Box>
																)
															)}
													</Box>
												</Box>
											</Box>
										)
									)}
								</Box>
							)}
						</Box>

						{/* Train element add controller */}
						<Box
							borderRadius={3}
							sx={{
								pt: 2,
								pl: 2,
								pr: 2,
								pb: 2,
								position: 'relative',
								background: 'rgb(242, 242, 243)',
								height: '100%',
								width: '100%',
								minHeight: '64px',
								mt: 1,
							}}
						>
							<Box p={1.5} sx={{ background: 'white' }}>
								<Box mb={1.5}>
									<Typography variant={'h6'} fontWeight={500}>
										훈련 데이터 추가
									</Typography>
								</Box>
								<Box>
									<Grid
										container
										spacing={2}
										alignItems={'flex-end'}
									>
										<Grid item xs={12} md={12}>
											{
												<Box>
													{modelData.DATA_KEY_LABEL_DICT_LIST.state.map(
														(keyLabelDict) => (
															<Box
																mb={1}
																key={JSON.stringify(
																	keyLabelDict
																)}
															>
																<TextTypeInput
																	labelConfig={{
																		position:
																			'outer',
																		label: keyLabelDict.label,
																	}}
																	placeHolder={`${keyLabelDict.label}을(를) 입력해주세요.`}
																	fullWidth
																	rows={1}
																	multiline={
																		true
																	}
																	value={
																		keyValueSet[
																			keyLabelDict
																				.key
																		]
																	}
																	setValue={(
																		value
																	) => {
																		setKeyValueSet(
																			{
																				...keyValueSet,
																				[keyLabelDict.key]:
																					value,
																			}
																		);
																	}}
																/>
															</Box>
														)
													)}
												</Box>
											}
										</Grid>

										<Grid item xs={12} md={12}>
											<Button
												fullWidth
												sx={{
													height: '100%',
													minHeight: '53px',
													maxWidth: '100%',
												}}
												disabled={(() => {
													let isAddElementButtonDisabled =
														false;

													for (const key in keyValueSet) {
														if (
															keyValueSet[key] ===
																'' ||
															keyValueSet[key] ===
																undefined
														) {
															isAddElementButtonDisabled =
																true;
															break;
														}
													}

													return isAddElementButtonDisabled;
												})()}
												variant="contained"
												onClick={
													onClickCreateTrainElementButton
												}
											>
												<AddCircleRoundedIcon />
											</Button>
										</Grid>
									</Grid>
								</Box>
							</Box>
						</Box>
					</Box>
				</Box>
			)}
		</Box>
	);
};

export default Page;
