import { IContext } from "./IContext";

export interface IContextStore {
    contextCollection: any;
    getContext(contextId: string): IContext
    addContext(context: IContext): void;
    removeContext(contextId: string): void;
}