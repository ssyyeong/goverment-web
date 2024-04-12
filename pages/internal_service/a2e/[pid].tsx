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
	const categoryController = new DefaultController('A2eCategory');
	const profileController = new DefaultController('ExpertProfile');

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
	 * 컨설턴트 프로필
	 */
	const [profile, setProfile] = React.useState<any>(undefined);
	/**
	 * 선택 가능한 탭 카테고리
	 */
	const [selectableCategory, setSelectableCategory] =
		React.useState(undefined);

	/**
	 *
	 * 선택한 탭 카테고리
	 */
	const [selectedCategory, setSelectedCategory] = React.useState<string>(
		selectableCategory !== undefined
			? selectableCategory[0].CONTENT
			: '전체'
	);

	/**
	 *
	 * 선택한 탭 카테고리 번호
	 */
	const [selectedCategoryNum, setSelectedCategoryNum] =
		React.useState<number>(undefined);

	/**
	 *
	 * 수정 모드인지 여부
	 */
	const [isEditMode, setIsEditMode] = React.useState(false);

	/**
	 *
	 * 비밀글 여부
	 */

	const [isSecret, setIsSecret] = React.useState<boolean>(undefined);

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
	 *
	 *  수정 성공 알럿
	 */
	const [successModifyAlert, setSuccessModifyAlert] =
		React.useState<boolean>(false);

	/**
	 * 프로필 모달
	 */
	const [isProfileOpened, setIsProfileOpened] = React.useState(false);

	/**
	 * 수정 데이터
	 */
	const [modifyData, setModifyData] = React.useState(undefined);

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

	const modifyQuestion = () => {
		questionController.updateItem(
			Object.assign(modifyData, {
				A2E_QUESTION_IDENTIFICATION_CODE: pid,
				PRIVATE_YN: isSecret ? 'Y' : 'N',
				A2E_CATEGORY_IDENTIFICATION_CODE: selectedCategoryNum,
			}),
			(res) => {
				setSuccessModifyAlert(true);
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

					if (res.data.result.A2eAnswers.length !== 0) {
						answerController.getOneItemByKey(
							{
								A2E_ANSWER_IDENTIFICATION_CODE:
									res.data.result.A2eAnswers[0]
										.A2E_ANSWER_IDENTIFICATION_CODE,
							},
							(res) => {
								setAnswer(res.data.result);

								if (res.data.result) {
									profileController.getOneItemByKey(
										{
											PARTNER_MEMBER_IDENTIFICATION_CODE:
												res.data.result.PartnerMember
													.PARTNER_MEMBER_IDENTIFICATION_CODE,
										},
										(res) => {
											setProfile(res.data.result);
										},
										(err) => {}
									);
								}
							},
							(err) => {}
						);
					}
				},
				(err) => {}
			);
		}
	}, [pid]);

	React.useEffect(() => {
		setModifyData({
			CONTENT: question?.CONTENT,
			TITLE: question?.TITLE,
		});
		setIsSecret(question?.PRIVATE_YN === 'Y' ? true : false);
	}, [isEditMode]);

	React.useEffect(() => {
		categoryController.findAllItems(
			{},
			(res) => {
				let temp = [];
				for (const [key, value] of Object.entries(
					res.data.result.rows
				)) {
					temp.push({
						value: value['A2E_CATEGORY_IDENTIFICATION_CODE'],
						label: value['CONTENT'],
					});
				}
				setSelectableCategory(temp);
			},
			(err) => {}
		);

		setModifyData({
			CONTENT: question?.CONTENT,
			TITLE: question?.TITLE,
		});

		setIsSecret(question?.PRIVATE_YN === 'Y' ? true : false);
	}, []);

	return (
		// <InternalServiceDrawer type="dashboard">
		<Box
			bgcolor={'primary.light'}
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
					image="/images/main/A2E.png"
					mobileImage="/images/main/A2EMobile.png"
				>
					<Box
						bgcolor={'primary.light'}
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
							contents={!isEditMode ? '목록으로' : '취소'}
							onClick={() => {
								if (isEditMode) {
									setIsEditMode(false);
								} else router.back();
							}}
						/>
						{/** 질문 */}
						{question !== undefined && (
							<Box
								borderRadius={2}
								bgcolor="white"
								mb={2}
								sx={{
									boxShadow:
										'rgb(219, 219, 219) 0px 4px 10px',
									p: { md: 5, xs: 2 },
								}}
							>
								{!isEditMode ? (
									<Box>
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
												px={1.5}
												py={0.8}
											>
												<Typography
													color={
														answer === undefined
															? 'secondary.dark'
															: 'primary.main'
													}
													variant="body2"
													fontWeight={500}
													my="auto"
												>
													{answer === undefined
														? '답변 전'
														: '답변 완료'}
												</Typography>
											</Box>
											<Box
												display="flex"
												mb={2}
												gap={0.5}
											>
												{question.AppMember.FULL_NAME.split(
													''
												).map((item, index) => {
													return (
														<Typography
															color={
																'secondary.dark'
															}
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
											<Box
												display="flex"
												gap={0.5}
												m={0.5}
											>
												<Typography
													color="primary.main"
													variant="subtitle1"
													fontWeight={600}
												>
													[
													{
														question.A2eCategory
															.CONTENT
													}
													]
												</Typography>
												<Typography
													variant="subtitle1"
													fontWeight={500}
												>
													{question.TITLE}
												</Typography>
												{question.PRIVATE_YN ===
													'Y' && (
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
													answer === undefined && (
														<Typography
															sx={{
																textDecoration:
																	'underline',
																cursor: 'pointer',
															}}
															onClick={() =>
																setIsEditMode(
																	true
																)
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
											{question.CONTENT.split('\n').map(
												(item, index) => {
													return (
														<Typography
															sx={{
																wordBreak:
																	'keep-all',
																lineHeight:
																	'20px',
															}}
														>
															{item}
														</Typography>
													);
												}
											)}
										</Box>
									</Box>
								) : (
									<Box>
										<Box
											display="flex"
											justifyContent="space-between"
										>
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
													placeholder:
														'제목을 입력하세요.',
												}}
												value={modifyData.TITLE}
												setValue={(e) =>
													setModifyData({
														...modifyData,
														TITLE: e,
													})
												}
												width={'80%'}
											/>
										</Box>
										<Box
											display="flex"
											justifyContent="space-between"
											my={2}
										>
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
													placeholder:
														'카테고리를 선택하세요.',

													defaultValue:
														question.A2E_CATEGORY_IDENTIFICATION_CODE,
												}}
												value={selectedCategoryNum}
												setValue={(e) =>
													setSelectedCategoryNum(e)
												}
												dataList={selectableCategory}
												style={{
													bgcolor: 'transparent',
												}}
												width={'80%'}
											/>
										</Box>
										<Box
											display="flex"
											justifyContent="space-between"
										>
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
													placeholder:
														'내용을 입력하세요.',
													multiline: true,
												}}
												value={modifyData.CONTENT}
												setValue={(e) =>
													setModifyData({
														...modifyData,
														CONTENT: e,
													})
												}
												width={'80%'}
												style={{
													height: '200px',
												}}
											/>
										</Box>
										<Box ml="auto" display="flex" mt={5}>
											<Box display="flex">
												<Typography
													mt="auto"
													mb="auto"
													mr={0.5}
												>
													비밀글로 등록하기
												</Typography>
												<SupportiInput
													type="checkbox"
													value={isSecret}
													setValue={() =>
														setIsSecret(!isSecret)
													}
												/>
											</Box>
											<SupportiButton
												contents="등록하기"
												variant="contained"
												style={{
													color: 'common.white',
													height: '30px',
												}}
												isGradient={true}
												onClick={() => modifyQuestion()}
											/>
										</Box>
									</Box>
								)}
							</Box>
						)}
						{/* 컨텐츠 레이아웃
				{access === true && (
          
				)} */}
						{/** 답변 */}
						{answer !== undefined && (
							<Box
								borderRadius={2}
								bgcolor="white"
								mb={2}
								sx={{
									boxShadow:
										'rgb(219, 219, 219) 0px 4px 10px',
									p: { xs: 2, md: 5 },
								}}
							>
								<Box display="flex" gap={0.5} m={0.5}>
									<Typography
										color="primary.main"
										variant="subtitle1"
										fontWeight={600}
									>
										[{question.A2eCategory.CONTENT}]
									</Typography>
									<Typography
										variant="subtitle1"
										fontWeight={500}
									>
										{answer?.TITLE}
									</Typography>
								</Box>

								<Box display="flex" mb={2} gap={1} pt={2}>
									<img
										alt="expert"
										style={{
											width: '30px',
											height: '30px',
											borderRadius: '20px',
											cursor: 'pointer',
										}}
										src={
											profile !== undefined &&
											JSON.parse(
												profile?.PROFILE_IMAGE
											)[0]
										}
										onClick={() => setIsProfileOpened(true)}
									/>
									<Typography
										color={'secondary.dark'}
										mt="auto"
										mb="auto"
									>
										{answer?.PartnerMember.FULL_NAME}
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
										{answer?.UPDATED_AT?.split('T')[0]}
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
									{answer.CONTENT.split('\n').map(
										(item, index) => {
											return (
												<Typography
													sx={{
														wordBreak: 'keep-all',
														lineHeight: '20px',
													}}
												>
													{item}
												</Typography>
											);
										}
									)}
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
							}}
							customHandleClose={() =>
								router.push('/internal_service/a2e')
							}
							type={'successDeleteAxios'}
						/>

						<SupportiAlertModal
							open={successModifyAlert}
							handleClose={() => {
								setSuccessModifyAlert(false);
							}}
							customHandleClose={() =>
								router.push('/internal_service/a2e')
							}
							type={'successModifyAxios'}
						/>

						{answer !== undefined && (
							<ProfileModal
								open={isProfileOpened}
								profile={profile}
								handleClose={() => setIsProfileOpened(false)}
							/>
						)}
					</Box>
				</InternalServiceLayout>
			)}
		</Box>
		// </InternalServiceDrawer>
	);
};

export default Page;
