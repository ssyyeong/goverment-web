import React from 'react';
import { Box, Typography } from '@mui/material';
import { randomColor } from '../../../../../../../../configs/randomColorConfig';

type TKpiDataProps = {
	MONTH: string;
	TARGET_AMOUNT: number;
	AMOUNT_RATE: number;
	AMOUNT: number;
};

type TKpiTableRowProps = {
	kpiData?: TKpiDataProps[];
	increase?: string;
};

const KpiTableRow = (props: TKpiTableRowProps) => {
	//* Constants

	//*States

	return (
		<Box
			sx={{
				bgcolor: 'white',
				width: '1200px',
				textAlign: 'center',
				borderBottom: '1px solid #b0b5c2',
				borderTop: '1px solid #b0b5c2',
			}}
		>
			<Box display={'flex'} width="100%">
				<Box
					display={'flex'}
					borderBottom={'1px solid #b0b5c2'}
					textAlign={'right'}
				>
					{props.kpiData?.map((item, index) => {
						return (
							<Typography
								p={1.5}
								minWidth={'100px'}
								fontWeight={500}
								borderRight={'1px solid #f1f2f5'}
							>
								{item.TARGET_AMOUNT < 1000000
									? item.TARGET_AMOUNT?.toLocaleString()
									: (item.TARGET_AMOUNT / 1000000).toFixed(
											2
									  ) + 'M'}
							</Typography>
						);
					})}
				</Box>
			</Box>
			<Box display={'flex'} width="100%">
				<Box
					display={'flex'}
					borderBottom={'1px solid #b0b5c2'}
					textAlign={'right'}
				>
					{props.kpiData?.map((item, index) => {
						return (
							<Typography
								p={1.5}
								minWidth={'100px'}
								fontWeight={500}
								borderRight={'1px solid #f1f2f5'}
							>
								{item.AMOUNT < 1000000
									? item.AMOUNT?.toLocaleString()
									: (item.AMOUNT / 1000000).toFixed(2) + 'M'}
							</Typography>
						);
					})}
				</Box>
			</Box>
			<Box display={'flex'} width="100%">
				{props.kpiData?.map((item, index) => {
					return (
						<Box
							display={'flex'}
							textAlign={'right'}
							bgcolor={
								item.AMOUNT_RATE > 100
									? props.increase === 'Y'
										? 'success.main'
										: 'error.main'
									: 'primary.light'
							}
						>
							<Typography
								p={1.5}
								minWidth={'100px'}
								fontWeight={500}
								borderRight={'1px solid #f1f2f5'}
								display={'flex'}
								textAlign={'right'}
								justifyContent={'flex-end'}
							>
								{item.AMOUNT_RATE < 1000
									? item.AMOUNT_RATE
									: 1000}
								%
								{item.AMOUNT_RATE < 1000 ? (
									''
								) : (
									<Typography>&#9652;</Typography>
								)}
							</Typography>
						</Box>
					);
				})}
			</Box>
		</Box>
	);
};

export default KpiTableRow;
