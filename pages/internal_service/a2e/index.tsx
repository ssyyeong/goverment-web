import { Box, Grid, Typography } from '@mui/material';
import { NextPage } from 'next';
import React from 'react';
import { useUserAccess } from '../../../src/hooks/useUserAccess';
import SupportiButton from '../../../src/views/global/SupportiButton';
import SupportiInput from '../../../src/views/global/SupportiInput';
import { useRouter } from 'next/router';
import InternalServiceDrawer from '../../../src/views/local/internal_service/common/InternalServiceDrawer';
import { InternalServiceLayout } from '../../../src/views/layout/InternalServiceLayout';
import { SupportiAlertModal } from '../../../src/views/global/SupportiAlertModal';
import LockIcon from '@mui/icons-material/Lock';

const Page: NextPage = () => {
	//* Modules
	const router = useRouter();

	//* States
	/**
	 * 페이지 진입 시 유저 권한 검사
	 */
	const { access } = useUserAccess('SIGN_IN');

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
	 * 비밀글 여부
	 */

	const [isSecret, setIsSecret] = React.useState<boolean>(false);

	/**
	 *
	 * 내가 쓴 글만 보기
	 */
	const [isReadMine, setIsReadMine] = React.useState<boolean>(false);

	/**
	 *
	 *  알럿
	 */
	const [alertType, setAlertType] = React.useState();
	const [alertModal, setAlertModal] = React.useState<boolean>(false);

	//* Hooks
	React.useEffect(() => {
		//* 초기 데이터 셋팅
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
						image="/images/main/business.png"
						mobileImage="/images/main/businessMoblie.png"
					>
						<Box
							p={1}
							// sx={{
							// 	display: 'flex',
							// 	flexDirection: 'column',
							// 	width: '100%',
							// 	height: '100%',
							// 	minHeight: '100vh',
							// 	p: { xs: 2, md: 15 },
							// 	bgcolor: 'white',
							// 	gap: 2,
							// }}
						>
							{/* <Typography variant="h1" mb={5}>
								전문가에게 질문하기
							</Typography>
							<Typography variant="h3">
								부담없이 전문가에게 질문해보세요!
							</Typography>
							<Typography variant="h4">
								평소에 전문가들에게 묻고 싶었던 질문을 자유롭게
								질문하고 다른 사업가 분들의 답변도 확인하세요.
							</Typography> */}

							<Typography
								variant="h5"
								mt={5}
								mb={2}
								fontWeight={600}
							>
								서포티 유저들이 많이 궁금해하는 질문
							</Typography>
							<Box display="flex">
								<Box
									borderRadius={'10px'}
									p={3}
									bgcolor="white"
									sx={{
										boxShadow:
											'rgb(219, 219, 219) 0px 0px 5px',
										minHeight: '150px',
									}}
									display="flex"
									flexDirection={'column'}
									justifyContent="space-between"
									onClick={() =>
										router.push('/internal_service/a2e/1')
									}
								>
									<Box display="flex" gap={0.5}>
										<Typography
											color="primary.main"
											fontWeight={600}
										>
											[카테고리]
										</Typography>
										<Typography fontWeight={600}>
											질문의 제목이 들어갑니다.
										</Typography>
									</Box>

									<Box textAlign={'right'}>
										<Typography color="secondary.dark">
											생성일자
										</Typography>
									</Box>
								</Box>
							</Box>

							{/** 검색창 */}
							<Box mt={8}>
								<Typography
									variant="h4"
									fontWeight={600}
									mb={2}
								>
									모든 질문
								</Typography>
								<Box
									display="flex"
									justifyContent={'space-between'}
									my={3}
								>
									<SupportiInput
										type="search"
										value={keyword}
										setValue={setKeyword}
										style={{ width: '500px' }}
										additionalProps={{
											placeholder:
												'궁금한 것을 검색해보세요.',
										}}
									/>
									<SupportiButton
										contents="질문하러 가기"
										variant="contained"
										style={{ color: 'common.white' }}
										isGradient={true}
										onClick={() =>
											router.push(
												'/internal_service/a2e/write'
											)
										}
									/>
								</Box>
							</Box>

							<Box
								display="flex"
								justifyContent={'space-between'}
							>
								{/** 탭 */}
								<Box display="flex">
									{selectableTabCategory.map(
										(item, index) => {
											return (
												<Box
													key={index}
													p={2}
													sx={{
														borderTopLeftRadius: 10,
														borderTopRightRadius: 10,
														color:
															selectedTabCategory ===
															item
																? 'common.white'
																: 'primary.main',
														bgcolor:
															selectedTabCategory ===
															item
																? '#e7eeff'
																: 'common.white',
														width: '130px',
														textAlign: 'center',
														cursor: 'pointer',
														boxShadow:
															'rgb(219, 219, 219) 0px 0px 2px',
													}}
													onClick={() =>
														setSelectedTabCategory(
															item
														)
													}
												>
													<Typography
														color="primary.main"
														fontWeight={600}
													>
														{item}
													</Typography>
												</Box>
											);
										}
									)}
								</Box>

								<Box display="flex">
									{/* <Box display="flex">
										<Typography
											mt="auto"
											mb="auto"
											pb={1}
											mr={0.5}
										>
											비밀글도 보기
										</Typography>
										<SupportiInput
											type="checkbox"
											value={isSecret}
											setValue={setIsSecret}
										/>
									</Box> */}
									<Box display="flex" mr={'-22px'}>
										<Typography
											mt="auto"
											mb="auto"
											pb={1}
											mr={1}
											fontWeight={500}
											fontFamily={'Pretendard'}
										>
											내가 쓴 글만 보기
										</Typography>
										<SupportiInput
											type="checkbox"
											value={isReadMine}
											setValue={setIsReadMine}
										/>
									</Box>
								</Box>
							</Box>

							<Box
								bgcolor="#e7eeff"
								width="100%"
								height="100%"
								p={3}
								sx={{
									borderTopRightRadius: '5px',
									borderBottomRightRadius: '5px',
									borderBottomLeftRadius: '5px',
								}}
							>
								<Box
									p={3}
									borderRadius={1}
									bgcolor="white"
									mb={2}
									sx={{
										cursor: 'pointer',
									}}
									onClick={() =>
										router.push('/internal_service/a2e/1')
									}
								>
									<Box
										display="flex"
										justifyContent={'space-between'}
										mb={2}
									>
										<Box
											borderRadius={20}
											border="1px solid"
											borderColor="primary.light"
											p={1}
										>
											<Typography color={'primary.main'}>
												답변 상태
											</Typography>
										</Box>
										<Typography color={'secondary.dark'}>
											생성일자
										</Typography>
									</Box>

									<Box display="flex" gap={0.5} m={0.5}>
										<Typography
											color="primary.main"
											fontWeight={600}
										>
											[카테고리]
										</Typography>
										<Typography>
											질문의 제목이 들어갑니다.
										</Typography>
										<LockIcon
											sx={{
												width: '15px',
												height: '15px',

												mt: 'auto',
												mb: 'auto',
											}}
										/>
									</Box>
								</Box>
							</Box>
							{/* 컨텐츠 레이아웃
				{access === true && (
          
				)} */}
						</Box>
						<SupportiAlertModal
							open={alertModal}
							handleClose={() => {
								setAlertModal(false);
								router.push('/internal_service/a2e/1');
							}}
							type={alertType}
						/>
					</InternalServiceLayout>
				)}
			</Box>
		</InternalServiceDrawer>
	);
};

export default Page;
