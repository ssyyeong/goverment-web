import React from 'react';
import { NextPage } from 'next';

import { Box, Grid, Typography } from '@mui/material';

import { CookieManager } from '@leanoncompany/supporti-utility';
import InternalServiceDrawer from '../../../src/views/local/internal_service/common/InternalServiceDrawer';
import SupportiTable from '../../../src/views/global/SupportiTable';
import MobileTableRow from '../../../src/views/local/external_service/mobileTableRow/MobileTableRow';
import { TableHeaderProps } from '../../../src/views/global/SupportiTable/SupportiTable';

const Page: NextPage = () => {
	const cookie = new CookieManager();
	const locale = cookie.getItemInCookies('LOCALE');
	const list = [
		{
			id: 1,
			title: locale == 'jp' ? '日本口座開設' : '일본 계좌 개설',
			detail: locale == 'jp' ? '申請完了' : '신청완료',
		},
		{
			id: 2,
			title: locale == 'jp' ? '日本法人設立' : '일본 법인 설립',
			detail: locale == 'jp' ? 'マッチング完了' : '매칭완료',
		},
	];

	const marketPlaceGeneralHeaderData: TableHeaderProps[] = [
		{
			label: 'NO',
			value: '',
			format: (value, key, idx) => {
				return 1 * 10 + (idx + 1);
			},
			align: 'left',
		},
		{
			label: locale == 'jp' ? '詳細' : '상세',
			value: 'list',
			align: 'center',
			format: (value) => {
				return value?.detail;
			},
		},
	];

	/**
	 * 헤더 데이터
	 */
	const [marketPlaceHeaderData, setMarketPlaceHeaderData] = React.useState<
		TableHeaderProps[]
	>(marketPlaceGeneralHeaderData);

	return (
		<Box
			width={{
				xs: '100%',
				md: '40%',
			}}
			margin={'auto'}
			sx={{
				display: 'flex',
				flexDirection: 'column',
				backdropFilter: 'blur(20px)',
				borderStyle: 'solid',
				borderColor: 'primary.light',
				borderWidth: 'thin',
			}}
		>
			<Box
				width={'100%'}
				p={{
					xs: 2,
					md: 5,
				}}
				bgcolor={'primary.light'}
			>
				<Typography variant="h4" fontWeight={'bold'} sx={{ mb: 3 }}>
					{locale == 'jp' ? 'マッチング·ヒストリー' : '매칭 히스토리'}
				</Typography>
				{/*모바일 테이블 */}
				<Box
					width={'100%'}
					py={2}
					// display={{
					// 	sm: 'none',
					// 	xs: 'block',
					// }}
				>
					{list.map((item, idx) => {
						return (
							<MobileTableRow
								index={idx}
								title={item.title}
								colums={[
									{
										label: locale == 'jp' ? '詳細' : '상세',
										value: item.detail,
									},

									// {
									// 	label: '사용하기',
									// 	value: (
									// 		<Button
									// 			variant="contained"
									// 			onClick={() => {
									// 				if (
									// 					!item.Ticket
									// 						.SERVICE_LINK
									// 				) {
									// 					return alert(
									// 						'이동할 링크가 없습니다.'
									// 					);
									// 				}

									// 				router.push(
									// 					item.Ticket.SERVICE_LINK
									// 				);
									// 			}}
									// 			sx={{
									// 				fontWeight: '400',
									// 				fontSize: '12px',
									// 			}}
									// 		>
									// 			사용하기
									// 		</Button>
									// 	),
									// },
								]}
							/>
						);
					})}
				</Box>
				{/* 테이블 */}
				{/* <Box
					width={'100%'}
					// p={2}
					// mt={2}
					display={{
						sm: 'block',
						xs: 'none',
					}}
				>
					<SupportiTable
						rowData={list}
						headerData={marketPlaceHeaderData}
					/>
				</Box> */}
			</Box>
		</Box>
	);
};

export default Page;
