import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import ReactApexChart from 'react-apexcharts';

type TKpiChartProps = {
	kpiList?: any[];
};

const KpiChart = (props: TKpiChartProps) => {
	//* Constants
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

	//*States

	/**
	 *
	 * 차트 데이터
	 */
	const [chartData, setChartData] = useState<any>(undefined);

	//* Hooks
	useEffect(() => {
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
				textAlign: 'center',
			}}
		>
			{chartData !== undefined && (
				<ReactApexChart
					type="line"
					series={chartData.series}
					options={chartData.options}
					width={'95%'}
					height={300}
				/>
			)}
		</Box>
	);
};

export default KpiChart;
