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

	//* Hooks
	/**
	 * 세미나 데이터 조회
	 */
	useEffect(() => {
		if (pid !== undefined) {
			seminarController.getOneItem(
				{ SEMINAR_PRODUCT_IDENTIFICATION_CODE: pid },
				(res) => {
					console.log(res.data.result);
					setSeminarData(res.data.result);
					setSeminarApplication(res.data.result.SeminarApplications);
				},
				(err) => {}
			);
		}
	}, [pid]);

	return (
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
				{/* 세미나 헤더 */}
				<Box
					p={3}
					bgcolor={'primary.light'}
					display={{ xs: 'block', md: 'flex' }}
					justifyContent={'space-between'}
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
							{moment(seminarData?.SEMINAR_DATE).format(
								'YYYY-MM-DD'
							)}
							{seminarData?.SEMINAR_PRODUCT_IDENTIFICATION_CODE ===
								12 && ' (마감기한)'}
						</Typography>
						<Typography variant={'body1'}>
							정원 :{' '}
							{seminarData?.SEMINAR_PRODUCT_IDENTIFICATION_CODE ===
							13
								? '3'
								: seminarData?.PERSONNEL}
							명
						</Typography>
						{seminarData?.REAL_PRICE !== 0 && (
							<Typography variant={'body1'}>
								가격 :{' '}
								{seminarData?.REAL_PRICE?.toLocaleString()}원{' '}
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
							{seminarData?.ONLINE_YN === 'Y'
								? '온라인'
								: '오프라인'}
						</Typography>
					</Box>
				</Box>
				{/* 세미나 내용 */}
				{/* <Box
					display={'flex'}
					flexDirection={'column'}
					mt={3}
					height={'auto'}
					position={'relative'}
				> */}
				<Box
					sx={{
						display: 'flex',
						flexDirection:
							seminarData?.PRODUCT_DETAIL_IMAGE_LIST &&
							JSON.parse(seminarData?.PRODUCT_DETAIL_IMAGE_LIST)
								.length > 1
								? 'column'
								: 'row',

						width: '100%',
						alignContent: 'center',
						justifyContent: 'center',
					}}
				>
					{/** 추가 상세 이미지 리스트 */}
					{seminarData?.PRODUCT_DETAIL_IMAGE_LIST &&
						JSON.parse(seminarData?.PRODUCT_DETAIL_IMAGE_LIST).map(
							(item, index) => {
								if (index > 0)
									return (
										<>
											<Box
												key={index}
												sx={{
													display: 'flex',
													alignContent: 'center',
													justifyContent: 'center',
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
				{/* 세미나 내용 */}
				<Box
					display={'flex'}
					flexDirection={'column'}
					alignSelf={'center'}
					width={'100%'}
					ml={'25%'}
				>
					{seminarData?.DESCRIPTION &&
						JSON.parse(seminarData?.DESCRIPTION).map(
							(item: any) => {
								return (
									<Box
										width={'100%'}
										sx={{
											display: 'flex',
											flexDirection: {
												md: 'row',
												xs: 'column',
											},
											py: 4,
											overflow: 'hidden',
										}}
									>
										<Box
											width={{
												md: '45%',
												xs: '100%',
											}}
											mt={2}
										>
											<Typography
												fontWeight={700}
												variant="h3"
												color={'#363636'}
												sx={{
													wordBreak: 'keep-all',
													lineHeight: '20px',
													display: 'flex',
													flexWrap: 'wrap',
													mb: {
														md: 0,
														xs: 3,
													},
												}}
											>
												{item.TITLE}
											</Typography>
										</Box>

										<SupportiViewer
											data={item.DESCRIPTION}
										/>
									</Box>
								);
							}
						)}
				</Box>
				{/* </Box> */}
			</Box>
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
					{seminarData?.SeminarGroups?.sort(function compare(a, b) {
						if (a.DESCRIPTION > b.DESCRIPTION) return 1;
						if (a.DESCRIPTION < b.DESCRIPTION) return -1;
						return 0;
					}).map((item, index) => {
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
										그룹이름: <strong>{item.NAME}</strong>
									</Typography>
									{seminarData?.SEMINAR_PRODUCT_IDENTIFICATION_CODE !==
										13 && (
										<Typography variant={'body1'} mr={2}>
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
											seminarData?.SeminarGroups.length -
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
						contents={!checkApplication() ? '신청하기' : '신청완료'}
						isGradient={true}
						onClick={() => {
							// 정원이 마감되었을 경우
							const soldOut = seminarData?.SeminarGroups?.filter(
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
									`${
										seminarData?.PAYMENT_LINK
									}?userName=${memberEmailId}&productName=${'세미나'}&productName=${
										seminarData?.PRODUCT_NAME
									}&productId=${
										seminarData?.SEMINAR_PRODUCT_IDENTIFICATION_CODE
									}`
								);
						  }
						: undefined
				}
			/>
		</Box>
	);
};

export default Page;
