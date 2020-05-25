import {create, query, queryByUsername, updateChats} from "../dataLayer/dynamoDB";
import * as uuid from 'uuid'
import {notify} from "../dataLayer/websockets";
import {getDownloadUrl} from "../dataLayer/s3";

export default async (userId: string, to: string, type: string, message: string, path: any, connId: string): Promise<object> => {
    const user = await query(process.env.TABLE_USERS, userId);
    const toUser = await queryByUsername(process.env.TABLE_USERS, to);
    const chatsFrom = user[0]['chats']
    const chatsTo = toUser[0]['chats']

    const msgId = uuid.v4()
    let chatName;
    if (user[0]['username'] < toUser[0]['username'])
        chatName = user[0]['username'] + '-' + toUser[0]['username']
    else
        chatName = toUser[0]['username'] + '-' + user[0]['username']

    let item;
    if(path)
        item = {msgId, chatName, createdAt: "" + new Date(), from: user[0]["username"], to, type, message, path}
    else
        item = {msgId, chatName, createdAt: "" + new Date(), from: user[0]["username"], to, type, message}

    if (!chatsFrom[to])
        chatsFrom[to] = {user: {name: toUser[0]["name"]}, lastMsg: item, unreadCount: 0}
    else {
        chatsFrom[to].lastMsg = item
    }
    await updateChats(process.env.TABLE_USERS, userId, chatsFrom)

    if (!chatsTo[user[0]['username']])
        chatsTo[user[0]['username']] = {user: {name: user[0]["name"]},lastMsg: item, unreadCount: 1}
    else {
        chatsTo[user[0]['username']].lastMsg = item
        chatsTo[user[0]['username']].unreadCount = chatsTo[user[0]['username']].unreadCount + 1
    }
    await updateChats(process.env.TABLE_USERS, toUser[0]["userId"], chatsTo)

    await create(process.env.TABLE_MSGS, item);

    if(item.path)
        item.photoUrl = await getDownloadUrl(process.env.BUCKET_NAME, item.path)

    await notify(toUser[0]["socketConnectionId"], {item})
    await notify(connId || user[0]['socketConnectionId'], {item})

    return item
}