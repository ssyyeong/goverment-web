/**
 * 데이터에 쉼표 넣는 기능
 */
export default function addCommaToNumber(data) {
	if (data === undefined || data === null) return '0';
	return data.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
