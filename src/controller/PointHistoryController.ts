import { ControllerABC } from '@leanoncompany/supporti-ark-office-project/src/controller/base/ControllerABC';

export class PointHistoryController extends ControllerABC {
	//* 클래스 멤버
	constructor(role?: string) {
		super('PointHistory', role);
	}

	//* 포인트 총합 반환
	public getPointSum(
		args: { [key: string]: any },
		successCallback?: (response: any) => void,
		failCallback?: (err: any) => void
	): any {
		super.getData(
			args,
			`${this.mergedPath}/total`,
			successCallback,
			failCallback
		);
	}
}
