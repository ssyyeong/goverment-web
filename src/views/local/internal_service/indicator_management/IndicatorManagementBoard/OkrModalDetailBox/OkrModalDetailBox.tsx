import React from 'react';

import { Box, BoxProps, Typography } from '@mui/material';
import SupportiInput from '../../../../../global/SupportiInput';
import CancelIcon from '@mui/icons-material/Cancel';
import SupportiButton from '../../../../../global/SupportiButton';
import { IndicatorUnitConfig } from '../../../../../../../configs/data/IndicatorUnitConfig';

interface IOkrModalDetailBoxProps {
	mode: string;
}

const OkrModalDetailBox = (props: IOkrModalDetailBoxProps) => {
	//* Modules

	//* Constants

	//* States
	const [okrDetailData, setOkrDetailData] = React.useState({
		TITLE: '',
		START_DATE: '',
		END_DATE: '',
		TARGET_AMOUNT: '',
		TARGET_UNIT: '',
		NOTE: '',
	});

	//* Functions

	return (
		<Box
			p={3}
			bgcolor={'secondary.light'}
			borderRadius={2}
			display={'flex'}
			flexDirection={'column'}
			gap={2}
		>
			{props.mode === 'detail' && (
				<Box>
					<Box>
						<Typography>하위목표</Typography>
						{/** length */}
					</Box>
					<SupportiButton
						contents={'하위 목표 추가 +'}
						onClick={() => {}}
						style={{
							height: 5,
							marginTop: 2,
							color: 'black',
						}}
						color={'secondary'}
						variant="outlined"
					/>
				</Box>
			)}
			<Box>
				<Box display={'flex'} justifyContent={'space-between'}>
					<Box display={'flex'}>
						{/** 컬러 칩 */}

						{/** 하위 목표 타이틀 */}
						<SupportiInput
							type="input"
							multiline={true}
							value={okrDetailData.TITLE}
							setValue={(value: string) => {
								setOkrDetailData({
									...okrDetailData,
									TITLE: value,
								});
							}}
							width={'400px'}
							placeholder="하위 목표 타이틀을 입력해주세요."
						/>
					</Box>

					{/** x 아이콘 */}
					<CancelIcon sx={{ color: 'secondary' }} />
				</Box>
				{/** 날짜 선택 */}
				<Box display={'flex'}>
					<SupportiInput
						type="datepicker"
						value="2022-12-20"
						setValue={(value) => {
							setOkrDetailData({
								...okrDetailData,
								START_DATE: value,
							});
						}}
						width={'130px'}
						useIcon={false}
					/>
					<SupportiInput
						type="datepicker"
						value="2022-12-20"
						setValue={(value) => {
							setOkrDetailData({
								...okrDetailData,
								START_DATE: value,
							});
						}}
						width={'130px'}
						useIcon={false}
					/>
				</Box>

				{/** 목표분류 목표양 등록 */}
				<Box display={'flex'} gap={2}>
					{/** 목표분류 */}
					<Box>
						<Typography>목표분류</Typography>
						<SupportiInput
							type="select"
							value={okrDetailData.TARGET_UNIT}
							setValue={(value) => {
								setOkrDetailData({
									...okrDetailData,
									TARGET_UNIT: value,
								});
							}}
							dataList={IndicatorUnitConfig}
							width={'150px'}
						/>
					</Box>
					{/** 목표양 */}
					<Box>
						<Typography>목표양</Typography>
						<Box display={'flex'}>
							<SupportiInput
								type="input"
								value={okrDetailData.TARGET_AMOUNT}
								setValue={(value) => {
									setOkrDetailData({
										...okrDetailData,
										TARGET_AMOUNT: value,
									});
								}}
								width={'150px'}
							/>
							<Box>
								<Typography>만원</Typography>
							</Box>
						</Box>
					</Box>
					{props.mode === 'detail' && (
						<SupportiButton
							contents={'등록하기'}
							onClick={() => {}}
							style={{
								height: '20px',
								width: '100px',
							}}
							color={'primary'}
							variant="contained"
							isGradient={true}
						/>
					)}
				</Box>
			</Box>
		</Box>
	);
};

export default OkrModalDetailBox;
