import React, { useEffect } from 'react';

import { Box, BoxProps, Divider, Typography } from '@mui/material';
import SuppportiModal from '../../../../../global/SuppportiModal';
import SupportiButton from '../../../../../global/SupportiButton';
import SupportiInput from '../../../../../global/SupportiInput';
import OkrModalDetailBox from '../OkrModalDetailBox/OkrModalDetailBox';
import SupportiProgressBar from '../../../../../global/SupportiProgressBar';
import { IOkrDetail } from '../../../../../../@types/model';
import { OkrDetailController } from '../../../../../../controller/OkrDetailController';
import { OkrDetailCard } from '../OkrDetailCard';
import AchieveBox from '../AchieveBox/AchieveBox';
import DefaultController from '@qillie-corp/ark-office-project/src/controller/default/DefaultController';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { useAppMember } from '../../../../../../hooks/useAppMember';
import { v4 as uuidv4 } from 'uuid';

interface IOkrDetailModalProps {
	modalOpen: boolean;
	setModalOpen: React.Dispatch<boolean>;
	okrMainData?: any;
	setOkrMainData?: any;
	okrDetailData?: any;
	setOkrDetailData?: any;
	materialDataList?: any;
	setTriggerKey?: React.Dispatch<any>;
}

const OkrDetailModal = (props: IOkrDetailModalProps) => {
	//* Controllers
	const okrMainController = new DefaultController('OkrMain');
	const okrDetailController = new DefaultController('OkrDetail');

	//* Modules
	//* Hooks
	/**
	 * 유저 아이디 가져오는 훅
	 */
	const { memberId } = useAppMember();
	//* Constants

	//* States
	const [okrMainData, setOkrMainData] = React.useState({
		TITLE: props.okrMainData?.TITLE,
		START_DATE: props.okrMainData?.START_DATE,
		END_DATE: props.okrMainData?.END_DATE,
		NOTE: props.okrMainData?.NOTE,
		APP_MEMBER_IDENTIFICATION_CODE: memberId,
		ACHIEVED_RATE: props.okrMainData?.ACHIEVED_RATE,
	});

	const [okrDetailData, setOkrDetailData] = React.useState([]);

	/**
	 * 수정 모드인지 여부
	 * **/
	const [isEditMode, setIsEditMode] = React.useState(false);

	//* Functions
	/**
	 * 하위 목표 작성 폼 삭제
	 */
	const deleteOkrDetail = (index: number) => {
		const okrDetailDataCopy = [...okrDetailData];
		okrDetailDataCopy.splice(index, 1);
		setOkrDetailData(okrDetailDataCopy);
	};

	//* okr 업데이트 함수
	const updateOkrMain = (injectedObj) => {
		if (okrMainData.TITLE === '') {
			alert('필수값을 입력해주세요.');
		} else {
			if(okrMainData.TITLE.length >= 20) {
				alert('20자 이하로 입력해주세요.')
				return;
			}else {
							okrMainController.updateItem(
				Object.assign(
					{
						APP_MEMBER_IDENTIFICATION_CODE: memberId,
						OKR_MAIN_IDENTIFICATION_CODE:
							props.okrMainData['OKR_MAIN_IDENTIFICATION_CODE'],
					},
					injectedObj
				),
				(response: any) => {
					alert('업데이트 성공');
					props.setTriggerKey && props.setTriggerKey(uuidv4());
					props.setModalOpen(false);
					setIsEditMode(false);
				},
				(err: any) => {}
			);
			}

		}
	};

	const updateDetailOkr = () => {
		props.okrDetailData.map((item) => {
			{
				item.TITLE == '' ||
				item.TARGET_AMOUNT == 0 ||
				item.TARGET_UNIT == '' ||
				item.TARGET_UNIT == undefined
					? alert('필수 값 미입력')
					: updateOkrMain({
							TITLE: item.TITLE,
							START_DATE: item.START_DATE,
							END_DATE: item.END_DATE,
							TARGET_AMOUNT: item.TARGET_AMOUNT,
							TARGET_UNIT: item.TARGET_UNIT,
							NOTE: item.NOTE,
							ACHIEVED_AMOUNT: item.ACHIEVED_AMOUNT,
							OKR_DETAIL_IDENTIFICATION_CODE:
								item.OKR_DETAIL_IDENTIFICATION_CODE,
					  });
			}
		});
	};

	/**
	 *
	 * 메인 목표 삭제
	 */
	const deleteOkrMain = () => {
		okrMainController.deleteItem(
			{
				APP_MEMBER_IDENTIFICATION_CODE: memberId,
				OKR_MAIN_IDENTIFICATION_CODE:
					props.okrMainData['OKR_MAIN_IDENTIFICATION_CODE'],
			},
			(response: any) => {
				alert('삭제 성공');
				props.setTriggerKey && props.setTriggerKey(uuidv4());
				props.setModalOpen(false);
			},
			(err: any) => {}
		);
	};

	/**
	 * 필수값 미입력 판단 함수
	 */
	const checkRequiredValue = (target) => {
		if (target == '') {
			return false;
		}

		// okrDetailData.map((item) => {
		// 	return item.TITLE == '' ||
		// 		item.TARGET_AMOUNT == 0 ||
		// 		item.TARGET_UNIT == ''
		// 		? false
		// 		: true;
		// });
	};

	//* Hooks
	React.useEffect(() => {
		if (!isEditMode && memberId) {
			setOkrMainData({
				TITLE: props.okrMainData?.TITLE,
				START_DATE: props.okrMainData?.START_DATE,
				END_DATE: props.okrMainData?.END_DATE,
				NOTE: props.okrMainData?.NOTE,
				APP_MEMBER_IDENTIFICATION_CODE: memberId,
				ACHIEVED_RATE: props.okrMainData?.ACHIEVED_RATE,
			});

			setOkrDetailData([]);
			// props.setOkrDetailData(PrevDetailData);
		}
	}, [isEditMode, memberId, props.modalOpen]);

	// useEffect(() => {
	// 	if (memberId) {
	// 		setOkrDetailData([
	// 			{
	// 				TITLE: '',
	// 				START_DATE: new Date(),
	// 				END_DATE: new Date(),
	// 				TARGET_AMOUNT: 0,
	// 				TARGET_UNIT: '',
	// 				NOTE: '',
	// 				ACHIEVED_AMOUNT: 0,
	// 				APP_MEMBER_IDENTIFICATION_CODE: memberId,
	// 			},
	// 		]);
	// 	}
	// }, [memberId]);

	console.log(props.okrDetailData);

	return (
		<Box>
			<SuppportiModal
				open={props.modalOpen}
				handleClose={() => {
					props.setModalOpen(false);
				}}
				title={''}
				style={{
					width: { xs: '100%', sm: '60%' },
					padding: { xs: '10px', sm: '20px' },
				}}
				children={
					<Box
						display={'flex'}
						flexDirection={'column'}
						gap={2}
						maxHeight={'80vh'}
						minHeight={'70vh'}
						overflow={'auto'}
						sx={{
							width: { xs: '100%', sm: '80%' },
						}}
					>
						{/** 상위 목표 작성 */}
						<Box display={'flex'} flexDirection={'column'} gap={1}>
							<Box
								display={'flex'}
								justifyContent={'space-between'}
							>
								{isEditMode ? (
									<Box>
										<SupportiInput
											type="input"
											value={okrMainData.TITLE}
											setValue={(value: string) => {
												setOkrMainData({
													...okrMainData,
													TITLE: value,
												});
											}}
											width={'100%'}
											placeholder="상위 목표 타이틀을 입력해주세요."
										/>
										<Box
											display="flex"
											justifyContent={'space-between'}
										>
											<Typography
												variant="body1"
												color="error.main"
												sx={{
													visibility:
														okrMainData.TITLE !== ''
															? 'hidden'
															: 'block',
												}}
											>
												필수값입니다.
											</Typography>

											<Box
												display="flex"
												ml={'auto'}
												gap={0.5}
											>
												<Typography
													color={
														okrMainData.TITLE
															.length < 20
															? 'secondary.main'
															: 'warning.main'
													}
												>
													{okrMainData.TITLE.length}
												</Typography>
												<Typography
													color={
														okrMainData.TITLE
															.length < 20
															? 'secondary.main'
															: 'warning.main'
													}
												>
													/
												</Typography>
												<Typography
													color={
														okrMainData.TITLE
															.length < 20
															? 'secondary.main'
															: 'warning.main'
													}
												>
													20
												</Typography>
											</Box>
										</Box>
									</Box>
								) : (
									<Typography
										fontWeight={'bold'}
										variant="h5"
									>
										{okrMainData?.TITLE}
									</Typography>
								)}
								<Box
									display={'flex'}
									gap={'4px'}
									alignItems={'center'}
								>
									{/** 삭제 버튼 */}
									<SupportiButton
										contents={'삭제'}
										onClick={() => {
											memberId && deleteOkrMain();
										}}
										style={{
											height: '20px',
											width: '40px',
										}}
										color={'primary'}
										variant="contained"
										isGradient={true}
									/>
									{/** 수정 버튼 */}
									<SupportiButton
										contents={isEditMode ? '취소' : '수정'}
										onClick={() => {
											setIsEditMode(!isEditMode);
										}}
										style={{
											height: '20px',
											width: '40px',
										}}
										color={'primary'}
										variant="contained"
										isGradient={true}
									/>
								</Box>
							</Box>

							{/** 날짜  */}
							<Box display={'flex'}>
								{!isEditMode ? (
									<Box display={'flex'}>
										<Typography
											fontWeight={500}
											color={'secondary.main'}
										>
											{
												(
													okrMainData?.START_DATE as string
												).split('T')[0]
											}
										</Typography>
										<Typography
											ml={0.5}
											mr={0.5}
											fontWeight={500}
											color={'secondary.main'}
										>
											~
										</Typography>
										<Typography
											fontWeight={500}
											color={'secondary.main'}
										>
											{
												(
													okrMainData?.END_DATE as string
												).split('T')[0]
											}
										</Typography>
									</Box>
								) : (
									<Box display={'flex'}>
										<CalendarTodayIcon
											sx={{
												width: '15px',
												height: '15px',
												marginTop: 'auto',
												marginBottom: 'auto',
												marginRight: '5px',
											}}
										/>
										<SupportiInput
											type="datepicker"
											readOnly={isEditMode ? false : true}
											value={okrMainData?.START_DATE}
											setValue={(value) => {
												setOkrMainData({
													...okrMainData,
													START_DATE: value
														.toDate()
														.toISOString(),
												});
											}}
											width={'110px'}
											useIcon={false}
											style={{ height: '20px' }}
										/>
										<SupportiInput
											type="datepicker"
											defaultValue={new Date()}
											readOnly={isEditMode ? false : true}
											value={okrMainData.END_DATE}
											minDate={
												okrMainData?.START_DATE as string
											}
											setValue={(value) => {
												setOkrMainData({
													...okrMainData,
													END_DATE: value
														.toDate()
														.toISOString(),
												});
											}}
											width={'110px'}
											useIcon={false}
										/>
									</Box>
								)}
							</Box>

							<Box display="flex" gap={2} flexDirection="column">
								<Box display="flex" gap={1}>
									<Typography>현재 달성률</Typography>
									<Typography color={'primary.main'}>
										{props.okrMainData.ACHIEVED_RATE
											? props.okrMainData.ACHIEVED_RATE
											: 0}
										%
									</Typography>
								</Box>
								{/** 프로그레스바 */}
								<SupportiProgressBar
									materialDataList={props.materialDataList}
									totalPercentage={
										props.okrMainData.ACHIEVED_RATE
									}
								/>

								{/** 메모 입력 */}
								<SupportiInput
									type="inputwithbtn"
									value={okrMainData.NOTE}
									// readOnly={
									// 	okrMainData.NOTE.length > 500
									// 		? true
									// 		: false
									// }
									setValue={(value) => {
										setOkrMainData({
											...okrMainData,
											NOTE: value,
										});
									}}
									btnContent="등록하기"
									btnOnclick={() => {
										updateOkrMain({
											NOTE: okrMainData.NOTE,
										});
									}}
									width={'100%'}
									multiline={true}
									placeholder="메모 입력"
								/>
								<Box display="flex" ml={'auto'} gap={0.5}>
									<Typography
										color={
											okrMainData.NOTE.length < 500
												? 'secondary.main'
												: 'warning.main'
										}
									>
										{okrMainData.NOTE.length}
									</Typography>
									<Typography
										color={
											okrMainData.NOTE.length < 500
												? 'secondary.main'
												: 'warning.main'
										}
									>
										/
									</Typography>
									<Typography
										color={
											okrMainData.NOTE.length < 500
												? 'secondary.main'
												: 'warning.main'
										}
									>
										500
									</Typography>
								</Box>
							</Box>
						</Box>

						<Divider sx={{ my: 2 }} />

						{/** 하위 목표 작성 */}
						<Box>
							<Box
								display={'flex'}
								justifyContent={'space-between'}
							>
								<Box display={'flex'}>
									<Typography fontWeight={600}>
										하위목표
									</Typography>
									{/** 갯수 */}
									<Typography
										color="primary.main"
										ml={1}
										fontWeight={600}
									>
										{props.okrDetailData.length}
									</Typography>
								</Box>

								{/** 하위 목표 추가 버튼 */}
								<SupportiButton
									contents={'하위 목표 추가 +'}
									onClick={() => {
										setOkrDetailData([
											...okrDetailData,
											{
												TITLE: '',
												START_DATE: new Date(),
												END_DATE: new Date(),
												TARGET_AMOUNT: 0,
												TARGET_UNIT: undefined,
												NOTE: '',
												ACHIEVED_AMOUNT: 0,
												APP_MEMBER_IDENTIFICATION_CODE:
													memberId,
											},
										]);
									}}
									style={{
										height: 5,
										color: 'black',
										marginBottom: '10px',
									}}
									color={'secondary'}
									variant="outlined"
								/>
							</Box>

							{/** 작성 컴포넌트 */}
							{okrDetailData?.map((okr, index) => {
								return (
									<OkrModalDetailBox
										key={index}
										mode={'detail'}
										data={okr}
										index={index}
										okrDetailData={okrDetailData}
										setOkrDetailData={setOkrDetailData}
										isModalOpen={props.modalOpen}
										setIsModalOpen={props.setModalOpen}
										okrMainId={
											props.okrMainData
												?.OKR_MAIN_IDENTIFICATION_CODE
										}
										deleteOkrDetail={deleteOkrDetail}
										setTriggerKey={props.setTriggerKey}
									/>
								);
							})}

							<Box>
								{props.okrDetailData.map((item, index) => {
									return (
										<Box
											bgcolor={'secondary.light'}
											borderRadius={2}
											display={'flex'}
											flexDirection={'column'}
											gap={2}
											mb={2}
											pl={1}
										>
											<OkrDetailCard
												data={item}
												index={index}
												mode="detail"
												updateDetailOkr={
													updateDetailOkr
												}
												children={
													<AchieveBox
														data={item}
														modalOpen={
															props.modalOpen
														}
														setModalOpen={
															props.setModalOpen
														}
														setTriggerKey={
															props.setTriggerKey
														}
													/>
												}
												okrDetailData={
													props.okrDetailData
												}
												setOkrDetailData={
													props.setOkrDetailData
												}
												modalOpen={props.modalOpen}
												setModalOpen={
													props.setModalOpen
												}
												setTriggerKey={
													props.setTriggerKey
												}
											/>
										</Box>
									);
								})}
							</Box>
						</Box>

						{/** 등록 버튼 */}
						{isEditMode && (
							<SupportiButton
								contents={'등록하기'}
								onClick={() => {
									//* Okr 메인 목표 등록

									memberId && updateOkrMain(okrMainData);
								}}
								style={{
									height: '20px',
									width: '200px',
									marginLeft: 'auto',
									marginRight: 'auto',
								}}
								color={'primary'}
								variant="contained"
								isGradient={true}
							/>
						)}
					</Box>
				}
			/>
		</Box>
	);
};

export default OkrDetailModal;
