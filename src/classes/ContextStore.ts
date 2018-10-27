import { IContext } from "../interfaces/IContext";

export default class ContextStore  {
    public contexts: { [id: string]: IContext };

    constructor (args: any) {
        this.contexts = args.contexts;
    }

    getContext(id: string): IContext {
        return this.contexts[id];
    }
}