import React, { useEffect } from 'react';

import { Avatar, Box, BoxProps, Typography } from '@mui/material';
import { Thumbnail } from '@qillie-corp/qillie-react-ui';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
interface IExcelDownloadButtonProps {
	dataConfig: { key: string; label: string }[];
	dataList?: { [key: string]: any }[];
	dataGetterCallback?: (
		args: { [key: string]: any },
		successCallback?: (response: any) => void,
		failCallback?: (err: any) => void
	) => Promise<any>;
	dataGetterCallbackArgs?: {
		args: { [key: string]: any };
		successCallback?: (response: any) => void;
		failCallback?: (err: any) => void;
	};
	dataConverterCallback?: { [key: string]: (columnData: any) => any };
	fileName: string;
}

const ExcelDownloadButton = (props: IExcelDownloadButtonProps) => {
	//* Modules

	//* Constants

	//* States
	//* Functions
	/**
	 * 버튼 클릭 시
	 */
	const onClickExcelDownloadButton = async () => {
		let targetDataList: { [key: string]: any }[] = [];

		if (props.dataGetterCallback && props.dataGetterCallbackArgs) {
			targetDataList = await props.dataGetterCallback(
				props.dataGetterCallbackArgs.args,
				props.dataGetterCallbackArgs.successCallback,
				props.dataGetterCallbackArgs.failCallback
			);
		} else if (props.dataList) {
			targetDataList = props.dataList;
		} else {
			alert('데이터가 없습니다.');
			return;
		}
		/**
		 * 헤더 변환
		 */
		const header = props.dataConfig.map((config) => {
			return config.label;
		});

		/**
		 * 데이터 변환
		 */
		const convertedDataList = targetDataList.map((data) => {
			/**
			 * 각 줄 변환
			 */
			const row = props.dataConfig.map((config) => {
				let columnData = data[config.key];

				/**
				 * 데이터 컨버팅
				 */
				if (props.dataConverterCallback) {
					if (props.dataConverterCallback[config.key]) {
						columnData =
							props.dataConverterCallback[config.key](columnData);
					}
				}

				return data[config.key];
			});

			return row;
		});

		/**
		 * 파일명 받아서 다운로드 시키기
		 */
		const excelFileType =
			'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
		const excelFileExtension = '.xlsx';
		const excelFileName = props.fileName;

		const ws = XLSX.utils.aoa_to_sheet([[`${props.fileName}`], [], header]);
		// convertedDataList.map((data: any) => {
		// 	XLSX.utils.sheet_add_aoa(ws, convertedDataList, {
		// 		origin: -1,
		// 	});
		// 	ws['!cols'] = [{ wpx: 150 }, { wpx: 150 }];
		// 	return false;
		// });
		XLSX.utils.sheet_add_aoa(ws, convertedDataList, {
			origin: -1,
		});
		const wb: any = { Sheets: { data: ws }, SheetNames: ['data'] };
		const excelButter = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
		const excelFile = new Blob([excelButter], { type: excelFileType });
		FileSaver.saveAs(excelFile, excelFileName + excelFileExtension);
	};

	//* Hooks

	useEffect(() => {});

	return (
		<Box
			sx={{
				width: { sm: 125, xs: 40 },
				height: 36,
				p: { sm: '10px 15px', xs: 1 },
				border: 'solid 1px #b4d5c3',
				borderRadius: '5px',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'space-between',
				cursor: 'pointer',
			}}
			onClick={onClickExcelDownloadButton}
		>
			<Avatar
				src={'/images/logo/excel.png'}
				sx={{ width: 20, height: 20 }}
				variant="square"
			/>
			<Typography variant="body2" display={{ sm: 'block', xs: 'none' }}>
				엑셀 다운로드
			</Typography>
		</Box>
	);
};

export default ExcelDownloadButton;
