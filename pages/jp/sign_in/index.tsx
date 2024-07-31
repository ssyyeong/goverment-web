import React from 'react';

import { NextPage } from 'next';

import { Avatar, Box, TextField, Typography } from '@mui/material';
import SocialLogin from '../../../src/modules/SocialLogin';
import SupportiInput from '../../../src/views/global/SupportiInput';
import SupportiButton from '../../../src/views/global/SupportiButton';
import { AppMemberController } from '../../../src/controller/AppMemberController';
import { useRouter } from 'next/router';
import { CookieManager } from '@leanoncompany/supporti-utility';
import { SupportiAlertModal } from '../../../src/views/global/SupportiAlertModal';
import { gTagEvent } from '../../../src/lib/gtag';
import { memory } from '../../_app';

const Page: NextPage = () => {
	//* Modules
	const appMemberController = new AppMemberController();
	const router = useRouter();
	const cookie = new CookieManager();
	//* Constants
	//* States
	/**
	 * 로그인 데이터
	 */
	const [name, setName] = React.useState<string>('');
	const [company, setCompany] = React.useState<string>('');
	const [email, setEmail] = React.useState<string>('');
	const [phoneNumber, setPhoneNumber] = React.useState<string>('');

	/**
	 * 자동로그인
	 */
	const [autoLogin, setAutoLogin] = React.useState<boolean>(false);

	//* Functions
	/**
	 * 로그인
	 */
	const signIn = () => {
		if (!name || !company || !email || !phoneNumber) {
			return alert('모든 정보를 입력해주세요.');
		}
		appMemberController.login(
			{
				USER_NAME: email,
			},
			(res) => {
				if (res.data.result !== null) {
					cookie.setItemInCookies(
						'ACCESS_TOKEN',
						res.data.result.accessToken,
						{
							path: '/',
							maxAge: autoLogin ? 3600 * 24 * 30 : 3600 * 24,
						}
					);
					memory.setData('memberName', res.data.result.FULL_NAME);
					router.push('/');
				} else {
				}
			},
			(err) => {}
		);
	};

	const onKeyPress = (e) => {
		if (e.key === 'Enter') {
			signIn();
		}
	};

	//* Hooks
	return (
		<Box
			width={{
				xs: '100%',
				md: '40%',
			}}
			margin={'auto'}
			sx={{
				display: 'flex',
				alignItems: 'center',
				flexDirection: 'column',
				bgcolor: 'primary.light',
				height: '100vh',
				p: 10,
			}}
		>
			<img
				src="/images/logo/Suppor-TFulllogo.svg"
				alt="logo"
				style={{ width: 230 }}
			/>
			<Box mt={5} px={5}>
				<TextField
					fullWidth
					value={name}
					type="name"
					onChange={(e) => setName(e.target.value)}
					variant={'outlined'}
					sx={{ mb: 2, bgcolor: 'white' }}
					placeholder="이름 입력"
					onKeyDown={onKeyPress}
				/>
				<TextField
					fullWidth
					value={company}
					type="company"
					onChange={(e) => setCompany(e.target.value)}
					variant={'outlined'}
					sx={{ mb: 2, bgcolor: 'white' }}
					placeholder="회사명 입력"
					onKeyDown={onKeyPress}
				/>
				<TextField
					fullWidth
					value={email}
					type="email"
					onChange={(e) => setEmail(e.target.value)}
					variant={'outlined'}
					sx={{ mb: 2, bgcolor: 'white' }}
					placeholder="이메일 입력"
					onKeyDown={onKeyPress}
				/>
				<TextField
					fullWidth
					value={phoneNumber}
					type="phoneNumber"
					onChange={(e) => setPhoneNumber(e.target.value)}
					variant={'outlined'}
					sx={{ mb: 2, bgcolor: 'white' }}
					placeholder="전화번호 입력"
					onKeyDown={onKeyPress}
				/>
				<Typography
					variant={'body1'}
					sx={{ textAlign: 'center', color: 'primary.main', py: 1 }}
				>
					* 입력 시 로그인 및 회원가입이 됩니다.
				</Typography>
				<SupportiButton
					fullWidth
					onClick={() => signIn()}
					isGradient={true}
					contents={'로그인'}
					style={{
						color: '#fff',
					}}
				/>
			</Box>
		</Box>
	);
};

export default Page;
