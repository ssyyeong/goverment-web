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
import { phoneRegex } from '../../../../../../configs/regex/regex';
interface IIrApplicationModalProps {
	open: boolean;
	handleClose: () => void;
	irProductId: any;
	irApplicationId?: any;
	memberId: any;
	adoptionDate: any;
	irDate: any;
	mode: 'modify' | 'create';
	irApplicationData?: any;
}
const IrApplicationModal = (props: IIrApplicationModalProps) => {
	//* Modules
	//* Controller
	const irApplicationController = new DefaultController('IrApplication');
	const irQuestionController = new DefaultController('IrQuestion');
	const irAnswerController = new IrAnswerController();
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
	const [irContactNum, setIrContactNum] = React.useState<string | undefined>(
		undefined
	);
	/**
	 * 신청 완료 알럿 모달
	 */
	const [successAlertModal, setSuccessAlertModal] =
		React.useState<boolean>(false);

	/**
	 * 동의 여부
	 */
	const [isChecked, setIsChecked] = React.useState<boolean>(false);

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
		if (irContactNum === undefined || irContactNum === null) {
			check = false;
		}
		return check;
	};

	const irApply = () => {
		// 필수 질문 답변 체크
		if (!checkIrAnswer()) {
			alert('필수 질문에 답변해주세요.');
			return;
		}
		if (irContactNum && !phoneRegex.test(irContactNum)) {
			alert('올바른 휴대폰 번호를 입력해주세요. (- 포함)');
			return;
		}

		if (!isChecked) {
			alert('신청을 위한 동의가 필요합니다.');
			return;
		}

		irApplicationController.createItem(
			{
				APP_MEMBER_IDENTIFICATION_CODE: memberId,
				IR_PRODUCT_IDENTIFICATION_CODE: props.irProductId,
				CONTACT_NUMBER: irContactNum,
			},
			(res) => {
				/**
				 * IR 답변 업로드 (res로 들어온 id 값 irAnswer에 꽂아넣기)
				 */
				const answermap = irAnswer.map((x) => {
					return {
						...x,
						IR_APPLICATION_IDENTIFICATION_CODE:
							res?.data.result.IR_APPLICATION_IDENTIFICATION_CODE,
					};
				});
				irAnswerController.uploadIrAnswer(
					answermap,
					(res) => {
						setIrAnswer([]);
						setSuccessAlertModal(true);
					},
					(err) => {}
				);
			},
			(err) => {
				if (err.response.data.message === '이미 신청한 IR입니다.') {
					alert('이미 신청한 IR입니다.');
				}
				if (
					err.response.data.message === '구독 회원만 이용 가능합니다.'
				) {
					alert('구독 회원만 이용 가능합니다.');
				}
			}
		);
	};
	/**
	 * IR 답변 업데이트
	 */
	const updateIrAnswer = () => {
		irAnswer.map((x) => {
			irAnswerController.updateItem(x, (res) => {});
		});
	};
	const modifyApplication = () => {
		// 필수 질문 답변 체크
		if (!checkIrAnswer()) {
			alert('필수 질문에 답변해주세요.');
			return;
		}

		if (irContactNum && !phoneRegex.test(irContactNum)) {
			alert('올바른 휴대폰 번호를 입력해주세요. (- 포함)');
			return;
		}

		if (!isChecked) {
			alert('신청을 위한 동의가 필요합니다.');
			return;
		}

		irApplicationController.updateItem(
			{
				APP_MEMBER_IDENTIFICATION_CODE: memberId,
				IR_APPLICATION_IDENTIFICATION_CODE: props.irApplicationId,
				CONTACT_NUMBER: irContactNum,
			},
			(res) => {
				/**
				 * IR 답변 업로드 (res로 들어온 id 값 irAnswer에 꽂아넣기)
				 */
				updateIrAnswer();
				setSuccessAlertModal(true);
			},
			(err) => {}
		);
	};
	//* Hooks
	useEffect(() => {
		//* IR 질문에 대한 답변 초기화
		if (questionList !== undefined && questionList.length !== 0) {
			if (props.mode === 'create') {
				let question = [];
				questionList?.map((x) => {
					question.push({
						IR_QUESTION_IDENTIFICATION_CODE:
							x.IR_QUESTION_IDENTIFICATION_CODE,
						ANSWER_CONTENT: '',
						FILE_LIST: [],
					});
				});
				setIrAnswer(question);
				setIrContactNum(undefined);
			} else {
				// 신청 변경 모드일 때 props로 받은 신청 데이터

				if (props.irApplicationData && props.open == true) {
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

					setIrAnswer(question);
					setIrContactNum(props.irApplicationData.CONTACT_NUMBER);
				}
			}
		}
	}, [props.open, props.irApplicationData, questionList]);

	useEffect(() => {
		// 질문 리스트 가져온다.
		props.irProductId &&
			irQuestionController.findAllItems(
				{
					SORT_KEY: 'ORDER',
					SORT_DIRECTION: 'ASC',
					IR_PRODUCT_IDENTIFICATION_CODE: props.irProductId,
				},
				(res) => {
					setQuestionList(res.data.result.rows);
				},
				(err) => {}
			);
	}, [props.irProductId]);

	useEffect(() => {
		if (props.irApplicationData && props.open == true) {
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

			setIrAnswer(question);
			setIrContactNum(props.irApplicationData.CONTACT_NUMBER);
		}
	}, []);

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
									핸드폰 번호 입력 ('-' 포함)
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

						{/** 약관 동의 */}
						<Box>
							<Box
								display={'flex'}
								justifyContent={'space-between'}
								alignItems={'center'}
								mt={1}
								mb={2}
							>
								<SupportiInput
									type="checkbox"
									value={isChecked}
									setValue={setIsChecked}
									label={''}
									width={'20px'}
								/>
								<Typography
									sx={{
										display: 'flex',
										gap: 0.5,
										lineHeight: '20px',
										mt: 2,
									}}
									fontWeight={600}
								>
									IR은 더블랙 회원에게만 제공되며,{' '}
									{props.irDate.split('T')[0].split('-')[1].replace('0', '')}월
									IR은
									{' ' +
										props.irDate
											.split('T')[0]
											.split('-')[1].replace('0', '')}
									월{' '}
									{props.irDate.split('T')[0].split('-')[2]}
									일에 개최됩니다. 심사역, 투자자 3~4분이
									참석하며 실제 투자 검토가 전제된 IR입니다.
									서류 검토 결과 선정된 인원에 한해서만
									진행하는 점 인지 부탁드립니다. (이에
									동의함을 눌러주시면 신청할 수 있습니다.)
									{/* 필수 여부 표시 */}
									<Typography color={'red'}>*</Typography>
								</Typography>
							</Box>
							{/* <Typography
								sx={{
									display: 'flex',
									my: 0.5,
								}}
							>
								선정 결과를 받으실 핸드폰 번호를 입력해주세요.
							</Typography> */}
						</Box>
					</Box>
				</Box>
			)}
			<SupportiButton
				contents={props.mode === 'create' ? '신청하기' : '변경하기'}
				isGradient={true}
				fullWidth={true}
				onClick={() => {
					if (props.mode === 'create') {
						irApply();
					} else {
						modifyApplication();
					}
				}}
				style={{ color: 'white' }}
			/>
			{props.mode === 'create' ? (
				<IrAlertModal
					type={'success'}
					open={successAlertModal}
					handleClose={() => setSuccessAlertModal(false)}
					customHandleClose={() => props.handleClose()}
					adoptionDate={props.adoptionDate}
				/>
			) : (
				<IrAlertModal
					type={'modify'}
					open={successAlertModal}
					handleClose={() => setSuccessAlertModal(false)}
					customHandleClose={() => props.handleClose()}
					adoptionDate={
						props.irApplicationData?.IrProduct?.ADOPTION_DATE
					}
				/>
			)}
		</SupportiModal>
	);
};
export default IrApplicationModal;
