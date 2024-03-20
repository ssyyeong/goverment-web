import React, { useEffect, useState } from 'react';

import { Box, BoxProps, Typography } from '@mui/material';
import SupportiModal from '../../../global/SupportiModal';
import SupportiButton from '../../../global/SupportiButton';
import SupportiInput from '../../../global/SupportiInput';

interface ICalculateModalProps {}

const CalculateModal = (props: ICalculateModalProps) => {
	//* States
	const [modalOpen, setModalOpen] = useState(false);
	const [data, setData] = useState({
		salary: 0,
		month: 0,
		percentage: 0,
		number: 0,
		investAmount: 0,
	});

	//* Constants
	//인건비
	const salaryConfig = [
		{
			label: '연봉',
			value: 'salary',
			unit: '원',
		},
		{
			label: '참여 개월',
			value: 'month',
			unit: '개월',
		},
		{
			label: '참여율',
			value: 'percentage',
			unit: '%',
		},
		{
			label: '인원수',
			value: 'number',
			unit: '명',
		},
	];
	//현금
	const cashConfig = [
		{
			label: '지원금',
			value: 'investAmount',
			input: true,
			unit: '원',
		},
		{
			label: '최대 정부 지원금',
			value: Math.floor((data.investAmount * 10) / 7),
			unit: '원',
		},
		{
			label: '최소 전체 10%',
			value: Math.floor(data.investAmount / 7).toLocaleString(),
			unit: '현금',
		},
		{
			label: '최소 20% 현물',
			value: Math.floor(data.investAmount / 7 / 2).toLocaleString(),
			unit: '현물',
		},
	];

	//* Hooks
	useEffect(() => {
		if (modalOpen) {
			setData({
				salary: 0,
				month: 0,
				percentage: 0,
				number: 0,
				investAmount: 0,
			});
		}
	}, [modalOpen]);

	return (
		<SupportiModal
			open={modalOpen}
			handleClose={() => {
				setModalOpen(false);
			}}
			title={'현금,현물/인건비 계상하기'}
			style={
				{
					// pt: 5,
				}
			}
			activeHeader={true}
			modalButtonElement={
				<SupportiButton
					contents={'현금,현물/인건비 계상하기'}
					onClick={() => {
						setModalOpen(true);
					}}
				/>
			}
		>
			<Box>
				<Typography variant="h6" fontWeight={'bold'}>
					인건비
				</Typography>
				<Box
					my={2}
					py={2}
					borderTop={'1px solid grey'}
					borderBottom={'1px solid grey'}
				>
					{salaryConfig.map((item, index) => {
						return (
							<Box display={'flex'} alignItems={'center'} gap={2}>
								<Typography>{'>'}</Typography>
								<Typography width={'80px'}>
									{item.label}
								</Typography>
								<SupportiInput
									type="number"
									inputType="number"
									value={data[item.value]}
									setValue={(e) => {
										setData({
											...data,
											[item.value]: e,
										});
									}}
								/>
								<Typography>{item.unit}</Typography>
							</Box>
						);
					})}
				</Box>
				<Typography variant="h6" textAlign={'right'}>
					총액{' '}
					{Math.floor(
						(data.salary / 12) *
							data.month *
							data.percentage *
							0.01 *
							data.number
					).toLocaleString()}{' '}
					원
				</Typography>
				{/* 현금/현물 */}
				<Typography variant="h6" fontWeight={'bold'} mt={2}>
					현금/현물
				</Typography>
				<Box
					my={2}
					py={2}
					borderTop={'1px solid grey'}
					borderBottom={'1px solid grey'}
					display={'flex'}
					flexDirection={'column'}
					gap={3}
				>
					{cashConfig.map((item, index) => {
						return (
							<Box display={'flex'} alignItems={'center'} gap={2}>
								<Typography>{'>'}</Typography>
								<Typography width={'100px'}>
									{item.label}
								</Typography>
								{item.input ? (
									<SupportiInput
										type="number"
										value={data[item.value]}
										setValue={(e) => {
											setData({
												...data,
												[item.value]: e,
											});
										}}
										inputType="number"
									/>
								) : (
									<Typography>{item.value}</Typography>
								)}
								<Typography>{item.unit}</Typography>
							</Box>
						);
					})}
				</Box>
			</Box>
		</SupportiModal>
	);
};

export default CalculateModal;
