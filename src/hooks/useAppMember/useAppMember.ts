import DefaultController from '@qillie-corp/ark-office-project/src/controller/default/DefaultController';
import { CookieManager } from '@qillie-corp/qillie-utility';
import { useEffect, useState } from 'react';

/**
 * 유저 정보 가져오는 훅
 */
const useAppMember = () => {
	//* Controller
	const appMemberController = new DefaultController('AppMember');
	//* State
	/**
	 * 유저 아이디
	 */
	const [memberId, setMemberId] = useState<number | undefined>(1);
	//* Cookie
	const cookie = new CookieManager();
	//* Hooks
	/**
	 * 유저 아이디 가져오기
	 */
	useEffect(() => {
		appMemberController.getOneItem(
			{ ACCESS_TOKEN: cookie.getItemInCookies('ACCESS_TOKEN') },
			(res) => {
				setMemberId(res.data.result.APP_MEMBER_IDENTIFICATION_CODE);
			}
		);
	}, []);

	return memberId || 1;
};

export default useAppMember;
