import { NextPage } from 'next';
import React, { useEffect, useState } from 'react';

import {
	Box,
	Button,
	Grid,
	IconButton,
	TextField,
	Typography,
} from '@mui/material';

import SupportiButton from '../../../src/views/global/SupportiButton';
import { useRouter } from 'next/router';
import SupportiInput from '../../../src/views/global/SupportiInput';
import LinearProgress from '@mui/material/LinearProgress';
import SupportiTable, {
	TableHeaderProps,
} from '../../../src/views/global/SupportiTable/SupportiTable';

import axios from 'axios';
import FileUploadModal from '../../../src/views/local/common/FileUpModal/FileUpModal';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

type ModalMode = 'create' | 'update';

type SelectedFileType = {
	cmpnCd: string;
	librarySeq: string;
	title: string;
	writerId: string;
	role: string;
	tags: string;
	fileSeq: string;
	file: string;
} | null;

const Page: NextPage = () => {
	const getCompanyHeaderData: TableHeaderProps[] = [
		{
			label: '',
			value: '',
			format: (value, key, idx) => {
				return idx + 1;
			},
			align: 'center',
		},
		{
			label: '제목',
			value: 'title',
			align: 'center',
		},
		{
			label: '태그',
			value: 'tags',
			align: 'center',
		},
		{
			label: '파일명',
			value: 'saveFileName',
			align: 'center',
			customValue: (value) => {
				return value;
			},
			customView: (value) => {
				return (
					<Button
						variant="text"
						sx={{
							textTransform: 'none', // 대문자 변환 방지
							minWidth: 'auto',
							color: 'text.primary',
							'&:hover': {
								color: 'primary.main',
								backgroundColor: 'transparent',
							},
						}}
						onClick={async () => {
							const path = value.path;
							// 파일 다운로드나 다른 동작을 여기에 구현
							const link = document.createElement('a');
							link.href = path;
							link.download = value.saveFileName; // 파일 이름 설정
							document.body.appendChild(link);
							link.click();
							document.body.removeChild(link);
						}}
					>
						{value.saveFileName}
					</Button>
				);
			},
		},
		{
			label: '파일크기',
			value: 'fileSize',
			align: 'center',
			format: (value, key, idx) => {
				return value + ' MB';
			},
		},
		{
			label: '업로더 아이디',
			value: 'cmpnCd',
			align: 'center',
		},

		{
			label: '등록자',
			value: 'mbrNm',
			align: 'center',
		},

		{
			label: '수정',
			value: 'modify',
			align: 'center',
			customValue: (value) => {
				return value;
			},
			customView: (value) => (
				<IconButton
					onClick={() => {
						setModalMode('update');
						setSelectedFile({
							cmpnCd: value.cmpnCd,
							librarySeq: value.librarySeq,
							title: value.title,
							writerId: value.writerId,
							role: value.role,
							tags: value.tags,
							fileSeq: value.fileSeq,
							file: value.saveFileName,
						});
						setIsModalOpen(true);
					}}
					size="small"
					color="primary"
				>
					<EditIcon />
				</IconButton>
			),
		},
		{
			label: '삭제',
			value: 'delete',
			align: 'center',
			customValue: (value) => {
				return value;
			},
			customView: (value) => (
				<IconButton
					onClick={() => {
						deleteData(value.cmpnCd, value.librarySeq);
					}}
					size="small"
					color="primary"
				>
					<DeleteIcon />
				</IconButton>
			),
		},
	];

	const getProjectHeaderData: TableHeaderProps[] = [
		{
			label: '',
			value: '',
			format: (value, key, idx) => {
				return idx + 1;
			},
			align: 'center',
		},
		{
			label: '프로젝트 명',
			value: 'title',
			align: 'center',
		},
		{
			label: '제품명',
			value: 'prdctNm',
			align: 'center',
		},
		{
			label: '대분류',
			value: 'firstProcNm',
			align: 'center',
		},
		{
			label: '소분류',
			value: 'pcText',
			align: 'center',
		},
		{
			label: '구분',
			value: 'prdctType',
			align: 'center',
			format: (value, key, idx) => {
				return '제품';
			},
		},
		{
			label: '파일',
			value: 'saveFileName',
			align: 'center',
		},
		{
			label: '파일크기',
			value: 'fileSize',
			align: 'center',
			format: (value, key, idx) => {
				return value + ' MB';
			},
		},
		{
			label: '협력사',
			value: 'ptnrCd',
			align: 'center',
		},
		{
			label: '등록자',
			value: 'mbrNm',
			align: 'center',
		},

		{
			label: '등록일시',
			value: 'fileTime',
			align: 'center',
		},
	];

	const router = useRouter();

	//* States
	const [tab, setTab] = React.useState<'tab1' | 'tab2'>('tab1');
	const [searchText, setSearchText] = React.useState<string>('');
	const [percentageOfCompany, setPercentageOfCompany] =
		React.useState<number>(0);
	const [usedOfCompany, setUsedOfCompany] = React.useState<number>(0);
	const [percentageTotal, setPercentageTotal] = React.useState<number>(0);
	const [usedTotal, setUsedTotal] = React.useState<number>(0);
	const [total, setTotal] = React.useState<number>(0);

	const [percentageOfProject, setPercentageOfProject] =
		React.useState<number>(0);
	const [usedOfProject, setUsedOfProject] = React.useState<number>(0);
	const [companyFileList, setCompanyFileList] = React.useState<any[]>([]);
	const [projectFileList, setProjectFileList] = React.useState<any[]>([]);

	const [open, setOpen] = React.useState(false);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [modalMode, setModalMode] = useState<ModalMode>('create');
	const [selectedFile, setSelectedFile] = useState<SelectedFileType>(null);

	/**
	 * 용량 가져오기
	 */
	const getStorage = async () => {
		const api =
			'http://lb-cymake-dev-868890701.ap-northeast-2.elb.amazonaws.com:9400/api/srv/pay/dashboard/?cmpnCd=CA007';
		await axios
			.get(api, {
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json',
					Authorization: `Basic bGVhbm9uOmxlYW5vbjIwMjUh`,
				},
				auth: {
					username: 'leanon',
					password: 'leanon2025!',
				},
				withCredentials: true,
			})
			.then((res) => {
				setUsedOfCompany(res.data.data.cmpdUseCapacity);
				setPercentageOfCompany(
					(res.data.data.cmpdUseCapacity / res.data.data.maxStrg) *
						100
				);
				setUsedTotal(res.data.data.presentAllStrg);
				setPercentageTotal(
					(res.data.data.presentAllStrg / res.data.data.maxStrg) * 100
				);
				setTotal(res.data.data.maxStrg);
				setUsedOfProject(res.data.data.projUseCapacity);
				setPercentageOfProject(
					(res.data.data.projUseCapacity / res.data.data.maxStrg) *
						100
				);
			});
	};

	const getFileList = async () => {
		const api =
			'http://lb-cymake-dev-868890701.ap-northeast-2.elb.amazonaws.com:9400/api/';
		const url =
			tab === 'tab1'
				? 'library/cmpn-drive/search'
				: 'library/list/CA007/ca007';
		await axios
			.get(api + url, {
				auth: {
					username: 'leanon',
					password: 'leanon2025!',
				},
				headers: {
					Accept: '*/*',
					'Accept-Encoding': 'gzip, deflate, br',
					'Cmpn-Cd': 'CA007',
					'Content-Type': 'application/json',
				},
				withCredentials: true,
			})
			.then((res) => {
				if (tab === 'tab1') {
					setCompanyFileList(res.data);
				} else {
					setProjectFileList(res.data);
				}
			});
	};

	const handleFileSubmit = async (fileData: {
		title: string;
		tag: string;
		file: File | null;
	}) => {
		try {
			if (modalMode === 'create') {
				await handleFileCreate(fileData);
			} else {
				await handleFileUpdate(fileData);
			}
			setIsModalOpen(false);
			setSelectedFile(null);
			getFileList();
		} catch (error) {
			console.error('파일 처리 실패:', error);
		}
	};

	const handleFileCreate = async (fileData: {
		title: string;
		tag: string;
		file: File | null;
	}) => {
		console.log('파일 등록:', fileData);
		const api =
			'http://lb-cymake-dev-868890701.ap-northeast-2.elb.amazonaws.com:9400/api/';
		const formData = new FormData();
		formData.append('title', fileData.title);
		formData.append('tag', fileData.tag);
		formData.append('file', fileData.file);
		await axios.post(api + 'library/cmpn-drive/upload', formData, {
			headers: {
				'Content-Type': 'multipart/form-data',
				Authorization: `Basic bGVhbm9uOmxlYW5vbjIwMjUh`,
				Accept: 'application/json',
			},
			auth: {
				username: 'leanon',
				password: 'leanon2025!',
			},
			withCredentials: true,
		});
	};

	const handleFileUpdate = async (fileData: {
		title: string;
		tag: string;
		file: File | null;
	}) => {
		if (!selectedFile?.cmpnCd) return;

		const api =
			'http://lb-cymake-dev-868890701.ap-northeast-2.elb.amazonaws.com:9400/api/library/cmpn/save';
		const formData = new FormData();

		formData.append('cmpnCd', selectedFile.cmpnCd);
		formData.append('librarySeq', selectedFile.librarySeq);
		formData.append('title', fileData.title);
		formData.append('writerId', selectedFile.writerId);
		formData.append('role', selectedFile.role);
		formData.append('tags', selectedFile.tags);
		formData.append('fileSeq', selectedFile.fileSeq);

		if (fileData.file) {
			formData.append('file', fileData.file);
		}

		try {
			await axios({
				method: 'post',
				url: api,
				data: formData,
				headers: {
					'Content-Type': 'multipart/form-data',
					Authorization: `Basic bGVhbm9uOmxlYW5vbjIwMjUh`,
				},
				auth: {
					username: 'leanon',
					password: 'leanon2025!',
				},
				withCredentials: true,
			});

			// 성공 시 목록 새로고침
			getFileList();
		} catch (error) {
			console.error('파일 업데이트 실패:', error);
		}
	};

	const deleteData = async (cmpnCd: string, librarySeq: string) => {
		const api =
			'http://lb-cymake-dev-868890701.ap-northeast-2.elb.amazonaws.com:9400/api/library/cmpn/delete';
		const body = {
			cmpnCd: cmpnCd,
			librarySeq: librarySeq,
		};
		await axios
			.post(api, body, {
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Basic bGVhbm9uOmxlYW5vbjIwMjUh`,
				},
				auth: {
					username: 'leanon',
					password: 'leanon2025!',
				},
				withCredentials: true,
			})
			.then((res) => {
				alert('파일 삭제 성공');
				getFileList();
			});
	};

	/**
	 *  용량 가져오기
	 */
	useEffect(() => {
		getStorage();
		getFileList();
	}, [tab]);

	return (
		<Box
			sx={{
				width: '100%',
				display: 'flex',
				flexDirection: 'column',
			}}
			p={{
				xs: 2,
				md: 10,
			}}
		>
			<Box
				sx={{
					p: 2.5,
					borderRadius: 2,
					boxShadow: 'rgb(219, 219, 219) 0px 4px 10px',
				}}
				display={'flex'}
				flexDirection={'row'}
				alignItems={'center'}
				gap={3}
			>
				<Typography variant="h6">통합 자료실</Typography>
				<Box display="flex" gap={2}>
					<Typography
						variant="subtitle1"
						sx={{
							cursor: 'pointer',
							color:
								tab === 'tab1'
									? 'primary.main'
									: 'text.secondary',
							fontWeight: tab === 'tab1' ? 600 : 400,
						}}
						onClick={() => setTab('tab1')}
					>
						기업 자료실
					</Typography>
					<Typography
						variant="subtitle1"
						sx={{
							cursor: 'pointer',
							color:
								tab === 'tab2'
									? 'primary.main'
									: 'text.secondary',
							fontWeight: tab === 'tab2' ? 600 : 400,
						}}
						onClick={() => setTab('tab2')}
					>
						프로젝트 자료실
					</Typography>
				</Box>
			</Box>
			{tab === 'tab1' && (
				<Box
					display={'flex'}
					flexWrap={'wrap'}
					gap={2}
					mt={2}
					flexDirection={'row'}
					width={'100%'}
					justifyContent={'space-between'}
					py={2}
				>
					<Box display={'flex'} flexDirection={'row'} gap={2}>
						{/* 검색창 */}
						<SupportiInput
							type="input"
							value={searchText}
							setValue={(e) => {
								setSearchText(e);
							}}
							additionalProps={{
								placeholder: 'search',
							}}
							style={{ bgcolor: 'white' }}
							width={'90%'}
						/>
						{/* 검색 */}
						<SupportiButton
							contents={'검색'}
							onClick={async () => {
								const api = `http://lb-cymake-dev-868890701.ap-northeast-2.elb.amazonaws.com:9400/api/library/cmpn-drive/search?search-keyword=' +
								searchText`;
								await axios
									.get(api, {
										headers: {
											'Content-Type': 'application/json',
											Authorization: `Basic bGVhbm9uOmxlYW5vbjIwMjUh`,
											Accept: 'application/json',
										},
										auth: {
											username: 'leanon',
											password: 'leanon2025!',
										},
										withCredentials: true,
									})
									.then((res) => {
										setCompanyFileList(res.data);
									});
							}}
							variant="contained"
							style={{ width: '10% ', backgroundColor: 'gray' }}
						/>
					</Box>
					<SupportiButton
						contents={'+ 파일 등록'}
						onClick={() => {
							setModalMode('create');
							setSelectedFile(null);
							setIsModalOpen(true);
						}}
						variant="contained"
						style={{ width: '10% ' }}
					/>
				</Box>
			)}
			<Box
				display="flex"
				flexDirection={'row'}
				gap={2}
				justifyContent={'space-between'}
				boxShadow={'rgb(213, 212, 239) 0px 4px 20px'}
				p={2}
			>
				<Box display="flex" alignItems="center" gap={1} width="100%">
					{/* 제목 */}
					<Typography
						variant="body2"
						sx={{ whiteSpace: 'nowrap', minWidth: '130px' }}
					>
						{tab === 'tab1'
							? '기업 자료실 사용량'
							: '프로젝트 자료실 사용량'}
					</Typography>

					{/* 진행률 바 */}
					<Box sx={{ flexGrow: 1 }}>
						<LinearProgress
							variant="determinate"
							value={percentageOfCompany}
							sx={{
								height: 10,
								borderRadius: 5,
								backgroundColor: '#ddd',
								'& .MuiLinearProgress-bar': {
									backgroundColor: '#3f51b5',
								},
							}}
						/>
					</Box>

					{/* 퍼센트 표시 */}
					<Typography variant="body2" sx={{ minWidth: '50px' }}>
						{tab === 'tab1'
							? percentageOfCompany.toFixed(2)
							: percentageOfProject.toFixed(2)}
						%
					</Typography>

					{/* 사용량 표시 */}
					<Typography variant="body2" sx={{ minWidth: '100px' }}>
						{tab === 'tab1' ? usedOfCompany : usedOfProject}
						MB / {total} MB
					</Typography>
				</Box>

				<Box display="flex" alignItems="center" gap={1} width="100%">
					{/* 제목 */}
					<Typography
						variant="body2"
						sx={{ whiteSpace: 'nowrap', minWidth: '130px' }}
					>
						전체 사용량
					</Typography>

					{/* 진행률 바 */}
					<Box sx={{ flexGrow: 1 }}>
						<LinearProgress
							variant="determinate"
							value={percentageTotal}
							sx={{
								height: 10,
								borderRadius: 5,
								backgroundColor: '#ddd',
								'& .MuiLinearProgress-bar': {
									backgroundColor: '#3f51b5',
								},
							}}
						/>
					</Box>

					{/* 퍼센트 표시 */}
					<Typography variant="body2" sx={{ minWidth: '50px' }}>
						{percentageTotal.toFixed(2)}%
					</Typography>

					{/* 사용량 표시 */}
					<Typography variant="body2" sx={{ minWidth: '100px' }}>
						{usedTotal} MB / {total} MB
					</Typography>
				</Box>
			</Box>
			<SupportiTable
				rowData={tab === 'tab1' ? companyFileList : projectFileList}
				headerData={
					tab === 'tab1' ? getCompanyHeaderData : getProjectHeaderData
				}
			/>
			<FileUploadModal
				mode={modalMode}
				open={open}
				onClose={() => setOpen(false)}
				onSubmit={handleFileSubmit}
			/>
			<FileUploadModal
				open={isModalOpen}
				mode={modalMode}
				onClose={() => {
					setIsModalOpen(false);
					setSelectedFile(null);
				}}
				onSubmit={handleFileSubmit}
				title={selectedFile?.title}
				tag={selectedFile?.tags}
				file={selectedFile?.file}
			/>
		</Box>
	);
};

export default Page;
