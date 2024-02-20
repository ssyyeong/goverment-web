import { ControllerABC } from '@leanoncompany/supporti-ark-office-project/src/controller/base/ControllerABC';

export class OkrDetailController extends ControllerABC {
	//* 클래스 멤버
	constructor(role?: string) {
		super('OkrDetail', role);
	}

	/**
	 * OKR 목표 생성
	 */
	public createItem(
		args: { [key: string]: any },
		successCallback?: (response: any) => void,
		failCallback?: (err: any) => void
	): any {
		super.postData(
			args,
			`${this.mergedPath}/create_okr`,
			successCallback,
			failCallback
		);
	}

	/**
	 * OKR 목표 수정
	 */
	public updateItem(
		args: { [key: string]: any },
		successCallback?: (response: any) => void,
		failCallback?: (err: any) => void
	): any {
		super.postData(
			args,
			`${this.mergedPath}/update_okr`,
			successCallback,
			failCallback
		);
	}

	/**
	 * OKR 목표 삭제
	 */

	public deleteItem(
		args: { [key: string]: any },
		successCallback?: (response: any) => void,
		failCallback?: (err: any) => void
	): any {
		super.postData(
			args,
			`${this.mergedPath}/delete_okr`,
			successCallback,
			failCallback
		);
	}

	/**
	 *
	 * OKR 달성량 조회
	 */
	// public getAchieved(
	// 	args: { [key: string]: any },
	// 	successCallback?: (response: any) => void,
	// 	failCallback?: (err: any) => void
	// ): any {
	// 	super.getData(
	// 		args,
	// 		`${this.mergedPath}/get_achieved`,
	// 		successCallback,
	// 		failCallback
	// 	);
	// }
}
