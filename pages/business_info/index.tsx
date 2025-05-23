import React, { useEffect, useState } from 'react';
import { NextPage } from 'next';
import {
	Box,
	TextField,
	Typography,
	ToggleButton,
	ToggleButtonGroup,
} from '@mui/material';
import SupportiButton from '../../src/views/global/SupportiButton';
import { useRouter } from 'next/router';
import { CookieManager } from '@leanoncompany/supporti-utility';
import SupportiInput from '../../src/views/global/SupportiInput';
import DefaultController from '@leanoncompany/supporti-ark-office-project/src/controller/default/DefaultController';
import fieldConfig from '../../configs/data/FieldConfig';

const Page: NextPage = () => {
	//* Modules
	const controller = new DefaultController('GsicBusiness');
	const router = useRouter();
	const cookie = new CookieManager();

	//* States
	const [companyName, setCompanyName] = useState<string>('');
	const [representativeName, setRepresentativeName] = useState<string>('');
	const [phoneNumber, setPhoneNumber] = useState<string>('');
	const [email, setEmail] = useState<string>('');
	const [introduction, setIntroduction] = useState<string>('');
	const [isCorporation, setIsCorporation] = useState<boolean>(false);
	const [formationDate, setFormationDate] = useState<Date | null>(null);
	const [salesAmount, setSalesAmount] = useState<string>('');
	const [irDeckFile, setIrDeckFile] = React.useState<any>({
		FILE_NAME: 'ppt, pdf, hwp, pcdx, zip (200mb이하)',
		FILE_URL: '',
	});
	const [wantedMatchingField, setWantedMatchingField] = useState<string[]>(
		[]
	);
	const [providedMatchingField, setProvidedMatchingField] = useState<
		string[]
	>([]);
	const [emailError, setEmailError] = useState<string>('');

	const isValidEmail = (email: string) => {
		const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
		return emailRegex.test(email);
	};

	const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		setEmail(value);
		if (value && !isValidEmail(value)) {
			setEmailError('올바른 이메일 형식을 입력해주세요.');
		} else {
			setEmailError('');
		}
	};

	const save = async () => {
		if (
			!companyName ||
			!representativeName ||
			!phoneNumber ||
			!email ||
			!introduction ||
			!salesAmount ||
			!irDeckFile ||
			!wantedMatchingField ||
			!providedMatchingField
		) {
			alert('필수 항목을 입력해주세요.');
			return;
		}
		const id = await cookie.getItemInCookies(
			'GSIC_MEMBER_IDENTIFICATION_CODE'
		);
		controller.createItem(
			{
				GSIC_MEMBER_IDENTIFICATION_CODE: id,
				COMPANY_NAME: companyName,
				REPRESENTATIVE_NAME: representativeName,
				PHONE_NUMBER: phoneNumber,
				EMAIL: email,
				BUSINESS_ITEM_INTRODUCTION: introduction,
				IS_CORPORATION: isCorporation ? 'Y' : 'N',
				FORMATION_DATE: formationDate,
				PREVIOUS_YEAR_SALES_AMOUNT: salesAmount,
				IR_DECK: JSON.stringify(irDeckFile.FILE_URL),
				WANTED_MATCHING_FIELD: JSON.stringify(wantedMatchingField),
				PROVIDED_MATCHING_FIELD: JSON.stringify(providedMatchingField),
			},
			(res) => {
				if (res.data.result) {
					alert('저장 완료');
					router.push('/');
				}
			},
			(err) => {
				console.log(err);
			}
		);

		const formData = new FormData();
		formData.append(
			'APP_MEMBER_ORGAN_IDENTIFICATION_CODE',
			cookie.getItemInCookies('BUSINESS_ACCESS_TOKEN') || ''
		);
		formData.append('COMPANY_NAME', companyName);
		formData.append('REPRESENTATIVE_NAME', representativeName);
		formData.append('PHONE_NUMBER', phoneNumber);
		formData.append('EMAIL', email);
		formData.append('BUSINESS_ITEM_INTRODUCTION', introduction);
		formData.append('IS_CORPORATION', isCorporation ? 'Y' : 'N');
		if (formationDate) {
			formData.append(
				'FORMATION_DATE',
				formationDate.toISOString().split('T')[0]
			);
		}
		formData.append('PREVIOUS_YEAR_SALES_AMOUNT', salesAmount);
		if (irDeckFile) {
			formData.append('file', irDeckFile);
		}
		formData.append(
			'WANTED_MATCHING_FIELD',
			JSON.stringify(wantedMatchingField)
		);
		formData.append(
			'PROVIDED_MATCHING_FIELD',
			JSON.stringify(providedMatchingField)
		);
	};

	return (
		<Box
			sx={{
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				width: '100%',
				minHeight: '100vh',
				bgcolor: 'white',
			}}
		>
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					maxWidth: '500px',
					pt: 6,
				}}
			>
				<Typography variant="h5" sx={{ fontWeight: 600, mb: 5 }}>
					기업 정보 입력하기
				</Typography>

				<Box sx={{ mb: 3 }}>
					<Box sx={{ display: 'flex', mb: 1 }}>
						<Typography>기업명</Typography>
						<Typography color="error">*</Typography>
					</Box>
					<TextField
						fullWidth
						value={companyName}
						onChange={(e) => setCompanyName(e.target.value)}
						placeholder="기업명을 입력해주세요."
						variant="outlined"
						sx={{ bgcolor: 'white' }}
					/>
				</Box>

				<Box sx={{ mb: 3 }}>
					<Box sx={{ display: 'flex', mb: 1 }}>
						<Typography>대표자</Typography>
						<Typography color="error">*</Typography>
					</Box>
					<TextField
						fullWidth
						value={representativeName}
						onChange={(e) => setRepresentativeName(e.target.value)}
						placeholder="대표자 이름을 입력해주세요."
						variant="outlined"
						sx={{ bgcolor: 'white' }}
					/>
				</Box>

				<Box sx={{ mb: 3 }}>
					<Box sx={{ display: 'flex', mb: 1 }}>
						<Typography>
							대표자 휴대전화번호 ( - 없이 입력)
						</Typography>
						<Typography color="error">*</Typography>
					</Box>
					<TextField
						fullWidth
						value={phoneNumber}
						onChange={(e) =>
							setPhoneNumber(
								e.target.value.replace(/[^0-9]/g, '')
							)
						}
						placeholder="대표자 휴대전화번호를 입력해주세요."
						variant="outlined"
						sx={{ bgcolor: 'white' }}
					/>
				</Box>

				<Box sx={{ mb: 3 }}>
					<Box sx={{ display: 'flex', mb: 1 }}>
						<Typography>대표자 이메일</Typography>
						<Typography color="error">*</Typography>
					</Box>
					<TextField
						fullWidth
						value={email}
						onChange={handleEmailChange}
						placeholder="대표자 이메일을 입력해주세요."
						variant="outlined"
						error={!!emailError}
						helperText={emailError}
						sx={{ bgcolor: 'white' }}
					/>
				</Box>

				<Box sx={{ mb: 3 }}>
					<Box sx={{ display: 'flex', mb: 1 }}>
						<Typography>주력 사업 아이템 소개</Typography>
						<Typography color="error">*</Typography>
					</Box>
					<TextField
						fullWidth
						value={introduction}
						onChange={(e) => setIntroduction(e.target.value)}
						placeholder="예) 온라인 메신저 플랫폼"
						variant="outlined"
						sx={{ bgcolor: 'white' }}
					/>
				</Box>

				<Box sx={{ mb: 3 }}>
					<Box sx={{ display: 'flex', mb: 1 }}>
						<Typography>법인설립여부</Typography>
						<Typography color="error">*</Typography>
					</Box>
					<ToggleButtonGroup
						value={isCorporation}
						exclusive
						onChange={(e, value) => setIsCorporation(value)}
						sx={{ bgcolor: 'white' }}
					>
						<ToggleButton value={true}>설립</ToggleButton>
						<ToggleButton value={false}>미설립</ToggleButton>
					</ToggleButtonGroup>
				</Box>

				<Box sx={{ mb: 3 }}>
					<Typography sx={{ mb: 1 }}>설립연도/월</Typography>
					<SupportiInput
						type="datepicker"
						value={formationDate}
						setValue={setFormationDate}
					/>
				</Box>

				<Box sx={{ mb: 3 }}>
					<Box sx={{ display: 'flex', mb: 1 }}>
						<Typography>직전년도 매출액</Typography>
						<Typography color="error">*</Typography>
					</Box>
					<TextField
						select
						fullWidth
						value={salesAmount}
						onChange={(e) => setSalesAmount(e.target.value)}
						variant="outlined"
						sx={{ bgcolor: 'white' }}
						SelectProps={{
							native: true,
						}}
					>
						<option value="">선택해주세요</option>
						<option value="5천만원 이하">5천만원 이하</option>
						<option value="5천만원~1억원">5천만원~1억원</option>
						<option value="1억원~5억원">1억원~5억원</option>
						<option value="5억원 이상">5억원 이상</option>
					</TextField>
				</Box>

				<Box sx={{ mb: 3 }}>
					<Box sx={{ display: 'flex', mb: 1 }}>
						<Typography>IR DECK 파일</Typography>
						<Typography color="error">*</Typography>
					</Box>
					<SupportiInput
						type="fileinput"
						value={irDeckFile}
						setValue={setIrDeckFile}
						fileTypeInputName
						fileTypeInputNameMaxSize={{
							unit: 'MB',
							size: 200,
						}}
						additionalProps={{
							inputProps: {
								accept: '.pdf, .ppt, .hwp, .pcdx, .zip',
							},
						}}
					/>
				</Box>

				<Box sx={{ mb: 3 }}>
					<Box sx={{ display: 'flex', mb: 1 }}>
						<Typography>원하는 매칭 분야</Typography>
						<Typography color="error">*</Typography>
					</Box>
					<ToggleButtonGroup
						value={wantedMatchingField}
						onChange={(event, newValue) => {
							setWantedMatchingField(newValue);
						}}
						aria-label="매칭 분야 선택"
						sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}
					>
						{fieldConfig.map((field) => (
							<ToggleButton key={field} value={field}>
								{field}
							</ToggleButton>
						))}
					</ToggleButtonGroup>
				</Box>

				<Box sx={{ mb: 3 }}>
					<Box sx={{ display: 'flex', mb: 1 }}>
						<Typography>제공 가능한 매칭 분야</Typography>
						<Typography color="error">*</Typography>
					</Box>
					<Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
						{fieldConfig.map((field) => (
							<ToggleButton key={field} value={field}>
								{field}
							</ToggleButton>
						))}
					</Box>
				</Box>

				<SupportiButton
					fullWidth
					onClick={save}
					isGradient={true}
					contents="저장"
					style={{
						color: '#fff',
						height: '48px',
						borderRadius: '8px',
						fontSize: '15px',
						fontWeight: 600,
					}}
				/>
			</Box>
		</Box>
	);
};

export default Page;
