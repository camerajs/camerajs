//Finding data-camera tags
/*
 * @todo:
 * */
export class selector {
    constructor() {
        let cameraTags = selector.findCameraTags();
        this.createCameraView(cameraTags);
        this.askForCameraPermission(cameraTags);
    }

    private static findCameraTags() {
        return document.querySelectorAll('[data-camera]');
    }

    private createCameraView(cameraTags: any) {
      /* @todo: Another method parse the camera tag (<div data-camera...>) and set different options there, such as size
      and other settings, and in other methods can easily having access to them, to use and change them when needed...
      * */
        for (let i = 0; i <= cameraTags.length; i++) {
            let currentCameraTag = cameraTags[i];
            if (cameraTags[i]) {
                currentCameraTag.innerHTML = '<video id="camerajs-'+i+'" width="640" height="480" autoplay></video>'+
                '<button id="snap">Aks Begir</button> <canvas id="canvas" width="640" height="480"></canvas>';

                console.log(currentCameraTag.getElementsByTagName("video"));
                let el = <HTMLVideoElement>document.getElementById('camerajs-0');
                navigator.mediaDevices.getUserMedia({ video: true }).then(function(stream) {
                    el.src = window.URL.createObjectURL(stream);
                    el.play();
                });


            }
        }
    }

    private askForCameraPermission(cameraTags:any){
        for (let i = 0; i <= cameraTags.length; i++) {

            let currentCameraTag = document.getElementById("camerajs-"+i);
            if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
                // Not adding `{ audio: true }` since we only want video now

            }
        }
    }
}