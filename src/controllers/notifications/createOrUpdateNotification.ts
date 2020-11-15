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
    firstNotifiedYear: string;
    firstNotifiedMonth: string;
    firstNotifiedDate: string;
  }
  const { authorization } = req.headers as IHeaders;
  const {
    petId,
    notificationName,
    isOn,
    firstNotifiedDate,
    firstNotifiedMonth,
    firstNotifiedYear,
  } = req.body as IBody;

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

    console.log(req.body);

    if (
      !petId ||
      !notificationName ||
      !isOn ||
      !firstNotifiedDate ||
      !firstNotifiedMonth ||
      !firstNotifiedYear
    ) {
      return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
        ok: false,
        error: getReasonPhrase(StatusCodes.UNPROCESSABLE_ENTITY),
        message: `${petId}, ${notificationName}, ${isOn}, ${firstNotifiedDate}, ${firstNotifiedMonth}, ${firstNotifiedYear}`,
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

      // 강아지 생일 주기 1년
      if (notificationName === "birth") {
        createOrUpdateFunc(
          notifications,
          petId,
          isOn,
          user,
          notificationName,
          firstNotifiedYear,
          firstNotifiedMonth,
          firstNotifiedDate,
          365,
          res
        );
      }

      // 강아지 구충제 주기 4개월
      if (notificationName === "helminthic") {
        createOrUpdateFunc(
          notifications,
          petId,
          isOn,
          user,
          notificationName,
          firstNotifiedYear,
          firstNotifiedMonth,
          firstNotifiedDate,
          120,
          res
        );
      }

      // 강아지 진드기약 바르는 약 1개월
      if (notificationName === "mite-cover") {
        createOrUpdateFunc(
          notifications,
          petId,
          isOn,
          user,
          notificationName,
          firstNotifiedYear,
          firstNotifiedMonth,
          firstNotifiedDate,
          30,
          res
        );
      }

      // 강아지 진드기약 먹는약 3개월
      if (notificationName === "mite-eating") {
        createOrUpdateFunc(
          notifications,
          petId,
          isOn,
          user,
          notificationName,
          firstNotifiedYear,
          firstNotifiedMonth,
          firstNotifiedDate,
          90,
          res
        );
      }

      // 강아지 심장사상충 1달(치명적일 수 있으니 하이라이트 처리해주기)
      if (notificationName === "Dirofilaria-immitis") {
        createOrUpdateFunc(
          notifications,
          petId,
          isOn,
          user,
          notificationName,
          firstNotifiedYear,
          firstNotifiedMonth,
          firstNotifiedDate,
          30,
          res
        );
      }

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

const createOrUpdateFunc = async (
  notifications: INotification[],
  petId: string,
  isOn: boolean,
  user: IUser,
  name: NotificationName,
  firstNotifiedYear: string,
  firstNotifiedMonth: string,
  firstNotifiedDate: string,
  dayPeriod: number,
  res: Response
) => {
  const filteredNotifications = notifications.filter(
    (item) => item.name === name
  );
  const firstNotified = new Date(
    `${firstNotifiedYear}-${firstNotifiedMonth}-${firstNotifiedDate}`
  );
  if (filteredNotifications.length === 0) {
    // 기존에 알림이 존재하지 않을때
    const ingredient: NotificationType = {
      petIdentifier: petId,
      userFcmToken: user.fcmToken || "",
      name,
      isOn,
      createdAt: new Date(),
      updatedAt: new Date(),
      firstNotified,
      dayPeriod,
    };

    const miteEatingNotification = new NotificationModel(ingredient);
    await miteEatingNotification.save();
    return res.json({
      ok: true,
    });
  } else {
    // 기존에 이미 알림이 존재할때
    const filteredNotification = filteredNotifications[0];
    await filteredNotification.update({
      userFcmToken: user.fcmToken || "",
      updatedAt: new Date(),
      isOn,
    });
    return res.json({
      ok: true,
    });
  }
};

export default createOrUpdateNotification;
