import React, { useState } from 'react';

import { Box, BoxProps } from '@mui/material';

interface ISupportiChipProps {
	label: string;
	value: string | number;
}

interface ISupportiToggleProps {
	chipDataList: ISupportiChipProps[];
	setValue: React.Dispatch<React.SetStateAction<string | number>>;
	value: string | number;
	chipHeight?: number;
	angled?: boolean;
	isToggled?: boolean;
	style?: {
		outerBoxStyle?: BoxProps;
		chipStyle?: BoxProps;
	};
}

const SupportiToggle = (props: ISupportiToggleProps) => {
	//* State
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
					width={`${99 / props.chipDataList.length}%`}
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
							color={props.value !== data.value ? '#b0b5c2' : ''}
							onClick={() => {
								props.setValue(data.value);
								setSelectedChipIndex(index);
							}}
							sx={{
								zIndex: 1,
								display: 'flex',
								justifyContent: 'center',
								alignItems: 'center',
								height: props.chipHeight
									? props.chipHeight
									: 40,
							}}
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
