import {create, queryByUsername} from "../dataLayer/dynamoDB";

export default async (userId: string, username: string, name: string): Promise<object> => {
    const checkUser = await queryByUsername(process.env.TABLE_USERS, username)
    if (checkUser.length > 0)
        throw new Error('Profile already exists')

    const item = {userId, username, name, chats: {}}
    await create(process.env.TABLE_USERS, item);
    return item
}