import React, { useEffect } from 'react';

import { NextPage } from 'next';

import { Box, Button, Link, TextField, Typography } from '@mui/material';
import SupportiButton from '../../../src/views/global/SupportiButton';
import { useRouter } from 'next/router';
import { CookieManager } from '@leanoncompany/supporti-utility';
import SupportiInput from '../../../src/views/global/SupportiInput';
import { AppMemberOrganController } from '../../../src/controller/AppMemberOrganController';

const Page: NextPage = () => {
	//* Modules
	const appMemberOrganController = new AppMemberOrganController();
	const router = useRouter();
	const cookie = new CookieManager();

	//* States
	/**
	 * 로그인 데이터
	 */
	const [id, setId] = React.useState<string>('');
	const [password, setPassword] = React.useState<string>('');

	/**
	 * 로그인
	 */
	const signIn = () => {
		if (!id || !password) {
			return alert('모든 정보를 입력해주세요.');
		}
		appMemberOrganController.signIn(
			{
				ID: id,
				PASSWORD: password,
			},
			(res) => {
				console.log(res);
				if (res.data.result !== null) {
					cookie.setItemInCookies(
						'BUSINESS_ACCESS_TOKEN',
						res.data.result.user
							.APP_MEMBER_ORGAN_IDENTIFICATION_CODE,
						{
							path: '/',
							maxAge: 3600,
						}
					);

					if (
						res.data.result.user.CREATED_AT ==
						res.data.result.user.UPDATED_AT
					)
						router.push('/business/change_password');
					else {
						router.push('/business');
					}
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
				width: '100%',
				minHeight: '100vh',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				bgcolor: 'white',
				p: 2,
			}}
		>
			<Box
				sx={{
					width: '100%',
					maxWidth: '400px',
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
				}}
			>
				<Box sx={{ mb: 8 }}>
					<img
						src="/images/logo/business_logo.png"
						alt="logo"
						style={{ width: 120, height: 120 }}
					/>
				</Box>

				<Box sx={{ width: '100%' }}>
					<TextField
						fullWidth
						value={id}
						type="text"
						onChange={(e) => setId(e.target.value)}
						variant="outlined"
						sx={{
							mb: 2,
							bgcolor: 'white',
							'& .MuiOutlinedInput-root': {
								borderRadius: '8px',
							},
						}}
						placeholder="아이디를 입력해주세요"
						onKeyDown={onKeyPress}
					/>

					<TextField
						fullWidth
						value={password}
						type="password"
						onChange={(e) => setPassword(e.target.value)}
						variant="outlined"
						sx={{
							mb: 2,
							bgcolor: 'white',
							'& .MuiOutlinedInput-root': {
								borderRadius: '8px',
							},
						}}
						placeholder="비밀번호를 입력해주세요"
						onKeyDown={onKeyPress}
					/>

					<SupportiButton
						fullWidth
						onClick={signIn}
						isGradient={true}
						contents="로그인"
						style={{
							color: '#fff',
							height: '48px',
							borderRadius: '8px',
							fontSize: '15px',
							fontWeight: 600,
						}}
					/>
				</Box>
			</Box>
		</Box>
	);
};

export default Page;
