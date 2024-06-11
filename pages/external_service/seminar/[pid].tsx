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

	const { isApplied } = router.query;

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
	const [isShowMore, setIsShowMore] = React.useState<boolean>(false);

	//* Hooks
	const { access } = useUserAccess('SIGN_IN');
	// const access = true;
	/**
	 * 유저 아이디 가져오는 훅
	 */
	const { memberId } = useAppMember();
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
							setAlertModal(true);
							setAlertModalType('seminarApplySuccess');
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
					gap={3}
					mt={{
						xs: 2,
						md: 0,
					}}
					alignItems="center"
				>
					<Typography variant={'body1'}>
						{moment(seminarData?.SEMINAR_DATE).format('YYYY-MM-DD')}
					</Typography>
					<Typography variant={'body1'}>
						정원 : {seminarData?.PERSONNEL}명
					</Typography>
					{seminarData?.REAL_PRICE && (
						<Typography variant={'body1'}>
							가격 : {seminarData?.REAL_PRICE?.toLocaleString()}원
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
				{seminarData?.PAYMENT_LINK && (
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
				)}

				{/** 추가 상세 이미지 리스트 */}
				{seminarData?.PRODUCT_DETAIL_IMAGE_LIST &&
					JSON.parse(seminarData?.PRODUCT_DETAIL_IMAGE_LIST).map(
						(item, index) => {
							return (
								<Box key={index}>
									<img src={item} alt="" />
								</Box>
							);
						}
					)}

				{seminarData?.SEMINAR_PRODUCT_IDENTIFICATION_CODE === 11 && (
					<Box width="100%">
						<Box
							maxHeight={isShowMore ? '100%' : '500px'}
							width={'100%'}
							sx={{
								display: 'flex',
								flexDirection: 'column',
								gap: 2,
								p: 3,
								overflow: 'hidden',
							}}
						>
							{/* <Typography
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
								서포티 투자 IR 시크릿 캠프 는 5주간 진행되는
								프로그램으로, 4주 동안 매주 1회 이상
								하임벤처투자의 대표와 수석 심사역의 강의와 1:1
								미팅을 통해 진행되며, 마지막 5주차에는 모의
								데모데이를 통해 실습을 마무리합니다.
							</Typography>

							<Box my={1.5} />

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

							<Box my={1.5} />

							<Typography
								fontWeight={700}
								variant="h5"
								color={'#363636'}
								sx={{
									wordBreak: 'keep-all',
									lineHeight: '20px',
								}}
							>
								공공기관 (정부) 지원사업 성공을 위한 사업계획서
								작성법
							</Typography>
							<Typography
								fontWeight={600}
								variant="subtitle1"
								color={'#363636'}
								sx={{
									wordBreak: 'keep-all',
									lineHeight: '20px',
								}}
							>
								* Moderator: 하임벤처투자 오성훈 수석심사역
							</Typography>
							<Typography
								fontWeight={600}
								variant="subtitle1"
								color={'#363636'}
								sx={{
									wordBreak: 'keep-all',
									lineHeight: '20px',
								}}
							>
								* 1주차: 스타트업 자금조달 방안 소개 및
								사업계획서 작성법
							</Typography>
							<Typography
								fontWeight={600}
								variant="subtitle1"
								color={'#363636'}
								sx={{
									wordBreak: 'keep-all',
									lineHeight: '20px',
								}}
							>
								* 2주차: 정부지원사업 합격 사례 분석 및 1:1 코칭
							</Typography>

							<Box my={1.5} />

							<Typography
								fontWeight={700}
								variant="h5"
								color={'#363636'}
								sx={{
									wordBreak: 'keep-all',
									lineHeight: '20px',
								}}
							>
								AC, VC 투자유치 성공을 위한 투자제안서 작성법
							</Typography>
							<Typography
								fontWeight={600}
								variant="subtitle1"
								color={'#363636'}
								sx={{
									wordBreak: 'keep-all',
									lineHeight: '20px',
								}}
							>
								* Moderator: 하임벤처투자 박대성 대표
							</Typography>
							<Typography
								fontWeight={600}
								variant="subtitle1"
								color={'#363636'}
								sx={{
									wordBreak: 'keep-all',
									lineHeight: '20px',
								}}
							>
								* 3주차: 민간 투자유치 가이드라인 및 투자제안서
								작성법
							</Typography>
							<Typography
								fontWeight={600}
								variant="subtitle1"
								color={'#363636'}
								sx={{
									wordBreak: 'keep-all',
									lineHeight: '20px',
								}}
							>
								* 4주차: IR 자료 1:1 코칭 및 피드백
							</Typography>

							<Box my={1.5} />

							<Typography
								fontWeight={700}
								variant="h5"
								color={'#363636'}
								sx={{
									wordBreak: 'keep-all',
									lineHeight: '20px',
								}}
							>
								공통
							</Typography>
							<Typography
								fontWeight={600}
								variant="subtitle1"
								color={'#363636'}
								sx={{
									wordBreak: 'keep-all',
									lineHeight: '20px',
								}}
							>
								* 5주차: 모의 데모데이 및 시상식
							</Typography>

							<Box my={1.5} />

							<Typography
								fontWeight={700}
								variant="h5"
								color={'#363636'}
								sx={{
									wordBreak: 'keep-all',
									lineHeight: '20px',
								}}
							>
								추가 혜택
							</Typography>
							<Typography
								fontWeight={600}
								variant="subtitle1"
								color={'#363636'}
								sx={{
									wordBreak: 'keep-all',
									lineHeight: '20px',
								}}
							>
								* 시상식 후 총 5개 회사 선정: 선정된 회사는 실제
								데모데이 및 직접 투자 검토 기회 제공
							</Typography>
							<Typography
								fontWeight={600}
								variant="subtitle1"
								color={'#363636'}
								sx={{
									wordBreak: 'keep-all',
									lineHeight: '20px',
								}}
							>
								* 최우수, 우수 2개 회사: 투자 검토 기회와 더불어
								수강료 50% 환급
							</Typography>

							<Box my={1.5} />

							<Typography
								fontWeight={700}
								variant="h3"
								color={'#363636'}
								sx={{
									wordBreak: 'keep-all',
									lineHeight: '20px',
								}}
							>
								제공 혜택
							</Typography>
							<Typography
								fontWeight={600}
								variant="subtitle1"
								color={'#363636'}
								sx={{
									wordBreak: 'keep-all',
									lineHeight: '20px',
								}}
							>
								* 실질적인 IR 자료: 5주 프로그램 종료 시, 투자나
								정부사업에 활용할 수 있는 사업계획서를 직접
								작성하고 코칭 받음
							</Typography>
							<Typography
								fontWeight={600}
								variant="subtitle1"
								color={'#363636'}
								sx={{
									wordBreak: 'keep-all',
									lineHeight: '20px',
								}}
							>
								* 투자자와의 직접 IR 기회: 우수 기업에게 자체
								보유한 펀드, 프로젝트 펀드, 팁스 운영사의 투자
								검토 등 최소 2~3회의 투자자와의 직접 IR 기회
								제공
							</Typography>
							<Typography
								fontWeight={600}
								variant="subtitle1"
								color={'#363636'}
								sx={{
									wordBreak: 'keep-all',
									lineHeight: '20px',
								}}
							>
								* 투자심사 보고서 공유: 실제 투자자의 시각을
								이해할 수 있는 투자심사 보고서 제공
							</Typography>
							<Typography
								fontWeight={600}
								variant="subtitle1"
								color={'#363636'}
								sx={{
									wordBreak: 'keep-all',
									lineHeight: '20px',
								}}
							>
								* 지속적인 멘토링 및 피드백: 세미나 이후에도
								지속적인 멘토링과 피드백 제공
							</Typography>
							<Typography
								fontWeight={600}
								variant="subtitle1"
								color={'#363636'}
								sx={{
									wordBreak: 'keep-all',
									lineHeight: '20px',
								}}
							>
								* 네트워크 활용: 투자 유치를 위해 자사의
								네트워크를 활용해 적극적으로 지원
							</Typography>

							<Box my={1.5} />

							<Typography
								fontWeight={700}
								variant="h3"
								color={'#363636'}
								sx={{
									wordBreak: 'keep-all',
									lineHeight: '20px',
								}}
							>
								비용
							</Typography>
							<Typography
								fontWeight={600}
								variant="subtitle1"
								color={'#363636'}
								sx={{
									wordBreak: 'keep-all',
									lineHeight: '20px',
								}}
							>
								* 5주 프로그램: 99만원 (부가세 포함)
							</Typography>
							<Typography
								sx={{
									wordBreak: 'keep-all',
									lineHeight: '20px',
								}}
								variant="subtitle1"
							>
								이번 ‘서포티 투자 IR 시크릿 캠프’를 통해
								여러분의 스타트업이 한 단계 성장할 수 있는
								기회를 놓치지 마세요! 많은 참여 바랍니다.
							</Typography>

							<Box my={1.5} /> */}
							<Typography
								fontWeight={700}
								variant="h2"
								color={'#363636'}
								sx={{
									wordBreak: 'keep-all',
									lineHeight: '20px',
								}}
							>
								1. 프로그램 개요
							</Typography>
							<Box my={1.5} />
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
								프로그램 이름:{' '}
								<Typography
									sx={{
										wordBreak: 'keep-all',
										lineHeight: '20px',
										ml: 0.5,
									}}
									variant="subtitle1"
								>
									서포티 투자 IR 시크릿 캠프
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
								}}
							>
								목표:{' '}
								<Typography
									sx={{
										wordBreak: 'keep-all',
										lineHeight: '20px',
										ml: 0.5,
									}}
									variant="subtitle1"
								>
									초기 스타트업이 투자에 필요한 지식과 기술을
									습득하고, 실제 투자 유치 기회를 얻을 수
									있도록 지원.
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
								}}
							>
								기간:{' '}
								<Typography
									sx={{
										wordBreak: 'keep-all',
										lineHeight: '20px',
										ml: 0.5,
									}}
									variant="subtitle1"
								>
									5주 (주 1회, 총 5회)
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
								}}
							>
								대상:{' '}
								<Typography
									sx={{
										wordBreak: 'keep-all',
										lineHeight: '20px',
										ml: 0.5,
									}}
									variant="subtitle1"
								>
									초기 스타트업 창업자 및 핵심 멤버 (10개 팀
									선발)
								</Typography>
							</Typography>
							<Box my={3.5} />
							<Typography
								fontWeight={700}
								variant="h4"
								color={'#363636'}
								sx={{
									wordBreak: 'keep-all',
									lineHeight: '20px',
								}}
							>
								💁‍♂️ 무엇을 제공하나요?
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
								* 실습 중심의 교육:{' '}
								<Typography
									sx={{
										wordBreak: 'keep-all',
										lineHeight: '20px',
										ml: 1,
									}}
									variant="subtitle1"
								>
									말뿐인 강의가 아닌, 직접 사업계획서를
									작성하고 전문가의 코칭을 받는 실습 중심의
									교육을 제공합니다.
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
								}}
							>
								* 투자 유치용 사업계획서 작성:{' '}
								<Typography
									sx={{
										wordBreak: 'keep-all',
										lineHeight: '20px',
										ml: 1,
									}}
									variant="subtitle1"
								>
									4주가 끝났을 때, 당장 투자 유치를 할 수 있는
									완성된 사업계획서를 보유하게 됩니다.
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
								* IR 기회 제공:{' '}
								<Typography
									sx={{
										wordBreak: 'keep-all',
										lineHeight: '20px',
										ml: 1,
									}}
									variant="subtitle1"
								>
									우수 기업에게는 린온컴퍼니의 자체 보유 펀드,
									프로젝트 펀드, 팁스(TIPS) 운영사의 투자 검토
									기회를 제공합니다. 최소 2~3회 이상의
									투자자와의 직접 IR 기회를 가질 수 있습니다.
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
								}}
							>
								* 투자 심사 보고서 공유:{' '}
								<Typography
									sx={{
										wordBreak: 'keep-all',
										lineHeight: '20px',
										ml: 1,
									}}
									variant="subtitle1"
								>
									실제 투자자의 시각을 가지도록 린온컴퍼니
									등의 투자 심사 보고서를 공유합니다.
								</Typography>
							</Typography>
							<Box my={1.5} />
							<Typography
								fontWeight={700}
								variant="h4"
								color={'#363636'}
								sx={{
									wordBreak: 'keep-all',
									lineHeight: '20px',
								}}
							>
								🤩 혜택
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
									세미나 이후에도 박대성 이사와 오성훈 이사가
									지속적으로 멘토링 및 피드백을 제공합니다.
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
								* 수강료 환급:{' '}
								<Typography
									sx={{
										wordBreak: 'keep-all',
										lineHeight: '20px',
										ml: 0.5,
									}}
									variant="subtitle1"
								>
									우수 기업에게는 투자 검토 기회와 더불어,
									수강료의 50%를 환급해드립니다. (2개사 한정)
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
								}}
							>
								* 광범위한 네트워크 지원:{' '}
								<Typography
									sx={{
										wordBreak: 'keep-all',
										lineHeight: '20px',
										ml: 0.5,
									}}
									variant="subtitle1"
								>
									린온컴퍼니뿐만 아니라 자사의 네트워크를
									활용해 투자 유치를 적극적으로 도와드립니다.
								</Typography>
							</Typography>
							<Box my={1.5} />
							<Typography
								fontWeight={700}
								variant="h4"
								color={'#363636'}
								sx={{
									wordBreak: 'keep-all',
									lineHeight: '20px',
								}}
							>
								💰 비용
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
								* 5주 프로그램 :{' '}
								<Typography
									sx={{
										wordBreak: 'keep-all',
										lineHeight: '20px',
										ml: 0.5,
									}}
									variant="subtitle1"
								>
									99만원(부가세별도)
								</Typography>
							</Typography>
							<Box my={5.5} />
							<Typography
								fontWeight={700}
								variant="h2"
								color={'#363636'}
								sx={{
									wordBreak: 'keep-all',
									lineHeight: '20px',
								}}
							>
								2. 프로그램 구성
							</Typography>
							<Box my={1.5} />
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
							<Box my={1.5} />
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
							<Box my={1.5} />
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
									모의 데모데이 및 시상식
								</Typography>
							</Typography>
							<Box my={5.5} />
							<Typography
								fontWeight={700}
								variant="h2"
								color={'#363636'}
								sx={{
									wordBreak: 'keep-all',
									lineHeight: '20px',
								}}
							>
								3. 강사진 및 멘토 구성
							</Typography>
							<Box my={1.5} />
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
								* 강사진:{' '}
								<Typography
									sx={{
										wordBreak: 'keep-all',
										lineHeight: '20px',
										ml: 0.5,
									}}
									variant="subtitle1"
								>
									금융 전문가, 성공한 스타트업 창업자, 법률
									전문가 등
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
								}}
							>
								* 멘토:{' '}
								<Typography
									sx={{
										wordBreak: 'keep-all',
										lineHeight: '20px',
										ml: 0.5,
									}}
									variant="subtitle1"
								>
									경험이 풍부한 투자자 및 업계 전문가
								</Typography>
							</Typography>
							<Box my={5.5} />
							<Typography
								fontWeight={700}
								variant="h2"
								color={'#363636'}
								sx={{
									wordBreak: 'keep-all',
									lineHeight: '20px',
								}}
							>
								4. 참가자 지원 내용
							</Typography>
							<Box my={1.5} />
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
								* 교육 자료 제공:{' '}
								<Typography
									sx={{
										wordBreak: 'keep-all',
										lineHeight: '20px',
										ml: 0.5,
									}}
									variant="subtitle1"
								>
									각 세션별 강의 자료 및 참고 문헌 제공
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
								}}
							>
								* 멘토링 세션:{' '}
								<Typography
									sx={{
										wordBreak: 'keep-all',
										lineHeight: '20px',
										ml: 0.5,
									}}
									variant="subtitle1"
								>
									주기적인 1:1 멘토링 세션
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
								}}
							>
								* 네트워킹 기회:{' '}
								<Typography
									sx={{
										wordBreak: 'keep-all',
										lineHeight: '20px',
										ml: 0.5,
									}}
									variant="subtitle1"
								>
									투자자 및 업계 전문가와의 네트워킹 행사
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
								}}
							>
								* 피드백:{' '}
								<Typography
									sx={{
										wordBreak: 'keep-all',
										lineHeight: '20px',
										ml: 0.5,
									}}
									variant="subtitle1"
								>
									모의 피칭 및 실제 피칭에 대한 전문 피드백
									제공
								</Typography>
							</Typography>
							<Box my={5.5} />
							<Typography
								fontWeight={700}
								variant="h2"
								color={'#363636'}
								sx={{
									wordBreak: 'keep-all',
									lineHeight: '20px',
								}}
							>
								5. 프로그램 운영
							</Typography>
							<Box my={1.5} />
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
								* 신청 및 선발:{' '}
								<Typography
									sx={{
										wordBreak: 'keep-all',
										lineHeight: '20px',
										ml: 0.5,
									}}
									variant="subtitle1"
								>
									온라인 신청서 접수 후 심사를 통해 10개 팀
									선발
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
								}}
							>
								* 장소:{' '}
								<Typography
									sx={{
										wordBreak: 'keep-all',
										lineHeight: '20px',
										ml: 0.5,
									}}
									variant="subtitle1"
								>
									린온컴퍼니 본사 교육장
								</Typography>
							</Typography>{' '}
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
								* 비용:{' '}
								<Typography
									sx={{
										wordBreak: 'keep-all',
										lineHeight: '20px',
										ml: 0.5,
									}}
									variant="subtitle1"
								>
									5주 99만원 (선발된 팀에 한해)
								</Typography>
							</Typography>
							<Box my={5.5} />
							<Typography
								fontWeight={700}
								variant="h2"
								color={'#363636'}
								sx={{
									wordBreak: 'keep-all',
									lineHeight: '20px',
								}}
							>
								6. 홍보 및 마케팅
							</Typography>
							<Box my={1.5} />
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
								* 홍보 전략:{' '}
								<Typography
									sx={{
										wordBreak: 'keep-all',
										lineHeight: '20px',
										ml: 0.5,
									}}
									variant="subtitle1"
								>
									소셜 미디어, 뉴스레터, 협력 기관 및 파트너사
									네트워크 활용
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
								}}
							>
								* 참가자 모집:{' '}
								<Typography
									sx={{
										wordBreak: 'keep-all',
										lineHeight: '20px',
										ml: 0.5,
									}}
									variant="subtitle1"
								>
									홈페이지 공지, 스타트업 커뮤니티 홍보,
									파트너사 추천 등
								</Typography>
							</Typography>
						</Box>

						<SupportiButton
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
						/>
					</Box>
				)}

				{/* 그룹 신청 가능 인원 및 정보 */}
				{seminarData?.SeminarGroups?.length > 0 && (
					<Box
						display={'flex'}
						flexDirection={'column'}
						gap={1}
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
								<Box
									key={index.toString()}
									display={'flex'}
									flexDirection={'row'}
									mt={1}
								>
									<Typography variant={'body1'} mr={2}>
										그룹이름: {item.NAME}
									</Typography>
									<Typography variant={'body1'} mr={2}>
										정원: {item.PERSONNEL}명
									</Typography>
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
							{seminarData?.SeminarGroups.map((item, index) => {
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
				{seminarData?.SEMINAR_PRODUCT_IDENTIFICATION_CODE !== 11 && (
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
								isApplied == 'false' || 'undefined'
									? '신청하기'
									: '신청완료'
							}
							isGradient={true}
							onClick={() => {
								const soldOut =
									seminarData?.SeminarGroups?.filter(
										(item) =>
											seminarApplication.filter(
												(data) =>
													data.SEMINAR_GROUP_IDENTIFICATION_CODE ===
													item.SEMINAR_GROUP_IDENTIFICATION_CODE
											).length != item.PERSONNEL
									);

								if (isApplied == 'false' || 'undefined') {
									if (
										seminarData?.SeminarGroups.length > 0 &&
										seminarGroup == undefined &&
										soldOut.length !== 0
									) {
										alert('그룹을 선택해주세요.');
										return;
									} else if (soldOut.length === 0) {
										alert('마감되었습니다.');
										return;
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
				)}
			</Box>

			<SupportiAlertModal
				type={alertModalType}
				open={alertModal}
				handleClose={() => setAlertModal(false)}
				customHandleClose={
					alertModalType == 'seminarApply'
						? () => applySeminar()
						: undefined
				}
			/>
		</Box>
	);
};

export default Page;
