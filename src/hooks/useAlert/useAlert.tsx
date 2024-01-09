import React from 'react';

import { Box, BoxProps } from '@mui/material';
import { SupportiAlertModal } from '../../views/global/SupportiAlertModal';

interface IuseAlertProps {
	customHandleClose?: () => void;
}

const useAlert = (props: IuseAlertProps) => {
	//* State
	/**
	 * 알림창 열림 여부
	 */
	const [open, setOpen] = React.useState<boolean>(false);
	/**
	 * 알림창 타입
	 */
	const [type, setType] = React.useState<
		| 'success'
		| 'login'
		| 'subscribe'
		| 'point'
		| 'already'
		| 'withdraw'
		| 'unsubscribe'
		| 'cancel'
		| 'delete'
		| 'business'
		| 'loginfail'
		| 'consultingexceed'
		| 'seminarexceed'
		| 'indicatorModify'
		| 'indicatorDelete'
		| 'indicatorWarning'
		| 'successModifyAxios'
		| 'successCreateAxios'
		| 'successDeleteAxios'
		| 'failAxios'
	>();

	const renderAlert = () => {
		<SupportiAlertModal
			open={open}
			handleClose={() => setOpen(false)}
			type={type}
			customHandleClose={props.customHandleClose}
		/>;
	};

	return { renderAlert, setType, setOpen, open, type };
};

export default useAlert;
