import { Request, Response } from "express";
import { StatusCodes, getReasonPhrase } from "http-status-codes";

import PetModel from "../../models/PetModel";

type Gender = "male" | "female";

const UpdatePetProfile = async (req: Request, res: Response) => {
  interface IBody {
    petId?: string;
    petProfileImage?: string;
    petName?: string;
    petBirthYear?: string;
    petBirthMonth?: string;
    petBirthDay?: string;
    petKind?: string;
    petGender?: Gender;
  }
  const {
    petId,
    petProfileImage,
    petName,
    petBirthYear,
    petBirthMonth,
    petBirthDay,
    petKind,
    petGender,
  } = req.body as IBody;

  if (
    !petId ||
    !petName ||
    !petBirthYear ||
    !petBirthMonth ||
    !petBirthDay ||
    !petKind ||
    !petGender
  ) {
    return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
      ok: false,
      error: getReasonPhrase(StatusCodes.UNPROCESSABLE_ENTITY),
      message: "인자를 제대로 전달받지 못하였습니다",
    });
  }

  try {
    const pet = await PetModel.findById(petId);

    if (!pet) {
      return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
        ok: false,
        error: getReasonPhrase(StatusCodes.UNPROCESSABLE_ENTITY),
        message: "해당 식별자의 반려동물을 찾을 수 없습니다.",
      });
    }

    const date = new Date(`${petBirthYear}-${petBirthMonth}-${petBirthDay}`);

    if (petProfileImage) {
      await pet.updateOne({
        photourl: petProfileImage,
        gender: petGender,
        birthDate: date,
        name: petName,
        kind: petKind,
      });

      return res.json({
        ok: true,
      });
    } else {
      await pet.updateOne({
        gender: petGender,
        birthDate: date,
        name: petName,
        kind: petKind,
      });

      return res.json({
        ok: true,
      });
    }
  } catch (err) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      ok: false,
      error: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR),
      message: err.message,
    });
  }
};
export default UpdatePetProfile;
