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
		key: 'OWNER_NAME',
		label: '대표자명',
	},
	{
		key: 'ESTABLISHMENT_DATE',
		label: '설립일자',
	},
	{
		key: 'LISTING_DATE',
		label: '상장일자',
	},
	{
		key: 'BUSINESS_NUMBER',
		label: '사업자번호',
	},
	{
		key: 'CORPORATION_NUMBER',
		label: '법인번호',
	},
	{
		key: 'CORPORATE_TYPE',
		label: '기업형태',
	},
	{
		key: 'BUSINESS_SECTOR',
		label: '업종',
	},
	{
		key: 'NUM_OF_EMPLOYEES',
		label: '종업원 수',
		isFromBusinessHistory: true,
		type: 'number',
	},
	{
		key: 'MAIN_BANK',
		label: '주거래은행',
	},
	{
		key: 'COMPANY_NUMBER',
		label: '전화번호',
	},
	{
		key: 'COMPANY_ADDRESS',
		label: '주소',
	},
];

export { businessConfig };
