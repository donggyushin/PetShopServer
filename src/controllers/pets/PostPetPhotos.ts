import { Request, Response } from "express";
import { StatusCodes, getReasonPhrase } from "http-status-codes";

import PetModel from "../../models/PetModel";

export const postPetPhotos = async (
  req: Request,
  res: Response
): Promise<Response<any>> => {
  interface Body {
    petId?: string;
    petPhotoUrl?: string[];
  }

  const { petId, petPhotoUrl } = req.body as Body;

  if (!petId || !petPhotoUrl) {
    return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
      ok: false,
      error: getReasonPhrase(StatusCodes.UNPROCESSABLE_ENTITY),
      message: "pet id 혹은 pet photo url이 존재하지 않습니다.",
    });
  }

  if (petPhotoUrl!.length === 0) {
    return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
      ok: false,
      error: getReasonPhrase(StatusCodes.UNPROCESSABLE_ENTITY),
      message: "사진을 등록해주세요",
    });
  }

  try {
    const pet = await PetModel.findById(petId!);
    if (pet === null) {
      return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
        ok: false,
        error: getReasonPhrase(StatusCodes.UNPROCESSABLE_ENTITY),
        message: "해당 반려동물이 존재하지 않습니다",
      });
    }

    type Photos = {
      url: string;
      favorite: boolean;
    }[];

    const photos = pet.photos || [];

    petPhotoUrl!.map((url) => {
      photos.push({
        url,
        favorite: false,
      });
    });

    await pet.update({
      photos,
    });

    return res.json({
      ok: true,
      photos,
    });
  } catch (err) {
    console.log(err.message);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      ok: false,
      error: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR),
      message: "서버 내부 에러 발생",
    });
  }
};
