import React from 'react';

import { NextPage } from 'next';

import { Box, TextField, Typography } from '@mui/material';
import SupportiButton from '../../../src/views/global/SupportiButton';
import { useRouter } from 'next/router';
import { CookieManager } from '@leanoncompany/supporti-utility';
import DefaultController from '@leanoncompany/supporti-ark-office-project/src/controller/default/DefaultController';

const Page: NextPage = () => {
	//* Modules
	const appMemberJpController = new DefaultController('AppMemberJp');

	const router = useRouter();
	const cookie = new CookieManager();
	const locale = cookie.getItemInCookies('LOCALE');

	//* States
	/**
	 * 로그인 데이터
	 */
	const [name, setName] = React.useState<string>('');
	const [company, setCompany] = React.useState<string>('');
	const [email, setEmail] = React.useState<string>('');
	const [phoneNumber, setPhoneNumber] = React.useState<string>('');

	//* Functions
	/**
	 * 로그인
	 */
	const signIn = () => {
		if (!name || !company || !email || !phoneNumber) {
			if (locale == 'jp')
				return alert('すべての情報を入力してください。');
			else return alert('모든 정보를 입력해주세요.');
		}
		appMemberJpController.createItem(
			{
				NAME: name,
				COMPANY: company,
				EMAIL: email,
				PHONE_NUMBER: phoneNumber,
			},
			(res) => {
				if (res.data.result !== null) {
					cookie.setItemInCookies(
						'ACCESS_TOKEN',
						res.data.result.NAME,
						{
							path: '/',
							maxAge: 3600 * 24 * 30,
						}
					);
					router.push('/jp');
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
			<Box
				mt={5}
				px={{
					xs: 0,
					md: 5,
				}}
			>
				<TextField
					fullWidth
					value={name}
					type="name"
					onChange={(e) => setName(e.target.value)}
					variant={'outlined'}
					sx={{ mb: 2, bgcolor: 'white' }}
					placeholder={locale == 'jp' ? '名前入力' : '이름 입력'}
					onKeyDown={onKeyPress}
				/>
				<TextField
					fullWidth
					value={company}
					type="company"
					onChange={(e) => setCompany(e.target.value)}
					variant={'outlined'}
					sx={{ mb: 2, bgcolor: 'white' }}
					placeholder={locale == 'jp' ? '会社名入力' : '회사명 입력'}
					onKeyDown={onKeyPress}
				/>
				<TextField
					fullWidth
					value={email}
					type="email"
					onChange={(e) => setEmail(e.target.value)}
					variant={'outlined'}
					sx={{ mb: 2, bgcolor: 'white' }}
					placeholder={locale == 'jp' ? 'Eメール入力' : '이메일 입력'}
					onKeyDown={onKeyPress}
				/>
				<TextField
					fullWidth
					value={phoneNumber}
					type="phoneNumber"
					onChange={(e) => setPhoneNumber(e.target.value)}
					variant={'outlined'}
					sx={{ mb: 2, bgcolor: 'white' }}
					placeholder={
						locale == 'jp' ? '電話番号入力' : '전화번호 입력'
					}
					onKeyDown={onKeyPress}
				/>
				<Typography
					variant={'body1'}
					sx={{ textAlign: 'center', color: 'primary.main', py: 1 }}
				>
					{locale == 'jp'
						? '* 入力時にログイン及び会員登録ができます。'
						: '* 입력 시 로그인 및 회원가입이 됩니다.'}
				</Typography>
				<SupportiButton
					fullWidth
					onClick={() => signIn()}
					isGradient={true}
					contents={locale == 'jp' ? 'ログイン' : '로그인'}
					style={{
						color: '#fff',
					}}
				/>
			</Box>
		</Box>
	);
};

export default Page;
