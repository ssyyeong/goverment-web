import { ControllerABC } from '@leanoncompany/supporti-ark-office-project/src/controller/base/ControllerABC';

export class IrAnswerController extends ControllerABC {
	//* 클래스 멤버
	constructor(role?: string) {
		super('IrAnswer', role);
	}

	//* 답변 벌크 업로드
	public uploadIrAnswer(
		args: { [key: string]: any },
		successCallback?: (response: any) => void,
		failCallback?: (err: any) => void
	): any {
		super.postData(
			{
				CREATE_OPTION_KEY_LIST: args,
			},
			`${this.mergedPath}/create`,
			successCallback,
			failCallback
		);
	}
}
