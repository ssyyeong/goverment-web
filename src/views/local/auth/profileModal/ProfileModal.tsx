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
import DefaultController from '@leanoncompany/supporti-ark-office-project/src/controller/default/DefaultController';

interface IProfileModalProps {
	open: boolean;
	handleClose: () => void;
	profile: any;
}

//* A2E 커뮤니티 프로필 모달
const ProfileModal = (props: IProfileModalProps) => {
	//* Modules

	return (
		<SupportiModal
			open={props.open}
			handleClose={() => {
				props.handleClose();
			}}
			activeHeader={false}
			muiModalProps={{
				width: { sm: '30%', xs: '100%' },
			}}
			style={{
				minWidth: '30%',
				width: { sm: '30%', xs: '100%' },
				p: { xs: 2, md: 2 },
			}}
		>
			{props.profile !== undefined && (
				<Box
					width={'100%'}
					display="flex"
					flexDirection="column"
					gap={5}
				>
					<Box display="flex" alignItems={'center'}>
						<img
							alt="expertImg"
							style={{
								borderRadius: '50%',
								width: '100px',
								height: '100px',
								objectFit: 'cover',
							}}
							src={JSON.parse(props.profile?.PROFILE_IMAGE)[0]}
						/>
						<Box ml={4}>
							<Box
								display="flex"
								gap={0.5}
								mb={1}
								alignItems={'baseline'}
							>
								<Typography fontWeight={600} variant="h6">
									{props.profile.PartnerMember.FULL_NAME}
								</Typography>
								<Typography
									fontWeight={600}
									variant="subtitle2"
								>
									{props.profile.EXPERT_TYPE}
								</Typography>
							</Box>
							<Typography
								color="secondary.dark"
								fontWeight={600}
								variant="subtitle2"
							>
								{props.profile.COMPANY_NAME}
							</Typography>
						</Box>
					</Box>
					<Box>
						<Typography variant="h6" fontWeight={700} mb={1}>
							경력
						</Typography>
						{JSON.parse(props.profile.CAREER).map(
							(career: any, index: number) => {
								return (
									<Typography
										key={index}
										color="secondary.dark"
										variant="subtitle2"
									>
										&#8226; {career}
									</Typography>
								);
							}
						)}
					</Box>

					<Box>
						{/** Contact */}
						<Box display="flex" gap={1} mb={1}>
							<MailOutlineIcon />
							<Typography
								color="secondary.dark"
								sx={{
									// textDecoration: 'underline',
									mt: 'auto',
									mb: 'auto',
								}}
								variant="subtitle1"
							>
								{props.profile.CONTACT_EMAIL}
							</Typography>
						</Box>
						<Box display="flex" gap={1}>
							<PhoneIcon />
							<Typography
								color="secondary.dark"
								mt="auto"
								mb="auto"
								variant="subtitle1"
							>
								{props.profile.CONTACT_NUMBER}
							</Typography>
						</Box>
					</Box>
				</Box>
			)}
		</SupportiModal>
	);
};

export default ProfileModal;
