import React, { useEffect, useState } from 'react';
import { Box, BoxProps, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { useAppMember } from '../../../../../hooks/useAppMember';
import { MentoringApplicationController } from '../../../../../controller/MentoringApplicationController';
import moment from 'moment';
import CloseIcon from '@mui/icons-material/Close';

interface IMentoringData {
	data: any;
	selectedTime: any;
	setSelectedTime: (data: any) => void;
}

const MentoringData = (props: IMentoringData) => {
	const router = useRouter();

	/**
	 * 유저 아이디 가져오는 훅
	 */
	const { memberId } = useAppMember();

	/**
	 * 멘토링 신청 컨트롤러
	 */
	const mentoringApplicationController = new MentoringApplicationController();

	/**
	 * 해당 월의 선택 가능한 날짜 리스트
	 */
	const [availableDateList, setAvailableDateList] = useState<string[]>([]);

	/**
	 * 선택된 날짜
	 */
	const [selectedDate, setSelectedDate] = React.useState<any>(null);

	/**
	 * 매 월 일정을 가져오기
	 */
	const getMonthSchedule = (month) => {
		mentoringApplicationController.getAvailableTime(
			{
				MENTORING_PRODUCT_IDENTIFICATION_CODE:
					props.data.MENTORING_PRODUCT_IDENTIFICATION_CODE,
			},
			async (res) => {
				const list = Object.keys(res.data.result);
				const resultArray = [];
				await Promise.all(
					list.map((date) => {
						if (res.data.result[date].length > 0)
							resultArray.push({
								date: moment(date).format('YYYY.MM.DD'),
								time: res.data.result[date],
							});
					})
				);
				await setAvailableDateList(resultArray);
				setSelectedDate(resultArray[0].date);
			},
			(err) => {}
		);
	};

	// 초기 월별 일정 가져오기
	useEffect(() => {
		// endMonth 스케줄 가져오기
		const startMonth = moment(props.data.START_DATE).format('YYYY-MM');
		const endMonth = moment(props.data.END_DATE).format('YYYY-MM');

		getMonthSchedule(startMonth);
	}, [props.data]);

	return (
		<Box
			sx={{
				p: 2.5,
				borderRadius: 2,
				boxShadow: 'rgb(219, 219, 219) 0px 4px 10px',
				maxWidth: '280px',
				display: 'flex',
				flexDirection: 'column',
				gap: 2,
				textAlign: 'center',
			}}
		>
			<Box
				display={'flex'}
				flexDirection={'row'}
				alignItems={'center'}
				justifyContent={'center'}
				gap={1}
				sx={{
					overflowX: 'auto',
				}}
			>
				{availableDateList.map((data: any) => {
					return (
						<Box
							display={'flex'}
							width={'auto'}
							px={2}
							py={1}
							borderRadius={2}
							sx={{
								bgcolor:
									selectedDate === data.date &&
									'primary.main',
								cursor: 'pointer',
							}}
							onClick={() => {
								setSelectedDate(data.date);
							}}
						>
							<Typography
								variant="body1"
								sx={{
									color:
										selectedDate === data.date && 'white',
									wordBreak: 'keep-all',
								}}
							>
								{moment(data.date).format('MM/DD')}
							</Typography>
						</Box>
					);
				})}
			</Box>
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
					{availableDateList?.filter(
						(data: any) => data.date === selectedDate
					).length > 0 &&
						availableDateList
							?.filter(
								(data: any) => data.date === selectedDate
							)[0]
							['time'].map((time: any, index: any) => {
								return (
									<Box
										key={index.toString()}
										onClick={() => {
											const timeList = [
												...props.selectedTime,
											];

											if (
												timeList.filter(
													(element) =>
														element.DATE ===
															selectedDate &&
														element.START ===
															time.START
												).length > 0
											) {
												const index = timeList.indexOf(
													(element) =>
														element.DATE ===
															selectedDate &&
														element.START ===
															time.START
												);
												timeList.splice(index, 1);
											} else {
												timeList.push({
													DATE: selectedDate,
													START: time.START,
													END: time.END,
												});
											}
											props.setSelectedTime(timeList);
										}}
										sx={{
											cursor: 'pointer',
											borderRadius: '10px',
											py: 2,
											pl: 3,
											pr: 2,
											bgcolor: 'rgba(248, 248, 248, 1)',
											width: '100%',
											display: 'flex',
											alignItems: 'center',
											justifyContent: 'space-between',
											maxHeight: '50px',
										}}
									>
										<Typography>{time.START}</Typography>
									</Box>
								);
							})}
				</Box>
				{props.selectedTime.map((dateTime: any, index: number) => {
					return (
						<Box
							key={index.toString()}
							mt={2}
							p={2}
							display={'flex'}
							flexDirection={'row'}
							alignItems={'center'}
							justifyContent={'space-between'}
							border={'1px solid #c8c8c8'}
							borderRadius={2}
							gap={5}
						>
							<Typography>
								{moment(dateTime.DATE).format('MM.DD')}{' '}
								{dateTime.START} ~ {dateTime.END}
							</Typography>
							<CloseIcon
								sx={{
									cursor: 'pointer',
									width: '20px',
								}}
								onClick={() => {
									const timeList = [...props.selectedTime];
									const index = timeList.indexOf(dateTime);
									timeList.splice(index, 1);
									props.setSelectedTime(timeList);
								}}
							/>
						</Box>
					);
				})}
			</Box>
		</Box>
	);
};

export default MentoringData;
