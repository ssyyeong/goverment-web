import React, { useEffect } from 'react';

import { Box, BoxProps, Grid, Typography } from '@mui/material';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import SupportiButton from '../../../../global/SupportiButton';
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import SupportiInput from '../../../../global/SupportiInput';
import DefaultController from '@leanoncompany/supporti-ark-office-project/src/controller/default/DefaultController';
import { SubsidyByItemController } from '../../../../../controller/SubsidyByItemController';
import addCommaToNumber from '../../../../../function/DataFormatter/addCommaToNumber';
import UpdateCashModal from '../UpdateCashModal/UpdateCashModal';

interface ISubsidyByItemTableProps {
	supportBusinessManagement: any;
	useCalculation: boolean;
	handleSubsidyTabChange: (type: string) => void;
	subsidyTab?: string;
	getSupportBusiness: () => void;
	totalOperatingCost: number;
}

const SubsidyByItemTable = (props: ISubsidyByItemTableProps) => {
	//* Controller
	const subsidyByItemController = new DefaultController('SubsidyByItem');

	const cashUpdateController = new SubsidyByItemController();
	//* State
	/**
	 * 항목별 지원금
	 */
	const [subSidyByItems, setSubSidyByItems] = React.useState<any[]>([]);
	/**
	 * 수정모드
	 */
	const [isEditMode, setIsEditMode] = React.useState<boolean>(false);

	/**
	 * 수정할 아이템
	 */
	const [targetItem, setTargetItem] = React.useState({
		id: undefined,
		// managementId:
		// 	props.supportBusinessManagement
		// 		.SUPPORT_BUSINESS_MANAGEMENT_IDENTIFICATION_CODE,
		rate: undefined,
		cost: undefined,
		name: undefined,
		support_cost_rate: props.supportBusinessManagement.SUPPORT_COST_RATE,
		business_contribution_rate:
			props.supportBusinessManagement.BUSINESS_CONTRIBUTION_RATE,
	});

	// const subsidyConfig = [
	// 	{
	// 		label: '재료비',
	// 		key: '재료비',
	// 	},
	// 	{
	// 		label: '외주용역비',
	// 		key: '외주용역비',
	// 	},
	// 	{
	// 		label: '기계장치비',
	// 		key: '기계장치비',
	// 	},
	// 	{
	// 		label: '무형자산취득비',
	// 		key: '무형자산취득비',
	// 	},
	// 	{
	// 		label: '보수',
	// 		key: '인건비-보수',
	// 	},
	// 	{
	// 		label: '일용임금',
	// 		key: '인건비-일용임금',
	// 	},
	// 	{
	// 		label: '일반수용비',
	// 		key: '지급수수료-일반수용비',
	// 	},
	// 	{
	// 		label: '임차료',
	// 		key: '지급수수료-임차료',
	// 	},
	// 	{
	// 		label: '국내여비',
	// 		key: '여비-국내여비',
	// 	},
	// 	{
	// 		label: '국외여비',
	// 		key: '여비-국외여비',
	// 	},
	// 	{
	// 		label: '교육훈련비',
	// 		key: '교육훈련비',
	// 	},
	// 	{
	// 		label: '일반수용비',
	// 		key: '광고선전비-일반수용비',
	// 	},
	// 	{
	// 		label: '일반용역비',
	// 		key: '광고선전비-일반용역비',
	// 	},
	// ];
	const subsidyConfig = [
		{
			label: '재료비',
			key: '재료비',
			group: '지원금',
		},
		{
			label: '재료비',
			key: '재료비',
			group: '기업부담금',
		},
		{
			label: '외주용역비',
			key: '외주용역비',
			group: '지원금',
		},
		{
			label: '외주용역비',
			key: '외주용역비',
			group: '기업부담금',
		},
		{
			label: '기계장치비',
			key: '기계장치비',
			group: '지원금',
		},
		{
			label: '기계장치비',
			key: '기계장치비',
			group: '기업부담금',
		},
		{
			label: '인건비',
			key: '인건비',
			group: '지원금',
		},
		{
			label: '인건비',
			key: '인건비',
			group: '기업부담금',
		},
		{
			label: '무형자산취득비',
			key: '특허권/무형자산비',
			group: '지원금',
		},
		{
			label: '무형자산취득비',
			key: '특허권/무형자산비',
			group: '기업부담금',
		},
		{
			label: '여비',
			key: '여비',
			group: '지원금',
		},
		{
			label: '여비',
			key: '여비',
			group: '기업부담금',
		},

		{
			label: '지급수수료',
			key: '지급수수료',
			group: '지원금',
		},
		{
			label: '지급수수료',
			key: '지급수수료',
			group: '기업부담금',
		},

		{
			label: '교육훈련비',
			key: '교육훈련비',
			group: '지원금',
		},
		{
			label: '교육훈련비',
			key: '교육훈련비',
			group: '기업부담금',
		},
		{
			label: '광고선전비',
			key: '광고선전비',
			group: '지원금',
		},
		{
			label: '광고선전비',
			key: '광고선전비',
			group: '기업부담금',
		},
	];

	/**
	 * 필요한 데이터만 추출
	 */
	const temp = subsidyConfig.map((item, index) => {
		return {
			data:
				props.supportBusinessManagement.SubsidyByItems &&
				JSON.parse(
					props.supportBusinessManagement.SubsidyByItems?.filter(
						(data) => data.NAME === item.key
					)[0]?.SUPPORT_COST
				)[0][item.group][props.subsidyTab],
			key: item.key,
			id:
				props.supportBusinessManagement.SubsidyByItems &&
				props.supportBusinessManagement.SubsidyByItems?.filter(
					(data) => data.NAME === item.key
				)[0].SUBSIDY_BY_ITEM_IDENTIFICATION_CODE,
			group: item.group,
		};
	});

	const subsidyMenu = [
		{
			label: '재료비',
		},
		{
			label: '외주용역비',
		},
		{
			label: '기계장치',
			// label: '기계장치(공구,기구,비품,SW 등)',
		},
		{
			label: '인건비',
			occupyDouble: true,
		},
		{
			label: '무형자산 취득비',
			// label: '특허권 등 무형자산 취득비',
		},
		{
			label: '여비',
			occupyDouble: true,
		},
		{
			label: '지급수수료',
			occupyDouble: true,
		},

		{
			label: '교육훈련비',
		},
		{
			label: '광고선전비',
			occupyDouble: true,
		},
	];

	// const temp2 = subsidyMenu.map((item, index) => {
	// 	return {
	// 		data:		JSON.parse(
	// 				props.supportBusinessManagement.SubsidyByItems.filter(
	// 					(data) => data.NAME === item.label
	// 				)[0]?.SUPPORT_COST
	// 			)[0]?.['기업부담금'],
	// 		key: item.label,
	// 	};
	// });

	// console.log(temp2);

	const tabConfig = [
		{
			label: '총 금액',
			key: 'TOTAL_AMOUNT',
		},
		{
			label: '사용금액',
			key: 'USED_AMOUNT',
		},
		{
			label: '남은 금액',
			key: 'REMAIN_AMOUNT',
		},
	];

	//* Functions
	/**
	 * 항목별 지원금 수정하기
	 */
	// const updateSubsidyByItem = async () => {
	// 	try {
	// 		const updatedDataPromises = subSidyByItems.map(
	// 			(subSidyByItem) =>
	// 				new Promise((resolve, reject) => {
	// 					subsidyByItemController.updateItem(
	// 						{ ...subSidyByItem },
	// 						(res) => {
	// 							resolve(res.data.result);
	// 						},
	// 						(err) => {
	// 							reject(new Error('업데이트에 실패했습니다.'));
	// 						}
	// 					);
	// 				})
	// 		);

	// 		const updatedData = await Promise.all(updatedDataPromises);

	// 		console.log(updatedData);

	// 		// 모든 요소를 처리한 후에 상태 업데이트
	// 		setSubSidyByItems(updatedData);
	// 		setIsEditMode(false);
	// 	} catch (error) {
	// 		// 에러 처리
	// 		alert(error.message);
	// 	}
	// };

	const updateSubsidyByItem = () => {
		// 현재 수정 중인 항목의 금액 계산
		const costData = JSON.parse(targetItem.cost)[0];
		const currentSupportAmount =
			Number(costData['지원금'][props.subsidyTab]) || 0;
		const currentBusinessAmount =
			Number(costData['기업부담금'][props.subsidyTab]) || 0;

		// 다른 모든 항목의 금액 합계 계산
		const otherItemsTotal = subSidyByItems
			.filter(
				(item) =>
					item.SUBSIDY_BY_ITEM_IDENTIFICATION_CODE !== targetItem.id
			)
			.reduce((total, item) => {
				const itemCostData = JSON.parse(item.SUPPORT_COST)[0];
				const supportAmount =
					Number(itemCostData['지원금'][props.subsidyTab]) || 0;
				const businessAmount =
					Number(itemCostData['기업부담금'][props.subsidyTab]) || 0;
				return total + supportAmount + businessAmount;
			}, 0);

		// 전체 총액 계산 (현재 수정 중인 항목 + 다른 모든 항목)
		const totalAmount =
			currentSupportAmount + currentBusinessAmount + otherItemsTotal;

		console.log(
			'현재 수정 중인 항목 금액:',
			currentSupportAmount + currentBusinessAmount
		);
		console.log('다른 항목들의 총액:', otherItemsTotal);
		console.log('전체 총액:', totalAmount);
		console.log('총 사업비:', props.totalOperatingCost);

		if (totalAmount > props.totalOperatingCost) {
			alert('총 사업비를 초과할 수 없습니다.');
			return;
		}

		// 업데이트 치기
		cashUpdateController.updateCash(
			{
				SUBSIDY_BY_ITEM_IDENTIFICATION_CODE: targetItem.id,
			},
			{
				SUPPORT_BUSINESS_MANAGEMENT_IDENTIFICATION_CODE:
					props.supportBusinessManagement
						.SUPPORT_BUSINESS_MANAGEMENT_IDENTIFICATION_CODE,
				RATE: targetItem.rate,
				SUPPORT_COST: targetItem.cost,
			},

			(res) => {
				props.getSupportBusiness();
				console.log(res);
			},
			(err) => {
				console.log(err);
			}
		);
	};

	//* Hooks
	useEffect(() => {
		setSubSidyByItems(props.supportBusinessManagement.SubsidyByItems);
	}, [props.supportBusinessManagement]);

	useEffect(() => {
		setIsEditMode(false);
	}, [props.subsidyTab]);

	return (
		subSidyByItems?.length !== 0 && (
			<Box
				display={'flex'}
				flexDirection={'column'}
				mt={4}
				// bgcolor={'white'}
				borderRadius={2}
				width={'100%'}
			>
				<Box
					display={'flex'}
					justifyContent={'space-between'}
					mb={1}
					alignItems={'center'}
				>
					<Typography fontWeight={'600'} variant="h6" my={2}>
						✔ 항목별 지원금
					</Typography>
					{/* <SupportiButton
						variant="outlined"
						contents={
							<Box display={'flex'} alignItems={'center'} gap={1}>
								<CreateOutlinedIcon fontSize="small" />
								<Typography
									fontWeight={'bold'}
									color={'primary'}
								>
									수정하기
								</Typography>
							</Box>
						}
						onClick={() => {
							if (isEditMode) {
								updateSubsidyByItem();
							} else {
								setIsEditMode(true);
							}
						}}
						disabledGutters
						style={{
							px: 2,
							py: 1,
							bgcolor: 'white',
						}}
					/> */}
				</Box>

				<Grid container>
					<Grid
						container
						sm={9}
						xs={6}
						sx={{
							overflowX: 'auto',
						}}
						flexWrap={'nowrap'}
					>
						{/* 비목 */}
						<Grid
							container
							flexDirection={'column'}
							sm={4}
							display={{ xs: 'none', sm: 'flex' }}
						>
							<Grid
								item
								sx={{
									borderTopLeftRadius: 10,
								}}
								bgcolor={'primary.main'}
								py={2}
								px={1}
								alignItems={'center'}
							>
								<Typography
									fontWeight={'600'}
									textAlign={'center'}
									color={'white'}
								>
									항목
								</Typography>
							</Grid>
							{subsidyMenu.map((item, index) => (
								<Grid
									item
									display={'flex'}
									justifyContent={'center'}
									alignItems={'center'}
									px={1}
									borderBottom={'0.5px solid #ccc'}
									borderRight={'0.5px solid #ccc'}
									borderLeft={'0.5px solid #ccc'}
									key={index}
									// py={item.occupyDouble ? 4.95 : 2}
									py={4.95}
								>
									<Typography
										color={'primary.main'}
										fontWeight={'600'}
									>
										{item.label}
									</Typography>
									{
										<CreateOutlinedIcon
											fontSize="small"
											sx={{
												color: 'lightGrey',
												cursor: 'pointer',
											}}
											onClick={() => {
												setIsEditMode(!isEditMode);
												setTargetItem({
													...targetItem,
													id: subSidyByItems[index]
														.SUBSIDY_BY_ITEM_IDENTIFICATION_CODE,
													rate: subSidyByItems[index]
														.RATE,
													cost: subSidyByItems[index]
														.SUPPORT_COST,
													name: subSidyByItems[index]
														.NAME,
												});
											}}
										/>
									}
									{/* <Box
										sx={{
											width: '28px',
											height: '18px',
											borderRadius: '3px',
											backgroundColor: 'primary.main',
											p: '2px',
										}}
									>
										<Typography color="white">
											수정
										</Typography>
									</Box> */}
								</Grid>
							))}
						</Grid>
						{/* 세목 */}
						{/* <Grid
							container
							flexDirection={'column'}
							sm={4}
							xs={12}
							display={{ xs: 'none', sm: 'flex' }}
						>
							<Grid
								item
								bgcolor={'primary.main'}
								py={2}
								px={1}
								alignItems={'center'}
							>
								<Typography
									fontWeight={'600'}
									textAlign={'center'}
									color={'white'}
								>
									비율
								</Typography>
							</Grid>
							{subSidyByItems.map((item, index) => (
								<Grid
									item
									display={'flex'}
									justifyContent={'center'}
									alignItems={'center'}
									px={1}
									borderBottom={'0.5px solid #ccc'}
									borderRight={'0.5px solid #ccc'}
									key={index}
									// py={item.occupyDouble ? 4.95 : 2}
									py={
										isEditMode &&
										targetItem.id ===
											item.SUBSIDY_BY_ITEM_IDENTIFICATION_CODE
											? 4.65
											: 5.306
									}
								>
									{isEditMode &&
									targetItem.id ===
										item.SUBSIDY_BY_ITEM_IDENTIFICATION_CODE ? (
										<Box display="flex" gap={1}>
											<SupportiInput
												type="text"
												value={targetItem.rate}
												setValue={(value) => {
													setTargetItem({
														...targetItem,
														rate: value,
													});
												}}
												style={{
													height: '25px',
													width: '80px',
												}}
											/>
											<Typography my="auto">%</Typography>
											<Box
												sx={{
													width: '30px',
													height: '20px',
													borderRadius: '3px',
													backgroundColor:
														'secondary.dark',
													p: '3px',
													my: 'auto',
													cursor: 'pointer',
												}}
												onClick={() => {
													setIsEditMode(false);
													// 업데이트 치기
													cashUpdateController.updateCash(
														{
															SUBSIDY_BY_ITEM_IDENTIFICATION_CODE:
																targetItem.id,
														},
														{
															SUPPORT_BUSINESS_MANAGEMENT_IDENTIFICATION_CODE:
																props
																	.supportBusinessManagement
																	.SUPPORT_BUSINESS_MANAGEMENT_IDENTIFICATION_CODE,
															RATE: targetItem.rate,
															SUPPORT_COST:
																targetItem.cost,
														},

														(res) => {
															props.getSupportBusiness();
															console.log(res);
														},
														(err) => {
															console.log(err);
														}
													);
												}}
											>
												<Typography color="white">
													완료
												</Typography>
											</Box>
										</Box>
									) : (
										<Typography
											color={'primary.main'}
											fontWeight={'600'}
										>
											{item.RATE}%
										</Typography>
									)}
								</Grid>
							))}
						</Grid> */}

						{/* <Grid
							container
							flexDirection={'column'}
							sm={4}
							xs={12}
							display={{ xs: 'none', sm: 'flex' }}
						>
							<Grid
								item
								bgcolor={'primary.main'}
								py={2}
								px={1}
								alignItems={'center'}
							>
								<Typography
									fontWeight={'600'}
									textAlign={'center'}
									color={'white'}
								>
									항목별 금액
								</Typography>
							</Grid>
							{subSidyByItems.map((item, index) => (
								<Grid
									item
									display={'flex'}
									justifyContent={'center'}
									alignItems={'center'}
									px={1}
									borderBottom={'0.5px solid #ccc'}
									borderRight={'0.5px solid #ccc'}
									key={index}
									// py={item.occupyDouble ? 4.95 : 2}
									py={
										isEditMode &&
										targetItem.id ===
											item.SUBSIDY_BY_ITEM_IDENTIFICATION_CODE
											? 4.65
											: 5.306
									}
								>
									{isEditMode &&
									targetItem.id ===
										item.SUBSIDY_BY_ITEM_IDENTIFICATION_CODE ? (
										<Box display="flex" gap={1}>
											<SupportiInput
												type="text"
												value={targetItem.rate}
												setValue={(value) => {
													setTargetItem({
														...targetItem,
														rate: value,
													});
												}}
												style={{
													height: '25px',
													width: '80px',
												}}
											/>
											<Typography my="auto">%</Typography>
											<Box
												sx={{
													width: '30px',
													height: '20px',
													borderRadius: '3px',
													backgroundColor:
														'secondary.dark',
													p: '3px',
													my: 'auto',
													cursor: 'pointer',
												}}
												onClick={() => {
													setIsEditMode(false);
													// 업데이트 치기
													cashUpdateController.updateCash(
														{
															SUBSIDY_BY_ITEM_IDENTIFICATION_CODE:
																targetItem.id,
														},
														{
															SUPPORT_BUSINESS_MANAGEMENT_IDENTIFICATION_CODE:
																props
																	.supportBusinessManagement
																	.SUPPORT_BUSINESS_MANAGEMENT_IDENTIFICATION_CODE,
															RATE: targetItem.rate,
															SUPPORT_COST:
																targetItem.cost,
														},

														(res) => {
															props.getSupportBusiness();
															console.log(res);
														},
														(err) => {
															console.log(err);
														}
													);
												}}
											>
												<Typography color="white">
													완료
												</Typography>
											</Box>
										</Box>
									) : (
										<Typography
											color={'primary.main'}
											fontWeight={'600'}
										>
											{addCommaToNumber(item.RATE)}
										</Typography>
									)}
								</Grid>
							))}
						</Grid> */}

						{props.supportBusinessManagement.PHASE === 'PHASE1' && (
							<Grid
								container
								flexDirection={'column'}
								sm={4}
								xs={12}
								bgcolor={'white'}
							>
								<Grid
									item
									bgcolor={'primary.main'}
									py={2}
									px={1}
									alignItems={'center'}
									sx={{
										borderTopLeftRadius: { xs: 10, sm: 0 },
									}}
								>
									<Typography
										fontWeight={'600'}
										textAlign={'center'}
										color={'white'}
									>
										지원금
									</Typography>
								</Grid>
								{temp.map((item, index) => {
									return (
										item.group === '지원금' && (
											<Grid
												item
												display={'flex'}
												justifyContent={'center'}
												alignItems={'center'}
												px={1}
												borderBottom={
													'0.5px solid #ccc'
												}
												borderRight={'0.5px solid #ccc'}
												py={5.306}
											>
												<Typography fontWeight={'400'}>
													{addCommaToNumber(
														item.data
													)}
												</Typography>
											</Grid>
										)
									);
								})}
							</Grid>
						)}

						{props.supportBusinessManagement.PHASE === 'PHASE1' && (
							<Grid
								container
								flexDirection={'column'}
								sm={4}
								xs={12}
								bgcolor={'white'}
							>
								<Grid
									item
									bgcolor={'primary.main'}
									py={2}
									px={1}
									alignItems={'center'}
									sx={{
										borderTopLeftRadius: { xs: 10, sm: 0 },
									}}
								>
									<Typography
										fontWeight={'600'}
										textAlign={'center'}
										color={'white'}
									>
										기업부담 현금
									</Typography>
								</Grid>
								{temp
									.filter(
										(item) => item.group === '기업부담금'
									)
									.map((item, index) => (
										<Grid
											item
											display={'flex'}
											justifyContent={'center'}
											alignItems={'center'}
											px={1}
											borderBottom={'0.5px solid #ccc'}
											borderRight={'0.5px solid #ccc'}
											key={index}
											py={5.306}
										>
											<Typography fontWeight={'400'}>
												{addCommaToNumber(
													Math.round(
														(item.data *
															props
																.supportBusinessManagement
																.CASH_RATE) /
															100
													)
												)}
											</Typography>
										</Grid>
									))}
							</Grid>
						)}

						{props.supportBusinessManagement.PHASE === 'PHASE1' && (
							<Grid
								container
								flexDirection={'column'}
								sm={4}
								xs={12}
								bgcolor={'white'}
							>
								<Grid
									item
									bgcolor={'primary.main'}
									py={2}
									px={1}
									alignItems={'center'}
									sx={{
										borderTopLeftRadius: { xs: 10, sm: 0 },
									}}
								>
									<Typography
										fontWeight={'600'}
										textAlign={'center'}
										color={'white'}
									>
										기업부담 현물
									</Typography>
								</Grid>
								{temp
									.filter(
										(item) => item.group === '기업부담금'
									)
									.map((item, index) => (
										<Grid
											item
											display={'flex'}
											justifyContent={'center'}
											alignItems={'center'}
											px={1}
											borderBottom={'0.5px solid #ccc'}
											borderRight={'0.5px solid #ccc'}
											key={index}
											py={5.306}
										>
											<Typography fontWeight={'400'}>
												{addCommaToNumber(
													Math.round(
														(item.data *
															props
																.supportBusinessManagement
																.VIRTUAL_CASH_RATE) /
															100
													)
												)}
											</Typography>
										</Grid>
									))}
							</Grid>
						)}
						{/* 세세목 */}
						{props.supportBusinessManagement.PHASE === 'PHASE2' && (
							<Grid
								container
								flexDirection={'column'}
								sm={4}
								xs={12}
								bgcolor={'white'}
							>
								<Grid
									item
									bgcolor={'primary.main'}
									py={2}
									px={1}
									alignItems={'center'}
									sx={{
										borderTopLeftRadius: { xs: 10, sm: 0 },
									}}
								>
									<Typography
										fontWeight={'600'}
										textAlign={'center'}
										color={'white'}
									>
										세목
									</Typography>
								</Grid>
								{subsidyConfig.map((item, index) => (
									<Grid
										item
										display={'flex'}
										justifyContent={'center'}
										alignItems={'center'}
										px={1}
										borderBottom={'0.5px solid #ccc'}
										borderRight={'0.5px solid #ccc'}
										key={index}
										py={2.192}
									>
										<Typography fontWeight={'500'}>
											{item.group}
										</Typography>
									</Grid>
								))}
							</Grid>
						)}

						{props.supportBusinessManagement.PHASE === 'PHASE2' && (
							<Grid
								container
								flexDirection={'column'}
								sm={4}
								xs={12}
								bgcolor={'white'}
							>
								<Grid
									item
									bgcolor={'primary.main'}
									py={2}
									px={1}
									alignItems={'center'}
									sx={{
										borderTopLeftRadius: { xs: 10, sm: 0 },
									}}
								>
									<Typography
										fontWeight={'600'}
										textAlign={'center'}
										color={'white'}
									>
										각 {props.subsidyTab}
									</Typography>
								</Grid>
								{temp.map((item, index) => {
									return (
										<Grid
											item
											display={'flex'}
											justifyContent={'center'}
											alignItems={'center'}
											px={1}
											borderBottom={'0.5px solid #ccc'}
											borderRight={'0.5px solid #ccc'}
											py={2.192}
										>
											<Typography fontWeight={'400'}>
												{addCommaToNumber(item.data)}
											</Typography>
										</Grid>
									);
								})}
							</Grid>
						)}
					</Grid>
					{/* 금액 */}
					<Grid
						container
						flexDirection={'column'}
						xs={6}
						sm={3}
						bgcolor={'white'}
					>
						{props.useCalculation ? (
							<Grid
								item
								sx={{
									borderTopRightRadius: 10,
								}}
								bgcolor={'primary.main'}
								py={1.4}
								px={1}
								display={'flex'}
								alignItems={'center'}
								justifyContent={'space-between'}
							>
								<ArrowCircleLeftIcon
									sx={{ color: 'white' }}
									onClick={() => {
										props.handleSubsidyTabChange('prev');
									}}
								/>
								<Typography
									fontWeight={'600'}
									color={'white'}
									textAlign={'center'}
								>
									{props.subsidyTab}
								</Typography>
								<ArrowCircleRightIcon
									sx={{ color: 'white' }}
									onClick={() => {
										props.handleSubsidyTabChange('next');
									}}
								/>
							</Grid>
						) : (
							<Grid
								item
								sx={{
									borderTopRightRadius: 10,
								}}
								bgcolor={'primary.main'}
								py={1.4}
								px={1}
								display={'flex'}
								alignItems={'center'}
								justifyContent={'space-between'}
							>
								<Typography
									fontWeight={'600'}
									color={'white'}
									textAlign={'center'}
									py={0.6}
									mx={'auto'}
								>
									{props.subsidyTab}
								</Typography>
							</Grid>
						)}
						{subSidyByItems?.map((item, index) => (
							<Grid
								item
								display={'flex'}
								justifyContent={'center'}
								alignItems={'center'}
								px={1}
								borderBottom={'0.5px solid #ccc'}
								borderRight={'0.5px solid #ccc'}
								key={index}
								py={
									isEditMode &&
									props.subsidyTab === '사용금액' &&
									targetItem.id === item.id
										? 1.52
										: 2.192
								}
							>
								<Typography py={3.118}>
									{addCommaToNumber(
										Number(
											JSON.parse(item.SUPPORT_COST)[0]?.[
												'지원금'
											]?.[props.subsidyTab]
										) +
											Number(
												JSON.parse(
													item.SUPPORT_COST
												)[0]?.['기업부담금']?.[
													props.subsidyTab
												]
											)
									)}
								</Typography>
							</Grid>
						))}
					</Grid>
				</Grid>
				{/* 총액 */}
				<Grid
					container
					display={'flex'}
					justifyContent={'center'}
					borderTop={'1px solid #ccc'}
				>
					<Grid
						item
						xs={6}
						sm={9}
						bgcolor={'primary.dark'}
						py={2}
						sx={{
							borderBottomLeftRadius: 10,
						}}
					>
						<Typography
							color={'white'}
							fontWeight={'600'}
							textAlign={'center'}
						>
							총액
						</Typography>
					</Grid>
					<Grid
						item
						sm={3}
						xs={6}
						display={'flex'}
						justifyContent={'center'}
						alignItems={'center'}
						py={2.012}
						bgcolor={'#C4CDED'}
						borderBottom={'0.5px solid #ccc'}
						borderRight={'0.5px solid #ccc'}
						sx={{
							borderBottomRightRadius: 10,
						}}
					>
						<Typography>
							{addCommaToNumber(
								temp.reduce((accumulator, currentValue) => {
									return (
										accumulator + Number(currentValue.data)
									);
								}, 0)
							)}
						</Typography>
					</Grid>
				</Grid>
				<UpdateCashModal
					open={
						(props.subsidyTab === '총 금액' ||
							props.subsidyTab === '사용금액') &&
						isEditMode
					}
					handleClose={() => {
						setIsEditMode(false);
					}}
					updateHandler={updateSubsidyByItem}
					targetItem={targetItem}
					setTargetItem={setTargetItem}
					subsidyTab={props.subsidyTab}
					phase={props.supportBusinessManagement.PHASE}
					totalOperatingCost={props.totalOperatingCost}
				/>
			</Box>
		)
	);
};

export default SubsidyByItemTable;
