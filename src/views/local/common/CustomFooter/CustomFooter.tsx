import React from 'react';

import {
	Box,
	BoxProps,
	Container,
	Divider,
	Grid,
	Typography,
} from '@mui/material';
import { useRouter } from 'next/router';
import OfflinePinIcon from '@mui/icons-material/OfflinePin';
interface ICustomFooterProps {}

const CustomFooter = (props: ICustomFooterProps) => {
	//* Modules
	const router = useRouter();
	//* Constants
	/**
	 *
	 * 브랜드 정보 리스트
	 */
	const BrandInfoList: { [key: string]: any }[] = [
		{ subject: '법인명', content: '(주)린온 컴퍼니' },
		{ subject: '대표', content: '김영진' },
		{
			subject: '주소',
			content:
				'경기도 안양시 동안구 시민대로327번길 11-41, 3층 3호(관양동)',
		},
		{ subject: '사업자등록번호', content: '563-87-01952' },
		{ subject: '대표전화', content: '010-5676-4066' },
		{ subject: '이메일', content: 'leanoncompany@gmail.com' },
	];

	/**
아이콘 리스트
 */
	const IconList: { [key: string]: any }[] = [];
	/**
	 * 메뉴 리스트
	 */
	const MenuList: { [key: string]: any }[] = [
		{ category: '서비스이용약관', link: '/terms?type=service' },
		{ category: '개인정보처리방침', link: '/terms?type=privacy' },
		{ category: '마케팅정보수신동의', link: '/terms?type=marketing' },
		{ category: '고객센터', link: '/customer_service/qna' },
	];

	return (
		!router.asPath.includes('/internal_service') &&
		!router.asPath.includes('/my_page') && (
			<Box pb={4}>
				<Box
					sx={{
						height: '5px',
						backgroundColor: '#F8F9FA',
					}}
				/>
				<Container>
					<Grid container spacing={7} pt={5} pb={3}>
						<Grid item xs={12} md={4}>
							<img
								src={'/images/logo/Suppor-TFulllogo.svg'}
								alt="Logo"
								width={'145px'}
								height={'45px'}
								style={{ cursor: 'pointer' }}
								onClick={() => router.push('/')}
							/>
						</Grid>
						<Grid item xs={12} md={8}>
							<Box
								display={'flex'}
								alignItems={'center'}
								// margin={{ xs: 1, ml: 5 }}
								ml={{ md: 5, xs: 1 }}
								gap={4}
								mb={3}
								// justifyContent={'space-evenly'}
							>
								{MenuList.map((data, index) => (
									<Typography
										key={index}
										onClick={() => router.push(data.link)}
										sx={{
											cursor: 'pointer',
										}}
									>
										{data.category}
									</Typography>
								))}
							</Box>
							<Box
								flexWrap={'wrap'}
								display={'flex'}
								width={'100%'}
								margin={{ xs: 1, md: 5 }}
							>
								{BrandInfoList.map((item, index) => (
									<Box display={'flex'} mb={0.5}>
										<Typography mr={1} variant="body2">
											{item.subject}
										</Typography>
										<Typography variant="body2">
											{item.content}
										</Typography>
										<Typography mr={1} ml={1}>
											|
										</Typography>
									</Box>
								))}
							</Box>
						</Grid>
					</Grid>
					<Divider />
					<Box
						display={'flex'}
						justifyContent={'center'}
						alignItems={'center'}
						padding={'10px 0'}
					>
						<Typography variant={'body2'} color={'text.secondary'}>
							Copyright © Suppor-T 2023
						</Typography>
					</Box>
				</Container>
			</Box>
		)
	);
};

export default CustomFooter;
