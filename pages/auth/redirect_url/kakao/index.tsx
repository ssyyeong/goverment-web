import React, { useEffect } from 'react';

import { NextPage } from 'next';

import { Box, BoxProps, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useRouter } from 'next/router';
import { AppMemberController } from '../../../../src/controller/AppMemberController';
import { CookieManager } from '@qillie-corp/qillie-utility';

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
	//* Functions
	//* Hooks
	useEffect(() => {
		if (code) {
			authController.kakaoLogin(
				{
					code,
				},
				(res) => {
					if (res.data.result == false) {
						alert(
							'이미 존재하는 계정입니다. 다른 소셜로그인을 이용해 주세요!'
						);
						setTimeout(() => {
							router.push('/auth/sign_in');
						}, 2000);
						return;
					}
					cookie.setItemInCookies(
						'userId',
						res.data.result.user.APP_MEMBER_IDENTIFICATION_CODE,
						{ path: '/', maxAge: 3600 * 24 * 30 }
					);
				},
				(err) => {
					console.log(err);
					alert(err.response.data.message);
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
				<span> 소셜로그인이 완료되었습니다!</span>
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
		</Box>
	);
};

export default Page;
