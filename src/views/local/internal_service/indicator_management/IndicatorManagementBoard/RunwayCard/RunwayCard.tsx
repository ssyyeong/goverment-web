import React from 'react';

import { Box, BoxProps, IconButton, Tooltip, Typography } from '@mui/material';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
interface IRunwayCardProps {
	runway: number;
}

const RunwayCard = (props: IRunwayCardProps) => {
	//* State
	const [runwayType, setRunwayType] = React.useState<string>('stable');
	//* Constants
	const runwayCardConfig = {
		stable: {
			title: '안정적으로 운영되고 있어요.',
			color: '#1DC861',
			subColor: '#F2FFF7',
			description: [
				'현재 자금이나 성장세 등 문제가 없는 상황입니다.',
				'공격적으로 운영하는 편이며 넘버들도 빠르게 성장하고 있습니다.',
				'돈도 빠르게 태워가고 있습니다.',
			],
			icons: '/images/main/stable.png',
		},
		caution: {
			title: '보수적으로 운영해야 해요.',
			color: '#FFC736',
			subColor: '#FFFEEA',
			description: [
				'매출이 잘 나오지 않는 상황이며 지출이 많은 편 입니다.',
				'현금 보유량이 적은 상황입니다.',
				' 자금이 불안정하여 주의가 필요합니다.',
			],
			icons: '/images/main/caution.png',
		},
		danger: {
			title: '위험하게 운영되고 있어요.',
			color: '#F64852',
			subColor: '#FFF2F2',
			description: [
				'현금으로 버틸 수 있는 기간이 얼마 남지 않은 상황입니다.',
				'비용을 최대한 줄여야 합니다.',
				'투자 유치를 무조건 받아야 합니다.',
			],
			icons: '/images/main/danger.png',
		},
	};
	//* Hooks
	React.useEffect(() => {
		if (isNaN(props.runway)) {
			setRunwayType('danger');
		}
		if (props.runway < 0) {
			setRunwayType('stable');
		} else {
			if (props.runway >= 6) {
				setRunwayType('stable');
			} else if (props.runway >= 3) {
				setRunwayType('caution');
			} else {
				setRunwayType('danger');
			}
		}
	}, [props.runway]);

	console.log(props.runway);

	return (
		<Box
			display={'flex'}
			flexDirection={{ xs: 'column', md: 'row' }}
			p={4}
			borderRadius={3}
			border={`1px solid ${runwayCardConfig[runwayType].color}`}
			bgcolor={runwayCardConfig[runwayType].subColor}
			// justifyContent={'center'}
			gap={{ xs: 2, md: 4 }}
			alignItems={'center'}
			width={'100%'}
			position={'relative'}
		>
			<Tooltip
				title="해당 데이터는 현재의 현금흐름(Net Burn Rate)을 기반으로 최근 6개월간의 데이터를 가지고 예측된 데이터입니다. 실제 상황과 다를 수 있습니다."
				sx={{
					position: 'absolute',
					top: 5,
					right: 5,
				}}
			>
				<IconButton>
					<HelpOutlineIcon />
				</IconButton>
			</Tooltip>
			{/* 아이콘 */}
			<Box>
				<img src={runwayCardConfig[runwayType].icons} alt="icon" />
			</Box>
			{/* 설명 */}
			<Box display={'flex'} flexDirection={'column'}>
				<Typography
					fontSize={20}
					fontWeight={800}
					color={runwayCardConfig[runwayType].color}
					variant="h4"
					textAlign={{ xs: 'center', md: 'left' }}
				>
					{runwayCardConfig[runwayType].title}
				</Typography>

				{!isNaN(props.runway) && (
					<Typography
						fontSize={14}
						color={'grey'}
						mt={1}
						lineHeight={1.5}
						textAlign={{ xs: 'center', md: 'left' }}
					>
						Runway가{' '}
						{props.runway < 0 ? '∞' : Math.ceil(props.runway)}
						개월 남았습니다.
					</Typography>
				)}
				<Box display={'flex'} flexDirection={'column'} gap={1} mt={2}>
					{runwayCardConfig[runwayType].description.map(
						(desc, index) => (
							<Box
								key={index}
								display={'flex'}
								alignItems={'center'}
								gap={1}
							>
								<Typography
									color={runwayCardConfig[runwayType].color}
								>
									&#10004;
								</Typography>
								<Typography>{desc}</Typography>
							</Box>
						)
					)}
				</Box>
			</Box>
		</Box>
	);
};

export default RunwayCard;
