import {create} from "../dataLayer/dynamoDB";

export default async (userId: string, username: string, name: string): Promise<object> => {
    const item = {userId, username, name, chats: []}
    await create(process.env.TABLE_USERS, item);
    return item
}