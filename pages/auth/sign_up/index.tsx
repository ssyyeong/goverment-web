import React, { useState } from 'react';

import { NextPage } from 'next';

import {
	Box,
	BoxProps,
	Button,
	Divider,
	Step,
	StepLabel,
	Stepper,
	TextField,
	Typography,
} from '@mui/material';
import { IUser } from '../../../src/@types/model';
import { emailRegex, passwordRegex } from '../../../configs/regex/regex';
import SignUpLayout from '../../../src/views/local/sign_up/SignUpLayout';
import SupportiToggle from '../../../src/views/global/SupportiToggle';
import SupportiButton from '../../../src/views/global/SupportiButton';

const Page: NextPage = () => {
	//* Modules
	//* States
	const [signupData, setSignupData] = useState<IUser>({} as IUser);
	const [passwordConfirm, setPasswordConfirm] = useState('');
	const [encrypted, setEncrypted] = React.useState<string>('');
	const [verifyNumber, setVerifyNumber] = React.useState<string>('');
	const [tabs, setTabs] = React.useState<string>('BUSINESS');
	const [activeStep, setActiveStep] = React.useState<number>(0);

	//* Constants
	const signupDataConfig = [
		{
			label: '이메일',
			type: 'email',
			for: ['BUSINESS', 'GENERAL'],
			value: signupData.USER_NAME,
			onChange: (e) => {
				setSignupData({
					...signupData,
					USER_NAME: e.target.value,
				});
			},
			error:
				signupData.USER_NAME && !emailRegex.test(signupData.USER_NAME),
			helperText:
				signupData.USER_NAME && !emailRegex.test(signupData.USER_NAME)
					? '이메일 형식이 올바르지 않습니다.'
					: '',
		},
		{
			label: '비밀번호',
			type: 'password',
			for: ['BUSINESS', 'GENERAL'],
			value: signupData.PASSWORD,
			placeholder:
				'비밀번호 (8~16자의 영문 대소문자, 숫자, 특수문자 조합)',
			onChange: (e) => {
				setSignupData({
					...signupData,
					PASSWORD: e.target.value,
				});
			},
			error: passwordRegex.test(signupData.PASSWORD),
		},
		{
			label: '비밀번호 확인',
			placeholder: '비밀번호 재확인',
			for: ['BUSINESS', 'GENERAL'],
			type: 'password',
			value: passwordConfirm,
			onChange: (e) => {
				setPasswordConfirm(e.target.value);
			},
			error:
				signupData.PASSWORD && signupData.PASSWORD !== passwordConfirm,
			nolabel: true,
			helperText:
				signupData.PASSWORD && signupData.PASSWORD !== passwordConfirm
					? '비밀번호가 일치하지 않습니다.'
					: '',
		},
		{
			label: '전화번호',
			type: 'phone',
			for: ['BUSINESS', 'GENERAL'],
			endAdornment: (
				<Button
					variant="contained"
					sx={{
						backgroundColor: '#d1d1d1',
					}}
				>
					<Typography variant="body2" color={'white'} width={100}>
						인증번호 받기
					</Typography>
				</Button>
			),
			value: signupData.PHONE_NUMBER,
			onChange: (e) => {
				setSignupData({
					...signupData,
					PHONE_NUMBER: e.target.value,
				});
			},
		},
		{
			label: '인증번호',
			type: 'text',
			for: ['BUSINESS', 'GENERAL'],
			nolabel: true,
			endAdornment: (
				<Button
					variant="contained"
					sx={{
						backgroundColor: '#d1d1d1',
					}}
				>
					<Typography variant="body2" color={'white'}>
						인증
					</Typography>
				</Button>
			),
			value: verifyNumber,
			onChange: (e) => {
				setVerifyNumber(e.target.value);
			},
		},
		{
			label: '사업 분류',
			for: 'BUSINESS',
			type: 'select',
			value: signupData.USER_GRADE,
			onChange: (e) => {
				setSignupData({
					...signupData,
					USER_GRADE: e.target.value,
				});
			},
		},
		{
			label: '사업자 등록번호',
			type: 'text',
			for: 'BUSINESS',
			value: signupData.businessNumber,
			onChange: (e) => {
				setSignupData({
					...signupData,
					businessNumber: e.target.value,
				});
			},
			endAdornment: (
				<Button
					variant="contained"
					sx={{
						backgroundColor: '#d1d1d1',
					}}
				>
					<Typography variant="body2" color={'white'}>
						인증
					</Typography>
				</Button>
			),
		},
		{
			label: '회사명',
			type: 'text',
			for: 'BUSINESS',
			value: signupData.businessName,
			onChange: (e) => {
				setSignupData({
					...signupData,
					businessName: e.target.value,
				});
			},
		},
	];

	const configforBusiness = [
		...signupDataConfig,
		{
			label: '사업 분류',
			type: 'select',
			value: signupData.USER_GRADE,
			onChange: (e) => {
				setSignupData({
					...signupData,
					USER_GRADE: e.target.value,
				});
			},
		},
		{
			label: '사업자 등록번호',
			type: 'text',
			value: signupData.businessNumber,
			onChange: (e) => {
				setSignupData({
					...signupData,
					businessNumber: e.target.value,
				});
			},
		},
		{
			label: '회사명',
			type: 'text',
			value: signupData.businessName,
			onChange: (e) => {
				setSignupData({
					...signupData,
					businessName: e.target.value,
				});
			},
		},
	];

	//* Functions
	//* Hooks
	return (
		<SignUpLayout>
			<Typography variant="h1" fontWeight={'bold'}>
				서포티 회원가입
			</Typography>
			{/* 토글 */}
			<Box width={'80%'} mt={4} mb={3}>
				<SupportiToggle
					chipDataList={[
						{
							label: '사업가',
							value: 'BUSINESS',
						},
						{
							label: '일반',
							value: 'GENERAL',
						},
					]}
					value={tabs}
					setValue={(value) => {
						setTabs(value as string);
					}}
				/>
			</Box>
			<Typography color={'secondary.main'} variant="h6">
				회원가입하고 서포티를 2주간 무료로 이용해보세요.
			</Typography>
			{/* 스테퍼 */}
			<Stepper
				activeStep={activeStep}
				sx={{ width: '90%', mt: 6, mb: 4 }}
			>
				<Step>
					<StepLabel
						sx={{
							fontSize: '1.2rem',
							'& .Mui-active': {
								color: 'primary.main',
								fontSize: '1.2rem',
							},
							'& .Mui-disabled': {
								fontSize: '1.2rem !important',
							},
						}}
					>
						회원 정보
					</StepLabel>
				</Step>
				<Step>
					<StepLabel>가입 완료</StepLabel>
				</Step>
			</Stepper>

			{/* 회원 정보 */}
			<Box borderTop={'1px solid #f1f2f5'} pt={5} width={'100%'}>
				<Typography variant="h3">회원정보</Typography>
				<Box my={3} width={'100%'}>
					{/* 탭에따른 데이터 전환 */}

					{signupDataConfig.map((item, idx) => {
						return (
							<Box
								key={idx}
								alignItems={'center'}
								width={'100%'}
								mt={!item.nolabel && 2}
								display={
									item.for.includes(tabs) ? 'block' : 'none'
								}
							>
								<Typography>
									{!item.nolabel && item.label}
								</Typography>
								<TextField
									type={item.type}
									value={item.value}
									onChange={item.onChange}
									error={item.error}
									fullWidth
									InputProps={{
										endAdornment: item.endAdornment,
									}}
									helperText={item.helperText}
									sx={{
										mt: 1,
									}}
									placeholder={
										item.placeholder
											? item.placeholder
											: `${item.label} 입력`
									}
								/>
							</Box>
						);
					})}
				</Box>
				<SupportiButton
					isGradient={true}
					contents={'회원가입하기'}
					onClick={() => {}}
					fullWidth
					style={{
						color: '#fff',
					}}
				/>
			</Box>
		</SignUpLayout>
	);
};

export default Page;
