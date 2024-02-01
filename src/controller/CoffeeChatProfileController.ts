import { ControllerABC } from '@leanoncompany/supporti-ark-office-project/src/controller/base/ControllerABC';

export class CoffeeChatProfileController extends ControllerABC {
	//* 클래스 멤버
	constructor(role?: string) {
		super('CoffeeChatProfile', role);
	}

	/**
	 * 커피챗 프로필 조회
	 */
	public getFilteringCoffeeChatProfile(
		args: { [key: string]: any },
		successCallback?: (response: any) => void,
		failCallback?: (err: any) => void
	): any {
		super.getData(
			args,
			`${this.mergedPath}/find_all_filtered_by_field_name`,
			successCallback,
			failCallback
		);
	}
}
