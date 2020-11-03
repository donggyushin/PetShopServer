import { Request, Response } from "express";

import { Petlist } from "../../constants/Constants";

export const getPetList = async (
  req: Request,
  res: Response
): Promise<Response<any>> => {
  const petlist = Petlist;
  return res.json({
    ok: true,
    petlist,
  });
};
