import { NextFunction, Request, Response } from "express";
import {
 StatusCodes,
 getReasonPhrase,
} from 'http-status-codes';
import VerificationModel, { VerificationType } from "../../models/VerificationModel";

import random from 'random'
import { sendSMS } from "../../utils/twilio/twilio";

export const verifyVerification = async (req:Request, res:Response, next:NextFunction):Promise<Response<any>> => {
  interface Query {
    phoneNumber?:string 
    verificationCode?:string
  }
  
  const {phoneNumber, verificationCode} = req.query as Query
  if (!phoneNumber) {
    return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
      ok:false ,
      error: getReasonPhrase(StatusCodes.UNPROCESSABLE_ENTITY),
      message:'핸드폰 번호를 입력해주세요'
    })
  }

  const phoneRegExp = /^\d{3}\d{3,4}\d{4}$/;
 if (!phoneRegExp.test(phoneNumber)) {
    return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
      ok:false,
      error: getReasonPhrase(StatusCodes.UNPROCESSABLE_ENTITY),
      message:'잘못된 핸드폰 번호 형식입니다'
    })
 }

 try{
  const verifications = await VerificationModel.find({
    phoneNumber
   }).sort({createdAt:-1})
   if (verifications.length === 0 ){
     return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
       ok:false,
       error:getReasonPhrase(StatusCodes.UNPROCESSABLE_ENTITY),
       message:'해당 핸드폰 번호에 해당하는 인증 정보가 없습니다. 핸드폰 번호를 다시 확인하고 인증 요청을 다시 진행해주세요'
     })
   }
   const verification = verifications[0]
  
   const now = new Date()
   const expireDate = verification.createdAt
   expireDate.setSeconds(expireDate.getSeconds() + 180)
   
   if (expireDate < now) {
     return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
       ok:false,
       error: getReasonPhrase(StatusCodes.UNPROCESSABLE_ENTITY),
       message:'인증코드의 유효기간이 만료되었습니다. 인증코드를 다시 발급받아주세요'
     })
   }
   
  
  if (verification.verificationCode !== verificationCode) {
    return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
      ok:false,
      error: getReasonPhrase(StatusCodes.UNPROCESSABLE_ENTITY),
      message:'인증 코드의 값이 다릅니다.'
    })
  }
  
  await VerificationModel.deleteMany({
    phoneNumber
  })
  
  return res.json({
    ok:true
  })

 }catch(err) {
  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    ok:false,
    error: StatusCodes.INTERNAL_SERVER_ERROR,
    message:'서버 내부 에러가 발생하였습니다.'
  })
 }
}

export const postVerification = async (req: Request, res: Response, next: NextFunction):Promise<Response<any>> => {
 interface Body {
  phoneNumber?:string
 }
 const {phoneNumber} = req.body as Body

 if (phoneNumber === undefined) {
  return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
   ok:false,
   error:getReasonPhrase(StatusCodes.UNPROCESSABLE_ENTITY),
   message: '핸드폰 번호를 입력해주세요'
  })
 }

 
 const phoneRegExp = /^\d{3}\d{3,4}\d{4}$/;
 if (!phoneRegExp.test(phoneNumber)) {
    return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
      ok:false,
      error: getReasonPhrase(StatusCodes.UNPROCESSABLE_ENTITY),
      message:'잘못된 핸드폰 번호 형식입니다'
    })
 }


 const verificationCode = random.int(100000, 999999)



 const verification = new VerificationModel({
   phoneNumber:phoneNumber,
   verificationCode:verificationCode.toString(),
   createdAt:new Date(),
   updatedAt: new Date()
 } as VerificationType)

 
 try{
  await verification.save()
  
  // TODO: 전달받은 핸드폰 번호로 문자메시지 보내기
  
  await sendSMS(`보안코드는 ${verificationCode} 입니다. \n-멍샵`, `+82${phoneNumber.substring(1)}`)

  return res.json({
   ok:true,
   verification
  })

 }catch(err) {
  console.error(err.message)
  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
   ok:false,
   error: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR),
   message:'서버 내부 에러가 발생하였습니다.'
  })
 }
 

 

}