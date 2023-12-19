const calculateAchieveRate = (dataList: any) => {
	// 하위 목표 갯수
	const length = dataList.length;
	// 하위 목표들의 총 달성률
	let detailTotalAchieveRate = 0;

	// OkrDetails에서 ACHIVED_AMOUNT와 TARGET_AMOUNT만 남긴 객체 배열로 변형
	const calcDataList = dataList.map((item) => {
		return {
			TARGET_AMOUNT: item.TARGET_AMOUNT,
			ACHIEVED_AMOUNT: item.ACHIEVED_AMOUNT,
		};
	});

	calcDataList.forEach((item) => {
		// if (
		// 	(Number(item.ACHIEVED_AMOUNT) / Number(item.TARGET_AMOUNT)) * 100 >
		// 	100
		// ) {
		// 	detailTotalAchieveRate += 100 / length;
		// } else {
		detailTotalAchieveRate +=
			(Number(item.ACHIEVED_AMOUNT) / Number(item.TARGET_AMOUNT)) * 100;
		// }
	});

	// 반올림 처리하여 메인 목표 달성률 반환
	return Math.round(detailTotalAchieveRate / length);
};

export default calculateAchieveRate;
