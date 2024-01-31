import React, { useEffect, useState } from 'react';

import { Box, BoxProps, Grid, Typography } from '@mui/material';
import Image from 'next/image';
import DefaultController from '@leanoncompany/supporti-ark-office-project/src/controller/default/DefaultController';
import { businessSector } from '../../../../../../configs/data/BusinessConfig';
import CoffeeChatCard from '../CoffeeChatCard/CoffeeChatCard';
import Nodata from '../../../../global/NoData/NoData';
import { profile } from 'console';
import { useRouter } from 'next/router';
import { useUserAccess } from '../../../../../hooks/useUserAccess';
import useAlert from '../../../../../hooks/useAlert/useAlert';
import { SupportiAlertModal } from '../../../../global/SupportiAlertModal';
interface IGeneralCoffeeChatProps {
	triggerKey?: string;
}

const GeneralCoffeeChat = (props: IGeneralCoffeeChatProps) => {
	//* State
	/**
	 * 선택된 필터
	 */
	const [selectedFilter, setSelectedFilter] = useState<string[]>([]);
	/**
	 * 커피챗 리스트
	 */
	const [coffeeChatList, setCoffeeChatList] = useState<
		{ [key: string]: any }[]
	>([
		{
			profileImage: '/assets/images/default_profile.png',
		},
		{
			profileImage: '/assets/images/default_profile.png',
		},
		{
			profileImage: '/assets/images/default_profile.png',
		},
		{
			profileImage: '/assets/images/default_profile.png',
		},
	]);
	//* Controller
	const coffeeChatController = new DefaultController('GeneralCoffeeChat');

	//* Hooks
	/**
	 * 트리거키가 변경되면 선택 필터 초기화
	 */
	useEffect(() => {
		setSelectedFilter([]);
	}, [props.triggerKey]);
	/**
	 * 커피챗 리스트 조회
	 */
	useEffect(() => {
		console.log(selectedFilter);
	}, [selectedFilter.length]);
	/**
	 * 페이지 진입 시 유저 권한 검사 (구독검사)
	 */
	const isSubscription = useUserAccess('SUBSCRIPTION');
	/**
	 * 페이지 진입 시 유저 권한 검사 (커피챗검사)
	 */
	const isCoffeeChat = useUserAccess('COFFEE_CHAT');
	/**
	 * 알러트
	 */
	const { open, setOpen, setType, type } = useAlert({});

	const router = useRouter();

	return (
		<Box mt={5} width={'100%'}>
			<Box
				display={'flex'}
				justifyContent={'space-between'}
				alignItems={'center'}
				width={'100%'}
			>
				{/* 타이틀 */}
				<Typography variant="h5" fontWeight={'700'}>
					서포티 커피챗
				</Typography>
				{/* 내 커피챗 프로필보기 */}
				<Box
					display={'flex'}
					alignItems={'center'}
					sx={{
						cursor: 'pointer',
					}}
					gap={1}
					onClick={() => {
						// 구독회원 체크
						if (isSubscription.access !== true) {
							setOpen(true);
							setType('subscribe');
							return;
						}
						// 커피챗 프로필 유무 체크
						if (isCoffeeChat.access !== true) {
							setOpen(true);
							setType('coffeechatprofilemissing');
							return;
						}
						router.push('/internal_service/coffeechat/1');
					}}
				>
					<Image
						src="/images/icons/profile.png"
						alt="coffeeico"
						width={18}
						height={18}
					/>
					<Typography fontWeight={'600'}>
						내 커피챗 프로필 보기
					</Typography>
				</Box>
			</Box>
			{/* 필터 */}
			<Box
				display={'flex'}
				// flexDirection={'column'}
				gap={1}
				mt={5}
				width={'100%'}
				flexWrap={'wrap'}
				mb={3}
			>
				{businessSector.map((sector) => (
					<Box
						display={'flex'}
						alignItems={'center'}
						sx={{
							cursor: 'pointer',
							bgcolor: selectedFilter.includes(sector)
								? 'primary.main'
								: 'white',
							px: 2,
							py: 1,
							borderRadius: 2,
							mb: 1,
						}}
						gap={1}
						onClick={() => {
							if (selectedFilter.includes(sector)) {
								setSelectedFilter(
									selectedFilter.filter(
										(filter) => filter !== sector
									)
								);
							} else {
								setSelectedFilter([...selectedFilter, sector]);
							}
						}}
					>
						<Typography
							fontWeight={'600'}
							sx={{
								color: selectedFilter.includes(sector)
									? 'white'
									: 'black',
							}}
						>
							{sector}
						</Typography>
					</Box>
				))}
			</Box>
			{/* 커피챗 리스트 */}
			<Grid container gap={2}>
				{coffeeChatList.length !== 0 &&
					coffeeChatList.map((coffeeChat, idx) => (
						<Grid item xs={12} sm={5.5} md={3.8} key={idx}>
							<CoffeeChatCard
								// isExpand={true}
								userType="사업가"
								name="김대표"
								level="대표"
								companyName="서포티"
								description="안녕하세요. 서포티 대표 김대표입니다. 저희 서포티는 대표님들의 성공을 위해 최선을 다하고 있습니다. 많은 관심 부탁드립니다.많은 관심 부탁드립니다.많은 관심 부탁드립니다."
								career={[
									'서포티 대표',
									'서포티 대표',
									'서포티 대표',
								]}
								mainField={[
									'서포티 대표',
									'서포티 대표',
									'서포티 대표',
								]}
								special={false}
								id={1}
							/>
						</Grid>
					))}
				{/* 데이터 없을 때 */}
				{coffeeChatList.length === 0 && <Nodata />}
			</Grid>
			{/* 알림창 */}
			<SupportiAlertModal
				open={open}
				handleClose={() => setOpen(false)}
				type={type}
			/>
		</Box>
	);
};

export default GeneralCoffeeChat;
