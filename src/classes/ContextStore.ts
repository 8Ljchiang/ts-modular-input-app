import { IContext } from "../interfaces/IContext";

export default class ContextStore  {
    public contextCollection: any;

    constructor (args: { contextCollection?: { [id: string]: IContext }}) {
        this.contextCollection = args.contextCollection || {};
    }

    getContext(id: string): IContext {
        return this.contextCollection[id];
    }

    addContext(context: IContext): void {
        this.contextCollection[context.id] = context;
    }

    removeContext(contextId: string): void {
        delete this.contextCollection[contextId];
    }
}