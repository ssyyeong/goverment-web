import React, { useEffect } from 'react';

import { NextPage } from 'next';

import { Box, Button, TextField, Typography } from '@mui/material';
import DefaultController from '@leanoncompany/supporti-ark-office-project/src/controller/default/DefaultController';
import AccordianBox from '../../../src/views/local/common/AccordianBox/AccordianBox';
import { useAppMember } from '../../../src/hooks/useAppMember';
import { useUserAccess } from '../../../src/hooks/useUserAccess';
import { useRouter } from 'next/router';
import { SupportiAlertModal } from '../../../src/views/global/SupportiAlertModal';
import SupportiInput from '../../../src/views/global/SupportiInput';
import PopUpModal from '../../../src/views/local/common/PopUpModal/PopUpModal';
import CloseIcon from '@mui/icons-material/Close';
import SupportiButton from '../../../src/views/global/SupportiButton';

const Page: NextPage = () => {
	//* Modules
	const qnaController = new DefaultController('QnaBoardQuestion');
	const qnaCategoryController = new DefaultController('QnaBoardCategory');
	const router = useRouter();
	//* Constants
	//* States
	const [qnaSheet, setQnaSheet] = React.useState<any>({});
	const [category, setCategory] = React.useState<string>('');
	/**
	 * 카테고리 리스트
	 */
	const [categoryList, setCategoryList] = React.useState<any[]>([]);

	/**
	 * 질문 리스트
	 */
	const [qusetionList, setQuestionList] = React.useState([]);

	/**
	 * 알럿
	 */
	const [alertModal, setAlertModal] = React.useState<boolean>(false);
	/**
	 * 비밀글 팝업
	 */
	const [openPopUp, setOpenPopUp] = React.useState(false);
	/**
	 * 비밀글 팝업 아이디
	 */
	const [openPopUpId, setOpenPopUpId] = React.useState<string>('');
	/**
	 * 비밀글 비밀번호
	 */
	const [password, setPassword] = React.useState<string>('');

	/**
	 * 질문 가져오기
	 */
	const getQuestion = () => {
		qnaController.findAllItems(
			{
				// APP_MEMBER_IDENTIFICATION_CODE: memberId,
			},
			(res) => {
				res.data.result.rows.map((item) => {
					item.OPEN_YN = false;
				});
				setQuestionList(res.data.result.rows);
			},
			(err) => {
				console.log(err);
			}
		);
	};

	/**
	 * 비밀글 비밀번호 확인
	 */
	const checkPassword = () => {
		const question = qusetionList.filter((item) => {
			return item.QNA_BOARD_QUESTION_IDENTIFICATION_CODE === openPopUpId;
		});

		if (question[0].PASSWORD === password) {
			setOpenPopUp(false);

			qusetionList.map((item) => {
				if (
					item.QNA_BOARD_QUESTION_IDENTIFICATION_CODE === openPopUpId
				) {
					item.OPEN_YN = true;
				}
			});
		} else {
			alert('비밀번호가 일치하지 않습니다.');
		}

		setPassword('');
	};

	/**
	 *
	 * 글 삭제
	 */

	const deletePost = (id) => {
		qnaController.deleteItem(
			{
				QNA_BOARD_QUESTION_IDENTIFICATION_CODE: id,
			},
			(res) => {
				alert('삭제 되었습니다.');
				getQuestion();
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
		<Box p={{ md: 10, xs: 3 }} display={'flex'} flexDirection={'column'}>
			<Button
				onClick={() => router.push('/customer_service/qna/write')}
				sx={{
					my: 1,
					py: 1.5,
					display: 'block',
					width: 90,
					borderRadius: 2,
					ml: 'auto',
				}}
				variant="contained"
			>
				<Typography color={'white'} fontWeight={'600'}>
					문의하기
				</Typography>
			</Button>
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
								notice.QnaBoardAnswers.length !== 0 &&
								notice.PRIVATE_YN === 'Y'
									? '답변완료(비밀글)'
									: notice.QnaBoardAnswers.length == 0 &&
									  notice.PRIVATE_YN === 'Y'
									? '답변전(비밀글)'
									: notice.QnaBoardAnswers.length !== 0 &&
									  notice.PRIVATE_YN === 'N'
									? '답변완료'
									: '답변전'
							}
							additionalOpenFunction={() => {
								if (
									notice.PRIVATE_YN === 'Y' &&
									!notice.OPEN_YN &&
									notice.APP_MEMBER_IDENTIFICATION_CODE ===
										memberId
								) {
									setOpenPopUpId(
										notice.QNA_BOARD_QUESTION_IDENTIFICATION_CODE
									);
									setOpenPopUp(true);
								} else if (
									notice.PRIVATE_YN === 'Y' &&
									!notice.OPEN_YN &&
									notice.APP_MEMBER_IDENTIFICATION_CODE !==
										memberId
								) {
									alert(
										'비밀글은 본인 글만 확인 가능합니다.'
									);
								} else if (
									notice.PRIVATE_YN === 'Y' &&
									notice.OPEN_YN
								) {
									notice.OPEN_YN = !notice.OPEN_YN;
									setQuestionList([...qusetionList]);
								} else if (notice.PRIVATE_YN == 'N') {
									notice.OPEN_YN = !notice.OPEN_YN;
									setQuestionList([...qusetionList]);
								}
							}}
							openAccordian={
								notice.OPEN_YN === true ? true : false
							}
							isPossibleDelete={
								notice.APP_MEMBER_IDENTIFICATION_CODE ===
								memberId
							}
							deleteCallback={() =>
								deletePost(
									notice.QNA_BOARD_QUESTION_IDENTIFICATION_CODE
								)
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
			<PopUpModal
				modalOpen={openPopUp}
				setModalOpen={setOpenPopUp}
				uiData={
					<Box
						display={'flex'}
						justifyContent={'space-between'}
						flexDirection={'column'}
						gap={3}
					>
						<Box display="flex" justifyContent={'center'}>
							<Typography
								variant="subtitle1"
								fontWeight={600}
								mt="auto"
								mb="auto"
							>
								비밀글
							</Typography>
							<CloseIcon
								sx={{
									cursor: 'pointer',
									position: 'absolute',
									right: 20,
									top: 15,
								}}
								onClick={() => setOpenPopUp(false)}
							/>
						</Box>
						<Box display="flex" justifyContent="space-between">
							<Typography
								variant="subtitle1"
								fontWeight={600}
								mt="auto"
								mb="auto"
							>
								비밀번호
							</Typography>
							<SupportiInput
								type="input"
								additionalProps={{
									placeholder: '비밀번호를 입력해주세요.',
								}}
								value={password}
								setValue={setPassword}
								width={'80%'}
							/>
						</Box>

						<Box display={'flex'} gap={2}>
							<SupportiButton
								contents={'확인'}
								variant="contained"
								onClick={() => checkPassword()}
								style={{
									width: '150px',
									marginRight: 'auto',
									marginLeft: 'auto',
								}}
							/>
							<SupportiButton
								contents={'닫기'}
								variant="outlined"
								onClick={() => {
									setOpenPopUp(false);
									setPassword('');
								}}
								style={{
									width: '150px',
									marginRight: 'auto',
									marginLeft: 'auto',
								}}
							/>
						</Box>
					</Box>
				}
			/>
		</Box>
	);
};

export default Page;
