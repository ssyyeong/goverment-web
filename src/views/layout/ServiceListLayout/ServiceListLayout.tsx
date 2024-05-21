import React from 'react';

import { Box, BoxProps, Typography } from '@mui/material';
import SeminarCard from '../../local/external_service/seminar/SeminarCard/SeminarCard';

interface IServiceListLayoutProps {
	type: "seminar" | "consulting";
	useFiltering?: boolean;
	title: string;
	filterList?: any[];
	dataList: any[];
	filterChangeHandler?: (filter: any) => void;
}

const ServiceListLayout = (props: IServiceListLayoutProps) => {
	//* States
	const [tab, setTab] = React.useState(
		props.filterList && props.filterList[0]
	);

	React.useEffect(() => {
		props.filterChangeHandler && props.filterChangeHandler(tab);
	}, [tab]);

	return (
		<Box width={'100%'}>
			{/* 헤더 영역 */}
			<Box
				sx={{
					p: 2.5,
					borderRadius: 2,
					boxShadow: 'rgb(219, 219, 219) 0px 4px 10px',
				}}
			>
				<Typography variant="h6">{props.title}</Typography>
			</Box>
			{/** 필터링 영역 */}
			{props.useFiltering && (
				<Box display="flex" gap={1} flexWrap="wrap" my={2}>
					{props.filterList?.map((item, index) => {
						return (
							<Typography
								sx={{
									p: 1,
									border: '1px solid #c8c8c8',
									borderRadius: 5,
									cursor: 'pointer',
								}}
								onClick={() => setTab(item)}
							>
								{item}
							</Typography>
						);
					})}
				</Box>
			)}
			{/* 콘텐츠 영역 */}
			<Box display="flex" gap={3} flexWrap='wrap' my={2}>
				{props.dataList?.map((item, index) => {
					return <SeminarCard data={item} type={props.type}/>;
				})}
			</Box>
		</Box>
	);
};

export default ServiceListLayout;
