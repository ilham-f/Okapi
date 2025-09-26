import jwt from "jsonwebtoken";

export const generateToken = (payload: object, expiresIn: string | number = "1d") => {
  return jwt.sign(payload, process.env.JWT_SECRET as string, { expiresIn } as jwt.SignOptions);
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, process.env.JWT_SECRET as string);
};
