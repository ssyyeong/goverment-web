import { Box } from '@mui/material';
import { NextPage } from 'next';
import React from 'react';
import UnidirectionalBoardForm from '@qillie-corp/ark-office-project/src/layout/forms/board/UnidirectionalBoardForm';
import { memory } from '../../../_app';
const Page: NextPage = () => {
	return (
		<Box>
			<UnidirectionalBoardForm
				modelName={'FaqBoardContent'}
				memory={memory}
			/>
		</Box>
	);
};

export default Page;
