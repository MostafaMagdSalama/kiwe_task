import UserModel from "../models/User.model"

export const createUser = async (userName: string, password: string) => {
    const user = UserModel.create({
        userName,
        password
    })
}

export const getUser = async (userName: string) => {
    const user = UserModel.findOne({ userName })
    return user
}