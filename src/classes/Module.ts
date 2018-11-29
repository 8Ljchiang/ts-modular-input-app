import { IModule } from "../interfaces/IModule";
import { STATUS_DEFAULT } from '../lib/constants';
import { IParseArgs, IModuleArgs } from "../interfaces/Args";

export default class Module implements IModule {
    public id: string;
    public name: string;
    public status: string;
    public moduleText: string;
    public parserDelegator: string;
    public moduleRenderer: string;
    public moduleData: { [key: string]: any };
    
    constructor(args: IModuleArgs) {
        this.id = args.id;
        this.name = args.name;
        this.moduleText = args.moduleText;
        this.parserDelegator = args.parserDelegator;
        this.moduleRenderer = args.moduleRenderer;
        this.moduleData = args.moduleData || {};
        this.status = args.status || STATUS_DEFAULT;
    }
    // public handleInput(args: IParseArgs) {
    //     // console.log("HANDLING INPUT");
    //     const newArgs = {
    //         ...args,
    //         module: this,
    //     }
    //     this.parserDelegator.delegate(newArgs);
    // }

    public getStatus(): string {
        return this.status;
    }

    setStatus(status: string): void {
        this.status = status;
    }
}