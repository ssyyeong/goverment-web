import React, { useEffect } from 'react';

import { Box, Typography } from '@mui/material';
import useInfiniteScroll from 'react-infinite-scroll-hook';
import { InfiniteLoadBoard } from '../../../../../modules/will_be_in_core/InfiniteLoadBoard';
import { IKpi, IOkrCombination } from '../../../../../@types/model';
import { IInfiniteLoadBoardProps } from '../../../../../modules/will_be_in_core/InfiniteLoadBoard/InfiniteLoadBoard';
import { TRenderItemCallback } from '../../../../../@types/callbacks';

import SupportiButton from '../../../../global/SupportiButton';
import OkrCreateModal from './Okr/OkrCreateModal/OkrCreateModal';
import KpiCreateModal from './Kpi/KpiCreateModal/KpiCreateModal';
import SupportiToggle from '../../../../global/SupportiToggle';
import SupportiInput from '../../../../global/SupportiInput';

import { IndicatorCategory } from '../../../../../../configs/data/IndicatorCategoryConfig';
import { useAppMember } from '../../../../../hooks/useAppMember';
import Nodata from '../../../../global/NoData/NoData';
import { KpiController } from '../../../../../controller/KpiController';
import KpiTable from './Kpi/KpiTable/KpiTable';
interface IIndicatorManagementBoardProps {
	/**
	 * 무한 스크롤 게시판에 들어갈 props
	 */
	infiniteLoadBoardProps: Partial<IInfiniteLoadBoardProps>;
	name: string;

	/**
	 * 추가 필터 사용 시
	 */
	additionalFilterConfigList?: {
		paramKey: string;
		selectedValue: any;
		setSelectedValue: React.Dispatch<any>;
		selectableList: { value: any; label: string }[];
		renderItem: TRenderItemCallback;
	}[];
	/**
	 * 트리거키
	 */
	triggerKey?: string;
	setTriggerKey?: React.Dispatch<React.SetStateAction<string>>;

	/**
	 * KPI 카테고리
	 */
	selectableKpiCategoryList?: any;

	/**
	 * 로딩 상태
	 */
	loading?: boolean;
	setLoading?: React.Dispatch<React.SetStateAction<boolean>>;
}

const IndicatorManagementBoard = (props: IIndicatorManagementBoardProps) => {
	//* Modules

	//* Constants
	/**
	 * 선택 가능한 정렬
	 */
	const selectableSortList: { value: string; label: string }[] = [
		{
			value: JSON.stringify({
				SORT_KEY: 'CREATED_AT',
				SORT_DIRECTION: 'ASC',
			}),
			label: '오래된 순',
		},
		{
			value: JSON.stringify({
				SORT_KEY: 'CREATED_AT',
				SORT_DIRECTION: 'DESC',
			}),
			label: '최신순',
		},
	];

	/**
	 * 선택 가능한 상태
	 */
	const selectableStatusList: { value: boolean; label: string }[] = [
		{
			value: false,
			label: '진행중',
		},
		{
			value: true,
			label: '완료',
		},
	];

	/**
	 * 선택 가능한 KPI 카테고리
	 */
	const selectableKpiCategoryList: {
		value: string | undefined;
		label: string;
	}[] = [
		{
			label: '전체',
			value: '전체',
		},
		{
			label: '재무',
			value: '재무',
		},
		{
			label: '고객 서비스',
			value: '고객 서비스',
		},
		{
			label: '운영',
			value: '운영',
		},
		{
			label: '마케팅',
			value: '마케팅',
		},
		{
			label: '인력관리',
			value: '인력관리',
		},
		{
			label: '기술 및 혁신',
			value: '기술 및 혁신',
		},
		{
			label: '지속 가능성',
			value: '지속 가능성',
		},
		{
			label: '소셜미디어',
			value: '소셜미디어',
		},
		{
			label: '효율성',
			value: '효율성',
		},
		{
			label: '품질',
			value: '품질',
		},
		{
			label: '프로젝트',
			value: '프로젝트',
		},
	];

	//* States
	/**
	 * 지표 (OKR / KPI) 데이터 리스트
	 */
	const [indicatorList, setIndicatorList] = React.useState<
		IOkrCombination[] | IKpi[]
	>([]);

	/**
	 * 정렬 방식 선택
	 */
	const [selectedSort, setSelectedSort] = React.useState<string>(
		selectableSortList[0].value
	);

	/**
	 * 상태 영역 (진행중 / 완료) 선택
	 */
	const [selectedStatus, setSelectedStatus] = React.useState<boolean>(
		selectableStatusList[0].value
	);

	/**
	 * KPI 카테고리 선택
	 */

	const [selectedKpiCategory, setSelectedKpiCategory] = React.useState<
		string | undefined
	>(
		selectableKpiCategoryList.concat(props.selectableKpiCategoryList)[0]
			.value
	);

	/**
	 *  지표 등록하는 모달 오픈 여부
	 */
	const [indicatorRegisterModal, setIndicatorRegisterModal] =
		React.useState<boolean>(false);

	//* Functions
	/**
	 * 무한 로딩 게시판에 들어갈 injectedParams 를 만들어주는 함수
	 */

	const { memberId } = useAppMember();

	const makeInjectedParams = () => {
		const injectedParams = Object.assign(
			// props.infiniteLoadBoardProps?.injectedParams,
			{
				APP_MEMBER_IDENTIFICATION_CODE: memberId,
			},
			/**
			 * 상태 선택
			 */
			// JSON.parse(selectedStatus),
			/**
			 * 정렬 선택
			 */
			JSON.parse(selectedSort),
			/**
			 * KPI 카테고리 선택
			 */
			selectedKpiCategory !== null &&
				props.name === 'KPI' && {
					CATEGORY:
						selectedKpiCategory === '전체'
							? undefined
							: selectedKpiCategory,
				}
		);

		// if (props.additionalFilterConfigList) {
		// 	props.additionalFilterConfigList.forEach((config) => {
		// 		injectedParams[config.paramKey] = config.selectedValue;
		// 	});
		// }

		return injectedParams;
	};

	return (
		<Box
			display="flex"
			flexDirection="column"
			gap={1}
			sx={{
				pl: { xs: '15px', md: '0' },
				pr: { xs: '15px', md: '0' },
			}}
		>
			{/* 컨트롤러 영역 */}
			{props.name === 'OKR' && (
				<Box
					display={'flex'}
					justifyContent={'space-between'}
					alignItems={'center'}
				>
					{/* 상태 영역 (진행중 / 완료) */}
					<SupportiToggle
						chipDataList={selectableStatusList}
						value={selectedStatus}
						setValue={(value) =>
							setSelectedStatus(value as boolean)
						}
						chipHeight={'30px'}
						style={{
							outerBoxStyle: {
								width: '150px',
								height: '36px',
								marginTop: 'auto',
								marginBottom: 'auto',
							},
							chipStyle: {
								height: '30px',
							},
						}}
					/>
					{/* 정렬 선택 (오래된 순 / 최신 순) 영역 */}
					<Box
						display={'flex'}
						width={'100%'}
						justifyContent={'end'}
						gap={2}
					>
						{/* <SupportiInput
						type="select"
						value={selectedSort}
						setValue={(value) => setSelectedSort(value as string)}
						dataList={selectableSortList}
						width={'100px'}
					/> */}
						{selectableSortList.map((selectableSort) => (
							<Typography
								fontWeight={'600'}
								color={
									selectableSort.value === selectedSort
										? 'primary'
										: 'secondary'
								}
								sx={{
									cursor: 'pointer',
								}}
								onClick={() => {
									setSelectedSort(selectableSort.value);
								}}
							>
								{selectableSort.label}
							</Typography>
						))}
					</Box>
				</Box>
			)}
			{/* 새로운 목표 등록 영역 */}
			<Box
				sx={{
					pl: { xs: '0', md: '0' },
					pr: { xs: '0', md: '0' },
				}}
			>
				<SupportiButton
					contents={`+ ${props.name} 목표 등록`}
					startIcon={<img src="/images/icons/flag.svg" />}
					onClick={() => setIndicatorRegisterModal(true)}
					isGradient={true}
					style={{
						height: { xs: '40px', md: 40 },
						color: 'white',
						backgroundImage: `linear-gradient(289deg, #000 9%, #545454 89%)`,
						marginTop: '10px',
						width: { xs: '100%', md: '100%' },
					}}
				/>
			</Box>
			{/* 추가 필터 영역 */}
			{props.additionalFilterConfigList?.map((config, index) => (
				<Box></Box>
			))}

			{/* KPI 카테고리 셀렉터 */}
			{props.name === 'KPI' && (
				<SupportiInput
					type="select"
					value={selectedKpiCategory}
					setValue={(value: any) => setSelectedKpiCategory(value)}
					dataList={selectableKpiCategoryList.concat(
						props.selectableKpiCategoryList
					)}
					width={'100px'}
				/>
			)}

			{/* 지표 목록 영역 */}
			{memberId && (
				<InfiniteLoadBoard
					{...Object.assign(props.infiniteLoadBoardProps, {
						injectedParams: {
							FIND_OPTION_KEY_LIST: makeInjectedParams(),
							COMPLETED: selectedStatus,
						},
					})}
					allData={indicatorList}
					setAllData={setIndicatorList}
					triggerKey={props.triggerKey}
					name={props.name}
				/>
			)}

			{/* 데이터 없을 때 */}
			{indicatorList.length === 0 && <Nodata />}

			{props.name === 'OKR' && (
				<Box key={indicatorRegisterModal.toString()}>
					<OkrCreateModal
						modalOpen={indicatorRegisterModal}
						setModalOpen={setIndicatorRegisterModal}
						setTriggerKey={props.setTriggerKey}
						loading={props.loading}
						setLoading={props.setLoading}
					/>
				</Box>
			)}
			{props.name === 'KPI' && (
				<KpiCreateModal
					modalOpen={indicatorRegisterModal}
					setModalOpen={setIndicatorRegisterModal}
					setTriggerKey={props.setTriggerKey}
				/>
			)}

			{/* {props.name === 'KPI' && <KpiTable />} */}
		</Box>
	);
};

export default IndicatorManagementBoard;
export type { IIndicatorManagementBoardProps };
