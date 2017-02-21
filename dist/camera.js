(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.camera = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

var __awaiter = undefined && undefined.__awaiter || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }
        function rejected(value) {
            try {
                step(generator["throw"](value));
            } catch (e) {
                reject(e);
            }
        }
        function step(result) {
            result.done ? resolve(result.value) : new P(function (resolve) {
                resolve(result.value);
            }).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = undefined && undefined.__generator || function (thisArg, body) {
    var _ = { label: 0, sent: function sent() {
            if (t[0] & 1) throw t[1];return t[1];
        }, trys: [], ops: [] },
        f,
        y,
        t;
    return { next: verb(0), "throw": verb(1), "return": verb(2) };
    function verb(n) {
        return function (v) {
            return step([n, v]);
        };
    }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) {
            try {
                if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [0, t.value];
                switch (op[0]) {
                    case 0:case 1:
                        t = op;break;
                    case 4:
                        _.label++;return { value: op[1], done: false };
                    case 5:
                        _.label++;y = op[1];op = [0];continue;
                    case 7:
                        op = _.ops.pop();_.trys.pop();continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                            _ = 0;continue;
                        }
                        if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                            _.label = op[1];break;
                        }
                        if (op[0] === 6 && _.label < t[1]) {
                            _.label = t[1];t = op;break;
                        }
                        if (t && _.label < t[2]) {
                            _.label = t[2];_.ops.push(op);break;
                        }
                        if (t[2]) _.ops.pop();
                        _.trys.pop();continue;
                }
                op = body.call(thisArg, _);
            } catch (e) {
                op = [6, e];y = 0;
            } finally {
                f = t = 0;
            }
        }if (op[0] & 5) throw op[1];return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var load_1 = require("./events/load");
var preferences_1 = require("./preferences");
var utils_1 = require("./lib/utils");
var browser_1 = require("./lib/browser");
var cameraInitializer = function () {
    function cameraInitializer() {
        cameraInitializer.ready();
    }
    cameraInitializer.ready = function () {
        return __awaiter(this, void 0, void 0, function () {
            var loadEventInstancew;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        loadEventInstancew = new load_1.loadEvent();
                        //https://github.com/Microsoft/TypeScript/wiki/What's-new-in-TypeScript#downlevel-async-functions
                        return [4 /*yield*/, loadEventInstancew.eventListener()];
                    case 1:
                        //https://github.com/Microsoft/TypeScript/wiki/What's-new-in-TypeScript#downlevel-async-functions
                        _a.sent();
                        if (!browser_1.browser.checkBrowserSupport()) {
                            utils_1.utils.log("Your browser does not support camera", "warn");
                        }
                        if (!preferences_1.preferences.isHttps) {
                            utils_1.utils.log("HTTPS required", "warn");
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    return cameraInitializer;
}();
new cameraInitializer();

},{"./events/load":2,"./lib/browser":3,"./lib/utils":4,"./preferences":5}],2:[function(require,module,exports){
"use strict";

var utils_1 = require("../lib/utils");
var browser_1 = require("../lib/browser");
var preferences_1 = require("../preferences");
var loadEvent = function () {
    function loadEvent() {}
    loadEvent.prototype.eventListener = function () {
        var _this = this;
        /**
         * This method will be called inside the this.eventCallback method using a async function which means
         *   the method (this.eventCallback) will wait for the answer from evenListener (current method).
         */
        return new Promise(function (resolve) {
            window.addEventListener("load", function () {
                /**
                 * resolve() will return to result to the async function in its call stack, and will let the function
                 *   continue
                 */
                _this.eventCallback();
                resolve();
            });
        });
    };
    loadEvent.prototype.eventCallback = function () {
        preferences_1.preferences.isHttps = utils_1.utils.isHttps();
        preferences_1.preferences.isMobile = browser_1.browser.checkMobile(); //If true, means the user browser is a mobile browser
    };
    return loadEvent;
}();
exports.loadEvent = loadEvent;

},{"../lib/browser":3,"../lib/utils":4,"../preferences":5}],3:[function(require,module,exports){
"use strict";

var preferences_1 = require("../preferences");
var browser = function () {
    function browser() {}
    browser.checkBrowserSupport = function () {
        //This method will check if the user browser is supporting HTML5 camera API or not
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia || navigator.hasOwnProperty("webkitGetUserMedia") || navigator.hasOwnProperty("mozGetUserMedia")) {
            preferences_1.preferences.browserCameraSupport = true;
            return true;
        }
        return false;
    };
    browser.checkMobile = function () {
        //Return true if the user browser is a mobile browser:
        var check = false;
        (function (a) {
            if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true;
        })(navigator.userAgent || navigator.vendor);
        return check;
    };
    return browser;
}();
exports.browser = browser;

},{"../preferences":5}],4:[function(require,module,exports){
"use strict";

var preferences_1 = require("../preferences");
var utils = function () {
    function utils() {}
    utils.log = function (message, type) {
        message = 'Camera.js: ' + message;
        if (preferences_1.preferences.debug) {
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
    };
    utils.isHttps = function () {
        return 'https:' == document.location.protocol;
    };
    /**
     * http://stackoverflow.com/questions/5717093/check-if-a-javascript-string-is-a-url
     * @param url
     * @returns {boolean}
     */
    utils.validUrl = function (url) {
        var regexp = /(ftp|http|https):\/\/(\w+:?\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@\-\/]))?/;
        return regexp.test(url);
    };
    return utils;
}();
exports.utils = utils;

},{"../preferences":5}],5:[function(require,module,exports){
"use strict";

var preferences = function () {
    function preferences() {}
    return preferences;
}();
preferences.isHttps = false;
preferences.isMobile = false;
preferences.debug = true;
preferences.browserCameraSupport = false;
exports.preferences = preferences;

},{}]},{},[1])(1)
});

//# sourceMappingURL=camera.js.map
