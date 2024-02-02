import React from 'react';

import { Box, BoxProps, Typography } from '@mui/material';
import CoffeeChatCard from '../CoffeeChatCard/CoffeeChatCard';
import SupportiModal from '../../../../global/SupportiModal';
import SupportiButton from '../../../../global/SupportiButton';
import CoffeeChatApprovalModal from '../CoffeeChatApprovalModal/CoffeeChatApprovalModal';
import { useRouter } from 'next/router';
import { CookieManager } from '@leanoncompany/supporti-utility';
import DefaultController from '@leanoncompany/supporti-ark-office-project/src/controller/default/DefaultController';

interface ICoffeeChatRecommendModalProps {
	open: boolean;
	handleClose: () => void;
}

const CoffeeChatRecommendModal = (props: ICoffeeChatRecommendModalProps) => {
	//* States
	const [coffeeChatProfileData, setCoffeeChatProfileData] =
		React.useState<any>(null);

	const router = useRouter();
	const cookie = new CookieManager();

	//* Functions
	/**
	 * 오늘 하루 보지 않기
	 */
	const closeToday = () => {
		cookie.setItemInCookies('COFFEE_CHAT_RECOMMEND_MODAL', true, {
			path: '/',
			maxAge: 3600 * 24,
		});
		props.handleClose();
	};
	//* Controller
	const coffeeChatProfileController = new DefaultController(
		'CoffeeChatProfile'
	);
	//* Hooks
	/**
	 * 추천 커피챗 데이터 가져오기
	 */

	React.useEffect(() => {
		if (props.open) {
			coffeeChatProfileController.getOneItemByKey(
				{
					IS_RECOMMENDED: 'Y',
				},
				(res) => {
					if (res.data.result === null) {
						closeToday();
					} else {
						const data = res.data.result;
						data.CAREER = JSON.parse(data.CAREER);
						data.MAIN_FIELD = JSON.parse(data.MAIN_FIELD);
						data.INTEREST_FIELD = JSON.parse(data.INTEREST_FIELD);
						data.SUBJECT = JSON.parse(data.SUBJECT);
						setCoffeeChatProfileData(data);
					}
				}
			);
		}
	}, [props.open]);

	return (
		<SupportiModal
			open={props.open}
			handleClose={closeToday}
			activeHeader={true}
			title="추천 커피챗"
		>
			<Box width={'100%'} mb={2}>
				<Typography fontWeight={'600'} variant="subtitle2">
					서포티에서 추천하는 커피챗을 통해 다양한 사업 경험을
					공유해보세요!
				</Typography>
			</Box>
			<CoffeeChatCard
				isExpand={true}
				userType={
					coffeeChatProfileData?.AppMember?.USER_GRADE === 'GENERAL'
						? '일반'
						: '사업가'
				}
				name={coffeeChatProfileData?.AppMember?.FULL_NAME}
				level={coffeeChatProfileData?.ROLE}
				companyName={coffeeChatProfileData?.COMPANY_NAME}
				description={coffeeChatProfileData?.INTRODUCE}
				career={coffeeChatProfileData?.CAREER}
				mainField={coffeeChatProfileData?.MAIN_FIELD}
				profileImage={coffeeChatProfileData?.PROFILE_IMAGE}
				special={true}
				id={1}
				disabledHover
			/>

			<SupportiButton
				variant="contained"
				contents={
					<Typography
						color={'white'}
						fontWeight={'bold'}
						fontSize={'body2'}
					>
						커피챗 하러 가기
					</Typography>
				}
				onClick={() => {
					closeToday();
					router.push(
						`/internal_service/coffeechat/${coffeeChatProfileData?.APP_MEMBER_IDENTIFICATION_CODE}?special=false`
					);
				}}
				isGradient
				disabledGutters
				style={{
					px: 6,
					py: 2,
					fontSize: '0.8rem !important',
					mt: 2,
				}}
			/>
		</SupportiModal>
	);
};

export default CoffeeChatRecommendModal;
