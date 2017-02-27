import { eventInterface } from "./interface";
export declare class loadEvent implements eventInterface {
    eventListener(): Promise<void>;
    eventCallback(): void;
}
