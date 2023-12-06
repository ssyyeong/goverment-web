import React from 'react';

import {
	Box,
	BoxProps,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Typography,
	styled,
	useTheme,
	Checkbox,
} from '@mui/material';
interface TableHeaderProps {
	label: string;
	value: string;
	checkbox?: boolean;
	checkBoxOnClick?: (value: any, idx: number) => any;
	align?: 'left' | 'center' | 'right';
	minWidth?: number | string;
	color?: string;
	format?: (value: any) => any;
	customFormat?: (value: any) => any;
}
interface ISupportiTableProps {
	headerData: TableHeaderProps[];
	rowData: { [key: string]: any }[];
	stikyHeader?: boolean;
}

const SupportiTable = (props: ISupportiTableProps) => {
	const theme = useTheme();
	return (
		<TableContainer
			sx={{
				maxHeight: 240,
				pr: 1,
			}}
		>
			<Table stickyHeader={props.stikyHeader}>
				{/* 테이블 헤드 */}
				<TableHead
					sx={{
						bgcolor: theme.palette.primary.light,
						'th:first-child': {
							borderRadius: '10px 0 0 10px',
						},
						'th:last-child': {
							borderRadius: '0 10px 10px 0',
						},
					}}
				>
					<TableRow>
						{props.headerData.map((column) => (
							<TableCell
								key={column.value}
								align={column.align}
								style={{ minWidth: column.minWidth }}
							>
								{column.label}
							</TableCell>
						))}
					</TableRow>
				</TableHead>
				<Box my={0.5}></Box>
				{/* 테이블 바디 */}
				<TableBody>
					{props.rowData.map((row, idx) => {
						return (
							<TableRow
								hover
								role="checkbox"
								tabIndex={-1}
								key={idx}
							>
								{props.headerData.map((column) => {
									const value = row[column.value];
									return (
										<TableCell
											key={column.value}
											align={column.align}
										>
											{column.checkbox ? (
												<Checkbox
													color="primary"
													checked={
														column.format
															? column.format(
																	value
															  )
															: value
													}
													onChange={
														column.checkBoxOnClick
															? () =>
																	column.checkBoxOnClick(
																		value,
																		idx
																	)
															: () => {}
													}
												/>
											) : (
												<Typography
													color={
														column.customFormat(
															value
														)
															? column.customFormat(
																	value
															  )
															: 'text.primary'
													}
												>
													{column.format
														? column.format(value)
														: value}
												</Typography>
											)}
										</TableCell>
									);
								})}
							</TableRow>
						);
					})}
				</TableBody>
			</Table>
		</TableContainer>
	);
};

export default SupportiTable;
