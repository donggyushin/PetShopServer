import { Request, Response } from "express";
import { StatusCodes, getReasonPhrase } from "http-status-codes";

import PetModel from "../../models/PetModel";

export const deletePetPhoto = async (req: Request, res: Response) => {
  const { petPhotoId, petId } = req.query;

  if (!petPhotoId || !petId) {
    return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
      ok: false,
      error: getReasonPhrase(StatusCodes.UNPROCESSABLE_ENTITY),
      message: "사진의 식별자 혹은 반려동물의 알 수 없음.",
    });
  }

  try {
    const pet = await PetModel.findById(petId);
    if (!pet) {
      return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
        ok: false,
        error: getReasonPhrase(StatusCodes.UNPROCESSABLE_ENTITY),
        message: "해당 식별자를 가진 반려동물을 찾을 수 없음",
      });
    }

    const petPhotos = pet.photos || [];
    const updatedPetPhotos = petPhotos.filter((photo) => {
      console.log("photo id: ", photo._id);
      console.log("petPhoto id: ", petPhotoId);
      return photo._id !== petPhotoId;
    });

    await pet.updateOne({
      photos: updatedPetPhotos,
    });

    return res.json({
      ok: true,
      updatedPetPhotos,
    });
  } catch (err) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      ok: false,
      error: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR),
      message: err.message,
    });
  }
};
