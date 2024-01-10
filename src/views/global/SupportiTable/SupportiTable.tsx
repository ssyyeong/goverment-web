import React, { useEffect } from 'react';

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
import Nodata from '../NoData/NoData';
export interface TableHeaderProps {
	label: string;
	value: string;
	customValue?: (value: any) => any;
	customView?: (value: any) => any;
	checkbox?: boolean;
	checkBoxOnClick?: (value: any, idx: number) => any;
	align?: 'left' | 'center' | 'right';
	minWidth?: number | string;
	color?: string;
	format?: (value: any, key?: any, idx?: number) => any;
	customFormat?: (value: any, key?: any) => any;
	customKeyFormat?: (value: any) => any;
}
interface ISupportiTableProps {
	headerData: TableHeaderProps[];
	rowData: { [key: string]: any }[];
	stikyHeader?: boolean;
	onClickKey?: string;
	onClick?: (value: any) => any;
}

const SupportiTable = (props: ISupportiTableProps) => {
	//* State
	/**
	 * hydration
	 */
	const [mounted, setMounted] = React.useState(false);
	//* Hooks
	/**
	 * hydration
	 */
	useEffect(() => {
		setMounted(true);
	}, []);

	const theme = useTheme();
	return (
		mounted && (
			<TableContainer
				sx={{
					p: 2,
					width: '100%',
					bgcolor: 'white',
					borderRadius: 1,
					minHeight: 400,
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
							th: {
								border: 'none',
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
									onClick={
										props.onClick
											? () => props.onClick(row)
											: () => {}
									}
								>
									{props.headerData.map((column) => {
										const key = column.customKeyFormat
											? column.customKeyFormat(
													row[column.value]
											  )
											: column.value;
										const value = column.customValue
											? column.customValue(row)
											: row[key];
										return (
											<TableCell
												key={column.value}
												align={column.align}
											>
												{column.customView ? (
													column.customView(value)
												) : column.checkbox ? (
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
															column.customFormat
																? column.customFormat(
																		value,
																		key
																  )
																: 'text.primary'
														}
													>
														{column.format
															? column.format(
																	value,
																	key,
																	idx
															  )
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
				{props.rowData.length === 0 && <Nodata />}
			</TableContainer>
		)
	);
};

export default SupportiTable;
