import React from 'react';
import { Box, BoxProps, Rating, Typography } from '@mui/material';

import SupportiButton from '../../../../../global/SupportiButton';
import { RatingConfig } from '../../../../../../../configs/data/RatingConfig';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import { IKpi } from '../../../../../../@types/model';
import DefaultController from '@qillie-corp/ark-office-project/src/controller/default/DefaultController';
import SupportiInput from '../../../../../global/SupportiInput';
import KpiModal from '../KpiModal/KpiModal';
import { useAppMember } from '../../../../../../hooks/useAppMember';
import dayjs from 'dayjs';

interface IKpiCardProps {
	data: IKpi;
}

const KpiCard = (props: IKpiCardProps) => {
	//* Controllers
	/**
	 * KPI 컨트롤러
	 */
	const kpiController = new DefaultController('Kpi');

	//* Modules

	//* States

	// 메모
	const [note, setNote] = React.useState<string>('');

	// 수정모달 오픈 여부
	const [isModifyModalOpen, setIsModifyModalOpen] = React.useState(false);

	/**
	 *s
	 * 더보기 아이콘 클릭 여부
	 */
	const [isMore, setIsMore] = React.useState(false);
	//* Hooks
	/**
	 * 유저 아이디 가져오는 훅
	 */
	const { memberId } = useAppMember();
	//* Functions

	//* kpi 삭제하는 함수
	const deleteKpi = () => {
		kpiController.deleteItem(
			{
				APP_MEMBER_IDENTIFICATION_CODE: memberId,
				KPI_IDENTIFICATION_CODE: props.data['KPI_IDENTIFICATION_CODE'],
			},
			(response: any) => {
				alert('삭제 성공');
				// Toast.fire({
				//   icon: 'success',
				//   title: '성공적으로 삭제 되었습니다.',
				// });
			},
			(err: any) => {
				// console.log(err);
				// Toast.fire({
				//   icon: 'error',
				//   title: '삭제에 실패했습니다. 문의 부탁드립니다.',
				// });
			}
		);
	};

	// kpi 업데이트 함수
	const updateKpi = (injectedObj) => {
		kpiController.updateItem(
			Object.assign(
				{
					APP_MEMBER_IDENTIFICATION_CODE: memberId,
					KPI_IDENTIFICATION_CODE:
						props.data['KPI_IDENTIFICATION_CODE'],
				},
				injectedObj
			),
			(response: any) => {
				alert('수정 성공');
				setIsModifyModalOpen(false);
				// Toast.fire({
				//   icon: 'success',
				//   title: '성공적으로 수정 되었습니다.',
				// });
			},
			(err: any) => {
				// console.log(err);
				// Toast.fire({
				//   icon: 'error',
				//   title: '수정에 실패했습니다. 문의 부탁드립니다.',
				// });
			}
		);
	};

	//* 마감일 계산하는 함수
	const calcDeadline = (day) => {
		const Today = dayjs();

		const diff = Today.diff(day, 'day', true);
		const days = Math.floor(diff);

		return days > 0
			? '마감일 지남'
			: days === 0
			? '마감일'
			: days > -7
			? '마감일 임박'
			: '';
	};

	//* Constants
	// kpi 변경하는 핸들러 버튼들
	const controllButtons = [
		{
			label: '달성',
			color: 'primary.main',
			onclick: () => updateKpi({ STATUS: 'SUCCESS' }),
		},
		{
			label: '실패',
			color: 'error.main',
			onclick: () => updateKpi({ STATUS: 'FAILURE' }),
		},
		{
			label: '삭제',
			color: 'secondary.dark',
			onclick: () => deleteKpi(),
		},
		{
			label: '수정',
			color: 'primary.light',
			onclick: () => setIsModifyModalOpen(true),
		},
	];

	console.log(props.data);
	return (
		<Box
			borderRadius={2}
			bgcolor={'white'}
			p={2}
			mb={2}
			boxShadow={'0 3px 15px 0 #e1eaff'}
		>
			<Box
				display="flex"
				justifyContent={'space-between'}
				flexWrap="wrap"
			>
				<Box display="flex" gap={1}>
					<Box display="flex" flexDirection="column" gap={1}>
						<Typography variant="h5" fontWeight={'bold'}>
							{props.data.TITLE}
						</Typography>
						{/** 기간 */}
						<Box display={'flex'}>
							<Typography
								fontWeight={500}
								color={'secondary.main'}
							>
								{
									(props.data?.START_DATE as string).split(
										'T'
									)[0]
								}
							</Typography>
							<Typography
								ml={0.5}
								mr={0.5}
								fontWeight={500}
								color={'secondary.main'}
							>
								~
							</Typography>
							<Typography
								fontWeight={500}
								color={'secondary.main'}
							>
								{(props.data?.END_DATE as string).split('T')[0]}
							</Typography>
						</Box>
					</Box>

					{/** 목표량 */}
					<Box display={'flex'} ml={2}>
						<Typography mt="auto" mb="auto" fontWeight={500} mr={1}>
							목표량
						</Typography>
						<Typography mt="auto" mb="auto" fontWeight={500}>
							{props.data.TARGET_AMOUNT}
						</Typography>
						<Typography mt="auto" mb="auto" fontWeight={500}>
							{props.data.TARGET_UNIT}
						</Typography>
					</Box>

					{/** 중요도 */}

					<Box display="flex" gap={1} mt="auto" mb="auto">
						<Rating
							name="simple-controlled"
							value={props.data.RATE}
							size="large"
						/>
						<Typography
							color="primary.main"
							fontWeight={500}
							mt="auto"
							mb="auto"
						>
							{RatingConfig[props.data.RATE]}
						</Typography>
					</Box>
				</Box>

				{/** 마감 상태 (마감일 임박, 마감일 지남, 마감일) */}
				<Typography ml={1} mt={'auto'} mb={'auto'} fontWeight={500}>
					{calcDeadline(
						(props.data?.END_DATE as string).split('T')[0]
					)}
				</Typography>

				<Box display="flex" gap={1}>
					{/** 담당자 */}
					<Typography mt="auto" mb="auto" fontWeight={500}>
						담당자
					</Typography>
					<Typography mt="auto" mb="auto" fontWeight={500}>
						{props.data.ASSIGNEE}
					</Typography>

					{/** 버튼들 */}
					{props.data.STATUS === 'PROCEEDING' && (
						<Box display="flex" mt="auto" mb="auto" gap={0.5}>
							{controllButtons.map((button) => (
								<SupportiButton
									contents={button.label}
									variant="contained"
									style={{
										bgcolor: button.color,
										height: '20px',
									}}
									onClick={button.onclick}
								/>
							))}
						</Box>
					)}
					{props.data.STATUS !== 'PROCEEDING' && (
						<Box display="flex" mt="auto" mb="auto" gap={0.5}>
							<SupportiButton
								contents={
									props.data.STATUS == 'SUCCESS'
										? controllButtons[0].label
										: controllButtons[1].label
								}
								variant="contained"
								style={{
									bgcolor:
										props.data.STATUS == 'SUCCESS'
											? controllButtons[0].color
											: controllButtons[1].color,
									height: '20px',
								}}
								onClick={() => {}}
							/>
							<SupportiButton
								contents={controllButtons[2].label}
								variant="contained"
								style={{
									bgcolor: controllButtons[2].color,
									height: '20px',
								}}
								onClick={controllButtons[2].onclick}
							/>
						</Box>
					)}

					{/** 아이콘, 누르면 메모 나옴 */}
					<Box
						onClick={() => setIsMore(!isMore)}
						style={{
							cursor: 'pointer',
							marginTop: 'auto',
							marginBottom: 'auto',
						}}
					>
						{isMore && <ArrowDropUpIcon />}
						{!isMore && <ArrowDropDownIcon />}
					</Box>
				</Box>
			</Box>
			{isMore && (
				<Box mt={2} mb={2}>
					{/** 메모 입력 */}
					<SupportiInput
						type="inputwithbtn"
						value={props.data.NOTE !== '' ? props.data.NOTE : note}
						setValue={(value) => {
							setNote(value);
						}}
						btnContent="등록하기"
						btnOnclick={() => {
							updateKpi({ NOTE: note });
						}}
						width={'100%'}
						placeholder="메모 입력"
						multiline={true}
						readOnly={note.length > 500 ? true : false}
					/>
				</Box>
			)}
			<KpiModal
				modalOpen={isModifyModalOpen}
				setModalOpen={setIsModifyModalOpen}
				data={props.data}
				mode={'modify'}
				updateKpi={updateKpi}
			/>
		</Box>
	);
};

export default KpiCard;
