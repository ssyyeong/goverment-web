import React from 'react';
import { NextPage } from 'next';

import { Box, Grid, Typography } from '@mui/material';

import { CookieManager } from '@leanoncompany/supporti-utility';

const Page: NextPage = () => {
	const cookie = new CookieManager();
	const locale = cookie.getItemInCookies('LOCALE');

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
							px={{
								xs: 5,
								md: 0,
							}}
						>
							<Typography variant={'h3'} color={'white'}>
								{locale == 'jp'
									? 'Supportiはビジネスマッチングに特化した'
									: '서포티는 비즈니스 매칭에 특화된'}
							</Typography>
							<Typography
								variant={'h3'}
								color="white"
								fontWeight={600}
							>
								{locale == 'jp'
									? '韓日ビジネスプラットフォームです。'
									: '한-일 비즈니스 플랫폼입니다.'}
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
							px={{
								xs: 5,
								md: 0,
							}}
						>
							<Typography
								fontWeight={600}
								mb={1}
								variant="h3"
								color="primary.main"
								sx={{ wordBreak: 'keep-all' }}
							>
								{locale == 'jp'
									? '法人設立-投資誘致-マーケティング-上場まで'
									: '법인 설립-투자유치-마케팅-상장까지'}
							</Typography>
							<Typography
								variant="h4"
								sx={{ wordBreak: 'keep-all' }}
							>
								{locale == 'jp'
									? 'ビジネスの全過程をサポートします。'
									: '비즈니스의 전과정에 도움을 드립니다.'}
							</Typography>
						</Box>
						<Box
							display="flex"
							mt={10}
							flexDirection={'column'}
							alignItems={'center'}
							bgcolor={'primary.light'}
							pt={5}
							px={{
								xs: 5,
								md: 0,
							}}
						>
							<Typography
								fontWeight={600}
								mb={1}
								variant="h3"
								color="primary.main"
							>
								{locale == 'jp'
									? '大韓民国で日本を一番よく知っている専門家が'
									: '대한민국에서 일본을 가장 잘 아는 전문가가'}
							</Typography>
							<Typography variant="h4">
								{locale == 'jp'
									? '専門家の助けを借りてサービスを作っています。'
									: '전문가들의 도움을 받아 서비스를 만들고 있습니다.'}
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
											flexDirection={{
												xs: 'column',
												md: 'row',
											}}
											display={'flex'}
											gap={2}
											alignItems={'center'}
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
													textAlign={'center'}
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
									style={{
										width: 500,
										height: 300,
										alignContent: 'center',
									}}
								/>
								<Typography
									color="primary.main"
									fontWeight={600}
									mb={1}
									variant="h3"
									sx={{ wordBreak: 'keep-all' }}
								>
									{locale == 'jp' ? '法人設立' : '법인설립'}
								</Typography>
								<Typography
									variant="h5"
									fontWeight={400}
									sx={{
										mt: 2,
										lineHeight: 1.5,
									}}
								>
									{locale == 'jp'
										? '日本で最も厳しい支社設立(法人)と口座開設の全ての過程を協業機関と共に代行およびコンサルティングいたします。'
										: '일본에서 가장 까다로운 지사 설립(법인)과 계좌 개설 모든 과정을 협업 기관과 함께 대행 및 컨설팅 해드립니다.'}
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
									style={{
										width: 600,
										height: 300,
										alignContent: 'center',
									}}
								/>
								<Typography
									color="primary.main"
									fontWeight={600}
									mb={1}
									variant="h3"
									sx={{ wordBreak: 'keep-all' }}
								>
									{locale == 'jp'
										? 'ビジネスマッチング'
										: '비즈니스 매칭'}
								</Typography>
								{locale == 'jp' ? (
									<Typography
										variant="h5"
										fontWeight={400}
										sx={{
											mt: 2,
											lineHeight: 1.5,
										}}
									>
										日本のアクセラレータ、大企業、マーケティング会社など多様な機関と提携を結んでおり、ニーズに合わせたマッチングと協業が可能です。
										<br />
										<br />
										現地マネージャーがいて、希望する協業対象企業を探すことができます。
										<br />
										<br />
										マッチング後、実際のビジネスが実現するように専門通訳者があなたのビジネスをサポートすることができます。
									</Typography>
								) : (
									<Typography
										variant="h5"
										fontWeight={400}
										sx={{
											mt: 2,
											lineHeight: 1.5,
										}}
									>
										일본 엑셀러레이터, 대기업, 마케팅 회사
										등 다양한 기관과 제휴를 맺고 있어 니즈에
										맞는 매칭과 협업이 가능합니다. <br />
										<br />
										현지 매니저가 있어 원하는 협업 대상
										기업을 찾아줄 수 있습니다. <br />
										<br />
										매칭 이후 실제 비즈니스가 성사되도록
										전문 통역사가 당신의 비즈니스에 도움을
										줄 수 있습니다.
									</Typography>
								)}
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
									style={{ width: 600, height: 300 }}
								/>
								<Typography
									color="primary.main"
									fontWeight={600}
									mb={1}
									variant="h3"
									sx={{ wordBreak: 'keep-all' }}
								>
									{locale == 'jp'
										? 'オープン·イノベーション'
										: '오픈 이노베이션'}
								</Typography>
								{locale == 'jp' ? (
									<Typography
										variant="h5"
										fontWeight={400}
										sx={{
											mt: 2,
											lineHeight: 1.5,
										}}
									>
										日本企業の 80%
										は、大企業-中小企業間の取引で行われます。
										<br />
										主要大手企業との提携で日本大手と韓国企業のオープンイノベーションを支援します。
									</Typography>
								) : (
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
										주요 대기업과의 제휴로 일본 대기업과
										한국 기업의 오픈 이노베이션을
										지원합니다.
									</Typography>
								)}
							</Box>
						</Box>
					</Box>
				</Grid>
			</Grid>
		</Box>
	);
};

export default Page;
