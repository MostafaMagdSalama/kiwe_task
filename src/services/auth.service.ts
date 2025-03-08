import { logger } from '../config/Logger';
import * as authDal from '../dal/auth.dal'
import { HttpError } from '../errors/http-error';
import jwt from 'jsonwebtoken';

export const createUser = async (userName: string, password: string) => {
    logger.info("service... createUser...");

    return await authDal.createUser(userName, password)
}
export const login = async (userName: string, password: string) => {

    logger.info("service... login...");

    const user = await authDal.getUser(userName);
    if (!user || !(await user.comparePassword(password))) {
        throw new HttpError("Username or password is incorrect", 401);
    }

    const token = jwt.sign({ userId: user._id }, process.env.SECRET ?? "", {
        expiresIn: '1h',
    });

    return token
}