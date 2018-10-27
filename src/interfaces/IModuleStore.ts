import { IModule } from "./IModule";

export interface IModuleStore {
    modules: { [id: string]: IModule };
    getModule(moduleId: string): IModule;
    addModule(module: IModule): void;
    removeModule(moduleId: string): void;
}