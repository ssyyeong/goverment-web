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

export interface ISupportBusinessFilter {
	biz_pbanc_nm?: string;
	supt_biz_clsfc?: string;
	supt_regin?: string;
	aply_trgt?: string;
	biz_enyy?: string;
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
		biz_pbanc_nm: '',
		supt_biz_clsfc: '전체',
		supt_regin: '전체',
		aply_trgt: '전체',
		biz_enyy: '전체',
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
			value: filter.supt_biz_clsfc,
			setValue: (e) => {
				setFilter({ ...filter, supt_biz_clsfc: e });
			},
			dataList: supportField,
		},
		{
			label: '지원 지역',
			value: filter.supt_regin,
			setValue: (e) => {
				setFilter({ ...filter, supt_regin: e });
			},
			dataList: region,
		},
		{
			label: '지원 대상',
			value: filter.aply_trgt,
			setValue: (e) => {
				setFilter({ ...filter, aply_trgt: e });
			},
			dataList: applicationTarget,
		},
		{
			label: '기업 업력',
			value: filter.biz_enyy,
			setValue: (e) => {
				setFilter({ ...filter, biz_enyy: e });
			},
			dataList: startUpPeriod,
		},
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
			value: 'biz_pbanc_nm',
			align: 'center',
		},
		{
			label: '업력',
			value: 'biz_enyy',
			align: 'center',
		},
		{
			label: '지원분야',
			value: 'supt_biz_clsfc',
			align: 'center',
		},
		{
			label: '운영기관',
			value: 'pbanc_ntrp_nm',
			align: 'center',
		},
		{
			label: '지역',
			value: 'supt_regin',
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
	//* Functions
	/**
	 * 창업진흥원 지원 사업 조회
	 */
	const getSupportBusiness = async (filter, setData, page) => {
		console.log(filter);
		//filter 중에 value가 전체가 아닌 것만 필터링
		const filterKeys = Object.keys(filter);
		const filteredFilter: ISupportBusinessFilter = filterKeys.reduce(
			(acc, cur) => {
				if (filter[cur] !== '전체') {
					return { ...acc, [cur]: filter[cur] };
				} else {
					return { ...acc, [cur]: '' };
				}
			},
			{}
		);
		// console.log(filteredFilter);
		const url = `https://apis.data.go.kr/B552735/kisedKstartupService/getAnnouncementInformation?serviceKey=${key}&page=${page}&perPage=10&returnType=json`;

		const encodingRegion = encodeURI(
			`cond[supt_regin::LIKE]=${filteredFilter?.supt_regin}`
		);
		const encodingField = encodeURI(
			`cond[supt_biz_clsfc::LIKE]=${filteredFilter?.supt_biz_clsfc}`
		);
		const encodingTarget = encodeURI(
			`cond[aply_trgt::LIKE]=${filteredFilter?.aply_trgt}`
		);
		const encodingName = encodeURI(
			`cond[biz_pbanc_nm::LIKE]=${filteredFilter?.biz_pbanc_nm}`
		);
		const encodingYear = encodeURI(
			`cond[biz_enyy::LIKE]=${filteredFilter?.biz_enyy}`
		);
		const done = encodeURI(`cond[rcrt_prgs_yn::EQ]=Y`);
		const encoding = `${encodingRegion}&${encodingField}&${encodingTarget}&${encodingName}&${encodingYear}&${done}`;

		await axios
			.get(url + '&' + encoding)
			.then((res) => {
				console.log(res);
				setData(res.data);
			})
			.catch((err) => {
				console.log(err);
			});
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
						data: convertedData,
						matchCount: res.data.result.count,
					});
				} else {
					setSupportBusiness({
						data: [],
						matchCount: 0,
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
							supt_biz_clsfc: res.data.result.FIELD,
							supt_regin: res.data.result.REGION,
							aply_trgt: res.data.result.TARGET,
							biz_enyy: res.data.result.BUSINESS_HISTORY,
							biz_pbanc_nm: '',
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
	const { access } = useUserAccess('SUBSCRIPTION');
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
				biz_pbanc_nm: '',
				supt_biz_clsfc: '전체',
				supt_regin: '전체',
				aply_trgt: '전체',
				biz_enyy: '전체',
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
		<InternalServiceDrawer type="dashboard">
			<Box bgcolor={'primary.light'} sx={{ p: { sm: 5, xs: '0' } }}>
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
								<Typography
									color={'secondary.dark'}
									sx={{ mb: 2 }}
								>
									지원사업을 조회하고 관리할 수 있습니다.
								</Typography>
							</Box>
							<SupportiButton
								contents={'개인 필터 설정하기'}
								onClick={() => {
									if (access) {
										setPersonalFilterModal(true);
									} else {
										setOpen(true);
										setType('subscribe');
										return;
									}
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
								{recommendBusiness?.data.map((item, index) => {
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
									recommendBusiness?.data.length === 0 && (
										<Typography color={'gray'} py={1}>
											필터와 일치하는 지원사업이
											없습니다.(너무 자세한 필터 설정은
											추천 지원사업이 없을 수 있습니다.)
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
										<Typography
											color={'gray'}
											fontWeight={500}
										>
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
								value={filter.biz_pbanc_nm}
								setValue={(e) => {
									setFilter({ ...filter, biz_pbanc_nm: e });
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
								getSupportBusiness(
									filter,
									setSupportBusiness,
									1
								);
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
									총 {supportBusiness?.matchCount}건
								</Typography>
								<SupportiInput
									type="checkbox"
									value={onlySaved}
									setValue={(e) => {
										if (access) {
											setOnlySaved(e);
											setPage(0);
										} else {
											setOpen(true);
											setType('subscribe');
											return;
										}
									}}
									label={'내가 저장한 것만 보기'}
								/>
							</Box>
							<SupportiTable
								rowData={supportBusiness?.data}
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
								count={supportBusiness?.matchCount}
								useLimit={false}
							/>
						</Box>
					)}
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
							getSupportBusiness(
								newFilter,
								setRecommendBusiness,
								0
							);
						}}
						setPersonalFilterExist={setPersonalFilterExist}
					/>
				</Box>
				{/* 알림창 */}
				<SupportiAlertModal
					open={open}
					handleClose={() => setOpen(false)}
					type={type}
				/>
			</Box>
		</InternalServiceDrawer>
	);
};

export default Page;
