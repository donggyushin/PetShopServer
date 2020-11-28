interface DailyInfo {
  title: string;
  text: string;
  icon: boolean;
  url?: string;
  width?: number;
  height?: number;
}

export const DailyInfos: DailyInfo[] = [
  {
    title: "강아지 감 먹어도 되나요?",
    text:
      "자두나 체리의 씨에는 시안화물이라는 독성물질이 들어있어서 강아지한테 주면 안 되지만, 감 씨에는 독성물질이 없어요. 따라서, 비교적 씨 급여 시 위험성이 적답니다.\n감에는 비타민 A와 C가 풍부하게 들어있어서 씨를 확실하게 제거하고 감만 잘라서 준다면 문제는 없을거에요. 하지만 많은 양의 감을 먹었을 때에 설사 증세를 보이는 경우가 있으니(이는 사람도 마찬가지), 감을 주는 경우에는 씨를 완전히 제거하로 소량만 주어야 함을 기억해요!",
    icon: false,
  },
];
