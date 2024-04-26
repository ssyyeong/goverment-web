import React, { useEffect } from 'react';

import { NextPage } from 'next';

import { Box, BoxProps, Grid, Typography, keyframes } from '@mui/material';
import { InternalServiceLayout } from '../../../../../src/views/layout/InternalServiceLayout';
import InternalServiceDrawer from '../../../../../src/views/local/internal_service/common/InternalServiceDrawer';
import { ISupportBusinessManagement } from '../../../../../src/@types/model';
import useAlert from '../../../../../src/hooks/useAlert/useAlert';
import { useAppMember } from '../../../../../src/hooks/useAppMember';
import { SupportBusinessManagementController } from '../../../../../src/controller/SupportBusinessManagementController';
import SupportiButton from '../../../../../src/views/global/SupportiButton';
import {
	supportField,
	supportRoute,
	supportContent,
	region,
	startUpPeriod,
	managementPoint,
} from '../../../../../configs/data/SupportBusinessConfig';
import SupportiInput from '../../../../../src/views/global/SupportiInput';
import DefaultController from '@leanoncompany/supporti-ark-office-project/src/controller/default/DefaultController';
import { SupportiAlertModal } from '../../../../../src/views/global/SupportiAlertModal';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import { SubsidyByItemController } from '../../../../../src/controller/SubsidyByItemController';
import SupportSearchModal from '../../../../../src/views/local/internal_service/government/SupportSearchModal/SupportSearchModal';

const Page: NextPage = () => {
	//* Modules
	const router = useRouter();
	// 쿼리 가져오기
	const { query } = router;
	// 단계
	const Phase = query.phase;

	//* Controller
	const supportBusinessManagementController =
		new SupportBusinessManagementController();
	const subsidyByItemController = new SubsidyByItemController();
	const appMemberController = new DefaultController('AppMember');

	const supportContentController = new DefaultController(
		'SupportBusinessManagementContent'
	); // 지원내용
	const supportIndustryController = new DefaultController(
		'SupportBusinessManagementIndustry'
	); // 업종별

	//* States

	//* Constants

	// 지원 방법 데이터
	const ApplyRoute = [
		{
			label: '홈페이지 제출',
			value: 'HOMEPAGE',
			type: 'radio',
			text: '회원가입 유무',
			underDataList: ['유', '무'],
		},
		{
			label: '이메일 제출',
			value: 'EMAIL',
			type: 'stringInput',
			text: '담당자 이메일',
		},
		{
			label: '설문지형식 제출',
			value: 'FORM',
			type: 'stringInput',
			text: '구글폼 링크',
		},
		{
			label: '서면 제출',
			value: 'ONFOOT',
			type: 'stringInput',
			text: '제출 장소',
		},
	];

	/**
	 * 지원내용 데이터
	 */
	const [supportContentData, setSupportContentData] = React.useState([]);

	/**
	 * 업종별 데이터
	 */
	const [supportIndustryData, setSupportIndustryData] = React.useState([]);

	//* Hooks

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
			DATA: null,
			PHASE: Phase,
			SUPPORT_ROUTE: 'HOMEPAGE',
			SUPPORT_ROUTE_MEMO: null,
			HISTORY: null,
			REGION: null,
			BUSINESS_SECTOR: null,
			OPERATING_COST: null,
			SUPPORT_COST_RATE: null,
			BUSINESS_CONTRIBUTION_RATE: null,
			BUSINESS_DESCRIPTION: [],
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

	//* Functions
	/**
	 * 지원사업관리 등록
	 */
	const createSupportBusinessManagement = () => {
		if (!supportBusiness.TITLE) {
			alert('사업명을 입력해주세요');
			return;
		} else {
			subsidyByItemController.createItem(
				{
					...supportBusiness,
					APP_MEMBER_IDENTIFICATION_CODE: memberId,
					ALIMTALK_YN: isAlimTalk ? 'Y' : 'N',
				},
				(res) => {
					setOpen(true);
					setType('successCreateAxios');
				},
				(err) => {}
			);
		}
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

	useEffect(() => {
		supportContentController.findAllItems(
			{ USED_YN: 'Y' },
			(res) => {
				setSupportContentData(res.data.result.rows);
			},
			(err) => {
				console.log(err);
			}
		);

		supportIndustryController.findAllItems(
			{ USED_YN: 'Y' },
			(res) => {
				setSupportIndustryData(res.data.result.rows);
			},
			(err) => {
				console.log(err);
			}
		);

		// memberId &&
		// 	supportBusinessManagementController.getOneItemByKey(
		// 		{
		// 			APP_MEMBER_IDENTIFICATION_CODE: memberId,
		// 		},
		// 		(res) => {
		// 			setSupportBusiness({
		// 				...res.data.result,
		// 				BUSINESS_DESCRIPTION: JSON.parse(
		// 					res.data.result.BUSINESS_DESCRIPTION
		// 				),
		// 			});
		// 			setTotalDataSize(res.data.result.count);
		// 		},
		// 		(err) => {
		// 			console.log(err);
		// 		}
		// 	);
	}, [memberId]);

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
			label: '지원내용 (다중선택가능)',
			value: supportBusiness.BUSINESS_DESCRIPTION,
			type: 'multiselect',
			additionalProps: {
				placeholder: '지원내용을 선택해주세요',
			},
			essential: false,
			data: supportContentData.map(
				(row) => row.SUPPORT_DESCRIPTION_TITLE
			),
			handleChange: (event) => {
				const {
					target: { value },
				} = event;
				setSupportBusiness({
					...supportBusiness,
					BUSINESS_DESCRIPTION: value,
				});
			},
			grid: {
				xs: 12,
				sm: 5.8,
			},
		},
		{
			label: '지원 방법',
			value: supportBusiness.SUPPORT_ROUTE,
			type: 'select',
			phase: 'PHASE1',
			additionalProps: {
				placeholder: '지원 방법을 선택해주세요',
			},
			essential: false,
			data: supportRoute,
			setValue: (value: string) =>
				setSupportBusiness({
					...supportBusiness,
					SUPPORT_ROUTE: value,
				}),
			grid: {
				xs: 12,
				sm: 5.8,
			},
		},
		{
			label: `${
				ApplyRoute.filter(
					(item) => item.value === supportBusiness.SUPPORT_ROUTE
				)[0]?.text
			}`,
			value: supportBusiness.SUPPORT_ROUTE_MEMO,
			phase: 'PHASE1',
			additionalProps: {
				placeholder: `${
					ApplyRoute.filter(
						(item) => item.value === supportBusiness.SUPPORT_ROUTE
					)[0]?.text
				}를 입력해주세요`,
			},
			essential: false,
			setValue: (value: string) =>
				setSupportBusiness({
					...supportBusiness,
					SUPPORT_ROUTE_MEMO: value,
				}),
			grid: {
				xs: 12,
				sm: 5.8,
			},
		},
		{
			label: '업력',
			value: supportBusiness.HISTORY,
			type: 'select',
			additionalProps: {
				placeholder: '업력을 선택해주세요',
			},
			essential: false,
			data: startUpPeriod,
			setValue: (value: string) =>
				setSupportBusiness({ ...supportBusiness, HISTORY: value }),
			grid: {
				xs: 12,
				sm: 5.8,
			},
		},
		{
			label: '지역',
			value: supportBusiness.REGION,
			type: 'select',
			additionalProps: {
				placeholder: '지역을 선택해주세요',
			},
			essential: false,
			data: region,
			setValue: (value: string) =>
				setSupportBusiness({ ...supportBusiness, REGION: value }),
			grid: {
				xs: 12,
				sm: 5.8,
			},
		},
		{
			label: '업종별',
			value: supportBusiness.BUSINESS_SECTOR,
			type: 'select',
			additionalProps: {
				placeholder: '업종별 분야를 선택해주세요',
			},
			essential: false,
			data: supportIndustryData.map((row) => {
				return {
					label: row.BUSINESS_SECTOR_NAME,
					value: row.BUSINESS_SECTOR_NAME,
				};
			}),
			setValue: (value: string) =>
				setSupportBusiness({
					...supportBusiness,
					BUSINESS_SECTOR: value,
				}),
			grid: {
				xs: 12,
				sm: 5.8,
			},
		},
		{
			label: '사업 명',
			value: supportBusiness.BUSINESS_TITLE,
			phase: 'PHASE2',
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
			phase: 'PHASE2',
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
			phase: 'PHASE2',
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
			phase: 'PHASE2',
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
			phase: 'PHASE2',
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
			phase: 'PHASE2',
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
			phase: 'PHASE2',
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
			phase: 'PHASE2',
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
		{
			label: '총 사업비(원)',
			value: supportBusiness.OPERATING_COST,
			additionalProps: {
				placeholder: '총 사업비(원)을 입력해주세요.',
			},
			essential: true,
			setValue: (value: string) =>
				setSupportBusiness({
					...supportBusiness,
					OPERATING_COST: value,
				}),
			grid: {
				xs: 12,
				sm: 5.8,
			},
		},
		{
			label: '지원금 비율(%)',
			value: supportBusiness.SUPPORT_COST_RATE,
			additionalProps: {
				placeholder: '지원금 비율을 입력해주세요',
			},
			essential: true,
			setValue: (value: string) =>
				setSupportBusiness({
					...supportBusiness,
					SUPPORT_COST_RATE: value,
				}),
			grid: {
				xs: 12,
				sm: 5.8,
			},
			additionalComponent: (
				<Typography
					my="auto"
					color="primary.main"
					sx={{ mt: 1, ml: '80%' }}
				>
					{supportBusiness.OPERATING_COST != 0
						? supportBusiness.OPERATING_COST *
						  0.01 *
						  supportBusiness.SUPPORT_COST_RATE
						: 0}{' '}
					원
				</Typography>
			),
		},
		{
			label: '기업부담금 비율(%)',
			value: supportBusiness.BUSINESS_CONTRIBUTION_RATE,
			additionalProps: {
				placeholder: '기업부담금 비율을 입력해주세요',
			},
			essential: true,
			setValue: (value: string) =>
				setSupportBusiness({
					...supportBusiness,
					BUSINESS_CONTRIBUTION_RATE: value,
				}),
			grid: {
				xs: 12,
				sm: 5.8,
			},
			additionalComponent: (
				<Typography
					my="auto"
					color="primary.main"
					sx={{ mt: 1, ml: '80%' }}
				>
					{supportBusiness.OPERATING_COST != 0
						? supportBusiness.OPERATING_COST *
						  0.01 *
						  supportBusiness.BUSINESS_CONTRIBUTION_RATE
						: 0}{' '}
					원
				</Typography>
			),
		},
		{
			label: '제출 마감일',
			value: supportBusiness.DEAD_LINE_DATE,
			phase: 'PHASE1',
			essential: true,
			type: 'datepicker',
			setValue: (value: string) =>
				setSupportBusiness({
					...supportBusiness,
					DEAD_LINE_DATE: value,
				}),
			grid: {
				xs: 10,
				sm: 10,
			},
		},
	];

	return (
		// <InternalServiceDrawer type="dashboard">
		<Box bgcolor={'primary.light'} sx={{ p: { xs: 2, md: 10 } }}>
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
				<Typography color="secondary.dark" mb={3}>
					{Phase === 'PHASE1'
						? 'Phase 1. 지원 방법, 제출 서류체크, 타임라인/데드라인 체크, 지원금 계상방법 등에 따른 관리 기능 지원'
						: '	Phase 2. 최종지원 후 선정에 따라 지원사업 진행을 서포트할 수 있도록 전반적인 관리를 진행할 수 있도록 지원'}
				</Typography>
				{/* 지원사업 선택 및 입력 */}
				<Box width={'100%'} bgcolor={'white'} borderRadius={3} p={4}>
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
							.slice(0, 3)
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
											handleChange={item.handleChange}
											// handleAdd={item.handleAdd}
											// handleDelete={item.handleDelete}
											// maxLength={item.maxLength}
										/>
										{item.additionalComponent}
									</Grid>
								);
							})}
						{Phase === 'PHASE1' &&
							supportBusinessManagementData
								.slice(-1)
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
												handleChange={item.handleChange}
												// handleAdd={item.handleAdd}
												// handleDelete={item.handleDelete}
												// maxLength={item.maxLength}
											/>
										</Grid>
									);
								})}
					</Grid>
				</Box>

				{/* 지원 방법  */}
				{Phase === 'PHASE1' && (
					<Box
						width={'100%'}
						bgcolor={'white'}
						borderRadius={3}
						p={4}
						mt={3}
					>
						<Box
							display={'flex'}
							justifyContent={'space-between'}
							alignItems={'center'}
						>
							<Typography fontWeight={'700'} variant="h6" mb={2}>
								지원 방법
							</Typography>
						</Box>
						<Grid container gap={1}>
							{supportBusinessManagementData
								.slice(3, 5)
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
												handleChange={item.handleChange}
												// handleAdd={item.handleAdd}
												// handleDelete={item.handleDelete}
												// maxLength={item.maxLength}
											/>
										</Grid>
									);
								})}
						</Grid>
						{/* <Box display="flex" alignItems={'center'} gap={2}>
						<SupportiInput
							type="select"
							additionalProps={{
								placeholder: '지원 방법를 선택하세요.',
							}}
							value={'HOMEPAGE'}
							setValue={(e) => console.log(e)}
							dataList={ApplyRoute}
							style={{
								bgcolor: 'transparent',
							}}
							width={'20%'}
						/>
						<Typography>입력</Typography>
						<SupportiInput
							type={'input'}
							value={''}
							setValue={(e) => console.log(e)}
							additionalProps={{
								placeholder: '입력',
								defaultValue: '',
							}}
							width={290}
						/>
					</Box> */}
					</Box>
				)}

				{/** 지원대상/선정기준 */}
				<Box
					width={'100%'}
					bgcolor={'white'}
					borderRadius={3}
					p={4}
					mt={3}
				>
					<Typography fontWeight={'700'} variant="h6" mb={2}>
						지원대상/선정기준
					</Typography>
					<Box
						// display={'flex'}
						// justifyContent={'space-between'}
						alignItems={'center'}
					>
						<Grid container gap={1}>
							{supportBusinessManagementData
								.slice(5, 8)
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
				</Box>

				{/** 지원금 계상 */}
				<Box
					width={'100%'}
					bgcolor={'white'}
					borderRadius={3}
					p={4}
					mt={3}
				>
					<Typography fontWeight={'700'} variant="h6" mb={2}>
						지원금 계상
					</Typography>
					<Box
						// display={'flex'}
						// justifyContent={'space-between'}
						alignItems={'center'}
					>
						<Grid container gap={1}>
							{supportBusinessManagementData
								.slice(16, 19)
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
											{item.additionalComponent}
										</Grid>
									);
								})}
						</Grid>
					</Box>
				</Box>

				{/* 사업, 마감일 설정 */}
				{Phase === 'PHASE2' && (
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
									.slice(8, 12)
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
									.slice(12, 16)
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
				)}

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
						router.push('/internal_service/government/management');
					}}
				/>
			</InternalServiceLayout>
		</Box>
		// </InternalServiceDrawer>
	);
};

export default Page;
