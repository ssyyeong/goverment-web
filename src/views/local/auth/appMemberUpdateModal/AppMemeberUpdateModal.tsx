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
import { loadTossPayments } from '@tosspayments/payment-sdk';

import moment from 'moment';
import SupportiToggle from '../../../global/SupportiToggle';
import { AppMemberController } from '../../../../controller/AppMemberController';
import { AlimTalkController } from '../../../../controller/AlimTalkController';
import { useRouter } from 'next/router';
import { IUser } from '../../../../@types/model';
import axios from 'axios';
import { CookieManager } from '@leanoncompany/supporti-utility';
import { businessSector } from '../../../../../configs/data/BusinessConfig';

interface IAppMemberUpdateModalProps {
	open: boolean;
	handleClose: () => void;
	appMemberData: any;
	needPhoneUpdate?: boolean;
	accessToken: string;
}

const AppMemberUpdateModal = (props: IAppMemberUpdateModalProps) => {
	//* Modules
	const appMemberController = new AppMemberController();
	const router = useRouter();
	const cookie = new CookieManager();
	//* State
	const [tabs, setTabs] = useState<string>('BUSINESS');
	const [signupData, setSignupData] = useState<any>();
	const [businessData, setBusinessData] = useState<{
		BUSINESS_SECTOR: string;
		BUSINESS_NUMBER: any;
		COMPANY_NAME: string;
	}>();
	const [encrypted, setEncrypted] = React.useState<string>('');
	const [verifyNumber, setVerifyNumber] = React.useState<string>();
	const [isVerified, setIsVerified] = React.useState<boolean>(false);
	const [isBusinessNumOk, setIsBusinessNumOk] =
		React.useState<string>('NOT_YET');
	const [phoneNumDuplication, setPhoneNumDuplication] =
		React.useState<boolean>(false);
	const [signUpdataFinal, setSignUpdataFinal] = React.useState<any>([]);
	//* Functions
	/**
	 * 알림톡 발송
	 */
	const sendAlimTalk = () => {
		if (signupData == undefined) {
			alert('전화번호를 입력해주세요.');
			return;
		} else {
			appMemberController.sendAuthCode(
				{
					PHONE_NUMBER: signupData,
				},
				(res) => {
					setEncrypted(res.data.result);
					setPhoneNumDuplication(false);
				},
				(err) => {
					setPhoneNumDuplication(true);
				}
			);
		}
	};
	/**
	 * 인증번호 확인
	 */
	const verifyAuthCode = () => {
		if (!encrypted) return alert('인증번호를 받아주세요.');
		if (!verifyNumber) return alert('인증번호를 입력해주세요.');
		appMemberController.checkAuthCode(
			{
				ENCRYPTED_AUTH_CODE: encrypted,
				AUTH_CODE: verifyNumber,
			},
			(res) => {
				if (res.data.result) {
					// 인증번호 일치]
					setIsVerified(true);
				}
			},
			(err) => {}
		);
	};
	/**
	 * 사업가 번호 체크
	 */
	const businessNumCheck = () => {
		if (!businessData?.BUSINESS_NUMBER)
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
	 * 회원 정보 업데이트
	 */
	const updateAppMemberForBusiness = () => {
		appMemberController.updateMemberInfo(
			{
				FIND_OPTION_KEY_LIST: {
					APP_MEMBER_IDENTIFICATION_CODE:
						props.appMemberData.APP_MEMBER_IDENTIFICATION_CODE,
				},
				UPDATE_OPTION_KEY_LIST: {
					PHONE_NUMBER: signupData,
					USER_GRADE: tabs,
				},
				BUSINESS_SECTOR: businessData.BUSINESS_SECTOR,
				BUSINESS_NUMBER: businessData.BUSINESS_NUMBER,
				COMPANY_NAME: businessData.COMPANY_NAME,
			},
			(res) => {
				cookie.setItemInCookies('ACCESS_TOKEN', props.accessToken, {
					path: '/',
					maxAge: 3600 * 24 * 30,
				});
				alert('회원 정보가 업데이트 되었습니다.');
				router.push('/');
			},
			(err) => {
				alert('회원 정보 업데이트에 실패하였습니다.');
			}
		);
	};

	const updateAppMemberForGeneral = () => {
		appMemberController.updateMemberInfo(
			{
				FIND_OPTION_KEY_LIST: {
					APP_MEMBER_IDENTIFICATION_CODE:
						props.appMemberData.APP_MEMBER_IDENTIFICATION_CODE,
				},
				UPDATE_OPTION_KEY_LIST: {
					PHONE_NUMBER: signupData,
					USER_GRADE: tabs,
				},
			},
			(res) => {
				cookie.setItemInCookies('ACCESS_TOKEN', props.accessToken, {
					path: '/',
					maxAge: 3600 * 24 * 30,
				});
				alert('회원 정보가 업데이트 되었습니다.');

				router.push('/');
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
			for: ['BUSINESS', 'GENERAL'],
			optional: props.needPhoneUpdate,
			endAdornment: (
				<Button
					variant="contained"
					sx={{
						backgroundColor: '#d1d1d1',
					}}
					onClick={() => {
						console.log('sendAlimTalk', signupData);
						sendAlimTalk();
					}}
					disabled={isVerified}
				>
					<Typography variant="body2" color={'white'} width={100}>
						인증 받기
					</Typography>
				</Button>
			),
			value: signupData,
			isVerified: isVerified,
			onChange: (e) => {
				setSignupData(e.target.value);
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
			optional: props.needPhoneUpdate,
			nolabel: true,
			isVerified: isVerified,
			endAdornment: (
				<Button
					variant="contained"
					disabled={isVerified}
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
			helperText: !isVerified
				? '인증번호가 일치하지 않습니다.'
				: '인증되었습니다.',
			value: verifyNumber,
			onChange: (e) => {
				setVerifyNumber(e.target.value);
			},
		},
	];

	/**
	 * 비즈니스 데이터
	 */
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
					: '인증되었습니다.',
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

	const finalDataConfig = () => {
		let finalData = [];
		if (tabs === 'BUSINESS') {
			if (props.needPhoneUpdate) {
				finalData = [...signupDataConfig, ...businessDataConfig];
			} else {
				finalData = businessDataConfig;
			}
		} else {
			if (props.needPhoneUpdate) {
				finalData = signupDataConfig;
			} else {
				finalData = [];
			}
		}
		return finalData;
	};

	return (
		<SuppportiModal
			open={props.open}
			handleClose={() => {
				props.handleClose();
			}}
			activeHeader={true}
			title="유저 정보 업데이트"
			style={{
				minWidth: '40%',
				width: { sm: 'fit-content', xs: '100%' },
			}}
		>
			<Box width={'100%'} display={'flex'} flexDirection={'column'}>
				{/* 토글 */}
				<Box width={'100%'}>
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
			</Box>
			<Box mb={3} width={'100%'}>
				{finalDataConfig().map((item, idx) => {
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
							{item.label == '사업 분류' ? (
								<Autocomplete
									size="small"
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
												'& .MuiAutocomplete-input': {
													padding: '8px !important',
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
									error={item?.error}
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
									helperText={item?.helperText}
									sx={{
										mt: 1,
									}}
									placeholder={`${item.label} 입력`}
								/>
							)}
						</Box>
					);
				})}
			</Box>
			<SupportiButton
				contents={'저장하기'}
				isGradient={true}
				fullWidth={true}
				onClick={() => {
					if (props.needPhoneUpdate && !isVerified)
						return alert('전화번호 인증을 해주세요.');
					if (tabs === 'BUSINESS') {
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

export default AppMemberUpdateModal;
