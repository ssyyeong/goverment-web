import React, { useEffect } from 'react';

import { NextPage } from 'next';

import { Box, BoxProps, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useRouter } from 'next/router';
import { AppMemberController } from '../../../../src/controller/AppMemberController';
import { CookieManager } from '@leanoncompany/supporti-utility';
import AppMemberUpdateModal from '../../../../src/views/local/auth/appMemberUpdateModal/AppMemeberUpdateModal';

const Page: NextPage = () => {
	//* Modules
	const router = useRouter();
	const { code } = router.query;
	const cookie = new CookieManager();
	//*Controller
	const authController = new AppMemberController();
	//* Constants
	//* States
	const [loading, setLoading] = React.useState<boolean>(false);
	const [updateModal, setUpdateModal] = React.useState<boolean>(false);
	const [userData, setUserData] = React.useState<any>({});
	const [accessToken, setAccessToken] = React.useState<string>('');
	//* Functions
	//* Hooks
	useEffect(() => {
		if (code) {
			authController.naverLogin(
				{
					code,
				},
				(res) => {
					if (res.data.result.user.USER_GRADE === 'NOT_GENERATED') {
						alert('회원가입이 필요합니다.');
						setAccessToken(
							res.data.result.signUpResult.accessToken
						);
						setUserData(res.data.result.user);
						setUpdateModal(true);

						return;
					} else {
						cookie.setItemInCookies(
							'ACCESS_TOKEN',
							res.data.result.signUpResult.accessToken,
							{ path: '/', maxAge: 3600 * 24 * 30 }
						);
						router.push('/');
					}
				},
				(err) => {
					console.log(err);
					alert(err?.response?.data.message);
					setTimeout(() => {
						router.push('/auth/sign_in');
					}, 2000);
				}
			);
		} else {
		}
	}, [code]);

	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'center',
				alignItems: 'center',
				width: '100%',
				height: '80vh',
			}}
		>
			<LoadingButton
				size="large"
				onClick={() => {}}
				loading={loading}
				// loadingIndicator="Loading…"
				// variant="outlined"
			>
				소셜로그인이 완료되었습니다!
			</LoadingButton>
			<Typography
				variant="h3"
				fontWeight={'bold'}
				sx={{
					mt: 3,
				}}
			>
				소셜로그인이 진행중입니다!
			</Typography>
			{userData && (
				<AppMemberUpdateModal
					open={updateModal}
					needPhoneUpdate={false}
					handleClose={() => {
						setUpdateModal(false);
					}}
					appMemberData={userData}
					accessToken={accessToken}
				/>
			)}
		</Box>
	);
};

export default Page;
