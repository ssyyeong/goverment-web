import React from 'react';
import { Box, Typography } from '@mui/material';
import { randomColor } from '../../../../../../../../configs/randomColorConfig';

type TKpiDataProps = {};

type TKpiTableRowProps = {
	kpiData?: TKpiDataProps;
};

const KpiTableRow = (props: TKpiTableRowProps) => {
	//* Constants

	//*States

	return (
		<Box
			sx={{
				bgcolor: 'white',
				width: '1350px',
				textAlign: 'center',
				borderBottom: '1px solid #b0b5c2',
				borderTop: '1px solid #b0b5c2',
			}}
		>
			<Box display={'flex'} width="100%">
				<Typography
					p={1.5}
					minWidth={'150px'}
					bgcolor={'primary.dark'}
					color={'white'}
					fontWeight={500}
				>
					KPI 목표치
				</Typography>
				<Box
					display={'flex'}
					borderBottom={'1px solid #b0b5c2'}
					textAlign={'right'}
				>
					{new Array(12).fill(100).map((item, index) => {
						return (
							<Typography
								p={1.5}
								minWidth={'100px'}
								fontWeight={500}
								borderRight={'1px solid #f1f2f5'}
							>
								100
							</Typography>
						);
					})}
				</Box>
			</Box>
			<Box display={'flex'} width="100%">
				<Typography
					p={1.5}
					minWidth={'150px'}
					bgcolor={'primary.dark'}
					color={'white'}
					borderTop={'1px solid #FFF'}
					borderBottom={'1px solid #FFF'}
					fontWeight={500}
				>
					KPI 결과치
				</Typography>
				<Box
					display={'flex'}
					borderBottom={'1px solid #b0b5c2'}
					textAlign={'right'}
				>
					{new Array(12).fill(100).map((item, index) => {
						return (
							<Typography
								p={1.5}
								minWidth={'100px'}
								fontWeight={500}
								borderRight={'1px solid #f1f2f5'}
							>
								100
							</Typography>
						);
					})}
				</Box>
			</Box>
			<Box display={'flex'} width="100%">
				<Typography
					p={1.5}
					minWidth={'150px'}
					bgcolor={'primary.dark'}
					color={'white'}
					fontWeight={500}
				>
					KPI 달성률
				</Typography>

				<Box
					display={'flex'}
					textAlign={'right'}
					bgcolor={randomColor[randomColor.length - 1]}
				>
					{new Array(12).fill(100).map((item, index) => {
						return (
							<Typography
								p={1.5}
								minWidth={'100px'}
								fontWeight={500}
								borderRight={'1px solid #f1f2f5'}
							>
								100%
							</Typography>
						);
					})}
				</Box>
			</Box>
		</Box>
	);
};

export default KpiTableRow;
