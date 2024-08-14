import { Box, Button, TextField, Typography } from '@mui/material';
import { NextPage } from 'next';
import React, { useEffect } from 'react';
import { useAppMember } from '../../../../src/hooks/useAppMember';
import { useRouter } from 'next/router';
import DefaultController from '@leanoncompany/supporti-ark-office-project/src/controller/default/DefaultController';
import SupportiInput from '../../../../src/views/global/SupportiInput';
import MultiImageUploader from '@leanoncompany/supporti-ark-office-project/src/ui/local/input/MultiImageUploader/MultiImageUploader';

const Page: NextPage = () => {
	//* Modules
	const router = useRouter();
	const insightController = new DefaultController('Insight');
	const insightCategoryController = new DefaultController('InsightCategory');

	const { memberId, memberName } = useAppMember();
	//* States
	const [insight, setInsight] = React.useState<any>({});
	const [category, setCategory] = React.useState<string>('');
	/**
	 * 카테고리 리스트
	 */
	const [categoryList, setCategoryList] = React.useState<any[]>([]);

	/**
	 * 기업 로고/이미지 리스트
	 */
	const [companyIntroductionImages, setCompanyIntroductionImages] =
		React.useState<string[]>([]);

	/**
	 * 인사이트 카테고리 리스트 조회
	 */
	useEffect(() => {
		insightCategoryController.findAllItems(
			{},
			(res) => {
				const categoryList = [];
				res.data.result.rows.map((item) => {
					categoryList.push({
						label: item.CONTENT,
						value: item.INSIGHT_CATEGORY_IDENTIFICATION_CODE,
					});
				});
				setCategoryList(categoryList);
			},
			(err) => console.log(err)
		);
	}, []);
	/**
	 * 인사이트 등록하기
	 */
	const registerInsight = () => {
		if (category === '') {
			alert('카테고리를 선택해주세요.');
			return;
		} else if (insight.TITLE === '' || insight.DESCRIPTION === '') {
			alert('제목과 내용을 모두 입력해주세요.');
			return;
		} else {
			insightController.createItem(
				{
					...insight,
					AUTHOR: memberName,
					IMAGE: JSON.stringify(companyIntroductionImages),
				},
				(res) => {
					setInsight({
						TITLE: '',
						DESCRIPTION: '',
						CATEGORY: '',
					});
					alert('인사이트가 등록되었습니다.');
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
			<Typography variant="h5" fontWeight={'bold'} mb={2}>
				인사이트 등록
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
					value={insight.TITLE}
					onChange={(e) => {
						setInsight({
							...insight,
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
					value={insight.DESCRIPTION}
					onChange={(e) => {
						setInsight({
							...insight,
							DESCRIPTION: e.target.value,
						});
					}}
				/>
				{/* 이미지 */}
				<Box
					mt={2}
					display={'flex'}
					flexDirection={'column'}
					gap={2}
					width={'100%'}
				>
					<Typography
						fontWeight={'600'}
						variant="body1"
						width={'130px'}
					>
						썸네일 이미지
					</Typography>
					<Box display={'flex'} gap={2} flexWrap={'wrap'}>
						<MultiImageUploader
							imagePreviewUrlList={companyIntroductionImages}
							setImagePreviewUrlList={
								setCompanyIntroductionImages
							}
							numOfUploader={1}
							label="이미지"
							inputStatus={{
								status: 'default',
							}}
						/>
					</Box>
				</Box>
				<Typography variant="body1" fontWeight={'bold'}>
					링크
				</Typography>
				<TextField
					sx={{ width: '100%', bgcolor: 'white' }}
					value={insight.SOURCE}
					onChange={(e) => {
						setInsight({
							...insight,
							SOURCE: e.target.value,
						});
					}}
				/>
				<Button
					variant="contained"
					onClick={registerInsight}
					sx={{
						width: '15%',
						height: '40px',
						alignSelf: 'center',
						mt: 2,
					}}
				>
					등록하기
				</Button>
			</Box>
		</Box>
	);
};

export default Page;
