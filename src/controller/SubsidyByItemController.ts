import { ControllerABC } from '@leanoncompany/supporti-ark-office-project/src/controller/base/ControllerABC';

export class SubsidyByItemController extends ControllerABC {
	//* 클래스 멤버
	constructor(role?: string) {
		super('SubsidyByItem', role);
	}

	/**
	 * 생성하기
	 */
	public createItem(
		args: { [key: string]: any },
		successCallback?: (response: any) => void,
		failCallback?: (err: any) => void
	): any {
		super.postData(
			args,
			`${this.mergedPath}/create_support_business_management`,
			successCallback,
			failCallback
		);
	}
}
