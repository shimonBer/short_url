import crypto from "crypto";
import { DOMAIN, LINK_EMPTY_ERROR, LINK_NOT_FOUND_ERROR, LINK_NOT_VALID_ERROR, LINK_NOT_PROCESSED_ERROR } from "../constants";
import { results } from "../db";

const hashString: StringManipulation = (str) => {
    const hash: string = crypto.createHash('md5').update(str).digest('hex');
    return hash;
}

const encode: StringManipulation = (str) => {
    const buff = Buffer.from(str);
    return buff.toString('base64');
}

export const handleLinkShorten:StringRes = (str) => {
    if(!str) return {err: LINK_EMPTY_ERROR};
    try{
        const hashedString = hashString(str);
        // We will take the 7 first characters, which allow us 62^7 different urls
        const res = encode(hashedString).slice(0,7)
        results[res] = str;
        return {res: DOMAIN + res};  

    } catch(e){
        return {err: LINK_NOT_PROCESSED_ERROR};
    }
}

export const handleLinkToOriginal: StringRes = (str) => {
    if(!str) return {err: LINK_EMPTY_ERROR};
    //get the last part only
    const matchedString: Array<string> | null = str.match(/([^/]+$)/);
    if(matchedString && matchedString.length > 0){
        const originalLink = results[matchedString[0]];
        if(!originalLink) return {err: LINK_NOT_FOUND_ERROR};
        return {res: results[matchedString[0]]};
    } return { err: LINK_NOT_VALID_ERROR};
}