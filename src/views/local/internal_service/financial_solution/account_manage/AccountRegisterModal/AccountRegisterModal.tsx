import React from 'react';

import { Box, BoxProps, Divider, Typography } from '@mui/material';
import { IBankAccount } from '../../../../../../@types/model';
import SuppportiModal from '../../../../../global/SuppportiModal';
import SupportiInput from '../../../../../global/SupportiInput';
import axios from 'axios';
import SupportiButton from '../../../../../global/SupportiButton';
import SupportiToggle from '../../../../../global/SupportiToggle';
import GetCertModal from '../GetCertModal/GetCertModal';
import { bankConfig } from '../../../../../../../configs/data/BankConfig';
import { BankController } from '../../../../../../controller/BankController';
import { useAppMember } from '../../../../../../hooks/useAppMember';
import SaveIcon from '@mui/icons-material/Save';
import { LoadingButton } from '@mui/lab';

interface IAccountRegisterModalProps {
	accountRegisterModalOpen: boolean;
	setAccountRegisterModalOpen: (open: boolean) => void;
	/**
	 * 계좌 추가 삭제용 트리거 키 변경 함수
	 */
	setAccountTriggerKey: (key: string | undefined) => void;
}

const AccountRegisterModal = (props: IAccountRegisterModalProps) => {
	//* Modules
	/**
	 * 컨트롤러들
	 */
	const bankController = new BankController();
	//* Hooks
	/**
	 * 유저 아이디 가져오는 훅
	 */
	const { memberId } = useAppMember();
	//* States
	const [loginMethod, setLoginMethod] = React.useState<string>('SIGN_IN');
	const [isMac, setIsMac] = React.useState<boolean>(false);
	const [loading, setLoading] = React.useState(false);

	const [accountList, setAccountList] = React.useState([]);
	const [selectedAccount, setSelectedAccount] = React.useState<any>();
	const [rawAccountList, setRawAccountList] = React.useState<any>([]);
	const [certList, setCertList] = React.useState([]);
	const [certInfo, setCertInfo] = React.useState({
		path: '',
		signPw: '',
	});

	const [getCertModalOpen, setGetCertModalOpen] =
		React.useState<boolean>(false);

	const [userAccountInfo, setUserAccountInfo] = React.useState({
		BANK_CODE: '002',
		LOGIN_METHOD: loginMethod,
		LOGIN_USER_ID: '',
		LOGIN_USER_PASSWORD: '',
		CERTIFICATE_SIGN: '',
		CERTIFICATE_PRIVATE_KEY: '',
		CERTIFICATE_PASSWORD: '',
		ACCOUNT_NUMBER: '',
		ACCOUNT_PASSWORD: '',
		ACCOUNT_NICKNAME: '',
		ACCOUNT_HOLDER: '',
		START_DATE: new Date(),
	});

	//* Constants
	//* bankConfig key value 형태로 커스텀
	let bankList = [{}];
	for (const [key, value] of Object.entries(bankConfig)) {
		bankList.push({ label: value.name, value: key, icon: value.iconPath });
	}

	let userAccountList = [];
	for (const [key, value] of Object.entries(accountList)) {
		userAccountList.push({
			label: value.acctNo + ' ' + value.acctNm,
			value: value.acctNo + '&' + value.acctHolder + '&' + value.openDt,
		});
	}

	//* id, pw로 계좌 불러오는 폼
	const IdRegisterForm = [
		{
			title: '은행사 ID',
			component: (
				<SupportiInput
					type={'input'}
					value={userAccountInfo.LOGIN_USER_ID}
					setValue={(value) => {
						setUserAccountInfo({
							...userAccountInfo,
							LOGIN_USER_ID: value,
						});
					}}
					placeholder="은행사 ID 입력"
					defaultValue="002"
					width={290}
				/>
			),
		},
		{
			title: '은행사 PW',
			component: (
				<SupportiInput
					type="inputwithbtn"
					value={userAccountInfo.LOGIN_USER_PASSWORD}
					setValue={(value) => {
						setUserAccountInfo({
							...userAccountInfo,
							LOGIN_USER_PASSWORD: value,
						});
					}}
					defaultValue=""
					placeholder="은행사 PW 입력"
					width={290}
					btnContent="조회하기"
					btnOnclick={() => {
						getAccountList();
					}}
				/>
			),
		},
	];

	//* 계좌 관련 정보 입력 폼
	const AccountForm = [
		{
			title: '계좌',
			component: (
				<SupportiInput
					type="select"
					value={selectedAccount}
					setValue={(value) => {
						//* 여기서 계좌 예금주 셋팅
						let acctNum = value.split('&')[0];
						let acctHolder = value.split('&')[1];
						let openDt = value.split('&')[2];

						// console.log(sYear, sMonth, sDate, openDt);
						setSelectedAccount(value);
						const rawAccount = rawAccountList.filter(
							(item: any) => item.acctNo === value
						)[0];
						console.log(rawAccount, 'rawAccount');
						//* string to date
						var sYear = rawAccount.openDt?.substring(0, 4);
						var sMonth = rawAccount.openDt?.substring(4, 6);
						var sDate = rawAccount.openDt?.substring(6, 8);

						setUserAccountInfo({
							...userAccountInfo,
							ACCOUNT_NUMBER: rawAccount.acctNo,
							ACCOUNT_HOLDER: rawAccount.acctNm,
							START_DATE: new Date(
								Number(sYear),
								Number(sMonth) - 1,
								Number(sDate)
							),
						});
					}}
					placeholder="계좌 선택"
					dataList={accountList}
					width={290}
				/>
			),
		},
		{
			title: '비밀번호',
			component: (
				<SupportiInput
					type={'password'}
					value={userAccountInfo.ACCOUNT_PASSWORD}
					setValue={(value) => {
						setUserAccountInfo({
							...userAccountInfo,
							ACCOUNT_PASSWORD: value,
						});
					}}
					placeholder="선택한 계좌의 비밀번호 4자리 입력"
					width={290}
				/>
			),
		},
		{
			title: '계좌 별칭',
			component: (
				<SupportiInput
					type={'input'}
					value={userAccountInfo.ACCOUNT_NICKNAME}
					setValue={(value) => {
						setUserAccountInfo({
							...userAccountInfo,
							ACCOUNT_NICKNAME: value,
						});
					}}
					placeholder="계좌 별칭 입력"
					width={290}
				/>
			),
		},
	];

	//* Functions
	//* 계좌 전체 리스트 불러오는 함수
	const getAccountList = () => {
		const sendData =
			loginMethod === 'SIGN_IN'
				? {
						BANK_CODE: userAccountInfo.BANK_CODE,
						LOGIN_METHOD: loginMethod,
						LOGIN_USER_ID: userAccountInfo.LOGIN_USER_ID,
						LOGIN_USER_PASSWORD:
							userAccountInfo.LOGIN_USER_PASSWORD,
				  }
				: {
						BANK_CODE: userAccountInfo.BANK_CODE,
						LOGIN_METHOD: loginMethod,
						CERTIFICATE_SIGN: userAccountInfo.CERTIFICATE_SIGN,
						CERTIFICATE_PRIVATE_KEY:
							userAccountInfo.CERTIFICATE_PRIVATE_KEY,
						CERTIFICATE_PASSWORD:
							userAccountInfo.CERTIFICATE_PASSWORD,
				  };

		bankController.getBankAccountList(
			{ APP_MEMBER_IDENTIFICATION_CODE: memberId, ...sendData },
			(response: any) => {
				setLoading(false);
				const newList = response.data.result.map((item) => {
					return {
						label: `${item.acctNm}(${item.acctNo})`,
						value: item.acctNo,
					};
				});
				setRawAccountList(response.data.result);
				setAccountList(newList);
				setSelectedAccount(newList[0].value);
				setUserAccountInfo({
					...userAccountInfo,
					ACCOUNT_NUMBER: response.data.result[0].acctNo,
					ACCOUNT_HOLDER: response.data.result[0].acctNm,
					START_DATE: new Date(
						response.data.result[0].openDt.substring(0, 4),
						response.data.result[0].openDt.substring(4, 6),
						response.data.result[0].openDt.substring(6, 8)
					),
				});

				if (loginMethod !== 'SIGN_IN') {
					setGetCertModalOpen(!getCertModalOpen);
				}
			},
			(err: any) => {
				console.log(err);
			}
		);
	};

	console.log(userAccountInfo);

	//* 계좌 등록 함수
	const registerAccount = async () => {
		console.log(userAccountInfo);
		setLoading(true);
		bankController.registerBankAccount(
			{
				APP_MEMBER_IDENTIFICATION_CODE: memberId,
				...userAccountInfo,
			},
			(response: any) => {
				props.setAccountTriggerKey(response.data.result);
				alert('등록 완료!');
				setLoading(false);
				console.log(response.data.result);
				props.setAccountRegisterModalOpen(false);
			},
			(err: any) => {
				console.log(err);
			}
		);
		// if (hyphenData.accountNickname === "") {
		//   window.alert("계좌 별칭을 입력해주세요.")
		// } else {
		//   await api.post('/bank-account', hyphenData)
		//     .then((res) => { getAccountList() })
		//     .catch((e) => { })
		// }
	};

	//* 불필요한 스트링 제거하기 위함
	const deletePEMString = (data: string) => {
		let result = data.replace(/-----BEGIN CERTIFICATE-----/g, '');
		result = result.replace(/-----END CERTIFICATE-----/g, '');
		result = result.replace(/\n/g, '');
		return result;
	};
	//* 불필요한 스트링 제거하기 위함
	const deleteString = (data: string) => {
		let result = data.replace(/-----BEGIN ENCRYPTED PRIVATE KEY-----/g, '');
		result = result.replace(/-----END ENCRYPTED PRIVATE KEY-----/g, '');
		result = result.replace(/\n/g, '');

		return result;
	};

	//* 인증서 가져오기
	const getCert = async (s_op, input) => {
		const s_inJson = input
			? JSON.stringify(JSON.parse(input), null, 2)
			: JSON.stringify({});

		await axios
			.post(`https://127.0.0.1:16566/?op=${s_op}`, s_inJson, {
				headers: {
					'Content-Type': 'application/json',
				},
			})
			.then((res) => {
				if (s_op === 'certList') {
					var result = JSON.stringify(res.data, null, 2);

					setCertList(JSON.parse(result).list);
				} else {
					//execute 일때
					if (res.data.errYn === 'N') {
						const DER2PEM = deletePEMString(res.data.DER2PEM); //SignCert
						const KEY2PEM = deleteString(res.data.KEY2PEM); //SignPri

						setUserAccountInfo({
							...userAccountInfo,
							CERTIFICATE_SIGN: DER2PEM,
							CERTIFICATE_PRIVATE_KEY: KEY2PEM,
							CERTIFICATE_PASSWORD:
								userAccountInfo.CERTIFICATE_PASSWORD,
						});
						setLoading(false);
					} else {
						window.alert(res.data.errMsg);
						setLoading(false);
					}
				}
			})
			.catch((e) => {
				window.alert('프로그램 설치가 필요합니다.');

				if (isMac) {
					window.open(
						'https://kr.object.ncloudstorage.com/synctree/datamarket/static/files/iftnxweb_macos_x64_1.5.pkg'
					);
				} else {
					window.open(
						'https://kr.object.ncloudstorage.com/synctree/datamarket/static/files/ExAdapter_Web_Setup_20221130.exe'
					);
				}
			});
	};

	//* Hooks
	React.useEffect(() => {
		//* 계좌 불러오는 방법 변경 시 데이터 초기화
		setUserAccountInfo({
			BANK_CODE: '002',
			LOGIN_METHOD: loginMethod,
			LOGIN_USER_ID: '',
			LOGIN_USER_PASSWORD: '',
			CERTIFICATE_SIGN: '',
			CERTIFICATE_PRIVATE_KEY: '',
			CERTIFICATE_PASSWORD: '',
			ACCOUNT_NUMBER: '',
			ACCOUNT_PASSWORD: '',
			ACCOUNT_NICKNAME: '',
			ACCOUNT_HOLDER: '',
			START_DATE: new Date(),
		});
	}, [loginMethod]);

	React.useEffect(() => {
		//* 모든 계좌 불러오는 백엔드 api 호출

		if (
			userAccountInfo.CERTIFICATE_SIGN !== '' &&
			userAccountInfo.CERTIFICATE_PRIVATE_KEY !== ''
		) {
			if (userAccountInfo.CERTIFICATE_PASSWORD !== '') getAccountList();
			else {
				alert('정보가 부족합니다.');
			}
		}
	}, [
		userAccountInfo.CERTIFICATE_PRIVATE_KEY,
		userAccountInfo.CERTIFICATE_SIGN,
	]);

	React.useEffect(() => {
		//* 유저 os 확인해서 os에 따른 설치 파일 링크 다르게 설정하기 위함
		const userOs = navigator.userAgent.replace(/ /g, '').toLowerCase();
		const isMac = () => {
			if (
				(userOs.match(/macintosh/i) as unknown as string) == 'macintosh'
			) {
				return setIsMac(true);
			} else {
				return setIsMac(false);
			}
		};

		isMac();
	}, []);

	return (
		<Box>
			<SuppportiModal
				open={props.accountRegisterModalOpen}
				handleClose={() => {
					props.setAccountRegisterModalOpen(false);
				}}
				title="계좌 등록"
				activeHeader={true}
				style={{
					width: { sm: 'fit-content', xs: '100%' },
					height: { sm: 'fit-content', xs: '100%' },
					sx: { overflowY: { sm: 'auto', xs: 'scroll' } },
					overflow: 'auto',
					borderRadius: { xs: 0, sm: 3 },
				}}
				children={
					<Box>
						{/** 계좌 불러오는 방식 선택하는 토글 섹션 */}
						<SupportiToggle
							chipDataList={[
								{ label: '은행사 정보 입력', value: 'SIGN_IN' },
								{ label: '인증서 등록', value: 'CERTIFICATE' },
							]}
							value={loginMethod}
							setValue={(value) =>
								setLoginMethod(value as string)
							}
						/>

						<Box
							py={4}
							display={'flex'}
							gap={1}
							flexDirection={'column'}
						>
							{/** loginMethod에 상관없이 공통 select box */}
							<Box
								display={{ sm: 'flex', xs: 'block' }}
								mb={1}
								alignItems={{ sm: 'center', xs: 'flex-start' }}
							>
								<Typography
									m={'auto'}
									mr={2}
									mb={{ sm: 'auto', xs: 1 }}
								>
									은행
								</Typography>
								<SupportiInput
									type="select"
									value={userAccountInfo.BANK_CODE}
									setValue={(e) => {
										setUserAccountInfo({
											...userAccountInfo,
											BANK_CODE: e,
										});
									}}
									dataList={bankList}
									width={290}
								/>
							</Box>

							{/** 계좌 불러오는 방식 (id, cert) 에 따라 폼 또는 인증서 선택 버튼 보여지는 섹션 */}
							{loginMethod === 'SIGN_IN' ? (
								IdRegisterForm.map((item, index) => {
									return (
										<Box
											display={{
												sm: 'flex',
												xs: 'block',
											}}
										>
											<Typography
												m={'auto'}
												mr={2}
												mb={{ sm: 'auto', xs: 1 }}
											>
												{item.title}
											</Typography>
											{item.component}
										</Box>
									);
								})
							) : (
								<SupportiButton
									fullWidth
									contents={'공용/금융 인증서 등록'}
									onClick={() => {
										getCert('certList', null);
										setGetCertModalOpen(true);
									}}
									isGradient={true}
									variant="contained"
								/>
							)}

							<Divider sx={{ mt: 2, mb: 2 }} />

							{/** 계좌 관련 정보 입력 섹션 */}
							{rawAccountList.length !== 0 &&
								AccountForm.map((item, index) => {
									return (
										<Box
											display={{
												sm: 'flex',
												xs: 'block',
											}}
										>
											<Typography
												m={'auto'}
												mr={1}
												mb={{ sm: 'auto', xs: 1 }}
											>
												{item.title}
											</Typography>
											{item.component}
										</Box>
									);
								})}
						</Box>
						<LoadingButton
							onClick={() => {
								registerAccount();
							}}
							loading={loading}
							loadingPosition="end"
							variant="contained"
							fullWidth
							sx={{
								height: '50px',
								backgroundImage:
									'linear-gradient(99deg, #5583e4 9%, #4955e3 89%)',
							}}
						>
							등록
						</LoadingButton>
					</Box>
				}
			/>

			{/** 인증서 가져오는 모달 */}
			<GetCertModal
				modalOpen={getCertModalOpen}
				setModalOpen={setGetCertModalOpen}
				userAccountInfo={userAccountInfo}
				setUserAccountInfo={setUserAccountInfo}
				getCert={getCert}
				certList={certList}
				certInfo={certInfo}
				setCertInfo={setCertInfo}
				getAccountList={getAccountList}
				isMac={isMac}
				loading={loading}
				setLoading={setLoading}
			/>
		</Box>
	);
};

export default AccountRegisterModal;
