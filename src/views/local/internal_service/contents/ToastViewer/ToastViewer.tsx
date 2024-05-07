import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

/** Toast UI */
import { Viewer } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';
import '@toast-ui/editor/dist/i18n/ko-kr';
import '@toast-ui/editor/dist/toastui-editor-viewer.css';
import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css';
import 'tui-color-picker/dist/tui-color-picker.css';
import { Container } from '@mui/material';

const ToastViewer = ({ data }) => {
	const [content, setContent] = useState();

	useEffect(() => {
		setContent(data);
		return () => {
			setContent(null);
		};
	}, [data]);

	return <>{content && <Viewer initialValue={content} />}</>;
};

export default ToastViewer;
