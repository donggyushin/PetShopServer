import { Request, Response } from "express";
import { StatusCodes, getReasonPhrase } from "http-status-codes";

import NotificationModel from "../../models/NotificationModel";
import PetModel from "../../models/PetModel";

export const getNotificationList = async (req: Request, res: Response) => {
  const { petId } = req.params;
  try {
    const pet = await PetModel.findById(petId);
    if (pet) {
      const notifications = await NotificationModel.find({
        petIdentifier: petId,
      });
      return res.json({
        ok: true,
        notifications,
      });
    } else {
      return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
        ok: false,
        error: getReasonPhrase(StatusCodes.UNPROCESSABLE_ENTITY),
        message: "존재하지 않는 반려동물이에요!",
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
