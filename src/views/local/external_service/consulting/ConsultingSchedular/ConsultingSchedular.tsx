import React, { useEffect } from 'react';

import { Box, BoxProps, Typography } from '@mui/material';
import SuppportiModal from '../../../../global/SuppportiModal';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import FmdGoodOutlinedIcon from '@mui/icons-material/FmdGoodOutlined';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import Calendar from 'react-calendar';
import { ConsultingApplicationController } from '../../../../../controller/ConsultingApplicationController';
import moment from 'moment';
import 'react-calendar/dist/Calendar.css';
import styles from './Calendar.module.css';

interface IConsultingSchedularProps {
	open: boolean;
	consultingData: any;
}

const ConsultingSchedular = (props: IConsultingSchedularProps) => {
	//* States
	/**
	 * 선택된 날짜
	 */
	const [selectedDate, setSelectedDate] = React.useState<any>(null);
	/**
	 * 선택된 시간
	 */
	const [selectedTime, setSelectedTime] = React.useState<any>(null);
	/**
	 * 월별 가능 시간 데이터
	 */
	const [monthSchedule, setMonthSchedule] = React.useState<{
		[key: string]: [
			{
				START: string;
				END: string;
			}
		];
	}>();
	/**
	 * 해당 월의 선택 가능한 날짜 리스트
	 */
	const [availableDateList, setAvailableDateList] = React.useState<string[]>([
		'2023-12-15',
		'2023-12-13',
		'2023-12-11',
	]);
	/**
	 * 페이지
	 */
	const [page, setPage] = React.useState<number>(0);
	//* Controller
	const consultingApplicationController =
		new ConsultingApplicationController();
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
				const test = {
					'2023-12-11': [
						{
							START: '09:00',
							END: '09:30',
						},
						{
							START: '09:30',
							END: '10:00',
						},
						{
							START: '10:00',
							END: '10:30',
						},
						{
							START: '10:30',
							END: '11:00',
						},
						{
							START: '11:00',
							END: '11:30',
						},
						{
							START: '11:30',
							END: '12:00',
						},
						{
							START: '12:00',
							END: '12:30',
						},
						{
							START: '12:30',
							END: '13:00',
						},
						{
							START: '13:00',
							END: '13:30',
						},
						{
							START: '13:30',
							END: '14:00',
						},
						{
							START: '14:00',
							END: '14:30',
						},
						{
							START: '14:30',
							END: '15:00',
						},
						{
							START: '15:00',
							END: '15:30',
						},
						{
							START: '15:30',
							END: '16:00',
						},
						{
							START: '16:00',
							END: '16:30',
						},
						{
							START: '16:30',
							END: '17:00',
						},
						{
							START: '17:00',
							END: '17:30',
						},
						{
							START: '17:30',
							END: '18:00',
						},
					],
					'2023-12-13': [
						{
							START: '09:00',
							END: '09:30',
						},
						{
							START: '09:30',
							END: '10:00',
						},
						{
							START: '10:00',
							END: '10:30',
						},
						{
							START: '10:30',
							END: '11:00',
						},
						{
							START: '11:00',
							END: '11:30',
						},
						{
							START: '11:30',
							END: '12:00',
						},
						{
							START: '12:00',
							END: '12:30',
						},
						{
							START: '12:30',
							END: '13:00',
						},
						{
							START: '13:00',
							END: '13:30',
						},
						{
							START: '13:30',
							END: '14:00',
						},
						{
							START: '14:00',
							END: '14:30',
						},
						{
							START: '14:30',
							END: '15:00',
						},
						{
							START: '15:00',
							END: '15:30',
						},
						{
							START: '15:30',
							END: '16:00',
						},
						{
							START: '16:00',
							END: '16:30',
						},
						{
							START: '16:30',
							END: '17:00',
						},
						{
							START: '17:00',
							END: '17:30',
						},
						{
							START: '17:30',
							END: '18:00',
						},
					],
					'2023-12-15': [
						{
							START: '09:00',
							END: '09:30',
						},
						{
							START: '09:30',
							END: '10:00',
						},
						{
							START: '10:00',
							END: '10:30',
						},
						{
							START: '10:30',
							END: '11:00',
						},
						{
							START: '11:00',
							END: '11:30',
						},
						{
							START: '11:30',
							END: '12:00',
						},
						{
							START: '12:00',
							END: '12:30',
						},
						{
							START: '12:30',
							END: '13:00',
						},
						{
							START: '13:00',
							END: '13:30',
						},
						{
							START: '13:30',
							END: '14:00',
						},
						{
							START: '14:00',
							END: '14:30',
						},
						{
							START: '14:30',
							END: '15:00',
						},
						{
							START: '15:00',
							END: '15:30',
						},
						{
							START: '15:30',
							END: '16:00',
						},
						{
							START: '16:00',
							END: '16:30',
						},
						{
							START: '16:30',
							END: '17:00',
						},
						{
							START: '17:00',
							END: '17:30',
						},
						{
							START: '17:30',
							END: '18:00',
						},
					],
				};
				// setAvailableDateList(Object.keys(res.data.result));
				// setMonthSchedule(res.data.result);
				// setAvailableDateList(Object.keys(test));
				// setMonthSchedule(test);
			},
			(err) => {}
		);
	};
	console.log(availableDateList);
	//* Hooks
	useEffect(() => {
		getMonthSchedule(moment().format('YYYY-MM'));
	}, [props.consultingData]);

	return (
		<SuppportiModal
			open={props.open}
			handleClose={() => {}}
			activeHeader={true}
			title="예약 신청"
		>
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
								console.log(date);
								setSelectedDate(date);
								// setPage(1);
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
							tileContent={({ date, view }) => {
								// 해당 날짜(하루)에 추가할 컨텐츠의 배열
								const contents = [];
								if (
									availableDateList.find(
										(day) =>
											day ===
											moment(date).format('YYYY-MM-DD')
									)
								) {
									contents.push(
										<div className="highlight"></div>
									);
								}
								return <div>{contents}</div>;
							}}
						/>
					</Box>
				</Box>
			)}
		</SuppportiModal>
	);
};

export default ConsultingSchedular;
