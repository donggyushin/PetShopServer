import { MessageInstance } from 'twilio/lib/rest/api/v2010/account/message'
import dotenv from 'dotenv'
import twilio from 'twilio'

dotenv.config()

const accountSid = process.env.TWILIO_ACCOUNT_SID
const authToken = process.env.TWILIO_AUTH_TOKEN
const fromNumber = process.env.TWILIO_FROM_NUMBER

const client = twilio(accountSid, authToken)

export const sendSMS = async (body:string,  to:string):Promise<MessageInstance> => {
const message = await client.messages.create({
  body,
  from:fromNumber,
  to
 })
 return message
}

