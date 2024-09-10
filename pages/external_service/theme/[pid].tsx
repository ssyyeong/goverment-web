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

const Page: NextPage = () => {
	//* Modules
	const router = useRouter();
	const themeProductController = new DefaultController('ThemeProduct');
	const { pid } = router.query;

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
		themeProductController.getOneItem(
			{ THEME_PRODUCT_IDENTIFICATION_CODE: pid },
			(res) => {
				setThemeData(res.data.result);
				console.log(res.data.result);
			},
			(err) => {}
		);
	}, [pid]);

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
							{themeData?.TITLE}
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
								{themeData?.ThemeCategory?.CONTENT}
							</Typography>
							<Typography variant={'body1'}>
								{themeData?.ThemeSubCategory?.SUB_CONTENT}
							</Typography>
							<Typography variant={'body1'}>
								정원 : {themeData?.COUNT} 명
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
								{themeData?.ONLINE_YN == 'Y'
									? '온라인'
									: '오프라인'}
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
						{JSON.parse(themeData?.IMAGE).length > 0 && (
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
										src={JSON.parse(themeData?.IMAGE)[0]}
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
							alignItems={'center'}
							marginTop={3}
							px={{
								md: 10,
								xs: 0,
							}}
						>
							{themeData?.DESCRIPTION.split('.').map(
								(line, index) =>
									index !==
										themeData?.DESCRIPTION.split('.')
											.length -
											1 && (
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
												{line}.
											</Typography>
										</Box>
									)
							)}
						</Box>
					</Box>
				</Box>
			</Box>
		)
	);
};

export default Page;
