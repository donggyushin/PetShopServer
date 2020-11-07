import * as Utils from "../../utils/Utils";

import { Request, Response } from "express";
import { StatusCodes, getReasonPhrase } from "http-status-codes";

import UserModel from "../../models/UserModel";

export const setUserFcmToken = async (req: Request, res: Response) => {
  interface Head {
    authorization?: string;
  }

  interface Body {
    fcmToken?: string;
  }
  const { fcmToken } = req.body as Body;

  const { authorization } = req.headers as Head;

  if (!fcmToken || !authorization) {
    res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
      ok: false,
      error: getReasonPhrase(StatusCodes.UNPROCESSABLE_ENTITY),
      message: "hearder 혹은 token이 없습니다.",
    });
  }

  const validToken = authorization!.split(" ")[1];

  const userId = Utils.decodeToken(validToken);

  try {
    const user = await UserModel.findById(userId);
    if (user === null) {
      return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
        ok: false,
        error: getReasonPhrase(StatusCodes.UNPROCESSABLE_ENTITY),
        message: "해당 token을 사용하는 유저가 존재하지 않습니다.",
      });
    }

    await UserModel.updateOne(
      {
        _id: user._id,
      },
      {
        fcmToken,
      }
    );

    return res.json({
      ok: true,
    });
  } catch (err) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      ok: false,
      error: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR),
      message: err.message,
    });
  }
};
