import type { Request, Response } from "express"
import { gameScore } from "./game.service.js"
import ApiResponse from "../../common/utils/ApiResponse.js";

export const storeGameScore = async (req: Request,res: Response) => {

   const game = await gameScore(req.user?.id!, req.body);

   console.log(game);

   return res.status(201).json(ApiResponse.ok('Game score added successfully', game));
}