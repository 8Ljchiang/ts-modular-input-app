import { IContext } from "./IContext";

export interface IContextStore {
    contexts: any;
    getContext(id: string): IContext
}