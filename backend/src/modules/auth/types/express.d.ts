import type { TokenPayload } from "../token.schema.ts"

declare global {
  namespace Express {
    interface Request {
      user?: TokenPayload;
    }
  }
}

