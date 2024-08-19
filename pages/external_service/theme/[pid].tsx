import React, { useEffect } from 'react';

import { NextPage } from 'next';

import {
	Box,
	BoxProps,
	FormControl,
	FormControlLabel,
	FormLabel,
	Radio,
	RadioGroup,
	Typography,
} from '@mui/material';
import { useRouter } from 'next/router';
import DefaultController from '@leanoncompany/supporti-ark-office-project/src/controller/default/DefaultController';
import moment from 'moment';
import SupportiButton from '../../../src/views/global/SupportiButton';
import { SupportiAlertModal } from '../../../src/views/global/SupportiAlertModal';
import { useUserAccess } from '../../../src/hooks/useUserAccess';
import { useAppMember } from '../../../src/hooks/useAppMember';
import LightbulbOutlinedIcon from '@mui/icons-material/LightbulbOutlined';
import CreditScoreIcon from '@mui/icons-material/CreditScore';
import dynamic from 'next/dynamic';
import {
	industryThemeConfig,
	overseasThemeConfig,
	regionThemeConfig,
} from '../../../configs/data/ThemeConfig';

const Page: NextPage = () => {
	//* Modules
	const router = useRouter();
	const { pid, category } = router.query;

	//* States
	/**
	 * 테마 데이터
	 */
	const [themeData, setThemeData] = React.useState<any>(null);

	//* Hooks
	/**
	 * 테마 데이터 조회
	 */
	useEffect(() => {
		if (pid !== undefined && category !== undefined) {
			if (category === '지역') {
				const theme = regionThemeConfig.find(
					(item: any) => item.id == pid
				);
				setThemeData(theme);
			} else if (category === '업종별') {
				const theme = industryThemeConfig.find(
					(item: any) => item.id == pid
				);
				setThemeData(theme);
			} else {
				const theme = overseasThemeConfig.find(
					(item: any) => item.id == pid
				);
				setThemeData(theme);
			}
		}
	}, [pid, category]);

	return (
		themeData != null && (
			<Box
				display={'flex'}
				width={'100%'}
				p={{
					xs: 2,
					md: 10,
				}}
				minHeight={'100vh'}
				flexDirection={'column'}
			>
				<Box
					display={'flex'}
					flexDirection={'column'}
					width={{
						md: '80%',
						xs: '100%',
					}}
					position={'relative'}
					margin={'auto'}
					p={{
						xs: 1,
						md: 5,
					}}
					minHeight={'90vh'}
				>
					{/* 테마 헤더 */}
					<Box
						p={3}
						bgcolor={'primary.light'}
						display={{ xs: 'block', md: 'flex' }}
						justifyContent={'space-between'}
						borderRadius={2}
					>
						<Typography variant={'h4'} fontWeight={'600'}>
							{themeData?.title}
						</Typography>
						<Box
							display={'flex'}
							gap={3}
							mt={{
								xs: 2,
								md: 0,
							}}
							alignItems={{
								xs: 'start',
								md: 'center',
							}}
							flexDirection={{
								xs: 'column',
								md: 'row',
							}}
						>
							<Typography variant={'body1'}>
								{themeData?.subCategory1}
							</Typography>
							<Typography variant={'body1'}>
								{themeData?.subCategory2}
							</Typography>
							<Typography variant={'body1'}>
								정원 : {themeData?.count} 명
							</Typography>

							<Typography
								sx={{
									p: 0.8,
									border: '1px solid #c8c8c8',
									borderRadius: 5,
									cursor: 'pointer',
									borderColor: 'primary.main',
									color: 'primary.main',
								}}
							>
								{themeData?.online ? '온라인' : '오프라인'}
							</Typography>
						</Box>
					</Box>
					<Box
						sx={{
							display: 'flex',
							flexDirection: 'column',
							width: '100%',
							alignItems: 'center',
							justifyContent: 'center',
							mt: 3,
						}}
					>
						{themeData?.imgSrc != '' && (
							<>
								<Box
									sx={{
										display: 'flex',
										alignContent: 'center',
										justifyContent: 'center',
									}}
									width={{
										md: '75%',
										xs: '100%',
									}}
								>
									<img
										src={themeData?.imgSrc}
										alt=""
										width={'100%'}
									/>
								</Box>
							</>
						)}
						{/* 테마 내용 */}
						<Box
							display={'flex'}
							flexDirection={'column'}
							width={'100%'}
							justifyContent={'center'}
							marginTop={3}
							px={{
								md: 10,
								xs: 0,
							}}
						>
							{themeData?.description.map((item: any, index) => {
								return (
									<Box
										key={index}
										width={'100%'}
										sx={{
											display: 'flex',
											flexDirection: {
												md: 'row',
												xs: 'column',
											},
											overflow: 'hidden',
											marginTop: 2,
										}}
									>
										<Typography
											fontWeight={400}
											variant="h5"
											color={'#363636'}
											sx={{
												wordBreak: 'keep-all',
												display: 'flex',
												flexWrap: 'wrap',
												lineHeight: 1.5,
											}}
										>
											{item}
										</Typography>
									</Box>
								);
							})}
						</Box>
					</Box>
				</Box>
			</Box>
		)
	);
};

export default Page;
