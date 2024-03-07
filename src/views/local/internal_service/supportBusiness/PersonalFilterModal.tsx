import React from 'react';

import { Box, BoxProps, Grid, Typography } from '@mui/material';
import SupportiModal from '../../../global/SupportiModal';
import SupportiButton from '../../../global/SupportiButton';
import useAlert from '../../../../hooks/useAlert/useAlert';
import { SupportiAlertModal } from '../../../global/SupportiAlertModal';
import DefaultController from '@leanoncompany/supporti-ark-office-project/src/controller/default/DefaultController';
import { useAppMember } from '../../../../hooks/useAppMember';
import { ISupportBusinessFilter } from '../../../../../pages/internal_service/government/research';
import {
	applicationTarget,
	region,
	startUpPeriod,
	supportField,
} from '../../../../../configs/data/SupportBusinessConfig';
import SupportiInput from '../../../global/SupportiInput';

interface ISupportBusinessModalProps {
	modalOpen: boolean;
	setModalOpen: React.Dispatch<boolean>;
	additionalFunction?: any;
}

const PersonalFilterModal = (props: ISupportBusinessModalProps) => {
	//* Hooks
	const { open, setOpen, setType, type } = useAlert({});
	const { memberId } = useAppMember();
	//* Controller
	const supportBusinessConfigController = new DefaultController(
		'SupportBusinessConfig'
	);

	//* STATE

	/**
	 * 업데이트 여부
	 */
	const [update, setUpdate] = React.useState<number>();
	/**
	 * 필터
	 */
	const [filter, setFilter] = React.useState<ISupportBusinessFilter>({
		biz_pbanc_nm: '',
		supt_biz_clsfc: '전체',
		supt_regin: '전체',
		aply_trgt: '전체',
		biz_enyy: '전체',
	});
	/**
	 * 알림톡 여부
	 */
	const [alimTalk, setAlimTalk] = React.useState<boolean>(true);
	//* Constants
	const selectableConfig = [
		{
			label: '지원 분야',
			value: filter.supt_biz_clsfc,
			setValue: (e) => {
				setFilter({ ...filter, supt_biz_clsfc: e });
			},
			dataList: supportField,
		},
		{
			label: '지원 지역',
			value: filter.supt_regin,
			setValue: (e) => {
				setFilter({ ...filter, supt_regin: e });
			},
			dataList: region,
		},
		{
			label: '지원 대상',
			value: filter.aply_trgt,
			setValue: (e) => {
				setFilter({ ...filter, aply_trgt: e });
			},
			dataList: applicationTarget,
		},
		{
			label: '기업 업력',
			value: filter.biz_enyy,
			setValue: (e) => {
				setFilter({ ...filter, biz_enyy: e });
			},
			dataList: startUpPeriod,
		},
	];
	//* Functions
	/**
	 * 생성
	 */
	const saveSupportBusinessConfig = () => {
		supportBusinessConfigController.createItem(
			{
				APP_MEMBER_IDENTIFICATION_CODE: memberId,
				FIELD: filter.supt_biz_clsfc,
				REGION: filter.supt_regin,
				TARGET: filter.aply_trgt,
				BUSINESS_HISTORY: filter.biz_enyy,
				ALIMTALK_YN: alimTalk ? 'Y' : 'N',
			},
			(res) => {
				setType('successCreateAxios');
				setOpen(true);
			},
			(err) => {
				setType('failAxios');
				setOpen(true);
			}
		);
	};
	/**
	 * 업데이트
	 */
	const updateSupportBusinessConfig = (save) => {
		supportBusinessConfigController.updateItem(
			{
				SUPPORT_BUSINESS_CONFIG_IDENTIFICATION_CODE: update,
				FIELD: filter.supt_biz_clsfc,
				REGION: filter.supt_regin,
				TARGET: filter.aply_trgt,
				BUSINESS_HISTORY: filter.biz_enyy,
				ALIMTALK_YN: alimTalk ? 'Y' : 'N',
			},
			(res) => {
				setType('successModifyAxios');
				setOpen(true);
			},
			(err) => {
				setType('failAxios');
				setOpen(true);
			}
		);
	};
	/**
	 * 가져오기
	 */
	const getSupportBusinessConfig = () => {
		supportBusinessConfigController.getOneItemByKey(
			{
				APP_MEMBER_IDENTIFICATION_CODE: memberId,
			},
			(res) => {
				if (res.data.result) {
					setUpdate(
						res.data.result
							.SUPPORT_BUSINESS_CONFIG_IDENTIFICATION_CODE
					);
					setFilter({
						supt_biz_clsfc: res.data.result.FIELD,
						supt_regin: res.data.result.REGION,
						aply_trgt: res.data.result.TARGET,
						biz_enyy: res.data.result.BUSINESS_HISTORY,
						biz_pbanc_nm: '',
					});
					setAlimTalk(
						res.data.result.ALIMTALK_YN === 'Y' ? true : false
					);
				}
			}
		);
	};

	//* Hooks
	/**
	 * 저장된 지원사업 조회
	 */
	React.useEffect(() => {
		if (memberId) {
			getSupportBusinessConfig();
		}
	}, [memberId]);

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
				{/* 제목 */}
				<Box display={'flex'} flexDirection={'column'} mb={3}>
					<Typography variant={'h5'} fontWeight={700}>
						지원사업 필터 설정
					</Typography>
					<Typography color={'gray'} my={2}>
						아래에서 지원사업에 대한 필터를 저장하면 서포티에서
						필터와 일치하는 지원사업을 추천해드립니다.
					</Typography>
					{/* 필터 선택 */}
					<Box display={'flex'} flexWrap={'wrap'} gap={1}>
						{selectableConfig.map((item, index) => {
							return (
								<Box
									display={'flex'}
									flexDirection={'column'}
									width={{ xs: '100%', md: '49%' }}
									gap={1}
								>
									<Typography color={'gray'} fontWeight={500}>
										{item.label}
									</Typography>
									<SupportiInput
										dataList={item.dataList}
										value={item.value}
										setValue={item.setValue}
										type="select"
										width={'100%'}
									/>
								</Box>
							);
						})}
					</Box>
					{/* 알림톡 */}
					<SupportiInput
						type="checkbox"
						value={alimTalk}
						setValue={(e) => setAlimTalk(e)}
						label="알림톡 수신 (내가 저장한 관심사업 알림)"
					/>
				</Box>
				{/* 저장 버튼 */}
				<SupportiButton
					variant={'contained'}
					isGradient
					contents={update ? '수정하기' : '저장하기'}
					onClick={() => {
						if (update) {
							updateSupportBusinessConfig(update);
						} else {
							saveSupportBusinessConfig();
						}
					}}
				/>
			</Box>
			<SupportiAlertModal
				open={open}
				handleClose={() => setOpen(false)}
				type={type}
				customHandleClose={() => {
					if (
						type === 'successCreateAxios' ||
						type === 'successModifyAxios'
					) {
						props.additionalFunction(filter);
					}
					props.setModalOpen(false);
				}}
			/>
		</SupportiModal>
	);
};

export default PersonalFilterModal;
