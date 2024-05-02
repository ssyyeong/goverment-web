import { Box, Typography } from '@mui/material';
import { NextPage } from 'next';
import React, { useEffect } from 'react';

import SupportiButton from '../../src/views/global/SupportiButton';
import SupportiModal from '../../src/views/global/SupportiModal';
import CloseIcon from '@mui/icons-material/Close';
import { useAppMember } from '../../src/hooks/useAppMember';
import { useSubscription } from '../../src/hooks/useSubscription';
import { SupportiAlertModal } from '../../src/views/global/SupportiAlertModal';
import Image from 'next/image';

const Page: NextPage = () => {
	//* Modules
	const { memberId } = useAppMember();
	const { subscriptionInfo } = useSubscription({ memberId: memberId });

	//* States

	//* Constants
	const CardConfig = [
		{
			Title: '투자',
			Companies: [
				{
					logoPath: '/images/logo/partners/박대성대표님.webp',
					name: ['박대성 대표님'],
					description: ['하임벤처투자 대표'],
					etc: [
						'히스토리벤처투자 대표',
						'스틱스 경영전략본부 상무',
						'피플펀드앤컴퍼니 사업전략 팀장',
						'이노핀(구 에스비씨엔) 경영전략본부 상무',
						'CXC Private Equity 대체투자본부 부장',
						'삼정KPMG 구조조정본부 차장',
						'KTB 투자증권 투자금융부 부장',
					],
				},
			],
		},
		{
			Title: '마케팅 · 멘토링 · HR',
			Companies: [
				{
					logoPath: '/images/logo/partners/원테이커.png',
					name: ['홍유리 대표님'],
					description: ['주식회사 원테이커 대표'],
					etc: ['(현) 원테이커 CEO', '(전) 알에스기획 COO'],
				},
			],
		},
	];

	//* Functions

	//* Hooks

	return (
		<Box
			sx={{
				width: '100%',
				height: '100%',
				p: { xs: 5, sm: 20 },
				bgcolor: 'white',
				alignItems: 'center',
			}}
		>
			<Box textAlign="left" sx={{ mb: '150px', p: { xs: 2, sm: 0.5 } }}>
				<Typography fontWeight={700} variant="h2">
					비즈니스 멘토
				</Typography>
				<Typography variant="h6" mt={1.5}>
					멘토링을 통해 기업가정신을 키우고, 성공적인 창업을 돕습니다.
				</Typography>
			</Box>
			<Box
				display={'flex'}
				gap={2}
				justifyContent={'space-between'}
				flexWrap={'wrap'}
			>
				{CardConfig.map((item, index) => {
					return (
						<Box display={'flex'} gap={5} flexWrap={'wrap'}>
							<Image
								src={item.Companies[0].logoPath}
								alt={item.Title}
								width={250}
								height={280}
								style={{ borderRadius: '16px' }}
							/>
							<Box justifyContent={'center'} py={2}>
								<Typography variant="h6" mb={4}>
									{item.Title}
								</Typography>
								<Typography variant="h3" my={1.5}>
									{item.Companies[0].name}
								</Typography>
								<Typography variant="h5" my={1.5} mb={4.5}>
									{item.Companies[0].description}
								</Typography>
								{item.Companies[0].etc.map((etc, index) => {
									return (
										<Typography variant="body1" my={1.5}>
											{etc}
										</Typography>
									);
								})}
							</Box>
						</Box>
					);
				})}
			</Box>
		</Box>
	);
};

export default Page;
