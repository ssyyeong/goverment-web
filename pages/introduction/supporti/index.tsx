import React from 'react';
import { NextPage } from 'next';

import {
	Box,
	Grid,
	ToggleButton,
	ToggleButtonGroup,
	Typography,
} from '@mui/material';
import SupportiTab from '../../../src/views/global/SupportiTab';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import SupportiButton from '../../../src/views/global/SupportiButton';
import router from 'next/router';
import EastIcon from '@mui/icons-material/East';
import { useAppMember } from '../../../src/hooks/useAppMember';

const Page: NextPage = () => {
	//* Constants
	const TabList = ['창업가를 위한', '투자자를 위한'];

	function SamplePrevArrow(props) {
		const { className, style, onClick } = props;
		return (
			<div
				className={className}
				style={{ ...style, display: 'block', color: 'black' }}
				onClick={onClick}
			>
				<ArrowBackIosNewIcon />
			</div>
		);
	}

	function SampleNextArrow(props) {
		const { className, style, onClick } = props;
		return (
			<div
				className={className}
				style={{ ...style, display: 'block', color: 'black' }}
				onClick={onClick}
			>
				<ArrowForwardIosIcon />
			</div>
		);
	}

	const settings = {
		dots: true,
		infinite: true,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: true,
		nextArrow: <SampleNextArrow />,
		prevArrow: <SamplePrevArrow />,
	};

	const data = [
		{
			srcPath: '/images/logo/partners/신용보증기금.svg',
			alt: '신용보증기금',
		},
		{
			srcPath: '/images/logo/partners/법무법인도울.svg',
			alt: '법무법인도울',
		},
		{
			srcPath: '/images/logo/partners/메타소프트.svg',
			alt: '메타소프트',
		},
		{
			srcPath: '/images/logo/partners/자버.svg',
			alt: '자버',
		},
		{
			srcPath: '/images/logo/partners/교보생명.svg',
			alt: '교보생명',
		},
		{
			srcPath: '/images/logo/partners/나쵸코드.svg',
			alt: '나쵸코드',
		},
		{
			srcPath: '/images/logo/partners/화웨이.svg',
			alt: '화웨이',
		},
		{
			srcPath: '/images/logo/partners/원테이커.svg',
			alt: '원테이커',
		},
	];

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

	//* States
	const [tab, setTab] = React.useState<string>(TabList[0]);

	//* Modules
	const { memberId } = useAppMember();

	//* Hooks

	return (
		<Box
			display="flex"
			flexDirection="column"
			justifyContent="center"
			alignItems="center"
			textAlign="center"
		>
			<Box mt={5}>
				<SupportiTab
					tabList={TabList}
					setValue={setTab}
					value={tab}
					tabContentList={[
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
										m="auto"
										pt={10}
										pb={15}
									>
										<Typography variant={'h3'}>
											스타트업 성장을 위한 모든 기능을
											담았습니다.
										</Typography>
										<Typography
											variant={'h3'}
											color="primary.main"
											fontWeight={600}
										>
											지표/재무관리부터 성장에 필요한 각종
											서비스까지.
										</Typography>
									</Box>
								</Box>
							</Box>

							{/** 섹션 2 */}
							<Grid container justifyContent={'center'}>
								<Box py={5} width="70%">
									<Box display="flex">
										<Box mb={5}>
											<Typography
												fontWeight={600}
												mb={1}
												sx={{ wordBreak: 'keep-all' }}
											>
												법인계좌 연동으로 한눈에 보는
											</Typography>
											<Typography
												color="primary.main"
												variant="h3"
												sx={{ wordBreak: 'keep-all' }}
											>
												RunWay BurnRate
											</Typography>
										</Box>
										<Box
											display={'flex'}
											mb={15}
											justifyContent={'center'}
											flexWrap={'wrap'}
											// sx={{
											// 	display: { xs: 'none', md: 'block' },
											// }}
										>
											<img
												src={
													'/images/main/runwayPC.png'
												}
												alt={'runwayPC'}
												width={'70%'}
											/>
											<img
												src={
													'/images/main/runwayMobile.png'
												}
												alt={'runwayMobile'}
												width={'12%'}
												style={{
													position: 'absolute',
													marginLeft: '35%',
													marginTop: '12%',
												}}
											/>
										</Box>
									</Box>
									<Box display="flex">
										<Box mb={15}>
											<Typography fontWeight={600} mb={1}>
												쉽고 편하게 관리하는
											</Typography>
											<Typography
												color="primary.main"
												variant="h3"
												sx={{ wordBreak: 'keep-all' }}
											>
												OKR / KPI 성과지표
											</Typography>
										</Box>
										<Box
											display={'flex'}
											mb={5}
											justifyContent={'center'}
										>
											<img
												src={'/images/main/okrPC.png'}
												alt={'okrPC'}
												width={'70%'}
											/>
											<img
												src={
													'/images/main/okrMobile.png'
												}
												alt={'okrMobile'}
												width={'12%'}
												style={{
													position: 'absolute',
													marginLeft: '35%',
													marginTop: '12%',
												}}
											/>
										</Box>
									</Box>
								</Box>
							</Grid>

							{/** 섹션 3 */}
							{
								<Box
									sx={{
										display: { xs: 'none', md: 'block' },
										width: '100%',
									}}
								>
									<Box
										width="100%"
										bgcolor={'primary.light'}
										pt={8}
										pb={8}
									>
										<Box
											display="flex"
											gap={20}
											justifyContent={'center'}
										>
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
											gap={10}
											height={'145px'}
											justifyContent={'center'}
										>
											<img
												src={'/images/main/변호사.png'}
												alt={'변호사'}
												width={'145px'}
												height={'145px'}
											/>
											<Box
												textAlign={'center'}
												mt="auto"
												mb="auto"
											>
												<Typography
													variant="h5"
													fontWeight={'600'}
												>
													경영, 투자, 마케팅, 세무,
													노무, 변호사 등
												</Typography>
												<Typography
													variant="h5"
													fontWeight={'600'}
												>
													다양한 분야에서의
												</Typography>
												<Box display="flex" gap={1}>
													<Typography
														variant="h5"
														color="primary.main"
														fontWeight={'600'}
													>
														세미나, 컨설팅, 멘토링,
														QA
													</Typography>
													<Typography
														variant="h5"
														fontWeight={'600'}
													>
														서비스 제공
													</Typography>
												</Box>
											</Box>
											<img
												src={'/images/main/세무.png'}
												alt={'세무'}
												width={'145px'}
												height={'145px'}
											/>
										</Box>
										<Box
											display="flex"
											gap={20}
											justifyContent={'center'}
										>
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
							}
							{
								<Box
									sx={{
										display: { md: 'none', xs: 'block' },
										width: '100%',
									}}
								>
									<Box
										width="100%"
										bgcolor={'primary.light'}
										pt={8}
										pb={8}
									>
										<Box
											textAlign={'center'}
											mt="auto"
											mb="auto"
										>
											<Typography
												variant="h5"
												fontWeight={'600'}
											>
												경영, 투자, 마케팅, 세무, 노무,
												변호사 등
											</Typography>
											<Typography
												variant="h5"
												fontWeight={'600'}
											>
												다양한 분야에서의
											</Typography>
											<Box
												display="flex"
												gap={1}
												width="100%"
												justifyContent={'center'}
											>
												<Typography
													variant="h5"
													color="primary.main"
													fontWeight={'600'}
												>
													세미나, 컨설팅, 멘토링, QA
												</Typography>
												<Typography
													variant="h5"
													fontWeight={'600'}
												>
													서비스 제공
												</Typography>
											</Box>
										</Box>
									</Box>
								</Box>
							}

							{/** 섹션 4 */}
							<Box width="100%" pb={8}>
								<Box ml="auto" mr="auto" mt={20} mb={20}>
									<Box
										display={'flex'}
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
													key={index}
												>
													<Typography
														color={'primary.main'}
														fontWeight={'600'}
													>
														PROBLEM
														{' ' + (index + 1)}
													</Typography>
													<Box
														mt={2.5}
														textAlign={'center'}
													>
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
								</Box>
								<Box width="100px" ml="auto" mr="auto">
									<Typography
										color="secondary.main"
										fontWeight={600}
										variant="h1"
										marginBottom={'-100px'}
										marginTop={'-100px'}
									>
										SOLVE
									</Typography>
									<img
										src={'/images/main/arrow.png'}
										alt="Logo"
										width={'90px'}
										height={'130px'}
									/>
								</Box>
								<Box
									bgcolor={'primary.main'}
									py={1.5}
									textAlign={'center'}
									mt={3}
								>
									<Typography
										fontWeight={600}
										variant="h3"
										color="common.white"
									>
										Private IR 진행과 데모데이 개최
									</Typography>
								</Box>
							</Box>

							{/** 섹션 5 */}
							<Box
								textAlign={'center'}
								display="flex"
								gap={2}
								flexDirection={'column'}
								m="auto"
								pt={10}
								pb={10}
								width={'100%'}
							>
								<Typography variant="h3" fontWeight={'400'}>
									서포티의 파트너가 제공하는
								</Typography>
								<Typography variant="h3">
									혜택 제공 & 파트너사 서비스 할인 제공
								</Typography>
								<Box display="flex" gap={'5%'} mt={5} mb={5}>
									{data.map((item, index) => {
										return (
											<img
												src={item.srcPath}
												alt={item.alt}
												width={'145px'}
												height={'45px'}
											/>
										);
									})}
								</Box>
								<SupportiButton
									contents={'파트너스 페이지 이동'}
									variant="contained"
									onClick={() => router.push('/partners')}
									style={{
										width: '200px',
										marginRight: 'auto',
										marginLeft: 'auto',
									}}
								/>
							</Box>

							{/** 섹션 6 */}

							<Box
								width="100%"
								bgcolor={'#16263D'}
								justifyContent={'center'}
								textAlign={'center'}
								display={'flex'}
								flexDirection={'column'}
							>
								<Box
									m="auto"
									gap={1}
									display={'flex'}
									flexDirection={'column'}
									justifyContent={'center'}
									pt={14}
									pb={10}
								>
									<Box gap={4} display={'flex'}>
										<Box>
											<img
												src={
													'/images/main/커피챗종.png'
												}
												alt={'종'}
												width={'150px'}
												height={'150px'}
												style={{
													marginLeft: 'auto',
													marginRight: 'auto',
													marginBottom: '15px',
												}}
											/>
											<Typography color="common.white">
												커피챗 알람
											</Typography>
										</Box>
										<EastIcon
											sx={{
												color: 'common.white',
												mt: 'auto',
												mb: 'auto',
											}}
										/>
										<Box>
											<img
												src={
													'/images/main/커피챗손.png'
												}
												alt={'손'}
												width={'150px'}
												height={'150px'}
												style={{
													marginLeft: 'auto',
													marginRight: 'auto',
													marginBottom: '15px',
												}}
											/>
											<Typography color="common.white">
												상호 승인 시 커피챗 매칭
											</Typography>
										</Box>
										<EastIcon
											sx={{
												color: 'common.white',
												mt: 'auto',
												mb: 'auto',
											}}
										/>
										<Box>
											<img
												src={'/images/main/커피챗.png'}
												alt={'커피챗'}
												width={'140px'}
												height={'140px'}
												style={{
													marginLeft: 'auto',
													marginRight: 'auto',
													marginBottom: '15px',
												}}
											/>
											<Typography color="common.white">
												커피챗
											</Typography>
										</Box>
									</Box>

									<Typography color="common.white" mt={7}>
										매월 만나고 싶은 사람을 1명씩 ! 무료로
										이용 가능!
									</Typography>
									<Box
										display="flex"
										textAlign={'center'}
										gap={0.5}
										justifyContent={'center'}
									>
										<Typography
											color="info.main"
											variant="h5"
										>
											상시
										</Typography>
										<Typography
											color="common.white"
											mt="auto"
											mb="auto"
										>
											진행
										</Typography>
									</Box>
								</Box>
							</Box>
						</Grid>,
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
										gap={15}
										flexDirection={'column'}
										m="auto"
										pt={10}
										pb={15}
									>
										<Typography variant={'h3'}>
											투자 의사결정에 필요한 모든 기능을
											담았습니다.
										</Typography>
										<Typography
											variant={'h3'}
											color="primary.main"
											fontWeight={600}
										>
											스타트업의 성장지표부터 IR 자료
											확인과 소통까지 한 곳에서.
										</Typography>
										<Typography variant={'h3'}>
											관심있는 분야의 스타트업을 필터링
											해보세요.
										</Typography>
										<img
											src={
												'/images/main/서포티 스타트업 리스트 화면 삽입.jpg'
											}
											alt={'스타트업 리스트'}
											style={{
												marginLeft: 'auto',
												marginRight: 'auto',
												width: '60%',
											}}
										/>
										<Typography variant={'h3'}>
											관심있는 스타트업을 체크하여 나만의
											체크리스트를 구성해보세요.
										</Typography>
										<img
											src={
												'/images/main/스타트업 체크하는 화면 삽입.jpg'
											}
											alt={'스타트업 체킹'}
											style={{
												marginLeft: 'auto',
												marginRight: 'auto',
												width: '60%',
											}}
										/>
										<Typography variant={'h3'}>
											관심있는 스타트업의 성장지표를 한
											눈에 확인하고 미팅을 요청해보세요.
										</Typography>
										<img
											src={
												'/images/main/투자자 관점의 스타트업 성장지표 화면.jpg'
											}
											alt={'성장지표'}
											style={{
												marginLeft: 'auto',
												marginRight: 'auto',
												width: '60%',
											}}
										/>
										<Typography variant={'h3'}>
											서포티에서 개최하는 데모데이에
											참여해보세요.
										</Typography>
										<img
											src={'/images/main/데모데이.png'}
											alt={'데모데이'}
											style={{
												marginLeft: 'auto',
												marginRight: 'auto',
												width: '60%',
											}}
										/>
										<video
										controls
										muted
											style={{
												width: '800px',
												marginLeft: 'auto',
												marginRight: 'auto',
											}}
										>
											<source
												src="/videos/서포티 데모데이 화면.mp4"
												type="video/mp4"
											/>
										</video>
									</Box>
								</Box>
							</Box>
						</Grid>,
					]}
				/>

				{/* <Typography color="secondary.main" variant="h4">
					준비중입니다.
				</Typography> */}
			</Box>
		</Box>
	);
};

export default Page;
