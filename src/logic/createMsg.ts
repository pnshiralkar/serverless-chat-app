import {create, query, queryByUsername, updateChats} from "../dataLayer/dynamoDB";
import * as uuid from 'uuid'

export default async (userId: string, to: string, message: string): Promise<object> => {
    const user = await query(process.env.TABLE_USERS, userId);
    const toUser = await queryByUsername(process.env.TABLE_USERS, to);
    const chatsFrom = user[0]['chats']
    const chatsTo = toUser[0]['chats']

    if(!chatsFrom.includes(to)) {
        chatsFrom.push(to)
        await updateChats(process.env.TABLE_USERS, userId, chatsFrom)
    }
    if(!chatsTo.includes(user[0]['username'])) {
        chatsTo.push(user[0]['username'])
        await updateChats(process.env.TABLE_USERS, toUser[0]["userId"], chatsTo)
    }

    const msgId = uuid.v4()

    const item = {msgId, from: user[0]["username"], message, to}
    await create(process.env.TABLE_MSGS, item);
    return item
}