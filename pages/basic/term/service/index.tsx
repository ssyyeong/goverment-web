import { Box } from '@mui/material';
import { NextPage } from 'next';
import React from 'react';
import TermBoardForm from '@qillie-corp/ark-office-project/src/layout/forms/board/TermBoardForm';
import { memory } from '../../../_app';
const Page: NextPage = () => {
	return (
		<Box>
			<TermBoardForm modelName={'ServiceTerm'} memory={memory} />
		</Box>
	);
};

export default Page;
