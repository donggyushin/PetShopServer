// 최소 1개의 숫자 혹은 특수 문자를 포함해야 함
export const passwordRegex = /^(?=.*[a-zA-Z])((?=.*\d)|(?=.*\W)).{8,20}$/;

// 한글로 2자이상 5자이하
export const nicknameRegex = /^[가-힣//s]{2,5}$/;
// 특수문자 사용 불가 8자 이상 20자 이하
export const userIdRegex = /^[a-zA-Z0-9]{8,20}$/;

type Price = {
  min: string;
  max: string;
};

type PetSort = "강아지" | "고양이";

type PetListType = {
  petSort?: PetSort;
  name: string;
  life?: string;
  personality?: string[];
  kind?: string[];
  price?: Price;
  photourl?: string;
};

export const Petlist: PetListType[] = [
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
    photourl:
      "https://firebasestorage.googleapis.com/v0/b/petmily-dab67.appspot.com/o/Pets%2F%E1%84%91%E1%85%A9%E1%84%86%E1%85%A6%E1%84%85%E1%85%A1%E1%84%82%E1%85%B5%E1%84%8B%E1%85%A1%E1%86%AB.png?alt=media&token=f8799975-d06b-4a28-9150-06e2887df2f7",
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
    photourl:
      "https://firebasestorage.googleapis.com/v0/b/petmily-dab67.appspot.com/o/Pets%2F%E1%84%8E%E1%85%B5%E1%84%8B%E1%85%AA%E1%84%8B%E1%85%AA.png?alt=media&token=b3a101c8-937c-4bac-8480-611e99027c69",
  },
];
