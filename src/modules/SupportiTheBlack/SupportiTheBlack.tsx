import React, { useEffect } from 'react';
import { Box } from '@mui/system';
import SuppportiModal from '../../views/global/SuppportiModal';
import { Button, TextField, Typography } from '@mui/material';
import SupportiButton from '../../views/global/SupportiButton';
import DefaultController from '@leanoncompany/supporti-ark-office-project/src/controller/default/DefaultController';
import { AppMemberController } from '../../controller/AppMemberController';

interface ISupportiBlackPayModalProps {
	open: boolean;
	handleClose: any;
}

interface IuseSupportiTheBlackProps {
	memberId: any;
}

const SupportiTheBlack = (props: IuseSupportiTheBlackProps) => {
	//* Controller
	const appMemberController = new AppMemberController();
	const subscriptionAccessibilityController = new DefaultController(
		'SubscriptionAccessibility'
	);

	//* States
	/**
	 * 추천인 데이터
	 */
	const [recommenderData, setRecommenderData] = React.useState({
		PHONE_NUMBER: '',
	});

	/**
	 *
	 * 추천인 확인 여부
	 */
	const [isVerified, setIsVerified] = React.useState<string>('NOT_YET');

	//* Functions
	/**
	 * 신청 권한에 대한 유무 판단 함수
	 */
	const checkPermission = (setPermission) => {
		props.memberId &&
			subscriptionAccessibilityController.getOneItemByKey(
				{
					APP_MEMBER_IDENTIFICATION_CODE: props.memberId,
				},
				(res) => {
					if (res.data.result !== null) {
						setPermission(true);
					} else {
						setPermission(false);
					}
				},
				(err) => {
					setPermission(false);
				}
			);
	};

	/**
	 * 추천인 확인
	 */
	const recommenderCheck = () => {
		// isVerified = 'OK' or 'NOT_OK'
		appMemberController.checkSpecialSubscription(
			{
				PHONE_NUMBER: recommenderData.PHONE_NUMBER,
				TYPE: 'BLACK',
				// SUBSCRIPTION_ACCESSIBILITY_IDENTIFICATION_CODE: 'N',
			},
			(res) => {
				if (res.data.result !== null) {
					setIsVerified(res.data.result ? 'OK' : 'NOT_OK');
				} else {
					setIsVerified('NOT_OK');
					// setIsSubscribed(false);
				}
			},
			(err) => {
				setIsVerified('NOT_OK');

				// setIsSubscribed(false);
			}
		);
	};

	//** Constants
	const recommenderDataConfig = [
		{
			label: '추천인 핸드폰번호',
			type: 'phone',
			endAdornment: (
				<Button
					variant="contained"
					sx={{
						backgroundColor: '#d1d1d1',
					}}
					onClick={() => recommenderCheck()}
				>
					<Typography variant="body2" color={'white'}>
						인증
					</Typography>
				</Button>
			),
			value: recommenderData.PHONE_NUMBER,
			isVerified: isVerified,
			onChange: (e) => {
				setRecommenderData({
					...recommenderData,
					PHONE_NUMBER: e.target.value,
				});
			},
			error: isVerified === 'NOT_OK',
			helperText:
				isVerified === 'NOT_OK'
					? '유효하지 않은 추천인 입니다.'
					: isVerified === 'OK'
					? '인증되었습니다.'
					: '',
		},
	];

	/**
	 *
	 * 추천인 확인 모달
	 */
	const SupportiBlackPayModal = (props: ISupportiBlackPayModalProps) => {
		return (
			<SuppportiModal
				open={props.open}
				handleClose={() => {
					props.handleClose();
					setRecommenderData({
						PHONE_NUMBER: '',
					});
					setIsVerified('NOT_YET');
				}}
				activeHeader={false}
				title="추천인 확인"
				muiModalProps={{
					width: { sm: '40%', xs: '100%' },
					minHeight: { sm: '30%', xs: '100%' },
				}}
				style={{
					minWidth: '40%',
					width: { sm: '40%', xs: '100%' },
					minHeight: { sm: '30%', xs: '100%' },
					paddingTop: '30px',
				}}
			>
				<Box mb={3} width={'100%'} mt={3}>
					{recommenderDataConfig.map((item, idx) => {
						return (
							<Box
								key={idx}
								alignItems={'center'}
								width={'100%'}
								mt={2}
							>
								<Typography>{item.label}</Typography>
								<TextField
									type={item.type}
									value={item.value}
									onChange={item.onChange}
									error={item.error}
									focused={item.isVerified === 'NOT_OK'}
									disabled={item.isVerified == 'OK'}
									color={
										item.isVerified === 'OK'
											? 'primary'
											: 'secondary'
									}
									fullWidth
									InputProps={{
										endAdornment: item.endAdornment,
									}}
									helperText={item.helperText}
									sx={{
										mt: 1,
									}}
									placeholder={`${item.label} 입력`}
								/>
							</Box>
						);
					})}

					{isVerified === 'OK' && (
						<Box p={4}>
							<Typography ml={'auto'} mr="auto">
								신청 가이드
							</Typography>
							<Box>
								<Typography>1. 구글 폼 링크 이동</Typography>
								<Typography>링크 :</Typography>
							</Box>
							<Box>
								<Typography>
									2. 구글 폼 내에서 비밀번호 입력 후 폼 내용
									입력
								</Typography>
								<Typography>비밀번호 :</Typography>
							</Box>
						</Box>
					)}
				</Box>
				{isVerified === 'OK' && (
					<SupportiButton
						contents={'다음'}
						isGradient={true}
						fullWidth={true}
						onClick={() => {
							// 구글 폼 새 창으로 띄우고 모달 닫기
						}}
						style={{ color: 'white' }}
					/>
				)}
			</SuppportiModal>
		);
	};

	return { checkPermission, SupportiBlackPayModal };
};

export default SupportiTheBlack;
