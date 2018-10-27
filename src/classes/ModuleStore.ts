import { IModule } from "../interfaces/IModule";

export default class ModuleStore {
    public modules: { [id: string]: IModule };

    constructor(args: any) {
        this.modules = args.modules;
    }

    getModule(id: string): IModule {
        return this.modules[id];
    }

    addModule(module: IModule): void {
        this.modules[module.id] = module;
    }
    
    removeModule(moduleId: string): void {
        delete this.modules[moduleId];
    }
}