import crypto from "crypto";
import { DOMAIN } from "../constants";
import { results } from "../db";

const hashString: StringManipulation = (str) => {
    const hash: string = crypto.createHash('md5').update(str).digest('hex');
    return hash as string;
}

const encode: StringManipulation = (str) => {
    let buff = Buffer.from(str);
    return buff.toString('base64');
}

export const encodeString:StringRes = (str) => {
    if(!str) return {err: "Link can't be empty"};

    const hashedString = hashString(str);
    let res = encode(hashedString).slice(0,7)

    results[res] = str;
    return {res: DOMAIN + res};
    
}

export const decodeString: StringRes = (str) => {
    if(!str) return {err: "Link can't be empty"};
    const hashedStr = str.match(/([^\/]+$)/);
    if(hashedStr.length) return {res: results[hashedStr[0]]};
    else return {err: "Link couldn't be found"};
}