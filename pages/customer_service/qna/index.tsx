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
import { set } from 'date-fns';
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

	//* Functions
	/**
	 * 질문 등록하기
	 */
	const registerQuestion = () => {
		if (category === '') {
			alert('카테고리를 선택해주세요.');
			return;
		} else if (qnaSheet.CONTENT === '' || qnaSheet.TITLE === '') {
			alert('제목과 내용을 모두 입력해주세요.');
			return;
		} else if (qnaSheet.PRIVATE_YN && qnaSheet.PASSWORD === '') {
			alert('비밀글을 등록할 경우 비밀번호를 입력해주세요.');
		} else if (qnaSheet.PRIVATE_YN && qnaSheet.PASSWORD.length !== 4) {
			alert('비밀번호는 4자리로 입력해주세요.');
		} else {
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
						PRIVATE_YN: false,
						PASSWORD: '',
					});
					getQuestion();
				},
				(err) => {
					console.log(err);
				}
			);
		}
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
	/**
	 * qna 카테고리 리스트 조회
	 */
	useEffect(() => {
		qnaCategoryController.findAllItems(
			{},
			(res) => {
				const categoryList = [];
				res.data.result.rows.map((item) => {
					categoryList.push({
						label: item.CATEGORY,
						value: item.QNA_BOARD_CATEGORY_IDENTIFICATION_CODE,
					});
				});
				setCategoryList(categoryList);
			},
			(err) => console.log(err)
		);
	}, []);

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
					카테고리
				</Typography>
				<SupportiInput
					dataList={categoryList}
					value={category}
					setValue={setCategory}
					type="select"
					width={{ xs: '30%', md: '30%' }}
				/>
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
				<Box
					sx={{
						display: 'flex',
						flexDirection: 'row',
						alignItems: 'center',
						gap: 1,
					}}
				>
					<Typography variant="body1" fontWeight={'bold'}>
						비밀글 여부
					</Typography>
					<SupportiInput
						type="checkbox"
						value={qnaSheet.PRIVATE_YN === 'Y' ? true : false}
						setValue={(e) => {
							console.log(e);
							setQnaSheet({
								...qnaSheet,
								PRIVATE_YN: e === true ? 'Y' : 'N',
							});
						}}
					/>
				</Box>

				{qnaSheet.PRIVATE_YN && (
					<Box
						sx={{
							display: 'flex',
							flexDirection: 'row',
							alignItems: 'center',
							gap: 1,
						}}
					>
						<Typography variant="body1" fontWeight={'bold'}>
							비밀번호(숫자 4자리)
						</Typography>
						<TextField
							sx={{ width: '30%', bgcolor: 'white' }}
							value={qnaSheet.PASSWORD}
							onChange={(e) => {
								setQnaSheet({
									...qnaSheet,
									PASSWORD: e.target.value,
								});
							}}
						/>
					</Box>
				)}
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
							additionalOpenFunction={() => {
								if (
									notice.PRIVATE_YN === 'Y' &&
									!notice.OPEN_YN
								) {
									setOpenPopUpId(
										notice.QNA_BOARD_QUESTION_IDENTIFICATION_CODE
									);
									setOpenPopUp(true);
								} else {
									notice.OPEN_YN = !notice.OPEN_YN;
									setQuestionList([...qusetionList]);
								}
							}}
							openAccordian={
								notice.OPEN_YN === true ? true : false
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
