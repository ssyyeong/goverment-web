import React from 'react';

import { NextPage } from 'next';

import { Box, BoxProps, Grid, Typography, keyframes } from '@mui/material';
import { InternalServiceLayout } from '../../../../../src/views/layout/InternalServiceLayout';
import InternalServiceDrawer from '../../../../../src/views/local/internal_service/common/InternalServiceDrawer';
import { ISupportBusinessManagement } from '../../../../../src/@types/model';
import { TableHeaderProps } from '../../../../../src/views/global/SupportiTable/SupportiTable';
import useAlert from '../../../../../src/hooks/useAlert/useAlert';
import { useAppMember } from '../../../../../src/hooks/useAppMember';
import { usePagination } from '../../../../../src/hooks/usePagination';
import { SupportBusinessManagementController } from '../../../../../src/controller/SupportBusinessManagementController';
import SupportiButton from '../../../../../src/views/global/SupportiButton';
import { supportField } from '../../../../../configs/data/SupportBusinessConfig';
import SupportiInput from '../../../../../src/views/global/SupportiInput';
import DefaultController from '@leanoncompany/supporti-ark-office-project/src/controller/default/DefaultController';
import { SupportiAlertModal } from '../../../../../src/views/global/SupportiAlertModal';
import moment from 'moment';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import { SubsidyByItemController } from '../../../../../src/controller/SubsidyByItemController';
import SupportSearchModal from '../../../../../src/views/local/internal_service/government/SupportSearchModal/SupportSearchModal';

const Page: NextPage = () => {
	//* Modules
	const router = useRouter();
	//* Controller
	const supportBusinessManagementController =
		new SupportBusinessManagementController();
	const subsidyByItemController = new SubsidyByItemController();
	const appMemberController = new DefaultController('AppMember');
	//* States
	/**
	 * 지원 사업 데이터
	 */
	const [supportBusiness, setSupportBusiness] =
		React.useState<ISupportBusinessManagement>({
			SEND_DATE: 1,
			FIELD: '전체',
			START_DATE: dayjs(),
			DEAD_LINE_DATE: dayjs(),
			MID_DEAD_LINE_DATE: dayjs(),
			END_DATE: dayjs(),
		});
	/**
	 * 알림톡 발송 여부
	 */
	const [isAlimTalk, setIsAlimTalk] = React.useState<boolean>(false);
	/**
	 * 본인 여부 체크
	 */
	const [isSelf, setIsSelf] = React.useState<boolean>(false);
	/**
	 * 본인 데이터
	 */
	const [selfData, setSelfData] = React.useState({
		name: '',
		contact: '',
	});
	//* Constants
	/**
	 * 알림톡 일자 선택
	 */
	const alimTalkDate = [
		{
			label: '1일전',
			value: 1,
		},
		{
			label: '3일전',
			value: 3,
		},
		{
			label: '7일전',
			value: 7,
		},
	];
	/**
	 * 입력 받을 테이터
	 */
	const supportBusinessManagementData = [
		{
			label: '지원사업 분야',
			value: supportBusiness.FIELD,
			type: 'select',
			additionalProps: {
				placeholder: '지원사업 분야를 선택해주세요',
			},
			essential: true,
			data: supportField,
			setValue: (value: string) =>
				setSupportBusiness({ ...supportBusiness, FIELD: value }),
			grid: {
				xs: 12,
				sm: 5.8,
			},
		},
		{
			label: '지원사업 명',
			value: supportBusiness.TITLE,
			additionalProps: {
				placeholder: '지원사업 명을 입력해주세요',
			},
			essential: true,
			setValue: (value: string) =>
				setSupportBusiness({ ...supportBusiness, TITLE: value }),
			grid: {
				xs: 12,
				sm: 5.8,
			},
		},
		{
			label: '사업 명',
			value: supportBusiness.BUSINESS_TITLE,
			additionalProps: {
				placeholder: '사업 명을 입력해주세요',
			},
			essential: true,
			setValue: (value: string) =>
				setSupportBusiness({
					...supportBusiness,
					BUSINESS_TITLE: value,
				}),
			grid: {
				xs: 10,
				sm: 10,
			},
		},
		{
			label: '책임자',
			value: supportBusiness.PERSON_IN_CHARGE,
			additionalProps: {
				placeholder: '책임자 명을 입력해주세요',
			},
			essential: true,
			setValue: (value: string) =>
				setSupportBusiness({
					...supportBusiness,
					PERSON_IN_CHARGE: value,
				}),
			grid: {
				xs: 10,
				sm: 10,
			},
		},
		{
			label: '연락처',
			value: supportBusiness.MAIN_CONTACT,
			additionalProps: {
				placeholder:
					'연락처를 입력해주세요.(해당 연락처로 알림톡을 보내드립니다.)',
			},
			essential: true,
			setValue: (value: string) =>
				setSupportBusiness({ ...supportBusiness, MAIN_CONTACT: value }),
			grid: {
				xs: 10,
				sm: 10,
			},
		},
		{
			label: '협약 시작일',
			value: supportBusiness.START_DATE,
			additionalProps: {
				placeholder:
					'연락처를 입력해주세요.(해당 연락처로 알림톡을 보내드립니다.)',
			},
			essential: true,
			type: 'datepicker',
			setValue: (value: string) =>
				setSupportBusiness({ ...supportBusiness, START_DATE: value }),
			grid: {
				xs: 10,
				sm: 10,
			},
		},
		{
			label: '협약 종료일',
			value: supportBusiness.END_DATE,
			additionalProps: {
				placeholder:
					'연락처를 입력해주세요.(해당 연락처로 알림톡을 보내드립니다.)',
			},
			essential: true,
			type: 'datepicker',
			setValue: (value: string) =>
				setSupportBusiness({ ...supportBusiness, END_DATE: value }),
			grid: {
				xs: 10,
				sm: 10,
			},
		},
		{
			label: '중간 보고일',
			value: supportBusiness.MID_DEAD_LINE_DATE,
			additionalProps: {
				placeholder:
					'연락처를 입력해주세요.(해당 연락처로 알림톡을 보내드립니다.)',
			},
			essential: true,
			type: 'datepicker',
			setValue: (value: string) =>
				setSupportBusiness({
					...supportBusiness,
					MID_DEAD_LINE_DATE: value,
				}),
			minDate: supportBusiness.START_DATE,
			maxDate: supportBusiness.END_DATE,
			grid: {
				xs: 10,
				sm: 10,
			},
		},
		{
			label: '최종 보고일',
			value: supportBusiness.DEAD_LINE_DATE,
			additionalProps: {
				placeholder:
					'연락처를 입력해주세요.(해당 연락처로 알림톡을 보내드립니다.)',
			},
			essential: true,
			type: 'datepicker',
			setValue: (value: string) =>
				setSupportBusiness({
					...supportBusiness,
					DEAD_LINE_DATE: value,
				}),
			minDate: supportBusiness.START_DATE,
			maxDate: supportBusiness.END_DATE,
			grid: {
				xs: 10,
				sm: 10,
			},
		},
		{
			label: '몇일전 알림',
			value: supportBusiness.SEND_DATE,
			type: 'select',
			additionalProps: {
				placeholder: '지원사업 분야를 선택해주세요',
			},

			essential: true,
			data: alimTalkDate,
			setValue: (value: string) =>
				setSupportBusiness({ ...supportBusiness, SEND_DATE: value }),
			grid: {
				xs: 10,
				sm: 10,
			},
		},
	];

	//* Functions
	/**
	 * 지원사업관리 등록
	 */
	const createSupportBusinessManagement = () => {
		subsidyByItemController.createItem(
			{
				...supportBusiness,
				APP_MEMBER_IDENTIFICATION_CODE: memberId,
			},
			(res) => {
				setOpen(true);
				setType('successCreateAxios');
			},
			(err) => {}
		);
	};
	//* Hooks
	/**
	 * 유저 아이디
	 */
	const { memberId } = useAppMember();

	/**
	 * 알러트
	 */
	const { open, setOpen, setType, type } = useAlert({});

	/**
	 * 유저 정보 가져오기
	 */
	React.useEffect(() => {
		appMemberController.getData(
			{},
			`${appMemberController.mergedPath}/profile`,
			(res) => {
				if (res.data.result !== null) {
					setSelfData({
						name: res.data.result.FULL_NAME,
						contact: res.data.result.PHONE_NUMBER,
					});
				}
			}
		);
	}, []);
	/**
	 * 본인 일 때 데이터 꽂기
	 */
	React.useEffect(() => {
		if (isSelf) {
			setSupportBusiness({
				...supportBusiness,
				PERSON_IN_CHARGE: selfData.name,
				MAIN_CONTACT: selfData.contact,
			});
		} else {
			setSupportBusiness({
				...supportBusiness,
				PERSON_IN_CHARGE: '',
				MAIN_CONTACT: '',
			});
		}
	}, [isSelf]);

	return (
		<InternalServiceDrawer type="dashboard">
			<Box bgcolor={'primary.light'} sx={{ p: { sm: 5, xs: '0' } }}>
				{/* 컨텐츠 레이아웃 */}
				<InternalServiceLayout
					title="지원 사업"
					subTitle="서포티를 통해 나에게 맞는 지원 사업을 조회하고 확인해보세요."
					image="/images/main/supportbusiness.png"
					mobileImage="/images/main/supportbusinessmobile.png"
				>
					<Typography variant="h3" fontWeight={'bold'} sx={{ mb: 2 }}>
						지원 사업 등록
					</Typography>
					{/* 지원사업 선택 및 입력 */}
					<Box
						width={'100%'}
						bgcolor={'white'}
						borderRadius={3}
						p={4}
					>
						<Box
							display={'flex'}
							justifyContent={'space-between'}
							alignItems={'center'}
						>
							<Typography fontWeight={'700'} variant="h6" mb={2}>
								지원사업
							</Typography>
							<SupportSearchModal
								setSupportBusiness={setSupportBusiness}
								supportBusiness={supportBusiness}
							/>
						</Box>
						<Grid container gap={1}>
							{supportBusinessManagementData
								.slice(0, 2)
								.map((item, index) => {
									return (
										<Grid
											item
											xs={item.grid.xs}
											sm={item.grid.sm}
										>
											<Typography
												fontWeight={'700'}
												sx={{ mb: 1 }}
											>
												{item.label}
											</Typography>
											<SupportiInput
												value={item.value}
												setValue={item.setValue}
												type={item.type}
												dataList={item.data}
												additionalProps={
													item.additionalProps
												}
											/>
										</Grid>
									);
								})}
						</Grid>
					</Box>
					{/* 사업, 마감일 설정 */}
					<Grid container gap={3} mt={3}>
						{/* 사업 */}
						<Grid
							item
							xs={12}
							sm={5.9}
							bgcolor={'white'}
							p={4}
							borderRadius={3}
						>
							<Box
								display={'flex'}
								alignItems={'center'}
								justifyContent={'space-between'}
								mb={2}
							>
								<Typography fontWeight={'700'} variant="h6">
									사업
								</Typography>
								<SupportiInput
									type="checkbox"
									value={isSelf}
									setValue={setIsSelf}
									label="책임자가 본인입니다."
								/>
							</Box>

							<Box
								gap={1}
								display={'flex'}
								flexDirection={'column'}
							>
								{supportBusinessManagementData
									.slice(2, 7)
									.map((item, index) => {
										return (
											<Grid
												item
												display={'flex'}
												alignItems={'center'}
											>
												<Grid item xs={2} sm={2}>
													<Typography
														fontWeight={'700'}
													>
														{item.label}
													</Typography>
												</Grid>
												<Grid
													item
													xs={item.grid.xs}
													sm={item.grid.sm}
												>
													<SupportiInput
														value={item.value}
														setValue={item.setValue}
														type={item.type}
														dataList={item.data}
														additionalProps={
															item.additionalProps
														}
														style={{
															width: '100%',
														}}
													/>
												</Grid>
											</Grid>
										);
									})}
							</Box>
						</Grid>

						{/* 마감일 */}
						<Grid
							item
							xs={12}
							sm={5.8}
							bgcolor={'white'}
							p={4}
							borderRadius={3}
						>
							<Typography fontWeight={'700'} variant="h6" mb={3}>
								마감일 설정
							</Typography>
							<Box
								gap={1}
								display={'flex'}
								flexDirection={'column'}
							>
								{supportBusinessManagementData
									.slice(7, 9)
									.map((item, index) => {
										return (
											<Grid
												item
												display={'flex'}
												alignItems={'center'}
											>
												<Grid item xs={2} sm={2}>
													<Typography
														fontWeight={'700'}
													>
														{item.label}
													</Typography>
												</Grid>
												<Grid
													item
													xs={item.grid.xs}
													sm={item.grid.sm}
												>
													<SupportiInput
														value={item.value}
														setValue={item.setValue}
														type={item.type}
														dataList={item.data}
														additionalProps={
															item.additionalProps
														}
														style={{
															width: '100%',
														}}
														minDate={item.minDate}
														maxDate={item.maxDate}
													/>
												</Grid>
											</Grid>
										);
									})}
								<Typography lineHeight={1.4} mt={2}>
									현재 서포티에서는 위에서 설정하신 중간
									보고일, 최종 보고일 전에 알림톡을 발송해
									드리는 서비스를 진행하고 있습니다. 담당자의
									연락처로 마감일 알림을 받아보시겠습니까?
								</Typography>
								<SupportiInput
									type="checkbox"
									value={isAlimTalk}
									setValue={setIsAlimTalk}
									label="네, 알림톡을 받겠습니다."
								/>
								{isAlimTalk &&
									supportBusinessManagementData
										.slice(9, 10)
										.map((item, index) => {
											return (
												<Grid
													item
													display={'flex'}
													alignItems={'center'}
													mt={2}
													sx={{}}
												>
													<Grid item xs={2} sm={2}>
														<Typography
															fontWeight={'700'}
														>
															{item.label}
														</Typography>
													</Grid>
													<Grid
														item
														xs={item.grid.xs}
														sm={item.grid.sm}
													>
														<SupportiInput
															value={item.value}
															setValue={
																item.setValue
															}
															type={item.type}
															dataList={item.data}
															additionalProps={
																item.additionalProps
															}
															style={{
																width: '100%',
															}}
														/>
													</Grid>
												</Grid>
											);
										})}
							</Box>
						</Grid>
					</Grid>
					<Box
						width={'100%'}
						display={'flex'}
						justifyContent={'center'}
						alignItems={'center'}
						mt={3}
					>
						<SupportiButton
							contents={'등록하기'}
							onClick={createSupportBusinessManagement}
							variant="contained"
							isGradient
							style={{
								width: '60%',
								m: 'auto',
							}}
						/>
					</Box>
					<SupportiAlertModal
						open={open}
						handleClose={() => {
							setOpen(false);
						}}
						type={type}
						customHandleClose={() => {
							router.push(
								'/internal_service/government/management'
							);
						}}
					/>
				</InternalServiceLayout>
			</Box>
		</InternalServiceDrawer>
	);
};

export default Page;
