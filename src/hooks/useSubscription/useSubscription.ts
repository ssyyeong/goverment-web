import DefaultController from '@leanoncompany/supporti-ark-office-project/src/controller/default/DefaultController';
import { CookieManager } from '@leanoncompany/supporti-utility';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

interface ISubscriptionProps {
	memberId: number;
}

const useSubscription = (props: ISubscriptionProps) => {
	//* Modules
	const router = useRouter();

	//* Controller
	const appMemberController = new DefaultController('AppMember');
	const subscriptionController = new DefaultController('UserSubscription');

	//* Constant

	//* State
	/**
	 * 구독 정보
	 */
	const [subscriptionInfo, setSubscriptionInfo] = useState<any>({});

	/**
	 * 구독권 타입
	 */
	const [subscriptionType, setSubscriptionType] = useState<string>('NONE');

	//* Cookie
	const cookie = new CookieManager();

	//* Hooks

	/**
	 * 구독권 정보 가져오기
	 */
	useEffect(() => {
		props.memberId &&
			subscriptionController.getOneItemByKey(
				{
					APP_MEMBER_IDENTIFICATION_CODE: props.memberId,
					EXPIRED_YN: 'N',
					CANCELED_YN: 'N',
				},
				(res) => {
					setSubscriptionInfo(res.data.result);
				},
				(err) => {
					console.log(err);
				}
			);
	}, [props.memberId]);

	/**
	 * 구독권 타입 가져오기
	 */
	useEffect(() => {
		if (subscriptionInfo) {
			if (Object.keys(subscriptionInfo)?.length !== 0) {
				setSubscriptionType(
					subscriptionInfo?.SubscriptionProduct?.TYPE
				);
			}
		}
	}, [subscriptionInfo]);

	return { subscriptionType, subscriptionInfo };
};

export default useSubscription;
