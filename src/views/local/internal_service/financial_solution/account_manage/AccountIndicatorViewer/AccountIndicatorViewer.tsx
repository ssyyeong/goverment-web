import React from 'react';

import { Box, BoxProps } from '@mui/material';
import { IBankAccount } from '../../../../../../@types/model';

interface IAccountIndicatorViewerProps {
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

const AccountIndicatorViewer = (props: IAccountIndicatorViewerProps) => {
	//* Modules
	/**
	 * 컨트롤러들
	 */

	//* Constants

	//* States
	/**
	 * 총 수입 (백엔드로부터 가져오는 데이터)
	 */

	/**
	 * 총 지출 (백엔드로부터 가져오는 데이터)
	 */

	/**
	 * 회사 보유 자금 (백엔드로부터 가져오는 데이터)
	 */

	/**
	 * 번레이트 (백엔드로부터 가져오는 데이터)
	 */

	/**
	 * 기준일
	 */

	/**
	 * 평균 개월
	 */

	/**
	 * ...
	 */

	//* Functions

	//* Hooks
	/**
	 * 번레이트, 총 수입, 총 지출, 회사 보유 자금 가져오는 훅
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

export default AccountIndicatorViewer;
