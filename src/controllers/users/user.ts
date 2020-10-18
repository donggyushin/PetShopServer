import { Request, Response } from "express";
import { StatusCodes, getReasonPhrase } from "http-status-codes";

import UserModel from "../../models/UserModel";

export const findUserByPhone = async (
  req: Request,
  res: Response
): Promise<Response<any>> => {
  interface Query {
    phoneNumber?: string;
  }

  const { phoneNumber } = req.query as Query;

  if (!phoneNumber) {
    return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
      ok: false,
      error: getReasonPhrase(StatusCodes.UNPROCESSABLE_ENTITY),
      message: "핸드폰 번호를 입력해주세요",
    });
  }

  const phoneRegExp = /^\d{3}\d{3,4}\d{4}$/;
  if (!phoneRegExp.test(phoneNumber)) {
    return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
      ok: false,
      error: getReasonPhrase(StatusCodes.UNPROCESSABLE_ENTITY),
      message: "잘못된 핸드폰 번호 형식입니다",
    });
  }

  try {
    const users = await UserModel.find({
      phoneNumber,
    }).sort({ createdAt: -1 });

    if (users.length === 0) {
      return res.json({
        ok: true,
        user: null,
      });
    }
    const user = users[0];

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
