import React, { useEffect } from 'react';

import {
	Box,
	BoxProps,
	Grid,
	IconButton,
	Switch,
	Typography,
} from '@mui/material';
import SupportiModal from '../../../../global/SupportiModal';
import SupportiInput from '../../../../global/SupportiInput';
import SupportiButton from '../../../../global/SupportiButton';
import MultiFileUploader, {
	IFileType,
} from '@leanoncompany/supporti-ark-office-project/src/ui/local/input/MultiFileUploader/MultiFileUploader';
import DefaultController from '@leanoncompany/supporti-ark-office-project/src/controller/default/DefaultController';
import { useAppMember } from '../../../../../hooks/useAppMember';
import { v4 as uuidv4 } from 'uuid';
import TicketPayModal from '../../../external_service/ticketPayModal/TicketPayModal';
import { cashRange } from '../../../../../../configs/data/SupportBusinessConfig';

interface ISupportConsultingApplyModalProps {
	// id: number;
	open: boolean;
	handleClose: () => void;
}

const SupportConsultingApplyModal = (
	props: ISupportConsultingApplyModalProps
) => {
	/**
	 * 유저 아이디 가져오는 훅
	 */
	const { memberId } = useAppMember();

	//* Controller
	const userConsultingController = new DefaultController(
		'SupportBusinessConsulting'
	);

	const userTicketController = new DefaultController('UserTicket');

	const ticketController = new DefaultController('Ticket');

	const supportContentController = new DefaultController(
		'SupportBusinessManagementContent'
	); // 지원내용

	//* State
	const [fileList, setFileList] = React.useState<any>([]);

	/**
	 * 컨설팅 신청 데이터
	 */
	const [consultingApplication, setConsultingApplication] = React.useState({
		SUPPORT_BUSINESS_TITLE: '',
		SUPPORT_BUSINESS_DESCRIPTION: [],
		SUPPORT_SCALE: '',
		IMPLEMENTING_AGENCY: '',
		PROGRESS_STAGE: '1',
		MEMO: undefined,
	});

	/**
	 * 유저가 보유한 티켓 리스트
	 *
	 */
	const [userTickets, setUserTickets] = React.useState(undefined);

	/**
	 * 티켓 구매 모달 오픈 여부
	 */
	const [buyTicketModalOpen, setBuyTicketModalOpen] = React.useState(false);

	/**
	 * 신청에 사용할 수 있는 티켓
	 */
	const [usableTicket, setUsableTicket] = React.useState(undefined);

	/**
	 * 지원내용 데이터
	 */
	const [supportContentData, setSupportContentData] =
		React.useState(undefined);

	//* Function
	const createConsulting = () => {
		userConsultingController.createItem(
			{
				APP_MEMBER_IDENTIFICATION_CODE: memberId,
				...consultingApplication,
				SUPPORT_BUSINESS_DESCRIPTION: JSON.stringify(
					consultingApplication.SUPPORT_BUSINESS_DESCRIPTION
				),
				FILE: JSON.stringify(fileList),
			},
			(res) => {
				alert('신청 완료');
				props.handleClose();
			},
			(err) => {
				console.log(err);
			}
		);
	};

	//* Hooks
	useEffect(() => {
		userTicketController.findAllItems(
			{
				APP_MEMBER_IDENTIFICATION_CODE: memberId,
				USED_YN: 'N',
			},
			(res) => {
				setUserTickets(res.data.result.rows);
			},
			(err) => {
				console.log(err);
			}
		);

		ticketController.getOneItemByKey(
			{
				CATEGORY: '지원사업컨설팅',
			},
			(res) => {
				if (res.data.result !== null) {
					setUsableTicket(res.data.result);
				}
			},
			(err) => {
				alert('정보를 가져오는데 실패했습니다.');
			}
		);

		supportContentController.findAllItems(
			{ USED_YN: 'Y' },
			(res) => {
				console.log(res.data.result.rows);
				setSupportContentData(res.data.result.rows);
			},
			(err) => {
				console.log(err);
			}
		);

		if (!props.open) {
			setFileList([]);

			setConsultingApplication({
				SUPPORT_BUSINESS_TITLE: undefined,
				SUPPORT_BUSINESS_DESCRIPTION: [],
				SUPPORT_SCALE: undefined,
				IMPLEMENTING_AGENCY: undefined,
				PROGRESS_STAGE: '1',
				MEMO: undefined,
			});
		}
	}, [props.open]);

	//* Constants

	const consultingApplyData = [
		{
			label: '파일',
			value: consultingApplication.MEMO,
			type: 'file',
			// type: 'fileinput',
			// additionalProps: {
			// 	placeholder: '파일을 선택해주세요',
			// },
			// essential: true,
			// setValue: (value: any) => {
			// 	console.log(value);
			// 	setConsultingApplication({
			// 		...consultingApplication,
			// 		FILE: value,
			// 	});
			// },
			grid: {
				xs: 12,
				sm: 12,
			},
		},
		{
			label: '지원사업명',
			value: consultingApplication.SUPPORT_BUSINESS_TITLE,
			additionalProps: {
				placeholder: '지원사업명을 입력해주세요',
			},
			essential: true,
			setValue: (value: string) =>
				setConsultingApplication({
					...consultingApplication,
					SUPPORT_BUSINESS_TITLE: value,
				}),
			grid: {
				xs: 12,
				sm: 12,
			},
		},
		{
			label: '지원사업 유형',
			value: consultingApplication.SUPPORT_BUSINESS_DESCRIPTION,
			type: 'multiselect',
			additionalProps: {
				placeholder: '지원사업 유형을 선택해주세요',
			},
			essential: true,
			dataList: supportContentData
				? supportContentData?.map(
						(row) => row.SUPPORT_DESCRIPTION_TITLE
				  )
				: [],
			handleChange: (event) => {
				const {
					target: { value },
				} = event;
				setConsultingApplication({
					...consultingApplication,
					SUPPORT_BUSINESS_DESCRIPTION: value,
				});
			},
			grid: {
				xs: 12,
				sm: 12,
			},
		},
		{
			label: '지원규모',
			value: consultingApplication.SUPPORT_SCALE,
			additionalProps: {
				placeholder: '지원규모를 선택해주세요',
			},
			type: 'select',
			dataList: cashRange,
			essential: true,
			setValue: (value: string) =>
				setConsultingApplication({
					...consultingApplication,
					SUPPORT_SCALE: value,
				}),
			grid: {
				xs: 12,
				sm: 5.8,
			},
		},
		{
			label: '주관기관',
			value: consultingApplication.IMPLEMENTING_AGENCY,
			additionalProps: {
				placeholder: '주관기관을 입력해주세요',
			},
			essential: false,
			setValue: (value: string) =>
				setConsultingApplication({
					...consultingApplication,
					IMPLEMENTING_AGENCY: value,
				}),
			grid: {
				xs: 12,
				sm: 5.8,
			},
		},
		{
			label: '메모',
			value: consultingApplication.MEMO,
			additionalProps: {
				placeholder: '메모를 입력해주세요',
			},
			essential: false,
			setValue: (value: string) =>
				setConsultingApplication({
					...consultingApplication,
					MEMO: value,
				}),
			grid: {
				xs: 12,
				sm: 12,
			},
		},
	];

	return (
		<SupportiModal
			open={props.open}
			handleClose={() => {
				props.handleClose();
			}}
			style={{
				width: { sm: 'fit-content', xs: '100%' },
				maxWidth: { sm: '500px', xs: '100%' },
				maxHeight: '90%',
				height: 'fit-content',
			}}
			activeHeader={true}
			title={'지원사업 컨설팅 신청'}
		>
			<Box
				px={2}
				width={'100%'}
				sx={{ overflowY: 'auto' }}
				maxHeight={'500px'}
			>
				<Grid container gap={1} mb={2}>
					{/* 데이터 입력 */}
					{consultingApplyData.map((item, index) => (
						<Grid item {...item.grid} key={index}>
							<Typography
								variant="body2"
								fontWeight={'600'}
								sx={{ my: 1 }}
							>
								{item.label}
								{item.essential ? '(필수)' : ''}
							</Typography>
							{item.type === 'file' ? (
								<MultiFileUploader
									inputStatus={{ status: 'default' }}
									fileList={fileList}
									setFileList={setFileList}
								/>
							) : item.type === 'multiselect' ? (
								<SupportiInput
									value={item.value}
									type={'multiselect'}
									dataList={item.dataList}
									additionalProps={item.additionalProps}
									handleChange={item.handleChange}
									// handleAdd={item.handleAdd}
									// handleDelete={item.handleDelete}
									// maxLength={item.maxLength}
								/>
							) : (
								<SupportiInput
									value={item.value}
									setValue={item.setValue}
									type={item.type}
									dataList={item.dataList}
									additionalProps={item.additionalProps}
								/>
							)}
						</Grid>
					))}
				</Grid>
				<SupportiButton
					contents={'신청'}
					onClick={() => {
						if (
							fileList.length === 0 ||
							consultingApplication.SUPPORT_BUSINESS_TITLE ===
								'' ||
							consultingApplication.SUPPORT_BUSINESS_DESCRIPTION
								.length === 0 ||
							consultingApplication.SUPPORT_SCALE === ''
						) {
							alert('필수 입력 항목을 입력해주세요');
							return;
						} else {
							const ConsultingTicket = userTickets.filter(
								(item: any) =>
									item.Ticket.CATEGORY === '지원사업컨설팅' &&
									item.isPossibleUsing
							);

							if (ConsultingTicket.length === 0) {
								alert('지원사업 컨설팅 티켓이 없습니다.');
								setBuyTicketModalOpen(true);
							} else createConsulting();
						}
					}}
					fullWidth
					variant="contained"
				/>
			</Box>
			<TicketPayModal
				open={buyTicketModalOpen}
				handleClose={() => setBuyTicketModalOpen(false)}
				ticketId={usableTicket?.TICKET_IDENTIFICATION_CODE}
				ticketName={usableTicket?.TICKET_NAME}
				ticketPrice={usableTicket?.PRICE}
			/>
		</SupportiModal>
	);
};

export default SupportConsultingApplyModal;
