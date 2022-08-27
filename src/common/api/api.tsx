import { instance } from "./request";

export const GetConfig = async () => {
    return await instance.get("/config/get")
}

export const UpdateUdid = async ({ udid }: any) => {
    return await instance.get("/config/udid", {
        params: {
            udid: udid,
        }
    })
}

export const UpdateAccount = async ({ name, username, password }: any) => {
    return await instance.get("/config/account", {
        params: {
            name: name,
            username: username,
            password: password
        }
    })
}