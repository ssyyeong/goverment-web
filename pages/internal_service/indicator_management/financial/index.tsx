import React, { useEffect, useState } from 'react';

import { NextPage } from 'next';

import {
	Box,
	BoxProps,
	IconButton,
	Skeleton,
	SwipeableDrawer,
	Tooltip,
	Typography,
	useTheme,
} from '@mui/material';
import InternalServiceDrawer from '../../../../src/views/local/internal_service/common/InternalServiceDrawer';
import { InternalServiceLayout } from '../../../../src/views/layout/InternalServiceLayout';
import dynamic from 'next/dynamic';
import { BankController } from '../../../../src/controller/BankController';
import { TransactionHistoryController } from '../../../../src/controller/TransactionHistoryController';
import { IAccountCalculationResultProps } from '../../../../src/views/local/internal_service/financial_solution/account_manage/AccountCalculation/AccountCalculation';
import { useAppMember } from '../../../../src/hooks/useAppMember';
import DefaultController from '@leanoncompany/supporti-ark-office-project/src/controller/default/DefaultController';
import RunwayCard from '../../../../src/views/local/internal_service/indicator_management/IndicatorManagementBoard/RunwayCard/RunwayCard';
import SupportiButton from '../../../../src/views/global/SupportiButton';
import { useRouter } from 'next/router';
import useAlert from '../../../../src/hooks/useAlert/useAlert';
import { SupportiAlertModal } from '../../../../src/views/global/SupportiAlertModal';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import InvestmentModal from '../../../../src/views/local/internal_service/indicator_management/IndicatorManagementBoard/InvestmentModal/InvestmentModal';
import { randomColor } from '../../../../configs/randomColorConfig';
import dayjs from 'dayjs';
import MyAccounts from '../../../../src/views/local/internal_service/financial_solution/account_manage/MyAccounts/MyAccounts';
import { IBankAccount } from '../../../../src/@types/model';
import { TransactionHistoryTable } from '../../../../src/views/local/internal_service/financial_solution/account_manage/TransactionHistoryTable';
import SupportiInput from '../../../../src/views/global/SupportiInput';
import { AccountCalculation } from '../../../../src/views/local/internal_service/financial_solution/account_manage/AccountCalculation';
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import LinkIcon from '@mui/icons-material/Link';
import LinkedCategoryListModal from '../../../../src/views/local/internal_service/financial_solution/account_manage/LinkedCategoryListModal/LinkedCategoryListModal';

const Page: NextPage = () => {
	//* Modules
	/**
	 * Next 차트 적용을 위함
	 */
	const ReactApexChart = dynamic(() => import('react-apexcharts'), {
		ssr: false,
	});
	const router = useRouter();
	//* Controllers
	const bankAccountController = new DefaultController('BankAccount');

	const bankController = new BankController();

	const transactionHistoryController = new TransactionHistoryController();
	//* States
	/**
	 * 로딩
	 */
	const [loading, setLoading] = useState<boolean>(false);
	/**
	 *
	 * 차트 데이터
	 */
	const [chartData, setChartData] = useState<any>(undefined);

	/**
	 * 매출 지출 데이터
	 */
	const [monthlyInOut, setMonthlyInOut] = useState<any>(undefined);
	/**
	 * 순이익 데이터
	 */
	const [monthlyNetProfit, setMonthlyNetProfit] = useState<any>(undefined);
	/**
	 * net or gross
	 */
	const [netOrGross, setNetOrGross] = useState<boolean>(true);
	/**
	 * Gross Burn 데이터
	 */
	const [grossBurn, setGrossBurn] = useState<any>(undefined);
	/**
	 * Net Burn 데이터
	 */
	const [netBurn, setNetBurn] = useState<any>(undefined);
	/**
	 * 계산 결과 조회
	 */
	const [calculationResult, setCalculationResult] =
		React.useState<IAccountCalculationResultProps>();
	/**
	 * 예상 투자금 입력 모달 오픈 여부
	 */
	const [openInvestmentModal, setOpenInvestmentModal] =
		React.useState<boolean>(false);
	/**
	 * 예상 투자금
	 */
	const [investment, setInvestment] = React.useState<number>(0);

	/**
	 * 매출 카테고리별 데이터
	 */
	const [incomeCategoryData, setIncomeCategoryData] = useState<any>();

	/**
	 * 지출 카테고리별 데이터
	 */
	const [expenseCategoryData, setExpenseCategoryData] = useState<any>();

	const [stackedChart, setStackedChart] = useState<any>(undefined);

	const [donutChart, setDonutChart] = useState<any>(undefined);

	const [expenseDonutChart, setExpenseDonutChart] = useState<any>(undefined);

	//* Constants

	const today = dayjs();
	/**
	 * stacked chart x축 데이터
	 *
	 */
	const categories = [
		today.subtract(5, 'month').format('YYYY-MM'),
		today.subtract(4, 'month').format('YYYY-MM'),
		today.subtract(3, 'month').format('YYYY-MM'),
		today.subtract(2, 'month').format('YYYY-MM'),
		today.subtract(1, 'month').format('YYYY-MM'),
		today.format('YYYY-MM'),
	];

	const colorChip = [
		randomColor[0],
		randomColor[1],
		randomColor[2],
		randomColor[3],
		randomColor[4],
		randomColor[5],
		randomColor[7],
	];

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

	const stackedChartConfig = {
		series: [
			{
				name: 'PRODUCT A',
				data: [44, 55, 41, 67, 22, 43],
				// color: randomColor[0],
			},
			{
				name: 'PRODUCT B',
				data: [13, 23, 20, 8, 13, 27],
				// color: randomColor[1],
			},
			{
				name: 'PRODUCT C',
				data: [11, 17, 15, 15, 21, 14],
				// color: randomColor[2],
			},
			{
				name: 'PRODUCT A',
				data: [44, 55, 41, 67, 22, 43],
				// color: randomColor[0],
			},
			{
				name: 'PRODUCT B',
				data: [13, 23, 20, 8, 13, 27],
				// color: randomColor[1],
			},
			{
				name: 'PRODUCT C',
				data: [11, 17, 15, 15, 21, 14],
				// color: randomColor[2],
			},
		],
		options: {
			chart: {
				type: 'bar',
				height: 350,
				stacked: true,
				stackType: '100%',
				toolbar: {
					show: false,
				},
			},
			responsive: [
				{
					breakpoint: 480,
					options: {
						legend: {
							position: 'bottom',
							offsetX: -10,
							offsetY: 0,
						},
					},
				},
			],
			colors: colorChip,

			xaxis: {
				categories: categories,
			},
			// xaxis: {
			// 	type: 'datetime',
			// 	stepSize: 5,
			// 	label: {
			// 		formatter: undefined,
			// 	},
			// },
			fill: {
				opacity: 1,
			},
			legend: {
				position: 'right',
				offsetX: 0,
				offsetY: 50,
			},
			grid: {
				borderColor: '#f1f1f1',
				show: false,
			},
		},
	};

	const IncomeDonutChartConfig = {
		series: [440, 550, 130, 430, 220],
		options: {
			chart: {
				width: 380,
				type: 'pie',
			},
			labels: ['서비스 이용료', '단발성 수익', '기타'],
			responsive: [
				{
					breakpoint: 480,
					options: {
						chart: {
							width: 200,
						},
						legend: {
							position: 'bottom',
						},
					},
				},
			],
			colors: colorChip,
		},
	};

	const ExpenseDonutChartConfig = {
		series: [440, 550, 130, 15, 21, 14, 1],
		options: {
			chart: {
				width: 380,
				type: 'pie',
			},
			labels: [
				'임대료',
				'추가채용',
				'운영비',
				'마케팅',
				'인건비',
				'SaaS이용료',
				'기타',
			],
			responsive: [
				{
					breakpoint: 480,
					options: {
						chart: {
							width: 200,
						},
						legend: {
							position: 'bottom',
						},
					},
				},
			],
			colors: colorChip,
		},
	};

	/**
	 * 선택된 탭
	 */
	const selectableTab = [
		{
			name: 'Gross',
			value: true,
		},
		{
			name: 'Net',
			value: false,
		},
	];
	/**
	 * 예시 데이터
	 */
	const exampleData = [
		{
			name: 'example',
			data: [
				{ x: '2023-01', y: 1000000 },
				{ x: '2023-02', y: 2000000 },
				{ x: '2023-03', y: 3000000 },
				{ x: '2023-04', y: 4000000 },
				{ x: '2023-05', y: 5000000 },
				{ x: '2023-06', y: 6000000 },
				{ x: '2023-07', y: 7000000 },
				{ x: '2023-08', y: 8000000 },
				{ x: '2023-09', y: 9000000 },
				{ x: '2023-10', y: 10000000 },
				{ x: '2023-11', y: 11000000 },
				{ x: '2023-12', y: 12000000 },
			],
		},
	];

	//* Constants
	/**
	 * 선택 가능한 지표 목록
	 */
	const selectableIndicatorList = [
		{
			name: '재무지표',
		},
		{
			name: '법인계좌관리',
		},
	];

	//* States (2)
	/**
	 * 선택된 지표
	 */
	const [selectedIndicator, setSelectedIndicator] = React.useState(
		selectableIndicatorList[0]
	);

	//* Functions
	/**
	 * 계산 결과 조회
	 */
	const getCalculationResult = () => {
		memberId &&
			bankController.getFinancialRatio(
				{
					APP_MEMBER_IDENTIFICATION_CODE: memberId,
				},
				(res) => {
					// 수입 데이터
					let income = [];
					for (const [key, value] of Object.entries(
						res.data.result.monthlyIncome
					)) {
						income.push({
							x: key,
							y: value,
						});
					}
					// 지출 데이터
					let expense = [];
					for (const [key, value] of Object.entries(
						res.data.result.monthlySpending
					)) {
						expense.push({
							x: key,
							y: value,
						});
					}
					// 순이익 데이터
					let netProfit = [];

					for (const [key, value] of Object.entries(
						res.data.result.monthlyIncome
					)) {
						const value1 = res.data.result.monthlySpending[key];
						netProfit.push({
							x: key,
							y: Number(value) - Number(value1),
						});
					}
					// 데이터 셋팅
					let temp = [
						{
							name: '매출',
							data: income.slice(-12),
						},
						{
							name: '지출',
							data: expense.slice(-12),
							color: '#b40202',
						},
					];
					//수입/지출 데이터 셋팅
					setMonthlyInOut(temp);
					//순이익 데이터 셋팅
					setMonthlyNetProfit([
						{
							name: '순이익',
							data: netProfit.slice(-12),
							color: '#00ff59',
						},
					]);
					//Gross Burn 데이터 셋팅
					setGrossBurn([
						{
							name: 'Gross Burn',
							data: expense.slice(-6),
							color: '#b40202',
						},
					]);
					//Net Burn 데이터 셋팅 - 순이익 데이터를 음수로 변환
					setNetBurn([
						{
							name: 'Net Burn',
							data: netProfit.slice(-6).map((item) => {
								return {
									x: item.x,
									y: item.y * -1,
								};
							}),
							color: '#b40202',
						},
					]);
					setChartData(chartDataConfig);
					setCalculationResult(res.data.result);
					setLoading(false);
				},
				(err) => {}
			);
	};

	/**
	 *
	 * 카테고리별 차트 데이터 조회
	 */
	const getCategoryGraphData = () => {
		// 매출 카테고리별 데이터
		transactionHistoryController.getCategoryGraphData(
			{ TYPE: '매출', APP_MEMBER_IDENTIFICATION_CODE: memberId },
			(res) => {
				// 데이터 셋팅
				setIncomeCategoryData(res.data.result);
				setStackedChart(stackedChartConfig);
				setDonutChart(IncomeDonutChartConfig);
			},
			(err) => {}
		);

		// 지출 카테고리별 데이터
		transactionHistoryController.getCategoryGraphData(
			{ TYPE: '지출', APP_MEMBER_IDENTIFICATION_CODE: memberId },
			(res) => {
				// 데이터 셋팅

				setExpenseCategoryData(res.data.result);

				setStackedChart(stackedChartConfig);
				setExpenseDonutChart(ExpenseDonutChartConfig);
			},
			(err) => {}
		);
	};

	//* Hooks
	/**
	 * 유저 아이디 정보 가져오는 훅
	 */
	const { memberId } = useAppMember();
	/**
	 * 알러트
	 */
	const { open, setOpen, setType, type } = useAlert({});

	/**
	 * 내 계좌 가져오는 훅
	 */
	useEffect(() => {
		if (memberId !== undefined) {
			setLoading(true);
			bankAccountController.updateItem(
				{
					APP_MEMBER_IDENTIFICATION_CODE: memberId,
				},
				(res) => {
					// 계좌가 없을 경우
					if (res.data.result.rows.length === 0) {
						setOpen(true);

						setLoading(false);
						setChartData(chartDataConfig);
						setCalculationResult({
							totalBalance: 100000,
							totalIncome: 100000,
							totalSpending: 100000,
							burnRate: 100000,
							runWay: 3,
							monthlyIncome: {},
							monthlySpending: {},
						});
						setGrossBurn(exampleData);
						setNetBurn(exampleData);
						setMonthlyInOut(exampleData);
						setMonthlyNetProfit(exampleData);
						setIncomeCategoryData({
							rows: [
								{
									name: 'PRODUCT A',
									data: [44, 55, 41, 67, 22, 43],
									color: randomColor[0],
								},
								{
									name: 'PRODUCT B',
									data: [13, 23, 20, 8, 13, 27],
									color: randomColor[1],
								},
								{
									name: 'PRODUCT C',
									data: [11, 17, 15, 15, 21, 14],
									color: randomColor[2],
								},
							],
							total: [440, 550, 130],
						});
						setExpenseCategoryData({
							rows: [
								{
									name: 'PRODUCT A',
									data: [44, 55, 41, 67, 22, 43],
									color: randomColor[0],
								},
								{
									name: 'PRODUCT B',
									data: [13, 23, 20, 8, 13, 27],
									color: randomColor[1],
								},
								{
									name: 'PRODUCT C',
									data: [11, 17, 15, 15, 21, 14],
									color: randomColor[2],
								},
							],
							total: [440, 550, 130, 15, 21, 14, 1],
						});
						setStackedChart(stackedChartConfig);
						setDonutChart(IncomeDonutChartConfig);
						setExpenseDonutChart(ExpenseDonutChartConfig);
					} else {
						getCalculationResult();
						getCategoryGraphData();
						// setIncomeCategoryData({
						// 	rows: [
						// 		{
						// 			name: 'PRODUCT A',
						// 			data: [44, 55, 41, 67, 22, 43],
						// 			color: randomColor[0],
						// 		},
						// 		{
						// 			name: 'PRODUCT B',
						// 			data: [13, 23, 20, 8, 13, 27],
						// 			color: randomColor[1],
						// 		},
						// 		{
						// 			name: 'PRODUCT C',
						// 			data: [11, 17, 15, 15, 21, 14],
						// 			color: randomColor[2],
						// 		},
						// 	],
						// 	total: [440, 550, 130],
						// });
						// setExpenseCategoryData({
						// 	rows: [
						// 		{
						// 			name: 'PRODUCT A',
						// 			data: [44, 55, 41, 67, 22, 43],
						// 			color: randomColor[0],
						// 		},
						// 		{
						// 			name: 'PRODUCT B',
						// 			data: [13, 23, 20, 8, 13, 27],
						// 			color: randomColor[1],
						// 		},
						// 		{
						// 			name: 'PRODUCT C',
						// 			data: [11, 17, 15, 15, 21, 14],
						// 			color: randomColor[2],
						// 		},
						// 	],
						// 	total: [440, 550, 130, 15, 21, 14, 1],
						// });
						// setStackedChart(stackedChartConfig);
						// setDonutChart(IncomeDonutChartConfig);
						// setExpenseDonutChart(ExpenseDonutChartConfig);
					}
				},
				(err) => {
					console.log(err);
					setLoading(false);
				}
			);
		}
	}, [memberId]);

	//* States

	/**
	 * 재계산 트리거 키
	 */
	const [recomputeTriggerKey, setRecomputeTriggerKey] =
		React.useState<string>();

	/**
	 * 계좌 추가 삭제용 트리거키
	 */
	const [accountTriggerKey, setAccountTriggerKey] = React.useState<string>();

	/**
	 * 계좌 히스토리 트리거키
	 */
	const [accountHistoryTriggerKey, setAccountHistoryTriggerKey] =
		React.useState<string>();
	/**
	 * 검색용 키워드
	 */
	const [keyword, setKeyword] = React.useState<string>('');
	/**
	 * 검색 트리거키
	 */
	const [searchTriggerKey, setSearchTriggerKey] = React.useState<string>();
	/**
	 * 선택 연/월 셀렉트 데이터
	 */
	const [selectablePeriodList, setSelectablePeriodList] =
		React.useState<any>();
	/**
	 * 계산 조건 선택한 연/월
	 */
	const [selectedPeriod, setSelectedPeriod] = React.useState<{
		year: number;
		month: number;
	}>();

	/**
	 * 등록한 계좌 리스트
	 */
	const [bankAccountList, setBankAccountList] = React.useState<
		IBankAccount[]
	>([]);

	/**
	 * 계산 결과 데이터
	 */
	// const [calculationResult, setCalculationResult] =
	// 	React.useState<IAccountCalculationResultProps>();

	/**
	 * 바텀 드로워 오픈
	 */
	const [openDrawer, setOpenDrawer] = React.useState(false);

	/**
	 * 로딩
	 */
	// const [loading, setLoading] = React.useState<boolean>(false);

	/**
	 * 첫 로딩
	 */
	const [firstLoading, setFirstLoading] = React.useState<boolean>(true);

	/**
	 *
	 * 카테고리 목록 오픈 여부
	 */
	const [openCategoryList, setOpenCategoryList] = React.useState(false);

	//* Functions
	/**
	 * 계산 결과 조회
	 */
	const getTransactionResult = () => {
		setLoading(true);
		memberId &&
			bankController.getFinancialRatio(
				{
					APP_MEMBER_IDENTIFICATION_CODE: memberId,
				},
				(res) => {
					if (!selectablePeriodList) {
						let temp = [];
						for (const [key, value] of Object.entries(
							res.data.result.monthlyIncome
						)) {
							temp.push({
								value: {
									year: Number(key.split('-')[0]),
									month: Number(key.split('-')[1]),
								},
								label: `${key.split('-')[0]}년 ${
									key.split('-')[1]
								}월`,
							});
						}
						if (temp.length > 0) {
							setSelectablePeriodList(temp);
							setSelectedPeriod(temp[temp.length - 1].value);
						}
					}

					!firstLoading && setLoading(false);
					setCalculationResult(res.data.result);
				},
				(err) => {}
			);
	};
	/**
	 * 계산결과 조회 after first try
	 */

	/**
	 * 내 계좌 가져오는 훅
	 */
	useEffect(() => {
		if (memberId !== undefined) {
			setFirstLoading(false);
			setLoading(true);
			bankAccountController.updateItem(
				{
					APP_MEMBER_IDENTIFICATION_CODE: memberId,
				},
				(res) => {
					if (res.data.result.rows.length === 0) {
						setBankAccountList(res.data.result.rows);
						getTransactionResult();
						setLoading(false);
					} else {
						// setLoading(false);
						setBankAccountList(res.data.result.rows);
						getTransactionResult();
					}
				},
				(err) => {
					console.log(err);
				}
			);
		}

		// memberId !== undefined &&
	}, [accountTriggerKey, memberId]);

	/**
	 * 선택한 날짜 변경 시, 재계산 트리거 키 변경 시 수입 및 지출 재계산하는 api 호출 훅
	 */
	useEffect(() => {
		if (memberId !== undefined && firstLoading === false) {
			setLoading(true);
			getTransactionResult();
		}
	}, [recomputeTriggerKey, memberId]);

	const theme = useTheme();

	return (
		// <InternalServiceDrawer type="dashboard" loading={loading}>
		<Box bgcolor={'primary.light'} sx={{ p: { xs: 2, md: 10 } }}>
			{/* 컨텐츠 레이아웃 */}
			<InternalServiceLayout
				title="재무 지표 관리"
				subTitle="재무 솔루션을 통해 연결된 지표를 관리합니다."
				image="/images/main/indicatorHead.webp"
				mobileImage="/images/main/indicatorHeadMobile.webp"
			>
				{/* 타이틀 */}
				<Box
					display={{ md: 'flex', xs: 'block' }}
					alignItems={'center'}
					justifyContent={'space-between'}
					mb={2}
				>
					<Box display="flex" flexDirection={'column'} gap={1}>
						{/* 지표 (재무지표/법인계좌관리) 선택 영역 */}
						<Box display={'flex'} gap={3}>
							{selectableIndicatorList.map(
								(selectableIndicator) => (
									<Typography
										variant="h5"
										fontWeight={'700'}
										onClick={() => {
											setSelectedIndicator(
												selectableIndicator
											);
										}}
										sx={{
											color:
												selectableIndicator.name ===
												selectedIndicator.name
													? 'primary.main'
													: 'grey',
											cursor: 'pointer',
										}}
									>
										{selectableIndicator.name}
									</Typography>
								)
							)}
						</Box>
						{selectedIndicator.name === '재무지표' && (
							<>
								<Typography
									color={'secondary.dark'}
									px={{ xs: 2, md: 0 }}
									lineHeight={1.5}
								>
									아래 분석 결과는 대시보드에 등록된
									법인계좌의 데이터를 기반으로 계산된
									데이터입니다.
								</Typography>
								{chartData !== undefined &&
									monthlyInOut[0].name == 'example' && (
										<Typography
											color={'error.main'}
											px={{ xs: 2, md: 0 }}
											lineHeight={1.5}
										>
											⚠ 현재 등록된 계좌가 없습니다. 계좌
											관리하러 가기 버튼을 클릭하여 계좌
											등록 후 이용해주세요.(아래 데이터는
											예시 데이터입니다.)
										</Typography>
									)}
								<Typography
									variant="h6"
									fontWeight={'bold'}
									px={{ xs: 2, md: 0 }}
									display={'flex'}
									alignItems={'center'}
									mt={3}
								>
									분석 결과
									<Tooltip
										title="해당 데이터는 현재의 현금흐름(Net Burn Rate)을 기반으로 최근 6개월간의 데이터를 가지고 예측된 데이터입니다. 실제 상황과 다를 수 있습니다."
										arrow
										slotProps={{
											popper: {
												modifiers: [
													{
														name: 'offset',
														options: {
															offset: [0, -14],
														},
													},
												],
											},
										}}
									>
										<IconButton size="small">
											<HelpOutlineIcon fontSize="small" />
										</IconButton>
									</Tooltip>
								</Typography>
								{chartData !== undefined &&
									monthlyInOut[0].name !== 'example' && (
										<Typography
											color={'green'}
											px={{ xs: 2, md: 0 }}
											lineHeight={1.5}
											sx={{
												display: 'flex',
												alignItems: 'center',
												gap: 1,
											}}
										>
											⚠ 예상 투자금을 입력하여 런웨이를
											계산해보세요.
										</Typography>
									)}
							</>
						)}
					</Box>
					{selectedIndicator.name === '재무지표' && (
						<SupportiButton
							contents={'계좌 관리하러 가기'}
							// onClick={() =>
							// 	router.push(
							// 		'/internal_service/financial_solution/account_manage'
							// 	)
							// }
							onClick={() => {
								setSelectedIndicator({ name: '법인계좌관리' });
							}}
							isGradient={true}
							variant="contained"
							style={{
								ml: { xs: 2, md: 0 },
								mt: { xs: 2, md: 0 },
							}}
						/>
					)}
				</Box>
				{selectedIndicator.name === '재무지표' && (
					<>
						{/* 데이터 */}
						{chartData === undefined && (
							<Box
								width={'100%'}
								display={'flex'}
								flexDirection={'column'}
								gap={2}
							>
								<Skeleton
									variant="rounded"
									width={'100%'}
									height={250}
								/>
								<Skeleton
									variant="rounded"
									width={'100%'}
									height={250}
								/>
							</Box>
						)}
						<Box
							display="flex"
							flexDirection={'column'}
							justifyContent={'space-between'}
							// alignItems={'center'}
							pb={1}
							mb={1}
							px={{ sm: 0, xs: 2 }}
							gap={2}
							overflow={'auto'}
						>
							{/* 런웨이 카드 */}
							{calculationResult && (
								<RunwayCard
									setOpenInvestmentModal={
										setOpenInvestmentModal
									}
									runway={
										(calculationResult.totalBalance +
											Number(investment)) /
										Math.ceil(
											netBurn[0]?.data?.reduce(
												(acc, cur) => acc + cur.y,
												0
											) / 6
										)
									}
								/>
							)}
							{/** 차트 */}
							<Box
								width={'100%'}
								display={'flex'}
								flexDirection={{ xs: 'column', sm: 'row' }}
								justifyContent={'space-between'}
								gap={2}
							>
								{/* 전체 순 이익 그래프 */}
								{chartData !== undefined &&
									monthlyNetProfit && (
										<Box
											bgcolor={'white'}
											width={{ sm: '59%', xs: '100%' }}
											py={4}
											px={{ sm: 4, xs: 0 }}
											borderRadius={2}
											display={'flex'}
											flexDirection={'column'}
											justifyContent={'center'}
											gap={1}
										>
											<Typography
												variant="h6"
												fontWeight={'700'}
												textAlign={'center'}
											>
												전체 순이익
											</Typography>
											<Typography
												variant="h4"
												fontWeight={'700'}
												color={'green'}
												textAlign={'center'}
											>
												{monthlyNetProfit[0]?.data
													?.reduce(
														(acc, cur) =>
															acc + cur.y,
														0
													)
													?.toLocaleString()}
												원
											</Typography>
											<Typography
												fontWeight={'500'}
												color={'gray'}
												textAlign={'center'}
												mb={2}
											>
												최근 1년
											</Typography>
											<ReactApexChart
												type="area"
												series={monthlyNetProfit}
												options={chartData.options}
												width={'100%'}
												height={300}
											/>
										</Box>
									)}
								{/* 번레이트 그래프 */}
								{grossBurn && (
									<Box
										bgcolor={'white'}
										width={{ sm: '40%', xs: '100%' }}
										py={4}
										px={{ sm: 4, xs: 0 }}
										borderRadius={2}
										display={'flex'}
										flexDirection={'column'}
										justifyContent={'center'}
										gap={1}
										position={'relative'}
									>
										{/* 필터 변경 */}
										<Box
											sx={{
												border: '1px solid #305DDC',
												borderRadius: '5px',
												width: '90px',
												height: '32px',
												p: 1,
												ml: 'auto',
											}}
											display="flex"
											justifyContent={'space-between'}
											position={'absolute'}
											top={10}
											right={10}
										>
											{selectableTab.map((tab, index) => {
												return (
													<Typography
														fontWeight={'600'}
														color={
															tab.value ===
															netOrGross
																? 'primary.main'
																: 'secondary.dark'
														}
														sx={{
															cursor: 'pointer',
														}}
														onClick={() => {
															setNetOrGross(
																tab.value
															);
														}}
													>
														{tab.name}
													</Typography>
												);
											})}
										</Box>
										<Typography
											variant="h6"
											fontWeight={'700'}
											textAlign={'center'}
											sx={{
												display: 'flex',
												alignItems: 'center',
												justifyContent: 'center',
											}}
										>
											<Tooltip
												title={
													netOrGross
														? '순수하게 지출되는 비용'
														: '수익을 감안한 월 지출비용'
												}
												arrow
												placement="top"
												slotProps={{
													popper: {
														modifiers: [
															{
																name: 'offset',
																options: {
																	offset: [
																		0, -14,
																	],
																},
															},
														],
													},
												}}
											>
												<IconButton size="small">
													<HelpOutlineIcon fontSize="small" />
												</IconButton>
											</Tooltip>
											{netOrGross ? 'Gross' : 'Net'} Burn
											Rate
										</Typography>
										<Typography
											variant="h4"
											fontWeight={'700'}
											color={'#b40202'}
											textAlign={'center'}
										>
											평균{' '}
											{netOrGross
												? Math.ceil(
														grossBurn[0]?.data?.reduce(
															(acc, cur) =>
																acc + cur.y,
															0
														) / 6
												  )?.toLocaleString()
												: Math.ceil(
														netBurn[0]?.data?.reduce(
															(acc, cur) =>
																acc + cur.y,
															0
														) / 6
												  )?.toLocaleString()}
											원/월
										</Typography>
										<Typography
											fontWeight={'500'}
											color={'gray'}
											textAlign={'center'}
											mb={2}
										>
											최근 6개월
										</Typography>
										<ReactApexChart
											type="bar"
											series={
												netOrGross ? grossBurn : netBurn
											}
											options={chartData.options}
											width={'100%'}
											height={300}
										/>
									</Box>
								)}
							</Box>
							{/* 매출/지출 추이 그래프 */}
							{chartData !== undefined && monthlyInOut && (
								<Box
									bgcolor={'white'}
									width={'100%'}
									py={4}
									px={{ sm: 4, xs: 0 }}
									borderRadius={2}
									display={'flex'}
									flexDirection={'column'}
									justifyContent={'center'}
									gap={2}
								>
									<Typography
										variant="h6"
										fontWeight={'700'}
										textAlign={{ xs: 'center', sm: 'left' }}
									>
										매출/지출 추이
									</Typography>
									<Typography
										fontWeight={'500'}
										color={'gray'}
										textAlign={{ xs: 'center', sm: 'left' }}
									>
										최근 1년
									</Typography>
									<ReactApexChart
										type="line"
										series={monthlyInOut}
										options={chartData.options}
										width={'95%'}
										height={300}
									/>
								</Box>
							)}

							{/** 매출 카테고리별 추이 그래프 */}
							<Box
								width={'100%'}
								display={'flex'}
								flexDirection={{ xs: 'column', sm: 'row' }}
								justifyContent={'space-between'}
								gap={2}
							>
								{chartData !== undefined &&
									stackedChart !== undefined &&
									donutChart !== undefined &&
									incomeCategoryData && (
										<Box
											bgcolor={'white'}
											width={{ sm: '100%', xs: '100%' }}
											py={4}
											px={{ sm: 4, xs: 0 }}
											borderRadius={2}
											display={'flex'}
											flexDirection={'column'}
											justifyContent={'center'}
											gap={1}
										>
											<Typography
												variant="h6"
												fontWeight={'700'}
												textAlign={'center'}
											>
												매출 카테고리별 추이
											</Typography>
											<Typography
												fontWeight={'500'}
												color={'gray'}
												textAlign={'center'}
												mb={4}
											>
												최근 6개월
											</Typography>
											<Box
												display="flex"
												width="100%"
												flexWrap={'wrap'}
												gap={2}
												justifyContent="center"
											>
												<Box>
													<Typography
														variant="subtitle1"
														fontWeight={'700'}
														textAlign={'center'}
														mb={2}
													>
														월별 카테고리별 비율
													</Typography>
													<ReactApexChart
														type="bar"
														series={
															incomeCategoryData.rows
														}
														options={
															stackedChart.options
														}
														width={'520px'}
														height={350}
													/>
												</Box>
												<Box>
													<Typography
														variant="subtitle1"
														fontWeight={'700'}
														textAlign={'center'}
														mb={7}
													>
														카테고리별 총 비율
													</Typography>
													<ReactApexChart
														type="pie"
														series={
															incomeCategoryData.total
														}
														options={
															donutChart.options
														}
														width={'410px'}
														height={350}
													/>
												</Box>
											</Box>
										</Box>
									)}
							</Box>

							{/** 지출 카테고리별 추이 그래프 */}
							<Box
								width={'100%'}
								display={'flex'}
								flexDirection={{ xs: 'column', sm: 'row' }}
								justifyContent={'space-between'}
								gap={2}
							>
								{chartData !== undefined &&
									stackedChart !== undefined &&
									donutChart !== undefined &&
									expenseCategoryData && (
										<Box
											bgcolor={'white'}
											width={{ sm: '100%', xs: '100%' }}
											py={4}
											px={{ sm: 4, xs: 0 }}
											borderRadius={2}
											display={'flex'}
											flexDirection={'column'}
											justifyContent={'center'}
											gap={1}
										>
											<Typography
												variant="h6"
												fontWeight={'700'}
												textAlign={'center'}
											>
												지출 카테고리별 추이
											</Typography>
											<Typography
												fontWeight={'500'}
												color={'gray'}
												textAlign={'center'}
												mb={2}
											>
												최근 6개월
											</Typography>
											<Box
												display="flex"
												width="100%"
												flexWrap={'wrap'}
												gap={2}
												justifyContent={'center'}
											>
												<Box>
													<Typography
														variant="subtitle1"
														fontWeight={'700'}
														textAlign={'center'}
													>
														월별 카테고리별 비율
													</Typography>
													<ReactApexChart
														type="bar"
														series={
															expenseCategoryData.rows
														}
														options={
															stackedChart.options
														}
														width={'520px'}
														height={350}
													/>
												</Box>
												<Box>
													<Typography
														variant="subtitle1"
														fontWeight={'700'}
														textAlign={'center'}
														mb={7}
													>
														카테고리별 총 비율
													</Typography>
													<ReactApexChart
														type="pie"
														series={
															expenseCategoryData.total
														}
														options={
															expenseDonutChart.options
														}
														width={'420px'}
														height={300}
													/>
												</Box>
											</Box>
										</Box>
									)}
							</Box>
						</Box>
						{/* 알림창 */}
						<SupportiAlertModal
							open={open}
							handleClose={() => setOpen(false)}
							type={'noAccount'}
						/>
						{/* 예투금 입력 모달 */}
						<InvestmentModal
							modalOpen={openInvestmentModal}
							setModalOpen={setOpenInvestmentModal}
							investment={investment}
							setInvestment={setInvestment}
						/>
					</>
				)}
				{selectedIndicator.name === '법인계좌관리' && (
					<>
						<Box
							position={'relative'}
							bgcolor={theme.palette.primary.light}
							p={{ xs: 0, md: 0 }}
							width={'100%'}
							sx={{
								overflowY: 'scroll',
								'-ms-overflow-style': 'none',
								'&::-webkit-scrollbar': { display: 'none' },
								mb: { xs: 5, md: 20 },
							}}
						>
							{/* 컨텐츠 레이아웃 */}
							{/* <InternalServiceLayout
								title="RunWay/BurnRate"
								subTitle="우리 회사의 법인계좌의 거래내역과 잔액을 조회하고 BurnRate와 RunWay등의 정보를 한눈에 조회할 수 있어요"
								image="/images/main/accountHead.webp"
								mobileImage="/images/main/accountHeadMobile.webp"
							> */}
							<Box>
								{/* <Typography
									variant="h3"
									fontWeight={'bold'}
									sx={{ mb: 2 }}
									px={{ xs: 2, md: 0 }}
								>
									등록계좌 내역
								</Typography> */}
								<Typography
									color={'secondary.dark'}
									sx={{ mb: 2 }}
									px={{ xs: 2, md: 0 }}
									lineHeight={1.5}
								>
									내역 확인을 위해 은행계정(ID/PW)입력 또는
									인증서 등록이 필요합니다. 계좌 등록은 최대
									3개까지 가능합니다.
								</Typography>
								{/* 등록 계좌, 계좌 등록 영역 */}

								<MyAccounts
									setRecomputeTriggerKey={
										setRecomputeTriggerKey
									}
									setAccountTriggerKey={setAccountTriggerKey}
									bankAccountList={bankAccountList}
									calculationResult={calculationResult}
								/>

								{/* 계좌 내역 컨트롤러 영역 (날짜, 거래 내역 검색) */}
								{/* PC */}
								<Box
									width={'100%'}
									display={{ md: 'flex', xs: 'none' }}
									justifyContent={'space-between'}
									alignItems={'center'}
									mb={2}
								>
									{/* 날짜 선택 영역 */}
									<Box
										display={'flex'}
										gap={1}
										alignItems={'center'}
									>
										{selectablePeriodList && (
											<SupportiInput
												type="select"
												value={selectedPeriod}
												setValue={(value) => {
													setSelectedPeriod(value);
												}}
												additionalProps={{
													placeholder: '계좌 선택',
												}}
												dataList={selectablePeriodList}
												width={145}
											/>
										)}
										{/** 카테고리 목록 버튼 */}
										{selectablePeriodList && (
											<Tooltip
												title="거래자명과 카테고리를 연결하여 거래 내역을 분석할 수 있어요"
												sx={{
													position: 'absolute',
													top: 5,
													right: 5,
												}}
												arrow
												slotProps={{
													popper: {
														modifiers: [
															{
																name: 'offset',
																options: {
																	offset: [
																		0, -14,
																	],
																},
															},
														],
													},
												}}
											>
												<Box
													sx={{
														width: {
															sm: 125,
															xs: 40,
														},
														height: 36,
														p: {
															sm: '10px 15px',
															xs: 1,
														},
														border: 'solid 1px #305edccc',
														borderRadius: '5px',
														display: 'flex',
														alignItems: 'center',
														justifyContent:
															'space-between',
														cursor: 'pointer',
													}}
													onClick={() => {
														setOpenCategoryList(
															true
														);
													}}
												>
													<LinkIcon
														sx={{
															width: 20,
															height: 20,
															color: 'primary.main',
														}}
													/>
													<Typography
														variant="body2"
														display={{
															sm: 'block',
															xs: 'none',
														}}
													>
														카테고리 목록
													</Typography>
												</Box>
											</Tooltip>
										)}
									</Box>

									{/* 검색 영역 */}
									{selectablePeriodList && (
										<SupportiInput
											type="search"
											value={keyword}
											setValue={setKeyword}
											additionalProps={{
												placeholder: '거래자명 검색',
											}}
											btnOnClick={() => {
												setSearchTriggerKey(keyword);
											}}
											width={'300px'}
											eraseValue={() => {
												setSearchTriggerKey(undefined);
											}}
										/>
									)}
								</Box>
								{/* Mobile */}
								<Box
									width={'100%'}
									display={{ md: 'none', xs: 'flex' }}
									justifyContent={'space-between'}
									alignItems={'center'}
									bgcolor={'secondary.light'}
								>
									{selectablePeriodList && (
										<SupportiInput
											type="search"
											value={keyword}
											setValue={setKeyword}
											additionalProps={{
												placeholder: '거래자명 검색',
											}}
											btnOnClick={() => {
												setSearchTriggerKey(keyword);
											}}
											width={{ sm: '300px', xs: '45%' }}
											style={{
												bgcolor: 'transparent',
												border: 'none',
											}}
										/>
									)}

									<Box display={'flex'} alignItems={'center'}>
										{selectablePeriodList && (
											<SupportiInput
												type="select"
												value={selectedPeriod}
												setValue={(value) => {
													setSelectedPeriod(value);
												}}
												additionalProps={{
													placeholder: '계좌 선택',
												}}
												dataList={selectablePeriodList}
												width={145}
												style={{
													bgcolor: 'transparent',
													border: 'none',
												}}
											/>
										)}
										{/** 카테고리 목록 버튼 */}
										{selectablePeriodList && (
											<Box
												sx={{
													width: { sm: 125, xs: 40 },
													height: 36,
													p: {
														sm: '10px 15px',
														xs: 1,
													},
													border: 'solid 1px #305edccc',
													borderRadius: '5px',
													display: 'flex',
													alignItems: 'center',
													justifyContent:
														'space-between',
													cursor: 'pointer',
													mr: 1,
												}}
												onClick={() => {
													setOpenCategoryList(true);
												}}
											>
												<LinkIcon
													sx={{
														width: 20,
														height: 20,
														color: 'primary.main',
													}}
												/>
												<Typography
													variant="body2"
													display={{
														sm: 'block',
														xs: 'none',
													}}
												>
													카테고리 목록
												</Typography>
											</Box>
										)}
									</Box>
								</Box>
								{/* 실제 계좌 내역 */}
								{selectablePeriodList &&
									bankAccountList.map((bankAccount, idx) => (
										<Box mb={2} key={idx}>
											<TransactionHistoryTable
												setRecomputeTriggerKey={
													setRecomputeTriggerKey
												}
												bankAccount={bankAccount}
												selectedPeriod={selectedPeriod}
												keyword={searchTriggerKey}
												setLoading={setLoading}
												memberId={memberId}
												openCategoryList={
													openCategoryList
												}
												accountHistoryTriggerKey={
													accountHistoryTriggerKey
												}
												setAccountHistoryTriggerKey={
													setAccountHistoryTriggerKey
												}
											/>
										</Box>
									))}

								{/* 번레이트 계산 */}
								{/* PC */}
								{/* <Box display={{ md: 'flex', xs: 'none' }}>
									<AccountCalculation
										setRecomputeTriggerKey={
											setRecomputeTriggerKey
										}
										calculationResult={calculationResult}
										setLoading={setLoading}
										accountNull={
											bankAccountList.length === 0
										}
									/>
								</Box> */}
								{/* 번레이트 계산 모바일 */}
								{/* mobile */}
								<Box display={{ md: 'none', xs: 'none' }}>
									{openDrawer && (
										<SwipeableDrawer
											anchor="bottom"
											open={openDrawer}
											onClose={() => setOpenDrawer(false)}
											onOpen={() => setOpenDrawer(true)}
											swipeAreaWidth={50}
											disableSwipeToOpen={false}
											ModalProps={{
												keepMounted: true,
											}}
											PaperProps={{
												sx: {
													borderTopLeftRadius: 15,
													borderTopRightRadius: 15,
													bgcolor: 'transparent',
												},
											}}
											sx={{
												'& .MuiModal-backdrop': {
													bgcolor: 'transparent',
												},
											}}
										>
											{/* <Box 
												sx={{
													bottom: 0,
													borderTopLeftRadius: 15,
													borderTopRightRadius: 15,
													visibility: 'visible',
													right: 0,
													left: 0,
													bgcolor: 'transparent',
													backgroundImage: `linear-gradient(to bottom, #26262695, #00000083)`,
													backdropFilter:
														'blur(10px)',
													'-webkit-backdrop-filter':
														'blur(10px)',
													height: '50px',
													display: 'flex',
													alignItems: 'center',
													justifyContent:
														'space-between',
													px: 2,
												}}
											>*/}
											{/* <Box></Box> */}
											<Typography
												sx={{
													p: 2,
													color: 'white',
												}}
												fontWeight={'bold'}
												variant="subtitle1"
												textAlign={'center'}
											>
												분석하기
											</Typography>
											<KeyboardDoubleArrowUpIcon
												sx={{ color: 'white' }}
											/>
											{/* </Box> */}
											{/* <Box
												sx={{
													px: 2,
													pb: 2,
													height: '100%',
													overflow: 'auto',
													backgroundImage: `linear-gradient(to bottom, #26262695, #00000083)`,
													backdropFilter:
														'blur(10px)',
													'-webkit-backdrop-filter':
														'blur(10px)',
												}}
											>
												<AccountCalculation
													setRecomputeTriggerKey={
														setRecomputeTriggerKey
													}
													calculationResult={
														calculationResult
													}
													setLoading={setLoading}
													accountNull={
														bankAccountList.length ===
														0
													}
												/>
											</Box> */}
										</SwipeableDrawer>
									)}
								</Box>
							</Box>
							{/* </InternalServiceLayout> */}
						</Box>

						{/* <Box
							sx={{
								position: 'fixed',
								bottom: 0,
								borderTopLeftRadius: 15,
								borderTopRightRadius: 15,
								visibility: 'visible',
								right: 0,
								left: 0,
								// bgcolor: 'red',
								backgroundImage: `linear-gradient(to bottom, #26262695, #00000083)`,
								backdropFilter: 'blur(10px)',
								'-webkit-backdrop-filter': 'blur(10px)',
								height: '50px',
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'space-between',
								px: 2,
							}}
							display={{ md: 'none', xs: 'flex' }}
						>
							<Box></Box>
							<Typography
								sx={{ p: 2, color: 'white' }}
								fontWeight={'bold'}
								variant="subtitle1"
								textAlign={'center'}
							>
								분석하기
							</Typography>
							<KeyboardDoubleArrowUpIcon
								sx={{ color: 'white' }}
								onClick={() => {
									setOpenDrawer(true);
								}}
							/>
						</Box> */}

						<LinkedCategoryListModal
							modalOpen={openCategoryList}
							setModalOpen={setOpenCategoryList}
							setRecomputeTriggerKey={setAccountHistoryTriggerKey}
						/>
					</>
				)}
			</InternalServiceLayout>
		</Box>
		// </InternalServiceDrawer>
	);
};

export default Page;
