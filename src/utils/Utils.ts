import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

export const checkTextValidation = (regex: RegExp, text: string) => {
  return regex.test(text);
};

export type JwtType = {
  id: string;
};

export const encodeJwt = (text: string): string => {
  const key = process.env.JSON_WEB_TOKEN_KEY || "";
  const keyType: JwtType = {
    id: text,
  };
  const token = jwt.sign(keyType, key);
  return token;
};

export const decodeToken = (token: string): string => {
  const key = process.env.JSON_WEB_TOKEN_KEY || "";
  const decodedToken = jwt.verify(token, key) as JwtType;
  return decodedToken.id;
};
