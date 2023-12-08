import { Box } from '@mui/material';
import { NextPage } from 'next';
import React, { useEffect } from 'react';
import { InternalServiceLayout } from '../../../src/views/layout/InternalServiceLayout';
import DefaultController from '@qillie-corp/ark-office-project/src/controller/default/DefaultController';
import { IKpi, IOkrCombination } from '../../../src/@types/model';

const Page: NextPage = () => {
	//* Modules
	/**
	 * 컨트롤러들
	 */

	//* States
	/**
	 * 선택된 카테고리
	 */
	const [selectedCategory, setSelectedCategory] =
		React.useState<number>(null);

	/**
	 * ORK 지표 데이터 리스트
	 */
	const [okrList, setOkrList] = React.useState<IOkrCombination[]>([]);

	/**
	 * KPI 지표 데이터 리스트
	 */
	const [kpiList, setKpiList] = React.useState<IKpi[]>([]);

	//* Constants
	/**
	 * 카테고리 목록
	 */
	const categoryList: { name: string; controller: any }[] = [
		// {
		// 	name: 'OKR',
		//     registerModal:,
		//         board: <OkrBoard dataList={okrList} />
		// },
		// {
		// 	name: 'KPI',
		// 	registerModal: ,
		//         board: <KpiBoard dataList={kpiList} />
		// },
	];

	/**
	 * 진행 상태 필터
	 */
	const statusFilterList = ['진행 중', '완료', '보류', '취소'];

	//* Functions
	/**
	 * 카테고리에 따라
	 */

	//* Hooks

	return (
		<Box>
			{/* 컨텐츠 레이아웃 */}
			<InternalServiceLayout>
				{/* 새로운 목표 등록 영역  */}

				{/* 계좌 내역 컨트롤러 영역 (날짜, 거래 내역 검색) */}

				{/* 실제 계좌 내역 */}

				{/* 번레이트 계산 */}
			</InternalServiceLayout>
		</Box>
	);
};

export default Page;
