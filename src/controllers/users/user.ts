import * as Regex from "../../constants/Constants";
import * as Util from "../../utils/Utils";

import { Request, Response } from "express";
import { StatusCodes, getReasonPhrase } from "http-status-codes";
import UserModel, { Gender, UserType } from "../../models/UserModel";

export const loginUser = async (
  req: Request,
  res: Response
): Promise<Response<any>> => {
  interface Body {
    userId?: string;
    password?: string;
  }
  const { userId, password } = req.body as Body;

  if (!userId || !password) {
    return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
      ok: false,
      error: getReasonPhrase(StatusCodes.UNPROCESSABLE_ENTITY),
      message: "아이디와 패스워드를 입력해주세요",
    });
  }

  try {
    const users = await UserModel.find({
      userId,
    });

    if (users.length == 0) {
      return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
        ok: false,
        error: getReasonPhrase(StatusCodes.UNPROCESSABLE_ENTITY),
        message:
          "해당 아이디로 존재하는 유저가 없습니다. 아이디를 다시 확인해봐주세요.",
      });
    }
    // TODO : token을 생성해준다
    if (users[0].userId === userId && users[0].password === password) {
      return res.json({
        ok: true,
        token: Util.encodeJwt(users[0]._id),
      });
    }

    return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
      ok: false,
      error: getReasonPhrase(StatusCodes.UNPROCESSABLE_ENTITY),
      message: "비밀번호가 일치하지 않습니다",
    });
  } catch (err) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      ok: false,
      error: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR),
      message: "서버 내부에서 에러가 발생하였습니다.",
    });
  }
};

export const createNewUser = async (
  req: Request,
  res: Response
): Promise<Response<any>> => {
  interface Body {
    userId?: string;
    password?: string;
    nickname?: string;
    phoneNumber?: string;
    birth?: string;
    gender?: Gender;
    profileImage?: string;
  }
  const {
    userId,
    password,
    nickname,
    phoneNumber,
    birth,
    gender,
    profileImage,
  } = req.body as Body;
  if (!userId || !password || !nickname || !phoneNumber) {
    return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
      ok: false,
      error: getReasonPhrase(StatusCodes.UNPROCESSABLE_ENTITY),
      message: "아이디, 비밀번호, 닉네임, 핸드폰번호를 모두 입력해주세요",
    });
  }

  if (!Util.checkTextValidation(Regex.userIdRegex, userId)) {
    return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
      ok: false,
      error: getReasonPhrase(StatusCodes.UNPROCESSABLE_ENTITY),
      message: "유저 아이디가 적절하지 못한 포맷입니다",
    });
  }

  if (!Util.checkTextValidation(Regex.nicknameRegex, nickname)) {
    return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
      ok: false,
      error: getReasonPhrase(StatusCodes.UNPROCESSABLE_ENTITY),
      message: "닉네임이 적절하지 못한 포맷입니다",
    });
  }

  if (!Util.checkTextValidation(Regex.passwordRegex, password)) {
    return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
      ok: false,
      error: getReasonPhrase(StatusCodes.UNPROCESSABLE_ENTITY),
      message: "비밀번호가 적절하지 못한 포맷입니다",
    });
  }

  const existingUSers = await UserModel.find({
    userId,
  });

  if (existingUSers.length !== 0) {
    return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
      ok: false,
      error: getReasonPhrase(StatusCodes.UNPROCESSABLE_ENTITY),
      message: "이미 존재하는 회원입니다. 다른 아이디를 입력해주세요.",
    });
  }

  const userProperty: UserType = {
    userId,
    password,
    nickname,
    phoneNumber,
    createdAt: new Date(),
    updatedAt: new Date(),
    birth,
    gender,
    profileImage,
  };

  const newUser = new UserModel(userProperty);

  try {
    await newUser.save();
    return res.json({
      ok: true,
    });
  } catch (err) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      ok: false,
      error: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR),
      message: "서버 내부 에러가 발생하였습니다. ",
    });
  }
};

export const findUserByUserId = async (
  req: Request,
  res: Response
): Promise<Response<any>> => {
  interface Query {
    userId?: string;
  }

  const { userId } = req.query as Query;
  if (!userId) {
    return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
      ok: false,
      error: getReasonPhrase(StatusCodes.UNPROCESSABLE_ENTITY),
      message: "유저 아이디를 입력하세요",
    });
  }

  try {
    const user = await UserModel.findOne({
      userId,
    });

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
