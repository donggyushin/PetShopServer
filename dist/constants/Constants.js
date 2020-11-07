"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Petlist = exports.userIdRegex = exports.nicknameRegex = exports.passwordRegex = void 0;
// 최소 1개의 숫자 혹은 특수 문자를 포함해야 함
exports.passwordRegex = /^(?=.*[a-zA-Z])((?=.*\d)|(?=.*\W)).{8,20}$/;
// 한글로 2자이상 5자이하
exports.nicknameRegex = /^[가-힣//s]{2,5}$/;
// 특수문자 사용 불가 8자 이상 20자 이하
exports.userIdRegex = /^[a-zA-Z0-9]{8,20}$/;
exports.Petlist = [
    {
        petSort: "강아지",
        name: "포메라니안",
        life: "12-16년",
        personality: [
            "친근한",
            "사교성 좋은",
            "총명한",
            "장난스러운",
            "우호적인",
            "활동적인",
        ],
        kind: [
            "블랙탄포메라니안",
            "세이블포메라니안",
            "화이트포메라니안",
            "오렌지포메라니안",
            "파티포메라니안",
            "크림포메라니안",
        ],
        price: {
            min: "25만원",
            max: "50만원",
        },
        description: "영국 왕실에서 길렀으며 이젠 전 세계적으로 애완용으로 유명한 품종이다.",
        photourl: "https://firebasestorage.googleapis.com/v0/b/petmily-dab67.appspot.com/o/Pets%2F%E1%84%91%E1%85%A9%E1%84%86%E1%85%A6%E1%84%85%E1%85%A1%E1%84%82%E1%85%B5%E1%84%8B%E1%85%A1%E1%86%AB.png?alt=media&token=f8799975-d06b-4a28-9150-06e2887df2f7",
    },
    {
        petSort: "강아지",
        name: "치와와",
        life: "12-20년",
        personality: [
            "생기있는",
            "경계심이 많은",
            "헌신적인",
            "민첩한",
            "용맹스러운",
        ],
        kind: ["단모치와와", "장모치와와"],
        price: {
            min: "25만원",
            max: "80만원",
        },
        description: "개들 중에서 가장 작은 품종으로 유명하다. 얼굴형이 예쁘고 크기도 작아서 교배종으로도 인기가 많다. 예를 들어 암컷 치와와와 미니핀 사이에서 태어난 믹스견의 경우 미니핀의 각진 듯한 얼굴형이 치와와의 둥근 얼굴형으로 바뀌고, 흑갈색과 백색이 어우러진 독특한 외모로 신선한 느낌을 준다.",
        photourl: "https://firebasestorage.googleapis.com/v0/b/petmily-dab67.appspot.com/o/Pets%2F%E1%84%8E%E1%85%B5%E1%84%8B%E1%85%AA%E1%84%8B%E1%85%AA.png?alt=media&token=b3a101c8-937c-4bac-8480-611e99027c69",
    },
    {
        petSort: "강아지",
        name: "미니어처 핀셔 (미니핀)",
        description: "개들 중에서 가장 작은 품종으로 유명하다. 얼굴형이 예쁘고 크기도 작아서 교배종으로도 인기가 많다. 예를 들어 암컷 치와와와 미니핀 사이에서 태어난 믹스견의 경우 미니핀의 각진 듯한 얼굴형이 치와와의 둥근 얼굴형으로 바뀌고, 흑갈색과 백색이 어우러진 독특한 외모로 신선한 느낌을 준다.",
        life: "12-15년",
        personality: [
            "영리한",
            "에너제틱한",
            "반응이 빠른",
            "외향적인",
            "장난스러운",
            "우호적인",
        ],
        kind: ["초코탄 미니핀", "블랙탄 미니핀", "레드 미니핀"],
        price: {
            min: "35만원",
            max: "60만원",
        },
        photourl: "https://firebasestorage.googleapis.com/v0/b/petmily-dab67.appspot.com/o/Pets%2F%E1%84%86%E1%85%B5%E1%84%82%E1%85%B5%E1%84%91%E1%85%B5%E1%86%AB.png?alt=media&token=ca29a934-e3ba-4a6b-aa25-ea7ea8fc286c",
    },
    {
        petSort: "강아지",
        name: "파피용",
        description: "스패니엘의 변종으로 스피츠 종과 섞여 개량된 품종이다. 귀가 오똑하게 서있는 모습을 뒤에서 바라보면 나비와 닮았다고 해서 빠삐용(Papillon)으로 불리게 되었다. 소형견 중에서는 토이 푸들 다음으로 똑똑하다. 단점이라면 지나치게 활발하면서 머리가 너무 좋아서 서열을 확실히 하지 않으면 말티즈처럼 주인 머리 위에 올라설 위험이 있다.",
        life: "12-15년",
        personality: [
            "강인한",
            "에너제틱한",
            "경계심이 많은",
            "총명한",
            "우호적인",
            "밝은",
        ],
        kind: ["빠삐용", "파렌"],
        price: {
            min: "40만원",
            max: "75만원",
        },
        photourl: "https://firebasestorage.googleapis.com/v0/b/petmily-dab67.appspot.com/o/Pets%2F%E1%84%91%E1%85%A1%E1%84%91%E1%85%B5%E1%84%8B%E1%85%AD%E1%86%BC.png?alt=media&token=2318002d-b147-4805-9f4a-1d4338a8c0c4",
    },
    {
        petSort: "강아지",
        name: "토이 푸들",
        description: "푸들은 본래 대형견이었으나 점차 작게 개량하여 작은 사이즈의 푸들이 널리 퍼졌고 이들을 그룹화 하면서 '스탠다드-미니어처'로 이분화 되기 시작한다. 그러다가 미니어처에서 좀 더 작은 집단을 구분하면서 '토이' 그룹까지 생겨난다.",
        life: "12-15년",
        personality: [
            "경계심이 많은",
            "총명한",
            "본능적인",
            "충실한",
            "활동적인",
            "훈련 능력이 뛰어난",
        ],
        kind: ["토이 푸들", "타이니 토이 푸들", "타이니 티컵 푸들"],
        price: {
            min: "40만원",
            max: "75만원",
        },
        photourl: "https://firebasestorage.googleapis.com/v0/b/petmily-dab67.appspot.com/o/Pets%2F%E1%84%90%E1%85%A9%E1%84%8B%E1%85%B5%E1%84%91%E1%85%AE%E1%84%83%E1%85%B3%E1%86%AF.png?alt=media&token=1c82e02a-12b2-45c3-8281-12c407e98e58",
    },
];
