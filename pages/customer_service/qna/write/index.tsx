import { Box, Button, TextField, Typography } from '@mui/material';
import { NextPage } from 'next';
import React, { useEffect } from 'react';
import { useAppMember } from '../../../../src/hooks/useAppMember';
import { useRouter } from 'next/router';
import DefaultController from '@leanoncompany/supporti-ark-office-project/src/controller/default/DefaultController';
import SupportiInput from '../../../../src/views/global/SupportiInput';

const Page: NextPage = () => {
	//* Modules
	const router = useRouter();
	const qnaController = new DefaultController('QnaBoardQuestion');
	const qnaCategoryController = new DefaultController('QnaBoardCategory');

	const { memberId } = useAppMember();
	//* States
	const [qnaSheet, setQnaSheet] = React.useState<any>({});
	const [category, setCategory] = React.useState<string>('');
	/**
	 * 카테고리 리스트
	 */
	const [categoryList, setCategoryList] = React.useState<any[]>([]);

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
					setQnaSheet({
						TITLE: '',
						CONTENT: '',
						PRIVATE_YN: false,
						PASSWORD: '',
					});
					alert('문의가 등록되었습니다.');
					router.back();
				},
				(err) => {
					console.log(err);
				}
			);
		}
	};

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
		</Box>
	);
};

export default Page;
