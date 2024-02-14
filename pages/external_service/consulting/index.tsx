import React, { useEffect } from 'react';

import { NextPage } from 'next';

import {
	Box,
	BoxProps,
	Typography,
	useMediaQuery,
	useTheme,
} from '@mui/material';
import SupportiToggle from '../../../src/views/global/SupportiToggle';
import SupportiTable, {
	TableHeaderProps,
} from '../../../src/views/global/SupportiTable/SupportiTable';
import { usePagination } from '../../../src/hooks/usePagination';
import DefaultController from '@leanoncompany/supporti-ark-office-project/src/controller/default/DefaultController';
import SupportiPagination from '../../../src/views/global/SupportiPagination';
import { useRouter } from 'next/router';
import MobileTableRow from '../../../src/views/local/external_service/mobileTableRow/MobileTableRow';
import Nodata from '../../../src/views/global/NoData/NoData';
import { AppMemberController } from '../../../src/controller/AppMemberController';
import { useAppMember } from '../../../src/hooks/useAppMember';
import { useSubscription } from '../../../src/hooks/useSubscription';

const Page: NextPage = () => {
	//* Modules
	const router = useRouter();
	const appMemberController = new AppMemberController();
	const userSubscriptionController = new DefaultController(
		'UserSubscription'
	);

	//* States
	/**
	 * 회원 정보
	 */
	const { memberId } = useAppMember();

	const { subscriptionInfo, subscriptionType } = useSubscription({
		memberId: memberId,
	});

	//* Constants
	const consultingHeaderData: TableHeaderProps[] = [
		{
			label: 'NO',
			value: '',
			format: (value, key, idx) => {
				return page * 10 + (idx + 1);
			},
			align: 'left',
		},
		{
			label: '제목',
			value: 'PRODUCT_NAME',
			align: 'center',
		},
		{
			label: '금액',
			align: 'center',
			value: 'PRICE',
			format: (value) => {
				return `${value.toLocaleString()} 원`;
			},
		},
	];

	//* States
	/**
	 * 컨설팅 데이터 리스트
	 */
	const [consultingDataList, setConsultingDataList] = React.useState([]);
	/**
	 * 컨설팅 데이터 총 개수
	 */
	const [totalDataCount, setTotalDataCount] = React.useState<number>(0);
	//* Functions

	//* Hooks
	/**
	 * 페이징 관련
	 */
	const { page, limit, handlePageChange, setLimit } = usePagination();
	/**
	 * 컨설팅 리스트 가져오기
	 */
	useEffect(() => {
		const consultingController = new DefaultController('ConsultingProduct');
		consultingController.findAllItems(
			{
				LIMIT: 10,
				PAGE: page,
				PURCHASE_AVAILABLE_YN: 'Y',
			},
			(res) => {
				setTotalDataCount(res.data.result.count);
				setConsultingDataList(res.data.result.rows);
			},
			(err) => {}
		);
	}, [page]);

	/**
	 *
	 * 구독권 프리미엄 프로 회원만 접근 가능
	 */

	useEffect(() => {
		if (
			Object.keys(subscriptionInfo).length !== 0 &&
			subscriptionType !== 'PRODUCT'
		) {
			alert(
				'THE PREMIUM PRO 요금제 구독 회원만 접근 가능한 페이지입니다.'
			);
			router.back();
		}
	}, [subscriptionInfo]);

	return (
		<Box
			width={'100%'}
			p={{
				xs: 2,
				md: 10,
			}}
			bgcolor={'primary.light'}
		>
			<Typography variant="h4" fontWeight={'bold'}>
				예약 가능 컨설팅
			</Typography>
			{/* 테이블 */}
			<Box
				width={'100%'}
				p={2}
				mt={2}
				display={{ xs: 'none', sm: 'block' }}
			>
				<SupportiTable
					rowData={consultingDataList}
					headerData={consultingHeaderData}
					onClick={(data) => {
						router.push(
							`/external_service/consulting/${data.CONSULTING_PRODUCT_IDENTIFICATION_CODE}`
						);
					}}
				/>
			</Box>
			{/* 모바일 테이블 */}
			<Box width={'100%'} mt={2} display={{ xs: 'block', sm: 'none' }}>
				{consultingDataList.map((item, idx) => {
					return (
						<MobileTableRow
							index={idx}
							title={item.PRODUCT_NAME}
							onClick={() => {
								router.push(
									`/external_service/consulting/${item.CONSULTING_PRODUCT_IDENTIFICATION_CODE}`
								);
							}}
							colums={[
								{
									label: '제목',
									value: item.PRODUCT_NAME,
								},
								{
									label: '금액',
									value: `${item.PRICE.toLocaleString()} P`,
								},
							]}
						/>
					);
				})}
				{consultingDataList.length === 0 && <Nodata />}
			</Box>
			{/* 페이지 네이션 */}
			<Box width={'100%'} p={2}>
				<SupportiPagination
					limit={limit}
					setLimit={setLimit}
					page={page}
					handlePageChange={handlePageChange}
					count={totalDataCount}
					useLimit={false}
				/>
			</Box>
		</Box>
	);
};

export default Page;
