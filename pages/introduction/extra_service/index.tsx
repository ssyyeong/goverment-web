import { Box, Typography } from '@mui/material';
import { NextPage } from 'next';
import React, { useEffect } from 'react';
import { useAppMember } from '../../../src/hooks/useAppMember';

const Page: NextPage = () => {
	//* Modules
	const { memberId } = useAppMember();

	//* States

	//* Constants
	const AdditionServiceConfig = [
		{
			title: 'MVP 교육 프로그램',
			route: '',
		},
		{
			title: '투자자 매칭 서비스',
			route: '',
		},
		{
			title: '경영 지원(자금) 대행 서비스',
			route: '',
		},
	];

	//* Functions

	//* Hooks

	return (
		<Box
			sx={{
				width: '100%',
				height: '100%',
				p: { xs: 0.5, sm: 10 },
				bgcolor: 'primary.light',
				alignItems: 'center',
			}}
		>
			<Box textAlign="center" sx={{ mb: '15px', p: { xs: 2, sm: 0.5 } }}>
				<Typography fontWeight={800} variant="h1">
					비즈니스 운영을 위한 다양한 부가 서비스
				</Typography>
				<Typography
					fontWeight={600}
					variant="h4"
					color="secondary.main"
					my={1}
				>
					부가 서비스를 통해 다양한 기능을 경험해보세요.
				</Typography>
				<Box
					display="flex"
					gap={2}
					flexWrap="wrap"
					my={10}
					justifyContent={'center'}
				>
					{AdditionServiceConfig.map((item, index) => {
						return (
							<Box
								sx={{
									width: '300px',
									height: '200px',
									borderRadius: 2,
									bgcolor: 'white',
									p: 5,
									textAlign: 'center',
									alignItems: 'center',
									display: 'flex',
									justifyContent: 'center',
									cursor: 'pointer',
									border: '1px solid #c8c8c8',
								}}
							>
								<Typography
									variant="h4"
									fontWeight={700}
									sx={{ wordBreak: 'keep-all' }}
								>
									{item.title}
								</Typography>
							</Box>
						);
					})}
				</Box>
			</Box>
			<Box sx={{ height: '100%', width: '100%', mt: '20px' }}></Box>
		</Box>
	);
};

export default Page;
