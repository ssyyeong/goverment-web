import { Box } from '@mui/material';
import { NextPage } from 'next';
import React from 'react';
import AdminMemberForm from '@qillie-corp/ark-office-project/src/layout/forms/member/AdminMemberForm/AdminMemberForm';
import { memory } from '../../../_app';

const Page: NextPage = () => {
	return (
		<Box>
			<AdminMemberForm modelName="AdminMember" memory={memory} />
		</Box>
	);
};

export default Page;
