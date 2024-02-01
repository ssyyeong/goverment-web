import { ControllerABC } from '@leanoncompany/supporti-ark-office-project/src/controller/base/ControllerABC';

export class A2eController extends ControllerABC {
	//* 클래스 멤버
	constructor(role?: string) {
		super('A2eQuestion', role);
	}

	//* 조회
	public getAllA2eQuestion(
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
