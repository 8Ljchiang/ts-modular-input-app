import { IModule } from "../interfaces/IModule";
import { IModuleStore } from "../interfaces/IModuleStore";
import { ICollection } from "../interfaces/ICollection";

export default class ModuleStore implements IModuleStore {
    public moduleCollection: ICollection<IModule>;

    constructor(args: { moduleCollection?: any }) {
        this.moduleCollection = args.moduleCollection || {};
    }

    getModule(id: string): IModule {
        return this.moduleCollection[id];
    }

    addModule(module: IModule): void {
        this.moduleCollection[module.id] = module;
    }
    
    removeModule(moduleId: string): void {
        delete this.moduleCollection[moduleId];
    }
}