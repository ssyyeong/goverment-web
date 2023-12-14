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
import { randomColor } from '../../../../../../../configs/randomColorConfig';

interface IOkrModalProps {
	modalOpen: boolean;
	setModalOpen: React.Dispatch<boolean>;
	mode?: string;
	okrMainData?: any;
	setOkrMainData?: any;
	okrDetailData?: any;
	setOkrDetailData?: any;
	materialDataList: any;
}

const OkrModal = (props: IOkrModalProps) => {
	//* Controllers
	const okrController = new OkrController();

	//* Modules

	//* Constants

	//* States
	const [okrMainData, setOkrMainData] = React.useState({
		TITLE: '',
		START_DATE: new Date(),
		END_DATE: new Date(),
		NOTE: '',
		APP_MEMBER_IDENTIFICATION_CODE: 1,
	});

	const [okrDetailData, setOkrDetailData] = React.useState([
		{
			TITLE: '',
			START_DATE: new Date(),
			END_DATE: new Date(),
			TARGET_AMOUNT: '',
			TARGET_UNIT: '',
			NOTE: '',
			ACHIEVED_AMOUNT: 0,
			APP_MEMBER_IDENTIFICATION_CODE: 1,
		},
	]);

	/**
	 * 수정 모드인지 여부
	 * **/
	const [isEditMode, setIsEditMode] = React.useState(false);

	/**
' 더보기 여부
 */
	const [isMoreOpen, setIsMoreOpen] = React.useState(false);

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
	const updateOkr = (injectedObj) => {
		okrController.updateItem(
			Object.assign(
				{
					APP_MEMBER_IDENTIFICATION_CODE: 1,
					OKR_MAIN_IDENTIFICATION_CODE:
						props.okrMainData['OKR_MAIN_IDENTIFICATION_CODE'],
					OKR_DETAIL_IDENTIFICATION_CODE:
						props.okrDetailData['OKR_DETAIL_IDENTIFICATION_CODE'],
				},
				injectedObj
			),
			(response: any) => {
				alert('수정 성공');
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
	};

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
									<Typography
										fontWeight={'bold'}
										variant="h5"
									>
										{props.okrMainData?.TITLE}
									</Typography>

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
								<Box display="flex">
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
									/>
								</Box>
							)}

							{/** 날짜  */}
							<Box display={'flex'}>
								<SupportiInput
									type="datepicker"
									value={
										props.okrMainData?.START_DATE
											? props.okrMainData?.START_DATE
											: okrMainData.START_DATE
									}
									setValue={(value) => {
										setOkrMainData({
											...okrMainData,
											START_DATE: value,
										});
									}}
									width={'130px'}
									useIcon={false}
									style={{ height: '20px' }}
								/>
								<SupportiInput
									type="datepicker"
									defaultValue={new Date()}
									value={
										props.okrMainData?.END_DATE
											? props.okrMainData?.END_DATE
											: okrMainData.END_DATE
									}
									setValue={(value) => {
										setOkrMainData({
											...okrMainData,
											END_DATE: value,
										});
									}}
									width={'130px'}
									useIcon={false}
								/>
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
												props.okrDetailData
											)}{' '}
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
										setValue={(value) => {
											setOkrMainData({
												...okrMainData,
												NOTE: value,
											});
										}}
										btnContent="등록하기"
										btnOnclick={() => {}}
										width={'100%'}
										multiline={true}
									/>
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
													TARGET_AMOUNT: '',
													TARGET_UNIT: '',
													NOTE: '',
													ACHIEVED_AMOUNT: 0,
													APP_MEMBER_IDENTIFICATION_CODE: 1,
												},
											]);
										}}
										style={{
											height: 5,
											color: 'black',
											marginBottom: '10px'
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
													mode={props.mode}
													children={
														<AchieveBox
															data={item}
														/>
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
												TARGET_AMOUNT: '',
												TARGET_UNIT: '',
												NOTE: '',
												ACHIEVED_AMOUNT: 0,
												APP_MEMBER_IDENTIFICATION_CODE: 1,
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

						{props.mode !== 'detail' && (<Box>
						{/** 등록 버튼 */}
						<SupportiButton
							contents={'등록하기'}
							onClick={() => {
								createOkr();
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
												</Box>)}
					</Box>
				}
			/>
		</Box>
	);
};

export default OkrModal;
