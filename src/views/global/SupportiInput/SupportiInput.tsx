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
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import dayjs, { Dayjs } from 'dayjs';
import { ImageController } from '../../../controller/ImageController';

interface SupportiInputProps {
	type: string;
	value: any;
	setValue?: any;
	defaultValue?: any;
	dataList?: any;
	width?: any;
	label?: string;
	multiple?: boolean;
	placeholder?: string;
	children?: React.ReactNode;
	btnContent?: string;
	btnOnclick?: () => void;
	iconList?: string[];
	style?: any;
	multiline?: boolean;
	useIcon?: boolean;
	additionalProps?: { [key: string]: any };
	readOnly?: boolean;
	minDate?: string | Date;
	inputType?: string;
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

			if (props.multiple) {
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
				return props.placeholder || '';
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
						defaultValue={props.defaultValue}
						placeholder={
							props.placeholder ? props.placeholder : '선택'
						}
						readOnly={props.readOnly}
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
						placeholder={props.placeholder ? props.placeholder : ''}
						onChange={(e) => {
							props.setValue(e.target.value);
						}}
						onKeyDown={(e) => {
							if (e.key === 'Enter') {
								props.btnOnclick && props.btnOnclick();
							}
						}}
						endAdornment={
							<InputAdornment position="end">
								<SearchIcon
									fontSize="small"
									onClick={() => {
										props.btnOnclick && props.btnOnclick();
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
							value={dayjs(props.value)}
							minDate={dayjs(props.minDate)}
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
									multiple: props.multiple,
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
						readOnly={props.readOnly}
						type={props.inputType}
						placeholder={props.placeholder ? props.placeholder : ''}
						onChange={(e) => {
							props.setValue(e.target.value);
						}}
						multiline={props.multiline ? props.multiline : false}
						endAdornment={
							<InputAdornment position="end">
								<Button
									sx={{
										height: '30px',
										width: '70px',
										bgcolor: 'secondary.main',
										color: 'white',
										marginTop: props.multiline ? 'auto' : 0,
									}}
									onClick={props.btnOnclick}
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
						readOnly={props.readOnly}
						endAdornment={
							<InputAdornment position="end">
								{props.children ? props.children : <></>}
							</InputAdornment>
						}
						placeholder={props.placeholder ? props.placeholder : ''}
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
						readOnly={props.readOnly}
						onChange={(e) => {
							props.setValue(e.target.value);
						}}
						placeholder={props.placeholder ? props.placeholder : ''}
						multiline={props.multiple}
						{...props.additionalProps}
						type={props.inputType}
					/>
				)}
			</Box>
		);
	}
);

export default SupportiInput;
