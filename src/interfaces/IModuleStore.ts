import { IModule } from "./IModule";

export interface IModuleStore {
    moduleCollection: { [id: string]: IModule };
    getModule(moduleId: string): IModule;
    addModule(module: IModule): void;
    removeModule(moduleId: string): void;
    updateModule(moduleId: string, updateObject: { [key: string]: any }): void;
    updateModuleData(moduleId: string, updateDataObject: { [key: string]: any }): void;
    updateModuleDataMoves(moduleId: string, moveArgs: { [key: string]: any }): void;
    resetModuleDataMoves(moduleId: string): void;
}