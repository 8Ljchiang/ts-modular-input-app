import { IContext } from "../interfaces/IContext";
import { IContextStore } from "../interfaces/IContextStore";
import { IDispatcher } from "../interfaces/IDispatcher";
import { IModuleStore } from '../interfaces/IModuleStore';
import { IView } from "../interfaces/IView";
// import { IModule } from "../interfaces/IModule";

import { renderModule, handleInput } from "../lib/ActionBuilders";

export default class App {
    public dispatcher: IDispatcher;
    public contextStore: any;
    public currentContextReference: any;
    public previousContextReferences: any;
    
    constructor(args: { dispatcher: IDispatcher, moduleStore: IModuleStore, contextStore: IContextStore, currentContextRef?: string, previousContextRef?: string, view?: IView }) {
        this.dispatcher = args.dispatcher;
        this.contextStore = args.contextStore;
        this.currentContextReference = args.currentContextRef || 'c1';
        this.previousContextReferences = args.previousContextRef || [];
        this.init();
    }

    init() {
        const view = this.dispatcher.view;
        view.inputInterface.on('line', (line: any) => {
            const context: IContext = this.contextStore.getContext(this.currentContextReference);
            const action = handleInput(line, context.moduleId);
            this.dispatcher.execute(action);
            this.dispatcher.processQueue();
        });
    }

    run() {
        const context: IContext = this.contextStore.getContext(this.currentContextReference);
        const action = renderModule(context.moduleId);
        this.dispatcher.execute(action);
    }

    setCurrentContextReference(contextId: string): void {
        this.setPreviousContextReference(this.currentContextReference);
        this.currentContextReference = contextId;
    }

    setPreviousContextReference(contextId: string): void {
        this.previousContextReferences.push(contextId);
    }
}