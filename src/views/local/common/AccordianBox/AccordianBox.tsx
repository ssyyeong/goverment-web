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
			}}
		>
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					gap: 1,
					width: '90%',
				}}
			>
				<Typography color={'primary'} fontWeight={'500'}>
					{props.type}
				</Typography>
				<Typography variant="body1" fontWeight={'bold'}>
					{props.title}
				</Typography>
				{open && (
					<TextField
						sx={{ width: '100%', bgcolor: 'white', my: 2 }}
						multiline
						rows={5}
						value={props.content}
						InputProps={{
							readOnly: true,
						}}
					/>
				)}
				<Typography variant="body1">
					{moment(props.created_at).format('YYYY-MM-DD(ddd) HH:mm')}
				</Typography>
			</Box>
			{open ? (
				<ExpandLessIcon onClick={() => setOpen(!open)} />
			) : (
				<ExpandMoreIcon onClick={() => setOpen(!open)} />
			)}
		</Box>
	);
};

export default AccordianBox;
