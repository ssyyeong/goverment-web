import React from 'react';

import { Box, BoxProps } from '@mui/material';
import { IBankAccount } from '../../../../../../@types/model';

interface IMyAccountsProps {
	/**
	 * 재계산 트리거 키
	 */
	recomputeTriggerKey: string | undefined;

	/**
	 * 수입
	 */
	income: number;

	/**
	 * 지출
	 */
	expense: number;

	/**
	 * 등록한 계좌 리스트
	 */
	bankAccountList: IBankAccount[];
}

const MyAccounts = (props: IMyAccountsProps) => {
	//* Modules
	/**
	 * 컨트롤러들
	 */

	//* Constants

	//* States

	/**
	 * 선택한 연/월
	 */
	const [selectedPeriod, setSelectedPeriod] = React.useState<{
		year: number;
		month: number;
	}>();

	/**
	 * 계좌별 내역 리스트 (날짜, 거래 내역 키워드로 백엔드 필터링)
	 */

	//* Functions
	/**
	 * 계좌 추가 함수 (추가 후, 리스트 변경)
	 */

	//* Hooks
	/**
	 * 선택한 날짜 변경 시, 재계산 트리거 키 변경 시 수입 및 지출 재계산하는 api 호출 훅
	 */

	return (
		<Box>
			{/* 연도 선택 및 수입 / 지출 */}
			<Box></Box>

			{/* 계좌 리스트 */}
			{props.bankAccountList.map((bankAccount) => (
				<Box></Box>
			))}

			{/* 계좌 등록 */}
			<Box></Box>

			{/* 계좌 등록 / 수정 모달 (얘는, 버튼으로 등록 계좌 내역 영역 쪽에 들어가야함) */}
		</Box>
	);
};

export default MyAccounts;
