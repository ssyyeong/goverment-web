import React from 'react';

import { Box, BoxProps, Typography } from '@mui/material';
import SupportiInput from '../../../../global/SupportiInput';

interface IIrQnaProps {
	qnaData: any;
	setIrAnswer: any;
	irAnswer: {
		IR_QUESTION_IDENTIFICATION_CODE: string | number;
		IR_APPLICATION_IDENTIFICATION_CODE?: number;
		IR_ANSWER_IDENTIFICATION_CODE?: number;
		ANSWER_CONTENT: string;
		FILE_LIST: string;
	}[];
}

const IrQna = (props: IIrQnaProps) => {
	//* State
	/**
	 * 텍스트 답변
	 */
	const [textAnswer, setTextAnswer] = React.useState<string>('');
	/**
	 * 파일 답변
	 */
	const [fileAnswer, setFileAnswer] = React.useState<string>('');
	/**
	 * 파일 없음
	 */
	const [noFile, setNoFile] = React.useState<boolean>(false);

	//* Hooks
	/**
	 * 답변 데이터 등록
	 */
	React.useEffect(() => {
		props.setIrAnswer((prev: any) => {
			let temp = [...prev];
			let idx = temp.findIndex(
				(item: any) =>
					item.IR_QUESTION_IDENTIFICATION_CODE ===
					props.qnaData.IR_QUESTION_IDENTIFICATION_CODE
			);
			//	답변이 없을 경우
			if (idx === -1) {
				temp.push({
					IR_QUESTION_IDENTIFICATION_CODE:
						props.qnaData.IR_QUESTION_IDENTIFICATION_CODE,
					ANSWER_CONTENT: textAnswer,
					FILE_LIST: [],
				});
			} else {
				//	답변이 있을 경우
				temp[idx] = {
					...temp[idx],
					ANSWER_CONTENT: textAnswer,
				};
			}
			return temp;
		});
	}, [textAnswer]);
	/**
	 * 파일 답변등록
	 */
	React.useEffect(() => {
		props.setIrAnswer((prev: any) => {
			let temp = [...prev];
			let idx = temp.findIndex(
				(item: any) =>
					item.IR_QUESTION_IDENTIFICATION_CODE ===
					props.qnaData.IR_QUESTION_IDENTIFICATION_CODE
			);
			if (idx === -1) {
				temp.push({
					IR_QUESTION_IDENTIFICATION_CODE:
						props.qnaData.IR_QUESTION_IDENTIFICATION_CODE,
					ANSWER_CONTENT: '',
					FILE_LIST: fileAnswer,
				});
			} else {
				temp[idx] = {
					...temp[idx],
					FILE_LIST: fileAnswer,
				};
			}
			return temp;
		});
	}, [fileAnswer]);

	/**
	 * 들어온 데이터 등록
	 */
	React.useEffect(() => {
		let idx = props.irAnswer.findIndex(
			(item: any) =>
				item.IR_QUESTION_IDENTIFICATION_CODE ===
				props.qnaData.IR_QUESTION_IDENTIFICATION_CODE
		);
		if (idx !== -1) {
			setTextAnswer(props.irAnswer[idx].ANSWER_CONTENT);
			setFileAnswer(props.irAnswer[idx].FILE_LIST);
		}
	}, []);

	return (
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
					{props.qnaData.QUESTION_CONTENT}
					{/* 필수 여부 표시 */}
					<Typography color={'red'}>
						{props.qnaData.REQUIRED_YN === 'Y' && '*'}
					</Typography>
				</Typography>
				{/* 파일없음 체크박스 */}
				{/* {props.qnaData.QUESTION_TYPE === 'FILE' && (
					<SupportiInput
						type="checkbox"
						value={noFile}
						setValue={(value) => {
							setNoFile(value);
						}}
						label={'파일 없음'}
						width={'95px'}
					/>
				)} */}
			</Box>
			{/* 질문 타입에 따른 뷰어 수정 */}
			<Box mt={1}>
				{props.qnaData.QUESTION_TYPE === 'TEXT' ? (
					<SupportiInput
						type="text"
						value={textAnswer}
						setValue={(value) => {
							setTextAnswer(value);
						}}
						additionalProps={{
							placeholder: '답변을 입력해주세요!',
						}}
						width={'100%'}
					/>
				) : (
					!noFile && (
						<SupportiInput
							type="fileinput"
							value={fileAnswer}
							setValue={(value) => {
								setFileAnswer(value);
							}}
							width={'100%'}
						/>
					)
				)}
			</Box>
		</Box>
	);
};

export default IrQna;
