// ㅎㅏ루에 한번씩 동작하는 함수
const testFunction = () => {
  setTimeout(() => {
    console.log("test");
    testFunction();
  }, 1000 * 60 * 60 * 24);
};
