export declare class utils {
    static log(message: string, type?: string): void;
    static isHttps(): boolean;
    /**
     * http://stackoverflow.com/questions/5717093/check-if-a-javascript-string-is-a-url
     * @param url
     * @returns {boolean}
     */
    static validUrl(url: string): boolean;
}
