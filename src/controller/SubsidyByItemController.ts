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

	// 금액 연관 업데이트
	public updateCash(
		args: { [key: string]: any },
		args2: { [key: string]: any },
		successCallback?: (response: any) => void,
		failCallback?: (err: any) => void
	): any {
		super.putData(
			{
				FIND_OPTION_KEY_LIST: args,
				UPDATE_OPTION_KEY_LIST: args2,
			},
			`${this.mergedPath}/update`,
			successCallback,
			failCallback
		);
	}
}
