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
	ROLE?: string;
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
	TITLE: string;
	START_DATE: Date | string;
	END_DATE: Date | string;
	NOTE: string;
	ACHIEVED_RATE: number;
}

/**
 * OKR 하위
 */
interface IOkrDetail {
	TITLE: string;
	START_DATE: Date | string;
	END_DATE: Date | string;
	NOTE: string;
	TARGET_AMOUNT: string;
	TARGET_UNIT: string;
	ACHIEVED_AMOUNT: number;
	ACHIEVED_RATE: number;
}

/**
 * OKR 조합 (메인 + 하위)
 */
interface IOkrCombination extends IOkrMain {
	OkrDetails: IOkrDetail[];
}

/**
 *  OKR 달성량
 */
interface IOkrAchievement {
	AMOUNT: number;
	UNIT: string;
}

/**
 * KPI
 */
interface IKpi {
	TITLE: string;
	TARGET_AMOUNT: number;
	TARGET_INCREASE: number;
	CATEGORY: string;
	RATE: number;
	BANK_CATEGORY?: string;
}

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

/**
 * 커피챗 프로필
 */
interface ICoffeeChatProfile {
	COMPANY_NAME: string;
	PROFILE_IMAGE: string;
	INTRODUCE: string;
	CAREER: string[];
	MAIN_FIELD: string[];
	INTEREST_FIELD: string[];
	ROLE: string;
	DESCRIPTION: string;
	OFFER_YN: 'Y' | 'N';
	SUBJECT: string[];
	[key: string]: any;
}

/**
 * 지원사업 관리
 */
interface ISupportBusinessManagement {
	FIELD?: string;
	TITLE?: string;
	BUSINESS_TITLE?: string;
	START_DATE?: any;
	END_DATE?: any;
	DATA?: string;
	ALIMTALK_YN?: 'Y' | 'N';
	MIN_DEAD_LINE_DATE?: any;
	DEAD_LINE_DATE?: any;
	PERSON_IN_CHARGE?: string;
	MAIN_CONTACT?: string;
	SEND_DATE?: any;
	[key: string]: any;
}

/**
 * 유저IRdata
 */
interface IUserIRData {
	BUSINESS_NUMBER?: string;
	IR_FILE?: string;
	IMAGE_LIST?: string[];
	COMPANY_NAME?: string;
	BUSINESS_SECTOR?: string;
	ESTABLISHMENT_DATE?: string;
	COMPANY_ADDRESS?: string;
	HOME_PAGE?: string;
	CONTACT_NUMBER?: string;
	SUMMARY?: string;
	DESCRIPTION?: string;
	INVEST_INFO?: string;
	HOPE_INVEST_ROUND?: string;
	HOPE_INVEST_MONEY?: string;
	[key: string]: any;
}

export type {
	IBankAccount,
	ITransactionHistory,
	IOkrMain,
	IOkrDetail,
	IOkrAchievement,
	IKpi,
	IOkrCombination,
	IUser,
	IFinancialStatement,
	IBusiness,
	IBusinessHistory,
	ICoffeeChatProfile,
	ISupportBusinessManagement,
	IUserIRData,
};
