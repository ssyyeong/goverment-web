import { Box } from '@mui/material';
import { NextPage } from 'next';
import React from 'react';
import BidirectionalBoardForm from '@qillie-corp/ark-office-project/src/layout/forms/board/BidirectionalBoardForm';
import { memory } from '../../../_app';
const Page: NextPage = () => {
	return (
		<Box>
			<BidirectionalBoardForm
				mainLabel={'질문'}
				subLabel={'답변'}
				mainModelName={'QnaBoardQuestion'}
				subModelName={'QnaBoardAnswer'}
				memory={memory}
			/>
		</Box>
	);
};

export default Page;
