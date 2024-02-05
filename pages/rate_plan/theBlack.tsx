import { Box, Grid, Typography } from '@mui/material';
import { NextPage } from 'next';
import React from 'react';
import { useRouter } from 'next/router';

import SupportiButton from '../../src/views/global/SupportiButton';
import { useAppMember } from '../../src/hooks/useAppMember';

const Page: NextPage = () => {
	//* Modules
	const router = useRouter();

	const { memberId } = useAppMember();

	//* States

	//* Constants
	const section3 = ['투자유치 실천회', 'CEO 북클럽', '앱 빌더'];
	const section3_1 = ['웹 / 앱 개발', '세무 기장 & CFO', 'CRM'];

	const data1 = [
		{
			text1: 'IR 경험은 어디서 쌓아야 하나?',
			text2: '어떻게 진행되는 거지?',
		},
		{
			text1: '투자는 어떻게 받지?',
			text2: '대체 어떻게 해야',
			text3: '받을 수 있는거지?',
		},
		{
			text1: '내 사업을 성장시킬 방법도,',
			text2: '투자자를 만날 방법도 모르겠어',
		},
	];

	const data1_1 = [
		{
			title: '투자유치',
			text1: '매월 Private IR',
			text2: '+',
			text3: '투자 전제된 Demoday',
		},
		{
			title: 'IR',
			text1: '매월 5개사 내외',
			text2: '선정 후 투자사 연결',
		},
		{
			title: '데모데이',
			text1: '10개사 선발 후 최종 1~2개사 선정',
			text2: '무조건 투자 전제된 데모데이 개최',
			text3: '(서포티 및 서포티 관계사 대상)',
		},
	];

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
				<img
					src={'/images/main/theblack.png'}
					alt={'theblack'}
					width={'280px'}
					height={'200px'}
				/>
				{/* <Typography
					sx={{
						background:
							'linear-gradient(to bottom, #ffffff, #ffffff1e)',
						'-webkit-background-clip': 'text',
						'-webkit-text-fill-color': 'transparent',
					}}
					variant={'h1'}
				>
					The Black
				</Typography> */}
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
								bgcolor: 'white',
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
								bgcolor: 'white',
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
								bgcolor: 'white',
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
								bgcolor: 'white',
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
								sm: 'block',
								xs: 'none',
							},
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
						<Typography
							color="primary.main"
							variant="h1"
							width="40px"
						>
							02
						</Typography>
					</Box>
					<Box display="flex" flexWrap="wrap" gap={1}>
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
											p={2.5}
											width="270px"
											height="55px"
											sx={{
												boxShadow:
													'rgb(219, 219, 219) 0px 4px 10px',
												borderRadius: '5px',
												bgcolor: 'white',
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
											p={2.5}
											width="270px"
											height="55px"
											sx={{
												boxShadow:
													'rgb(219, 219, 219) 0px 4px 20px',
												borderRadius: '5px',
												bgcolor: 'white',
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
					bgcolor: 'primary.light',
				}}
				width={'100%'}
				textAlign="center"
				bgcolor={'primary.light'}
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
						전문가 Q&A 서비스
					</Typography>
				</Box>

				<Box
					sx={{
						display: { xs: 'none', md: 'block' },
						width: '100%',
					}}
				>
					<Box width="100%" bgcolor={'primary.light'} pt={8} pb={8}>
						<Box display="flex" gap={20} justifyContent={'center'}>
							<img
								src={'/images/main/경영.png'}
								alt={'경영'}
								width={'145px'}
								height={'145px'}
							/>
							<img
								src={'/images/main/투자.png'}
								alt={'투자'}
								width={'145px'}
								height={'145px'}
							/>
						</Box>
						<Box
							display="flex"
							gap={15}
							height={'145px'}
							justifyContent={'center'}
						>
							<img
								src={'/images/main/변호사.png'}
								alt={'변호사'}
								width={'145px'}
								height={'145px'}
							/>
							<Box textAlign={'center'} mt="auto" mb="auto">
								<Typography variant="h5" fontWeight={'600'}>
									전문가 Q&A
								</Typography>

								<Box
									display="flex"
									gap={1}
									justifyContent="center"
								>
									<Typography
										variant="h5"
										color="primary.main"
										fontWeight={'600'}
									>
										세무, 특허, 노무, 법무
									</Typography>
									<Typography variant="h5" fontWeight={'600'}>
										등
									</Typography>
								</Box>
								<Typography variant="h5" fontWeight={'600'}>
									전문가의 24시간 내 답변 서비스
								</Typography>
							</Box>
							<img
								src={'/images/main/세무.png'}
								alt={'세무'}
								width={'145px'}
								height={'145px'}
							/>
						</Box>
						<Box display="flex" gap={20} justifyContent={'center'}>
							<img
								src={'/images/main/마케팅.png'}
								alt={'마케팅'}
								width={'145px'}
								height={'145px'}
							/>
							<img
								src={'/images/main/노무.png'}
								alt={'노무'}
								width={'145px'}
								height={'145px'}
							/>
						</Box>
					</Box>
				</Box>
			</Box>

			{/** 섹션 5 */}
			<Box
				sx={{
					pt: { md: 10, xs: 5 },
					bgcolor: 'primary.light',
				}}
				width={'100%'}
				textAlign="center"
				bgcolor={'primary.light'}
			>
				<Box display="flex" ml={'20%'}>
					<Box sx={{ borderBottom: '3px solid #3C52BB' }} mr={2}>
						<Typography color="primary.main" variant="h1">
							04
						</Typography>
					</Box>
					<Typography
						variant="h4"
						fontWeight={600}
						mt="auto"
						mb="auto"
					>
						커피챗
					</Typography>
				</Box>
				<Box pt={5} pb={15}>
					<img
						src={'/images/main/커피챗.png'}
						alt={'커피챗'}
						width={'220px'}
						height={'220px'}
					/>
					<Typography fontWeight={600} variant="subtitle1" mb={7}>
					커피챗
					</Typography>

					<Typography
						fontWeight={600}
						variant="h5"
						sx={{
							mb: {
								xs: 1,
								sm: 0,
							},
						}}
					>
						매월 만나고 싶은 분과의 커피챗
					</Typography>
					<Box
						display="flex"
						flexWrap="wrap"
						gap={1}
						justifyContent={'center'}
					>
						<Typography fontWeight={600} variant="h5">
							다양한 분들과의 소통으로
						</Typography>
						<Typography fontWeight={600} variant="h5">
							폭넓은 인사이트를 얻습니다
						</Typography>
					</Box>
				</Box>
			</Box>

			{/** 섹션 6 */}
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
							05
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
					<Box
						display="flex"
						gap={5}
						ml="auto"
						mr="auto"
						flexWrap={'wrap'}
						justifyContent="center"
					>
						<Box
							width="220px"
							height="220px"
							border={'2px solid #3C52BB'}
							borderRadius="480px"
							bgcolor="white"
							pt={10}
						>
							<Typography
								color="primary.main"
								variant="h5"
								fontWeight={500}
							>
								다양한 분야의
							</Typography>
							<Typography
								color="primary.main"
								variant="h5"
								fontWeight={500}
							>
								믿음직스러운 연사님들과의
							</Typography>
							<Typography
								color="primary.main"
								variant="h5"
								fontWeight={500}
							>
								세미나 진행
							</Typography>
						</Box>
						<Typography
							variant="h1"
							color="secondary.dark"
							mt="auto"
							mb="auto"
						>
							+
						</Typography>
						<Box
							width="220px"
							height="220px"
							border={'2px solid #3C52BB'}
							borderRadius="480px"
							bgcolor="white"
							pt={12}
						>
							<Typography
								color="primary.main"
								variant="h5"
								fontWeight={500}
							>
								CEO 네트워킹
							</Typography>
						</Box>
						<Typography
							variant="h1"
							color="secondary.dark"
							mt="auto"
							mb="auto"
						>
							=
						</Typography>

						<Box
							width="220px"
							height="220px"
							border={'1px solid #3C52BB'}
							borderRadius="480px"
							bgcolor="primary.main"
							pt={11}
						>
							{' '}
							<Typography
								color="common.white"
								variant="h5"
								fontWeight={500}
							>
								폭넓은 INSIGHT
							</Typography>
							<Typography
								color="common.white"
								variant="h5"
								fontWeight={500}
							>
								성장으로의 발걸음
							</Typography>
						</Box>
					</Box>
				</Box>
			</Box>

			{/** 섹션 7 */}
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
							06
						</Typography>
					</Box>
					<Typography
						variant="h4"
						fontWeight={600}
						mt="auto"
						mb="auto"
					>
						Private IR & Demoday
					</Typography>
				</Box>
				<Box width="100%" height="1.5px" bgcolor={'secondary.light'} />
				<Box
					display="flex"
					justifyContent={'center'}
					mt={10}
					mb={10}
					pt={15}
					pb={15}
					sx={{
						flexWrap: {
							xs: 'wrap',
							sm: 'nowrap',
						},
						gap: {
							xs: 5,
							sm: 0,
						},
					}}
					ml={{
						sm: '100px',
						xs: '0',
					}}
					// bgcolor={'secondary.light'}
				>
					<Box
						display={'flex'}
						flexDirection="column"
						flexWrap={'wrap'}
						gap={4}
						justifyContent={'center'}
					>
						{data1.map((item, index) => {
							return (
								<Box
									p={3.5}
									borderRadius={4}
									width={'280px'}
									height={'160px'}
									boxShadow={
										'rgb(213, 212, 239) 0px 4px 20px'
									}
									textAlign={'center'}
									sx={{
										ml: {
											xs: '0',
											sm: index === 1 && '-100px',
										},
									}}
									// ml={index === 1 && '-100px'}
									bgcolor={'white'}
								>
									<Typography
										color={'primary.main'}
										fontWeight={'600'}
									>
										PROBLEM{' ' + (index + 1)}
									</Typography>
									<Box mt={2.5} textAlign={'center'}>
										<Typography
											variant={'h5'}
											fontWeight={'500'}
										>
											{item.text1}
										</Typography>
										<Typography
											variant={'h5'}
											fontWeight={'500'}
										>
											{item.text2}
										</Typography>
										<Typography
											variant={'h5'}
											fontWeight={'500'}
										>
											{item.text3}
										</Typography>
									</Box>
								</Box>
							);
						})}
					</Box>
					<Box width={'250px'} height={'250px'} mt="auto" mb="auto">
						<img src={'/images/main/solve.png'} alt={'solve'} />
					</Box>

					<Box
						display={'flex'}
						flexDirection="column"
						flexWrap={'wrap'}
						gap={4}
						justifyContent={'center'}
					>
						{data1_1.map((item, index) => {
							return (
								<Box
									p={3}
									borderRadius={4}
									width={'290px'}
									height={'170px'}
									boxShadow={
										'rgb(213, 212, 239) 0px 4px 20px'
									}
									textAlign={'center'}
									bgcolor="#305DDC"
									sx={{
										ml: {
											xs: '0',
											sm: index === 1 && '100px',
										},
									}}
								>
									<Typography
										color={'info.main'}
										fontWeight={'600'}
										variant="h5"
									>
										{item.title}
									</Typography>
									<Box mt={2.5} textAlign={'center'}>
										<Typography
											variant={'h5'}
											fontWeight={'500'}
											color="common.white"
										>
											{item.text1}
										</Typography>
										<Typography
											variant={'h5'}
											fontWeight={'500'}
											color="common.white"
										>
											{item.text2}
										</Typography>
										<Typography
											variant={'h5'}
											fontWeight={'500'}
											color="common.white"
										>
											{item.text3}
										</Typography>
									</Box>
								</Box>
							);
						})}
					</Box>
				</Box>
			</Box>

			<Box>
				<Box
					textAlign={'center'}
					position="absolute"
					bgcolor={'rgba(0, 0, 0, 0.7)'}
					width={'100%'}
					height={'400px'}
					display={'flex'}
					flexDirection={'column'}
					gap={2}
					sx={{ p: { md: 15, xs: 5 } }}
					justifyContent={'center'}
				>
					<Typography color={'white'} variant="h4" fontWeight={'500'}>
						여러분의 사업을 편리하게 관리하세요
					</Typography>
					<Typography color={'white'} variant="subtitle1">
						서포티에서 최적의 솔루션을 제안합니다.
					</Typography>
					<SupportiButton
						contents="무료로 시작하기"
						onClick={() => {
							if (!memberId) {
								router.push('/auth/sign_in');
							} else {
								router.push(
									'/internal_service/financial_solution/account_manage'
								);
							}
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
					style={{ zIndex: -100, width: '100%', height: '400px' }}
					src={'/images/main/mainBackgroundImg.jpg'}
					alt="img"
				/>
			</Box>
		</Box>
	);
};

export default Page;
