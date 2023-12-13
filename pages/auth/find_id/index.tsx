import React from 'react';

import { NextPage } from 'next';

import { Box, BoxProps, Button, TextField, Typography } from '@mui/material';
import SignUpLayout from '../../../src/views/local/sign_up/SignUpLayout';
import { useRouter } from 'next/router';
import { AlimTalkController } from '../../../src/controller/AlimTalkController';
import SupportiButton from '../../../src/views/global/SupportiButton';

const Page: NextPage = () => {
	//* Modules
	const alimTalkController = new AlimTalkController();
	const router = useRouter();
	//* States
	const [signupData, setSignupData] = React.useState({
		PHONE_NUMBER: '',
	});
	const [encrypted, setEncrypted] = React.useState<string>('');
	const [verifyNumber, setVerifyNumber] = React.useState<string>('');
	const [isVerified, setIsVerified] = React.useState<boolean>(false);
	const [page, setPage] = React.useState<number>(0);

	const [userName, setUserName] = React.useState<string>('');

	//*Functions

	/**
	 * 알림톡 발송
	 */
	const sendAlimTalk = () => {
		if (!signupData.PHONE_NUMBER) return alert('전화번호를 입력해주세요.');
		alimTalkController.sendAuthCode(
			{
				TARGET_PHONE_NUMBER: signupData.PHONE_NUMBER,
			},
			(res) => {
				setEncrypted(res.data.result);
			},
			(err) => {}
		);
	};
	/**
	 * 인증번호 확인
	 */
	const verifyAuthCode = () => {
		if (!verifyNumber) return alert('인증번호를 입력해주세요.');
		alimTalkController.checkAuthCode(
			{
				ENCRYPTED_AUTH_CODE: encrypted,
				AUTH_CODE: verifyNumber,
			},
			(res) => {
				if (res.data.result) {
					// 인증번호 일치]
					setIsVerified(true);
				}
			},
			(err) => {}
		);
	};
	//* Constants
	const signupDataConfig = [
		{
			label: '전화번호',
			type: 'phone',
			for: ['BUSINESS', 'GENERAL'],
			endAdornment: (
				<Button
					variant="contained"
					sx={{
						backgroundColor: '#d1d1d1',
					}}
					onClick={() => sendAlimTalk()}
					disabled={isVerified}
				>
					<Typography variant="body2" color={'white'} width={100}>
						인증번호 받기
					</Typography>
				</Button>
			),
			value: signupData.PHONE_NUMBER,
			error: false,
			helperText: '인증번호를 입력해주세요.',
			isVerified: isVerified,
			onChange: (e) => {
				setSignupData({
					...signupData,
					PHONE_NUMBER: e.target.value,
				});
			},
		},
		{
			label: '인증번호',
			type: 'text',
			for: ['BUSINESS', 'GENERAL'],
			nolabel: true,
			isVerified: isVerified,

			value: verifyNumber,
			onChange: (e) => {
				setVerifyNumber(e.target.value);
			},
		},
	];
	//* States
	//* Functions
	//* Hooks
	return (
		<SignUpLayout>
			{' '}
			<Typography variant="h1" fontWeight={'bold'}>
				아이디 찾기
			</Typography>
			{page === 0 ? (
				<Box my={3} width={'100%'}>
					{signupDataConfig.map((item, idx) => {
						return (
							<Box
								key={idx}
								alignItems={'center'}
								width={'100%'}
								mt={!item.nolabel && 2}
							>
								<Typography>
									{!item.nolabel && item.label}
								</Typography>
								<TextField
									type={item.type}
									value={item.value}
									onChange={item.onChange}
									error={item.error}
									fullWidth
									InputProps={{
										endAdornment: item.endAdornment,
									}}
									helperText={item.helperText}
									sx={{
										mt: 1,
									}}
									placeholder={`${item.label} 입력`}
								/>
							</Box>
						);
					})}
					<SupportiButton
						contents={'아이디 찾기'}
						fullWidth
						isGradient={true}
						style={{
							color: '#fff',
							mt: 3,
						}}
						onClick={() => {
							verifyAuthCode();
						}}
					/>
				</Box>
			) : (
				<Box my={3} width={'100%'}></Box>
			)}
		</SignUpLayout>
	);
};

export default Page;
