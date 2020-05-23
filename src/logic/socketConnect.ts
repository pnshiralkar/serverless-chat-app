import {updateConn} from "../dataLayer/dynamoDB";


export default async (userId: string, connId: string): Promise<void> => {
    await updateConn(process.env.TABLE_USERS, userId, connId)
}