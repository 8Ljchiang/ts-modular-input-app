import { IModule } from "./IModule";
import { IView } from "./IView";

export interface IModuleRenderer {
    render(args: { module: IModule, view: IView }): void;
    containsModuleStatus(module: IModule): void;
}