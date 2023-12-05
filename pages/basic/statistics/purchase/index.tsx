import { Box, Typography } from '@mui/material';
import { NextPage } from 'next';
import React, { useState, useEffect } from 'react';
import BasicStatisticsForm from '@qillie-corp/ark-office-project/src/layout/forms/statistics/BasicStatisticsForm';
import { IListHeader } from '@qillie-corp/ark-office-project/src/@types/layout/list/list';
import moment from 'moment';
import { memory } from '../../../_app';
import DataUtil from '@qillie-corp/ark-office-project/src/utils/data/DataUtil';
import { UrlManager } from '@qillie-corp/qillie-utility';
import { useRouter } from 'next/router';

const Page: NextPage = () => {
	const urlManager = new UrlManager();
	const router = useRouter();
	const dataUtil = new DataUtil();

	//* States
	const [selectedDateUnit, setSelectedDateUnit] = useState<string | null>(
		'day'
	);

	const [memberType, setMemberType] = useState<string>();

	//* Constants
	const [header, setHeader] = useState<IListHeader[]>([
		{
			label: '충전양',
			key: 'VALUE',
			gridMd: 9,
			gridXs: 9,
		},
		{
			label: '작성일',
			key: 'CREATED_AT',
			gridMd: 3,
			gridXs: 3,
		},
	]);

	const [contentChild, setContentChild] = useState<{
		[key: string]: (el: any) => any;
	}>({
		VALUE: (element: any) => {
			return (
				<Typography
					sx={{ whiteSpace: 'pre-line' }}
					fontWeight={'400'}
					variant={'body2'}
				>
					{(() => {
						let value = 0;

						element?.data?.PointApplication.map((el: any) => {
							value += el.VALUE;
						});

						return value;
					})()}
				</Typography>
			);
		},
		CREATED_AT: (element: any) => {
			return (
				<Typography
					sx={{ whiteSpace: 'pre-line' }}
					fontWeight={'400'}
					variant={'body2'}
				>
					{moment(element.date).format('YYYY/MM/DD a hh시 mm분')}
				</Typography>
			);
		},
	});

	// HOOKS
	// query 에서 멤버타입 정하기
	useEffect(() => {
		if (router.asPath.length > 0) {
			const query = urlManager.getQuery();
			for (let [key, value] of Object.entries(query)) {
				if (query[key] === 'MAIN_DISTRIBUTOR_MEMBER') {
					setMemberType('MainDistributorMember');
				} else if (query[key] === 'SUB_DISTRIBUTOR_MEMBER') {
					setMemberType('SubDistributorMember');
				} else if (query[key] === 'APP_MEMBER') {
					setMemberType('AppMember');
				}
			}
		}
	}, [router.asPath]);

	return (
		<Box>
			<BasicStatisticsForm
				memory={memory}
				targets={[
					{
						modelName: 'PointApplication',
						columns: [
							'STATUS',
							'VALUE',
							'CREATED_AT',
							'MEMBER_TYPE',
							'MEMBER_ID',
						],
						findAllArgs: Object.assign(
							{
								APPLICATION_TYPE: 'EXCHANGE',
								STATUS: 'SUCCESSED',
							},
							memberType !== undefined
								? {
										MEMBER_TYPE:
											dataUtil.convertToUpperCasedUnderbarSeparated(
												memberType
											),
								  }
								: {}
						),
					},
				]}
				listHeader={header}
				render={contentChild}
				setSelectedDateUnit={setSelectedDateUnit}
			/>
		</Box>
	);
};

export default Page;
