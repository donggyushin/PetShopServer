import NotificationModel, {
  NotificationName,
} from "../../models/NotificationModel";
import { Request, Response } from "express";
import { StatusCodes, getReasonPhrase } from "http-status-codes";

const findNotificationByPetIdAndNotificationName = async (
  req: Request,
  res: Response
) => {
  const { petId, notificationName } = req.params;
  const name = notificationName as NotificationName;
  try {
    const notification = await NotificationModel.findOne({
      petIdentifier: petId,
      name,
    });
    return res.json({
      ok: true,
      notification,
    });
  } catch (err) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      ok: false,
      error: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR),
      message: err.message,
    });
  }
};
export default findNotificationByPetIdAndNotificationName;
