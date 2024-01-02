import { ControllerABC } from '@leanoncompany/supporti-ark-office-project/src/controller/base/ControllerABC';

export class BankController extends ControllerABC {
	//* 클래스 멤버
	constructor(role?: string) {
		super('Bank', role);
	}

	/**
	 *계좌 리스트 조회
	 */
	public getBankAccountList(
		args: { [key: string]: any },
		successCallback?: (response: any) => void,
		failCallback?: (err: any) => void
	): any {
		super.postData(
			args,
			`${this.mergedPath}/account_list_by_bank`,
			successCallback,
			failCallback
		);
	}

	/**
	 * 계좌 등록 및 거래내역 저장
	 */
	public registerBankAccount(
		args: { [key: string]: any },
		successCallback?: (response: any) => void,
		failCallback?: (err: any) => void
	): any {
		super.postData(
			{
				CREATE_OPTION_KEY_LIST: args,
			},
			`${this.mergedPath}/save_account_and_transaction`,
			successCallback,
			failCallback
		);
	}

	/**
	 * 계산 조건 등록 및 업데이트
	 */
	public saveBankAccountCondition(
		args: { [key: string]: any },
		successCallback?: (response: any) => void,
		failCallback?: (err: any) => void
	): any {
		super.postData(
			{
				CREATE_OPTION_KEY_LIST: args,
			},
			`${this.mergedPath}/save_config_and_get_financial_ratio`,
			successCallback,
			failCallback
		);
	}

	/**
	 * 계산 결과 조회
	 */
	public getFinancialRatio(
		args: { [key: string]: any },
		successCallback?: (response: any) => void,
		failCallback?: (err: any) => void
	): any {
		super.getData(
			args,
			`${this.mergedPath}/get_financial_ratio_by_user_id`,
			successCallback,
			failCallback
		);
	}
}
