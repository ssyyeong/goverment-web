import React from 'react';

import { Box, BoxProps, Typography } from '@mui/material';
import SupportiModal from '../../../../../global/SupportiModal';
import SupportiInput from '../../../../../global/SupportiInput';
import SupportiButton from '../../../../../global/SupportiButton';

interface IInvestmentModalProps {
	modalOpen: boolean;
	setModalOpen: React.Dispatch<boolean>;
	investment: number;
	setInvestment: React.Dispatch<number>;
}

const InvestmentModal = (props: IInvestmentModalProps) => {
	//* State
	const [investment, setInvestment] = React.useState<number>();

	return (
		<SupportiModal
			open={props.modalOpen}
			handleClose={() => {
				props.setModalOpen(false);
			}}
			title={'예상 투자금액'}
			style={{
				width: { xs: '100%', md: '35%' },
			}}
			activeHeader={true}
		>
			<Box display={'flex'} width={'100%'} flexDirection={'column'}>
				<Typography
					color={'green'}
					px={{ xs: 2, md: 0 }}
					lineHeight={2}
				>
					⚠ 예상 투자금을 입력하여 런웨이를 계산해보세요.
				</Typography>
				<Typography
					color={'grey'}
					px={{ xs: 2, md: 0 }}
					mb={3}
					lineHeight={1.5}
				>
					예상 투자금을 입력하시면 런웨이를 계산해보실 수 있습니다.
					해당데이터는 저장되지 않습니다.
				</Typography>
				<Typography mb={1}>예상투자금</Typography>
				<SupportiInput
					value={investment}
					setValue={(e) => {
						setInvestment(e);
					}}
					type="number"
					additionalProps={{
						placeholder: '예상투자금을 입력하세요',
					}}
					style={{ mb: 3 }}
				/>
				<SupportiButton
					variant="contained"
					isGradient
					onClick={() => {
						props.setInvestment(investment);
						props.setModalOpen(false);
					}}
					contents={'확인하기'}
				/>
			</Box>
		</SupportiModal>
	);
};

export default InvestmentModal;
