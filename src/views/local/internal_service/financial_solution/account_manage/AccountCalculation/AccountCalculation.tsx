import React, { useEffect } from 'react';

import {
	Box,
	BoxProps,
	Menu,
	MenuItem,
	TextField,
	Typography,
} from '@mui/material';
import DefaultController from '@qillie-corp/ark-office-project/src/controller/default/DefaultController';
import { BankController } from '../../../../../../controller/BankController';
import moment from 'moment';
import { v4 as uuidv4 } from 'uuid';
import SupportiButton from '../../../../../global/SupportiButton';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

export interface IAccountCalculationResultProps {
	monthlyIncome: { [key: string]: any };
	monthlySpending: { [key: string]: any };
	burnRate: number | null;
	runWay: number | null;
	totalIncome: number | null;
	totalBalance: number | null;
	totalSpending: number | null;
}

interface IAccountCalculationProps {
	/**
	 * 재계산 트리거 키 변경 함수
	 */
	setRecomputeTriggerKey: (key: string | undefined) => void;
	/**
	 * 계산 결과
	 */
	calculationResult: IAccountCalculationResultProps;
}

const AccountCalculation = (props: IAccountCalculationProps) => {
	//* State
	/**
	 * 평균 개월
	 */
	const [averageMonth, setAverageMonth] = React.useState<number>(1);
	/**
	 * 기준일
	 */
	const [standardDate, setStandardDate] = React.useState<any>();
	/**
	 * 메뉴 오픈 여부
	 */
	const [anchorEl, setAnchorEl] = React.useState(null);
	const open = Boolean(anchorEl);

	//* Modules
	const financialRatioConfigController = new DefaultController(
		'FinancialRatioConfig'
	);
	const bankController = new BankController();
	//* Constants
	const resultConfig = [
		{
			lable: 'RunWay',
			value: props.calculationResult.runWay,
			extra: true,
			month: true,
		},
		{
			lable: 'BurnRate',
			value: props.calculationResult.burnRate,
			extra: true,
		},
		{
			lable: '총 수입',
			value: props.calculationResult.totalIncome,
		},
		{
			lable: '총 지출',
			value: props.calculationResult.totalSpending,
		},
		{
			lable: '회사 보유 자금',
			value: props.calculationResult.totalBalance,
		},
	];
	//* Functions
	/**
	 * 분석 조건 등록 및 수정함수
	 */
	const handleSave = () => {
		bankController.saveBankAccountCondition(
			{
				APP_MEMBER_IDENTIFICATION_CODE: 1,
				BURN_RATE_END_DATE: standardDate,
				BURN_RATE_START_DATE: moment(standardDate).subtract(
					averageMonth,
					'M'
				),
			},
			(res) => {
				props.setRecomputeTriggerKey(uuidv4());
			},
			(err) => {}
		);
	};
	//* Hooks
	/**
	 * 분석 조건 가져오는 함수
	 */
	useEffect(() => {
		financialRatioConfigController.getOneItem(
			{
				APP_MEMBER_IDENTIFICATION_CODE: 1,
			},
			(res) => {
				setStandardDate(res.data.result.BURN_RATE_END_DATE);
				setAverageMonth(
					res.data.result.BURN_RATE_END_DATE.diff(
						res.data.result.BURN_RATE_START_DATE,
						'month'
					)
				);
			},
			(err) => {}
		);
	}, []);

	//* Hooks
	const inputRef = React.useRef<HTMLInputElement>(null);

	return (
		<Box
			sx={{
				width: '100%',
				backgroundImage: 'linear-gradient(to bottom, #262626, #000)',
				height: '150px',
				p: '25px 90px',
				position: 'fixed',
				bottom: 0,
				left: 0,
			}}
		>
			<Typography variant="h4" fontWeight={'bold'} color={'white'} pb={2}>
				분석하기
			</Typography>
			<Box display={'flex'} alignItems={'center'}>
				{/* 평균개월 */}
				<Box
					mr={'30px'}
					display={'flex'}
					flexDirection={'column'}
					gap={'10px'}
				>
					<Typography variant="body2" color={'#b0b5c2'}>
						BurnRate 평균개월
					</Typography>
					<Box display={'flex'} alignItems={'center'}>
						<Typography
							variant="h5"
							fontWeight={'bold'}
							color={'white'}
						>
							{averageMonth}개월
						</Typography>
						<KeyboardArrowDownIcon
							sx={{
								cursor: 'pointer',
								color: 'white',
							}}
							aria-controls={open ? 'basic-menu' : undefined}
							aria-haspopup="true"
							aria-expanded={open ? 'true' : undefined}
							onClick={(event) => {
								setAnchorEl(event.currentTarget);
							}}
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
							{[1, 3, 6, 12].map((item, index) => {
								return (
									<MenuItem
										sx={{
											borderBottom: '1px solid #e1eaff',
											pb: '10px',
											mb: '5px',
											display: 'flex',
											justifyContent: 'center',
										}}
										onClick={() => {
											setAnchorEl(null);
											setAverageMonth(item);
										}}
									>
										{item}개월
									</MenuItem>
								);
							})}
						</Menu>
					</Box>
				</Box>
				{/* 기준일 */}
				<Box
					mr={'30px'}
					display={'flex'}
					flexDirection={'column'}
					gap={'10px'}
				>
					<Typography variant="body2" color={'#b0b5c2'}>
						기준일
					</Typography>
					<LocalizationProvider dateAdapter={AdapterDayjs}>
						<DatePicker
							onChange={(e) => {
								setStandardDate(e);
							}}
							value={standardDate}
							inputRef={inputRef}
							inputFormat="YY-MM-DD"
							InputProps={{
								endAdornment: (
									<Typography color={'white'}>
										dndn
									</Typography>
								),
							}}
							renderInput={({
								inputRef,
								inputProps,
								InputProps,
							}) => (
								console.log(inputProps, InputProps),
								(
									<Box
										sx={{
											display: 'flex',
											alignItems: 'center',
										}}
										onClick={(e) => {
											InputProps.endAdornment?.props.children.props.onClick();
										}}
									>
										<Typography
											variant="h5"
											fontWeight={'bold'}
											color={'white'}
											ref={inputRef}
										>
											{inputProps?.value}
										</Typography>
										<KeyboardArrowDownIcon
											sx={{
												color: 'white',
											}}
										/>
										{/* <input ref={inputRef} {...inputProps} /> */}
										{InputProps.endAdornment}
									</Box>
								)
							)}
						/>
					</LocalizationProvider>
				</Box>
				<SupportiButton
					contents="조회하기"
					isGradient={true}
					style={{
						border: '1px solid white',
						color: 'white',
						width: '100px',
					}}
					onClick={() => handleSave()}
				/>
				|<Box border={'0.5px solid white'} mx={4} height={'50px'}></Box>
				{resultConfig.map((item, index) => {
					return (
						<Box
							mx={'25px'}
							display={'flex'}
							flexDirection={'column'}
							gap={'10px'}
						>
							<Typography color={'#b0b5c2'} variant="body2">
								{item.lable}
							</Typography>
							<Typography
								color={item.extra ? 'info.main' : 'white'}
								variant="h5"
								fontWeight={'bold'}
							>
								{Math.round(item.value).toLocaleString()}{' '}
								{item.month ? '개월' : '원'}
							</Typography>
						</Box>
					);
				})}
			</Box>
		</Box>
	);
};

export default AccountCalculation;
