import React from 'react';

import { Box, BoxProps, Typography } from '@mui/material';
import useInfiniteScroll from 'react-infinite-scroll-hook';
import { InfiniteLoadBoard } from '../../../../../modules/will_be_in_core/InfiniteLoadBoard';
import { IKpi, IOkrCombination } from '../../../../../@types/model';
import { IInfiniteLoadBoardProps } from '../../../../../modules/will_be_in_core/InfiniteLoadBoard/InfiniteLoadBoard';
import { TRenderItemCallback } from '../../../../../@types/callbacks';

import FlagIcon from '@mui/icons-material/Flag';
import SupportiButton from '../../../../global/SupportiButton';
import OkrModal from './OkrModal/OkrModal';
import KpiModal from './KpiModal/KpiModal';
import SupportiToggle from '../../../../global/SupportiToggle';
import SupportiInput from '../../../../global/SupportiInput';
import moment from 'moment';
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
	 * 선택 가능한 정렬
	 */
	const okrSelectablePeriodList: { value: string; label: string }[] = [
		{
			value: JSON.stringify({
				PERIOD_TARGET_KEY: 'END_DATE',
				PERIOD_START: new Date(),
				PERIOD_END: moment().add(1, 'year').toDate(),
			}),
			label: '진행중',
		},
		{
			value: JSON.stringify({
				PERIOD_TARGET_KEY: 'END_DATE',
				PERIOD_END: new Date(),
				PERIOD_START: moment().subtract(1, 'year').toDate(),
			}),
			label: '완료',
		},
	];

	/**
	 * 선택 가능한 상태
	 */
	const kpiSelectableStatusList: { value: string; label: string }[] = [
		{
			value: JSON.stringify({
				STATUS: 'PROCEEDING',
			}),
			label: '진행중',
		},
		{
			value: JSON.stringify({
				STATUS: 'COMPLETED',
			}),
			label: '완료',
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
	const [selectedStatus, setSelectedStatus] = React.useState<string>(
		props.name === 'OKR' ? okrSelectablePeriodList[0].value : kpiSelectableStatusList[0].value
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
	const makeInjectedParams = () => {
		const injectedParams = Object.assign(
			props.infiniteLoadBoardProps?.injectedParams,
			/**
			 * 상태 선택
			 */
			JSON.parse(selectedStatus),
			/**
			 * 정렬 선택
			 */
			JSON.parse(selectedSort)
		);

		if (props.additionalFilterConfigList) {
			props.additionalFilterConfigList.forEach((config) => {
				injectedParams[config.paramKey] = config.selectedValue;
			});
		}

		return injectedParams;
	};

	return (
		<Box display="flex" flexDirection="column" gap={1}>
			{/* 새로운 목표 등록 영역 */}
			<Box>
				<SupportiButton
					contents={`+ ${props.name} 목표 등록`}
					startIcon={<FlagIcon />}
					onClick={() => setIndicatorRegisterModal(true)}
					isGradient={true}
					style={{ height: 20, color: 'white' }}
				/>
			</Box>

			{/* 추가 필터 영역 */}
			{props.additionalFilterConfigList?.map((config, index) => (
				<Box></Box>
			))}

			{/* 컨트롤러 영역 */}
			<Box display={'flex'} justifyContent={'space-between'}>
				{/* 상태 영역 (진행중 / 완료) */}
				<SupportiToggle
					chipDataList={props.name === "OKR" ? okrSelectablePeriodList : kpiSelectableStatusList}
					value={selectedStatus}
					setValue={(value) => setSelectedStatus(value as string)}
					chipHeight={'30px'}
					style={{
						outerBoxStyle: {
							width: '150px',
							height: '36px',
						},
						chipStyle: {
							height: '30px',
						},
					}}
				/>

				{/* 정렬 선택 (오래된 순 / 최신 순) 영역 */}
				<SupportiInput
					type="select"
					value={selectedSort}
					setValue={(value) => setSelectedSort(value as string)}
					dataList={selectableSortList}
					width={'100px'}
				/>
			</Box>

			{/* 지표 목록 영역 */}
			<InfiniteLoadBoard
				{...Object.assign(props.infiniteLoadBoardProps, {
					injectedParams: makeInjectedParams(),
				})}
				allData={indicatorList}
				setAllData={setIndicatorList}
			/>
			{props.name === 'OKR' && (
				<OkrModal
					modalOpen={indicatorRegisterModal}
					setModalOpen={setIndicatorRegisterModal}
				/>
			)}
			{props.name === 'KPI' && (
				<KpiModal
					modalOpen={indicatorRegisterModal}
					setModalOpen={setIndicatorRegisterModal}
				/>
			)}
		</Box>
	);
};

export default IndicatorManagementBoard;
export type { IIndicatorManagementBoardProps };
