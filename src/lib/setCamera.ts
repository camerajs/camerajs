import {utils} from "./utils";
export class setCamera {
    constructor() {
        let cameraTags: NodeList = setCamera.getCameraTags(); //List of founded camera tag elements

        if (cameraTags.length) {
            //if any camera tag found:
            this.createCameraView(cameraTags);
        }
    }

    private static getCameraTags() {
        /**
         * getCameraTags() returns list of camera tags found on the HTML page.
         * This should be a method, because we will have more things to check for a camera-tag,
         * like some settings & configurations from the camera tag attributes
         **/
        return <NodeList>document.querySelectorAll('[data-camera]');
    }

    protected createCameraView(cameraTags: any) {
        //Check the number of user camera/audio inputs which are installed into user device (if 0 or undefined , it means no camera found):
        setCamera.listCameraAndMicrophones();


        /*loop through founded camera tags, and insert video tag, canvas and menu into them
         (video tag will let us stream camera output, canvas will capture the picture)*/
        for (let i = 0; i < cameraTags.length; i++) {
            let currentCameraTag: HTMLElement = cameraTags[i];
            currentCameraTag.className = 'camerajs-element';
            currentCameraTag.appendChild(setCamera._createVideoElement(i));
            currentCameraTag.appendChild(setCamera._createCanvasElement(i));
            currentCameraTag.appendChild(setCamera._createCameraMenu());

            //Stream the camera output by the video tag:
            let videoElement: HTMLVideoElement = <HTMLVideoElement>document.getElementById('camerajs-' + i);
            navigator.mediaDevices.getUserMedia({video: true}).then(function (stream) {
                videoElement.src = window.URL.createObjectURL(stream);
                videoElement.play();
            });

            //Initialize the canvas to put the captured photo into it:
            let canvasElement: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById('camerajs-canvas-' + i);
            let canvasContext: any = canvasElement.getContext('2d');

            //Mirroring the canvas
            canvasContext.translate(640, 0);
            canvasContext.scale(-1, 1);

            //Capture photo:
            currentCameraTag.querySelector(".camerajs-menu>a").addEventListener("click", function () {
                canvasContext.drawImage(videoElement, 0, 0, 640, 480); //Draw the captured photo on canvas
            });
        }
    }

    private static _createVideoElement(elementIndex: number) {
        /*
         * Inside the createCameraView method, we will need to make something that user can see the output of the camera
         *  we need to put a video, canvas tag, and camera main menu (the capture and change camera from rear to front
         *  will be inside menu, also filter and effects) - This method is just for video element and will let user to see
         *  camera output
         * */
        let videoTag: HTMLVideoElement = document.createElement("video");
        videoTag.id = "camerajs-" + elementIndex;
        videoTag.setAttribute('width', '640');
        videoTag.setAttribute('height', '480');
        videoTag.setAttribute("autoplay", "true");
        return videoTag;
    }

    private static _createCanvasElement(elementIndex: number) {
        /*
         * Inside the createCameraView method, we will need to make something that user can see the output of the camera
         *  we need to put a video, canvas tag, and camera main menu (the capture and change camera from rear to front
         *  will be inside menu, also filter and effects) - Canvas element will be used when we capture a picture
         * */
        let canvasTag: HTMLCanvasElement = document.createElement("canvas");
        canvasTag.id = "camerajs-canvas-" + elementIndex;
        canvasTag.setAttribute('width', '640');
        canvasTag.setAttribute('height', '480');
        return canvasTag;
    }

    private static _createCameraMenu() {
        /*
         * Inside the createCameraView method, we will need to make something that user can see the output of the camera
         *  we need to put a video, canvas tag, and camera main menu (the capture and change camera from rear to front
         *  will be inside menu, also filter and effects) - The menu of the camera (capture, change camera, etc buttons)
         * */
        //<div class="camerajs-menu"><a>' + svgIconCapture + '</a></div>';
        let menuDivTag: HTMLDivElement = document.createElement("div");
        menuDivTag.className = "camerajs-menu";

        //create the capture button (the svgIconCapture is a capture icon):
        let svgIconCapture: any = '<?xml version="1.0" ?><svg style="enable-background:new 0 0 24 24;" version="1.1" viewBox="0 0 24 24" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g id="info"/><g id="icons"><path d="M19,7h-0.4c-0.4,0-0.7-0.2-0.9-0.6l-1.2-2.3c-0.3-0.7-1-1.1-1.8-1.1H9.2C8.5,3,7.8,3.4,7.4,4.1L6.3,6.4   C6.1,6.8,5.8,7,5.4,7H5c-2.2,0-4,1.8-4,4v6c0,2.2,1.8,4,4,4h14c2.2,0,4-1.8,4-4v-6C23,8.8,21.2,7,19,7z M12,17c-2.2,0-4-1.8-4-4   c0-2.2,1.8-4,4-4s4,1.8,4,4C16,15.2,14.2,17,12,17z" id="photo"/></g></svg>';
        let captureButton: HTMLAnchorElement = document.createElement("a");
        captureButton.innerHTML = svgIconCapture;

        menuDivTag.appendChild(captureButton);

        return menuDivTag;
    }

    //@todo listCameraAndMicrophones is not working as expected, returns "undefined" instead of the array values!
    static listCameraAndMicrophones():any{
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

                //List of video inputs are accessible in return: inputs['videoinput']
                return inputs;

            }).catch(function (err: any) {
            if (err.length) {
                utils.log(err.name + ": " + err.message, "warn");
            }
            return false;
        });
    }
}