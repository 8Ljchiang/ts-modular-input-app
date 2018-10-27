import { IModule } from "../interfaces/IModule";
import { IView } from "../interfaces/IView";
import { IRenderTable } from "../interfaces/IRenderTable";

export default class ModuleRenderer {

    public renderTable: IRenderTable;

    constructor(args: { renderTable: any }) {
        this.renderTable = args.renderTable;
    }

    render(args: { module: IModule, view: IView }): void {
        if (this.containsModuleStatus(args.module)) {
            const renderString = this.renderTable[args.module.status](args);
            args.view.show(renderString);
        }
    }

    containsModuleStatus(module: IModule): boolean {
        return Object.keys(this.renderTable).includes(module.status);
    }
}