import { IModule } from "../interfaces/IModule";
import { STATUS_DEFAULT } from '../lib/constants';
import { IModuleRenderer } from "../interfaces/IModuleRenderer";
import { IParseArgs } from "../interfaces/Args";

export default class Module implements IModule {
    public id: string;
    public name: string;
    public parserDelegator: any;
    public moduleData: any;
    public moduleRenderer: any;
    public status: string;
    
    constructor(args: { id: string, name: string, parserDelegator: any, moduleRenderer: string, moduleData?: {}, status?: string }) {
        this.id = args.id;
        this.name = args.name;
        this.parserDelegator = args.parserDelegator;
        this.moduleRenderer = args.moduleRenderer;
        this.moduleData = args.moduleData || {};
        this.status = args.status || STATUS_DEFAULT;
    }

    public handleInput(args: IParseArgs) {
        // console.log("HANDLING INPUT");
        const newArgs = {
            ...args,
            module: this,
        }
        this.parserDelegator.delegate(newArgs);
    }

    public getStatus(): string {
        return this.status;
    }

    setStatus(status: string): void {
        this.status = status;
    }
}