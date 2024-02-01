import React, { useEffect } from 'react';

import {
	Box,
	BoxProps,
	Grid,
	IconButton,
	Switch,
	Typography,
} from '@mui/material';
import SupportiModal from '../../../../global/SupportiModal';
import { Thumbnail } from '@leanoncompany/supporti-react-ui';
import ImageUploader from '@leanoncompany/supporti-ark-office-project/src/ui/local/input/ImageUploader';
import { businessSector } from '../../../../../../configs/data/BusinessConfig';
import SupportiInput from '../../../../global/SupportiInput';
import SupportiButton from '../../../../global/SupportiButton';
import DefaultController from '@leanoncompany/supporti-ark-office-project/src/controller/default/DefaultController';
import { useAppMember } from '../../../../../hooks/useAppMember';
import { ICoffeeChatProfile } from '../../../../../@types/model';
import { v4 as uuidv4 } from 'uuid';

interface ICoffeeChatProfileModalProps {
	open: boolean;
	handleClose: () => void;
	setTriggerKey?: (key: string) => void;
}

const CoffeeChatProfileModal = (props: ICoffeeChatProfileModalProps) => {
	//* State
	/**
	 * 이미지용 상태 관리
	 */
	const [attachedFiles, setAttachedFiles] = React.useState<any[]>([]);
	const [imagePreviewUrlList, setImagePreviewUrlList] = React.useState<any[]>(
		[]
	);
	/**
	 * 프로필 정보
	 */
	const [profile, setProfile] = React.useState<ICoffeeChatProfile>({
		MAIN_FIELD: [],
		INTEREST_FIELD: [],
		SUBJECT: [],
		CAREER: [],
		OFFER_YN: 'N',
		PROFILE_IMAGE: '',
		COMPANY_NAME: '',
		ROLE: '',
		INTRODUCE: '',
		DESCRIPTION: '',
	} as ICoffeeChatProfile);
	/**
	 * 페이지
	 */
	const [page, setPage] = React.useState<number>(0);
	/**
	 * 업데이트
	 */
	const [update, setUpdate] = React.useState<boolean>(false);
	//* Controller
	const coffeeChatProfileController = new DefaultController(
		'CoffeeChatProfile'
	);
	//* Constants
	/**
	 * 프로필 데이터 for Every
	 */
	const profileDataConfig = [
		{
			label: '회사명',
			value: profile.COMPANY_NAME,
			additionalProps: {
				placeholder: '회사명을 입력해주세요',
			},
			essential: true,
			setValue: (value: string) =>
				setProfile({ ...profile, COMPANY_NAME: value }),
			grid: {
				xs: 12,
				sm: 5.8,
			},
		},
		{
			label: '직책',
			value: profile.ROLE,
			additionalProps: {
				placeholder: '직책을 입력해주세요',
			},
			essential: true,
			setValue: (value: string) =>
				setProfile({ ...profile, ROLE: value }),
			grid: {
				xs: 12,
				sm: 5.8,
			},
		},
		{
			label: '나를 표현하는 한 문장',
			value: profile.INTRODUCE,
			essential: true,
			additionalProps: {
				placeholder: '나를 표현하는 한 문장을 입력해주세요',
			},
			setValue: (value: string) =>
				setProfile({ ...profile, INTRODUCE: value }),
			grid: {
				xs: 12,
			},
		},
		{
			label: '경력',
			value: profile.CAREER,
			additionalProps: {
				placeholder: '경력을 입력해주세요',
			},
			type: 'addablestringlist',
			setValue: (value: any) => setProfile({ ...profile, CAREER: value }),
			handleAdd: (value: string) =>
				setProfile({ ...profile, CAREER: [...profile.CAREER, value] }),
			handleDelete: (value: string, idx: number) =>
				setProfile({
					...profile,
					CAREER: profile.CAREER.filter(
						(career, index) => index !== idx
					),
				}),
			grid: {
				xs: 12,
			},
		},
		{
			label: '내 주요 분야',
			value: profile.MAIN_FIELD,
			essential: true,
			type: 'multiselect',
			handleChange: (event) => {
				const {
					target: { value },
				} = event;
				setProfile({ ...profile, MAIN_FIELD: value });
			},
			dataList: businessSector,
			grid: {
				xs: 12,
			},
		},
		{
			label: '내 관심 분야',
			essential: true,
			value: profile.INTEREST_FIELD,
			type: 'multiselect',
			handleChange: (event) => {
				const {
					target: { value },
				} = event;
				setProfile({ ...profile, INTEREST_FIELD: value });
			},
			dataList: businessSector,
			grid: {
				xs: 12,
			},
		},
	];
	/**
	 * 프로필 데이터 for 주최자
	 */
	const additionalProfileDataConfig = [
		{
			label: '소개글',
			value: profile.DESCRIPTION,
			type: 'input',
			additionalProps: {
				placeholder: '소개글을 입력해주세요',
				multiline: true,
				rows: 2,
			},

			setValue: (value: string) =>
				setProfile({ ...profile, DESCRIPTION: value }),
			grid: {
				xs: 12,
				sm: 12,
			},
		},
		{
			label: '제안 주제',
			value: profile.SUBJECT,
			essential: true,
			additionalProps: {
				placeholder: '제안 주제를 입력해주세요',
			},
			type: 'addablestringlist',
			setValue: (value: any) =>
				setProfile({ ...profile, SUBJECT: value }),
			handleAdd: (value: string) =>
				setProfile({
					...profile,
					SUBJECT: [...profile.SUBJECT, value],
				}),
			handleDelete: (value: string, idx: number) =>
				setProfile({
					...profile,
					SUBJECT: profile.SUBJECT.filter(
						(career, index) => index !== idx
					),
				}),
			grid: {
				xs: 12,
			},
		},
	];

	//* Function
	/**
	 * 프로필 업로드
	 */
	const uploadProfile = () => {
		if (update) {
			//업데이트 일 때
			coffeeChatProfileController.updateItem(
				profile,
				(res) => {
					props.setTriggerKey && props.setTriggerKey(uuidv4());

					setPage(0);
					props.handleClose();
				},
				(err) => {
					console.log(err);
				}
			);
		} else {
			// 생성일때
			coffeeChatProfileController.createItem(
				{ ...profile, APP_MEMBER_IDENTIFICATION_CODE: memberId },
				(res) => {
					props.setTriggerKey && props.setTriggerKey(uuidv4());

					setPage(0);
					props.handleClose();
				},
				(err) => {
					console.log(err);
				}
			);
		}
	};

	//* Hooks
	// 프로필 이미지 변경 시 item.IMAGE 변경
	React.useEffect(() => {
		if (imagePreviewUrlList.length !== 0) {
			setProfile({
				...profile,
				PROFILE_IMAGE:
					imagePreviewUrlList[imagePreviewUrlList.length - 1],
			});
		}
	}, [imagePreviewUrlList]);
	/**
	 * 유저 아이디 가져오는 훅
	 */
	const { memberId } = useAppMember();
	// 기존에 있던 프로필 정보를 불러옴
	useEffect(() => {
		memberId &&
			coffeeChatProfileController.getOneItemByKey(
				{
					APP_MEMBER_IDENTIFICATION_CODE: memberId,
				},
				(res) => {
					if (res.data.result !== null) {
						const data = res.data.result;
						data.CAREER = JSON.parse(data.CAREER);
						data.MAIN_FIELD = JSON.parse(data.MAIN_FIELD);
						data.INTEREST_FIELD = JSON.parse(data.INTEREST_FIELD);
						data.SUBJECT = JSON.parse(data.SUBJECT);
						setProfile(data);
						setUpdate(true);
					}
				},
				(err) => console.log(err)
			);
	}, [memberId]);

	return (
		<SupportiModal
			open={props.open}
			handleClose={() => {
				setPage(0);
				props.handleClose();
			}}
			style={{
				width: { sm: 'fit-content', xs: '100%' },
				maxWidth: { sm: '500px', xs: '100%' },
				maxHeight: '90%',
				height: 'fit-content',
			}}
			activeHeader={true}
			title="커피챗 프로필"
		>
			{/* 페이지 0 - 기본 커피챗 프로필 */}
			{page === 0 && (
				<Box
					px={2}
					width={'100%'}
					sx={{ overflowY: 'auto' }}
					maxHeight={'500px'}
				>
					{/* 프로필 사진 */}
					<Box width={90} position={'relative'} mb={2}>
						<Thumbnail
							src={
								profile?.PROFILE_IMAGE
									? profile?.PROFILE_IMAGE
									: '/images/icons/profile.png'
							}
							width={120}
							borderRadius={'50%'}
						/>{' '}
						{/* 프로필 사진 등록 버튼 */}
						<Box
							position={'absolute'}
							bottom={0}
							right={5}
							zIndex={1}
						>
							<ImageUploader
								attachedFileList={attachedFiles}
								setAttachedFileList={setAttachedFiles}
								imagePreviewUrlList={imagePreviewUrlList}
								setImagePreviewUrlList={setImagePreviewUrlList}
								index={0}
								customButtonRenderCallback={(onClick) => {
									return (
										<img
											src="/images/icons/camera.png"
											alt="camera"
											width={24}
											style={{
												cursor: 'pointer',
											}}
											onClick={onClick}
										/>
									);
								}}
							/>
						</Box>
					</Box>
					<Grid container gap={1} mb={2}>
						{/* 데이터 입력 */}
						{profileDataConfig.map((profile, index) => (
							<Grid item {...profile.grid} key={index}>
								<Typography
									variant="body2"
									fontWeight={'600'}
									sx={{ my: 1 }}
								>
									{profile.label}
									{profile.essential ? '(필수)' : ''}
								</Typography>
								<SupportiInput
									value={profile.value}
									additionalProps={profile.additionalProps}
									setValue={profile.setValue}
									type={profile.type}
									handleChange={profile.handleChange}
									dataList={profile.dataList}
									handleAdd={profile.handleAdd}
									handleDelete={profile.handleDelete}
								/>
							</Grid>
						))}
					</Grid>
					{/* 커피챗 제안받기 */}
					<Box
						display={'flex'}
						justifyContent={'space-between'}
						alignItems={'center'}
						mb={2}
					>
						<Typography
							variant="body2"
							fontWeight={'600'}
							sx={{ my: 1 }}
						>
							커피챗 제안 받기
						</Typography>
						<Switch
							checked={profile.OFFER_YN === 'Y' ? true : false}
							onChange={(e) => {
								if (e.target.checked) {
									setProfile({ ...profile, OFFER_YN: 'Y' });
								} else {
									setProfile({ ...profile, OFFER_YN: 'N' });
								}
							}}
							inputProps={{ 'aria-label': 'controlled' }}
						/>
					</Box>
					<SupportiButton
						contents={'확인'}
						onClick={() => {
							if (
								profile.COMPANY_NAME === '' ||
								profile.ROLE === '' ||
								profile.INTRODUCE === '' ||
								profile.MAIN_FIELD.length === 0 ||
								profile.INTEREST_FIELD.length === 0
							) {
								alert('필수 항목을 입력해주세요');
								return;
							}
							if (profile.OFFER_YN === 'Y') {
								setPage(1);
							} else {
								// 프로필 저장
								uploadProfile();
							}
						}}
						fullWidth
						variant="contained"
					/>
				</Box>
			)}
			{/* 페이지 1 - 추가 커피챗 프로필 */}
			{page === 1 && (
				<Box
					px={2}
					width={'100%'}
					sx={{ overflowY: 'auto' }}
					maxHeight={'500px'}
				>
					<Typography
						variant="subtitle2"
						fontWeight={'500'}
						lineHeight={1.3}
					>
						커피챗 제안 받기를 선택하셨습니다. 몇 가지 간단한 정보만
						더 입력해주시면 이후 추가 설정 없이 커피챗을 이용 하실
						수 있습니다!
					</Typography>
					{/* 데이터 입력 */}
					<Grid container gap={1} my={2}>
						{/* 데이터 입력 */}
						{additionalProfileDataConfig.map((profile, index) => (
							<Grid item {...profile.grid}>
								<Typography
									variant="body2"
									fontWeight={'600'}
									sx={{ my: 1 }}
								>
									{profile.label}
								</Typography>
								<SupportiInput
									value={profile.value}
									additionalProps={profile.additionalProps}
									setValue={profile.setValue}
									type={profile.type}
									handleAdd={profile.handleAdd}
									handleDelete={profile.handleDelete}
								/>
							</Grid>
						))}
					</Grid>
					<SupportiButton
						contents={'확인'}
						onClick={() => {
							if (profile.SUBJECT.length === 0) {
								alert('필수 항목을 입력해주세요');
								return;
							} else {
								// 프로필 저장
								uploadProfile();
							}
						}}
						fullWidth
						variant="contained"
					/>
				</Box>
			)}
		</SupportiModal>
	);
};

export default CoffeeChatProfileModal;
