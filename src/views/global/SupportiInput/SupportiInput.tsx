import React, { useEffect } from 'react';
import {
	Box,
	Button,
	Checkbox,
	FormControlLabel,
	InputAdornment,
	MenuItem,
	OutlinedInput,
	Select,
	TextField,
	Typography,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';

interface SupportiInputProps {
	type: string;
	value: any;
	setValue: any;
	defaultValue: string;
	dataList?: { [key: string]: string };
	width: number;
	label?: string;
	multiple?: boolean;
	placeholder?: string;
	children?: React.ReactNode;
	btnContent?: string;
	btnOnclick?: () => void;
}

//* 서포티 인풋 컴포넌트
const SupportiInput = React.forwardRef(
	(props: SupportiInputProps, ref: React.ForwardedRef<HTMLInputElement>) => {
		//* 파일 선택을 위한 ref
		const inputRef = React.useRef<HTMLInputElement>(null);

		//* Modules
		//* States

		//* Functions
		//* 파일 삭제 시 인풋 초기화
		const resetInputValue = () => {
			if (inputRef.current) {
				inputRef.current.value = '';
			}
		};

		//* 파일 선택 시 호출되는 함수
		const fileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
			const fileList = event.target.files;
			const files = fileList ? Array.from(fileList) : [];

			if (props.multiple) {
				props.setValue?.(files);

				if (files.length === 0) {
					resetInputValue();
				}
			} else {
				props.setValue?.(files[0] || null);

				if (!files[0]) {
					resetInputValue();
				}
			}
		};
		//* 파일 선택 시 파일 네임 가져오는 함수
		const getTheInputText = () => {
			if (
				props.value === null ||
				(Array.isArray(props.value) && props.value.length === 0)
			) {
				return props.placeholder || '';
			}

			return '';
		};

		//* Hooks
		useEffect(() => {
			console.log(inputRef.current);
		}, [inputRef.current]);

		return (
			<Box sx={{ width: props.width }}>
				{props.type === 'select' ? (
					<Select
						sx={{ width: '100%' }}
						value={props.value}
						onChange={(e) => {
							props.setValue(e.target.value);
						}}
						displayEmpty
						placeholder={props.placeholder ? props.placeholder : ''}
					>
						{props.defaultValue !== undefined && (
							<MenuItem value={props.defaultValue}>
								<em>{props.defaultValue}</em>
							</MenuItem>
						)}
						{Object.keys(props.dataList).map((key, index) => {
							return (
								<MenuItem key={index} value={key}>
									{props.dataList[key]}
								</MenuItem>
							);
						})}
					</Select>
				) : props.type === 'search' ? (
					<OutlinedInput
						id="outlined-adornment-weight"
						value={props.value}
						placeholder={props.placeholder ? props.placeholder : ''}
						onChange={(e) => {
							props.setValue(e.target.value);
						}}
						endAdornment={
							<InputAdornment position="end">
								<SearchIcon fontSize="small" />
							</InputAdornment>
						}
						aria-describedby="outlined-weight-helper-text"
					/>
				) : props.type === 'datepicker' ? (
					<LocalizationProvider dateAdapter={AdapterDayjs}>
						<DatePicker
							onChange={(e) => {
								props.setValue(dayjs(e).format('YYYY-MM-DD'));
							}}
							value={props.value}
							renderInput={(params) => <TextField {...params} />}
						/>
					</LocalizationProvider>
				) : props.type === 'checkbox' ? (
					<Box>
						{typeof props.value === 'boolean' ? (
							<FormControlLabel
								control={
									<Checkbox
										size="small"
										checked={props.value}
										onChange={(
											event: React.ChangeEvent<HTMLInputElement>
										) => {
											props.setValue(
												event.target.checked
											);
										}}
									/>
								}
								label={props.label ? props.label : ''}
							/>
						) : (
							<Typography color={'error'}>
								체크박스 value 타입은 boolean 이어야만 합니다.
							</Typography>
						)}
					</Box>
				) : props.type === 'fileinput' ? (
					<Box>
						<TextField
							placeholder={
								props.placeholder ? props.placeholder : ''
							}
							ref={ref}
							type="file"
							onChange={fileChange}
							InputProps={{
								startAdornment: (
									<InputAdornment position="start">
										<>{props.value?.name}</>
									</InputAdornment>
								),
								endAdornment: (
									<InputAdornment position="end">
										<Button
											sx={{
												height: '80%',
												color: 'white',
											}}
											variant="contained"
											color="secondary"
											onClick={(e) => {
												if (inputRef.current !== null) {
													console.log(
														inputRef.current
													);
													inputRef.current.click();
												}
											}}
										>
											파일선택
										</Button>
									</InputAdornment>
								),

								inputProps: {
									multiple: props.multiple,
									ref: inputRef,
									text: getTheInputText(),
								},
							}}
							sx={{
								'input[type="file"]': {
									visibility: 'hidden',
								},
							}}
						/>
					</Box>
				) : props.type === 'inputwithbtn' ? (
					<OutlinedInput
						id="outlined-adornment-weight"
						value={props.value}
						placeholder={props.placeholder ? props.placeholder : ''}
						onChange={(e) => {
							props.setValue(e.target.value);
						}}
						endAdornment={
							<InputAdornment position="end">
								<Button
									sx={{
										height: '30px',
										width: '70px',
										bgcolor: 'secondary.main',
										color: 'white',
									}}
									onClick={props.btnOnclick}
								>
									{props.btnContent}
								</Button>
							</InputAdornment>
						}
						aria-describedby="outlined-weight-helper-text"
					/>
				) : (
					<OutlinedInput
						value={props.value}
						onChange={(e) => {
							props.setValue(e.target.value);
						}}
						endAdornment={
							<InputAdornment position="end">
								{props.children ? props.children : <></>}
							</InputAdornment>
						}
					/>
				)}
			</Box>
		);
	}
);

export default SupportiInput;
