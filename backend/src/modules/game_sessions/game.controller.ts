import type { Request, Response } from "express"
import { completeGame, startGame } from "./game.service.js"
import ApiResponse from "../../common/utils/ApiResponse.js";
import ApiError from "../../common/utils/ApiError.js";

export const createGame = async (req: Request, res: Response) => {

   const game = await startGame(req.user?.id!);

   return res.status(201).json(ApiResponse.created('Game started successfully', game));
}

export const submitGame = async (req: Request, res: Response) => {

   const gameId = Array.isArray(req.params.gameId)
      ? req.params.gameId[0]
      : req.params.gameId;

   if (!gameId) {
      throw ApiError.invalidData('Invalid game id');
   }

   const game = await completeGame(req.user?.id!, gameId, req.body);

   return res.status(200).json(ApiResponse.ok('Game completed successfully', game));
}