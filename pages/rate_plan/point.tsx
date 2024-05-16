import { Box, Grid, Stack, Switch, Typography } from '@mui/material';
import DefaultController from '@leanoncompany/supporti-ark-office-project/src/controller/default/DefaultController';
import { NextPage } from 'next';
import React, { useEffect } from 'react';
import CheckIcon from '@mui/icons-material/Check';
import { useRouter } from 'next/router';
import { useUserAccess } from '../../src/hooks/useUserAccess';
import { useAppMember } from '../../src/hooks/useAppMember';
import Image from 'next/image';
import SupportiButton from '../../src/views/global/SupportiButton';

const Page: NextPage = () => {
	//* Modules
	const ratePlanController = new DefaultController('SubscriptionProduct');
	const userSubscriptionController = new DefaultController(
		'UserSubscription'
	);
	const { memberId } = useAppMember();
	const router = useRouter();

	//* Constants
	/**
	 * 상단 고정 컨텐트
	 */
	const topContents = [
		{
			title: '세미나',
		},
		{
			title: '1:1 전문가 멘토링',
		},
		{
			title: 'MVP 교육 프로그램',
		},
		{
			title: '투자자 매칭 서비스',
		},
		{
			title: '경영 지원(자금) 대행 서비스',
		},
		// {
		// 	title: '파트너사 제공 서비스 이용',
		// 	description: [
		// 		'AWS $5000 크레딧',
		// 		'세무기장 서비스 3개월 무료',
		// 		'세무 법무 특허 노무 24시간 Q&A',
		// 	],
		// },
		// {
		// 	title: '사업, 투자전략 코칭 혜택',
		// 	description: [
		// 		'투자자 1:1 IR Deck 코칭 (60분)',
		// 		'투자전략, 사업전략 전문가 커피챗 2회 (각 1시간) / 월',
		// 		'월1회 프리미엄 강의 / 세미나 진행',
		// 		'주1회 사업, 투자전략 온라인 Open Discussion 진행',
		// 	],
		// },
		// {
		// 	title: '서포티에서만 이용할 수 있는 부가 서비스',
		// 	description: [
		// 		'투자전략, 사업전략 24시간 Q&A',
		// 		'투자자 매칭 서비스 (1회) : 단건 주단위 투자 관점 사업 마일스톤, 재무관리 서비스',
		// 		'CEO 사업 Todo, 루틴관리 서비스',
		// 		'마케팅 컨설팅 서비스 (1회)',
		// 	],
		// 	add: '* 해당서비스는 유료서비스입니다.',
		// },
	];

	//* States

	/**
	 * 구독 정보
	 */
	const [subscriptionInfo, setSubscriptionInfo] = React.useState<any>({});

	//* Hooks
	const { access } = useUserAccess('SIGN_IN');

	/**
	 * 구독권 정보 가져오기
	 */
	useEffect(() => {
		memberId &&
			userSubscriptionController.getOneItemByKey(
				{
					APP_MEMBER_IDENTIFICATION_CODE: memberId,
					EXPIRED_YN: 'N',
					CANCELED_YN: 'N',
				},
				(res) => {
					setSubscriptionInfo(res.data.result);
				},
				(err) => {
					console.log(err);
				}
			);
	}, [memberId]);

	/**
	 * 요금제 리스트 조회
	 */
	useEffect(() => {
		ratePlanController.findAllItems(
			{
				SORT_KEY: 'ORDER',
				SORT_DIRECTION: 'ASC',
				ACTIVATED_YN: 'Y',
			},
			(res) => {
				// setRatePlanList(res.data.result.rows);
			},
			(err) => {}
		);
	}, []);

	const label = { inputProps: { 'aria-label': 'Color switch demo' } };

	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'center',
				alignItems: 'center',
				width: '100%',
				px: { sm: 5, xs: 2 },

				bgcolor: 'primary.light',
			}}
		>
			<Box
				sx={{
					borderRadius: 3,
					bgcolor: 'white',
					minWidth: '80%',
					minHeight: '350px',
					boxShadow:
						'4px 17px 40px rgba(138.13, 138.13, 138.13, 0.15)',
					mt: 2,
					my: 5,
					p: 5,
					textAlign: 'center',
				}}
			>
				<Typography variant="h6">
					원하는 부가 서비스를 지금 바로 구매해보세요!
				</Typography>
				<Box
					display="flex"
					gap={2}
					flexWrap="wrap"
					justifyContent="center"
				>
					{topContents.map((item, index) => {
						return (
							<Box
								sx={{
									borderRadius: 2,
									bgcolor: 'white',
									minWidth: '18%',
									minHeight: '150px',
									boxShadow:
										'4px 17px 40px rgba(138.13, 138.13, 138.13, 0.15)',
									mt: 2,
									my: 5,
									p: 3,
								}}
							>
								<Typography>{item.title}</Typography>
							</Box>
						);
					})}
				</Box>
				<Typography variant="body1" color="primary.main">
					(보다 상세한 프로그램 가격은 부가서비스 상세페이지를 통해
					확인해주세요!)
				</Typography>
			</Box>

			{/** 포인트 구매 메뉴 */}
			<Box
				sx={{
					borderRadius: 3,
					minWidth: '80%',
					mt: 2,
					my: 5,
					textAlign: 'center',
				}}
			>
				<Box
					display="flex"
					gap={2}
					flexWrap="wrap"
					justifyContent="center"
				>
					{topContents.map((item, index) => {
						return (
							<Box
								sx={{
									borderRadius: 1,
									bgcolor: 'white',
									minWidth: '18%',
									minHeight: '250px',
									boxShadow:
										'4px 17px 40px rgba(138.13, 138.13, 138.13, 0.15)',
									mt: 2,
									my: 5,
									pl: 2,
									pb: 3,
									textAlign: 'left',
									mx: 'auto',
								}}
							>
								<Box
									bgcolor="red"
									sx={{
										width: '70px',
										height: '30px',
										ml: 'auto',
										mb: 3,
										justifyContent: 'center',
										display: 'flex',
										borderRadius: '1px',
									}}
								>
									<Typography color="white" my="auto">
										3%
									</Typography>
								</Box>
								<Typography>{item.title}</Typography>
								<Typography
									variant="h3"
									color="primary.main"
									mr="auto"
								>
									10 P
								</Typography>
								<SupportiButton
									onClick={() => {
										router.push('/rate_plan/point');
									}}
									style={{
										height: '40px',
										width: '90%',
										mx: 'auto',
										mt: 2,
									}}
									variant="outlined"
									contents="구매하기"
								/>
							</Box>
						);
					})}
				</Box>
			</Box>
		</Box>
	);
};

export default Page;
