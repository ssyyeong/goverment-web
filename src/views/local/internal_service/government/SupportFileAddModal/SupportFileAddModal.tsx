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
import DefaultController from '@leanoncompany/supporti-ark-office-project/src/controller/default/DefaultController';
import { useAppMember } from '../../../../../hooks/useAppMember';
import { v4 as uuidv4 } from 'uuid';

interface ISupportFileAddModalProps {
	managementId: number;
	fileGuidelineList: any;
	getUserFile: () => void;
	open: boolean;
	handleClose: () => void;
	setTriggerKey?: (key: string) => void;
	isEditMode: boolean;
	setIsEditMode: (value: boolean) => void;
	userModifyFile?: any;
}

const SupportFileAddModal = (props: ISupportFileAddModalProps) => {
	//* Controller
	const userFileController = new DefaultController(
		'UserSupportBusinessFileManagement'
	);

	//* State
	const [fileId, setFileId] = React.useState<number>(
		props.isEditMode
			? props.userModifyFile?.SupportBusinessFileManagement
					?.SUPPORT_BUSINESS_FILE_MANAGEMENT_IDENTIFICATION_CODE
			: props.fileGuidelineList[0]
					?.SUPPORT_BUSINESS_FILE_MANAGEMENT_IDENTIFICATION_CODE
	);

	const config = props.isEditMode
		? {
				PREPERATION_YN: props.userModifyFile?.PREPERATION_YN,
				ESSENTIAL_YN: props.userModifyFile?.ESSENTIAL_YN,
				MANAGER: props.userModifyFile?.MANAGER,
				NOTE: props.userModifyFile?.NOTE,
				SUBMIT_FILE_NAME:
					props.userModifyFile?.SupportBusinessFileManagement
						.SUBMIT_FILE_NAME,
				SUPPORT_BUSINESS_MANAGEMENT_IDENTIFICATION_CODE:
					props.managementId,
				SUPPORT_BUSINESS_FILE_MANAGEMENT_IDENTIFICATION_CODE:
					props.userModifyFile?.SupportBusinessFileManagement
						?.SUPPORT_BUSINESS_FILE_MANAGEMENT_IDENTIFICATION_CODE,
		  }
		: {
				PREPERATION_YN: 'N',
				ESSENTIAL_YN: 'N',
				MANAGER: null,
				NOTE: null,
				SUBMIT_FILE_NAME: props.fileGuidelineList[0]?.SUBMIT_FILE_NAME,
				SUPPORT_BUSINESS_MANAGEMENT_IDENTIFICATION_CODE:
					props.managementId,
				SUPPORT_BUSINESS_FILE_MANAGEMENT_IDENTIFICATION_CODE: fileId,
		  };

	/**
	 * 제출서류 데이터
	 */

	const [file, setFile] = React.useState(
		props.isEditMode
			? {
					PREPERATION_YN: props.userModifyFile?.PREPERATION_YN,
					ESSENTIAL_YN: props.userModifyFile?.ESSENTIAL_YN,
					MANAGER: props.userModifyFile?.MANAGER,
					NOTE: props.userModifyFile?.NOTE,
					SUBMIT_FILE_NAME:
						props.userModifyFile?.SupportBusinessFileManagement
							.SUBMIT_FILE_NAME,
					SUPPORT_BUSINESS_MANAGEMENT_IDENTIFICATION_CODE:
						props.managementId,
					SUPPORT_BUSINESS_FILE_MANAGEMENT_IDENTIFICATION_CODE:
						props.userModifyFile?.SupportBusinessFileManagement
							?.SUPPORT_BUSINESS_FILE_MANAGEMENT_IDENTIFICATION_CODE,
			  }
			: {
					PREPERATION_YN: 'N',
					ESSENTIAL_YN: 'N',
					MANAGER: null,
					NOTE: null,
					SUBMIT_FILE_NAME:
						props.fileGuidelineList[0]?.SUBMIT_FILE_NAME,
					SUPPORT_BUSINESS_MANAGEMENT_IDENTIFICATION_CODE:
						props.managementId,
					SUPPORT_BUSINESS_FILE_MANAGEMENT_IDENTIFICATION_CODE:
						fileId,
			  }
	);
	/**
	 * 서류별 가이드라인 리스트
	 */
	// const [fileGuidelineList, setFileGuidelineList] = React.useState([]);

	//* Function
	const addFile = () => {
		userFileController
			.createItem({
				...file,
			})
			.then((res) => {
				console.log(file);
				// alert('등록 성공!');
				props.getUserFile();
				props.handleClose();
			})
			.catch((err) => {});
	};

	//* Hooks
	useEffect(() => {
		if (!props.open) {
			setFile({
				PREPERATION_YN: 'N',
				ESSENTIAL_YN: 'N',
				MANAGER: null,
				NOTE: null,
				SUBMIT_FILE_NAME: props.fileGuidelineList[0]?.SUBMIT_FILE_NAME,
				SUPPORT_BUSINESS_MANAGEMENT_IDENTIFICATION_CODE:
					props.managementId,
				SUPPORT_BUSINESS_FILE_MANAGEMENT_IDENTIFICATION_CODE: fileId,
			});
		} else {
			setFile(
				props.isEditMode
					? {
							PREPERATION_YN:
								props.userModifyFile?.PREPERATION_YN,
							ESSENTIAL_YN: props.userModifyFile?.ESSENTIAL_YN,
							MANAGER: props.userModifyFile?.MANAGER,
							NOTE: props.userModifyFile?.NOTE,
							SUBMIT_FILE_NAME:
								props.userModifyFile
									?.SupportBusinessFileManagement
									.SUBMIT_FILE_NAME,
							SUPPORT_BUSINESS_MANAGEMENT_IDENTIFICATION_CODE:
								props.managementId,
							SUPPORT_BUSINESS_FILE_MANAGEMENT_IDENTIFICATION_CODE:
								props.userModifyFile
									?.SupportBusinessFileManagement
									?.SUPPORT_BUSINESS_FILE_MANAGEMENT_IDENTIFICATION_CODE,
					  }
					: {
							PREPERATION_YN: 'N',
							ESSENTIAL_YN: 'N',
							MANAGER: null,
							NOTE: null,
							SUBMIT_FILE_NAME:
								props.fileGuidelineList[0]?.SUBMIT_FILE_NAME,
							SUPPORT_BUSINESS_MANAGEMENT_IDENTIFICATION_CODE:
								props.managementId,
							SUPPORT_BUSINESS_FILE_MANAGEMENT_IDENTIFICATION_CODE:
								fileId,
					  }
			);
		}
	}, [props.open, props.isEditMode]);

	/**
	 * 유저 아이디 가져오는 훅
	 */
	const { memberId } = useAppMember();

	//* Constants
	const FileList = props.fileGuidelineList.map((row) => {
		return { label: row.SUBMIT_FILE_NAME, value: row.SUBMIT_FILE_NAME };
	});

	const fileManagementData = [
		{
			label: '제출서류명',
			value: file.SUBMIT_FILE_NAME,
			type: 'select',
			additionalProps: {
				placeholder: '제출서류명을 선택해주세요',
			},
			essential: true,
			dataList: FileList,
			setValue: (value: string) => {
				console.log(value);
				setFile({
					...file,
					SUBMIT_FILE_NAME: value,
				});
				setFileId(
					props.fileGuidelineList.find(
						(row) => row.SUBMIT_FILE_NAME === value
					).SUPPORT_BUSINESS_FILE_MANAGEMENT_IDENTIFICATION_CODE
				);
			},
			grid: {
				xs: 12,
				sm: 5.8,
			},
		},
		{
			label: '필수 또는 선택',
			value: file.ESSENTIAL_YN,
			type: 'select',
			additionalProps: {
				placeholder: '필수여부를 선택해주세요',
			},
			essential: true,
			dataList: [
				{ label: '필수', value: 'Y' },
				{ label: '선택', value: 'N' },
			],
			setValue: (value: string) =>
				setFile({ ...file, ESSENTIAL_YN: value }),
			grid: {
				xs: 12,
				sm: 5.8,
			},
		},
		{
			label: '준비유무',
			value: file.PREPERATION_YN,
			type: 'select',
			additionalProps: {
				placeholder: '준비유무를 선택해주세요',
			},
			essential: true,
			dataList: [
				{ label: '유', value: 'Y' },
				{ label: '무', value: 'N' },
			],
			setValue: (value: string) =>
				setFile({ ...file, PREPERATION_YN: value }),
			grid: {
				xs: 12,
				sm: 5.8,
			},
		},
		{
			label: '담당자',
			value: file.MANAGER,
			additionalProps: {
				placeholder: '담당자를 입력해주세요',
			},
			essential: false,
			setValue: (value: string) => setFile({ ...file, MANAGER: value }),
			grid: {
				xs: 12,
				sm: 5.8,
			},
		},
		{
			label: '비고',
			value: file.NOTE,
			additionalProps: {
				placeholder: '비고를 입력해주세요',
			},
			essential: false,
			setValue: (value: string) => setFile({ ...file, NOTE: value }),
			grid: {
				xs: 12,
				sm: 5.8,
			},
		},
	];

	return (
		<SupportiModal
			open={props.open}
			handleClose={() => {
				props.handleClose();
				props.setIsEditMode(false);
			}}
			style={{
				width: { sm: 'fit-content', xs: '100%' },
				maxWidth: { sm: '500px', xs: '100%' },
				maxHeight: '90%',
				height: 'fit-content',
			}}
			activeHeader={true}
			title={props.isEditMode ? '제출서류 수정' : '제출서류 추가'}
		>
			<Box
				px={2}
				width={'100%'}
				sx={{ overflowY: 'auto' }}
				maxHeight={'500px'}
			>
				<Grid container gap={1} mb={2}>
					{/* 데이터 입력 */}
					{fileManagementData.map((item, index) => (
						<Grid item {...item.grid} key={index}>
							<Typography
								variant="body2"
								fontWeight={'600'}
								sx={{ my: 1 }}
							>
								{item.label}
								{item.essential ? '(필수)' : ''}
							</Typography>
							<SupportiInput
								value={item.value}
								additionalProps={item.additionalProps}
								setValue={item.setValue}
								type={item.type}
								// handleChange={item.handleChange}
								dataList={item.dataList}
								// handleAdd={item.handleAdd}
								// handleDelete={item.handleDelete}
								// maxLength={item.maxLength}
							/>
						</Grid>
					))}
				</Grid>
				<SupportiButton
					contents={'확인'}
					onClick={() => {
						if (props.isEditMode) {
							userFileController.updateItem(
								{
									USER_SUPPORT_BUSINESS_FILE_MANAGEMENT_IDENTIFICATION_CODE:
										props.userModifyFile
											.USER_SUPPORT_BUSINESS_FILE_MANAGEMENT_IDENTIFICATION_CODE,
									...file,
								},
								(res) => {
									props.getUserFile();
									props.handleClose();
									props.setIsEditMode(false);
								},
								(err) => {}
							);
						} else {
							addFile();
						}
					}}
					fullWidth
					variant="contained"
				/>
			</Box>
		</SupportiModal>
	);
};

export default SupportFileAddModal;
