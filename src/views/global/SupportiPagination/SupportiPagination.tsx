import React from 'react';

import {
	Box,
	BoxProps,
	FormControl,
	MenuItem,
	Pagination,
	Select,
	Typography,
} from '@mui/material';
import calculateTotalPages from '../../../hooks/usePagination/useCalculate';

interface ISupportiPaginationProps {
	count: number;
	page: number;
	handlePageChange: (value: number) => void;
	limit: number;
	setLimit: React.Dispatch<React.SetStateAction<number>>;
	endAdornment?: React.ReactNode;
	useLimit?: boolean;
}

const SupportiPagination = (props: ISupportiPaginationProps) => {
	//* Constant
	// 1-50까지의 숫자 배열
	const limitArray = Array(50)
		.fill(0)
		.map((_, index) => index + 1);

	return (
		<Box
			display={'flex'}
			flexDirection={{ xs: 'column', md: 'row' }}
			alignItems={'center'}
			justifyContent={'space-between'}
			width={'100%'}
			mt={2}
		>
			{/* 좌측 limit 변경 셀렉트 */}
			<Box
				display={'flex'}
				alignItems={'center'}
				width={{ md: '30%', xs: '100%' }}
				justifyContent={'flex-start'}
				order={{ xs: 2, md: 1 }}
			>
				{props.useLimit !== false && (
					<Box display={'flex'} alignItems={'center'}>
						<Typography variant="body2" color={'#8B909A'}>
							Showing
						</Typography>
						<FormControl sx={{ m: 1, minWidth: 70 }} size="small">
							<Select
								value={props.limit}
								onChange={(e) =>
									props.setLimit(Number(e.target.value))
								}
							>
								{limitArray.map((item, index) => (
									<MenuItem key={index} value={item}>
										{item}
									</MenuItem>
								))}
							</Select>
						</FormControl>
						<Typography variant="body2" color={'#8B909A'}>
							of 50
						</Typography>
					</Box>
				)}
			</Box>
			{/* 페이지 네이션 */}
			<Box
				width={{ md: '40%', xs: '100%' }}
				display={'flex'}
				justifyContent={'center'}
				order={{ xs: 1, md: 2 }}
			>
				<Pagination
					count={
						props.count === 0
							? 1
							: calculateTotalPages(props.count, props.limit)
					}
					page={props.page + 1}
					onChange={(e, value) => props.handlePageChange(value)}
					shape="rounded"
					sx={{
						'& .MuiPaginationItem-root': {
							backgroundColor: '#F1F2F6',
							color: '#8B909A',
						},
						'& .Mui-selected': {
							color: '#F1F2F6',
							backgroundColor: '#8B909A !important',
						},
						'& .MuiPaginationItem-ellipsis': {
							bgcolor: 'white !important',
						},
					}}
				/>
			</Box>
			{/* 우측 추가 버튼 */}
			<Box
				width={{ md: '30%', xs: '100%' }}
				display={'flex'}
				justifyContent={'flex-end'}
				order={3}
			>
				{props.endAdornment && props.endAdornment}
			</Box>
		</Box>
	);
};

export default SupportiPagination;
