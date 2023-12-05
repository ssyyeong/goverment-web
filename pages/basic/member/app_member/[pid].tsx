import { Box } from '@mui/material';
import { NextPage } from 'next';
import React from 'react';

import DataUtil from '@qillie-corp/ark-office-project/src/utils/data/DataUtil';
import DefaultController from '@qillie-corp/ark-office-project/src/controller/default/DefaultController';
import AppMemberForm from '@qillie-corp/ark-office-project/src/layout/forms/member/AppMemberForm/AppMemberForm';
import { IData } from '@qillie-corp/ark-office-project/src/@types/base/data';
import { memory } from '../../../_app';
const Page: NextPage = () => {
	return (
		<Box>
			<AppMemberForm modelName="AppMember" memory={memory} />
		</Box>
	);
};

export default Page;
