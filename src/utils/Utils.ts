class Util {
  static shared = new Util();

  checkTextValidation = (regex: RegExp, text: string) => {
    return regex.test(text);
  };
}
