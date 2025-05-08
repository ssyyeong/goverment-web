import React from 'react';

import { NextPage } from 'next';

import { Box, TextField, Typography } from '@mui/material';
import SupportiButton from '../../../src/views/global/SupportiButton';
import { useRouter } from 'next/router';
import { CookieManager } from '@leanoncompany/supporti-utility';
import DefaultController from '@leanoncompany/supporti-ark-office-project/src/controller/default/DefaultController';

const Page: NextPage = () => {
	//* Modules
	const controller = new DefaultController('AppMemberOrgan');
	const router = useRouter();
	const cookie = new CookieManager();

	//* States
	/**
	 * 비밀번호 변경 데이터
	 */
	const [password, setPassword] = React.useState<string>('');
	const [rePassword, setRePassword] = React.useState<string>('');
	/**
	 * 비밀번호 변경
	 */
	const changePassword = () => {
		if (!password || !rePassword) {
			return alert('모든 정보를 입력해주세요.');
		}
		controller.updateItem(
			{
				PASSWORD: password,
				APP_MEMBER_ORGAN_IDENTIFICATION_CODE:
					cookie.getItemInCookies('BUSINESS_ACCESS_TOKEN') || 0,
			},
			(res) => {
				alert('비밀번호 변경 완료 후 로그인 페이지로 이동합니다.');
				if (res.data.result !== null) {
					router.push('/business/sign_in');
				}
			},
			(err) => {}
		);
	};

	const onKeyPress = (e) => {
		if (e.key === 'Enter') {
			changePassword();
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
				<Box sx={{ width: '100%' }}>
					<Typography
						variant="h6"
						sx={{ mb: 2, textAlign: 'center' }}
					>
						비밀번호 변경
					</Typography>
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
						placeholder="새로운 비밀번호를 입력해주세요"
						onKeyDown={onKeyPress}
					/>

					<TextField
						fullWidth
						value={rePassword}
						type="password"
						onChange={(e) => setRePassword(e.target.value)}
						variant="outlined"
						sx={{
							mb: 2,
							bgcolor: 'white',
							'& .MuiOutlinedInput-root': {
								borderRadius: '8px',
							},
						}}
						placeholder="비밀번호를 다시 입력해주세요"
						onKeyDown={onKeyPress}
					/>

					<SupportiButton
						fullWidth
						onClick={changePassword}
						isGradient={true}
						contents="비밀번호 변경"
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
