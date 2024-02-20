import React, { useEffect, useState } from 'react';

import { Box, Divider, Typography } from '@mui/material';
import SupportiModal from '../../../../global/SupportiModal';
import { SupportiAlertModal } from '../../../../global/SupportiAlertModal';
import SupportiButton from '../../../../global/SupportiButton';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import dayjs from 'dayjs';

import dynamic from 'next/dynamic';
import { OkrDetailController } from '../../../../../controller/OkrDetailController';

type mainData = {
	title: string;
	startDate: string;
	endDate: string;
};

type subData = {
	title: string;
	id: number;
};

type chartData = {
	mainData: mainData;
	subData: subData[];
};

interface IAchievedModalProps {
	modalOpen: boolean;
	setModalOpen: React.Dispatch<boolean>;
	chartData: chartData;
}

const AchievedModal = (props: IAchievedModalProps) => {
	//* Controllers
	const okrDetailController = new OkrDetailController();

	//* Modules
	/**
	 * Next 차트 적용을 위함
	 */
	const ReactApexChart = dynamic(() => import('react-apexcharts'), {
		ssr: false,
	});

	//* States

	/**
	 *
	 * 메인 목표 기간 연 단위인지 판단
	 */
	const date1 = dayjs(props.chartData.mainData.startDate);
	const date2 = dayjs(props.chartData.mainData.endDate);
	const diff = date1.diff(date2, 'y');

	/**
	 *
	 * 선택 가능한 탭
	 */

	const [selectableTab, setSelectableTab] = useState<string[]>(
		diff < 1 ? ['일별', '월별'] : ['월별', '분기별']
	);

	/**
	 * 선택한 탭
	 */
	const [selectedTab, setSelectedTab] = useState<string>(selectableTab[0]);

	/**
	 * 알럿
	 */
	const [alertModal, setAlertModal] = React.useState<boolean>(false);

	/**
	 *
	 * 차트 데이터
	 */
	const [chartData, setChartData] = useState<any>(undefined);

	//* Functions
	/**
	 *
	 * api 호출
	 */
	const getAcheivedData = (id, selectedTab) => {
		// TODO :: api 작성
		return [id + 1, id + 2, id + 3];
	};

	/**
	 * 전체 누적 데이터
	 */
	const getTotalData = () => {
		const totalData = props.chartData.subData.map((item) => {
			return getAcheivedData(item.id, selectedTab);
		});

		let result = [];

		totalData.forEach((item) => {
			result = item.map((value, index) => {
				return (result[index] || 0) + value;
			});
		});

		return result;
	};

	/**
	 * 차트 데이터 생성
	 */
	const makeSeries = () => {
		return props.chartData.subData
			.map((item) => {
				return {
					name: item.title,
					data: getAcheivedData(item.id, selectedTab),
				};
			})
			.concat([
				{
					name: '전체',
					data: getTotalData(),
				},
			]);
	};

	//* Constants
	/**
	 *
	 * 차트 데이터
	 */
	const chartDataConfig = {
		series: makeSeries(),
		options: {
			chart: {
				height: 350,
				type: 'line',
				zoom: {
					enabled: false,
				},
			},
			dataLabels: {
				enabled: false,
			},
			stroke: {
				width: [5, 7, 5],
				curve: 'straight',
				dashArray: [0, 8, 5],
			},
			title: {
				text: 'Page Statistics',
				align: 'left',
			},
			legend: {
				tooltipHoverFormatter: function (val, opts) {
					return (
						val +
						' - <strong>' +
						opts.w.globals.series[opts.seriesIndex][
							opts.dataPointIndex
						] +
						'</strong>'
					);
				},
			},
			markers: {
				size: 0,
				hover: {
					sizeOffset: 6,
				},
			},
			xaxis: {
				categories: [
					'01 Jan',
					'02 Jan',
					'03 Jan',
					'04 Jan',
					'05 Jan',
					'06 Jan',
					'07 Jan',
					'08 Jan',
					'09 Jan',
					'10 Jan',
					'11 Jan',
					'12 Jan',
				],
			},
			tooltip: {
				y: [
					// {
					// 	title: {
					// 		formatter: function (val) {
					// 			return val + ' (mins)';
					// 		},
					// 	},
					// },
					// {
					// 	title: {
					// 		formatter: function (val) {
					// 			return val + ' per session';
					// 		},
					// 	},
					// },
					{
						title: {
							formatter: function (val) {
								return val;
							},
						},
					},
				],
			},
			grid: {
				borderColor: '#f1f1f1',
			},
		},
	};

	//* Hooks

	//* Hooks

	useEffect(() => {
		/**
		 * 선택한 탭에 따라 detail values 불러오기
		 */
		setChartData(chartDataConfig);
	}, [selectedTab]);

	// const objectArr = [{ 1: 'a' }, { 2: 'b' }, { 3: 'c' }];
	// const result = objectArr.map((item) => {
	// 	return Object.keys(item);
	// });
	// console.log(result);

	return (
		<Box>
			<SupportiModal
				open={props.modalOpen}
				handleClose={() => {
					props.setModalOpen(false);
				}}
				title={'달성 현황'}
				style={{
					width: { xs: '100%', md: '55%' },
					pt: 5,
				}}
				activeHeader={true}
				children={
					<Box
						display={'flex'}
						flexDirection={'column'}
						gap={5}
						minHeight={'70vh'}
						maxHeight={'85vh'}
						overflow={'auto'}
						sx={{
							width: { xs: '100%', md: '98%' },
							p: 3,
							'-ms-overflow-style': 'none',
							'&::-webkit-scrollbar': {
								width: '6px',
								height: '5px !important',
								backgroundColor: 'white !important',
								padding: '1px',
								borderRadius: '20px',
							},
							'&::-webkit-scrollbar-thumb': {
								backgroundColor: '#b0b5c2',
								borderRadius: '20px',
							},
						}}
					>
						<Box display="flex">
							{/** 메인 목표 타이틀, 기간  */}
							<Box>
								<Typography
									fontWeight={'bold'}
									variant="h2"
									mb={2}
								>
									{props.chartData.mainData?.title}
								</Typography>
								<Box display={'flex'}>
									<CalendarTodayIcon
										sx={{
											width: '15px',
											height: '15px',
											marginTop: 'auto',
											marginBottom: 'auto',
											marginRight: '5px',
											color: 'secondary.main',
										}}
									/>
									<Typography
										fontWeight={500}
										color={'secondary.main'}
									>
										{
											(
												props.chartData.mainData
													.startDate as string
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
												props.chartData.mainData
													.endDate as string
											).split('T')[0]
										}
									</Typography>
								</Box>
							</Box>
							{/** 기간 별 탭 */}
							<Box
								sx={{
									border: '1px solid #305DDC',
									borderRadius: '5px',
									width: '100px',
									height: '40px',
									p: 1.5,
									ml: 'auto',
								}}
								display="flex"
								justifyContent={'space-between'}
							>
								{selectableTab.map((tab, index) => {
									return (
										<Typography
											fontWeight={'600'}
											color={
												tab === selectedTab
													? 'primary.main'
													: 'secondary.dark'
											}
											sx={{
												cursor: 'pointer',
											}}
											onClick={() => {
												setSelectedTab(tab);
											}}
										>
											{tab}
										</Typography>
									);
								})}
							</Box>
						</Box>
						{/** 차트 */}

						{chartData !== undefined && (
							<Box>
								<ReactApexChart
									type="line"
									series={chartData.series}
									options={chartData}
									width={'100%'}
									height={450}
								/>
							</Box>
						)}
						{/** 모달창 닫기 버튼 */}
						<SupportiButton
							contents={'확인'}
							onClick={() => {
								props.setModalOpen(false);
							}}
							style={{
								height: '50px',
								width: { xs: '100%', md: '250px' },
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
				open={alertModal}
				handleClose={() => {
					setAlertModal(false);
				}}
				type="success"
			/>
		</Box>
	);
};

export default AchievedModal;
