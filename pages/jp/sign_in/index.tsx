import React, { useEffect } from 'react';

import { NextPage } from 'next';

import { Box, Button, Link, TextField, Typography } from '@mui/material';
import SupportiButton from '../../../src/views/global/SupportiButton';
import { useRouter } from 'next/router';
import { CookieManager } from '@leanoncompany/supporti-utility';
import DefaultController from '@leanoncompany/supporti-ark-office-project/src/controller/default/DefaultController';
import SupportiInput from '../../../src/views/global/SupportiInput';
import PopUpModal from '../../../src/views/local/common/PopUpModal/PopUpModal';
import CloseIcon from '@mui/icons-material/Close';

const Page: NextPage = () => {
	//* Modules
	const appMemberJpController = new DefaultController('AppMemberJp');
	const router = useRouter();
	const cookie = new CookieManager();
	const locale = cookie.getItemInCookies('LOCALE');

	//* States
	/**
	 * 로그인 데이터
	 */
	const [name, setName] = React.useState<string>('');
	const [gender, setGender] = React.useState<string>(
		locale == 'jp' ? '男性' : '남성'
	);
	const [age, setAge] = React.useState<string>('');
	const [company, setCompany] = React.useState<string>('');
	// const [email, setEmail] = React.useState<string>('');
	// const [phoneNumber, setPhoneNumber] = React.useState<string>('');
	const [establishmentDate, setEstablishmentDate] =
		React.useState<string>('');
	const [investSector, setInvestSector] = React.useState<string>(
		locale == 'jp' ? '該当なし' : '해당 없음'
	);
	const [isAgree, setIsAgree] = React.useState<boolean>(false);

	const [openPopUp, setOpenPopUp] = React.useState(false);
	/**
	 * 약관 내용 저장하는 상태값
	 */
	const [terms, setTerms] = React.useState<string>(
		locale == 'jp'
			? '1. 個人情報の収集及び利用目的\nサービス提供及び管理(会員登録、ログイン、サービス利用、サービス改善)\nマーケティング及び広告目的(カスタマイズ型サービス提供、イベント案内など)\n2. 収集する個人情報項目\n必須項目: 名前、性別、連絡先など\n3. 個人情報の保有及び利用期間\n会員退会時まで個人情報を保有'
			: '1. 개인정보 수집 및 이용 목적\n서비스 제공 및 관리 (회원 가입, 로그인, 서비스 이용, 서비스 개선)\n마케팅 및 광고 목적 (맞춤형 서비스 제공, 이벤트 안내 등)\n2. 수집하는 개인정보 항목\n필수 항목: 이름, 성별, 연락처 등\n3. 개인정보 보유 및 이용 기간\n회원 탈퇴 시까지 개인정보 보유'
	);

	const genderTypesKr = [
		{
			label: '남성',
			value: '남성',
		},
		{
			label: '여성',
			value: '여성',
		},
	];
	const genderTypesJp = [
		{
			label: '男性',
			value: '男性',
		},
		{
			label: '女性',
			value: '女性',
		},
	];

	const investSectorKr = [
		{
			label: '해당 없음',
			value: '해당 없음',
		},
		{
			label: 'Seed',
			value: 'Seed',
		},
		{
			label: 'Pre-A',
			value: 'Pre-A',
		},
		{
			label: 'SeriesA',
			value: 'SeriesA',
		},
		{
			label: 'SeriesB',
			value: 'SeriesB',
		},
		{
			label: 'SeriesC 이상',
			value: 'SeriesC 이상',
		},
	];

	const investSectorJp = [
		{
			label: '該当なし',
			value: '該当なし',
		},
		{
			label: 'Seed',
			value: 'Seed',
		},
		{
			label: 'Pre-A',
			value: 'Pre-A',
		},
		{
			label: 'SeriesA',
			value: 'SeriesA',
		},
		{
			label: 'SeriesB',
			value: 'SeriesB',
		},
		{
			label: 'SeriesC以上',
			value: 'SeriesC以上',
		},
	];

	//* Functions
	/**
	 * 로그인
	 */
	const signIn = () => {
		if (
			!name ||
			!gender ||
			!age ||
			!company ||
			!establishmentDate ||
			!investSector ||
			!isAgree
		) {
			if (locale == 'jp')
				return alert('すべての情報を入力してください。');
			else return alert('모든 정보를 입력해주세요.');
		}
		appMemberJpController.createItem(
			{
				NAME: name,
				GENDER: gender == '남성' || gender == '男性' ? 'M' : 'F',
				AGE: age,
				COMPANY: company,
				ESTABLISHMENT_DATE: establishmentDate,
				INVEST_SECTOR: investSector,
			},
			(res) => {
				if (res.data.result !== null) {
					cookie.setItemInCookies(
						'JP_ACCESS_TOKEN',
						res.data.result.NAME,
						{
							path: '/',
							maxAge: 3600 * 24,
						}
					);
					router.push('/jp');
				}
			},
			(err) => {}
		);
	};

	const onKeyPress = (e) => {
		if (e.key === 'Enter') {
			signIn();
		}
	};

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
				alignItems: 'center',
				flexDirection: 'column',
				bgcolor: 'primary.light',
				py: 5,
			}}
		>
			<img
				src="/images/logo/Suppor-TFulllogo.svg"
				alt="logo"
				style={{ width: 230 }}
			/>
			<Box
				py={5}
				px={{
					xs: 0,
					md: 5,
				}}
				width={'80%'}
			>
				<Typography variant={'body1'} sx={{ mb: 1, ml: 1 }}>
					{locale == 'jp' ? '名.' : '이름'}
				</Typography>
				<TextField
					fullWidth
					value={name}
					type="name"
					onChange={(e) => setName(e.target.value)}
					variant={'outlined'}
					sx={{ mb: 2, bgcolor: 'white' }}
					placeholder={
						locale == 'jp'
							? '名前を入力してください'
							: '이름을 입력해주세요.'
					}
					onKeyDown={onKeyPress}
				/>
				<Typography variant={'body1'} sx={{ mb: 1, ml: 1 }}>
					{locale == 'jp' ? '性別' : '성별'}
				</Typography>
				<SupportiInput
					dataList={locale == 'jp' ? genderTypesJp : genderTypesKr}
					value={gender}
					setValue={setGender}
					type="select"
					width={{ xs: '100%', md: '100%' }}
					style={{ mb: 2 }}
				/>
				<Typography variant={'body1'} sx={{ mb: 1, ml: 1 }}>
					{locale == 'jp' ? '年齢' : '나이'}
				</Typography>
				<TextField
					fullWidth
					value={age}
					type="age"
					onChange={(e) =>
						setAge(e.target.value.replace(/[^0-9]/g, ''))
					}
					variant={'outlined'}
					sx={{ mb: 2, bgcolor: 'white' }}
					placeholder={
						locale == 'jp'
							? '年齢を入力してください'
							: '나이를 입력해주세요'
					}
					onKeyDown={onKeyPress}
				/>
				<Typography variant={'body1'} sx={{ mb: 1, ml: 1 }}>
					{locale == 'jp' ? '企業名' : '기업명'}
				</Typography>
				<TextField
					fullWidth
					value={company}
					type="company"
					onChange={(e) => setCompany(e.target.value)}
					variant={'outlined'}
					sx={{ mb: 2, bgcolor: 'white' }}
					placeholder={
						locale == 'jp'
							? '企業名を入力してください'
							: '기업명을 입력해주세요'
					}
					onKeyDown={onKeyPress}
				/>
				<Typography variant={'body1'} sx={{ mb: 1, ml: 1 }}>
					{locale == 'jp' ? '設立日' : '설립일'}
				</Typography>
				<Box
					sx={{
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
						mb: 2,
						bgcolor: 'white',
					}}
				>
					<SupportiInput
						value={establishmentDate}
						setValue={setEstablishmentDate}
						type="datepicker"
						width={{ xs: '100%', md: '100%' }}
					/>
				</Box>
				<Typography variant={'body1'} sx={{ mb: 1, ml: 1 }}>
					{locale == 'jp' ? '投資段階' : '투자 단계'}
				</Typography>
				<SupportiInput
					dataList={locale == 'jp' ? investSectorJp : investSectorKr}
					value={investSector}
					setValue={setInvestSector}
					type="select"
					width={{ xs: '100%', md: '100%' }}
					style={{ mb: 2 }}
				/>

				{/* <TextField
					fullWidth
					value={email}
					type="email"
					onChange={(e) => setEmail(e.target.value)}
					variant={'outlined'}
					sx={{ mb: 2, bgcolor: 'white' }}
					placeholder={locale == 'jp' ? 'Eメール入力' : '이메일 입력'}
					onKeyDown={onKeyPress}
				/> */}
				{/* <TextField
					fullWidth
					value={phoneNumber}
					type="phoneNumber"
					onChange={(e) => setPhoneNumber(e.target.value)}
					variant={'outlined'}
					sx={{ mb: 2, bgcolor: 'white' }}
					placeholder={
						locale == 'jp' ? '電話番号入力' : '전화번호 입력'
					}
					onKeyDown={onKeyPress}
				/> */}
				<Box
					sx={{
						display: 'flex',
						justifyContent: 'start',
						mb: 2,
					}}
					flexDirection={{
						xs: 'column',
						md: 'row',
					}}
				>
					<Box
						sx={{
							display: 'flex',
							justifyContent: 'start',
							flexDirection: 'row',
						}}
					>
						<SupportiInput
							type="checkbox"
							value={isAgree}
							setValue={setIsAgree}
						/>
						<Typography my="auto" fontWeight={500} variant="body1">
							{locale == 'jp'
								? '個人情報の収集と利用に同意します。'
								: '개인정보 수집 및 이용에 동의합니다.'}
						</Typography>
					</Box>
					<Button
						variant="text"
						color="secondary"
						onClick={() => {
							setOpenPopUp(true);
						}}
					>
						<Typography
							variant="body1"
							color="secondary"
							sx={{ textDecoration: 'underline' }}
						>
							{locale == 'jp' ? '[利用規約を見る]' : '[약관보기]'}
						</Typography>
					</Button>
				</Box>
				<Typography
					variant={'body1'}
					sx={{ textAlign: 'center', color: 'primary.main', py: 1 }}
				>
					{locale == 'jp'
						? '* 入力時にログイン及び会員登録ができます。'
						: '* 입력 시 로그인 및 회원가입이 됩니다.'}
				</Typography>
				<SupportiButton
					fullWidth
					onClick={() => signIn()}
					isGradient={true}
					contents={locale == 'jp' ? 'ログイン' : '로그인'}
					style={{
						color: '#fff',
					}}
				/>
			</Box>
			{/* 개인정보 수집 및 이용약관 팝업 */}
			<PopUpModal
				modalOpen={openPopUp}
				setModalOpen={setOpenPopUp}
				uiData={
					<Box
						display={'flex'}
						justifyContent={'space-between'}
						flexDirection={'column'}
						gap={3}
						width={300}
					>
						<Box display="flex" justifyContent={'center'}>
							<Typography
								variant="subtitle1"
								fontWeight={600}
								mt="auto"
								mb="auto"
							>
								{locale == 'jp'
									? '個人情報収集及び利用約款'
									: '개인정보 수집 및 이용약관'}
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
						<Box display="flex" gap={1} flexDirection={'column'}>
							<TextField
								value={terms}
								multiline
								fullWidth
								variant="outlined"
								disabled
								sx={{ mt: 3 }}
							/>
						</Box>
					</Box>
				}
			/>
		</Box>
	);
};

export default Page;
