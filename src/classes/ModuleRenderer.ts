import { IView } from "../interfaces/IView";
import { IModule } from "../interfaces/IModule";
import { IRenderTable } from "../interfaces/IRenderTable";
import { IModuleRenderer } from "../interfaces/IModuleRenderer";

export default class ModuleRenderer implements IModuleRenderer{

    public renderTable: IRenderTable;

    constructor(args: { renderTable: any }) {
        this.renderTable = args.renderTable;
    }

    render(args: { module: IModule, view: IView }): void {
        if (this.containsModuleStatus(args.module)) {
            // console.log("CLEAR");
            // args.view.clear();
            // console.log(args.module.status)
            const renderString = this.renderTable[args.module.status](args);
            args.view.show(renderString);
            
            const { players, activePlayerIndex } = args.module.moduleData;
            args.view.setPrompt(players[activePlayerIndex].name + ": ");
        }
    }

    containsModuleStatus(module: IModule): boolean {
        return Object.keys(this.renderTable).includes(module.status);
    }
}