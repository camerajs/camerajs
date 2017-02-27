export declare class upload {
    uploadState: number;
    protected uploadUrl: string;
    protected uploadFile: any;
    protected uploadFieldName: string;
    protected uploadProgressPercentage: number;
    /**
     *
     * @param options = {url, file, fieldName}
     */
    constructor(options: any);
    getUploadProgress(): number;
    start(): Promise<void>;
    /**
     * @param callback
     * @private
     */
    private _sendHttpRequest(callback);
}
