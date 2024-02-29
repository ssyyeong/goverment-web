import React from 'react';
import { Box, Typography } from '@mui/material';
import KpiTableRow from '../KpiTableRow/KpiTableRow';

type TKpiTableProps = {
	kpiList?: any[];
};

const KpiTable = (props: TKpiTableProps) => {
	//* Constants
	const TableHeader = [
		'구분',
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

	return (
		<Box
			sx={{
				bgcolor: 'white',
				boxShadow: '0 3px 15px 0 #e1eaff',
				width: '100%',
				py: 4,
				px: { sm: 4, xs: 0 },
				borderRadius: 2,
				textAlign: 'center',
			}}
		>
			<Box
				sx={{
					width: '100%',
					bgcolor: 'secondary.light',
					borderTopLeftRadius: '5px',
					borderTopRightRadius: '5px',
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
						minWidth: '1000px',
						display: 'flex',
					}}
				>
					{/** 표의 헤더 영역 */}

					{TableHeader.map((item, index) => (
						<Box p={1} minWidth={index === 0 ? '150px' : '100px'}>
							<Typography fontWeight={500}>{item}</Typography>
						</Box>
					))}
				</Box>

				{/** 표 데이터 영역 */}
				<Box
					sx={{
						minWidth: '1000px',
						display: 'flex',
						flexDirection: 'column',
					}}
				>
					{new Array(3).fill(0).map((item, index) => (
						<KpiTableRow />
					))}
				</Box>
			</Box>
		</Box>
	);
};

export default KpiTable;
