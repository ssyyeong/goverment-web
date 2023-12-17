import { Box, Typography, useTheme } from '@mui/material';
import { NextPage } from 'next';
import React, { useEffect } from 'react';
import { useAppMember } from '../../../../src/hooks/useAppMember';
import { InternalServiceLayout } from '../../../../src/views/layout/InternalServiceLayout';
import MyAccounts from '../../../../src/views/local/internal_service/financial_solution/account_manage/MyAccounts/MyAccounts';
import { IBankAccount } from '../../../../src/@types/model';
import DefaultController from '@qillie-corp/ark-office-project/src/controller/default/DefaultController';
import { IAccountCalculationResultProps } from '../../../../src/views/local/internal_service/financial_solution/account_manage/AccountCalculation/AccountCalculation';
import { BankController } from '../../../../src/controller/BankController';
import { TransactionHistoryTable } from '../../../../src/views/local/internal_service/financial_solution/account_manage/TransactionHistoryTable';
import SupportiInput from '../../../../src/views/global/SupportiInput';
import { AccountCalculation } from '../../../../src/views/local/internal_service/financial_solution/account_manage/AccountCalculation';
import InternalServiceDrawer from '../../../../src/views/local/internal_service/common/InternalServiceDrawer/InternalServiceDrawer';

const Page: NextPage = () => {
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
	 * 검색 트리거키
	 */
	const [searchTriggerKey, setSearchTriggerKey] = React.useState<string>();
	/**
	 * 선택 연/월 셀렉트 데이터
	 */
	const [selectablePeriodList, setSelectablePeriodList] =
		React.useState<any>();
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
	const [calculationResult, setCalculationResult] =
		React.useState<IAccountCalculationResultProps>();

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
				if (!selectablePeriodList) {
					let temp = [];
					for (const [key, value] of Object.entries(
						res.data.result.monthlyIncome
					)) {
						temp.push({
							value: {
								year: Number(key.split('-')[0]),
								month: Number(key.split('-')[1]),
							},
							label: `${key.split('-')[0]}년 ${
								key.split('-')[1]
							}월`,
						});
					}
					setSelectablePeriodList(temp);
					setSelectedPeriod(temp[temp.length - 1].value);
				}

				setCalculationResult(res.data.result);
			},
			(err) => {}
		);
	};
	console.log(selectedPeriod);
	/**
	 * 계산결과 조회 after first try
	 */

	//* Hooks
	/**
	 * 유저 아이디 정보 가져오는 훅
	 */
	const { memberId } = useAppMember();

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
		memberId && getCalculationResult();
	}, [recomputeTriggerKey, memberId]);

	/**
	 * 계좌 추가 함수 (추가 후, 리스트 변경)
	 */

	const theme = useTheme();

	return (
		<InternalServiceDrawer type={'dashboard'}>
			<Box
				position={'relative'}
				bgcolor={theme.palette.primary.light}
				p={{ xs: 2, md: 10 }}
				width={'100%'}
			>
				{/* 컨텐츠 레이아웃 */}
				<InternalServiceLayout>
					<Typography variant="h3" fontWeight={'bold'} sx={{ mb: 2 }}>
						등록계좌 내역
					</Typography>
					<Typography color={'secondary.dark'} sx={{ mb: 2 }}>
						내역 확인을 위해 은행계정(ID/PW)입력 또는 인증서 등록이
						필요합니다. 계좌 등록은 최대 3개까지 가능합니다.
					</Typography>
					{/* 등록 계좌, 계좌 등록 영역 */}
					{calculationResult && (
						<MyAccounts
							setRecomputeTriggerKey={setRecomputeTriggerKey}
							bankAccountList={bankAccountList}
							calculationResult={calculationResult}
						/>
					)}

					{/* 계좌 내역 컨트롤러 영역 (날짜, 거래 내역 검색) */}
					<Box
						width={'100%'}
						display={'flex'}
						justifyContent={'space-between'}
						alignItems={'center'}
						mb={2}
					>
						{/* 날짜 선택 영역 */}
						<Box display={'flex'} gap={1} alignItems={'center'}>
							{selectedPeriod && (
								<SupportiInput
									type="select"
									value={selectedPeriod}
									setValue={(value) => {
										setSelectedPeriod(value);
									}}
									placeholder="계좌 선택"
									dataList={selectablePeriodList}
									width={145}
								/>
							)}
						</Box>

						{/* 검색 영역 */}
						<SupportiInput
							type="search"
							value={keyword}
							setValue={setKeyword}
							placeholder={'거래 내역 검색'}
							btnOnclick={() => {
								setSearchTriggerKey(keyword);
							}}
							width={'300px'}
						/>
					</Box>

					{/* 실제 계좌 내역 */}
					{bankAccountList.map((bankAccount) => (
						<Box>
							<TransactionHistoryTable
								setRecomputeTriggerKey={setRecomputeTriggerKey}
								bankAccount={bankAccount}
								selectedPeriod={selectedPeriod}
								keyword={searchTriggerKey}
							/>
						</Box>
					))}

					{/* 번레이트 계산 */}
					<AccountCalculation
						setRecomputeTriggerKey={setRecomputeTriggerKey}
						calculationResult={calculationResult}
					/>
				</InternalServiceLayout>
			</Box>
		</InternalServiceDrawer>
	);
};

export default Page;
