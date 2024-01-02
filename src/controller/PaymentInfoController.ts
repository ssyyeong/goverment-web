import { ControllerABC } from '@leanoncompany/supporti-ark-office-project/src/controller/base/ControllerABC';

export class PaymentInfoController extends ControllerABC {
	//* 클래스 멤버
	constructor(role?: string) {
		super('SubscriptionPaymentInfo', role);
	}

	/**
	 * 구독권 생성
	 */
	public createSubscription(
		args: { [key: string]: any },
		successCallback?: (response: any) => void,
		failCallback?: (err: any) => void
	): any {
		super.postData(
			args,
			`${this.mergedPath}/register_subscription`,
			successCallback,
			failCallback
		);
	}
}
