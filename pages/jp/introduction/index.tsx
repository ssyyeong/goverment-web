import React from 'react';
import { NextPage } from 'next';

import { Box, Grid, Typography } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useAppMember } from '../../../src/hooks/useAppMember';

const Page: NextPage = () => {
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
			text1: '김영진',
			text2: '서포티 대표',
			text3: '서포티 일본 자사 대표',
		},
		{
			text1: '김윤경',
			text2: '서포티 일본 총괄 및 서포티 어드바이저',
			text3: '유니 플랫폼 대표',
			text4: '소프트뱅크 고장',
		},
	];

	//* Modules
	const { memberId } = useAppMember();

	//* Hooks

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
							sx={{
								backgroundImage: `url(/images/main/matching.jpg)`,
								backgroundSize: 'cover',
								width: '100%',
							}}
						>
							<Typography variant={'h3'} color={'white'}>
								서포티는 비즈니스 매칭에 특화된
							</Typography>
							<Typography
								variant={'h3'}
								color="white"
								fontWeight={600}
							>
								한-일 비즈니스 플랫폼입니다.
							</Typography>
						</Box>
					</Box>
				</Box>

				{/** 섹션 2 */}
				<Grid container justifyContent={'center'}>
					<Box pt={5} width={'100%'}>
						<Box
							display="flex"
							my={5}
							flexDirection={'column'}
							alignItems={'center'}
						>
							<Typography
								fontWeight={600}
								mb={1}
								variant="h3"
								color="primary.main"
								sx={{ wordBreak: 'keep-all' }}
							>
								법인 설립-투자유치-마케팅-상장까지
							</Typography>
							<Typography
								variant="h4"
								sx={{ wordBreak: 'keep-all' }}
							>
								비즈니스의 전과정에 도움을 드립니다.
							</Typography>
						</Box>
						<Box
							display="flex"
							mt={10}
							flexDirection={'column'}
							alignItems={'center'}
							bgcolor={'primary.light'}
							pt={5}
						>
							<Typography
								fontWeight={600}
								mb={1}
								variant="h3"
								color="primary.main"
							>
								대한민국에서 일본을 가장 잘 아는 전문가가
							</Typography>
							<Typography
								variant="h4"
								sx={{ wordBreak: 'keep-all' }}
							>
								전문가들의 도움을 받아 서비스를 만들고 있습니다.
							</Typography>
						</Box>
					</Box>
				</Grid>
				{/** 섹션 4 */}
				<Box width="100%" pb={8} bgcolor={'primary.light'}>
					<Box ml="auto" mr="auto" mt={10} mb={2}>
						<Box
							display={'flex'}
							flexWrap={'wrap'}
							gap={4}
							justifyContent={'center'}
						>
							{data1.map((item, index) => {
								return (
									<Box
										width={'70%'}
										mx={5}
										px={3}
										py={2}
										borderRadius={4}
										bgcolor={'white'}
										boxShadow={
											'rgb(213, 212, 239) 0px 4px 20px'
										}
										key={index}
									>
										<Box
											flexDirection={'row'}
											display={'flex'}
											gap={2}
										>
											<img
												src="/images/main/노무.png"
												alt="mentor"
												style={{
													width: 100,
													height: 100,
												}}
											/>
											<Box
												display="flex"
												flexDirection={'column'}
											>
												<Typography
													variant={'h4'}
													fontWeight={'600'}
													mb={2}
												>
													{item.text1}
												</Typography>
												<Typography
													color={'gray'}
													fontWeight={'600'}
													variant="h6"
												>
													{item.text2}
												</Typography>
												<Typography
													variant="h6"
													color={'gray'}
													fontWeight={'600'}
												>
													{item.text3}
												</Typography>
												<Typography
													variant="h6"
													color={'gray'}
													fontWeight={'600'}
												>
													{item.text4}
												</Typography>
											</Box>
										</Box>
									</Box>
								);
							})}
						</Box>
					</Box>
				</Box>
				{/** 섹션 5 */}
				<Grid container justifyContent={'center'}>
					<Box p={5} mt={5}>
						<Box
							display="flex"
							flexDirection={'row'}
							justifyContent={'space-between'}
							gap={4}
							alignItems={'center'}
						>
							<Box
								display="flex"
								flexDirection={'column'}
								gap={2}
							>
								<img
									src="/images/main/graph.jpg"
									alt="법인설립"
									style={{ width: '100%', height: 'auto' }}
								/>
								<Typography
									color="primary.main"
									fontWeight={600}
									mb={1}
									variant="h3"
									sx={{ wordBreak: 'keep-all' }}
								>
									법인설립
								</Typography>
								<Typography
									variant="h5"
									fontWeight={400}
									sx={{
										wordBreak: 'keep-all',
										mt: 2,
										lineHeight: 1.5,
									}}
								>
									일본에서 가장 까다로운 지사 설립(법인)과
									계좌 개설 모든 과정을 협업 기관과 함께 대행
									및 컨설팅 해드립니다.
								</Typography>
							</Box>
						</Box>
					</Box>
				</Grid>

				{/** 섹션 6 */}
				<Grid container justifyContent={'center'}>
					<Box p={5} mt={5} bgcolor={'primary.light'}>
						<Box
							mb={3}
							display="flex"
							flexDirection={'row'}
							justifyContent={'space-between'}
							gap={4}
							alignItems={'center'}
						>
							<Box
								display="flex"
								flexDirection={'column'}
								gap={2}
							>
								<img
									src="/images/main/consulting.jpg"
									alt="비즈니스 매칭"
									style={{ width: '100%', height: 'auto' }}
								/>
								<Typography
									color="primary.main"
									fontWeight={600}
									mb={1}
									variant="h3"
									sx={{ wordBreak: 'keep-all' }}
								>
									비즈니스 매칭
								</Typography>
								<Typography
									variant="h5"
									fontWeight={400}
									sx={{
										wordBreak: 'keep-all',
										mt: 2,
										lineHeight: 1.5,
									}}
								>
									일본 엑셀러레이터, 대기업, 마케팅 회사 등
									다양한 기관과 제휴를 맺고 있어 니즈에 맞는
									매칭과 협업이 가능합니다. <br />
									<br />
									현지 매니저가 있어 원하는 협업 대상 기업을
									찾아줄 수 있습니다. <br />
									<br />
									매칭 이후 실제 비즈니스가 성사되도록 전문
									통역사가 당신의 비즈니스에 도움을 줄 수
									있습니다.
								</Typography>
							</Box>
						</Box>
					</Box>
				</Grid>
				{/** 섹션 7 */}
				<Grid container justifyContent={'center'}>
					<Box p={5} mt={5}>
						<Box
							mb={3}
							display="flex"
							flexDirection={'row'}
							justifyContent={'space-between'}
							gap={4}
							alignItems={'center'}
						>
							<Box
								display="flex"
								flexDirection={'column'}
								gap={2}
							>
								<img
									src="/images/main/innovation.jpg"
									alt="오픈 이노베이션"
									style={{ width: '100%', height: 'auto' }}
								/>
								<Typography
									color="primary.main"
									fontWeight={600}
									mb={1}
									variant="h3"
									sx={{ wordBreak: 'keep-all' }}
								>
									오픈 이노베이션
								</Typography>
								<Typography
									variant="h5"
									fontWeight={400}
									sx={{
										wordBreak: 'keep-all',
										mt: 2,
										lineHeight: 1.5,
									}}
								>
									일본 기업의 80%는 대기업-중소기업 간의
									거래에서 이루어집니다. <br />
									주요 대기업과의 제휴로 일본 대기업과 한국
									기업의 오픈 이노베이션을 지원합니다.
								</Typography>
							</Box>
						</Box>
					</Box>
				</Grid>
			</Grid>
		</Box>
	);
};

export default Page;
