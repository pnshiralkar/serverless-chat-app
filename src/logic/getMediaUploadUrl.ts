import {getUploadUrl} from "../dataLayer/s3";
import * as uuid from 'uuid'


export default async (filename: string) => {
    const name = uuid.v4()
    const ext = filename.split('.')[filename.split('.').length - 1]
    const path = `media/chats/${name}.${ext}`
    const url = await getUploadUrl(process.env.BUCKET_NAME, path)
    return {url, path}
}