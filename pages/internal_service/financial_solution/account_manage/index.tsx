import { Box } from '@mui/material';
import { NextPage } from 'next';
import React, { useEffect } from 'react';
import { useAppMember } from '../../../../src/hooks/useAppMember';
import { InternalServiceLayout } from '../../../../src/views/layout/InternalServiceLayout';
import MyAccounts from '../../../../src/views/local/internal_service/financial_solution/account_manage/MyAccounts/MyAccounts';
import { IBankAccount } from '../../../../src/@types/model';
import DefaultController from '@qillie-corp/ark-office-project/src/controller/default/DefaultController';
import AccountRegisterModal from '../../../../src/views/local/internal_service/financial_solution/account_manage/AccountRegisterModal/AccountRegisterModal';
import AccountRegisterModal from '../../../../src/views/local/internal_service/financial_solution/account_manage/AccountRegisterModal/AccountRegisterModal';

const Page: NextPage = () => {
	//* Modules
	/**
	 * 컨트롤러들
	 */
	const bankAccountController = new DefaultController('BankAccount');

	//* Constants

	//* States
	const [open, setOpen] = React.useState(true);
	/**
	 * 재계산 트리거 키
	 */
	const [recomputeTriggerKey, setRecomputeTriggerKey] =
		React.useState<string>();

	/**
	 * 검색용 키워드
	 */
	const [keyword, setKeyword] = React.useState<string>('');

	/**
	 * 선택한 연/월
	 */
	const [selectedPeriod, setSelectedPeriod] = React.useState<{
		year: number;
		month: number;
	}>();

	/**
	 * 등록한 계좌 리스트
	 */
	const [bankAccountList, setBankAccountList] = React.useState<
		IBankAccount[]
	>([]);

	//* Functions

	//* Hooks
	/**
	 * 유저 아이디 정보 가져오는 훅
	 */
	// const { memberId } = useAppMember();
	const memberId = 1;
	//* const {} = useAppMember();

	/**
	 * 내 계좌 가져오는 훅
	 */
	useEffect(() => {
		bankAccountController.findAllItems(
			{
				APP_MEMBER_IDENTIFICATION_CODE: memberId,
			},
			(res) => {
				setBankAccountList(res.data.result.rows);
			},
			(err) => {
				console.log(err);
			}
		);
	}, []);

	return (
		<Box>
			{/* 컨텐츠 레이아웃 */}
			<InternalServiceLayout>
				{/* 등록 계좌 내역 영역 */}
				{/* <MyAccounts /> */}

				{/* 계좌 내역 컨트롤러 영역 (날짜, 거래 내역 검색) */}

				{/* 실제 계좌 내역 */}
				{bankAccountList.map((bankAccount) => (
					<Box>{/* {<ITransactionHistoryTable />} */}</Box>
				))}

				{/* 번레이트 계산 */}
			</InternalServiceLayout>
			{open && (
				<AccountRegisterModal
					accountRegisterModalOpen={open}
					setAccountRegisterModalOpen={setOpen}
				/>
			)}
		</Box>
	);
};

export default Page;
