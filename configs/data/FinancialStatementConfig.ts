/**
 * 재무제표 관련 키맵핑
 */
const financialStatementConfig: {
	key: string;
	label: string;
	isHighlighted?: boolean; // 강조 표시된 애들
}[] = [
	{
		key: 'PROFIT',
		label: '수익',
	},
	{
		key: 'OPERATING_PROFIT',
		label: '영업이익(손실)',
	},
	{
		key: 'NET_INCOME',
		label: '당기순이익(손실)',
	},
	{
		key: 'FINANCIAL_COST',
		label: '금융비용(매출채권매각손실포함)',
	},
	{
		key: 'DEPRECIATION',
		label: '유형자산, 투자부동산 감가상각비',
		isHighlighted: true,
	},
	{
		key: 'DEPRECIATION_AND_AMORTIZATION',
		label: '감가상각비(손익계산서)',
	},
	{
		key: 'AMORTIZATION',
		label: '무형자산상각비(손익계산서)',
		isHighlighted: true,
	},
	{
		key: 'TOTAL_ASSETS',
		label: '자산총계',
	},
	{
		key: 'TOTAL_BORROWINGS',
		label: '총차입금',
	},
	{
		key: 'TOTAL_EQUITY',
		label: '자본총계',
	},
	{
		key: 'CAPITAL_STOCK',
		label: '자본금',
		isHighlighted: true,
	},
	{
		key: 'CASH_FLOW_FROM_OPERATING',
		label: '영업활동조달현금',
	},
	{
		key: 'CASH_OPERATING_PROFIT',
		label: '현금영업이익',
	},
	{
		key: 'RETURN_ON_TOTAL_EQUITY',
		label: '총자본순이익율',
	},
	{
		key: 'RETURN_ON_EQUITY',
		label: '자기 자본 순이익율',
	},
	{
		key: 'OPERATING_PROFIT_MARGIN',
		label: '매출액 영업 이익율',
	},
	{
		key: 'INTEREST_TO_REVENUE_RATIO',
		label: '금융비용/매출액 비율',
	},
	{
		key: 'PBT_AND_INTEREST_TO_REVENUE_RATIO',
		label: '법인세 차감 전 순이익 이자 보상 비율',
	},
	{
		key: 'CAPITAL_ADEQUACY_RATIO',
		label: '자기 자본 비율',
	},
	{
		key: 'BORROWINGS_TO_TOTAL_ASSETS_RATIO',
		label: '차입금 의존도',
	},
	{
		key: 'DEBT_TO_REVENUE_RATIO',
		label: '차입금/매출액 비율',
	},
	{
		key: 'CURRENT_RATIO',
		label: '유동 비율',
	},
	{
		key: 'DEBT_RATIO',
		label: '부채 비율',
	},
	{
		key: 'DSCR',
		label: '부채상환계수',
	},
	{
		key: 'TOTAL_ASSETS_TURNOVER',
		label: '총 자본 회전율',
	},
	{
		key: 'REVENUE_GROWTH_RATE',
		label: '매출액 증가율',
	},
];

export { financialStatementConfig };
