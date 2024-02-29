import React, { useEffect, useState } from 'react';

import { NextPage } from 'next';

import {
	Box,
	BoxProps,
	IconButton,
	Skeleton,
	Tooltip,
	Typography,
} from '@mui/material';
import InternalServiceDrawer from '../../../../src/views/local/internal_service/common/InternalServiceDrawer';
import { InternalServiceLayout } from '../../../../src/views/layout/InternalServiceLayout';
import dynamic from 'next/dynamic';
import { BankController } from '../../../../src/controller/BankController';
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
			bankAccountController.findAllItems(
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
					} else {
						getCalculationResult();
					}
				},
				(err) => {
					console.log(err);
					setLoading(false);
				}
			);
		}
	}, [memberId]);

	return (
		<InternalServiceDrawer type="dashboard" loading={loading}>
			<Box bgcolor={'primary.light'} sx={{ p: { sm: 5, xs: '0' } }}>
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
							<Typography
								variant="h4"
								fontWeight={'bold'}
								px={{ xs: 2, md: 0 }}
							>
								재무 지표
							</Typography>
							<Typography
								color={'secondary.dark'}
								px={{ xs: 2, md: 0 }}
								lineHeight={1.5}
							>
								아래 분석 결과는 대시보드에 등록된 법인계좌의
								데이터를 기반으로 계산된 데이터입니다.
							</Typography>
							{chartData !== undefined &&
								monthlyInOut[0].name == 'example' && (
									<Typography
										color={'error.main'}
										px={{ xs: 2, md: 0 }}
										lineHeight={1.5}
									>
										⚠ 현재 등록된 계좌가 없습니다. 계좌
										관리하러 가기 버튼을 클릭하여 계좌 등록
										후 이용해주세요.(아래 데이터는 예시
										데이터입니다.)
									</Typography>
								)}
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
										<Typography
											sx={{
												textDecoration: 'underline',
												cursor: 'pointer',
											}}
											onClick={() => {
												setOpenInvestmentModal(true);
											}}
										>
											입력하기
										</Typography>
									</Typography>
								)}
						</Box>
						<SupportiButton
							contents={'계좌 관리하러 가기'}
							onClick={() =>
								router.push(
									'/internal_service/financial_solution/account_manage'
								)
							}
							isGradient={true}
							variant="contained"
							style={{
								ml: { xs: 2, md: 0 },
								mt: { xs: 2, md: 0 },
							}}
						/>
					</Box>
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
								runway={
									(calculationResult.totalBalance +
										investment) /
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
							{chartData !== undefined && monthlyNetProfit && (
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
												(acc, cur) => acc + cur.y,
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
														tab.value === netOrGross
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
										{netOrGross ? 'Gross' : 'Net'} Burn Rate
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
				</InternalServiceLayout>
			</Box>
		</InternalServiceDrawer>
	);
};

export default Page;
