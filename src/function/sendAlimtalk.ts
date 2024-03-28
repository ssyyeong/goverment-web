import axios from 'axios';

const sendAlimTalk = (template_code, variable, phone, successCallback) => {
	const formData = new FormData();
	formData.append('api_key', process.env.NEXT_PUBLIC_ALIMTALK_API_KEY);
	//예시 템플릿 코드
	formData.append('template_code', template_code);
	//변수들 (현재 테스트 문자 변수 3개)
	formData.append(
		'variable',
		// 결제자 이름, 결제 요청자, 결제 내용, 금액
		variable
	);
	//발신번호
	formData.append('callback', process.env.NEXT_PUBLIC_ALIMTALK_PHONE_NUMBER);
	//수신번호
	formData.append('dstaddr', phone);
	// 대치시 실패 문자 유무
	formData.append('next_typer', 1 as any);
	//즉시발송 0 예약발송 1
	formData.append('send_reserve', 0 as any);
	axios({
		method: 'post',
		url: 'https://alimtalkme.com/API/alimtalk_api', //환경변수
		data: formData,
		headers: {
			'Content-Type': 'multipart/form-data',
		},
	}).then((res) => {
		successCallback();
		return;
	});
};

export default sendAlimTalk;
