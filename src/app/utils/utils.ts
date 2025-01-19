import jwt from "jsonwebtoken";
import { JWT_SECRET } from "./config";

export function generateJWTToken(
  payload: string | object | Buffer,
  expiresIn: string = "5h"
): string {
  
  if (!JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined");
  }

  return jwt.sign(payload, JWT_SECRET, { expiresIn, algorithm: "HS256" });
}

export function verifyJWTToken(token: string): Record<string, any> | null {
  try {
    
    if (!JWT_SECRET) {
      throw new Error("JWT_SECRET is not defined");
    }

    return jwt.verify(token, JWT_SECRET) as Record<string, any>;
  } catch (error) {
    console.error("Error verifying JWT:", error);
    return null;
  }
}
