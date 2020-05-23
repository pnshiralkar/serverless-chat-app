import {queryByConnId, removeConn} from "../dataLayer/dynamoDB";


export default async (connId: string): Promise<void> => {
    const user = await queryByConnId(process.env.TABLE_USERS, connId)
    const userId = user[0]['userId']

    await removeConn(process.env.TABLE_USERS, userId)
}