import ApiError from "../../common/utils/ApiError.js";
import { generateAccessToken, generateRefreshToken, hashPassword, verifyPassword, verifyAccessToken, verifyRefreshToken } from '../../common/utils/Jwt.utils.js';
import { db } from "../../common/db/index.js";
import type { RegisterSchema } from "./dto/register.dto.js";
import type { LoginSchema } from "./dto/login.dto.js";
import { users } from "../../common/db/schema.js";
import { eq } from "drizzle-orm";

const registerUser = async (data: RegisterSchema) => {

    const { name, email, password } = data;

    const userExists = await db.select({ id: users.id }).from(users).where(eq(users.email, email));

    if (userExists.length > 0) {
        throw ApiError.existingUser('User already exists');
    }

    const hashedPassword = await hashPassword(password);

    const [user] = await db
        .insert(users)
        .values({ username: name, email: email, passwordHash: hashedPassword })
        .returning({
            id: users.id,
            name: users.username,
            email: users.email
        })

    if (!user) {
        throw ApiError.serverError('Unable to create user');
    }

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    const newUser = await db.update(users)
        .set({ refreshToken: refreshToken })
        .where(eq(users.email, user.email))
        .returning({
            id: users.id,
            name: users.username,
            email: users.email
        })

    return { newUser, accessToken, refreshToken };
}

const loginUser = async (data: LoginSchema) => {

    const { email, password } = data;

    const [user] = await db.select().from(users).where(eq(users.email, email));

    if (!user) {
        throw ApiError.userNotFound('User not found');
    }

    const passwordHash = user.passwordHash;

    const isPasswordValid = verifyPassword(password, passwordHash);

    if (!isPasswordValid) {
        throw ApiError.invalidPassword('Password is incorrect');
    }

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    const userData = await db.update(users)
        .set({ refreshToken: refreshToken })
        .where(eq(users.id, user.id))
        .returning({
            id: users.id,
            name: users.username,
            email: users.email
        })

    return { accessToken, refreshToken, userData };
}

const logoutUser = async (userId: string) => {

    await db.update(users)
        .set({ refreshToken: null })

    return;
}

const tokenRefresh = async (token: string) => {

    const decodedToken = verifyRefreshToken(token);

    if (!decodedToken) {
        throw ApiError.invalidToken('Invalid token');
    }

    const userId = decodedToken.id;

    const [user] = await db.select({ id: users.id, email: users.email }).from(users).where(eq(users.id, userId));

    if (!user) {
        throw ApiError.userNotFound('User not found');
    }

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    await db.update(users).set({ refreshToken: refreshToken });

    return { accessToken, refreshToken };
}

export {
    registerUser,
    loginUser,
    logoutUser,
    tokenRefresh
}