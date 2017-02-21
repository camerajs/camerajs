import {loadEvent} from "./events/load";
import {preferences} from "./preferences";
import {utils} from "./lib/utils";
import {browser} from "./lib/browser";
import {upload} from "./lib/upload";
class cameraInitializer {
    constructor() {
        cameraInitializer.ready();
    }

    static async ready() {
        let loadEventInstancew = new loadEvent();
        //https://github.com/Microsoft/TypeScript/wiki/What's-new-in-TypeScript#downlevel-async-functions

        await loadEventInstancew.eventListener();

        if (!browser.checkBrowserSupport()) {
            utils.log("Your browser does not support camera", "warn");
        }

        if (!preferences.isHttps) {
            utils.log("HTTPS required", "warn");
        }
    }
}

new cameraInitializer();
