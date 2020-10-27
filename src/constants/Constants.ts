// 최소 1개의 숫자 혹은 특수 문자를 포함해야 함
export const passwordRegex = /^(?=.*[a-zA-Z])((?=.*\d)|(?=.*\W)).{8,20}$/;

// 한글로 2자이상 5자이하
export const nicknameRegex = /^[가-힣//s]{2,5}$/;
// 특수문자 사용 불가 8자 이상 20자 이하
export const userIdRegex = /^[a-zA-Z0-9]{8,20}$/;
