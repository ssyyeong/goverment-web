import React from 'react';
import { NextPage } from 'next';

import { Box, Grid, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { CookieManager } from '@leanoncompany/supporti-utility';

import SupportiButton from '../../../src/views/global/SupportiButton';

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
			<Box>
				<Grid container width={'100%'}>
					{/** 섹션 1 */}
					<Box width={'100%'}>
						<Box
							display="flex"
							gap={2}
							flexDirection={'column'}
							m="auto"
						>
							<Box
								textAlign={'center'}
								display="flex"
								gap={1.5}
								flexDirection={'column'}
								bgcolor={'primary.light'}
								m="auto"
								p={7}
								sx={{
									width: '100%',
								}}
							>
								<Typography variant={'h3'} color={'primary'}>
									{locale == 'jp' ? '法人設立' : '법인설립'}
								</Typography>
								{locale == 'jp' ? (
									<Typography
										variant={'h6'}
										fontWeight={400}
										sx={{
											lineHeight: 1.5,
										}}
									>
										日本で最も厳しい支社設立（法人）と
										<br />
										口座開設の全過程を協業機関と共に代行およびコンサルティングいたします。
									</Typography>
								) : (
									<Typography
										variant={'h6'}
										fontWeight={400}
										sx={{
											lineHeight: 1.5,
										}}
									>
										일본에서 가장 까다로운 지사 설립(법인)과
										<br />
										계좌 개설 모든 과정을 협업 기관과 함께
										대행 및 컨설팅 해드립니다.
									</Typography>
								)}
							</Box>
						</Box>
					</Box>
				</Grid>
			</Box>
			<Grid item xs={12}>
				<Box
					textAlign={'center'}
					position="absolute"
					bgcolor={'rgba(0, 0, 0, 0.7)'}
					width={'100%'}
					height={'300px'}
					display={'flex'}
					flexDirection={'column'}
					gap={2}
					sx={{ p: { md: 15, xs: 5 } }}
					justifyContent={'center'}
				>
					<Typography
						sx={{ wordBreak: 'keep-all', textAlign: 'center' }}
						color={'white'}
						variant="h4"
						fontWeight={'500'}
					>
						{locale == 'jp'
							? 'ビジネスを便利に管理しなさい'
							: '여러분의 사업을 편리하게 관리하세요'}
					</Typography>
					<Typography
						sx={{ wordBreak: 'keep-all', textAlign: 'center' }}
						color={'white'}
						variant="subtitle1"
					>
						{locale == 'jp'
							? 'サポティで最適なソリューションを提案します。'
							: '서포티에서 최적의 솔루션을 제안합니다.'}
					</Typography>
					<SupportiButton
						contents={
							locale == 'jp' ? '無料で始める' : '무료로 시작하기'
						}
						onClick={() => {
							if (cookie.getItemInCookies('JP_ACCESS_TOKEN')) {
								locale == 'jp'
									? alert('すでにログインしています。')
									: alert('이미 로그인 되어 있습니다.');
								return;
							}
							router.push('/jp/sign_in');
						}}
						variant="contained"
						style={{
							width: '200px',
							marginLeft: 'auto',
							marginRight: 'auto',
						}}
					/>
				</Box>
				<img
					style={{ zIndex: -100, width: '100%', height: '300px' }}
					src={'/images/main/mainBackgroundImg.jpg'}
					alt="img"
				/>
			</Grid>
		</Box>
	);
};

export default Page;
