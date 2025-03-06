import React, { useEffect, useState } from 'react';
import {
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	Button,
	TextField,
	Typography,
	Box,
	IconButton,
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CloseIcon from '@mui/icons-material/Close';

interface FileUploadModalProps {
	mode: 'create' | 'update';
	title?: string;
	tag?: string;
	file?: string; // 파일명이 문자열로 들어옴
	open: boolean;
	onClose: () => void;
	onSubmit: (fileData: {
		title: string;
		tag: string;
		file: File | null;
	}) => void;
}

const FileUploadModal: React.FC<FileUploadModalProps> = ({
	mode,
	title: initialTitle = '',
	tag: initialTag = '',
	file: initialFileName = '',
	open,
	onClose,
	onSubmit,
}) => {
	const [title, setTitle] = useState('');
	const [tag, setTag] = useState('');
	const [file, setFile] = useState<File | null>(null);
	const [error, setError] = useState(false);

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const selectedFile = event.target.files?.[0] || null;
		if (selectedFile) {
			if (selectedFile.size > 30 * 1024 * 1024) {
				alert('파일 크기는 30MB를 초과할 수 없습니다.');
			} else {
				setFile(selectedFile);
			}
		}
	};

	const handleSubmit = () => {
		if (!title.trim()) {
			setError(true);
			return;
		}
		onSubmit({ title, tag, file });
		setTitle('');
		setTag('');
		setFile(null);
		setError(false);
		onClose();
	};

	useEffect(() => {
		if (!open) return; // 모달이 열릴 때만 초기값 설정

		setTitle(initialTitle);
		setTag(initialTag);

		// 기존 파일명이 있다면 표시만 하고 실제 파일 업로드는 새로 받기
		if (initialFileName) {
			setFile(null); // 실제 File 객체는 null로 설정
		}
	}, [open, initialTitle, initialTag, initialFileName]);

	return (
		<Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
			<DialogTitle>
				{mode === 'create' ? '파일 등록' : '파일 수정'}
				<IconButton
					onClick={onClose}
					sx={{ position: 'absolute', right: 8, top: 8 }}
				>
					<CloseIcon />
				</IconButton>
			</DialogTitle>
			<DialogContent>
				{/* 제목 입력 */}
				<TextField
					fullWidth
					label="제목 *"
					variant="outlined"
					error={error}
					helperText={error ? '필수정보 입니다.' : ''}
					value={title}
					onChange={(e) => setTitle(e.target.value)}
					sx={{ mb: 2 }}
				/>
				<TextField
					fullWidth
					label="태그"
					variant="outlined"
					value={tag}
					onChange={(e) => setTag(e.target.value)}
					sx={{ mb: 2 }}
				/>

				{/* 파일 첨부 */}
				<Box
					display="flex"
					flexDirection="column"
					alignItems="center"
					justifyContent="center"
					border="2px dashed #ccc"
					borderRadius="8px"
					padding={3}
					textAlign="center"
				>
					<input
						type="file"
						id="file-upload"
						style={{ display: 'none' }}
						onChange={handleFileChange}
					/>
					<label htmlFor="file-upload">
						<Button
							component="span"
							startIcon={<CloudUploadIcon />}
							variant="contained"
						>
							파일 선택
						</Button>
					</label>

					{file ? (
						<Typography variant="body1" mt={2}>
							📄 {file.name} <CheckCircleIcon color="success" />
						</Typography>
					) : initialFileName ? (
						<Typography variant="body1" mt={2}>
							📄 {initialFileName} (새 파일을 선택하세요)
						</Typography>
					) : (
						<Typography
							variant="body2"
							mt={2}
							color="textSecondary"
						>
							현재 0MB / (첨부파일: 30MB 제한)
						</Typography>
					)}
				</Box>
			</DialogContent>

			{/* 등록 & 취소 버튼 */}
			<DialogActions>
				<Button onClick={onClose} variant="outlined">
					취소
				</Button>
				<Button
					onClick={handleSubmit}
					variant="contained"
					color="primary"
				>
					{mode === 'create' ? '등록' : '수정'}
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export default FileUploadModal;
