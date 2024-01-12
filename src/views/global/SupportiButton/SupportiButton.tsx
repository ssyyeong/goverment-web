import React from 'react';

import { Button, SxProps } from '@mui/material';

interface ISupportiButtonProps {
	/**
	 * 버튼 내용
	 */
	contents: any;
	/**
	 * 버튼 클릭 핸들러
	 */
	onClick: (config?: any) => void;
	/**
	 * 버튼 비활성화 여부
	 */
	disabled?: boolean;
	/**
	 * 버튼 컬러
	 */
	color?:
		| 'inherit'
		| 'primary'
		| 'secondary'
		| 'success'
		| 'error'
		| 'info'
		| 'warning'
		| undefined;
	/**
	 * 버튼 전체 너비
	 */
	fullWidth?: boolean;
	/**
	 * 버튼 타입
	 */
	variant?: 'text' | 'outlined' | 'contained' | undefined;
	/**
	 * 버튼 내부 padding 제거 여부
	 */
	disabledGutters?: boolean;
	/**
	 * 그라데이션 여부
	 */
	isGradient?: boolean;
	/**
	 * 버튼 스타일
	 */
	style?: SxProps;
	/**
	 * 버튼 앞쪽 아이콘
	 */
	startIcon?: any;
	/**
	 * 버튼 뒷쪽 아이콘
	 */
	endIcon?: any;
}

const SupportiButton = (props: ISupportiButtonProps) => {
	return (
		<Button
			fullWidth={props.fullWidth}
			variant={props.variant}
			onClick={props.onClick}
			color={props.color}
			startIcon={props.startIcon}
			endIcon={props.endIcon}
			sx={{
				borderRadius: '5px',
				padding: props.disabledGutters ? '0px' : '17px 16px',
				backgroundImage: props.isGradient
					? `linear-gradient(99deg, #5583e4 9%, #4955e3 89%)`
					: undefined,
				...props.style,
			}}
			disabled={props.disabled}
		>
			{props.contents}
		</Button>
	);
};

export default SupportiButton;
