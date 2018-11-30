import { IModule } from "../interfaces/IModule";
import { IModuleStore } from "../interfaces/IModuleStore";
import { ICollection } from "../interfaces/ICollection";

export default class ModuleStore implements IModuleStore {
    public moduleCollection: ICollection<IModule>;

    constructor(args: { moduleCollection?: any }) {
        this.moduleCollection = args.moduleCollection || {};
    }
    
    getModule(id: string): IModule {
        const result = this.moduleCollection[id];
        
        return this.moduleCollection[id];
    }
    addModule(module: IModule): void {
        this.moduleCollection[module.id] = module;
    }
    removeModule(moduleId: string): void {
        delete this.moduleCollection[moduleId];
    }
    updateModule(moduleId: string, updateObject: { [key: string]: any }): void {
        // const currentModule = this.moduleCollection[moduleId];
        // if (currentModule) {
        //     this.moduleCollection[moduleId] = { ...currentModule, ...updateObject };
        // }

        // Hackey way of doing this. Maybe I should move module status to moduleData.
        if (updateObject.status) {
            this.moduleCollection[moduleId].status = updateObject.status;
        }
    }
    updateModuleData(moduleId: string, updateDataObject: { [key: string]: any }): void {
        const currentDataObject = this.moduleCollection[moduleId].moduleData;
        if (currentDataObject) {
            this.moduleCollection[moduleId].moduleData = { ...currentDataObject, ...updateDataObject };
        }
    }
    updateModuleDataMoves(moduleId: string, moveArgs: { [key: string]: any }): void {
        const currentModule = this.moduleCollection[moduleId];
        if (currentModule) {
            this.moduleCollection[moduleId].moduleData.board.addMove(moveArgs);
        }
    }
    resetModuleDataMoves(moduleId: string): void {
        const currentModule = this.moduleCollection[moduleId];
        if (currentModule) {
            currentModule.moduleData.board.reset();
        }
    }
}