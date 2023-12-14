import { ControllerABC } from '@qillie-corp/ark-office-project/src/controller/base/ControllerABC';

export class OkrController extends ControllerABC {
	//* 클래스 멤버
	constructor(role?: string) {
		super('OkrDetail', role);
	}

	/**
	 * 구독권 생성
	 */
	public createItem(
		args: { [key: string]: any },
		successCallback?: (response: any) => void,
		failCallback?: (err: any) => void
	): any {
		super.postData(
			args,
			`${this.mergedPath}/create_okr`,
			successCallback,
			failCallback
		);
	}
}
