import React from 'react';

import { Box, BoxProps, Divider, Typography } from '@mui/material';
import { IBankAccount } from '../../../../../../@types/model';
import SuppportiModal from '../../../../../global/SuppportiModal';
import SupportiInput from '../../../../../global/SupportiInput';
import axios from 'axios';
import SupportiButton from '../../../../../global/SupportiButton';
import SupportiToggle from '../../../../../global/SupportiToggle';
import GetCertModal from '../GetCertModal/GetCertModal';

interface IAccountRegisterModalProps {
	accountRegisterModalOpen: boolean;
	setAccountRegisterModalOpen: (open: boolean) => void;
}

const AccountRegisterModal = (props: IAccountRegisterModalProps) => {
	//* Modules
	/**
	 * 컨트롤러들
	 */

	//* States
	const [registerType, setRegisterType] = React.useState<string>('id');
	const [isMac, setIsMac] = React.useState<boolean>(false);

	const [certList, setCertList] = React.useState([]);
	const [certInfo, setCertInfo] = React.useState({
		path: '',
		signPw: '',
	});

	const [getCertModalOpen, setGetCertModalOpen] =
		React.useState<boolean>(false);

	const [userAccountInfo, setUserAccountInfo] = React.useState({
		bankCode: '',
		loginMethod: registerType,
		hyphenUserId: '',
		hyphenUserPw: '',
		hyphenSignCert: '',
		hyphenSignPri: '',
		hyphenSignPw: '',
		hyphenAcctNo: '',
		hyphenAcctPw: '',
		accountNickname: '',
		accountHolder: '',
		accountNumber: '',
	});

	//* Constants
	//은행코드
	const BankCode = {
		산업은행: '002',
		기업은행: '003',
		국민은행: '004',
		수협은행: '007',
		농협은행: '011',
		우리은행: '020',
		SC은행: '023',
		씨티은행: '027',
		대구은행: '031',
		부산은행: '032',
		광주은행: '034',
		제주은행: '035',
		전북은행: '037',
		경남은행: '039',
		새마을: '045',
		신협: '048',
		우체국: '079',
		하나은행: '081',
		신한은행: '088',
		K뱅크: '089',
		카카오뱅크: '090',
	};

	//* id, pw로 계좌 불러오는 폼
	const IdRegisterForm = [
		{
			title: '은행',
			component: (
				<SupportiInput
					type="select"
					value={userAccountInfo.bankCode}
					setValue={(value) => {
						setUserAccountInfo({
							...userAccountInfo,
							bankCode: value,
						});
					}}
					dataList={BankCode}
					width={300}
					defaultValue={Object.keys(BankCode)[0]}
				/>
			),
		},
		{
			title: '은행사 ID',
			component: (
				<SupportiInput
					type={'input'}
					value={userAccountInfo.hyphenUserId}
					setValue={(value) => {
						setUserAccountInfo({
							...userAccountInfo,
							hyphenUserId: value,
						});
					}}
					placeholder="은행사 ID 입력"
					width={300}
				/>
			),
		},
		{
			title: '은행사 PW',
			component: <Typography>버튼 인 인풋</Typography>,
		},
	];

	//* 계좌 관련 정보 입력 폼
	const AccountForm = [
		{
			title: '계좌',
			component: (
				<SupportiInput
					type="select"
					value={userAccountInfo.accountNumber}
					setValue={(value) => {
						setUserAccountInfo({
							...userAccountInfo,
							bankCode: value,
						});
					}}
					dataList={BankCode}
					width={300}
					defaultValue={Object.keys(BankCode)[0]}
				/>
			),
		},
		{
			title: '계좌 비밀번호',
			component: (
				<SupportiInput
					type={'input'}
					value={userAccountInfo.hyphenUserId}
					setValue={(value) => {
						setUserAccountInfo({
							...userAccountInfo,
							hyphenUserId: value,
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
					value={userAccountInfo.hyphenUserId}
					setValue={(value) => {
						setUserAccountInfo({
							...userAccountInfo,
							hyphenUserId: value,
						});
					}}
					placeholder="계좌 별칭 입력"
					width={300}
				/>
			),
		},
	];

	//* Functions

	// const callAllAccount = async (hyphenData) => {
	//   setLoading(true)
	//   await api.post('/hyphen/bank-account', hyphenData)
	//     .then((res) => {
	//       setLoading(false)
	//       setAccountList(res.data.accountList)
	//     })
	//     .catch((e) => {
	//       setLoading(false)
	//       window.alert(e)
	//     })
	// }

	// const saveAccount = async () => {
	//   if (hyphenData.accountNickname === "") {
	//     window.alert("계좌 별칭을 입력해주세요.")
	//   } else {
	//     await api.post('/bank-account', hyphenData)
	//       .then((res) => { getAccountList() })
	//       .catch((e) => { })
	//   }
	// }

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
							hyphenSignCert: DER2PEM,
							hyphenSignPri: KEY2PEM,
							hyphenSignPw: userAccountInfo.hyphenSignPw,
						});

						//* 모든 계좌 불러오는 백엔드 api 호출

						setGetCertModalOpen(!getCertModalOpen);
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

	//* 인증서 유효성 검사
	const authCert = () => {
		const inJson = {
			orgCd: '',
			svcCd: '',
			appCd: '',
			signCert: '',
			signPri: '',
			signPw: '',
		};
		inJson.orgCd = 'common';
		inJson.svcCd = 'getCertInfo';
		inJson.appCd = 'HYPHEN'; //발급받은 application 코드
		if (isMac) {
			inJson.signCert = certInfo.path + '/signCert.der';
			inJson.signPri = certInfo.path + '/signPri.key';
		} else {
			inJson.signCert = certInfo.path + '\\signCert.der';
			inJson.signPri = certInfo.path + '\\signPri.key';
		}
		inJson.signPw = certInfo.signPw;
		getCert('execute', JSON.stringify(inJson));
	};

	//* Hooks
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
				btnOnClick={() => authCert()}
				children={
					<Box>
						{/** 계좌 불러오는 방식 선택하는 토글 섹션 */}
						<SupportiToggle
							chipDataList={[
								{ label: '은행사 정보 입력', value: 'id' },
								{ label: '인증서 등록', value: 'cert' },
							]}
							value={registerType}
							setValue={(value) =>
								setRegisterType(value as string)
							}
						/>

						{/** 계좌 불러오는 방식 (id, cert) 에 따라 폼 또는 인증서 선택 버튼 보여지는 섹션 */}
						<Box
							p={5}
							display={'flex'}
							gap={1}
							flexDirection={'column'}
						>
							{registerType === 'id' ? (
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
			/>
		</Box>
	);
};

export default AccountRegisterModal;
