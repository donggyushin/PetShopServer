import * as Utils from "../../utils/Utils";

import { Request, Response } from "express";
import { StatusCodes, getReasonPhrase } from "http-status-codes";

import UserModel from "../../models/UserModel";

const getUserByToken = async (req: Request, res: Response) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
      ok: false,
      error: getReasonPhrase(StatusCodes.UNPROCESSABLE_ENTITY),
      message: "authorization을 제출해주세요",
    });
  }

  const token = authorization.split(" ")[1];
  const userId = Utils.decodeToken(token);
  try {
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
        ok: false,
        error: getReasonPhrase(StatusCodes.UNPROCESSABLE_ENTITY),
        message: "해당 token 값을 가진 유저를 찾을 수 없습니다.",
      });
    }

    return res.json({
      ok: true,
      user,
    });
  } catch (err) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      ok: false,
      error: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR),
      message: err.message,
    });
  }
};

export default getUserByToken;
