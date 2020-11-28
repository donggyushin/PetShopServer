import { Request, Response } from "express";

import { DailyInfos } from "../../localDatas/dailyInfos";

const randomNumber = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min) + min);
};

export const getDailyInfos = async (req: Request, res: Response) => {
  const dailyInfos = DailyInfos;
  let index = randomNumber(0, dailyInfos.length);

  const dailyInfo = dailyInfos[index];

  res.json({
    ok: true,
    dailyInfo,
  });
};
