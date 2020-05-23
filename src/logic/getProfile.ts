import {query} from "../dataLayer/dynamoDB";

export default async (userId: string): Promise<object[]> => {
    return await query(process.env.TABLE_USERS, userId);
}