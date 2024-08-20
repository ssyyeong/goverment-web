import { NextPage } from 'next';
import React, { useEffect } from 'react';
import { useRouter } from 'next/router';

import { Box, Typography } from '@mui/material';
import SupportiButton from '../../src/views/global/SupportiButton';
import { CookieManager } from '@leanoncompany/supporti-utility';

const Page: NextPage = () => {
	const router = useRouter();
	const cookie = new CookieManager();
	const locale = cookie.getItemInCookies('LOCALE');

	return (
		<Box
			width={{
				xs: '100%',
				md: '40%',
			}}
			margin={'auto'}
			sx={{
				display: 'flex',
				flexDirection: 'column',
				backdropFilter: 'blur(20px)',
				borderStyle: 'solid',
				borderColor: 'primary.light',
				borderWidth: 'thin',
			}}
		>
			<Box
				sx={{
					backgroundImage: `url(/images/main/container.jpg)`,
					backgroundSize: 'cover',
				}}
				width={'100%'}
				height={'80vh'}
			>
				{/* 메인 이미지 텍스트 섹션 */}
				<Box
					position={'absolute'}
					top={'25%'}
					width={'100%'}
					left={'auto'}
					textAlign={'center'}
					display={'flex'}
					flexDirection={'column'}
				>
					{locale === 'jp' ? (
						<Typography
							variant={'h2'}
							fontWeight={'400'}
							color={'white'}
						>
							Supportiは <b>韓日Cross Boarderソリューションで</b>
						</Typography>
					) : (
						<Typography
							variant={'h2'}
							fontWeight={'400'}
							color={'white'}
						>
							서포티는 <b>한-일 Cross Boarder 솔루션</b>으로
						</Typography>
					)}
					{cookie.getItemInCookies('LOCALE') === 'jp' ? (
						<Typography
							variant={'h2'}
							fontWeight={'400'}
							color={'white'}
							mt={1}
						>
							韓国と日本の進出を支援します。
						</Typography>
					) : (
						<Typography
							variant={'h2'}
							fontWeight={'400'}
							color={'white'}
							mt={1}
						>
							한국과 일본의 진출을 지원합니다.
						</Typography>
					)}
				</Box>
			</Box>
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					my: 10,
				}}
			>
				<Typography variant={'h2'}>日本の会社ですか?</Typography>
				<SupportiButton
					contents={'今から始める'}
					variant="contained"
					style={{
						width: '200px',
						marginRight: 'auto',
						marginLeft: 'auto',
						marginTop: 5,
					}}
					onClick={() => {
						window.open(
							'https://docs.google.com/forms/d/e/1FAIpQLScxLqCAX2T8xpz2mjpyQ6LR6BkS0VkTchDuYSN35qCJdQpxsQ/viewform',
							'_blank'
						);
					}}
				/>
			</Box>
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					my: 5,
				}}
				p={5}
				bgcolor={'primary.light'}
			>
				<Typography variant={'h2'}>한국 회사이신가요?</Typography>
				<SupportiButton
					contents={'지금 시작하기'}
					variant="contained"
					style={{
						width: '200px',
						marginRight: 'auto',
						marginLeft: 'auto',
						marginTop: 5,
					}}
					onClick={() => {
						if (cookie.getItemInCookies('JP_ACCESS_TOKEN')) {
							alert('이미 로그인 되어 있습니다.');
							return;
						}
						router.push('/jp/sign_in');
					}}
				/>
			</Box>
		</Box>
	);
};

export default Page;
