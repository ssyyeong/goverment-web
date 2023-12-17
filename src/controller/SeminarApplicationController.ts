import { ControllerABC } from '@qillie-corp/ark-office-project/src/controller/base/ControllerABC';

export class SeminarApplicationController extends ControllerABC {
	//* 클래스 멤버
	constructor(role?: string) {
		super('SeminarApplication', role);
	}

	//* 세미나 신청 리스트 가져오기
	public getSeminarApplicationList(
		args: { [key: string]: any },
		successCallback?: (response: any) => void,
		failCallback?: (err: any) => void
	): any {
		super.getData(
			args,
			`${this.mergedPath}/find_all`,
			successCallback,
			failCallback
		);
	}
}
