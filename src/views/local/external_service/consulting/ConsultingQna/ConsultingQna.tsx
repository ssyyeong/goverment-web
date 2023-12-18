import React from 'react';

import { Box, BoxProps, Typography } from '@mui/material';
import SupportiInput from '../../../../global/SupportiInput';

interface IConsultingQnaProps {
	qnaData: any;
	setConsultingAnswer: any;
	consultingAnswer: {
		CONSULTING_QUESTION_IDENTIFICATION_CODE: string | number;
		CONSULTING_APPLICATION_IDENTIFICATION_CODE?: number;
		ANSWER_CONTENT: string;
		FILE_LIST: string[];
	}[];
}

const ConsultingQna = (props: IConsultingQnaProps) => {
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
	 * 텍스트 답변
	 */
	React.useEffect(() => {
		props.setConsultingAnswer((prev: any) => {
			let temp = [...prev];
			let idx = temp.findIndex(
				(item: any) =>
					item.CONSULTING_QUESTION_IDENTIFICATION_CODE ===
					props.qnaData.CONSULTING_QUESTION_IDENTIFICATION_CODE
			);
			if (idx === -1) {
				temp.push({
					CONSULTING_QUESTION_IDENTIFICATION_CODE:
						props.qnaData.CONSULTING_QUESTION_IDENTIFICATION_CODE,
					ANSWER_CONTENT: textAnswer,
					FILE_LIST: [],
				});
			} else {
				temp[idx] = {
					...temp[idx],
					ANSWER_CONTENT: textAnswer,
				};
			}
			return temp;
		});
	}, [textAnswer]);
	/**
	 * 파일 답변
	 */
	React.useEffect(() => {
		props.setConsultingAnswer((prev: any) => {
			let temp = [...prev];
			let idx = temp.findIndex(
				(item: any) =>
					item.CONSULTING_QUESTION_IDENTIFICATION_CODE ===
					props.qnaData.CONSULTING_QUESTION_IDENTIFICATION_CODE
			);
			if (idx === -1) {
				temp.push({
					CONSULTING_QUESTION_IDENTIFICATION_CODE:
						props.qnaData.CONSULTING_QUESTION_IDENTIFICATION_CODE,
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
				>
					{props.qnaData.QUESTION_CONTENT}
					<Typography color={'red'}>
						{props.qnaData.REQUIRED_YN === 'Y' && '*'}
					</Typography>
				</Typography>
				{props.qnaData.QUESTION_TYPE === 'FILE' && (
					<SupportiInput
						type="checkbox"
						value={noFile}
						setValue={(value) => {
							setNoFile(value);
						}}
						label={'파일 없음'}
						width={'95px'}
					/>
				)}
			</Box>
			<Box mt={1}>
				{props.qnaData.QUESTION_TYPE === 'TEXT' ? (
					<SupportiInput
						type="text"
						value={textAnswer}
						setValue={(value) => {
							setTextAnswer(value);
						}}
						placeholder="답변을 입력해주세요"
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
							width={'300px'}
						/>
					)
				)}
			</Box>
		</Box>
	);
};

export default ConsultingQna;
