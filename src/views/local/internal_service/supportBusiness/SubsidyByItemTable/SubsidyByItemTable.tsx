import React, { useEffect } from 'react';

import { Box, BoxProps, Grid, Typography } from '@mui/material';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import SupportiButton from '../../../../global/SupportiButton';
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import SupportiInput from '../../../../global/SupportiInput';
import DefaultController from '@leanoncompany/supporti-ark-office-project/src/controller/default/DefaultController';

interface ISubsidyByItemTableProps {
	supportBusinessManagement: any;
	handleSubsidyTabChange: (type: string) => void;
	subsidyTab: string;
}

const SubsidyByItemTable = (props: ISubsidyByItemTableProps) => {
	//* Controller
	const subsidyByItemController = new DefaultController('SubsidyByItem');
	//* State
	/**
	 * 항목별 지원금
	 */
	const [subSidyByItems, setSubSidyByItems] = React.useState<any[]>([]);
	/**
	 * 수정모드
	 */
	const [isEditMode, setIsEditMode] = React.useState<boolean>(false);

	//* Constants
	const subsidyConfig = [
		{
			label: '재료비',
			key: '재료비',
		},
		{
			label: '외주용역비',
			key: '외주용역비',
		},
		{
			label: '기계장치비',
			key: '기계장치비',
		},
		{
			label: '무형자산취득비',
			key: '무형자산취득비',
		},
		{
			label: '보수',
			key: '인건비-보수',
		},
		{
			label: '일용임금',
			key: '인건비-일용임금',
		},
		{
			label: '일반수용비',
			key: '지급수수료-일반수용비',
		},
		{
			label: '임차료',
			key: '지급수수료-임차료',
		},
		{
			label: '국내여비',
			key: '여비-국내여비',
		},
		{
			label: '국외여비',
			key: '여비-국외여비',
		},
		{
			label: '교육훈련비',
			key: '교육훈련비',
		},
		{
			label: '일반수용비',
			key: '광고선전비-일반수용비',
		},
		{
			label: '일반용역비',
			key: '광고선전비-일반용역비',
		},
	];

	const subsidyMenu = [
		{
			label: '재료비',
		},
		{
			label: '외주용역비',
		},
		{
			label: '기계장치(공구,기구,비품,SW 등)',
		},
		{
			label: '특허권 등 무형자산 취득비',
		},
		{
			label: '인건비',
			occupyDouble: true,
		},
		{
			label: '지급수수료',
			occupyDouble: true,
		},
		{
			label: '여비',
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
	const tabConfig = [
		{
			label: '총액(원)',
			key: 'TOTAL_AMOUNT',
		},
		{
			label: '사용액',
			key: 'USED_AMOUNT',
		},
		{
			label: '잔여액',
			key: 'REMAIN_AMOUNT',
		},
	];
	console.log(subSidyByItems);
	//* Functions
	/**
	 * 항목별 지원금 수정하기
	 */
	const updateSubsidyByItem = async () => {
		try {
			const updatedDataPromises = subSidyByItems.map(
				(subSidyByItem) =>
					new Promise((resolve, reject) => {
						subsidyByItemController.updateItem(
							{ ...subSidyByItem },
							(res) => {
								resolve(res.data.result);
							},
							(err) => {
								reject(new Error('업데이트에 실패했습니다.'));
							}
						);
					})
			);

			const updatedData = await Promise.all(updatedDataPromises);

			console.log(updatedData);

			// 모든 요소를 처리한 후에 상태 업데이트
			setSubSidyByItems(updatedData);
			setIsEditMode(false);
		} catch (error) {
			// 에러 처리
			alert(error.message);
		}
	};

	//* Hooks
	useEffect(() => {
		setSubSidyByItems(props.supportBusinessManagement.SubsidyByItems);
	}, [props.supportBusinessManagement]);
	return (
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
				<Typography fontWeight={'600'}>✔ 항목별 지원금</Typography>
				<SupportiButton
					variant="outlined"
					contents={
						<Box display={'flex'} alignItems={'center'} gap={1}>
							<CreateOutlinedIcon fontSize="small" />
							<Typography fontWeight={'bold'} color={'primary'}>
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
				/>
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
								비목
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
								py={item.occupyDouble ? 4.95 : 2}
							>
								<Typography
									color={'primary.main'}
									fontWeight={'600'}
								>
									{item.label}
								</Typography>
							</Grid>
						))}
					</Grid>
					{/* 세목 */}
					<Grid
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
								세목
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
								key={index}
								py={item.occupyDouble ? 4.95 : 2}
							>
								<Typography
									color={'primary.main'}
									fontWeight={'600'}
								>
									{item.label}
								</Typography>
							</Grid>
						))}
					</Grid>
					{/* 세세목 */}
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
								세세목
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
								py={2}
							>
								<Typography fontWeight={'500'}>
									{item.label}
								</Typography>
							</Grid>
						))}
					</Grid>
				</Grid>
				{/* 금액 */}
				<Grid
					container
					flexDirection={'column'}
					xs={6}
					sm={3}
					bgcolor={'white'}
				>
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
					{subSidyByItems.map((item, index) => (
						<Grid
							item
							display={'flex'}
							justifyContent={'center'}
							alignItems={'center'}
							px={isEditMode ? 0 : 1}
							borderBottom={'0.5px solid #ccc'}
							borderRight={'0.5px solid #ccc'}
							key={index}
							py={
								isEditMode && props.subsidyTab !== '잔여액'
									? 0.036
									: 2
							}
						>
							{isEditMode && props.subsidyTab !== '잔여액' ? (
								<SupportiInput
									type="number"
									value={
										item[
											tabConfig[
												tabConfig.findIndex(
													(tab) =>
														tab.label ===
														props.subsidyTab
												)
											].key
										]
									}
									setValue={(e) => {
										const newSubSidyByItems = [
											...subSidyByItems,
										]; // 새로운 배열 생성
										newSubSidyByItems[index][
											tabConfig.find(
												(tab) =>
													tab.label ===
													props.subsidyTab
											).key
										] = Number(e);
										setSubSidyByItems(newSubSidyByItems); // 새로운 배열로 상태 업데이트
									}}
									style={{
										width: '100%',
									}}
									additionalProps={{
										type: 'number',
									}}
									outLineInputProps={{
										type: 'number',
										inputProps: {
											typeof: 'number',
										},
									}}
								/>
							) : (
								<Typography>
									{Number(
										item[
											tabConfig[
												tabConfig.findIndex(
													(tab) =>
														tab.label ===
														props.subsidyTab
												)
											].key
										]
									)?.toLocaleString()}
								</Typography>
							)}
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
					py={2}
					bgcolor={'#C4CDED'}
					borderBottom={'0.5px solid #ccc'}
					borderRight={'0.5px solid #ccc'}
					sx={{
						borderBottomRightRadius: 10,
					}}
				>
					<Typography>
						{props.subsidyTab === '총액(원)' &&
							subSidyByItems
								.reduce(
									(acc, cur) =>
										acc + Number(cur.TOTAL_AMOUNT),
									0
								)
								.toLocaleString()}
						{props.subsidyTab === '사용액' &&
							subSidyByItems
								.reduce(
									(acc, cur) => acc + Number(cur.USED_AMOUNT),
									0
								)
								.toLocaleString()}
						{props.subsidyTab === '잔여액' &&
							subSidyByItems
								.reduce(
									(acc, cur) =>
										acc + Number(cur.REMAIN_AMOUNT),
									0
								)
								.toLocaleString()}
					</Typography>
				</Grid>
			</Grid>
		</Box>
	);
};

export default SubsidyByItemTable;
