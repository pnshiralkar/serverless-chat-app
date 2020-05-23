import {create, query, queryByUsername, updateChats} from "../dataLayer/dynamoDB";
import * as uuid from 'uuid'
import {notify} from "../dataLayer/websockets";

export default async (userId: string, to: string, message: string): Promise<object> => {
    const user = await query(process.env.TABLE_USERS, userId);
    const toUser = await queryByUsername(process.env.TABLE_USERS, to);
    const chatsFrom = user[0]['chats']
    const chatsTo = toUser[0]['chats']

    if (!chatsFrom.includes(to)) {
        chatsFrom.push(to)
        await updateChats(process.env.TABLE_USERS, userId, chatsFrom)
    }
    if (!chatsTo.includes(user[0]['username'])) {
        chatsTo.push(user[0]['username'])
        await updateChats(process.env.TABLE_USERS, toUser[0]["userId"], chatsTo)
    }

    const msgId = uuid.v4()
    let chatName;
    if (user[0]['username'] < toUser[0]['username'])
        chatName = user[0]['username'] + '-' + toUser[0]['username']
    else
        chatName = toUser[0]['username'] + '-' + user[0]['username']


    const item = {msgId, chatName, createdAt: "" + new Date(), from: user[0]["username"], to, message}
    await create(process.env.TABLE_MSGS, item);

    await notify(toUser[0]["socketConnectionId"], {item})

    return item
}