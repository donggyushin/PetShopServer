import * as Utils from "../../utils/Utils";

import NotificationModel, {
  INotification,
  NotificationName,
  NotificationType,
} from "../../models/NotificationModel";
import { Request, Response } from "express";
import { StatusCodes, getReasonPhrase } from "http-status-codes";
import UserModel, { IUser } from "../../models/UserModel";

import PetModel from "../../models/PetModel";

const createOrUpdateNotification = async (req: Request, res: Response) => {
  interface IHeaders {
    authorization: string;
  }
  interface IBody {
    petId: string;
    notificationName: NotificationName;
    isOn: boolean;
  }
  const { authorization } = req.headers as IHeaders;
  const { petId, notificationName, isOn } = req.body as IBody;

  if (!authorization) {
    return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
      ok: false,
      error: getReasonPhrase(StatusCodes.UNPROCESSABLE_ENTITY),
      message: "유저 인증이 제대로 이루어지지 않고 있습니다 ㅠㅠ",
    });
  }

  const validToken = authorization!.split(" ")[1];
  const userId = Utils.decodeToken(validToken);
  try {
    const user = await UserModel.findById(userId);

    if (!user) {
      return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
        ok: false,
        error: getReasonPhrase(StatusCodes.UNPROCESSABLE_ENTITY),
        message: "유저 인증이 제대로 이루어지지 않고 있습니다 ㅠㅠ",
      });
    }

    if (!petId || !notificationName || !isOn) {
      return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
        ok: false,
        error: getReasonPhrase(StatusCodes.UNPROCESSABLE_ENTITY),
        message: "제대로 전달받지 못하고 있는 인자가 있습니다",
      });
    }

    const pet = await PetModel.findById(petId);
    if (pet === null) {
      return res.json({
        ok: false,
        error: getReasonPhrase(StatusCodes.UNPROCESSABLE_ENTITY),
        message: "존재하지 않는 반려동물입니다",
      });
    }

    const notifications = await NotificationModel.find({
      petIdentifier: petId,
    });

    if (pet.petSort === "강아지") {
      // 강아지 파트
      // 강아지 구충제 주기 4개월
      if (notificationName === "helminthic") {
        helminthicFunc(notifications, petId, isOn, user, res);
      }

      // 강아지 진드기약 바르는 약 1개월, 먹는약 3개월

      // 강아지 심장사상충 1달(치명적일 수 있으니 하이라이트 처리해주기)

      // 아직 준비하지 못한 기능들
      return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
        ok: false,
        error: getReasonPhrase(StatusCodes.UNPROCESSABLE_ENTITY),
        message: "준비중인 기능입니다",
      });
    } else {
      return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
        ok: false,
        error: getReasonPhrase(StatusCodes.UNPROCESSABLE_ENTITY),
        message: "준비중인 기능입니다",
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

const helminthicFunc = async (
  notifications: INotification[],
  petId: string,
  isOn: boolean,
  user: IUser,
  res: Response
) => {
  const helminthicnotifications = notifications.filter(
    (item) => item.name === "helminthic"
  );
  if (helminthicnotifications.length === 0) {
    // 기존에 해당 notification이 없었다면 새로 만들어주기
    const ingredient: NotificationType = {
      petIdentifier: petId,
      userFcmToken: user.fcmToken || "",
      name: "helminthic",
      dayPeriod: 120,
      isOn,
      createdAt: new Date(),
      updatedAt: new Date(),
      lastNotified: new Date(),
    };
    const helminthicNotification = new NotificationModel(ingredient);
    await helminthicNotification.save();
    return res.json({
      ok: true,
    });
  } else {
    // 기존에 해당 notification이 있었다면 수정해주기
    const helminthicnotification = helminthicnotifications[0];
    await helminthicnotification.update({
      lastNotified: new Date(),
      userFcmToken: user.fcmToken || "",
      isOn,
    });
    return res.json({
      ok: true,
    });
  }
};

export default createOrUpdateNotification;
