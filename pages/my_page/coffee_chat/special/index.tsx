import React, { useEffect, useState } from 'react';

import { NextPage } from 'next';

import { Box, BoxProps, Typography } from '@mui/material';
import InternalServiceDrawer from '../../../../src/views/local/internal_service/common/InternalServiceDrawer';
import SupportiToggle from '../../../../src/views/global/SupportiToggle';
import MobileTableRow from '../../../../src/views/local/external_service/mobileTableRow/MobileTableRow';
import SupportiPagination from '../../../../src/views/global/SupportiPagination';
import { usePagination } from '../../../../src/hooks/usePagination';
import { useAppMember } from '../../../../src/hooks/useAppMember';
import DefaultController from '@leanoncompany/supporti-ark-office-project/src/controller/default/DefaultController';
import { useUserAccess } from '../../../../src/hooks/useUserAccess';
import useAlert from '../../../../src/hooks/useAlert/useAlert';
import { SupportiAlertModal } from '../../../../src/views/global/SupportiAlertModal';
import Nodata from '../../../../src/views/global/NoData/NoData';
import SupportiTable from '../../../../src/views/global/SupportiTable';
import CoffeeChatHistoryList from '../../../../src/views/local/internal_service/coffeechat/\bCoffeeChatHistoryList/CoffeeChatHistoryList';
import CoffeeChatHistoryListBox from '../../../../src/views/local/internal_service/coffeechat/\bCoffeeChatHistoryList/CoffeeChatHistoryListBox';
import SupportiButton from '../../../../src/views/global/SupportiButton';
import { coffeeChatApplicationTestData } from '../../../../configs/data/TestData';
import CoffeeChatProfileShownModal from '../../../../src/views/local/internal_service/coffeechat/CoffeeChatProfileShownModal/CoffeeChatProfileShownModal';
import moment from 'moment';

const Page: NextPage = () => {
	//* Modules
	//* Constants
	//* States
	/**
	 * 탭
	 */
	const [tab, setTab] = React.useState<'RECIEVED' | 'SENT'>('SENT');
	/**
	 * 커피챗 리스트
	 */
	const [coffeeChatApplicationList, setCoffeeChatApplicationList] = useState<{
		count: number;
		rows?: { [key: string]: any }[];
	}>({ count: 0, rows: [] });
	/**
	 * 프로필 모달 오픈 여부
	 */
	const [profileModal, setProfileModal] = useState<boolean>(false);
	/**
	 * 선택한 커피챗 프로필
	 */
	const [selectedCoffeeChatProfile, setSelectedCoffeeChatProfile] =
		useState<any>(null);
	//* Controller
	const specialCoffeeChatApplicationController = new DefaultController(
		'SpecialCoffeeChatApplication'
	);
	//* Functions
	/**
	 * 커피챗 신청 취소
	 */
	const cancelCoffeeChatApplication = () => {
		specialCoffeeChatApplicationController.updateItem(
			{
				COFFEE_CHAT_APPLICATION_IDENTIFICATION_CODE:
					selectedCoffeeChatProfile?.COFFEE_CHAT_APPLICATION_IDENTIFICATION_CODE,
				CANCELED_YN: 'Y',
			},
			(res) => {},
			(err) => {
				console.log(err);
			}
		);
	};

	//* Hooks
	/**
	 * 페이지네이션
	 */
	const { page, limit, handlePageChange, setLimit } = usePagination();
	/**
	 * 유저 아이디 가져오는 훅
	 */
	const { memberId, memberCoffeeChatProfileId } = useAppMember();
	/**
	 * 구독 체크
	 */
	const { access } = useUserAccess('SUBSCRIPTION');
	/**
	 * 알러트
	 */
	const { open, setOpen, setType, type } = useAlert({});
	/**
	 * 커피챗 신청 리스트 가져오기
	 */
	useEffect(() => {
		if (memberId) {
			//구독 체크
			// if (!access) {
			// 	setOpen(true);
			// 	setType('subscribe');
			// 	return;
			// }
			if (memberCoffeeChatProfileId) {
				specialCoffeeChatApplicationController.findAllItems(
					{
						APP_MEMBER_IDENTIFICATION_CODE: memberId,
						LIMIT: 10,
						PAGE: page,
					},
					(res) => {
						setCoffeeChatApplicationList(res.data.result);
					}
				);
			} else {
				//커피챗 프로필 체크
				// setOpen(true);
				// setType('coffeechatprofilemissing');
			}
		}
	}, [page, tab, memberId, memberCoffeeChatProfileId]);

	return (
		<InternalServiceDrawer type="mypage">
			<Box
				width={'100%'}
				p={{
					xs: 2,
					md: 10,
				}}
				bgcolor={'primary.light'}
			>
				<Typography variant="h6" fontWeight={'bold'} sx={{ mb: 1 }}>
					스페셜 커피챗 내역
				</Typography>
				<Typography
					variant="body1"
					fontWeight={'bold'}
					sx={{ mb: 3 }}
					color={'secondary'}
				>
					신청한 스페셜 커피챗을 확인해보세요!
				</Typography>
				{/* 탭 */}
				<Box
					width={{
						sm: '25%',
						xs: '100%',
					}}
				>
					<SupportiToggle
						chipDataList={[
							{
								label: '신청한 커피챗',
								value: 'SENT',
							},
						]}
						angled
						disablePadding
						value={tab}
						setValue={setTab}
						chipHeight={40}
						selectedChipColor="primary.main"
						unselectedChipColor="secondary.dark"
						style={{
							chipStyle: {
								// height: '40px',
								bgcolor: '#ffffff',
								borderRadius: 0,
							},
							outerBoxStyle: {
								bgcolor: 'secondary.light',
								p: 0,
							},
							chipMapStyle: {
								fontWeight: 'bold',
							},
						}}
					/>
				</Box>
				{/*모바일 테이블 */}
				{/* <Box
					width={'100%'}
					py={2}
					display={{
						sm: 'none',
						xs: 'block',
					}}
				>
					{coffeeChatApplicationList?.rows?.map((item, idx) => {
						return (
							<MobileTableRow
								index={idx}
								title={item?.ConsultingProduct?.PRODUCT_NAME}
								colums={[
									{
										label: '금액',
										value:
											item?.ConsultingProduct?.PRICE +
											'원',
									},
								]}
							/>
						);
					})}
					{coffeeChatApplicationList?.rows?.length === 0 && (
						<Nodata />
					)}
				</Box> */}
				{/* 테이블 */}
				<Box
					width={'100%'}
					// p={2}
					// mt={2}
					// display={{
					// 	sm: 'block',
					// 	xs: 'none',
					// }}
				>
					<CoffeeChatHistoryList
						rows={coffeeChatApplicationList?.rows}
						listRenderCallback={(row, idx) => (
							<CoffeeChatHistoryListBox
								label={'신청'}
								activeColor={row.CONFIRM_YN === 'N'}
								userName={row.AppMember?.FULL_NAME}
								received={tab === 'RECIEVED'}
								endButtonLabel={undefined}
								endButtonCallback={
									tab === 'RECIEVED'
										? undefined
										: () => {
												setOpen(true);
												setType('cancel');
												setSelectedCoffeeChatProfile(
													row
												);
										  }
								}
								reservationDateAndTime={`${moment(
									row?.RESERVATION_DATE
								).format('YY.MM.DD(ddd)')} ${
									row.RESERVATION_START_TIME?.split(':00')[0]
								}-${row.RESERVATION_END_TIME?.split(':00')[0]}`}
								disableAccordion={true}
							/>
						)}
					/>
				</Box>
				{/* 페이지 네이션 */}
				<Box width={'100%'} p={2}>
					<SupportiPagination
						limit={10}
						setLimit={setLimit}
						page={page}
						handlePageChange={handlePageChange}
						count={coffeeChatApplicationList?.count}
						useLimit={false}
					/>
				</Box>
			</Box>
			{/* 알림창 */}
			<SupportiAlertModal
				open={open}
				handleClose={() => setOpen(false)}
				type={type}
				customHandleClose={() => cancelCoffeeChatApplication()}
			/>
			{/* 프로필 모달 */}
			<CoffeeChatProfileShownModal
				open={profileModal}
				handleClose={() => setProfileModal(false)}
			/>
		</InternalServiceDrawer>
	);
};

export default Page;
