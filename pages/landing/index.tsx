import { Box, Button, Grid, IconButton, Typography } from '@mui/material';
import { NextPage } from 'next';
import React, { useEffect, useRef } from 'react';

import SupportiButton from '../../src/views/global/SupportiButton';
import SupportiModal from '../../src/views/global/SupportiModal';
import CloseIcon from '@mui/icons-material/Close';
import { useAppMember } from '../../src/hooks/useAppMember';
import { useSubscription } from '../../src/hooks/useSubscription';
import { SupportiAlertModal } from '../../src/views/global/SupportiAlertModal';
import { useRouter } from 'next/router';
import PopUpModal from '../../src/views/local/common/PopUpModal/PopUpModal';
import SupportiInput from '../../src/views/global/SupportiInput';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import DefaultController from '@leanoncompany/supporti-ark-office-project/src/controller/default/DefaultController';

const Page: NextPage = () => {
	const router = useRouter();
	const partnerShipInquiryController = new DefaultController(
		'PartnerShipInquiry'
	);

	const containerRef = React.useRef<HTMLDivElement>(null);

	const [openPopUp, setOpenPopUp] = React.useState(false);
	const [name, setName] = React.useState('');
	const [email, setEmail] = React.useState('');
	const [phoneNumber, setPhoneNumber] = React.useState('');

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

	const createInquiry = async () => {
		partnerShipInquiryController.createItem(
			{
				NAME: name,
				EMAIL: email,
				PHONE_NUMBER: phoneNumber,
			},
			(res) => {
				setOpenPopUp(false);
				alert('문의가 접수되었습니다.');
			}
		);
	};

	useEffect(() => {
		const timer = setInterval(() => {
			containerRef?.current?.scrollBy({
				left: 300,
				behavior: 'smooth',
			});
			if (containerRef.current.scrollLeft >= 1200) {
				containerRef?.current?.scrollBy({
					left: -1500,
					behavior: 'smooth',
				});
			}
		}, 3000);

		return () => clearTimeout(timer);
	});

	return (
		<Box
			sx={{
				width: '100%',
				height: '100%',
				alignItems: 'center',
			}}
		>
			<img
				src="/images/main/container.jpg"
				width={'100%'}
				height={'100%'}
			></img>
			<Box
				top={'50%'}
				position={'absolute'}
				width={'100%'}
				left={'auto'}
				textAlign={'center'}
			>
				<Typography variant={'h1'} fontWeight={'400'} color={'white'}>
					It makes your company’s dream come true
				</Typography>
				<Typography
					variant={'h2'}
					fontWeight={'400'}
					color={'white'}
					mt={1}
				>
					고객님의 하나뿐인,
				</Typography>
				<Typography variant={'h1'} color={'white'} mt={1}>
					스타트업 성장 관리 솔루션
				</Typography>
				<Typography
					variant={'h2'}
					fontWeight={'400'}
					color={'white'}
					mt={1}
				>
					서포티는 스타트업과
				</Typography>
				<Typography
					variant={'h2'}
					fontWeight={'400'}
					color={'white'}
					mt={1}
				>
					함께 성장하는 동행자입니다.
				</Typography>
			</Box>
			{/* 연혁 섹션 */}
			<Box display="flex">
				<img
					src="/images/main/history.svg"
					width={'100%'}
					height={'100%'}
					style={{
						paddingLeft: '8%',
					}}
				/>
			</Box>
			{/* 파트너스 소개 섹션 */}
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
				<Box
					display="flex"
					justifyContent="center"
					alignContent="center"
				>
					<IconButton
						onClick={() => {
							containerRef?.current?.scrollBy({
								left: -300,
								behavior: 'smooth',
							});
						}}
					>
						<KeyboardArrowLeftIcon />
					</IconButton>
					<Box
						ref={containerRef}
						style={{
							paddingBottom: 42,
							paddingTop: 30,
							overflowX: 'auto',
						}}
						sx={{
							'&::-webkit-scrollbar': {
								display: 'none',
							},
						}}
					>
						<Box
							display="flex"
							gap={'15%'}
							mt={5}
							mb={5}
							ml={5}
							maxWidth={'60vw'}
						>
							{data.map((item, index) => {
								return (
									<img
										src={item.srcPath}
										alt={item.alt}
										width={'300px'}
										height={'60px'}
									/>
								);
							})}
						</Box>
					</Box>
					<IconButton
						onClick={() => {
							containerRef?.current?.scrollBy({
								left: 300,
								behavior: 'smooth',
							});
						}}
					>
						<KeyboardArrowRightIcon />
					</IconButton>
				</Box>

				{/* 제휴문의 섹션 */}
				<Grid item xs={12}>
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
						<Typography
							color={'white'}
							variant="h4"
							fontWeight={'500'}
						>
							여러분의 사업을 편리하게 관리하세요
						</Typography>
						<Typography color={'white'} variant="subtitle1">
							서포티에서 최적의 솔루션을 제안합니다.
						</Typography>
						<SupportiButton
							contents="제휴 문의"
							onClick={() => {
								setOpenPopUp(true);
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
				</Grid>
				{/* 제휴 문의 팝업 */}
				<PopUpModal
					modalOpen={openPopUp}
					setModalOpen={setOpenPopUp}
					uiData={
						<Box
							display={'flex'}
							justifyContent={'space-between'}
							flexDirection={'column'}
							gap={3}
						>
							<Box display="flex" justifyContent={'center'}>
								<Typography
									variant="subtitle1"
									fontWeight={600}
									mt="auto"
									mb="auto"
								>
									문의하기
								</Typography>
								<CloseIcon
									sx={{
										cursor: 'pointer',
										position: 'absolute',
										right: 20,
										top: 15,
									}}
									onClick={() => setOpenPopUp(false)}
								/>
							</Box>
							<Box display="flex" justifyContent="space-between">
								<Typography
									variant="subtitle1"
									fontWeight={600}
									mt="auto"
									mb="auto"
								>
									이름
								</Typography>
								<SupportiInput
									type="input"
									additionalProps={{
										placeholder: '이름을 입력하세요.',
									}}
									value={name}
									setValue={setName}
									width={'85%'}
								/>
							</Box>
							<Box display="flex" justifyContent="space-between">
								<Typography
									variant="subtitle1"
									fontWeight={600}
									mt="auto"
									mb="auto"
								>
									이메일
								</Typography>
								<SupportiInput
									type="input"
									additionalProps={{
										placeholder: '이메일을 입력하세요.',
									}}
									value={email}
									setValue={setEmail}
									width={'85%'}
								/>
							</Box>
							<Box display="flex" justifyContent="space-between">
								<Typography
									variant="subtitle1"
									fontWeight={600}
									mt="auto"
									mb="auto"
								>
									연락처
								</Typography>
								<SupportiInput
									type="input"
									additionalProps={{
										placeholder: '연락처를 입력하세요.',
									}}
									value={phoneNumber}
									setValue={setPhoneNumber}
									width={'85%'}
								/>
							</Box>

							<Box display={'flex'} gap={2}>
								<SupportiButton
									contents={'문의하기'}
									variant="contained"
									onClick={() => createInquiry()}
									style={{
										width: '150px',
										marginRight: 'auto',
										marginLeft: 'auto',
									}}
								/>
								<SupportiButton
									contents={'닫기'}
									variant="outlined"
									onClick={() => setOpenPopUp(false)}
									style={{
										width: '150px',
										marginRight: 'auto',
										marginLeft: 'auto',
									}}
								/>
							</Box>
						</Box>
					}
				/>
			</Box>
		</Box>
	);
};

export default Page;
