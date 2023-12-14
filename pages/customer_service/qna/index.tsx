import React, { useEffect } from 'react';

import { NextPage } from 'next';

import { Box, BoxProps, Button, TextField, Typography } from '@mui/material';
import DefaultController from '@qillie-corp/ark-office-project/src/controller/default/DefaultController';
import AccordianBox from '../../../src/views/local/common/AccordianBox/AccordianBox';
import SupportiInput from '../../../src/views/global/SupportiInput';
import { useAppMember } from '../../../src/hooks/useAppMember';

const Page: NextPage = () => {
	//* Modules
	const qnaController = new DefaultController('QnaBoardQuestion');
	//* Constants
	//* States
	const [qnaSheet, setQnaSheet] = React.useState<any>({});
	/**
	 * 질문 리스트
	 */
	const [qusetionList, setQuestionList] = React.useState([]);

	//* Functions
	/**
	 * 질문 등록하기
	 */
	const registerQuestion = () => {
		qnaController.createItem(
			{
				...qnaSheet,
				APP_MEMBER_IDENTIFICATION_CODE: 1,
			},
			(res) => {
				console.log(res);
				setQnaSheet({
					TITLE: '',
					CONTENT: '',
				});
				getQuestion();
			},
			(err) => {
				console.log(err);
			}
		);
	};
	/**
	 * 질문 가져오기
	 */
	const getQuestion = () => {
		qnaController.findAllItems(
			{
				APP_MEMBER_IDENTIFICATION_CODE: memberId,
			},
			(res) => {
				setQuestionList(res.data.result.rows);
			},
			(err) => {
				console.log(err);
			}
		);
	};
	//* Hooks
	/**
	 * 유저 아이디 가져오는 훅
	 */
	const memberId = useAppMember();
	/**
	 * 질문 리스트 조회
	 */
	useEffect(() => {
		memberId && getQuestion();
	}, [memberId]);
	return (
		<Box p={{ md: 10, xs: 3 }}>
			<Typography variant="h5" fontWeight={'bold'}>
				Q&A
			</Typography>
			<Typography
				variant="subtitle1"
				fontWeight="600"
				color={'secondary.main'}
				sx={{ my: 2 }}
			>
				서포티에 대한 궁금한점을 남겨주세요.
			</Typography>
			<Box
				sx={{
					p: 2,
					borderRadius: 2,
					bgcolor: 'primary.light',
					mb: 2,
					display: 'flex',
					flexDirection: 'column',
					gap: 1,
				}}
			>
				<Typography variant="body1" fontWeight={'bold'}>
					제목
				</Typography>
				<TextField
					sx={{ width: '100%', bgcolor: 'white' }}
					value={qnaSheet.TITLE}
					onChange={(e) => {
						setQnaSheet({
							...qnaSheet,
							TITLE: e.target.value,
						});
					}}
				/>
				<Typography variant="body1" fontWeight={'bold'}>
					내용
				</Typography>
				<TextField
					sx={{ width: '100%', bgcolor: 'white' }}
					multiline
					rows={2}
					value={qnaSheet.CONTENT}
					onChange={(e) => {
						setQnaSheet({
							...qnaSheet,
							CONTENT: e.target.value,
						});
					}}
				/>
				<Button
					variant="contained"
					onClick={registerQuestion}
					sx={{
						width: '15%',
						height: '40px',
						ml: 'auto',
					}}
				>
					등록하기
				</Button>
			</Box>
			<Box mt={4}>
				{qusetionList.map((notice) => {
					return (
						<AccordianBox
							title={notice.TITLE}
							content={
								notice.QnaBoardAnswers.length !== 0
									? notice.QnaBoardAnswers[0].CONTENT
									: '답변이 등록되지 않았습니다.'
							}
							created_at={notice.CREATED_AT}
							additional={notice.CONTENT}
							type={
								notice.QnaBoardAnswers.length !== 0
									? '답변완료'
									: '답변전'
							}
						/>
					);
				})}
			</Box>
		</Box>
	);
};

export default Page;
