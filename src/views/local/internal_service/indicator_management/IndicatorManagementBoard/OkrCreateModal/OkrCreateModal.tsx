import React, { useEffect } from 'react';

import { Box, BoxProps, Divider, Typography } from '@mui/material';
import SuppportiModal from '../../../../../global/SuppportiModal';
import SupportiButton from '../../../../../global/SupportiButton';
import SupportiInput from '../../../../../global/SupportiInput';
import UnderGoalWriteForm from '../UnderGoalWriteForm/UnderGoalWriteForm';
import { IOkrDetail } from '../../../../../../@types/model';
import { OkrDetailController } from '../../../../../../controller/OkrDetailController';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { useAppMember } from '../../../../../../hooks/useAppMember';
import { v4 as uuidv4 } from 'uuid';
import { SupportiAlertModal } from '../../../../../global/SupportiAlertModal';

interface IOkrCreateModalProps {
	modalOpen: boolean;
	setModalOpen: React.Dispatch<boolean>;

	okrMainData?: any;
	setOkrMainData?: any;
	okrDetailData?: any;
	setOkrDetailData?: any;
	materialDataList?: any;
	setTriggerKey?: React.Dispatch<any>;

	/**
	 * 로딩 상태
	 */
	loading?: boolean;
	setLoading?: React.Dispatch<React.SetStateAction<boolean>>;
}

const OkrCreateModal = (props: IOkrCreateModalProps) => {
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

	/**
	 * Okr 메인 목표 데이터
	 */
	const [okrMainData, setOkrMainData] = React.useState({
		TITLE: '',
		START_DATE: new Date(),
		END_DATE: new Date(),
		NOTE: '',
		APP_MEMBER_IDENTIFICATION_CODE: memberId,
	});

	/**
	 *
	 * Okr 하위 목표 데이터
	 */
	const [okrDetailData, setOkrDetailData] = React.useState([
		{
			TITLE: '',
			START_DATE: new Date(),
			END_DATE: new Date(),
			TARGET_AMOUNT: undefined,
			TARGET_UNIT: undefined,
			NOTE: '',
			ACHIEVED_AMOUNT: 0,
			APP_MEMBER_IDENTIFICATION_CODE: memberId,
		},
	]);

	/**
	 *
	 * 알럿창 오픈 여부
	 */
	const [isAlertOpen, setIsAlertOpen] = React.useState(false);

	/**
	 *
	 * 알럿창 타입
	 */
	const [alertType, setAlertType] = React.useState(undefined);

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
		okrDetailData.map((item) => {
			if (
				item.TITLE === '' ||
				item.TARGET_UNIT === undefined ||
				item.TARGET_UNIT === '' ||
				item.TARGET_AMOUNT === 0 ||
				item.TARGET_AMOUNT === undefined
			) {
				props.setLoading(false);
				setAlertType('indicatorWarning');
				setIsAlertOpen(true);
				return;
			}
		});

		if (isAlertOpen) return;
		else {
			okrController.createItem(
				{
					OKR_MAIN: okrMainData,
					OKR_DETAIL: okrDetailData,
				},
				(res) => {
					props.setLoading(false);
					props.setModalOpen(false);

					setAlertType('successCreateAxios');
					setIsAlertOpen(true);

					props.setTriggerKey && props.setTriggerKey(uuidv4());

					return;
				},
				(err) => {
					props.setLoading(false);

					setAlertType('failAxios');
					setIsAlertOpen(true);
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
					TARGET_AMOUNT: undefined,
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
					TARGET_AMOUNT: undefined,
					TARGET_UNIT: undefined,
					NOTE: '',
					ACHIEVED_AMOUNT: 0,
					APP_MEMBER_IDENTIFICATION_CODE: memberId,
				},
			]);
		}
	}, [memberId, props.modalOpen, props.okrMainData, props.okrDetailData]);

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
					width: { xs: '100%', md: '60%' },
				}}
				children={
					<Box
						display={'flex'}
						flexDirection={'column'}
						gap={2}
						maxHeight={'60vh'}
						overflow={'auto'}
						sx={{
							width: { xs: '100%', md: '90%' },
							'-ms-overflow-style': 'none',
							'&::-webkit-scrollbar': { display: 'none' },
							pt: 2,
						}}
					>
						{/** 상위 목표 작성 영역*/}
						<Box display={'flex'} flexDirection={'column'} gap={1}>
							<Box width={'100%'}>
								{/** 상위 목표 작성하는 인풋 */}
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
									{/** 필수 입력값 알림 */}
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

									{/** 목표 제목 글자수와 글자수 제한 */}
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
										value={okrMainData?.END_DATE}
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
						
						{/** 구분선 */}
						<Divider sx={{ my: 2 }} />

						{/** 하위 목표 작성 */}
						<Box>
							{/** 작성 컴포넌트 */}
							{okrDetailData?.map((okr, index) => {
								return (
									<UnderGoalWriteForm
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
										loading={props.loading}
										setLoading={props.setLoading}
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
											TARGET_AMOUNT: undefined,
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
									props.setLoading(true);
									createOkr();
								} else {
									alert('필수 값 미입력');
								}
							}}
							style={{
								height: '50px',
								width: { xs: '100%', md: '260px' },
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
				handleClose={() => {
					props.setLoading(false);
					setIsAlertOpen(false);
				}}
				type={alertType}
			/>
		</Box>
	);
};

export default OkrCreateModal;
