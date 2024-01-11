import React, { useEffect } from 'react';

import { NextPage } from 'next';

import { Box, BoxProps, Button, TextField, Typography } from '@mui/material';
import DefaultController from '@leanoncompany/supporti-ark-office-project/src/controller/default/DefaultController';
import AccordianBox from '../../../src/views/local/common/AccordianBox/AccordianBox';
import SupportiInput from '../../../src/views/global/SupportiInput';
import { useAppMember } from '../../../src/hooks/useAppMember';
import { useUserAccess } from '../../../src/hooks/useUserAccess';
import { useRouter } from 'next/router';
import { SupportiAlertModal } from '../../../src/views/global/SupportiAlertModal';

const Page: NextPage = () => {
	//* Modules
	const qnaController = new DefaultController('QnaBoardQuestion');
	const router = useRouter();
	//* Constants
	//* States
	const [qnaSheet, setQnaSheet] = React.useState<any>({});
	/**
	 * 질문 리스트
	 */
	const [qusetionList, setQuestionList] = React.useState([]);

	/**
	 * 알럿
	 */
	const [alertModal, setAlertModal] = React.useState<boolean>(false);

	//* Functions
	/**
	 * 질문 등록하기
	 */
	const registerQuestion = () => {
		qnaController.createItem(
			{
				...qnaSheet,
				APP_MEMBER_IDENTIFICATION_CODE: memberId,
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
	const { memberId } = useAppMember();
	/**
	 * 로그인 여부 가져오는 훅
	 */
	const { access } = useUserAccess('SIGN_IN');
	/**
	 * 질문 리스트 조회
	 */
	useEffect(() => {
		if (access === true) {
			memberId && getQuestion();
		} else if (access === false) {
			setAlertModal(true);
		}
	}, [memberId, access]);
	return (
		<Box p={{ md: 10, xs: 3 }}>
			<Typography variant="h5" fontWeight={'bold'}>
				문의하기
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
			<SupportiAlertModal
				open={alertModal}
				handleClose={() => {
					setAlertModal(false);
					router.push('/auth/sign_in');
				}}
				type="login"
			/>
		</Box>
	);
};

export default Page;
