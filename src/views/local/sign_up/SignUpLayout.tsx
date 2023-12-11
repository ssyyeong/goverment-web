import React from 'react';

import { Box, BoxProps } from '@mui/material';

interface ISignUpLayoutProps {
	children: React.ReactNode;
}

const SignUpLayout = (props: ISignUpLayoutProps) => {
	return (
		<Box
			width={'100%'}
			display={'flex'}
			alignItems={'center'}
			justifyContent={'center'}
			bgcolor={'primary.light'}
		>
			<Box
				width={{ sx: '100%', md: '500px' }}
				display={'flex'}
				flexDirection={'column'}
				justifyContent={'center'}
			>
				<img
					src="/images/logo/Suppor-TFulllogo.svg"
					alt="logo"
					style={{ width: 230, margin: 'auto' }}
				/>
				<Box
					px={6}
					py={5}
					display={'flex'}
					flexDirection={'column'}
					alignItems={'center'}
					justifyContent={'center'}
					width={'100%'}
					bgcolor={'white'}
					borderRadius={2}
					mt={5}
				>
					{props.children}
				</Box>
			</Box>
		</Box>
	);
};

export default SignUpLayout;
