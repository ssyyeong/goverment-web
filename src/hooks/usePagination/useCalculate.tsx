export default function calculateTotalPages(totalCount, itemsPerPage) {
	if (totalCount <= 0 || itemsPerPage <= 0) {
		return 0; // 예외 처리: 데이터 개수나 페이지당 항목 수가 0 이하인 경우
	}

	return Math.ceil(totalCount / itemsPerPage);
}
