import { IModule } from "../interfaces/IModule";
import { STATUS_DEFAULT } from '../lib/constants';
import { IModuleRenderer } from "../interfaces/IModuleRenderer";

export default class Module implements IModule {
    public id: string;
    public name: string;
    public parserDelegator: any;
    public moduleData: any;
    public moduleRenderer: any;
    public status: string;
    
    constructor(args: { id: string, name: string, parserDelegator: any, moduleRenderer: IModuleRenderer, moduleData?: {}, status?: string }) {
        this.id = args.id;
        this.name = args.name;
        this.parserDelegator = args.parserDelegator;
        this.moduleRenderer = args.moduleRenderer;
        this.moduleData = args.moduleData;
        this.status = args.status || STATUS_DEFAULT;
    }

    handleInput(args: {input: string, view: any, app: any}) {
        const newArgs = {
            ...args,
            module: this,
        }
        this.parserDelegator.delegate(newArgs);
        this.moduleRenderer.render({ module: this, view: args.view });
    }

    getStatus(): string {
        return this.status;
    }

    setStatus(status: string): void {
        this.status = status;
    }
}