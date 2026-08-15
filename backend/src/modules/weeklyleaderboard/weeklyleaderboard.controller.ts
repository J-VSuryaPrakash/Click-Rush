import type { Request, Response } from 'express'
import { allLeaders } from './weeklyleaderboard.service.js'
import ApiResponse from '../../common/utils/ApiResponse.js';

export const getAllLeaders = async (req: Request, res: Response) => {

    const allWeeklyLeaders = await allLeaders()

    return res.status(200).json(ApiResponse.ok('All daily leaders fetched successfully', allWeeklyLeaders));
}