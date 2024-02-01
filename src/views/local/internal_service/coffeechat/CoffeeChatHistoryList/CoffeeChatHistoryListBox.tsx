import React, { useEffect } from 'react';

import { Box, BoxProps, Chip, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

interface ICoffeeChatHistoryListBoxProps {
	label: string;
	activeColor: boolean;
	userName: string;
	received?: boolean;
	endButtonLabel?: string;
	endButtonCallback?: () => void;
	setSelectedData?: (data: any) => void;
	reservationDateAndTime?: any;
	disableAccordion?: boolean;
	accordionContent?: any;
}

const CoffeeChatHistoryListBox = (props: ICoffeeChatHistoryListBoxProps) => {
	//* State
	/**
	 * 아코디언 오픈 여부
	 */
	const [open, setOpen] = React.useState(false);

	//* Hooks
	useEffect(() => {
		setOpen(false);
	}, [props.disableAccordion]);

	return (
		<Box
			sx={{
				p: 2,
				borderRadius: 2,
				bgcolor: 'primary.light',
				mb: 1,
				width: '100%',
			}}
		>
			{/* 메뉴 */}
			<Box
				sx={{
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'center',
					width: '100%',
				}}
			>
				{/* 칩, 이름 */}
				<Box display={'flex'} alignItems={'center'}>
					<Chip
						variant="outlined"
						label={props.label}
						sx={{
							color: props.activeColor
								? 'primary.main'
								: 'secondary.main',
							borderColor: props.activeColor
								? 'primary.main'
								: 'secondary.main',
						}}
						size="small"
					/>
					<Typography variant="body2" sx={{ ml: 1 }}>
						{props.userName}{' '}
						{props.received
							? '님이 커피챗을 제안했습니다.'
							: '님에게 커피챗을 제안했습니다.'}
					</Typography>
				</Box>
				{/* 예약 일시, 취소, 아코디언 버튼 */}
				<Box display={'flex'} alignItems={'center'}>
					<Typography>{props.reservationDateAndTime}</Typography>
					{props.endButtonLabel && (
						<Chip
							variant="outlined"
							label={props.endButtonLabel}
							sx={{
								color: 'secondary.main',
								borderColor: 'secondary.main',
								ml: 2,
								cursor: 'pointer',
							}}
							size="small"
							onClick={props.endButtonCallback}
						/>
					)}
					{props.disableAccordion !== undefined &&
						!props.disableAccordion && (
							<Box onClick={() => setOpen(!open)}>
								{open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
							</Box>
						)}
				</Box>
			</Box>
			{/* 오픈 아코디언 */}
			{open && props.accordionContent !== undefined && (
				<Box sx={{ mt: 2 }}>{props.accordionContent}</Box>
			)}
		</Box>
	);
};

export default CoffeeChatHistoryListBox;
