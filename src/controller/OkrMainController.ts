import { ControllerABC } from '@leanoncompany/supporti-ark-office-project/src/controller/base/ControllerABC';

export class OkrMainController extends ControllerABC {
	//* 클래스 멤버
	constructor(role?: string) {
		super('OkrMain', role);
	}

	//* 조회
	public getAllOkrMainData(
		args: { [key: string]: any },
		successCallback?: (response: any) => void,
		failCallback?: (err: any) => void
	) {
		super.getData(
			args,
			`${this.mergedPath}/find_all`,
			successCallback,
			failCallback
		);
	}

	//* 날짜별 OKR 달성률 조회
	public getItem(
		args: { [key: string]: any },
		successCallback?: (response: any) => void,
		failCallback?: (err: any) => void
	): any {
		super.getData(
			args,
			`${this.mergedPath}/get_okr`,
			successCallback,
			failCallback
		);
	}
}
