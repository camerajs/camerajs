import {utils} from "./utils";
export class setCamera {
    constructor() {
        let cameraTags: NodeList = setCamera.getCameraTags();
        if (cameraTags.length) {
            //if any camera tag found:
            this.createCameraView(cameraTags);
        }
    }

    private static getCameraTags() {
        /**
         * This should be a method, because we will have more things to check for a camera-tag,
         * like some settings & configurations from the camera tag attributes
         **/
        return <NodeList>document.querySelectorAll('[data-camera]');
    }

    protected createCameraView(cameraTags: any) {
        //Check the number of user camera/audio inputs that are installed into user device (if 0 , it means no camera found):
        setCamera.listCameraAndMicrophones();

        let svgIconCapture: any = '<?xml version="1.0" ?><svg style="enable-background:new 0 0 24 24;" version="1.1" viewBox="0 0 24 24" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g id="info"/><g id="icons"><path d="M19,7h-0.4c-0.4,0-0.7-0.2-0.9-0.6l-1.2-2.3c-0.3-0.7-1-1.1-1.8-1.1H9.2C8.5,3,7.8,3.4,7.4,4.1L6.3,6.4   C6.1,6.8,5.8,7,5.4,7H5c-2.2,0-4,1.8-4,4v6c0,2.2,1.8,4,4,4h14c2.2,0,4-1.8,4-4v-6C23,8.8,21.2,7,19,7z M12,17c-2.2,0-4-1.8-4-4   c0-2.2,1.8-4,4-4s4,1.8,4,4C16,15.2,14.2,17,12,17z" id="photo"/></g></svg>';

        //loop through founded camera tags, and insert video tag into them (video tag will let us stream camera output)
        for (let i = 0; i < cameraTags.length; i++) {
            let currentCameraTag: HTMLElement = cameraTags[i];
            currentCameraTag.className = 'camerajs-element';

            currentCameraTag.innerHTML = '<video id="camerajs-' + i + '" width="640" height="480" autoplay></video>' +
                '<canvas id="camerajs-canvas-' + i + '" width="640" height="480"></canvas>' +
                '<div class="camerajs-menu"><a>' + svgIconCapture + '</a></div>';

            let videoElement: HTMLVideoElement = <HTMLVideoElement>document.getElementById('camerajs-' + i);
            navigator.mediaDevices.getUserMedia({video: true}).then(function (stream) {
                videoElement.src = window.URL.createObjectURL(stream);
                videoElement.play();
            });


            let canvasElement: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById('camerajs-canvas-' + i);
            let canvasContext: any = canvasElement.getContext('2d');

            // Trigger photo take
            currentCameraTag.querySelector(".camerajs-menu>a").addEventListener("click", function () {
                canvasContext.drawImage(videoElement, 0, 0, 640, 480);
            });
        }
    }


    static listCameraAndMicrophones() {
        let inputs: any = {};
        //This function will return the number of founded cameras and microphones on user's device.
        navigator.mediaDevices.enumerateDevices()
            .then(function (devices: any) {
                devices.forEach(function (device: any) {
                    // inputs[device.kind][deviceCounter]['id'] =   device.deviceId;
                    //inputs[device.kind][deviceCounter]['label'] =   device.label;
                    if (!inputs[device.kind]) {
                        /*
                         * //Initialize the array for, otherwise the .push will returns
                         * "Error: Cannot read property 'push' of undefined in [null]."
                         **/
                        inputs[device.kind] = [];
                    }
                    inputs[device.kind].push({label: device.label, deviceId: device.deviceId});

                });

                //If no video input (webCam) found on user device, console log it
                if (inputs['videoinput'].length == 0) {
                    utils.log("No video input found on this device", 'warn');
                }
                return inputs;
            }).catch(function (err: any) {
            utils.log(err.name + ": " + err.message, "warn");
            return false;
        });

    }
}