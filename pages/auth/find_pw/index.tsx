import React from 'react';

import { NextPage } from 'next';

import { Box, BoxProps, Button, TextField, Typography } from '@mui/material';
import SignUpLayout from '../../../src/views/local/sign_up/SignUpLayout';
import { useRouter } from 'next/router';
import { AlimTalkController } from '../../../src/controller/AlimTalkController';
import SupportiButton from '../../../src/views/global/SupportiButton';
import { emailRegex, passwordRegex } from '../../../configs/regex/regex';
import { AppMemberController } from '../../../src/controller/AppMemberController';

const Page: NextPage = () => {
	//* Modules
	const appMemberController = new AppMemberController();
	const router = useRouter();
	//* States
	const [signupData, setSignupData] = React.useState({
		PHONE_NUMBER: '',
		USER_NAME: '',
	});
	const [encrypted, setEncrypted] = React.useState<string>('');
	const [verifyNumber, setVerifyNumber] = React.useState<string>('');
	const [isVerified, setIsVerified] = React.useState<string>('NOT_YET');
	const [page, setPage] = React.useState<number>(0);
	const [passwordConfirm, setPasswordConfirm] = React.useState<string>('');
	const [password, setPassword] = React.useState<string>('');
	const [userId, setUserId] = React.useState<number>();
	const [userNotExist, setUserNotExist] = React.useState<boolean>(false);
	//*Functions

	/**
	 * 알림톡 발송
	 */
	const sendAlimTalk = () => {
		if (!signupData.PHONE_NUMBER) return alert('전화번호를 입력해주세요.');
		if (!signupData.USER_NAME) return alert('이메일을 입력해주세요.');
		appMemberController.sendFindPasswordAuthCode(
			{
				PHONE_NUMBER: signupData.PHONE_NUMBER,
				USER_NAME: signupData.USER_NAME,
			},
			(res) => {
				setEncrypted(res.data.result);
				setUserNotExist(false);
			},
			(err) => {
				setUserNotExist(true);
			}
		);
	};
	/**
	 * 인증번호 확인
	 */
	const verifyAuthCode = () => {
		if (!verifyNumber) return alert('인증번호를 입력해주세요.');
		appMemberController.checkFindPasswordAuthCode(
			{
				ENCRYPTED_AUTH_CODE: encrypted,
				AUTH_CODE: verifyNumber,
			},
			(res) => {
				if (res.data.result) {
					// 인증번호 일치]
					setIsVerified('OK');
					setPage(1);
				}
			},

			(err) => {
				setIsVerified('NOT_OK');
			}
		);
	};
	/**
	 * 비밀번호 변경하기
	 */
	const changePassword = () => {
		if (!password || !passwordConfirm)
			return alert('비밀번호를 입력해주세요.');
		if (password !== passwordConfirm)
			return alert('비밀번호가 일치하지 않습니다.');
		appMemberController.changePassword(
			{
				PHONE_NUMBER: signupData.PHONE_NUMBER,
				USER_NAME: signupData.USER_NAME,
				PASSWORD: password,
			},
			(res) => {
				if (res.data.result) {
					alert('비밀번호가 변경되었습니다.');
					router.push('/auth/sign_in');
				}
			},
			(err) => {}
		);
	};
	//* Constants
	const signupDataConfig = [
		{
			label: '이메일',
			type: 'email',
			for: ['BUSINESS', 'GENERAL'],
			value: signupData.USER_NAME,
			onChange: (e) => {
				setSignupData({
					...signupData,
					USER_NAME: e.target.value,
				});
			},
			error:
				signupData.USER_NAME && !emailRegex.test(signupData.USER_NAME),
			helperText:
				signupData.USER_NAME && !emailRegex.test(signupData.USER_NAME)
					? '이메일 형식이 올바르지 않습니다.'
					: '',
		},
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
					disabled={isVerified === 'OK'}
				>
					<Typography variant="body2" color={'white'} width={100}>
						인증번호 받기
					</Typography>
				</Button>
			),
			value: signupData.PHONE_NUMBER,
			error: userNotExist,
			helperText: userNotExist
				? '존재하지 않는 회원이거나 소셜로그인 유저입니다.'
				: '',
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
			error: isVerified === 'NOT_OK',
			helperText:
				isVerified === 'NOT_OK'
					? '인증번호가 일치하지 않습니다.'
					: '인증되었습니다.',
			value: verifyNumber,
			onChange: (e) => {
				setVerifyNumber(e.target.value);
			},
		},
	];

	const pwDataConfig = [
		{
			label: '비밀번호',
			type: 'password',
			for: ['BUSINESS', 'GENERAL'],
			value: password,
			placeholder:
				'비밀번호 (8~16자의 영문 대소문자, 숫자, 특수문자 조합)',
			onChange: (e) => {
				setPassword(e.target.value);
			},
			error: password && !passwordRegex.test(password),
			helperText:
				password && !passwordRegex.test(password)
					? '비밀번호 형식이 올바르지 않습니다.'
					: '',
		},
		{
			label: '비밀번호 확인',
			placeholder: '비밀번호 재확인',
			for: ['BUSINESS', 'GENERAL'],
			type: 'password',
			value: passwordConfirm,
			onChange: (e) => {
				setPasswordConfirm(e.target.value);
			},
			error: password && password !== passwordConfirm,
			nolabel: true,
			helperText:
				password && password !== passwordConfirm
					? '비밀번호가 일치하지 않습니다.'
					: '',
		},
	];
	//* States
	//* Functions
	//* Hooks
	return (
		<SignUpLayout>
			{' '}
			<Typography variant="h1" fontWeight={'bold'}>
				비밀번호 찾기
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
						contents={'비밀번호 변경하기'}
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
				<Box my={3} width={'100%'}>
					{pwDataConfig.map((item, idx) => {
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
						contents={'비밀번호 변경하기'}
						fullWidth
						isGradient={true}
						style={{
							color: '#fff',
							mt: 3,
						}}
						onClick={() => changePassword()}
					/>
				</Box>
			)}
		</SignUpLayout>
	);
};

export default Page;
