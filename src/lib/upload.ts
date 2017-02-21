import {utils} from "./utils";
export class upload {
    public uploadState: number = 0;
    protected uploadUrl: string;
    protected uploadFile: any;
    protected uploadFieldName: string = 'file';
    protected uploadProgressPercentage: number = 0;

    /**
     *
     * @param options = {url, file, fieldName}
     */
    constructor(options: any) {
        if (!utils.validUrl(options.url)) {
            throw new Error('Camera.js: upload url is invalid!');
        }

        this.uploadUrl = options.url;
        this.uploadFile = options.file;

        if (typeof options.fieldName != 'undefined') {
            this.uploadFieldName = options.fieldName;
        }
    }

    public getUploadProgress() {
        return this.uploadProgressPercentage;
    }

    public start() {
        return new Promise<void>(resolve => {
            this._sendHttpRequest((status: number) => {
                if (status == 200) {
                    this.uploadState = status;
                }

                resolve();
            })
        });
    }

    /**
     * @param callback
     * @private
     */
    private _sendHttpRequest(callback: Function) {
        let fd = new FormData();
        fd.append(this.uploadFieldName, this.uploadFile);
        let xhr = new XMLHttpRequest();
        xhr.open('POST', this.uploadUrl, true);

        xhr.upload.onprogress = (e) => {
            if (e.lengthComputable) {
                this.uploadProgressPercentage = (e.loaded / e.total) * 100;
            }
        };

        xhr.onreadystatechange = function () {
            callback(xhr.status);
        };

        xhr.send(fd);
    }
}