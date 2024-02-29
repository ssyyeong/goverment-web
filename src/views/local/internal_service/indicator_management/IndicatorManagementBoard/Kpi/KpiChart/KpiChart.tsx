import React from 'react';
import { Box, Typography } from '@mui/material';
import ReactApexChart from 'react-apexcharts';

type TKpiChartProps = {
	kpiList?: any[];
};

const KpiChart = (props: TKpiChartProps) => {
	//* Constants
	const chartDataConfig = {
		series: [],
		options: {
			chart: {
				type: 'bar',
				height: 250,
				toolbar: {
					show: false,
				},
			},
			plotOptions: {
				bar: {
					horizontal: false,
					columnWidth: '55%',
					endingShape: 'rounded',
				},
			},
			dataLabels: {
				enabled: false,
			},
			stroke: {
				width: 5,
			},
			legend: {
				tooltipHoverFormatter: function (val, opts) {
					return (
						val +
						'  <strong>' +
						opts.w.globals.series[opts.seriesIndex][
							opts.dataPointIndex
						].toLocaleString() +
						'원' +
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
				type: 'datetime',
				stepSize: 5,
				label: {
					formatter: undefined,
				},
			},
			yaxis: {
				// min: 0,
				// max: 100,
				demicalsInFloat: 0,
				labels: {
					formatter: function (val) {
						return Math.abs(val) > 999999
							? (val / 1000000).toFixed(1) + 'M'
							: val.toLocaleString() + '원';
					},
				},
			},

			tooltip: {
				y: {
					formatter: function (val) {
						return Math.abs(val) > 999999
							? (val / 1000000).toFixed(1) + 'M'
							: val.toLocaleString() + '원';
					},
				},
			},
			grid: {
				borderColor: '#f1f1f1',
				show: false,
			},
		},
	};

	//*States

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
			{/* <ReactApexChart
									type="line"
									series={monthlyInOut}
									options={chartDataConfig.options}
									width={'95%'}
									height={300}
								/> */}
		</Box>
	);
};

export default KpiChart;
