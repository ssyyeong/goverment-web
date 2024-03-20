import React, { useEffect, useState } from 'react';

import { Box, BoxProps, Typography } from '@mui/material';
import SupportiModal from '../../../../global/SupportiModal';
import SupportiButton from '../../../../global/SupportiButton';
import axios from 'axios';
import { usePagination } from '../../../../../hooks/usePagination';
import SupportiPagination from '../../../../global/SupportiPagination';
import SupportiInput from '../../../../global/SupportiInput';
import SupportiTable from '../../../../global/SupportiTable';
import { TableHeaderProps } from '../../../../global/SupportiTable/SupportiTable';

interface ISupportSearchModalProps {
	supportBusiness: any;
	setSupportBusiness: any;
}

const SupportSearchModal = (props: ISupportSearchModalProps) => {
	//* States
	const [modalOpen, setModalOpen] = useState(false);
	const [title, setTitle] = useState('');
	/**
	 * 검색 데이터
	 */
	const [searchData, setSearchData] = useState<any>(null);
	//* Constants
	const key =
		'NJQXofPHOFlkFdZfoS/qDsBSmGIeP7v2gjzAhMYVhOahymMgClK76IrVN7Xhn2rOeISUl/24QzzM7w7Dp3RpNQ==';

	const supportBusinessHeaderData: TableHeaderProps[] = [
		{
			label: 'NO',
			value: '',
			format: (value, key, idx) => {
				return page * 10 + (idx + 1);
			},
			align: 'left',
		},
		{
			label: '제목',
			value: 'biz_pbanc_nm',
			align: 'center',
		},
		{
			label: '업력',
			value: 'biz_enyy',
			align: 'center',
		},
		{
			label: '지원분야',
			value: 'supt_biz_clsfc',
			align: 'center',
		},
		{
			label: '운영기관',
			value: 'pbanc_ntrp_nm',
			align: 'center',
		},
		{
			label: '지역',
			value: 'supt_regin',
			align: 'center',
		},
	];
	//* Functions
	/**
	 * 창업진흥원 지원 사업 조회
	 */
	const getSupportBusiness = async (filter, setData, page) => {
		console.log(filter);
		// console.log(filteredFilter);
		const url = `https://apis.data.go.kr/B552735/kisedKstartupService/getAnnouncementInformation?serviceKey=${key}&page=${page}&perPage=7&returnType=json`;

		const encodingName = encodeURI(`cond[biz_pbanc_nm::LIKE]=${filter}`);

		const encoding = `${encodingName}`;

		await axios
			.get(url + '&' + encoding)
			.then((res) => {
				console.log(res);
				setData(res.data);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	/**
	 * 페이지네이션
	 */
	const { page, limit, handlePageChange, setLimit, setPage } =
		usePagination();

	//* Hooks
	useEffect(() => {
		if (modalOpen) {
			getSupportBusiness(title, setSearchData, page);
		}
	}, [modalOpen]);

	return (
		<SupportiModal
			open={modalOpen}
			handleClose={() => {
				setModalOpen(false);
			}}
			title={'지원사업 검색'}
			style={{
				width: { xs: '100%', md: '55%' },
				// pt: 5,
			}}
			activeHeader={true}
			modalButtonElement={
				<SupportiButton
					contents={'지원사업 검색'}
					onClick={() => setModalOpen(true)}
					variant="contained"
					isGradient
				/>
			}
		>
			<Box width={'100%'}>
				{/* 검색창 */}
				<Box mt={1} display={'flex'} flexDirection={'column'} gap={1}>
					<Typography color={'gray'} fontWeight={500}>
						지원사업명
					</Typography>
					<SupportiInput
						type="search"
						value={title}
						setValue={(e) => {
							setTitle(e);
						}}
						additionalProps={{
							placeholder: '지원사업명을 검색하세요',
						}}
						width={'99%'}
						style={{ bgcolor: 'white' }}
						btnOnClick={() => {
							getSupportBusiness(title, setSearchData, 1);
							if (page !== 1) {
								handlePageChange(1);
							}
						}}
					/>
				</Box>

				{/* 테이블 */}
				{searchData && (
					<Box width={'100%'} mt={2}>
						<Box
							display={'flex'}
							justifyContent={'space-between'}
							alignItems={'center'}
							mb={1}
						>
							<Typography color={'gray'}>
								{' '}
								총 {searchData?.matchCount}건
							</Typography>
						</Box>
						<SupportiTable
							rowData={searchData?.data}
							headerData={supportBusinessHeaderData}
							onClick={(row) => {
								props.setSupportBusiness({
									...props.supportBusiness,
									DATA: JSON.stringify(row),
									TITLE: row.biz_pbanc_nm,
									FIELD: row.supt_biz_clsfc,
								});
								setModalOpen(false);
							}}
							style={{
								tablecell: {
									sx: {
										overflow: 'hidden',
										textOverflow: 'ellipsis',
										whiteSpace: 'nowrap',
									},
								},
							}}
						/>
					</Box>
				)}
				{/* 페이지 네이션 */}
				{searchData && (
					<Box width={'100%'} p={2}>
						<SupportiPagination
							limit={7}
							setLimit={setLimit}
							page={page}
							handlePageChange={handlePageChange}
							count={searchData?.matchCount}
							useLimit={false}
						/>
					</Box>
				)}
			</Box>
		</SupportiModal>
	);
};

export default SupportSearchModal;
