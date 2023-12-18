interface IMenu {
	label: string;
	path: string;
	icon?: string;
	forBusiness?: boolean;
	submenu?: IMenu[];
}

const dashboardMenu: IMenu[] = [
	{
		label: '비즈니스 개요',
		path: '/internal_service/business_info',
		icon: '/images/icons/business.svg',
		forBusiness: true,
	},
	{
		label: '재무 솔루션',
		icon: '/images/icons/financial.svg',
		path: '/internal_service/financial_solution',
		submenu: [
			{
				label: '법인 계좌 RunWay/BurnRate',
				path: '/internal_service/financial_solution/account_manage',
			},
			{
				label: '재무 정보',
				path: '/internal_service/financial_solution/financial_statement',
			},
		],
	},
	{
		label: '지표 관리',
		icon: '/images/icons/indicator.svg',
		path: '/internal_service/indicator_management',
		submenu: [
			{
				label: '성과 지표',
				path: '/internal_service/indicator_management',
			},
		],
	},
	{
		label: '세미나',
		path: '/external_service/seminar',
		icon: '/images/icons/seminar.png',
	},
	{
		label: '컨설팅',
		path: '/external_service/consulting',
		icon: '/images/icons/consulting.png',
	},
	{
		label: '마이페이지',
		path: '/my_page/edit_profile',
		icon: '/images/icons/mypage.svg',
	},
];

const mypageMenu: IMenu[] = [
	{
		label: '프로필 수정',
		path: '/my_page/edit_profile',
		icon: '/images/icons/profile.png',
	},
	{
		label: '결제 히스토리',
		path: '/my_page/payment_history',
		icon: '/images/icons/payment.png',
	},
	{
		label: '포인트 히스토리',
		path: '/my_page/point_history',
		icon: '/images/icons/point.png',
	},
	{
		label: '세미나 히스토리',
		path: '/my_page/seminar_reservation_history',
		icon: '/images/icons/seminar-reservation.png',
	},
	{
		label: '컨설팅 히스토리',
		path: '/my_page/consulting_reservation_history',
		icon: '/images/icons/consulting-reservation.png',
	},
];

export { dashboardMenu, mypageMenu };
