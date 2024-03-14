import React from 'react';

import { Box, BoxProps, Typography } from '@mui/material';
import Calendar from 'react-calendar';
import moment from 'moment';
import styles from './Calendar.module.css';
import 'react-calendar/dist/Calendar.css';
import './Calendar.module.css';
import DefaultController from '@leanoncompany/supporti-ark-office-project/src/controller/default/DefaultController';
import { SupportBusinessManagementController } from '../../../../../controller/SupportBusinessManagementController';
import { useAppMember } from '../../../../../hooks/useAppMember';
import Nodata from '../../../../global/NoData/NoData';
import { useRouter } from 'next/router';

interface IScheduleProps {}

const Schedule = (props: IScheduleProps) => {
	const router = useRouter();
	//* Controller
	const supportBusinessManagementController =
		new SupportBusinessManagementController();
	//* State
	/**
	 * 선택된 날짜
	 */
	const [selectedDate, setSelectedDate] = React.useState<any>(
		moment().format('YYYY-MM-DD')
	);
	//* Functions
	const getMonthSchedule = async (date: string) => {
		supportBusinessManagementController.getScheduleData(
			{
				APP_MEMBER_IDENTIFICATION_CODE: memberId,
				MONTH: date,
			},
			(res) => {
				setMonthSchedule(res.data.result);
			},
			(err) => {}
		);
	};
	//* Hooks
	const [monthSchedule, setMonthSchedule] = React.useState<any>({});

	const { memberId } = useAppMember();

	React.useEffect(() => {
		if (memberId) {
			getMonthSchedule(moment().format('YYYY-MM'));
		}
	}, [memberId]);

	return (
		<Box
			display={'flex'}
			width={'100%'}
			gap={2}
			my={2}
			flexDirection={{ xs: 'column', sm: 'row' }}
		>
			<Box
				// width={'50%'}
				bgcolor={'white'}
				borderRadius={3}
				display={'flex'}
				justifyContent={'center'}
				p={4}
			>
				<Calendar
					minDetail="month"
					maxDetail="month"
					formatDay={(locale, date) => moment(date).format('DD')}
					onChange={(date) => {
						setSelectedDate(
							moment(date.toString()).format('YYYY-MM-DD')
						);
					}}
					next2Label={null}
					prev2Label={null}
					showNeighboringMonth={false}
					onActiveStartDateChange={(date) =>
						getMonthSchedule(
							moment(date.activeStartDate).format('YYYY-MM')
						)
					}
					value={selectedDate}
					className={[styles.CircleBox, styles.Now, styles.Calendar]}
					tileContent={({ date, view }) => {
						// 날짜 타일에 컨텐츠 추가하기 (html 태그)
						// 추가할 html 태그를 변수 초기화
						let html = [];
						// 현재 날짜가 post 작성한 날짜 배열(mark)에 있다면, dot div 추가
						if (monthSchedule) {
							if (
								monthSchedule[moment(date).format('YYYY-MM-DD')]
									?.length > 0 &&
								monthSchedule[
									moment(date).format('YYYY-MM-DD')
								].find((x: any) => x.MID_DEAD_LINE_DATE)
							) {
								html.push(<div className={styles.dot2}></div>);
							}
							if (
								monthSchedule[
									moment(date).format('YYYY-MM-DD')
								]?.find((x: any) => x.DEAD_LINE_DATE)
							) {
								html.push(<div className={styles.dot}></div>);
							}
							// 다른 조건을 주어서 html.push 에 추가적인 html 태그를 적용할 수 있음.
							return (
								<>
									<div
										style={{
											display: 'flex',
											justifyContent: 'center',
											alignItems: 'center',
											// marginTop: '3px',
										}}
									>
										{html}
									</div>
								</>
							);
						}
					}}
				/>
			</Box>
			{/* 일별일정 */}
			<Box
				width={{ sm: `calc(100% - 400px)`, xs: '100%' }}
				bgcolor={'white'}
				borderRadius={3}
				p={4}
			>
				<Typography fontWeight={'700'}>
					일별 일정 ({selectedDate})
				</Typography>
				<Box
					py={2}
					borderTop={'0.5px solid black'}
					mt={2}
					height={'310px'}
					sx={{
						overflowY: 'auto',
						'&::-webkit-scrollbar': {
							width: '5px',
							backgroundColor: 'white',
						},
						'&::-webkit-scrollbar-thumb': {
							backgroundColor: '#305edccc',
							borderRadius: '20px',
						},
					}}
				>
					{monthSchedule[selectedDate]?.map(
						(item: any, index: number) => {
							return (
								<Box
									display={'flex'}
									alignItems={'center'}
									key={index}
									py={2}
									gap={1}
									onClick={() => {
										router.push(
											`/internal_service/government/management/${item.SUPPORT_BUSINESS_MANAGEMENT_IDENTIFICATION_CODE}`
										);
									}}
									sx={{
										cursor: 'pointer',
									}}
								>
									<Box
										bgcolor={
											item.MID_DEAD_LINE_DATE
												? 'blue'
												: 'red'
										}
										width={'15px'}
										height={'15px'}
										borderRadius={'50%'}
									/>

									<Typography
										fontWeight={'600'}
										color={
											item.MID_DEAD_LINE_DATE
												? 'blue'
												: 'red'
										}
									>
										{item.MID_DEAD_LINE_DATE
											? '중간 보고일'
											: '최종 보고일'}
									</Typography>
									<Typography>Dday</Typography>
									<Typography fontWeight={'500'}>
										{item.TITLE}
									</Typography>
								</Box>
							);
						}
					)}
					{!monthSchedule[selectedDate] && (
						<Nodata noDataText="일정이 없습니다." />
					)}
				</Box>
			</Box>
		</Box>
	);
};

export default Schedule;
