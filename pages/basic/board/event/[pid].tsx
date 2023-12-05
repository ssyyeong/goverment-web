import { Box } from '@mui/material';
import { NextPage } from 'next';
import React from 'react';
import UnidirectionalBoardForm from '@qillie-corp/ark-office-project/src/layout/forms/board/UnidirectionalBoardForm';
import { memory } from '../../../_app';
import { IData } from '@qillie-corp/ark-office-project/src/@types/base/data';
const Page: NextPage = () => {
	const dataList: IData[] = [
		{
			keys: ['TITLE'],
			ui: 'textarea',
			label: '제목',
			captionMessages: {
				requiredMessage: '제목을 입력해야합니다',
			},
			grid: {
				xs: 8,
				md: 8,
			},
		},
		{
			keys: ['CONTENT'],
			ui: 'textarea',
			rows: 10,
			label: '내용',
			captionMessages: {
				requiredMessage: '내용을 입력해야합니다',
			},
			grid: {
				xs: 12,
				md: 12,
			},
		},
		{
			keys: ['IMAGE_LIST'],
			ui: 'imageUpload',
			isOptional: true,
			label: '이미지',
			captionMessages: {
				requiredMessage: '이미지를 골라야합니다',
			},
			grid: {
				xs: 12,
				md: 12,
			},
		},
		{
			keys: ['IS_TOP_FIXED'],
			ui: 'switch',
			label: '상단 고정',
			grid: {
				xs: 12,
				md: 12,
			},
		},
	];

	return (
		<Box>
			<UnidirectionalBoardForm
				dataList={dataList}
				modelName={'EventBoardContent'}
				memory={memory}
			/>
		</Box>
	);
};

export default Page;
