import { useState, useEffect } from 'react';

export default function usePagination() {
	const [page, setPage] = useState(0);
	const [limit, setLimit] = useState(10);

	const handlePageChange = (value) => {
		setPage(value - 1);
	};

	useEffect(() => {
		page !== 0 && setPage(0);
	}, [limit]);

	return {
		limit,
		setLimit,
		page,
		handlePageChange,
	};
}
