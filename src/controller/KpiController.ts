import { ControllerABC } from '@leanoncompany/supporti-ark-office-project/src/controller/base/ControllerABC';

export class KpiController extends ControllerABC {
	//* 클래스 멤버
	constructor(role?: string) {
		super('Kpi', role);
	}

	//* 조회
	public getAllKpiData(
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
