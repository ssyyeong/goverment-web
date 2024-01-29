import { Box, Grid, Typography } from '@mui/material';
import { NextPage } from 'next';
import React from 'react';
import { useUserAccess } from '../../../../src/hooks/useUserAccess';
import SupportiInput from '../../../../src/views/global/SupportiInput';
import SupportiButton from '../../../../src/views/global/SupportiButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useRouter } from 'next/router';
import { SupportiAlertModal } from '../../../../src/views/global/SupportiAlertModal';

const Page: NextPage = () => {
	//* Modules
	const router = useRouter();

	//* States
	/**
	 * 페이지 진입 시 유저 권한 검사
	 */
	const { access } = useUserAccess('BUSINESS_MEMBER');

	/**
	 * 질문 제목
	 */
	const [title, setTitle] = React.useState();

	/**
	 * 질문 내용
	 */
	const [contents, setContents] = React.useState();

	/**
	 * 선택 가능한 탭 카테고리
	 */
	const [selectableCategory, setSelectableCategory] = React.useState([
		'전체',
		'노무',
		'세무',
		'법률',
	]);

	/**
	 *
	 * 선택한 탭 카테고리
	 */
	const [selectedCategory, setSelectedCategory] = React.useState<string>(
		selectableCategory[0]
	);

	/**
	 *
	 * 비밀글 여부
	 */

	const [isSecret, setIsSecret] = React.useState<boolean>(false);

	/**
	 *
	 * 정상 등록 알럿
	 */
	const [alertType, setAlertType] = React.useState();
	const [alertModal, setAlertModal] = React.useState<boolean>(false);

	//* Hooks

	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'column',
				ml: 'auto',
				mr: 'auto',
				width: { xs: '100%', md: '80%' },
				height: '100%',
				minHeight: '100vh',
				p: { xs: 1, md: 15 },
				bgcolor: 'white',
				gap: 2,
			}}
		>
			<Box display="flex" onClick={() => router.back()}>
				<ArrowBackIcon
					sx={{
						width: '18px',
						height: '18px',
						color: 'primary.main',
						cursor: 'pointer',
					}}
				/>
				<Typography
					color="primary.main"
					mt="auto"
					mb="auto"
					ml={0.5}
					sx={{
						cursor: 'pointer',
					}}
				>
					뒤로가기
				</Typography>
			</Box>
			<Box
				py={5}
				borderRadius={2}
				bgcolor="white"
				mb={2}
				sx={{
					boxShadow: 'rgb(219, 219, 219) 0px 4px 10px',
					px: {
						xs: 3,
						md: 8,
					},
				}}
				display="flex"
				flexDirection={'column'}
				gap={2}
			>
				<Typography variant="h4" fontWeight={600} mb={5}>
					질문하기
				</Typography>
				<Box display="flex" justifyContent="space-between">
					<Typography
						variant="subtitle1"
						fontWeight={600}
						mt="auto"
						mb="auto"
					>
						제목
					</Typography>
					<SupportiInput
						type="input"
						additionalProps={{
							placeholder: '제목을 입력하세요.',
						}}
						value={title}
						setValue={setTitle}
						width={'80%'}
					/>
				</Box>
				<Box display="flex" justifyContent="space-between">
					<Typography
						variant="subtitle1"
						fontWeight={600}
						mt="auto"
						mb="auto"
					>
						카테고리
					</Typography>
					<SupportiInput
						type="select"
						additionalProps={{
							placeholder: '카테고리를 선택하세요.',
						}}
						value={selectedCategory}
						setValue={setSelectedCategory}
						dataList={selectableCategory}
						width={'80%'}
					/>
				</Box>
				<Box display="flex" justifyContent="space-between">
					<Typography
						variant="subtitle1"
						fontWeight={600}
						mt="auto"
						mb="auto"
					>
						내용
					</Typography>
					<SupportiInput
						type="input"
						additionalProps={{
							placeholder: '내용을 입력하세요.',
							multiline: true,
						}}
						value={contents}
						setValue={setContents}
						width={'80%'}
						style={{
							height: '200px',
						}}
					/>
				</Box>
				<Box ml="auto" display="flex" mt={5}>
					<Box display="flex">
						<Typography mt="auto" mb="auto" mr={0.5}>
							비밀글로 등록하기
						</Typography>
						<SupportiInput
							type="checkbox"
							value={isSecret}
							setValue={setIsSecret}
						/>
					</Box>
					<SupportiButton
						contents="등록하기"
						variant="contained"
						style={{ color: 'common.white', height: '30px' }}
						isGradient={true}
						onClick={() => console.log('create')}
					/>
				</Box>
			</Box>
			{/* 컨텐츠 레이아웃
				{access === true && (
          
				)} */}
			<SupportiAlertModal
				open={alertModal}
				handleClose={() => {
					setAlertModal(false);
					router.push('/internal_service/a2e/1');
				}}
				type={alertType}
			/>
		</Box>
	);
};

export default Page;
