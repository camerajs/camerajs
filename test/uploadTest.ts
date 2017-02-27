import 'jsdom-global/register';
import {suite, test, slow, timeout, skip, only} from "mocha-typescript";
import {upload} from "../src/lib/upload"

@suite
class UploadTest {
    uploadInstance: upload;

    constructor() {
        let options: {url: string; file: File; fieldName: string};
        options = {
            url: 'http://testdomain.com/test/url',
            file: new File([""], "filename"),
            fieldName: 'filename'
        };

        this.uploadInstance = new upload(options);
    }

    @test "upload sample file"() {
        return this.uploadInstance.start();
    }

    @test "get upload progress percentage"() {
        return this.uploadInstance.getUploadProgress();
    }
}