import { IModule } from "./IModule";
import { IRenderArgs } from "./Args";

export interface IModuleRenderer {
    render(args: IRenderArgs): void;
    containsModuleStatus(module: IModule): void;
}