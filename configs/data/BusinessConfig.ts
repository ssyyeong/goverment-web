/**
 * 비즈니스 개요 관련 키맵핑
 */
const businessConfig: {
	key: string;
	label: string;
	isFromBusinessHistory?: boolean;
	type?: string;
}[] = [
	{
		key: 'COMPANY_NAME',
		label: '기업명',
	},
	{
		key: 'NUM_OF_EMPLOYEES',
		label: '종업원 수',
		isFromBusinessHistory: true,
		type: 'number',
	},
	// ...
];

export { businessConfig };
