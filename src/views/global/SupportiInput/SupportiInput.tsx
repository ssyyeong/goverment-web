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
	SxProps,
	TextField,
	Typography,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import dayjs, { Dayjs } from 'dayjs';
import { ImageController } from '../../../controller/ImageController';
import CloseIcon from '@mui/icons-material/Close';

interface SupportiInputProps {
	type: string;
	value: any;
	setValue?: any;
	dataList?: any;
	width?: any;
	label?: string;
	minDate?: any;
	maxDate?: any;
	children?: React.ReactNode;
	btnContent?: string;
	btnOnClick?: () => void;
	iconList?: string[];
	style?: SxProps;
	useIcon?: boolean;
	additionalProps?: { [key: string]: any };
	inputType?: string;
	eraseValue?: () => void;
}

//* 서포티 인풋 컴포넌트
const SupportiInput = React.forwardRef(
	(props: SupportiInputProps, ref: React.ForwardedRef<HTMLInputElement>) => {
		//* 파일 선택을 위한 ref
		const inputRef = React.useRef<HTMLInputElement>(null);

		//* Modules
		const imageController = new ImageController();
		//* States
		const [selectValue, setSelectValue] = React.useState(props.value);

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

			if (props.additionalProps.multiple) {
				props.setValue?.(files);

				if (files.length === 0) {
					resetInputValue();
				}
			} else {
				const formData = new FormData();
				formData.append('file', files[0]);
				imageController.uploadImage(formData, (res) => {
					props.setValue(res);
				});

				// props.setValue?.(files[0] || null);

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
				return props.additionalProps.placeholder || '';
			}

			return '';
		};

		//* Hooks

		return (
			<Box sx={{ width: props.width }}>
				{props.type === 'select' ? (
					<Select
						sx={{ width: '100%', bgcolor: 'white', ...props.style }}
						value={props.value}
						onChange={(e) => {
							props.setValue(e.target.value);
						}}
						{...props.additionalProps}
					>
						{props.dataList &&
							props.dataList?.map((item, index) => {
								return (
									<MenuItem
										key={item.label}
										value={item.value}
										sx={{
											display: 'flex',
											alignItems: 'center',
										}}
									>
										{item.icon && (
											<img
												src={item.icon}
												alt="icon"
												style={{
													width: '15px',
													// height: '15px',
													marginRight: '15px',
												}}
											/>
										)}
										{item.label}
									</MenuItem>
								);
							})}
					</Select>
				) : props.type === 'search' ? (
					<OutlinedInput
						sx={{ width: '100%', bgcolor: 'white', ...props.style }}
						id="outlined-adornment-weight"
						value={props.value}
						{...props.additionalProps}
						onChange={(e) => {
							props.setValue(e.target.value);
						}}
						onKeyDown={(e) => {
							if (e.key === 'Enter') {
								props.btnOnClick && props.btnOnClick();
							}
						}}
						endAdornment={
							<InputAdornment position="end">
								{(props.value == '' || props.value) && (
									<Typography
										mr={1}
										onClick={() => {
											props.setValue('');
											props.eraseValue &&
												props.eraseValue();
										}}
										sx={{
											cursor: 'pointer',
										}}
									>
										<CloseIcon
											sx={{
												fontSize: '0.9rem',
											}}
										/>
									</Typography>
								)}
								<SearchIcon
									sx={{
										cursor: 'pointer',
									}}
									fontSize="small"
									onClick={() => {
										props.btnOnClick && props.btnOnClick();
									}}
								/>
							</InputAdornment>
						}
						aria-describedby="outlined-weight-helper-text"
					/>
				) : props.type === 'datepicker' ? (
					<LocalizationProvider dateAdapter={AdapterDayjs}>
						<MobileDatePicker
							inputFormat="YYYY-MM-DD"
							onChange={(newValue: Dayjs | null) => {
								props.setValue(newValue);
							}}
							value={
								props.value != null ? dayjs(props.value) : null
							}
							{...props.additionalProps}
							minDate={dayjs(props.minDate)}
							maxDate={dayjs(props.maxDate)}
							{...props.additionalProps}
							renderInput={(params) => (
								<TextField
									{...params}
									{...props.additionalProps}
								/>
							)}
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
								sx={{
									alignItems: 'center',
									display: 'flex',
								}}
								labelPlacement="end"
								{...props.additionalProps}
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
							{...props.additionalProps}
							ref={ref}
							type="file"
							onChange={fileChange}
							InputProps={{
								startAdornment: (
									<InputAdornment
										position="start"
										sx={{
											width: '50%',
										}}
									>
										<Typography
											color={'secondary.main'}
											noWrap
										>
											{props.value}
										</Typography>
									</InputAdornment>
								),
								endAdornment: (
									<InputAdornment position="end">
										<Button
											sx={{
												// height: '80%',
												color: 'white',
											}}
											variant="contained"
											color="secondary"
											onClick={(e) => {
												if (inputRef.current !== null) {
													// console.log(
													// 	inputRef.current
													// );
													inputRef.current.click();
												}
											}}
										>
											파일선택
										</Button>
									</InputAdornment>
								),

								inputProps: {
									multiple: props.additionalProps.multiple,
									ref: inputRef,
									text: getTheInputText(),
								},
							}}
							sx={{
								'input[type="file"]': {
									visibility: 'hidden',
								},
								width: '100%',
								...props.style,
							}}
						/>
					</Box>
				) : props.type === 'inputwithbtn' ? (
					<OutlinedInput
						id="outlined-adornment-weight"
						sx={{ width: '100%', ...props.style }}
						value={props.value}
						type={props.inputType}
						onChange={(e) => {
							props.setValue(e.target.value);
						}}
						{...props.additionalProps}
						endAdornment={
							<InputAdornment position="end">
								<Button
									sx={{
										height: '30px',
										width: '70px',
										bgcolor: 'common.black',
										color: 'white',
										marginTop: props.additionalProps
											.multiline
											? 'auto'
											: 0,
									}}
									onClick={props.btnOnClick}
								>
									{props.btnContent}
								</Button>
							</InputAdornment>
						}
						aria-describedby="outlined-weight-helper-text"
					/>
				) : props.type === 'password' ? (
					<OutlinedInput
						sx={{ width: '100%', ...props.style }}
						type={'password'}
						value={props.value}
						onChange={(e) => {
							props.setValue(e.target.value);
						}}
						endAdornment={
							<InputAdornment position="end">
								{props.children ? props.children : <></>}
							</InputAdornment>
						}
						{...props.additionalProps}
					/>
				) : props.type === 'chip' ? (
					<Box display={'flex'}>
						{props.dataList.map((item, index) => {
							return (
								<Box
									key={index}
									sx={{
										bgcolor: 'primary.main',
										color: 'white',
										borderRadius: '5px',
										padding: '5px 10px',
										marginRight: '5px',
									}}
								>
									{item}
								</Box>
							);
						})}
					</Box>
				) : (
					<OutlinedInput
						sx={{ width: '100%', ...props.style }}
						value={props.value}
						onChange={(e) => {
							props.setValue(e.target.value);
						}}
						{...props.additionalProps}
						type={props.inputType}
					/>
				)}
			</Box>
		);
	}
);

export default SupportiInput;
