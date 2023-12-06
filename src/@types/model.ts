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

export type { IBankAccount, ITransactionHistory };
