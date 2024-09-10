import React, { useEffect } from 'react';

import { NextPage } from 'next';

import {
	Box,
	BoxProps,
	FormControl,
	FormControlLabel,
	FormLabel,
	Radio,
	RadioGroup,
	Typography,
} from '@mui/material';
import LightbulbOutlinedIcon from '@mui/icons-material/LightbulbOutlined';
import { useRouter } from 'next/router';
import DefaultController from '@leanoncompany/supporti-ark-office-project/src/controller/default/DefaultController';
import SupportiButton from '../../../src/views/global/SupportiButton';
import { SupportiAlertModal } from '../../../src/views/global/SupportiAlertModal';
import { useUserAccess } from '../../../src/hooks/useUserAccess';
import { useAppMember } from '../../../src/hooks/useAppMember';

const Page: NextPage = () => {
	//* Modules
	const router = useRouter();
	const themeProductController = new DefaultController('ThemeProduct');
	const { pid } = router.query;
	//* Hooks
	const { access } = useUserAccess('SIGN_IN');
	/**
	 * 유저 아이디 가져오는 훅
	 */
	const { memberId, memberEmailId } = useAppMember();
	//* States
	/**
	 * 테마 데이터
	 */
	const [themeData, setThemeData] = React.useState<any>(null);

	/**
	 * 알럿 모달
	 */
	const [alertModal, setAlertModal] = React.useState<boolean>(false);
	/**
	 * 알럿 모달 타입
	 */
	const [alertModalType, setAlertModalType] = React.useState<
		'themeApplySuccess' | 'login' | 'already' | 'themeExceed' | 'themeApply'
	>('themeApplySuccess');

	const checkApplication = () => {
		let result = false;

		if (themeData?.ThemeApplications) {
			for (let i = 0; i < themeData.ThemeApplications.length; i++) {
				if (
					themeData?.ThemeApplications[i].USE_YN == 'Y' &&
					themeData?.ThemeApplications[i].CANCELED_YN == 'N' &&
					themeData?.ThemeApplications[i]
						.APP_MEMBER_IDENTIFICATION_CODE == memberId
				) {
					result = true;
				}
			}
		}
		return result;
	};

	/**
	 * 테마 데이터 조회
	 */
	useEffect(() => {
		themeProductController.getOneItem(
			{ THEME_PRODUCT_IDENTIFICATION_CODE: pid },
			(res) => {
				setThemeData(res.data.result);
			},
			(err) => {}
		);
	}, [pid]);

	return (
		themeData != null && (
			<Box
				display={'flex'}
				width={'100%'}
				p={{
					xs: 2,
					md: 10,
				}}
				minHeight={'100vh'}
				flexDirection={'column'}
			>
				<Box
					display={'flex'}
					flexDirection={'column'}
					width={{
						md: '80%',
						xs: '100%',
					}}
					position={'relative'}
					margin={'auto'}
					p={{
						xs: 1,
						md: 5,
					}}
					minHeight={'90vh'}
				>
					{/* 테마 헤더 */}
					<Box
						p={3}
						bgcolor={'primary.light'}
						display={{ xs: 'block', md: 'flex' }}
						justifyContent={'space-between'}
						borderRadius={2}
					>
						<Typography variant={'h4'} fontWeight={'600'}>
							{themeData?.TITLE}
						</Typography>
						<Box
							display={'flex'}
							gap={3}
							mt={{
								xs: 2,
								md: 0,
							}}
							alignItems={{
								xs: 'start',
								md: 'center',
							}}
							flexDirection={{
								xs: 'column',
								md: 'row',
							}}
						>
							<Typography variant={'body1'}>
								{themeData?.ThemeCategory?.CONTENT}
							</Typography>
							<Typography variant={'body1'}>
								{themeData?.ThemeSubCategory?.SUB_CONTENT}
							</Typography>
							<Typography variant={'body1'}>
								정원 : {themeData?.COUNT} 명
							</Typography>
							{themeData?.REAL_PRICE == 0 ? (
								<Typography variant={'body1'}>무료</Typography>
							) : (
								<Typography variant={'body1'}>
									{themeData?.REAL_PRICE} 원
								</Typography>
							)}

							<Typography
								sx={{
									p: 0.8,
									border: '1px solid #c8c8c8',
									borderRadius: 5,
									cursor: 'pointer',
									borderColor: 'primary.main',
									color: 'primary.main',
								}}
							>
								{themeData?.ONLINE_YN == 'Y'
									? '온라인'
									: '오프라인'}
							</Typography>
						</Box>
					</Box>
					<Box
						sx={{
							display: 'flex',
							flexDirection: 'column',
							width: '100%',
							alignItems: 'center',
							justifyContent: 'center',
							mt: 3,
						}}
						gap={5}
					>
						{/* 테마 내용 */}
						<Box
							display={'flex'}
							flexDirection={'column'}
							width={'100%'}
							p={2}
							bgcolor={'#f9f9f9'}
						>
							<Box
								width={'100%'}
								sx={{
									display: 'flex',
									flexDirection: {
										md: 'row',
										xs: 'column',
									},
									overflow: 'hidden',
									marginTop: 2,
								}}
								gap={3}
							>
								<LightbulbOutlinedIcon />
								<Typography
									fontWeight={600}
									variant="h6"
									color={'#363636'}
									sx={{
										wordBreak: 'break-word',
										display: 'flex',
										flexWrap: 'wrap',
										lineHeight: 1.8,
									}}
								>
									{themeData?.DESCRIPTION}
								</Typography>
							</Box>
						</Box>
						{JSON.parse(themeData?.IMAGE).length > 0 && (
							<>
								<Box
									sx={{
										display: 'flex',
										alignContent: 'center',
										justifyContent: 'center',
									}}
									width={{
										md: '75%',
										xs: '100%',
									}}
								>
									<img
										src={JSON.parse(themeData?.IMAGE)[0]}
										alt=""
										width={'100%'}
									/>
								</Box>
							</>
						)}
					</Box>
				</Box>
				{/* 신청하기 버튼 */}
				{/* <Box
					display={'flex'}
					width={'100%'}
					position={'sticky'}
					justifyContent={'center'}
					bottom={0}
					left={0}
				>
					<SupportiButton
						contents={!checkApplication() ? '신청하기' : '신청완료'}
						isGradient={true}
						onClick={() => {}}
						style={{
							color: 'white',
							width: '200px',
						}}
					/>
				</Box> */}
				{/* <SupportiAlertModal
					type={alertModalType}
					open={alertModal}
					handleClose={() => setAlertModal(false)}
					customHandleClose={
						alertModalType == 'themeApply'
							? () => {}
							: alertModalType == 'themeApplySuccess'
							? () => {
								//결제 페이지로 이동
									
							  }
							: undefined
					}
				/> */}
			</Box>
		)
	);
};

export default Page;
