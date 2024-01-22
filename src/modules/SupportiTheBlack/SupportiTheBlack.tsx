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
		appMemberController.checkSpecialSubscription(
			{
				PHONE_NUMBER: recommenderData.PHONE_NUMBER,
				TYPE: 'BLACK',
			},
			(res) => {
				if (res.data.result !== null) {
					setIsVerified(res.data.result ? 'OK' : 'NOT_OK');
				} else {
					setIsVerified('NOT_OK');
				}
			},
			(err) => {
				setIsVerified('NOT_OK');
			}
		);
	};

	//** Constants
	const recommenderDataConfig = [
		{
			label: '',
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
					? '* 유효하지 않은 추천인 입니다.'
					: isVerified === 'OK'
					? '* 인증되었습니다.'
					: '',
		},
	];

	const GoogleFormLink = 'https://forms.gle/rmNRiRapHnmQYk1KA';
	const GoogleFormPw = 'black2024';

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
				title="추천인 입력"
				muiModalProps={{
					width: { sm: '30%', xs: '100%' },
					minHeight: { sm: '30%', xs: '100%' },
				}}
				style={{
					minWidth: '30%',
					width: { sm: '30%', xs: '100%' },
					minHeight: { sm: '30%', xs: '100%' },
					paddingTop: '40px',
				}}
			>
				<Box mb={3} width={'90%'} textAlign="center">
					<Typography color="secondary.dark">
						위 요금제는 추천제로만 신청이 가능합니다.
					</Typography>
					{recommenderDataConfig.map((item, idx) => {
						return (
							<Box
								key={idx}
								alignItems={'center'}
								width={'100%'}
								mt={3}
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
									placeholder={`추천인 휴대폰 번호를 입력해 주세요.`}
								/>
							</Box>
						);
					})}

					{/** 구분선 */}
					{isVerified === 'OK' && (
						<Box
							sx={{
								width: '100%',
								height: '1px',
								backgroundColor: 'secondary.light',
								mb: 4,
								mt: 4,
							}}
						/>
					)}

					{isVerified === 'OK' && (
						<Box
							p={'20px'}
							mt={1}
							bgcolor={'secondary.light'}
							borderRadius="4px"
							display="flex"
							flexDirection={'column'}
							gap={3}
						>
							<Typography
								variant={'subtitle1'}
								fontWeight={'600'}
							>
								신청 가이드
							</Typography>
							<Box
								textAlign={'left'}
								display="flex"
								flexDirection={'column'}
								gap={1}
							>
								<Typography
									color="primary.main"
									fontWeight={'500'}
								>
									1. 구글 폼 링크 이동
								</Typography>
								<Typography
									fontWeight={'500'}
									display={'flex'}
									gap={1}
								>
									[링크]{' '}
									<Typography
										fontWeight={'500'}
										sx={{ textDecoration: 'underline' }}
									>
										{GoogleFormLink}
									</Typography>
								</Typography>
							</Box>
							<Box
								textAlign={'left'}
								display="flex"
								flexDirection={'column'}
								gap={1}
							>
								<Typography
									color="primary.main"
									fontWeight={'500'}
								>
									2. 구글 폼 내에서 비밀번호 입력 후 폼 내용
									입력
								</Typography>
								<Typography fontWeight={'500'}>
									비밀번호 : {GoogleFormPw}
								</Typography>
								<Typography color="secondary.dark">
									※ 비밀번호를 입력하셔야 폼 입력이
									가능합니다.
								</Typography>
							</Box>
						</Box>
					)}
				</Box>
				{isVerified === 'OK' && (
					<SupportiButton
						contents={'링크 이동'}
						isGradient={true}
						fullWidth={true}
						onClick={() => {
							// 구글 폼 새 창으로 띄우고 모달 닫기
							window.open(
								'https://forms.gle/rmNRiRapHnmQYk1KA',
								'_blank'
							);
							props.handleClose();
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
