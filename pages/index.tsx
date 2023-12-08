import { Box, Grid, LinearProgress } from '@mui/material';
import React from 'react';
import SignIn from '@qillie-corp/ark-office-project/src/layout/auth/SignIn';
import SideBar from '@qillie-corp/ark-office-project/src/layout/SideBar/index';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import SupportiButton from '../src/views/global/SupportiButton';
import SupportiToggle from '../src/views/global/SupportiToggle';
import SuppportiModal from '../src/views/global/SuppportiModal';
import SupportiProgressBar from '../src/views/global/SupportiProgressBar';
import SupportiTable from '../src/views/global/SupportiTable';
import { TransactionHistoryTable } from '../src/views/local/internal_service/financial_solution/account_manage/TransactionHistoryTable';
import SupportiInput from '../src/views/global/SupportiInput';
type Props = {};

const index = (props: Props) => {
	const router = useRouter();

	useEffect(() => {}, []);

	const [tab, setTab] = React.useState(0);
	const [open, setOpen] = React.useState(false);
	const [text, setText] = React.useState('');
	const data = [
		{
			name: '김만수',
			age: 20,
			color: 'red',
		},
		{
			name: '김민수',
			age: 23,
		},
		{
			name: '김민수',
			age: 20,
		},
		{
			name: '김민수',
			age: 23,
		},
		{
			name: '김민수',
			age: 20,
		},
	];
	return (
		<Grid container>
			<SupportiInput
				type="inputwithbtn"
				value={text}
				setValue={setText}
				defaultValue=""
				width={200}
				btnContent="전송하기"
				btnOnclick={() => {}}
			/>
			<SupportiButton
				contents="다음"
				onClick={() => {
					// router.push('/auth/sign_in');
					setOpen(true);
				}}
				fullWidth
				variant="contained"
				disabledGutters
				style={{
					backgroundImage:
						'linear-gradient(99deg, #5583e4 9%, #4955e3 89%)',
					border: 'solid 1px #fff',
					p: 3,
				}}
			/>
			<SupportiButton
				contents="다음"
				onClick={() => {
					// router.push('/auth/sign_in');
				}}
				// fullWidth
				style={{
					textDecoration: 'underline',
					fontWeight: 300,
				}}
			/>
			<SupportiButton
				contents="다음"
				onClick={() => {
					// router.push('/auth/sign_in');
				}}
				fullWidth
				variant="outlined"
				style={{}}
			/>
			<SupportiButton
				contents="다시받기"
				onClick={() => {
					// router.push('/auth/sign_in');
				}}
				// fullWidth
				disabledGutters
				variant="contained"
				color="secondary"
				style={{
					color: 'white',
					height: '20px',
					width: '69px',
				}}
			/>{' '}
			asdasd
			<Box width={'100%'}>
				<SupportiToggle
					chipDataList={[
						{
							label: '전체',
							value: 0,
						},
						{
							label: '전체',
							value: 1,
						},
						{
							label: '전체',
							value: 2,
						},
					]}
					value={tab}
					setValue={setTab}
					chipHeight={30}
					style={{
						chipStyle: {},
					}}
				/>
			</Box>
			{/* <SupportiTable
				headerData={[
					{
						label: '이름',
						value: 'name',
						align: 'left',
						checkbox: true,
						checkBoxOnClick: (value, idx) => {
							data[idx].name = '김만수';
						},
						format: (value) => {
							return value === '김만수' ? true : false;
						},
					},
					{
						label: '나이',
						value: 'age',
						align: 'left',
						color: 'red',
						customFormat: (value) => {
							return value > 22 ? 'red' : 'blue';
						},
					},
				]}
				rowData={data}
			/> */}
			<SupportiProgressBar
				materialDataList={[
					{
						percentage: '15',
						color: 'red',
					},
					// {
					// 	percentage: '30',
					// 	color: 'blue',
					// },
					// {
					// 	percentage: '40',
					// 	color: 'green',
					// },
				]}
			/>
			<Box
				sx={{
					display: 'flex',
					alignItems: 'center',
					width: '100%',
				}}
			>
				<LinearProgress
					value={30}
					variant="buffer"
					sx={{ width: '100%', height: 20 }}
				/>
			</Box>
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
		</Grid>
	);
};

export default index;
