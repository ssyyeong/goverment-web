import React from 'react';

import { Box, BoxProps, Typography } from '@mui/material';
import SupportiModal, {
	ISupportiModalProps,
} from '../SupportiModal/SupportiModal';
import SupportiButton from '../SupportiButton';
import { useRouter } from 'next/router';
import ChargeModal from '../../local/external_service/chargeModal/ChargeModal';
import CoffeeChatProfileModal from '../../local/internal_service/coffeechat/CoffeeChatProfileModal/CoffeeChatProfileModal';

interface ISupportiAlertModalProps {
	/**
	 * 모달 오픈 여부
	 */
	open: boolean;
	/**
	 * 모달 닫기 핸들러
	 */
	handleClose: () => void;
	/**
	 * 모달 타입
	 */
	type:
		| 'success'
		| 'login'
		| 'subscribe'
		| 'point'
		| 'already'
		| 'withdraw'
		| 'unsubscribe'
		| 'cancel'
		| 'delete'
		| 'business'
		| 'loginfail'
		| 'consultingexceed'
		| 'seminarexceed'
		| 'indicatorModify'
		| 'indicatorDelete'
		| 'indicatorWarning'
		| 'successModifyAxios'
		| 'successCreateAxios'
		| 'successDeleteAxios'
		| 'failAxios'
		| 'seminarApply'
		| 'seminarApplySuccess'
		| 'paymentSuccess'
		| 'unAccess'
		| 'coffeechatprofilemissing'
		| 'coffeechatalready'
		| 'coffeechatapplysuccess'
		| 'irFinish'
		| 'irApply'
		| 'mentoringWarning'
		| 'marketPlaceApply'
		| 'marketPlaceApplySuccess'
		| 'marketPlaceApplyFail'
		| 'rateInquiryApply'
		| 'rateInquiryApplySuccess'
		| 'rateInquiryApplyFail'
		| 'noAccount'
		| 'unReady';

	/**
	 * 커스텀 핸들러
	 */
	customHandleClose?: () => void;
}

interface IModalConfig {
	[key: string]: {
		/**
		 * 아이콘 타입
		 */
		type: 'success' | 'error';
		/**
		 * 본문 내용
		 */
		title: string;
		/**
		 * 버튼 텍스트
		 */
		content: string;
		/**
		 * 버튼 클릭 핸들러
		 */
		onclick: () => void;
		/**
		 * 취소 버튼 여부
		 */
		cancelButtonAvailable: boolean;
		/**
		 * 서브타이틀
		 */
		subTitle?: string;
	};
}

const SupportiAlertModal = (props: ISupportiAlertModalProps) => {
	//* Modules
	const router = useRouter();
	//* States
	/**
	 * 충전 모달 오픈 여부
	 */
	const [openChargeModal, setOpenChargeModal] =
		React.useState<boolean>(false);
	/**
	 * 커피챗 프로필 모달 오픈 여부
	 */
	const [openCoffeeChatProfileModal, setOpenCoffeeChatProfileModal] =
		React.useState<boolean>(false);

	//* Constants
	/**
	 * 모달 설정
	 */
	const modalConfig: IModalConfig = {
		paymentSuccess: {
			type: 'success',
			title: '결제완료 되었습니다.',
			content: '확인',
			onclick: () => {
				props.handleClose();
				props.customHandleClose && props.customHandleClose();
			},
			cancelButtonAvailable: false,
		},
		success: {
			type: 'success',
			title: '신청완료 되었습니다.',
			content: '확인',
			onclick: () => {
				props.handleClose();
				props.customHandleClose && props.customHandleClose();
			},
			cancelButtonAvailable: false,
		},
		login: {
			type: 'error',
			title: '로그인 후 이용해주세요.',
			content: '로그인 페이지로 이동',
			onclick: () => {
				router.push('/auth/sign_in');
			},
			cancelButtonAvailable: false,
		},
		subscribe: {
			type: 'error',
			title: '구독 회원만 이용가능한 서비스입니다.',
			content: '구독 결제 페이지로 이동',
			onclick: () => {
				router.push('/rate_plan');
			},
			cancelButtonAvailable: false,
		},
		point: {
			type: 'error',
			title: '포인트가 부족합니다.',
			content: '포인트 충전하러 가기',
			onclick: () => {
				setOpenChargeModal(true);
			},
			cancelButtonAvailable: false,
		},
		already: {
			type: 'error',
			title: '이미 신청하신 세미나입니다.',
			content: '확인',
			onclick: () => {
				props.handleClose();
				props.customHandleClose && props.customHandleClose();
			},
			cancelButtonAvailable: false,
		},
		withdraw: {
			type: 'error',
			title: '탈퇴시 모든 개인정보가 삭제됩니다. 탈퇴하시겠습니까?',
			content: '확인',
			onclick: () => {
				props.customHandleClose && props.customHandleClose();
			},
			cancelButtonAvailable: true,
		},
		unsubscribe: {
			type: 'error',
			title: '구독 취소 시 다음 결제 일 기준으로 모든 유료 서비스가 제한됩니다. 구독 취소하시겠습니까?',
			content: '확인',
			onclick: () => {
				props.customHandleClose && props.customHandleClose();
			},
			cancelButtonAvailable: true,
		},
		cancel: {
			type: 'error',
			title: '정말 취소하시겠습니까?',
			content: '확인',
			onclick: () => {
				props.customHandleClose && props.customHandleClose();
			},
			cancelButtonAvailable: true,
		},
		delete: {
			type: 'error',
			title: '정말 삭제하시겠습니까?',
			content: '확인',
			onclick: () => {
				props.customHandleClose && props.customHandleClose();
			},
			cancelButtonAvailable: true,
		},
		business: {
			type: 'error',
			title: '기업회원만 이용하실 수 있는 서비스입니다. 마이페이지에서 사업자회원으로 변경 가능합니다.',
			content: '확인',
			onclick: () => {
				// props.customHandleClose && props.customHandleClose();
				props.handleClose();
			},
			cancelButtonAvailable: false,
		},
		loginfail: {
			type: 'error',
			title: '입력하신 정보와 일치하는 회원이 없습니다.',
			content: '확인',
			onclick: () => {
				props.handleClose();
			},
			cancelButtonAvailable: false,
		},
		consultingexceed: {
			type: 'error',
			title: '동일고객 예약횟수를 초과하였습니다.',
			content: '확인',
			onclick: () => {
				props.handleClose();
			},
			cancelButtonAvailable: false,
		},
		seminarexceed: {
			type: 'error',
			title: '제한인원을 초과하였습니다.',
			content: '확인',
			onclick: () => {
				props.handleClose();
			},
			cancelButtonAvailable: false,
		},
		indicatorModify: {
			type: 'error',
			title: '해당 하위목표의 히스토리가 사라집니다! 수정하시겠습니까?',
			content: '확인',
			onclick: () => {
				props.handleClose();
				props.customHandleClose && props.customHandleClose();
			},
			cancelButtonAvailable: true,
		},
		indicatorDelete: {
			type: 'error',
			title: '해당 하위목표의 히스토리가 사라집니다! 삭제하시겠습니까?',
			content: '확인',
			onclick: () => {
				props.handleClose();
				props.customHandleClose && props.customHandleClose();
			},
			cancelButtonAvailable: true,
		},
		indicatorWarning: {
			type: 'error',
			title: '남은 하위 목표 기입 필요',
			content: '확인',
			onclick: () => {
				props.handleClose();
				props.customHandleClose && props.customHandleClose();
			},
			cancelButtonAvailable: false,
		},
		successModifyAxios: {
			type: 'success',
			title: '성공적으로 수정되었습니다.',
			content: '확인',
			onclick: () => {
				props.handleClose();
				props.customHandleClose && props.customHandleClose();
			},
			cancelButtonAvailable: false,
		},
		successCreateAxios: {
			type: 'success',
			title: '성공적으로 등록되었습니다.',
			content: '확인',
			onclick: () => {
				props.handleClose();
				props.customHandleClose && props.customHandleClose();
			},
			cancelButtonAvailable: false,
		},
		successDeleteAxios: {
			type: 'success',
			title: '성공적으로 삭제되었습니다.',
			content: '확인',
			onclick: () => {
				props.handleClose();
				props.customHandleClose && props.customHandleClose();
			},
			cancelButtonAvailable: false,
		},
		failAxios: {
			type: 'error',
			title: '오류가 발생했습니다.',
			content: '확인',
			onclick: () => {
				props.handleClose();
				props.customHandleClose && props.customHandleClose();
			},
			cancelButtonAvailable: false,
		},
		seminarApply: {
			type: 'success',
			title: '이 세미나를 신청하시겠습니까?',
			content: '확인',
			onclick: () => {
				props.handleClose();
				props.customHandleClose && props.customHandleClose();
			},
			cancelButtonAvailable: true,
		},
		seminarApplySuccess: {
			type: 'success',
			title: '결제 링크로 넘어갑니다.',
			content: '확인',
			onclick: () => {
				props.handleClose();
				props.customHandleClose && props.customHandleClose();
			},
			cancelButtonAvailable: false,
		},
		unAccess: {
			type: 'error',

			title: '비밀글은 본인 글만 확인 가능합니다.',
			content: '확인',
			// content: '로그인 페이지로 이동',

			onclick: () => {
				props.handleClose();
			},
			cancelButtonAvailable: false,
		},
		coffeechatprofilemissing: {
			type: 'error',
			title: '커피챗 프로필이 설정되어 있지 않습니다.',
			content: '설정하기',
			onclick: () => {
				setOpenCoffeeChatProfileModal(true);
			},
			cancelButtonAvailable: false,
			subTitle: '커피챗 프로필 설정 후 이용해주세요!',
		},
		coffeechatalready: {
			type: 'error',
			title: '이번달에 이미 커피챗을 진행하셨습니다.',
			subTitle: '다음달에 다시 신청해주세요!',
			content: '확인',
			onclick: () => {
				props.handleClose();
			},
			cancelButtonAvailable: false,
		},
		coffeechatapplysuccess: {
			type: 'success',
			title: '커피챗 신청이 완료되었습니다.',
			subTitle:
				'해당 유저분이 확인 후 수락시 줌링크 및 안내사항을 알림톡으로 발송드립니다!',
			content: '확인',
			onclick: () => {
				props.handleClose();
				props.customHandleClose && props.customHandleClose();
			},
			cancelButtonAvailable: false,
		},
		irFinish: {
			type: 'error',

			title: '신청가능 기간이 지났습니다.',
			content: '확인',
			// content: '로그인 페이지로 이동',

			onclick: () => {
				props.handleClose();
			},
			cancelButtonAvailable: false,
		},
		noAccount: {
			type: 'error',
			title: '계좌 등록 및 카테고리 설정 후 이용 가능합니다.',
			content: '계좌 등록하러 가기',
			onclick: () => {
				router.push(
					'/internal_service/financial_solution/account_manage'
				);
				props.handleClose();
			},
			cancelButtonAvailable: false,
		},
		unReady: {
			type: 'error',
			title: '해당 기능은 현재 준비중입니다.조금만 기다려주세요!',
			content: '확인',
			onclick: () => {
				props.handleClose();
			},
			cancelButtonAvailable: false,
		},
		irApply: {
			type: 'success',
			title: '이 데모데이를 신청하시겠습니까? IR데이터는 신청시점의 데이터로 신청 됩니다.',
			content: '확인',
			onclick: () => {
				// props.handleClose();
				props.customHandleClose && props.customHandleClose();
			},
			cancelButtonAvailable: true,
		},
		mentoringWarning: {
			type: 'error',
			title: '멘토링 진행 횟수를 다시 확인해주세요.',
			content: '확인',
			onclick: () => {
				props.handleClose();
			},
			cancelButtonAvailable: false,
		},
		marketPlaceApply: {
			type: 'success',
			title: '혜택을 받으시겠습니까?',
			content: '확인',
			onclick: () => {
				props.handleClose();
				props.customHandleClose && props.customHandleClose();
			},
			cancelButtonAvailable: true,
		},
		marketPlaceApplySuccess: {
			type: 'success',
			title: '신청되었습니다. 추후 연락드리겠습니다.',
			content: '확인',
			onclick: () => {
				props.handleClose();
				props.customHandleClose && props.customHandleClose();
			},
			cancelButtonAvailable: false,
		},
		marketPlaceApplyFail: {
			type: 'error',
			title: '이미 혜택 신청을 하셨습니다.',
			content: '확인',
			onclick: () => {
				props.handleClose();
			},
			cancelButtonAvailable: false,
		},
		rateInquiryApply: {
			type: 'success',
			title: '문의를 남기시겠습니까?',
			content: '확인',
			onclick: () => {
				props.handleClose();
				props.customHandleClose && props.customHandleClose();
			},
			cancelButtonAvailable: true,
		},
		rateInquiryApplySuccess: {
			type: 'success',
			title: '문의가 완료되었습니다. 추후 연락드리겠습니다.',
			content: '확인',
			onclick: () => {
				props.handleClose();
				props.customHandleClose && props.customHandleClose();
			},
			cancelButtonAvailable: false,
		},
		rateInquiryApplyFail: {
			type: 'error',
			title: '이미 문의를 하셨습니다.',
			content: '확인',
			onclick: () => {
				props.handleClose();
			},
			cancelButtonAvailable: false,
		},
	};

	return (
		<SupportiModal
			open={props.open}
			handleClose={() => {
				props.handleClose();
			}}
			title=""
		>
			<Box
				display={'flex'}
				flexDirection={'column'}
				alignItems={'center'}
				justifyContent={'center'}
				width={'100%'}
				height={'100%'}
				minWidth={'250px'}
			>
				{/* 아이콘 */}
				<Box
					width={'100%'}
					display={'flex'}
					alignItems={'center'}
					justifyContent={'center'}
					mb={'16px'}
				>
					{modalConfig[props.type]?.type === 'success' && (
						<img
							src={'/images/icons/icon_success.svg'}
							alt={'success'}
						/>
					)}
					{modalConfig[props.type]?.type === 'error' && (
						<img
							src={'/images/icons/icon_error.svg'}
							alt={'error'}
						/>
					)}
				</Box>
				{/* 본문 내용 */}
				<Typography variant={'h4'} fontWeight={'bold'} my={1}>
					{modalConfig[props.type]?.title}
				</Typography>
				{/* 하위 내용 */}
				{modalConfig[props.type]?.subTitle && (
					<Typography
						variant={'subtitle1'}
						fontWeight={500}
						my={2}
						color="secondary.dark"
					>
						{modalConfig[props.type]?.subTitle}
					</Typography>
				)}
				{props.type === 'indicatorWarning' && (
					<Box textAlign={'center'}>
						<Typography
							variant={'subtitle1'}
							fontWeight={500}
							my={1}
							color="secondary.dark"
						>
							메인 목표에 맞게 남은 하위 목표를 기입하세요.
						</Typography>
						<Typography
							variant={'body1'}
							fontWeight={500}
							my={1}
							color="secondary.dark"
						>
							* 목표량은 0이 될 수 없습니다.
						</Typography>
					</Box>
				)}
				{/* 버튼 */}
				<Box
					display={'flex'}
					alignItems={'center'}
					width={'100%'}
					gap={2}
				>
					{modalConfig[props.type]?.cancelButtonAvailable && (
						<SupportiButton
							contents={'취소'}
							// fullWidth
							isGradient={false}
							style={{
								bgcolor: '#a4a4a4',
								color: '#fff',
								mt: 3,
								width: '50%',
							}}
							onClick={() => {
								props.handleClose();
							}}
						/>
					)}
					<SupportiButton
						contents={modalConfig[props.type]?.content}
						isGradient={true}
						style={{
							color: '#fff',
							mt: 3,
							width: modalConfig[props.type]
								?.cancelButtonAvailable
								? '50%'
								: '100%',
						}}
						onClick={() => modalConfig[props.type]?.onclick()}
					/>
				</Box>
			</Box>
			{/* 충전 모달 */}
			<ChargeModal
				open={openChargeModal}
				handleClose={() => setOpenChargeModal(false)}
			/>
			{/* 커피챗 프로필 모달 */}
			<CoffeeChatProfileModal
				open={openCoffeeChatProfileModal}
				handleClose={() => {
					setOpenCoffeeChatProfileModal(false);
					props.handleClose();
				}}
			/>
		</SupportiModal>
	);
};

export default SupportiAlertModal;
