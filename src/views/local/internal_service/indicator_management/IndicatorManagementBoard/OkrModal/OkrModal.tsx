import React from 'react';

import { Box, BoxProps, Divider, Typography } from '@mui/material';
import SuppportiModal from '../../../../../global/SuppportiModal';
import SupportiButton from '../../../../../global/SupportiButton';
import SupportiInput from '../../../../../global/SupportiInput';
import OkrModalDetailBox from '../OkrModalDetailBox/OkrModalDetailBox';
import SupportiProgressBar from '../../../../../global/SupportiProgressBar';
import { IOkrDetail } from '../../../../../../@types/model';
import { OkrController } from '../../../../../../controller/OkrController';
import calculateAchieveRate from '../../../../../../function/calculateAchieveRate';
import { OkrDetailCard } from '../OkrDetailCard';
import AchieveBox from '../AchieveBox/AchieveBox';
import DefaultController from '@qillie-corp/ark-office-project/src/controller/default/DefaultController';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { useAppMember } from '../../../../../../hooks/useAppMember';
interface IOkrModalProps {
	modalOpen: boolean;
	setModalOpen: React.Dispatch<boolean>;
	mode?: string;
	setMode?: any;
	okrMainData?: any;
	setOkrMainData?: any;
	okrDetailData?: any;
	setOkrDetailData?: any;
	materialDataList?: any;
}

const OkrModal = (props: IOkrModalProps) => {
	//* Controllers
	const okrController = new OkrController();
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
		TITLE: props.mode === 'detail' ? props.okrMainData?.TITLE : '',
		START_DATE:
			props.mode === 'detail'
				? props.okrMainData?.START_DATE
				: new Date(),
		END_DATE:
			props.mode === 'detail' ? props.okrMainData?.END_DATE : new Date(),
		NOTE: props.mode === 'detail' ? props.okrMainData?.NOTE : '',
		APP_MEMBER_IDENTIFICATION_CODE: memberId,
	});

	const [okrDetailData, setOkrDetailData] = React.useState(
		props.mode === 'detail'
			? props.okrMainData?.OkrDetails
			: [
					{
						TITLE: '',
						START_DATE: new Date(),
						END_DATE: new Date(),
						TARGET_AMOUNT: 0,
						TARGET_UNIT: '',
						NOTE: '',
						ACHIEVED_AMOUNT: 0,
						APP_MEMBER_IDENTIFICATION_CODE: memberId,
					},
			  ]
	);

	/**
	 * 수정 모드인지 여부
	 * **/
	const [isEditMode, setIsEditMode] = React.useState(false);

	//* Functions
	/**
	 * 하위 목표 작성 삭제
	 */
	const deleteOkrDetail = (index: number) => {
		const okrDetailDataCopy = [...okrDetailData];
		okrDetailDataCopy.splice(index, 1);
		setOkrDetailData(okrDetailDataCopy);
	};

	/**
	 *
	 * 목표 등록하는 api 호출 처리
	 */
	const createOkr = () => {
		okrController.createItem(
			{
				OKR_MAIN: okrMainData,
				OKR_DETAIL: okrDetailData,
			},
			(response) => {
				alert('등록 성공');
				props.setModalOpen(false);
			},
			(err) => {
				console.log(err);
			}
		);
	};

	//* okr 업데이트 함수
	const updateOkr = (target, injectedObj) => {
		if (target === 'main') {
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
					setIsEditMode(false);
					// Toast.fire({
					//   icon: 'success',
					//   title: '성공적으로 수정 되었습니다.',
					// });
				},
				(err: any) => {
					// console.log(err);
					// Toast.fire({
					//   icon: 'error',
					//   title: '수정에 실패했습니다. 문의 부탁드립니다.',
					// });
				}
			);
		} else {
			okrDetailController.updateItem(
				Object.assign(
					{
						APP_MEMBER_IDENTIFICATION_CODE: memberId,
					},
					injectedObj
				),
				(response: any) => {
					setIsEditMode(false);
					// Toast.fire({
					//   icon: 'success',
					//   title: '성공적으로 수정 되었습니다.',
					// });
				},
				(err: any) => {
					// console.log(err);
					// Toast.fire({
					//   icon: 'error',
					//   title: '수정에 실패했습니다. 문의 부탁드립니다.',
					// });
				}
			);
		}
	};

	/**
	 * 필수값 미입력 판단 함수
	 */
	const checkRequiredValue = () => {
		if (okrMainData.TITLE == '') {
			return false;
		}

		okrDetailData.map((item) => {
			return item.TITLE == '' ||
				item.TARGET_AMOUNT == 0 ||
				item.TARGET_UNIT == ''
				? false
				: true;
		});
	};

	//* Hooks
	React.useEffect(() => {
		if (!isEditMode && memberId) {
			setOkrMainData({
				TITLE: props.mode === 'detail' ? props.okrMainData?.TITLE : '',
				START_DATE:
					props.mode === 'detail'
						? props.okrMainData?.START_DATE
						: new Date(),
				END_DATE:
					props.mode === 'detail'
						? props.okrMainData?.END_DATE
						: new Date(),
				NOTE: props.mode === 'detail' ? props.okrMainData?.NOTE : '',
				APP_MEMBER_IDENTIFICATION_CODE: memberId,
			});
		}
	}, [isEditMode, memberId]);

	console.log(props.okrDetailData);

	return (
		<Box>
			<SuppportiModal
				open={props.modalOpen}
				handleClose={() => {
					props.setModalOpen(false);
				}}
				title={props.mode === 'detail' ? '' : '목표 등록'}
				style={{
					width: '70%',
					padding: '20px',
				}}
				children={
					<Box
						width="80%"
						display={'flex'}
						flexDirection={'column'}
						gap={2}
						maxHeight={'70vh'}
						overflow={'auto'}
					>
						{/** 상위 목표 작성 */}
						<Box display={'flex'} flexDirection={'column'} gap={1}>
							{props.mode === 'detail' ? (
								<Box
									display={'flex'}
									justifyContent={'space-between'}
								>
									{isEditMode ? (
										<Box ml={'auto'}>
											<SupportiInput
												type="input"
												value={okrMainData.TITLE}
												setValue={(value: string) => {
													setOkrMainData({
														...okrMainData,
														TITLE: value,
													});
												}}
												width={'400px'}
												placeholder="상위 목표 타이틀을 입력해주세요."
											/>
											<Box
												display="flex"
												ml={'auto'}
												gap={0.5}
											>
												<Typography
													color={
														okrMainData.TITLE
															.length < 50
															? 'secondary.main'
															: 'warning.main'
													}
												>
													{okrMainData.TITLE.length}
												</Typography>
												<Typography
													color={
														okrMainData.TITLE
															.length < 50
															? 'secondary.main'
															: 'warning.main'
													}
												>
													/
												</Typography>
												<Typography
													color={
														okrMainData.TITLE
															.length < 50
															? 'secondary.main'
															: 'warning.main'
													}
												>
													50
												</Typography>
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
									{/** 수정 버튼 */}
									<SupportiButton
										contents={isEditMode ? '취소' : '수정'}
										onClick={() => {
											setIsEditMode(!isEditMode);
										}}
										style={{
											height: '20px',
											width: '100px',
										}}
										color={'primary'}
										variant="contained"
										isGradient={true}
									/>
								</Box>
							) : (
								<Box width={'100%'}>
									<SupportiInput
										type="input"
										multiline={true}
										value={okrMainData.TITLE}
										setValue={(value: string) => {
											setOkrMainData({
												...okrMainData,
												TITLE: value,
											});
										}}
										width={'400px'}
										placeholder="상위 목표 타이틀을 입력해주세요."
										readOnly={okrMainData.TITLE.length > 50}
									/>
									<Box
										display="flex"
										ml={'auto'}
										my={1}
										gap={0.5}
									>
										<Typography
											color={
												okrMainData.TITLE.length < 50
													? 'secondary.main'
													: 'warning.main'
											}
										>
											{okrMainData.TITLE.length}
										</Typography>
										<Typography
											color={
												okrMainData.TITLE.length < 50
													? 'secondary.main'
													: 'warning.main'
											}
										>
											/
										</Typography>
										<Typography
											color={
												okrMainData.TITLE.length < 50
													? 'secondary.main'
													: 'warning.main'
											}
										>
											50
										</Typography>
									</Box>
								</Box>
							)}

							{/** 날짜  */}
							<Box display={'flex'}>
								{props.mode === 'detail' && !isEditMode ? (
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

							{props.mode === 'detail' && (
								<Box
									display="flex"
									gap={2}
									flexDirection="column"
								>
									<Box display="flex" gap={1}>
										<Typography>현재 달성률</Typography>
										<Typography color={'primary.main'}>
											{calculateAchieveRate(
												props.okrMainData.OkrDetails
											)}
											%
										</Typography>
									</Box>
									{/** 프로그레스바 */}
									<SupportiProgressBar
										materialDataList={
											props.materialDataList
										}
									/>

									{/** 메모 입력 */}
									<SupportiInput
										type="inputwithbtn"
										value={okrMainData.NOTE}
										readOnly={
											okrMainData.NOTE.length > 500
												? true
												: false
										}
										setValue={(value) => {
											setOkrMainData({
												...okrMainData,
												NOTE: value,
											});
										}}
										btnContent="등록하기"
										btnOnclick={() => {
											updateOkr('main', {
												NOTE: okrMainData.NOTE,
											});
										}}
										width={'100%'}
										multiline={true}
										placeholder='메모 입력'
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
							)}
						</Box>

						<Divider sx={{ my: 2 }} />

						{/** 하위 목표 작성 */}
						<Box>
							{props.mode === 'detail' && (
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
											{
												props.okrMainData.OkrDetails
													.length
											}
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
													TARGET_UNIT: '',
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
							)}
							{/** 작성 컴포넌트 */}
							{okrDetailData?.map((okr, index) => {
								return (
									<OkrModalDetailBox
										key={index}
										mode={props.mode}
										data={okr}
										index={index}
										okrDetailData={okrDetailData}
										setOkrDetailData={setOkrDetailData}
										okrMainId={
											props.okrMainData
												?.OKR_MAIN_IDENTIFICATION_CODE
										}
										deleteOkrDetail={deleteOkrDetail}
									/>
								);
							})}

							{props.mode === 'detail' && (
								<Box>
									{okrDetailData.map((item, index) => {
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
													mode={props.mode}
													isEditMode={isEditMode}
													children={
														<AchieveBox
															data={item}
														/>
													}
													okrDetailData={
														okrDetailData
													}
													setOkrDetailData={
														setOkrDetailData
													}
												/>
											</Box>
										);
									})}
								</Box>
							)}

							{/** 하위 목표 추가 버튼 */}
							{props.mode !== 'detail' && (
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
												TARGET_UNIT: '',
												NOTE: '',
												ACHIEVED_AMOUNT: 0,
												APP_MEMBER_IDENTIFICATION_CODE:
													memberId,
											},
										]);
									}}
									style={{
										height: 5,
										marginTop: 2,
										color: 'black',
									}}
									color={'secondary'}
									variant="outlined"
								/>
							)}
						</Box>

						{/** 등록 버튼 */}
						<SupportiButton
							contents={'등록하기'}
							onClick={() => {
								//* Okr 메인 목표 등록
								if (checkRequiredValue) {
									createOkr();
								} else {
									alert('필수 값 미입력');
								}

								if (props.mode === 'detail') {
									updateOkr('main', okrMainData);

									//* Okr 하위 목표 등록
									props.okrMainData.OkrDetails.map((item) => {
										{
											item.TITLE == '' ||
											item.TARGET_AMOUNT == 0 ||
											item.TARGET_UNIT == ''
												? alert('필수 값 미입력')
												: updateOkr('detail', {
														TITLE: item.TITLE,
														START_DATE:
															item.START_DATE,
														END_DATE: item.END_DATE,
														TARGET_AMOUNT:
															item.TARGET_AMOUNT,
														TARGET_UNIT:
															item.TARGET_UNIT,
														NOTE: item.NOTE,
														ACHIEVED_AMOUNT:
															item.ACHIEVED_AMOUNT,
														OKR_DETAIL_IDENTIFICATION_CODE:
															item.OKR_DETAIL_IDENTIFICATION_CODE,
												  });
										}
									});
								}
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
					</Box>
				}
			/>
		</Box>
	);
};

export default OkrModal;
