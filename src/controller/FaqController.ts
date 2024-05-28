import { ControllerABC } from '@leanoncompany/supporti-ark-office-project/src/controller/base/ControllerABC';

export class FaqController extends ControllerABC {
	//* 클래스 멤버
	constructor(role?: string) {
		super('Faq', role);
	}

	//* 조회
	public getFaqList(
		args: { [key: string]: any },
		successCallback?: (response: any) => void,
		failCallback?: (err: any) => void
	) {
		console.log('args', args);
		super.getData(
			args,
			`${this.rootRoute}/user/faq_board_content/find_all`,
			successCallback,
			failCallback
		);
	}
}
