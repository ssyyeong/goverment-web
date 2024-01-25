import { Box, Grid, Typography } from '@mui/material';
import { NextPage } from 'next';
import React from 'react';

const Page: NextPage = () => {
	//* Modules

	//* States

	//* Constants
	const section3 = ['투자유치 실천회', 'CEO 북클럽', '앱 빌더'];
	const section3_1 = ['웹 / 앱 개발', '세무 기장 & CFO', 'CRM'];

	//* Hooks

	return (
		<Box width={'100%'}>
			{/** 섹션 1 */}
			<Box
				sx={{
					pt: { md: 20, xs: 5 },
					pb: { md: 3, xs: 1 },
					bgcolor: 'common.black',
				}}
				width={'100%'}
				textAlign="center"
			>
				<Typography
					sx={{
						background:
							'linear-gradient(to bottom, #ffffff, #ffffff1e)',
						'-webkit-background-clip': 'text',
						'-webkit-text-fill-color': 'transparent',
					}}
					variant={'h1'}
				>
					The Black
				</Typography>
				<Typography color={'common.white'} variant="h3" mb={2}>
					아무나 가입할 수 없습니다
				</Typography>
				<Typography color={'common.white'} mb={2}>
					오직 추천제, 추천인을 통해서만 가입 가능
				</Typography>
				<Box
					sx={{
						width: '1px',
						height: '150px',
						bgcolor: 'common.white',
						ml: 'auto',
						mr: 'auto',
					}}
				/>
			</Box>

			{/** 섹션 2 */}
			<Box
				sx={{
					pt: { md: 10, xs: 5 },
					bgcolor: 'common.white',
				}}
				width={'100%'}
				textAlign="center"
				bgcolor={'common.white'}
			>
				<Box display="flex" ml={'20%'}>
					<Box sx={{ borderBottom: '3px solid #3C52BB' }} mr={2}>
						<Typography color="primary.main" variant="h1">
							01
						</Typography>
					</Box>
					<Typography
						variant="h4"
						fontWeight={600}
						mt="auto"
						mb="auto"
					>
						파트너사 제공 서비스
					</Typography>
				</Box>
				<Box width="100%" height="1.5px" bgcolor={'secondary.light'} />
				<Box
					display="flex"
					justifyContent={'center'}
					gap={5}
					pt={10}
					pb={10}
					flexWrap="wrap"
				>
					<Box
						display="flex"
						justifyContent={'center'}
						gap={4}
						flexDirection="column"
					>
						<Box
							sx={{
								boxShadow: 'rgb(219, 219, 219) 0px 4px 10px',
								borderRadius: '20px',
								p: 3,
								textAlign: 'left',
								display: 'flex',
								flexDirection: 'column',
								justifyContent: 'center',
								gap: 2,
								width: {
									sm: '400px',
									xs: '400px',
								},
								height: {
									sm: '230px',
									xs: '230px',
								},
							}}
						>
							<Typography variant="h4" fontWeight={600}>
								소프트웨어
							</Typography>
							<Box
								width="100%"
								height="2px"
								bgcolor={'common.black'}
							/>
							<Typography color="secondary.dark">
								1) 지표관리 및 커피챗 기능(서포티)
							</Typography>
							<Typography color="secondary.dark">
								2) CRM 및 연차관리(자버)
							</Typography>
							<Typography color="secondary.dark">
								3) AWS 5000불 무료
							</Typography>
							<Typography color="secondary.dark">
								4) Azure, naverworks 등 할인 진행
							</Typography>
						</Box>
						<Box
							sx={{
								boxShadow: 'rgb(219, 219, 219) 0px 4px 10px',
								width: '400px',
								height: '230px',
								borderRadius: '20px',
								p: 3,
								textAlign: 'left',
								display: 'flex',
								flexDirection: 'column',
								gap: 2,
							}}
						>
							<Typography variant="h4" fontWeight={600}>
								투자 (벤처투자회사 직접 진행)
							</Typography>
							<Box
								width="100%"
								height="2px"
								bgcolor={'common.black'}
							/>
							<Typography color="secondary.dark">
								1) MVP 개발
							</Typography>
							<Typography color="secondary.dark">
								2) 노코드 앱 개발
							</Typography>
						</Box>
					</Box>
					<Box
						display="flex"
						justifyContent={'center'}
						gap={4}
						flexDirection="column"
					>
						<Box
							sx={{
								boxShadow: 'rgb(219, 219, 219) 0px 4px 10px',
								width: '400px',
								height: '230px',
								borderRadius: '20px',
								p: 3,
								textAlign: 'right',
								display: 'flex',
								flexDirection: 'column',
								gap: 2,
							}}
						>
							<Typography variant="h4" fontWeight={600}>
								제품 개발
							</Typography>
							<Box
								width="100%"
								height="2px"
								bgcolor={'common.black'}
							/>
							<Typography color="secondary.dark">
								1) 매달 1회 IR 서면 피드백 (벤처투자 심사역)
							</Typography>
							<Typography color="secondary.dark">
								2) 1:1 컨설팅 15분 무료 진행
							</Typography>
						</Box>
						<Box
							sx={{
								boxShadow: 'rgb(219, 219, 219) 0px 4px 10px',
								width: '400px',
								height: '230px',
								borderRadius: '20px',
								p: 3,
								textAlign: 'right',
								display: 'flex',
								flexDirection: 'column',
								gap: 2,
							}}
						>
							<Typography variant="h4" fontWeight={600}>
								전문가
							</Typography>
							<Box
								width="100%"
								height="2px"
								bgcolor={'common.black'}
							/>
							<Typography color="secondary.dark">
								세무 기장 3개월 무료
							</Typography>
						</Box>
					</Box>
					<Box
						borderRadius={'160px'}
						position={'absolute'}
            marginTop={'150px'}
						sx={{
							backgroundImage: `linear-gradient(to right, #305DDC 9%, #A8FCFF 89%)`,
							width: {
								sm: '140px',
								xs: '120px',
							},
							height: {
								sm: '140px',
								xs: '120px',
							},
           display: {
            sm :"block",
            xs: "none"
           }
						}}
					>
						<Typography
							color="common.white"
							variant="h4"
							lineHeight="140px"
						>
							Service
						</Typography>
					</Box>
				</Box>
			</Box>

			{/** 섹션 3 */}
			<Box
				sx={{
					pt: { md: 10, xs: 5 },
					bgcolor: 'common.white',
				}}
				width={'100%'}
				textAlign="center"
				bgcolor={'common.white'}
			>
				<Box
					display="flex"
					sx={{
						ml: {
							sm: '20%',
							xs: '10%',
						},
					}}
				>
					<Box sx={{ borderBottom: '3px solid #3C52BB' }} mr={2}>
						<Typography color="primary.main" variant="h1">
							02
						</Typography>
					</Box>
					<Box display="flex" flexWrap="wrap">
						<Typography
							variant="h4"
							fontWeight={600}
							mt="auto"
							mb="auto"
						>
							파트너사 서비스 할인 제공
						</Typography>
						<Typography
							variant="h4"
							fontWeight={600}
							mt="auto"
							mb="auto"
						>
							(20~50% 할인)
						</Typography>
					</Box>
				</Box>
				<Box width="100%" height="1.5px" bgcolor={'secondary.light'} />
				<Box
					display="flex"
					justifyContent={'center'}
					flexDirection="column"
					gap={10}
					pt={10}
					pb={10}
				>
					<Box
						display="flex"
						gap={5}
						ml="auto"
						mr="auto"
						flexWrap={'wrap'}
						justifyContent="center"
					>
						{section3.map((item, index) => {
							return (
								<Box>
									<Box
										display="flex"
										flexDirection={'column'}
										gap={3}
									>
										<Box
											p={2}
											width="280px"
											height="50px"
											sx={{
												boxShadow:
													'rgb(219, 219, 219) 0px 4px 10px',
												borderRadius: '5px',
											}}
										>
											<Typography
												color="primary.main"
												fontWeight={600}
											>
												Service {index + 1}
											</Typography>
										</Box>
										<Box
											height={'2px'}
											width={'30px'}
											bgcolor={'secondary.dark'}
											ml="auto"
											mr="auto"
										/>
										<Typography
											variant="h5"
											fontWeight={600}
										>
											{item}
										</Typography>
									</Box>
								</Box>
							);
						})}
					</Box>
					<Box
						display="flex"
						gap={5}
						ml="auto"
						mr="auto"
						flexWrap={'wrap'}
						justifyContent="center"
					>
						{section3_1.map((item, index) => {
							return (
								<Box>
									<Box
										display="flex"
										flexDirection={'column'}
										gap={3}
									>
										<Box
											p={2}
											width="280px"
											height="50px"
											sx={{
												boxShadow:
													'rgb(219, 219, 219) 0px 4px 20px',
												borderRadius: '5px',
											}}
										>
											<Typography
												color="primary.main"
												fontWeight={600}
											>
												Service {index + 4}
											</Typography>
										</Box>
										<Box
											height={'2px'}
											width={'30px'}
											bgcolor={'secondary.dark'}
											ml="auto"
											mr="auto"
										/>
										<Typography
											variant="h5"
											fontWeight={600}
										>
											{item}
										</Typography>
									</Box>
								</Box>
							);
						})}
					</Box>
				</Box>
			</Box>

			{/** 섹션 4 */}
			<Box
				sx={{
					pt: { md: 10, xs: 5 },
					bgcolor: 'common.white',
				}}
				width={'100%'}
				textAlign="center"
				bgcolor={'common.white'}
			>
				<Box display="flex" ml={'20%'}>
					<Box sx={{ borderBottom: '3px solid #3C52BB' }} mr={2}>
						<Typography color="primary.main" variant="h1">
							03
						</Typography>
					</Box>
					<Typography
						variant="h4"
						fontWeight={600}
						mt="auto"
						mb="auto"
					>
						프리미엄 세미나 개최
					</Typography>
				</Box>
				<Box width="100%" height="1.5px" bgcolor={'secondary.light'} />
				<Box
					display="flex"
					justifyContent={'center'}
					flexDirection="column"
					gap={10}
					mt={10}
					mb={10}
					pt={15}
					pb={15}
					bgcolor={'primary.light'}
				>
					<Box display="flex" gap={5} ml="auto" mr="auto">
						{section3.map((item, index) => {
							return (
								<Box>
									<Box
										display="flex"
										flexDirection={'column'}
										gap={3}
									>
										<Box
											p={2}
											sx={{
												boxShadow:
													'rgb(219, 219, 219) 0px 4px 10px',
												borderRadius: '5px',
												width: {
													sm: '280px',
													xs: '150px',
												},
												height: {
													sm: '50px',
													xs: '30px',
												},
											}}
										>
											<Typography
												color="primary.main"
												fontWeight={600}
											>
												Service {index + 1}
											</Typography>
										</Box>
										<Box
											height={'2px'}
											width={'30px'}
											bgcolor={'secondary.dark'}
											ml="auto"
											mr="auto"
										/>
										<Typography
											variant="h5"
											fontWeight={600}
										>
											{item}
										</Typography>
									</Box>
								</Box>
							);
						})}
					</Box>
				</Box>
			</Box>
		</Box>
	);
};

export default Page;
