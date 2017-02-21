export interface eventInterface {
    eventListener():Promise<void>;
    eventCallback():void;
}