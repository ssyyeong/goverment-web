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
	const [email, setEmail] = React.useState<string>('');
	/**
	 * 비밀번호 데이터
	 */
	const [password, setPassword] = React.useState<string>('');
	/**
	 * 자동로그인
	 */
	const [autoLogin, setAutoLogin] = React.useState<boolean>(false);
	/**
	 * 알러트 모달
	 */
	const [alertModal, setAlertModal] = React.useState<boolean>(false);

	//* Functions
	/**
	 * 로그인
	 */
	const signIn = () => {
		if (!email || !password) {
			return alert('이메일과 비밀번호를 모두 입력해주세요.');
		}
		appMemberController.login(
			{
				USER_NAME: email,
				PASSWORD: password,
			},
			(res) => {
				if (res.data.result !== null) {
					gTagEvent({
						action: 'local_login',
						category: 'local_login',
						label: 'local_login',
						value: 1,
					});

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
					setAlertModal(true);
				}
			},
			(err) => {
				setAlertModal(true);
			}
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
			sx={{
				display: 'flex',
				width: '100%',
				alignItems: 'center',
				justifyContent: 'center',
				flexDirection: 'column',
				bgcolor: 'primary.light',
				p: 10,
			}}
		>
			<img
				src="/images/logo/Suppor-TFulllogo.svg"
				alt="logo"
				style={{ width: 230, margin: 'auto' }}
			/>
			<Box width={'320px'} mt={5}>
				<TextField
					fullWidth
					// label={'이메일 입력'}
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
					// label={'비밀번호 입력'}
					type="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					variant={'outlined'}
					sx={{ mb: 2, bgcolor: 'white' }}
					placeholder="비밀번호 입력"
					onKeyDown={onKeyPress}
				/>
				<SupportiButton
					fullWidth
					onClick={() => signIn()}
					isGradient={true}
					contents={'로그인'}
					style={{
						color: '#fff',
					}}
				/>
				{/* 자동로그인, 아이디 비번찾기 */}
				<Box
					mt={2}
					mb={4}
					display={'flex'}
					justifyContent={'space-between'}
					alignItems={'center'}
				>
					<SupportiInput
						type="checkbox"
						value={autoLogin}
						setValue={setAutoLogin}
						label={'자동 로그인'}
						width={'120px'}
					/>
					<Box display={'flex'} alignItems={'center'} gap={0.5}>
						<Typography
							variant="subtitle2"
							sx={{
								cursor: 'pointer',
							}}
							onClick={() => router.push('/auth/find_id')}
						>
							아이디
						</Typography>
						/
						<Typography
							variant="subtitle2"
							sx={{
								cursor: 'pointer',
							}}
							onClick={() => router.push('/auth/find_pw')}
						>
							비밀번호 찾기
						</Typography>
					</Box>
				</Box>
				{/* 소셜로그인 */}
				<Box display={'flex'} justifyContent={'space-between'}>
					<Box
						sx={{
							width: '95px',
							height: '1px',
							backgroundColor: 'black',
							mt: 'auto',
							mb: 'auto',
						}}
					/>
					<Typography>10초만에 시작하기</Typography>
					<Box
						sx={{
							width: '95px',
							height: '1px',
							backgroundColor: 'black',
							mt: 'auto',
							mb: 'auto',
						}}
					/>
				</Box>
				<Box
					display={'flex'}
					alignItems={'center'}
					justifyContent={'space-around'}
					mt={3}
					mb={6}
				>
					<SocialLogin
						clientId={'e06884a5c42a479c4766d55703829af3'}
						callbackUrl={
							process.env.NEXT_PUBLIC_WEB_HOST +
							'/auth/redirect_url/kakao'
						}
						type={'kakao'}
						children={
							<Avatar
								src="/images/icons/kakao.svg"
								sx={{ width: 60, height: 60 }}
							/>
						}
					/>
					<SocialLogin
						clientId={'zNdksk9TIpT9iJZPjBcQ'}
						callbackUrl={
							process.env.NEXT_PUBLIC_WEB_HOST +
							'/auth/redirect_url/naver'
						}
						state={'false'}
						type={'naver'}
						children={
							<Avatar
								src="/images/icons/naver.svg"
								sx={{ width: 60, height: 60 }}
							/>
						}
					/>
					<SocialLogin
						clientId={
							'723926736636-q43fi38slh2c86gei55dm4qmhe5kha50.apps.googleusercontent.com'
						}
						callbackUrl={
							process.env.NEXT_PUBLIC_WEB_HOST +
							'/auth/redirect_url/google'
						}
						type={'google'}
						children={
							<Avatar
								src="/images/icons/google.svg"
								sx={{ width: 60, height: 60 }}
							/>
						}
					/>
				</Box>
				{/* 버튼 */}
				<SupportiButton
					contents={'회원가입하고 서포티 무료로 이용하기'}
					variant="outlined"
					onClick={() => {
						gTagEvent({
							action: 'sign_up',
							category: 'sign_up',
							label: 'sign_up',
							value: 1,
						});
						router.push('/auth/sign_up');
					}}
					fullWidth
				/>
			</Box>
			<SupportiAlertModal
				open={alertModal}
				handleClose={() => {
					setAlertModal(false);
				}}
				type="loginfail"
			/>
		</Box>
	);
};

export default Page;
