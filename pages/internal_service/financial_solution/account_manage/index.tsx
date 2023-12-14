import { Box, Typography, useTheme } from '@mui/material';
import { NextPage } from 'next';
import React, { useEffect } from 'react';
import { useAppMember } from '../../../../src/hooks/useAppMember';
import { InternalServiceLayout } from '../../../../src/views/layout/InternalServiceLayout';
import MyAccounts from '../../../../src/views/local/internal_service/financial_solution/account_manage/MyAccounts/MyAccounts';
import { IBankAccount } from '../../../../src/@types/model';
import DefaultController from '@qillie-corp/ark-office-project/src/controller/default/DefaultController';

import { BankController } from '../../../../src/controller/BankController';
import { TransactionHistoryTable } from '../../../../src/views/local/internal_service/financial_solution/account_manage/TransactionHistoryTable';
import SupportiInput from '../../../../src/views/global/SupportiInput';
import { AccountCalculation } from '../../../../src/views/local/internal_service/financial_solution/account_manage/AccountCalculation';

const Page: NextPage = () => {
	const example = {
		burnRate: 20527185.978260867,
		runWay: 0,
		totalIncome: 100013527,
		totalSpending: 100013527,
		totalBalance: 0,
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
	};

	//* Modules
	/**
	 * 컨트롤러들
	 */
	const bankAccountController = new DefaultController('BankAccount');
	const bankController = new BankController();

	//* Constants

	//* States

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
	 * 선택 연/월 셀렉트 데이터
	 */
	const [selectablePeriodList, setSelectablePeriodList] = React.useState<{
		[key: string]: {
			year: number;
			month: number;
		};
	}>({});
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
				let temp = {};
				for (const [key, value] of Object.entries(
					res.data.result.monthlyIncome
				)) {
					temp = Object.assign(temp, {
						[key]: {
							year: key.split('-')[0],
							month: key.split('-')[1],
						},
					});
				}
				setSelectablePeriodList(temp);
				setSelectedPeriod({
					year: new Date().getFullYear(),
					month: new Date().getMonth() + 1,
				});
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
				// APP_MEMBER_IDENTIFICATION_CODE: memberId,
			},
			(res) => {
				setBankAccountList(res.data.result.rows);
				console.log(res.data.result);
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

	const theme = useTheme();

	return (
		<Box
			position={'relative'}
			bgcolor={theme.palette.primary.light}
			p={{ xs: 2, md: 10 }}
		>
			{/* 컨텐츠 레이아웃 */}
			<InternalServiceLayout>
				<Typography variant="h3" fontWeight={'bold'}>
					등록계좌 내역
				</Typography>
				<Typography color={'secondary.dark'}>
					내역 확인을 위해 은행계정(ID/PW)입력 또는 인증서 등록이
					필요합니다. 계좌 등록은 최대 3개까지 가능합니다.
				</Typography>
				{/* 등록 계좌, 계좌 등록 영역 */}
				<MyAccounts
					setRecomputeTriggerKey={setRecomputeTriggerKey}
					bankAccountList={bankAccountList}
					calculationResult={example}
				/>

				{/* 계좌 내역 컨트롤러 영역 (날짜, 거래 내역 검색) */}
				<Box
					width={'100%'}
					display={'flex'}
					justifyContent={'space-between'}
					alignItems={'center'}
				>
					{/* 날짜 선택 영역 */}
					<Box display={'flex'} gap={1} alignItems={'center'}>
						{' '}
						<SupportiInput
							type="select"
							value={selectedPeriod}
							setValue={(value) => {
								setSelectedPeriod(value);
							}}
							placeholder="계좌 선택"
							// dataList={selectablePeriodList}
							width={145}
						/>
					</Box>

					{/* 검색 영역 */}
					<SupportiInput
						type="search"
						value={keyword}
						setValue={setKeyword}
						placeholder={'거래 내역 검색'}
						width={'300px'}
					/>
				</Box>
				{/* 실제 계좌 내역 */}
				<TransactionHistoryTable
					setRecomputeTriggerKey={() => {}}
					bankAccount={{
						BANK_ACCOUNT_IDENTIFICATION_CODE: 1,
						BANK_CODE: '002',
						LOGIN_METHOD: 'SIGN_IN',
						APP_MEMBER_IDENTIFICATION_CODE: 1,
						ACCOUNT_NUMBER: '110-123-456789',
						ACCOUNT_HOLDER: '홍길동',
						ACCOUNT_PASSWORD: '1234',
						START_DATE: new Date(),
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
							keyword={keyword}
						/>
					</Box>
				))}

				{/* 번레이트 계산 */}
				<AccountCalculation
					setRecomputeTriggerKey={setRecomputeTriggerKey}
					calculationResult={example}
				/>
			</InternalServiceLayout>
		</Box>
	);
};

export default Page;
