import { Box, Typography } from '@mui/material';
import { NextPage } from 'next';
import React, { useEffect } from 'react';
import { useAppMember } from '../../../src/hooks/useAppMember';
import InfoIcon from '@mui/icons-material/Info';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { getMonthPickerUtilityClass } from '@mui/x-date-pickers';
import addCommaToNumber from '../../../src/function/DataFormatter/addCommaToNumber';

const Page: NextPage = () => {
	//* Modules
	const { memberId } = useAppMember();

	//* States

	//* Constants
	const AdditionServiceConfig = [
		{
			title: 'MVP 교육 프로그램',
			route: '',
			price: 150000,
			ticket: 15,
			type: '월',
		},
		{
			title: '투자자 매칭 서비스',
			route: '',
			price: 300000,
			ticket: 30,
			type: '회',
		},
		{
			title: '경영 지원(자금) 대행 서비스',
			route: '',
			price: 200000,
			ticket: 20,
			type: '회',
		},
		{
			title: '파트너사 프로그램',
			route: '',
		},
		{
			title: 'AWS 서버 도입',
			route: '',
		},
		{
			title: 'a2e서비스',
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
				<Typography fontWeight={700} variant="h1">
					사업 성장을 위해 필요한 다양한 부가 서비스
				</Typography>
				<Typography
					fontWeight={500}
					variant="h4"
					color="secondary.main"
					my={3}
				>
					부가 서비스를 통해 다양한 기능을 경험해보세요.
				</Typography>

				<Box textAlign="left" mt={20} ml={5}>
					<Typography fontWeight={700} variant={'h4'} mb={2.5}>
						진행 중인 부가서비스
					</Typography>
					<Typography color="primary.main" variant={'h6'}>
						<InfoIcon fontSize="small" sx={{ mb: -0.5 }} /> FREE
						플랜은 부가 서비스를 이용할 수 없습니다.
					</Typography>
				</Box>

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
									p: 4,
									textAlign: 'center',
									alignItems: 'center',
									display: 'flex',
									justifyContent: 'center',
									flexDirection: 'column',
									cursor: 'pointer',
									gap:2,
									border: '1px solid #c8c8c8',
								}}
							>
								<Typography
									variant="h4"
									fontWeight={700}
									sx={{
										wordBreak: 'keep-all',
										textDecoration: 'underline',
										mr: 0.5,
									}}
								>
									{item.title}{' '}
									<OpenInNewIcon
										sx={{ color: 'primary.main' }}
									/>
								</Typography>

								{item.type ? (	<Box>
										<Typography>
											W : {addCommaToNumber(item.price)} ~
											/ {item.type}
										</Typography>
									
									<Typography>
										S : {item.ticket}장 / {item.type}
									</Typography>
								</Box>
								): <Box><Typography>신청필요</Typography> </Box>}
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
