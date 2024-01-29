import React, { useEffect } from 'react';

import { Box, BoxProps, Menu, MenuItem, Typography } from '@mui/material';
import { IBankAccount } from '../../../../../../@types/model';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { bankConfig } from '../../../../../../../configs/data/BankConfig';
import { Thumbnail } from '@leanoncompany/supporti-react-ui';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DefaultController from '@leanoncompany/supporti-ark-office-project/src/controller/default/DefaultController';
import { v4 as uuidv4 } from 'uuid';
import SupportiModal from '../../../../../global/SupportiModal';
import SupportiInput from '../../../../../global/SupportiInput';
import { IAccountCalculationResultProps } from '../AccountCalculation/AccountCalculation';
import AccountRegisterModal from '../AccountRegisterModal/AccountRegisterModal';
import SupportiButton from '../../../../../global/SupportiButton';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import useAlert from '../../../../../../hooks/useAlert/useAlert';
import { SupportiAlertModal } from '../../../../../global/SupportiAlertModal';
interface IMyAccountsProps {
	/**
	 * 재계산 트리거 키 변경 함수
	 */
	setRecomputeTriggerKey: (key: string | undefined) => void;
	/**
	 * 계좌 추가 삭제용 트리거 키 변경 함수
	 */
	setAccountTriggerKey: (key: string | undefined) => void;
	/**
	 * 수입, 지출 데이터
	 */
	calculationResult: IAccountCalculationResultProps;

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
	const bankAccountController = new DefaultController('BankAccount');

	//* Constants

	//* States

	/**
	 * 선택한 연/월
	 */
	const [selectedPeriod, setSelectedPeriod] = React.useState<{
		year: number;
		month: number;
	}>({ year: new Date().getFullYear(), month: new Date().getMonth() + 1 });
	/**
	 * 선택 가능한 연/월
	 */
	const [selectablePeriod, setSelectablePeriod] = React.useState<
		{
			year: number;
			month: number;
		}[]
	>([]);
	/**
	 * 메뉴 오픈 여부
	 */
	const [anchorEl, setAnchorEl] = React.useState(null);
	const open = Boolean(anchorEl);
	const [dateAnchorEl, setDateAnchorEl] = React.useState(null);
	const dateopen = Boolean(dateAnchorEl);

	/**
	 * 계좌 등록 모달 오픈 여부
	 */
	const [accountRegisterModalOpen, setAccountRegisterModalOpen] =
		React.useState<boolean>(false);

	/**
	 * 계좌 수정 모달 오픈 여부
	 */
	const [accountModifyModalOpen, setAccountModifyModalOpen] =
		React.useState<boolean>(false);

	/**
	 * 계좌 수정 모달에 들어갈 계좌 정보
	 */
	const [accountNickname, setAccountNickname] = React.useState<string>('');
	const [selectedAccount, setSelectedAccount] = React.useState<number>(0);

	/**
	 * 계좌 리스트
	 */
	const [bankAccountList, setBankAccountList] = React.useState<
		IBankAccount[]
	>([]);

	const alert = useAlert({});

	//* Functions
	/**
	 * 계좌 삭제 함수 (삭제 후, 리스트 변경)
	 */
	const deleteBankAccount = (bankAccountId: number) => {
		bankAccountController.deleteItem(
			{
				BANK_ACCOUNT_IDENTIFICATION_CODE: selectedAccount,
			},
			(res) => {
				props.setAccountTriggerKey(uuidv4());
				setAnchorEl(null);
				alert.setOpen(true);
				alert.setType('successDeleteAxios');
			},
			(err) => {}
		);
	};
	/**
	 * 계좌 수정 함수 (수정 후, 리스트 변경)
	 */
	const updateBankAccount = () => {
		bankAccountController.updateItem(
			{
				BANK_ACCOUNT_IDENTIFICATION_CODE: selectedAccount,
				ACCOUNT_NICKNAME: accountNickname,
			},
			(res) => {
				// 데이터 변경
				setBankAccountList(
					bankAccountList.map((bankAccount) => {
						if (
							bankAccount.BANK_ACCOUNT_IDENTIFICATION_CODE ===
							selectedAccount
						) {
							return {
								...bankAccount,
								ACCOUNT_NICKNAME: accountNickname,
							};
						} else {
							return bankAccount;
						}
					})
				);
				alert.setOpen(true);
				alert.setType('successModifyAxios');
				setAnchorEl(null);
				setAccountModifyModalOpen(false);
			},
			(err) => {}
		);
	};

	//* Hooks
	/**
	 * 들어온 수입 수출 데이터를 날짜키값을 가져와서 셋해주는 훅
	 */
	useEffect(() => {
		if (props.calculationResult) {
			if (selectablePeriod.length === 0) {
				const temp = [];
				for (const [key, value] of Object.entries(
					props.calculationResult?.monthlyIncome
				)) {
					temp.push({
						year: key.split('-')[0],
						month: key.split('-')[1],
					});
				}
				setSelectablePeriod(temp);
			}
			if (props.calculationResult) {
				const temp = [];
				for (const [key, value] of Object.entries(
					props.calculationResult?.monthlyIncome
				)) {
					temp.push({
						year: key.split('-')[0],
						month: key.split('-')[1],
					});
				}
				setSelectedPeriod(temp[temp.length - 1]);
			}
		}
	}, [props.calculationResult]);

	/**
	 * props 로 들어오는 계좌 리스트 설정
	 */
	useEffect(() => {
		setBankAccountList(props.bankAccountList);
	}, [props.bankAccountList]);

	//* Styles
	const boxStyle = {
		width: '338px',
		minWidth: '338px',
		height: '90px',
		margin: '0 16px 0 0',
		borderRadius: '10px',
		boxShadow: '0 3px 15px 0 #e1eaff',
		display: 'flex',
		alignItems: 'center',
	};

	return (
		props.bankAccountList && (
			<>
				<Box
					alignItems={'center'}
					mb={{ md: 5, xs: 3 }}
					mt={2}
					pb={1}
					position={'relative'}
				>
					<Box display={{ md: 'flex', xs: 'block' }} mb={2}>
						{/* 연도 선택 및 수입 / 지출 */}
						{bankAccountList.length !== 0 && (
							<Box
								sx={{
									...boxStyle,
									padding: '22px 25px',
									width: { md: '338px', xs: '90%' },
									backgroundImage:
										'linear-gradient(110deg, #5583e4 11%, #4955e3 88%)',
								}}
								mb={{ md: 0, xs: 2 }}
								mx={{ md: 0, xs: 'auto' }}
								mr={{ md: 2, xs: 'auto' }}
							>
								{/* 날짜 선택 */}
								<Box
									sx={{
										display: 'flex',
										gap: '19px',
										alignItems: 'center',
										cursor: 'pointer',
									}}
									onClick={(event) => {
										setDateAnchorEl(event.currentTarget);
									}}
									id="basic-button2"
									aria-controls={
										dateopen ? 'basic-menu2' : undefined
									}
									aria-haspopup="true"
									aria-expanded={
										dateopen ? 'true' : undefined
									}
								>
									<Box
										sx={{
											display: 'flex',
											flexDirection: 'column',
											justifyContent: 'center',
											alignItems: 'center',
										}}
									>
										<Typography
											color={'white'}
											variant="subtitle1"
										>
											{selectedPeriod?.year}년
										</Typography>
										<Typography
											color={'white'}
											variant="h3"
											sx={{
												display: 'flex',
												alignItems: 'baseline',
												gap: '3px',
											}}
										>
											{selectedPeriod?.month}
											<Typography
												color={'white'}
												variant="subtitle1"
											>
												월
											</Typography>
										</Typography>
									</Box>
									<KeyboardArrowDownIcon
										sx={{
											color: 'white',
										}}
									/>
								</Box>
								{/* 날짜 메뉴 */}
								<Menu
									id="basic-menu2"
									open={dateopen}
									anchorEl={dateAnchorEl}
									onClose={() => {
										setDateAnchorEl(null);
									}}
									MenuListProps={{
										'aria-labelledby': 'basic-button2',
									}}
									sx={{
										'& .MuiPaper-root': {
											borderRadius: '5px',
											boxShadow: '0 3px 15px 0 #e1eaff',
										},
									}}
									PaperProps={{
										style: {
											maxHeight: 48 * 4.5,
											width: '14ch',
										},
									}}
								>
									{selectablePeriod.map((period) => (
										<MenuItem
											onClick={() => {
												setSelectedPeriod(period);
												setDateAnchorEl(null);
											}}
											sx={{
												display: 'flex',
												justifyContent: 'center',
												p: 1,
											}}
										>
											{period.year}년 {period.month}월
										</MenuItem>
									))}
								</Menu>
								{/* 수입 지출 */}
								{props.calculationResult && (
									<Box sx={{ ml: 3 }}>
										<Box
											sx={{
												display: 'flex',
												alignItems: 'center',
												gap: '15px',
											}}
										>
											<Typography
												variant="subtitle1"
												color={'info.main'}
												fontWeight={'500'}
											>
												수입
											</Typography>
											<Typography
												variant="subtitle1"
												color={'white'}
												fontWeight={'500'}
											>
												{props.calculationResult?.monthlyIncome[
													`${selectedPeriod?.year}-${selectedPeriod?.month}`
												]?.toLocaleString()
													? props.calculationResult?.monthlyIncome[
															`${selectedPeriod?.year}-${selectedPeriod?.month}`
													  ]?.toLocaleString()
													: 0}{' '}
												원
											</Typography>
										</Box>
										<Box
											sx={{
												display: 'flex',
												alignItems: 'center',
												gap: '15px',
											}}
										>
											<Typography
												variant="subtitle1"
												color={'info.main'}
												fontWeight={'500'}
											>
												지출
											</Typography>
											<Typography
												variant="subtitle1"
												color={'white'}
												fontWeight={'500'}
											>
												{props.calculationResult?.monthlySpending[
													`${selectedPeriod?.year}-${selectedPeriod?.month}`
												]?.toLocaleString()
													? props.calculationResult?.monthlySpending[
															`${selectedPeriod?.year}-${selectedPeriod?.month}`
													  ]?.toLocaleString()
													: 0}{' '}
												원
											</Typography>
										</Box>
									</Box>
								)}
							</Box>
						)}

						{/* 계좌 등록 */}
						<Box
							onClick={() =>
								props.bankAccountList.length >= 3
									? window.alert(
											'최대 3개까지 등록 가능합니다.'
									  )
									: setAccountRegisterModalOpen(true)
							}
							sx={{
								...boxStyle,
								padding: '26px 10px 26px 21px',
								border:
									props.bankAccountList.length >= 3
										? 'solid 1px #d2d2d2'
										: 'solid 1px #305ddc',
								cursor: 'pointer',
								bgcolor: 'white',
								width: { md: '338px', xs: '90%' },
							}}
							mb={{ md: 0, xs: 2 }}
							mx={{ md: 0, xs: 'auto' }}
							mr={{ md: 2, xs: 'auto' }}
						>
							<Thumbnail
								src={'/images/main/bank.png'}
								width={'30px'}
								height={'30px'}
							/>
							<Box ml={2}>
								<Typography
									color={
										props.bankAccountList.length >= 3
											? 'secondary'
											: 'primary'
									}
									variant="subtitle1"
									fontWeight={'600'}
									sx={{
										mb: '3px',
									}}
								>
									+ 계좌 등록하기 (최대 3개)
								</Typography>
								<Typography
									color={'secondary'}
									variant="body1"
									fontWeight={'500'}
								>
									등록 시, 은행계정 또는 인증서 등록 필요
								</Typography>
							</Box>
						</Box>
					</Box>

					<Box
						display={'flex'}
						sx={{
							overflowX: 'auto',
							'-ms-overflow-style': 'none',
							'&::-webkit-scrollbar': {
								height: '5px !important',
								backgroundColor: 'white !important',
								padding: '0.5px',
								borderRadius: '20px',
							},
							'&::-webkit-scrollbar-thumb': {
								backgroundColor: '#305edccc',
								borderRadius: '20px',
							},
						}}
						pl={{ md: 0, xs: '5%' }}
					>
						{/* 계좌 리스트 */}
						<Box display={'flex'} pb={1}>
							{bankAccountList.map((bankAccount) => (
								<Box
									sx={{
										...boxStyle,
										padding: '26px 15px 26px 25px',
										justifyContent: 'space-between',
										bgcolor: 'white',
									}}
								>
									{/* 은행 아이콘 */}
									<Thumbnail
										src={
											bankConfig[bankAccount.BANK_CODE]
												?.iconPath
										}
										width={'40px'}
										height={'40px'}
										backgroundSize="contain"
									/>
									{/* 계좌내용 */}
									<Box sx={{ width: '70%' }}>
										<Box
											sx={{
												display: 'flex',
												alignItems: 'center',
												gap: 0.5,
											}}
										>
											<Typography
												variant="subtitle1"
												fontWeight={'600'}
												width={'70px'}
											>
												{
													bankConfig[
														bankAccount.BANK_CODE
													]?.name
												}
											</Typography>
											<Typography
												variant="subtitle1"
												fontWeight={'600'}
											>
												{bankAccount.ACCOUNT_NUMBER}
											</Typography>
										</Box>
										<Box
											sx={{
												display: 'flex',
												alignItems: 'center',
												gap: 2,
												mt: '5px',
											}}
										>
											<Typography
												// variant="subtitle2"
												color={'secondary.main'}
												sx={{
													width: bankAccount.ACCOUNT_NICKNAME
														? '85px'
														: '200px',
												}}
												noWrap
											>
												{bankAccount.ACCOUNT_HOLDER}
											</Typography>
											{bankAccount.ACCOUNT_NICKNAME && (
												<Typography
													variant="subtitle2"
													color={'secondary.main'}
												>
													|
												</Typography>
											)}
											{bankAccount.ACCOUNT_NICKNAME && (
												<Typography
													// variant="subtitle2"
													color={'secondary.main'}
													sx={{
														width: '76px',
													}}
													noWrap
												>
													{
														bankAccount.ACCOUNT_NICKNAME
													}
												</Typography>
											)}
										</Box>
									</Box>
									{/* 메뉴 */}
									<MoreVertIcon
										id="basic-button"
										aria-controls={
											open ? 'basic-menu' : undefined
										}
										aria-haspopup="true"
										aria-expanded={
											open ? 'true' : undefined
										}
										sx={{
											cursor: 'pointer',
										}}
										onClick={(event) => {
											setAccountNickname(
												bankAccount.ACCOUNT_NICKNAME
											);
											setSelectedAccount(
												bankAccount.BANK_ACCOUNT_IDENTIFICATION_CODE
											);
											setAnchorEl(event.currentTarget);
										}}
										color="secondary"
									/>
									<Menu
										id="basic-menu"
										open={open}
										anchorEl={anchorEl}
										onClose={() => {
											setAnchorEl(null);
										}}
										MenuListProps={{
											'aria-labelledby': 'basic-button',
										}}
										sx={{
											'& .MuiPaper-root': {
												borderRadius: '5px',
												boxShadow:
													'0 3px 15px 0 #e1eaff',
												width: '90px',
											},
										}}
									>
										<MenuItem
											sx={{
												borderBottom:
													'1px solid #e1eaff',
												pb: '10px',
												mb: '5px',
												display: 'flex',
												justifyContent: 'center',
											}}
											onClick={() => {
												setAccountModifyModalOpen(true);
											}}
										>
											수정하기
										</MenuItem>
										<MenuItem
											sx={{
												display: 'flex',
												justifyContent: 'center',
											}}
											onClick={() => {
												deleteBankAccount(
													bankAccount.BANK_ACCOUNT_IDENTIFICATION_CODE
												);
											}}
										>
											삭제하기
										</MenuItem>
									</Menu>
								</Box>
							))}
							{/* 계좌 3개 이하일때 빈칸 3-해당길이까지 생성*/}
							{props.bankAccountList.length < 3 &&
								[
									...Array(3 - props.bankAccountList.length),
								].map(() => (
									<Box
										sx={{
											...boxStyle,
											padding: '26px 15px 26px 25px',
											bgcolor: 'white',
										}}
									>
										{/* 은행 아이콘 */}
										<Thumbnail
											src={'/images/icons/money.png'}
											width={'30px'}
											height={'30px'}
										/>
										<Box ml={2}>
											<Typography
												color={'secondary'}
												variant="subtitle1"
												fontWeight={'600'}
												sx={{
													mb: '3px',
												}}
											>
												비어있는 계좌 슬롯입니다.
											</Typography>
											<Typography
												color={'secondary'}
												variant="body1"
												fontWeight={'500'}
											>
												원하시는 법인계좌를
												등록해주세요!
											</Typography>
										</Box>
										{/* 메뉴 */}
									</Box>
								))}
						</Box>
					</Box>
				</Box>
				{/* 계좌 등록 모달 */}
				{accountRegisterModalOpen && (
					<AccountRegisterModal
						accountRegisterModalOpen={accountRegisterModalOpen}
						setAccountRegisterModalOpen={
							setAccountRegisterModalOpen
						}
						setAccountTriggerKey={props.setAccountTriggerKey}
					/>
				)}
				{/* 계좌 등록 / 수정 모달 (얘는, 버튼으로 등록 계좌 내역 영역 쪽에 들어가야함) */}
				{accountModifyModalOpen && (
					<SupportiModal
						open={accountModifyModalOpen}
						handleClose={() => {
							setAccountModifyModalOpen(false);
						}}
						title="계좌 수정"
						activeHeader={true}
						children={
							<Box>
								<Box mb={3}>
									<Typography m={'auto'} sx={{ mb: 2 }}>
										계좌 별칭
									</Typography>
									<SupportiInput
										type={'input'}
										value={accountNickname}
										setValue={(value) => {
											setAccountNickname(value);
										}}
										additionalProps={{
											placeholder: '계좌 별칭 입력',
										}}
										width={300}
									/>
								</Box>
								<SupportiButton
									style={{
										color: 'white',
									}}
									fullWidth
									isGradient={true}
									contents={'수정하기'}
									onClick={() => {
										updateBankAccount();
									}}
								/>
							</Box>
						}
					/>
				)}
				{/* 알림창 */}
				<SupportiAlertModal
					open={alert.open}
					handleClose={() => alert.setOpen(false)}
					type={alert.type}
				/>
			</>
		)
	);
};

export default MyAccounts;
