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
import DefaultController from '@leanoncompany/supporti-ark-office-project/src/controller/default/DefaultController';
import { useAppMember } from '../../../src/hooks/useAppMember';
import { useSubscription } from '../../../src/hooks/useSubscription';
import Nodata from '../../../src/views/global/NoData/NoData';
import { usePagination } from '../../../src/hooks/usePagination';
import SupportiPagination from '../../../src/views/global/SupportiPagination';
import { A2eController } from '../../../src/controller/A2EController';
import moment from 'moment';

const Page: NextPage = () => {
	//* Modules
	const a2eController = new A2eController();
	const categoryController = new DefaultController('A2eCategory');

	const { memberId } = useAppMember();
	const router = useRouter();

	//* States
	/**
	 * 페이지 진입 시 유저 권한 검사
	 */
	const { access } = useUserAccess('SIGN_IN');

	/**
	 *
	 * 전체 글
	 */
	const [allQuestion, setAllQuestion] = React.useState<any[]>([]);

	/**
	 *
	 * 전체 글 총 갯수
	 */
	const [totalDataCount, setTotalDataCount] = React.useState<number>(0);

	/**
	 *
	 * 상단 고정 글
	 */
	const [fixedQuestion, setFixedQuestion] = React.useState<any[]>([]);

	/**
	 * 검색 키워드
	 */
	const [keyword, setKeyword] = React.useState();

	/**
	 * 선택 가능한 탭 카테고리
	 */
	const [selectableTabCategory, setSelectableTabCategory] =
		React.useState(undefined);

	/**
	 *
	 * 선택한 탭 카테고리
	 */
	const [selectedTabCategory, setSelectedTabCategory] =
		React.useState<string>(
			selectableTabCategory !== undefined
				? selectableTabCategory[0].CONTENT
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
	 * 답변완료 여부
	 */

	const [isAnswerExist, setIsAnswerExist] = React.useState<boolean>(false);

	/**
	 *
	 * 내가 쓴 글만 보기
	 */
	const [isReadMine, setIsReadMine] = React.useState<boolean>(false);

	/**
	 *
	 * 비밀글 제외
	 */
	const [exceptSecret, setExceptSecret] = React.useState<boolean>(false);

	/**
	 *
	 *  알럿 오픈 여부
	 */

	const [alertModal, setAlertModal] = React.useState<boolean>(false);

	/**
	 *
	 *  알럿 오픈 타입
	 */

	const [alertType, setAlertType] = React.useState<
		'unAccess' | 'subscribe' | undefined
	>(undefined);

	/**
	 * 페이징 관련
	 */
	const { page, limit, handlePageChange, setLimit, setPage } =
		usePagination();

	//* Functions
	const getQuestionList = (parameter, optionParameter) => {
		a2eController.getAllA2eQuestion(
			Object.assign(
				{
					FIND_OPTION_KEY_LIST: parameter,
				},
				{
					LIMIT: 10,
					PAGE: page,
				},
				optionParameter
			),
			(res) => {
				setAllQuestion(res.data.result.rows);
				setTotalDataCount(res.data.result.count);
			},
			(err) => {}
		);
	};

	//* Hooks
	/**
	 * 탭 변경시 페이지 초기화
	 */
	React.useEffect(() => {
		setPage(0);
	}, [selectedTabCategory]);

	/**
	 * 필터링 조건이 변경될 때마다 데이터 가져오기
	 */
	React.useEffect(() => {
		let args = {};
		let option = {};

		if (isReadMine) {
			Object.assign(args, { APP_MEMBER_IDENTIFICATION_CODE: memberId });
		} else {
			delete args['APP_MEMBER_IDENTIFICATION_CODE'];
		}

		if (selectedCategoryNum !== undefined) {
			Object.assign(args, {
				A2E_CATEGORY_IDENTIFICATION_CODE: selectedCategoryNum,
			});
		} else {
			delete args['A2E_CATEGORY_IDENTIFICATION_CODE'];
		}

		if (keyword !== undefined && keyword !== '') {
			Object.assign(args, {
				KEYWORD: { columnKey: 'TITLE', keyword: keyword },
			});
		} else {
			delete args['KEYWORD'];
		}

		if (isAnswerExist) {
			Object.assign(option, { ANSWERED: true });
		} else {
			delete option['ANSWERED'];
		}

		if (exceptSecret) {
			Object.assign(args, {
				PRIVATE_YN: 'N',
			});
		} else {
			delete args['PRIVATE_YN'];
		}

		getQuestionList(args, option);
	}, [
		keyword,
		isReadMine,
		selectedTabCategory,
		isAnswerExist,
		exceptSecret,
		page,
	]);

	/**
	 * 구독권 정보 가져오기
	 */
	const { subscriptionInfo } = useSubscription({ memberId: memberId });

	React.useEffect(() => {
		//* 초기 데이터 셋팅

		getQuestionList({}, {});

		a2eController.getAllA2eQuestion(
			Object.assign(
				{
					FIND_OPTION_KEY_LIST: {},
				},
				{
					LIMIT: 10,
					PAGE: page,
				},
				{ ANSWERED: true }
			),
			(res) => {
				let result;

				// 뷰 순으로 정렬
				result = res.data.result.rows
					.sort(function (a, b) {
						return b.VIEW - a.VIEW;
					})
					.slice(0, 5);

				setFixedQuestion(result);
			},
			(err) => {}
		);

		categoryController.findAllItems(
			{},
			(res) => {
				setSelectableTabCategory(
					[{ CONTENT: '전체' }].concat(res.data.result.rows)
				);
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
						mobileImage="/images/main/A2EMobile.png"
					>
						<Box p={1}>
							<Typography variant="h5" fontWeight={700} mb={1}>
								서포티 유저들이 많이 궁금해하는 질문
							</Typography>
							<Box
								display={'flex'}
								justifyContent={'space-between'}
								flexWrap={'wrap'}
							>
								<Typography mb={2} color={'secondary.main'}>
									서포티 유저들이 가장 많이 궁금해하는 질문을
									확인해보세요.
								</Typography>
								<Typography mb={2} color={'secondary.main'}>
									{moment().format('YYYY-MM-DD HH:mm')} 기준
								</Typography>
							</Box>
							<Box
								display={'flex'}
								pl={{ md: 0.5, xs: '5%' }}
								sx={{
									overflowX: 'auto',
									'-ms-overflow-style': 'none',
									'&::-webkit-scrollbar': {
										height: '5px !important',
										backgroundColor: 'white !important',
										padding: '0.5px',
										borderRadius: '20px',
									},
									'&::-webkit-scrollbar-thumb': {
										backgroundColor: '#305edccc',
										borderRadius: '20px',
									},
								}}
								p={1}
							>
								<Box display="flex" gap={2} width={'100%'}>
									{fixedQuestion.length !== 0 &&
										fixedQuestion.map((item, index) => {
											return (
												<Box
													borderRadius={'10px'}
													p={3}
													bgcolor="white"
													sx={{
														boxShadow:
															'0 3px 15px 0 #e1eaff',
														minHeight: '150px',
														width: '220px',
														minWidth: '220px',
														cursor: 'pointer',
														border: '1px solid',
														borderColor:
															'secondary.light',
													}}
													display="flex"
													flexDirection={'column'}
													justifyContent="space-between"
													onClick={() => {
														if (
															subscriptionInfo
																?.SubscriptionProduct
																?.TYPE ===
																'BLACK' ||
															subscriptionInfo
																?.SubscriptionProduct
																?.TYPE ===
																'PRODUCT'
														) {
															router.push(
																`/internal_service/a2e/${item.A2E_QUESTION_IDENTIFICATION_CODE}`
															);
														} else {
															setAlertType(
																'subscribe'
															);
															setAlertModal(true);
														}
													}}
												>
													<Box
														display="flex"
														gap={0.5}
														flexWrap="wrap"
													>
														<Typography
															color="primary.main"
															fontWeight={600}
														>
															[
															{
																item.A2eCategory
																	.CONTENT
															}
															]
														</Typography>
														<Typography
															fontWeight={600}
															sx={{
																wordBreak:
																	'keep-all',
															}}
														>
															{item.TITLE}
														</Typography>
													</Box>

													<Box textAlign={'right'}>
														<Typography color="secondary.dark">
															{
																item.UPDATED_AT.split(
																	'T'
																)[0]
															}
														</Typography>
													</Box>
												</Box>
											);
										})}
									{fixedQuestion.length === 0 && (
										<Box
											width={'100%'}
											display={'flex'}
											justifyContent={'center'}
										>
											<Nodata />
										</Box>
									)}
								</Box>
							</Box>
							{/** 검색창 */}
							<Box mt={3}>
								<Typography
									variant="h5"
									mb={2}
									fontWeight={700}
								>
									모든 질문
								</Typography>
								<Box
									display="flex"
									justifyContent={'space-between'}
									mt={2}
									mb={1}
									flexWrap="wrap"
									gap={2}
								>
									<SupportiInput
										type="search"
										value={keyword}
										setValue={setKeyword}
										style={{ width: '320px' }}
										additionalProps={{
											placeholder:
												'궁금한 것을 검색해보세요.',
										}}
									/>
									<SupportiButton
										contents="질문하러 가기"
										variant="contained"
										style={{
											color: 'common.white',
											height: 40,
										}}
										isGradient={true}
										onClick={() => {
											if (
												subscriptionInfo
													?.SubscriptionProduct
													?.TYPE === 'BLACK' ||
												subscriptionInfo
													?.SubscriptionProduct
													?.TYPE === 'PRODUCT'
											) {
												router.push(
													'/internal_service/a2e/write'
												);
											} else {
												setAlertType('subscribe');
												setAlertModal(true);
											}
										}}
									/>
								</Box>
							</Box>

							<Box
								display="flex"
								justifyContent={'space-between'}
							>
								<Box></Box>
								<Box display="flex" mr="-20px">
									<Box display="flex" flexWrap="wrap">
										<Typography
											mt="auto"
											mb="auto"
											ml="auto"
											mr={0.5}
											fontWeight={500}
											variant="body2"
										>
											비밀글 제외
										</Typography>
										<SupportiInput
											type="checkbox"
											value={exceptSecret}
											setValue={setExceptSecret}
										/>
									</Box>
									<Box display="flex">
										<Typography
											mt="auto"
											mb="auto"
											ml="-15px"
											mr={0.5}
											fontWeight={500}
											variant="body2"
										>
											답변완료 글
										</Typography>
										<SupportiInput
											type="checkbox"
											value={isAnswerExist}
											setValue={setIsAnswerExist}
										/>
									</Box>
									<Box display="flex">
										<Typography
											mt="auto"
											mb="auto"
											ml="-15px"
											mr={0.5}
											fontWeight={500}
											variant="body2"
										>
											내가 쓴 글
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
								display="flex"
								justifyContent={'space-between'}
							>
								{/** 탭 */}
								<Box display="flex">
									{selectableTabCategory !== undefined &&
										selectableTabCategory.map(
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
																item['CONTENT']
																	? 'common.white'
																	: 'primary.main',
															bgcolor:
																selectedTabCategory ===
																item['CONTENT']
																	? '#e7eeff'
																	: 'common.white',
															width: {
																md: '130px',
																xs: '60px',
															},
															textAlign: 'center',
															cursor: 'pointer',
															boxShadow:
																'0 3px 15px 0 #e1eaff',
														}}
														onClick={() => {
															setSelectedTabCategory(
																item['CONTENT']
															);

															setSelectedCategoryNum(
																item[
																	'A2E_CATEGORY_IDENTIFICATION_CODE'
																]
															);
														}}
													>
														<Typography
															color="primary.main"
															fontWeight={600}
														>
															{item['CONTENT']}
														</Typography>
													</Box>
												);
											}
										)}
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
								{allQuestion !== undefined &&
									allQuestion.length !== 0 &&
									allQuestion.map((item, index) => {
										return (
											<Box
												p={3}
												borderRadius={1}
												bgcolor="white"
												mb={2}
												sx={{
													cursor: 'pointer',
												}}
												onClick={() => {
													if (
														subscriptionInfo
															?.SubscriptionProduct
															?.TYPE ===
															'BLACK' ||
														subscriptionInfo
															?.SubscriptionProduct
															?.TYPE === 'PRODUCT'
													) {
														if (
															memberId !==
																item.APP_MEMBER_IDENTIFICATION_CODE &&
															item.PRIVATE_YN ===
																'Y'
														) {
															setAlertType(
																'unAccess'
															);
															setAlertModal(true);
														} else {
															router.push(
																`/internal_service/a2e/${item.A2E_QUESTION_IDENTIFICATION_CODE}`
															);
														}
													} else {
														setAlertType(
															'subscribe'
														);
														setAlertModal(true);
													}

													// if (
													// 	memberId !==
													// 		item.APP_MEMBER_IDENTIFICATION_CODE &&
													// 	item.PRIVATE_YN === 'Y'
													// ) {
													// 	setAlertModal(true);
													// } else {
													// 	router.push(
													// 		`/internal_service/a2e/${item.A2E_QUESTION_IDENTIFICATION_CODE}`
													// 	);
													// }
												}}
											>
												<Box
													display="flex"
													justifyContent={
														'space-between'
													}
													mb={2}
												>
													<Box
														borderRadius={20}
														border="1px solid"
														borderColor={
															item.ANSWERED_YN ===
															'N'
																? 'secondary.dark'
																: 'primary.main'
														}
														px={1.5}
														py={0.8}
													>
														<Typography
															color={
																item.ANSWERED_YN ===
																'N'
																	? 'secondary.dark'
																	: 'primary.main'
															}
															variant="body2"
														>
															{item.ANSWERED_YN ===
															'N'
																? '답변 전'
																: '답변 완료'}
														</Typography>
													</Box>
													<Typography
														color={'secondary.dark'}
													>
														{
															item.UPDATED_AT.split(
																'T'
															)[0]
														}
													</Typography>
												</Box>

												<Box
													display="flex"
													gap={0.5}
													m={0.5}
												>
													<Typography
														color="primary.main"
														fontWeight={600}
													>
														[
														{
															item.A2eCategory
																.CONTENT
														}
														]
													</Typography>
													<Typography
														fontWeight={600}
													>
														{item.TITLE}
													</Typography>
													{item.PRIVATE_YN ===
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
											</Box>
										);
									})}
								{allQuestion !== undefined &&
									allQuestion.length === 0 && <Nodata />}
							</Box>
							{/* 컨텐츠 레이아웃
				{access === true && (
          
				)} */}
						</Box>
						{/* 페이지 네이션 */}
						<Box width={'100%'} p={2}>
							<SupportiPagination
								limit={limit}
								setLimit={setLimit}
								page={page}
								handlePageChange={handlePageChange}
								count={totalDataCount}
								useLimit={false}
							/>
						</Box>
						<SupportiAlertModal
							open={alertModal}
							handleClose={() => {
								setAlertModal(false);
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
