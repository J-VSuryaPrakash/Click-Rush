import type { Request, Response } from 'express'
import { gameHistory, userProfile, getDailyRank, getGlobalRank, getWeeklyRank, globalLeaders } from './user.service.js'
import ApiResponse from '../../common/utils/ApiResponse.js';

export const getUser = async (req: Request, res: Response) => {

    const user = await userProfile(req.user?.id!);

    return res.status(200).json(ApiResponse.ok('User fetched successfully', user));
}

export const getUserGameHistory = async (req: Request, res: Response) => {

    const playerHistory = await gameHistory(req.user?.id!);

    return res.status(200).json(ApiResponse.ok('Game history fetched successfully', playerHistory));
}

export const getUserRanks = async (req: Request, res: Response) => {

    const userId = req.user?.id;

    const [globalRank, dailyRank, weeklyRank] =
        await Promise.all([
            getGlobalRank(userId!),
            getDailyRank(userId!),
            getWeeklyRank(userId!),
        ]);

    return res.status(200).json(ApiResponse.ok('Ranks fetched successfully', { globalRank, dailyRank, weeklyRank }))
}

export const getGlobalLeaders = async (req: Request, res: Response) => {

    const leaders = await globalLeaders();
    return res.status(200).json(ApiResponse.ok('Global leaders fetched successfully', leaders));
}