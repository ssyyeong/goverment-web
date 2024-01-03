import React, { useEffect } from 'react';

import { Box, BoxProps, Divider, Typography } from '@mui/material';
import SuppportiModal from '../../../../../global/SuppportiModal';
import SupportiButton from '../../../../../global/SupportiButton';
import SupportiInput from '../../../../../global/SupportiInput';
import OkrModalDetailBox from '../OkrModalDetailBox/OkrModalDetailBox';
import { IOkrDetail } from '../../../../../../@types/model';
import { OkrDetailController } from '../../../../../../controller/OkrDetailController';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { useAppMember } from '../../../../../../hooks/useAppMember';
import { v4 as uuidv4 } from 'uuid';
import { SupportiAlertModal } from '../../../../../global/SupportiAlertModal';

interface IOkrModalProps {
	modalOpen: boolean;
	setModalOpen: React.Dispatch<boolean>;

	okrMainData?: any;
	setOkrMainData?: any;
	okrDetailData?: any;
	setOkrDetailData?: any;
	materialDataList?: any;
	setTriggerKey?: React.Dispatch<any>;
}

const OkrModal = (props: IOkrModalProps) => {
	//* Controllers
	const okrController = new OkrDetailController();

	//* Modules
	//* Hooks
	/**
	 * 유저 아이디 가져오는 훅
	 */
	const { memberId } = useAppMember();
	//* Constants

	//* States
	const [okrMainData, setOkrMainData] = React.useState({
		TITLE: '',
		START_DATE: new Date(),
		END_DATE: new Date(),
		NOTE: '',
		APP_MEMBER_IDENTIFICATION_CODE: memberId,
	});

	const [okrDetailData, setOkrDetailData] = React.useState([
		{
			TITLE: '',
			START_DATE: new Date(),
			END_DATE: new Date(),
			TARGET_AMOUNT: 0,
			TARGET_UNIT: undefined,
			NOTE: '',
			ACHIEVED_AMOUNT: 0,
			APP_MEMBER_IDENTIFICATION_CODE: memberId,
		},
	]);

	/**
	 *
	 * 하위목표 미기재 알럿창 오픈 여부
	 */
	const [isAlertOpen, setIsAlertOpen] = React.useState(false);

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
		if (
			okrDetailData['TITLE'] === '' ||
			okrDetailData['TARGET_UNIT'] == undefined ||
			okrDetailData['TARGET_UNIT'] == '' ||
			okrDetailData['TARGET_AMOUNT'] === 0
		) {
			setIsAlertOpen(true);
			return;
		} else {
			okrController.createItem(
				{
					OKR_MAIN: okrMainData,
					OKR_DETAIL: okrDetailData,
				},
				(response) => {
					alert('등록 성공');
					props.setTriggerKey && props.setTriggerKey(uuidv4());

					props.setModalOpen(false);
				},
				(err) => {
					console.log(err);
				}
			);
		}
	};

	//* Hooks
	useEffect(() => {
		if (memberId) {
			setOkrMainData({
				TITLE: '',
				START_DATE: new Date(),
				END_DATE: new Date(),
				NOTE: '',
				APP_MEMBER_IDENTIFICATION_CODE: memberId,
			});

			setOkrDetailData([
				{
					TITLE: '',
					START_DATE: new Date(),
					END_DATE: new Date(),
					TARGET_AMOUNT: 0,
					TARGET_UNIT: undefined,
					NOTE: '',
					ACHIEVED_AMOUNT: 0,
					APP_MEMBER_IDENTIFICATION_CODE: memberId,
				},
			]);
		}
	}, [memberId]);

	React.useEffect(() => {
		if (memberId) {
			setOkrMainData({
				TITLE: '',
				START_DATE: new Date(),
				END_DATE: new Date(),
				NOTE: '',
				APP_MEMBER_IDENTIFICATION_CODE: memberId,
			});
			setOkrDetailData([
				{
					TITLE: '',
					START_DATE: new Date(),
					END_DATE: new Date(),
					TARGET_AMOUNT: 0,
					TARGET_UNIT: undefined,
					NOTE: '',
					ACHIEVED_AMOUNT: 0,
					APP_MEMBER_IDENTIFICATION_CODE: memberId,
				},
			]);
		}
	}, [memberId, props.modalOpen, props.okrMainData, props.okrDetailData]);

	console.log(props.okrDetailData);

	return (
		<Box>
			<SuppportiModal
				open={props.modalOpen}
				handleClose={() => {
					props.setModalOpen(false);
				}}
				title={'목표 등록'}
				activeHeader={true}
				style={{
					width: { xs: '100%', sm: '60%' },
				}}
				children={
					<Box
						display={'flex'}
						flexDirection={'column'}
						gap={2}
						maxHeight={'100%'}
						minHeight={'60vh'}
						overflow={'auto'}
						sx={{
							width: { xs: '100%', sm: '90%' },
							pt: 2,
						}}
					>
						{/** 상위 목표 작성 */}
						<Box display={'flex'} flexDirection={'column'} gap={1}>
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
									width={'100%'}
									placeholder="상위 목표 타이틀을 입력해주세요."
								/>
								<Box
									display="flex"
									justifyContent="space-between"
								>
									<Typography
										fontWeight={500}
										variant="body1"
										color="error.main"
										mt={'5px'}
										sx={{
											visibility:
												okrMainData.TITLE !== ''
													? 'hidden'
													: 'block',
										}}
									>
										필수 값 입니다.
									</Typography>
									<Box
										display="flex"
										ml={'auto'}
										my={1}
										gap={0.5}
									>
										<Typography
											color={
												okrMainData.TITLE.length < 20
													? 'secondary.main'
													: 'warning.main'
											}
										>
											{okrMainData.TITLE.length}
										</Typography>
										<Typography
											color={
												okrMainData.TITLE.length < 20
													? 'secondary.main'
													: 'warning.main'
											}
										>
											/
										</Typography>
										<Typography
											color={
												okrMainData.TITLE.length < 20
													? 'secondary.main'
													: 'warning.main'
											}
										>
											20
										</Typography>
									</Box>
								</Box>
							</Box>

							{/** 날짜  */}
							<Box display={'flex'}>
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
										value={okrMainData.END_DATE}
										minDate={okrMainData?.START_DATE}
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
							</Box>
						</Box>

						<Divider sx={{ my: 2 }} />

						{/** 하위 목표 작성 */}
						<Box>
							{/** 작성 컴포넌트 */}
							{okrDetailData?.map((okr, index) => {
								return (
									<OkrModalDetailBox
										key={index}
										mode="create"
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
									marginTop: 2,
									color: 'black',
								}}
								color={'secondary'}
								variant="outlined"
							/>
						</Box>

						{/** 등록 버튼 */}
						<SupportiButton
							contents={'등록하기'}
							onClick={() => {
								//* Okr 메인 목표 등록
								if (okrMainData.TITLE !== '') {
									createOkr();
								} else {
									alert('필수 값 미입력');
								}
							}}
							style={{
								height: '50px',
								width: { xs: '100%', sm: '260px' },
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
			<SupportiAlertModal
				open={isAlertOpen}
				handleClose={() => setIsAlertOpen(false)}
				type={'indicatorWarning'}
			/>
		</Box>
	);
};

export default OkrModal;
