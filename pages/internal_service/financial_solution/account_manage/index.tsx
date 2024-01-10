import {
	Box,
	SwipeableDrawer,
	Typography,
	styled,
	useTheme,
} from '@mui/material';
import { NextPage } from 'next';
import React, { useEffect } from 'react';
import { useAppMember } from '../../../../src/hooks/useAppMember';
import { InternalServiceLayout } from '../../../../src/views/layout/InternalServiceLayout';
import MyAccounts from '../../../../src/views/local/internal_service/financial_solution/account_manage/MyAccounts/MyAccounts';
import { IBankAccount } from '../../../../src/@types/model';
import DefaultController from '@leanoncompany/supporti-ark-office-project/src/controller/default/DefaultController';
import { IAccountCalculationResultProps } from '../../../../src/views/local/internal_service/financial_solution/account_manage/AccountCalculation/AccountCalculation';
import { BankController } from '../../../../src/controller/BankController';
import { TransactionHistoryTable } from '../../../../src/views/local/internal_service/financial_solution/account_manage/TransactionHistoryTable';
import SupportiInput from '../../../../src/views/global/SupportiInput';
import { AccountCalculation } from '../../../../src/views/local/internal_service/financial_solution/account_manage/AccountCalculation';
import InternalServiceDrawer from '../../../../src/views/local/internal_service/common/InternalServiceDrawer/InternalServiceDrawer';
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';

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
	 * 계좌 추가 삭제용 트리거키
	 */
	const [accountTriggerKey, setAccountTriggerKey] = React.useState<string>();

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

	/**
	 * 바텀 드로워 오픈
	 */
	const [openDrawer, setOpenDrawer] = React.useState(false);

	/**
	 * 로딩
	 */
	const [loading, setLoading] = React.useState<boolean>(false);

	/**
	 * 첫 로딩
	 */
	const [firstLoading, setFirstLoading] = React.useState<boolean>(true);

	//* Functions
	/**
	 * 계산 결과 조회
	 */
	const getCalculationResult = () => {
		setLoading(true);
		memberId &&
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
						if (temp.length > 0) {
							setSelectablePeriodList(temp);
							setSelectedPeriod(temp[temp.length - 1].value);
						}
					}

					!firstLoading && setLoading(false);
					setCalculationResult(res.data.result);
				},
				(err) => {}
			);
	};
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
		if (memberId !== undefined) {
			setFirstLoading(false);
			setLoading(true);
			bankAccountController.findAllItems(
				{
					APP_MEMBER_IDENTIFICATION_CODE: memberId,
				},
				(res) => {
					if (res.data.result.rows.length === 0) {
						setBankAccountList(res.data.result.rows);
						getCalculationResult();
						setLoading(false);
					} else {
						// setLoading(false);
						setBankAccountList(res.data.result.rows);
						getCalculationResult();
					}
				},
				(err) => {
					console.log(err);
				}
			);
		}

		// memberId !== undefined &&
	}, [accountTriggerKey, memberId]);

	/**
	 * 선택한 날짜 변경 시, 재계산 트리거 키 변경 시 수입 및 지출 재계산하는 api 호출 훅
	 */
	useEffect(() => {
		if (memberId !== undefined && firstLoading === false) {
			setLoading(true);
			getCalculationResult();
		}
	}, [recomputeTriggerKey, memberId]);

	const theme = useTheme();

	return (
		<InternalServiceDrawer type={'dashboard'} loading={loading}>
			<Box
				position={'relative'}
				bgcolor={theme.palette.primary.light}
				p={{ xs: 0, md: 10 }}
				width={'100%'}
				sx={{
					overflowY: 'scroll',
					'-ms-overflow-style': 'none',
					'&::-webkit-scrollbar': { display: 'none' },
					mb: { xs: 5, md: 20 },
				}}
			>
				{/* 컨텐츠 레이아웃 */}
				<InternalServiceLayout
					title="RunWay/BurnRate"
					subTitle="우리 회사의 법인계좌의 거래내역과 잔액을 조회하고 BurnRate와 RunWay등의 정보를 한눈에 조회할 수 있어요"
					image="/images/main/accountHead.webp"
					mobileImage="/images/main/accountHeadMobile.webp"
				>
					<Typography
						variant="h3"
						fontWeight={'bold'}
						sx={{ mb: 2 }}
						px={{ xs: 2, md: 0 }}
					>
						등록계좌 내역
					</Typography>
					<Typography
						color={'secondary.dark'}
						sx={{ mb: 2 }}
						px={{ xs: 2, md: 0 }}
						lineHeight={1.5}
					>
						내역 확인을 위해 은행계정(ID/PW)입력 또는 인증서 등록이
						필요합니다. 계좌 등록은 최대 3개까지 가능합니다.
					</Typography>
					{/* 등록 계좌, 계좌 등록 영역 */}

					<MyAccounts
						setRecomputeTriggerKey={setRecomputeTriggerKey}
						setAccountTriggerKey={setAccountTriggerKey}
						bankAccountList={bankAccountList}
						calculationResult={calculationResult}
					/>

					{/* 계좌 내역 컨트롤러 영역 (날짜, 거래 내역 검색) */}
					{/* PC */}
					<Box
						width={'100%'}
						display={{ md: 'flex', xs: 'none' }}
						justifyContent={'space-between'}
						alignItems={'center'}
						mb={2}
					>
						{/* 날짜 선택 영역 */}
						<Box display={'flex'} gap={1} alignItems={'center'}>
							{selectablePeriodList && (
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
						{selectablePeriodList && (
							<SupportiInput
								type="search"
								value={keyword}
								setValue={setKeyword}
								placeholder={'거래자명 검색'}
								btnOnclick={() => {
									setSearchTriggerKey(keyword);
								}}
								width={'300px'}
								eraseValue={() => {
									setSearchTriggerKey(undefined);
								}}
							/>
						)}
					</Box>
					{/* Mobile */}
					<Box
						width={'100%'}
						display={{ md: 'none', xs: 'flex' }}
						justifyContent={'space-between'}
						alignItems={'center'}
						bgcolor={'secondary.light'}
					>
						{selectablePeriodList && (
							<SupportiInput
								type="search"
								value={keyword}
								setValue={setKeyword}
								placeholder={'거래자명검색'}
								btnOnclick={() => {
									setSearchTriggerKey(keyword);
								}}
								width={{ sm: '300px', xs: '45%' }}
								style={{
									bgcolor: 'transparent',
									border: 'none',
								}}
							/>
						)}
						<Box display={'flex'} gap={1} alignItems={'center'}>
							{selectablePeriodList && (
								<SupportiInput
									type="select"
									value={selectedPeriod}
									setValue={(value) => {
										setSelectedPeriod(value);
									}}
									placeholder="계좌 선택"
									dataList={selectablePeriodList}
									width={145}
									style={{
										bgcolor: 'transparent',
										border: 'none',
									}}
								/>
							)}
						</Box>
					</Box>
					{/* 실제 계좌 내역 */}
					{selectablePeriodList &&
						bankAccountList.map((bankAccount, idx) => (
							<Box mb={2} key={idx}>
								<TransactionHistoryTable
									setRecomputeTriggerKey={
										setRecomputeTriggerKey
									}
									bankAccount={bankAccount}
									selectedPeriod={selectedPeriod}
									keyword={searchTriggerKey}
									setLoading={setLoading}
								/>
							</Box>
						))}

					{/* 번레이트 계산 */}
					{/* PC */}
					<Box display={{ md: 'flex', xs: 'none' }}>
						<AccountCalculation
							setRecomputeTriggerKey={setRecomputeTriggerKey}
							calculationResult={calculationResult}
							setLoading={setLoading}
							accountNull={selectablePeriodList}
						/>
					</Box>
					{/* 번레이트 계산 모바일 */}
					{/* mobile */}
					<Box display={{ md: 'none', xs: 'flex' }}>
						{openDrawer && (
							<SwipeableDrawer
								anchor="bottom"
								open={openDrawer}
								onClose={() => setOpenDrawer(false)}
								onOpen={() => setOpenDrawer(true)}
								swipeAreaWidth={50}
								disableSwipeToOpen={false}
								ModalProps={{
									keepMounted: true,
								}}
								PaperProps={{
									sx: {
										borderTopLeftRadius: 15,
										borderTopRightRadius: 15,
										bgcolor: 'transparent',
									},
								}}
								sx={{
									'& .MuiModal-backdrop': {
										bgcolor: 'transparent',
									},
								}}
							>
								<Box
									sx={{
										bottom: 0,
										borderTopLeftRadius: 15,
										borderTopRightRadius: 15,
										visibility: 'visible',
										right: 0,
										left: 0,
										bgcolor: 'transparent',
										backgroundImage: `linear-gradient(to bottom, #26262695, #00000083)`,
										backdropFilter: 'blur(10px)',
										'-webkit-backdrop-filter': 'blur(10px)',
										height: '50px',
										display: 'flex',
										alignItems: 'center',
										justifyContent: 'space-between',
										px: 2,
									}}
								>
									<Box></Box>
									<Typography
										sx={{ p: 2, color: 'white' }}
										fontWeight={'bold'}
										variant="subtitle1"
										textAlign={'center'}
									>
										분석하기
									</Typography>
									<KeyboardDoubleArrowUpIcon
										sx={{ color: 'white' }}
									/>
								</Box>
								<Box
									sx={{
										px: 2,
										pb: 2,
										height: '100%',
										overflow: 'auto',
										backgroundImage: `linear-gradient(to bottom, #26262695, #00000083)`,
										backdropFilter: 'blur(10px)',
										'-webkit-backdrop-filter': 'blur(10px)',
									}}
								>
									<AccountCalculation
										setRecomputeTriggerKey={
											setRecomputeTriggerKey
										}
										calculationResult={calculationResult}
										setLoading={setLoading}
										accountNull={selectablePeriodList}
									/>
								</Box>
							</SwipeableDrawer>
						)}
					</Box>
				</InternalServiceLayout>
			</Box>
			{!openDrawer && (
				<Box
					sx={{
						position: 'fixed',
						bottom: 0,
						borderTopLeftRadius: 15,
						borderTopRightRadius: 15,
						visibility: 'visible',
						right: 0,
						left: 0,
						// bgcolor: 'red',
						backgroundImage: `linear-gradient(to bottom, #26262695, #00000083)`,
						backdropFilter: 'blur(10px)',
						'-webkit-backdrop-filter': 'blur(10px)',
						height: '50px',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'space-between',
						px: 2,
					}}
					display={{ md: 'none', xs: 'flex' }}
				>
					<Box></Box>
					<Typography
						sx={{ p: 2, color: 'white' }}
						fontWeight={'bold'}
						variant="subtitle1"
						textAlign={'center'}
					>
						분석하기
					</Typography>
					<KeyboardDoubleArrowUpIcon
						sx={{ color: 'white' }}
						onClick={() => {
							setOpenDrawer(true);
						}}
					/>
				</Box>
			)}
		</InternalServiceDrawer>
	);
};

export default Page;
