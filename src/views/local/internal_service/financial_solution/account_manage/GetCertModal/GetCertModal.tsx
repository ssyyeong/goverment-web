import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import SuppportiModal from '../../../../../global/SuppportiModal';
import SupportiInput from '../../../../../global/SupportiInput';

interface IGetCertModalProps {
	modalOpen: boolean;
	setModalOpen: (open: boolean) => void;
	userAccountInfo: any;
	setUserAccountInfo: any;
	getCert: any;
	certList: any;
	certInfo: any;
	setCertInfo: any;
}

const GetCertModal = (props: IGetCertModalProps) => {
	const [isSelected, setIsSelected] = useState('');

	//* 초과 문자 처리하는 함수
	//* TODO 따로 훅으로 빼기
	const stringSplit = (txt, len, lastTxt) => {
		if (len == '' || len == null) {
			// 기본값
			len = 20;
		}
		if (lastTxt == '' || lastTxt == null) {
			// 기본값
			lastTxt = '...';
		}
		if (txt.length > len) {
			txt = txt.substr(0, len) + lastTxt;
		}
		return txt;
	};

	return (
		<Box>
			<SuppportiModal
				open={props.modalOpen}
				handleClose={() => {
					props.setModalOpen(false);
				}}
				title="공용/금융 인증서 등록"
				style={{
					width: '70%',
				}}
				btnIsGradient
				btnContents="확인"
				children={
					<Box
						width="80%"
						display={'flex'}
						flexDirection={'column'}
						gap={2}
					>
						{/**불러온 인증서 출력하는 섹션 */}
						<Box
							sx={{
								border: '1px solid #c8c8c8',
								width: '100%',
								minHeight: 300,
								padding: 2,
								borderRadius: 1,
							}}
						>
							<Box
								display={'flex'}
								justifyContent={'space-around'}
							>
								<Typography>인증서명</Typography>
								<Typography>만료일</Typography>
								<Typography>발급자</Typography>
								<Typography>위치</Typography>
							</Box>
							{props.certList.map((item, index) => {
								return (
									<Box
										sx={{
											bgcolor:
												isSelected === index
													? 'pink'
													: '#ffffff',
											mt: 2,
											mb: 2,
										}}
										onClick={() => {
											setIsSelected(index);
											props.setCertInfo({
												...props.certInfo,
												path: item.path,
											});
										}}
										display={'flex'}
										justifyContent={'space-around'}
									>
										<Typography>
											{stringSplit(
												item.certName,
												10,
												'...'
											)}
										</Typography>
										<Typography>
											{stringSplit(item.toDt, 10, '...')}
										</Typography>
										<Typography>
											{item.pub === 'SignKorea'
												? '대한민국'
												: item.pub}
										</Typography>
										<Typography>
											{stringSplit(item.path, 15, '...')}
										</Typography>
									</Box>
								);
							})}
						</Box>

						{/** 인증서 암호 입력하는 섹션 */}
						<Box
							display={'flex'}
							flexDirection={'column'}
							gap={1}
							mb={5}
						>
							<Typography>인증서 암호입력</Typography>
							<SupportiInput
								value={props.userAccountInfo.signPw}
								setValue={(value) => {
									props.setUserAccountInfo({
										...props.userAccountInfo,
										hyphenSignPw: value,
									});
								}}
								type="input"
								width={'100%'}
								placeholder="인증서 암호 입력"
							/>
							<Typography>
								안정한 개인정보 관리를 위해 6개월마다 비밀번호를
								변경하기 바랍니다.
							</Typography>
						</Box>
					</Box>
				}
			/>
		</Box>
	);
};

export default GetCertModal;
