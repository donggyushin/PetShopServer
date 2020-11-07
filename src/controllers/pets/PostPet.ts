import PetModel, { PetType } from "../../models/PetModel";
import { Request, Response } from "express";
import { StatusCodes, getReasonPhrase } from "http-status-codes";

import UserModel from "../../models/UserModel";
import { decodeToken } from "../../utils/Utils";

export const postNewPet = async (
  req: Request,
  res: Response
): Promise<Response<any>> => {
  interface Head {
    authorization?: string;
  }

  type PetSort = "강아지" | "고양이";
  type Gender = "male" | "female";

  interface Body {
    petSort?: PetSort;
    name: string;
    kind?: string;
    personality?: string[];
    photourl?: string;
    gender: Gender;
    birth: string;
  }

  const { authorization } = req.headers as Head;
  const {
    personality,
    petSort,
    name,
    kind,
    photourl,
    gender,
    birth,
  } = req.body as Body;

  if (!authorization) {
    return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
      ok: false,
      error: getReasonPhrase(StatusCodes.UNPROCESSABLE_ENTITY),
      message: "로그인 인증이 제대로 이루어지고 있지 않습니다.",
    });
  }

  if (!name || !kind || !photourl || !gender || !birth) {
    return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
      ok: false,
      error: getReasonPhrase(StatusCodes.UNPROCESSABLE_ENTITY),
      message:
        "반려동물의 이름, 품종, 사진, 성별, 생년월일은 필수 입력조건입니다",
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
        message: "유효하지 않은 유저입니다",
      });
    }

    const petProperties: PetType = {
      userIdentifier: user._id,
      petSort,
      name,
      kind,
      personality,
      photourl,
      gender,
      birth,
    };

    const newPet = await new PetModel(petProperties);
    await newPet.save();
    return res.json({
      ok: true,
    });
  } catch (err) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      ok: false,
      error: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR),
      message: "서버에서 알 수 없는 에러가 발생하였습니다",
    });
  }
};
