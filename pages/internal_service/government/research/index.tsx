import React from 'react';

import { NextPage } from 'next';

import { Box, IconButton, Skeleton, Tooltip, Typography } from '@mui/material';
import InternalServiceDrawer from '../../../../src/views/local/internal_service/common/InternalServiceDrawer';
import { InternalServiceLayout } from '../../../../src/views/layout/InternalServiceLayout';
import { usePagination } from '../../../../src/hooks/usePagination';
import axios from 'axios';
import SupportiInput from '../../../../src/views/global/SupportiInput';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import {
	applicationTarget,
	region,
	startUpPeriod,
	supportField,
} from '../../../../configs/data/SupportBusinessConfig';
import SupportiButton from '../../../../src/views/global/SupportiButton';
import SupportiTable, {
	TableHeaderProps,
} from '../../../../src/views/global/SupportiTable/SupportiTable';
import SupportiPagination from '../../../../src/views/global/SupportiPagination';
import SupportBusinessModal from '../../../../src/views/local/internal_service/supportBusiness/SupportBusinessModal';
import DefaultController from '@leanoncompany/supporti-ark-office-project/src/controller/default/DefaultController';
import { useAppMember } from '../../../../src/hooks/useAppMember';

import RecommendSupportBusinessCard from '../../../../src/views/local/internal_service/supportBusiness/RecommendSupportBusinessCard';
import PersonalFilterModal from '../../../../src/views/local/internal_service/supportBusiness/PersonalFilterModal';
import { useUserAccess } from '../../../../src/hooks/useUserAccess';
import useAlert from '../../../../src/hooks/useAlert/useAlert';
import { SupportiAlertModal } from '../../../../src/views/global/SupportiAlertModal';
import { gTagEvent } from '../../../../src/lib/gtag';
import Image from 'next/image';

export interface ISupportBusinessFilter {
	BUSINESS_TITLE?: string;
	FIELD?: string;
	REGION?: string;
	TARGET?: string;
}

const Page: NextPage = () => {
	//* Modules
	//* States
	/**
	 * 지원사업데이터
	 */
	const [supportBusiness, setSupportBusiness] = React.useState<any>();
	/**
	 * 추천사업데이터
	 */
	const [recommendBusiness, setRecommendBusiness] = React.useState<any>();
	/**
	 * 필터
	 */
	const [filter, setFilter] = React.useState<ISupportBusinessFilter>({
		BUSINESS_TITLE: '',
		FIELD: '전체',
		REGION: '전체',
		TARGET: '전체',
	});
	/**
	 *개별 필터
	 */
	const [personalFilter, setPersonalFilter] =
		React.useState<ISupportBusinessFilter>();
	/**
	 * 개별필터 존재 여부
	 */
	const [personalFilterExist, setPersonalFilterExist] =
		React.useState<boolean>(false);
	/**
	 * 디테일 모달 오픈
	 */
	const [detailModal, setDetailModal] = React.useState<boolean>(false);
	/**
	 * 디테일 데이터
	 */
	const [detailData, setDetailData] = React.useState<any>();
	/**
	 * 내가 저장한 것만 보기
	 */
	const [onlySaved, setOnlySaved] = React.useState<boolean>(false);
	/**
	 * 개인 필터 모달 오픈
	 */
	const [personalFilterModal, setPersonalFilterModal] =
		React.useState<boolean>(false);

	//* Constants
	const key =
		'NJQXofPHOFlkFdZfoS/qDsBSmGIeP7v2gjzAhMYVhOahymMgClK76IrVN7Xhn2rOeISUl/24QzzM7w7Dp3RpNQ==';

	const selectableConfig = [
		{
			label: '지원 분야',
			value: filter.FIELD,
			setValue: (e) => {
				setFilter({ ...filter, FIELD: e });
			},
			dataList: supportField,
		},
		{
			label: '지원 지역',
			value: filter.REGION,
			setValue: (e) => {
				setFilter({ ...filter, REGION: e });
			},
			dataList: region,
		},
		{
			label: '지원 대상',
			value: filter.TARGET,
			setValue: (e) => {
				setFilter({ ...filter, TARGET: e });
			},
			dataList: applicationTarget,
		},
		// {
		// 	label: '기업 업력',
		// 	value: filter.biz_enyy,
		// 	setValue: (e) => {
		// 		setFilter({ ...filter, biz_enyy: e });
		// 	},
		// 	dataList: startUpPeriod,
		// },
	];

	const supportBusinessHeaderData: TableHeaderProps[] = [
		{
			label: 'NO',
			value: '',
			format: (value, key, idx) => {
				return page * 10 + (idx + 1);
			},
			align: 'left',
		},
		{
			label: '제목',
			value: 'BUSINESS_TITLE',
			align: 'center',
		},
		{
			label: '지원분야',
			value: 'FIELD',
			align: 'center',
		},
		{
			label: '운영기관',
			value: 'COMPETENT_AGENCY',
			align: 'center',
		},
		{
			label: '지역',
			value: 'REGION',
			align: 'center',
		},
	];
	//* Controller
	const userSupportBusinessController = new DefaultController(
		'UserSupportBusiness'
	);
	const supportBusinessConfigController = new DefaultController(
		'SupportBusinessConfig'
	);

	const supportBusinessController = new DefaultController('SupportBusiness');
	//* Functions
	/**
	 * 창업진흥원 지원 사업 조회
	 */
	const getSupportBusiness = async (filter, setData, page) => {
		gTagEvent({
			action: 'support_business_search',
			category: 'support_business_search',
			label: 'support_business_search',
			value: 1,
		});
		//filter 중에 value가 전체가 아닌 것만 필터링
		const filterKeys = Object.keys(filter);
		const filteredFilter = filterKeys.reduce((acc, cur) => {
			if (filter[cur] !== '전체' && filter[cur] !== '') {
				acc[cur] = filter[cur];
			}
			return acc;
		}, {});
		supportBusinessController.findAllItems(
			{
				...filteredFilter,
				LIMIT: 10,
				PAGE: page,
			},
			(res) => {
				setData(res.data.result);
			}
		);
	};

	/**
	 * 저장된 지원사업 조회
	 */
	const getSavedSupportBusiness = () => {
		userSupportBusinessController.findAllItems(
			{
				APP_MEMBER_IDENTIFICATION_CODE: memberId,
				SAVED_YN: 'Y',
				LIMIT: 10,
				PAGE: page,
			},
			(res) => {
				if (res.data.result.rows !== 0) {
					const convertedData = res.data.result.rows.map((item) => {
						return {
							...item,
							...JSON.parse(item.DATA),
						};
					});
					setSupportBusiness({
						rows: convertedData,
						count: res.data.result.count,
					});
				} else {
					setSupportBusiness({
						rows: [],
						count: 0,
					});
				}
			}
		);
	};

	/**
	 * 저장된 지원사업 필터 조회
	 */
	const getSupportBusinessConfig = () => {
		supportBusinessConfigController.getOneItemByKey(
			{
				APP_MEMBER_IDENTIFICATION_CODE: memberId,
			},
			(res) => {
				if (res.data.result) {
					setPersonalFilterExist(true);
					getSupportBusiness(
						{
							FIELD: res.data.result.FIELD,
							REGION: res.data.result.REGION,
							TARGET: res.data.result.TARGET,
							BUSINESS_TITLE: '',
						},
						setRecommendBusiness,
						0
					);
				} else {
					setPersonalFilterExist(false);
				}
			}
		);
	};

	//* Hooks
	/**
	 * 유저 아이디
	 */
	const { memberId } = useAppMember();
	/**
	 * 페이지네이션
	 */
	const { page, limit, handlePageChange, setLimit, setPage } =
		usePagination();
	/**
	 * 구독 체크
	 */
	// const { access } = useUserAccess('SUBSCRIPTION');
	/**
	 * 알러트
	 */
	const { open, setOpen, setType, type } = useAlert({});
	/**
	 *
	 */
	React.useEffect(() => {
		if (onlySaved) {
			setFilter({
				BUSINESS_TITLE: '',
				FIELD: '전체',
				REGION: '전체',
				TARGET: '전체',
			});
			getSavedSupportBusiness();
		} else {
			getSupportBusiness(filter, setSupportBusiness, page);
		}
	}, [page, onlySaved]);

	React.useEffect(() => {
		if (memberId) {
			getSupportBusinessConfig();
		}
	}, [memberId]);

	console.log(recommendBusiness, 'recommendBusiness');
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
				{/* 컨텐츠 */}
				<Box display={'flex'} flexDirection={'column'}>
					<Box
						display={'flex'}
						justifyContent={'space-between'}
						alignItems={'center'}
					>
						<Box>
							<Typography
								variant="h3"
								fontWeight={'bold'}
								sx={{ mb: 2 }}
							>
								지원 사업 조회
							</Typography>
							<Typography color={'secondary.dark'} sx={{ mb: 2 }}>
								지원사업을 조회하고 관리할 수 있습니다.
							</Typography>
						</Box>
						<SupportiButton
							contents={'개인 필터 설정하기'}
							onClick={() => {
								// if (access) {
								setPersonalFilterModal(true);
								// } else {
								// 	setOpen(true);
								// 	setType('subscribe');
								// 	return;
								// }
							}}
						/>
					</Box>
					{/* 추천 지원 사업 */}
					{personalFilterExist && (
						<Typography
							fontWeight={'600'}
							variant="subtitle2"
							sx={{
								display: 'flex',
								alignItems: 'center',
							}}
						>
							추천 지원 사업{' '}
							<Tooltip
								title={
									'개인 필터 설정을 통해 추천받은 지원사업입니다.'
								}
								arrow
								placement="top"
								slotProps={{
									popper: {
										modifiers: [
											{
												name: 'offset',
												options: {
													offset: [0, -14],
												},
											},
										],
									},
								}}
							>
								<IconButton size="small">
									<HelpOutlineIcon fontSize="small" />
								</IconButton>
							</Tooltip>
						</Typography>
					)}
					{personalFilterExist && (
						<Box
							display={'flex'}
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
							gap={1}
							pb={1}
							my={1}
						>
							{recommendBusiness?.rows.map((item, index) => {
								return (
									<Box
										key={index}
										onClick={() => {
											setDetailData(item);
											setDetailModal(true);
										}}
									>
										<RecommendSupportBusinessCard
											supportBusiness={item}
										/>
									</Box>
								);
							})}
							{
								// 추천 지원 사업이 없을 경우
								recommendBusiness?.rows.length === 0 && (
									<Typography color={'gray'} py={1}>
										필터와 일치하는 지원사업이
										없습니다.(너무 자세한 필터 설정은 추천
										지원사업이 없을 수 있습니다.)
									</Typography>
								)
							}
						</Box>
					)}

					{/* 필터 선택 */}
					<Box display={'flex'} flexWrap={'wrap'} gap={1} mt={2}>
						{selectableConfig.map((item, index) => {
							return (
								<Box
									display={'flex'}
									flexDirection={'column'}
									width={{ xs: '100%', md: '49%' }}
									gap={1}
								>
									<Typography color={'gray'} fontWeight={500}>
										{item.label}
									</Typography>
									<SupportiInput
										dataList={item.dataList}
										value={item.value}
										setValue={item.setValue}
										type="select"
										width={'100%'}
									/>
								</Box>
							);
						})}
					</Box>
					{/* 검색창 */}
					<Box
						mt={1}
						display={'flex'}
						flexDirection={'column'}
						gap={1}
					>
						<Typography color={'gray'} fontWeight={500}>
							지원사업명
						</Typography>
						<SupportiInput
							type="input"
							value={filter.BUSINESS_TITLE}
							setValue={(e) => {
								setFilter({ ...filter, BUSINESS_TITLE: e });
							}}
							additionalProps={{
								placeholder: '지원사업명을 검색하세요',
							}}
							width={'99%'}
							style={{ bgcolor: 'white' }}
						/>
					</Box>
					{/* 검색 */}
					<SupportiButton
						contents={'검색하기'}
						onClick={() => {
							setOnlySaved(false);
							getSupportBusiness(filter, setSupportBusiness, 1);
							if (page !== 1) {
								handlePageChange(1);
							}
						}}
						variant="contained"
						isGradient
						style={{ width: '20% ', margin: 'auto', mt: 2 }}
					/>
				</Box>
				{supportBusiness === undefined && (
					<Box
						width={'100%'}
						display={'flex'}
						flexDirection={'column'}
						gap={2}
						mt={3}
					>
						<Skeleton
							variant="rounded"
							width={'100%'}
							height={350}
						/>
					</Box>
				)}
				{/* 테이블 */}

				{supportBusiness && (
					<Box width={'100%'} mt={2}>
						<Box
							display={'flex'}
							justifyContent={'space-between'}
							alignItems={'center'}
							mb={1}
						>
							<Typography color={'gray'}>
								{' '}
								총 {supportBusiness?.count}건
							</Typography>
							<SupportiInput
								type="checkbox"
								value={onlySaved}
								setValue={(e) => {
									// if (access) {
									setOnlySaved(e);
									setPage(0);
									// } else {
									// 	setOpen(true);
									// 	setType('subscribe');
									// 	return;
									// }
								}}
								label={'내가 저장한 것만 보기'}
							/>
						</Box>
						<SupportiTable
							rowData={supportBusiness?.rows}
							headerData={supportBusinessHeaderData}
							onClick={(row) => {
								setDetailData(row);
								setDetailModal(true);
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
						/>
					</Box>
				)}
				{/* 페이지 네이션 */}
				{supportBusiness && (
					<Box width={'100%'} p={2}>
						<SupportiPagination
							limit={10}
							setLimit={setLimit}
							page={page}
							handlePageChange={handlePageChange}
							count={supportBusiness?.count}
							useLimit={false}
						/>
					</Box>
				)}
				{/* api 통합 사이트 */}
				<Box
					width={'100%'}
					display={'flex'}
					justifyContent={'center'}
					alignItems={'center'}
					gap={5}
					mt={3}
				>
					<Image
						src={'/images/logo/jinheung.svg'}
						width={100}
						height={100}
						alt="산업진흥원"
					/>
					<Image
						src={
							'https://www.bizinfo.go.kr/images/bizinfo/common/logo.png'
						}
						width={100}
						height={100}
						alt="기업마당"
					/>
					<Image
						src={'/images/logo/venture.png'}
						width={100}
						height={100}
						alt="중소벤처"
					/>
				</Box>
			</InternalServiceLayout>
			{/* 디테일 모달 */}
			{detailData && (
				<Box key={detailModal.toString()}>
					<SupportBusinessModal
						modalOpen={detailModal}
						setModalOpen={setDetailModal}
						supportBusiness={detailData}
					/>
				</Box>
			)}
			{/* 개인 필터 설정 모달 */}
			<Box key={personalFilterModal.toString()}>
				<PersonalFilterModal
					modalOpen={personalFilterModal}
					setModalOpen={setPersonalFilterModal}
					additionalFunction={(newFilter) => {
						getSupportBusiness(newFilter, setRecommendBusiness, 0);
					}}
					setPersonalFilterExist={setPersonalFilterExist}
				/>
			</Box>
			{/* 알림창 */}
			<SupportiAlertModal
				open={open}
				handleClose={() => setOpen(false)}
				type={'login'}
			/>
		</Box>
		// </InternalServiceDrawer>
	);
};

export default Page;
