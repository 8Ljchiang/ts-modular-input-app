import { IContextStore } from "../interfaces/IContextStore";
import { IModuleStore } from '../interfaces/IModuleStore';
import { IContext } from "../interfaces/IContext";
import { IModule } from "../interfaces/IModule";
import { IView } from "../interfaces/IView";
import View from "./View";

export default class App {
    public view: any;
    public inputHandler: any;
    public moduleStore: any;
    public contextStore: any;
    public currentContextReference: any;
    public previousContextReferences: any;
    
    constructor(args: { inputHandler: any, moduleStore: IModuleStore, contextStore: IContextStore, currentContextRef?: string, previousContextRef?: string, view?: IView }) {
        this.inputHandler = args.inputHandler;
        this.contextStore = args.contextStore;
        this.moduleStore = args.moduleStore;
        this.currentContextReference = args.currentContextRef || null;
        this.previousContextReferences = args.previousContextRef || [];
        this.view = args.view || new View();
        this.init();
    }

    init() {
        this.inputHandler.on('line', (line: any) => {
            const context: IContext = this.contextStore.getContext(this.currentContextReference);
            const mModule: IModule = this.moduleStore.getModule(context.moduleId);
            const args = {
                input: line,
                view: this.view,
                app: this
            }
            mModule.handleInput(args);
        });
    }

    setCurrentContextReference(contextId: string): void {
        this.setPreviousContextReference(this.currentContextReference);
        this.currentContextReference = contextId;
    }

    setPreviousContextReference(contextId: string): void {
        this.previousContextReferences.push(contextId);
    }
}