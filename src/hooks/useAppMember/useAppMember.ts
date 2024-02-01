import DefaultController from '@leanoncompany/supporti-ark-office-project/src/controller/default/DefaultController';
import { CookieManager } from '@leanoncompany/supporti-utility';
import { useEffect, useMemo, useState } from 'react';
import { PointHistoryController } from '../../controller/PointHistoryController';

/**
 * 유저 정보 가져오는 훅
 */
const useAppMember = () => {
	//* Controller
	const appMemberController = new DefaultController('AppMember');
	const pointHistoryController = new PointHistoryController();
	const coffeeChatProfileController = new DefaultController(
		'CoffeeChatProfile'
	);
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
	/**
	 * 유저 커피챗 프로필 아이디
	 */
	const [memberCoffeeChatProfileId, setMemberCoffeeChatProfileId] = useState<
		number | undefined
	>(undefined);

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
			if (memberId !== undefined) return;
			appMemberController.getData(
				{},
				`${appMemberController.mergedPath}/profile`,
				(res) => {
					if (res.data.result !== null) {
						setMemberId(
							res.data.result.APP_MEMBER_IDENTIFICATION_CODE
						);
						setMemberName(res.data.result.FULL_NAME);
						if (memberPoint !== undefined) return;
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

	/**
	 * 유저 커피챗 프로필 아이디 가져오기
	 */
	useEffect(
		() => {
			if (memberId === undefined) {
				setMemberCoffeeChatProfileId(undefined);
			} else {
				if (memberCoffeeChatProfileId !== undefined) return;
				coffeeChatProfileController.getOneItemByKey(
					{
						APP_MEMBER_IDENTIFICATION_CODE: memberId,
					},
					(res) => {
						if (res.data.result !== null) {
							setMemberCoffeeChatProfileId(
								res.data.result
									.COFFEE_CHAT_PROFILE_IDENTIFICATION_CODE
							);
						} else {
							setMemberCoffeeChatProfileId(undefined);
						}
					}
				);
			}
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[memberId]
	);

	return { memberId, memberName, memberPoint, memberCoffeeChatProfileId };
};

export default useAppMember;
