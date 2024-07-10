import React from 'react';

import { Box, BoxProps, Typography } from '@mui/material';
import SeminarCard from '../../local/external_service/seminar/SeminarCard/SeminarCard';
import Nodata from '../../global/NoData/NoData';

interface IServiceListLayoutProps {
	type: 'seminar' | 'consulting' | 'mentoring';
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
				<Box display="flex" gap={3} flexWrap="wrap" my={2}>
					{props.type != 'mentoring' && (
						<Typography
							sx={{
								p: 1,
								border: '1px solid #c8c8c8',
								borderRadius: 5,
								cursor: 'pointer',
								borderColor:
									tab === undefined
										? 'primary.main'
										: '#c8c8c8',
								color: tab === undefined && 'primary.main',
							}}
							onClick={() => setTab(undefined)}
						>
							전체
						</Typography>
					)}
					{props.type == 'mentoring' && (
						<Box
							display="flex"
							flexDirection={'column'}
							alignItems="center"
							gap={1}
							sx={{
								py: 1,
								px: 3,
								border: '1px solid #c8c8c8',
								borderRadius: 5,
								cursor: 'pointer',
								borderColor:
									tab === undefined
										? 'primary.main'
										: '#c8c8c8',
							}}
						>
							<img
								src="/images/mentoring/category.png"
								alt="icon"
								style={{ width: 40, height: 40 }}
							/>
							<Typography
								sx={{
									p: 1,
									cursor: 'pointer',
									color: tab === undefined && 'primary.main',
								}}
								onClick={() => setTab(undefined)}
							>
								전체
							</Typography>
						</Box>
					)}
					{props.type === 'mentoring' &&
						props.filterList?.map((item, index) => {
							return (
								<Box
									key={index.toString()}
									display="flex"
									flexDirection={'column'}
									alignItems="center"
									gap={1}
									sx={{
										p: 1,
										border: '1px solid #c8c8c8',
										borderRadius: 5,
										cursor: 'pointer',
										borderColor:
											tab === item
												? 'primary.main'
												: '#c8c8c8',
									}}
								>
									<img
										src={item.IMAGE}
										alt="icon"
										style={{ width: 40, height: 40 }}
									/>
									<Typography
										sx={{
											color:
												tab === item && 'primary.main',
										}}
										onClick={() => setTab(item)}
									>
										{item.CONTENT}
									</Typography>
								</Box>
							);
						})}
					{props.type != 'mentoring' &&
						props.filterList?.map((item, index) => {
							return (
								<Typography
									sx={{
										p: 1,
										border: '1px solid #c8c8c8',
										borderRadius: 5,
										cursor: 'pointer',
										borderColor:
											tab === item
												? 'primary.main'
												: '#c8c8c8',
										color: tab === item && 'primary.main',
									}}
									onClick={() => setTab(item)}
								>
									{item.CONTENT}
								</Typography>
							);
						})}
				</Box>
			)}
			{/* 콘텐츠 영역 */}
			{props.dataList?.length === 0 ? (
				<Nodata />
			) : (
				<Box display="flex" gap={3} flexWrap="wrap" my={3}>
					{props.dataList?.map((item, index) => {
						return <SeminarCard data={item} type={props.type} />;
					})}
				</Box>
			)}
		</Box>
	);
};

export default ServiceListLayout;
