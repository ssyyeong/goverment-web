import { Box, Grid, Typography } from '@mui/material';
import { NextPage } from 'next';
import React from 'react';
import { useUserAccess } from '../../../../src/hooks/useUserAccess';
import SupportiInput from '../../../../src/views/global/SupportiInput';
import SupportiButton from '../../../../src/views/global/SupportiButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useRouter } from 'next/router';
import { SupportiAlertModal } from '../../../../src/views/global/SupportiAlertModal';
import { InternalServiceLayout } from '../../../../src/views/layout/InternalServiceLayout';
import InternalServiceDrawer from '../../../../src/views/local/internal_service/common/InternalServiceDrawer';
import DefaultController from '@leanoncompany/supporti-ark-office-project/src/controller/default/DefaultController';
import { useAppMember } from '../../../../src/hooks/useAppMember';

const Page: NextPage = () => {
	//* Modules
	const router = useRouter();
	const questionController = new DefaultController('A2eQuestion');
	const categoryController = new DefaultController('A2eCategory');

	const { memberId } = useAppMember();

	//* States
	/**
	 * 페이지 진입 시 유저 권한 검사
	 */
	const { access } = useUserAccess('SIGN_IN');

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
	const [selectableCategory, setSelectableCategory] =
		React.useState(undefined);

	/**
	 *
	 * 선택한 탭 카테고리 번호
	 */
	const [selectedCategoryNum, setSelectedCategoryNum] =
		React.useState<number>(undefined);

	/**
	 *
	 * 비밀글 여부
	 */

	const [isSecret, setIsSecret] = React.useState<boolean>(false);

	/**
	 *
	 * 정상 등록 알럿
	 */
	const [alertType, setAlertType] = React.useState<string | undefined>();
	const [alertModal, setAlertModal] = React.useState<boolean>(false);

	//* Functions
	const createQuestion = () => {
		questionController
			.createItem({
				CONTENT: contents,
				TITLE: title,
				PRIVATE_YN: isSecret ? 'Y' : 'N',
				APP_MEMBER_IDENTIFICATION_CODE: memberId,
				A2E_CATEGORY_IDENTIFICATION_CODE: selectedCategoryNum,
			})
			.then((res) => {
				setAlertModal(true);
			})
			.catch((err) => {
				setAlertType('error');
				setAlertModal(true);
			});
	};

	//* Hooks
	React.useEffect(() => {
		//* 초기 데이터 셋팅

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
	}, []);

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
						image="/images/main/A2E.png"
						mobileImage="/images/main/A2E.png"
					>
						<Box
							sx={{
								display: 'flex',
								flexDirection: 'column',
								ml: 'auto',
								mr: 'auto',
								width: { xs: '100%', md: '95%' },
								height: '100%',
								minHeight: '100vh',
								p: { xs: 1, md: 2 },
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
									fontWeight={600}
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
									boxShadow:
										'rgb(219, 219, 219) 0px 4px 10px',
									px: {
										xs: 3,
										md: 8,
									},
								}}
								display="flex"
								flexDirection={'column'}
								gap={2}
							>
								<Typography
									variant="h4"
									fontWeight={600}
									mb={5}
								>
									질문하기
								</Typography>
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
											placeholder: '제목을 입력하세요.',
										}}
										value={title}
										setValue={setTitle}
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
										카테고리
									</Typography>
									{selectableCategory !== undefined && (
										<SupportiInput
											type="select"
											additionalProps={{
												placeholder:
													'카테고리를 선택하세요.',
											}}
											value={selectedCategoryNum}
											setValue={setSelectedCategoryNum}
											dataList={selectableCategory}
											width={'80%'}
										/>
									)}
								</Box>
								<Box
									display="flex"
									justifyContent="space-between"
								>
									<Typography
										variant="subtitle1"
										fontWeight={600}
									>
										내용
									</Typography>
									<SupportiInput
										type="input"
										additionalProps={{
											placeholder: '내용을 입력하세요.',
											multiline: true,
											rows: 5
										}}
										value={contents}
										setValue={setContents}
										width={'80%'}
									
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
											setValue={setIsSecret}
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
										onClick={() => {
											if (
												title === undefined ||
												contents === undefined ||
												selectedCategoryNum ===
													undefined
											) {
												alert(
													'필수 입력값을 모두 입력해주세요'
												);
											} else createQuestion();
										}}
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
								}}
								customHandleClose={() =>
									router.push('/internal_service/a2e')
								}
								type={'successCreateAxios'}
							/>
						</Box>
					</InternalServiceLayout>
				)}
			</Box>
		</InternalServiceDrawer>
	);
};

export default Page;
