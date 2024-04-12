import React, { useEffect } from 'react';

import { Box, BoxProps, Button, Typography } from '@mui/material';
import SupportiModal from '../../../../global/SupportiModal';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import FmdGoodOutlinedIcon from '@mui/icons-material/FmdGoodOutlined';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import Calendar from 'react-calendar';
import KeyboardBackspaceOutlinedIcon from '@mui/icons-material/KeyboardBackspaceOutlined';
import moment from 'moment';
import 'react-calendar/dist/Calendar.css';
import styles from '../../../external_service/consulting/ConsultingSchedular/Calendar.module.css';

import PaidOutlinedIcon from '@mui/icons-material/PaidOutlined';
import SupportiButton from '../../../../global/SupportiButton';

import { SupportiAlertModal } from '../../../../global/SupportiAlertModal';
import { useAppMember } from '../../../../../hooks/useAppMember';
import CoffeeChatQnA from '../CoffeeChatQnA/CoffeeChatQnA';

import { SpecialCoffeeChatAnswerController } from '../../../../../controller/CoffeeChatAnswerController';
import { SpecialCoffeeChatApplicationController } from '../../../../../controller/SpecialCoffeeChatApplicationController';
import DefaultController from '@leanoncompany/supporti-ark-office-project/src/controller/default/DefaultController';

interface ISpecialCoffeeChatUpdateModalProps {
	open: boolean;
	handleClose: () => void;
	coffeeChatData: any;
}

const SpecialCoffeeChatUpdateModal = (
	props: ISpecialCoffeeChatUpdateModalProps
) => {
	//* States
	/**
	 * 컨설팅 답변
	 */
	const [coffeeChatAnswer, setCoffeeChatAnswer] = React.useState<any>([]);
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
		'success' | 'login' | 'subscribe' | 'point' | 'consultingexceed'
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
	/**
	 * 커피챗 신청 컨트롤러
	 */
	const specialCoffeeChatApplicationController =
		new SpecialCoffeeChatApplicationController();
	/**
	 * 커피챗 답변 컨트롤러
	 */
	const specialCoffeeChatAnswerController =
		new SpecialCoffeeChatAnswerController();
	/**
	 * 커피챗 상품 컨트롤러
	 */
	const specialCoffeeChatProductController = new DefaultController(
		'SpecialCoffeeChatProduct'
	);

	//* Functions
	/**
	 * 매 월 일정을 가져오기
	 */
	const getMonthSchedule = (month) => {
		specialCoffeeChatApplicationController.getAvailableTime(
			{
				SPECIAL_COFFEE_CHAT_PRODUCT_IDENTIFICATION_CODE:
					props.coffeeChatData
						.SPECIAL_COFFEE_CHAT_PRODUCT_IDENTIFICATION_CODE,
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
	 * 커피챗 상품 정보 가져오기
	 */
	const getSpecialCoffeeChatProduct = () => {
		specialCoffeeChatProductController.getOneItem(
			{
				SPECIAL_COFFEE_CHAT_PRODUCT_IDENTIFICATION_CODE:
					props.coffeeChatData
						.SPECIAL_COFFEE_CHAT_PRODUCT_IDENTIFICATION_CODE,
			},
			(res) => {
				props.coffeeChatData.SpecialCoffeeChatProduct = res.data.result;
			},
			(err) => {
				console.log(err);
			}
		);
	};
	/**
	 * 커피챗 신청 전 필수 질문 답변 체크
	 */
	const checkcoffeeChatAnswer = () => {
		let check = true;
		coffeeChatAnswer?.forEach((x, index) => {
			// 질문의 내용을 가져온다
			const indexQuestion =
				props.coffeeChatData?.SpecialCoffeeChatProduct.SpecialCoffeeChatQuestions.filter(
					(y) =>
						y.SPECIAL_COFFEE_CHAT_QUESTION_IDENTIFICATION_CODE ===
						x.SPECIAL_COFFEE_CHAT_QUESTION_IDENTIFICATION_CODE
				);
			// 답변이 없는 질문이 있을 때
			if (
				indexQuestion[0].REQUIRED_YN == 'Y' && // 필수 질문이고
				indexQuestion[0].QUESTION_TYPE == 'TEXT' && // 텍스트 타입이고
				x.ANSWER_CONTENT == '' // 답변이 없을 때
			) {
				check = false;
			}
		});
		return check;
	};

	/**
	 * 컨설팅 신청 업데이트
	 */
	const applyCoffeeChat = () => {
		// 필수 질문 답변 체크
		if (!checkcoffeeChatAnswer()) {
			alert('필수 질문에 답변해주세요.');
			return;
		}
		specialCoffeeChatApplicationController.updateItem(
			{
				SPECIAL_COFFEE_CHAT_APPLICATION_IDENTIFICATION_CODE:
					props.coffeeChatData
						.SPECIAL_COFFEE_CHAT_APPLICATION_IDENTIFICATION_CODE,
				RESERVATION_DATE: selectedDate,
				RESERVATION_START_TIME: selectedTime.START,
				RESERVATION_END_TIME: selectedTime.END,
				STATUS: 'WAITING',
				APP_MEMBER_IDENTIFICATION_CODE: memberId,
			},
			(res) => {
				/**
				 * 컨설팅 답변 업로드
				 */
				updateConsultingAnswer();
			},
			(err) => {
				// 에러 핸들링
				if (
					err.response.data.message ===
					'동일 고객 예약 금지 횟수를 초과하였습니다.'
				) {
					setAlertModal(true);
					setAlertModalType('consultingexceed');
				}
				if (err.response.data.message === '포인트가 부족합니다.') {
					setAlertModal(true);
					setAlertModalType('point');
				}
				// if (
				// 	err.response.data.message === '구독 회원만 이용 가능합니다.'
				// ) {
				// 	setAlertModal(true);
				// 	setAlertModalType('subscribe');
				// }
			}
		);
	};
	/**
	 * 컨설팅 답변 업데이트
	 */
	const updateConsultingAnswer = () => {
		coffeeChatAnswer.map((x) => {
			specialCoffeeChatAnswerController.updateItem(x, (res) => {
				props.handleClose();
			});
		});
	};
	//* Hooks
	/**
	 * 유저 아이디 가져오는 훅
	 */
	const { memberId } = useAppMember();

	console.log('coffeeChatData', props.coffeeChatData);

	useEffect(() => {
		if (props.coffeeChatData.SpecialCoffeeChatAnswers) {
			const answerList =
				props.coffeeChatData.SpecialCoffeeChatAnswers.map((x) => {
					return {
						SPECIAL_COFFEE_CHAT_QUESTION_IDENTIFICATION_CODE:
							x.SPECIAL_COFFEE_CHAT_QUESTION_IDENTIFICATION_CODE,
						SPECIAL_COFFEE_CHAT_APPLICATION_IDENTIFICATION_CODE:
							props.coffeeChatData
								.SPECIAL_COFFEE_CHAT_APPLICATION_IDENTIFICATION_CODE,
						ANSWER_CONTENT: x.ANSWER_CONTENT,
						FILE_LIST: x.FILE_LIST,
						SPECIAL_COFFEE_CHAT_ANSWER_IDENTIFICATION_CODE:
							x.SPECIAL_COFFEE_CHAT_ANSWER_IDENTIFICATION_CODE,
					};
				});

			setCoffeeChatAnswer(answerList);
			getSpecialCoffeeChatProduct();
		}
	}, [props.coffeeChatData]);

	// 초기 월별 일정 가져오기
	useEffect(() => {
		getMonthSchedule(moment().format('YYYY-MM'));
	}, [props.coffeeChatData]);

	return (
		<SupportiModal
			open={props.open}
			handleClose={() => {
				setSelectedDate(null);
				setPage(0);
				props.handleClose();
			}}
			activeHeader={true}
			title="예약 수정"
			muiModalProps={{
				maxWidth: '60%',
			}}
			style={{
				width: { sm: 'fit-content', xs: '100%' },
				maxWidth: { sm: '400px', xs: '100%' },
				maxHeight: { sm: '90%', xs: '100%' },
				minWidth: { sm: '400px', xs: '100%' },
			}}
		>
			{/* 컨설팅 설명 및 캘린더 / 페이지 0*/}
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
								{
									props.coffeeChatData
										?.SpecialCoffeeChatProduct.PartnerMember
										?.FULL_NAME
								}{' '}
								와(과)의 커피챗 일정
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
									props.coffeeChatData
										.SpecialCoffeeChatProduct
										?.DURATION_PER_RESERVE_IN_MINUTE
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
							<PaidOutlinedIcon />
							<Typography ml={1}>
								{
									props.coffeeChatData
										.SpecialCoffeeChatProduct?.PRICE
								}{' '}
								P
							</Typography>
						</Box>
						<Box display={'flex'} alignItems={'center'} gap={1}>
							<CalendarTodayOutlinedIcon />
							<Typography ml={1}>
								{moment(
									props.coffeeChatData
										.SpecialCoffeeChatProduct?.START_DATE
								).format('YYYY-MM-DD')}{' '}
								-{' '}
								{moment(
									props.coffeeChatData
										.SpecialCoffeeChatProduct?.END_DATE
								).format('YYYY-MM-DD')}
							</Typography>
						</Box>
						<Box mt={2}>
							<Typography color={'primary'}>
								{props.coffeeChatData.SpecialCoffeeChatProduct
									?.LOCK_DOWN_TIME_UNIT === 'WEEK' &&
									'한주에'}
								{props.coffeeChatData.SpecialCoffeeChatProduct
									?.LOCK_DOWN_TIME_UNIT === 'DAY' && '하루에'}
								{props.coffeeChatData.SpecialCoffeeChatProduct
									?.LOCK_DOWN_TIME_UNIT === 'YEAR' &&
									'일년에'}
								{props.coffeeChatData.SpecialCoffeeChatProduct
									?.LOCK_DOWN_TIME_UNIT === 'MONTH' &&
									'한달에 '}
								{' 최대1회 예약 가능합니다.'}
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
							maxDate={
								new Date(
									props.coffeeChatData.SpecialCoffeeChatProduct?.END_DATE
								)
							}
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
									) &&
									monthSchedule[
										moment(date.toString()).format(
											'YYYY-MM-DD'
										)
									].length > 0
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
									) &&
									monthSchedule[
										moment(date).format('YYYY-MM-DD')
									].length > 0
								) {
									return styles.highlight;
								}
							}}
						/>
					</Box>
				</Box>
			)}
			{/* 컨설팅 시간 선택 / 페이지 1*/}
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
						maxHeight={'400px'}
						sx={{
							overflowY: 'auto',
						}}
						mt={2}
						width={'100%'}
					>
						<Box
							display={'flex'}
							alignItems={'center'}
							justifyContent={'center'}
							flexDirection={'column'}
							gap={1}
							width={'100%'}
						>
							{monthSchedule[selectedDate]?.map((time) => {
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
				</Box>
			)}
			{/* 컨설팅 질문 및 답변 / 페이지 2*/}
			{page === 2 && (
				<Box width={'100%'}>
					{/* 예약 데이터 */}

					<Box borderBottom={'0.5px solid grey'} pb={2} mb={2}>
						<Box
							display={'flex'}
							mb={1}
							alignItems={'center'}
							gap={1}
						>
							<KeyboardBackspaceOutlinedIcon
								onClick={() => {
									setPage(1);
									setSelectedTime(null);
								}}
								color="primary"
								sx={{
									cursor: 'pointer',
									borderRadius: '50%',
									border: '1px solid lightgrey',
									width: '26px',
									height: '26px',
									p: 0.5,
								}}
							/>
							<Typography variant="h5" fontWeight={'700'}>
								{
									props.coffeeChatData
										.SpecialCoffeeChatProduct?.PartnerMember
										?.FULL_NAME
								}{' '}
								와(과)의 커피챗 일정
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
									props.coffeeChatData
										.SpecialCoffeeChatProduct
										?.DURATION_PER_RESERVE_IN_MINUTE
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
							<Typography ml={1}>조율</Typography>
						</Box>
						<Box display={'flex'} alignItems={'center'} gap={1}>
							<CalendarTodayOutlinedIcon />
							<Typography ml={1}>
								{moment(selectedDate).format('YYYY-MM-DD(ddd)')}{' '}
								{selectedTime.START} - {selectedTime.END}
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
								커피챗 사전 질문
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
							{props.coffeeChatData.SpecialCoffeeChatProduct?.SpecialCoffeeChatQuestions?.map(
								(question, index) => {
									return (
										<CoffeeChatQnA
											key={index}
											qnaData={question}
											coffeeChatAnswer={coffeeChatAnswer}
											setCoffeeChatAnswer={
												setCoffeeChatAnswer
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
								applyCoffeeChat();
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
		</SupportiModal>
	);
};

export default SpecialCoffeeChatUpdateModal;
