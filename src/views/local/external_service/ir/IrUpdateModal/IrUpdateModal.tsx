import React, { useEffect, useState } from 'react';

import {
	Autocomplete,
	Box,
	BoxProps,
	Button,
	TextField,
	Typography,
} from '@mui/material';
import SupportiModal from '../../../../global/SupportiModal';
import SupportiButton from '../../../../global/SupportiButton';
import DefaultController from '@leanoncompany/supporti-ark-office-project/src/controller/default/DefaultController';
import { businessSector } from '../../../../../../configs/data/BusinessConfig';
import { useUserAccess } from '../../../../../hooks/useUserAccess';
import { useAppMember } from '../../../../../hooks/useAppMember';
import { SupportiAlertModal } from '../../../../global/SupportiAlertModal';
import IrQna from '../IrQna/IrQna';
import { IrAnswerController } from '../../../../../controller/IrAnswerController';
import SupportiInput from '../../../../global/SupportiInput';
import IrAlertModal from '../IrAlertModal/IrAlertModal';

interface IIrUpdateModalProps {
	open: boolean;
	handleClose: () => void;
	irProductId: any;
	memberId: any;
	date: any;
	mode: 'modify' | 'create';
	irApplicationData?: any;
}

const IrUpdateModal = (props: IIrUpdateModalProps) => {
	//* Modules

	//* Controller
	const irApplicationController = new DefaultController('IrApplication');
	const irQuestionController = new DefaultController('IrQuestion');
	const irAnswerController = new IrAnswerController();

	console.log(props.irApplicationData);
	//* States
	/**
	 * 질문 리스트
	 */
	const [questionList, setQuestionList] = React.useState([]);

	/**
	 * IR 답변
	 */
	const [irAnswer, setIrAnswer] = React.useState<any>([]);

	/**
	 * IR 답변
	 */
	const [irContactNum, setIrContactNum] = React.useState<number | undefined>(
		undefined
	);

	/**
	 * 신청 완료 알럿 모달
	 */
	const [successAlertModal, setSuccessAlertModal] =
		React.useState<boolean>(false);

	//* Hooks
	/**
	 * 유저 아이디 가져오는 훅
	 */
	const { memberId } = useAppMember();
	/**
	 * 로그인 여부 가져오는 훅
	 */
	const { access } = useUserAccess('SIGN_IN');

	//* Functions

	/**
	 *
	 * 필수 답변 체크
	 */
	const checkIrAnswer = () => {
		let check = true;
		irAnswer?.forEach((x, index) => {
			// 질문의 내용을 가져온다
			const indexQuestion = questionList.filter(
				(y) =>
					y.IR_QUESTION_IDENTIFICATION_CODE ===
					x.IR_QUESTION_IDENTIFICATION_CODE
			);
			// 답변이 없는 질문이 있을 때
			if (
				indexQuestion[0].QUESTION_TYPE == 'TEXT' && // 텍스트 타입이고
				x.ANSWER_CONTENT == '' // 답변이 없을 때
			) {
				check = false;
			}

			if (
				indexQuestion[0].QUESTION_TYPE == 'FILE' && // 파일 타입이고
				x.FILE_LIST.length == 0 // 답변이 없을 때
			) {
				check = false;
			}
		});

		if (
			irContactNum === undefined ||
			irContactNum === null ||
			irContactNum === 0
		) {
			check = false;
		}

		return check;
	};

	/**
	 * IR 답변 업데이트
	 */
	const updateIrAnswer = () => {
		irAnswer.map((x) => {
			irAnswerController.updateItem(x, (res) => {});
		});

		console.log(irAnswer);
	};

	const modifyApplication = () => {
		// 필수 질문 답변 체크
		if (!checkIrAnswer()) {
			alert('필수 질문에 답변해주세요.');
			console.log(irAnswer, irContactNum);
			return;
		}

		irApplicationController.updateItem(
			{
				APP_MEMBER_IDENTIFICATION_CODE: memberId,
				IR_PRODUCT_IDENTIFICATION_CODE: props.irProductId,
				CONTACT_NUMBER: irContactNum,
			},
			(res) => {
				console.log(res);
				/**
				 * IR 답변 업로드 (res로 들어온 id 값 irAnswer에 꽂아넣기)
				 */

				updateIrAnswer();

				setIrAnswer([]);
				setSuccessAlertModal(true);
			},
			(err) => {
			
			}
		);
	};

	//* Hooks
	useEffect(() => {
		//* IR 질문에 대한 답변 초기화

				// 신청 변경 모드일 때 props로 받은 신청 데이터
				if (props.irApplicationData) {
					let question = [];
					props.irApplicationData.IrAnswers?.map((x, index) => {
						question.push({
							IR_QUESTION_IDENTIFICATION_CODE:
								x.IR_QUESTION_IDENTIFICATION_CODE,
							ANSWER_CONTENT: x.ANSWER_CONTENT,
							FILE_LIST: x.FILE_LIST,
							IR_ANSWER_IDENTIFICATION_CODE:
								x.IR_ANSWER_IDENTIFICATION_CODE,
						});
					});

					console.log(question, questionList);
					setIrAnswer(question);
					setIrContactNum(props.irApplicationData.CONTACT_NUMBER);
				}

	}, [props.open, props.irApplicationData]);



	return (
		<SupportiModal
			open={props.open}
			handleClose={() => {
				props.handleClose();
			}}
			activeHeader={true}
			title="IR 신청"
			muiModalProps={{
				width: { sm: '40%', xs: '100%' },
			}}
			style={{
				minWidth: '40%',
				width: { sm: '40%', xs: '100%' },
			}}
		>
			{/* IR 사전 질문 */}
			{questionList.length !== 0 && (
				<Box width={'100%'}>
					<Box
						display={'flex'}
						justifyContent={'space-between'}
						mb={1}
						alignItems={'center'}
					>
						<Typography variant="h5" fontWeight={'700'}>
							IR 사전 질문 & 파일
						</Typography>
					</Box>
					{/* 질문 */}

					<Box mb={2}>
						{questionList?.map((question, index) => {
							return (
								<IrQna
									key={index}
									qnaData={question}
									irAnswer={irAnswer}
									setIrAnswer={setIrAnswer}
								/>
							);
						})}
						<Box mt={2}>
							<Box
								display={'flex'}
								justifyContent={'space-between'}
								alignItems={'center'}
							>
								<Typography
									sx={{
										display: 'flex',
										gap: 0.5,
									}}
									fontWeight={600}
									variant="subtitle1"
								>
									핸드폰 번호 입력
									{/* 필수 여부 표시 */}
									<Typography color={'red'}>*</Typography>
								</Typography>
							</Box>
							<Typography
								sx={{
									display: 'flex',
									my: 0.5,
								}}
							>
								선정 결과를 받으실 핸드폰 번호를 입력해주세요.
							</Typography>
							{/* 질문 타입에 따른 뷰어 수정 */}
							<Box mt={1}>
								<SupportiInput
									type="text"
									value={irContactNum}
									setValue={(value) => {
										setIrContactNum(value);
									}}
									additionalProps={{
										placeholder: '답변을 입력해주세요!',
									}}
									width={'100%'}
								/>
							</Box>
						</Box>
					</Box>
				</Box>
			)}
			<SupportiButton
				contents={props.mode === 'create' ? '신청하기' : '변경하기'}
				isGradient={true}
				fullWidth={true}
				onClick={() => {
			
						modifyApplication();
				}}
				style={{ color: 'white' }}
			/>
			{props.mode === 'create' ? (
				<IrAlertModal
					type={'success'}
					open={successAlertModal}
					handleClose={() => setSuccessAlertModal(false)}
					customHandleClose={() => props.handleClose()}
					date={props.date}
				/>
			) : (
				<IrAlertModal
					type={'modify'}
					open={successAlertModal}
					handleClose={() => setSuccessAlertModal(false)}
					customHandleClose={() => props.handleClose()}
					date={props.irApplicationData?.IrProduct?.ADOPTION_DATE}
				/>
			)}
		</SupportiModal>
	);
};

export default IrUpdateModal;
