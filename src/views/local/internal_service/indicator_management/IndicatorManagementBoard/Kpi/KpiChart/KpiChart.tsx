import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import dynamic from 'next/dynamic';
import { KpiController } from '../../../../../../../controller/KpiController';
import { randomColor } from '../../../../../../../../configs/randomColorConfig';

type TKpiChartProps = {
	list?: any[];
};

const KpiChart = (props: TKpiChartProps) => {
	//* Controllers
	const kpiController = new KpiController();
	/**
	 * Next 차트 적용을 위함
	 */
	const ReactApexChart = dynamic(() => import('react-apexcharts'), {
		ssr: false,
	});

	//* Constants

	/**
	 * 예시 데이터
	 */
	const exampleData = [
		{
			name: 'KPI1',
			data: [
				{ x: '2023-01', y: 10 },
				{ x: '2023-02', y: 20 },
				{ x: '2023-03', y: 30 },
				{ x: '2023-04', y: 40 },
				{ x: '2023-05', y: 50 },
				{ x: '2023-06', y: 60 },
				{ x: '2023-07', y: 70 },
				{ x: '2023-08', y: 80 },
				{ x: '2023-09', y: 90 },
				{ x: '2023-10', y: 100 },
				{ x: '2023-11', y: 110 },
				{ x: '2023-12', y: 120 },
			],
			color: randomColor[randomColor.length - 1],
		},
		{
			name: 'KPI2',
			data: [
				{ x: '2023-01', y: 1 },
				{ x: '2023-02', y: 2 },
				{ x: '2023-03', y: 3 },
				{ x: '2023-04', y: 4 },
				{ x: '2023-05', y: 5 },
				{ x: '2023-06', y: 6 },
				{ x: '2023-07', y: 7 },
				{ x: '2023-08', y: 8 },
				{ x: '2023-09', y: 9 },
				{ x: '2023-10', y: 10 },
				{ x: '2023-11', y: 11 },
				{ x: '2023-12', y: 12 },
			],
			color: randomColor[randomColor.length - 2],
		},
	];

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
				// curve: 'smooth',
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

	//*States

	/**
	 *
	 * 차트 데이터
	 */
	const [chartData, setChartData] = useState<any>(undefined);

	//* Hooks
	useEffect(() => {
		/**
		 * api calls
		 */
		// kpiController.getAllKpiGraph(
		// 	{},
		// 	(res: any) => {
		// 		chartDataConfig.series = res.data;
		// 		setChartData(chartDataConfig);
		// 	},
		// 	(err: any) => {
		// 		console.error(err);
		// 	}
		// );
		setChartData(chartDataConfig);
	}, []);

	return (
		<Box
			sx={{
				bgcolor: 'white',
				boxShadow: '0 3px 15px 0 #e1eaff',
				width: '100%',
				py: 4,
				px: { sm: 4, xs: 0 },
				borderRadius: 2,
			}}
		>
			<Typography fontWeight={600} variant="subtitle1" mb={2}>
				월별 KPI 지표 달성률
			</Typography>
			{chartData !== undefined && (
				<ReactApexChart
					type="line"
					series={exampleData}
					options={chartData.options}
					width={'95%'}
					height={350}
				/>
			)}
		</Box>
	);
};

export default KpiChart;
