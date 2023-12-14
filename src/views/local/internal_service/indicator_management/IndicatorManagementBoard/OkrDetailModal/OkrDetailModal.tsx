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

interface IOkrDetailModalProps {
	modalOpen: boolean;
	setModalOpen: React.Dispatch<boolean>;
	mode?: string;
	okrMainData: any;
	okrDetailData: any;
}

const OkrDetailModal = (props: IOkrDetailModalProps) => {
	//* Controllers
	const okrController = new OkrController();

	//* Modules

	//* Constants

	//* States
	const [okrMainData, setOkrMainData] = React.useState({
		TITLE: '',
		START_DATE: '',
		END_DATE: '',
		NOTE: '',
		APP_MEMBER_IDENTIFICATION_CODE: 1,
	});

	const [okrDetailData, setOkrDetailData] = React.useState([
		{
			TITLE: '',
			START_DATE: '',
			END_DATE: '',
			TARGET_AMOUNT: '',
			TARGET_UNIT: '',
			NOTE: '',
			ACHIEVED_AMOUNT: 0,
			APP_MEMBER_IDENTIFICATION_CODE: 1,
		},
	]);
	console.log(okrDetailData);

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
				console.log(response);
				props.setModalOpen(false);
			},
			(err) => {
				console.log(err);
			}
		);
	};

	console.log(props.okrMainData, props.okrDetailData);

	return (
		<Box>
			<SuppportiModal
				open={props.modalOpen}
				handleClose={() => {
					props.setModalOpen(false);
				}}
				title=""
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
							<Box
								display={'flex'}
								justifyContent={'space-between'}
							>
								<Typography fontWeight={'bold'} variant="h5">
									{props.okrMainData?.TITLE}
								</Typography>

								{/** 수정 버튼 */}
								<SupportiButton
									contents={'수정'}
									onClick={() => {
										createOkr();
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
							{/** 날짜 */}
							<Box display={'flex'}>
								<SupportiInput
									type="datepicker"
									value={okrMainData.START_DATE}
									setValue={(value) => {
										setOkrMainData({
											...okrMainData,
											START_DATE: value,
										});
									}}
									width={'130px'}
									useIcon={false}
								/>
								<SupportiInput
									type="datepicker"
									value={okrMainData.END_DATE}
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

							<Box display="flex" gap={1}>
								<Typography>현재 달성률</Typography>
								<Typography ml={1} color={'primary.main'}>
									{calculateAchieveRate(props.okrDetailData)}{' '}
									%
								</Typography>
							</Box>
							{/** 프로그레스바 */}
							<SupportiProgressBar
								materialDataList={[
									{
										percentage: calculateAchieveRate(
											props.okrDetailData
										).toString(),
										color: 'primary.main',
									},
								]}
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
							/>
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
								{/* <SupportiButton
									contents={'하위 목표 추가 +'}
									onClick={() => {
										setOkrDetailData([
											...okrDetailData,
											{
												TITLE: '',
												START_DATE: '',
												END_DATE: '',
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
									}}
									color={'secondary'}
									variant="outlined"
								/> */}
							</Box>
							{/** 작성 컴포넌트 */}
							{/* {okrDetailData?.map((okr, index) => {
								return (
									<OkrModalDetailBox
										key={index}
										mode={props.mode}
										data={okr}
										index={index}
										okrDetailData={okrDetailData}
										setOkrDetailData={setOkrDetailData}
										deleteOkrDetail={deleteOkrDetail}
									/>
								);
							})} */}

							{/** 하위 목표 리스트 */}
							{props.okrDetailData.map((item, index) => {
								return (
									<OkrModalDetailBox
										data={item}
										index={index}
										okrDetailData={okrDetailData}
										setOkrDetailData={setOkrDetailData}
										mode={'detail'}
									/>
								);
							})}
						</Box>
					</Box>
				}
			/>
		</Box>
	);
};

export default OkrDetailModal;
