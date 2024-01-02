import { ControllerABC } from '@leanoncompany/supporti-ark-office-project/src/controller/base/ControllerABC';

export class AlimTalkController extends ControllerABC {
	//* 클래스 멤버
	constructor(role?: string) {
		super();
	}

	/**
	 * 인증 코드 발송
	 */
	public sendAuthCode(
		args: { [key: string]: any },
		successCallback?: (response: any) => void,
		failCallback?: (err: any) => void
	): any {
		super.postData(
			args,
			`${this.rootRoute}/common/alimtalk/send_phone_auth`,
			successCallback,
			failCallback
		);
	}
	/**
	 * 인증 코드 확인
	 */
	public checkAuthCode(
		args: { [key: string]: any },
		successCallback?: (response: any) => void,
		failCallback?: (err: any) => void
	): any {
		super.postData(
			args,
			`${this.rootRoute}/common/alimtalk/validate_phone_auth`,
			successCallback,
			failCallback
		);
	}
}
