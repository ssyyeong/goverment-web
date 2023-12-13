import { ControllerABC } from '@qillie-corp/ark-office-project/src/controller/base/ControllerABC';

export class AppMemberController extends ControllerABC {
	//* 클래스 멤버
	constructor(role?: string) {
		super('AppMember', role);
	}

	//* 로컬로그인
	public login(
		args: { [key: string]: any },
		successCallback?: (response: any) => void,
		failCallback?: (err: any) => void
	): any {
		super.postData(
			args,
			`${this.mergedPath}/sign_in/local`,
			successCallback,
			failCallback
		);
	}

	//* 로컬 회원가입
	public register(
		args: { [key: string]: any },
		successCallback?: (response: any) => void,
		failCallback?: (err: any) => void
	): any {
		super.postData(
			args,
			`${this.mergedPath}/sign_up/local`,
			successCallback,
			failCallback
		);
	}

	//* 알림톡 전송

	//* 전화번호 중복
	public checkPhoneNumber(
		args: { [key: string]: any },
		successCallback?: (response: any) => void,
		failCallback?: (err: any) => void
	): any {
		super.getData(
			args,
			`${this.mergedPath}/double_check_phone_number`,
			successCallback,
			failCallback
		);
	}
	//* 이메일 중복확인
	public checkEmail(
		args: { [key: string]: any },
		successCallback?: (response: any) => void,
		failCallback?: (err: any) => void
	): any {
		super.getData(
			args,
			`${this.mergedPath}/double_check_username`,
			successCallback,
			failCallback
		);
	}

	//* 이메일 찾기
	public findEmail(
		args: { [key: string]: any },
		successCallback?: (response: any) => void,
		failCallback?: (err: any) => void
	): any {
		super.postData(
			args,
			`${this.mergedPath}/find/user_name`,
			successCallback,
			failCallback
		);
	}

	//* 비밀번호 찾기(번호인증 전송)
	public findPassword(
		args: { [key: string]: any },
		successCallback?: (response: any) => void,
		failCallback?: (err: any) => void
	): any {
		super.postData(
			args,
			`${this.mergedPath}/find/password/validate`,
			successCallback,
			failCallback
		);
	}

	//* 비밀번호 찾기(번호인증 검증)
	public findPasswordValidate(
		args: { [key: string]: any },
		successCallback?: (response: any) => void,
		failCallback?: (err: any) => void
	): any {
		super.postData(
			args,
			`${this.mergedPath}/find/password/success`,
			successCallback,
			failCallback
		);
	}

	//*카카오 로그인
	public kakaoLogin(
		args: { [key: string]: any },
		successCallback?: (response: any) => void,
		failCallback?: (err: any) => void
	): any {
		super.postData(
			args,
			`${this.mergedPath}/kakao_login`,
			successCallback,
			failCallback
		);
	}

	//* 네이버 로그인
	public naverLogin(
		args: { [key: string]: any },
		successCallback?: (response: any) => void,
		failCallback?: (err: any) => void
	): any {
		super.postData(
			args,
			`${this.mergedPath}/naver_login`,
			successCallback,
			failCallback
		);
	}

	//* 구글 로그인
	public googleLogin(
		args: { [key: string]: any },
		successCallback?: (response: any) => void,
		failCallback?: (err: any) => void
	): any {
		super.postData(
			args,
			`${this.mergedPath}/google_login`,
			successCallback,
			failCallback
		);
	}
}
