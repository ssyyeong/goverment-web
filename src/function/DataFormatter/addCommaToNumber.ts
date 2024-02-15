/**
 * 데이터에 쉼표 넣는 기능
 */
export default function addCommaToNumber(data) {
	return data.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
