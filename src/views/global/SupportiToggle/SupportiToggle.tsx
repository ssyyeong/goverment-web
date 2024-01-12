import React, { useState } from 'react';

import { Box, BoxProps } from '@mui/material';

interface ISupportiChipProps {
	/**
	 * 칩 라벨
	 */
	label: string;
	/**
	 * 칩 값
	 */
	value: string | number | boolean;
}

interface ISupportiToggleProps {
	/**
	 * 칩 데이터 리스트
	 */
	chipDataList: ISupportiChipProps[];
	/**
	 * 칩 값 변경 핸들러
	 */
	setValue: React.Dispatch<React.SetStateAction<string | number | boolean>>;
	/**
	 * 칩 값
	 */
	value: string | number | boolean;
	/**
	 * 칩 높이
	 */
	chipHeight?: number | string;
	/**
	 * 각짐 여부
	 */
	angled?: boolean;
	/**
	 * 패딩 여부
	 */
	disablePadding?: boolean;
	/**
	 * 선택된 칩 색상
	 */
	selectedChipColor?: string;
	/**
	 * 선택되지 않은 칩 색상
	 */
	unselectedChipColor?: string;
	style?: {
		outerBoxStyle?: BoxProps;
		chipStyle?: BoxProps;
		chipMapStyle?: BoxProps;
	};
}

const SupportiToggle = (props: ISupportiToggleProps) => {
	//* State
	// 선택된 칩 인덱스
	const [selectedChipIndex, setSelectedChipIndex] = useState<number>(
		props.chipDataList.findIndex((data) => props.value === data.value)
	);

	//* Style
	const translateX = `translateX(${100 * selectedChipIndex}%)`;

	return (
		props.chipDataList != undefined && (
			<Box
				bgcolor={'#f2f3f7'}
				p={'3px'}
				sx={{
					borderRadius: props.angled ? 1 : 5,
					...props.style?.outerBoxStyle,
				}}
				width={'100%'}
				display={'flex'}
				position={'relative'}
			>
				{/* 이동 선택 칩 */}
				<Box
					bgcolor={'#ffffff'}
					width={`${
						props.disablePadding
							? 100 / props.chipDataList.length
							: 99 / props.chipDataList.length
					}%`}
					borderRadius={props.angled ? 1 : 5}
					sx={{
						cursor: 'pointer',
						display: 'inline-block',
						padding: '5px 10px',
						transition:
							'background-color 0.3s ease, transform 0.3s ease',
						transform: translateX,
						height: props.chipHeight ? props.chipHeight : 40,
						...props.style?.chipStyle,
					}}
					position={'absolute'}
				/>

				{/* 칩 맵 */}
				{props.chipDataList.map((data, index) => {
					return (
						<Box
							key={index}
							color={
								props.value !== data.value
									? props.unselectedChipColor
										? props.unselectedChipColor
										: '#b0b5c2'
									: props.selectedChipColor
									? props.selectedChipColor
									: ''
							}
							onClick={() => {
								props.setValue(data.value);
								setSelectedChipIndex(index);
							}}
							sx={{
								zIndex: 1,
								display: 'flex',
								justifyContent: 'center',
								alignItems: 'center',
								cursor: 'pointer',
								height: props.chipHeight
									? props.chipHeight
									: 40,
							}}
							{...props.style?.chipMapStyle}
							textAlign={'center'}
							width={`${100 / props.chipDataList.length}%`}
						>
							{data.label}
						</Box>
					);
				})}
			</Box>
		)
	);
};

export default SupportiToggle;
