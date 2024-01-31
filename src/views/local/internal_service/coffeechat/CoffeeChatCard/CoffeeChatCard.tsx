import React from 'react';

import { Avatar, Box, BoxProps, Typography } from '@mui/material';
import { useRouter } from 'next/router';

interface ICoffeeChatCardProps {
	isExpand?: boolean;
	profileImage?: string;
	userType?: string;
	name?: string;
	level?: string;
	companyName?: string;
	description?: string;
	career?: string[];
	mainField?: string[];
	special?: boolean;
	id?: number;
}

const CoffeeChatCard = (props: ICoffeeChatCardProps) => {
	const router = useRouter();

	return (
		<Box
			p={3}
			bgcolor={'white'}
			borderRadius={5}
			minWidth={props.isExpand ? 780 : 0}
			width={props.isExpand ? 780 : 'auto'}
			sx={{
				transition: 'all 0.3s ease-in-out',
				'&:hover': {
					cursor: 'pointer',
					boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.1)',
				},
			}}
			onClick={() =>
				router.push(
					`/internal_service/coffeechat/${props.id}?special=${props.special}`
				)
			}
		>
			{/* 프로필 사진 및 신상 */}
			<Box
				display={'flex'}
				flexDirection={props.isExpand ? 'row' : 'column'}
				gap={2}
				alignItems={props.isExpand ? 'center' : 'flex-start'}
				mb={props.isExpand ? 0 : 3}
			>
				<Avatar
					src={props.profileImage}
					sx={{
						width: props.isExpand ? 88 : 66,
						height: props.isExpand ? 88 : 66,
					}}
				/>
				<Box
					display={'flex'}
					flexDirection={'column'}
					gap={0.5}
					alignItems={'flex-start'}
				>
					<Typography color={'primary'} fontWeight={'600'}>
						{props.userType}
					</Typography>
					<Typography fontWeight={'bold'} variant="h4">
						{props.companyName}
					</Typography>
					<Typography
						display={'flex'}
						alignItems={'baseline'}
						gap={0.5}
						variant="h6"
					>
						{props.name}
						<Typography>{props.level}</Typography>
					</Typography>
				</Box>
			</Box>
			{/* 경력 */}
			{props.isExpand === true && (
				<Box my={3}>
					{props.career?.map((career) => (
						<Typography lineHeight={1.4} variant="body2">
							&#8226; {career}
						</Typography>
					))}
				</Box>
			)}
			{/* 디스크립션 */}
			<Box minHeight={80}>
				<Typography lineHeight={1.3} variant="subtitle2">
					{props.description}
				</Typography>
			</Box>
			{/* 주요분야 */}
			<Box display={'flex'}>
				{props.mainField?.map((field, idx) => (
					<Typography variant="body2">
						{field}
						<Typography
							variant="body2"
							display={
								idx === props.mainField.length - 1
									? 'none'
									: 'inline'
							}
						>
							{' '}
							,
						</Typography>
					</Typography>
				))}
			</Box>
		</Box>
	);
};

export default CoffeeChatCard;
