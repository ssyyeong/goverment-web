/**
 *
 * 해당 인터페이스는 ERD 상에 포함된 모델을 그대로 사용하는 것을 가정
 *
 */

/**
 * 은행계좌
 */
interface IBankAccount {
	[key: string]: any;
}

/**
 * 계좌 입출금 내역
 */
interface ITransactionHistory {
	[key: string]: any;
}

/**
 * OKR 메인
 */
interface IOkrMain {
	[key: string]: any;
}

/**
 * OKR 하위
 */
interface IOkrDetail {}

/**
 * OKR 조합 (메인 + 하위)
 */
interface IOkrCombination {
	main: IOkrMain;
	detail: IOkrDetail[];
}

/**
 * KPI
 */
interface IKpi {}

export type {
	IBankAccount,
	ITransactionHistory,
	IOkrMain,
	IOkrDetail,
	IKpi,
	IOkrCombination,
};
