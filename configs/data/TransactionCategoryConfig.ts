const TransactionCategoryConfig = {
	매출: {
		subCategory: [
			{
				label: '서비스 이용료',
				value: 'SERVICE_FEE',
			},
			{
				label: '단발성 수익',
				value: 'ONE_TIME_PROFIT',
			},
		],
	},
	지출: {
		subCategory: [
			{
				label: '인건비',
				value: 'PERSONAL_EXPENSES',
			},
			{
				label: 'SaaS이용료',
				value: 'SAAS_USAGE_FEE',
			},
			{
				label: '임대료',
				value: 'RENT_FEE',
			},
			{
				label: '추가채용',
				value: 'ADDITIONAL_RECRUITMENT',
			},
			{
				label: '운영비',
				value: 'OPERATING_EXPENSES',
			},
			{
				label: '마케팅',
				value: 'MARKETING_EXPENSES',
			},
		],
	},
};

export { TransactionCategoryConfig };
