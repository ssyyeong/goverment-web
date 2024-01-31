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
import InternalServiceDrawer from '../../../src/views/local/internal_service/common/InternalServiceDrawer';
import { InternalServiceLayout } from '../../../src/views/layout/InternalServiceLayout';
import DefaultController from '@leanoncompany/supporti-ark-office-project/src/controller/default/DefaultController';
import { useAppMember } from '../../../src/hooks/useAppMember';
import LockIcon from '@mui/icons-material/Lock';

const Page: NextPage = () => {
	//* Modules
	const questionController = new DefaultController('A2eQuestion');
	const answerController = new DefaultController('A2eAnswer');

	const { memberId } = useAppMember();

	const router = useRouter();
	const { pid } = router.query;
	//* States
	/**
	 * 페이지 진입 시 유저 권한 검사
	 */
	const { access } = useUserAccess('SIGN_IN');

	/**
	 *
	 * 선택 글
	 */
	const [question, setQuestion] = React.useState<any>(undefined);

	/**
	 *
	 * 선택 글 답변
	 */
	const [answer, setAnswer] = React.useState<any>(undefined);

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
	 *  삭제 확인 알럿
	 */
	const [alertModal, setAlertModal] = React.useState<boolean>(false);

	/**
	 *
	 *  삭제 성공 알럿
	 */
	const [successDeleteAlert, setSuccessDeleteAlert] =
		React.useState<boolean>(false);

	/**
	 * 프로필 모달
	 */
	const [isProfileOpened, setIsProfileOpened] = React.useState(false);

	//* Functions
	const deleteQuestion = () => {
		questionController.deleteItem(
			{
				A2E_QUESTION_IDENTIFICATION_CODE: pid,
			},
			(res) => {
				setSuccessDeleteAlert(true);
			},
			(err) => {}
		);
	};

	//* Hooks
	React.useEffect(() => {
		//* 초기 데이터 셋팅

		if (pid) {
			questionController.getOneItem(
				{
					A2E_QUESTION_IDENTIFICATION_CODE: pid,
				},
				(res) => {
					setQuestion(res.data.result);
					answerController.findOne(
						{
							A2E_QUESTION_IDENTIFICATION_CODE: pid,
						},
						(res) => {
							setAnswer(res.data.result);
						},
						(err) => {}
					);
				},
				(err) => {}
			);
		}
	}, [pid]);

	console.log(question);
	console.log(answer, pid);

	return (
		<InternalServiceDrawer type="dashboard">
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					width: '100%',
					p: { xs: 2, md: 10 },
				}}
			>
				{/* 컨텐츠 레이아웃 */}
				{access === true && (
					<InternalServiceLayout
						title="A2E(Ask to Experts)"
						subTitle="부담없이 전문가에게 질문해보세요. 	평소에 전문가들에게 묻고 싶었던 질문을 자유롭게
          질문하고 다른 사업가 분들의 답변도 확인하세요."
						image="/images/main/business.png"
						mobileImage="/images/main/businessMoblie.png"
					>
						<Box
							sx={{
								display: 'flex',
								flexDirection: 'column',
								width: '100%',
								height: '100%',
								minHeight: '100vh',
								p: { xs: 2, md: 2 },
								// bgcolor: 'white',
								gap: 2,
							}}
						>
							<SupportiButton
								variant="outlined"
								style={{
									width: '90px',
									height: '25px',
									backgroundColor: 'white',
									color: 'primary.main',
									cursor: 'pointer',
								}}
								contents={'목록으로'}
								onClick={() => {
									router.back();
								}}
							/>
							{/** 질문 */}
							{question !== undefined && (
								<Box
									p={5}
									borderRadius={2}
									bgcolor="primary.light"
									mb={2}
									sx={{
										boxShadow:
											'rgb(219, 219, 219) 0px 4px 10px',
									}}
								>
									<Box
										display="flex"
										justifyContent={'space-between'}
										mb={2}
									>
										<Box
											borderRadius={20}
											border="1px solid"
											borderColor={
												answer === undefined
													? 'secondary.dark'
													: 'primary.main'
											}
											p={1}
										>
											<Typography
												color={
													answer === undefined
														? 'secondary.dark'
														: 'primary.main'
												}
											>
												{answer === undefined
													? '답변 전'
													: '답변 완료'}
											</Typography>
										</Box>
										<Box display="flex" mb={2} gap={0.5}>
											{question.AppMember.FULL_NAME.split(
												''
											).map((item, index) => {
												return (
													<Typography
														color={'secondary.dark'}
													>
														{index === 0
															? item
															: '*'}
													</Typography>
												);
											})}

											<Typography
												color={'secondary.dark'}
											>
												|
											</Typography>
											<Typography
												color={'secondary.dark'}
											>
												{
													question?.UPDATED_AT?.split(
														'T'
													)[0]
												}
											</Typography>
										</Box>
									</Box>
									<Box
										display="flex"
										justifyContent={'space-between'}
									>
										<Box display="flex" gap={0.5} m={0.5}>
											<Typography
												color="primary.main"
												variant="subtitle1"
												fontWeight={600}
											>
												[{question.A2eCategory.CONTENT}]
											</Typography>
											<Typography variant="subtitle1">
												{question.TITLE}
											</Typography>
											{question.PRIVATE_YN === 'Y' && (
												<LockIcon
													sx={{
														width: '15px',
														height: '15px',

														mt: 'auto',
														mb: 'auto',
													}}
												/>
											)}
										</Box>
										<Box display="flex" gap={1}>
											{question.APP_MEMBER_IDENTIFICATION_CODE ===
												memberId &&
												question?.ANSWERED_YN ===
													'N' && (
													<Typography
														sx={{
															textDecoration:
																'underline',
															cursor: 'pointer',
														}}
														onClick={() =>
															setIsEditMode(true)
														}
													>
														수정
													</Typography>
												)}
											{question.APP_MEMBER_IDENTIFICATION_CODE ===
												memberId && (
												<Typography
													sx={{
														textDecoration:
															'underline',
														cursor: 'pointer',
													}}
													onClick={() => {
														setAlertModal(true);
													}}
												>
													삭제
												</Typography>
											)}
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

									<Box p={1}>
										<Typography>
											{question.CONTENT}
										</Typography>
									</Box>
								</Box>
							)}
							{/* 컨텐츠 레이아웃
				{access === true && (
          
				)} */}
							{/** 답변 */}
							{answer !== undefined && (
								<Box
									p={5}
									borderRadius={2}
									bgcolor="white"
									mb={2}
									sx={{
										boxShadow:
											'rgb(219, 219, 219) 0px 4px 10px',
									}}
								>
									<Box display="flex" gap={0.5} m={0.5}>
										<Typography
											color="primary.main"
											variant="subtitle1"
										>
											[{question.A2eCategory.CONTENT}]
										</Typography>
										<Typography variant="subtitle1">
											{answer.TITLE}
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
											onClick={() =>
												setIsProfileOpened(true)
											}
										/>
										<Typography
											color={'secondary.dark'}
											mt="auto"
											mb="auto"
										>
											{answer.PartnerMember.FULL_NAME}
										</Typography>
										<VerifiedIcon
											sx={{
												width: '15px',
												height: '15px',
												color: 'primary.main',
												mt: 'auto',
												mb: 'auto',
											}}
										/>
										<Typography
											color={'secondary.dark'}
											mt="auto"
											mb="auto"
										>
											|
										</Typography>
										<Typography
											color={'secondary.dark'}
											mt="auto"
											mb="auto"
										>
											{answer['UPDATED_AT'].split('T')[0]}
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
									<Box p={1}>
										<Typography>
											{answer.CONTENT}
										</Typography>
									</Box>
								</Box>
							)}
							<SupportiAlertModal
								open={alertModal}
								handleClose={() => setAlertModal(false)}
								customHandleClose={() => {
									deleteQuestion();
								}}
								type={'delete'}
							/>

							<SupportiAlertModal
								open={successDeleteAlert}
								handleClose={() => {
									setSuccessDeleteAlert(false);
									router.push('/internal_service/a2e');
								}}
								type={'successDeleteAxios'}
							/>

							{answer !== undefined && (
								<ProfileModal
									open={isProfileOpened}
									partnerId={
										answer?.PartnerMember
											.PARTNER_MEMBER_IDENTIFICATION_CODE
									}
									handleClose={() =>
										setIsProfileOpened(false)
									}
								/>
							)}
						</Box>
					</InternalServiceLayout>
				)}
			</Box>
		</InternalServiceDrawer>
	);
};

export default Page;
