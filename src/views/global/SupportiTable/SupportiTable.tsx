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
	TableCellProps,
} from '@mui/material';
import Nodata from '../NoData/NoData';
export interface TableHeaderProps {
	/**
	 * 테이블 헤더 라벨
	 */
	label: string;
	/**
	 * 테이블 헤더 value(실제 데이터의 key)
	 */
	value: string;
	/**
	 * 커스텀 전체 데이터 중에서 원하는 키데이터 가져올 때 사용
	 */
	customValue?: (value: any) => any;
	/**
	 * 커스텀 모양
	 */
	customView?: (value: any, key: any) => any;
	/**
	 * 체크박스 모양 적용 여부
	 */
	checkbox?: boolean;
	/**
	 * 체크박스 클릭시 이벤트
	 */
	checkBoxOnClick?: (
		value: any,
		idx: number,
		row: { [key: string]: any }
	) => any;
	/**
	 * 정렬
	 */
	align?: 'left' | 'center' | 'right';
	/**
	 * 최소 너비
	 */
	minWidth?: number | string;
	/**
	 * 데이터 포맷팅
	 */
	format?: (value: any, key?: any, idx?: number) => any;
	/**
	 * 데이터에 따른 색상 변경
	 */
	customFormat?: (value: any, key?: any) => any;
	/**
	 * 커스텀 키 변경
	 */
	customKeyFormat?: (value: any) => any;
}
interface ISupportiTableProps {
	/**
	 * 테이블 헤더 데이터
	 */
	headerData: TableHeaderProps[];
	/**
	 * 실제 데이터
	 */
	rowData: { [key: string]: any }[];
	/**
	 * 스티키 헤더
	 */
	stickyHeader?: boolean;
	/**
	 * 클릭시 이벤트
	 */
	onClick?: (value: any) => any;
	/**
	 * 스타일
	 */
	style?: {
		tablecell?: TableCellProps;
	};
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
				<Table stickyHeader={props.stickyHeader}>
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
						{props.rowData?.map((row, idx) => {
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
									sx={{
										cursor: props.onClick
											? 'pointer'
											: 'default',
									}}
								>
									{props.headerData.map((column) => {
										// 커스텀 키가 있을 경우 커스텀 키로 키 설정
										const key = column.customKeyFormat
											? column.customKeyFormat(
													row[column.value]
											  )
											: column.value;
										// 커스텀 값이 있을 경우 커스텀 값으로 값 설정
										const value = column.customValue
											? column.customValue(row)
											: row[key];
										return (
											<TableCell
												key={column.value}
												align={column.align}
												{...props.style?.tablecell}
											>
												{column.customView ? (
													column.customView(
														value,
														key
													)
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
																			idx,
																			row
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
