import React, { useEffect } from 'react';

import {
	Box,
	BoxProps,
	FormControl,
	MenuItem,
	Select,
	Typography,
} from '@mui/material';
import {
	IBankAccount,
	ITransactionHistory,
} from '../../../../../../@types/model';
import { bankConfig } from '../../../../../../../configs/data/BankConfig';
import DefaultController from '@qillie-corp/ark-office-project/src/controller/default/DefaultController';
import { usePagination } from '../../../../../../hooks/usePagination';
import ExcelDownloadButton from '../../../../common/ExcelButton/ExcelButton';
import SupportiTable from '../../../../../global/SupportiTable';
import { TableHeaderProps } from '../../../../../global/SupportiTable/SupportiTable';
import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';
import SupportiPagination from '../../../../../global/SupportiPagination';
import { Thumbnail } from '@qillie-corp/qillie-react-ui';

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
	const transactionHistoryController = new DefaultController(
		'TransactionHistory'
	);

	//* Constants
	// 1-50까지의 숫자 배열
	const limitArray = Array(50)
		.fill(0)
		.map((_, index) => index + 1);

	//* 테이블 헤더
	const transactionHistoryHeaderData: TableHeaderProps[] = [
		{
			label: '제외',
			value: 'EXCEPTED_YN',
			checkbox: true,
			checkBoxOnClick: (value, idx) => {
				props.setRecomputeTriggerKey(uuidv4());
				handleExcept(value, idx);
			},
			format: (value) => {
				return value === 'Y' ? true : false;
			},
		},
		{
			label: '구분',
			value: 'IN_AMOUNT',
			format: (value, key) => {
				return key === 'IN_AMOUNT' ? '입금' : '출금';
			},
			customKeyFormat: (value) => {
				return value !== 0 ? 'IN_AMOUNT' : 'OUT_AMOUNT';
			},
			customFormat: (value, key) => {
				return key === 'IN_AMOUNT' ? 'blue' : 'red';
			},
		},
		{
			label: '금액',
			value: 'OUT_AMOUNT',
			format: (value, key) => {
				return key === 'IN_AMOUNT'
					? value.toLocaleString()
					: `-${value.toLocaleString()}`;
			},
			customKeyFormat: (value) => {
				return value !== 0 ? 'OUT_AMOUNT' : 'IN_AMOUNT';
			},
		},
		{
			label: '거래일자',
			value: 'TRANSACTION_DATE',
			format: (value) => {
				return moment(value).format('YY.MM.DD');
			},
		},
		{
			label: '거래점명',
			value: 'TRADER_BANK_NAME',
		},
		{
			label: '거래내용',
			value: 'TRANSACTION_DESCRIPTION',
		},
		{
			label: '거래자명',
			value: 'TRADER_NAME',
		},
		{
			label: '잔액',
			value: 'BALANCE',
			format: (value) => {
				return value.toLocaleString();
			},
		},
	];
	//* 엑셀 다운로드 헤더
	const transactionHistoryExcelHeaderData = [
		{
			key: 'EXCEPTED_YN',
			label: '제외',
		},
		{
			key: 'IN_AMOUNT',
			label: '구분',
		},
		{
			key: 'IN_AMOUNT',
			label: '금액',
		},
		{
			key: 'TRANSACTION_DATE',
			label: '거래일자',
		},
		{
			key: 'TRADER_BANK_NAME',
			label: '거래점명',
		},
		{
			key: 'TRANSACTION_DESCRIPTION',
			label: '거래내용',
		},
		{
			key: 'TRADER_NAME',
			label: '거래자명',
		},
		{
			key: 'BALANCE',
			label: '잔액',
		},
	];
	//* States
	/**
	 * 입출금 내역
	 */
	const [transactionHistoryList, setTransactionHistoryList] = React.useState<
		ITransactionHistory[]
	>([]);

	/**
	 * 총데이터 개수
	 */
	const [totalDataCount, setTotalDataCount] = React.useState<number>(0);

	//* Functions
	/**
	 * 거래내역 제외 함수
	 */
	const handleExcept = (value: string, idx: number) => {
		transactionHistoryController.updateItem(
			{
				TRANSACTION_HISTORY_IDENTIFICATION_CODE:
					transactionHistoryList[idx]
						.TRANSACTION_HISTORY_IDENTIFICATION_CODE,
				EXCEPTED_YN: value == 'Y' ? 'N' : 'Y',
			},
			(res) => {
				setTransactionHistoryList((prev) => {
					const newTransactionHistoryList = [...prev];
					newTransactionHistoryList[idx].EXCEPTED_YN =
						value == 'Y' ? 'N' : 'Y';
					return newTransactionHistoryList;
				});
			},
			(err) => {
				console.log(err);
			}
		);
	};

	//* Hooks
	/**
	 * 페이징 관련
	 */
	const { page, limit, handlePageChange, setLimit, setPage } =
		usePagination();

	/**
	 * 입출금 내역 가져오기
	 */
	useEffect(() => {
		transactionHistoryController.findAllItems(
			{
				BANK_ACCOUNT_IDENTIFICATION_CODE:
					props.bankAccount.BANK_ACCOUNT_IDENTIFICATION_CODE,
				LIMIT: limit,
				PAGE: page,
				PERIOD_TARGET_KEY: 'TRANSACTION_DATE',
				PERIOD_START: new Date(
					`${props.selectedPeriod?.year}-${props.selectedPeriod?.month}-01`
				),
				PERIOD_END: new Date(
					`${props.selectedPeriod?.year}-${props.selectedPeriod?.month}-31`
				),
			},
			(res) => {
				setTransactionHistoryList(res.data.result.rows);
				setTotalDataCount(res.data.result.count);
			},
			(err) => {
				console.log(err);
			}
		);
	}, [props.bankAccount, limit, page, props.selectedPeriod]);

	/**
	 * 기간
	 */
	useEffect(() => {
		setPage(0);
	}, [props.selectedPeriod]);
	/**
	 * 검색
	 */
	useEffect(() => {
		transactionHistoryController.findAllItems(
			{
				BANK_ACCOUNT_IDENTIFICATION_CODE:
					props.bankAccount.BANK_ACCOUNT_IDENTIFICATION_CODE,
				LIMIT: limit,
				PAGE: page,
				KEYWORD: {
					columnKey: 'TRADER_NAME',
					keyword: props.keyword,
				},
				PERIOD_TARGET_KEY: 'TRANSACTION_DATE',
				PERIOD_START: new Date(
					`${props.selectedPeriod?.year}-${props.selectedPeriod?.month}-01`
				),
				PERIOD_END: new Date(
					`${props.selectedPeriod?.year}-${props.selectedPeriod?.month}-31`
				),
			},
			(res) => {
				setTransactionHistoryList(res.data.result.rows);
				setTotalDataCount(res.data.result.count);
			},
			(err) => {
				console.log(err);
			}
		);
	}, [props.keyword]);

	return (
		<Box
			sx={{
				p: '20px',
				bgcolor: 'white',
				borderRadius: '10px',
				width: '100%',
			}}
		>
			{/* 헤더 */}
			<Box
				sx={{
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'center',
					pb: '5px',
					px: '15px',
					width: '100%',
				}}
			>
				{/* 은행 */}
				<Box display={'flex'} alignItems={'center'} gap={'15px'}>
					<Thumbnail
						src={bankConfig[props.bankAccount.BANK_CODE]?.iconPath}
						width={'30px'}
						height={'30px'}
					/>
					<Typography variant="h5" fontWeight={'bold'}>
						{bankConfig[props.bankAccount.BANK_CODE].name}
					</Typography>
				</Box>
				{/* 리미트, 엑셀다운로드 */}
				<Box display={'flex'} alignItems={'center'} gap={'10px'}>
					{/* 리미트 */}
					<FormControl
						sx={{ m: 1, minWidth: 70, height: 40, pt: '2px' }}
						size="small"
						margin="dense"
					>
						<Select
							value={limit}
							onChange={(e) => setLimit(Number(e.target.value))}
							size="small"
							variant="outlined"
							sx={{
								'&.MuiInputBase-root': {
									borderRadius: '10px',
									height: 38,
								},
							}}
						>
							{limitArray.map((item, index) => (
								<MenuItem key={index} value={item}>
									{item}
								</MenuItem>
							))}
						</Select>
					</FormControl>
					{/* 엑셀 다운로드 */}
					<ExcelDownloadButton
						fileName={`${
							bankConfig[props.bankAccount.BANK_CODE].name
						} 입출금내역`}
						dataConfig={transactionHistoryExcelHeaderData}
						dataGetterCallback={
							transactionHistoryController.findAllItems
						}
						dataGetterCallbackArgs={{
							args: {
								BANK_ACCOUNT_IDENTIFICATION_CODE:
									props.bankAccount
										.BANK_ACCOUNT_IDENTIFICATION_CODE,
							},
						}}
					/>
				</Box>
			</Box>
			{/* 제외 파트 변경 시, 부모로부터 받는 preserveKey 변경 (preserveKey 변경 시 재계산 콜백들이 실행됨) */}
			<Box width={'100%'}>
				<SupportiTable
					rowData={transactionHistoryList}
					headerData={transactionHistoryHeaderData}
				/>
			</Box>

			{/* 페이지 네이션 */}
			<SupportiPagination
				limit={limit}
				setLimit={setLimit}
				page={page}
				handlePageChange={handlePageChange}
				count={totalDataCount}
				useLimit={false}
			/>
		</Box>
	);
};

export default TransactionHistoryTable;
