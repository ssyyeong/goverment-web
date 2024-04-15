interface IMenu {
	label: string;
	path: string;
	icon?: string;
	forBusiness?: boolean;
	submenu?: IMenu[];
}

const dashboardMenu: IMenu[] = [
	// {
	// 	label: '비즈니스 개요',
	// 	path: '/internal_service/business_info',
	// 	icon: '/images/icons/business.svg',
	// 	forBusiness: true,
	// },
	{
		label: '재무 솔루션',
		icon: '/images/icons/financial.svg',
		path: '/internal_service/financial_solution',
		submenu: [
			{
				label: '법인 계좌 RunWay/BurnRate',
				path: '/internal_service/financial_solution/account_manage',
			},

			// {
			// 	label: '재무 정보',
			// 	path: '/internal_service/financial_solution/financial_statement',
			// 	forBusiness: true,
			// },
		],
	},
	{
		label: '지표 관리',
		icon: '/images/icons/indicator.svg',
		path: '/internal_service/indicator_management',
		submenu: [
			{
				label: '성과 지표',
				path: '/internal_service/indicator_management/achievement',
			},
			{
				label: '재무 지표',
				path: '/internal_service/indicator_management/financial',
			},
		],
	},
	{
		label: '지원 사업',
		icon: '/images/icons/government.png',
		path: '/internal_service/government',
		submenu: [
			{
				label: '지원 사업 조회',
				path: '/internal_service/government/research',
			},
			{
				label: '지원 사업 관리',
				path: '/internal_service/government/management',
			},
		],
	},
	// {
	// 	label: '세미나',
	// 	path: '/external_service/seminar',
	// 	icon: '/images/icons/seminar.png',
	// },
	{
		label: 'IR',
		path: '/internal_service/ir',
		icon: '/images/icons/ir.png',
		submenu: [
			{
				label: '자료 관리',
				path: '/internal_service/ir/management',
			},
			{
				label: '데모데이',
				path: '/internal_service/ir/demoday',
			},
		],
	},
	{
		label: 'A2E(Ask to Expert)',
		path: '/internal_service/a2e',
		icon: '/images/icons/expert.png',
	},
	{
		label: '커피챗',
		path: '/internal_service/coffeechat',
		icon: '/images/icons/coffee.png',
	},
	// {
	// 	label: '컨설팅',
	// 	path: '/external_service/consulting',
	// 	icon: '/images/icons/consulting.png',
	// },
	{
		label: '파트너스',
		path: '/partners',
		icon: '/images/icons/seminar.png',
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
	// {
	// 	label: '포인트 히스토리',
	// 	path: '/my_page/point_history',
	// 	icon: '/images/icons/point.png',
	// },
	{
		label: '세미나 히스토리',
		path: '/my_page/seminar_reservation_history',
		icon: '/images/icons/seminar-reservation.png',
	},
	{
		label: '마이쿠폰',
		path: '/my_page/my_cupon',
		icon: '/images/icons/cupon.png',
	},
	{
		label: 'IR 데이터',
		path: '/my_page/ir_data',
		icon: '/images/icons/ir.png',
	},
	// {
	// 	label: 'IR 신청내역',
	// 	path: '/my_page/ir_history',
	// 	icon: '/images/icons/seminar-reservation.png',
	// },
	{
		label: '컨설팅 히스토리',
		path: '/my_page/consulting_reservation_history',
		icon: '/images/icons/consulting-reservation.png',
	},
	{
		label: '커피챗 신청',
		icon: '/images/icons/coffee.png',
		path: '/my_page/coffee_chat',
		submenu: [
			{
				label: '스페셜 커피챗 히스토리',
				path: '/my_page/coffee_chat/special',
			},
			{
				label: '커피챗 히스토리',
				path: '/my_page/coffee_chat/general',
			},
		],
	},
	// {
	// 	label: '대시보드',
	// 	path: '/internal_service/indicator_management/achievement',
	// 	icon: '/images/icons/business.svg',
	// },
];

export { dashboardMenu, mypageMenu };
