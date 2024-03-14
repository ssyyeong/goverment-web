import React from 'react';

import { NextPage } from 'next';

import { Box, BoxProps, Grid, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { SupportBusinessManagementController } from '../../../../src/controller/SupportBusinessManagementController';
import { InternalServiceLayout } from '../../../../src/views/layout/InternalServiceLayout';
import InternalServiceDrawer from '../../../../src/views/local/internal_service/common/InternalServiceDrawer';
import SupportiButton from '../../../../src/views/global/SupportiButton';
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import InsertLinkOutlinedIcon from '@mui/icons-material/InsertLinkOutlined';
import moment from 'moment';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import SubsidyByItemTable from '../../../../src/views/local/internal_service/supportBusiness/SubsidyByItemTable/SubsidyByItemTable';
import SupportiInput from '../../../../src/views/global/SupportiInput';
import dayjs from 'dayjs';

const Page: NextPage = () => {
	//* Modules
	const { pid } = useRouter().query;
	const router = useRouter();
	//* States
	/**
	 * 지원사업 상세
	 */
	const [supportBusinessManagement, setSupportBusinessManagement] =
		React.useState<any>();
	/**
	 * 항목별 지원금 탭
	 */
	const [subsidyTab, setSubsidyTab] = React.useState<string>('총액(원)');
	/**
	 * 수정모드
	 */
	const [editMode, setEditMode] = React.useState<boolean>(false);
	//* Constants
	const dataConfig = [
		{
			label: '사업 명',
			key: 'BUSINESS_TITLE',
		},
		{
			label: '담당자',
			key: 'PERSON_IN_CHARGE',
		},
		{
			label: '담당자 연락처',
			key: 'MAIN_CONTACT',
		},
		{
			label: '중간 보고일',
			key: 'MID_DEAD_LINE_DATE',
			format: (value) => {
				return moment(value).format('YYYY-MM-DD');
			},
			type: 'datepicker',
		},
		{
			label: '최종 보고일',
			key: 'DEAD_LINE_DATE',
			format: (value) => {
				return moment(value).format('YYYY-MM-DD');
			},
			type: 'datepicker',
		},
	];

	const tabConfig = [
		{
			label: '총액(원)',
			key: 'TOTAL_AMOUNT',
		},
		{
			label: '사용액',
			key: 'USED_AMOUNT',
		},
		{
			label: '잔여액',
			key: 'REMAIN_AMOUNT',
		},
	];

	//* Controller
	const supportBusinessManagementController =
		new SupportBusinessManagementController();

	//* Functions
	/**
	 * 지원사업 상세 조회
	 */
	const getSupportBusiness = () => {
		supportBusinessManagementController.getOneItem(
			{
				SUPPORT_BUSINESS_MANAGEMENT_IDENTIFICATION_CODE: pid,
			},
			(res) => {
				setSupportBusinessManagement(res.data.result);
			},
			(err) => {}
		);
	};
	/**
	 * 항목별 지원금 탭 변경
	 */
	const handleSubsidyTabChange = (direction: 'prev' | 'next') => {
		const currentIndex = tabConfig.findIndex(
			(item) => item.label === subsidyTab
		);
		if (direction === 'prev') {
			if (currentIndex === 0) {
				setSubsidyTab(tabConfig[tabConfig.length - 1].label);
			} else {
				setSubsidyTab(tabConfig[currentIndex - 1].label);
			}
		} else {
			if (currentIndex === tabConfig.length - 1) {
				setSubsidyTab(tabConfig[0].label);
			} else {
				setSubsidyTab(tabConfig[currentIndex + 1].label);
			}
		}
	};
	/**
	 * 지원 사업 수정
	 */
	const updateSupportBusiness = () => {
		supportBusinessManagementController.updateItem(
			{
				SUPPORT_BUSINESS_MANAGEMENT_IDENTIFICATION_CODE: pid,
				...supportBusinessManagement,
			},
			(res) => {
				alert('수정되었습니다.');
				setEditMode(false);
			},
			(err) => {
				alert('수정에 실패했습니다.');
			}
		);
	};
	/**
	 * 지원 사업 삭제
	 */
	const deleteSupportBusiness = () => {
		const really = confirm('정말 삭제하시겠습니까?');
		if (!really) return;

		supportBusinessManagementController.deleteItem(
			{
				SUPPORT_BUSINESS_MANAGEMENT_IDENTIFICATION_CODE: pid,
			},
			(res) => {
				alert('삭제되었습니다.');
				router.push('/internal_service/government/management');
			},
			(err) => {
				alert('삭제에 실패했습니다.');
			}
		);
	};
	//* Hooks
	React.useEffect(() => {
		if (pid) getSupportBusiness();
	}, [pid]);

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
					{supportBusinessManagement && (
						<Box display={'flex'} flexDirection={'column'}>
							{/* 타이틀 */}
							<Typography color={'primary'} fontWeight={'600'}>
								{supportBusinessManagement.FIELD}
							</Typography>
							<Box
								display={'flex'}
								justifyContent={'space-between'}
								alignItems={'center'}
							>
								<Box
									display={'flex'}
									alignItems={'center'}
									gap={1}
								>
									<Typography
										variant="h3"
										fontWeight={'bold'}
									>
										{supportBusinessManagement?.TITLE}
									</Typography>
									{supportBusinessManagement.data && (
										<Box
											border={'1px solid black'}
											display={'flex'}
											borderRadius={2}
											alignItems={'center'}
											p={0.3}
										>
											<InsertLinkOutlinedIcon fontSize="small" />
										</Box>
									)}
									<Typography
										color={'#b9b9b9'}
										fontWeight={'600'}
									>
										{moment(
											supportBusinessManagement.START_DATE
										).format('YY.MM.DD')}
										~
										{moment(
											supportBusinessManagement.END_DATE
										).format('YY.MM.DD')}
									</Typography>
								</Box>
								<Box display={'flex'} gap={1}>
									<SupportiButton
										variant="outlined"
										contents={
											<Box
												display={'flex'}
												alignItems={'center'}
												gap={1}
											>
												<CreateOutlinedIcon fontSize="small" />
												<Typography
													fontWeight={'bold'}
													color={'primary'}
												>
													수정하기
												</Typography>
											</Box>
										}
										onClick={() => {
											editMode
												? updateSupportBusiness()
												: setEditMode(true);
										}}
										disabledGutters
										style={{
											px: 2,
											py: 1,
											bgcolor: 'white',
										}}
									/>{' '}
									<SupportiButton
										variant="outlined"
										contents={
											<Box
												display={'flex'}
												alignItems={'center'}
												gap={1}
											>
												<DeleteOutlineOutlinedIcon fontSize="small" />
												<Typography
													fontWeight={'bold'}
													color={'primary'}
												>
													삭제하기
												</Typography>
											</Box>
										}
										onClick={() => {
											deleteSupportBusiness();
										}}
										disabledGutters
										style={{
											px: 2,
											py: 1,
											bgcolor: 'white',
										}}
									/>
								</Box>
							</Box>
							{/* 내용 */}
							<Box
								display={'flex'}
								flexDirection={'column'}
								gap={2}
								mt={2}
								p={3}
								bgcolor={'white'}
								borderRadius={2}
								width={'100%'}
							>
								{dataConfig.map((item, index) => (
									<Box
										display={'flex'}
										key={index}
										alignItems={'center'}
									>
										<Typography>✔</Typography>
										<Typography
											color={'#b9b9b9'}
											fontWeight={'600'}
											width={'100px'}
											ml={1}
										>
											{item.label}
										</Typography>
										{editMode ? (
											<SupportiInput
												value={
													supportBusinessManagement[
														item.key
													]
												}
												setValue={(value) => {
													setSupportBusinessManagement(
														{
															...supportBusinessManagement,
															[item.key]:
																item.type
																	? dayjs(
																			value
																	  ).format(
																			'YYYY-MM-DD'
																	  )
																	: value,
														}
													);
												}}
												type={
													item.type
														? item.type
														: 'text'
												}
											/>
										) : (
											<Typography fontWeight={'500'}>
												{item.format
													? item.format(
															supportBusinessManagement[
																item.key
															]
													  )
													: supportBusinessManagement[
															item.key
													  ]}
											</Typography>
										)}
									</Box>
								))}
							</Box>
							{/* 항목별 지원금 */}

							<SubsidyByItemTable
								subsidyTab={subsidyTab}
								supportBusinessManagement={
									supportBusinessManagement
								}
								handleSubsidyTabChange={handleSubsidyTabChange}
							/>
						</Box>
					)}
				</InternalServiceLayout>
			</Box>
		</InternalServiceDrawer>
	);
};

export default Page;
