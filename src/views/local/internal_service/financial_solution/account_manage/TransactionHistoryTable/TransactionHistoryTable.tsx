import React, { useEffect } from 'react';

import { Box, BoxProps } from '@mui/material';
import {
	IBankAccount,
	ITransactionHistory,
} from '../../../../../../@types/model';
import { bankConfig } from '../../../../../../../configs/data/BankConfig';

interface ITransactionHistoryTableProps {
	/**
	 * 재계산 트리거 키 세터
	 */
	setRecomputeTriggerKey: React.Dispatch<
		React.SetStateAction<string | undefined>
	>;

	/**
	 * 계좌
	 */
	bankAccount: IBankAccount;

	/**
	 * 선택 일자
	 */
	selectedPeriod: {
		year: number;
		month: number;
	};

	/**
	 * 키워드
	 */
	keyword: string;
}

const TransactionHistoryTable = (props: ITransactionHistoryTableProps) => {
	//* Modules

	//* Constants

	//* States
	/**
	 * 입출금 내역
	 */
	const [transactionHistoryList, setTransactionHistoryList] = React.useState<
		ITransactionHistory[]
	>([]);

	//* Functions

	//* Hooks
	/**
	 * 입출금 내역 가져오기
	 */
	useEffect(() => {});

	return (
		<Box>
			{/* 제외 파트 변경 시, 부모로부터 받는 preserveKey 변경 (preserveKey 변경 시 재계산 콜백들이 실행됨) */}
			{/* {transactionHistoryList.map((transactionHistory) => {
				return <Box></Box>;
			})} */}
		</Box>
	);
};

export default TransactionHistoryTable;
