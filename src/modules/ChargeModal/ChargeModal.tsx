import { Box, Button, ButtonGroup, Grid, Typography } from '@mui/material';
import { ModalCore, TextTypeInput } from '@qillie-corp/qillie-react-ui';
import { RegexManager } from '@qillie-corp/qillie-utility';
import React, { useEffect, useState } from 'react';
import DefaultController from '@qillie-corp/ark-office-project/src/controller/default/DefaultController';

interface IChargeModal {
	role: string;
	memberType: string;
	id?: string;
}

const ChargeModal = (props: IChargeModal) => {
	//* Modules
	const chargeController = new DefaultController('PointApplication');

	//* States
	const [isModal, setIsModal] = React.useState(false);

	const regexManager = new RegexManager();

	// 가지고 있는 포인트
	const [currentPayTypePoint, setCurrentPayTypePoint] =
		useState<number>(50000);

	const [futurePoint, setFuturePoint] = useState<number>(0);

	/**
	 * 충전금맥
	 */
	const [chargingPoint, setChargingPoint] = useState<number | undefined>();
	const [chargingPointInputStatus, setChargingPointInputStatus] = useState<{
		status: string;
	}>({ status: 'default' });

	const handleChargingPoint = (money: number) => {
		if (chargingPoint === undefined) {
			setChargingPoint(money);
		} else if (chargingPoint !== undefined) {
			setChargingPoint(chargingPoint + money);
		}
	};

	function addMoneyComma(money: number) {
		let convertMoney = money.toLocaleString('ko-KR');
		return convertMoney;
	}

	const onClickButton = () => {
		chargeController.createItem(
			{
				MEMBER_TYPE: props.memberType,
				APPLICATION_TYPE: props.role.toUpperCase(),
				STATUS: 'PENDING',
				VALUE: chargingPoint,
			},
			(response) => {
				console.log(response);
			},
			(err) => {
				console.log(err);
			}
		);
	};

	useEffect(() => {
		if (props.role === 'charge') {
			setFuturePoint(currentPayTypePoint);
		} else if (props.role === 'exchange') {
			setFuturePoint(currentPayTypePoint);
		}
	}, [currentPayTypePoint, props.role]);

	useEffect(() => {
		if (chargingPoint !== undefined) {
			if (props.role === 'charge') {
				setFuturePoint(Number(currentPayTypePoint + chargingPoint!));
			} else if (props.role === 'exchange') {
				if (chargingPoint! > currentPayTypePoint) {
					setChargingPoint(0);
					alert('환전 금액이 보유 포인트보다 많습니다.');
					return;
				}
				setFuturePoint(Number(currentPayTypePoint - chargingPoint!));
			}
		}
	}, [chargingPoint]);

	return (
		<Box>
			<ModalCore
				isModalOpen={isModal}
				setIsModalOpen={setIsModal}
				useModalCloseButton={true}
				modalButtonElement={
					<Button id={props.id}>
						{props.role === 'charge' ? '충전신청' : '환전신청'}
					</Button>
				}
			>
				<Box
					width={'100%'}
					py={10}
					display={'flex'}
					alignItems={'center'}
					justifyContent={'center'}
				>
					<Box
						display={'flex'}
						alignItems={'center'}
						justifyContent={'center'}
						flexDirection={'column'}
						width={{ md: '50%', xs: '80%' }}
					>
						<Box
							display={'flex'}
							flexDirection={'column'}
							width={'100%'}
						>
							<Typography
								variant={'h1'}
								fontWeight={'700'}
								textAlign={'center'}
							>
								{props.role === 'charge'
									? '충전 신청'
									: '환전 신청'}
							</Typography>
							<Box
								display={'flex'}
								justifyContent={'space-between'}
								mb={2}
								mt={5}
							>
								<Typography variant="body1">
									{props.role === 'charge'
										? '충전 포인트'
										: '환전 포인트'}
								</Typography>
								<Typography variant="subtitle2">
									{props.role === 'charge'
										? `충전 후 포인트: ${addMoneyComma(
												Number(futurePoint)
										  )}`
										: `환전 후 포인트: ${addMoneyComma(
												Number(futurePoint)
										  )}`}
								</Typography>
							</Box>
							<TextTypeInput
								fullWidth
								placeholder={'충전 금액을 입력해주세요'}
								value={chargingPoint}
								setValue={setChargingPoint}
								inputCaptionConfig={{
									status: chargingPointInputStatus,
									errorMessage: '금액을 입력해주세요.',
								}}
								onChangeCallback={(args: any) => {
									if (args.event.target.value.length > 0) {
										setChargingPointInputStatus({
											status: 'default',
										});
									}
									setChargingPoint(
										Number(
											regexManager.filterNotNumber(
												args.event.target.value
											)
										)
									);
								}}
								adornmentPosition={'end'}
								adornmentElement={
									<Button
										variant={'outlined'}
										onClick={() => {
											setChargingPoint(0);
										}}
										color={'info'}
										sx={{
											padding: 0,
											color: 'gray',
										}}
									>
										초기화
									</Button>
								}
							/>
						</Box>

						{/*  카드 , 핸드폰, 가상 , 실시간 이체 */}
						<Grid container>
							<Grid item md={12} xs={12}>
								<ButtonGroup
									// size="large"
									color="info"
									disableElevation
									variant="outlined"
									aria-label="Disabled elevation buttons"
									sx={{ mt: '10px' }}
									fullWidth
								>
									<Button
										onClick={() =>
											handleChargingPoint(10000)
										}
										sx={{
											height: '44px',
											color: 'gray',
											// color: theme.palette.grey[900],
										}}
									>
										+1만
									</Button>
									<Button
										onClick={() =>
											handleChargingPoint(50000)
										}
										sx={{
											height: '44px',
											color: 'gray',
											// color: theme.palette.grey[900],
										}}
									>
										+5만
									</Button>
									<Button
										onClick={() =>
											handleChargingPoint(100000)
										}
										sx={{
											height: '44px',
											color: 'gray',
											// color: theme.palette.grey[900],
										}}
									>
										+10만
									</Button>
									<Button
										onClick={() =>
											handleChargingPoint(1000000)
										}
										sx={{
											height: '44px',
											color: 'gray',
											// color: theme.palette.grey[900],
										}}
									>
										+100만
									</Button>
								</ButtonGroup>
							</Grid>
						</Grid>
						<Button
							sx={{
								mt: 5,
							}}
							variant="contained"
							color="primary"
							fullWidth
							onClick={() => {
								onClickButton();
							}}
						>
							{props.role === 'charge' ? '충전신청' : '환전신청'}
						</Button>
					</Box>
				</Box>
			</ModalCore>
		</Box>
	);
};

export default ChargeModal;
