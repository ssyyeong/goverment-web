import { Box, Grid, Typography } from '@mui/material';
import { NextPage } from 'next';
import React from 'react';
import { useUserAccess } from '../../../src/hooks/useUserAccess';
import SupportiButton from '../../../src/views/global/SupportiButton';
import SupportiInput from '../../../src/views/global/SupportiInput';
import { SupportiAlertModal } from '../../../src/views/global/SupportiAlertModal';
import { useRouter } from 'next/router';
import ProfileModal from '../../../src/views/local/auth/profileModal/ProfileModal';
import VerifiedIcon from '@mui/icons-material/Verified';

const Page: NextPage = () => {
	//* Modules
	const router = useRouter();

	//* States
	/**
	 * 페이지 진입 시 유저 권한 검사
	 */
	const { access } = useUserAccess('BUSINESS_MEMBER');

	/**
	 * 검색 키워드
	 */
	const [keyword, setKeyword] = React.useState();

	/**
	 * 선택 가능한 탭 카테고리
	 */
	const [selectableTabCategory, setSelectableTabCategory] = React.useState([
		'전체',
		'노무',
		'세무',
		'법률',
	]);

	/**
	 *
	 * 선택한 탭 카테고리
	 */
	const [selectedTabCategory, setSelectedTabCategory] =
		React.useState<string>(selectableTabCategory[0]);

	/**
	 *
	 * 수정 모드인지 여부
	 */
	const [isEditMode, setIsEditMode] = React.useState(false);

	/**
	 *
	 *  삭제 알럿
	 */
	const [alertModal, setAlertModal] = React.useState<boolean>(false);

	/**
	 * 프로필 모달
	 */
	const [isProfileOpened, setIsProfileOpened] = React.useState(false);

	//* Hooks

	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'column',
				width: '100%',
				height: '100%',
				minHeight: '100vh',
				p: { xs: 2, md: 15 },
				bgcolor: 'white',
				gap: 2,
			}}
		>
			{/** 질문 */}
			<Box
				p={5}
				borderRadius={2}
				bgcolor="primary.light"
				mb={2}
				sx={{
					boxShadow: 'rgb(219, 219, 219) 0px 4px 10px',
				}}
			>
				<Box display="flex" justifyContent={'space-between'} mb={2}>
					<Box borderRadius={20} border="1px solid #305DDC" p={1}>
						<Typography color={'primary.main'}>
							답변 상태
						</Typography>
					</Box>
					<Box display="flex" mb={2} gap={0.5}>
						{'이름입니다'.split('').map((item, index) => {
							return (
								<Typography color={'secondary.dark'}>
									{index === 0 ? item : '*'}
								</Typography>
							);
						})}

						<Typography color={'secondary.dark'}>|</Typography>
						<Typography color={'secondary.dark'}>
							생성일자
						</Typography>
					</Box>
				</Box>
				<Box display="flex" justifyContent={'space-between'}>
					<Box display="flex" gap={0.5} m={0.5}>
						<Typography color="primary.main" variant="subtitle1">
							[카테고리]
						</Typography>
						<Typography variant="subtitle1">
							질문의 제목이 들어갑니다.
						</Typography>
					</Box>
					<Box display="flex" gap={1}>
						<Typography
							sx={{
								textDecoration: 'underline',
								cursor: 'pointer',
							}}
							onClick={() => setIsEditMode(true)}
						>
							수정
						</Typography>
						<Typography
							sx={{
								textDecoration: 'underline',
								cursor: 'pointer',
							}}
							onClick={() => {
								setAlertModal(true);
							}}
						>
							삭제
						</Typography>
					</Box>
				</Box>

				{/** 구분선 */}
				<Box
					sx={{
						width: '100%',
						height: '1px',
						bgcolor: 'grey.300',
						my: 2,
					}}
				/>
			</Box>
			{/* 컨텐츠 레이아웃
				{access === true && (
          
				)} */}
			{/** 답변 */}
			<Box
				p={5}
				borderRadius={2}
				bgcolor="white"
				mb={2}
				sx={{
					boxShadow: 'rgb(219, 219, 219) 0px 4px 10px',
				}}
			>
				<Box display="flex" gap={0.5} m={0.5}>
					<Typography color="primary.main" variant="subtitle1">
						[카테고리]
					</Typography>
					<Typography variant="subtitle1">
						질문의 제목이 들어갑니다.
					</Typography>
				</Box>

				<Box display="flex" mb={2} gap={0.5} pt={2}>
					<img
						alt="expert"
						style={{
							width: '20px',
							height: '20px',
							borderRadius: '20px',
							cursor: 'pointer',
						}}
						onClick={() => setIsProfileOpened(true)}
					/>
					<Typography color={'secondary.dark'} mt="auto" mb="auto">
						이름
					</Typography>
					<VerifiedIcon
						sx={{
							width: '15px',
							height: '15px',
							color: 'primary.main',
              mt:'auto',
              mb:"auto"
						}}
					/>
					<Typography color={'secondary.dark'} mt="auto" mb="auto">
						|
					</Typography>
					<Typography color={'secondary.dark'} mt="auto" mb="auto">
						생성일자
					</Typography>
				</Box>

				{/** 구분선 */}
				<Box
					sx={{
						width: '100%',
						height: '1px',
						bgcolor: 'grey.300',
						my: 2,
					}}
				/>

				{/** 답변 내용 */}
			</Box>

			<SupportiAlertModal
				open={alertModal}
				handleClose={() => {
					setAlertModal(false);
					router.push('/internal_service/a2e/1');
				}}
				type={'delete'}
			/>

			<ProfileModal
				open={isProfileOpened}
				handleClose={() => setIsProfileOpened(false)}
			/>
		</Box>
	);
};

export default Page;
