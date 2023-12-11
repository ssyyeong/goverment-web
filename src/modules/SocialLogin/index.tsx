import React from 'react';
import { Box } from '@mui/system';

interface Props {
	clientId: string;
	callbackUrl: string;
	children: React.ReactNode;
	type: string;
	state?: string;
}

const SocialLogin = (props: Props) => {
	const login =
		props.type === 'kakao'
			? `https://kauth.kakao.com/oauth/authorize?client_id=${props.clientId}&redirect_uri=${props.callbackUrl}&response_type=code`
			: props.type === 'naver'
			? `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${props.clientId}&state=${props.state}&redirect_uri=${props.callbackUrl}`
			: `https://accounts.google.com/o/oauth2/v2/auth?client_id=${props.clientId}&redirect_uri=${props.callbackUrl}&response_type=code&scope=email%20profile`;
	return (
		<Box
			onClick={() => (window.location.href = login)}
			width={'100%'}
			display={'flex'}
			alignItems={'center'}
			flexDirection={'column'}
		>
			{props.children}
		</Box>
	);
};

export default SocialLogin;
