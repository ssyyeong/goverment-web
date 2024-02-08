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
	const coffeeChatApplicationController = new DefaultController(
		'CoffeeChatApplication'
	);
	//* Functions
	/**
	 * 커피챗 신청 취소
	 */
	const cancelCoffeeChatApplication = () => {
		coffeeChatApplicationController.updateItem(
			{
				COFFEE_CHAT_APPLICATION_IDENTIFICATION_CODE:
					selectedCoffeeChatProfile?.COFFEE_CHAT_APPLICATION_IDENTIFICATION_CODE,
				CANCELED_YN: 'Y',
			},
			(res) => {
				setOpen(false);
			},
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

	console.log(memberCoffeeChatProfileId);
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
				coffeeChatApplicationController.findAllItems(
					{
						COFFEE_CHAT_PROFILE_IDENTIFICATION_CODE:
							tab === 'RECIEVED'
								? memberCoffeeChatProfileId
								: undefined,
						APP_MEMBER_IDENTIFICATION_CODE:
							tab === 'RECIEVED' ? undefined : memberId,
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
	}, [page, tab, memberId, memberCoffeeChatProfileId, profileModal, open]);

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
					커피챗 내역
				</Typography>
				<Typography
					variant="body1"
					fontWeight={'bold'}
					sx={{ mb: 1 }}
					color={'secondary'}
				>
					신청한 커피챗과 제안받은 커피챗을 확인해보세요!
				</Typography>
				<Box display="flex" gap={0.5} sx={{ mb: 2 }}>
					<Typography
						variant="body1"
						fontWeight={'bold'}
						sx={{ mb: 3 }}
						color={'secondary'}
					>
						커피챗 제안 수락시에 줌링크 또는 구글미팅 주소가
						필요해요! 줌링크, 구글미팅 주소 모르시겠다면,
					</Typography>
					<Typography
						variant="body1"
						fontWeight={'bold'}
						sx={{
							mb: 3,
							textDecoration: 'underline',
							cursor: 'pointer',
						}}
						color={'secondary.dark'}
						onClick={() => {
							window.open(
								'https://tststartup.notion.site/ZOOM-GOOGLE-MEET-2af36d2dd070438e9bb1a750ab2f2c47?pvs=4',
								'_blank'
							);
						}}
					>
						여기
					</Typography>
					<Typography
						variant="body1"
						fontWeight={'bold'}
						sx={{ mb: 3 }}
						color={'secondary'}
					>
						를 확인해주세요 !
					</Typography>
				</Box>
				{/* 탭 */}
				<Box
					width={{
						sm: '50%',
						xs: '100%',
					}}
				>
					<SupportiToggle
						chipDataList={[
							{
								label: '신청한 커피챗',
								value: 'SENT',
							},
							{
								label: '신청받은 커피챗',
								value: 'RECIEVED',
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
				{/* 모바일 테이블
				<Box
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
								label={
									tab === 'RECIEVED'
										? row.CONFIRMED_YN === 'Y'
											? '진행 완료'
											: '신청'
										: row.CONFIRMED_YN === 'Y'
										? '수락 완료'
										: row.CANCELED_YN === 'Y'
										? '취소됨'
										: '신청'
								}
								activeColor={
									row.CONFIRMED_YN === 'N' &&
									row.CANCELED_YN === 'N'
								}
								userName={
									tab === 'RECIEVED'
										? row.AppMember?.FULL_NAME
										: row.CoffeeChatProfile?.AppMember
												?.FULL_NAME
								}
								received={tab === 'RECIEVED'}
								endButtonLabel={
									tab === 'RECIEVED' ||
									row.CONFIRMED_YN === 'Y' ||
									row.CANCELED_YN === 'Y'
										? undefined
										: '취소하기'
								}
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
								disableAccordion={tab === 'SENT'}
								accordionContent={
									<Box>
										<Box
											bgcolor={'white'}
											p={2}
											borderRadius={2}
											display={'flex'}
											flexDirection={'column'}
											gap={2.5}
										>
											<Typography
												variant="subtitle2"
												fontWeight={'bold'}
											>
												커피챗 제안자
											</Typography>
											<Box
												display={'flex'}
												alignItems={'baseline'}
											>
												<Typography
													width={'10%'}
													color={'secondary.dark'}
													variant="body2"
													fontWeight={'600'}
												>
													이름
												</Typography>
												<Typography
													width={'90%'}
													variant="body2"
												>
													{row.AppMember?.FULL_NAME}
												</Typography>
											</Box>
											<Box
												display={'flex'}
												alignItems={'baseline'}
											>
												<Typography
													width={'10%'}
													color={'secondary.dark'}
													variant="body2"
													fontWeight={'600'}
												>
													전화번호
												</Typography>
												<Typography
													width={'90%'}
													variant="body2"
												>
													{
														row.AppMember
															?.PHONE_NUMBER
													}
												</Typography>
											</Box>
											<Box
												display={'flex'}
												alignItems={'baseline'}
											>
												<Typography
													width={'10%'}
													color={'secondary.dark'}
													variant="body2"
													fontWeight={'600'}
												>
													신청이유
												</Typography>
												<Typography
													width={'90%'}
													variant="body2"
													lineHeight={1.5}
												>
													{row.DESCRIPTION}
												</Typography>
											</Box>
										</Box>
										<Box
											display={'flex'}
											justifyContent={'end'}
										>
											<SupportiButton
												variant="contained"
												contents={
													<Typography
														color={'white'}
														fontWeight={'bold'}
														fontSize={'body2'}
													>
														자세히 보기
													</Typography>
												}
												onClick={() => {
													setSelectedCoffeeChatProfile(
														row
													);
													setProfileModal(true);
												}}
												isGradient
												disabledGutters
												style={{
													px: 4,
													py: 1,
													fontSize:
														'0.8rem !important',
													mt: 2,
												}}
											/>
										</Box>
									</Box>
								}
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
				coffeeChatProfileData={selectedCoffeeChatProfile}
			/>
		</InternalServiceDrawer>
	);
};

export default Page;
