import DefaultController from '@leanoncompany/supporti-ark-office-project/src/controller/default/DefaultController';
import { CookieManager } from '@leanoncompany/supporti-utility';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

type TCheckTarget = 'SIGN_IN' | 'SUBSCRIPTION' | 'BUSINESS_MEMBER';

/**
 * 결제 정보 혹은 로그인 정보 가져오는 훅
 */
const useUserAccess = (checkTarget: TCheckTarget) => {
	//* Modules
	const router = useRouter();

	//* Controller
	const appMemberController = new DefaultController('AppMember');
	const subscriptionController = new DefaultController('UserSubscription');

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
		BUSINESS_MEMBER: {
			message: '사업자 회원만 이용 가능합니다.',
			redirectUrl: '/my_page/edit',
		},
	};

	//* State
	/**
	 * 유저 체크
	 */
	const [isSignedIn, setIsSignedIn] = useState<boolean | undefined>();
	/**
	 * 유저 아이디
	 */
	const [userId, setUserId] = useState<any>();

	/**
	 * 구독 여부 체크
	 */
	const [isSubscribed, setIsSubscribed] = useState<boolean | undefined>();

	/**
	 * 사업자 회원 체크
	 */
	const [isBusinessMember, setIsBusinessMember] = useState<
		boolean | undefined
	>();

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
	// useEffect(() => {
	// 	if (access !== undefined) {
	// 		/**
	// 		 * 권한이 없을 경우 (메세지 및 경로 설정)
	// 		 */
	// 		if (access === false) {
	// 			alert(redirectConfig[checkTarget].message);
	// 			router.push(redirectConfig[checkTarget].redirectUrl);
	// 		}
	// 	}
	// }, [access]);

	/**
	 * 사업가 권한 체크
	 */
	useEffect(() => {
		if (
			isBusinessMember !== undefined &&
			checkTarget == 'BUSINESS_MEMBER'
		) {
			setAccess(isBusinessMember);
		}
	}, [isBusinessMember]);

	/**
	 * 구독 권한 체크
	 */
	useEffect(() => {
		if (isSubscribed !== undefined && checkTarget == 'SUBSCRIPTION') {
			setAccess(true);
		}
	}, [isSubscribed]);

	/**
	 * 로그인 권한 체크
	 */
	useEffect(() => {
		if (isSignedIn !== undefined && checkTarget == 'SIGN_IN') {
			setAccess(isSignedIn);
		}
	}, [isSignedIn]);

	/**
	 * 진입 시 로그인 체크 (setIsSignedIn)
	 */
	const accessToken = cookie.getItemInCookies('ACCESS_TOKEN');

	useEffect(() => {
		if (accessToken) {
			appMemberController.getData(
				{},
				`${appMemberController.mergedPath}/profile`,
				(res) => {
					if (res.data.result !== null) {
						setUserId(
							res.data.result.APP_MEMBER_IDENTIFICATION_CODE
						);
						setIsSignedIn(true);
						setIsBusinessMember(
							res.data.result.USER_GRADE == 'BUSINESS'
						);
					} else {
						setIsSignedIn(false);
					}
				},
				(err) => {
					setIsSignedIn(false);
				}
			);
		} else {
			setIsSignedIn(false);
		}
	}, [accessToken]);

	/**
	 * 진입 시 구독 체크 (setIsSubscribed)
	 */
	useEffect(() => {
		userId &&
			subscriptionController.getOneItemByKey(
				{
					APP_MEMBER_IDENTIFICATION_CODE: userId,
					EXPIRED_YN: 'N',
				},
				(res) => {
					if (res.data.result !== null) {
						setIsSubscribed(true);
					} else {
						setIsSubscribed(false);
					}
				},
				(err) => {
					setIsSubscribed(false);
				}
			);
	}, [userId]);

	return { access };
};

export default useUserAccess;
