import {loadEvent} from "./events/load";
import {preferences} from "./preferences";
import {utils} from "./lib/utils";
import {browser} from "./lib/browser";
import {setCamera} from "./lib/setCamera";
import {upload} from "./lib/upload";
class cameraInitializer {
    constructor() {
        cameraInitializer.ready();
    }

    static async ready() {
        let loadEventInstance = new loadEvent();
        //https://github.com/Microsoft/TypeScript/wiki/What's-new-in-TypeScript#downlevel-async-functions

        await loadEventInstance.eventListener();

        if (!preferences.isHttps) {
            utils.log("HTTPS required", "warn");
        }

        if (setCamera.listCameraAndMicrophones() == undefined) {
            utils.log("No camera input found on this device.", 'warn');
        }

        if (!browser.checkBrowserSupport()) {
            utils.log("Your browser does not support camera", "warn");
        } else {
            /*If user browser is supporting camera, then call the setCamera
             (defined in lib/setCamera.ts) and activate the camera*/
            new setCamera();
        }
    }
}

new cameraInitializer();
