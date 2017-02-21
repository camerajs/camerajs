import {eventInterface} from "./interface";
import {utils} from "../lib/utils";
import {browser} from "../lib/browser";
import {preferences} from "../preferences";

export class loadEvent implements eventInterface {

    eventListener() {
        /**
         * This method will be called inside the this.eventCallback method using a async function which means
         *   the method (this.eventCallback) will wait for the answer from evenListener (current method).
         */
        return new Promise<void>(resolve => {
            window.addEventListener("load", () => {
                /**
                 * resolve() will return to result to the async function in its call stack, and will let the function
                 *   continue
                 */
                this.eventCallback();
                resolve();
            });
        });
    }

    eventCallback() {
        preferences.isHttps = utils.isHttps();
        preferences.isMobile = browser.checkMobile(); //If true, means the user browser is a mobile browser
    }

}




