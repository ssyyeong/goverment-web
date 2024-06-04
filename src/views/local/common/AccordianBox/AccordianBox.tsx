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
	imageList?: string[];
	additional?: string;
	notAQna?: boolean;
	additionalComponent?: React.ReactNode;
	additionalOpenFunction?: any;
	openAccordian?: boolean;
	isPossibleDelete?: boolean;
	deleteCallback?: ()=> void;
}

const AccordianBox = (props: IAccordianBoxProps) => {
	//* State
	const [open, setOpen] = React.useState(false);

	useEffect(() => {
		if (props.openAccordian !== undefined) {
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
						display:'flex',
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

						if (props?.openAccordian !== undefined)
							{
								
								setOpen(props.openAccordian);
							}
						else setOpen(!open);
					}}
				>
					{' '}
					<Typography color={'primary'} fontWeight={'500'}>
						{props.type == '공지' ? '공지' : props.type}
					</Typography>{' '}
					{open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
				</Box>

				<Typography variant="body1" fontWeight={'bold'}>
					{/* {props.notAQna ? '' : 'Q)'} */}
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
							whiteSpace: 'pre-line',
						}}
						fontWeight={'400'}
						lineHeight={1.5}
					>
						{props.notAQna ? '' : 'A)'}
						{props.content}
					</Typography>
				)}

{open && props.deleteCallback && props.isPossibleDelete &&
<Typography variant="body1" sx={{textDecoration: 'underline', ml:"auto", cursor:"pointer"}} onClick={props.deleteCallback}>
						삭제하기
					</Typography>
					}
				{open &&
					!props.additionalComponent &&
					props.imageList != undefined &&
					props.imageList.length > 0 && (
						<Box
							sx={{
								display: 'flex',
								gap: 1,
								width: '100%',
								flexWrap: 'wrap',
								justifyContent: 'center',
								flexDirection: 'column',
							}}
						>
							{props.imageList.map((image, index) => (
								<img
									src={image}
									style={{
										width: '60%',
										height: '70%',
										objectFit: 'contain',
										alignSelf: 'center',
									}}
								/>
							))}

						</Box>
					)}
				{props.created_at && (
					<Typography variant="body1">
						{moment(props.created_at).format('YYYY-MM-DD')}
					</Typography>
				)}


			</Box>
		</Box>
	);
};

export default AccordianBox;
