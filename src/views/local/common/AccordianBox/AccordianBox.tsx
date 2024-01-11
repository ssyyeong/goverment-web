import React from 'react';

import { Box, BoxProps, TextField, Typography } from '@mui/material';
import moment from 'moment';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

interface IAccordianBoxProps {
	type: string;
	title: string;
	created_at: Date;
	content: string;
	additional?: string;
}

const AccordianBox = (props: IAccordianBoxProps) => {
	//* State
	const [open, setOpen] = React.useState(false);
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
					onClick={() => setOpen(!open)}
				>
					{' '}
					<Typography color={'primary'} fontWeight={'500'}>
						{props.type}
					</Typography>{' '}
					{open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
				</Box>

				<Typography variant="body1" fontWeight={'bold'}>
					{props.title}
				</Typography>
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
				{open && (
					<TextField
						sx={{
							width: '100%',
							my: 2,
							bgcolor: 'white',
						}}
						fullWidth
						multiline
						rows={5}
						value={props.content}
						InputProps={{
							readOnly: true,
						}}
						focused={false}
					/>
				)}
				<Typography variant="body1">
					{moment(props.created_at).format('YYYY-MM-DD(ddd) HH:mm')}
				</Typography>
			</Box>
		</Box>
	);
};

export default AccordianBox;
