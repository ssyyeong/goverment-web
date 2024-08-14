import React, { useEffect } from 'react';

import { NextPage } from 'next';

import {
	Box,
	BoxProps,
	Button,
	Divider,
	FormControl,
	FormControlLabel,
	FormLabel,
	Radio,
	RadioGroup,
	Typography,
} from '@mui/material';
import { useRouter } from 'next/router';
import DefaultController from '@leanoncompany/supporti-ark-office-project/src/controller/default/DefaultController';
import moment from 'moment';
import { useUserAccess } from '../../../src/hooks/useUserAccess';
import { useAppMember } from '../../../src/hooks/useAppMember';
import dynamic from 'next/dynamic';

const Page: NextPage = () => {
	//* Modules
	const router = useRouter();
	//* Controller
	const insightController = new DefaultController('Insight');

	//* Constants
	const { pid } = router.query;

	const SupportiViewer = dynamic(
		() =>
			import(
				'../../../src/views/local/internal_service/contents/ToastViewer/ToastViewer'
			),
		{
			ssr: false,
		}
	);

	//* States
	/**
	 * 인사이트 데이터
	 */
	const [insightData, setInsightData] = React.useState<any>({});

	//* Hooks
	const { access } = useUserAccess('SIGN_IN');
	// const access = true;
	/**
	 * 유저 아이디 가져오는 훅
	 */
	const { memberId, memberEmailId } = useAppMember();

	//* Hooks
	/**
	 * 인사이트 데이터 조회
	 */
	useEffect(() => {
		if (pid !== undefined) {
			insightController.getOneItem(
				{ INSIGHT_IDENTIFICATION_CODE: pid },
				(res) => {
					setInsightData(res.data.result);
				},
				(err) => {}
			);
		}
	}, [pid]);

	return (
		<Box
			display={'flex'}
			width={'100%'}
			p={{
				xs: 2,
				md: 10,
			}}
			minHeight={'100vh'}
			flexDirection={'column'}
		>
			<Box
				display={'flex'}
				flexDirection={'column'}
				width={{
					md: '80%',
					xs: '100%',
				}}
				position={'relative'}
				margin={'auto'}
				p={{
					xs: 1,
					md: 5,
				}}
				minHeight={'90vh'}
			>
				{/*  내용 */}
				<Box
					display={'flex'}
					flexDirection={'column'}
					alignSelf={'center'}
					width={'100%'}
					ml={'25%'}
				>
					<Typography variant="h4" color="primary">
						{insightData.TITLE}
					</Typography>
					<Box display={'flex'} flexDirection={'row'} mt={2}>
						<Typography variant="body2" color="textSecondary">
							{insightData.AUTHOR}
						</Typography>
						<Typography
							variant="body2"
							color="textSecondary"
							style={{ marginLeft: '10px' }}
						>
							{moment(insightData.CREATED_DATE).format(
								'YYYY-MM-DD'
							)}
						</Typography>
					</Box>
					<Divider
						sx={{
							width: '100%',
							display: 'flex',
							marginTop: '10px',
						}}
					/>
				</Box>

				<Box
					display={'flex'}
					flexDirection={'column'}
					alignSelf={'center'}
					width={'100%'}
					ml={'25%'}
					mt={2}
				>
					<SupportiViewer data={insightData.DESCRIPTION} />
				</Box>
			</Box>
			<Button
				onClick={() => {
					window.open(insightData.SOURCE, '_blank');
				}}
				sx={{
					display: 'block',
					borderRadius: 2,
					ml: 'auto',
				}}
				variant="text"
			>
				<Typography color={'gray'} fontWeight={'600'}>
					출처: {insightData.SOURCE}
				</Typography>
			</Button>
		</Box>
	);
};

export default Page;
