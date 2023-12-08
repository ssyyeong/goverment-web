import { Box } from '@mui/material';
import { NextPage } from 'next';
import React, { useEffect } from 'react';
import { useAppMember } from '../../../../src/hooks/useAppMember';
import { InternalServiceLayout } from '../../../../src/views/layout/InternalServiceLayout';
import MyAccounts from '../../../../src/views/local/internal_service/financial_solution/account_manage/MyAccounts/MyAccounts';
import { IBankAccount } from '../../../../src/@types/model';
import DefaultController from '@qillie-corp/ark-office-project/src/controller/default/DefaultController';
import AccountRegisterModal from '../../../../src/views/local/internal_service/financial_solution/account_manage/AccountRegisterModal/AccountRegisterModal';
import { BankController } from '../../../../src/controller/BankController';
import { TransactionHistoryTable } from '../../../../src/views/local/internal_service/financial_solution/account_manage/TransactionHistoryTable';

const Page: NextPage = () => {
	//* Modules
	/**
	 * 컨트롤러들
	 */
	const bankAccountController = new DefaultController('BankAccount');
	const bankController = new BankController();

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
	 * 계산 조건 선택한 연/월
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

	/**
	 * 계산 결과 데이터
	 */
	const [calculationResult, setCalculationResult] = React.useState<{
		[key: string]: any;
	}>({});

	//* Functions
	/**
	 * 계산 결과 조회
	 */
	const getCalculationResult = () => {
		bankController.getFinancialRatio(
			{
				APP_MEMBER_IDENTIFICATION_CODE: memberId,
			},
			(res) => {
				setCalculationResult(res.data.result);
			},
			(err) => {}
		);
	};

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

	/**
	 * 선택한 날짜 변경 시, 재계산 트리거 키 변경 시 수입 및 지출 재계산하는 api 호출 훅
	 */
	useEffect(() => {
		getCalculationResult();
	}, [recomputeTriggerKey]);

	/**
	 * 계좌 추가 함수 (추가 후, 리스트 변경)
	 */

	return (
		<Box>
			{/* 컨텐츠 레이아웃 */}
			<InternalServiceLayout>
				{/* 등록 계좌, 계좌 등록 영역 */}
				<MyAccounts
					setRecomputeTriggerKey={setRecomputeTriggerKey}
					bankAccountList={[
						{
							BANK_CODE: '003',
							BANK_ACCOUNT_IDENTIFICATION_CODE: 1,
							APP_MEMBER_IDENTIFICATION_CODE: 1,
							ACCOUNT_NUMBER: '110-123-456789',
							ACCOUNT_HOLDER: '김만수',
							ACCOUNT_NICKNAME: '닉넴',
						},
					]}
					calculationResult={{
						monthlyIncome: {
							'2022-05': 100000000,
							'2022-06': 7430,
							'2022-07': 0,
							'2022-08': 0,
							'2022-09': 0,
							'2022-10': 0,
							'2022-11': 0,
							'2022-12': 6097,
							'2023-01': 0,
							'2023-02': 0,
							'2023-03': 0,
							'2023-04': 0,
							'2023-05': 0,
							'2023-12': 0,
						},
						monthlySpending: {
							'2022-05': 39634785,
							'2022-06': 18432970,
							'2022-07': 17434615,
							'2022-08': 17732282,
							'2022-09': 5768500,
							'2022-10': 1004278,
							'2022-11': 0,
							'2022-12': 0,
							'2023-01': 6097,
							'2023-02': 0,
							'2023-03': 0,
							'2023-04': 0,
							'2023-05': 0,
							'2023-12': 0,
						},
					}}
				/>

				{/* 계좌 내역 컨트롤러 영역 (날짜, 거래 내역 검색) */}

				{/* 실제 계좌 내역 */}
				<TransactionHistoryTable
					setRecomputeTriggerKey={() => {}}
					bankAccount={{
						BANK_ACCOUNT_IDENTIFICATION_CODE: 1,
						BANK_CODE: '002',
					}}
					selectedPeriod={{
						year: 2021,
						month: 10,
					}}
					keyword={''}
				/>
				{bankAccountList.map((bankAccount) => (
					<Box>
						<TransactionHistoryTable
							setRecomputeTriggerKey={setRecomputeTriggerKey}
							bankAccount={bankAccount}
							selectedPeriod={selectedPeriod}
							keyword={''}
						/>
					</Box>
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
