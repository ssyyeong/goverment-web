import { NextPage } from 'next';
import React, { useEffect } from 'react';

import { Box, Grid, IconButton, TextField, Typography } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import DefaultController from '@leanoncompany/supporti-ark-office-project/src/controller/default/DefaultController';

import SupportiButton from '../../../src/views/global/SupportiButton';
import { useRouter } from 'next/router';
import SupportiInput from '../../../src/views/global/SupportiInput';
import PopUpModal from '../../../src/views/local/common/PopUpModal/PopUpModal';

const Page: NextPage = () => {
	const router = useRouter();
	const partnerShipInquiryController = new DefaultController(
		'PartnerShipInquiry'
	);

	//* States
	/**
	 * 문의 데이터
	 */
	const [name, setName] = React.useState<string>('');
	const [phoneNumber, setPhoneNumber] = React.useState<string>('');
	const [email, setEmail] = React.useState<string>('');

	const [apply, setApply] = React.useState<boolean>(false);
	const [openPopUp, setOpenPopUp] = React.useState(false);

	//* Functions
	//BurnRate 섹션 화살표 커스텀
	//* Functions
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

	// 문의 데이터 초기화
	const resetInquiryData = () => {
		setName('');
		setEmail('');
		setPhoneNumber('');
	};

	// 문의 생성
	const createInquiry = async () => {
		partnerShipInquiryController.createItem(
			{
				NAME: name,
				EMAIL: email,
				PHONE_NUMBER: phoneNumber,
			},
			(res) => {
				setOpenPopUp(false);
				resetInquiryData();
				alert('문의가 접수되었습니다.');
			}
		);
	};

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

	return (
		<Box
			sx={{
				width: '100%',
				display: 'flex',
				flexDirection: 'column',
			}}
		>
			<Box
				sx={{
					backgroundImage: `url(/images/apistore/background.svg)`,
					backgroundSize: 'cover',
				}}
				width={'100%'}
				height={'50vh'}
			>
				{/* 메인 이미지 텍스트 섹션 */}
				<Box
					width={'100%'}
					textAlign={'center'}
					display={'flex'}
					flexDirection={'column'}
					justifyContent={'center'}
					sx={{
						height: '100%',
					}}
				>
					<Typography variant={'h1'} fontWeight={'600'}>
						API store
					</Typography>
					<Typography variant={'h2'} fontWeight={'400'} mt={1}>
						국내최초 MVP 전문 API store{' '}
					</Typography>
					<Box
						display={'flex'}
						justifyContent={'center'}
						mt={2}
						flexDirection={'row'}
						gap={2}
					>
						<Box
							display={'flex'}
							flexDirection={'column'}
							justifyContent={'center'}
							width={120}
							height={120}
							bgcolor={'white'}
							alignItems={'center'}
							p={5}
							borderRadius={5}
						>
							<SentimentSatisfiedAltIcon sx={{ fontSize: 30 }} />
							<Typography
								variant={'h6'}
								fontWeight={'600'}
								mt={2}
							>
								API명
							</Typography>
						</Box>
						<Box
							display={'flex'}
							flexDirection={'column'}
							justifyContent={'center'}
							width={120}
							height={120}
							bgcolor={'white'}
							alignItems={'center'}
							p={5}
							borderRadius={5}
						>
							<SentimentSatisfiedAltIcon sx={{ fontSize: 30 }} />
							<Typography
								variant={'h6'}
								fontWeight={'600'}
								mt={2}
							>
								API명
							</Typography>
						</Box>
					</Box>
				</Box>
			</Box>
			{/* 섹션2 */}
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					gap: 2,
					p: 2,
					mt: 2,
					alignItems: 'center',
				}}
			>
				<Typography variant={'h4'} fontWeight={'600'}>
					국내 최초
				</Typography>
				<Typography
					variant={'h4'}
					fontWeight={'600'}
					color={'primary.main'}
				>
					MVP 전문 API Store
				</Typography>
				<img
					src="/images/apistore/description.png"
					alt="img4"
					width={600}
				/>
				<img
					src="/images/apistore/avartar.svg"
					alt="avatar"
					width={300}
					height={200}
				/>
			</Box>
			{/* 섹션3 */}
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					gap: 2,
					p: 2,
					mt: 2,
					bgcolor: 'primary.light',
					alignItems: 'center',
				}}
			>
				<Typography
					variant={'h4'}
					fontWeight={'600'}
					sx={{
						color: 'primary.main',
						border: '1px solid #305ddc',
						borderRadius: 5,
						py: 1,
						px: 2,
					}}
				>
					API Market
				</Typography>
				<Typography variant={'h2'} fontWeight={'600'} mb={5}>
					초기 스타트업을 위한 단 하나의 서비스
				</Typography>
				<img src="/images/apistore/img1.svg" alt="img1" width={700} />
				<img src="/images/apistore/img2.svg" alt="img2" width={700} />
				<img src="/images/apistore/img3.svg" alt="img3" width={700} />

				<Box
					display={'flex'}
					flexDirection={'column'}
					justifyContent={'center'}
					alignItems={'center'}
					gap={2}
				>
					<Typography variant={'h2'} fontWeight={'600'} mt={10}>
						쉽고 간단한 프로세스
					</Typography>
					<Box
						display={'flex'}
						flexDirection={{
							xs: 'column',
							md: 'row',
						}}
						textAlign={'center'}
						gap={1}
					>
						<Typography variant={'h4'}>
							회사 내 주니어 개발자만으로
						</Typography>
						<Typography variant={'h4'} color={'primary.main'}>
							서비스를 무리없이
						</Typography>
						<Typography variant={'h4'}>
							만들 수 있습니다.
						</Typography>
					</Box>
					<Box
						display={'flex'}
						flexDirection={{
							xs: 'column',
							md: 'row',
						}}
						gap={1}
						textAlign={'center'}
					>
						<Typography variant={'h4'}>
							개발자가 없으시다면 저희가
						</Typography>
						<Typography variant={'h4'} color={'primary.main'}>
							A to Z
						</Typography>
						<Typography variant={'h4'}>도와드립니다.</Typography>
					</Box>
				</Box>
			</Box>
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					gap: 2,
					p: 2,
					mt: 20,
					alignItems: 'center',
				}}
				textAlign={'center'}
			>
				<Typography variant={'h2'} fontWeight={'600'}>
					도입 고객사
				</Typography>
				<Box
					display={'flex'}
					justifyContent={'center'}
					mt={2}
					gap={2}
					flexDirection={'column'}
				>
					{/* <Box
						display={'flex'}
						flexDirection={'column'}
						justifyContent={'center'}
						width={120}
						height={80}
						bgcolor={'white'}
						alignItems={'center'}
						borderRadius={5}
						border={'1px solid #c8c8c8'}
						px={1}
					>
						<img
							src="/images/logo/partners/교보생명.svg"
							alt="logo"
							width={120}
							height={80}
							style={{
								objectFit: 'fill',
							}}
						/>
					</Box> */}
					<img
						src="/images/apistore/partners.svg"
						alt="logo"
						width={700}
						style={{
							objectFit: 'fill',
						}}
					/>
					<Typography
						variant={'h4'}
						fontWeight={'600'}
						color={'primary.main'}
						textAlign={'center'}
					>
						스타트업부터 대기업 SI, AI 개발 회사까지
					</Typography>
					<Typography
						variant={'h4'}
						fontWeight={'600'}
						textAlign={'center'}
					>
						오픈 직전부터 많은 회사들이 사용하고 있습니다.
					</Typography>
				</Box>
			</Box>
			<Box
				mt={10}
				sx={{
					backgroundImage: `url(/images/apistore/bgImg.svg)`,
					backgroundSize: 'cover',
				}}
				width={'100%'}
				height={'90vh'}
			>
				<Box
					display={'flex'}
					flexDirection={'column'}
					justifyContent={'center'}
					alignItems={'center'}
					width={'100%'}
					height={'100%'}
				>
					<Box
						width={500}
						height={600}
						justifyContent={'center'}
						alignSelf={'center'}
						sx={{
							display: 'flex',
							flexDirection: 'column',
							gap: 2,
							p: 10,
							mt: 2,
							alignItems: 'center',
						}}
						bgcolor={'white'}
					>
						<Typography variant={'h1'} fontWeight={'600'}>
							서비스 문의
						</Typography>
						<Typography variant={'body1'} mb={1}>
							창업가들의 든든한 성공 파트너, Support-T
						</Typography>
						<TextField
							fullWidth
							value={name}
							type="name"
							onChange={(e) => setName(e.target.value)}
							variant={'outlined'}
							sx={{ mb: 2, bgcolor: 'white' }}
							placeholder={'이름을 입력해주세요.'}
						/>
						<TextField
							fullWidth
							value={phoneNumber}
							type="company"
							onChange={(e) => setPhoneNumber(e.target.value)}
							variant={'outlined'}
							sx={{ mb: 2, bgcolor: 'white' }}
							placeholder={'연락처를 입력해주세요.'}
						/>
						<TextField
							fullWidth
							value={email}
							type="email"
							onChange={(e) => setEmail(e.target.value)}
							variant={'outlined'}
							sx={{ mb: 2, bgcolor: 'white' }}
							placeholder={'이메일주소를 입력해주세요.'}
						/>
						<Box display={'flex'} flexDirection={'row'}>
							<SupportiInput
								type="checkbox"
								value={apply}
								setValue={setApply}
								label={
									'[필수] 요청하신 문의 내용에 대한 서비스 제공을 위해 필요한 최소한의 개인정보 제공에 동의합니다.'
								}
								width={'100%'}
							/>
						</Box>

						<SupportiButton
							contents={'문의하기'}
							onClick={() => {
								createInquiry();
							}}
							variant={'contained'}
							color={'primary'}
							style={{
								width: 150,
							}}
						/>
					</Box>
				</Box>
			</Box>
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
						<Typography
							variant="subtitle1"
							fontWeight={600}
							textAlign={'center'}
						>
							문의가 완료되었습니다.
						</Typography>

						<Box display={'flex'} gap={2}>
							<SupportiButton
								contents={'닫기'}
								variant="contained"
								onClick={() => {
									setOpenPopUp(false);
								}}
								style={{
									width: '150px',
									height: '30px',
								}}
							/>
						</Box>
					</Box>
				}
			/>
		</Box>
	);
};

export default Page;
