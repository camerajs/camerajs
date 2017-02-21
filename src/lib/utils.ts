import {preferences} from "../preferences";

export class utils {
    static log(message: string, type?: string): void {
        message = 'Camera.js: '+ message;
        if (preferences.debug) {
            switch (type) {
                case 'warn':
                    console.warn(message);
                    break;
                case 'log':
                    console.log(message);
                    break;
                case 'debug':
                    console.debug(message);
                    break;
                default:
                    console.log(message);
            }
        }
    }

    static isHttps(){
        return 'https:' == document.location.protocol;
    }

    /**
     * http://stackoverflow.com/questions/5717093/check-if-a-javascript-string-is-a-url
     * @param url
     * @returns {boolean}
     */
    static validUrl(url:string) {
        let regexp: RegExp = /(ftp|http|https):\/\/(\w+:?\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@\-\/]))?/;
        return regexp.test(url);
    }
}