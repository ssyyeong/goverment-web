import { Box, Button, Typography } from '@mui/material';
import { NextPage } from 'next';
import React, { useEffect } from 'react';
import { InternalServiceLayout } from '../../../src/views/layout/InternalServiceLayout';
import DefaultController from '@qillie-corp/ark-office-project/src/controller/default/DefaultController';
import { IndicatorManagementBoard } from '../../../src/views/local/internal_service/indicator_management/IndicatorManagementBoard';
import { IIndicatorManagementBoardProps } from '../../../src/views/local/internal_service/indicator_management/IndicatorManagementBoard/IndicatorManagementBoard';
import { useUserAccess } from '../../../src/hooks/useUserAccess';
import SupportiButton from '../../../src/views/global/SupportiButton';
import KpiCard from '../../../src/views/local/internal_service/indicator_management/IndicatorManagementBoard/KpiCard/KpiCard';
import OkrCard from '../../../src/views/local/internal_service/indicator_management/IndicatorManagementBoard/OkrCard/OkrCard';
import InternalServiceDrawer from '../../../src/views/local/internal_service/common/InternalServiceDrawer/InternalServiceDrawer';
import { useAppMember } from '../../../src/hooks/useAppMember';

type TSelectableIndicator = {
	name: string;
	indicatorManagementBoardProps: IIndicatorManagementBoardProps;
};

const Page: NextPage = () => {
	//* Modules
	/**
	 * OKR 컨트롤러
	 */
	const okrController = new DefaultController('OkrMain');

	/**
	 * KPI 컨트롤러
	 */
	const kpiController = new DefaultController('Kpi');
	//* Hooks
	/**
	 * 유저 정보 가져오는 훅
	 */
	const { memberId } = useAppMember();
	//* States

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
						return <OkrCard data={data} />;
					},
					injectedParams: {
						APP_MEMBER_IDENTIFICATION_CODE: memberId,
					},
					getAllCallback:
						okrController.findAllItems.bind(okrController),
				},
			},
		},
		{
			name: 'KPI',
			indicatorManagementBoardProps: {
				name: 'KPI',
				infiniteLoadBoardProps: {
					renderItem: (data, index) => {
						return <KpiCard data={data} />;
					},
					injectedParams: {
						APP_MEMBER_IDENTIFICATION_CODE: memberId,
					},
					getAllCallback:
						kpiController.findAllItems.bind(kpiController),
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

	//* Hooks
	/**
	 * 페이지 진입 시 유저 권한 검사
	 */
	// const userAccess = useUserAccess('SUBSCRIPTION');
	const userAccess = true;

	return (
		<InternalServiceDrawer type="dashboard">
			<Box bgcolor={'primary.light'} p={5}>
				{/* 컨텐츠 레이아웃 */}
				{userAccess === true && (
					<InternalServiceLayout>
						{/* 지표 (OKR / KPI) 선택 영역 */}
						<Box>
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
											border: '1px solid',
											borderRadius: 10,
											height: 3,
											marginRight: 1,
										}}
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
						/>
					</InternalServiceLayout>
				)}
			</Box>
		</InternalServiceDrawer>
	);
};

export default Page;
