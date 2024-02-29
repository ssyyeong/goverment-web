import React from 'react';

import { Box, BoxProps, Grid, Typography } from '@mui/material';
import SupportiModal from '../../../global/SupportiModal';
import TurnedInNotIcon from '@mui/icons-material/TurnedInNot';
import TurnedInIcon from '@mui/icons-material/TurnedIn';
import SupportiButton from '../../../global/SupportiButton';
import moment from 'moment';
import useAlert from '../../../../hooks/useAlert/useAlert';
import { SupportiAlertModal } from '../../../global/SupportiAlertModal';
import DefaultController from '@leanoncompany/supporti-ark-office-project/src/controller/default/DefaultController';
import { useAppMember } from '../../../../hooks/useAppMember';

interface ISupportBusinessModalProps {
	modalOpen: boolean;
	setModalOpen: React.Dispatch<boolean>;
	supportBusiness: any;
}

const SupportBusinessModal = (props: ISupportBusinessModalProps) => {
	//* Hooks
	const { open, setOpen } = useAlert({});
	const { memberId } = useAppMember();
	//* Controller
	const userSupportBusinessController = new DefaultController(
		'UserSupportBusiness'
	);

	//* STATE
	/**
	 * 저장여부
	 */
	const [saved, setSaved] = React.useState<boolean>(false);
	/**
	 * 업데이트 여부
	 */
	const [update, setUpdate] = React.useState<number>();

	//* Functions
	/**
	 * 생성
	 */
	const saveSupportBusiness = () => {
		userSupportBusinessController.createItem(
			{
				APP_MEMBER_IDENTIFICATION_CODE: memberId,
				DETAIL_URL: props.supportBusiness.detl_pg_url,
				DEAD_LINE_DATE: moment(props.supportBusiness.pbanc_rcpt_end_dt),
				DATA: JSON.stringify(props.supportBusiness),
				SAVED_YN: 'Y',
			},
			(res) => {
				setSaved(true);
			}
		);
	};
	/**
	 * 업데이트
	 */
	const updateSupportBusiness = (save) => {
		userSupportBusinessController.updateItem(
			{
				USER_SUPPORT_BUSINESS_IDENTIFICATION_CODE: update,
				SAVED_YN: save,
			},
			(res) => {
				save === 'Y' ? setSaved(true) : setSaved(false);
			}
		);
	};

	//* Hooks
	/**
	 * 저장된 지원사업 조회
	 */
	React.useEffect(() => {
		if (memberId && props.supportBusiness) {
			userSupportBusinessController.getOneItemByKey(
				{
					APP_MEMBER_IDENTIFICATION_CODE: memberId,
					DETAIL_URL: props.supportBusiness.detl_pg_url,
				},
				(res) => {
					if (res.data.result) {
						setUpdate(
							res.data.result
								.USER_SUPPORT_BUSINESS_IDENTIFICATION_CODE
						);
						if (res.data.result.SAVED_YN === 'Y') {
							setSaved(true);
						} else {
							setSaved(false);
						}
					}
				}
			);
		}
	}, [props.supportBusiness, memberId]);

	return (
		<SupportiModal
			open={props.modalOpen}
			handleClose={() => {
				props.setModalOpen(false);
			}}
			style={{
				width: { xs: '100%', md: '55%' },
			}}
			activeHeader={false}
		>
			<Box display={'flex'} width={'100%'} flexDirection={'column'}>
				{/* 제목, 저장 */}
				<Box
					display={'flex'}
					width={'100%'}
					justifyContent={'space-between'}
					alignItems={'center'}
					mb={3}
				>
					<Box>
						<Typography
							color={'primary'}
							sx={{ mb: 1 }}
							fontWeight={'700'}
						>
							{props.supportBusiness.supt_biz_clsfc}
						</Typography>
						<Typography variant="h4" fontWeight={'700'}>
							{props.supportBusiness.biz_pbanc_nm}
						</Typography>
					</Box>
					{saved ? (
						<TurnedInIcon
							onClick={() => {
								update
									? updateSupportBusiness('N')
									: saveSupportBusiness();
							}}
						/>
					) : (
						<TurnedInNotIcon
							onClick={() => {
								update
									? updateSupportBusiness('Y')
									: saveSupportBusiness();
							}}
						/>
					)}
				</Box>
				{/* 내용 */}
				<Grid container>
					<Grid item xs={12} md={6} mb={2}>
						<Box display={'flex'} flexDirection={'column'} gap={1}>
							<Typography color={'gray'}>
								소관부처,지자체
							</Typography>
							<Typography>
								{props.supportBusiness.pbanc_ntrp_nm}
							</Typography>
						</Box>
					</Grid>
					<Grid item xs={12} md={6} mb={2}>
						<Box display={'flex'} flexDirection={'column'} gap={1}>
							<Typography color={'gray'}>사업수행기관</Typography>
							<Typography>
								{props.supportBusiness.sprv_inst}(Tel.
								{props.supportBusiness.prch_cnpl_no})
							</Typography>
						</Box>
					</Grid>
					<Grid item xs={12} md={6} mb={2}>
						<Box display={'flex'} flexDirection={'column'} gap={1}>
							<Typography color={'gray'}>지역</Typography>
							<Typography>
								{props.supportBusiness.supt_regin}
							</Typography>
						</Box>
					</Grid>
					<Grid item xs={12} md={6} mb={2}>
						<Box display={'flex'} flexDirection={'column'} gap={1}>
							<Typography color={'gray'}>신청기간</Typography>
							<Typography>
								{moment(
									props.supportBusiness.pbanc_rcpt_bgng_dt
								).format('YYYY.MM.DD')}
								-
								{moment(
									props.supportBusiness.pbanc_rcpt_end_dt
								).format('YYYY.MM.DD')}
							</Typography>
						</Box>
					</Grid>
					<Grid item xs={12} md={6} mb={2}>
						<Box display={'flex'} flexDirection={'column'} gap={1}>
							<Typography color={'gray'}>지원대상</Typography>
							<Typography>
								{props.supportBusiness.aply_trgt}
							</Typography>
						</Box>
					</Grid>
					<Grid item xs={12} md={12} mb={2}>
						<Box display={'flex'} flexDirection={'column'} gap={1}>
							<Typography color={'gray'}>개요</Typography>
							<Typography lineHeight={1.5}>
								{props.supportBusiness.pbanc_ctnt}
							</Typography>
						</Box>
					</Grid>
					<Grid item xs={12} md={12} mb={2}>
						<Box display={'flex'} flexDirection={'column'} gap={1}>
							<Typography color={'gray'}>모집내용</Typography>
							<Typography lineHeight={1.5}>
								{props.supportBusiness.aply_trgt_ctnt}
							</Typography>
						</Box>
					</Grid>
				</Grid>
				{/* 이동 */}
				<SupportiButton
					contents={'자세히 보러가기'}
					onClick={() => {
						props.supportBusiness.biz_gdnc_url
							? window.open(
									props.supportBusiness.biz_gdnc_url,
									'_blank'
							  )
							: window.open(
									props.supportBusiness.detl_pg_url,
									'_blank'
							  );
					}}
					variant="contained"
					isGradient
					style={{ width: '100%', margin: 'auto', mt: 2 }}
				/>
			</Box>
			<SupportiAlertModal
				open={open}
				handleClose={() => setOpen(false)}
				type="unReady"
			/>
		</SupportiModal>
	);
};

export default SupportBusinessModal;
