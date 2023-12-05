import React, { useState } from 'react';
import SignIn from '@qillie-corp/ark-office-project/src/layout/auth/SignIn';
import { Box } from '@mui/material';

type Props = {};

const index = (props: Props) => {
	return (
		<Box>
			<SignIn
				tokenExpireHours={1}
				signInSuccessLink={'/basic/member/admin_member'}
				useAutoLogin={false}
				saveUserName={false}
				signUp={undefined}
				findInfo={{
					link: '/auth/find_account',
					label: '아이디/비밀번호 찾기',
				}}
			/>
		</Box>
	);
};

export default index;
