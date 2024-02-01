import { ControllerABC } from '@leanoncompany/supporti-ark-office-project/src/controller/base/ControllerABC';

export class SpecialCoffeeChatAnswerController extends ControllerABC {
	//* 클래스 멤버
	constructor(role?: string) {
		super('SpecialCoffeeChatAnswer', role);
	}

	//* 답변 벌크 업로드
	public uploadBulkAnswer(
		args: { [key: string]: any },
		successCallback?: (response: any) => void,
		failCallback?: (err: any) => void
	): any {
		super.postData(
			{
				CREATE_OPTION_KEY_LIST: args,
			},
			`${this.mergedPath}/bulk_create`,
			successCallback,
			failCallback
		);
	}
}
