import React, { use, useEffect } from 'react';

import { Box, BoxProps, TextField, Typography } from '@mui/material';
import moment from 'moment';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

interface IAccordianBoxProps {
	type: any;
	title: any;
	created_at?: Date;
	content?: string;
	additional?: string;
	notAQna?: boolean;
	additionalComponent?: React.ReactNode;
	additionalOpenFunction?: any;
	openAccordian?: boolean;
}

const AccordianBox = (props: IAccordianBoxProps) => {
	//* State
	const [open, setOpen] = React.useState(false);

	useEffect(() => {
		console.log(props.openAccordian, 'props.openAccordian');
		if (props.openAccordian !== null) {
			setOpen(props.openAccordian);
		}
	}, [props.openAccordian]);

	return (
		<Box
			sx={{
				p: 2,
				borderRadius: 2,
				bgcolor: 'primary.light',
				mb: 2,
				display: 'flex',
				justifyContent: 'space-between',
				alignItems: open ? '' : 'center',
				width: '100%',
			}}
		>
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					gap: 1,
					width: '100%',
				}}
			>
				<Box
					sx={{
						display: 'flex',
						justifyContent: 'space-between',
						width: '100%',
						alignItems: 'center',
						cursor: 'pointer',
					}}
					onClick={() => {
						if (props.additionalOpenFunction)
							!open
								? props.additionalOpenFunction()
								: props.openAccordian === true &&
								  props.additionalOpenFunction();

						if (props?.openAccordian !== null)
							setOpen(props.openAccordian);
						else setOpen(!open);
					}}
				>
					{' '}
					<Typography color={'primary'} fontWeight={'500'}>
						{props.type}
					</Typography>{' '}
					{open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
				</Box>

				<Typography variant="body1" fontWeight={'bold'}>
					{props.notAQna ? '' : 'Q)'}
					{props.title}
				</Typography>
				{props.additionalComponent && open && (
					<Box
						sx={{
							width: '100%',
							my: 2,
						}}
					>
						{props.additionalComponent}
					</Box>
				)}

				{props.additional && open && (
					<Typography variant="body1" my={2}>
						{props.additional}
					</Typography>
				)}
				{props.additional && open && (
					<Typography variant="body1" fontWeight={'bold'}>
						답변
					</Typography>
				)}
				{open && !props.additionalComponent && (
					<Typography
						sx={{
							width: '100%',
							my: 2,
						}}
						fontWeight={'400'}
						lineHeight={1.5}
					>
						{props.notAQna ? '' : 'A)'}
						{props.content}
					</Typography>
				)}
				{props.created_at && (
					<Typography variant="body1">
						{moment(props.created_at).format(
							'YYYY-MM-DD(ddd) HH:mm'
						)}
					</Typography>
				)}
			</Box>
		</Box>
	);
};

export default AccordianBox;
