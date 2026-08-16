import type { Request, Response } from "express";
import ApiResponse from "../../common/utils/ApiResponse.js";
import { registerUser, loginUser, logoutUser, tokenRefresh, getUser } from "./auth.service.js";

export const createUser = async (req: Request, res: Response) => {

    const { accessToken, refreshToken, newUser } = await registerUser(req.body);

    return res.status(201)
        .cookie('accessToken', accessToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'none'
        })
        .cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'none'
        })
        .json(ApiResponse.created('User successfully created', newUser));
}

export const login = async (req: Request, res: Response) => {

    const { accessToken, refreshToken, userData } = await loginUser(req.body);

    return res.status(200)
        .cookie('accessToken', accessToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'none'
        })
        .cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'none'
        })
        .json(ApiResponse.ok('User successfully loggedin', userData));
}

export const logout = async (req: Request, res: Response) => {

    logoutUser(req.user?.id!);

    return res.status(200)
        .clearCookie('accessToken',{
            httpOnly: true,
            secure: true,
            sameSite: 'none'
        })
        .clearCookie('refreshToken',{
            httpOnly: true,
            secure: true,
            sameSite: 'none'
        })
        .json(ApiResponse.ok('User logout successful', null))

}

export const refresh = async (req: Request, res: Response) => {

    const { accessToken, refreshToken } = await tokenRefresh(req.cookies.refreshToken);

    res.status(200)
        .cookie('accessToken', accessToken)
        .cookie('refreshToken', refreshToken)
        .send(ApiResponse.ok('Tokens are refreshed', null));
}

export const getMe = async (req: Request, res: Response)=>{

    const user = await getUser(req.user?.id!);
    
    return res.status(200).json(ApiResponse.ok('User fetched successfully', user));
} 