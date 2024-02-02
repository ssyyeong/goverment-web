import React from 'react';

import { Box, BoxProps, Typography } from '@mui/material';
import CoffeeChatCard from '../CoffeeChatCard/CoffeeChatCard';
import SupportiModal from '../../../../global/SupportiModal';
import SupportiButton from '../../../../global/SupportiButton';
import CoffeeChatApprovalModal from '../CoffeeChatApprovalModal/CoffeeChatApprovalModal';
import useWindowWidth from '../../../../../hooks/useWindowWidth/useWindowWidth';

interface ICoffeeChatProfileShownModalProps {
	open: boolean;
	handleClose: () => void;
	coffeeChatProfileData?: any;
}

const CoffeeChatProfileShownModal = (
	props: ICoffeeChatProfileShownModalProps
) => {
	console.log(props.coffeeChatProfileData);
	//* States
	/**
	 * 커피챗 수락 모달 오픈 여부
	 */
	const [coffeeChatApprovalModal, setCoffeeChatApprovalModal] =
		React.useState<boolean>(false);

	const { width } = useWindowWidth();

	return (
		<SupportiModal
			open={props.open}
			handleClose={props.handleClose}
			activeHeader={false}
			style={{
				minWidth: 350,
			}}
		>
			{props.coffeeChatProfileData && (
				<CoffeeChatCard
					isExpand={width > 800}
					userType={
						props.coffeeChatProfileData?.AppMember?.USER_GRADE ===
						'GENERAL'
							? '일반'
							: '사업가'
					}
					name={props.coffeeChatProfileData?.AppMember?.FULL_NAME}
					level={props.coffeeChatProfileData?.CoffeeChatProfile?.ROLE}
					companyName={
						props.coffeeChatProfileData?.CoffeeChatProfile
							?.COMPANY_NAME
					}
					description={
						props.coffeeChatProfileData?.CoffeeChatProfile
							?.INTRODUCE
					}
					career={JSON.parse(
						props.coffeeChatProfileData?.CoffeeChatProfile?.CAREER
					)}
					mainField={JSON.parse(
						props.coffeeChatProfileData?.CoffeeChatProfile
							?.MAIN_FIELD
					)}
					profileImage={
						props.coffeeChatProfileData?.CoffeeChatProfile
							?.PROFILE_IMAGE
					}
					special={true}
					id={1}
					disabledHover
				/>
			)}
			{props.coffeeChatProfileData?.CONFIRMED_YN === 'N' && (
				<SupportiButton
					variant="contained"
					contents={
						<Typography
							color={'white'}
							fontWeight={'bold'}
							fontSize={'body2'}
						>
							수락하기
						</Typography>
					}
					onClick={() => setCoffeeChatApprovalModal(true)}
					isGradient
					disabledGutters
					style={{
						px: 6,
						py: 2,
						fontSize: '0.8rem !important',
						mt: 2,
					}}
				/>
			)}
			{/* 커피챗 수락 모달 */}
			<CoffeeChatApprovalModal
				open={coffeeChatApprovalModal}
				handleClose={() => setCoffeeChatApprovalModal(false)}
				coffeeChatApplyData={props.coffeeChatProfileData}
				customHandleClose={() => props.handleClose()}
			/>
		</SupportiModal>
	);
};

export default CoffeeChatProfileShownModal;
