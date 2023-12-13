import React from 'react';

import { NextPage } from 'next';

import {
	Avatar,
	Box,
	BoxProps,
	Container,
	TextField,
	Typography,
} from '@mui/material';
import SocialLogin from '../../../src/modules/SocialLogin';
import DefaultController from '@qillie-corp/ark-office-project/src/controller/default/DefaultController';
import SupportiInput from '../../../src/views/global/SupportiInput';
import SupportiButton from '../../../src/views/global/SupportiButton';
import { AppMemberController } from '../../../src/controller/AppMemberController';
import { useRouter } from 'next/router';

const Page: NextPage = () => {
	//* Modules
	const appMemberController = new AppMemberController();
	const router = useRouter();
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
					router.push('/');
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
			sx={{
				display: 'flex',
				width: '100%',
				alignItems: 'center',
				justifyContent: 'center',
				flexDirection: 'column',
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
					sx={{ mb: 2 }}
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
					sx={{ mb: 2 }}
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
					<Typography
						variant="subtitle2"
						sx={{
							cursor: 'pointer',
						}}
					>
						아이디 / 비밀번호 찾기
					</Typography>
				</Box>
				{/* 소셜로그인 */}
				<Box display={'flex'} justifyContent={'space-between'}>
					<Typography
						sx={{
							textDecoration: 'line-through',
							color: 'white',
							textDecorationColor: '#8793ac',
						}}
					>
						asdasdawdasda
					</Typography>
					<Typography>10초만에 시작하기</Typography>
					<Typography
						sx={{
							textDecoration: 'line-through',
							color: 'white',
							textDecorationColor: '#8793ac',
						}}
					>
						asdasdawdasda
					</Typography>
				</Box>
				<Box
					display={'flex'}
					alignItems={'center'}
					justifyContent={'space-around'}
					mt={3}
					mb={6}
				>
					<SocialLogin
						clientId={'6459bed5636a10ab059180b7d7a4158b'}
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
						clientId={'bgdGjKz30ACPP8djXYq8'}
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
							'684271033180-564i1mu7bta4cui93qj4b0va67l46bml.apps.googleusercontent.com'
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
					contents={'회원가입하고 서포티 2주간 무료로 이용하기'}
					variant="outlined"
					onClick={() => {}}
					fullWidth
				/>
			</Box>
		</Box>
	);
};

export default Page;
