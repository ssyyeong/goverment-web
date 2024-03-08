import { ControllerABC } from '@leanoncompany/supporti-ark-office-project/src/controller/base/ControllerABC';

export class TransactionHistoryController extends ControllerABC {
	//* 클래스 멤버
	constructor(role?: string) {
		super('TransactionHistory', role);
	}

	/**
	 * 카테고리별 누적값 조회
	 */
	public getCategoryGraphData(
		args: { [key: string]: any },
		successCallback?: (response: any) => void,
		failCallback?: (err: any) => void
	): any {
		super.getData(
			args,
			`${this.mergedPath}/get_graph_data`,
			successCallback,
			failCallback
		);
	}
}
