import { Request, Response, json } from "express";
import { StatusCodes, getReasonPhrase } from "http-status-codes";
import UserModel, { UserType } from "../../models/UserModel";

export const createNewUser = async (
  req: Request,
  res: Response
): Promise<Response<any>> => {
  interface Body {
    userId?: string;
    password?: string;
    nickname?: string;
    phoneNumber?: string;
  }
  const { userId, password, nickname, phoneNumber } = req.body as Body;
  if (!userId || !password || !nickname || !phoneNumber) {
    return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
      ok: false,
      error: getReasonPhrase(StatusCodes.UNPROCESSABLE_ENTITY),
      message:
        "회원가입을 위한 아이디 혹은 비밀번호 혹은 닉네임 혹은 핸드폰번호가 제대로 입력이 되지 않았습니다",
    });
  }

  if (!Util.shared.checkTextValidation(Regex.shared.userIdRegex, userId)) {
    return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
      ok: false,
      error: getReasonPhrase(StatusCodes.UNPROCESSABLE_ENTITY),
      message: "유저 아이디가 적절하지 못한 포맷입니다",
    });
  }

  if (!Util.shared.checkTextValidation(Regex.shared.passwordRegex, password)) {
    return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
      ok: false,
      error: getReasonPhrase(StatusCodes.UNPROCESSABLE_ENTITY),
      message: "비밀번호가 적절하지 못한 포맷입니다",
    });
  }

  if (!Util.shared.checkTextValidation(Regex.shared.nicknameRegex, nickname)) {
    return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
      ok: false,
      error: getReasonPhrase(StatusCodes.UNPROCESSABLE_ENTITY),
      message: "닉네임이 적절하지 못한 포맷입니다",
    });
  }

  const userProperty: UserType = {
    userId,
    password,
    nickname,
    phoneNumber,
    createdAt: new Date(),
    updatedAt: new Date(),
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
