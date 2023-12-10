import React, { useEffect } from 'react';

import { NextPage } from 'next';

import { Box, BoxProps, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import DefaultController from '@qillie-corp/ark-office-project/src/controller/default/DefaultController';
import moment from 'moment';
import SupportiButton from '../../../src/views/global/SupportiButton';

const Page: NextPage = () => {
	//* Modules
	const router = useRouter();
	//* Controller
	const seminarController = new DefaultController('SeminarProduct');
	const seminarApplicationController = new DefaultController(
		'SeminarApplication'
	);
	//* Constants
	const { pid } = router.query;
	//* States
	/**
	 * 세미나 데이터
	 */
	const [seminarData, setSeminarData] = React.useState<any>({});
	/**
	 * 알럿 모달
	 */
	const [alertModal, setAlertModal] = React.useState<boolean>(false);
	/**
	 * 알럿 모달 내용
	 */
	const [alertModalContent, setAlertModalContent] =
		React.useState<string>('');
	/**
	 * 알럿 모달 타입
	 */
	const [alertModalType, setAlertModalType] = React.useState<string>('');

	// const {content, type, onClick} = useAlertModalData

	//* Functions
	/**
	 * 세미나 신청하기
	 */
	const applySeminar = () => {
		seminarApplicationController.createItem(
			{
				SEMINAR_PRODUCT_IDENTIFICATION_CODE: pid,
			},
			(res) => {
				setAlertModal(true);
				setAlertModalContent('신청이 완료되었습니다.');
			},
			(err) => {}
		);
	};

	//* Hooks
	/**
	 * 세미나 데이터 조회
	 */
	useEffect(() => {
		seminarController.getOneItem(
			{ SEMINAR_PRODUCT_IDENTIFICATION_CODE: pid },
			(res) => {
				setSeminarData(res.data.result);
			},
			(err) => {}
		);
	}, [pid]);

	/**
	 * 알럿 모달
	 */
	/**
	 * 1. 로그인체크
	 * 2. 구독체크
	 * 3. 포인트체크
	 * 4. 세미나 already check (서버)
	 */

	return (
		<Box width={'100%'} position={'relative'}>
			{/* 세미나 헤더 */}
			<Box
				width={'100%'}
				p={3}
				bgcolor={'#F5F5F5'}
				display={'flex'}
				justifyContent={'space-between'}
				alignItems={'center'}
			>
				<Typography variant={'h4'} fontWeight={'600'}>
					{seminarData.PRODUCT_NAME}
				</Typography>
				<Box display={'flex'} gap={3}>
					<Typography variant={'body1'}>
						{moment(seminarData.SEMINAR_DATE).format('YYYY-MM-DD')}
					</Typography>
					<Typography variant={'body1'}>
						정원 : {seminarData.PERSONNEL}명
					</Typography>
				</Box>
			</Box>
			{/* 세미나 내용 */}
			<Box
				display={'flex'}
				width={'100%'}
				flexDirection={'column'}
				alignItems={'center'}
				mt={3}
			>
				{seminarData.PRODUCT_DETAIL_IMAGE_LIST &&
					JSON.parse(seminarData.PRODUCT_DETAIL_IMAGE_LIST).map(
						(item, index) => {
							return (
								<Box key={index}>
									<img src={item} alt="" />
								</Box>
							);
						}
					)}
			</Box>
			{/* 스티키 버튼 */}
			<Box
				display={'flex'}
				width={'100%'}
				position={'fixed'}
				justifyContent={'center'}
				bottom={40}
				left={0}
			>
				<SupportiButton
					contents={'신청하기'}
					isGradient={true}
					onClick={() => applySeminar()}
					style={{
						color: 'white',
						width: '200px',
					}}
				/>
			</Box>
		</Box>
	);
};

export default Page;
