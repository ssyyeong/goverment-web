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
	// ...
	{
		key: 'DEPRECIATION',
		label: '유형자산, 투자부동산 감가상각비',
		isHighlighted: true,
	},
];

export { financialStatementConfig };
