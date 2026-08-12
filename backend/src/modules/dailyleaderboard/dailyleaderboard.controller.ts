import type { Request, Response } from 'express'
import { allLeaders, leaders } from './dailyleaderboard.service.js'
import ApiResponse from '../../common/utils/ApiResponse.js';

export const getTopThree = async (req: Request, res: Response) => {

    const topLeaders = await leaders();
    console.log(topLeaders);
    return res.status(200).json(ApiResponse.ok('Top 3 leaders fetched successfully', topLeaders));
}

export const getAllLeaders = async (req: Request, res: Response) => {

    const allDailyLeaders = await allLeaders()

    return res.status(200).json(ApiResponse.ok('All daily leaders fetched successfully', allDailyLeaders));
}