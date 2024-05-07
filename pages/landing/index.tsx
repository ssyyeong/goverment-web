import { Box, Button, Typography } from '@mui/material';
import { NextPage } from 'next';
import React, { useEffect } from 'react';

import SupportiButton from '../../src/views/global/SupportiButton';
import SupportiModal from '../../src/views/global/SupportiModal';
import CloseIcon from '@mui/icons-material/Close';
import { useAppMember } from '../../src/hooks/useAppMember';
import { useSubscription } from '../../src/hooks/useSubscription';
import { SupportiAlertModal } from '../../src/views/global/SupportiAlertModal';
import { useRouter } from 'next/router';

const Page: NextPage = () => {
	const router = useRouter();
	return (
		<Box
			sx={{
				width: '100%',
				height: '100%',
				alignItems: 'center',
			}}
		>
			<img
				src="/images/main/container.jpg"
				width={'100%'}
				height={'100%'}
			></img>
			<Box
				top={'50%'}
				position={'absolute'}
				width={'100%'}
				left={'auto'}
				textAlign={'center'}
			>
				<Typography variant={'h1'} fontWeight={'400'} color={'white'}>
					It makes your company’s dream come true
				</Typography>
				<Typography
					variant={'h2'}
					fontWeight={'400'}
					color={'white'}
					mt={1}
				>
					고객님의 하나뿐인,
				</Typography>
				<Typography variant={'h1'} color={'white'} mt={1}>
					스타트업 성장 관리 솔루션
				</Typography>
				<Typography
					variant={'h2'}
					fontWeight={'400'}
					color={'white'}
					mt={1}
				>
					서포티는 스타트업과
				</Typography>
				<Typography
					variant={'h2'}
					fontWeight={'400'}
					color={'white'}
					mt={1}
				>
					함께 성장하는 동행자입니다.
				</Typography>
			</Box>
		</Box>
	);
};

export default Page;
