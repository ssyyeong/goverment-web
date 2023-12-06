import React, { useEffect } from 'react';

import { Box, BoxProps } from '@mui/material';

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
		 * 데이터 합쳐서 엑셀로 추출
		 */
		const mergedData = [header, ...convertedDataList];

		/**
		 * 파일명 받아서 다운로드 시키기
		 */
	};

	//* Hooks

	useEffect(() => {});

	return <Box></Box>;
};

export default ExcelDownloadButton;
