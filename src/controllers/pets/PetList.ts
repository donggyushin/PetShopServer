import { Request, Response } from "express";
import { StatusCodes, getReasonPhrase } from "http-status-codes";

import PetModel from "../../models/PetModel";
import UserModel from "../../models/UserModel";
import { decodeToken } from "../../utils/Utils";

export const getMyPetList = async (req: Request, res: Response) => {
  interface Headers {
    authorization?: string;
  }

  const { authorization } = req.headers as Headers;
  if (!authorization) {
    return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
      ok: false,
      error: getReasonPhrase(StatusCodes.UNPROCESSABLE_ENTITY),
      message: "로그인 인증이 제대로 이루어지고 있지 않습니다.",
    });
  }

  const validToken = authorization!.split(" ")[1];
  const userId = decodeToken(validToken);

  try {
    const user = await UserModel.findById(userId);
    if (user == null) {
      return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
        ok: false,
        error: getReasonPhrase(StatusCodes.UNPROCESSABLE_ENTITY),
        message: "로그인 인증이 제대로 이루어지고 있지 않습니다.",
      });
    }

    const petlist = await PetModel.find({
      userIdentifier: user._id,
    });

    return res.json({
      ok: true,
      petlist,
    });
  } catch (err) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      ok: false,
      error: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR),
      message: err.message,
    });
  }
};
