import NotificationModel, {
  NotificationName,
  NotificationType,
} from "../../models/NotificationModel";
import { Request, Response } from "express";
import { StatusCodes, getReasonPhrase } from "http-status-codes";

const turnOffNotification = async (req: Request, res: Response) => {
  interface IBody {
    petId: string;
    notificationName: NotificationName;
  }
  const { petId, notificationName } = req.body as IBody;
  if (!petId || !notificationName) {
    return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
      ok: false,
      error: getReasonPhrase(StatusCodes.UNPROCESSABLE_ENTITY),
      message: "pet id 혹은 notificationName을 제대로 입력해주세요!",
    });
  }

  try {
    const notification = await NotificationModel.findOne({
      petIdentifier: petId,
      name: notificationName,
    });

    if (notification === null) {
      return res.json({
        ok: true,
      });
    }

    await notification.updateOne({
      isOn: false,
    });

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

export default turnOffNotification;
