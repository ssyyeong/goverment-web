import { Box, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import SupportiInput from '../../../../../../global/SupportiInput';
import KpiChart from '../KpiChart/KpiChart';
import KpiTable from '../KpiTable/KpiTable';
import RenewalKpiCard from '../RenewalKpiCard/RenewalKpiCard';
import { KpiController } from '../../../../../../../controller/KpiController';
import { useAppMember } from '../../../../../../../hooks/useAppMember';
import Nodata from '../../../../../../global/NoData/NoData';
import moment from 'moment';
import KpiCreateModal from '../KpiCreateModal/KpiCreateModal';
import SupportiButton from '../../../../../../global/SupportiButton';
import dayjs from 'dayjs';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { randomColor } from '../../../../../../../../configs/randomColorConfig';

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

	const [kpiTriggerKey, setKpiTriggerKey] = React.useState<string>();

	const [kpiCreateModal, setKpiCreateModal] = React.useState<boolean>(false);

	const [noData, setNoData] = React.useState<boolean>(false);

	//* Hooks
	const { memberId } = useAppMember();
	//* Functions
	/**
	 * KPI 가져오기
	 */
	const getKpiData = async (year) => {
		try {
			const res: any = await new Promise((resolve, reject) => {
				kpiController.getAllKpiData(
					{
						FIND_OPTION_KEY_LIST: {
							APP_MEMBER_IDENTIFICATION_CODE: memberId,
							YEAR: dayjs(year).format('YYYY'),
							CATEGORY: selectedKpiCategory,
						},
					},
					resolve,
					reject
				);
			});

			if (res.data.result.rows.length === 0) {
				setNoData(true);
				return 0;
			} else {
				setNoData(false);
				setKpiData(res.data.result.rows);
				setKpiTableList(res.data.result.rows);
				return 1;
			}
		} catch (err) {
			console.error(err);
			throw err;
		}
	};
	/**
	 * KPI 차트 가져오기
	 */
	const getKpiChart = () => {
		kpiController.getAllKpiGraph(
			{
				APP_MEMBER_IDENTIFICATION_CODE: memberId,
				YEAR: `"${dayjs(selectedYear).format('YYYY')}"`,
				CATEGORY: selectedKpiCategory,
			},
			(res) => {
				const insertColor = res.data.result.rows.map((data, index) => {
					return {
						...data,
						color: randomColor[index],
					};
				});
				setKpiChartList(insertColor);
			},
			(err) => console.log(err)
		);
	};

	const handleYearChange = async (e) => {
		try {
			const result = await getKpiData(e);
			if (result === 0 || result === undefined) {
				alert(
					`${dayjs(e).format('YYYY')}년도에 등록된 KPI가 없습니다.`
				);
			} else {
				setSelectedYear(e);
			}
		} catch (err) {
			console.error(err);
		}
	};

	useEffect(() => {
		if (memberId) {
			getKpiData(selectedYear);
			getKpiChart();
		}
	}, [selectedYear, selectedKpiCategory, memberId, kpiTriggerKey]);

	return (
		<Box width={'100%'}>
			<SupportiButton
				contents={`+ KPI 목표 등록`}
				startIcon={<img src="/images/icons/flag.svg" />}
				onClick={() => setKpiCreateModal(true)}
				isGradient={true}
				style={{
					height: { xs: '40px', md: 40 },
					color: 'white',
					backgroundImage: `linear-gradient(289deg, #000 9%, #545454 89%)`,
					marginBottom: '10px',
					width: { xs: '100%', md: '100%' },
				}}
			/>
			<Box display={'flex'} alignItems={'center'}>
				{/** 연도 선택 영역 */}
				<Box width="80px" sx={{ cursor: 'pointer' }}>
					<LocalizationProvider dateAdapter={AdapterDayjs}>
						<DatePicker
							label={'연도 선택'}
							openTo="year"
							views={['year']}
							onChange={(e) => {
								handleYearChange(e);
							}}
							maxDate={new Date()}
							value={selectedYear}
							renderInput={({
								inputRef,
								inputProps,
								InputProps,
							}) => (
								<Box
									sx={{
										display: 'flex',
										alignItems: 'center',
									}}
									onClick={(e) => {
										InputProps.endAdornment?.[
											'props'
										].children.props.onClick();
									}}
								>
									<Typography
										variant="h6"
										fontWeight={'bold'}
										color={'common.black'}
										ref={inputRef}
									>
										{inputProps?.value}
									</Typography>
									<KeyboardArrowDownIcon
										sx={{
											color: 'common.black',
										}}
									/>
								</Box>
							)}
						/>
					</LocalizationProvider>
				</Box>
				<SupportiInput
					type="select"
					value={selectedKpiCategory}
					setValue={(value: any) => setSelectedKpiCategory(value)}
					dataList={selectableKpiCategoryList}
					width={'150px'}
				/>
			</Box>
			{!noData ? (
				<Box display="flex" flexDirection={'column'} gap={3}>
					<Box
						display="flex"
						gap={1}
						sx={{
							overflowX: 'auto',
							overflowY: 'hidden',
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
						pb={1}
						mt={2}
					>
						{kpiData.map((kpi, index) => {
							return (
								<RenewalKpiCard
									index={index}
									title={kpi.TITLE}
									id={kpi.KPI_IDENTIFICATION_CODE}
									isCertified={
										kpi.BANK_LINKING_YN === 'Y'
											? true
											: false
									}
									setKpiTriggerKey={setKpiTriggerKey}
								/>
							);
						})}
					</Box>
					<KpiChart list={kpiChartList} />
					<KpiTable list={kpiTableList} />
				</Box>
			) : (
				<Nodata />
			)}

			{/* 생성모달 */}
			<Box key={kpiCreateModal.toString()}>
				<KpiCreateModal
					modalOpen={kpiCreateModal}
					setModalOpen={setKpiCreateModal}
					setKpiTriggerKey={setKpiTriggerKey}
				/>
			</Box>
		</Box>
	);
};

export default KpiIndicator;
