import { ControllerABC } from '@leanoncompany/supporti-ark-office-project/src/controller/base/ControllerABC';

export class GsicMemberController extends ControllerABC {
	//* 클래스 멤버
	constructor(role?: string) {
		super('GsicMember', role);
	}

	//* 조회
	public signIn(
		args: { [key: string]: any },
		successCallback?: (response: any) => void,
		failCallback?: (err: any) => void
	) {
		super.postData(
			args,
			`${this.mergedPath}/sign_in/local`,
			successCallback,
			failCallback
		);
	}
}
