import React from 'react';
import { NextPage } from 'next';

import { Box, Grid, Typography } from '@mui/material';
import SupportiButton from '../../../src/views/global/SupportiButton';
import { useRouter } from 'next/router';

const Page: NextPage = () => {
	const router = useRouter();

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
									법인설립
								</Typography>
								<Typography
									variant={'h6'}
									fontWeight={400}
									sx={{
										lineHeight: 1.5,
									}}
								>
									일본에서 가장 까다로운 지사 설립(법인)과
									<br />
									계좌 개설 모든 과정을 협업 기관과 함께 대행
									및 컨설팅 해드립니다.
								</Typography>
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
						여러분의 사업을 편리하게 관리하세요
					</Typography>
					<Typography
						sx={{ wordBreak: 'keep-all', textAlign: 'center' }}
						color={'white'}
						variant="subtitle1"
					>
						서포티에서 최적의 솔루션을 제안합니다.
					</Typography>
					<SupportiButton
						contents="무료로 시작하기"
						onClick={() => {
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
