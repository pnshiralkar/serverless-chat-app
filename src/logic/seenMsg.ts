import {queryByUsername, updateSeen} from "../dataLayer/dynamoDB";

export default async (userId: string, to: string): Promise<void> => {
    const toUser = await queryByUsername(process.env.TABLE_USERS, to);

    await updateSeen(process.env.TABLE_USERS, userId, toUser[0]['username'])
}