import { Box, Container } from '@mui/material';
import { NextPage } from 'next';
import React from 'react';

const Page: NextPage = () => {
	//* Modules

	//* States
	/**
	 * 회원 정보
	 */
	const [memberInfo, setMemberInfo] = React.useState<any>({});
	/**
	 * 회원 정보 수정 모달
	 */
	const [editProfileModal, setEditProfileModal] =
		React.useState<boolean>(false);
	/**
	 * 사업자 회원 정보 수정 모달
	 */
	const [editBusinessProfileModal, setEditBusinessProfileModal] =
		React.useState<boolean>(false);
	/**
	 * 사업자 등록 번호 진위 여부
	 */
	const [isBusinessNumberValid, setIsBusinessNumberValid] =
		React.useState<boolean>(false);
	/**
	 * 사업자 등록 정보
	 */
	const [businessInfo, setBusinessInfo] = React.useState<any>({
		BUSINESS_NUMBER: '',
		BUSINESS_NAME: '',
	});
	//* Hooks
	/**
	 *
	 */

	return <Container></Container>;
};

export default Page;
