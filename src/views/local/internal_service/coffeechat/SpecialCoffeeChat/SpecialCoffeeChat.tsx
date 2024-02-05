import React, { useEffect, useState } from 'react';

import { Box, BoxProps, Typography } from '@mui/material';
import DefaultController from '@leanoncompany/supporti-ark-office-project/src/controller/default/DefaultController';
import CoffeeChatCard from '../CoffeeChatCard/CoffeeChatCard';

interface ISpecialCoffeeChatProps {}

const SpecialCoffeeChat = (props: ISpecialCoffeeChatProps) => {
	//* State
	/**
	 * 커피챗 리스트
	 */
	const [coffeeChatList, setCoffeeChatList] = useState<
		{ [key: string]: any }[]
	>([]);
	//* Function

	//* Controller
	const coffeeChatController = new DefaultController(
		'SpecialCoffeeChatProduct'
	);
	//* Hooks
	/**
	 * 커피챗 리스트 조회
	 */
	useEffect(() => {
		coffeeChatController.findAllItems(
			{
				PURCHASE_AVAILABLE_YN: 'Y',
			},
			(res) => {
				setCoffeeChatList(res.data.result.rows);
			}
		);
	}, []);
	return (
		<Box>
			<Box display={'flex'} flexDirection={'column'} gap={1}>
				{/* 타이틀 */}
				<Typography variant="h5" fontWeight={'700'}>
					스페셜 커피챗
				</Typography>
				<Typography>
					평소에 모시기 힘든 분들을 저희 서포티에서 어렵게 모셨습니다!
					서포티에서 특별히 진행되는 스페셜한 대표님들과의 커피챗을
					진행해보세요!
				</Typography>
				{/* 리스트 */}
				<Box
					display={'flex'}
					p={3}
					borderRadius={2}
					bgcolor={'#DCE2F9'}
					gap={2}
					sx={{
						overflowX: 'auto',
						'-ms-overflow-style': 'none',
						'&::-webkit-scrollbar': {
							height: '5px !important',
							backgroundColor: 'white !important',
							padding: '0.5px',
							borderRadius: '20px',
						},
						'&::-webkit-scrollbar-thumb': {
							backgroundColor: '#305edccc',
							borderRadius: '20px',
						},
					}}
					mt={2}
				>
					{/* 리스트 아이템 */}
					{coffeeChatList.length !== 0 &&
						coffeeChatList.map((coffeeChat, idx) => (
							<CoffeeChatCard
								isExpand={true}
								userType="사업가"
								name={coffeeChat?.PartnerMember?.FULL_NAME}
								level={coffeeChat.ROLE}
								companyName={coffeeChat.COMPANY_NAME}
								description={coffeeChat.INTRODUCE}
								career={
									coffeeChat.CAREER &&
									JSON.parse(coffeeChat.CAREER)
								}
								mainField={
									coffeeChat.MAIN_FIELD &&
									JSON.parse(coffeeChat.MAIN_FIELD)
								}
								special={true}
								profileImage={
									coffeeChat.PROFILE_IMAGE &&
									JSON.parse(coffeeChat.PROFILE_IMAGE)[0]
								}
								id={
									coffeeChat.SPECIAL_COFFEE_CHAT_PRODUCT_IDENTIFICATION_CODE
								}
							/>
						))}
					{/* 데이터 없을 때 */}
					{coffeeChatList.length === 0 && (
						<Box
							display={'flex'}
							justifyContent={'center'}
							alignItems={'center'}
							width={'100%'}
						>
							<Typography variant={'body2'}>
								빠른 시일 내에 스페셜한 분으로 모셔오겠습니다 :)
							</Typography>
						</Box>
					)}
				</Box>
			</Box>
		</Box>
	);
};

export default SpecialCoffeeChat;
