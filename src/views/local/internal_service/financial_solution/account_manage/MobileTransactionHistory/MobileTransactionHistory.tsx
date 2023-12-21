import React from 'react';

import { Box, BoxProps, Grid, Typography, Checkbox } from '@mui/material';
import moment from 'moment';

interface IMobileTransactionHistoryProps {
	checked: boolean;
	onClick: () => void;
	transactionDate: Date;
	traderBank: string;
	traderName: string;
	transactionType: string;
	transactionAmount: number;
	balance: number;
}

const MobileTransactionHistory = (props: IMobileTransactionHistoryProps) => {
	return (
		<Grid
			container
			p={1}
			display={'flex'}
			alignItems={'flex-start'}
			pb={2}
			borderBottom={'1px solid #cccccc6a'}
		>
			<Grid item xs={1.5} display={'flex'} alignItems={'baseline'}>
				<Checkbox
					checked={props.checked}
					onClick={props.onClick}
					sx={{ m: 0 }}
					size="small"
				/>
			</Grid>
			<Grid item xs={6.5}>
				<Typography
					color={'secondary.main'}
					fontWeight={'600'}
					sx={{ mb: 0.5 }}
				>
					{`${moment(props.transactionDate).format('YY.MM.DD')} | ${
						props.traderBank
					}`}
				</Typography>
				<Typography variant="subtitle1" fontWeight={'600'} noWrap>
					{props.traderName}
				</Typography>
			</Grid>
			<Grid
				item
				xs={4}
				display={'flex'}
				flexDirection={'column'}
				alignItems={'flex-end'}
				gap={0.5}
			>
				<Typography color={'secondary.main'} fontWeight={'600'}>
					{props.transactionType}
				</Typography>
				<Typography
					variant="subtitle1"
					fontWeight={'600'}
					color={
						props.transactionType === '입금'
							? 'primary.main'
							: 'error.main'
					}
				>
					{props.transactionType === '입금' ? '+' : '-'}{' '}
					{props.transactionAmount.toLocaleString()}
				</Typography>
				<Typography>
					잔액{` ${props.balance.toLocaleString()}`}
				</Typography>
			</Grid>
		</Grid>
	);
};

export default MobileTransactionHistory;
