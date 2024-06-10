import React from 'react';

import { Box, Button } from '@mui/material';

interface ISupportiTabProps {
	/**
	 * 탭 리스트
	 */
	tabList: string[];
	/**
	 * 탭 값 변경 핸들러
	 */
	setValue: React.Dispatch<React.SetStateAction<string | number | boolean>>;
	/**
	 * 탭 값
	 */
	value: string | number | boolean;
	/**
	 * 탭 내용 리스트
	 */
	tabContentList: JSX.Element[];

	/**
	 * 이미지 경로
	 */
	imagePath?: string[];

	/**
	 * 이미지 위치
	 */
	imagePosition?: 'left' | 'right';
}

const SupportiTab = (props: ISupportiTabProps) => {
	return (
		props.tabList != undefined && (
			<Box
				display={'flex'}
				flexDirection={'row'}
				justifyContent={'space-between'}
				gap={2}
				width="100%"
				p={{ xs: 2, sm: 0 }}
				flexWrap={'wrap'}
				alignContent={'center'}
			>
				{props.imagePath?.length > 0 &&
					props.imagePosition == 'left' && (
						<img
							src={
								props.imagePath[
									props.tabList.findIndex(
										(tab) => tab == props.value
									)
								]
							}
							alt={'runwayPC'}
							style={{
								width: '80%',
								flexWrap: 'wrap',
								display: 'flex',
								margin: 'auto',
							}}
						/>
					)}
				<Box
					sx={{
						display: 'flex',
						flexDirection: 'column',
						width: '100%',
						alignItems: 'center',
						flexWrap: 'wrap',
					}}
				>
					<Box
						sx={{
							display: 'flex',
							direction: 'row',
							paddingTop: '50px',
							flexWrap: 'wrap',
						}}
					>
						{props.tabList.map((tab, idx) => (
							<Button
								key={idx}
								onClick={() => props.setValue(tab)}
								sx={{
									px: {
										xs: 'auto',
										sm: '50px',
									},
									py: {
										xs: 'auto',
										sm: '15px',
									},
									marginRight: '20px',
									borderRadius: '15px',
									backgroundColor:
										props.value == tab
											? 'primary.main'
											: 'grey.300',
									color:
										props.value == tab
											? 'white'
											: 'primary.main',
								}}
							>
								{tab}
							</Button>
						))}
					</Box>
					<Box
						sx={{
							width: '100%',
							display: 'flex',
							justifyContent: 'center',
							flexWrap: 'wrap',
						}}
					>
						{props.tabContentList.map(
							(tabContent, idx) =>
								props.value == props.tabList[idx] && tabContent
						)}
					</Box>
				</Box>
				{props.imagePath?.length > 0 &&
					props.imagePosition == 'right' && (
						<img
							src={
								props.imagePath[
									props.tabList.findIndex(
										(tab) => tab == props.value
									)
								]
							}
							alt={'runwayPC'}
							style={{
								width: '80%',
								flexWrap: 'wrap',
								display: 'flex',
								margin: 'auto',
							}}
						/>
					)}
			</Box>
		)
	);
};

export default SupportiTab;
