import { Box, Typography } from '@mui/material';
import { NextPage } from 'next';
import React, { useEffect } from 'react';
import { InternalServiceLayout } from '../../../src/views/layout/InternalServiceLayout';
import { IndicatorManagementBoard } from '../../../src/views/local/internal_service/indicator_management/IndicatorManagementBoard';
import { IIndicatorManagementBoardProps } from '../../../src/views/local/internal_service/indicator_management/IndicatorManagementBoard/IndicatorManagementBoard';
import { useUserAccess } from '../../../src/hooks/useUserAccess';
import SupportiButton from '../../../src/views/global/SupportiButton';
import KpiCard from '../../../src/views/local/internal_service/indicator_management/IndicatorManagementBoard/KpiCard/KpiCard';
import MainGoalCard from '../../../src/views/local/internal_service/indicator_management/IndicatorManagementBoard/MainGoalCard/MainGoalCard';
import InternalServiceDrawer from '../../../src/views/local/internal_service/common/InternalServiceDrawer';
import { useAppMember } from '../../../src/hooks/useAppMember';
import { KpiController } from '../../../src/controller/KpiController';
import { OkrMainController } from '../../../src/controller/OkrMainController';
import GuidelineModal from '../../../src/views/local/internal_service/indicator_management/IndicatorManagementBoard/GuidelineModal/GuidelineModal';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

type TSelectableIndicator = {
	name: string;
	indicatorManagementBoardProps: IIndicatorManagementBoardProps;
};

const Page: NextPage = () => {
	//* Modules
	/**
	 * OKR 컨트롤러
	 */
	const okrController = new OkrMainController();

	/**
	 * KPI 컨트롤러
	 */
	const kpiController = new KpiController();

	/**
	 *
	 * 가이드라인 오픈 여부
	 */
	const [openGuideline, setOpenGuideline] = React.useState<boolean>(false);

	//* Hooks
	/**
	 * 유저 정보 가져오는 훅
	 */
	const { memberId } = useAppMember();

	//* States

	/**
	 * 재계산 트리거 키
	 */
	const [triggerKey, setTriggerKey] = React.useState<string>();

	/**
	 *
	 * 로딩 상태
	 */
	const [loading, setLoading] = React.useState<boolean>(false);

	//* Constants
	/**
	 * 선택 가능한 지표 목록
	 */
	const selectableIndicatorList: TSelectableIndicator[] = [
		{
			name: 'OKR',
			indicatorManagementBoardProps: {
				name: 'OKR',
				infiniteLoadBoardProps: {
					renderItem: (data, index) => {
						return (
							<MainGoalCard
								data={data}
								setTriggerKey={setTriggerKey}
								loading={loading}
								setLoading={setLoading}
							/>
						);
					},
					injectedParams: {
						APP_MEMBER_IDENTIFICATION_CODE: memberId,
					},
					getAllCallback:
						okrController.getAllOkrMainData.bind(okrController),
				},
			},
		},
		{
			name: 'KPI',
			indicatorManagementBoardProps: {
				name: 'KPI',
				infiniteLoadBoardProps: {
					renderItem: (data, index) => {
						return (
							<KpiCard
								data={data}
								setTriggerKey={setTriggerKey}
							/>
						);
					},
					injectedParams: {
						APP_MEMBER_IDENTIFICATION_CODE: memberId,
					},
					getAllCallback:
						kpiController.getAllKpiData.bind(kpiController),
				},
			},
		},
	];

	//* States (2)
	/**
	 * 선택된 지표
	 */
	const [selectedIndicator, setSelectedIndicator] =
		React.useState<TSelectableIndicator>(selectableIndicatorList[0]);

	//* Functions
	/**
	 * 카테고리에 따라
	 */
	const [selectableCategoryList, setSelectableCategoryList] =
		React.useState(undefined);

	//* Hooks
	/**
	 * 페이지 진입 시 유저 권한 검사
	 */
	// const userAccess = useUserAccess('SUBSCRIPTION');

	React.useEffect(() => {
		memberId &&
			kpiController.getAllKpiCategory(
				{
					APP_MEMBER_IDENTIFICATION_CODE: memberId,
				},
				(res) => {
					if (res.data.result) {
						const temp = res.data.result?.map((item) => {
							return {
								value: item,
								label: item,
							};
						});
						setSelectableCategoryList(temp);
					}
				},
				(err) => {
					console.log(err);
				}
			);
	}, [memberId, triggerKey]);

	const userAccess = true;

	return (
		memberId && (
			<InternalServiceDrawer type="dashboard" loading={loading}>
				<Box bgcolor={'primary.light'} sx={{ p: { sm: 5, xs: '0' } }}>
					{/* 컨텐츠 레이아웃 */}
					{userAccess === true && (
						<InternalServiceLayout
							title="성과 관리"
							subTitle="우리 회사의 지표를 설정하고 목표 달성률, 
							달성에 대한 정도를 시각화해서 보실 수 있어요"
							image="/images/main/indicatorHead.webp"
							mobileImage="/images/main/indicatorHeadMobile.webp"
						>
							<Box
								display="flex"
								justifyContent={'space-between'}
								alignItems={'center'}
								pb={1}
								mb={1}
								px={{ sm: 0, xs: 2 }}
							>
								{/* 지표 (OKR / KPI) 선택 영역 */}
								<Box display={'flex'} gap={3}>
									{selectableIndicatorList.map(
										(selectableIndicator) => (
											<Typography
												variant="h4"
												fontWeight={'800'}
												onClick={() => {
													setSelectedIndicator(
														selectableIndicator
													);
												}}
												sx={{
													color:
														selectableIndicator.name ===
														selectedIndicator.name
															? 'primary.main'
															: 'grey',
													cursor: 'pointer',
												}}
											>
												{selectableIndicator.name}
											</Typography>
										)
									)}
								</Box>

								<Box
									display="flex"
									alignItems={'center'}
									gap={0.5}
								>
									<Typography fontWeight={500}>
										가이드라인
									</Typography>
									<HelpOutlineIcon
										sx={{
											color: 'secondary.dark',
											width: '20px',
											height: '20px',
											cursor: 'pointer',
										}}
										onClick={() => {
											setOpenGuideline(true);
										}}
									/>
								</Box>
							</Box>
							<Typography
								color={'secondary.dark'}
								sx={{ mb: 2, pb: 1 }}
								px={{ sm: 0, xs: 2 }}
								lineHeight={1.5}
							>
								{selectedIndicator.name === 'OKR'
									? '서포티의 OKR관리를 이용해 보다 쉽게 전사목표와 하위목표를 설계하고 달성까지 함께 하세요!'
									: '서포티의 KPI관리를 이용해 보다 쉽게 성과관리를 하고 목표달성까지 함께 하세요!'}
							</Typography>
							{/* 지표 보드 영역 */}
							<IndicatorManagementBoard
								key={JSON.stringify(selectedIndicator)}
								{...selectedIndicator.indicatorManagementBoardProps}
								name={selectedIndicator.name}
								triggerKey={triggerKey}
								setTriggerKey={setTriggerKey}
								loading={loading}
								setLoading={setLoading}
								selectableKpiCategoryList={
									selectableCategoryList
								}
							/>
						</InternalServiceLayout>
					)}
				</Box>
				<GuidelineModal
					modalOpen={openGuideline}
					setModalOpen={setOpenGuideline}
				/>
			</InternalServiceDrawer>
		)
	);
};

export default Page;
