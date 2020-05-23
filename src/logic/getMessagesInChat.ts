import {query, queryMsgs} from "../dataLayer/dynamoDB";

export default async (userId: string, withId: string): Promise<object[]> => {
    const user = await query(process.env.TABLE_USERS, userId)

    let chatName;
    if (user[0]['username'] < withId)
        chatName = user[0]['username'] + '-' + withId
    else
        chatName = withId + '-' + user[0]['username']
    console.log(chatName)

    return await queryMsgs(process.env.TABLE_MSGS, chatName);
}