import { Box, TextField, Typography } from '@mui/material';
import DefaultController from '@leanoncompany/supporti-ark-office-project/src/controller/default/DefaultController';
import DataUtil from '@leanoncompany/supporti-ark-office-project/src/utils/data/DataUtil';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

const Page: NextPage = () => {
	//*
	/**
	 * 쿼리 타입
	 */
	const { type } = useRouter().query;
	//* Constants
	/**
	 * 쿼리 키값에 따라 대응되는 약관 제목
	 */
	const termsTitle = {
		service: '서비스 이용약관',
		privacy: '개인정보 처리방침',
		marketing: '마케팅 정보 수신동의',
	};

	//* Modules
	/**
	 * 약관 컨트롤러 딕셔너리
	 * 1. 약관 키값에 따라 선택되는 컨트롤러가 달라져야 한다.
	 */
	const termsController = {
		service: new DefaultController('ServiceTerm'),
		privacy: new DefaultController('PrivacyTerm'),
		marketing: new DefaultController('MarketingTerm'),
	};

	const dataUtil = new DataUtil();

	//* States
	/**
	 * 약관 내용 저장하는 상태값
	 */
	const [terms, setTerms] = React.useState<string>('');

	//* Hooks
	/**
	 * 쿼리로 키값을 받아서 해당 키값에 대응되는 약관을 가져오는 훅
	 */

	useEffect(() => {
		if (type) {
			if (type === 'service') {
				termsController[type as string].getOneItem(
					{
						SERVICE_TERM_IDENTIFICATION_CODE: 1,
					},
					(res) => {
						setTerms(res.data.result.CONTENT);
					}
				);
			}
			if (type === 'privacy') {
				termsController[type as string].getOneItem(
					{
						PRIVACY_TERM_IDENTIFICATION_CODE: 1,
					},
					(res) => {
						setTerms(res.data.result.CONTENT);
					}
				);
			}
			if (type === 'marketing') {
				termsController[type as string].getOneItem(
					{
						MARKETING_TERMS_IDENTIFICATION_CODE: 1,
					},
					(res) => {
						setTerms(res.data.result.CONTENT);
					}
				);
			}
		}
	}, [type]);

	return (
		<Box p={{ md: 10, xs: 3 }}>
			{/* 약관 제목 */}
			<Typography variant="h5" fontWeight={'600'}>
				서포티 {termsTitle[type as string]}
			</Typography>
			{/* 약관 내용 */}
			<TextField
				value={terms}
				multiline
				fullWidth
				variant="outlined"
				rows={20}
				disabled
				sx={{ mt: 3 }}
			/>
		</Box>
	);
};

export default Page;
