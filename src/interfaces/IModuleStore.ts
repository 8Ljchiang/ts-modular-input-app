import { IModule } from "./IModule";

export interface IModuleStore {
    moduleCollection: { [id: string]: IModule };
    getModule(moduleId: string): IModule;
    addModule(module: IModule): void;
    removeModule(moduleId: string): void;
}