import React from 'react';

import { NextPage } from 'next';

import { Box, BoxProps, Typography } from '@mui/material';
import InternalServiceDrawer from '../../../../src/views/local/internal_service/common/InternalServiceDrawer';
import { InternalServiceLayout } from '../../../../src/views/layout/InternalServiceLayout';
import SupportiButton from '../../../../src/views/global/SupportiButton';
import Calendar from 'react-calendar';
import moment from 'moment';
import Schedule from '../../../../src/views/local/internal_service/supportBusiness/Schedule/Schedule';
import { SupportBusinessManagementController } from '../../../../src/controller/SupportBusinessManagementController';
import { useAppMember } from '../../../../src/hooks/useAppMember';
import Nodata from '../../../../src/views/global/NoData/NoData';
import { useRouter } from 'next/router';
import SupportiTable, {
	TableHeaderProps,
} from '../../../../src/views/global/SupportiTable/SupportiTable';
import { usePagination } from '../../../../src/hooks/usePagination';
import OnGoingSupportBusiness from '../../../../src/views/local/internal_service/supportBusiness/OnGoingSupportBusiness/OnGoingSupportBusiness';
import SupportiPagination from '../../../../src/views/global/SupportiPagination';
import CalculateModal from '../../../../src/views/local/internal_service/government/CalculateModal';

const Page: NextPage = () => {
	//* Modules
	const router = useRouter();
	//* Controller
	const supportBusinessManagementController =
		new SupportBusinessManagementController();
	//* Constants
	const supportBusinessManagementHeaderData: TableHeaderProps[] = [
		{
			label: 'NO',
			value: '',
			format: (value, key, idx) => {
				return page * 10 + (idx + 1);
			},
			align: 'left',
		},
		{
			label: '지원사업 명',
			value: 'TITLE',
			align: 'center',
		},
		{
			label: '지원 사업 분야',
			value: 'FIELD',
			align: 'center',
		},
		{
			label: '사업 명',
			value: 'BUSINESS_TITLE',
			align: 'center',
		},
		{
			label: '사업 시작일',
			value: 'START_DATE',
			align: 'center',
			format: (value) => {
				return moment(value).format('YYYY-MM-DD');
			},
		},
		{
			label: '사업 마감일',
			value: 'END_DATE',
			align: 'center',
			format: (value) => {
				return moment(value).format('YYYY-MM-DD');
			},
		},
	];
	//* States
	/**
	 * 선택된 날짜
	 */
	const [selectedDate, setSelectedDate] = React.useState<any>(null);
	/**
	 * 진행중 지원사업 데이터
	 */
	const [
		onGoingManagementSupportBusiness,
		setOnGoingManagementSupportBusiness,
	] = React.useState<any>();
	/**
	 * 관리 지원사업 데이터
	 */
	const [managementSupportBusiness, setManagementSupportBusiness] =
		React.useState<any>();

	//* Functions
	/**
	 * 관리 지원사업 데이터 가져오기
	 */
	const getManagementSupportBusiness = () => {
		supportBusinessManagementController.findAllItems(
			{
				APP_MEMBER_IDENTIFICATION_CODE: memberId,
			},
			(res) => {
				setManagementSupportBusiness(res.data.result);
			},
			(err) => {
				console.log(err);
			}
		);
	};
	/**
	 * 진행중 지원사업 가져오기
	 */
	const getOnGoingSupportBusiness = () => {
		supportBusinessManagementController.getOnGoingSupportBusiness(
			{
				FIND_OPTION_KEY_LIST: {
					APP_MEMBER_IDENTIFICATION_CODE: memberId,
				},
			},
			(res) => {
				setOnGoingManagementSupportBusiness(res.data.result);
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
	const { page, limit, handlePageChange, setLimit, setPage } =
		usePagination();
	/**
	 * 유저 정보 가져오는 훅
	 */
	const { memberId } = useAppMember();

	React.useEffect(() => {
		if (memberId) {
			getManagementSupportBusiness();
			getOnGoingSupportBusiness();
		}
	}, [memberId]);
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
					{/* 타이틀 */}
					<Box
						display={'flex'}
						justifyContent={'space-between'}
						alignItems={'center'}
						width={'100%'}
					>
						<Box>
							<Typography
								variant="h3"
								fontWeight={'bold'}
								sx={{ mb: 2 }}
							>
								지원 사업 관리
							</Typography>
							<Typography color={'secondary.dark'} sx={{ mb: 2 }}>
								현금, 현물/인건비 계상, 지원사업 관리를 한눈에!
							</Typography>
						</Box>
						<CalculateModal />
					</Box>
					{/* 진행중 지원사업 */}
					<Box
						width={'100%'}
						bgcolor={'white'}
						borderRadius={3}
						p={4}
					>
						<Typography fontWeight={'700'}>
							진행중 지원사업
						</Typography>
						<Box
							mt={2}
							maxHeight={'250px'}
							sx={{
								overflowY: 'auto',
							}}
						>
							{onGoingManagementSupportBusiness?.map(
								(item: any, index: number) => {
									return (
										<OnGoingSupportBusiness
											title={item.TITLE}
											mid_deadline={
												item.MID_DEAD_LINE_DATE
											}
											deadline={item.DEAD_LINE_DATE}
											type={item.ORDER}
											id={
												item.SUPPORT_BUSINESS_MANAGEMENT_IDENTIFICATION_CODE
											}
										/>
									);
								}
							)}
							{onGoingManagementSupportBusiness?.length === 0 && (
								<Nodata disabledGutter imgWidth="5%" />
							)}
						</Box>
					</Box>
					{/* 달력, 일별 일정 */}
					<Schedule />
					{/* 총 진행사업 */}
					{managementSupportBusiness && (
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
								mb={2}
							>
								<Typography variant="h6" fontWeight={'bold'}>
									총 지원사업
								</Typography>
								<SupportiButton
									contents={'지원 사업 추가하기'}
									onClick={() => {
										router.push(
											'/internal_service/government/management/write'
										);
									}}
									disabledGutters
								/>
							</Box>
							<SupportiTable
								rowData={managementSupportBusiness.rows}
								headerData={supportBusinessManagementHeaderData}
								onClick={(row) => {
									router.push(
										`/internal_service/government/management/${row.SUPPORT_BUSINESS_MANAGEMENT_IDENTIFICATION_CODE}`
									);
								}}
								style={{
									tablecell: {
										sx: {
											overflow: 'hidden',
											textOverflow: 'ellipsis',
											whiteSpace: 'nowrap',
										},
									},
								}}
							/>{' '}
							{/* 페이지 네이션 */}
							{managementSupportBusiness && (
								<Box width={'100%'}>
									<SupportiPagination
										limit={10}
										setLimit={setLimit}
										page={page}
										handlePageChange={handlePageChange}
										count={managementSupportBusiness?.count}
										useLimit={false}
									/>
								</Box>
							)}
						</Box>
					)}
				</InternalServiceLayout>
			</Box>
		</InternalServiceDrawer>
	);
};

export default Page;
