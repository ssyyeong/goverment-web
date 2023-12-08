import { Box, Button } from '@mui/material';
import { NextPage } from 'next';
import React, { useEffect } from 'react';
import { InternalServiceLayout } from '../../../src/views/layout/InternalServiceLayout';
import DefaultController from '@qillie-corp/ark-office-project/src/controller/default/DefaultController';
import { IKpi, IOkrCombination } from '../../../src/@types/model';
import { IndicatorManagementBoard } from '../../../src/views/local/internal_service/indicator_management/IndicatorManagementBoard';
import { IIndicatorManagementBoardProps } from '../../../src/views/local/internal_service/indicator_management/IndicatorManagementBoard/IndicatorManagementBoard';
import { useUserAccess } from '../../../src/hooks/useUserAccess';

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

	//* States

	//* Constants
	/**
	 * 선택 가능한 지표 목록
	 */
	const selectableIndicatorList: TSelectableIndicator[] = [
		{
			name: 'OKR',
			indicatorManagementBoardProps: {
				infiniteLoadBoardProps: {
					renderItem: (data, index) => {
						return <Box></Box>;
					},
					injectedParams: {
						APP_MEMBER_IDENTIFICATION_CODE: 0,
					},
					getAllCallback:
						okrController.createItem.bind(okrController),
				},
			},
		},
		{
			name: 'KPI',
			indicatorManagementBoardProps: {
				infiniteLoadBoardProps: {
					renderItem: (data, index) => {
						return <Box></Box>;
					},
					injectedParams: {
						APP_MEMBER_IDENTIFICATION_CODE: 0,
					},
					getAllCallback:
						kpiController.createItem.bind(kpiController),
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
	const userAccess = useUserAccess('SUBSCRIPTION');

	return (
		<Box>
			{/* 컨텐츠 레이아웃 */}
			{userAccess === true && (
				<InternalServiceLayout>
					{/* 지표 (OKR / KPI) 선택 영역 */}
					<Box>
						{selectableIndicatorList.map((selectableIndicator) => (
							<Box>
								<Button>{selectableIndicator.name}</Button>
							</Box>
						))}
					</Box>

					{/* 지표 보드 영역 */}
					<IndicatorManagementBoard
						key={JSON.stringify(selectedIndicator)}
						{...selectedIndicator.indicatorManagementBoardProps}
					/>
				</InternalServiceLayout>
			)}
		</Box>
	);
};

export default Page;
