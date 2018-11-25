import { IModule } from "../interfaces/IModule";
import { IRenderTable } from "../interfaces/IRenderTable";
import { IModuleRenderer } from "../interfaces/IModuleRenderer";
import { IRenderArgs } from "../interfaces/Args";

export default class ModuleRenderer implements IModuleRenderer{

    public renderTable: IRenderTable;

    constructor(args: { renderTable: any }) {
        this.renderTable = args.renderTable;
    }

    render(args: IRenderArgs): void {
        if (this.containsModuleStatus(args.module)) {
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