//* 이메일정규식
export const emailRegex = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/;
//* 비밀번호정규식
export const passwordRegex =
	/^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,16}/;
//* 핸드폰번호정규식
export const phoneRegex = /^\d{3}-\d{3,4}-\d{4}$/;
