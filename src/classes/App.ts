import { IContext } from "../interfaces/IContext";
import { IContextStore } from "../interfaces/IContextStore";
import { IDispatcher } from "../interfaces/IDispatcher";

import { renderModuleAction, handleInputAction } from "../helpers/ActionBuilders";

export default class App {
    public dispatcher: IDispatcher;
    // public moduleStore: any;
    public contextStore: any;
    public currentContextReference: any;
    public previousContextReferences: any;
    
    constructor(args: { dispatcher: IDispatcher, contextStore: IContextStore, currentContextRef?: string, previousContextRef?: string }) {
        this.dispatcher = args.dispatcher;
        this.contextStore = args.contextStore;
        // this.moduleStore = args.moduleStore;
        this.currentContextReference = args.currentContextRef || 'c1';
        this.previousContextReferences = args.previousContextRef || [];
        this.init();
    }

    init() {
        const view = this.dispatcher.view;
        view.inputInterface.on('line', (line: any) => {
            const context: IContext = this.contextStore.getContext(this.currentContextReference);
            // const currModule: IModule = this.moduleStore.getModule(context.moduleId);
            // const args = {
            //     input: line,
            //     view: this.view,
            //     app: this
            // }

            // const args = {
            //     input: line,
            //     dispatcher: this.dispatcher,
            //     moduleId: context.moduleId
            // }
            // currModule.handleInput(args);

            const action = handleInputAction(line, context.moduleId);
            this.dispatcher.execute(action);
        });
    }

    run() {
        const context: IContext = this.contextStore.getContext(this.currentContextReference);
        const action = renderModuleAction(context.moduleId);
        this.dispatcher.execute(action);
        
        // Note:
        // this.view.clear();
        // const context: IContext = this.contextStore.getContext(this.currentContextReference);
        // const mModule: IModule = this.moduleStore.getModule(context.moduleId);
        // const args = {
        //     module: mModule,
        //     view: this.dispatcher.view
        // }
        // mModule.moduleRenderer.render(args);
    }

    setCurrentContextReference(contextId: string): void {
        this.setPreviousContextReference(this.currentContextReference);
        this.currentContextReference = contextId;
    }

    setPreviousContextReference(contextId: string): void {
        this.previousContextReferences.push(contextId);
    }
}