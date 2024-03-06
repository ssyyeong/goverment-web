import { Box } from '@mui/material';
import React, { useEffect } from 'react';
import SupportiInput from '../../../../../../global/SupportiInput';
import KpiChart from '../KpiChart/KpiChart';
import KpiTable from '../KpiTable/KpiTable';
import RenewalKpiCard from '../RenewalKpiCard/RenewalKpiCard';
import { KpiController } from '../../../../../../../controller/KpiController';
import { useAppMember } from '../../../../../../../hooks/useAppMember';
import Nodata from '../../../../../../global/NoData/NoData';

const KpiIndicator = () => {
	//* Controllers
	const kpiController = new KpiController();

	//* Constants

	const selectableKpiCategoryList = [
		{ value: 'BUSINESS', label: '비즈니스 지표' },
		{ value: 'MARKETING', label: '마케팅 지표' },
	];

	//* States
	const [selectedKpiCategory, setSelectedKpiCategory] = React.useState(
		selectableKpiCategoryList[0].value
	);

	const [kpiData, setKpiData] = React.useState<any[]>([]);

	const [selectedYear, setSelectedYear] = React.useState(new Date());

	const [kpiChartList, setKpiChartList] = React.useState<any[]>([]);

	const [kpiTableList, setKpiTableList] = React.useState<any[]>([]);

	//* Hooks
	const { memberId } = useAppMember();

	useEffect(() => {
		kpiController.getAllKpiData(
			{
				APP_MEMBER_IDENTIFICATION_CODE: memberId,
				YEAR: selectedYear,
				CATEGORY: selectedKpiCategory,
			},
			(res) => {
				setKpiData(res.data.result.rows);
			},
			(err) => console.log(err)
		);

		kpiController.getAllKpiGraph(
			{
				APP_MEMBER_IDENTIFICATION_CODE: memberId,
				YEAR: selectedYear,
				CATEGORY: selectedKpiCategory,
			},
			(res) => {
				setKpiChartList(res.data.result.rows);
			},
			(err) => console.log(err)
		);

		kpiController.getAllKpiList(
			{
				APP_MEMBER_IDENTIFICATION_CODE: memberId,
				YEAR: selectedYear,
				CATEGORY: selectedKpiCategory,
			},
			(res) => {
				setKpiTableList(res.data.result.rows);
			},
			(err) => console.log(err)
		);
	}, [selectedYear, selectedKpiCategory, memberId]);

	return (
		<Box width={'100%'}>
			<SupportiInput
				type="select"
				value={selectedKpiCategory}
				setValue={(value: any) => setSelectedKpiCategory(value)}
				dataList={selectableKpiCategoryList}
				width={'150px'}
			/>
			<Box display="flex" flexDirection={'column'} gap={5}>
				{kpiData.map((kpi, index) => {
					return (
						<RenewalKpiCard
							index={index}
							title={kpi.TITLE}
							id={kpi.KPI_IDENTIFICATION_CODE}
							isCertified={
								kpi.BANK_LINKING_YN === 'Y' ? true : false
							}
						/>
					);
				})}

				<KpiChart list={kpiChartList} />
				<KpiTable
					year={selectedYear}
					setYear={setSelectedYear}
					list={kpiTableList}
				/>
			</Box>
			{kpiData.length !== 0 ? <Box></Box> : <Nodata />}
		</Box>
	);
};

export default KpiIndicator;
