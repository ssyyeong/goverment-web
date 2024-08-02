import React from 'react';
import { NextPage } from 'next';

import { Box, Grid, Switch, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import SupportiButton from '../../../src/views/global/SupportiButton';
import { useRouter } from 'next/router';
import PopUpModal from '../../../src/views/local/common/PopUpModal/PopUpModal';
import SupportiInput from '../../../src/views/global/SupportiInput';
import SupportiToggle from '../../../src/views/global/SupportiToggle';

const Page: NextPage = () => {
	const router = useRouter();

	const [openPopUp, setOpenPopUp] = React.useState(false);
	const [name, setName] = React.useState('');
	const [company, setCompany] = React.useState('');
	const [phoneNumber, setPhoneNumber] = React.useState('');
	const [email, setEmail] = React.useState('');
	const [business, setBusiness] = React.useState('');
	const [visibleLanguage, setVisibleLanguage] = React.useState(false);
	const [field, setField] = React.useState('');
	const [useService, setUseService] = React.useState(false);

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
			}}
		>
			<Box width={'100%'}>
				<Box display="flex" gap={2} flexDirection={'column'} m="auto">
					<Box
						textAlign={'center'}
						display="flex"
						flexDirection={'column'}
						py={15}
						sx={{
							backgroundImage: `url(/images/main/office.jpg)`,
							backgroundSize: 'cover',
							width: '100%',
						}}
					>
						<Typography
							variant={'h5'}
							fontWeight={600}
							color={'white'}
						>
							어떤 비즈니스 상대를 원하시나요?
						</Typography>
					</Box>
				</Box>
			</Box>
			<Box
				display="flex"
				flexDirection={'column'}
				width={'100%'}
				p={10}
				justifyContent={'center'}
				alignItems={'center'}
				gap={{
					xs: 2,
					md: 5,
				}}
			>
				<Box
					display="flex"
					flexDirection={{
						xs: 'column',
						md: 'row',
					}}
					justifyContent={'space-between'}
					alignItems={'center'}
					width={'100%'}
				>
					<Box
						display="flex"
						flexDirection={'row'}
						alignItems={'center'}
						gap={2}
						width={{
							xs: '100%',
							md: '50%',
						}}
					>
						<img
							src={'/images/main/투자.png'}
							alt={'투자'}
							width={'100px'}
							height={'100px'}
						/>
						<Typography variant={'h5'} fontWeight={600}>
							투자유치
						</Typography>
					</Box>
					<Box
						display="flex"
						flexDirection={'row'}
						alignItems={'center'}
						gap={2}
						width={{
							xs: '100%',
							md: '50%',
						}}
					>
						<img
							src={'/images/main/마케팅.png'}
							alt={'투자'}
							width={'100px'}
							height={'100px'}
						/>
						<Typography variant={'h5'} fontWeight={600}>
							마케팅
						</Typography>
					</Box>
				</Box>
				<Box
					display="flex"
					flexDirection={{
						xs: 'column',
						md: 'row',
					}}
					justifyContent={'space-between'}
					alignItems={'center'}
					width={'100%'}
				>
					<Box
						display="flex"
						flexDirection={'row'}
						alignItems={'center'}
						gap={2}
						width={{
							xs: '100%',
							md: '50%',
						}}
					>
						<img
							src={'/images/main/노무.png'}
							alt={'M&A'}
							width={'100px'}
							height={'100px'}
						/>
						<Typography variant={'h5'} fontWeight={600}>
							M&A
						</Typography>
					</Box>
					<Box
						display="flex"
						flexDirection={'row'}
						alignItems={'center'}
						width={{
							xs: '100%',
							md: '50%',
						}}
						gap={2}
					>
						<img
							src={'/images/main/세무.png'}
							alt={'영업 대행'}
							width={'100px'}
							height={'100px'}
						/>
						<Typography variant={'h5'} fontWeight={600}>
							영업 대행
						</Typography>
					</Box>
				</Box>
				<Typography
					variant={'h5'}
					fontWeight={600}
					textAlign={'center'}
				>
					믿을 수 있는 파트너를 찾아드립니다.
				</Typography>
				<Typography
					variant={'subtitle1'}
					fontWeight={600}
					textAlign={'center'}
				>
					미팅 성사 시에만 지불, 성사 불가 시 100% 환불해 진행합니다.
				</Typography>
				<SupportiButton
					contents="매칭 바로 가기"
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
				{/* 제휴 문의 팝업 */}
				<PopUpModal
					modalOpen={openPopUp}
					setModalOpen={setOpenPopUp}
					uiData={
						<Box
							display={'flex'}
							justifyContent={'space-between'}
							flexDirection={'column'}
							gap={2}
						>
							<Box display="flex" justifyContent={'center'}>
								<Typography
									variant="subtitle1"
									fontWeight={600}
									mt="auto"
									mb="auto"
								>
									설문조사
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
							<Box
								display="flex"
								gap={1}
								flexDirection={'column'}
							>
								<Typography variant="body1" fontWeight={600}>
									이름
								</Typography>
								<SupportiInput
									type="input"
									additionalProps={{
										placeholder: '이름을 입력하세요.',
									}}
									value={name}
									setValue={setName}
								/>
							</Box>
							<Box
								display="flex"
								gap={1}
								flexDirection={'column'}
							>
								<Typography variant="body1" fontWeight={600}>
									회사명
								</Typography>
								<SupportiInput
									type="input"
									additionalProps={{
										placeholder: '회사명을 입력하세요.',
									}}
									value={company}
									setValue={setCompany}
								/>
							</Box>
							<Box
								display="flex"
								gap={1}
								flexDirection={'column'}
							>
								<Typography variant="body1" fontWeight={600}>
									전화번호
								</Typography>
								<SupportiInput
									type="input"
									additionalProps={{
										placeholder: '전화번호를 입력하세요.',
									}}
									value={phoneNumber}
									setValue={setPhoneNumber}
								/>
							</Box>
							<Box
								display="flex"
								gap={1}
								flexDirection={'column'}
							>
								<Typography variant="body1" fontWeight={600}>
									이메일
								</Typography>
								<SupportiInput
									type="input"
									additionalProps={{
										placeholder: '이메일을 입력하세요.',
									}}
									value={email}
									setValue={setEmail}
								/>
							</Box>
							<Box
								display="flex"
								gap={1}
								flexDirection={'column'}
							>
								<Typography variant="body1" fontWeight={600}>
									사업명
								</Typography>
								<SupportiInput
									type="input"
									additionalProps={{
										placeholder: '사업명을 입력하세요.',
									}}
									value={business}
									setValue={setBusiness}
								/>
							</Box>
							<Box
								display="flex"
								gap={1}
								flexDirection={'column'}
							>
								<Typography variant="body1" fontWeight={600}>
									일본어 또는 영어 가능 여부
								</Typography>
								<Typography
									variant="body1"
									fontWeight={600}
									color={'gray'}
								>
									(비즈니스 대화 수준의 영어, 일어)
								</Typography>
								<Switch
									checked={visibleLanguage}
									onChange={() =>
										setVisibleLanguage(!visibleLanguage)
									}
									color="primary"
								/>
							</Box>
							<Box
								display="flex"
								gap={1}
								flexDirection={'column'}
							>
								<Typography variant="body1" fontWeight={600}>
									매칭 원하는 분야
								</Typography>
								<SupportiInput
									type="input"
									additionalProps={{
										placeholder: '분야를 입력하세요.',
									}}
									value={field}
									setValue={setField}
								/>
							</Box>
							<Box
								display="flex"
								gap={1}
								flexDirection={'column'}
							>
								<Typography variant="body1" fontWeight={600}>
									매칭 프리미엄 서비스 이용 여부
								</Typography>
								<Typography
									variant="body1"
									fontWeight={600}
									color={'gray'}
									sx={{ lineHeight: 1.2 }}
								>
									매칭 이후 통역사와 연결해 만남까지 동행하는
									서비스입니다. (추가 2만엔 비용 발생) <br />
									1회 매칭 시 최소 3만엔 ~6만엔의 비용이
									발생하며 상호 동의 후 선입금 시 서비스가
									진행됩니다.
								</Typography>
								<Switch
									checked={visibleLanguage}
									onChange={() =>
										setVisibleLanguage(!visibleLanguage)
									}
									color="primary"
								/>
							</Box>

							<Box display={'flex'} gap={2}>
								<SupportiButton
									contents={'제출하기'}
									variant="contained"
									onClick={() => {}}
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
