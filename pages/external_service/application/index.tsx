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
import { set } from 'date-fns';

const Page: NextPage = () => {
	const router = useRouter();
	const applicationFormController = new DefaultController('ApplicationForm');

	//* States
	/**
	 * 문의 데이터
	 */
	const [name, setName] = React.useState<string>('');
	const [phoneNumber, setPhoneNumber] = React.useState<string>('');
	const [email, setEmail] = React.useState<string>('');
	const [company, setCompany] = React.useState<string>('');
	const [companyType, setCompanyType] = React.useState<string>('스타트업');
	const [request, setRequest] =
		React.useState<string>('자금 조달 및 투자 유치');
	const [description, setDescription] = React.useState<string>('');

	const [apply, setApply] = React.useState<boolean>(false);
	const [openPopUp, setOpenPopUp] = React.useState(false);

	const companyList = [
		{
			label: '스타트업',
			value: '스타트업',
		},
		{
			label: '중소기업',
			value: '중소기업',
		},
		{
			label: '대기업',
			value: '대기업',
		},
	];

	const requestList = [
		{
			label: '자금 조달 및 투자 유치',
			value: '자금 조달 및 투자 유치',
		},
		{
			label: '법인 설립 및 재무 관리',
			value: '법인 설립 및 재무 관리',
		},
		{
			label: '마케팅 및 시장 진입 전략',
			value: '마케팅 및 시장 진입 전략',
		},
		{
			label: '신사업 추진 및 기술 개발',
			value: '신사업 추진 및 기술 개발',
		},
		{
			label: '해외 시장 진출 및 파트너십',
			value: '해외 시장 진출 및 파트너십',
		},
		{
			label: '운영 효율화 및 조직 관리',
			value: '운영 효율화 및 조직 관리',
		},
		{
			label: '기타(직접 입력)',
			value: '기타(직접 입력)',
		},
	];
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
		setCompany('');
		setCompanyType('스타트업');
		setRequest('자금 조달 및 투자 유치');
		setDescription('');
	};

	// 문의 생성
	const createInquiry = async () => {
		if (
			name === '' ||
			phoneNumber === '' ||
			email === '' ||
			company === '' ||
			companyType === '' ||
			request === '' ||
			description === ''
		) {
			alert('모든 항목을 입력해주세요.');
			return;
		}

		applicationFormController.createItem(
			{
				NAME: name,
				EMAIL: email,
				PHONE_NUMBER: phoneNumber,
				COMPANY: company,
				COMPANY_TYPE: companyType,
				REQUEST: request,
				DESCRIPTION: description,
			},
			(res) => {
				setOpenPopUp(false);
				resetInquiryData();
				alert('신청서가 접수되었습니다.');
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
						width={{
							xs: '100%',
							md: '40%',
						}}
						justifyContent={'center'}
						alignSelf={'center'}
						sx={{
							display: 'flex',
							flexDirection: 'column',
							gap: 2,
							p: 2,
							alignItems: 'center',
						}}
						bgcolor={'white'}
					>
						<Typography variant={'h1'} fontWeight={'600'}>
							서비스 신청
						</Typography>
						{/* <Typography variant={'body1'} mb={1}>
							창업가들의 든든한 성공 파트너, Support-T
						</Typography> */}
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
						<TextField
							fullWidth
							value={company}
							type="company"
							onChange={(e) => setCompany(e.target.value)}
							variant={'outlined'}
							sx={{ mb: 2, bgcolor: 'white' }}
							placeholder={'회사명을 입력해주세요.'}
						/>
						<SupportiInput
							dataList={companyList}
							value={companyType}
							setValue={setCompanyType}
							type="select"
							width={{ xs: '100%', md: '100%' }}
						/>
						<SupportiInput
							dataList={requestList}
							value={request}
							setValue={setRequest}
							type="select"
							width={{ xs: '100%', md: '100%' }}
						/>
						<TextField
							fullWidth
							value={description}
							type="description"
							onChange={(e) => setDescription(e.target.value)}
							variant={'outlined'}
							sx={{ mb: 2, bgcolor: 'white' }}
							placeholder={'세부내용을 입력해주세요.'}
						/>

						{/* <Box display={'flex'} flexDirection={'row'}>
							<SupportiInput
								type="checkbox"
								value={apply}
								setValue={setApply}
								label={
									'[필수] 요청하신 문의 내용에 대한 서비스 제공을 위해 필요한 최소한의 개인정보 제공에 동의합니다.'
								}
								width={'100%'}
							/>
						</Box> */}

						<SupportiButton
							contents={'신청하기'}
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
							신청이 완료되었습니다.
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
