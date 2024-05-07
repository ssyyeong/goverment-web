import { ControllerABC } from '@leanoncompany/supporti-ark-office-project/src/controller/base/ControllerABC';

export class ContentsController extends ControllerABC {
	//* 클래스 멤버
	constructor(role?: string) {
		super('Contents', role);
	}

	//* 조회
	public getPeriodContents(
		args: { [key: string]: any },
		successCallback?: (response: any) => void,
		failCallback?: (err: any) => void
	) {
		super.getData(
			args,
			`${this.mergedPath}/get_contents_by_period_view`,
			successCallback,
			failCallback
		);
	}
}
