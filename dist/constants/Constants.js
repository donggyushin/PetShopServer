"use strict";
class Regex {
    constructor() {
        // 최소 한개의 문자와 1개의 숫자 그리고 한개의 특수문자로 이루어진 8자 이상, 20자 이하
        this.passwordRegex = /^(?=.*[A-Za-z])(?=.*\\d)(?=.*[$@$!%*#?&])[A-Za-z\\d$@$!%*#?&]{8,20}$/;
        // 한글로 2자이상 5자이하
        this.nicknameRegex = /^[가-힣//s]{2,5}$/;
        // 최소 한개 이상의 문자와 길이는 8자 이상 20자 이하
        this.userIdRegex = /(?i)^(?=.*[a-z])[a-z0-9]{8,20}$/;
    }
}
Regex.shared = new Regex();
