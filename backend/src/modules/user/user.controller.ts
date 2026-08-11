import type { Request, Response } from 'express'
import { bestScore, gameHistory, userProfile } from './user.service.js'
import ApiResponse from '../../common/utils/ApiResponse.js';

export const getUser = async (req: Request, res: Response) => {

    const user = await userProfile(req.user?.id!);

    return res.status(200).json(ApiResponse.ok('User fetched successfully', user));
}

export const getUserGameHistory = async (req: Request, res: Response) => {

    const history = await gameHistory(req.user?.id!);

    return res.status(200).json(ApiResponse.ok('Game history fetched successfully', history));
}

export const getUserBestScore = async (req: Request, res: Response) => {

    const score = await bestScore(req.user?.id!);

    return res.status(200).json(ApiResponse.ok('Best score fetched successfully', score));
}