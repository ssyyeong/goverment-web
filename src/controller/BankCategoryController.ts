import { ControllerABC } from '@leanoncompany/supporti-ark-office-project/src/controller/base/ControllerABC';

export class BankCategoryController extends ControllerABC {
	//* 클래스 멤버
	constructor(role?: string) {
		super('BankCategoryMatchHistory', role);
	}

	/**
	 * 계좌 카테고리 등록
	 */
	public registerBankCategory(
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

	/**
	 * 계좌 카테고리 수정
	 */
	public modifyBankCategory(
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

	/**
	 * 계좌 카테고리 삭제
	 */
	public deleteBankCategory(
		args: { [key: string]: any },
		args2: { [key: string]: any },
		successCallback?: (response: any) => void,
		failCallback?: (err: any) => void
	): any {
		super.deleteData(
			{
				FIND_OPTION_KEY_LIST: args,
				UPDATE_OPTION_KEY_LIST: args2,
			},
			`${this.mergedPath}/delete`,
			successCallback,
			failCallback
		);
	}
}
