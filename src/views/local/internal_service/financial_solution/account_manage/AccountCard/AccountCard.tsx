import React from 'react';

import { Box, BoxProps } from '@mui/material';
import { IBankAccount } from '../../../../../../@types/model';
import { bankConfig } from '../../../../../../../configs/data/BankConfig';

interface IAccountCardProps {
	bankAccount: IBankAccount;

	/**
	 * 상위 리스트 변경을 위한 컴포넌트
	 */
	bankAccountList: IBankAccount[];
	setBankAccountList: React.Dispatch<React.SetStateAction<IBankAccount[]>>;
}

const AccountCard = (props: IAccountCardProps) => {
	//* Modules
	/**
	 * 컨트롤러들
	 */

	//* Constants

	//* States

	//* Functions
	/**
	 * 수정하기 함수
	 * 1. 수정
	 * 2. 수정 Promise resolve 후 상위 리스트 변경
	 */

	/**
	 * 삭제하기 함수
	 */

	return (
		<Box>
			{/* 아이콘 */}
			{/* 은행 정보 */}
			{/* 컨트롤러 버튼 */}
		</Box>
	);
};

export default AccountCard;
