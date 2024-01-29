import React, { useEffect, useState } from 'react';

import {
	Autocomplete,
	Box,
	BoxProps,
	Button,
	TextField,
	Typography,
} from '@mui/material';
import SupportiModal from '../../../global/SupportiModal';
import SupportiButton from '../../../global/SupportiButton';

import { AppMemberController } from '../../../../controller/AppMemberController';

import { useRouter } from 'next/router';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import PhoneIcon from '@mui/icons-material/Phone';

interface IProfileModalProps {
	open: boolean;
	handleClose: () => void;
	appMemberData?: any;
}

//* A2E 커뮤니티 프로필 모달
const ProfileModal = (props: IProfileModalProps) => {
	//* Modules
	const appMemberController = new AppMemberController();

	//* State

	/**
	 * 데이터 세팅
	 */
	useEffect(() => {
		if (props.appMemberData) {
			// setSignupData(props.appMemberData);
			// setRawSignupData(props.appMemberData);
		}
	}, [props.appMemberData]);

	return (
		<SupportiModal
			open={props.open}
			handleClose={() => {
				props.handleClose();
			}}
			activeHeader={false}
			title=""
			muiModalProps={{
				width: { sm: '40%', xs: '100%' },
			}}
			style={{
				minWidth: '40%',
				width: { sm: '40%', xs: '100%' },
			}}
		>
			<Box mb={3} width={'100%'}>
				<Box display="flex">
					<img />
					<Box>
						<Box display="flex">
							<Typography fontWeight={600}></Typography>
							<Typography></Typography>
						</Box>
						<Typography color='secondary.dark'></Typography>
					</Box>
				</Box>
				<Box>
					<Typography>경력</Typography>
				</Box>
				<Box display="flex">
					<MailOutlineIcon />
					<Typography></Typography>
				</Box>
				<Box display="flex">
					<PhoneIcon />
					<Typography></Typography>
				</Box>
			</Box>
		</SupportiModal>
	);
};

export default ProfileModal;
