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

	//* kpi 카테고리 조회
	public getAllKpiCategory(
		args: { [key: string]: any },
		successCallback?: (response: any) => void,
		failCallback?: (err: any) => void
	) {
		super.getData(
			args,
			`${this.mergedPath}/category_list`,
			successCallback,
			failCallback
		);
	}

	//* kpi 생성
	public createKpi(
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

	//* kpi 달성량 수정

	/**
	 * 계좌 카테고리 수정
	 */
	public updateAchievement(
		args: { [key: string]: any },
		args2: { [key: string]: any },
		successCallback?: (response: any) => void,
		failCallback?: (err: any) => void
	): any {
		super.putData(
			{
				FIND_OPTION_KEY_LIST: args,
				UPDATE_OPTION_KEY_LIST: args2,
			},
			`${this.mergedPath}/update`,
			successCallback,
			failCallback
		);
	}

	//* kpi 달성 리스트 조회
	public getAllKpiList(
		args: { [key: string]: any },
		successCallback?: (response: any) => void,
		failCallback?: (err: any) => void
	) {
		super.getData(
			args,
			`${this.mergedPath}/find_all?FIND_OPTION_KEY_LIST=${args}`,
			successCallback,
			failCallback
		);
	}

	//* kpi 달성률 그래프 조회
	public getAllKpiGraph(
		args: { [key: string]: any },
		successCallback?: (response: any) => void,
		failCallback?: (err: any) => void
	) {
		super.getData(
			args,
			`${this.mergedPath}/graph_list`,
			successCallback,
			failCallback
		);
	}
}
