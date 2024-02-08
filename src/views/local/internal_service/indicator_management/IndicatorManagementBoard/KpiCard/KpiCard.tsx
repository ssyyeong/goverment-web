import React from 'react';
import { Box, BoxProps, Rating, Typography } from '@mui/material';

import SupportiButton from '../../../../../global/SupportiButton';
import { RatingConfig } from '../../../../../../../configs/data/RatingConfig';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import { IKpi } from '../../../../../../@types/model';
import DefaultController from '@leanoncompany/supporti-ark-office-project/src/controller/default/DefaultController';
import SupportiInput from '../../../../../global/SupportiInput';
import { SupportiAlertModal } from '../../../../../global/SupportiAlertModal';
import KpiCreateModal from '../KpiCreateModal/KpiCreateModal';
import { useAppMember } from '../../../../../../hooks/useAppMember';
import moment from 'moment';
import { v4 as uuidv4 } from 'uuid';

interface IKpiCardProps {
	data: IKpi;
	setTriggerKey: React.Dispatch<React.SetStateAction<string>>;
}

const KpiCard = (props: IKpiCardProps) => {
	//* Controllers
	/**
	 * KPI 컨트롤러
	 */
	const kpiController = new DefaultController('Kpi');

	//* Modules

	//* States
	const [kpiData, setKpiData] = React.useState<IKpi>(props.data);

	// 메모
	const [note, setNote] = React.useState<string>('');

	// 수정모달 오픈 여부
	const [isModifyModalOpen, setIsModifyModalOpen] = React.useState(false);

	/**
	 *
	 * 더보기 아이콘 클릭 여부
	 */
	const [isMore, setIsMore] = React.useState(false);

	/**
	 * 삭제 여부 확인하는 모달
	 */
	const [isDeleteAlertOpen, setIsDeleteAlertOpen] = React.useState(false);

	//* Hooks
	/**
	 * 유저 아이디 가져오는 훅
	 */
	const { memberId } = useAppMember();

	//* Functions
	/**
	 *
	 * kpi 삭제하는 함수
	 */
	const deleteKpi = () => {
		kpiController.deleteItem(
			{
				APP_MEMBER_IDENTIFICATION_CODE: memberId,
				KPI_IDENTIFICATION_CODE: props.data['KPI_IDENTIFICATION_CODE'],
			},
			(response: any) => {
				alert('삭제 성공');
				props.setTriggerKey && props.setTriggerKey(uuidv4());
			},
			(err: any) => {}
		);
	};

	// kpi 업데이트 함수
	const updateKpi = (injectedObj) => {
		if (
			(injectedObj.TITLE != undefined && injectedObj.TITLE === '') ||
			(injectedObj.CATEGORY != undefined &&
				injectedObj.CATEGORY == undefined) ||
			(injectedObj.ASSIGNEE != undefined &&
				injectedObj.ASSIGNEE === '') ||
			(injectedObj.TARGET_UNIT != undefined &&
				injectedObj.TARGET_UNIT == undefined) ||
			(injectedObj.TARGET_AMOUNT != undefined &&
				injectedObj.TARGET_AMOUNT == 0)
		) {
			alert('필수 입력값을 입력해주세요.');
		} else {
			/** 타이틀이 20자 이상일 경우 처리 */
			if (
				injectedObj.TITLE != undefined &&
				injectedObj.TITLE.length > 20
			) {
				alert('타이틀은 20자내로 입력해주세요.');
			} else {
				if (injectedObj.NOTE.length > 500) {
					alert('메모는 500자내로 입력해주세요.');
				} else {
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
							props.setTriggerKey &&
								props.setTriggerKey(uuidv4());

							setIsModifyModalOpen(false);
						},
						(err: any) => {}
					);
				}
			}
		}
	};

	/**
	 *
	 * 마감일 계산하는 함수
	 */
	const calcDeadline = (day) => {
		const Today = moment();

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
			onclick: () => setIsDeleteAlertOpen(true),
		},
		{
			label: '수정',
			color: 'secondary.light',
			onclick: () => setIsModifyModalOpen(true),
		},
	];

	React.useEffect(() => {
		setKpiData(props.data);
	}, [props.data]);

	return (
		<Box
			borderRadius={2}
			bgcolor={'white'}
			p={2}
			mb={2}
			boxShadow={'0 3px 15px 0 #e1eaff'}
		>
			<Box display="flex" justifyContent={'space-between'}>
				<Box display="flex" gap={2}>
					{/** KPI 목표 제목 */}
					<Typography variant="h5" fontWeight={'bold'}>
						{kpiData.TITLE}
					</Typography>
					{props.data.STATUS !== 'PROCEEDING' && (
						<Typography
							color={
								kpiData.STATUS == 'SUCCESS'
									? controllButtons[0].color
									: controllButtons[1].color
							}
							fontWeight={'bold'}
							mt={'auto'}
							mb={'auto'}
							variant="subtitle1"
						>
							{kpiData.STATUS == 'SUCCESS'
								? controllButtons[0].label
								: controllButtons[1].label}
						</Typography>
					)}
				</Box>

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
			<Box
				display="flex"
				justifyContent={'space-between'}
				flexWrap="wrap"
			>
				<Box display="flex" gap={1}>
					{/** 기간 */}
					<Box display={'flex'}>
						<Typography fontWeight={500} color={'secondary.main'}>
							{(kpiData?.START_DATE as string).split('T')[0]}
						</Typography>
						<Typography
							ml={0.5}
							mr={0.5}
							fontWeight={500}
							color={'secondary.main'}
						>
							~
						</Typography>
						<Typography fontWeight={500} color={'secondary.main'}>
							{(kpiData?.END_DATE as string).split('T')[0]}
						</Typography>
					</Box>

					{/** 마감 상태 (마감일 임박, 마감일 지남, 마감일) */}
					<Typography fontWeight={500} minHeight={'30px'}>
						{calcDeadline(
							(kpiData?.END_DATE as string).split('T')[0]
						)}
					</Typography>
				</Box>
			</Box>
			<Box display="flex" gap={1} minHeight={'30px'}>
				{/** 담당자 */}
				<Typography mt="auto" mb="auto" fontWeight={500}>
					담당자
				</Typography>
				<Typography mt="auto" mb="auto" fontWeight={500}>
					{kpiData.ASSIGNEE}
				</Typography>
			</Box>
			<Box
				display={'flex'}
				justifyContent={'space-between'}
				flexWrap="wrap"
			>
				<Box>
					{/** 목표량 */}
					<Box display={'flex'} minWidth={'75px'}>
						<Typography mt="auto" mb="auto" fontWeight={500} mr={1}>
							목표량
						</Typography>
						<Typography mt="auto" mb="auto" fontWeight={500}>
							{kpiData.TARGET_AMOUNT}
						</Typography>
						<Typography mt="auto" mb="auto" fontWeight={500}>
							{kpiData.TARGET_UNIT}
						</Typography>
					</Box>

					{/** 중요도 */}

					<Box display="flex" gap={1} mb="auto" mt={1}>
						<Rating
							name="simple-controlled"
							value={kpiData.RATE}
							size="large"
							readOnly
						/>
						<Typography
							color="primary.main"
							fontWeight={500}
							mt="auto"
							mb="auto"
						>
							{RatingConfig[kpiData.RATE]}
						</Typography>
					</Box>
				</Box>

				<Box display="flex" gap={1} mt={1}>
					{/** 버튼들 */}
					{kpiData.STATUS === 'PROCEEDING' && (
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
				</Box>
			</Box>
			{isMore && (
				<Box mt={2} mb={2}>
					{/** 메모 입력 */}
					<SupportiInput
						type="inputwithbtn"
						value={kpiData.NOTE !== '' ? kpiData.NOTE : note}
						setValue={(value) => {
							setNote(value);
						}}
						btnContent={
							kpiData.NOTE !== '' ? '수정하기' : '등록하기'
						}
						btnOnClick={() => {
							updateKpi({ NOTE: note });
						}}
						width={'100%'}
						additionalProps={{
							placeholder: '메모 입력',
							multiline: true,
							// readOnly: note.length > 500 ? true : false,
						}}
					/>
				</Box>
			)}
			<KpiCreateModal
				modalOpen={isModifyModalOpen}
				setModalOpen={setIsModifyModalOpen}
				data={kpiData}
				mode={'modify'}
				updateKpi={updateKpi}
			/>
			<SupportiAlertModal
				open={isDeleteAlertOpen}
				handleClose={() => setIsDeleteAlertOpen(false)}
				customHandleClose={() => {
					memberId && deleteKpi();

					setIsDeleteAlertOpen(false);
				}}
				type={'delete'}
			/>
		</Box>
	);
};

export default KpiCard;
