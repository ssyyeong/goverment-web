import { ControllerABC } from '@leanoncompany/supporti-ark-office-project/src/controller/base/ControllerABC';

export class CoffeeChatApplicationController extends ControllerABC {
	//* 클래스 멤버
	constructor(role?: string) {
		super('CoffeeChatApplication', role);
	}

	/**
	 * 커피챗 프로필 조회
	 */
	public checkAlreadyCoffeeChat(
		args: { [key: string]: any },
		successCallback?: (response: any) => void,
		failCallback?: (err: any) => void
	): any {
		super.getData(
			args,
			`${this.mergedPath}/check_condition`,
			successCallback,
			failCallback
		);
	}
}
