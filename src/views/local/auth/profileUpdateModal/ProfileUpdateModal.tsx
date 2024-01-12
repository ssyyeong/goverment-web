import React, { useEffect, useState } from 'react';

import {
	Autocomplete,
	Box,
	BoxProps,
	Button,
	TextField,
	Typography,
} from '@mui/material';
import SuppportiModal from '../../../global/SuppportiModal';
import SupportiButton from '../../../global/SupportiButton';

import SupportiToggle from '../../../global/SupportiToggle';
import { AppMemberController } from '../../../../controller/AppMemberController';
import { AlimTalkController } from '../../../../controller/AlimTalkController';
import { useRouter } from 'next/router';
import { IUser } from '../../../../@types/model';
import axios from 'axios';
import { businessSector } from '../../../../../configs/data/BusinessConfig';
import { passwordRegex } from '../../../../../configs/regex/regex';

interface IProfileUpdateModalProps {
	open: boolean;
	handleClose: () => void;
	appMemberData: any;
	businessUpdate?: boolean;
	infoUpdate?: boolean;
	passwordUpdate?: boolean;
}

//* 마이페이지 프로필 업데이트 모달
const ProfileUpdateModal = (props: IProfileUpdateModalProps) => {
	//* Modules
	const appMemberController = new AppMemberController();

	//* State
	const [rawSignupData, setRawSignupData] = useState<IUser>(
		props.appMemberData as IUser
	);
	const [signupData, setSignupData] = useState<IUser>(
		props.appMemberData as IUser
	);
	const [passwordConfirm, setPasswordConfirm] = useState('');
	const [businessData, setBusinessData] = useState<{
		BUSINESS_SECTOR: string;
		BUSINESS_NUMBER: any;
		COMPANY_NAME: string;
	}>();
	const [encrypted, setEncrypted] = React.useState<string>('');
	const [verifyNumber, setVerifyNumber] = React.useState<string>('');
	const [isVerified, setIsVerified] = React.useState<string>('NOT_YET');
	const [isBusinessNumOk, setIsBusinessNumOk] =
		React.useState<string>('NOT_YET');
	const [phoneNumDuplication, setPhoneNumDuplication] =
		React.useState<boolean>(false);
	//* Functions
	/**
	 * 알림톡 발송
	 */
	const sendAlimTalk = () => {
		if (!signupData.PHONE_NUMBER) return alert('전화번호를 입력해주세요.');
		appMemberController.sendAuthCode(
			{
				PHONE_NUMBER: signupData.PHONE_NUMBER,
			},
			(res) => {
				setEncrypted(res.data.result);
				setPhoneNumDuplication(false);
			},
			(err) => {
				setPhoneNumDuplication(true);
			}
		);
	};
	/**
	 * 인증번호 확인
	 */
	const verifyAuthCode = () => {
		if (!verifyNumber) return alert('인증번호를 입력해주세요.');
		appMemberController.checkAuthCode(
			{
				ENCRYPTED_AUTH_CODE: encrypted,
				AUTH_CODE: verifyNumber,
			},
			(res) => {
				if (res.data.result) {
					// 인증번호 일치
					setIsVerified('OK');
				}
			},
			(err) => {
				setIsVerified('NOT_OK');
			}
		);
	};
	/**
	 * 사업가 번호 체크
	 */
	const businessNumCheck = () => {
		if (!businessData.BUSINESS_NUMBER)
			return alert('사업자 등록번호를 입력해주세요.');
		axios
			.post(
				`https://api.odcloud.kr/api/nts-businessman/v1/status?serviceKey=${process.env.NEXT_PUBLIC_SERVICE_KEY}&returnType=JSON`,
				{
					b_no: [`${businessData.BUSINESS_NUMBER}`],
				},
				{
					headers: {
						'Content-Type': 'application/json',
						Accept: 'application/json',
					},
				}
			)
			.then((res) => {
				//정부 res
				const resData = res.data.data[0].tax_type;
				if (
					resData === '국세청에 등록되지 않은 사업자등록번호입니다.'
				) {
					setIsBusinessNumOk('NOT_OK');
					return;
				} else {
					setIsBusinessNumOk('OK');
				}
			});
	};

	/**
	 * 타입에 따른 유효성 체크
	 */
	const checkValidation = () => {
		let isOk = true;
		if (props.businessUpdate) {
			if (
				!businessData.BUSINESS_SECTOR &&
				!businessData.BUSINESS_NUMBER &&
				!businessData.COMPANY_NAME
			) {
				alert('모든 정보를 입력해주세요.');
				return (isOk = false);
			}
			if (isBusinessNumOk !== 'OK') {
				alert('사업자 등록번호를 확인해주세요.');
				return (isOk = false);
			}
		}
		if (props.infoUpdate) {
			if (signupData.PHONE_NUMBER == '') {
				alert('전화번호를 입력해주세요.');
				return (isOk = false);
			}
			if (signupData.PHONE_NUMBER !== rawSignupData.PHONE_NUMBER) {
				if (isVerified !== 'OK') {
					alert('인증번호를 확인해주세요.');
					return (isOk = false);
				}
			}
		}
		if (props.passwordUpdate) {
			if (
				signupData.PASSWORD == '' ||
				!signupData.PASSWORD ||
				!passwordRegex.test(signupData.PASSWORD) ||
				signupData.PASSWORD !== passwordConfirm ||
				passwordConfirm == ''
			) {
				alert('모든 정보를 입력해주세요.');
				return (isOk = false);
			}
		}

		return isOk;
	};

	/**
	 * 사업자 회원 정보 업데이트
	 */
	const updateAppMemberForBusiness = () => {
		if (!checkValidation()) return;
		appMemberController.updateMemberInfo(
			{
				FIND_OPTION_KEY_LIST: {
					APP_MEMBER_IDENTIFICATION_CODE:
						props.appMemberData.APP_MEMBER_IDENTIFICATION_CODE,
				},
				UPDATE_OPTION_KEY_LIST: {
					...signupData,
					USER_GRADE: 'BUSINESS',
				},
				BUSINESS_SECTOR: businessData.BUSINESS_SECTOR,
				BUSINESS_NUMBER: businessData.BUSINESS_NUMBER,
				COMPANY_NAME: businessData.COMPANY_NAME,
			},
			(res) => {
				alert('회원 정보가 업데이트 되었습니다.');
				props.handleClose();
			},
			(err) => {
				alert('회원 정보 업데이트에 실패하였습니다.');
			}
		);
	};

	/**
	 * 일반 회원 정보 업데이트
	 */
	const updateAppMemberForGeneral = () => {
		if (!checkValidation()) return;
		appMemberController.updateItem(
			{
				APP_MEMBER_IDENTIFICATION_CODE:
					props.appMemberData.APP_MEMBER_IDENTIFICATION_CODE,
				...signupData,
			},
			(res) => {
				alert('회원 정보가 업데이트 되었습니다.');
				props.handleClose();
			},
			(err) => {
				alert('회원 정보 업데이트에 실패하였습니다.');
			}
		);
	};

	//* Constants
	const signupDataConfig = [
		{
			label: '전화번호',
			type: 'phone',
			endAdornment: (
				<Button
					variant="contained"
					sx={{
						backgroundColor: '#d1d1d1',
					}}
					onClick={() => sendAlimTalk()}
					disabled={isVerified === 'OK'}
				>
					<Typography variant="body2" color={'white'} width={100}>
						인증 받기
					</Typography>
				</Button>
			),
			value: signupData.PHONE_NUMBER,
			isVerified: isVerified,
			onChange: (e) => {
				setSignupData({
					...signupData,
					PHONE_NUMBER: e.target.value,
				});
			},
			error: phoneNumDuplication,
			helperText: phoneNumDuplication
				? '이미 가입된 전화번호입니다.'
				: '',
		},
		{
			label: '인증번호',
			type: 'text',
			for: ['BUSINESS', 'GENERAL'],
			nolabel: true,
			isVerified: isVerified,
			endAdornment: (
				<Button
					variant="contained"
					disabled={isVerified === 'OK'}
					sx={{
						backgroundColor: '#d1d1d1',
					}}
					onClick={() => verifyAuthCode()}
				>
					<Typography variant="body2" color={'white'}>
						인증
					</Typography>
				</Button>
			),
			helperText:
				isVerified === 'NOT_OK'
					? '인증번호가 일치하지 않습니다.'
					: isVerified === 'OK' && '인증되었습니다.',
			value: verifyNumber,
			error: isVerified === 'NOT_OK',
			onChange: (e) => {
				setVerifyNumber(e.target.value);
			},
		},
	];

	const businessDataConfig = [
		{
			label: '사업 분류',
			for: 'BUSINESS',
			type: 'select',
			value: businessData?.BUSINESS_SECTOR,
			onChange: (e) => {
				setBusinessData({
					...businessData,
					BUSINESS_SECTOR: e.target.value,
				});
			},
		},
		{
			label: '사업자 등록번호',
			type: 'text',
			for: 'BUSINESS',
			value: businessData?.BUSINESS_NUMBER,
			onChange: (e) => {
				setBusinessData({
					...businessData,
					BUSINESS_NUMBER: e.target.value,
				});
			},
			endAdornment: (
				<Button
					variant="contained"
					sx={{
						backgroundColor: '#d1d1d1',
					}}
					onClick={() => businessNumCheck()}
				>
					<Typography variant="body2" color={'white'}>
						인증
					</Typography>
				</Button>
			),
			isVerified: isBusinessNumOk === 'OK',
			error: isBusinessNumOk === 'NOT_OK',
			helperText:
				isBusinessNumOk === 'NOT_OK'
					? '사업자 등록번호가 올바르지 않습니다.'
					: isBusinessNumOk === 'OK'
					? '인증되었습니다.'
					: '',
		},
		{
			label: '회사명',
			type: 'text',
			for: 'BUSINESS',
			value: businessData?.COMPANY_NAME,
			onChange: (e) => {
				setBusinessData({
					...businessData,
					COMPANY_NAME: e.target.value,
				});
			},
		},
	];

	const passwordDataConfig = [
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
			error:
				signupData.PASSWORD && !passwordRegex.test(signupData.PASSWORD),
			helperText:
				signupData.PASSWORD && !passwordRegex.test(signupData.PASSWORD)
					? '비밀번호 형식이 올바르지 않습니다.'
					: '',
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
	];

	// console.log(props.appMemberData);

	/**
	 * 데이터 세팅
	 */
	useEffect(() => {
		if (props.appMemberData) {
			setSignupData(props.appMemberData);
			setRawSignupData(props.appMemberData);
		}
	}, [props.appMemberData]);

	return (
		<SuppportiModal
			open={props.open}
			handleClose={() => {
				props.handleClose();
			}}
			activeHeader={true}
			title="유저 정보 업데이트"
			muiModalProps={{
				width: { sm: '40%', xs: '100%' },
			}}
			style={{
				minWidth: '40%',
				width: { sm: '40%', xs: '100%' },
			}}
		>
			<Box mb={3} width={'100%'}>
				{props.infoUpdate &&
					signupDataConfig.map((item, idx) => {
						return (
							<Box
								key={idx}
								alignItems={'center'}
								width={'100%'}
								mt={!item.nolabel && 2}
							>
								<Typography>
									{!item.nolabel && item.label}
								</Typography>
								<TextField
									type={item.type}
									value={item.value}
									onChange={item.onChange}
									error={item.error}
									focused={item.isVerified === 'NOT_OK'}
									disabled={
										item.isVerified == 'OK' &&
										item.value === verifyNumber
									}
									color={
										item.isVerified === 'OK'
											? 'primary'
											: 'secondary'
									}
									fullWidth
									InputProps={{
										endAdornment: item.endAdornment,
									}}
									helperText={item.helperText}
									sx={{
										mt: 1,
									}}
									placeholder={`${item.label} 입력`}
								/>
							</Box>
						);
					})}
				{props.businessUpdate &&
					businessDataConfig.map((item, idx) => {
						return (
							<Box
								key={idx}
								alignItems={'center'}
								width={'100%'}
								mt={2}
							>
								<Typography>{item.label}</Typography>
								{item.label == '사업 분류' ? (
									<Autocomplete
										options={businessSector}
										fullWidth
										onChange={(e, newValue) => {
											setBusinessData({
												...businessData,
												BUSINESS_SECTOR: newValue,
											});
										}}
										value={item.value}
										renderInput={(params) => (
											<TextField
												{...params}
												sx={{
													mt: 1,
													'& .MuiAutocomplete-input':
														{
															padding:
																'8px !important',
														},
												}}
											/>
										)}
									/>
								) : (
									<TextField
										type={item.type}
										value={item.value}
										onChange={item.onChange}
										error={item.error}
										focused={item.isVerified}
										disabled={
											item.isVerified &&
											item.value === verifyNumber
										}
										color={
											item.isVerified
												? 'primary'
												: 'secondary'
										}
										fullWidth
										InputProps={{
											endAdornment: item.endAdornment,
										}}
										helperText={item.helperText}
										sx={{
											mt: 1,
										}}
										placeholder={`${item.label} 입력`}
									/>
								)}
							</Box>
						);
					})}
				{props.passwordUpdate &&
					passwordDataConfig.map((item, idx) => {
						return (
							<Box
								key={idx}
								alignItems={'center'}
								width={'100%'}
								mt={2}
							>
								<Typography>{item.label}</Typography>
								<TextField
									type={item.type}
									value={item.value}
									onChange={item.onChange}
									error={item.error}
									fullWidth
									helperText={item.helperText}
									sx={{
										mt: 1,
									}}
									placeholder={`${item.label} 입력`}
								/>
							</Box>
						);
					})}
			</Box>
			<SupportiButton
				contents={'저장하기'}
				isGradient={true}
				fullWidth={true}
				onClick={() => {
					if (props.businessUpdate) {
						if (isBusinessNumOk === 'NOT_OK') {
							return alert('사업자 등록번호를 확인해주세요.');
						}
						updateAppMemberForBusiness();
					} else {
						updateAppMemberForGeneral();
					}
				}}
				style={{ color: 'white' }}
			/>
		</SuppportiModal>
	);
};

export default ProfileUpdateModal;
