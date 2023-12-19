import { ControllerABC } from '@qillie-corp/ark-office-project/src/controller/base/ControllerABC';

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
}
