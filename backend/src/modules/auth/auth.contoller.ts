import type { Request, Response } from "express";
import ApiResponse from "../../common/utils/ApiResponse.js";
import { registerUser, loginUser, logoutUser } from "./auth.service.js";
import { verifyAccessToken } from "../../common/utils/Jwt.utils.js";

export const createUser = async (req: Request, res: Response) => {

    const { accessToken, refreshToken, newUser } = await registerUser(req.body);

    return res.status(201)
        .cookie('accessToken', accessToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'none'
        })
        .cookie('refreshToken',  refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'none'
        })
        .json(ApiResponse.created('User successfully created', newUser));
}

export const login = async (req: Request, res: Response) => {

    const { accessToken, refreshToken, userData } = await loginUser(req.body);

    return res.status(201)
        .cookie('accessToken', accessToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'none'
        })
        .cookie('refreshToken',  refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'none'
        })
        .json(ApiResponse.created('User successfully loggedin', userData));
}

export const logout = async (req: Request, res: Response) => {
    
    logoutUser(req.user?.id!);
    
    return res.status(200)
            .clearCookie('accessToken')
            .clearCookie('refreshToken')
            .json(ApiResponse.ok('Uses logout successful'))

}
