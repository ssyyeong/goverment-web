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
	const [memberId, setMemberId] = useState<number | undefined>(undefined);
	//* Cookie
	const cookie = new CookieManager();
	const accessToken = cookie.getItemInCookies('ACCESS_TOKEN');
	//* Hooks
	/**
	 * 유저 아이디 가져오기
	 */
	useEffect(() => {
		if (accessToken === undefined) return;
		else {
			appMemberController.getOneItem(
				{ ACCESS_TOKEN: accessToken },
				(res) => {
					if (res.data.result !== null) {
						setMemberId(
							res.data.result.APP_MEMBER_IDENTIFICATION_CODE
						);
					} else {
						setMemberId(undefined);
					}
				}
			);
		}
	}, [accessToken]);

	return memberId;
};

export default useAppMember;
