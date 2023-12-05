import React from 'react';
import { ISideBar } from '@qillie-corp/ark-office-project/src/@types/layout/sideBar/sideBar';
// 회원.
import PeopleAltRoundedIcon from '@mui/icons-material/PeopleAltRounded';
// 약관
import GavelRoundedIcon from '@mui/icons-material/GavelRounded';
// 게시판
import ViewListRoundedIcon from '@mui/icons-material/ViewListRounded';
// 공지사항
import ReportIcon from '@mui/icons-material/Report';
// 통계
import EqualizerRoundedIcon from '@mui/icons-material/EqualizerRounded';
// 포인트
import MonetizationOnRoundedIcon from '@mui/icons-material/MonetizationOnRounded';
// 카테고리
import CategoryRoundedIcon from '@mui/icons-material/CategoryRounded';

// 상품
import StorefrontRoundedIcon from '@mui/icons-material/StorefrontRounded';
// 주문
import LocalShippingRoundedIcon from '@mui/icons-material/LocalShippingRounded';

import SmartToyRoundedIcon from '@mui/icons-material/SmartToyRounded';

const sideBarConfig: ISideBar = {
	menuHeight: 40,
	loginLink: 'auth/sign_in',
	menuSets: [
		{
			label: '프로필',
			link: 'setting',
			hide: true,
			menus: [],
		},
		{
			label: '회원',
			link: 'auth',
			hide: true,
			menus: [
				{
					label: '계정 찾기',
					link: 'find_account',
					children: [],
				},
				{
					label: '로그인',
					link: 'sign_in',
					children: [],
				},
				{
					label: '회원가입',
					link: 'sign_up',
					children: [],
				},
			],
		},
		{
			label: '일반',
			link: 'basic',
			menus: [
				{
					label: '회원',
					icon: <PeopleAltRoundedIcon />,
					link: 'member',
					children: [
						{
							label: '관리자',
							link: 'admin_member',
							children: [],
						},
						{
							label: '일반회원',
							link: 'app_member',
							children: [],
						},
					],
				},
				{
					label: '약관',
					link: 'term',
					icon: <GavelRoundedIcon />,
					children: [
						{
							label: '서비스',
							link: 'marketing',
							children: [],
						},
						{
							label: '마케팅',
							link: 'privacy',
							children: [],
						},
						{
							label: '개인정보',
							link: 'service',
							children: [],
						},
					],
				},
				{
					label: '게시판',
					icon: <ViewListRoundedIcon />,
					link: 'board',
					children: [
						{ label: '이벤트', link: 'event', children: [] },
						{
							label: '공지',
							icon: <ReportIcon />,
							link: 'notice',
							children: [],
						},
						{ label: '자주묻는질문', link: 'faq', children: [] },
						{ label: '1:1문의', link: 'qna', children: [] },
					],
				},
				{
					label: '통계',
					link: 'statistics',
					icon: <EqualizerRoundedIcon />,
					children: [
						{ label: '구매', link: 'purchase', children: [] },
					],
				},
			],
		},
		{
			label: '쇼핑몰',
			link: 'ecommerce',
			hide: true,
			menus: [
				{
					label: '포인트',
					icon: <MonetizationOnRoundedIcon />,
					link: 'point',
					children: [],
				},
				{
					label: '카테고리',
					icon: <CategoryRoundedIcon />,
					link: 'category',
					children: [],
				},
				{
					label: '상품',
					icon: <StorefrontRoundedIcon />,
					link: 'product',
					children: [
						{
							label: '전체',
							link: '',
							children: [],
						},
					],
				},
				{
					label: '문의 및 리뷰',
					icon: <ViewListRoundedIcon />,
					link: 'board',
					children: [
						{ label: '상품 문의', link: 'qna', children: [] },
						{ label: '상품 리뷰', link: 'review', children: [] },
					],
				},
				{
					label: '주문',
					link: 'order',
					icon: <LocalShippingRoundedIcon />,
					children: [
						{
							label: '전체',
							link: '',
							children: [],
						},
						{
							label: '배송준비',
							link: './?STATUS=PURCHASED',
							children: [],
						},
						{
							label: '배송중',
							link: './?STATUS=DURING_SHIPMENT',
							children: [],
						},
						{
							label: '취소요청',
							link: './?STATUS=RETURN',
							children: [],
						},
						{
							label: '반품 배송중',
							link: './?STATUS=DURING_RETURN_SHIPMENT',
							children: [],
						},
						{
							label: '배송완료',
							link: './?STATUS=COMPLETE',
							children: [],
						},
					],
				},
			],
		},
	],
};

export default sideBarConfig;
