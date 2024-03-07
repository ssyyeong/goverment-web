import React from 'react';
import { Box, TextFieldProps, Typography } from '@mui/material';
import KpiTableRow from '../KpiTableRow/KpiTableRow';

type TKpiTableProps = {
	list?: any[];
};

const KpiTable = (props: TKpiTableProps) => {
	console.log(props.list, 'props.list');
	//* Constants
	const TableHeader = [
		'1월',
		'2월',
		'3월',
		'4월',
		'5월',
		'6월',
		'7월',
		'8월',
		'9월',
		'10월',
		'11월',
		'12월',
	];

	//*States

	//*Hooks

	return (
		<Box
			sx={{
				bgcolor: 'white',
				boxShadow: '0 3px 15px 0 #e1eaff',
				width: '100%',
				py: 4,
				px: { sm: 4, xs: 2 },
				borderRadius: 2,
				textAlign: 'center',
			}}
		>
			{/** 표 영역 */}
			<Box
				sx={{
					width: '100%',
					bgcolor: 'secondary.light',
					borderTopLeftRadius: '5px',
					borderTopRightRadius: '5px',

					// mt: 2.5,
					display: 'flex',
				}}
			>
				{/** 표 구분, KPI 구분 */}
				<Box>
					<Box p={1} minWidth={'150px'}>
						<Typography fontWeight={500}>구분</Typography>
					</Box>
					{props.list.map((item, index) => {
						return (
							<Box
								sx={{
									borderBottom: '1px solid #b0b5c2',
									borderTop: '1px solid #b0b5c2',
								}}
							>
								<Typography
									p={1.5}
									minWidth={'150px'}
									bgcolor={'primary.dark'}
									color={'white'}
									fontWeight={500}
								>
									KPI ({index + 1}) 목표치
								</Typography>

								<Typography
									p={1.5}
									minWidth={'150px'}
									bgcolor={'primary.dark'}
									color={'white'}
									borderTop={'1px solid #FFF'}
									borderBottom={'1px solid #FFF'}
									fontWeight={500}
								>
									KPI ({index + 1}) 결과치
								</Typography>
								<Typography
									p={1.5}
									minWidth={'150px'}
									bgcolor={'primary.dark'}
									color={'white'}
									fontWeight={500}
								>
									KPI ({index + 1}) 달성률
								</Typography>
							</Box>
						);
					})}
				</Box>

				{/** 표 데이터 */}
				<Box
					sx={{
						overflow: 'auto',
						'-ms-overflow-style': 'none',
						'&::-webkit-scrollbar': {
							height: '5px !important',
							backgroundColor: 'white !important',
							padding: '0.5px',
							borderRadius: '20px',
						},
						'&::-webkit-scrollbar-thumb': {
							backgroundColor: '#b0b5c2',
							borderRadius: '20px',
						},
					}}
				>
					<Box
						sx={{
							minWidth: '900px',
							display: 'flex',
						}}
					>
						{/** 표의 헤더 영역 */}

						{TableHeader.map((item, index) => (
							<Box p={1} minWidth={'100px'}>
								<Typography fontWeight={500}>{item}</Typography>
							</Box>
						))}
					</Box>

					{/** 표 데이터 영역 */}
					<Box
						sx={{
							minWidth: '900px',
							display: 'flex',
							flexDirection: 'column',
						}}
					>
						{props.list.map((item, index) => (
							<KpiTableRow kpiData={item.KPI_AMOUNT_RATE_LIST} />
						))}
					</Box>
				</Box>
			</Box>
		</Box>
	);
};

export default KpiTable;
