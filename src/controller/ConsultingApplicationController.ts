import { ControllerABC } from '@qillie-corp/ark-office-project/src/controller/base/ControllerABC';

export class ConsultingApplicationController extends ControllerABC {
	//* 클래스 멤버
	constructor(role?: string) {
		super('ConsultingApplication', role);
	}

	/**
	 * 월별 가능한 시간 조회
	 */
	public getAvailableTime(
		args: { [key: string]: any },
		successCallback?: (response: any) => void,
		failCallback?: (err: any) => void
	): any {
		super.getData(
			args,
			`${this.mergedPath}/find_monthly_available_time`,
			successCallback,
			failCallback
		);
	}
}
