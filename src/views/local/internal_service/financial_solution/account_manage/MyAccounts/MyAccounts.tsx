import React, { useEffect } from 'react';

import { Box, BoxProps, Menu, MenuItem, Typography } from '@mui/material';
import { IBankAccount } from '../../../../../../@types/model';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { bankConfig } from '../../../../../../../configs/data/BankConfig';
import { Thumbnail } from '@qillie-corp/qillie-react-ui';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DefaultController from '@qillie-corp/ark-office-project/src/controller/default/DefaultController';
import { v4 as uuidv4 } from 'uuid';
import SuppportiModal from '../../../../../global/SuppportiModal';
import SupportiInput from '../../../../../global/SupportiInput';
interface IMyAccountsProps {
	/**
	 * 재계산 트리거 키 변경 함수
	 */
	setRecomputeTriggerKey: (key: string | undefined) => void;

	/**
	 * 수입, 지출 데이터
	 */
	calculationResult: {
		monthlyIncome: { [key: string]: any };
		monthlySpending: { [key: string]: any };
		[key: string]: any;
	};

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
	 * 계좌 수정 모달 오픈 여부
	 */
	const [accountRegisterModalOpen, setAccountRegisterModalOpen] =
		React.useState<boolean>(false);

	/**
	 * 계좌 수정 모달에 들어갈 계좌 정보
	 */
	const [accountNickname, setAccountNickname] = React.useState<string>('');

	/**
	 * 계좌별 내역 리스트 (날짜, 거래 내역 키워드로 백엔드 필터링)
	 */
	console.log(`${selectedPeriod?.year}-${selectedPeriod?.month}`);
	//* Functions
	/**
	 * 계좌 추가 함수 (추가 후, 리스트 변경)
	 */

	/**
	 * 계좌 삭제 함수 (삭제 후, 리스트 변경)
	 */
	const deleteBankAccount = (bankAccountId: number) => {
		bankAccountController.deleteItem(
			{
				BANK_ACCOUNT_IDENTIFICATION_CODE: bankAccountId,
			},
			(res) => {
				props.setRecomputeTriggerKey(uuidv4());
			},
			(err) => {}
		);
	};
	/**
	 * 계좌 수정 함수 (수정 후, 리스트 변경)
	 */
	const updateBankAccount = (bankAccountId: number) => {
		bankAccountController.updateItem(
			{
				BANK_ACCOUNT_IDENTIFICATION_CODE: bankAccountId,
				ACCOUNT_NICKNAME: accountNickname,
			},
			(res) => {
				props.setRecomputeTriggerKey(uuidv4());
			},
			(err) => {}
		);
	};

	//* Hooks
	/**
	 * 선택한 날짜 변경 시, 재계산 트리거 키 변경 시 수입 및 지출 재계산하는 api 호출 훅
	 */

	/**
	 * 들어온 수입 수출 데이터를 날짜키값을 가져와서 셋해주는 훅
	 */
	useEffect(() => {
		const temp = [];
		for (const [key, value] of Object.entries(
			props.calculationResult.monthlyIncome
		)) {
			temp.push({
				year: key.split('-')[0],
				month: key.split('-')[1],
			});
		}
		setSelectablePeriod(temp);
		setSelectedPeriod({
			year: new Date().getFullYear(),
			month: new Date().getMonth() + 1,
		});
	}, [props.calculationResult]);

	//* Styles
	const boxStyle = {
		width: '338px',
		height: '90px',
		margin: '0 16px 0 0',
		borderRadius: '10px',
		boxShadow: '0 3px 15px 0 #e1eaff',
		display: 'flex',
		alignItems: 'center',
	};

	return (
		<Box display={'flex'} alignItems={'center'} mb={'40px'}>
			{/* 연도 선택 및 수입 / 지출 */}
			<Box
				sx={{
					...boxStyle,
					padding: '22px 25px',
					backgroundImage:
						'linear-gradient(110deg, #5583e4 11%, #4955e3 88%)',
				}}
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
					aria-controls={dateopen ? 'basic-menu2' : undefined}
					aria-haspopup="true"
					aria-expanded={dateopen ? 'true' : undefined}
				>
					<Box
						sx={{
							display: 'flex',
							flexDirection: 'column',
							justifyContent: 'center',
							alignItems: 'center',
						}}
					>
						<Typography color={'white'} variant="subtitle1">
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
							<Typography color={'white'} variant="subtitle1">
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
							width: '10ch',
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
							{props.calculationResult.monthlyIncome[
								`${selectedPeriod?.year}-${selectedPeriod?.month}`
							].toLocaleString()}
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
							{props.calculationResult.monthlySpending[
								`${selectedPeriod?.year}-${selectedPeriod?.month}`
							].toLocaleString()}
						</Typography>
					</Box>
				</Box>
			</Box>

			{/* 계좌 리스트 */}
			{props.bankAccountList.map((bankAccount) => (
				<Box
					sx={{
						...boxStyle,
						padding: '26px 15px 26px 25px',
						justifyContent: 'space-between',
					}}
				>
					{/* 은행 아이콘 */}
					<Thumbnail
						src={bankConfig[bankAccount.BANK_CODE]?.iconPath}
						width={'30px'}
						height={'30px'}
					/>
					{/* 계좌내용 */}
					<Box sx={{ width: '70%' }}>
						<Box
							sx={{
								display: 'flex',
								alignItems: 'center',
								gap: '5px',
							}}
						>
							<Typography variant="subtitle1" fontWeight={'600'}>
								{bankConfig[bankAccount.BANK_CODE]?.name}
							</Typography>
							<Typography variant="subtitle1" fontWeight={'600'}>
								{bankAccount.ACCOUNT_NUMBER}
							</Typography>
						</Box>
						<Box
							sx={{
								display: 'flex',
								alignItems: 'center',
								gap: '5px',
								mt: '5px',
							}}
						>
							<Typography
								variant="subtitle2"
								color={'secondary.main'}
							>
								{bankAccount.ACCOUNT_HOLDER}
							</Typography>
							<Typography
								variant="subtitle2"
								color={'secondary.main'}
							>
								|
							</Typography>
							<Typography
								variant="subtitle2"
								color={'secondary.main'}
							>
								{bankAccount.ACCOUNT_NICKNAME}
							</Typography>
						</Box>
					</Box>
					{/* 메뉴 */}
					<MoreVertIcon
						id="basic-button"
						aria-controls={open ? 'basic-menu' : undefined}
						aria-haspopup="true"
						aria-expanded={open ? 'true' : undefined}
						sx={{
							cursor: 'pointer',
						}}
						onClick={(event) => {
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
								boxShadow: '0 3px 15px 0 #e1eaff',
								width: '90px',
							},
						}}
					>
						<MenuItem
							sx={{
								borderBottom: '1px solid #e1eaff',
								pb: '10px',
								mb: '5px',
								display: 'flex',
								justifyContent: 'center',
							}}
							onClick={() => {
								setAccountNickname(
									bankAccount.ACCOUNT_NICKNAME
								);
								setAccountRegisterModalOpen(true);
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
					{/* 계좌 등록 / 수정 모달 (얘는, 버튼으로 등록 계좌 내역 영역 쪽에 들어가야함) */}
					<SuppportiModal
						open={accountRegisterModalOpen}
						handleClose={() => {
							setAccountRegisterModalOpen(false);
						}}
						title="계좌 수정"
						activeHeader={true}
						children={
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
									placeholder="계좌 별칭 입력"
									width={300}
								/>
							</Box>
						}
						btnIsGradient={true}
						btnContents={'수정하기'}
						btnOnClick={() => {
							updateBankAccount(
								bankAccount.BANK_ACCOUNT_IDENTIFICATION_CODE
							);
						}}
					/>
				</Box>
			))}

			{/* 계좌 등록 */}
			{props.bankAccountList.length >= 3 ? null : (
				<Box
					sx={{
						...boxStyle,
						padding: '26px 10px 26px 21px',
						border: 'solid 1px #305ddc',
						cursor: 'pointer',
					}}
				>
					<Thumbnail
						src={'/images/main/bank.png'}
						width={'30px'}
						height={'30px'}
					/>
					<Box ml={2}>
						<Typography
							color={'primary'}
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
			)}
		</Box>
	);
};

export default MyAccounts;
