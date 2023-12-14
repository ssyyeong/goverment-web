import { ControllerABC } from '@qillie-corp/ark-office-project/src/controller/base/ControllerABC';

export class ConsultingAnswerController extends ControllerABC {
	//* 클래스 멤버
	constructor(role?: string) {
		super('ConsultingAnswer', role);
	}

	//* 답변 벌크 업로드
	public uploadConsultingAnswer(
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
