/**
 *
 * 해당 인터페이스는 ERD 상에 포함된 모델을 그대로 사용하는 것을 가정
 *
 */

/**
 * 사용자
 */
interface IUser {
	USER_GRADE: 'GENERAL' | 'BUSINESS';
	USER_NAME?: string;
	PASSWORD?: string;
	FULL_NAME?: string;
	PHONE_NUMBER?: string;
	SNS_ID?: string;
	SNS_TYPE?: 'KAKAO' | 'NAVER' | 'GOOGLE';
	ALIMTALK_YN?: 'Y' | 'N';
	[key: string]: any;
}

/**
 * 은행계좌
 */
interface IBankAccount {
	BANK_ACCOUNT_IDENTIFICATION_CODE: number;
	APP_MEMBER_IDENTIFICATION_CODE: number;
	BANK_CODE: string;
	LOGIN_METHOD: 'CERTIFICATE' | 'SIGN_IN';
	ACCOUNT_NUMBER: string;
	ACCOUNT_HOLDER: string;
	ACCOUNT_NICKNAME?: string;
	START_DATE: Date;
	ACCOUNT_PASSWORD: string;
	LOGIN_USER_ID?: string;
	LOGIN_USER_PASSWORD?: string;
	CERTIFICATE_SIGN?: string;
	CERTIFICATE_PASSWORD?: string;
	CERTIFICATE_PRIVATE_KEY?: string;
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

/**
 * 재표제표
 */
interface IFinancialStatement {
	[key: string]: any;
}

/**
 * 비즈니스 개요
 */
interface IBusiness {
	[key: string]: any;
}

/**
 * 비즈니스 로그
 */
interface IBusinessHistory {
	[key: string]: any;
}

export type {
	IBankAccount,
	ITransactionHistory,
	IOkrMain,
	IOkrDetail,
	IKpi,
	IOkrCombination,
	IUser,
	IFinancialStatement,
	IBusiness,
	IBusinessHistory,
};
