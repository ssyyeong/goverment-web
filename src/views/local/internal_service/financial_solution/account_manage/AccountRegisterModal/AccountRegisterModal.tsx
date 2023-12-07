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

interface IAccountRegisterModalProps {
	accountRegisterModalOpen: boolean;
	setAccountRegisterModalOpen: (open: boolean) => void;
}

const AccountRegisterModal = (props: IAccountRegisterModalProps) => {
	//* Modules
	/**
	 * 컨트롤러들
	 */
	const bankController = new BankController();

	//* Constants

	//* bankConfig key value 형태로 커스텀
	let bankObj = {};
	for (const [key, value] of Object.entries(bankConfig)) {
		bankObj = Object.assign(bankObj, { [key]: value.name });
	}

	let iconList = [];
	for (const [key, value] of Object.entries(bankConfig)) {
		iconList.push(value.iconPath);
	}

	//* States
	const [loginMethod, setLoginMethod] = React.useState<string>('SIGN_IN');
	const [isMac, setIsMac] = React.useState<boolean>(false);

	const [accountList, setAccountList] = React.useState([]);
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
		START_DATE: '2022-03-30',
	});

	//* id, pw로 계좌 불러오는 폼
	const IdRegisterForm = [
		{
			title: '은행',
			component: (
				<SupportiInput
					type="select"
					value={userAccountInfo.BANK_CODE}
					setValue={(e) => {
						setUserAccountInfo({
							...userAccountInfo,
							BANK_CODE: e,
						});
					}}
					dataList={bankObj}
					width={300}
					iconList={iconList}
				/>
			),
		},
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
					width={300}
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
					width={300}
					btnContent="조회하기"
					btnOnclick={() => {}}
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
					value={userAccountInfo.ACCOUNT_NUMBER}
					setValue={(value) => {
						setUserAccountInfo({
							...userAccountInfo,
							ACCOUNT_NUMBER: value,
						});
					}}
					placeholder="계좌 선택"
					dataList={bankConfig}
					width={300}
				/>
			),
		},
		{
			title: '계좌 비밀번호',
			component: (
				<SupportiInput
					type={'input'}
					value={userAccountInfo.ACCOUNT_PASSWORD}
					setValue={(value) => {
						setUserAccountInfo({
							...userAccountInfo,
							ACCOUNT_PASSWORD: value,
						});
					}}
					placeholder="선택한 계좌의 비밀번호 4자리 입력"
					width={300}
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
					width={300}
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
			{ APP_MEMBER_IDENTIFICATION_CODE: 1, ...sendData },
			(response: any) => {
				setAccountList(response.data.result);
				setGetCertModalOpen(!getCertModalOpen);
			},
			(err: any) => {
				console.log(err);
			}
		);
	};

	const registerAccount = async () => {
		bankController.registerBankAccount(
			{
				APP_MEMBER_IDENTIFICATION_CODE: 1,
				BURN_RATE_START_DATE: '2022-03-30',
				BURN_RATE_END_DATE: '2022-06-30',
			},
			(response: any) => {
				setAccountList(response.data.result);
				setGetCertModalOpen(!getCertModalOpen);
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

						//* 모든 계좌 불러오는 백엔드 api 호출
						getAccountList();
					} else {
						window.alert(res.data.errMsg);
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
			START_DATE: '2022-03-30',
		});
	}, [loginMethod]);

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
					width: '70%',
				}}
				btnIsGradient
				btnContents="등록하기"
				btnOnClick={() => registerAccount()}
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

						{/** 계좌 불러오는 방식 (id, cert) 에 따라 폼 또는 인증서 선택 버튼 보여지는 섹션 */}
						<Box
							p={5}
							display={'flex'}
							gap={1}
							flexDirection={'column'}
						>
							{loginMethod === 'SIGN_IN' ? (
								IdRegisterForm.map((item, index) => {
									return (
										<Box display={'flex'}>
											<Typography m={'auto'}>
												{item.title}
											</Typography>
											{item.component}
										</Box>
									);
								})
							) : (
								<SupportiButton
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
							{AccountForm.map((item, index) => {
								return (
									<Box display={'flex'}>
										<Typography m={'auto'}>
											{item.title}
										</Typography>
										{item.component}
									</Box>
								);
							})}
						</Box>
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
			/>
		</Box>
	);
};

export default AccountRegisterModal;
