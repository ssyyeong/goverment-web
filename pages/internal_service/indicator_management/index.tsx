import { Box, Button, Typography } from '@mui/material';
import { NextPage } from 'next';
import React, { useEffect } from 'react';
import { InternalServiceLayout } from '../../../src/views/layout/InternalServiceLayout';
import DefaultController from '@leanoncompany/supporti-ark-office-project/src/controller/default/DefaultController';
import { IndicatorManagementBoard } from '../../../src/views/local/internal_service/indicator_management/IndicatorManagementBoard';
import { IIndicatorManagementBoardProps } from '../../../src/views/local/internal_service/indicator_management/IndicatorManagementBoard/IndicatorManagementBoard';
import { useUserAccess } from '../../../src/hooks/useUserAccess';
import SupportiButton from '../../../src/views/global/SupportiButton';
import KpiCard from '../../../src/views/local/internal_service/indicator_management/IndicatorManagementBoard/KpiCard/KpiCard';
import MainGoalCard from '../../../src/views/local/internal_service/indicator_management/IndicatorManagementBoard/MainGoalCard/MainGoalCard';
import InternalServiceDrawer from '../../../src/views/local/internal_service/common/InternalServiceDrawer/InternalServiceDrawer';
import { useAppMember } from '../../../src/hooks/useAppMember';
import { KpiController } from '../../../src/controller/KpiController';
import { OkrMainController } from '../../../src/controller/OkrMainController';

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
	//* Hooks
	/**
	 * 유저 정보 가져오는 훅
	 */
	const { memberId } = useAppMember();
	//* States
	const [triggerKey, setTriggerKey] = React.useState<string>();
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

	console.log(triggerKey, 'triggerKey');
	//* Functions
	/**
	 * 카테고리에 따라
	 */

	//* Hooks
	/**
	 * 페이지 진입 시 유저 권한 검사
	 */
	// const userAccess = useUserAccess('SUBSCRIPTION');
	const userAccess = true;

	return (
		memberId && (
			<InternalServiceDrawer type="dashboard">
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
							{/* 지표 (OKR / KPI) 선택 영역 */}
							<Box sx={{ pl: { xs: '15px', sm: '0' } }}>
								{selectableIndicatorList.map(
									(selectableIndicator) => (
										<SupportiButton
											contents={selectableIndicator.name}
											onClick={() => {
												setSelectedIndicator(
													selectableIndicator
												);
											}}
											style={{
												border: 'solid 1px #d1d4db',
												borderRadius: 10,
												height: 3,
												marginRight: 1,
												color:
													selectableIndicator.name ===
													selectedIndicator.name
														? 'common.white'
														: 'common.black',
												backgroundColor:
													selectableIndicator.name ===
													selectedIndicator.name
														? 'common.black'
														: 'common.white',
											}}
											variant="contained"
											color={
												selectableIndicator.name ===
												selectedIndicator.name
													? 'primary'
													: 'secondary'
											}
										/>
									)
								)}
							</Box>

							{/* 지표 보드 영역 */}
							<IndicatorManagementBoard
								key={JSON.stringify(selectedIndicator)}
								{...selectedIndicator.indicatorManagementBoardProps}
								name={selectedIndicator.name}
								triggerKey={triggerKey}
								setTriggerKey={setTriggerKey}
							/>
						</InternalServiceLayout>
					)}
				</Box>
			</InternalServiceDrawer>
		)
	);
};

export default Page;
