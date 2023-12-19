import DefaultController from '@qillie-corp/ark-office-project/src/controller/default/DefaultController';
import { CookieManager } from '@qillie-corp/qillie-utility';
import { useEffect, useState } from 'react';
import { PointHistoryController } from '../../controller/PointHistoryController';

/**
 * 유저 정보 가져오는 훅
 */
const useAppMember = () => {
	//* Controller
	const appMemberController = new DefaultController('AppMember');
	const pointHistoryController = new PointHistoryController();
	//* State
	/**
	 * 유저 아이디
	 */
	const [memberId, setMemberId] = useState<number | undefined>(undefined);
	/**
	 * 유저 이름
	 */
	const [memberName, setMemberName] = useState<string | undefined>(undefined);
	/**
	 * 유저 포인트
	 */
	const [memberPoint, setMemberPoint] = useState<string | undefined>(
		undefined
	);
	//* Cookie
	const cookie = new CookieManager();
	const accessToken = cookie.getItemInCookies('ACCESS_TOKEN');
	//* Hooks
	/**
	 * 유저 아이디 가져오기
	 */
	useEffect(() => {
		if (accessToken === undefined) {
			setMemberId(undefined);
			setMemberName(undefined);
			setMemberPoint(undefined);
		} else {
			appMemberController.getData(
				{},
				`${appMemberController.mergedPath}/profile`,
				(res) => {
					if (res.data.result !== null) {
						setMemberId(
							res.data.result.APP_MEMBER_IDENTIFICATION_CODE
						);
						setMemberName(res.data.result.FULL_NAME);
						pointHistoryController.getPointSum(
							{
								APP_MEMBER_IDENTIFICATION_CODE:
									res.data.result
										.APP_MEMBER_IDENTIFICATION_CODE,
							},
							(res) => {
								setMemberPoint(res.data.result);
							}
						);
					} else {
						setMemberId(undefined);
					}
				}
			);
		}
	}, [accessToken]);

	return { memberId, memberName, memberPoint };
};

export default useAppMember;
