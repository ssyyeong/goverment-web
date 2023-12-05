import {
	Avatar,
	Box,
	Button,
	CircularProgress,
	Grid,
	IconButton,
	Tooltip,
	Typography,
	useTheme,
} from '@mui/material';
import { NextPage } from 'next';
import React, { useState, useEffect } from 'react';
import SaveIcon from '@mui/icons-material/Save';

import DataUtil from '@qillie-corp/ark-office-project/src/utils/data/DataUtil';
import DefaultController from '@qillie-corp/ark-office-project/src/controller/default/DefaultController';
import AppMemberForm from '@qillie-corp/ark-office-project/src/layout/forms/member/AppMemberForm/AppMemberForm';
import {
	IData,
	IWrappedData,
} from '@qillie-corp/ark-office-project/src/@types/base/data';
import { memory } from '../../../_app';
import BaseForm from '@qillie-corp/ark-office-project/src/layout/forms/base/BaseForm/BaseForm';
import GptCommonUtilityController from '@qillie-corp/ark-office-project/src/controller/company/ai/gpt/GptCommonUtilityController';
import GptTextBotUtilityController from '@qillie-corp/ark-office-project/src/controller/company/ai/gpt/GptTextBotUtilityController';
import ReadMoreRoundedIcon from '@mui/icons-material/ReadMoreRounded';
import ModelTrainingRoundedIcon from '@mui/icons-material/ModelTrainingRounded';
import { useRouter } from 'next/router';
import { SelectTypeInput, TextTypeInput } from '@qillie-corp/qillie-react-ui';
import RefreshRoundedIcon from '@mui/icons-material/RefreshRounded';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import SmartToyRoundedIcon from '@mui/icons-material/SmartToyRounded';
import Select from '@qillie-corp/ark-office-project/src/ui/local/input/Select/Select';

interface IGptChatting {
	GPT_TEXT_BOT_IDENTIFICATION_CODE?: number;
	BOT_ROLE: 'CHAT' | 'COMPLETION';
}

interface IGptChatHistory {
	role: 'user' | 'assistant';
	content: string;
	name?: string;
}

const GptChatting = (props: IGptChatting) => {
	//* Modules
	const theme = useTheme();
	const gptTextBotUtilityController = new GptTextBotUtilityController();

	//* States
	/**
	 * 채팅 보내기 관련
	 */
	const [waitingChatResponse, setWaitingChatResponse] =
		useState<boolean>(false);
	const [chattingInput, setChattingInput] = useState<string>('');

	/**
	 * 채팅 히스토리
	 */
	const [chattingHistoryList, setChattingHistoryList] = useState<
		IGptChatHistory[]
	>([
		{
			role: 'assistant',
			content: '안녕하세요. 질문을 입력해주세요!',
			name: '챗봇',
		},
	]);

	//* Functions
	/**
	 * Function to send chat
	 */
	const sendChat = () => {
		setWaitingChatResponse(true);
		setChattingInput('');

		//* Add chat to history
		const clonedChattingHistoryList = [...chattingHistoryList];
		clonedChattingHistoryList.splice(0, 1);

		clonedChattingHistoryList.push({
			role: 'user',
			content: chattingInput,
		});

		setChattingHistoryList(clonedChattingHistoryList);

		//* Send request
		if (props.BOT_ROLE == 'CHAT') {
			gptTextBotUtilityController.sendChat(
				chattingInput,
				undefined,
				clonedChattingHistoryList.map((item) => {
					return {
						role: item.role,
						content: item.content,
					};
				}),
				props.GPT_TEXT_BOT_IDENTIFICATION_CODE,
				(res) => {
					const clonedList = [...clonedChattingHistoryList];
					clonedList.push(
						Object.assign(res.data.result, { name: '챗봇' })
					);

					setChattingHistoryList(clonedList);
					setWaitingChatResponse(false);
				},
				(err) => {
					setWaitingChatResponse(false);
					alert('채팅 전송에 실패했습니다.');
					console.log(err);
					console.log(err.response.data);
				}
			);
		} else if (props.BOT_ROLE == 'COMPLETION') {
			gptTextBotUtilityController.sendCompletion(
				chattingInput,
				props.GPT_TEXT_BOT_IDENTIFICATION_CODE,
				(res) => {
					console.log(res);
					setWaitingChatResponse(false);
				},
				(err) => {
					setWaitingChatResponse(false);
					alert('채팅 전송에 실패했습니다.');
				}
			);
		}
	};

	//* Components
	const messageBox = (
		background: string,
		speaker: 'assistant' | 'user',
		message: string
	) => {
		return (
			<Box
				display={'inline-block'}
				position={'relative'}
				width={'auto'}
				height={'auto'}
				p={1}
				borderRadius={1.5}
				sx={{
					background: background,
				}}
			>
				<Typography variant={'body1'} color={'#fff'} lineHeight={1.5}>
					{message}
				</Typography>
			</Box>
		);
	};

	return (
		<Box p={1.5} pt={2.5} borderRadius={1.5} sx={{ background: '#f3f3f3' }}>
			{/* Chat history */}
			<Box position={'relative'} minHeight={'80px'}>
				{chattingHistoryList.length == 0 ? (
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
							sx={{
								color: '#9f9f9f',
							}}
						>
							Empty
						</Typography>
					</Box>
				) : (
					<Box>
						{chattingHistoryList.map((chattingHistory, index) => (
							<Box
								key={index}
								display={'flex'}
								alignItems={'center'}
								mb={1}
							>
								{chattingHistory.role === 'assistant' ? (
									<Box
										display={'flex'}
										justifySelf={'flex-start'}
									>
										{/* Avatar */}
										<Box mr={1}>
											<Avatar
												sx={{
													bgcolor:
														theme.palette.primary
															.main,
												}}
												variant="rounded"
											>
												<SmartToyRoundedIcon />
											</Avatar>
										</Box>

										{/* Data */}
										<Box>
											{/* Nickname */}
											<Box mb={0.5}>
												<Typography
													variant={'body1'}
													fontWeight={'600'}
													color={
														theme.palette.primary
															.dark
													}
												>
													{chattingHistory.name}
												</Typography>
											</Box>

											{/* Message */}
											<Box>
												{messageBox(
													theme.palette.primary.light,
													'assistant',
													chattingHistory.content
												)}
											</Box>
										</Box>
									</Box>
								) : (
									<Box
										display={'flex'}
										width={'100%'}
										justifyContent={'flex-end'}
									>
										{messageBox(
											theme.palette.grey[800],
											'user',
											chattingHistory.content
										)}
									</Box>
								)}
							</Box>
						))}
					</Box>
				)}
			</Box>

			{/* Chat input */}
			<Box
				mt={2.5}
				p={1.5}
				borderRadius={1.5}
				sx={{ background: '#fff' }}
			>
				{/* Message */}
				<Box>
					<TextTypeInput
						fullWidth
						multiline={true}
						rows={1}
						value={chattingInput}
						setValue={setChattingInput}
						onEnter={() => {
							if (waitingChatResponse == false) {
								sendChat();
							}
						}}
						adornmentPosition={'end'}
						adornmentElement={
							<Button
								sx={{
									minWidth: 0,
									minHeight: 0,
									width: {
										xs: '45px',
										md: '70px',
									},
									height: { xs: '45px', md: '70px' },
								}}
								color={'primary'}
								variant="contained"
								disabled={waitingChatResponse}
								onClick={() => {
									if (waitingChatResponse == false) {
										sendChat();
									}
								}}
							>
								{waitingChatResponse ? (
									<CircularProgress
										sx={{
											color: '#fff',
											width: '20px',
											height: '20px',
										}}
									/>
								) : (
									<SendRoundedIcon
										sx={{
											fontSize: {
												xs: '20px',
												md: '25px',
											},
										}}
									/>
								)}
							</Button>
						}
					/>
				</Box>
			</Box>
		</Box>
	);
};

const Page: NextPage = () => {
	//* Modules
	const dataUtil = new DataUtil();
	const router = useRouter();

	//* Controller
	const modelName = 'GptTextBot';
	const controller = new DefaultController(modelName);
	const gptTextTrainDataHeaderController = new DefaultController(
		'GptTextTrainDataHeader'
	);
	const gptCommonUtilityController = new GptCommonUtilityController();
	const gptTextBotUtilityController = new GptTextBotUtilityController();

	//* States
	const [modelData, setModelData] = useState<{
		[key: string]: IWrappedData;
	}>();
	/**
	 * 선택 가능한 GPT 모델 리스트
	 */
	const [selectableGptTextBaseModels, setSelectableGtpTextBaseModels] =
		useState<{ label: string; value: any }[]>([]);

	/**
	 * 선택 가능한 훈련 세트 리스트
	 */
	const [selectableTrainDataHeaderIds, setSelectableTrainDataHeaderIds] =
		useState<{ label: string; value: any }[]>([]);

	/**
	 * GPT 챗봇 (채팅 / 완성) 관련
	 */
	const [baseModel, setBaseModel] = useState<string>('');
	const [chatSystemData, setChatSystemData] = useState<string>('');
	const [modelTrainStatus, setModelTrainStatus] = useState<string>('pending');

	/**
	 * GPT 완성용 봇 관련
	 */
	const [trainDataHeaderId, setTrainDataHeaderId] = useState<string>('');

	//* Constants
	const dataList: IData[] = [
		{
			keys: ['NAME'],
			ui: 'textarea',
			label: '봇 이름',
			grid: {
				xs: 8,
				md: 8,
			},
		},
		{
			keys: ['MODEL_ROLE'],
			ui: 'select',
			rows: 2,
			label: '봇 역할',
			grid: {
				xs: 4,
				md: 4,
			},
			selectableItems: [
				{
					label: '채팅',
					value: 'CHAT',
				},
				{
					label: '글 완성',
					value: 'COMPLETION',
				},
			],
		},
		{
			keys: ['MAX_TOKEN_LENGTH'],
			ui: 'textarea',
			type: 'number',
			label: '토큰 최대 개수',
			grid: {
				xs: 4,
				md: 4,
			},
		},
		{
			keys: ['FREQUENCY_PENALTY'],
			ui: 'textarea',
			type: 'number',
			label: '반복 페널티',
			grid: {
				xs: 4,
				md: 4,
			},
		},
		{
			keys: ['DESCRIPTION'],
			ui: 'textarea',
			rows: 2,
			label: '설명',
			grid: {
				xs: 12,
				md: 12,
			},
		},
	];

	//* Functions
	/**
	 * 봇 훈련시키는 함수
	 */
	const onClickTrainBot = () => {
		const confirm = window.confirm('봇을 훈련시키시겠습니까?');

		if (confirm) {
			if (modelData?.MODEL_ROLE?.state == 'COMPLETION') {
				if (
					baseModel !== '' &&
					trainDataHeaderId !== '' &&
					trainDataHeaderId !== null
				) {
					controller.updateItem(
						{
							GPT_TEXT_BOT_IDENTIFICATION_CODE:
								modelData.GPT_TEXT_BOT_IDENTIFICATION_CODE
									?.state,
							BASE_MODEL: baseModel,
							GPT_TEXT_TRAIN_DATA_HEADER_IDENTIFICATION_CODE:
								trainDataHeaderId,
						},
						(res) => {
							//* Register train data
							gptTextBotUtilityController.registerTextTrainData(
								Number(trainDataHeaderId),
								(res) => {
									if (res.data.result?.status == 'uploaded') {
										const trainDataId =
											res.data.result?.trainDataResponse
												.id;
										const validationDataId =
											res.data.result
												?.validationDataResponse.id;

										//* Train bot
										gptTextBotUtilityController.startTrainTextModel(
											modelData
												?.GPT_TEXT_BOT_IDENTIFICATION_CODE
												?.state,
											trainDataId,
											validationDataId,
											(trainRes) => {
												alert(
													'훈련 시작이 완료되었습니다!'
												);
											},
											(trainErr) => {
												alert(
													'훈련 시작에 실패했습니다!'
												);
											}
										);
									}
								},
								(err) => {
									alert(
										'훈련 데이터를 openai에 등록하는데 실패했습니다!'
									);
								}
							);
						},
						(err) => {
							alert('봇 훈련 전 정보 업데이트에 실패하였습니다.');
						}
					);
				} else {
					alert('훈련 세트를 선택해주세요.');
					return;
				}
			}
		}
	};

	/**
	 * 훈련 데이터로 바로가기 함수
	 */
	const onClickGoToTrainData = () => {
		if (
			trainDataHeaderId !== undefined &&
			trainDataHeaderId !== null &&
			trainDataHeaderId !== ''
		) {
			const confirm = window.confirm('훈련 데이터로 이동하시겠습니까?');

			if (confirm) {
				router.push(`../train_data/${trainDataHeaderId}`);
			}
		} else {
			alert('훈련 데이터가 선택되지 않았습니다!');
		}
	};

	/**
	 * 훈련 상태 확인 함수
	 */
	const checkTrainStatus = () => {
		if (
			modelData?.GPT_TEXT_TRAIN_DATA_HEADER_IDENTIFICATION_CODE?.state !==
			null
		) {
			console.log(modelData?.GPT_TEXT_BOT_IDENTIFICATION_CODE?.state);

			gptTextBotUtilityController.checkModelTrainStatus(
				modelData?.GPT_TEXT_BOT_IDENTIFICATION_CODE?.state,
				(trainRes) => {
					setModelTrainStatus(trainRes.data.result.status);
				},
				(err) => {
					alert('훈련 상태를 확인하는데 실패했습니다!');
				}
			);
		} else {
			alert('훈련 데이터가 선택되지 않았습니다!');
		}
	};

	/**
	 * 채팅봇 베이스 모델 변경 함수
	 */
	const onClickSaveBaseModel = () => {
		const confirm = window.confirm('베이스 모델을 변경하시겠습니까?');

		if (confirm) {
			controller.updateItem(
				{
					GPT_TEXT_BOT_IDENTIFICATION_CODE:
						modelData.GPT_TEXT_BOT_IDENTIFICATION_CODE?.state,
					BASE_MODEL: baseModel,
				},
				(res) => {
					alert('베이스 모델 변경이 완료되었습니다!');
				},
				(err) => {
					alert('베이스 모델 변경에 실패했습니다!');
				}
			);
		}
	};

	/**
	 * 채팅봇 시스템 데이터 변경 함수
	 */
	const onClickSaveChatSystemData = () => {
		const confirm = window.confirm(
			'채팅 시스템 데이터를 변경하시겠습니까?'
		);

		if (confirm) {
			controller.updateItem(
				{
					GPT_TEXT_BOT_IDENTIFICATION_CODE:
						modelData.GPT_TEXT_BOT_IDENTIFICATION_CODE?.state,
					CHAT_SYSTEM_DATA: chatSystemData,
				},
				(res) => {
					alert('채팅 시스템 데이터 변경이 완료되었습니다!');
				},
				(err) => {
					alert('채팅 시스템 데이터 변경에 실패했습니다!');
				}
			);
		}
	};

	/**
	 * 채팅봇 채팅 헤더
	 */
	const onClickSaveTextTrainHeader = () => {
		const confirm = window.confirm(
			'채팅 시스템 데이터를 변경하시겠습니까?'
		);

		if (confirm) {
			controller.updateItem(
				{
					GPT_TEXT_BOT_IDENTIFICATION_CODE:
						modelData.GPT_TEXT_BOT_IDENTIFICATION_CODE?.state,
					GPT_TEXT_TRAIN_DATA_HEADER_IDENTIFICATION_CODE:
						trainDataHeaderId,
				},
				(res) => {
					alert('채팅 시스템 데이터 변경이 완료되었습니다!');
				},
				(err) => {
					alert('채팅 시스템 데이터 변경에 실패했습니다!');
				}
			);
		}
	};

	//* Hooks
	/**
	 * 훈련 상태 업데이트 훅
	 */
	useEffect(() => {
		if (modelData !== undefined) {
			if (
				modelTrainStatus != 'succeeded' &&
				modelData?.GPT_TEXT_TRAIN_DATA_HEADER_IDENTIFICATION_CODE
					?.state !== null
			) {
				checkTrainStatus();
			}
		}
	}, [modelData]);

	/**
	 * 선택 가능한 GPT 모델 리스트를 가져오는 훅
	 */
	useEffect(() => {
		if (modelData !== undefined) {
			gptCommonUtilityController.getListOfModels(
				modelData?.MODEL_ROLE.state,
				(res) => {
					const tempSelectableGtpTextBaseModels = res.data.result.map(
						(item) => {
							return {
								label: `${item.id} / ${item.owned_by}`,
								value: item.id,
							};
						}
					);
					setSelectableGtpTextBaseModels(
						tempSelectableGtpTextBaseModels
					);
				},
				(err) => {
					alert(
						'선택 가능한 GPT 모델 리스트를 가져오는데 실패했습니다!'
					);
				}
			);
		}
	}, [modelData]);

	/**
	 * 선택 가능한 훈련 데이터 세트 리스트를 가져오는 훅
	 */
	useEffect(() => {
		gptTextTrainDataHeaderController.findAllItems(
			{},
			(res) => {
				const selectableTrainDataHeaderIds = res.data.result.rows.map(
					(item) => {
						return {
							label: item['NAME'],
							value: item[
								'GPT_TEXT_TRAIN_DATA_HEADER_IDENTIFICATION_CODE'
							],
						};
					}
				);
				setSelectableTrainDataHeaderIds(selectableTrainDataHeaderIds);
			},
			(err) => {
				alert(
					'선택 가능한 훈련 데이터 세트 리스트를 가져오는데 실패했습니다!'
				);
			}
		);
	}, []);

	/**
	 * 모델 관련 데이터 설정 훅
	 */
	useEffect(() => {
		if (modelData !== undefined) {
			setBaseModel(
				modelData['BASE_MODEL'].state !== null
					? modelData['BASE_MODEL'].state
					: ''
			);
			setChatSystemData(
				modelData['CHAT_SYSTEM_DATA'].state !== null
					? modelData['CHAT_SYSTEM_DATA'].state
					: ''
			);
			setTrainDataHeaderId(
				modelData['GPT_TEXT_TRAIN_DATA_HEADER_IDENTIFICATION_CODE']
					.state
			);
			setModelTrainStatus(modelData['MODEL_TRAIN_STATUS'].state);
		}
	}, [modelData]);

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
				updateCallback={(args, successCallback, failCallback) => {
					//* Delete base model, connected train data if base model is changed
					const confirm = window.confirm(
						'모델 역할 변경 시, 기존의 모델 및 훈련 모델 연동 등이 해제됩니다. 계속하시겠습니까?'
					);

					if (confirm) {
						gptTextBotUtilityController.resetTextBotBaseModelAndTrainDataConnection(
							args['MODEL_ROLE'],
							args['GPT_TEXT_BOT_IDENTIFICATION_CODE'],
							(res) => {
								controller.updateItem.bind(controller)(
									args,
									successCallback,
									failCallback
								);
							},
							(err) => {
								alert(
									'기존의 모델 및 훈련 모델 연동 등 해제에 실패했습니다!'
								);
							}
						);
					}
				}}
				findOneCallback={controller.getOneItem.bind(controller)}
				deleteCallback={controller.deleteItem.bind(controller)}
			/>

			{modelData !== undefined &&
				(modelData.MODEL_ROLE.state == 'CHAT' ? (
					<Box
						mb={1}
						p={1.75}
						borderRadius={1.5}
						sx={{ background: '#e6e6e6' }}
					>
						<Box
							p={1.5}
							borderRadius={1.5}
							sx={{ background: '#fff' }}
						>
							{/* Control header */}
							<Box
								display={'flex'}
								justifyContent={'space-between'}
								alignItems={'center'}
								mb={1}
							>
								{/* Label */}
								<Typography variant={'h6'} fontWeight={500}>
									채팅 봇 설정
								</Typography>
							</Box>

							{/* 컨트롤러 */}
							<Box>
								{/* 훈련 상태 */}
								<Box mb={1.5}>
									<Box mb={1.5}>
										<Box mb={1}>
											<Typography variant={'caption'}>
												기반 모델
											</Typography>
										</Box>

										<Grid
											container
											spacing={1}
											alignItems={'center'}
										>
											<Grid item xs={8}>
												<Box>
													<Select
														inputStatus={
															modelData[
																'BASE_MODEL'
															].inputStatus
														}
														inputCaptionConfig={Object.assign(
															{
																status: modelData[
																	'BASE_MODEL'
																].inputStatus,
															},
															{
																requiredMessage:
																	'값을 선택해주세요.',
															}
														)}
														value={baseModel}
														setValue={setBaseModel}
														selectableItems={
															selectableGptTextBaseModels
														}
													/>
												</Box>
											</Grid>

											<Grid item xs={4}>
												<IconButton
													onClick={
														onClickSaveBaseModel
													}
												>
													<SaveIcon />
												</IconButton>
											</Grid>
										</Grid>
									</Box>

									<Box>
										<Box mb={1}>
											<Typography variant={'caption'}>
												기반 훈련 데이터
											</Typography>
										</Box>

										<Grid
											container
											spacing={1}
											alignItems={'center'}
										>
											<Grid item xs={8}>
												<Select
													key={trainDataHeaderId}
													inputStatus={
														modelData[
															'GPT_TEXT_TRAIN_DATA_HEADER_IDENTIFICATION_CODE'
														].inputStatus
													}
													inputCaptionConfig={Object.assign(
														{
															status: modelData[
																'GPT_TEXT_TRAIN_DATA_HEADER_IDENTIFICATION_CODE'
															].inputStatus,
														},
														{
															requiredMessage:
																'값을 선택해주세요.',
														}
													)}
													value={trainDataHeaderId}
													setValue={
														setTrainDataHeaderId
													}
													selectableItems={
														selectableTrainDataHeaderIds
													}
												/>
											</Grid>

											<Grid item xs={4}>
												<IconButton
													onClick={
														onClickSaveTextTrainHeader
													}
												>
													<SaveIcon />
												</IconButton>
											</Grid>
										</Grid>
									</Box>

									<Box>
										<Box mb={1}>
											<Typography variant={'caption'}>
												채팅 시스템 프롬프트
											</Typography>
										</Box>

										<Grid
											container
											spacing={1}
											alignItems={'center'}
										>
											<Grid item xs={8}>
												<Box>
													<TextTypeInput
														placeHolder={`채팅 시스템 데이터를 입력해주세요.`}
														fullWidth
														rows={1}
														multiline={true}
														value={chatSystemData}
														setValue={
															setChatSystemData
														}
													/>
												</Box>
											</Grid>

											<Grid item xs={4}>
												<IconButton
													onClick={
														onClickSaveChatSystemData
													}
												>
													<SaveIcon />
												</IconButton>
											</Grid>
										</Grid>
									</Box>
								</Box>

								{/* 채팅 테스트 */}
								<Box>
									<GptChatting
										BOT_ROLE={'CHAT'}
										GPT_TEXT_BOT_IDENTIFICATION_CODE={
											modelData
												?.GPT_TEXT_BOT_IDENTIFICATION_CODE
												?.state
										}
									/>
								</Box>
							</Box>
						</Box>
					</Box>
				) : modelData.MODEL_ROLE.state == 'COMPLETION' ? (
					<Box
						mb={1}
						p={1.75}
						borderRadius={1.5}
						sx={{ background: '#e6e6e6' }}
					>
						<Box
							p={1.5}
							borderRadius={1.5}
							sx={{ background: '#fff' }}
						>
							{/* Control header */}
							<Box
								display={'flex'}
								justifyContent={'space-between'}
								alignItems={'center'}
								mb={1}
							>
								{/* Label */}
								<Typography variant={'h6'} fontWeight={500}>
									텍스트 완성 봇 설정
								</Typography>

								{/* Update button */}
								<Box display={'flex'}>
									<Box mr={1}>
										<Tooltip title="훈련 데이터 바로가기">
											<IconButton
												onClick={() => {
													onClickGoToTrainData();
												}}
											>
												<ReadMoreRoundedIcon />
											</IconButton>
										</Tooltip>
									</Box>

									<Box>
										<Tooltip title="훈련시키기">
											<IconButton
												onClick={() => {
													onClickTrainBot();
												}}
											>
												<ModelTrainingRoundedIcon />
											</IconButton>
										</Tooltip>
									</Box>
								</Box>
							</Box>

							{/* 컨트롤러 */}
							<Box>
								{/* 모델 및 훈련 데이터 */}
								<Box mb={1.5}>
									<Grid container spacing={1}>
										<Grid item xs={6}>
											<Select
												key={baseModel}
												inputStatus={
													modelData['BASE_MODEL']
														.inputStatus
												}
												labelConfig={{
													position: 'outer',
													label: '기반 모델',
												}}
												inputCaptionConfig={Object.assign(
													{
														status: modelData[
															'BASE_MODEL'
														].inputStatus,
													},
													{
														requiredMessage:
															'값을 선택해주세요.',
													}
												)}
												value={baseModel}
												setValue={setBaseModel}
												selectableItems={
													selectableGptTextBaseModels
												}
											/>
										</Grid>

										<Grid item xs={6}>
											<Select
												key={trainDataHeaderId}
												inputStatus={
													modelData[
														'GPT_TEXT_TRAIN_DATA_HEADER_IDENTIFICATION_CODE'
													].inputStatus
												}
												labelConfig={{
													position: 'outer',
													label: '기반 훈련 데이터',
												}}
												inputCaptionConfig={Object.assign(
													{
														status: modelData[
															'GPT_TEXT_TRAIN_DATA_HEADER_IDENTIFICATION_CODE'
														].inputStatus,
													},
													{
														requiredMessage:
															'값을 선택해주세요.',
													}
												)}
												value={trainDataHeaderId}
												setValue={setTrainDataHeaderId}
												selectableItems={
													selectableTrainDataHeaderIds
												}
											/>
										</Grid>
									</Grid>
								</Box>

								{/* 훈련 상태 */}
								<Box mb={1.5}>
									<Box mb={1}>
										<Typography variant={'subtitle1'}>
											훈련 상태
										</Typography>
									</Box>
									<Grid container>
										<Grid item xs={8}>
											<TextTypeInput
												fullWidth
												value={(() => {
													const trainStatus =
														modelData[
															'MODEL_TRAIN_STATUS'
														].state;

													if (
														trainStatus == 'ready'
													) {
														return '훈련 대기중';
													} else if (
														trainStatus == 'pending'
													) {
														return '훈련 중';
													} else if (
														trainStatus ==
														'succeeded'
													) {
														return '훈련 완료';
													}
												})()}
												disabled
											/>
										</Grid>

										<Grid item xs={4}>
											<IconButton
												onClick={checkTrainStatus}
											>
												<RefreshRoundedIcon />
											</IconButton>
										</Grid>
									</Grid>
								</Box>

								{/* 채팅 테스트 */}
								<Box
									display={
										modelData?.MODEL_TRAIN_STATUS?.state ==
										'succeeded'
											? 'block'
											: 'none'
									}
								>
									<GptChatting
										BOT_ROLE="COMPLETION"
										GPT_TEXT_BOT_IDENTIFICATION_CODE={
											modelData
												?.GPT_TEXT_BOT_IDENTIFICATION_CODE
												?.state
										}
									/>
								</Box>
							</Box>
						</Box>
					</Box>
				) : (
					<Box></Box>
				))}
		</Box>
	);
};

export default Page;
