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
import { useRouter } from 'next/router';
import DefaultController from '@leanoncompany/supporti-ark-office-project/src/controller/default/DefaultController';
import moment from 'moment';
import SupportiButton from '../../../src/views/global/SupportiButton';
import { SupportiAlertModal } from '../../../src/views/global/SupportiAlertModal';
import { useUserAccess } from '../../../src/hooks/useUserAccess';
import { useAppMember } from '../../../src/hooks/useAppMember';
import LightbulbOutlinedIcon from '@mui/icons-material/LightbulbOutlined';
import CreditScoreIcon from '@mui/icons-material/CreditScore';
import dynamic from 'next/dynamic';

const Page: NextPage = () => {
	//* Modules
	const router = useRouter();
	//* Controller
	const seminarController = new DefaultController('SeminarProduct');
	const seminarApplicationController = new DefaultController(
		'SeminarApplication'
	);
	const appMemberController = new DefaultController('AppMember');
	//* Constants
	const { pid } = router.query;

	const SupportiViewer = dynamic(
		() =>
			import(
				'../../../src/views/local/internal_service/contents/ToastViewer/ToastViewer'
			),
		{
			ssr: false,
		}
	);

	//* States
	/**
	 * 세미나 데이터
	 */
	const [seminarData, setSeminarData] = React.useState<any>({});
	/**
	 * 세미나 그룹
	 */
	const [seminarGroup, setSeminarGroup] = React.useState<any>(undefined);
	/**
	 * 세미나 신청 목록 데이터
	 */
	const [seminarApplication, setSeminarApplication] = React.useState<any>([]);

	/**
	 * 알럿 모달
	 */
	const [alertModal, setAlertModal] = React.useState<boolean>(false);
	/**
	 * 알럿 모달 타입
	 */
	const [alertModalType, setAlertModalType] = React.useState<
		| 'seminarApplySuccess'
		| 'login'
		| 'point'
		| 'already'
		| 'seminarexceed'
		| 'seminarApply'
	>('seminarApplySuccess');

	/**
	 * 더보기
	 */
	const [isShowMore, setIsShowMore] = React.useState<boolean>(true);

	//* Hooks
	const { access } = useUserAccess('SIGN_IN');
	// const access = true;
	/**
	 * 유저 아이디 가져오는 훅
	 */
	const { memberId, memberEmailId } = useAppMember();
	//* Functions
	/**
	 * 세미나 신청 버튼 클릭시
	 */
	const handleApplySeminar = () => {
		if (!access) {
			setAlertModal(true);
			setAlertModalType('login');
			return;
		}
		setAlertModal(true);
		setAlertModalType('seminarApply');
	};
	/**
	 * 세미나 신청하기
	 */

	const applySeminar = () => {
		if (!access) {
			setAlertModalType('login');
			setAlertModal(true);
			return;
		}
		appMemberController.getData(
			{},
			`${appMemberController.mergedPath}/profile`,
			(res) => {
				if (res.data.result !== null) {
					// router.push(
					// 	`${seminarData?.PAYMENT_LINK}?userName=${memberName}`
					// );

					seminarApplicationController.createItem(
						{
							SEMINAR_PRODUCT_IDENTIFICATION_CODE: pid,
							APP_MEMBER_IDENTIFICATION_CODE: memberId,
							SEMINAR_GROUP_IDENTIFICATION_CODE: seminarGroup,
							NAME: res.data.result.FULL_NAME,
							PHONE: res.data.result.PHONE_NUMBER,
							EMAIL: res.data.result.USER_NAME,
						},
						(res) => {
							if (seminarData?.FREE_YN === 'Y') {
								//무료 세미나일 경우
								alert('신청 완료되었습니다.');
							} else {
								setAlertModal(true);
								setAlertModalType('seminarApplySuccess');
							}
						},
						(err) => {
							console.log(err.response);
							if (
								err.response.data.message ===
								'신청 내역이 존재합니다.'
							) {
								setAlertModal(true);
								setAlertModalType('already');
								return;
							}
							if (
								err.response.data.message ===
								'포인트가 부족합니다.'
							) {
								setAlertModal(true);
								setAlertModalType('point');
								return;
							}
							if (
								err.response.data.message ===
								'정원이 초과되었습니다.'
							) {
								setAlertModal(true);
								setAlertModalType('seminarexceed');
								return;
							}
						}
					);
				} else {
				}
			}
		);
	};

	const checkApplication = () => {
		let result = false;

		if (seminarData?.SeminarApplications) {
			for (let i = 0; i < seminarData.SeminarApplications.length; i++) {
				if (
					seminarData.SeminarApplications[i].USE_YN == 'Y' &&
					seminarData.SeminarApplications[i].CANCELED_YN == 'N' &&
					seminarData.SeminarApplications[i].PAYMENT_YN == 'Y' &&
					seminarData.SeminarApplications[i]
						.APP_MEMBER_IDENTIFICATION_CODE == memberId
				) {
					result = true;
				}
			}
		}
		return result;
	};

	console.log(seminarData);
	//* Hooks
	/**
	 * 세미나 데이터 조회
	 */
	useEffect(() => {
		if (pid !== undefined) {
			seminarController.getOneItem(
				{ SEMINAR_PRODUCT_IDENTIFICATION_CODE: pid },
				(res) => {
					setSeminarData(res.data.result);
					setSeminarApplication(res.data.result.SeminarApplications);
				},
				(err) => {}
			);
		}
	}, [pid]);

	return (
		<Box
			width={'100%'}
			p={{
				xs: 2,
				md: 10,
			}}
			minHeight={'100vh'}
		>
			{/* 세미나 헤더 */}
			<Box
				width={'100%'}
				p={3}
				bgcolor={'primary.light'}
				display={{ xs: 'block', md: 'flex' }}
				justifyContent={'space-between'}
				alignItems={'center'}
				borderRadius={2}
			>
				<Typography variant={'h4'} fontWeight={'600'}>
					{seminarData?.PRODUCT_NAME}
				</Typography>
				<Box
					display={'flex'}
					flexWrap={'wrap'}
					gap={3}
					mt={{
						xs: 2,
						md: 0,
					}}
					alignItems="center"
				>
					<Typography variant={'body1'}>
						{moment(seminarData?.SEMINAR_DATE).format('YYYY-MM-DD')}
						{seminarData?.SEMINAR_PRODUCT_IDENTIFICATION_CODE ===
							12 && ' (마감기한)'}
					</Typography>
					<Typography variant={'body1'}>
						정원 :{' '}
						{seminarData?.SEMINAR_PRODUCT_IDENTIFICATION_CODE === 13
							? '3'
							: seminarData?.PERSONNEL}
						명
					</Typography>
					{seminarData?.REAL_PRICE !== 0 && (
						<Typography variant={'body1'}>
							가격 : {seminarData?.REAL_PRICE?.toLocaleString()}원{' '}
							{seminarData?.SEMINAR_PRODUCT_IDENTIFICATION_CODE ===
								11 && '(23일까지 얼리버드 가격)'}
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
						{seminarData?.ONLINE_YN === 'Y' ? '온라인' : '오프라인'}
					</Typography>
				</Box>
			</Box>
			{/* 세미나 내용 */}
			<Box
				display={'flex'}
				width={'100%'}
				flexDirection={'column'}
				alignItems={'center'}
				mt={3}
				height={'auto'}
				position={'relative'}
			>
				{/* 소개글 */}
				{seminarData?.DESCRIPTION && (
					<Box
						width={'100%'}
						p={3}
						bgcolor={'secondary.light'}
						borderRadius={2}
						mb={3}
						display={'flex'}
						// alignItems={'center'}
						gap={2}
					>
						<LightbulbOutlinedIcon />
						<Box>
							{seminarData?.DESCRIPTION.split('\n').map(
								(item, index) => {
									if (!item.startsWith('링크')) {
										return (
											<Typography
												sx={{
													wordBreak: 'keep-all',
												}}
												variant={'subtitle2'}
												lineHeight={1.6}
											>
												{item.split('링크')[0]}
											</Typography>
										);
									}
								}
							)}
						</Box>
					</Box>
				)}
				{seminarData?.DESCRIPTION &&
					seminarData?.SEMINAR_PRODUCT_IDENTIFICATION_CODE !== 13 &&
					seminarData?.SEMINAR_PRODUCT_IDENTIFICATION_CODE !== 11 &&
					seminarData?.PAYMENT_LINK != '' && (
						<Box
							width={'100%'}
							p={3}
							bgcolor={'secondary.light'}
							borderRadius={2}
							mb={3}
							display={'flex'}
							// alignItems={'center'}
							gap={2}
						>
							<LightbulbOutlinedIcon />
							<Box>
								{seminarData?.DESCRIPTION.split('\n').map(
									(item, index) => {
										if (item.startsWith('링크')) {
											return (
												<Typography
													variant={'subtitle2'}
													lineHeight={1.6}
												>
													[2024 Revenue boosting
													오프라인 MKT 세미나 안내]{' '}
													<a
														style={{
															color: 'blue',
															textDecoration:
																'underline',
															cursor: 'pointer',
														}}
														onClick={() => {
															window.open(
																'https://hongyuri.notion.site/2024-Revenue-boosting-MKT-0039520852f04cabbf1a289feed41b13',
																'_blank'
															);
														}}
													>
														{item.split('링크')[1]}
													</a>
												</Typography>
											);
										}
									}
								)}
							</Box>
						</Box>
					)}
				{/* 결제 안내 */}
				{/* {seminarData?.PAYMENT_LINK && (
					<Box
						width={'100%'}
						p={3}
						bgcolor={'secondary.light'}
						borderRadius={2}
						mb={3}
						display={'flex'}
						// alignItems={'center'}
						flexDirection={'column'}
						gap={2}
					>
						<Box display={'flex'} alignItems={'center'} gap={2}>
							{' '}
							<CreditScoreIcon />
							<Typography variant={'subtitle2'} lineHeight={1.6}>
								결제 안내
							</Typography>
						</Box>
						<Typography variant={'subtitle2'} lineHeight={1.6}>
							결제 링크 :{' '}
							<a
								href={seminarData?.PAYMENT_LINK}
								style={{
									color: 'blue',
									textDecoration: 'underline',
								}}
							>
								{seminarData?.PAYMENT_LINK}
							</a>
						</Typography>
						<Typography lineHeight={1.6}>
							신청을 모두 완료 한 후 위의 결제 링크로 결제 진행
							부탁드립니다. 결제후 결제 완료 처리는 순차적으로
							진행되오니 참고 부탁드립니다.
						</Typography>
					</Box>
				)} */}

				<Box
					sx={{
						display: 'flex',
						flexDirection:
							seminarData?.PRODUCT_DETAIL_IMAGE_LIST &&
							JSON.parse(seminarData?.PRODUCT_DETAIL_IMAGE_LIST)
								.length > 1
								? 'column'
								: 'row',
						justifyContent: 'center',
						alignItems: 'center',
						alignContent: 'center',
						textAlign: 'center',
						width: '100%',
					}}
				>
					{/** 추가 상세 이미지 리스트 */}
					{seminarData?.PRODUCT_DETAIL_IMAGE_LIST &&
						JSON.parse(seminarData?.PRODUCT_DETAIL_IMAGE_LIST).map(
							(item, index) => {
								return (
									<>
										<Box
											key={index}
											sx={{
												display: {
													xs: 'none',
													sm: 'block',
												},
											}}
										>
											<img
												src={item}
												alt=""
												width={'75%'}
											/>
										</Box>
										<Box
											key={index}
											sx={{
												display: {
													sm: 'none',
													xs: 'block',
												},
											}}
										>
											<img
												src={item}
												alt=""
												width={'100%'}
											/>
										</Box>
									</>
								);
							}
						)}
				</Box>

				{/* {seminarData?.LONG_DESCRIPTION && (
					<Box
						width={'100%'}
						sx={{
							p: { sm: 10, xs: 2 },
						}}
					>
						<SupportiViewer data={seminarData?.LONG_DESCRIPTION} />
					</Box>
				)} */}

				{seminarData?.SEMINAR_PRODUCT_IDENTIFICATION_CODE === 11 && (
					<Box width="100%">
						<Box
							maxHeight={isShowMore ? '100%' : '500px'}
							width={'100%'}
							sx={{
								display: 'flex',
								flexDirection: 'column',
								gap: 2,
								p: { sm: 10, xs: 2 },
								overflow: 'hidden',
							}}
						>
							<Typography
								fontWeight={700}
								variant="h3"
								color={'#363636'}
								sx={{
									wordBreak: 'keep-all',
									lineHeight: '20px',
								}}
							>
								프로그램 개요
							</Typography>

							<Typography
								sx={{
									wordBreak: 'keep-all',
									lineHeight: '20px',
								}}
								variant="subtitle1"
							>
								<strong>서포티 자금조달 시크릿 캠프</strong>는
								5주간 진행되는 프로그램으로, 4주 동안 매주 1회
								이상 하임벤처투자의 대표와 수석 심사역의 강의와
								1:1 미팅을 통해 진행되며, 마지막 5주차에는 모의
								데모데이를 통해 실습을 마무리합니다.
							</Typography>

							<Box my={2} />

							<Typography
								fontWeight={700}
								variant="h4"
								color={'#363636'}
								sx={{
									wordBreak: 'keep-all',
									lineHeight: '20px',
								}}
							>
								커리큘럼
							</Typography>

							<Box my={1} />

							<Typography
								fontWeight={700}
								variant="h5"
								color={'#363636'}
								sx={{
									wordBreak: 'keep-all',
									lineHeight: '20px',
								}}
							>
								🔍 공공기관 (정부) 지원사업 성공을 위한
								사업계획서 작성법
							</Typography>
							<Typography
								fontWeight={600}
								variant="subtitle1"
								color={'#363636'}
								sx={{
									wordBreak: 'keep-all',
									lineHeight: '20px',
									display: 'flex',
								}}
							>
								* Moderator:{' '}
								<Typography
									sx={{
										wordBreak: 'keep-all',
										lineHeight: '20px',
										ml: 0.5,
									}}
									variant="subtitle1"
								>
									하임벤처투자 오성훈 수석심사역
								</Typography>
							</Typography>
							<Typography
								fontWeight={600}
								variant="subtitle1"
								color={'#363636'}
								sx={{
									wordBreak: 'keep-all',
									lineHeight: '20px',
									display: 'flex',
									flexWrap: 'wrap',
								}}
							>
								* 1주차:{' '}
								<Typography
									sx={{
										wordBreak: 'keep-all',
										lineHeight: '20px',
										ml: 0.5,
									}}
									variant="subtitle1"
								>
									스타트업 자금조달 방안 소개 및 사업계획서
									작성법
								</Typography>
							</Typography>
							<Typography
								fontWeight={600}
								variant="subtitle1"
								color={'#363636'}
								sx={{
									wordBreak: 'keep-all',
									lineHeight: '20px',
									display: 'flex',
									flexWrap: 'wrap',
								}}
							>
								* 2주차:{' '}
								<Typography
									sx={{
										wordBreak: 'keep-all',
										lineHeight: '20px',
										ml: 0.5,
									}}
									variant="subtitle1"
								>
									정부지원사업 합격 사례 분석 및 1:1 코칭
								</Typography>
							</Typography>
							<Box my={2} />
							<Typography
								fontWeight={700}
								variant="h5"
								color={'#363636'}
								sx={{
									wordBreak: 'keep-all',
									lineHeight: '20px',
								}}
							>
								✏️ AC, VC 투자유치 성공을 위한 투자제안서 작성법
							</Typography>
							<Typography
								fontWeight={600}
								variant="subtitle1"
								color={'#363636'}
								sx={{
									wordBreak: 'keep-all',
									lineHeight: '20px',
									display: 'flex',
									flexWrap: 'wrap',
								}}
							>
								* Moderator:{' '}
								<Typography
									sx={{
										wordBreak: 'keep-all',
										lineHeight: '20px',
										ml: 0.5,
									}}
									variant="subtitle1"
								>
									하임벤처투자 박대성 대표
								</Typography>
							</Typography>
							<Typography
								fontWeight={600}
								variant="subtitle1"
								color={'#363636'}
								sx={{
									wordBreak: 'keep-all',
									lineHeight: '20px',
									display: 'flex',
									flexWrap: 'wrap',
								}}
							>
								* 3주차:{' '}
								<Typography
									sx={{
										wordBreak: 'keep-all',
										lineHeight: '20px',
										ml: 0.5,
									}}
									variant="subtitle1"
								>
									민간 투자유치 가이드라인 및 투자제안서
									작성법
								</Typography>
							</Typography>
							<Typography
								fontWeight={600}
								variant="subtitle1"
								color={'#363636'}
								sx={{
									wordBreak: 'keep-all',
									lineHeight: '20px',
									display: 'flex',
									flexWrap: 'wrap',
								}}
							>
								* 4주차:{' '}
								<Typography
									sx={{
										wordBreak: 'keep-all',
										lineHeight: '20px',
										ml: 0.5,
									}}
									variant="subtitle1"
								>
									IR 자료 1:1 코칭 및 피드백
								</Typography>
							</Typography>
							<Box my={2} />
							<Typography
								fontWeight={700}
								variant="h5"
								color={'#363636'}
								sx={{
									wordBreak: 'keep-all',
									lineHeight: '20px',
								}}
							>
								📚 공통
							</Typography>
							<Typography
								fontWeight={600}
								variant="subtitle1"
								color={'#363636'}
								sx={{
									wordBreak: 'keep-all',
									lineHeight: '20px',
									display: 'flex',
									flexWrap: 'wrap',
								}}
							>
								* 5주차:{' '}
								<Typography
									sx={{
										wordBreak: 'keep-all',
										lineHeight: '20px',
										ml: 0.5,
									}}
									variant="subtitle1"
								>
									모의 데모데이 및 시상식(TIPS 운용사 및
									투자자 초청해 팁스 투자 검토 등)
								</Typography>
							</Typography>

							<Box my={2} />

							<Typography
								fontWeight={700}
								variant="h5"
								color={'#363636'}
								sx={{
									wordBreak: 'keep-all',
									lineHeight: '20px',
									display: 'flex',
								}}
							>
								💁‍♂️ 팀별안내
							</Typography>
							<Typography
								fontWeight={600}
								variant="subtitle1"
								color={'#363636'}
								sx={{
									wordBreak: 'keep-all',
									lineHeight: '20px',
									display: 'flex',
									flexWrap: 'wrap',
								}}
							>
								* A반:{' '}
								<Typography
									sx={{
										wordBreak: 'keep-all',
										lineHeight: '20px',
										ml: 0.5,
									}}
									variant="subtitle1"
								>
									서울 및 전국지역소재 기업
								</Typography>
							</Typography>
							<Typography
								fontWeight={600}
								variant="subtitle1"
								color={'#363636'}
								sx={{
									wordBreak: 'keep-all',
									lineHeight: '20px',
									display: 'flex',
									flexWrap: 'wrap',
								}}
							>
								* B반:{' '}
								<Typography
									sx={{
										wordBreak: 'keep-all',
										lineHeight: '20px',
										ml: 0.5,
									}}
									variant="subtitle1"
								>
									안양 소재 기업
								</Typography>
							</Typography>
							{/* <Box
								width={'fit-content'}
								py={1}
								px={3}
								bgcolor={'primary.light'}
								display={{ xs: 'block', md: 'flex' }}
								justifyContent={'space-between'}
								alignItems={'center'}
								borderRadius={2}
							> */}
							<Typography
								my={1}
								display={'flex'}
								gap={1}
								alignItems={'center'}
								sx={{ wordBreak: 'keep-all' }}
							>
								<h2>💡</h2> 참가 신청인원이 미달될 경우, 폐강 될
								수 있습니다.
							</Typography>
							{/* </Box> */}

							<Box my={2} />

							<Typography
								fontWeight={700}
								variant="h5"
								color={'#363636'}
								sx={{
									wordBreak: 'keep-all',
									lineHeight: '20px',
									display: 'flex',
								}}
							>
								⏰ 일정
							</Typography>
							<Typography
								fontWeight={600}
								variant="subtitle1"
								color={'#363636'}
								sx={{
									wordBreak: 'keep-all',
									lineHeight: '20px',
									display: 'flex',
									flexWrap: 'wrap',
								}}
							>
								* 모집일정:{' '}
								<Typography
									sx={{
										wordBreak: 'keep-all',
										lineHeight: '20px',
										ml: 0.5,
									}}
									variant="subtitle1"
								>
									6.17(월)-28(금) 2주간 진행
								</Typography>
							</Typography>
							<Typography
								fontWeight={600}
								variant="subtitle1"
								color={'#363636'}
								sx={{
									wordBreak: 'keep-all',
									lineHeight: '20px',
									display: 'flex',
									flexWrap: 'wrap',
								}}
							>
								* 강의일정:{' '}
								<Typography
									sx={{
										wordBreak: 'keep-all',
										lineHeight: '20px',
										ml: 0.5,
									}}
									variant="subtitle1"
								>
									<b>A반</b> <br />
									- 매주 화요일 7월 2일 시작 (2일, 9일, 16일,
									23일) - 4주 강의 진행
									<br />
									<b>B반</b> <br />
									- 매주 목요일 7월 4일 시작 (4일, 11일, 18일,
									25일) - 4주 강의 진행
									<br />
									5주차 7월 30일 화요일 1,B반 모의데모데이
									진행
									<br />
								</Typography>
							</Typography>
							<Typography
								fontWeight={600}
								variant="subtitle1"
								color={'#363636'}
								sx={{
									wordBreak: 'keep-all',
									lineHeight: '20px',
									display: 'flex',
									flexWrap: 'wrap',
								}}
							>
								* 요일 및 시간:{' '}
								<Typography
									sx={{
										wordBreak: 'keep-all',
										lineHeight: '20px',
										ml: 0.5,
									}}
									variant="subtitle1"
								>
									매주 화, 목 오후 19시-22시
								</Typography>
							</Typography>

							<Box my={2} />

							<Typography
								fontWeight={700}
								variant="h5"
								color={'#363636'}
								sx={{
									wordBreak: 'keep-all',
									lineHeight: '20px',
									display: 'flex',
								}}
							>
								🏢 장소
							</Typography>

							<Typography
								fontWeight={600}
								variant="subtitle1"
								color={'#363636'}
								sx={{
									wordBreak: 'keep-all',
									lineHeight: '20px',
									display: 'flex',
									flexWrap: 'wrap',
								}}
							>
								* 강의 장소:{' '}
								<Typography
									sx={{
										wordBreak: 'keep-all',
										lineHeight: '20px',
										ml: 0.5,
									}}
									variant="subtitle1"
								>
									A반 - 강남역 부근 세미나실
									<br />
									B반 - 평촌역 부근 세미나실
									<br />
								</Typography>
							</Typography>
							{/* <Box
								width={'fit-content'}
								py={1}
								px={3}
								bgcolor={'primary.light'}
								display={{ xs: 'block', md: 'flex' }}
								justifyContent={'space-between'}
								alignItems={'center'}
								borderRadius={2}
							> */}
							<Typography
								my={1}
								display={'flex'}
								flexWrap={'wrap'}
								gap={1}
								alignItems={'center'}
								sx={{ wordBreak: 'keep-all' }}
							>
								<h2>💡</h2> 이번 일정에 참여가 어려우신가요?{' '}
								<strong>약 2~3개월 마다 개강</strong>하니
								참고하세요 !
							</Typography>
							{/* </Box> */}

							<Box my={2} />

							<Typography
								fontWeight={700}
								variant="h5"
								color={'#363636'}
								sx={{
									wordBreak: 'keep-all',
									lineHeight: '20px',
									display: 'flex',
								}}
							>
								🎉 추가 혜택
							</Typography>
							<Typography
								fontWeight={600}
								variant="subtitle1"
								color={'#363636'}
								sx={{
									wordBreak: 'keep-all',
									lineHeight: '20px',
									display: 'flex',
									flexWrap: 'wrap',
								}}
							>
								* 시상식 후 총 5개 회사 선정:{' '}
								<Typography
									sx={{
										wordBreak: 'keep-all',
										lineHeight: '20px',
										ml: 0.5,
									}}
									variant="subtitle1"
								>
									선정된 회사는 실제 데모데이 및 직접 투자
									검토 기회 제공
								</Typography>
							</Typography>

							<Typography
								fontWeight={600}
								variant="subtitle1"
								color={'#363636'}
								sx={{
									wordBreak: 'keep-all',
									lineHeight: '20px',
									display: 'flex',
									flexWrap: 'wrap',
								}}
							>
								* 최우수, 우수 2개 회사:{' '}
								<Typography
									sx={{
										wordBreak: 'keep-all',
										lineHeight: '20px',
										ml: 0.5,
									}}
									variant="subtitle1"
								>
									투자 검토 기회와 더불어 수강료 50% 환급
								</Typography>
							</Typography>

							<Box my={5.5} />

							<Typography
								fontWeight={700}
								variant="h3"
								color={'#363636'}
								sx={{
									wordBreak: 'keep-all',
									lineHeight: '20px',
								}}
							>
								🎁 제공 혜택
							</Typography>
							<Typography
								fontWeight={600}
								variant="subtitle1"
								color={'#363636'}
								sx={{
									wordBreak: 'keep-all',
									lineHeight: '20px',
									display: 'flex',
									flexWrap: 'wrap',
								}}
							>
								* 실질적인 IR 자료:{' '}
								<Typography
									sx={{
										wordBreak: 'keep-all',
										lineHeight: '20px',
										ml: 0.5,
									}}
									variant="subtitle1"
								>
									5주 프로그램 종료 시, 투자나 정부사업에
									활용할 수 있는 사업계획서를 직접 작성하고
									코칭 받음
								</Typography>
							</Typography>
							<Typography
								fontWeight={600}
								variant="subtitle1"
								color={'#363636'}
								sx={{
									wordBreak: 'keep-all',
									lineHeight: '20px',
									display: 'flex',
									flexWrap: 'wrap',
								}}
							>
								* 투자자와의 직접 IR 기회:{' '}
								<Typography
									sx={{
										wordBreak: 'keep-all',
										lineHeight: '20px',
										ml: 0.5,
									}}
									variant="subtitle1"
								>
									우수 기업에게 자체 보유한 펀드, 프로젝트
									펀드, 팁스 운영사의 투자 검토 등 최소
									2~3회의 투자자와의 직접 IR 기회 제공
								</Typography>
							</Typography>
							<Typography
								fontWeight={600}
								variant="subtitle1"
								color={'#363636'}
								sx={{
									wordBreak: 'keep-all',
									lineHeight: '20px',
									display: 'flex',
									flexWrap: 'wrap',
								}}
							>
								* 투자심사 보고서 공유:{' '}
								<Typography
									sx={{
										wordBreak: 'keep-all',
										lineHeight: '20px',
										ml: 0.5,
									}}
									variant="subtitle1"
								>
									실제 투자자의 시각을 이해할 수 있는 투자심사
									보고서 제공
								</Typography>
							</Typography>
							<Typography
								fontWeight={600}
								variant="subtitle1"
								color={'#363636'}
								sx={{
									wordBreak: 'keep-all',
									lineHeight: '20px',
									display: 'flex',
									flexWrap: 'wrap',
								}}
							>
								* 지속적인 멘토링 및 피드백:{' '}
								<Typography
									sx={{
										wordBreak: 'keep-all',
										lineHeight: '20px',
										ml: 0.5,
									}}
									variant="subtitle1"
								>
									세미나 이후에도 지속적인 멘토링과 피드백
									제공
								</Typography>
							</Typography>
							<Typography
								fontWeight={600}
								variant="subtitle1"
								color={'#363636'}
								sx={{
									wordBreak: 'keep-all',
									lineHeight: '20px',
									display: 'flex',
									flexWrap: 'wrap',
								}}
							>
								* 네트워크 활용:{' '}
								<Typography
									sx={{
										wordBreak: 'keep-all',
										lineHeight: '20px',
										ml: 0.5,
									}}
									variant="subtitle1"
								>
									투자 유치를 위해 자사의 네트워크를 활용해
									적극적으로 지원
								</Typography>
							</Typography>

							<Box my={5.5} />

							<Typography
								fontWeight={700}
								variant="h3"
								color={'#363636'}
								sx={{
									wordBreak: 'keep-all',
									lineHeight: '20px',
								}}
							>
								💵 비용
							</Typography>
							<Typography
								fontWeight={600}
								variant="subtitle1"
								color={'#363636'}
								sx={{
									wordBreak: 'keep-all',
									lineHeight: '20px',
									display: 'flex',
									flexWrap: 'wrap',
								}}
							>
								* 5주 프로그램:{' '}
								<Typography
									sx={{
										wordBreak: 'keep-all',
										lineHeight: '20px',
										ml: 0.5,
									}}
									variant="subtitle1"
								>
									110만원 → 99만원 (부가세 별도)
								</Typography>
							</Typography>
							<Typography
								fontWeight={600}
								variant="subtitle1"
								color={'red'}
								sx={{
									wordBreak: 'keep-all',
									lineHeight: '20px',
									display: 'flex',
									flexWrap: 'wrap',
									alignItems: 'center',
								}}
							>
								🎉 6월 23일까지 20% 할인
								<Typography
									sx={{
										wordBreak: 'keep-all',
										lineHeight: '20px',
										ml: 0.5,
									}}
									variant="subtitle1"
									display={'flex'}
									flexWrap={'wrap'}
									gap={1}
									alignItems={'center'}
								>
									<Typography
										fontWeight={600}
										variant="subtitle1"
									>
										→ 792,000원
									</Typography>{' '}
									(부가세 포함)
								</Typography>
							</Typography>
							<Typography
								sx={{
									wordBreak: 'keep-all',
									lineHeight: '20px',
								}}
								variant="subtitle1"
							>
								이번 ‘자금조달 시크릿 캠프’를 통해 여러분의
								스타트업이 한 단계 성장할 수 있는 기회를 놓치지
								마세요! 많은 참여 바랍니다.
							</Typography>

							<Box my={2} />
						</Box>

						{/* <SupportiButton
							contents={'클릭해서 더보기 💡'}
							onClick={() => {
								setIsShowMore(true);
							}}
							style={{
								color: 'common.black',
								width: '100%',
								height: '80px',
								my: 5,

								mx: 'auto',
							}}
						/> */}
					</Box>
				)}

				{seminarData?.PAYMENT_LINK ===
					'https://supporti.biz/payment_link/11' && (
					<Box width="100%">
						<Box
							maxHeight={isShowMore ? '100%' : '500px'}
							width={'100%'}
							sx={{
								display: 'flex',
								flexDirection: 'column',
								gap: 2,
								p: { sm: 10, xs: 2 },
								overflow: 'hidden',
							}}
						>
							<Typography
								fontWeight={700}
								variant="h3"
								color={'#363636'}
								sx={{
									wordBreak: 'keep-all',
									lineHeight: '20px',
								}}
							>
								* 프로그램 개요
							</Typography>
							<strong>프로그램명</strong>
							<Typography
								sx={{
									wordBreak: 'keep-all',
									lineHeight: '20px',
								}}
								variant="subtitle1"
							>
								일본 사업 진출 및 오픈이노베이션 멘토링 프로그램
							</Typography>
							<strong>멘토</strong>
							<Typography
								sx={{
									wordBreak: 'keep-all',
									lineHeight: '20px',
								}}
								variant="subtitle1"
							>
								UNI Platform 김윤경님
							</Typography>
							<strong>목표</strong>
							<Typography
								sx={{
									wordBreak: 'keep-all',
									lineHeight: '20px',
								}}
								variant="subtitle1"
							>
								참가자들에게 일본 시장 진출을 위한 실질적인
								전략과 노하우 제공
								<br />
								오픈이노베이션의 개념과 성공 사례를 통해
								혁신적인 아이디어 창출을 지원
								<br />
								일본 비즈니스 환경 이해 및 네트워크 구축 지원
							</Typography>

							<Box my={2} />

							<Typography
								fontWeight={700}
								variant="h3"
								color={'#363636'}
								sx={{
									wordBreak: 'keep-all',
									lineHeight: '20px',
								}}
							>
								* 대상
							</Typography>
							<strong>참가 대상</strong>
							<Typography
								sx={{
									wordBreak: 'keep-all',
									lineHeight: '20px',
								}}
								variant="subtitle1"
							>
								일본 시장에 진출을 계획하고 있는 한국 스타트업
								및 중소 기업
								<br />
								오픈이노베이션을 통한 혁신을 추구하는 기업 및
								예비 창업자
							</Typography>

							<Box my={2} />

							<Typography
								fontWeight={700}
								variant="h3"
								color={'#363636'}
								sx={{
									wordBreak: 'keep-all',
									lineHeight: '20px',
								}}
							>
								* 프로그램 구조
							</Typography>
							<strong>모집 기간</strong>
							<Typography
								sx={{
									wordBreak: 'keep-all',
									lineHeight: '20px',
								}}
								variant="subtitle1"
							>
								7.1 ~ 7.15
							</Typography>
							<strong>프로그램 기간</strong>
							<Typography
								sx={{
									wordBreak: 'keep-all',
									lineHeight: '20px',
								}}
								variant="subtitle1"
							>
								7.17(수), 7.18(목), 7.22(월), 7.24(수),
								7.25(목), 7.31(수) 의 11:00-12:10 중 이틀 선택
								<br />
								(날짜는 선착순으로 마감됩니다.)
							</Typography>
							<strong>형태</strong>
							<Typography
								sx={{
									wordBreak: 'keep-all',
									lineHeight: '20px',
								}}
								variant="subtitle1"
							>
								온라인
								<br />주 1회 70분 x 2회 온라인 멘토링 및
								질의응답
							</Typography>

							<Box my={2} />

							<Typography
								fontWeight={700}
								variant="h3"
								color={'#363636'}
								sx={{
									wordBreak: 'keep-all',
									lineHeight: '20px',
								}}
							>
								* 강의 목록
							</Typography>
							<Typography
								fontWeight={600}
								variant="subtitle1"
								color={'red'}
								sx={{
									wordBreak: 'keep-all',
									lineHeight: '20px',
									display: 'flex',
									flexWrap: 'wrap',
									alignItems: 'center',
								}}
							>
								[1회차]
							</Typography>

							<Typography
								sx={{
									wordBreak: 'keep-all',
									lineHeight: '20px',
								}}
								variant="subtitle1"
							>
								<strong>chapter 1 :</strong> 오리엔테이션 및
								일본 시장 개요 및 일본 비즈니스 문화와 네트워크
							</Typography>

							<Typography
								sx={{
									wordBreak: 'keep-all',
									lineHeight: '20px',
								}}
								variant="subtitle1"
							>
								일본 시장의 특성 및 진출 시 고려사항
								<br />
								일본 비즈니스 문화의 이해
								<br />
								성공적인 네트워킹 전략
							</Typography>
							<Typography
								sx={{
									wordBreak: 'keep-all',
									lineHeight: '20px',
								}}
								variant="subtitle1"
							>
								<strong>chapter 2 :</strong> 협력 및 파트너십
								전략 및 제품 및 서비스 현지화 전략
							</Typography>

							<Typography
								sx={{
									wordBreak: 'keep-all',
									lineHeight: '20px',
								}}
								variant="subtitle1"
							>
								일본 기업과의 협력 방안
								<br />
								파트너십 구축을 위한 전략
								<br />
								일본 소비자 특성 분석
								<br />
								현지화 전략 수립
							</Typography>
							<Typography
								fontWeight={600}
								variant="subtitle1"
								color={'red'}
								sx={{
									wordBreak: 'keep-all',
									lineHeight: '20px',
									display: 'flex',
									flexWrap: 'wrap',
									alignItems: 'center',
								}}
							>
								[2회차]
							</Typography>
							<Typography
								sx={{
									wordBreak: 'keep-all',
									lineHeight: '20px',
								}}
								variant="subtitle1"
							>
								<strong>chapter 3 :</strong> 일본 진출 한국
								스타트업의 사례
							</Typography>

							<Typography
								sx={{
									wordBreak: 'keep-all',
									lineHeight: '20px',
								}}
								variant="subtitle1"
							>
								B2C 사례
								<br />
								B2B 사례
							</Typography>

							<Typography
								sx={{
									wordBreak: 'keep-all',
									lineHeight: '20px',
								}}
								variant="subtitle1"
							>
								<strong>chapter 4 :</strong> 자금 조달 및 투자
								유치 네트워킹 및 Q&A
							</Typography>

							<Typography
								sx={{
									wordBreak: 'keep-all',
									lineHeight: '20px',
								}}
								variant="subtitle1"
							>
								일본에서의 자금 조달 방법
								<br />
								투자 유치 전략 및 준비사항
								<br />
								일본 현지 비즈니스 전문가 및 투자사와의 네트워킹
								<br />
								Q&A 및 멘토링 세션
							</Typography>

							<Box my={2} />

							<Typography
								fontWeight={700}
								variant="h3"
								color={'#363636'}
								sx={{
									wordBreak: 'keep-all',
									lineHeight: '20px',
								}}
							>
								* 지원 내용
							</Typography>

							<Typography
								sx={{
									wordBreak: 'keep-all',
									lineHeight: '20px',
								}}
								variant="subtitle1"
							>
								일본 현지 전문가와의 1:1 멘토링
								<br />
								일본 시장 조사 및 진출 전략 수립 지원
								<br />
								오픈이노베이션 관련 자료 및 성공 사례 제공
								<br />
								현지 네트워킹 행사 초청 및 참여
							</Typography>

							<Box my={2} />

							<Typography
								fontWeight={700}
								variant="h3"
								color={'#363636'}
								sx={{
									wordBreak: 'keep-all',
									lineHeight: '20px',
								}}
							>
								* 기대 효과
							</Typography>

							<Typography
								sx={{
									wordBreak: 'keep-all',
									lineHeight: '20px',
								}}
								variant="subtitle1"
							>
								일본 시장에 대한 깊이 있는 이해와 진출 전략 확보
								<br />
								오픈이노베이션을 통한 혁신적 아이디어 및 사업
								기회 발굴
								<br />
								일본 내 비즈니스 네트워크 구축 및 파트너십 형성
							</Typography>

							<Box my={2} />

							<Typography
								fontWeight={700}
								variant="h3"
								color={'#363636'}
								sx={{
									wordBreak: 'keep-all',
									lineHeight: '20px',
								}}
							>
								* 신청 방법
							</Typography>
							<strong>신청 기간</strong>
							<Typography
								sx={{
									wordBreak: 'keep-all',
									lineHeight: '20px',
								}}
								variant="subtitle1"
							>
								2024년 7월 1일 ~ 2024년 7월 31일
							</Typography>
							<strong>신청 방법</strong>
							<Typography
								sx={{
									wordBreak: 'keep-all',
									lineHeight: '20px',
								}}
								variant="subtitle1"
							>
								온라인 신청서 작성 및 제출
							</Typography>
							<strong>문의처</strong>
							<Typography
								sx={{
									wordBreak: 'keep-all',
									lineHeight: '20px',
								}}
								variant="subtitle1"
							>
								이메일 : leanoncompany@gmail.com
								<br />
								전화 : 010-5676-4066
							</Typography>
							<Box my={2} />
							<Typography
								fontWeight={700}
								variant="h3"
								color={'#363636'}
								sx={{
									wordBreak: 'keep-all',
									lineHeight: '20px',
								}}
							>
								* 금액
							</Typography>

							<Typography
								sx={{
									wordBreak: 'keep-all',
									lineHeight: '20px',
								}}
								variant="subtitle1"
							>
								30만원 (부가세 별도)
								<br />총 2회 선택 금액
							</Typography>
							<Box my={2} />

							<Typography
								fontWeight={700}
								variant="h3"
								color={'#363636'}
								sx={{
									wordBreak: 'keep-all',
									lineHeight: '20px',
								}}
							>
								* 강연자 기본 설명
							</Typography>
							<img
								src={'/images/seminar/Untitled (3).png'}
								alt=""
								width={'100%'}
							/>

							<img
								src={'/images/seminar/Untitled (1).png'}
								alt=""
								width={'100%'}
							/>
							<Typography
								sx={{
									wordBreak: 'keep-all',
									lineHeight: '22px',
									my: 2,
									py: 2,
								}}
								variant="subtitle1"
							>
								한국과 일본은 하나의 경제권! 양국의 강력한
								협력체제로 Asia to Global 실현에 공헌하는 UNI
								Platform 김윤경 입니다. 여러분의 일본사업과
								관련된 진출지원/진출이후 사업확장 및
								일본기업과의 제휴/VC 등의 투자유치 등을
								지원합니다.
							</Typography>
							<Box my={2} />
						</Box>

						{/* <SupportiButton
							contents={'클릭해서 더보기 💡'}
							onClick={() => {
								setIsShowMore(true);
							}}
							style={{
								color: 'common.black',
								width: '100%',
								height: '80px',
								my: 5,

								mx: 'auto',
							}}
						/> */}
					</Box>
				)}

				{/* 그룹 신청 가능 인원 및 정보 */}
				{seminarData?.SeminarGroups?.length > 0 && (
					<Box
						display={'flex'}
						flexDirection={'column'}
						gap={1.5}
						m={3}
						p={4}
						bgcolor={'secondary.light'}
						border={'1px solid #FFFFFF'}
						borderRadius={1}
					>
						<Typography variant={'subtitle1'} fontWeight={600}>
							그룹 신청 가능 인원 및 정보
						</Typography>
						{seminarData?.SeminarGroups.map((item, index) => {
							return (
								<>
									<Box
										key={index.toString()}
										display={'flex'}
										flexDirection={'row'}
										flexWrap={'wrap'}
										gap={1}
										my={1}
									>
										<Typography variant={'body1'} mr={2}>
											그룹이름:{' '}
											<strong>{item.NAME}</strong>
										</Typography>
										{seminarData?.SEMINAR_PRODUCT_IDENTIFICATION_CODE !==
											13 && (
											<Typography
												variant={'body1'}
												mr={2}
											>
												정원: {item.PERSONNEL}명
											</Typography>
										)}
										<Typography variant={'body1'} mr={2}>
											현재{' '}
											{
												seminarApplication.filter(
													(data) =>
														data.SEMINAR_GROUP_IDENTIFICATION_CODE ===
														item.SEMINAR_GROUP_IDENTIFICATION_CODE
												).length
											}
											명 신청
										</Typography>
										<Typography variant={'body1'}>
											한줄소개: {item.DESCRIPTION}
										</Typography>
									</Box>

									<Box
										sx={{
											display:
												index !=
												seminarData?.SeminarGroups
													.length -
													1
													? 'block'
													: 'none',
											borderTop: '1px solid lightgrey',
										}}
									/>
								</>
							);
						})}
					</Box>
				)}
				{/* 그룹 선택 */}
				{seminarData?.SeminarGroups?.length > 0 && (
					<FormControl>
						<FormLabel id="demo-radio-buttons-group-label">
							그룹 선택 (선택 후 신청하기 버튼을 눌러주세요.)
						</FormLabel>
						<RadioGroup
							sx={{
								display: 'flex',
								flexDirection: 'row',
								justifyContent: 'center',
								my: 1,
							}}
							value={seminarGroup}
							onChange={(e) => {
								setSeminarGroup(e.target.value);
							}}
						>
							{seminarData?.SeminarGroups.sort(function compare(
								a,
								b
							) {
								if (a.DESCRIPTION > b.DESCRIPTION) return 1;
								if (a.DESCRIPTION < b.DESCRIPTION) return -1;
								return 0;
							}).map((item, index) => {
								return (
									<FormControlLabel
										key={index.toString()}
										value={
											item.SEMINAR_GROUP_IDENTIFICATION_CODE
										}
										control={<Radio />}
										label={item.NAME}
										color="primary"
										disabled={
											seminarApplication.filter(
												(data) =>
													data.SEMINAR_GROUP_IDENTIFICATION_CODE ===
													item.SEMINAR_GROUP_IDENTIFICATION_CODE
											).length == item.PERSONNEL
										}
									/>
								);
							})}
						</RadioGroup>
					</FormControl>
				)}
				{/* 신청하기 버튼 */}
				{
					<Box
						width={'100%'}
						justifyContent={'center'}
						// bgcolor={'red'}
						sx={{
							position: 'sticky',
							display: 'flex',
							top: 0,
						}}
						height={40}
						mb={5}
					>
						<SupportiButton
							contents={
								!checkApplication() ? '신청하기' : '신청완료'
							}
							isGradient={true}
							onClick={() => {
								// 정원이 마감되었을 경우
								const soldOut =
									seminarData?.SeminarGroups?.filter(
										(item) =>
											seminarApplication.filter(
												(data) =>
													data.SEMINAR_GROUP_IDENTIFICATION_CODE ===
													item.SEMINAR_GROUP_IDENTIFICATION_CODE
											).length != item.PERSONNEL
									);

								// 세미나 신청 여부 판별
								if (!checkApplication()) {
									if (
										seminarData?.SeminarGroups.length > 0 &&
										seminarGroup == undefined &&
										soldOut.length !== 0
									) {
										return alert('그룹을 선택해주세요.');
									} else if (
										seminarData?.SeminarGroups.length > 0 &&
										soldOut.length === 0
									) {
										return alert('마감되었습니다.');
									} else handleApplySeminar();
								} else alert('이미 신청하셨습니다!');
							}}
							style={{
								color: 'white',
								width: '200px',
								height: '40px',
								my: 2,
								pb: 2,
							}}
						/>
					</Box>
				}
			</Box>

			<SupportiAlertModal
				type={alertModalType}
				open={alertModal}
				handleClose={() => setAlertModal(false)}
				customHandleClose={
					alertModalType == 'seminarApply'
						? () => applySeminar()
						: alertModalType == 'seminarApplySuccess'
						? () => {
								router.push(
									`${seminarData?.PAYMENT_LINK}?userName=${memberEmailId}&productName=${seminarData?.PRODUCT_NAME}`
								);
						  }
						: undefined
				}
			/>
		</Box>
	);
};

export default Page;
