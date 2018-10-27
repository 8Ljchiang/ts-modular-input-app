import { IModule } from "../interfaces/IModule";
import { STATUS_DEFAULT } from '../lib/constants';

export default class Module implements IModule {
    public id: string;
    public name: string;
    public parserDelegator: any;
    public moduleData: any;
    public moduleRenderer: any;
    public status: string;
    
    constructor(args: any) {
        this.id = args.id;
        this.name = args.name;
        this.parserDelegator = args.parserDelegator;
        this.moduleRenderer = args.moduleRenderer;
        this.moduleData = args.moduleData;
        this.status = args.status || STATUS_DEFAULT;
    }

    handleInput(args: {input: string, view: any}) {
        this.parserDelegator.delegate(args, this);
    }
}