import React, { useEffect } from 'react';

import { Box, BoxProps, Button, Typography } from '@mui/material';
import SuppportiModal from '../../../../global/SuppportiModal';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import FmdGoodOutlinedIcon from '@mui/icons-material/FmdGoodOutlined';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import Calendar from 'react-calendar';
import { ConsultingApplicationController } from '../../../../../controller/ConsultingApplicationController';
import KeyboardBackspaceOutlinedIcon from '@mui/icons-material/KeyboardBackspaceOutlined';
import moment from 'moment';
import 'react-calendar/dist/Calendar.css';
import styles from './Calendar.module.css';
import './Calendar.module.css';

import SupportiButton from '../../../../global/SupportiButton';
import { ImageController } from '../../../../../controller/ImageController';
import ConsultingQna from '../ConsultingQna/ConsultingQna';
import { ConsultingAnswerController } from '../../../../../controller/ConsultingAnswerController';
import { SupportiAlertModal } from '../../../../global/SupportiAlertModal';

interface IConsultingSchedularProps {
	open: boolean;
	handleClose: () => void;
	consultingData: any;
}

const ConsultingSchedular = (props: IConsultingSchedularProps) => {
	//* States
	/**
	 * 컨설팅 답변
	 */
	const [consultingAnswer, setConsultingAnswer] = React.useState<any>([]);
	/**
	 * 선택된 날짜
	 */
	const [selectedDate, setSelectedDate] = React.useState<any>(null);
	/**
	 * 선택된 시간
	 */
	const [selectedTime, setSelectedTime] = React.useState<any>(null);
	/**
	 * 알럿 모달
	 */
	const [alertModal, setAlertModal] = React.useState<boolean>(false);
	/**
	 * 알럿 모달 타입
	 */
	const [alertModalType, setAlertModalType] = React.useState<
		'success' | 'login' | 'subscribe' | 'point' | 'already'
	>('success');
	/**
	 * 월별 가능 시간 데이터
	 */
	const [monthSchedule, setMonthSchedule] = React.useState<{
		[key: string]: {
			START: string;
			END: string;
		}[];
	}>({});

	/**
	 * 해당 월의 선택 가능한 날짜 리스트
	 */
	const [availableDateList, setAvailableDateList] = React.useState<string[]>(
		[]
	);

	/**
	 * 페이지
	 */
	const [page, setPage] = React.useState<number>(0);
	//* Controller
	const consultingApplicationController =
		new ConsultingApplicationController();
	const consultingAnswerController = new ConsultingAnswerController();

	//* Functions
	/**
	 * 매 월 일정을 가져온다
	 */
	const getMonthSchedule = (month) => {
		consultingApplicationController.getAvailableTime(
			{
				CONSULTING_PRODUCT_IDENTIFICATION_CODE:
					props.consultingData.CONSULTING_PRODUCT_IDENTIFICATION_CODE,
				MONTH: month,
			},
			(res) => {
				setAvailableDateList(Object.keys(res.data.result));
				setMonthSchedule(res.data.result);
			},
			(err) => {}
		);
	};
	/**
	 * 컨설팅 신청하기
	 */
	const applyConsulting = () => {
		consultingApplicationController.createItem(
			{
				CONSULTING_PRODUCT_IDENTIFICATION_CODE:
					props.consultingData.CONSULTING_PRODUCT_IDENTIFICATION_CODE,
				RESERVATION_DATE: selectedDate,
				RESERVATION_START_TIME: selectedTime.START,
				RESERVATION_END_TIME: selectedTime.END,
				STATUS: 'WAITING',
				APP_MEMBER_IDENTIFICATION_CODE: 1,
			},
			(res) => {
				/**
				 * 컨설팅 답변 업로드 (res로 들어온 id 값 consultingAnswer에 꽂아넣기)
				 */
				const answermap = consultingAnswer.map((x) => {
					return {
						...x,
						CONSULTING_APPLICATION_IDENTIFICATION_CODE:
							res.data.result
								.CONSULTING_APPLICATION_IDENTIFICATION_CODE,
					};
				});
				consultingAnswerController.uploadConsultingAnswer(
					answermap,
					(res) => {
						// alert('예약이 완료되었습니다.');
						setAlertModal(true);
						setAlertModalType('success');
						// props.handleClose();
					},
					(err) => {}
				);
			},
			(err) => {
				if (
					err.response.data.message ===
					'동일 고객 예약 금지 횟수를 초과하였습니다.'
				) {
					setAlertModal(true);
					setAlertModalType('already');
				}
				if (err.response.data.message === '포인트가 부족합니다.') {
					setAlertModal(true);
					setAlertModalType('point');
				}
			}
		);
	};
	console.log(consultingAnswer);
	//* Hooks
	useEffect(() => {
		getMonthSchedule(moment().format('YYYY-MM'));
		//* 컨설팅 질문에 대한 답변 초기화
		let question = [];
		props.consultingData?.ConsultingQuestions?.map((x) => {
			question.push({
				CONSULTING_QUESTION_IDENTIFICATION_CODE:
					x.CONSULTING_QUESTION_IDENTIFICATION_CODE,
				ANSWER_CONTENT: '',
				FILE_LIST: [],
			});
		});
		setConsultingAnswer(question);
	}, [props.consultingData]);

	return (
		<SuppportiModal
			open={props.open}
			handleClose={() => {
				setSelectedDate(null);
				setPage(0);

				props.handleClose();
			}}
			activeHeader={true}
			title="예약 신청"
			muiModalProps={{
				maxWidth: '60%',
			}}
		>
			{/* 컨설팅 설명 및 캘린더 */}
			{page === 0 && (
				<Box width={'100%'}>
					{/* 예약 데이터 */}
					<Box borderBottom={'0.5px solid grey'} pb={2} mb={2}>
						<Box
							display={'flex'}
							justifyContent={'space-between'}
							mb={1}
							alignItems={'center'}
						>
							<Typography variant="h5" fontWeight={'700'}>
								{props.consultingData.PRODUCT_NAME} 예약 일정
							</Typography>
							<Typography>
								{props.consultingData.PRICE} 원
							</Typography>
						</Box>

						<Box
							display={'flex'}
							alignItems={'center'}
							gap={1}
							sx={{ mb: 1 }}
						>
							<AccessTimeIcon />
							<Typography ml={1}>
								{
									props.consultingData
										.DURATION_PER_RESERVE_IN_MINUTE
								}
								분
							</Typography>
						</Box>
						<Box
							display={'flex'}
							alignItems={'center'}
							gap={1}
							sx={{ mb: 1 }}
						>
							<FmdGoodOutlinedIcon />
							<Typography ml={1}>위치</Typography>
						</Box>
						<Box display={'flex'} alignItems={'center'} gap={1}>
							<CalendarTodayOutlinedIcon />
							<Typography ml={1}>
								{moment(props.consultingData.START_DATE).format(
									'YYYY-MM-DD'
								)}{' '}
								-{' '}
								{moment(props.consultingData.END_DATE).format(
									'YYYY-MM-DD'
								)}
							</Typography>
						</Box>
					</Box>
					{/* 달력 */}
					<Box>
						<Typography
							variant="h5"
							fontWeight={'700'}
							sx={{ mb: 2 }}
						>
							날짜를 선택해주세요.
						</Typography>
						<Calendar
							minDetail="month"
							maxDetail="month"
							minDate={new Date()}
							maxDate={new Date(props.consultingData.END_DATE)}
							formatDay={(locale, date) =>
								moment(date).format('DD')
							}
							onChange={(date) => {
								console.log(
									moment(date.toString()).format('YYYY-MM-DD')
								);
								setSelectedDate(
									moment(date.toString()).format('YYYY-MM-DD')
								);
								if (
									availableDateList.find(
										(x) =>
											x ===
											moment(date.toString()).format(
												'YYYY-MM-DD'
											)
									)
								) {
									setPage(1);
								}
							}}
							next2Label={null}
							prev2Label={null}
							showNeighboringMonth={false}
							onActiveStartDateChange={(date) =>
								getMonthSchedule(
									moment(date.activeStartDate).format(
										'YYYY-MM'
									)
								)
							}
							value={selectedDate}
							className={[
								styles.CircleBox,
								styles.Now,
								styles.Calendar,
							]}
							tileClassName={({ date, view }) => {
								if (
									availableDateList.find(
										(x) =>
											x ===
											moment(date).format('YYYY-MM-DD')
									)
								) {
									return styles.highlight;
								}
							}}
						/>
					</Box>
				</Box>
			)}
			{/* 컨설팅 시간 선택 */}
			{page === 1 && (
				<Box
					width={'100%'}
					minWidth={'300px'}
					display={'flex'}
					flexDirection={'column'}
					alignItems={'center'}
				>
					<Box
						width={'100%'}
						display={'flex'}
						justifyContent={'space-between'}
						alignItems={'center'}
						mb={2}
					>
						<KeyboardBackspaceOutlinedIcon
							onClick={() => {
								setPage(0);
								setSelectedDate(null);
							}}
							color="primary"
							sx={{
								cursor: 'pointer',
								borderRadius: '50%',
								border: '1px solid lightgrey',
								width: '36px',
								height: '36px',
								p: 0.5,
							}}
						/>
						<Typography variant={'h5'} fontWeight={'700'}>
							시간을 선택해주세요
						</Typography>
						<Typography sx={{ width: '36px' }}></Typography>
					</Box>
					<Typography variant="subtitle1">
						{moment(selectedDate).format('MM월 DD일 ddd요일')}
					</Typography>
					<Box
						display={'flex'}
						alignItems={'center'}
						justifyContent={'center'}
						flexDirection={'column'}
						flexWrap={'wrap'}
						gap={1}
						mt={2}
						width={'100%'}
					>
						{monthSchedule[selectedDate].map((time) => {
							return (
								<Box
									onClick={() => {
										setSelectedTime(time);
										// setPage(2);
									}}
									sx={{
										cursor: 'pointer',
										borderRadius: '10px',
										py: 2,
										pl: 3,
										pr: 2,
										bgcolor:
											selectedTime === time
												? 'primary.main'
												: 'rgba(248, 248, 248, 1)',
										width: '100%',
										display: 'flex',
										alignItems: 'center',
										justifyContent: 'space-between',
										maxHeight: '50px',
									}}
								>
									<Typography
										sx={{
											color:
												selectedTime === time &&
												'white',
										}}
									>
										{time.START} - {time.END}
									</Typography>
									{selectedTime === time && (
										<Typography
											sx={{
												bgcolor: 'white',
												color: 'primary.main',
												fontWeight: '400',
												borderRadius: 7,
												px: '10px',
												py: '7px',
											}}
											onClick={() => {
												setSelectedTime(time);
												setPage(2);
											}}
											fontWeight={'600'}
										>
											선택
										</Typography>
									)}
								</Box>
							);
						})}
					</Box>
				</Box>
			)}
			{/* 컨설팅 질문 및 답변 */}
			{page === 2 && (
				<Box width={'100%'}>
					{/* 예약 데이터 */}
					<Box borderBottom={'0.5px solid grey'} pb={2} mb={2}>
						<Box
							display={'flex'}
							justifyContent={'space-between'}
							mb={1}
							alignItems={'center'}
						>
							<Typography variant="h5" fontWeight={'700'}>
								{props.consultingData.PRODUCT_NAME} 예약 일정
							</Typography>
						</Box>

						<Box
							display={'flex'}
							alignItems={'center'}
							gap={1}
							sx={{ mb: 1 }}
						>
							<AccessTimeIcon />
							<Typography ml={1}>
								{
									props.consultingData
										.DURATION_PER_RESERVE_IN_MINUTE
								}
								분
							</Typography>
						</Box>
						<Box
							display={'flex'}
							alignItems={'center'}
							gap={1}
							sx={{ mb: 1 }}
						>
							<FmdGoodOutlinedIcon />
							<Typography ml={1}>위치</Typography>
						</Box>
						<Box display={'flex'} alignItems={'center'} gap={1}>
							<CalendarTodayOutlinedIcon />
							<Typography ml={1}>
								{moment(props.consultingData.START_DATE).format(
									'YYYY-MM-DD'
								)}{' '}
								-{' '}
								{moment(props.consultingData.END_DATE).format(
									'YYYY-MM-DD'
								)}
							</Typography>
						</Box>
					</Box>
					{/* 컨설팅 사전 질문 */}
					<Box width={'100%'}>
						<Box
							display={'flex'}
							justifyContent={'space-between'}
							mb={1}
							alignItems={'center'}
						>
							<Typography variant="h5" fontWeight={'700'}>
								컨설팅 사전 질문
							</Typography>
							<Typography color={'red'} fontWeight={'300'}>
								* 필수 입력
							</Typography>
						</Box>
						<Typography color={'secondary.main'} lineHeight={1.5}>
							대답이 불가능한 답변은 없음 또는 X를 입력해주세요
						</Typography>
						<Typography color={'secondary.main'} lineHeight={1.5}>
							파일이 없다면 파일없음에 체크해주세요
						</Typography>
						{/* 질문 */}
						<Box mb={2}>
							{props.consultingData.ConsultingQuestions?.map(
								(question, index) => {
									return (
										<ConsultingQna
											key={index}
											qnaData={question}
											consultingAnswer={consultingAnswer}
											setConsultingAnswer={
												setConsultingAnswer
											}
										/>
									);
								}
							)}
						</Box>
						{/* 제출버튼 */}
						<SupportiButton
							contents={'예약하기'}
							onClick={() => {
								applyConsulting();
							}}
							variant="contained"
							fullWidth
						/>
					</Box>
				</Box>
			)}
			<SupportiAlertModal
				type={alertModalType}
				open={alertModal}
				handleClose={() => setAlertModal(false)}
				customHandleClose={() => {
					props.handleClose();
				}}
			/>
		</SuppportiModal>
	);
};

export default ConsultingSchedular;
