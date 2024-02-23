import React, { useEffect, useState } from 'react';

import { Box, Divider, Typography } from '@mui/material';
import SupportiModal from '../../../../global/SupportiModal';
import { SupportiAlertModal } from '../../../../global/SupportiAlertModal';
import SupportiButton from '../../../../global/SupportiButton';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import dayjs from 'dayjs';

import dynamic from 'next/dynamic';
import { randomColor } from '../../../../../../configs/randomColorConfig';
import { OkrMainController } from '../../../../../controller/OkrMainController';

type mainData = {
	title: string;
	startDate: string;
	endDate: string;
	id: number;
};

type subData = {
	title: string;
	id: number;
};

type chartData = {
	mainData: mainData;
	subData: subData[];
};

interface IAchievedChartModalProps {
	modalOpen: boolean;
	setModalOpen: React.Dispatch<boolean>;
	chartData: chartData;
}

const AchievedChartModal = (props: IAchievedChartModalProps) => {
	//* Controllers
	const okrMainConroller = new OkrMainController();

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
	const diff = date2.diff(date1, 'month');

	/**
	 *
	 * 선택 가능한 탭
	 */

	const selectableTab = diff < 11 ? ['일별', '월별'] : ['월별', '분기별'];

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

	/**
	 *
	 * 차트 데이터
	 */
	const chartDataConfig = {
		series: [],
		options: {
			chart: {
				height: 350,
				type: 'line',
			},
			dataLabels: {
				enabled: false,
			},
			stroke: {
				width: 5,
				curve: 'smooth',
				dashArray: [0, 8, 5],
			},
			legend: {
				tooltipHoverFormatter: function (val, opts) {
					return (
						val +
						'  <strong>' +
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
				type: 'category',
				stepSize: 5,
				label: {
					formatter: undefined,
				},
			},
			yaxis: {
				min: 0,
				max: 100,
				demicalsInFloat: 0,
			},

			tooltip: {
				x: {
					show: true,
					format: 'dd MMM',
					formatter: undefined,
				},
				y: {
					title: {
						formatter: function (val) {
							return val + '(%)';
						},
					},
				},
			},
			grid: {
				borderColor: '#f1f1f1',
			},
		},
	};
	//* Functions
	/**
	 *
	 * api 호출
	 */
	const getAcheivedData = (id, selectedTab) => {
		okrMainConroller.getItem(
			{
				OKR_MAIN_IDENTIFICATION_CODE: id,
				TYPE:
					selectedTab === '일별'
						? 'DAY'
						: selectedTab === '월별'
						? 'MONTH'
						: 'QUARTER',
			},
			(res) => {
				const objectArr = res.data.result;
				const convertedArr = objectArr.map((item) => {
					const convertingArr = item.data.map((ele) => {
						return {
							x: `${ele.date}${
								selectedTab === '일별'
									? ''
									: selectedTab === '월별'
									? '월'
									: '분기'
							}`,
							y: ele.achievedRate,
						};
					});
					// console.log('convertingArr', convertingArr);
					return {
						name: item.name,
						data: convertingArr,
						color:
							item.name === 'Total'
								? '#305ddc'
								: randomColor[objectArr.indexOf(item)],
					};
				});
				chartDataConfig.series = convertedArr;
				chartDataConfig.options.xaxis.type =
					selectedTab === '일별' ? 'datetime' : 'category';
				setChartData(chartDataConfig);
			},
			(err) => {
				return [];
			}
		);
	};

	//* Constants

	//* Hooks

	useEffect(() => {
		/**
		 * 선택한 탭에 따라 detail values 불러오기
		 */
		getAcheivedData(props.chartData.mainData.id, selectedTab);
	}, [selectedTab]);

	useEffect(() => {
		if (!props.modalOpen) {
			setSelectedTab(selectableTab[0]);
		}
	}, [props.modalOpen]);

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
					// pt: 5,
				}}
				activeHeader={true}
				children={
					<Box
						display={'flex'}
						flexDirection={'column'}
						gap={5}
						// minHeight={'70vh'}
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
									options={chartData.options}
									width={'100%'}
									height={450}
								/>
							</Box>
						)}
						{/** 모달창 닫기 버튼 */}
						{/* <SupportiButton
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
						/> */}
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

export default AchievedChartModal;
