import DefaultController from '@qillie-corp/ark-office-project/src/controller/default/DefaultController';
import { CookieManager } from '@qillie-corp/qillie-utility';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

type TCheckTarget = 'SIGN_IN' | 'SUBSCRIPTION';

interface IUseUserAccessProps {
	checkTarget: TCheckTarget;
}

/**
 * 결제 정보 혹은 로그인 정보 가져오는 훅
 */
const useUserAccess = (props: IUseUserAccessProps) => {
	//* Modules
	const router = useRouter();

	//* Controller
	const appMemberController = new DefaultController('AppMember');

	//* Constant
	/**
	 * 메세지 및 이동 경로
	 */
	const redirectConfig: {
		[key: string]: { message: string; redirectUrl: string };
	} = {
		SIGN_IN: {
			message: '로그인 후 이용 가능합니다.',
			redirectUrl: '/login',
		},
		SUBSCRIPTION: {
			message: '구독 후 이용 가능합니다.',
			redirectUrl: '/subscription',
		},
	};

	//* State
	/**
	 * 유저 체크
	 */
	const [isSignedIn, setIsSignedIn] = useState<boolean | undefined>();

	/**
	 * 구독 여부 체크
	 */
	const [isSubscribed, setIsSubscribed] = useState<boolean | undefined>();

	/**
	 * 최종 권한 체크 결과
	 */
	const [access, setAccess] = useState<boolean | undefined>();

	//* Cookie
	const cookie = new CookieManager();

	//* Hooks
	/**
	 * 권한에 따른 alert 및 페이지 이동
	 */
	useEffect(() => {
		if (access !== undefined) {
			/**
			 * 권한이 없을 경우 (메세지 및 경로 설정)
			 */
			if (access === false) {
				alert(redirectConfig[props.checkTarget].message);
				router.push(redirectConfig[props.checkTarget].redirectUrl);
			}
		}
	}, [access]);

	/**
	 * 구독 권한 체크
	 */
	useEffect(() => {
		if (isSubscribed !== undefined && props.checkTarget == 'SUBSCRIPTION') {
			setAccess(isSubscribed);
		}
	}, [isSubscribed]);

	/**
	 * 로그인 권한 체크
	 */
	useEffect(() => {
		if (isSignedIn !== undefined && props.checkTarget == 'SIGN_IN') {
			setAccess(isSignedIn);
		}
	}, [isSignedIn]);

	/**
	 * 진입 시 로그인 체크 (setIsSignedIn)
	 */
	useEffect(() => {}, []);

	/**
	 * 진입 시 구독 체크 (setIsSubscribed)
	 */
	useEffect(() => {}, []);

	return access;
};

export default useUserAccess;
