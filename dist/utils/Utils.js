"use strict";
class Util {
    constructor() {
        this.checkTextValidation = (regex, text) => {
            return regex.test(text);
        };
    }
}
Util.shared = new Util();
